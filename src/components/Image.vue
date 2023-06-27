<template>
  <!-- Image begin -->
  <a
      :key="key"
      :href="image.largeURL"
      :data-pswp-width="image.width"
      :data-pswp-height="image.height"
      :alt="image.alt"
      target="_blank"
      rel="noreferrer"
  >
    <span class="hidden-caption-content">{{image.alt}}</span>
    <img class="zoom"
         :src="image.thumbnailURL"
         alt=""
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
    key: String,
    image: Object
  },
  data() {
    return {
      imageEnlarged: false,
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