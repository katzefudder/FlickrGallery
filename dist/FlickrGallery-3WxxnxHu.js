import { openBlock as N, createElementBlock as F, createElementVNode as v, normalizeClass as pt, resolveComponent as mt, createVNode as Oe, Transition as gt, withCtx as yt, normalizeStyle as wt, toDisplayString as oe, createCommentVNode as ae, Fragment as bt, renderList as Et, withKeys as Te } from "vue";
/*!
  * PhotoSwipe Lightbox 5.4.4 - https://photoswipe.com
  * (c) 2024 Dmytro Semenov
  */
function q(t, e, n) {
  const s = document.createElement(e);
  return t && (s.className = t), n && n.appendChild(s), s;
}
function St(t, e, n) {
  let s = `translate3d(${t}px,0px,0)`;
  return n !== void 0 && (s += ` scale3d(${n},${n},1)`), s;
}
function he(t, e, n) {
  t.style.width = typeof e == "number" ? `${e}px` : e, t.style.height = typeof n == "number" ? `${n}px` : n;
}
const P = {
  IDLE: "idle",
  LOADING: "loading",
  LOADED: "loaded",
  ERROR: "error"
};
function Rt(t) {
  return "button" in t && t.button === 1 || t.ctrlKey || t.metaKey || t.altKey || t.shiftKey;
}
function H(t, e, n = document) {
  let s = [];
  if (t instanceof Element)
    s = [t];
  else if (t instanceof NodeList || Array.isArray(t))
    s = Array.from(t);
  else {
    const i = typeof t == "string" ? t : e;
    i && (s = Array.from(n.querySelectorAll(i)));
  }
  return s;
}
function _t(t) {
  return typeof t == "function" && t.prototype && t.prototype.goTo;
}
function Ae() {
  return !!(navigator.vendor && navigator.vendor.match(/apple/i));
}
class Ot {
  /**
   * @param {T} type
   * @param {PhotoSwipeEventsMap[T]} [details]
   */
  constructor(e, n) {
    this.type = e, this.defaultPrevented = !1, n && Object.assign(this, n);
  }
  preventDefault() {
    this.defaultPrevented = !0;
  }
}
class Tt {
  constructor() {
    this._listeners = {}, this._filters = {}, this.pswp = void 0, this.options = void 0;
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   * @param {number} priority
   */
  addFilter(e, n, s = 100) {
    var i, r, o;
    this._filters[e] || (this._filters[e] = []), (i = this._filters[e]) === null || i === void 0 || i.push({
      fn: n,
      priority: s
    }), (r = this._filters[e]) === null || r === void 0 || r.sort((l, u) => l.priority - u.priority), (o = this.pswp) === null || o === void 0 || o.addFilter(e, n, s);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   */
  removeFilter(e, n) {
    this._filters[e] && (this._filters[e] = this._filters[e].filter((s) => s.fn !== n)), this.pswp && this.pswp.removeFilter(e, n);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {Parameters<PhotoSwipeFiltersMap[T]>} args
   * @returns {Parameters<PhotoSwipeFiltersMap[T]>[0]}
   */
  applyFilters(e, ...n) {
    var s;
    return (s = this._filters[e]) === null || s === void 0 || s.forEach((i) => {
      n[0] = i.fn.apply(this, n);
    }), n[0];
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  on(e, n) {
    var s, i;
    this._listeners[e] || (this._listeners[e] = []), (s = this._listeners[e]) === null || s === void 0 || s.push(n), (i = this.pswp) === null || i === void 0 || i.on(e, n);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  off(e, n) {
    var s;
    this._listeners[e] && (this._listeners[e] = this._listeners[e].filter((i) => n !== i)), (s = this.pswp) === null || s === void 0 || s.off(e, n);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {PhotoSwipeEventsMap[T]} [details]
   * @returns {AugmentedEvent<T>}
   */
  dispatch(e, n) {
    var s;
    if (this.pswp)
      return this.pswp.dispatch(e, n);
    const i = (
      /** @type {AugmentedEvent<T>} */
      new Ot(e, n)
    );
    return (s = this._listeners[e]) === null || s === void 0 || s.forEach((r) => {
      r.call(this, i);
    }), i;
  }
}
class At {
  /**
   * @param {string | false} imageSrc
   * @param {HTMLElement} container
   */
  constructor(e, n) {
    if (this.element = q("pswp__img pswp__img--placeholder", e ? "img" : "div", n), e) {
      const s = (
        /** @type {HTMLImageElement} */
        this.element
      );
      s.decoding = "async", s.alt = "", s.src = e, s.setAttribute("role", "presentation");
    }
    this.element.setAttribute("aria-hidden", "true");
  }
  /**
   * @param {number} width
   * @param {number} height
   */
  setDisplayedSize(e, n) {
    this.element && (this.element.tagName === "IMG" ? (he(this.element, 250, "auto"), this.element.style.transformOrigin = "0 0", this.element.style.transform = St(0, 0, e / 250)) : he(this.element, e, n));
  }
  destroy() {
    var e;
    (e = this.element) !== null && e !== void 0 && e.parentNode && this.element.remove(), this.element = null;
  }
}
class Pt {
  /**
   * @param {SlideData} itemData Slide data
   * @param {PhotoSwipeBase} instance PhotoSwipe or PhotoSwipeLightbox instance
   * @param {number} index
   */
  constructor(e, n, s) {
    this.instance = n, this.data = e, this.index = s, this.element = void 0, this.placeholder = void 0, this.slide = void 0, this.displayedImageWidth = 0, this.displayedImageHeight = 0, this.width = Number(this.data.w) || Number(this.data.width) || 0, this.height = Number(this.data.h) || Number(this.data.height) || 0, this.isAttached = !1, this.hasSlide = !1, this.isDecoding = !1, this.state = P.IDLE, this.data.type ? this.type = this.data.type : this.data.src ? this.type = "image" : this.type = "html", this.instance.dispatch("contentInit", {
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
  load(e, n) {
    if (this.slide && this.usePlaceholder())
      if (this.placeholder) {
        const s = this.placeholder.element;
        s && !s.parentElement && this.slide.container.prepend(s);
      } else {
        const s = this.instance.applyFilters(
          "placeholderSrc",
          // use  image-based placeholder only for the first slide,
          // as rendering (even small stretched thumbnail) is an expensive operation
          this.data.msrc && this.slide.isFirstSlide ? this.data.msrc : !1,
          this
        );
        this.placeholder = new At(s, this.slide.container);
      }
    this.element && !n || this.instance.dispatch("contentLoad", {
      content: this,
      isLazy: e
    }).defaultPrevented || (this.isImageContent() ? (this.element = q("pswp__img", "img"), this.displayedImageWidth && this.loadImage(e)) : (this.element = q("pswp__content", "div"), this.element.innerHTML = this.data.html || ""), n && this.slide && this.slide.updateContentSize(!0));
  }
  /**
   * Preload image
   *
   * @param {boolean} isLazy
   */
  loadImage(e) {
    var n, s;
    if (!this.isImageContent() || !this.element || this.instance.dispatch("contentLoadImage", {
      content: this,
      isLazy: e
    }).defaultPrevented)
      return;
    const i = (
      /** @type HTMLImageElement */
      this.element
    );
    this.updateSrcsetSizes(), this.data.srcset && (i.srcset = this.data.srcset), i.src = (n = this.data.src) !== null && n !== void 0 ? n : "", i.alt = (s = this.data.alt) !== null && s !== void 0 ? s : "", this.state = P.LOADING, i.complete ? this.onLoaded() : (i.onload = () => {
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
    this.state = P.LOADED, this.slide && this.element && (this.instance.dispatch("loadComplete", {
      slide: this.slide,
      content: this
    }), this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode && (this.append(), this.slide.updateContentSize(!0)), (this.state === P.LOADED || this.state === P.ERROR) && this.removePlaceholder());
  }
  /**
   * Content load error handler
   */
  onError() {
    this.state = P.ERROR, this.slide && (this.displayError(), this.instance.dispatch("loadComplete", {
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
    return this.instance.applyFilters("isContentLoading", this.state === P.LOADING, this);
  }
  /**
   * @returns {Boolean} If the content is in error state
   */
  isError() {
    return this.state === P.ERROR;
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
  setDisplayedSize(e, n) {
    if (this.element && (this.placeholder && this.placeholder.setDisplayedSize(e, n), !this.instance.dispatch("contentResize", {
      content: this,
      width: e,
      height: n
    }).defaultPrevented && (he(this.element, e, n), this.isImageContent() && !this.isError()))) {
      const s = !this.displayedImageWidth && e;
      this.displayedImageWidth = e, this.displayedImageHeight = n, s ? this.loadImage(!1) : this.updateSrcsetSizes(), this.slide && this.instance.dispatch("imageSizeChange", {
        slide: this.slide,
        width: e,
        height: n,
        content: this
      });
    }
  }
  /**
   * @returns {boolean} If the content can be zoomed
   */
  isZoomable() {
    return this.instance.applyFilters("isContentZoomable", this.isImageContent() && this.state !== P.ERROR, this);
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
    ), n = this.instance.applyFilters("srcsetSizesWidth", this.displayedImageWidth, this);
    (!e.dataset.largestUsedSize || n > parseInt(e.dataset.largestUsedSize, 10)) && (e.sizes = n + "px", e.dataset.largestUsedSize = String(n));
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
      var e, n;
      let s = q("pswp__error-msg", "div");
      s.innerText = (e = (n = this.instance.options) === null || n === void 0 ? void 0 : n.errorMsg) !== null && e !== void 0 ? e : "", s = /** @type {HTMLDivElement} */
      this.instance.applyFilters("contentErrorElement", s, this), this.element = q("pswp__content pswp__error-msg-container", "div"), this.element.appendChild(s), this.slide.container.innerText = "", this.slide.container.appendChild(this.element), this.slide.updateContentSize(!0), this.removePlaceholder();
    }
  }
  /**
   * Append the content
   */
  append() {
    if (this.isAttached || !this.element)
      return;
    if (this.isAttached = !0, this.state === P.ERROR) {
      this.displayError();
      return;
    }
    if (this.instance.dispatch("contentAppend", {
      content: this
    }).defaultPrevented)
      return;
    const e = "decode" in this.element;
    this.isImageContent() ? e && this.slide && (!this.slide.isActive || Ae()) ? (this.isDecoding = !0, this.element.decode().catch(() => {
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
    }).defaultPrevented || !this.slide || (this.isImageContent() && this.isDecoding && !Ae() ? this.appendImage() : this.isError() && this.load(!1, !0), this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "false"));
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
    }).defaultPrevented || (this.slide && this.element && !this.element.parentNode && this.slide.container.appendChild(this.element), (this.state === P.LOADED || this.state === P.ERROR) && this.removePlaceholder()));
  }
}
function Ct(t, e) {
  if (t.getViewportSizeFn) {
    const n = t.getViewportSizeFn(t, e);
    if (n)
      return n;
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
function J(t, e, n, s, i) {
  let r = 0;
  if (e.paddingFn)
    r = e.paddingFn(n, s, i)[t];
  else if (e.padding)
    r = e.padding[t];
  else {
    const o = "padding" + t[0].toUpperCase() + t.slice(1);
    e[o] && (r = e[o]);
  }
  return Number(r) || 0;
}
function xt(t, e, n, s) {
  return {
    x: e.x - J("left", t, e, n, s) - J("right", t, e, n, s),
    y: e.y - J("top", t, e, n, s) - J("bottom", t, e, n, s)
  };
}
const Pe = 4e3;
class Lt {
  /**
   * @param {PhotoSwipeOptions} options PhotoSwipe options
   * @param {SlideData} itemData Slide data
   * @param {number} index Slide index
   * @param {PhotoSwipe} [pswp] PhotoSwipe instance, can be undefined if not initialized yet
   */
  constructor(e, n, s, i) {
    this.pswp = i, this.options = e, this.itemData = n, this.index = s, this.panAreaSize = null, this.elementSize = null, this.fit = 1, this.fill = 1, this.vFill = 1, this.initial = 1, this.secondary = 1, this.max = 1, this.min = 1;
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
  update(e, n, s) {
    const i = {
      x: e,
      y: n
    };
    this.elementSize = i, this.panAreaSize = s;
    const r = s.x / i.x, o = s.y / i.y;
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
    const n = (
      /** @type {'initialZoomLevel' | 'secondaryZoomLevel' | 'maxZoomLevel'} */
      e + "ZoomLevel"
    ), s = this.options[n];
    if (s)
      return typeof s == "function" ? s(this) : s === "fill" ? this.fill : s === "fit" ? this.fit : Number(s);
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
    return e || (e = Math.min(1, this.fit * 3), this.elementSize && e * this.elementSize.x > Pe && (e = Pe / this.elementSize.x), e);
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
function qe(t, e, n) {
  const s = e.createContentFromData(t, n);
  let i;
  const {
    options: r
  } = e;
  if (r) {
    i = new Lt(r, t, -1);
    let o;
    e.pswp ? o = e.pswp.viewportSize : o = Ct(r, e);
    const l = xt(r, o, t, n);
    i.update(s.width, s.height, l);
  }
  return s.lazyLoad(), i && s.setDisplayedSize(Math.ceil(s.width * i.initial), Math.ceil(s.height * i.initial)), s;
}
function vt(t, e) {
  const n = e.getItemData(t);
  if (!e.dispatch("lazyLoadSlide", {
    index: t,
    itemData: n
  }).defaultPrevented)
    return qe(n, e, t);
}
class Dt extends Tt {
  /**
   * Get total number of slides
   *
   * @returns {number}
   */
  getNumItems() {
    var e;
    let n = 0;
    const s = (e = this.options) === null || e === void 0 ? void 0 : e.dataSource;
    s && "length" in s ? n = s.length : s && "gallery" in s && (s.items || (s.items = this._getGalleryDOMElements(s.gallery)), s.items && (n = s.items.length));
    const i = this.dispatch("numItems", {
      dataSource: s,
      numItems: n
    });
    return this.applyFilters("numItems", i.numItems, s);
  }
  /**
   * @param {SlideData} slideData
   * @param {number} index
   * @returns {Content}
   */
  createContentFromData(e, n) {
    return new Pt(e, this, n);
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
    var n;
    const s = (n = this.options) === null || n === void 0 ? void 0 : n.dataSource;
    let i = {};
    Array.isArray(s) ? i = s[e] : s && "gallery" in s && (s.items || (s.items = this._getGalleryDOMElements(s.gallery)), i = s.items[e]);
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
    var n, s;
    return (n = this.options) !== null && n !== void 0 && n.children || (s = this.options) !== null && s !== void 0 && s.childSelector ? H(this.options.children, this.options.childSelector, e) || [] : [e];
  }
  /**
   * Converts DOM element to item data object.
   *
   * @param {HTMLElement} element DOM element
   * @returns {SlideData}
   */
  _domElementToItemData(e) {
    const n = {
      element: e
    }, s = (
      /** @type {HTMLAnchorElement} */
      e.tagName === "A" ? e : e.querySelector("a")
    );
    if (s) {
      n.src = s.dataset.pswpSrc || s.href, s.dataset.pswpSrcset && (n.srcset = s.dataset.pswpSrcset), n.width = s.dataset.pswpWidth ? parseInt(s.dataset.pswpWidth, 10) : 0, n.height = s.dataset.pswpHeight ? parseInt(s.dataset.pswpHeight, 10) : 0, n.w = n.width, n.h = n.height, s.dataset.pswpType && (n.type = s.dataset.pswpType);
      const r = e.querySelector("img");
      if (r) {
        var i;
        n.msrc = r.currentSrc || r.src, n.alt = (i = r.getAttribute("alt")) !== null && i !== void 0 ? i : "";
      }
      (s.dataset.pswpCropped || s.dataset.cropped) && (n.thumbCropped = !0);
    }
    return this.applyFilters("domItemData", n, e, s);
  }
  /**
   * Lazy-load by slide data
   *
   * @param {SlideData} itemData Data about the slide
   * @param {number} index
   * @returns {Content} Image that is being decoded or false.
   */
  lazyLoadData(e, n) {
    return qe(e, this, n);
  }
}
class It extends Dt {
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
    H(this.options.gallery, this.options.gallerySelector).forEach((e) => {
      e.addEventListener("click", this.onThumbnailsClick, !1);
    });
  }
  /**
   * @param {MouseEvent} e
   */
  onThumbnailsClick(e) {
    if (Rt(e) || window.pswp)
      return;
    let n = {
      x: e.clientX,
      y: e.clientY
    };
    !n.x && !n.y && (n = null);
    let s = this.getClickedIndex(e);
    s = this.applyFilters("clickedIndex", s, e, this);
    const i = {
      gallery: (
        /** @type {HTMLElement} */
        e.currentTarget
      )
    };
    s >= 0 && (e.preventDefault(), this.loadAndOpen(s, i, n));
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
    const n = (
      /** @type {HTMLElement} */
      e.target
    ), i = H(
      this.options.children,
      this.options.childSelector,
      /** @type {HTMLElement} */
      e.currentTarget
    ).findIndex((r) => r === n || r.contains(n));
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
  loadAndOpen(e, n, s) {
    if (window.pswp || !this.options)
      return !1;
    if (!n && this.options.gallery && this.options.children) {
      const i = H(this.options.gallery);
      i[0] && (n = {
        gallery: i[0]
      });
    }
    return this.options.index = e, this.options.initialPointerPos = s, this.shouldOpen = !0, this.preload(e, n), !0;
  }
  /**
   * Load the main module and the slide content by index
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   */
  preload(e, n) {
    const {
      options: s
    } = this;
    n && (s.dataSource = n);
    const i = [], r = typeof s.pswpModule;
    if (_t(s.pswpModule))
      i.push(Promise.resolve(
        /** @type {Type<PhotoSwipe>} */
        s.pswpModule
      ));
    else {
      if (r === "string")
        throw new Error("pswpModule as string is no longer supported");
      if (r === "function")
        i.push(
          /** @type {() => Promise<Type<PhotoSwipe>>} */
          s.pswpModule()
        );
      else
        throw new Error("pswpModule is not valid");
    }
    typeof s.openPromise == "function" && i.push(s.openPromise()), s.preloadFirstSlide !== !1 && e >= 0 && (this._preloadedContent = vt(e, this));
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
  _openPhotoswipe(e, n) {
    if (n !== this._uid && this.shouldOpen || (this.shouldOpen = !1, window.pswp))
      return;
    const s = typeof e == "object" ? new e.default(this.options) : new e(this.options);
    this.pswp = s, window.pswp = s, Object.keys(this._listeners).forEach((i) => {
      var r;
      (r = this._listeners[i]) === null || r === void 0 || r.forEach((o) => {
        s.on(
          i,
          /** @type {EventCallback<typeof name>} */
          o
        );
      });
    }), Object.keys(this._filters).forEach((i) => {
      var r;
      (r = this._filters[i]) === null || r === void 0 || r.forEach((o) => {
        s.addFilter(i, o.fn, o.priority);
      });
    }), this._preloadedContent && (s.contentLoader.addToCache(this._preloadedContent), this._preloadedContent = void 0), s.on("destroy", () => {
      this.pswp = void 0, delete window.pswp;
    }), s.init();
  }
  /**
   * Unbinds all events, closes PhotoSwipe if it's open.
   */
  destroy() {
    var e;
    (e = this.pswp) === null || e === void 0 || e.destroy(), this.shouldOpen = !1, this._listeners = {}, H(this.options.gallery, this.options.gallerySelector).forEach((n) => {
      n.removeEventListener("click", this.onThumbnailsClick, !1);
    });
  }
}
function He(t, e) {
  return function() {
    return t.apply(e, arguments);
  };
}
const { toString: Nt } = Object.prototype, { getPrototypeOf: be } = Object, ee = /* @__PURE__ */ ((t) => (e) => {
  const n = Nt.call(e);
  return t[n] || (t[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), C = (t) => (t = t.toLowerCase(), (e) => ee(e) === t), te = (t) => (e) => typeof e === t, { isArray: M } = Array, $ = te("undefined");
function Ft(t) {
  return t !== null && !$(t) && t.constructor !== null && !$(t.constructor) && A(t.constructor.isBuffer) && t.constructor.isBuffer(t);
}
const $e = C("ArrayBuffer");
function kt(t) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && $e(t.buffer), e;
}
const Ut = te("string"), A = te("function"), Ve = te("number"), se = (t) => t !== null && typeof t == "object", Bt = (t) => t === !0 || t === !1, G = (t) => {
  if (ee(t) !== "object")
    return !1;
  const e = be(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}, Mt = C("Date"), zt = C("File"), jt = C("Blob"), qt = C("FileList"), Ht = (t) => se(t) && A(t.pipe), $t = (t) => {
  let e;
  return t && (typeof FormData == "function" && t instanceof FormData || A(t.append) && ((e = ee(t)) === "formdata" || // detect form-data instance
  e === "object" && A(t.toString) && t.toString() === "[object FormData]"));
}, Vt = C("URLSearchParams"), [Wt, Kt, Jt, Gt] = ["ReadableStream", "Request", "Response", "Headers"].map(C), Xt = (t) => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function V(t, e, { allOwnKeys: n = !1 } = {}) {
  if (t === null || typeof t > "u")
    return;
  let s, i;
  if (typeof t != "object" && (t = [t]), M(t))
    for (s = 0, i = t.length; s < i; s++)
      e.call(null, t[s], s, t);
  else {
    const r = n ? Object.getOwnPropertyNames(t) : Object.keys(t), o = r.length;
    let l;
    for (s = 0; s < o; s++)
      l = r[s], e.call(null, t[l], l, t);
  }
}
function We(t, e) {
  e = e.toLowerCase();
  const n = Object.keys(t);
  let s = n.length, i;
  for (; s-- > 0; )
    if (i = n[s], e === i.toLowerCase())
      return i;
  return null;
}
const k = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Ke = (t) => !$(t) && t !== k;
function fe() {
  const { caseless: t } = Ke(this) && this || {}, e = {}, n = (s, i) => {
    const r = t && We(e, i) || i;
    G(e[r]) && G(s) ? e[r] = fe(e[r], s) : G(s) ? e[r] = fe({}, s) : M(s) ? e[r] = s.slice() : e[r] = s;
  };
  for (let s = 0, i = arguments.length; s < i; s++)
    arguments[s] && V(arguments[s], n);
  return e;
}
const Zt = (t, e, n, { allOwnKeys: s } = {}) => (V(e, (i, r) => {
  n && A(i) ? t[r] = He(i, n) : t[r] = i;
}, { allOwnKeys: s }), t), Qt = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t), Yt = (t, e, n, s) => {
  t.prototype = Object.create(e.prototype, s), t.prototype.constructor = t, Object.defineProperty(t, "super", {
    value: e.prototype
  }), n && Object.assign(t.prototype, n);
}, es = (t, e, n, s) => {
  let i, r, o;
  const l = {};
  if (e = e || {}, t == null) return e;
  do {
    for (i = Object.getOwnPropertyNames(t), r = i.length; r-- > 0; )
      o = i[r], (!s || s(o, t, e)) && !l[o] && (e[o] = t[o], l[o] = !0);
    t = n !== !1 && be(t);
  } while (t && (!n || n(t, e)) && t !== Object.prototype);
  return e;
}, ts = (t, e, n) => {
  t = String(t), (n === void 0 || n > t.length) && (n = t.length), n -= e.length;
  const s = t.indexOf(e, n);
  return s !== -1 && s === n;
}, ss = (t) => {
  if (!t) return null;
  if (M(t)) return t;
  let e = t.length;
  if (!Ve(e)) return null;
  const n = new Array(e);
  for (; e-- > 0; )
    n[e] = t[e];
  return n;
}, ns = /* @__PURE__ */ ((t) => (e) => t && e instanceof t)(typeof Uint8Array < "u" && be(Uint8Array)), is = (t, e) => {
  const s = (t && t[Symbol.iterator]).call(t);
  let i;
  for (; (i = s.next()) && !i.done; ) {
    const r = i.value;
    e.call(t, r[0], r[1]);
  }
}, rs = (t, e) => {
  let n;
  const s = [];
  for (; (n = t.exec(e)) !== null; )
    s.push(n);
  return s;
}, os = C("HTMLFormElement"), as = (t) => t.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, s, i) {
    return s.toUpperCase() + i;
  }
), Ce = (({ hasOwnProperty: t }) => (e, n) => t.call(e, n))(Object.prototype), ls = C("RegExp"), Je = (t, e) => {
  const n = Object.getOwnPropertyDescriptors(t), s = {};
  V(n, (i, r) => {
    let o;
    (o = e(i, r, t)) !== !1 && (s[r] = o || i);
  }), Object.defineProperties(t, s);
}, cs = (t) => {
  Je(t, (e, n) => {
    if (A(t) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const s = t[n];
    if (A(s)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, ds = (t, e) => {
  const n = {}, s = (i) => {
    i.forEach((r) => {
      n[r] = !0;
    });
  };
  return M(t) ? s(t) : s(String(t).split(e)), n;
}, us = () => {
}, hs = (t, e) => t != null && Number.isFinite(t = +t) ? t : e, le = "abcdefghijklmnopqrstuvwxyz", xe = "0123456789", Ge = {
  DIGIT: xe,
  ALPHA: le,
  ALPHA_DIGIT: le + le.toUpperCase() + xe
}, fs = (t = 16, e = Ge.ALPHA_DIGIT) => {
  let n = "";
  const { length: s } = e;
  for (; t--; )
    n += e[Math.random() * s | 0];
  return n;
};
function ps(t) {
  return !!(t && A(t.append) && t[Symbol.toStringTag] === "FormData" && t[Symbol.iterator]);
}
const ms = (t) => {
  const e = new Array(10), n = (s, i) => {
    if (se(s)) {
      if (e.indexOf(s) >= 0)
        return;
      if (!("toJSON" in s)) {
        e[i] = s;
        const r = M(s) ? [] : {};
        return V(s, (o, l) => {
          const u = n(o, i + 1);
          !$(u) && (r[l] = u);
        }), e[i] = void 0, r;
      }
    }
    return s;
  };
  return n(t, 0);
}, gs = C("AsyncFunction"), ys = (t) => t && (se(t) || A(t)) && A(t.then) && A(t.catch), Xe = ((t, e) => t ? setImmediate : e ? ((n, s) => (k.addEventListener("message", ({ source: i, data: r }) => {
  i === k && r === n && s.length && s.shift()();
}, !1), (i) => {
  s.push(i), k.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  A(k.postMessage)
), ws = typeof queueMicrotask < "u" ? queueMicrotask.bind(k) : typeof process < "u" && process.nextTick || Xe, a = {
  isArray: M,
  isArrayBuffer: $e,
  isBuffer: Ft,
  isFormData: $t,
  isArrayBufferView: kt,
  isString: Ut,
  isNumber: Ve,
  isBoolean: Bt,
  isObject: se,
  isPlainObject: G,
  isReadableStream: Wt,
  isRequest: Kt,
  isResponse: Jt,
  isHeaders: Gt,
  isUndefined: $,
  isDate: Mt,
  isFile: zt,
  isBlob: jt,
  isRegExp: ls,
  isFunction: A,
  isStream: Ht,
  isURLSearchParams: Vt,
  isTypedArray: ns,
  isFileList: qt,
  forEach: V,
  merge: fe,
  extend: Zt,
  trim: Xt,
  stripBOM: Qt,
  inherits: Yt,
  toFlatObject: es,
  kindOf: ee,
  kindOfTest: C,
  endsWith: ts,
  toArray: ss,
  forEachEntry: is,
  matchAll: rs,
  isHTMLForm: os,
  hasOwnProperty: Ce,
  hasOwnProp: Ce,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Je,
  freezeMethods: cs,
  toObjectSet: ds,
  toCamelCase: as,
  noop: us,
  toFiniteNumber: hs,
  findKey: We,
  global: k,
  isContextDefined: Ke,
  ALPHABET: Ge,
  generateString: fs,
  isSpecCompliantForm: ps,
  toJSONObject: ms,
  isAsyncFn: gs,
  isThenable: ys,
  setImmediate: Xe,
  asap: ws
};
function m(t, e, n, s, i) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = t, this.name = "AxiosError", e && (this.code = e), n && (this.config = n), s && (this.request = s), i && (this.response = i, this.status = i.status ? i.status : null);
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
      status: this.status
    };
  }
});
const Ze = m.prototype, Qe = {};
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
  Qe[t] = { value: t };
});
Object.defineProperties(m, Qe);
Object.defineProperty(Ze, "isAxiosError", { value: !0 });
m.from = (t, e, n, s, i, r) => {
  const o = Object.create(Ze);
  return a.toFlatObject(t, o, function(u) {
    return u !== Error.prototype;
  }, (l) => l !== "isAxiosError"), m.call(o, t.message, e, n, s, i), o.cause = t, o.name = t.name, r && Object.assign(o, r), o;
};
const bs = null;
function pe(t) {
  return a.isPlainObject(t) || a.isArray(t);
}
function Ye(t) {
  return a.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function Le(t, e, n) {
  return t ? t.concat(e).map(function(i, r) {
    return i = Ye(i), !n && r ? "[" + i + "]" : i;
  }).join(n ? "." : "") : e;
}
function Es(t) {
  return a.isArray(t) && !t.some(pe);
}
const Ss = a.toFlatObject(a, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function ne(t, e, n) {
  if (!a.isObject(t))
    throw new TypeError("target must be an object");
  e = e || new FormData(), n = a.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(g, p) {
    return !a.isUndefined(p[g]);
  });
  const s = n.metaTokens, i = n.visitor || d, r = n.dots, o = n.indexes, u = (n.Blob || typeof Blob < "u" && Blob) && a.isSpecCompliantForm(e);
  if (!a.isFunction(i))
    throw new TypeError("visitor must be a function");
  function c(f) {
    if (f === null) return "";
    if (a.isDate(f))
      return f.toISOString();
    if (!u && a.isBlob(f))
      throw new m("Blob is not supported. Use a Buffer instead.");
    return a.isArrayBuffer(f) || a.isTypedArray(f) ? u && typeof Blob == "function" ? new Blob([f]) : Buffer.from(f) : f;
  }
  function d(f, g, p) {
    let w = f;
    if (f && !p && typeof f == "object") {
      if (a.endsWith(g, "{}"))
        g = s ? g : g.slice(0, -2), f = JSON.stringify(f);
      else if (a.isArray(f) && Es(f) || (a.isFileList(f) || a.endsWith(g, "[]")) && (w = a.toArray(f)))
        return g = Ye(g), w.forEach(function(R, L) {
          !(a.isUndefined(R) || R === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            o === !0 ? Le([g], L, r) : o === null ? g : g + "[]",
            c(R)
          );
        }), !1;
    }
    return pe(f) ? !0 : (e.append(Le(p, g, r), c(f)), !1);
  }
  const h = [], y = Object.assign(Ss, {
    defaultVisitor: d,
    convertValue: c,
    isVisitable: pe
  });
  function E(f, g) {
    if (!a.isUndefined(f)) {
      if (h.indexOf(f) !== -1)
        throw Error("Circular reference detected in " + g.join("."));
      h.push(f), a.forEach(f, function(w, S) {
        (!(a.isUndefined(w) || w === null) && i.call(
          e,
          w,
          a.isString(S) ? S.trim() : S,
          g,
          y
        )) === !0 && E(w, g ? g.concat(S) : [S]);
      }), h.pop();
    }
  }
  if (!a.isObject(t))
    throw new TypeError("data must be an object");
  return E(t), e;
}
function ve(t) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function(s) {
    return e[s];
  });
}
function Ee(t, e) {
  this._pairs = [], t && ne(t, this, e);
}
const et = Ee.prototype;
et.append = function(e, n) {
  this._pairs.push([e, n]);
};
et.toString = function(e) {
  const n = e ? function(s) {
    return e.call(this, s, ve);
  } : ve;
  return this._pairs.map(function(i) {
    return n(i[0]) + "=" + n(i[1]);
  }, "").join("&");
};
function Rs(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function tt(t, e, n) {
  if (!e)
    return t;
  const s = n && n.encode || Rs;
  a.isFunction(n) && (n = {
    serialize: n
  });
  const i = n && n.serialize;
  let r;
  if (i ? r = i(e, n) : r = a.isURLSearchParams(e) ? e.toString() : new Ee(e, n).toString(s), r) {
    const o = t.indexOf("#");
    o !== -1 && (t = t.slice(0, o)), t += (t.indexOf("?") === -1 ? "?" : "&") + r;
  }
  return t;
}
class De {
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
  use(e, n, s) {
    return this.handlers.push({
      fulfilled: e,
      rejected: n,
      synchronous: s ? s.synchronous : !1,
      runWhen: s ? s.runWhen : null
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
    a.forEach(this.handlers, function(s) {
      s !== null && e(s);
    });
  }
}
const st = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, _s = typeof URLSearchParams < "u" ? URLSearchParams : Ee, Os = typeof FormData < "u" ? FormData : null, Ts = typeof Blob < "u" ? Blob : null, As = {
  isBrowser: !0,
  classes: {
    URLSearchParams: _s,
    FormData: Os,
    Blob: Ts
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Se = typeof window < "u" && typeof document < "u", me = typeof navigator == "object" && navigator || void 0, Ps = Se && (!me || ["ReactNative", "NativeScript", "NS"].indexOf(me.product) < 0), Cs = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", xs = Se && window.location.href || "http://localhost", Ls = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Se,
  hasStandardBrowserEnv: Ps,
  hasStandardBrowserWebWorkerEnv: Cs,
  navigator: me,
  origin: xs
}, Symbol.toStringTag, { value: "Module" })), _ = {
  ...Ls,
  ...As
};
function vs(t, e) {
  return ne(t, new _.classes.URLSearchParams(), Object.assign({
    visitor: function(n, s, i, r) {
      return _.isNode && a.isBuffer(n) ? (this.append(s, n.toString("base64")), !1) : r.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function Ds(t) {
  return a.matchAll(/\w+|\[(\w*)]/g, t).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function Is(t) {
  const e = {}, n = Object.keys(t);
  let s;
  const i = n.length;
  let r;
  for (s = 0; s < i; s++)
    r = n[s], e[r] = t[r];
  return e;
}
function nt(t) {
  function e(n, s, i, r) {
    let o = n[r++];
    if (o === "__proto__") return !0;
    const l = Number.isFinite(+o), u = r >= n.length;
    return o = !o && a.isArray(i) ? i.length : o, u ? (a.hasOwnProp(i, o) ? i[o] = [i[o], s] : i[o] = s, !l) : ((!i[o] || !a.isObject(i[o])) && (i[o] = []), e(n, s, i[o], r) && a.isArray(i[o]) && (i[o] = Is(i[o])), !l);
  }
  if (a.isFormData(t) && a.isFunction(t.entries)) {
    const n = {};
    return a.forEachEntry(t, (s, i) => {
      e(Ds(s), i, n, 0);
    }), n;
  }
  return null;
}
function Ns(t, e, n) {
  if (a.isString(t))
    try {
      return (e || JSON.parse)(t), a.trim(t);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (0, JSON.stringify)(t);
}
const W = {
  transitional: st,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(e, n) {
    const s = n.getContentType() || "", i = s.indexOf("application/json") > -1, r = a.isObject(e);
    if (r && a.isHTMLForm(e) && (e = new FormData(e)), a.isFormData(e))
      return i ? JSON.stringify(nt(e)) : e;
    if (a.isArrayBuffer(e) || a.isBuffer(e) || a.isStream(e) || a.isFile(e) || a.isBlob(e) || a.isReadableStream(e))
      return e;
    if (a.isArrayBufferView(e))
      return e.buffer;
    if (a.isURLSearchParams(e))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let l;
    if (r) {
      if (s.indexOf("application/x-www-form-urlencoded") > -1)
        return vs(e, this.formSerializer).toString();
      if ((l = a.isFileList(e)) || s.indexOf("multipart/form-data") > -1) {
        const u = this.env && this.env.FormData;
        return ne(
          l ? { "files[]": e } : e,
          u && new u(),
          this.formSerializer
        );
      }
    }
    return r || i ? (n.setContentType("application/json", !1), Ns(e)) : e;
  }],
  transformResponse: [function(e) {
    const n = this.transitional || W.transitional, s = n && n.forcedJSONParsing, i = this.responseType === "json";
    if (a.isResponse(e) || a.isReadableStream(e))
      return e;
    if (e && a.isString(e) && (s && !this.responseType || i)) {
      const o = !(n && n.silentJSONParsing) && i;
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
    FormData: _.classes.FormData,
    Blob: _.classes.Blob
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
  W.headers[t] = {};
});
const Fs = a.toObjectSet([
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
]), ks = (t) => {
  const e = {};
  let n, s, i;
  return t && t.split(`
`).forEach(function(o) {
    i = o.indexOf(":"), n = o.substring(0, i).trim().toLowerCase(), s = o.substring(i + 1).trim(), !(!n || e[n] && Fs[n]) && (n === "set-cookie" ? e[n] ? e[n].push(s) : e[n] = [s] : e[n] = e[n] ? e[n] + ", " + s : s);
  }), e;
}, Ie = Symbol("internals");
function j(t) {
  return t && String(t).trim().toLowerCase();
}
function X(t) {
  return t === !1 || t == null ? t : a.isArray(t) ? t.map(X) : String(t);
}
function Us(t) {
  const e = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = n.exec(t); )
    e[s[1]] = s[2];
  return e;
}
const Bs = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
function ce(t, e, n, s, i) {
  if (a.isFunction(s))
    return s.call(this, e, n);
  if (i && (e = n), !!a.isString(e)) {
    if (a.isString(s))
      return e.indexOf(s) !== -1;
    if (a.isRegExp(s))
      return s.test(e);
  }
}
function Ms(t) {
  return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, n, s) => n.toUpperCase() + s);
}
function zs(t, e) {
  const n = a.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(t, s + n, {
      value: function(i, r, o) {
        return this[s].call(this, e, i, r, o);
      },
      configurable: !0
    });
  });
}
class T {
  constructor(e) {
    e && this.set(e);
  }
  set(e, n, s) {
    const i = this;
    function r(l, u, c) {
      const d = j(u);
      if (!d)
        throw new Error("header name must be a non-empty string");
      const h = a.findKey(i, d);
      (!h || i[h] === void 0 || c === !0 || c === void 0 && i[h] !== !1) && (i[h || u] = X(l));
    }
    const o = (l, u) => a.forEach(l, (c, d) => r(c, d, u));
    if (a.isPlainObject(e) || e instanceof this.constructor)
      o(e, n);
    else if (a.isString(e) && (e = e.trim()) && !Bs(e))
      o(ks(e), n);
    else if (a.isHeaders(e))
      for (const [l, u] of e.entries())
        r(u, l, s);
    else
      e != null && r(n, e, s);
    return this;
  }
  get(e, n) {
    if (e = j(e), e) {
      const s = a.findKey(this, e);
      if (s) {
        const i = this[s];
        if (!n)
          return i;
        if (n === !0)
          return Us(i);
        if (a.isFunction(n))
          return n.call(this, i, s);
        if (a.isRegExp(n))
          return n.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, n) {
    if (e = j(e), e) {
      const s = a.findKey(this, e);
      return !!(s && this[s] !== void 0 && (!n || ce(this, this[s], s, n)));
    }
    return !1;
  }
  delete(e, n) {
    const s = this;
    let i = !1;
    function r(o) {
      if (o = j(o), o) {
        const l = a.findKey(s, o);
        l && (!n || ce(s, s[l], l, n)) && (delete s[l], i = !0);
      }
    }
    return a.isArray(e) ? e.forEach(r) : r(e), i;
  }
  clear(e) {
    const n = Object.keys(this);
    let s = n.length, i = !1;
    for (; s--; ) {
      const r = n[s];
      (!e || ce(this, this[r], r, e, !0)) && (delete this[r], i = !0);
    }
    return i;
  }
  normalize(e) {
    const n = this, s = {};
    return a.forEach(this, (i, r) => {
      const o = a.findKey(s, r);
      if (o) {
        n[o] = X(i), delete n[r];
        return;
      }
      const l = e ? Ms(r) : String(r).trim();
      l !== r && delete n[r], n[l] = X(i), s[l] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const n = /* @__PURE__ */ Object.create(null);
    return a.forEach(this, (s, i) => {
      s != null && s !== !1 && (n[i] = e && a.isArray(s) ? s.join(", ") : s);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, n]) => e + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...n) {
    const s = new this(e);
    return n.forEach((i) => s.set(i)), s;
  }
  static accessor(e) {
    const s = (this[Ie] = this[Ie] = {
      accessors: {}
    }).accessors, i = this.prototype;
    function r(o) {
      const l = j(o);
      s[l] || (zs(i, o), s[l] = !0);
    }
    return a.isArray(e) ? e.forEach(r) : r(e), this;
  }
}
T.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
a.reduceDescriptors(T.prototype, ({ value: t }, e) => {
  let n = e[0].toUpperCase() + e.slice(1);
  return {
    get: () => t,
    set(s) {
      this[n] = s;
    }
  };
});
a.freezeMethods(T);
function de(t, e) {
  const n = this || W, s = e || n, i = T.from(s.headers);
  let r = s.data;
  return a.forEach(t, function(l) {
    r = l.call(n, r, i.normalize(), e ? e.status : void 0);
  }), i.normalize(), r;
}
function it(t) {
  return !!(t && t.__CANCEL__);
}
function z(t, e, n) {
  m.call(this, t ?? "canceled", m.ERR_CANCELED, e, n), this.name = "CanceledError";
}
a.inherits(z, m, {
  __CANCEL__: !0
});
function rt(t, e, n) {
  const s = n.config.validateStatus;
  !n.status || !s || s(n.status) ? t(n) : e(new m(
    "Request failed with status code " + n.status,
    [m.ERR_BAD_REQUEST, m.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function js(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return e && e[1] || "";
}
function qs(t, e) {
  t = t || 10;
  const n = new Array(t), s = new Array(t);
  let i = 0, r = 0, o;
  return e = e !== void 0 ? e : 1e3, function(u) {
    const c = Date.now(), d = s[r];
    o || (o = c), n[i] = u, s[i] = c;
    let h = r, y = 0;
    for (; h !== i; )
      y += n[h++], h = h % t;
    if (i = (i + 1) % t, i === r && (r = (r + 1) % t), c - o < e)
      return;
    const E = d && c - d;
    return E ? Math.round(y * 1e3 / E) : void 0;
  };
}
function Hs(t, e) {
  let n = 0, s = 1e3 / e, i, r;
  const o = (c, d = Date.now()) => {
    n = d, i = null, r && (clearTimeout(r), r = null), t.apply(null, c);
  };
  return [(...c) => {
    const d = Date.now(), h = d - n;
    h >= s ? o(c, d) : (i = c, r || (r = setTimeout(() => {
      r = null, o(i);
    }, s - h)));
  }, () => i && o(i)];
}
const Q = (t, e, n = 3) => {
  let s = 0;
  const i = qs(50, 250);
  return Hs((r) => {
    const o = r.loaded, l = r.lengthComputable ? r.total : void 0, u = o - s, c = i(u), d = o <= l;
    s = o;
    const h = {
      loaded: o,
      total: l,
      progress: l ? o / l : void 0,
      bytes: u,
      rate: c || void 0,
      estimated: c && l && d ? (l - o) / c : void 0,
      event: r,
      lengthComputable: l != null,
      [e ? "download" : "upload"]: !0
    };
    t(h);
  }, n);
}, Ne = (t, e) => {
  const n = t != null;
  return [(s) => e[0]({
    lengthComputable: n,
    total: t,
    loaded: s
  }), e[1]];
}, Fe = (t) => (...e) => a.asap(() => t(...e)), $s = _.hasStandardBrowserEnv ? /* @__PURE__ */ ((t, e) => (n) => (n = new URL(n, _.origin), t.protocol === n.protocol && t.host === n.host && (e || t.port === n.port)))(
  new URL(_.origin),
  _.navigator && /(msie|trident)/i.test(_.navigator.userAgent)
) : () => !0, Vs = _.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(t, e, n, s, i, r) {
      const o = [t + "=" + encodeURIComponent(e)];
      a.isNumber(n) && o.push("expires=" + new Date(n).toGMTString()), a.isString(s) && o.push("path=" + s), a.isString(i) && o.push("domain=" + i), r === !0 && o.push("secure"), document.cookie = o.join("; ");
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
function Ws(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function Ks(t, e) {
  return e ? t.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function ot(t, e) {
  return t && !Ws(e) ? Ks(t, e) : e;
}
const ke = (t) => t instanceof T ? { ...t } : t;
function B(t, e) {
  e = e || {};
  const n = {};
  function s(c, d, h, y) {
    return a.isPlainObject(c) && a.isPlainObject(d) ? a.merge.call({ caseless: y }, c, d) : a.isPlainObject(d) ? a.merge({}, d) : a.isArray(d) ? d.slice() : d;
  }
  function i(c, d, h, y) {
    if (a.isUndefined(d)) {
      if (!a.isUndefined(c))
        return s(void 0, c, h, y);
    } else return s(c, d, h, y);
  }
  function r(c, d) {
    if (!a.isUndefined(d))
      return s(void 0, d);
  }
  function o(c, d) {
    if (a.isUndefined(d)) {
      if (!a.isUndefined(c))
        return s(void 0, c);
    } else return s(void 0, d);
  }
  function l(c, d, h) {
    if (h in e)
      return s(c, d);
    if (h in t)
      return s(void 0, c);
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
    headers: (c, d, h) => i(ke(c), ke(d), h, !0)
  };
  return a.forEach(Object.keys(Object.assign({}, t, e)), function(d) {
    const h = u[d] || i, y = h(t[d], e[d], d);
    a.isUndefined(y) && h !== l || (n[d] = y);
  }), n;
}
const at = (t) => {
  const e = B({}, t);
  let { data: n, withXSRFToken: s, xsrfHeaderName: i, xsrfCookieName: r, headers: o, auth: l } = e;
  e.headers = o = T.from(o), e.url = tt(ot(e.baseURL, e.url), t.params, t.paramsSerializer), l && o.set(
    "Authorization",
    "Basic " + btoa((l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : ""))
  );
  let u;
  if (a.isFormData(n)) {
    if (_.hasStandardBrowserEnv || _.hasStandardBrowserWebWorkerEnv)
      o.setContentType(void 0);
    else if ((u = o.getContentType()) !== !1) {
      const [c, ...d] = u ? u.split(";").map((h) => h.trim()).filter(Boolean) : [];
      o.setContentType([c || "multipart/form-data", ...d].join("; "));
    }
  }
  if (_.hasStandardBrowserEnv && (s && a.isFunction(s) && (s = s(e)), s || s !== !1 && $s(e.url))) {
    const c = i && r && Vs.read(r);
    c && o.set(i, c);
  }
  return e;
}, Js = typeof XMLHttpRequest < "u", Gs = Js && function(t) {
  return new Promise(function(n, s) {
    const i = at(t);
    let r = i.data;
    const o = T.from(i.headers).normalize();
    let { responseType: l, onUploadProgress: u, onDownloadProgress: c } = i, d, h, y, E, f;
    function g() {
      E && E(), f && f(), i.cancelToken && i.cancelToken.unsubscribe(d), i.signal && i.signal.removeEventListener("abort", d);
    }
    let p = new XMLHttpRequest();
    p.open(i.method.toUpperCase(), i.url, !0), p.timeout = i.timeout;
    function w() {
      if (!p)
        return;
      const R = T.from(
        "getAllResponseHeaders" in p && p.getAllResponseHeaders()
      ), O = {
        data: !l || l === "text" || l === "json" ? p.responseText : p.response,
        status: p.status,
        statusText: p.statusText,
        headers: R,
        config: t,
        request: p
      };
      rt(function(I) {
        n(I), g();
      }, function(I) {
        s(I), g();
      }, O), p = null;
    }
    "onloadend" in p ? p.onloadend = w : p.onreadystatechange = function() {
      !p || p.readyState !== 4 || p.status === 0 && !(p.responseURL && p.responseURL.indexOf("file:") === 0) || setTimeout(w);
    }, p.onabort = function() {
      p && (s(new m("Request aborted", m.ECONNABORTED, t, p)), p = null);
    }, p.onerror = function() {
      s(new m("Network Error", m.ERR_NETWORK, t, p)), p = null;
    }, p.ontimeout = function() {
      let L = i.timeout ? "timeout of " + i.timeout + "ms exceeded" : "timeout exceeded";
      const O = i.transitional || st;
      i.timeoutErrorMessage && (L = i.timeoutErrorMessage), s(new m(
        L,
        O.clarifyTimeoutError ? m.ETIMEDOUT : m.ECONNABORTED,
        t,
        p
      )), p = null;
    }, r === void 0 && o.setContentType(null), "setRequestHeader" in p && a.forEach(o.toJSON(), function(L, O) {
      p.setRequestHeader(O, L);
    }), a.isUndefined(i.withCredentials) || (p.withCredentials = !!i.withCredentials), l && l !== "json" && (p.responseType = i.responseType), c && ([y, f] = Q(c, !0), p.addEventListener("progress", y)), u && p.upload && ([h, E] = Q(u), p.upload.addEventListener("progress", h), p.upload.addEventListener("loadend", E)), (i.cancelToken || i.signal) && (d = (R) => {
      p && (s(!R || R.type ? new z(null, t, p) : R), p.abort(), p = null);
    }, i.cancelToken && i.cancelToken.subscribe(d), i.signal && (i.signal.aborted ? d() : i.signal.addEventListener("abort", d)));
    const S = js(i.url);
    if (S && _.protocols.indexOf(S) === -1) {
      s(new m("Unsupported protocol " + S + ":", m.ERR_BAD_REQUEST, t));
      return;
    }
    p.send(r || null);
  });
}, Xs = (t, e) => {
  const { length: n } = t = t ? t.filter(Boolean) : [];
  if (e || n) {
    let s = new AbortController(), i;
    const r = function(c) {
      if (!i) {
        i = !0, l();
        const d = c instanceof Error ? c : this.reason;
        s.abort(d instanceof m ? d : new z(d instanceof Error ? d.message : d));
      }
    };
    let o = e && setTimeout(() => {
      o = null, r(new m(`timeout ${e} of ms exceeded`, m.ETIMEDOUT));
    }, e);
    const l = () => {
      t && (o && clearTimeout(o), o = null, t.forEach((c) => {
        c.unsubscribe ? c.unsubscribe(r) : c.removeEventListener("abort", r);
      }), t = null);
    };
    t.forEach((c) => c.addEventListener("abort", r));
    const { signal: u } = s;
    return u.unsubscribe = () => a.asap(l), u;
  }
}, Zs = function* (t, e) {
  let n = t.byteLength;
  if (n < e) {
    yield t;
    return;
  }
  let s = 0, i;
  for (; s < n; )
    i = s + e, yield t.slice(s, i), s = i;
}, Qs = async function* (t, e) {
  for await (const n of Ys(t))
    yield* Zs(n, e);
}, Ys = async function* (t) {
  if (t[Symbol.asyncIterator]) {
    yield* t;
    return;
  }
  const e = t.getReader();
  try {
    for (; ; ) {
      const { done: n, value: s } = await e.read();
      if (n)
        break;
      yield s;
    }
  } finally {
    await e.cancel();
  }
}, Ue = (t, e, n, s) => {
  const i = Qs(t, e);
  let r = 0, o, l = (u) => {
    o || (o = !0, s && s(u));
  };
  return new ReadableStream({
    async pull(u) {
      try {
        const { done: c, value: d } = await i.next();
        if (c) {
          l(), u.close();
          return;
        }
        let h = d.byteLength;
        if (n) {
          let y = r += h;
          n(y);
        }
        u.enqueue(new Uint8Array(d));
      } catch (c) {
        throw l(c), c;
      }
    },
    cancel(u) {
      return l(u), i.return();
    }
  }, {
    highWaterMark: 2
  });
}, ie = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", lt = ie && typeof ReadableStream == "function", en = ie && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((t) => (e) => t.encode(e))(new TextEncoder()) : async (t) => new Uint8Array(await new Response(t).arrayBuffer())), ct = (t, ...e) => {
  try {
    return !!t(...e);
  } catch {
    return !1;
  }
}, tn = lt && ct(() => {
  let t = !1;
  const e = new Request(_.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return t = !0, "half";
    }
  }).headers.has("Content-Type");
  return t && !e;
}), Be = 64 * 1024, ge = lt && ct(() => a.isReadableStream(new Response("").body)), Y = {
  stream: ge && ((t) => t.body)
};
ie && ((t) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e) => {
    !Y[e] && (Y[e] = a.isFunction(t[e]) ? (n) => n[e]() : (n, s) => {
      throw new m(`Response type '${e}' is not supported`, m.ERR_NOT_SUPPORT, s);
    });
  });
})(new Response());
const sn = async (t) => {
  if (t == null)
    return 0;
  if (a.isBlob(t))
    return t.size;
  if (a.isSpecCompliantForm(t))
    return (await new Request(_.origin, {
      method: "POST",
      body: t
    }).arrayBuffer()).byteLength;
  if (a.isArrayBufferView(t) || a.isArrayBuffer(t))
    return t.byteLength;
  if (a.isURLSearchParams(t) && (t = t + ""), a.isString(t))
    return (await en(t)).byteLength;
}, nn = async (t, e) => {
  const n = a.toFiniteNumber(t.getContentLength());
  return n ?? sn(e);
}, rn = ie && (async (t) => {
  let {
    url: e,
    method: n,
    data: s,
    signal: i,
    cancelToken: r,
    timeout: o,
    onDownloadProgress: l,
    onUploadProgress: u,
    responseType: c,
    headers: d,
    withCredentials: h = "same-origin",
    fetchOptions: y
  } = at(t);
  c = c ? (c + "").toLowerCase() : "text";
  let E = Xs([i, r && r.toAbortSignal()], o), f;
  const g = E && E.unsubscribe && (() => {
    E.unsubscribe();
  });
  let p;
  try {
    if (u && tn && n !== "get" && n !== "head" && (p = await nn(d, s)) !== 0) {
      let O = new Request(e, {
        method: "POST",
        body: s,
        duplex: "half"
      }), D;
      if (a.isFormData(s) && (D = O.headers.get("content-type")) && d.setContentType(D), O.body) {
        const [I, K] = Ne(
          p,
          Q(Fe(u))
        );
        s = Ue(O.body, Be, I, K);
      }
    }
    a.isString(h) || (h = h ? "include" : "omit");
    const w = "credentials" in Request.prototype;
    f = new Request(e, {
      ...y,
      signal: E,
      method: n.toUpperCase(),
      headers: d.normalize().toJSON(),
      body: s,
      duplex: "half",
      credentials: w ? h : void 0
    });
    let S = await fetch(f);
    const R = ge && (c === "stream" || c === "response");
    if (ge && (l || R && g)) {
      const O = {};
      ["status", "statusText", "headers"].forEach((_e) => {
        O[_e] = S[_e];
      });
      const D = a.toFiniteNumber(S.headers.get("content-length")), [I, K] = l && Ne(
        D,
        Q(Fe(l), !0)
      ) || [];
      S = new Response(
        Ue(S.body, Be, I, () => {
          K && K(), g && g();
        }),
        O
      );
    }
    c = c || "text";
    let L = await Y[a.findKey(Y, c) || "text"](S, t);
    return !R && g && g(), await new Promise((O, D) => {
      rt(O, D, {
        data: L,
        headers: T.from(S.headers),
        status: S.status,
        statusText: S.statusText,
        config: t,
        request: f
      });
    });
  } catch (w) {
    throw g && g(), w && w.name === "TypeError" && /fetch/i.test(w.message) ? Object.assign(
      new m("Network Error", m.ERR_NETWORK, t, f),
      {
        cause: w.cause || w
      }
    ) : m.from(w, w && w.code, t, f);
  }
}), ye = {
  http: bs,
  xhr: Gs,
  fetch: rn
};
a.forEach(ye, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: e });
    } catch {
    }
    Object.defineProperty(t, "adapterName", { value: e });
  }
});
const Me = (t) => `- ${t}`, on = (t) => a.isFunction(t) || t === null || t === !1, dt = {
  getAdapter: (t) => {
    t = a.isArray(t) ? t : [t];
    const { length: e } = t;
    let n, s;
    const i = {};
    for (let r = 0; r < e; r++) {
      n = t[r];
      let o;
      if (s = n, !on(n) && (s = ye[(o = String(n)).toLowerCase()], s === void 0))
        throw new m(`Unknown adapter '${o}'`);
      if (s)
        break;
      i[o || "#" + r] = s;
    }
    if (!s) {
      const r = Object.entries(i).map(
        ([l, u]) => `adapter ${l} ` + (u === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let o = e ? r.length > 1 ? `since :
` + r.map(Me).join(`
`) : " " + Me(r[0]) : "as no adapter specified";
      throw new m(
        "There is no suitable adapter to dispatch the request " + o,
        "ERR_NOT_SUPPORT"
      );
    }
    return s;
  },
  adapters: ye
};
function ue(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new z(null, t);
}
function ze(t) {
  return ue(t), t.headers = T.from(t.headers), t.data = de.call(
    t,
    t.transformRequest
  ), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), dt.getAdapter(t.adapter || W.adapter)(t).then(function(s) {
    return ue(t), s.data = de.call(
      t,
      t.transformResponse,
      s
    ), s.headers = T.from(s.headers), s;
  }, function(s) {
    return it(s) || (ue(t), s && s.response && (s.response.data = de.call(
      t,
      t.transformResponse,
      s.response
    ), s.response.headers = T.from(s.response.headers))), Promise.reject(s);
  });
}
const ut = "1.7.9", re = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
  re[t] = function(s) {
    return typeof s === t || "a" + (e < 1 ? "n " : " ") + t;
  };
});
const je = {};
re.transitional = function(e, n, s) {
  function i(r, o) {
    return "[Axios v" + ut + "] Transitional option '" + r + "'" + o + (s ? ". " + s : "");
  }
  return (r, o, l) => {
    if (e === !1)
      throw new m(
        i(o, " has been removed" + (n ? " in " + n : "")),
        m.ERR_DEPRECATED
      );
    return n && !je[o] && (je[o] = !0, console.warn(
      i(
        o,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), e ? e(r, o, l) : !0;
  };
};
re.spelling = function(e) {
  return (n, s) => (console.warn(`${s} is likely a misspelling of ${e}`), !0);
};
function an(t, e, n) {
  if (typeof t != "object")
    throw new m("options must be an object", m.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(t);
  let i = s.length;
  for (; i-- > 0; ) {
    const r = s[i], o = e[r];
    if (o) {
      const l = t[r], u = l === void 0 || o(l, r, t);
      if (u !== !0)
        throw new m("option " + r + " must be " + u, m.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new m("Unknown option " + r, m.ERR_BAD_OPTION);
  }
}
const Z = {
  assertOptions: an,
  validators: re
}, x = Z.validators;
class U {
  constructor(e) {
    this.defaults = e, this.interceptors = {
      request: new De(),
      response: new De()
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
  async request(e, n) {
    try {
      return await this._request(e, n);
    } catch (s) {
      if (s instanceof Error) {
        let i = {};
        Error.captureStackTrace ? Error.captureStackTrace(i) : i = new Error();
        const r = i.stack ? i.stack.replace(/^.+\n/, "") : "";
        try {
          s.stack ? r && !String(s.stack).endsWith(r.replace(/^.+\n.+\n/, "")) && (s.stack += `
` + r) : s.stack = r;
        } catch {
        }
      }
      throw s;
    }
  }
  _request(e, n) {
    typeof e == "string" ? (n = n || {}, n.url = e) : n = e || {}, n = B(this.defaults, n);
    const { transitional: s, paramsSerializer: i, headers: r } = n;
    s !== void 0 && Z.assertOptions(s, {
      silentJSONParsing: x.transitional(x.boolean),
      forcedJSONParsing: x.transitional(x.boolean),
      clarifyTimeoutError: x.transitional(x.boolean)
    }, !1), i != null && (a.isFunction(i) ? n.paramsSerializer = {
      serialize: i
    } : Z.assertOptions(i, {
      encode: x.function,
      serialize: x.function
    }, !0)), Z.assertOptions(n, {
      baseUrl: x.spelling("baseURL"),
      withXsrfToken: x.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let o = r && a.merge(
      r.common,
      r[n.method]
    );
    r && a.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (f) => {
        delete r[f];
      }
    ), n.headers = T.concat(o, r);
    const l = [];
    let u = !0;
    this.interceptors.request.forEach(function(g) {
      typeof g.runWhen == "function" && g.runWhen(n) === !1 || (u = u && g.synchronous, l.unshift(g.fulfilled, g.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function(g) {
      c.push(g.fulfilled, g.rejected);
    });
    let d, h = 0, y;
    if (!u) {
      const f = [ze.bind(this), void 0];
      for (f.unshift.apply(f, l), f.push.apply(f, c), y = f.length, d = Promise.resolve(n); h < y; )
        d = d.then(f[h++], f[h++]);
      return d;
    }
    y = l.length;
    let E = n;
    for (h = 0; h < y; ) {
      const f = l[h++], g = l[h++];
      try {
        E = f(E);
      } catch (p) {
        g.call(this, p);
        break;
      }
    }
    try {
      d = ze.call(this, E);
    } catch (f) {
      return Promise.reject(f);
    }
    for (h = 0, y = c.length; h < y; )
      d = d.then(c[h++], c[h++]);
    return d;
  }
  getUri(e) {
    e = B(this.defaults, e);
    const n = ot(e.baseURL, e.url);
    return tt(n, e.params, e.paramsSerializer);
  }
}
a.forEach(["delete", "get", "head", "options"], function(e) {
  U.prototype[e] = function(n, s) {
    return this.request(B(s || {}, {
      method: e,
      url: n,
      data: (s || {}).data
    }));
  };
});
a.forEach(["post", "put", "patch"], function(e) {
  function n(s) {
    return function(r, o, l) {
      return this.request(B(l || {}, {
        method: e,
        headers: s ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: r,
        data: o
      }));
    };
  }
  U.prototype[e] = n(), U.prototype[e + "Form"] = n(!0);
});
class Re {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(r) {
      n = r;
    });
    const s = this;
    this.promise.then((i) => {
      if (!s._listeners) return;
      let r = s._listeners.length;
      for (; r-- > 0; )
        s._listeners[r](i);
      s._listeners = null;
    }), this.promise.then = (i) => {
      let r;
      const o = new Promise((l) => {
        s.subscribe(l), r = l;
      }).then(i);
      return o.cancel = function() {
        s.unsubscribe(r);
      }, o;
    }, e(function(r, o, l) {
      s.reason || (s.reason = new z(r, o, l), n(s.reason));
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
    const n = this._listeners.indexOf(e);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const e = new AbortController(), n = (s) => {
      e.abort(s);
    };
    return this.subscribe(n), e.signal.unsubscribe = () => this.unsubscribe(n), e.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let e;
    return {
      token: new Re(function(i) {
        e = i;
      }),
      cancel: e
    };
  }
}
function ln(t) {
  return function(n) {
    return t.apply(null, n);
  };
}
function cn(t) {
  return a.isObject(t) && t.isAxiosError === !0;
}
const we = {
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
Object.entries(we).forEach(([t, e]) => {
  we[e] = t;
});
function ht(t) {
  const e = new U(t), n = He(U.prototype.request, e);
  return a.extend(n, U.prototype, e, { allOwnKeys: !0 }), a.extend(n, e, null, { allOwnKeys: !0 }), n.create = function(i) {
    return ht(B(t, i));
  }, n;
}
const b = ht(W);
b.Axios = U;
b.CanceledError = z;
b.CancelToken = Re;
b.isCancel = it;
b.VERSION = ut;
b.toFormData = ne;
b.AxiosError = m;
b.Cancel = b.CanceledError;
b.all = function(e) {
  return Promise.all(e);
};
b.spread = ln;
b.isAxiosError = cn;
b.mergeConfig = B;
b.AxiosHeaders = T;
b.formToJSON = (t) => nt(a.isHTMLForm(t) ? new FormData(t) : t);
b.getAdapter = dt.getAdapter;
b.HttpStatusCode = we;
b.default = b;
const ft = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [s, i] of e)
    n[s] = i;
  return n;
}, dn = {
  name: "Image",
  props: {
    image: Object
  },
  data() {
    return {
      imageEnlarged: !1,
      imageDescription: "<b>" + this.image.title + "</b><br> " + this.image.description
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
}, un = ["href", "data-pswp-width", "data-pswp-height"], hn = ["innerHTML"], fn = ["src", "alt"];
function pn(t, e, n, s, i, r) {
  return N(), F("a", {
    class: "pswp-gallery__item",
    href: n.image.largeURL,
    "data-pswp-width": n.image.width,
    "data-pswp-height": n.image.height,
    target: "_blank",
    rel: "noreferrer"
  }, [
    v("span", {
      class: "hidden-caption-content",
      innerHTML: i.imageDescription
    }, null, 8, hn),
    v("img", {
      src: n.image.thumbnailURL,
      alt: n.image.description,
      onMouseover: e[0] || (e[0] = (...o) => r.enlargeImage && r.enlargeImage(...o)),
      onMouseout: e[1] || (e[1] = (...o) => r.shrinkImage && r.shrinkImage(...o)),
      class: pt({
        "img-default-size": !0,
        "img-enlarged-size": i.imageEnlarged
      })
    }, null, 42, fn)
  ], 8, un);
}
const mn = /* @__PURE__ */ ft(dn, [["render", pn]]), gn = {
  name: "FlickrGallery",
  components: { Image: mn },
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
    defaultExtras: "url_m,url_l,owner_name,description",
    // https://www.flickr.com/services/api/flickr.photos.search.html
    flickrGallery: [],
    flickrLoadingStyle: null,
    loading: !1,
    photos: []
  }),
  beforeMount() {
    this.extras != null && (this.defaultExtras = this.extras), this.photos = this.loadFlickrPhotos(), this.galleryContainer != null ? this.galleryID = this.galleryContainer : this.galleryID = this.galleryID + "-" + this.$.uid;
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
        children: ".pswp-gallery__item",
        pswpModule: () => import("./photoswipe.esm-CSQI2Ds4.js")
      };
      if (!this.lightbox) {
        const e = new It(t);
        e.on("uiRegister", function() {
          e.pswp.ui.registerElement({
            name: "custom-caption",
            order: 9,
            isButton: !1,
            appendTo: "root",
            html: "Caption text",
            onInit: (n) => {
              e.pswp.on("change", () => {
                const s = e.pswp.currSlide.data.element;
                let i = "";
                if (s) {
                  const r = s.querySelector(".hidden-caption-content");
                  r ? i = r.innerHTML : (console.debug(s), i = s.querySelector("img").getAttribute("alt"));
                }
                n.innerHTML = i || "";
              });
            }
          });
        }), this.lightbox = e.init();
      }
    },
    async loadFlickrPhotos() {
      this.loading = !0;
      const t = this.endpoint + "?method=" + this.method + "&api_key=" + this.apiKey + "&tags=" + this.tags + "&user_id=" + this.userId + "&photoset_id=" + this.photosetId + "&format=json&page=" + this.page + "&per_page=" + this.perPage + "&extras=" + this.defaultExtras + "&nojsoncallback=1", e = {};
      await b.get(t, e, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(({ data: n }) => {
        let s = [];
        this.method == "flickr.photosets.getPhotos" ? (this.totalPictures = n.photoset.total, this.totalPages = n.photoset.pages, n.photoset.photo.forEach(function(i, r) {
          s[r] = {
            largeURL: i.url_l,
            thumbnailURL: i.url_m,
            title: i.title,
            alt: i.title,
            width: i.width_l,
            height: i.height_l,
            description: i.description._content
          };
        })) : this.method == "flickr.photos.search" && (this.totalPictures = n.photos.total, this.totalPages = n.photos.pages, n.photos.photo.forEach(function(i, r) {
          s[r] = {
            largeURL: i.url_l,
            thumbnailURL: i.url_m,
            title: i.title,
            alt: i.title,
            width: i.width_l,
            height: i.height_l,
            description: i.description._content
          };
        })), this.photos = s;
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
}, yn = ["id"], wn = { key: 0 }, bn = { class: "flickr-images" }, En = {
  key: 0,
  class: "flickr-navigation"
}, Sn = { class: "prev" }, Rn = { class: "current" }, _n = { class: "next" };
function On(t, e, n, s, i, r) {
  const o = mt("Image");
  return N(), F("div", { id: t.galleryID }, [
    Oe(gt, { name: "fade" }, {
      default: yt(() => [
        t.loading ? ae("", !0) : (N(), F("div", {
          key: 0,
          style: wt(t.flickrLoadingStyle),
          class: "flickr-container",
          ref: "flickr-container"
        }, [
          n.title ? (N(), F("h2", wn, oe(n.title), 1)) : ae("", !0),
          v("div", bn, [
            (N(!0), F(bt, null, Et(t.photos, (l) => (N(), F("span", null, [
              Oe(o, { image: l }, null, 8, ["image"])
            ]))), 256))
          ])
        ], 4))
      ]),
      _: 1
    }),
    n.useNavigation ? (N(), F("div", En, [
      v("span", Sn, [
        v("button", {
          onClick: e[0] || (e[0] = (...l) => r.previousPage && r.previousPage(...l)),
          onKeyup: e[1] || (e[1] = Te((...l) => r.previousPage && r.previousPage(...l), ["right"]))
        }, " << ", 32)
      ]),
      v("span", Rn, [
        v("button", {
          onClick: e[2] || (e[2] = () => {
          })
        }, " Page " + oe(t.page) + "/" + oe(t.totalPages), 1)
      ]),
      v("span", _n, [
        v("button", {
          onClick: e[3] || (e[3] = (...l) => r.nextPage && r.nextPage(...l)),
          onKeyup: e[4] || (e[4] = Te((...l) => r.nextPage && r.nextPage(...l), ["right"]))
        }, " >> ", 32)
      ])
    ])) : ae("", !0)
  ], 8, yn);
}
const An = /* @__PURE__ */ ft(gn, [["render", On]]);
export {
  An as default
};
