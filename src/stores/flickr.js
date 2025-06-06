// stores/flickr.js
import { defineStore } from 'pinia';
import axios from 'axios';

/**
 * Dynamic Flickr store factory, scoped by unique ID
 */
export const useFlickrStore = (id) => defineStore(`${id}`, {
  state: () => ({
    photos: [],
    totalPages: 1,
    totalPictures: 0,
    loading: false,
    photoCache: {}, // Cache für Seiten
  }),
  actions: {
    async fetchPhotos(url, page = 1) {
      if (this.photoCache[page]) {
        const cached = this.photoCache[page];
        const ttl = 30 * 60 * 1000;
        const age = Date.now() - (cached.timestamp || 0);

        if (age < ttl) {
          this.photos = cached.photos;
          this.totalPages = cached.totalPages;
          this.totalPictures = cached.totalPictures;
          // console.debug(`🟢 Using cached data for page ${page} (${Math.ceil(age / 1000)}s old)`);
          return;
        }

        // console.debug(`⚠️ Cache expired for page ${page}`);
        delete this.photoCache[page];
      }

      // console.log(`🔄 Fetching Flickr photos for page ${page}`);
      this.loading = true;

      const response = await axios.get(url);
      let photos = [];

      if (response.data.photoset) {
        photos = response.data.photoset.photo;
        this.totalPages = response.data.photoset.pages;
        this.totalPictures = response.data.photoset.total;
      } else if (response.data.photos) {
        photos = response.data.photos.photo;
        this.totalPages = response.data.photos.pages;
        this.totalPictures = response.data.photos.total;
      }

      this.photos = photos;
      this.photoCache[page] = {
        photos,
        totalPages: this.totalPages,
        totalPictures: this.totalPictures,
        timestamp: Date.now(),
      };

      this.loading = false;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: `flickr-${id}`,
        storage: localStorage,
      }
    ]
  }
})();