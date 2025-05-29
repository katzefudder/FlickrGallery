import { defineAsyncComponent as n } from "vue";
const r = {
  install(o, l = {}) {
    o.component(
      "FlickrGallery",
      n(() => import("./FlickrGallery-v4skOySa.js"))
    );
  }
};
export {
  r as FlickrGalleryPlugin
};
