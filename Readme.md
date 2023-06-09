# FlickrGallery

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