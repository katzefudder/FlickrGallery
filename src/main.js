import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { FlickrGalleryPlugin } from './FlickrGallery.js';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia); // Pinia zuerst!
app.use(FlickrGalleryPlugin); // Dann dein Plugin
app.mount("#app");