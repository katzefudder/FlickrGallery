// src/FlickrGallery.js
import { setPiniaInstance } from './plugin/context';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { defineAsyncComponent } from 'vue';

const FlickrGalleryPlugin = {
  install(app, options = {}) {
    const { pinia } = options;

    if (!pinia) {
      console.error('[FlickrGallery] Missing { pinia } option during install');
      return;
    }

    // Set active Pinia globally for this plugin
    setPiniaInstance(pinia);

    // Optional: persisted state plugin nur einmal registrieren
    if (pinia && Array.isArray(pinia._p) && !pinia._p.includes(piniaPluginPersistedstate)) {
      pinia.use(piniaPluginPersistedstate);
    }

    // Register component asynchronously
    app.component(
      'FlickrGallery',
      defineAsyncComponent(() => import('./components/FlickrGallery.vue'))
    );
  },
};

export default FlickrGalleryPlugin;
export { FlickrGalleryPlugin };
// Optional: Named export for direct component usage
export { default as FlickrGalleryComponent } from './components/FlickrGallery.vue';
