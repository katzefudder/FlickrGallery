// plugin/index.js
import FlickrGalleryComponent from '../components/FlickrGallery.vue';
import { setPiniaInstance } from './context';

const FlickrGalleryPlugin = {
  install(app, options = {}) {
    console.log('[FlickrGallery] Installing plugin with options:', options);
    if (!options.pinia) {
      console.error('[FlickrGallery] Missing { pinia } in options');
      return;
    }

    setPiniaInstance(options.pinia);
    app.component('FlickrGallery', FlickrGalleryComponent);
  }
};

export default FlickrGalleryPlugin;
