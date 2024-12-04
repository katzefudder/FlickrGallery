<template>
  <!-- Image begin -->
  <a
      class="pswp-gallery__item"
      :href="image.largeURL"
      :data-pswp-width="image.width"
      :data-pswp-height="image.height"
      target="_blank"
      rel="noreferrer"
  >
    <span class="hidden-caption-content" v-html="imageDescription"></span>
    <img
         :src="image.thumbnailURL"
         :alt="image.description"
         @mouseover="enlargeImage"
         @mouseout="shrinkImage"
         :class="{
          'img-default-size': true,
          'img-enlarged-size': imageEnlarged,
        }"
    />
  </a>
  <!-- Image end -->
</template>

<script>
export default {
  name: "Image",
  props: {
    image: Object
  },
  data() {
    return {
      imageEnlarged: false,
      imageDescription: "<b>" + this.image.title + "</b><br> " + this.image.description
    };
  },
  methods: {
    enlargeImage() {
      this.imageEnlarged = true;
    },
    shrinkImage() {
      this.imageEnlarged = false;
    },
  },
}
</script>