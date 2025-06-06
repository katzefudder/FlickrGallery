// src/FlickrGallery.js
import { setPiniaInstance } from './plugin/context';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { defineAsyncComponent } from 'vue';

export default {
  install(app, options = {}) {
    const { pinia } = options;

    if (!pinia) {
      console.error('[FlickrGallery] Missing { pinia } option during install');
      return;
    }

    // ✅ Set the active Pinia instance globally
    setPiniaInstance(pinia);

    // ✅ Ensure persisted state plugin is applied
    if (!pinia._p.some(p => p === piniaPluginPersistedstate)) {
      pinia.use(piniaPluginPersistedstate);
    }

    // ✅ Register component asynchronously
    app.component(
      'FlickrGallery',
      defineAsyncComponent(() => import('./components/FlickrGallery.vue'))
    );
  },
};

// Optional: Named export for direct usage without plugin
export { default as FlickrGalleryComponent } from './components/FlickrGallery.vue';
