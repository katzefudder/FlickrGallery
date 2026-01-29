<template>
  <!-- Gallery begin -->
    <div :id="galleryID" >
      <Transition name="fade">
        <div class="flickr-container" ref="flickr-container">
          <h2 v-if="title">{{ title }}</h2>
            <div v-if="flickrStore.error" class="flickr-error" role="alert">
              <strong>Fehler:</strong> {{ flickrStore.error }}
              <button class="flickr-retry" @click="loadFlickrPhotos" aria-label="Erneut laden">Erneut laden</button>
            </div>
            <div v-else-if="flickrStore.loading" class="flickr-loading" aria-busy="true" aria-live="polite">
              <span class="spinner" aria-hidden="true"></span>
              <span class="loading-text">Lade Bilder…</span>
            </div>
            <div v-else class="flickr-images">
              <span v-for="(image, idx) in flickrStore.photos" :key="image.id ?? idx">
                <Image :image="image" :enableLightbox="enableLightbox"></Image>
              </span>
            </div>
        </div>
      </Transition>
      <div v-if="useNavigation" class="flickr-navigation">
        <span class="prev">
          <button
              @click="previousPage"
              @keyup.left="previousPage"
              aria-label="Vorherige Seite"
          >
            &lt;&lt;
          </button>
        </span>
        <span class="current" v-if="showPage">
          <span aria-live="polite">Page {{page}}/{{totalPages}}</span>
        </span>
        <span class="next">
          <button
              @click="nextPage"
              @keyup.right="nextPage"
              aria-label="Nächste Seite"
          >
            &gt;&gt;
          </button>
        </span>
      </div>
    </div>
  <!-- Gallery end -->
</template>

<script>
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { useFlickrStore } from '../stores/flickr';
import Image from "./Image.vue";

export default {
  name: 'FlickrGallery',
  components: {Image},
  props: {
    title: String,
    useNavigation: { type: Boolean, default: true },
    showPage: { type: Boolean, default: true },
    apiKey: { type: String, required: true },
    userId: { type: String, required: true },
    method: { type: String, default: 'flickr.photos.search' },
    photosetId: { type: String, default: '' },
    tags: { type: String, default: '' },
    extras: { type: String, default: '' },
    perPage: { type: Number, default: 18 },
    importCss: { type: Boolean, default: true },
    enableLightbox: { type: Boolean, default: true },
  },
  data: () => ({
    galleryID: "flickr",
    endpoint: "https://www.flickr.com/services/rest/",
    page: 1,
    totalPictures: 0,
    totalPages: 0,
    defaultExtras: 'url_m,url_l,owner_name,description', // https://www.flickr.com/services/api/flickr.photos.search.html
    loading: false,
    flickrStore: null,
  }),
  async beforeMount() {
    const uid = 'flickr-' + this.$.uid;
    this.galleryID = this.galleryID + "-" + this.$.uid;
    this.flickrStore = useFlickrStore(uid);
    console.debug('importiere css:', this.importCss);
    if (this.importCss) {
      try {
        const cssImports = [import('../assets/flickrgallery.css')];
        if (this.enableLightbox) {
          cssImports.push(import('photoswipe/style.css'));
        }
        await Promise.all(cssImports);
      } catch (e) {
        console.error('CSS konnte nicht geladen werden:', e);
      }
    }
    if (this.extras) {
      this.defaultExtras = this.extras;
    }
    await this.loadFlickrPhotos();
  },
  mounted() {
    if (this.enableLightbox) {
      this.initLightbox();
    }
  },
  watch: {

  },
  unmounted() {
    if (this.lightbox) {
      this.lightbox.destroy();
      this.lightbox = null;
    }
  },
  methods: {
    initLightbox(){
      const options = {
        gallery: '#' + this.galleryID,
        children:'.pswp-gallery__item',
        pswpModule: () => import('photoswipe'),
      };
      if (!this.lightbox) {
        const lightbox = new PhotoSwipeLightbox(options);
        lightbox.on('uiRegister', function() {
          lightbox.pswp.ui.registerElement({
            name: 'custom-caption',
            order: 9,
            isButton: false,
            appendTo: 'root',
            html: 'Caption text',
            onInit: (el) => {
              lightbox.pswp.on('change', () => {
                const currSlideElement = lightbox.pswp.currSlide.data.element;
                let captionHTML = '';
                if (currSlideElement) {
                  const hiddenCaption = currSlideElement.querySelector('.hidden-caption-content');
                  if (hiddenCaption) {
                    // get caption from element with class hidden-caption-content
                    captionHTML = hiddenCaption.innerHTML;
                  } else {
                    // get caption from alt attribute
                    captionHTML = currSlideElement.querySelector('img').getAttribute('alt');
                  }
                }
                el.innerHTML = captionHTML || '';
              });
            }
          });
        });
        lightbox.init();
this.lightbox = lightbox;
      }
    },
    async loadFlickrPhotos() {
      this.loading = true;
      try {
        const params = new URLSearchParams();
        params.set('method', this.method);
        params.set('api_key', this.apiKey);
        if (this.tags) params.set('tags', this.tags);
        if (this.userId) params.set('user_id', this.userId);
        if (this.photosetId) params.set('photoset_id', this.photosetId);
        params.set('format', 'json');
        params.set('page', String(this.page));
        const perPageVal = Number.isFinite(this.perPage) && this.perPage > 0 ? Math.min(this.perPage, 500) : 18;
        params.set('per_page', String(perPageVal));
        params.set('extras', this.defaultExtras);
        params.set('nojsoncallback', '1');
        const url = `${this.endpoint}?${params.toString()}`;
        await this.flickrStore.fetchPhotos(url);
        this.totalPages = this.flickrStore.totalPages;
        this.totalPictures = this.flickrStore.totalPictures;
        this.loading = this.flickrStore.loading;
      } catch (e) {
        console.error('Fehler beim Laden der Flickr-Fotos:', e);
        this.loading = false;
      }
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page++
        this.loadFlickrPhotos()
      }
    },
    previousPage() {
      if (this.page > 1) {
        this.page--
        this.loadFlickrPhotos()
      }
    },
  }
};
</script>
