import { defineAsyncComponent } from "vue";

const FlickrGallery = {
  install(app, options = {}) {
    app.component(
      "FlickrGallery",
      defineAsyncComponent(() => import("./components/FlickrGallery.vue"))
    );
  }
};

export {
  FlickrGallery
};