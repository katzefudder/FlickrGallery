import { defineStore } from 'pinia';
import axios from 'axios';

export const useFlickrStore = defineStore('flickr', {
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
        this.photos = this.photoCache[page].photos;
        this.totalPages = this.photoCache[page].totalPages;
        this.totalPictures = this.photoCache[page].totalPictures;
        // Prüfe, ob Cache-Eintrag abgelaufen ist (TTL: z.B. 5 Minuten)
        const ttl = 30 * 60 * 1000; // 30 Minuten in ms
        const cached = this.photoCache[page];
        console.debug(`images loaded from cache for page ${page} - cache valid for ${ttl / 1000} seconds, ${Math.ceil((Date.now() - cached.timestamp)/1000)} seconds old`);
        if (Date.now() - (cached.timestamp || 0) < ttl) {
          return;
        }
        // Cache abgelaufen, lösche Eintrag
        delete this.photoCache[page];
      }
      console.log(`Lade Fotos von API für Seite ${page}`);
      this.loading = true;
      const response = await axios.get(url);
      // Passe das Mapping ggf. an deine API-Struktur an!
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
        timestamp: Date.now(), // Speichere den Zeitstempel
      };
      this.loading = false;
    },
  },
  persist: true, // <--- aktiviert Persistenz für diesen Store
});