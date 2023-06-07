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
    <img class="zoom" :src="image.thumbnailURL" alt="" />
  </a>
  <!-- Image end -->
</template>

<script>
export default {
  props: {
    key: String,
    image: Object
  }
}
</script>