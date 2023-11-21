<template>
  <!-- Gallery begin -->
    <div :id="galleryID" >
      <Transition name="fade">
        <div v-if="!loading" :style="flickrLoadingStyle" class="flickr-container" ref="flickr-container">
          <h2>{{ title ? title : "Selected Photos"}}</h2>
            <div class="flickr-images">
              <span v-for="(image) in photos">
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
            Seite {{page}}/{{totalPages}}
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
import axios from "axios";
import Image from "./Image.vue";

export default {
  name: 'FlickrGallery',
  components: {Image},
  props: {
    galleryContainer: "flickr",
    title: String,
    useNavigation: Boolean,
    showPage: Boolean,
    apiKey: String,
    userId: String,
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
    flickrGallery: [],
    flickrLoadingStyle: null,
    loading: false,
    photos: [],
  }),
  beforeMount() {
    this.photos = this.loadFlickrPhotos()
    if (this.galleryContainer != null) {
      this.galleryID = this.galleryContainer
    } else {
      this.galleryID = this.galleryID+"-"+this.$.uid
    }
  },
  mounted() {
    this.initLightbox()
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
        children:'a',
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
        this.lightbox = lightbox
      }
    },
    async loadFlickrPhotos(page) {
      this.loading = true;
      const url = this.endpoint + "?method=" + this.method + "&api_key=" + this.apiKey + "&tags=" + this.tags + "&user_id=" + this.userId + "&photoset_id=" + this.photosetId + "&format=json&page=" + this.page + "&per_page=" + this.perPage + "&extras=" + this.extras + "&nojsoncallback=1"
      const data = {};
      await axios.get(url, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(({data}) => {
        let photos = []
        if (this.method == "flickr.photosets.getPhotos") {
          this.totalPictures = data.photoset.total
          this.totalPages = data.photoset.pages
          data.photoset.photo.forEach(function (current, index) {
            photos[index] = {
              "largeURL": current.url_l,
              "thumbnailURL": current.url_m,
              "title": current.title,
              "alt": current.title,
              "width": current.width_l,
              "height": current.height_l
            }
          })
        } else if (this.method == "flickr.photos.search") {
          this.totalPictures = data.photos.total
          this.totalPages = data.photos.pages
          data.photos.photo.forEach(function (current, index) {
            photos[index] = {
              "largeURL": current.url_l,
              "thumbnailURL": current.url_m,
              "title": current.title,
              "alt": current.title,
              "width": current.width_l,
              "height": current.height_l
            }
          })
        }
        this.photos = photos
      });
      this.loading = false;
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
  },
  async created() {
    if (this.title === undefined) {
      this.title = "Selected Photos"
    }
  }
};
</script>
