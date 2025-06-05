import { defineAsyncComponent as i } from "vue";
const o = {
  install(e, l = {}) {
    e._context.provides.pinia || console.warn("FlickrGallery uses Pinia! Please make sure you always call app.use(createPinia()) before using this plugin."), e.component(
      "FlickrGallery",
      i(() => import("./FlickrGallery-I5I6u5L2.js"))
    );
  }
};
export {
  o as FlickrGallery
};
