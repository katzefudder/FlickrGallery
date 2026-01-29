<template>
  <!-- Image begin -->
  <a v-if="enableLightbox"
      class="pswp-gallery__item"
      :href="image.url_l || image.url_m"
      :data-pswp-width="image.width_l || image.width_m"
      :data-pswp-height="image.height_l || image.height_m"
      target="_blank"
      rel="noopener noreferrer"
  >
    <span class="hidden-caption-content" v-html="sanitizedDescription"></span>
    <img
          :src="image.url_m || image.url_l"
         :alt="image.title"
         @mouseover="enlargeImage"
         @mouseout="shrinkImage"
         loading="lazy"
         decoding="async"
         :class="{
          'img-default-size': true,
          'img-enlarged-size': imageEnlarged,
        }"
    />
  </a>
  <div v-else>
    <span class="hidden-caption-content" v-html="sanitizedDescription"></span>
    <img
         :src="image.url_m || image.url_l"
         :alt="image.title"
         @mouseover="enlargeImage"
         @mouseout="shrinkImage"
         loading="lazy"
         decoding="async"
         :class="{
          'img-default-size': true,
          'img-enlarged-size': imageEnlarged,
        }"
    />
  </div>
  <!-- Image end -->
</template>

<script>
import DOMPurify from 'dompurify';
export default {
  name: "Image",
  props: {
    image: {
      type: Object,
      required: true
    },
    enableLightbox: { type: Boolean, default: true }
  },
  data() {
    return {
      imageEnlarged: false,
    };
  },
  computed: {
    descriptionHtml() {
      const title = this.image?.title || '';
      const descRaw = this.image?.description ? (this.image.description._content || this.image.description) : '';
      return `<b>${title}</b><br>${descRaw}`;
    },
    sanitizedDescription() {
      return DOMPurify.sanitize(this.descriptionHtml, { USE_PROFILES: { html: true } });
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