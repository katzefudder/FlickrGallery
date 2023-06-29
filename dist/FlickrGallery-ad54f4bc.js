import { openBlock as x, createElementBlock as N, createElementVNode as O, toDisplayString as z, normalizeClass as Ze, resolveComponent as Xe, createVNode as fe, Transition as Qe, withCtx as Ye, normalizeStyle as et, Fragment as tt, renderList as st, createCommentVNode as pe, withKeys as me } from "vue";
/*!
  * PhotoSwipe Lightbox 5.3.7 - https://photoswipe.com
  * (c) 2023 Dmytro Semenov
  */
function F(t, e, s) {
  const n = document.createElement(e);
  return t && (n.className = t), s && s.appendChild(n), n;
}
function nt(t, e, s) {
  let n = `translate3d(${t}px,${e || 0}px,0)`;
  return s !== void 0 && (n += ` scale3d(${s},${s},1)`), n;
}
function ne(t, e, s) {
  t.style.width = typeof e == "number" ? `${e}px` : e, t.style.height = typeof s == "number" ? `${s}px` : s;
}
const E = {
  IDLE: "idle",
  LOADING: "loading",
  LOADED: "loaded",
  ERROR: "error"
};
function it(t) {
  return "button" in t && t.button === 1 || t.ctrlKey || t.metaKey || t.altKey || t.shiftKey;
}
function j(t, e, s = document) {
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
function rt(t) {
  return typeof t == "function" && t.prototype && t.prototype.goTo;
}
function ye() {
  return !!(navigator.vendor && navigator.vendor.match(/apple/i));
}
class ot {
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
class at {
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
    this._filters[e] || (this._filters[e] = []), (i = this._filters[e]) == null || i.push({ fn: s, priority: n }), (r = this._filters[e]) == null || r.sort((l, u) => l.priority - u.priority), (o = this.pswp) == null || o.addFilter(e, s, n);
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
    return (n = this._filters[e]) == null || n.forEach((i) => {
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
    this._listeners[e] || (this._listeners[e] = []), (n = this._listeners[e]) == null || n.push(s), (i = this.pswp) == null || i.on(e, s);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  off(e, s) {
    var n;
    this._listeners[e] && (this._listeners[e] = this._listeners[e].filter((i) => s !== i)), (n = this.pswp) == null || n.off(e, s);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {PhotoSwipeEventsMap[T]} [details]
   * @returns {AugmentedEvent<T>}
   */
  dispatch(e, s) {
    var i;
    if (this.pswp)
      return this.pswp.dispatch(e, s);
    const n = (
      /** @type {AugmentedEvent<T>} */
      new ot(e, s)
    );
    return (i = this._listeners[e]) == null || i.forEach((r) => {
      r.call(this, n);
    }), n;
  }
}
class lt {
  /**
   * @param {string | false} imageSrc
   * @param {HTMLElement} container
   */
  constructor(e, s) {
    if (this.element = F(
      "pswp__img pswp__img--placeholder",
      e ? "img" : "div",
      s
    ), e) {
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
    this.element && (this.element.tagName === "IMG" ? (ne(this.element, 250, "auto"), this.element.style.transformOrigin = "0 0", this.element.style.transform = nt(0, 0, e / 250)) : ne(this.element, e, s));
  }
  destroy() {
    var e;
    (e = this.element) != null && e.parentNode && this.element.remove(), this.element = null;
  }
}
class ct {
  /**
   * @param {SlideData} itemData Slide data
   * @param {PhotoSwipeBase} instance PhotoSwipe or PhotoSwipeLightbox instance
   * @param {number} index
   */
  constructor(e, s, n) {
    this.instance = s, this.data = e, this.index = n, this.element = void 0, this.placeholder = void 0, this.slide = void 0, this.displayedImageWidth = 0, this.displayedImageHeight = 0, this.width = Number(this.data.w) || Number(this.data.width) || 0, this.height = Number(this.data.h) || Number(this.data.height) || 0, this.isAttached = !1, this.hasSlide = !1, this.isDecoding = !1, this.state = E.IDLE, this.data.type ? this.type = this.data.type : this.data.src ? this.type = "image" : this.type = "html", this.instance.dispatch("contentInit", { content: this });
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
        this.placeholder = new lt(
          n,
          this.slide.container
        );
      }
    this.element && !s || this.instance.dispatch("contentLoad", { content: this, isLazy: e }).defaultPrevented || (this.isImageContent() ? (this.element = F("pswp__img", "img"), this.displayedImageWidth && this.loadImage(e)) : (this.element = F("pswp__content", "div"), this.element.innerHTML = this.data.html || ""), s && this.slide && this.slide.updateContentSize(!0));
  }
  /**
   * Preload image
   *
   * @param {boolean} isLazy
   */
  loadImage(e) {
    if (!this.isImageContent() || !this.element || this.instance.dispatch("contentLoadImage", { content: this, isLazy: e }).defaultPrevented)
      return;
    const s = (
      /** @type HTMLImageElement */
      this.element
    );
    this.updateSrcsetSizes(), this.data.srcset && (s.srcset = this.data.srcset), s.src = this.data.src ?? "", s.alt = this.data.alt ?? "", this.state = E.LOADING, s.complete ? this.onLoaded() : (s.onload = () => {
      this.onLoaded();
    }, s.onerror = () => {
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
    this.state = E.LOADED, this.slide && this.element && (this.instance.dispatch("loadComplete", { slide: this.slide, content: this }), this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode && (this.append(), this.slide.updateContentSize(!0)), (this.state === E.LOADED || this.state === E.ERROR) && this.removePlaceholder());
  }
  /**
   * Content load error handler
   */
  onError() {
    this.state = E.ERROR, this.slide && (this.displayError(), this.instance.dispatch("loadComplete", { slide: this.slide, isError: !0, content: this }), this.instance.dispatch("loadError", { slide: this.slide, content: this }));
  }
  /**
   * @returns {Boolean} If the content is currently loading
   */
  isLoading() {
    return this.instance.applyFilters(
      "isContentLoading",
      this.state === E.LOADING,
      this
    );
  }
  /**
   * @returns {Boolean} If the content is in error state
   */
  isError() {
    return this.state === E.ERROR;
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
    if (this.element && (this.placeholder && this.placeholder.setDisplayedSize(e, s), !this.instance.dispatch(
      "contentResize",
      { content: this, width: e, height: s }
    ).defaultPrevented && (ne(this.element, e, s), this.isImageContent() && !this.isError()))) {
      const n = !this.displayedImageWidth && e;
      this.displayedImageWidth = e, this.displayedImageHeight = s, n ? this.loadImage(!1) : this.updateSrcsetSizes(), this.slide && this.instance.dispatch(
        "imageSizeChange",
        { slide: this.slide, width: e, height: s, content: this }
      );
    }
  }
  /**
   * @returns {boolean} If the content can be zoomed
   */
  isZoomable() {
    return this.instance.applyFilters(
      "isContentZoomable",
      this.isImageContent() && this.state !== E.ERROR,
      this
    );
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
    ), s = this.instance.applyFilters(
      "srcsetSizesWidth",
      this.displayedImageWidth,
      this
    );
    (!e.dataset.largestUsedSize || s > parseInt(e.dataset.largestUsedSize, 10)) && (e.sizes = s + "px", e.dataset.largestUsedSize = String(s));
  }
  /**
   * @returns {boolean} If content should use a placeholder (from msrc by default)
   */
  usePlaceholder() {
    return this.instance.applyFilters(
      "useContentPlaceholder",
      this.isImageContent(),
      this
    );
  }
  /**
   * Preload content with lazy-loading param
   */
  lazyLoad() {
    this.instance.dispatch("contentLazyLoad", { content: this }).defaultPrevented || this.load(!0);
  }
  /**
   * @returns {boolean} If placeholder should be kept after content is loaded
   */
  keepPlaceholder() {
    return this.instance.applyFilters(
      "isKeepingPlaceholder",
      this.isLoading(),
      this
    );
  }
  /**
   * Destroy the content
   */
  destroy() {
    this.hasSlide = !1, this.slide = void 0, !this.instance.dispatch("contentDestroy", { content: this }).defaultPrevented && (this.remove(), this.placeholder && (this.placeholder.destroy(), this.placeholder = void 0), this.isImageContent() && this.element && (this.element.onload = null, this.element.onerror = null, this.element = void 0));
  }
  /**
   * Display error message
   */
  displayError() {
    var e;
    if (this.slide) {
      let s = F("pswp__error-msg", "div");
      s.innerText = ((e = this.instance.options) == null ? void 0 : e.errorMsg) ?? "", s = /** @type {HTMLDivElement} */
      this.instance.applyFilters(
        "contentErrorElement",
        s,
        this
      ), this.element = F("pswp__content pswp__error-msg-container", "div"), this.element.appendChild(s), this.slide.container.innerText = "", this.slide.container.appendChild(this.element), this.slide.updateContentSize(!0), this.removePlaceholder();
    }
  }
  /**
   * Append the content
   */
  append() {
    if (this.isAttached || !this.element)
      return;
    if (this.isAttached = !0, this.state === E.ERROR) {
      this.displayError();
      return;
    }
    if (this.instance.dispatch("contentAppend", { content: this }).defaultPrevented)
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
    this.instance.dispatch("contentActivate", { content: this }).defaultPrevented || !this.slide || (this.isImageContent() && this.isDecoding && !ye() ? this.appendImage() : this.isError() && this.load(!1, !0), this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "false"));
  }
  /**
   * Deactivate the content
   */
  deactivate() {
    this.instance.dispatch("contentDeactivate", { content: this }), this.slide && this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "true");
  }
  /**
   * Remove the content from DOM
   */
  remove() {
    this.isAttached = !1, !this.instance.dispatch("contentRemove", { content: this }).defaultPrevented && (this.element && this.element.parentNode && this.element.remove(), this.placeholder && this.placeholder.element && this.placeholder.element.remove());
  }
  /**
   * Append the image content to slide container
   */
  appendImage() {
    this.isAttached && (this.instance.dispatch("contentAppendImage", { content: this }).defaultPrevented || (this.slide && this.element && !this.element.parentNode && this.slide.container.appendChild(this.element), (this.state === E.LOADED || this.state === E.ERROR) && this.removePlaceholder()));
  }
}
function ht(t, e) {
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
function dt(t, e, s, n) {
  return {
    x: e.x - M("left", t, e, s, n) - M("right", t, e, s, n),
    y: e.y - M("top", t, e, s, n) - M("bottom", t, e, s, n)
  };
}
const ge = 4e3;
class ut {
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
    const i = { x: e, y: s };
    this.elementSize = i, this.panAreaSize = n;
    const r = n.x / i.x, o = n.y / i.y;
    this.fit = Math.min(1, r < o ? r : o), this.fill = Math.min(1, r > o ? r : o), this.vFill = Math.min(1, o), this.initial = this._getInitial(), this.secondary = this._getSecondary(), this.max = Math.max(
      this.initial,
      this.secondary,
      this._getMax()
    ), this.min = Math.min(
      this.fit,
      this.initial,
      this.secondary
    ), this.pswp && this.pswp.dispatch("zoomLevelsUpdate", { zoomLevels: this, slideData: this.itemData });
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
function Te(t, e, s) {
  const n = e.createContentFromData(t, s);
  let i;
  const { options: r } = e;
  if (r) {
    i = new ut(r, t, -1);
    let o;
    e.pswp ? o = e.pswp.viewportSize : o = ht(r, e);
    const l = dt(r, o, t, s);
    i.update(n.width, n.height, l);
  }
  return n.lazyLoad(), i && n.setDisplayedSize(
    Math.ceil(n.width * i.initial),
    Math.ceil(n.height * i.initial)
  ), n;
}
function ft(t, e) {
  const s = e.getItemData(t);
  if (!e.dispatch("lazyLoadSlide", { index: t, itemData: s }).defaultPrevented)
    return Te(s, e, t);
}
class pt extends at {
  /**
   * Get total number of slides
   *
   * @returns {number}
   */
  getNumItems() {
    var i;
    let e = 0;
    const s = (i = this.options) == null ? void 0 : i.dataSource;
    s && "length" in s ? e = s.length : s && "gallery" in s && (s.items || (s.items = this._getGalleryDOMElements(s.gallery)), s.items && (e = s.items.length));
    const n = this.dispatch("numItems", {
      dataSource: s,
      numItems: e
    });
    return this.applyFilters("numItems", n.numItems, s);
  }
  /**
   * @param {SlideData} slideData
   * @param {number} index
   * @returns {Content}
   */
  createContentFromData(e, s) {
    return new ct(e, this, s);
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
    var o;
    const s = (o = this.options) == null ? void 0 : o.dataSource;
    let n = {};
    Array.isArray(s) ? n = s[e] : s && "gallery" in s && (s.items || (s.items = this._getGalleryDOMElements(s.gallery)), n = s.items[e]);
    let i = n;
    i instanceof Element && (i = this._domElementToItemData(i));
    const r = this.dispatch("itemData", {
      itemData: i || {},
      index: e
    });
    return this.applyFilters("itemData", r.itemData, e);
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
    return (s = this.options) != null && s.children || (n = this.options) != null && n.childSelector ? j(
      this.options.children,
      this.options.childSelector,
      e
    ) || [] : [e];
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
      const i = e.querySelector("img");
      i && (s.msrc = i.currentSrc || i.src, s.alt = i.getAttribute("alt") ?? ""), (n.dataset.pswpCropped || n.dataset.cropped) && (s.thumbCropped = !0);
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
    return Te(e, this, s);
  }
}
class mt extends pt {
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
    j(this.options.gallery, this.options.gallerySelector).forEach((e) => {
      e.addEventListener("click", this.onThumbnailsClick, !1);
    });
  }
  /**
   * @param {MouseEvent} e
   */
  onThumbnailsClick(e) {
    if (it(e) || window.pswp || window.navigator.onLine === !1)
      return;
    let s = { x: e.clientX, y: e.clientY };
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
    ), i = j(
      this.options.children,
      this.options.childSelector,
      /** @type {HTMLElement} */
      e.currentTarget
    ).findIndex(
      (r) => r === s || r.contains(s)
    );
    return i !== -1 ? i : this.options.children || this.options.childSelector ? -1 : 0;
  }
  /**
   * Load and open PhotoSwipe
   *
   * @param {number} index
   * @param {DataSource} dataSource
   * @param {Point | null} [initialPoint]
   * @returns {boolean}
   */
  loadAndOpen(e, s, n) {
    return window.pswp ? !1 : (this.options.index = e, this.options.initialPointerPos = n, this.shouldOpen = !0, this.preload(e, s), !0);
  }
  /**
   * Load the main module and the slide content by index
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   */
  preload(e, s) {
    const { options: n } = this;
    s && (n.dataSource = s);
    const i = [], r = typeof n.pswpModule;
    if (rt(n.pswpModule))
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
    typeof n.openPromise == "function" && i.push(n.openPromise()), n.preloadFirstSlide !== !1 && e >= 0 && (this._preloadedContent = ft(e, this));
    const o = ++this._uid;
    Promise.all(i).then((l) => {
      if (this.shouldOpen) {
        const u = l[0];
        this._openPhotoswipe(u, o);
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
      (r = this._listeners[i]) == null || r.forEach((o) => {
        n.on(
          i,
          /** @type {EventCallback<typeof name>} */
          o
        );
      });
    }), Object.keys(this._filters).forEach((i) => {
      var r;
      (r = this._filters[i]) == null || r.forEach((o) => {
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
    (e = this.pswp) == null || e.destroy(), this.shouldOpen = !1, this._listeners = {}, j(this.options.gallery, this.options.gallerySelector).forEach((s) => {
      s.removeEventListener("click", this.onThumbnailsClick, !1);
    });
  }
}
function xe(t, e) {
  return function() {
    return t.apply(e, arguments);
  };
}
const { toString: yt } = Object.prototype, { getPrototypeOf: le } = Object, K = ((t) => (e) => {
  const s = yt.call(e);
  return t[s] || (t[s] = s.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), A = (t) => (t = t.toLowerCase(), (e) => K(e) === t), G = (t) => (e) => typeof e === t, { isArray: D } = Array, k = G("undefined");
function gt(t) {
  return t !== null && !k(t) && t.constructor !== null && !k(t.constructor) && S(t.constructor.isBuffer) && t.constructor.isBuffer(t);
}
const Ne = A("ArrayBuffer");
function wt(t) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && Ne(t.buffer), e;
}
const Et = G("string"), S = G("function"), Le = G("number"), $ = (t) => t !== null && typeof t == "object", St = (t) => t === !0 || t === !1, H = (t) => {
  if (K(t) !== "object")
    return !1;
  const e = le(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}, bt = A("Date"), Ot = A("File"), Rt = A("Blob"), At = A("FileList"), _t = (t) => $(t) && S(t.pipe), Pt = (t) => {
  let e;
  return t && (typeof FormData == "function" && t instanceof FormData || S(t.append) && ((e = K(t)) === "formdata" || // detect form-data instance
  e === "object" && S(t.toString) && t.toString() === "[object FormData]"));
}, Ct = A("URLSearchParams"), Tt = (t) => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function v(t, e, { allOwnKeys: s = !1 } = {}) {
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
const Ie = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(), Fe = (t) => !k(t) && t !== Ie;
function ie() {
  const { caseless: t } = Fe(this) && this || {}, e = {}, s = (n, i) => {
    const r = t && De(e, i) || i;
    H(e[r]) && H(n) ? e[r] = ie(e[r], n) : H(n) ? e[r] = ie({}, n) : D(n) ? e[r] = n.slice() : e[r] = n;
  };
  for (let n = 0, i = arguments.length; n < i; n++)
    arguments[n] && v(arguments[n], s);
  return e;
}
const xt = (t, e, s, { allOwnKeys: n } = {}) => (v(e, (i, r) => {
  s && S(i) ? t[r] = xe(i, s) : t[r] = i;
}, { allOwnKeys: n }), t), Nt = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t), Lt = (t, e, s, n) => {
  t.prototype = Object.create(e.prototype, n), t.prototype.constructor = t, Object.defineProperty(t, "super", {
    value: e.prototype
  }), s && Object.assign(t.prototype, s);
}, Dt = (t, e, s, n) => {
  let i, r, o;
  const l = {};
  if (e = e || {}, t == null)
    return e;
  do {
    for (i = Object.getOwnPropertyNames(t), r = i.length; r-- > 0; )
      o = i[r], (!n || n(o, t, e)) && !l[o] && (e[o] = t[o], l[o] = !0);
    t = s !== !1 && le(t);
  } while (t && (!s || s(t, e)) && t !== Object.prototype);
  return e;
}, It = (t, e, s) => {
  t = String(t), (s === void 0 || s > t.length) && (s = t.length), s -= e.length;
  const n = t.indexOf(e, s);
  return n !== -1 && n === s;
}, Ft = (t) => {
  if (!t)
    return null;
  if (D(t))
    return t;
  let e = t.length;
  if (!Le(e))
    return null;
  const s = new Array(e);
  for (; e-- > 0; )
    s[e] = t[e];
  return s;
}, kt = ((t) => (e) => t && e instanceof t)(typeof Uint8Array < "u" && le(Uint8Array)), vt = (t, e) => {
  const n = (t && t[Symbol.iterator]).call(t);
  let i;
  for (; (i = n.next()) && !i.done; ) {
    const r = i.value;
    e.call(t, r[0], r[1]);
  }
}, Ut = (t, e) => {
  let s;
  const n = [];
  for (; (s = t.exec(e)) !== null; )
    n.push(s);
  return n;
}, Bt = A("HTMLFormElement"), Mt = (t) => t.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(s, n, i) {
    return n.toUpperCase() + i;
  }
), we = (({ hasOwnProperty: t }) => (e, s) => t.call(e, s))(Object.prototype), zt = A("RegExp"), ke = (t, e) => {
  const s = Object.getOwnPropertyDescriptors(t), n = {};
  v(s, (i, r) => {
    e(i, r, t) !== !1 && (n[r] = i);
  }), Object.defineProperties(t, n);
}, jt = (t) => {
  ke(t, (e, s) => {
    if (S(t) && ["arguments", "caller", "callee"].indexOf(s) !== -1)
      return !1;
    const n = t[s];
    if (S(n)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + s + "'");
      });
    }
  });
}, Ht = (t, e) => {
  const s = {}, n = (i) => {
    i.forEach((r) => {
      s[r] = !0;
    });
  };
  return D(t) ? n(t) : n(String(t).split(e)), s;
}, qt = () => {
}, Vt = (t, e) => (t = +t, Number.isFinite(t) ? t : e), Y = "abcdefghijklmnopqrstuvwxyz", Ee = "0123456789", ve = {
  DIGIT: Ee,
  ALPHA: Y,
  ALPHA_DIGIT: Y + Y.toUpperCase() + Ee
}, Wt = (t = 16, e = ve.ALPHA_DIGIT) => {
  let s = "";
  const { length: n } = e;
  for (; t--; )
    s += e[Math.random() * n | 0];
  return s;
};
function Jt(t) {
  return !!(t && S(t.append) && t[Symbol.toStringTag] === "FormData" && t[Symbol.iterator]);
}
const Kt = (t) => {
  const e = new Array(10), s = (n, i) => {
    if ($(n)) {
      if (e.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        e[i] = n;
        const r = D(n) ? [] : {};
        return v(n, (o, l) => {
          const u = s(o, i + 1);
          !k(u) && (r[l] = u);
        }), e[i] = void 0, r;
      }
    }
    return n;
  };
  return s(t, 0);
}, Gt = A("AsyncFunction"), $t = (t) => t && ($(t) || S(t)) && S(t.then) && S(t.catch), a = {
  isArray: D,
  isArrayBuffer: Ne,
  isBuffer: gt,
  isFormData: Pt,
  isArrayBufferView: wt,
  isString: Et,
  isNumber: Le,
  isBoolean: St,
  isObject: $,
  isPlainObject: H,
  isUndefined: k,
  isDate: bt,
  isFile: Ot,
  isBlob: Rt,
  isRegExp: zt,
  isFunction: S,
  isStream: _t,
  isURLSearchParams: Ct,
  isTypedArray: kt,
  isFileList: At,
  forEach: v,
  merge: ie,
  extend: xt,
  trim: Tt,
  stripBOM: Nt,
  inherits: Lt,
  toFlatObject: Dt,
  kindOf: K,
  kindOfTest: A,
  endsWith: It,
  toArray: Ft,
  forEachEntry: vt,
  matchAll: Ut,
  isHTMLForm: Bt,
  hasOwnProperty: we,
  hasOwnProp: we,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: ke,
  freezeMethods: jt,
  toObjectSet: Ht,
  toCamelCase: Mt,
  noop: qt,
  toFiniteNumber: Vt,
  findKey: De,
  global: Ie,
  isContextDefined: Fe,
  ALPHABET: ve,
  generateString: Wt,
  isSpecCompliantForm: Jt,
  toJSONObject: Kt,
  isAsyncFn: Gt,
  isThenable: $t
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
const Ue = m.prototype, Be = {};
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
  Be[t] = { value: t };
});
Object.defineProperties(m, Be);
Object.defineProperty(Ue, "isAxiosError", { value: !0 });
m.from = (t, e, s, n, i, r) => {
  const o = Object.create(Ue);
  return a.toFlatObject(t, o, function(u) {
    return u !== Error.prototype;
  }, (l) => l !== "isAxiosError"), m.call(o, t.message, e, s, n, i), o.cause = t, o.name = t.name, r && Object.assign(o, r), o;
};
const Zt = null;
function re(t) {
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
function Xt(t) {
  return a.isArray(t) && !t.some(re);
}
const Qt = a.toFlatObject(a, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function Z(t, e, s) {
  if (!a.isObject(t))
    throw new TypeError("target must be an object");
  e = e || new FormData(), s = a.toFlatObject(s, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(p, _) {
    return !a.isUndefined(_[p]);
  });
  const n = s.metaTokens, i = s.visitor || h, r = s.dots, o = s.indexes, u = (s.Blob || typeof Blob < "u" && Blob) && a.isSpecCompliantForm(e);
  if (!a.isFunction(i))
    throw new TypeError("visitor must be a function");
  function c(d) {
    if (d === null)
      return "";
    if (a.isDate(d))
      return d.toISOString();
    if (!u && a.isBlob(d))
      throw new m("Blob is not supported. Use a Buffer instead.");
    return a.isArrayBuffer(d) || a.isTypedArray(d) ? u && typeof Blob == "function" ? new Blob([d]) : Buffer.from(d) : d;
  }
  function h(d, p, _) {
    let b = d;
    if (d && !_ && typeof d == "object") {
      if (a.endsWith(p, "{}"))
        p = n ? p : p.slice(0, -2), d = JSON.stringify(d);
      else if (a.isArray(d) && Xt(d) || (a.isFileList(d) || a.endsWith(p, "[]")) && (b = a.toArray(d)))
        return p = Me(p), b.forEach(function(B, $e) {
          !(a.isUndefined(B) || B === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            o === !0 ? Se([p], $e, r) : o === null ? p : p + "[]",
            c(B)
          );
        }), !1;
    }
    return re(d) ? !0 : (e.append(Se(_, p, r), c(d)), !1);
  }
  const f = [], w = Object.assign(Qt, {
    defaultVisitor: h,
    convertValue: c,
    isVisitable: re
  });
  function y(d, p) {
    if (!a.isUndefined(d)) {
      if (f.indexOf(d) !== -1)
        throw Error("Circular reference detected in " + p.join("."));
      f.push(d), a.forEach(d, function(b, T) {
        (!(a.isUndefined(b) || b === null) && i.call(
          e,
          b,
          a.isString(T) ? T.trim() : T,
          p,
          w
        )) === !0 && y(b, p ? p.concat(T) : [T]);
      }), f.pop();
    }
  }
  if (!a.isObject(t))
    throw new TypeError("data must be an object");
  return y(t), e;
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
function ce(t, e) {
  this._pairs = [], t && Z(t, this, e);
}
const ze = ce.prototype;
ze.append = function(e, s) {
  this._pairs.push([e, s]);
};
ze.toString = function(e) {
  const s = e ? function(n) {
    return e.call(this, n, be);
  } : be;
  return this._pairs.map(function(i) {
    return s(i[0]) + "=" + s(i[1]);
  }, "").join("&");
};
function Yt(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function je(t, e, s) {
  if (!e)
    return t;
  const n = s && s.encode || Yt, i = s && s.serialize;
  let r;
  if (i ? r = i(e, s) : r = a.isURLSearchParams(e) ? e.toString() : new ce(e, s).toString(n), r) {
    const o = t.indexOf("#");
    o !== -1 && (t = t.slice(0, o)), t += (t.indexOf("?") === -1 ? "?" : "&") + r;
  }
  return t;
}
class es {
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
const Oe = es, He = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, ts = typeof URLSearchParams < "u" ? URLSearchParams : ce, ss = typeof FormData < "u" ? FormData : null, ns = typeof Blob < "u" ? Blob : null, is = (() => {
  let t;
  return typeof navigator < "u" && ((t = navigator.product) === "ReactNative" || t === "NativeScript" || t === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), rs = (() => typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), R = {
  isBrowser: !0,
  classes: {
    URLSearchParams: ts,
    FormData: ss,
    Blob: ns
  },
  isStandardBrowserEnv: is,
  isStandardBrowserWebWorkerEnv: rs,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function os(t, e) {
  return Z(t, new R.classes.URLSearchParams(), Object.assign({
    visitor: function(s, n, i, r) {
      return R.isNode && a.isBuffer(s) ? (this.append(n, s.toString("base64")), !1) : r.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function as(t) {
  return a.matchAll(/\w+|\[(\w*)]/g, t).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function ls(t) {
  const e = {}, s = Object.keys(t);
  let n;
  const i = s.length;
  let r;
  for (n = 0; n < i; n++)
    r = s[n], e[r] = t[r];
  return e;
}
function qe(t) {
  function e(s, n, i, r) {
    let o = s[r++];
    const l = Number.isFinite(+o), u = r >= s.length;
    return o = !o && a.isArray(i) ? i.length : o, u ? (a.hasOwnProp(i, o) ? i[o] = [i[o], n] : i[o] = n, !l) : ((!i[o] || !a.isObject(i[o])) && (i[o] = []), e(s, n, i[o], r) && a.isArray(i[o]) && (i[o] = ls(i[o])), !l);
  }
  if (a.isFormData(t) && a.isFunction(t.entries)) {
    const s = {};
    return a.forEachEntry(t, (n, i) => {
      e(as(n), i, s, 0);
    }), s;
  }
  return null;
}
const cs = {
  "Content-Type": void 0
};
function hs(t, e, s) {
  if (a.isString(t))
    try {
      return (e || JSON.parse)(t), a.trim(t);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (s || JSON.stringify)(t);
}
const X = {
  transitional: He,
  adapter: ["xhr", "http"],
  transformRequest: [function(e, s) {
    const n = s.getContentType() || "", i = n.indexOf("application/json") > -1, r = a.isObject(e);
    if (r && a.isHTMLForm(e) && (e = new FormData(e)), a.isFormData(e))
      return i && i ? JSON.stringify(qe(e)) : e;
    if (a.isArrayBuffer(e) || a.isBuffer(e) || a.isStream(e) || a.isFile(e) || a.isBlob(e))
      return e;
    if (a.isArrayBufferView(e))
      return e.buffer;
    if (a.isURLSearchParams(e))
      return s.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let l;
    if (r) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return os(e, this.formSerializer).toString();
      if ((l = a.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
        const u = this.env && this.env.FormData;
        return Z(
          l ? { "files[]": e } : e,
          u && new u(),
          this.formSerializer
        );
      }
    }
    return r || i ? (s.setContentType("application/json", !1), hs(e)) : e;
  }],
  transformResponse: [function(e) {
    const s = this.transitional || X.transitional, n = s && s.forcedJSONParsing, i = this.responseType === "json";
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
      Accept: "application/json, text/plain, */*"
    }
  }
};
a.forEach(["delete", "get", "head"], function(e) {
  X.headers[e] = {};
});
a.forEach(["post", "put", "patch"], function(e) {
  X.headers[e] = a.merge(cs);
});
const he = X, ds = a.toObjectSet([
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
]), us = (t) => {
  const e = {};
  let s, n, i;
  return t && t.split(`
`).forEach(function(o) {
    i = o.indexOf(":"), s = o.substring(0, i).trim().toLowerCase(), n = o.substring(i + 1).trim(), !(!s || e[s] && ds[s]) && (s === "set-cookie" ? e[s] ? e[s].push(n) : e[s] = [n] : e[s] = e[s] ? e[s] + ", " + n : n);
  }), e;
}, Re = Symbol("internals");
function I(t) {
  return t && String(t).trim().toLowerCase();
}
function q(t) {
  return t === !1 || t == null ? t : a.isArray(t) ? t.map(q) : String(t);
}
function fs(t) {
  const e = /* @__PURE__ */ Object.create(null), s = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = s.exec(t); )
    e[n[1]] = n[2];
  return e;
}
const ps = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
function ee(t, e, s, n, i) {
  if (a.isFunction(n))
    return n.call(this, e, s);
  if (i && (e = s), !!a.isString(e)) {
    if (a.isString(n))
      return e.indexOf(n) !== -1;
    if (a.isRegExp(n))
      return n.test(e);
  }
}
function ms(t) {
  return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, s, n) => s.toUpperCase() + n);
}
function ys(t, e) {
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
class Q {
  constructor(e) {
    e && this.set(e);
  }
  set(e, s, n) {
    const i = this;
    function r(l, u, c) {
      const h = I(u);
      if (!h)
        throw new Error("header name must be a non-empty string");
      const f = a.findKey(i, h);
      (!f || i[f] === void 0 || c === !0 || c === void 0 && i[f] !== !1) && (i[f || u] = q(l));
    }
    const o = (l, u) => a.forEach(l, (c, h) => r(c, h, u));
    return a.isPlainObject(e) || e instanceof this.constructor ? o(e, s) : a.isString(e) && (e = e.trim()) && !ps(e) ? o(us(e), s) : e != null && r(s, e, n), this;
  }
  get(e, s) {
    if (e = I(e), e) {
      const n = a.findKey(this, e);
      if (n) {
        const i = this[n];
        if (!s)
          return i;
        if (s === !0)
          return fs(i);
        if (a.isFunction(s))
          return s.call(this, i, n);
        if (a.isRegExp(s))
          return s.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, s) {
    if (e = I(e), e) {
      const n = a.findKey(this, e);
      return !!(n && this[n] !== void 0 && (!s || ee(this, this[n], n, s)));
    }
    return !1;
  }
  delete(e, s) {
    const n = this;
    let i = !1;
    function r(o) {
      if (o = I(o), o) {
        const l = a.findKey(n, o);
        l && (!s || ee(n, n[l], l, s)) && (delete n[l], i = !0);
      }
    }
    return a.isArray(e) ? e.forEach(r) : r(e), i;
  }
  clear(e) {
    const s = Object.keys(this);
    let n = s.length, i = !1;
    for (; n--; ) {
      const r = s[n];
      (!e || ee(this, this[r], r, e, !0)) && (delete this[r], i = !0);
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
      const l = e ? ms(r) : String(r).trim();
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
    const n = (this[Re] = this[Re] = {
      accessors: {}
    }).accessors, i = this.prototype;
    function r(o) {
      const l = I(o);
      n[l] || (ys(i, o), n[l] = !0);
    }
    return a.isArray(e) ? e.forEach(r) : r(e), this;
  }
}
Q.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
a.freezeMethods(Q.prototype);
a.freezeMethods(Q);
const P = Q;
function te(t, e) {
  const s = this || he, n = e || s, i = P.from(n.headers);
  let r = n.data;
  return a.forEach(t, function(l) {
    r = l.call(s, r, i.normalize(), e ? e.status : void 0);
  }), i.normalize(), r;
}
function Ve(t) {
  return !!(t && t.__CANCEL__);
}
function U(t, e, s) {
  m.call(this, t ?? "canceled", m.ERR_CANCELED, e, s), this.name = "CanceledError";
}
a.inherits(U, m, {
  __CANCEL__: !0
});
function gs(t, e, s) {
  const n = s.config.validateStatus;
  !s.status || !n || n(s.status) ? t(s) : e(new m(
    "Request failed with status code " + s.status,
    [m.ERR_BAD_REQUEST, m.ERR_BAD_RESPONSE][Math.floor(s.status / 100) - 4],
    s.config,
    s.request,
    s
  ));
}
const ws = R.isStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  function() {
    return {
      write: function(s, n, i, r, o, l) {
        const u = [];
        u.push(s + "=" + encodeURIComponent(n)), a.isNumber(i) && u.push("expires=" + new Date(i).toGMTString()), a.isString(r) && u.push("path=" + r), a.isString(o) && u.push("domain=" + o), l === !0 && u.push("secure"), document.cookie = u.join("; ");
      },
      read: function(s) {
        const n = document.cookie.match(new RegExp("(^|;\\s*)(" + s + ")=([^;]*)"));
        return n ? decodeURIComponent(n[3]) : null;
      },
      remove: function(s) {
        this.write(s, "", Date.now() - 864e5);
      }
    };
  }()
) : (
  // Non standard browser env (web workers, react-native) lack needed support.
  function() {
    return {
      write: function() {
      },
      read: function() {
        return null;
      },
      remove: function() {
      }
    };
  }()
);
function Es(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function Ss(t, e) {
  return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function We(t, e) {
  return t && !Es(e) ? Ss(t, e) : e;
}
const bs = R.isStandardBrowserEnv ? (
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
  function() {
    return function() {
      return !0;
    };
  }()
);
function Os(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return e && e[1] || "";
}
function Rs(t, e) {
  t = t || 10;
  const s = new Array(t), n = new Array(t);
  let i = 0, r = 0, o;
  return e = e !== void 0 ? e : 1e3, function(u) {
    const c = Date.now(), h = n[r];
    o || (o = c), s[i] = u, n[i] = c;
    let f = r, w = 0;
    for (; f !== i; )
      w += s[f++], f = f % t;
    if (i = (i + 1) % t, i === r && (r = (r + 1) % t), c - o < e)
      return;
    const y = h && c - h;
    return y ? Math.round(w * 1e3 / y) : void 0;
  };
}
function Ae(t, e) {
  let s = 0;
  const n = Rs(50, 250);
  return (i) => {
    const r = i.loaded, o = i.lengthComputable ? i.total : void 0, l = r - s, u = n(l), c = r <= o;
    s = r;
    const h = {
      loaded: r,
      total: o,
      progress: o ? r / o : void 0,
      bytes: l,
      rate: u || void 0,
      estimated: u && o && c ? (o - r) / u : void 0,
      event: i
    };
    h[e ? "download" : "upload"] = !0, t(h);
  };
}
const As = typeof XMLHttpRequest < "u", _s = As && function(t) {
  return new Promise(function(s, n) {
    let i = t.data;
    const r = P.from(t.headers).normalize(), o = t.responseType;
    let l;
    function u() {
      t.cancelToken && t.cancelToken.unsubscribe(l), t.signal && t.signal.removeEventListener("abort", l);
    }
    a.isFormData(i) && (R.isStandardBrowserEnv || R.isStandardBrowserWebWorkerEnv ? r.setContentType(!1) : r.setContentType("multipart/form-data;", !1));
    let c = new XMLHttpRequest();
    if (t.auth) {
      const y = t.auth.username || "", d = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) : "";
      r.set("Authorization", "Basic " + btoa(y + ":" + d));
    }
    const h = We(t.baseURL, t.url);
    c.open(t.method.toUpperCase(), je(h, t.params, t.paramsSerializer), !0), c.timeout = t.timeout;
    function f() {
      if (!c)
        return;
      const y = P.from(
        "getAllResponseHeaders" in c && c.getAllResponseHeaders()
      ), p = {
        data: !o || o === "text" || o === "json" ? c.responseText : c.response,
        status: c.status,
        statusText: c.statusText,
        headers: y,
        config: t,
        request: c
      };
      gs(function(b) {
        s(b), u();
      }, function(b) {
        n(b), u();
      }, p), c = null;
    }
    if ("onloadend" in c ? c.onloadend = f : c.onreadystatechange = function() {
      !c || c.readyState !== 4 || c.status === 0 && !(c.responseURL && c.responseURL.indexOf("file:") === 0) || setTimeout(f);
    }, c.onabort = function() {
      c && (n(new m("Request aborted", m.ECONNABORTED, t, c)), c = null);
    }, c.onerror = function() {
      n(new m("Network Error", m.ERR_NETWORK, t, c)), c = null;
    }, c.ontimeout = function() {
      let d = t.timeout ? "timeout of " + t.timeout + "ms exceeded" : "timeout exceeded";
      const p = t.transitional || He;
      t.timeoutErrorMessage && (d = t.timeoutErrorMessage), n(new m(
        d,
        p.clarifyTimeoutError ? m.ETIMEDOUT : m.ECONNABORTED,
        t,
        c
      )), c = null;
    }, R.isStandardBrowserEnv) {
      const y = (t.withCredentials || bs(h)) && t.xsrfCookieName && ws.read(t.xsrfCookieName);
      y && r.set(t.xsrfHeaderName, y);
    }
    i === void 0 && r.setContentType(null), "setRequestHeader" in c && a.forEach(r.toJSON(), function(d, p) {
      c.setRequestHeader(p, d);
    }), a.isUndefined(t.withCredentials) || (c.withCredentials = !!t.withCredentials), o && o !== "json" && (c.responseType = t.responseType), typeof t.onDownloadProgress == "function" && c.addEventListener("progress", Ae(t.onDownloadProgress, !0)), typeof t.onUploadProgress == "function" && c.upload && c.upload.addEventListener("progress", Ae(t.onUploadProgress)), (t.cancelToken || t.signal) && (l = (y) => {
      c && (n(!y || y.type ? new U(null, t, c) : y), c.abort(), c = null);
    }, t.cancelToken && t.cancelToken.subscribe(l), t.signal && (t.signal.aborted ? l() : t.signal.addEventListener("abort", l)));
    const w = Os(h);
    if (w && R.protocols.indexOf(w) === -1) {
      n(new m("Unsupported protocol " + w + ":", m.ERR_BAD_REQUEST, t));
      return;
    }
    c.send(i || null);
  });
}, V = {
  http: Zt,
  xhr: _s
};
a.forEach(V, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: e });
    } catch {
    }
    Object.defineProperty(t, "adapterName", { value: e });
  }
});
const Ps = {
  getAdapter: (t) => {
    t = a.isArray(t) ? t : [t];
    const { length: e } = t;
    let s, n;
    for (let i = 0; i < e && (s = t[i], !(n = a.isString(s) ? V[s.toLowerCase()] : s)); i++)
      ;
    if (!n)
      throw n === !1 ? new m(
        `Adapter ${s} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        a.hasOwnProp(V, s) ? `Adapter '${s}' is not available in the build` : `Unknown adapter '${s}'`
      );
    if (!a.isFunction(n))
      throw new TypeError("adapter is not a function");
    return n;
  },
  adapters: V
};
function se(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new U(null, t);
}
function _e(t) {
  return se(t), t.headers = P.from(t.headers), t.data = te.call(
    t,
    t.transformRequest
  ), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), Ps.getAdapter(t.adapter || he.adapter)(t).then(function(n) {
    return se(t), n.data = te.call(
      t,
      t.transformResponse,
      n
    ), n.headers = P.from(n.headers), n;
  }, function(n) {
    return Ve(n) || (se(t), n && n.response && (n.response.data = te.call(
      t,
      t.transformResponse,
      n.response
    ), n.response.headers = P.from(n.response.headers))), Promise.reject(n);
  });
}
const Pe = (t) => t instanceof P ? t.toJSON() : t;
function L(t, e) {
  e = e || {};
  const s = {};
  function n(c, h, f) {
    return a.isPlainObject(c) && a.isPlainObject(h) ? a.merge.call({ caseless: f }, c, h) : a.isPlainObject(h) ? a.merge({}, h) : a.isArray(h) ? h.slice() : h;
  }
  function i(c, h, f) {
    if (a.isUndefined(h)) {
      if (!a.isUndefined(c))
        return n(void 0, c, f);
    } else
      return n(c, h, f);
  }
  function r(c, h) {
    if (!a.isUndefined(h))
      return n(void 0, h);
  }
  function o(c, h) {
    if (a.isUndefined(h)) {
      if (!a.isUndefined(c))
        return n(void 0, c);
    } else
      return n(void 0, h);
  }
  function l(c, h, f) {
    if (f in e)
      return n(c, h);
    if (f in t)
      return n(void 0, c);
  }
  const u = {
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
    headers: (c, h) => i(Pe(c), Pe(h), !0)
  };
  return a.forEach(Object.keys(Object.assign({}, t, e)), function(h) {
    const f = u[h] || i, w = f(t[h], e[h], h);
    a.isUndefined(w) && f !== l || (s[h] = w);
  }), s;
}
const Je = "1.4.0", de = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
  de[t] = function(n) {
    return typeof n === t || "a" + (e < 1 ? "n " : " ") + t;
  };
});
const Ce = {};
de.transitional = function(e, s, n) {
  function i(r, o) {
    return "[Axios v" + Je + "] Transitional option '" + r + "'" + o + (n ? ". " + n : "");
  }
  return (r, o, l) => {
    if (e === !1)
      throw new m(
        i(o, " has been removed" + (s ? " in " + s : "")),
        m.ERR_DEPRECATED
      );
    return s && !Ce[o] && (Ce[o] = !0, console.warn(
      i(
        o,
        " has been deprecated since v" + s + " and will be removed in the near future"
      )
    )), e ? e(r, o, l) : !0;
  };
};
function Cs(t, e, s) {
  if (typeof t != "object")
    throw new m("options must be an object", m.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(t);
  let i = n.length;
  for (; i-- > 0; ) {
    const r = n[i], o = e[r];
    if (o) {
      const l = t[r], u = l === void 0 || o(l, r, t);
      if (u !== !0)
        throw new m("option " + r + " must be " + u, m.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (s !== !0)
      throw new m("Unknown option " + r, m.ERR_BAD_OPTION);
  }
}
const oe = {
  assertOptions: Cs,
  validators: de
}, C = oe.validators;
class J {
  constructor(e) {
    this.defaults = e, this.interceptors = {
      request: new Oe(),
      response: new Oe()
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
  request(e, s) {
    typeof e == "string" ? (s = s || {}, s.url = e) : s = e || {}, s = L(this.defaults, s);
    const { transitional: n, paramsSerializer: i, headers: r } = s;
    n !== void 0 && oe.assertOptions(n, {
      silentJSONParsing: C.transitional(C.boolean),
      forcedJSONParsing: C.transitional(C.boolean),
      clarifyTimeoutError: C.transitional(C.boolean)
    }, !1), i != null && (a.isFunction(i) ? s.paramsSerializer = {
      serialize: i
    } : oe.assertOptions(i, {
      encode: C.function,
      serialize: C.function
    }, !0)), s.method = (s.method || this.defaults.method || "get").toLowerCase();
    let o;
    o = r && a.merge(
      r.common,
      r[s.method]
    ), o && a.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (d) => {
        delete r[d];
      }
    ), s.headers = P.concat(o, r);
    const l = [];
    let u = !0;
    this.interceptors.request.forEach(function(p) {
      typeof p.runWhen == "function" && p.runWhen(s) === !1 || (u = u && p.synchronous, l.unshift(p.fulfilled, p.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function(p) {
      c.push(p.fulfilled, p.rejected);
    });
    let h, f = 0, w;
    if (!u) {
      const d = [_e.bind(this), void 0];
      for (d.unshift.apply(d, l), d.push.apply(d, c), w = d.length, h = Promise.resolve(s); f < w; )
        h = h.then(d[f++], d[f++]);
      return h;
    }
    w = l.length;
    let y = s;
    for (f = 0; f < w; ) {
      const d = l[f++], p = l[f++];
      try {
        y = d(y);
      } catch (_) {
        p.call(this, _);
        break;
      }
    }
    try {
      h = _e.call(this, y);
    } catch (d) {
      return Promise.reject(d);
    }
    for (f = 0, w = c.length; f < w; )
      h = h.then(c[f++], c[f++]);
    return h;
  }
  getUri(e) {
    e = L(this.defaults, e);
    const s = We(e.baseURL, e.url);
    return je(s, e.params, e.paramsSerializer);
  }
}
a.forEach(["delete", "get", "head", "options"], function(e) {
  J.prototype[e] = function(s, n) {
    return this.request(L(n || {}, {
      method: e,
      url: s,
      data: (n || {}).data
    }));
  };
});
a.forEach(["post", "put", "patch"], function(e) {
  function s(n) {
    return function(r, o, l) {
      return this.request(L(l || {}, {
        method: e,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: r,
        data: o
      }));
    };
  }
  J.prototype[e] = s(), J.prototype[e + "Form"] = s(!0);
});
const W = J;
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
      n.reason || (n.reason = new U(r, o, l), s(n.reason));
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
const Ts = ue;
function xs(t) {
  return function(s) {
    return t.apply(null, s);
  };
}
function Ns(t) {
  return a.isObject(t) && t.isAxiosError === !0;
}
const ae = {
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
Object.entries(ae).forEach(([t, e]) => {
  ae[e] = t;
});
const Ls = ae;
function Ke(t) {
  const e = new W(t), s = xe(W.prototype.request, e);
  return a.extend(s, W.prototype, e, { allOwnKeys: !0 }), a.extend(s, e, null, { allOwnKeys: !0 }), s.create = function(i) {
    return Ke(L(t, i));
  }, s;
}
const g = Ke(he);
g.Axios = W;
g.CanceledError = U;
g.CancelToken = Ts;
g.isCancel = Ve;
g.VERSION = Je;
g.toFormData = Z;
g.AxiosError = m;
g.Cancel = g.CanceledError;
g.all = function(e) {
  return Promise.all(e);
};
g.spread = xs;
g.isAxiosError = Ns;
g.mergeConfig = L;
g.AxiosHeaders = P;
g.formToJSON = (t) => qe(a.isHTMLForm(t) ? new FormData(t) : t);
g.HttpStatusCode = Ls;
g.default = g;
const Ds = g, Ge = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [n, i] of e)
    s[n] = i;
  return s;
}, Is = {
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
}, Fs = ["href", "data-pswp-width", "data-pswp-height", "alt"], ks = { class: "hidden-caption-content" }, vs = ["src"];
function Us(t, e, s, n, i, r) {
  return x(), N("a", {
    key: s.key,
    href: s.image.largeURL,
    "data-pswp-width": s.image.width,
    "data-pswp-height": s.image.height,
    alt: s.image.alt,
    target: "_blank",
    rel: "noreferrer"
  }, [
    O("span", ks, z(s.image.alt), 1),
    O("img", {
      src: s.image.thumbnailURL,
      alt: "",
      onMouseover: e[0] || (e[0] = (...o) => r.enlargeImage && r.enlargeImage(...o)),
      onMouseout: e[1] || (e[1] = (...o) => r.shrinkImage && r.shrinkImage(...o)),
      class: Ze({
        "img-default-size": !0,
        "img-enlarged-size": i.imageEnlarged
      })
    }, null, 42, vs)
  ], 8, Fs);
}
const Bs = /* @__PURE__ */ Ge(Is, [["render", Us]]), Ms = {
  name: "FlickrGallery",
  components: { Image: Bs },
  props: {
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
    this.photos = this.loadFlickrPhotos();
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
        pswpModule: () => import("./photoswipe.esm-1ed49027.js")
      };
      if (!this.lightbox) {
        const e = new mt(t);
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
        }), e.init(), this.lightbox = e;
      }
    },
    async loadFlickrPhotos(t) {
      this.loading = !0;
      const e = this.endpoint + "?method=" + this.method + "&api_key=" + this.apiKey + "&tags=" + this.tags + "&user_id=" + this.userId + "&photoset_id=" + this.photosetId + "&format=json&page=" + this.page + "&per_page=" + this.perPage + "&extras=" + this.extras + "&nojsoncallback=1", s = {};
      await Ds.get(e, s, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(({ data: n }) => {
        let i = [];
        this.method == "flickr.photosets.getPhotos" ? (this.totalPictures = n.photoset.total, this.totalPages = n.photoset.pages, n.photoset.photo.forEach(function(r, o) {
          i[o] = {
            largeURL: r.url_l,
            thumbnailURL: r.url_m,
            title: r.title,
            alt: r.title,
            width: r.width_l,
            height: r.height_l
          };
        })) : this.method == "flickr.photos.search" && (this.totalPictures = n.photos.total, this.totalPages = n.photos.pages, n.photos.photo.forEach(function(r, o) {
          i[o] = {
            largeURL: r.url_l,
            thumbnailURL: r.url_m,
            title: r.title,
            alt: r.title,
            width: r.width_l,
            height: r.height_l
          };
        })), this.photos = i;
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
}, zs = ["id"], js = { class: "flickr-images" }, Hs = {
  key: 0,
  class: "flickr-navigation"
}, qs = { class: "prev" }, Vs = { class: "current" }, Ws = { class: "next" };
function Js(t, e, s, n, i, r) {
  const o = Xe("Image");
  return x(), N("div", { id: t.galleryID }, [
    fe(Qe, { name: "fade" }, {
      default: Ye(() => [
        t.loading ? pe("", !0) : (x(), N("div", {
          key: 0,
          style: et(t.flickrLoadingStyle),
          class: "flickr-container",
          ref: "flickr-container"
        }, [
          O("h3", null, z(s.title ? s.title : "Selected Photos"), 1),
          O("div", js, [
            (x(!0), N(tt, null, st(t.photos, (l) => (x(), N("span", null, [
              fe(o, { image: l }, null, 8, ["image"])
            ]))), 256))
          ])
        ], 4))
      ]),
      _: 1
    }),
    s.useNavigation ? (x(), N("div", Hs, [
      O("span", qs, [
        O("button", {
          onClick: e[0] || (e[0] = (...l) => r.previousPage && r.previousPage(...l)),
          onKeyup: e[1] || (e[1] = me((...l) => r.previousPage && r.previousPage(...l), ["right"]))
        }, " << ", 32)
      ]),
      O("span", Vs, [
        O("button", {
          onClick: e[2] || (e[2] = () => {
          })
        }, " Seite " + z(t.page) + "/" + z(t.totalPages), 1)
      ]),
      O("span", Ws, [
        O("button", {
          onClick: e[3] || (e[3] = (...l) => r.nextPage && r.nextPage(...l)),
          onKeyup: e[4] || (e[4] = me((...l) => r.nextPage && r.nextPage(...l), ["right"]))
        }, " >> ", 32)
      ])
    ])) : pe("", !0)
  ], 8, zs);
}
const Gs = /* @__PURE__ */ Ge(Ms, [["render", Js]]);
export {
  Gs as default
};
