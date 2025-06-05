import { defineAsyncComponent } from "vue";

const FlickrGallery = {
  install(app, options = {}) {
    if (!app._context.provides.pinia) {
      console.warn('FlickrGallery uses Pinia! Please make sure you always call app.use(createPinia()) before using this plugin.');
    }
    app.component(
      "FlickrGallery",
      defineAsyncComponent(() => import("./components/FlickrGallery.vue"))
    );
  }
};

export {
  FlickrGallery
};