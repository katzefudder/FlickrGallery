<template>
  <!-- Gallery begin -->
    <div :id="galleryID" >
      <Transition name="fade">
        <div v-if="!loading" :style="flickrLoadingStyle" class="flickr-container" ref="flickr-container">
          <h2 v-if="title">{{ title }}</h2>
            <div class="flickr-images">
              <span v-for="(image, idx) in photos" :key="image.id || idx">
                <Image :image="image"></Image>
              </span>
            </div>
        </div>
      </Transition>
      <div v-if="useNavigation" class="flickr-navigation">
        <span class="prev">
          <button
              @click="previousPage"
              @keyup.right="previousPage"
          >
            &lt;&lt;
          </button>
        </span>
        <span class="current">
          <button
              @click=""
          >
            Page {{page}}/{{totalPages}}
          </button>
        </span>
        <span class="next">
          <button
              @click="nextPage"
              @keyup.right="nextPage"
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
import 'photoswipe/style.css';
import '../assets/flickrgallery.css'
import { useFlickrStore } from '../stores/flickr';
import Image from "./Image.vue";

export default {
  name: 'FlickrGallery',
  components: {Image},
  props: {
    title: String,
    useNavigation: Boolean,
    showPage: Boolean,
    apiKey: { type: String, required: true },
    userId: { type: String, required: true },
    method: String,
    photosetId: String,
    tags: String,
    extras: String,
  },
  data: () => ({
    galleryID: "flickr",
    endpoint: "https://www.flickr.com/services/rest/",
    page: 1,
    perPage: 18,
    totalPictures: 0,
    totalPages: 0,
    defaultExtras: 'url_m,url_l,owner_name,description', // https://www.flickr.com/services/api/flickr.photos.search.html
    flickrGallery: [],
    flickrLoadingStyle: null,
    loading: false,
    photos: [],
    flickrStore: null,
  }),
  async beforeMount() {
    const uid = 'flickr-' + this.$.uid;
    this.galleryID = this.galleryContainer ?? this.galleryID + "-" + this.$.uid;
    this.flickrStore = useFlickrStore(uid);
    if (this.extras != null) {
      this.defaultExtras = this.extras;
    }
    // Lade Fotos erst, wenn flickrStore gesetzt ist
    await this.loadFlickrPhotos();
  },
  mounted() {
    this.initLightbox();
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
                    console.debug(currSlideElement)
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
        const url = this.endpoint + "?method=" + this.method + "&api_key=" + this.apiKey + "&tags=" + this.tags + "&user_id=" + this.userId + "&photoset_id=" + this.photosetId + "&format=json&page=" + this.page + "&per_page=" + this.perPage + "&extras=" + this.defaultExtras + "&nojsoncallback=1"
        await this.flickrStore.fetchPhotos(url, this.page);
        this.photos = this.flickrStore.photos;
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
