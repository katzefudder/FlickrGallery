import { defineAsyncComponent as n } from "vue";
const t = {
  install(o, l = {}) {
    o.component(
      "FlickrGallery",
      n(() => import("./FlickrGallery-v4skOySa.js"))
    );
  }
};
export {
  t as FlickrGallery
};
