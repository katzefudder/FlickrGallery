import { defineAsyncComponent as i } from "vue";
const o = {
  install(e, l = {}) {
    e._context.provides.pinia || console.warn("FlickrGallery uses Pinia! Please make sure you always call app.use(createPinia()) before using this plugin."), e.component(
      "FlickrGallery",
      i(() => import("./FlickrGallery-CMA-8XUP.js"))
    );
  }
};
export {
  o as FlickrGallery
};
