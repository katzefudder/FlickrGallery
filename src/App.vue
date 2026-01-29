<template>
  <h1>FlickrGallery</h1>
  <FlickrGallery title="All images from an album (photoset)" user-id="60401789@N06" photoset-id="72157715858835617" tags="" api-key="50b2c88d16b7d6765f8c2f9b9bce844f" method="flickr.photosets.getPhotos"></FlickrGallery>
  <FlickrGallery title="Flickr Gallery from tags of a specific user" user-id="60401789@N06" photoset-id="" api-key="50b2c88d16b7d6765f8c2f9b9bce844f" method="flickr.photos.search" tags="website"></FlickrGallery>
  <FlickrGallery :perPage="1" title="just show a single photo" user-id="60401789@N06" photoset-id="" api-key="50b2c88d16b7d6765f8c2f9b9bce844f" method="flickr.photos.search" tags="website"></FlickrGallery>
  <FlickrGallery :perPage="4" :import-css="false" title="no imported css" user-id="60401789@N06" photoset-id="" api-key="50b2c88d16b7d6765f8c2f9b9bce844f" method="flickr.photos.search" tags="website"></FlickrGallery>
  <FlickrGallery :enable-lightbox="false" :perPage="4" :import-css="true" title="disabled lightbox" user-id="60401789@N06" photoset-id="" api-key="50b2c88d16b7d6765f8c2f9b9bce844f" method="flickr.photos.search" tags="website"></FlickrGallery>
</template>

<script>
import FlickrGallery from "@/components/FlickrGallery.vue";

export default {
  name: 'FlickrGalleryApp',
  components: {FlickrGallery},
};
</script>