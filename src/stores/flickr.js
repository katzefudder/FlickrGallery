// stores/flickr.js
import { defineStore } from 'pinia';

// Factory für einen pro-Instanz Store, basierend auf uid
export function useFlickrStore(uid = 'default') {
  const storeId = `flickr-${uid}`;
  const useStore = defineStore(storeId, {
    state: () => ({
      photos: [],
      totalPages: 0,
      totalPictures: 0,
      loading: false,
      error: null,
    }),
    actions: {
      async fetchPhotos(url) {
        this.loading = true;
        this.error = null;
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          const data = await response.json();

          if (data?.stat && data.stat !== 'ok') {
            // Flickr Fehlerantwort
            throw new Error(data?.message ? `Flickr: ${data.message}` : 'Flickr API Error');
          }

          if (data?.photos) {
            // flickr.photos.search
            this.photos = Array.isArray(data.photos.photo) ? data.photos.photo : [];
            this.totalPages = Number(data.photos.pages || 0);
            this.totalPictures = Number(data.photos.total || 0);
          } else if (data?.photoset) {
            // flickr.photosets.getPhotos
            this.photos = Array.isArray(data.photoset.photo) ? data.photoset.photo : [];
            this.totalPages = Number(data.photoset.pages || 0);
            this.totalPictures = Number(data.photoset.total || 0);
          } else {
            // Unbekannte Struktur
            this.photos = [];
            this.totalPages = 0;
            this.totalPictures = 0;
            console.error('Unerwartete Flickr API Antwortstruktur', data);
          }
        } catch (e) {
          console.error('Fehler beim Laden der Flickr-Fotos im Store:', e);
          this.error = e?.message || String(e);
          this.photos = [];
          this.totalPages = 0;
          this.totalPictures = 0;
        } finally {
          this.loading = false;
        }
      }
    }
  });
  return useStore();
}