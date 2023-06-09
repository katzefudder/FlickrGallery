import {defineAsyncComponent} from "vue";
export const FlickrGalleryPlugin = (app) => {
    app.component(
        "FlickrGallery",
        defineAsyncComponent(() => import("./components/FlickrGallery.vue"))
    );
}