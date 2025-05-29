import { defineAsyncComponent as n } from "vue";
const l = (o, e) => {
  o.use(e), o.component(
    "FlickrGallery",
    n(() => import("./FlickrGallery-v4skOySa.js"))
  );
};
export {
  l as FlickrGalleryPlugin
};
