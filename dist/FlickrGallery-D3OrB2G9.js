import { openBlock as N, createElementBlock as L, createElementVNode as O, toDisplayString as j, normalizeClass as Ye, resolveComponent as et, createVNode as fe, Transition as tt, withCtx as st, normalizeStyle as nt, Fragment as it, renderList as rt, createCommentVNode as pe, withKeys as me } from "vue";
/*!
  * PhotoSwipe Lightbox 5.4.3 - https://photoswipe.com
  * (c) 2023 Dmytro Semenov
  */
function k(t, e, s) {
  const n = document.createElement(e);
  return t && (n.className = t), s && s.appendChild(n), n;
}
function ot(t, e, s) {
  let n = `translate3d(${t}px,${e || 0}px,0)`;
  return s !== void 0 && (n += ` scale3d(${s},${s},1)`), n;
}
function te(t, e, s) {
  t.style.width = typeof e == "number" ? `${e}px` : e, t.style.height = typeof s == "number" ? `${s}px` : s;
}
const b = {
  IDLE: "idle",
  LOADING: "loading",
  LOADED: "loaded",
  ERROR: "error"
};
function at(t) {
  return "button" in t && t.button === 1 || t.ctrlKey || t.metaKey || t.altKey || t.shiftKey;
}
function F(t, e, s = document) {
  let n = [];
  if (t instanceof Element)
    n = [t];
  else if (t instanceof NodeList || Array.isArray(t))
    n = Array.from(t);
  else {
    const i = typeof t == "string" ? t : e;
    i && (n = Array.from(s.querySelectorAll(i)));
  }
  return n;
}
function lt(t) {
  return typeof t == "function" && t.prototype && t.prototype.goTo;
}
function ye() {
  return !!(navigator.vendor && navigator.vendor.match(/apple/i));
}
class ct {
  /**
   * @param {T} type
   * @param {PhotoSwipeEventsMap[T]} [details]
   */
  constructor(e, s) {
    this.type = e, this.defaultPrevented = !1, s && Object.assign(this, s);
  }
  preventDefault() {
    this.defaultPrevented = !0;
  }
}
class ht {
  constructor() {
    this._listeners = {}, this._filters = {}, this.pswp = void 0, this.options = void 0;
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   * @param {number} priority
   */
  addFilter(e, s, n = 100) {
    var i, r, o;
    this._filters[e] || (this._filters[e] = []), (i = this._filters[e]) === null || i === void 0 || i.push({
      fn: s,
      priority: n
    }), (r = this._filters[e]) === null || r === void 0 || r.sort((l, f) => l.priority - f.priority), (o = this.pswp) === null || o === void 0 || o.addFilter(e, s, n);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   */
  removeFilter(e, s) {
    this._filters[e] && (this._filters[e] = this._filters[e].filter((n) => n.fn !== s)), this.pswp && this.pswp.removeFilter(e, s);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {Parameters<PhotoSwipeFiltersMap[T]>} args
   * @returns {Parameters<PhotoSwipeFiltersMap[T]>[0]}
   */
  applyFilters(e, ...s) {
    var n;
    return (n = this._filters[e]) === null || n === void 0 || n.forEach((i) => {
      s[0] = i.fn.apply(this, s);
    }), s[0];
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  on(e, s) {
    var n, i;
    this._listeners[e] || (this._listeners[e] = []), (n = this._listeners[e]) === null || n === void 0 || n.push(s), (i = this.pswp) === null || i === void 0 || i.on(e, s);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  off(e, s) {
    var n;
    this._listeners[e] && (this._listeners[e] = this._listeners[e].filter((i) => s !== i)), (n = this.pswp) === null || n === void 0 || n.off(e, s);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {PhotoSwipeEventsMap[T]} [details]
   * @returns {AugmentedEvent<T>}
   */
  dispatch(e, s) {
    var n;
    if (this.pswp)
      return this.pswp.dispatch(e, s);
    const i = (
      /** @type {AugmentedEvent<T>} */
      new ct(e, s)
    );
    return (n = this._listeners[e]) === null || n === void 0 || n.forEach((r) => {
      r.call(this, i);
    }), i;
  }
}
class dt {
  /**
   * @param {string | false} imageSrc
   * @param {HTMLElement} container
   */
  constructor(e, s) {
    if (this.element = k("pswp__img pswp__img--placeholder", e ? "img" : "div", s), e) {
      const n = (
        /** @type {HTMLImageElement} */
        this.element
      );
      n.decoding = "async", n.alt = "", n.src = e, n.setAttribute("role", "presentation");
    }
    this.element.setAttribute("aria-hidden", "true");
  }
  /**
   * @param {number} width
   * @param {number} height
   */
  setDisplayedSize(e, s) {
    this.element && (this.element.tagName === "IMG" ? (te(this.element, 250, "auto"), this.element.style.transformOrigin = "0 0", this.element.style.transform = ot(0, 0, e / 250)) : te(this.element, e, s));
  }
  destroy() {
    var e;
    (e = this.element) !== null && e !== void 0 && e.parentNode && this.element.remove(), this.element = null;
  }
}
class ut {
  /**
   * @param {SlideData} itemData Slide data
   * @param {PhotoSwipeBase} instance PhotoSwipe or PhotoSwipeLightbox instance
   * @param {number} index
   */
  constructor(e, s, n) {
    this.instance = s, this.data = e, this.index = n, this.element = void 0, this.placeholder = void 0, this.slide = void 0, this.displayedImageWidth = 0, this.displayedImageHeight = 0, this.width = Number(this.data.w) || Number(this.data.width) || 0, this.height = Number(this.data.h) || Number(this.data.height) || 0, this.isAttached = !1, this.hasSlide = !1, this.isDecoding = !1, this.state = b.IDLE, this.data.type ? this.type = this.data.type : this.data.src ? this.type = "image" : this.type = "html", this.instance.dispatch("contentInit", {
      content: this
    });
  }
  removePlaceholder() {
    this.placeholder && !this.keepPlaceholder() && setTimeout(() => {
      this.placeholder && (this.placeholder.destroy(), this.placeholder = void 0);
    }, 1e3);
  }
  /**
   * Preload content
   *
   * @param {boolean} isLazy
   * @param {boolean} [reload]
   */
  load(e, s) {
    if (this.slide && this.usePlaceholder())
      if (this.placeholder) {
        const n = this.placeholder.element;
        n && !n.parentElement && this.slide.container.prepend(n);
      } else {
        const n = this.instance.applyFilters(
          "placeholderSrc",
          // use  image-based placeholder only for the first slide,
          // as rendering (even small stretched thumbnail) is an expensive operation
          this.data.msrc && this.slide.isFirstSlide ? this.data.msrc : !1,
          this
        );
        this.placeholder = new dt(n, this.slide.container);
      }
    this.element && !s || this.instance.dispatch("contentLoad", {
      content: this,
      isLazy: e
    }).defaultPrevented || (this.isImageContent() ? (this.element = k("pswp__img", "img"), this.displayedImageWidth && this.loadImage(e)) : (this.element = k("pswp__content", "div"), this.element.innerHTML = this.data.html || ""), s && this.slide && this.slide.updateContentSize(!0));
  }
  /**
   * Preload image
   *
   * @param {boolean} isLazy
   */
  loadImage(e) {
    var s, n;
    if (!this.isImageContent() || !this.element || this.instance.dispatch("contentLoadImage", {
      content: this,
      isLazy: e
    }).defaultPrevented)
      return;
    const i = (
      /** @type HTMLImageElement */
      this.element
    );
    this.updateSrcsetSizes(), this.data.srcset && (i.srcset = this.data.srcset), i.src = (s = this.data.src) !== null && s !== void 0 ? s : "", i.alt = (n = this.data.alt) !== null && n !== void 0 ? n : "", this.state = b.LOADING, i.complete ? this.onLoaded() : (i.onload = () => {
      this.onLoaded();
    }, i.onerror = () => {
      this.onError();
    });
  }
  /**
   * Assign slide to content
   *
   * @param {Slide} slide
   */
  setSlide(e) {
    this.slide = e, this.hasSlide = !0, this.instance = e.pswp;
  }
  /**
   * Content load success handler
   */
  onLoaded() {
    this.state = b.LOADED, this.slide && this.element && (this.instance.dispatch("loadComplete", {
      slide: this.slide,
      content: this
    }), this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode && (this.append(), this.slide.updateContentSize(!0)), (this.state === b.LOADED || this.state === b.ERROR) && this.removePlaceholder());
  }
  /**
   * Content load error handler
   */
  onError() {
    this.state = b.ERROR, this.slide && (this.displayError(), this.instance.dispatch("loadComplete", {
      slide: this.slide,
      isError: !0,
      content: this
    }), this.instance.dispatch("loadError", {
      slide: this.slide,
      content: this
    }));
  }
  /**
   * @returns {Boolean} If the content is currently loading
   */
  isLoading() {
    return this.instance.applyFilters("isContentLoading", this.state === b.LOADING, this);
  }
  /**
   * @returns {Boolean} If the content is in error state
   */
  isError() {
    return this.state === b.ERROR;
  }
  /**
   * @returns {boolean} If the content is image
   */
  isImageContent() {
    return this.type === "image";
  }
  /**
   * Update content size
   *
   * @param {Number} width
   * @param {Number} height
   */
  setDisplayedSize(e, s) {
    if (this.element && (this.placeholder && this.placeholder.setDisplayedSize(e, s), !this.instance.dispatch("contentResize", {
      content: this,
      width: e,
      height: s
    }).defaultPrevented && (te(this.element, e, s), this.isImageContent() && !this.isError()))) {
      const n = !this.displayedImageWidth && e;
      this.displayedImageWidth = e, this.displayedImageHeight = s, n ? this.loadImage(!1) : this.updateSrcsetSizes(), this.slide && this.instance.dispatch("imageSizeChange", {
        slide: this.slide,
        width: e,
        height: s,
        content: this
      });
    }
  }
  /**
   * @returns {boolean} If the content can be zoomed
   */
  isZoomable() {
    return this.instance.applyFilters("isContentZoomable", this.isImageContent() && this.state !== b.ERROR, this);
  }
  /**
   * Update image srcset sizes attribute based on width and height
   */
  updateSrcsetSizes() {
    if (!this.isImageContent() || !this.element || !this.data.srcset)
      return;
    const e = (
      /** @type HTMLImageElement */
      this.element
    ), s = this.instance.applyFilters("srcsetSizesWidth", this.displayedImageWidth, this);
    (!e.dataset.largestUsedSize || s > parseInt(e.dataset.largestUsedSize, 10)) && (e.sizes = s + "px", e.dataset.largestUsedSize = String(s));
  }
  /**
   * @returns {boolean} If content should use a placeholder (from msrc by default)
   */
  usePlaceholder() {
    return this.instance.applyFilters("useContentPlaceholder", this.isImageContent(), this);
  }
  /**
   * Preload content with lazy-loading param
   */
  lazyLoad() {
    this.instance.dispatch("contentLazyLoad", {
      content: this
    }).defaultPrevented || this.load(!0);
  }
  /**
   * @returns {boolean} If placeholder should be kept after content is loaded
   */
  keepPlaceholder() {
    return this.instance.applyFilters("isKeepingPlaceholder", this.isLoading(), this);
  }
  /**
   * Destroy the content
   */
  destroy() {
    this.hasSlide = !1, this.slide = void 0, !this.instance.dispatch("contentDestroy", {
      content: this
    }).defaultPrevented && (this.remove(), this.placeholder && (this.placeholder.destroy(), this.placeholder = void 0), this.isImageContent() && this.element && (this.element.onload = null, this.element.onerror = null, this.element = void 0));
  }
  /**
   * Display error message
   */
  displayError() {
    if (this.slide) {
      var e, s;
      let n = k("pswp__error-msg", "div");
      n.innerText = (e = (s = this.instance.options) === null || s === void 0 ? void 0 : s.errorMsg) !== null && e !== void 0 ? e : "", n = /** @type {HTMLDivElement} */
      this.instance.applyFilters("contentErrorElement", n, this), this.element = k("pswp__content pswp__error-msg-container", "div"), this.element.appendChild(n), this.slide.container.innerText = "", this.slide.container.appendChild(this.element), this.slide.updateContentSize(!0), this.removePlaceholder();
    }
  }
  /**
   * Append the content
   */
  append() {
    if (this.isAttached || !this.element)
      return;
    if (this.isAttached = !0, this.state === b.ERROR) {
      this.displayError();
      return;
    }
    if (this.instance.dispatch("contentAppend", {
      content: this
    }).defaultPrevented)
      return;
    const e = "decode" in this.element;
    this.isImageContent() ? e && this.slide && (!this.slide.isActive || ye()) ? (this.isDecoding = !0, this.element.decode().catch(() => {
    }).finally(() => {
      this.isDecoding = !1, this.appendImage();
    })) : this.appendImage() : this.slide && !this.element.parentNode && this.slide.container.appendChild(this.element);
  }
  /**
   * Activate the slide,
   * active slide is generally the current one,
   * meaning the user can see it.
   */
  activate() {
    this.instance.dispatch("contentActivate", {
      content: this
    }).defaultPrevented || !this.slide || (this.isImageContent() && this.isDecoding && !ye() ? this.appendImage() : this.isError() && this.load(!1, !0), this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "false"));
  }
  /**
   * Deactivate the content
   */
  deactivate() {
    this.instance.dispatch("contentDeactivate", {
      content: this
    }), this.slide && this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "true");
  }
  /**
   * Remove the content from DOM
   */
  remove() {
    this.isAttached = !1, !this.instance.dispatch("contentRemove", {
      content: this
    }).defaultPrevented && (this.element && this.element.parentNode && this.element.remove(), this.placeholder && this.placeholder.element && this.placeholder.element.remove());
  }
  /**
   * Append the image content to slide container
   */
  appendImage() {
    this.isAttached && (this.instance.dispatch("contentAppendImage", {
      content: this
    }).defaultPrevented || (this.slide && this.element && !this.element.parentNode && this.slide.container.appendChild(this.element), (this.state === b.LOADED || this.state === b.ERROR) && this.removePlaceholder()));
  }
}
function ft(t, e) {
  if (t.getViewportSizeFn) {
    const s = t.getViewportSizeFn(t, e);
    if (s)
      return s;
  }
  return {
    x: document.documentElement.clientWidth,
    // TODO: height on mobile is very incosistent due to toolbar
    // find a way to improve this
    //
    // document.documentElement.clientHeight - doesn't seem to work well
    y: window.innerHeight
  };
}
function M(t, e, s, n, i) {
  let r = 0;
  if (e.paddingFn)
    r = e.paddingFn(s, n, i)[t];
  else if (e.padding)
    r = e.padding[t];
  else {
    const o = "padding" + t[0].toUpperCase() + t.slice(1);
    e[o] && (r = e[o]);
  }
  return Number(r) || 0;
}
function pt(t, e, s, n) {
  return {
    x: e.x - M("left", t, e, s, n) - M("right", t, e, s, n),
    y: e.y - M("top", t, e, s, n) - M("bottom", t, e, s, n)
  };
}
const ge = 4e3;
class mt {
  /**
   * @param {PhotoSwipeOptions} options PhotoSwipe options
   * @param {SlideData} itemData Slide data
   * @param {number} index Slide index
   * @param {PhotoSwipe} [pswp] PhotoSwipe instance, can be undefined if not initialized yet
   */
  constructor(e, s, n, i) {
    this.pswp = i, this.options = e, this.itemData = s, this.index = n, this.panAreaSize = null, this.elementSize = null, this.fit = 1, this.fill = 1, this.vFill = 1, this.initial = 1, this.secondary = 1, this.max = 1, this.min = 1;
  }
  /**
   * Calculate initial, secondary and maximum zoom level for the specified slide.
   *
   * It should be called when either image or viewport size changes.
   *
   * @param {number} maxWidth
   * @param {number} maxHeight
   * @param {Point} panAreaSize
   */
  update(e, s, n) {
    const i = {
      x: e,
      y: s
    };
    this.elementSize = i, this.panAreaSize = n;
    const r = n.x / i.x, o = n.y / i.y;
    this.fit = Math.min(1, r < o ? r : o), this.fill = Math.min(1, r > o ? r : o), this.vFill = Math.min(1, o), this.initial = this._getInitial(), this.secondary = this._getSecondary(), this.max = Math.max(this.initial, this.secondary, this._getMax()), this.min = Math.min(this.fit, this.initial, this.secondary), this.pswp && this.pswp.dispatch("zoomLevelsUpdate", {
      zoomLevels: this,
      slideData: this.itemData
    });
  }
  /**
   * Parses user-defined zoom option.
   *
   * @private
   * @param {'initial' | 'secondary' | 'max'} optionPrefix Zoom level option prefix (initial, secondary, max)
   * @returns { number | undefined }
   */
  _parseZoomLevelOption(e) {
    const s = (
      /** @type {'initialZoomLevel' | 'secondaryZoomLevel' | 'maxZoomLevel'} */
      e + "ZoomLevel"
    ), n = this.options[s];
    if (n)
      return typeof n == "function" ? n(this) : n === "fill" ? this.fill : n === "fit" ? this.fit : Number(n);
  }
  /**
   * Get zoom level to which image will be zoomed after double-tap gesture,
   * or when user clicks on zoom icon,
   * or mouse-click on image itself.
   * If you return 1 image will be zoomed to its original size.
   *
   * @private
   * @return {number}
   */
  _getSecondary() {
    let e = this._parseZoomLevelOption("secondary");
    return e || (e = Math.min(1, this.fit * 3), this.elementSize && e * this.elementSize.x > ge && (e = ge / this.elementSize.x), e);
  }
  /**
   * Get initial image zoom level.
   *
   * @private
   * @return {number}
   */
  _getInitial() {
    return this._parseZoomLevelOption("initial") || this.fit;
  }
  /**
   * Maximum zoom level when user zooms
   * via zoom/pinch gesture,
   * via cmd/ctrl-wheel or via trackpad.
   *
   * @private
   * @return {number}
   */
  _getMax() {
    return this._parseZoomLevelOption("max") || Math.max(1, this.fit * 4);
  }
}
function xe(t, e, s) {
  const n = e.createContentFromData(t, s);
  let i;
  const {
    options: r
  } = e;
  if (r) {
    i = new mt(r, t, -1);
    let o;
    e.pswp ? o = e.pswp.viewportSize : o = ft(r, e);
    const l = pt(r, o, t, s);
    i.update(n.width, n.height, l);
  }
  return n.lazyLoad(), i && n.setDisplayedSize(Math.ceil(n.width * i.initial), Math.ceil(n.height * i.initial)), n;
}
function yt(t, e) {
  const s = e.getItemData(t);
  if (!e.dispatch("lazyLoadSlide", {
    index: t,
    itemData: s
  }).defaultPrevented)
    return xe(s, e, t);
}
class gt extends ht {
  /**
   * Get total number of slides
   *
   * @returns {number}
   */
  getNumItems() {
    var e;
    let s = 0;
    const n = (e = this.options) === null || e === void 0 ? void 0 : e.dataSource;
    n && "length" in n ? s = n.length : n && "gallery" in n && (n.items || (n.items = this._getGalleryDOMElements(n.gallery)), n.items && (s = n.items.length));
    const i = this.dispatch("numItems", {
      dataSource: n,
      numItems: s
    });
    return this.applyFilters("numItems", i.numItems, n);
  }
  /**
   * @param {SlideData} slideData
   * @param {number} index
   * @returns {Content}
   */
  createContentFromData(e, s) {
    return new ut(e, this, s);
  }
  /**
   * Get item data by index.
   *
   * "item data" should contain normalized information that PhotoSwipe needs to generate a slide.
   * For example, it may contain properties like
   * `src`, `srcset`, `w`, `h`, which will be used to generate a slide with image.
   *
   * @param {number} index
   * @returns {SlideData}
   */
  getItemData(e) {
    var s;
    const n = (s = this.options) === null || s === void 0 ? void 0 : s.dataSource;
    let i = {};
    Array.isArray(n) ? i = n[e] : n && "gallery" in n && (n.items || (n.items = this._getGalleryDOMElements(n.gallery)), i = n.items[e]);
    let r = i;
    r instanceof Element && (r = this._domElementToItemData(r));
    const o = this.dispatch("itemData", {
      itemData: r || {},
      index: e
    });
    return this.applyFilters("itemData", o.itemData, e);
  }
  /**
   * Get array of gallery DOM elements,
   * based on childSelector and gallery element.
   *
   * @param {HTMLElement} galleryElement
   * @returns {HTMLElement[]}
   */
  _getGalleryDOMElements(e) {
    var s, n;
    return (s = this.options) !== null && s !== void 0 && s.children || (n = this.options) !== null && n !== void 0 && n.childSelector ? F(this.options.children, this.options.childSelector, e) || [] : [e];
  }
  /**
   * Converts DOM element to item data object.
   *
   * @param {HTMLElement} element DOM element
   * @returns {SlideData}
   */
  _domElementToItemData(e) {
    const s = {
      element: e
    }, n = (
      /** @type {HTMLAnchorElement} */
      e.tagName === "A" ? e : e.querySelector("a")
    );
    if (n) {
      s.src = n.dataset.pswpSrc || n.href, n.dataset.pswpSrcset && (s.srcset = n.dataset.pswpSrcset), s.width = n.dataset.pswpWidth ? parseInt(n.dataset.pswpWidth, 10) : 0, s.height = n.dataset.pswpHeight ? parseInt(n.dataset.pswpHeight, 10) : 0, s.w = s.width, s.h = s.height, n.dataset.pswpType && (s.type = n.dataset.pswpType);
      const r = e.querySelector("img");
      if (r) {
        var i;
        s.msrc = r.currentSrc || r.src, s.alt = (i = r.getAttribute("alt")) !== null && i !== void 0 ? i : "";
      }
      (n.dataset.pswpCropped || n.dataset.cropped) && (s.thumbCropped = !0);
    }
    return this.applyFilters("domItemData", s, e, n);
  }
  /**
   * Lazy-load by slide data
   *
   * @param {SlideData} itemData Data about the slide
   * @param {number} index
   * @returns {Content} Image that is being decoded or false.
   */
  lazyLoadData(e, s) {
    return xe(e, this, s);
  }
}
class wt extends gt {
  /**
   * @param {PhotoSwipeOptions} [options]
   */
  constructor(e) {
    super(), this.options = e || {}, this._uid = 0, this.shouldOpen = !1, this._preloadedContent = void 0, this.onThumbnailsClick = this.onThumbnailsClick.bind(this);
  }
  /**
   * Initialize lightbox, should be called only once.
   * It's not included in the main constructor, so you may bind events before it.
   */
  init() {
    F(this.options.gallery, this.options.gallerySelector).forEach((e) => {
      e.addEventListener("click", this.onThumbnailsClick, !1);
    });
  }
  /**
   * @param {MouseEvent} e
   */
  onThumbnailsClick(e) {
    if (at(e) || window.pswp)
      return;
    let s = {
      x: e.clientX,
      y: e.clientY
    };
    !s.x && !s.y && (s = null);
    let n = this.getClickedIndex(e);
    n = this.applyFilters("clickedIndex", n, e, this);
    const i = {
      gallery: (
        /** @type {HTMLElement} */
        e.currentTarget
      )
    };
    n >= 0 && (e.preventDefault(), this.loadAndOpen(n, i, s));
  }
  /**
   * Get index of gallery item that was clicked.
   *
   * @param {MouseEvent} e click event
   * @returns {number}
   */
  getClickedIndex(e) {
    if (this.options.getClickedIndexFn)
      return this.options.getClickedIndexFn.call(this, e);
    const s = (
      /** @type {HTMLElement} */
      e.target
    ), i = F(
      this.options.children,
      this.options.childSelector,
      /** @type {HTMLElement} */
      e.currentTarget
    ).findIndex((r) => r === s || r.contains(s));
    return i !== -1 ? i : this.options.children || this.options.childSelector ? -1 : 0;
  }
  /**
   * Load and open PhotoSwipe
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   * @param {Point | null} [initialPoint]
   * @returns {boolean}
   */
  loadAndOpen(e, s, n) {
    if (window.pswp || !this.options)
      return !1;
    if (!s && this.options.gallery && this.options.children) {
      const i = F(this.options.gallery);
      i[0] && (s = {
        gallery: i[0]
      });
    }
    return this.options.index = e, this.options.initialPointerPos = n, this.shouldOpen = !0, this.preload(e, s), !0;
  }
  /**
   * Load the main module and the slide content by index
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   */
  preload(e, s) {
    const {
      options: n
    } = this;
    s && (n.dataSource = s);
    const i = [], r = typeof n.pswpModule;
    if (lt(n.pswpModule))
      i.push(Promise.resolve(
        /** @type {Type<PhotoSwipe>} */
        n.pswpModule
      ));
    else {
      if (r === "string")
        throw new Error("pswpModule as string is no longer supported");
      if (r === "function")
        i.push(
          /** @type {() => Promise<Type<PhotoSwipe>>} */
          n.pswpModule()
        );
      else
        throw new Error("pswpModule is not valid");
    }
    typeof n.openPromise == "function" && i.push(n.openPromise()), n.preloadFirstSlide !== !1 && e >= 0 && (this._preloadedContent = yt(e, this));
    const o = ++this._uid;
    Promise.all(i).then((l) => {
      if (this.shouldOpen) {
        const f = l[0];
        this._openPhotoswipe(f, o);
      }
    });
  }
  /**
   * @private
   * @param {Type<PhotoSwipe> | { default: Type<PhotoSwipe> }} module
   * @param {number} uid
   */
  _openPhotoswipe(e, s) {
    if (s !== this._uid && this.shouldOpen || (this.shouldOpen = !1, window.pswp))
      return;
    const n = typeof e == "object" ? new e.default(this.options) : new e(this.options);
    this.pswp = n, window.pswp = n, Object.keys(this._listeners).forEach((i) => {
      var r;
      (r = this._listeners[i]) === null || r === void 0 || r.forEach((o) => {
        n.on(
          i,
          /** @type {EventCallback<typeof name>} */
          o
        );
      });
    }), Object.keys(this._filters).forEach((i) => {
      var r;
      (r = this._filters[i]) === null || r === void 0 || r.forEach((o) => {
        n.addFilter(i, o.fn, o.priority);
      });
    }), this._preloadedContent && (n.contentLoader.addToCache(this._preloadedContent), this._preloadedContent = void 0), n.on("destroy", () => {
      this.pswp = void 0, delete window.pswp;
    }), n.init();
  }
  /**
   * Unbinds all events, closes PhotoSwipe if it's open.
   */
  destroy() {
    var e;
    (e = this.pswp) === null || e === void 0 || e.destroy(), this.shouldOpen = !1, this._listeners = {}, F(this.options.gallery, this.options.gallerySelector).forEach((s) => {
      s.removeEventListener("click", this.onThumbnailsClick, !1);
    });
  }
}
function Ne(t, e) {
  return function() {
    return t.apply(e, arguments);
  };
}
const { toString: Et } = Object.prototype, { getPrototypeOf: ae } = Object, W = /* @__PURE__ */ ((t) => (e) => {
  const s = Et.call(e);
  return t[s] || (t[s] = s.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), A = (t) => (t = t.toLowerCase(), (e) => W(e) === t), J = (t) => (e) => typeof e === t, { isArray: D } = Array, U = J("undefined");
function St(t) {
  return t !== null && !U(t) && t.constructor !== null && !U(t.constructor) && _(t.constructor.isBuffer) && t.constructor.isBuffer(t);
}
const Le = A("ArrayBuffer");
function bt(t) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && Le(t.buffer), e;
}
const _t = J("string"), _ = J("function"), Ie = J("number"), K = (t) => t !== null && typeof t == "object", Ot = (t) => t === !0 || t === !1, H = (t) => {
  if (W(t) !== "object")
    return !1;
  const e = ae(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}, Rt = A("Date"), At = A("File"), Pt = A("Blob"), Ct = A("FileList"), Tt = (t) => K(t) && _(t.pipe), xt = (t) => {
  let e;
  return t && (typeof FormData == "function" && t instanceof FormData || _(t.append) && ((e = W(t)) === "formdata" || // detect form-data instance
  e === "object" && _(t.toString) && t.toString() === "[object FormData]"));
}, Nt = A("URLSearchParams"), Lt = (t) => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function B(t, e, { allOwnKeys: s = !1 } = {}) {
  if (t === null || typeof t > "u")
    return;
  let n, i;
  if (typeof t != "object" && (t = [t]), D(t))
    for (n = 0, i = t.length; n < i; n++)
      e.call(null, t[n], n, t);
  else {
    const r = s ? Object.getOwnPropertyNames(t) : Object.keys(t), o = r.length;
    let l;
    for (n = 0; n < o; n++)
      l = r[n], e.call(null, t[l], l, t);
  }
}
function De(t, e) {
  e = e.toLowerCase();
  const s = Object.keys(t);
  let n = s.length, i;
  for (; n-- > 0; )
    if (i = s[n], e === i.toLowerCase())
      return i;
  return null;
}
const ve = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, ke = (t) => !U(t) && t !== ve;
function se() {
  const { caseless: t } = ke(this) && this || {}, e = {}, s = (n, i) => {
    const r = t && De(e, i) || i;
    H(e[r]) && H(n) ? e[r] = se(e[r], n) : H(n) ? e[r] = se({}, n) : D(n) ? e[r] = n.slice() : e[r] = n;
  };
  for (let n = 0, i = arguments.length; n < i; n++)
    arguments[n] && B(arguments[n], s);
  return e;
}
const It = (t, e, s, { allOwnKeys: n } = {}) => (B(e, (i, r) => {
  s && _(i) ? t[r] = Ne(i, s) : t[r] = i;
}, { allOwnKeys: n }), t), Dt = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t), vt = (t, e, s, n) => {
  t.prototype = Object.create(e.prototype, n), t.prototype.constructor = t, Object.defineProperty(t, "super", {
    value: e.prototype
  }), s && Object.assign(t.prototype, s);
}, kt = (t, e, s, n) => {
  let i, r, o;
  const l = {};
  if (e = e || {}, t == null)
    return e;
  do {
    for (i = Object.getOwnPropertyNames(t), r = i.length; r-- > 0; )
      o = i[r], (!n || n(o, t, e)) && !l[o] && (e[o] = t[o], l[o] = !0);
    t = s !== !1 && ae(t);
  } while (t && (!s || s(t, e)) && t !== Object.prototype);
  return e;
}, Ft = (t, e, s) => {
  t = String(t), (s === void 0 || s > t.length) && (s = t.length), s -= e.length;
  const n = t.indexOf(e, s);
  return n !== -1 && n === s;
}, Ut = (t) => {
  if (!t)
    return null;
  if (D(t))
    return t;
  let e = t.length;
  if (!Ie(e))
    return null;
  const s = new Array(e);
  for (; e-- > 0; )
    s[e] = t[e];
  return s;
}, Bt = /* @__PURE__ */ ((t) => (e) => t && e instanceof t)(typeof Uint8Array < "u" && ae(Uint8Array)), zt = (t, e) => {
  const n = (t && t[Symbol.iterator]).call(t);
  let i;
  for (; (i = n.next()) && !i.done; ) {
    const r = i.value;
    e.call(t, r[0], r[1]);
  }
}, Mt = (t, e) => {
  let s;
  const n = [];
  for (; (s = t.exec(e)) !== null; )
    n.push(s);
  return n;
}, jt = A("HTMLFormElement"), Ht = (t) => t.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(s, n, i) {
    return n.toUpperCase() + i;
  }
), we = (({ hasOwnProperty: t }) => (e, s) => t.call(e, s))(Object.prototype), qt = A("RegExp"), Fe = (t, e) => {
  const s = Object.getOwnPropertyDescriptors(t), n = {};
  B(s, (i, r) => {
    let o;
    (o = e(i, r, t)) !== !1 && (n[r] = o || i);
  }), Object.defineProperties(t, n);
}, $t = (t) => {
  Fe(t, (e, s) => {
    if (_(t) && ["arguments", "caller", "callee"].indexOf(s) !== -1)
      return !1;
    const n = t[s];
    if (_(n)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + s + "'");
      });
    }
  });
}, Vt = (t, e) => {
  const s = {}, n = (i) => {
    i.forEach((r) => {
      s[r] = !0;
    });
  };
  return D(t) ? n(t) : n(String(t).split(e)), s;
}, Wt = () => {
}, Jt = (t, e) => (t = +t, Number.isFinite(t) ? t : e), Z = "abcdefghijklmnopqrstuvwxyz", Ee = "0123456789", Ue = {
  DIGIT: Ee,
  ALPHA: Z,
  ALPHA_DIGIT: Z + Z.toUpperCase() + Ee
}, Kt = (t = 16, e = Ue.ALPHA_DIGIT) => {
  let s = "";
  const { length: n } = e;
  for (; t--; )
    s += e[Math.random() * n | 0];
  return s;
};
function Gt(t) {
  return !!(t && _(t.append) && t[Symbol.toStringTag] === "FormData" && t[Symbol.iterator]);
}
const Xt = (t) => {
  const e = new Array(10), s = (n, i) => {
    if (K(n)) {
      if (e.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        e[i] = n;
        const r = D(n) ? [] : {};
        return B(n, (o, l) => {
          const f = s(o, i + 1);
          !U(f) && (r[l] = f);
        }), e[i] = void 0, r;
      }
    }
    return n;
  };
  return s(t, 0);
}, Zt = A("AsyncFunction"), Qt = (t) => t && (K(t) || _(t)) && _(t.then) && _(t.catch), a = {
  isArray: D,
  isArrayBuffer: Le,
  isBuffer: St,
  isFormData: xt,
  isArrayBufferView: bt,
  isString: _t,
  isNumber: Ie,
  isBoolean: Ot,
  isObject: K,
  isPlainObject: H,
  isUndefined: U,
  isDate: Rt,
  isFile: At,
  isBlob: Pt,
  isRegExp: qt,
  isFunction: _,
  isStream: Tt,
  isURLSearchParams: Nt,
  isTypedArray: Bt,
  isFileList: Ct,
  forEach: B,
  merge: se,
  extend: It,
  trim: Lt,
  stripBOM: Dt,
  inherits: vt,
  toFlatObject: kt,
  kindOf: W,
  kindOfTest: A,
  endsWith: Ft,
  toArray: Ut,
  forEachEntry: zt,
  matchAll: Mt,
  isHTMLForm: jt,
  hasOwnProperty: we,
  hasOwnProp: we,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Fe,
  freezeMethods: $t,
  toObjectSet: Vt,
  toCamelCase: Ht,
  noop: Wt,
  toFiniteNumber: Jt,
  findKey: De,
  global: ve,
  isContextDefined: ke,
  ALPHABET: Ue,
  generateString: Kt,
  isSpecCompliantForm: Gt,
  toJSONObject: Xt,
  isAsyncFn: Zt,
  isThenable: Qt
};
function m(t, e, s, n, i) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = t, this.name = "AxiosError", e && (this.code = e), s && (this.config = s), n && (this.request = n), i && (this.response = i);
}
a.inherits(m, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: a.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const Be = m.prototype, ze = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((t) => {
  ze[t] = { value: t };
});
Object.defineProperties(m, ze);
Object.defineProperty(Be, "isAxiosError", { value: !0 });
m.from = (t, e, s, n, i, r) => {
  const o = Object.create(Be);
  return a.toFlatObject(t, o, function(f) {
    return f !== Error.prototype;
  }, (l) => l !== "isAxiosError"), m.call(o, t.message, e, s, n, i), o.cause = t, o.name = t.name, r && Object.assign(o, r), o;
};
const Yt = null;
function ne(t) {
  return a.isPlainObject(t) || a.isArray(t);
}
function Me(t) {
  return a.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function Se(t, e, s) {
  return t ? t.concat(e).map(function(i, r) {
    return i = Me(i), !s && r ? "[" + i + "]" : i;
  }).join(s ? "." : "") : e;
}
function es(t) {
  return a.isArray(t) && !t.some(ne);
}
const ts = a.toFlatObject(a, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function G(t, e, s) {
  if (!a.isObject(t))
    throw new TypeError("target must be an object");
  e = e || new FormData(), s = a.toFlatObject(s, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(u, w) {
    return !a.isUndefined(w[u]);
  });
  const n = s.metaTokens, i = s.visitor || h, r = s.dots, o = s.indexes, f = (s.Blob || typeof Blob < "u" && Blob) && a.isSpecCompliantForm(e);
  if (!a.isFunction(i))
    throw new TypeError("visitor must be a function");
  function p(d) {
    if (d === null)
      return "";
    if (a.isDate(d))
      return d.toISOString();
    if (!f && a.isBlob(d))
      throw new m("Blob is not supported. Use a Buffer instead.");
    return a.isArrayBuffer(d) || a.isTypedArray(d) ? f && typeof Blob == "function" ? new Blob([d]) : Buffer.from(d) : d;
  }
  function h(d, u, w) {
    let E = d;
    if (d && !w && typeof d == "object") {
      if (a.endsWith(u, "{}"))
        u = n ? u : u.slice(0, -2), d = JSON.stringify(d);
      else if (a.isArray(d) && es(d) || (a.isFileList(d) || a.endsWith(u, "[]")) && (E = a.toArray(d)))
        return u = Me(u), E.forEach(function(T, Qe) {
          !(a.isUndefined(T) || T === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            o === !0 ? Se([u], Qe, r) : o === null ? u : u + "[]",
            p(T)
          );
        }), !1;
    }
    return ne(d) ? !0 : (e.append(Se(w, u, r), p(d)), !1);
  }
  const c = [], g = Object.assign(ts, {
    defaultVisitor: h,
    convertValue: p,
    isVisitable: ne
  });
  function S(d, u) {
    if (!a.isUndefined(d)) {
      if (c.indexOf(d) !== -1)
        throw Error("Circular reference detected in " + u.join("."));
      c.push(d), a.forEach(d, function(E, C) {
        (!(a.isUndefined(E) || E === null) && i.call(
          e,
          E,
          a.isString(C) ? C.trim() : C,
          u,
          g
        )) === !0 && S(E, u ? u.concat(C) : [C]);
      }), c.pop();
    }
  }
  if (!a.isObject(t))
    throw new TypeError("data must be an object");
  return S(t), e;
}
function be(t) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function(n) {
    return e[n];
  });
}
function le(t, e) {
  this._pairs = [], t && G(t, this, e);
}
const je = le.prototype;
je.append = function(e, s) {
  this._pairs.push([e, s]);
};
je.toString = function(e) {
  const s = e ? function(n) {
    return e.call(this, n, be);
  } : be;
  return this._pairs.map(function(i) {
    return s(i[0]) + "=" + s(i[1]);
  }, "").join("&");
};
function ss(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function He(t, e, s) {
  if (!e)
    return t;
  const n = s && s.encode || ss, i = s && s.serialize;
  let r;
  if (i ? r = i(e, s) : r = a.isURLSearchParams(e) ? e.toString() : new le(e, s).toString(n), r) {
    const o = t.indexOf("#");
    o !== -1 && (t = t.slice(0, o)), t += (t.indexOf("?") === -1 ? "?" : "&") + r;
  }
  return t;
}
class _e {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(e, s, n) {
    return this.handlers.push({
      fulfilled: e,
      rejected: s,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(e) {
    a.forEach(this.handlers, function(n) {
      n !== null && e(n);
    });
  }
}
const qe = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, ns = typeof URLSearchParams < "u" ? URLSearchParams : le, is = typeof FormData < "u" ? FormData : null, rs = typeof Blob < "u" ? Blob : null, os = {
  isBrowser: !0,
  classes: {
    URLSearchParams: ns,
    FormData: is,
    Blob: rs
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, $e = typeof window < "u" && typeof document < "u", as = ((t) => $e && ["ReactNative", "NativeScript", "NS"].indexOf(t) < 0)(typeof navigator < "u" && navigator.product), ls = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", cs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: $e,
  hasStandardBrowserEnv: as,
  hasStandardBrowserWebWorkerEnv: ls
}, Symbol.toStringTag, { value: "Module" })), R = {
  ...cs,
  ...os
};
function hs(t, e) {
  return G(t, new R.classes.URLSearchParams(), Object.assign({
    visitor: function(s, n, i, r) {
      return R.isNode && a.isBuffer(s) ? (this.append(n, s.toString("base64")), !1) : r.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function ds(t) {
  return a.matchAll(/\w+|\[(\w*)]/g, t).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function us(t) {
  const e = {}, s = Object.keys(t);
  let n;
  const i = s.length;
  let r;
  for (n = 0; n < i; n++)
    r = s[n], e[r] = t[r];
  return e;
}
function Ve(t) {
  function e(s, n, i, r) {
    let o = s[r++];
    if (o === "__proto__")
      return !0;
    const l = Number.isFinite(+o), f = r >= s.length;
    return o = !o && a.isArray(i) ? i.length : o, f ? (a.hasOwnProp(i, o) ? i[o] = [i[o], n] : i[o] = n, !l) : ((!i[o] || !a.isObject(i[o])) && (i[o] = []), e(s, n, i[o], r) && a.isArray(i[o]) && (i[o] = us(i[o])), !l);
  }
  if (a.isFormData(t) && a.isFunction(t.entries)) {
    const s = {};
    return a.forEachEntry(t, (n, i) => {
      e(ds(n), i, s, 0);
    }), s;
  }
  return null;
}
function fs(t, e, s) {
  if (a.isString(t))
    try {
      return (e || JSON.parse)(t), a.trim(t);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (s || JSON.stringify)(t);
}
const ce = {
  transitional: qe,
  adapter: ["xhr", "http"],
  transformRequest: [function(e, s) {
    const n = s.getContentType() || "", i = n.indexOf("application/json") > -1, r = a.isObject(e);
    if (r && a.isHTMLForm(e) && (e = new FormData(e)), a.isFormData(e))
      return i ? JSON.stringify(Ve(e)) : e;
    if (a.isArrayBuffer(e) || a.isBuffer(e) || a.isStream(e) || a.isFile(e) || a.isBlob(e))
      return e;
    if (a.isArrayBufferView(e))
      return e.buffer;
    if (a.isURLSearchParams(e))
      return s.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let l;
    if (r) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return hs(e, this.formSerializer).toString();
      if ((l = a.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
        const f = this.env && this.env.FormData;
        return G(
          l ? { "files[]": e } : e,
          f && new f(),
          this.formSerializer
        );
      }
    }
    return r || i ? (s.setContentType("application/json", !1), fs(e)) : e;
  }],
  transformResponse: [function(e) {
    const s = this.transitional || ce.transitional, n = s && s.forcedJSONParsing, i = this.responseType === "json";
    if (e && a.isString(e) && (n && !this.responseType || i)) {
      const o = !(s && s.silentJSONParsing) && i;
      try {
        return JSON.parse(e);
      } catch (l) {
        if (o)
          throw l.name === "SyntaxError" ? m.from(l, m.ERR_BAD_RESPONSE, this, null, this.response) : l;
      }
    }
    return e;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: R.classes.FormData,
    Blob: R.classes.Blob
  },
  validateStatus: function(e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
a.forEach(["delete", "get", "head", "post", "put", "patch"], (t) => {
  ce.headers[t] = {};
});
const he = ce, ps = a.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), ms = (t) => {
  const e = {};
  let s, n, i;
  return t && t.split(`
`).forEach(function(o) {
    i = o.indexOf(":"), s = o.substring(0, i).trim().toLowerCase(), n = o.substring(i + 1).trim(), !(!s || e[s] && ps[s]) && (s === "set-cookie" ? e[s] ? e[s].push(n) : e[s] = [n] : e[s] = e[s] ? e[s] + ", " + n : n);
  }), e;
}, Oe = Symbol("internals");
function v(t) {
  return t && String(t).trim().toLowerCase();
}
function q(t) {
  return t === !1 || t == null ? t : a.isArray(t) ? t.map(q) : String(t);
}
function ys(t) {
  const e = /* @__PURE__ */ Object.create(null), s = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = s.exec(t); )
    e[n[1]] = n[2];
  return e;
}
const gs = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
function Q(t, e, s, n, i) {
  if (a.isFunction(n))
    return n.call(this, e, s);
  if (i && (e = s), !!a.isString(e)) {
    if (a.isString(n))
      return e.indexOf(n) !== -1;
    if (a.isRegExp(n))
      return n.test(e);
  }
}
function ws(t) {
  return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, s, n) => s.toUpperCase() + n);
}
function Es(t, e) {
  const s = a.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(t, n + s, {
      value: function(i, r, o) {
        return this[n].call(this, e, i, r, o);
      },
      configurable: !0
    });
  });
}
class X {
  constructor(e) {
    e && this.set(e);
  }
  set(e, s, n) {
    const i = this;
    function r(l, f, p) {
      const h = v(f);
      if (!h)
        throw new Error("header name must be a non-empty string");
      const c = a.findKey(i, h);
      (!c || i[c] === void 0 || p === !0 || p === void 0 && i[c] !== !1) && (i[c || f] = q(l));
    }
    const o = (l, f) => a.forEach(l, (p, h) => r(p, h, f));
    return a.isPlainObject(e) || e instanceof this.constructor ? o(e, s) : a.isString(e) && (e = e.trim()) && !gs(e) ? o(ms(e), s) : e != null && r(s, e, n), this;
  }
  get(e, s) {
    if (e = v(e), e) {
      const n = a.findKey(this, e);
      if (n) {
        const i = this[n];
        if (!s)
          return i;
        if (s === !0)
          return ys(i);
        if (a.isFunction(s))
          return s.call(this, i, n);
        if (a.isRegExp(s))
          return s.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, s) {
    if (e = v(e), e) {
      const n = a.findKey(this, e);
      return !!(n && this[n] !== void 0 && (!s || Q(this, this[n], n, s)));
    }
    return !1;
  }
  delete(e, s) {
    const n = this;
    let i = !1;
    function r(o) {
      if (o = v(o), o) {
        const l = a.findKey(n, o);
        l && (!s || Q(n, n[l], l, s)) && (delete n[l], i = !0);
      }
    }
    return a.isArray(e) ? e.forEach(r) : r(e), i;
  }
  clear(e) {
    const s = Object.keys(this);
    let n = s.length, i = !1;
    for (; n--; ) {
      const r = s[n];
      (!e || Q(this, this[r], r, e, !0)) && (delete this[r], i = !0);
    }
    return i;
  }
  normalize(e) {
    const s = this, n = {};
    return a.forEach(this, (i, r) => {
      const o = a.findKey(n, r);
      if (o) {
        s[o] = q(i), delete s[r];
        return;
      }
      const l = e ? ws(r) : String(r).trim();
      l !== r && delete s[r], s[l] = q(i), n[l] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const s = /* @__PURE__ */ Object.create(null);
    return a.forEach(this, (n, i) => {
      n != null && n !== !1 && (s[i] = e && a.isArray(n) ? n.join(", ") : n);
    }), s;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, s]) => e + ": " + s).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...s) {
    const n = new this(e);
    return s.forEach((i) => n.set(i)), n;
  }
  static accessor(e) {
    const n = (this[Oe] = this[Oe] = {
      accessors: {}
    }).accessors, i = this.prototype;
    function r(o) {
      const l = v(o);
      n[l] || (Es(i, o), n[l] = !0);
    }
    return a.isArray(e) ? e.forEach(r) : r(e), this;
  }
}
X.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
a.reduceDescriptors(X.prototype, ({ value: t }, e) => {
  let s = e[0].toUpperCase() + e.slice(1);
  return {
    get: () => t,
    set(n) {
      this[s] = n;
    }
  };
});
a.freezeMethods(X);
const P = X;
function Y(t, e) {
  const s = this || he, n = e || s, i = P.from(n.headers);
  let r = n.data;
  return a.forEach(t, function(l) {
    r = l.call(s, r, i.normalize(), e ? e.status : void 0);
  }), i.normalize(), r;
}
function We(t) {
  return !!(t && t.__CANCEL__);
}
function z(t, e, s) {
  m.call(this, t ?? "canceled", m.ERR_CANCELED, e, s), this.name = "CanceledError";
}
a.inherits(z, m, {
  __CANCEL__: !0
});
function Ss(t, e, s) {
  const n = s.config.validateStatus;
  !s.status || !n || n(s.status) ? t(s) : e(new m(
    "Request failed with status code " + s.status,
    [m.ERR_BAD_REQUEST, m.ERR_BAD_RESPONSE][Math.floor(s.status / 100) - 4],
    s.config,
    s.request,
    s
  ));
}
const bs = R.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(t, e, s, n, i, r) {
      const o = [t + "=" + encodeURIComponent(e)];
      a.isNumber(s) && o.push("expires=" + new Date(s).toGMTString()), a.isString(n) && o.push("path=" + n), a.isString(i) && o.push("domain=" + i), r === !0 && o.push("secure"), document.cookie = o.join("; ");
    },
    read(t) {
      const e = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
      return e ? decodeURIComponent(e[3]) : null;
    },
    remove(t) {
      this.write(t, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function _s(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function Os(t, e) {
  return e ? t.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function Je(t, e) {
  return t && !_s(e) ? Os(t, e) : e;
}
const Rs = R.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const e = /(msie|trident)/i.test(navigator.userAgent), s = document.createElement("a");
    let n;
    function i(r) {
      let o = r;
      return e && (s.setAttribute("href", o), o = s.href), s.setAttribute("href", o), {
        href: s.href,
        protocol: s.protocol ? s.protocol.replace(/:$/, "") : "",
        host: s.host,
        search: s.search ? s.search.replace(/^\?/, "") : "",
        hash: s.hash ? s.hash.replace(/^#/, "") : "",
        hostname: s.hostname,
        port: s.port,
        pathname: s.pathname.charAt(0) === "/" ? s.pathname : "/" + s.pathname
      };
    }
    return n = i(window.location.href), function(o) {
      const l = a.isString(o) ? i(o) : o;
      return l.protocol === n.protocol && l.host === n.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function() {
    return function() {
      return !0;
    };
  }()
);
function As(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return e && e[1] || "";
}
function Ps(t, e) {
  t = t || 10;
  const s = new Array(t), n = new Array(t);
  let i = 0, r = 0, o;
  return e = e !== void 0 ? e : 1e3, function(f) {
    const p = Date.now(), h = n[r];
    o || (o = p), s[i] = f, n[i] = p;
    let c = r, g = 0;
    for (; c !== i; )
      g += s[c++], c = c % t;
    if (i = (i + 1) % t, i === r && (r = (r + 1) % t), p - o < e)
      return;
    const S = h && p - h;
    return S ? Math.round(g * 1e3 / S) : void 0;
  };
}
function Re(t, e) {
  let s = 0;
  const n = Ps(50, 250);
  return (i) => {
    const r = i.loaded, o = i.lengthComputable ? i.total : void 0, l = r - s, f = n(l), p = r <= o;
    s = r;
    const h = {
      loaded: r,
      total: o,
      progress: o ? r / o : void 0,
      bytes: l,
      rate: f || void 0,
      estimated: f && o && p ? (o - r) / f : void 0,
      event: i
    };
    h[e ? "download" : "upload"] = !0, t(h);
  };
}
const Cs = typeof XMLHttpRequest < "u", Ts = Cs && function(t) {
  return new Promise(function(s, n) {
    let i = t.data;
    const r = P.from(t.headers).normalize();
    let { responseType: o, withXSRFToken: l } = t, f;
    function p() {
      t.cancelToken && t.cancelToken.unsubscribe(f), t.signal && t.signal.removeEventListener("abort", f);
    }
    let h;
    if (a.isFormData(i)) {
      if (R.hasStandardBrowserEnv || R.hasStandardBrowserWebWorkerEnv)
        r.setContentType(!1);
      else if ((h = r.getContentType()) !== !1) {
        const [u, ...w] = h ? h.split(";").map((E) => E.trim()).filter(Boolean) : [];
        r.setContentType([u || "multipart/form-data", ...w].join("; "));
      }
    }
    let c = new XMLHttpRequest();
    if (t.auth) {
      const u = t.auth.username || "", w = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) : "";
      r.set("Authorization", "Basic " + btoa(u + ":" + w));
    }
    const g = Je(t.baseURL, t.url);
    c.open(t.method.toUpperCase(), He(g, t.params, t.paramsSerializer), !0), c.timeout = t.timeout;
    function S() {
      if (!c)
        return;
      const u = P.from(
        "getAllResponseHeaders" in c && c.getAllResponseHeaders()
      ), E = {
        data: !o || o === "text" || o === "json" ? c.responseText : c.response,
        status: c.status,
        statusText: c.statusText,
        headers: u,
        config: t,
        request: c
      };
      Ss(function(T) {
        s(T), p();
      }, function(T) {
        n(T), p();
      }, E), c = null;
    }
    if ("onloadend" in c ? c.onloadend = S : c.onreadystatechange = function() {
      !c || c.readyState !== 4 || c.status === 0 && !(c.responseURL && c.responseURL.indexOf("file:") === 0) || setTimeout(S);
    }, c.onabort = function() {
      c && (n(new m("Request aborted", m.ECONNABORTED, t, c)), c = null);
    }, c.onerror = function() {
      n(new m("Network Error", m.ERR_NETWORK, t, c)), c = null;
    }, c.ontimeout = function() {
      let w = t.timeout ? "timeout of " + t.timeout + "ms exceeded" : "timeout exceeded";
      const E = t.transitional || qe;
      t.timeoutErrorMessage && (w = t.timeoutErrorMessage), n(new m(
        w,
        E.clarifyTimeoutError ? m.ETIMEDOUT : m.ECONNABORTED,
        t,
        c
      )), c = null;
    }, R.hasStandardBrowserEnv && (l && a.isFunction(l) && (l = l(t)), l || l !== !1 && Rs(g))) {
      const u = t.xsrfHeaderName && t.xsrfCookieName && bs.read(t.xsrfCookieName);
      u && r.set(t.xsrfHeaderName, u);
    }
    i === void 0 && r.setContentType(null), "setRequestHeader" in c && a.forEach(r.toJSON(), function(w, E) {
      c.setRequestHeader(E, w);
    }), a.isUndefined(t.withCredentials) || (c.withCredentials = !!t.withCredentials), o && o !== "json" && (c.responseType = t.responseType), typeof t.onDownloadProgress == "function" && c.addEventListener("progress", Re(t.onDownloadProgress, !0)), typeof t.onUploadProgress == "function" && c.upload && c.upload.addEventListener("progress", Re(t.onUploadProgress)), (t.cancelToken || t.signal) && (f = (u) => {
      c && (n(!u || u.type ? new z(null, t, c) : u), c.abort(), c = null);
    }, t.cancelToken && t.cancelToken.subscribe(f), t.signal && (t.signal.aborted ? f() : t.signal.addEventListener("abort", f)));
    const d = As(g);
    if (d && R.protocols.indexOf(d) === -1) {
      n(new m("Unsupported protocol " + d + ":", m.ERR_BAD_REQUEST, t));
      return;
    }
    c.send(i || null);
  });
}, ie = {
  http: Yt,
  xhr: Ts
};
a.forEach(ie, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: e });
    } catch {
    }
    Object.defineProperty(t, "adapterName", { value: e });
  }
});
const Ae = (t) => `- ${t}`, xs = (t) => a.isFunction(t) || t === null || t === !1, Ke = {
  getAdapter: (t) => {
    t = a.isArray(t) ? t : [t];
    const { length: e } = t;
    let s, n;
    const i = {};
    for (let r = 0; r < e; r++) {
      s = t[r];
      let o;
      if (n = s, !xs(s) && (n = ie[(o = String(s)).toLowerCase()], n === void 0))
        throw new m(`Unknown adapter '${o}'`);
      if (n)
        break;
      i[o || "#" + r] = n;
    }
    if (!n) {
      const r = Object.entries(i).map(
        ([l, f]) => `adapter ${l} ` + (f === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let o = e ? r.length > 1 ? `since :
` + r.map(Ae).join(`
`) : " " + Ae(r[0]) : "as no adapter specified";
      throw new m(
        "There is no suitable adapter to dispatch the request " + o,
        "ERR_NOT_SUPPORT"
      );
    }
    return n;
  },
  adapters: ie
};
function ee(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new z(null, t);
}
function Pe(t) {
  return ee(t), t.headers = P.from(t.headers), t.data = Y.call(
    t,
    t.transformRequest
  ), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), Ke.getAdapter(t.adapter || he.adapter)(t).then(function(n) {
    return ee(t), n.data = Y.call(
      t,
      t.transformResponse,
      n
    ), n.headers = P.from(n.headers), n;
  }, function(n) {
    return We(n) || (ee(t), n && n.response && (n.response.data = Y.call(
      t,
      t.transformResponse,
      n.response
    ), n.response.headers = P.from(n.response.headers))), Promise.reject(n);
  });
}
const Ce = (t) => t instanceof P ? t.toJSON() : t;
function I(t, e) {
  e = e || {};
  const s = {};
  function n(p, h, c) {
    return a.isPlainObject(p) && a.isPlainObject(h) ? a.merge.call({ caseless: c }, p, h) : a.isPlainObject(h) ? a.merge({}, h) : a.isArray(h) ? h.slice() : h;
  }
  function i(p, h, c) {
    if (a.isUndefined(h)) {
      if (!a.isUndefined(p))
        return n(void 0, p, c);
    } else
      return n(p, h, c);
  }
  function r(p, h) {
    if (!a.isUndefined(h))
      return n(void 0, h);
  }
  function o(p, h) {
    if (a.isUndefined(h)) {
      if (!a.isUndefined(p))
        return n(void 0, p);
    } else
      return n(void 0, h);
  }
  function l(p, h, c) {
    if (c in e)
      return n(p, h);
    if (c in t)
      return n(void 0, p);
  }
  const f = {
    url: r,
    method: r,
    data: r,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    responseEncoding: o,
    validateStatus: l,
    headers: (p, h) => i(Ce(p), Ce(h), !0)
  };
  return a.forEach(Object.keys(Object.assign({}, t, e)), function(h) {
    const c = f[h] || i, g = c(t[h], e[h], h);
    a.isUndefined(g) && c !== l || (s[h] = g);
  }), s;
}
const Ge = "1.6.7", de = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
  de[t] = function(n) {
    return typeof n === t || "a" + (e < 1 ? "n " : " ") + t;
  };
});
const Te = {};
de.transitional = function(e, s, n) {
  function i(r, o) {
    return "[Axios v" + Ge + "] Transitional option '" + r + "'" + o + (n ? ". " + n : "");
  }
  return (r, o, l) => {
    if (e === !1)
      throw new m(
        i(o, " has been removed" + (s ? " in " + s : "")),
        m.ERR_DEPRECATED
      );
    return s && !Te[o] && (Te[o] = !0, console.warn(
      i(
        o,
        " has been deprecated since v" + s + " and will be removed in the near future"
      )
    )), e ? e(r, o, l) : !0;
  };
};
function Ns(t, e, s) {
  if (typeof t != "object")
    throw new m("options must be an object", m.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(t);
  let i = n.length;
  for (; i-- > 0; ) {
    const r = n[i], o = e[r];
    if (o) {
      const l = t[r], f = l === void 0 || o(l, r, t);
      if (f !== !0)
        throw new m("option " + r + " must be " + f, m.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (s !== !0)
      throw new m("Unknown option " + r, m.ERR_BAD_OPTION);
  }
}
const re = {
  assertOptions: Ns,
  validators: de
}, x = re.validators;
class V {
  constructor(e) {
    this.defaults = e, this.interceptors = {
      request: new _e(),
      response: new _e()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(e, s) {
    try {
      return await this._request(e, s);
    } catch (n) {
      if (n instanceof Error) {
        let i;
        Error.captureStackTrace ? Error.captureStackTrace(i = {}) : i = new Error();
        const r = i.stack ? i.stack.replace(/^.+\n/, "") : "";
        n.stack ? r && !String(n.stack).endsWith(r.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + r) : n.stack = r;
      }
      throw n;
    }
  }
  _request(e, s) {
    typeof e == "string" ? (s = s || {}, s.url = e) : s = e || {}, s = I(this.defaults, s);
    const { transitional: n, paramsSerializer: i, headers: r } = s;
    n !== void 0 && re.assertOptions(n, {
      silentJSONParsing: x.transitional(x.boolean),
      forcedJSONParsing: x.transitional(x.boolean),
      clarifyTimeoutError: x.transitional(x.boolean)
    }, !1), i != null && (a.isFunction(i) ? s.paramsSerializer = {
      serialize: i
    } : re.assertOptions(i, {
      encode: x.function,
      serialize: x.function
    }, !0)), s.method = (s.method || this.defaults.method || "get").toLowerCase();
    let o = r && a.merge(
      r.common,
      r[s.method]
    );
    r && a.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (d) => {
        delete r[d];
      }
    ), s.headers = P.concat(o, r);
    const l = [];
    let f = !0;
    this.interceptors.request.forEach(function(u) {
      typeof u.runWhen == "function" && u.runWhen(s) === !1 || (f = f && u.synchronous, l.unshift(u.fulfilled, u.rejected));
    });
    const p = [];
    this.interceptors.response.forEach(function(u) {
      p.push(u.fulfilled, u.rejected);
    });
    let h, c = 0, g;
    if (!f) {
      const d = [Pe.bind(this), void 0];
      for (d.unshift.apply(d, l), d.push.apply(d, p), g = d.length, h = Promise.resolve(s); c < g; )
        h = h.then(d[c++], d[c++]);
      return h;
    }
    g = l.length;
    let S = s;
    for (c = 0; c < g; ) {
      const d = l[c++], u = l[c++];
      try {
        S = d(S);
      } catch (w) {
        u.call(this, w);
        break;
      }
    }
    try {
      h = Pe.call(this, S);
    } catch (d) {
      return Promise.reject(d);
    }
    for (c = 0, g = p.length; c < g; )
      h = h.then(p[c++], p[c++]);
    return h;
  }
  getUri(e) {
    e = I(this.defaults, e);
    const s = Je(e.baseURL, e.url);
    return He(s, e.params, e.paramsSerializer);
  }
}
a.forEach(["delete", "get", "head", "options"], function(e) {
  V.prototype[e] = function(s, n) {
    return this.request(I(n || {}, {
      method: e,
      url: s,
      data: (n || {}).data
    }));
  };
});
a.forEach(["post", "put", "patch"], function(e) {
  function s(n) {
    return function(r, o, l) {
      return this.request(I(l || {}, {
        method: e,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: r,
        data: o
      }));
    };
  }
  V.prototype[e] = s(), V.prototype[e + "Form"] = s(!0);
});
const $ = V;
class ue {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let s;
    this.promise = new Promise(function(r) {
      s = r;
    });
    const n = this;
    this.promise.then((i) => {
      if (!n._listeners)
        return;
      let r = n._listeners.length;
      for (; r-- > 0; )
        n._listeners[r](i);
      n._listeners = null;
    }), this.promise.then = (i) => {
      let r;
      const o = new Promise((l) => {
        n.subscribe(l), r = l;
      }).then(i);
      return o.cancel = function() {
        n.unsubscribe(r);
      }, o;
    }, e(function(r, o, l) {
      n.reason || (n.reason = new z(r, o, l), s(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(e) {
    if (!this._listeners)
      return;
    const s = this._listeners.indexOf(e);
    s !== -1 && this._listeners.splice(s, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let e;
    return {
      token: new ue(function(i) {
        e = i;
      }),
      cancel: e
    };
  }
}
const Ls = ue;
function Is(t) {
  return function(s) {
    return t.apply(null, s);
  };
}
function Ds(t) {
  return a.isObject(t) && t.isAxiosError === !0;
}
const oe = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(oe).forEach(([t, e]) => {
  oe[e] = t;
});
const vs = oe;
function Xe(t) {
  const e = new $(t), s = Ne($.prototype.request, e);
  return a.extend(s, $.prototype, e, { allOwnKeys: !0 }), a.extend(s, e, null, { allOwnKeys: !0 }), s.create = function(i) {
    return Xe(I(t, i));
  }, s;
}
const y = Xe(he);
y.Axios = $;
y.CanceledError = z;
y.CancelToken = Ls;
y.isCancel = We;
y.VERSION = Ge;
y.toFormData = G;
y.AxiosError = m;
y.Cancel = y.CanceledError;
y.all = function(e) {
  return Promise.all(e);
};
y.spread = Is;
y.isAxiosError = Ds;
y.mergeConfig = I;
y.AxiosHeaders = P;
y.formToJSON = (t) => Ve(a.isHTMLForm(t) ? new FormData(t) : t);
y.getAdapter = Ke.getAdapter;
y.HttpStatusCode = vs;
y.default = y;
const Ze = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [n, i] of e)
    s[n] = i;
  return s;
}, ks = {
  name: "Image",
  props: {
    key: String,
    image: Object
  },
  data() {
    return {
      imageEnlarged: !1
    };
  },
  methods: {
    enlargeImage() {
      this.imageEnlarged = !0;
    },
    shrinkImage() {
      this.imageEnlarged = !1;
    }
  }
}, Fs = ["href", "data-pswp-width", "data-pswp-height", "alt"], Us = { class: "hidden-caption-content" }, Bs = ["src"];
function zs(t, e, s, n, i, r) {
  return N(), L("a", {
    key: s.key,
    href: s.image.largeURL,
    "data-pswp-width": s.image.width,
    "data-pswp-height": s.image.height,
    alt: s.image.alt,
    target: "_blank",
    rel: "noreferrer"
  }, [
    O("span", Us, j(s.image.alt), 1),
    O("img", {
      src: s.image.thumbnailURL,
      alt: "",
      onMouseover: e[0] || (e[0] = (...o) => r.enlargeImage && r.enlargeImage(...o)),
      onMouseout: e[1] || (e[1] = (...o) => r.shrinkImage && r.shrinkImage(...o)),
      class: Ye({
        "img-default-size": !0,
        "img-enlarged-size": i.imageEnlarged
      })
    }, null, 42, Bs)
  ], 8, Fs);
}
const Ms = /* @__PURE__ */ Ze(ks, [["render", zs]]), js = {
  name: "FlickrGallery",
  components: { Image: Ms },
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
    flickrLoadingStyle: null,
    loading: !1,
    photos: []
  }),
  beforeMount() {
    this.photos = this.loadFlickrPhotos(), this.galleryContainer != null ? this.galleryID = this.galleryContainer : this.galleryID = this.galleryID + "-" + this.$.uid;
  },
  mounted() {
    this.initLightbox();
  },
  watch: {},
  unmounted() {
    this.lightbox && (this.lightbox.destroy(), this.lightbox = null);
  },
  methods: {
    initLightbox() {
      const t = {
        gallery: "#" + this.galleryID,
        children: "a",
        pswpModule: () => import("./photoswipe.esm-_5K7mZdV.js")
      };
      if (!this.lightbox) {
        const e = new wt(t);
        e.on("uiRegister", function() {
          e.pswp.ui.registerElement({
            name: "custom-caption",
            order: 9,
            isButton: !1,
            appendTo: "root",
            html: "Caption text",
            onInit: (s) => {
              e.pswp.on("change", () => {
                const n = e.pswp.currSlide.data.element;
                let i = "";
                if (n) {
                  const r = n.querySelector(".hidden-caption-content");
                  r ? i = r.innerHTML : i = n.querySelector("img").getAttribute("alt");
                }
                s.innerHTML = i || "";
              });
            }
          });
        }), this.lightbox = e.init();
      }
    },
    async loadFlickrPhotos() {
      this.loading = !0;
      const t = this.endpoint + "?method=" + this.method + "&api_key=" + this.apiKey + "&tags=" + this.tags + "&user_id=" + this.userId + "&photoset_id=" + this.photosetId + "&format=json&page=" + this.page + "&per_page=" + this.perPage + "&extras=" + this.extras + "&nojsoncallback=1", e = {};
      await y.get(t, e, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(({ data: s }) => {
        let n = [];
        this.method == "flickr.photosets.getPhotos" ? (this.totalPictures = s.photoset.total, this.totalPages = s.photoset.pages, s.photoset.photo.forEach(function(i, r) {
          n[r] = {
            largeURL: i.url_l,
            thumbnailURL: i.url_m,
            title: i.title,
            alt: i.title,
            width: i.width_l,
            height: i.height_l
          };
        })) : this.method == "flickr.photos.search" && (this.totalPictures = s.photos.total, this.totalPages = s.photos.pages, s.photos.photo.forEach(function(i, r) {
          n[r] = {
            largeURL: i.url_l,
            thumbnailURL: i.url_m,
            title: i.title,
            alt: i.title,
            width: i.width_l,
            height: i.height_l
          };
        })), this.photos = n;
      }), this.loading = !1;
    },
    nextPage() {
      this.page < this.totalPages && (this.page++, this.loadFlickrPhotos());
    },
    previousPage() {
      this.page > 1 && (this.page--, this.loadFlickrPhotos());
    }
  },
  async created() {
    this.title === void 0 && (this.title = "Selected Photos");
  }
}, Hs = ["id"], qs = { class: "flickr-images" }, $s = {
  key: 0,
  class: "flickr-navigation"
}, Vs = { class: "prev" }, Ws = { class: "current" }, Js = { class: "next" };
function Ks(t, e, s, n, i, r) {
  const o = et("Image");
  return N(), L("div", { id: t.galleryID }, [
    fe(tt, { name: "fade" }, {
      default: st(() => [
        t.loading ? pe("", !0) : (N(), L("div", {
          key: 0,
          style: nt(t.flickrLoadingStyle),
          class: "flickr-container",
          ref: "flickr-container"
        }, [
          O("h2", null, j(s.title ? s.title : "Selected Photos"), 1),
          O("div", qs, [
            (N(!0), L(it, null, rt(t.photos, (l) => (N(), L("span", null, [
              fe(o, { image: l }, null, 8, ["image"])
            ]))), 256))
          ])
        ], 4))
      ]),
      _: 1
    }),
    s.useNavigation ? (N(), L("div", $s, [
      O("span", Vs, [
        O("button", {
          onClick: e[0] || (e[0] = (...l) => r.previousPage && r.previousPage(...l)),
          onKeyup: e[1] || (e[1] = me((...l) => r.previousPage && r.previousPage(...l), ["right"]))
        }, " << ", 32)
      ]),
      O("span", Ws, [
        O("button", {
          onClick: e[2] || (e[2] = () => {
          })
        }, " Page " + j(t.page) + "/" + j(t.totalPages), 1)
      ]),
      O("span", Js, [
        O("button", {
          onClick: e[3] || (e[3] = (...l) => r.nextPage && r.nextPage(...l)),
          onKeyup: e[4] || (e[4] = me((...l) => r.nextPage && r.nextPage(...l), ["right"]))
        }, " >> ", 32)
      ])
    ])) : pe("", !0)
  ], 8, Hs);
}
const Xs = /* @__PURE__ */ Ze(js, [["render", Ks]]);
export {
  Xs as default
};
