<template>
  <FlickrGallery :use-navigation="true" title="All images of a specific user with navigation" user-id="60401789%40N06" photoset-id="" tags="" api-key="50b2c88d16b7d6765f8c2f9b9bce844f" method="flickr.photos.search" extras="url_m,url_l,owner_name"></FlickrGallery>
  <FlickrGallery title="All images from an album (photoset)" user-id="60401789%40N06" photoset-id="72157715858835617" tags="" api-key="50b2c88d16b7d6765f8c2f9b9bce844f" method="flickr.photosets.getPhotos" extras="url_m,url_l,owner_name"></FlickrGallery>
  <FlickrGallery title="Flickr Gallery from tags of a specific user" user-id="60401789@N06" photoset-id="" api-key="50b2c88d16b7d6765f8c2f9b9bce844f" method="flickr.photos.search" tags="website" extras="url_m,url_l,owner_name"></FlickrGallery>
</template>

<script>
import FlickrGallery from "@/components/FlickrGallery.vue";

export default {
  name: 'FlickrGalleryApp',
  components: {FlickrGallery},
};
</script>