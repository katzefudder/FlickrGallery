# FlickrGallery

A project that was started to fulfil my own needs with a flickr gallery for my website/portfolio [katzefudder.de](https://www.katzefudder.de)
See [https://katzefudder.github.io/FlickrGallery/](https://katzefudder.github.io/FlickrGallery/) for a demo.
## Usage

main.js

```
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import { FlickrGalleryPlugin } from "flickrgallery";
import "flickrgallery/dist/style.css";

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
// WICHTIG: Pinia an das Plugin übergeben
app.use(FlickrGalleryPlugin, { pinia })
app.mount('#app')
```

App.vue
```
<template>
        <FlickrGallery
            title="All images of a specific user"
            user-id="_user_id"
            photoset-id=""
            api-key="_api_key"
            tags=""
            method="flickr.photos.search"
            extras="url_m,url_l,owner_name"
            per-page="24"
        />
</template>

<script>
...
</script>
```

Notes
- `per-page` (Number, default: 18) steuert die pro Seite geladenen Bilder. Maximal werden 500 akzeptiert.