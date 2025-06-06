import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import FlickrGallery from './FlickrGallery.js';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(FlickrGallery, { pinia });
app.mount("#app");