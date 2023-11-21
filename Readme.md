# FlickrGallery

A project that was started to fulfil my own needs with a flickr gallery for my website/portfolio [katzefudder.de](https://www.katzefudder.de)
See [https://katzefudder.github.io/FlickrGallery/](https://katzefudder.github.io/FlickrGallery/) for a demo.
## Usage

main.js

```
import { createApp } from 'vue'
import App from './App.vue'

import {FlickrGalleryPlugin} from "flickrgallery";
import "flickrgallery/dist/style.css";

createApp(App)
    .use(FlickrGalleryPlugin)
```

App.vue
``` 
<template>
    <FlickrGallery title="All images of a specific user" user-id="_user_id" photoset-id="" api-key="_api_key" tags=""  method="flickr.photos.search" extras="url_m,url_l,owner_name"></FlickrGallery>
</template>

<script>
...
</script>
```