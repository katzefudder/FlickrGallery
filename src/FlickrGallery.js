import {defineAsyncComponent} from "vue";
export const FlickrGalleryPlugin = (app, pinia) => {
    // Make sure Pinia is registered before the component
    app.use(pinia);
    app.component(
        "FlickrGallery",
        defineAsyncComponent(() => import("./components/FlickrGallery.vue"))
    );
}