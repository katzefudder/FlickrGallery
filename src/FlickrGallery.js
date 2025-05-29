import { defineAsyncComponent } from "vue";

export const FlickrGalleryPlugin = {
  install(app, options = {}) {
    // Pinia muss vorher in main.js registriert werden!
    app.component(
      "FlickrGallery",
      defineAsyncComponent(() => import("./components/FlickrGallery.vue"))
    );
  }
};