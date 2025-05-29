<template>
  <!-- Image begin -->
  <a
      class="pswp-gallery__item"
      :href="image.url_l || image.url_m"
      :data-pswp-width="image.width_l || image.width_m"
      :data-pswp-height="image.height_l || image.height_m"
      target="_blank"
      rel="noreferrer"
  >
    <span class="hidden-caption-content" v-html="imageDescription"></span>
    <img
         :src="image.url_m"
         :alt="image.title"
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
    image: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      imageEnlarged: false,
      imageDescription: `<b>${this.image.title}</b><br>${this.image.description? (this.image.description._content || this.image.description) : ''}`
    };
  },
  watch: {
    image: {
      handler(newVal) {
        this.imageDescription = `<b>${newVal.title}</b><br>${newVal.description? (newVal.description._content || newVal.description) : ''}`;
      },
      immediate: true,
      deep: true
    }
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