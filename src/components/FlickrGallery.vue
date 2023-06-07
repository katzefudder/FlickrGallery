<template>
  <!-- Gallery begin -->
  <div id="flickrgallery">
    <div class="container">
      <div class="col-md-12">
        <h3>{{ title ? title : "Selected Photos"}}</h3>
        <div :id="galleryID">
          <span v-for="(image) in photos">
            <Image :image="image"></Image>
          </span>
        </div>
      </div>
    </div>
    <div class="row" v-if="useNavigation">
      <div class="col-lg-12">
        <button
            class="px-4 py-2 text-white bg-red-600 focus:outline-none"
            @click="previousPage"
            @keyup.right="previousPage"
        >
          Previous Page
        </button>
        <button
            class="px-4 py-2 text-white bg-red-600 focus:outline-none"
            @click="nextPage"
            @keyup.right="nextPage"
        >
          Next Page
        </button>
      </div>
    </div>
  </div>
  <!-- Gallery end -->
</template>

<script>
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import axios from "axios";
import Image from "./Image.vue";

export default {
  name: 'FlickrGallery',
  components: {Image},
  props: {
    title: String,
    useNavigation: Boolean,
    apiKey: String,
    userId: String,
    method: String,
    photosetId: String,
    tags: String,
    extras: String
  },
  data: () => ({
    galleryID: "flickr",
    endpoint: "https://www.flickr.com/services/rest/",
    page: 1,
    perPage: 18,
    totalPictures: 0,
    totalPages: 0,
    flickrGallery: [],

    loading: false,
    photos: [],
  }),
  mounted() {
    this.photos = this.showFlickrGallery()
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
  unmounted() {
    if (this.lightbox) {
      this.lightbox.destroy();
      this.lightbox = null;
    }
  },
  methods: {
    async showFlickrGallery(page) {
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
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page++
        this.showFlickrGallery()
      }
    },
    previousPage() {
      if (this.page > 1) {
        this.page--
        this.showFlickrGallery()
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
