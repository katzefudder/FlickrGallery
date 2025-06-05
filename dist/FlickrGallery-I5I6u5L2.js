import { hasInjectionContext as Kt, inject as Gt, getCurrentInstance as Xt, ref as mt, reactive as Zt, markRaw as ee, effectScope as Qt, isRef as oe, isReactive as ze, toRef as Pe, toRaw as Yt, nextTick as He, computed as gt, getCurrentScope as es, onScopeDispose as ts, watch as ss, toRefs as We, createElementBlock as z, openBlock as $, createElementVNode as M, normalizeClass as ns, resolveComponent as is, createVNode as Je, createCommentVNode as ve, Transition as rs, withCtx as os, normalizeStyle as as, toDisplayString as Ne, Fragment as ls, renderList as cs, withKeys as Ke } from "vue";
/*!
  * PhotoSwipe Lightbox 5.4.4 - https://photoswipe.com
  * (c) 2024 Dmytro Semenov
  */
function te(t, e, n) {
  const s = document.createElement(e);
  return t && (s.className = t), n && n.appendChild(s), s;
}
function us(t, e, n) {
  let s = `translate3d(${t}px,0px,0)`;
  return n !== void 0 && (s += ` scale3d(${n},${n},1)`), s;
}
function De(t, e, n) {
  t.style.width = typeof e == "number" ? `${e}px` : e, t.style.height = typeof n == "number" ? `${n}px` : n;
}
const k = {
  IDLE: "idle",
  LOADING: "loading",
  LOADED: "loaded",
  ERROR: "error"
};
function ds(t) {
  return "button" in t && t.button === 1 || t.ctrlKey || t.metaKey || t.altKey || t.shiftKey;
}
function se(t, e, n = document) {
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
function hs(t) {
  return typeof t == "function" && t.prototype && t.prototype.goTo;
}
function Ge() {
  return !!(navigator.vendor && navigator.vendor.match(/apple/i));
}
class fs {
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
class ps {
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
    }), (r = this._filters[e]) === null || r === void 0 || r.sort((l, d) => l.priority - d.priority), (o = this.pswp) === null || o === void 0 || o.addFilter(e, n, s);
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
      new fs(e, n)
    );
    return (s = this._listeners[e]) === null || s === void 0 || s.forEach((r) => {
      r.call(this, i);
    }), i;
  }
}
class ms {
  /**
   * @param {string | false} imageSrc
   * @param {HTMLElement} container
   */
  constructor(e, n) {
    if (this.element = te("pswp__img pswp__img--placeholder", e ? "img" : "div", n), e) {
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
    this.element && (this.element.tagName === "IMG" ? (De(this.element, 250, "auto"), this.element.style.transformOrigin = "0 0", this.element.style.transform = us(0, 0, e / 250)) : De(this.element, e, n));
  }
  destroy() {
    var e;
    (e = this.element) !== null && e !== void 0 && e.parentNode && this.element.remove(), this.element = null;
  }
}
class gs {
  /**
   * @param {SlideData} itemData Slide data
   * @param {PhotoSwipeBase} instance PhotoSwipe or PhotoSwipeLightbox instance
   * @param {number} index
   */
  constructor(e, n, s) {
    this.instance = n, this.data = e, this.index = s, this.element = void 0, this.placeholder = void 0, this.slide = void 0, this.displayedImageWidth = 0, this.displayedImageHeight = 0, this.width = Number(this.data.w) || Number(this.data.width) || 0, this.height = Number(this.data.h) || Number(this.data.height) || 0, this.isAttached = !1, this.hasSlide = !1, this.isDecoding = !1, this.state = k.IDLE, this.data.type ? this.type = this.data.type : this.data.src ? this.type = "image" : this.type = "html", this.instance.dispatch("contentInit", {
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
        this.placeholder = new ms(s, this.slide.container);
      }
    this.element && !n || this.instance.dispatch("contentLoad", {
      content: this,
      isLazy: e
    }).defaultPrevented || (this.isImageContent() ? (this.element = te("pswp__img", "img"), this.displayedImageWidth && this.loadImage(e)) : (this.element = te("pswp__content", "div"), this.element.innerHTML = this.data.html || ""), n && this.slide && this.slide.updateContentSize(!0));
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
    this.updateSrcsetSizes(), this.data.srcset && (i.srcset = this.data.srcset), i.src = (n = this.data.src) !== null && n !== void 0 ? n : "", i.alt = (s = this.data.alt) !== null && s !== void 0 ? s : "", this.state = k.LOADING, i.complete ? this.onLoaded() : (i.onload = () => {
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
    this.state = k.LOADED, this.slide && this.element && (this.instance.dispatch("loadComplete", {
      slide: this.slide,
      content: this
    }), this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode && (this.append(), this.slide.updateContentSize(!0)), (this.state === k.LOADED || this.state === k.ERROR) && this.removePlaceholder());
  }
  /**
   * Content load error handler
   */
  onError() {
    this.state = k.ERROR, this.slide && (this.displayError(), this.instance.dispatch("loadComplete", {
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
    return this.instance.applyFilters("isContentLoading", this.state === k.LOADING, this);
  }
  /**
   * @returns {Boolean} If the content is in error state
   */
  isError() {
    return this.state === k.ERROR;
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
    }).defaultPrevented && (De(this.element, e, n), this.isImageContent() && !this.isError()))) {
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
    return this.instance.applyFilters("isContentZoomable", this.isImageContent() && this.state !== k.ERROR, this);
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
      let s = te("pswp__error-msg", "div");
      s.innerText = (e = (n = this.instance.options) === null || n === void 0 ? void 0 : n.errorMsg) !== null && e !== void 0 ? e : "", s = /** @type {HTMLDivElement} */
      this.instance.applyFilters("contentErrorElement", s, this), this.element = te("pswp__content pswp__error-msg-container", "div"), this.element.appendChild(s), this.slide.container.innerText = "", this.slide.container.appendChild(this.element), this.slide.updateContentSize(!0), this.removePlaceholder();
    }
  }
  /**
   * Append the content
   */
  append() {
    if (this.isAttached || !this.element)
      return;
    if (this.isAttached = !0, this.state === k.ERROR) {
      this.displayError();
      return;
    }
    if (this.instance.dispatch("contentAppend", {
      content: this
    }).defaultPrevented)
      return;
    const e = "decode" in this.element;
    this.isImageContent() ? e && this.slide && (!this.slide.isActive || Ge()) ? (this.isDecoding = !0, this.element.decode().catch(() => {
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
    }).defaultPrevented || !this.slide || (this.isImageContent() && this.isDecoding && !Ge() ? this.appendImage() : this.isError() && this.load(!1, !0), this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "false"));
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
    }).defaultPrevented || (this.slide && this.element && !this.element.parentNode && this.slide.container.appendChild(this.element), (this.state === k.LOADED || this.state === k.ERROR) && this.removePlaceholder()));
  }
}
function ys(t, e) {
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
function ue(t, e, n, s, i) {
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
function Es(t, e, n, s) {
  return {
    x: e.x - ue("left", t, e, n, s) - ue("right", t, e, n, s),
    y: e.y - ue("top", t, e, n, s) - ue("bottom", t, e, n, s)
  };
}
const Xe = 4e3;
class ws {
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
    return e || (e = Math.min(1, this.fit * 3), this.elementSize && e * this.elementSize.x > Xe && (e = Xe / this.elementSize.x), e);
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
function yt(t, e, n) {
  const s = e.createContentFromData(t, n);
  let i;
  const {
    options: r
  } = e;
  if (r) {
    i = new ws(r, t, -1);
    let o;
    e.pswp ? o = e.pswp.viewportSize : o = ys(r, e);
    const l = Es(r, o, t, n);
    i.update(s.width, s.height, l);
  }
  return s.lazyLoad(), i && s.setDisplayedSize(Math.ceil(s.width * i.initial), Math.ceil(s.height * i.initial)), s;
}
function bs(t, e) {
  const n = e.getItemData(t);
  if (!e.dispatch("lazyLoadSlide", {
    index: t,
    itemData: n
  }).defaultPrevented)
    return yt(n, e, t);
}
class _s extends ps {
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
    return new gs(e, this, n);
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
    return (n = this.options) !== null && n !== void 0 && n.children || (s = this.options) !== null && s !== void 0 && s.childSelector ? se(this.options.children, this.options.childSelector, e) || [] : [e];
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
    return yt(e, this, n);
  }
}
class Ss extends _s {
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
    se(this.options.gallery, this.options.gallerySelector).forEach((e) => {
      e.addEventListener("click", this.onThumbnailsClick, !1);
    });
  }
  /**
   * @param {MouseEvent} e
   */
  onThumbnailsClick(e) {
    if (ds(e) || window.pswp)
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
    ), i = se(
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
      const i = se(this.options.gallery);
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
    if (hs(s.pswpModule))
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
    typeof s.openPromise == "function" && i.push(s.openPromise()), s.preloadFirstSlide !== !1 && e >= 0 && (this._preloadedContent = bs(e, this));
    const o = ++this._uid;
    Promise.all(i).then((l) => {
      if (this.shouldOpen) {
        const d = l[0];
        this._openPhotoswipe(d, o);
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
    (e = this.pswp) === null || e === void 0 || e.destroy(), this.shouldOpen = !1, this._listeners = {}, se(this.options.gallery, this.options.gallerySelector).forEach((n) => {
      n.removeEventListener("click", this.onThumbnailsClick, !1);
    });
  }
}
/*!
 * pinia v3.0.2
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let ne;
const pe = (t) => ne = t, Os = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function H(t) {
  return t && typeof t == "object" && Object.prototype.toString.call(t) === "[object Object]" && typeof t.toJSON != "function";
}
var re;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})(re || (re = {}));
const ie = typeof window < "u";
function Et(t, e) {
  for (const n in e) {
    const s = e[n];
    if (!(n in t))
      continue;
    const i = t[n];
    H(i) && H(s) && !oe(s) && !ze(s) ? t[n] = Et(i, s) : t[n] = s;
  }
  return t;
}
const wt = () => {
};
function Ze(t, e, n, s = wt) {
  t.push(e);
  const i = () => {
    const r = t.indexOf(e);
    r > -1 && (t.splice(r, 1), s());
  };
  return !n && es() && ts(i), i;
}
function J(t, ...e) {
  t.slice().forEach((n) => {
    n(...e);
  });
}
const Rs = (t) => t(), Qe = Symbol(), Ce = Symbol();
function Le(t, e) {
  t instanceof Map && e instanceof Map ? e.forEach((n, s) => t.set(s, n)) : t instanceof Set && e instanceof Set && e.forEach(t.add, t);
  for (const n in e) {
    if (!e.hasOwnProperty(n))
      continue;
    const s = e[n], i = t[n];
    H(i) && H(s) && t.hasOwnProperty(n) && !oe(s) && !ze(s) ? t[n] = Le(i, s) : t[n] = s;
  }
  return t;
}
const Ps = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function vs(t) {
  return !H(t) || !Object.prototype.hasOwnProperty.call(t, Ps);
}
const { assign: I } = Object;
function Ye(t) {
  return !!(oe(t) && t.effect);
}
function et(t, e, n, s) {
  const { state: i, actions: r, getters: o } = e, l = n.state.value[t];
  let d;
  function u() {
    !l && (process.env.NODE_ENV === "production" || !s) && (n.state.value[t] = i ? i() : {});
    const c = process.env.NODE_ENV !== "production" && s ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      We(mt(i ? i() : {}).value)
    ) : We(n.state.value[t]);
    return I(c, r, Object.keys(o || {}).reduce((h, b) => (process.env.NODE_ENV !== "production" && b in c && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${b}" in store "${t}".`), h[b] = ee(gt(() => {
      pe(n);
      const _ = n._s.get(t);
      return o[b].call(_, _);
    })), h), {}));
  }
  return d = ke(t, u, e, n, s, !0), d;
}
function ke(t, e, n = {}, s, i, r) {
  let o;
  const l = I({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !s._e.active)
    throw new Error("Pinia destroyed");
  const d = { deep: !0 };
  process.env.NODE_ENV !== "production" && (d.onTrigger = (g) => {
    u ? _ = g : u == !1 && !y._hotUpdating && (Array.isArray(_) ? _.push(g) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let u, c, h = [], b = [], _;
  const f = s.state.value[t];
  !r && !f && (process.env.NODE_ENV === "production" || !i) && (s.state.value[t] = {});
  const E = mt({});
  let m;
  function S(g) {
    let p;
    u = c = !1, process.env.NODE_ENV !== "production" && (_ = []), typeof g == "function" ? (g(s.state.value[t]), p = {
      type: re.patchFunction,
      storeId: t,
      events: _
    }) : (Le(s.state.value[t], g), p = {
      type: re.patchObject,
      payload: g,
      storeId: t,
      events: _
    });
    const O = m = Symbol();
    He().then(() => {
      m === O && (u = !0);
    }), c = !0, J(h, p, s.state.value[t]);
  }
  const R = r ? function() {
    const { state: p } = n, O = p ? p() : {};
    this.$patch((D) => {
      I(D, O);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${t}" is built using the setup syntax and does not implement $reset().`);
    } : wt
  );
  function v() {
    o.stop(), h = [], b = [], s._s.delete(t);
  }
  const x = (g, p = "") => {
    if (Qe in g)
      return g[Ce] = p, g;
    const O = function() {
      pe(s);
      const D = Array.from(arguments), Z = [], Re = [];
      function Wt(L) {
        Z.push(L);
      }
      function Jt(L) {
        Re.push(L);
      }
      J(b, {
        args: D,
        name: O[Ce],
        store: y,
        after: Wt,
        onError: Jt
      });
      let Q;
      try {
        Q = g.apply(this && this.$id === t ? this : y, D);
      } catch (L) {
        throw J(Re, L), L;
      }
      return Q instanceof Promise ? Q.then((L) => (J(Z, L), L)).catch((L) => (J(Re, L), Promise.reject(L))) : (J(Z, Q), Q);
    };
    return O[Qe] = !0, O[Ce] = p, O;
  }, N = /* @__PURE__ */ ee({
    actions: {},
    getters: {},
    state: [],
    hotState: E
  }), F = {
    _p: s,
    // _s: scope,
    $id: t,
    $onAction: Ze.bind(null, b),
    $patch: S,
    $reset: R,
    $subscribe(g, p = {}) {
      const O = Ze(h, g, p.detached, () => D()), D = o.run(() => ss(() => s.state.value[t], (Z) => {
        (p.flush === "sync" ? c : u) && g({
          storeId: t,
          type: re.direct,
          events: _
        }, Z);
      }, I({}, d, p)));
      return O;
    },
    $dispose: v
  }, y = Zt(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ie ? I(
    {
      _hmrPayload: N,
      _customProperties: ee(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    F
    // must be added later
    // setupStore
  ) : F);
  s._s.set(t, y);
  const U = (s._a && s._a.runWithContext || Rs)(() => s._e.run(() => (o = Qt()).run(() => e({ action: x }))));
  for (const g in U) {
    const p = U[g];
    if (oe(p) && !Ye(p) || ze(p))
      process.env.NODE_ENV !== "production" && i ? E.value[g] = Pe(U, g) : r || (f && vs(p) && (oe(p) ? p.value = f[g] : Le(p, f[g])), s.state.value[t][g] = p), process.env.NODE_ENV !== "production" && N.state.push(g);
    else if (typeof p == "function") {
      const O = process.env.NODE_ENV !== "production" && i ? p : x(p, g);
      U[g] = O, process.env.NODE_ENV !== "production" && (N.actions[g] = p), l.actions[g] = p;
    } else process.env.NODE_ENV !== "production" && Ye(p) && (N.getters[g] = r ? (
      // @ts-expect-error
      n.getters[g]
    ) : p, ie && (U._getters || // @ts-expect-error: same
    (U._getters = ee([]))).push(g));
  }
  if (I(y, U), I(Yt(y), U), Object.defineProperty(y, "$state", {
    get: () => process.env.NODE_ENV !== "production" && i ? E.value : s.state.value[t],
    set: (g) => {
      if (process.env.NODE_ENV !== "production" && i)
        throw new Error("cannot set hotState");
      S((p) => {
        I(p, g);
      });
    }
  }), process.env.NODE_ENV !== "production" && (y._hotUpdate = ee((g) => {
    y._hotUpdating = !0, g._hmrPayload.state.forEach((p) => {
      if (p in y.$state) {
        const O = g.$state[p], D = y.$state[p];
        typeof O == "object" && H(O) && H(D) ? Et(O, D) : g.$state[p] = D;
      }
      y[p] = Pe(g.$state, p);
    }), Object.keys(y.$state).forEach((p) => {
      p in g.$state || delete y[p];
    }), u = !1, c = !1, s.state.value[t] = Pe(g._hmrPayload, "hotState"), c = !0, He().then(() => {
      u = !0;
    });
    for (const p in g._hmrPayload.actions) {
      const O = g[p];
      y[p] = //
      x(O, p);
    }
    for (const p in g._hmrPayload.getters) {
      const O = g._hmrPayload.getters[p], D = r ? (
        // special handling of options api
        gt(() => (pe(s), O.call(y, y)))
      ) : O;
      y[p] = //
      D;
    }
    Object.keys(y._hmrPayload.getters).forEach((p) => {
      p in g._hmrPayload.getters || delete y[p];
    }), Object.keys(y._hmrPayload.actions).forEach((p) => {
      p in g._hmrPayload.actions || delete y[p];
    }), y._hmrPayload = g._hmrPayload, y._getters = g._getters, y._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ie) {
    const g = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
      Object.defineProperty(y, p, I({ value: y[p] }, g));
    });
  }
  return s._p.forEach((g) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ie) {
      const p = o.run(() => g({
        store: y,
        app: s._a,
        pinia: s,
        options: l
      }));
      Object.keys(p || {}).forEach((O) => y._customProperties.add(O)), I(y, p);
    } else
      I(y, o.run(() => g({
        store: y,
        app: s._a,
        pinia: s,
        options: l
      })));
  }), process.env.NODE_ENV !== "production" && y.$state && typeof y.$state == "object" && typeof y.$state.constructor == "function" && !y.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${y.$id}".`), f && r && n.hydrate && n.hydrate(y.$state, f), u = !0, c = !0, y;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Ns(t, e, n) {
  let s;
  const i = typeof e == "function";
  s = i ? n : e;
  function r(o, l) {
    const d = Kt();
    if (o = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && ne && ne._testing ? null : o) || (d ? Gt(Os, null) : null), o && pe(o), process.env.NODE_ENV !== "production" && !ne)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    o = ne, o._s.has(t) || (i ? ke(t, e, s, o) : et(t, s, o), process.env.NODE_ENV !== "production" && (r._pinia = o));
    const u = o._s.get(t);
    if (process.env.NODE_ENV !== "production" && l) {
      const c = "__hot:" + t, h = i ? ke(c, e, s, o, !0) : et(c, I({}, s), o, !0);
      l._hotUpdate(h), delete o.state.value[c], o._s.delete(c);
    }
    if (process.env.NODE_ENV !== "production" && ie) {
      const c = Xt();
      if (c && c.proxy && // avoid adding stores that are just built for hot module replacement
      !l) {
        const h = c.proxy, b = "_pStores" in h ? h._pStores : h._pStores = {};
        b[t] = u;
      }
    }
    return u;
  }
  return r.$id = t, r;
}
function bt(t, e) {
  return function() {
    return t.apply(e, arguments);
  };
}
const { toString: Cs } = Object.prototype, { getPrototypeOf: $e } = Object, { iterator: ye, toStringTag: _t } = Symbol, Ee = /* @__PURE__ */ ((t) => (e) => {
  const n = Cs.call(e);
  return t[n] || (t[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), j = (t) => (t = t.toLowerCase(), (e) => Ee(e) === t), we = (t) => (e) => typeof e === t, { isArray: K } = Array, ae = we("undefined");
function As(t) {
  return t !== null && !ae(t) && t.constructor !== null && !ae(t.constructor) && A(t.constructor.isBuffer) && t.constructor.isBuffer(t);
}
const St = j("ArrayBuffer");
function Ts(t) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && St(t.buffer), e;
}
const xs = we("string"), A = we("function"), Ot = we("number"), be = (t) => t !== null && typeof t == "object", Ds = (t) => t === !0 || t === !1, de = (t) => {
  if (Ee(t) !== "object")
    return !1;
  const e = $e(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(_t in t) && !(ye in t);
}, Ls = j("Date"), ks = j("File"), Is = j("Blob"), Fs = j("FileList"), Us = (t) => be(t) && A(t.pipe), js = (t) => {
  let e;
  return t && (typeof FormData == "function" && t instanceof FormData || A(t.append) && ((e = Ee(t)) === "formdata" || // detect form-data instance
  e === "object" && A(t.toString) && t.toString() === "[object FormData]"));
}, Bs = j("URLSearchParams"), [Ms, zs, $s, Vs] = ["ReadableStream", "Request", "Response", "Headers"].map(j), qs = (t) => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function le(t, e, { allOwnKeys: n = !1 } = {}) {
  if (t === null || typeof t > "u")
    return;
  let s, i;
  if (typeof t != "object" && (t = [t]), K(t))
    for (s = 0, i = t.length; s < i; s++)
      e.call(null, t[s], s, t);
  else {
    const r = n ? Object.getOwnPropertyNames(t) : Object.keys(t), o = r.length;
    let l;
    for (s = 0; s < o; s++)
      l = r[s], e.call(null, t[l], l, t);
  }
}
function Rt(t, e) {
  e = e.toLowerCase();
  const n = Object.keys(t);
  let s = n.length, i;
  for (; s-- > 0; )
    if (i = n[s], e === i.toLowerCase())
      return i;
  return null;
}
const V = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Pt = (t) => !ae(t) && t !== V;
function Ie() {
  const { caseless: t } = Pt(this) && this || {}, e = {}, n = (s, i) => {
    const r = t && Rt(e, i) || i;
    de(e[r]) && de(s) ? e[r] = Ie(e[r], s) : de(s) ? e[r] = Ie({}, s) : K(s) ? e[r] = s.slice() : e[r] = s;
  };
  for (let s = 0, i = arguments.length; s < i; s++)
    arguments[s] && le(arguments[s], n);
  return e;
}
const Hs = (t, e, n, { allOwnKeys: s } = {}) => (le(e, (i, r) => {
  n && A(i) ? t[r] = bt(i, n) : t[r] = i;
}, { allOwnKeys: s }), t), Ws = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t), Js = (t, e, n, s) => {
  t.prototype = Object.create(e.prototype, s), t.prototype.constructor = t, Object.defineProperty(t, "super", {
    value: e.prototype
  }), n && Object.assign(t.prototype, n);
}, Ks = (t, e, n, s) => {
  let i, r, o;
  const l = {};
  if (e = e || {}, t == null) return e;
  do {
    for (i = Object.getOwnPropertyNames(t), r = i.length; r-- > 0; )
      o = i[r], (!s || s(o, t, e)) && !l[o] && (e[o] = t[o], l[o] = !0);
    t = n !== !1 && $e(t);
  } while (t && (!n || n(t, e)) && t !== Object.prototype);
  return e;
}, Gs = (t, e, n) => {
  t = String(t), (n === void 0 || n > t.length) && (n = t.length), n -= e.length;
  const s = t.indexOf(e, n);
  return s !== -1 && s === n;
}, Xs = (t) => {
  if (!t) return null;
  if (K(t)) return t;
  let e = t.length;
  if (!Ot(e)) return null;
  const n = new Array(e);
  for (; e-- > 0; )
    n[e] = t[e];
  return n;
}, Zs = /* @__PURE__ */ ((t) => (e) => t && e instanceof t)(typeof Uint8Array < "u" && $e(Uint8Array)), Qs = (t, e) => {
  const s = (t && t[ye]).call(t);
  let i;
  for (; (i = s.next()) && !i.done; ) {
    const r = i.value;
    e.call(t, r[0], r[1]);
  }
}, Ys = (t, e) => {
  let n;
  const s = [];
  for (; (n = t.exec(e)) !== null; )
    s.push(n);
  return s;
}, en = j("HTMLFormElement"), tn = (t) => t.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, s, i) {
    return s.toUpperCase() + i;
  }
), tt = (({ hasOwnProperty: t }) => (e, n) => t.call(e, n))(Object.prototype), sn = j("RegExp"), vt = (t, e) => {
  const n = Object.getOwnPropertyDescriptors(t), s = {};
  le(n, (i, r) => {
    let o;
    (o = e(i, r, t)) !== !1 && (s[r] = o || i);
  }), Object.defineProperties(t, s);
}, nn = (t) => {
  vt(t, (e, n) => {
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
}, rn = (t, e) => {
  const n = {}, s = (i) => {
    i.forEach((r) => {
      n[r] = !0;
    });
  };
  return K(t) ? s(t) : s(String(t).split(e)), n;
}, on = () => {
}, an = (t, e) => t != null && Number.isFinite(t = +t) ? t : e;
function ln(t) {
  return !!(t && A(t.append) && t[_t] === "FormData" && t[ye]);
}
const cn = (t) => {
  const e = new Array(10), n = (s, i) => {
    if (be(s)) {
      if (e.indexOf(s) >= 0)
        return;
      if (!("toJSON" in s)) {
        e[i] = s;
        const r = K(s) ? [] : {};
        return le(s, (o, l) => {
          const d = n(o, i + 1);
          !ae(d) && (r[l] = d);
        }), e[i] = void 0, r;
      }
    }
    return s;
  };
  return n(t, 0);
}, un = j("AsyncFunction"), dn = (t) => t && (be(t) || A(t)) && A(t.then) && A(t.catch), Nt = ((t, e) => t ? setImmediate : e ? ((n, s) => (V.addEventListener("message", ({ source: i, data: r }) => {
  i === V && r === n && s.length && s.shift()();
}, !1), (i) => {
  s.push(i), V.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  A(V.postMessage)
), hn = typeof queueMicrotask < "u" ? queueMicrotask.bind(V) : typeof process < "u" && process.nextTick || Nt, fn = (t) => t != null && A(t[ye]), a = {
  isArray: K,
  isArrayBuffer: St,
  isBuffer: As,
  isFormData: js,
  isArrayBufferView: Ts,
  isString: xs,
  isNumber: Ot,
  isBoolean: Ds,
  isObject: be,
  isPlainObject: de,
  isReadableStream: Ms,
  isRequest: zs,
  isResponse: $s,
  isHeaders: Vs,
  isUndefined: ae,
  isDate: Ls,
  isFile: ks,
  isBlob: Is,
  isRegExp: sn,
  isFunction: A,
  isStream: Us,
  isURLSearchParams: Bs,
  isTypedArray: Zs,
  isFileList: Fs,
  forEach: le,
  merge: Ie,
  extend: Hs,
  trim: qs,
  stripBOM: Ws,
  inherits: Js,
  toFlatObject: Ks,
  kindOf: Ee,
  kindOfTest: j,
  endsWith: Gs,
  toArray: Xs,
  forEachEntry: Qs,
  matchAll: Ys,
  isHTMLForm: en,
  hasOwnProperty: tt,
  hasOwnProp: tt,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: vt,
  freezeMethods: nn,
  toObjectSet: rn,
  toCamelCase: tn,
  noop: on,
  toFiniteNumber: an,
  findKey: Rt,
  global: V,
  isContextDefined: Pt,
  isSpecCompliantForm: ln,
  toJSONObject: cn,
  isAsyncFn: un,
  isThenable: dn,
  setImmediate: Nt,
  asap: hn,
  isIterable: fn
};
function w(t, e, n, s, i) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = t, this.name = "AxiosError", e && (this.code = e), n && (this.config = n), s && (this.request = s), i && (this.response = i, this.status = i.status ? i.status : null);
}
a.inherits(w, Error, {
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
const Ct = w.prototype, At = {};
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
  At[t] = { value: t };
});
Object.defineProperties(w, At);
Object.defineProperty(Ct, "isAxiosError", { value: !0 });
w.from = (t, e, n, s, i, r) => {
  const o = Object.create(Ct);
  return a.toFlatObject(t, o, function(d) {
    return d !== Error.prototype;
  }, (l) => l !== "isAxiosError"), w.call(o, t.message, e, n, s, i), o.cause = t, o.name = t.name, r && Object.assign(o, r), o;
};
const pn = null;
function Fe(t) {
  return a.isPlainObject(t) || a.isArray(t);
}
function Tt(t) {
  return a.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function st(t, e, n) {
  return t ? t.concat(e).map(function(i, r) {
    return i = Tt(i), !n && r ? "[" + i + "]" : i;
  }).join(n ? "." : "") : e;
}
function mn(t) {
  return a.isArray(t) && !t.some(Fe);
}
const gn = a.toFlatObject(a, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function _e(t, e, n) {
  if (!a.isObject(t))
    throw new TypeError("target must be an object");
  e = e || new FormData(), n = a.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(E, m) {
    return !a.isUndefined(m[E]);
  });
  const s = n.metaTokens, i = n.visitor || c, r = n.dots, o = n.indexes, d = (n.Blob || typeof Blob < "u" && Blob) && a.isSpecCompliantForm(e);
  if (!a.isFunction(i))
    throw new TypeError("visitor must be a function");
  function u(f) {
    if (f === null) return "";
    if (a.isDate(f))
      return f.toISOString();
    if (!d && a.isBlob(f))
      throw new w("Blob is not supported. Use a Buffer instead.");
    return a.isArrayBuffer(f) || a.isTypedArray(f) ? d && typeof Blob == "function" ? new Blob([f]) : Buffer.from(f) : f;
  }
  function c(f, E, m) {
    let S = f;
    if (f && !m && typeof f == "object") {
      if (a.endsWith(E, "{}"))
        E = s ? E : E.slice(0, -2), f = JSON.stringify(f);
      else if (a.isArray(f) && mn(f) || (a.isFileList(f) || a.endsWith(E, "[]")) && (S = a.toArray(f)))
        return E = Tt(E), S.forEach(function(v, x) {
          !(a.isUndefined(v) || v === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            o === !0 ? st([E], x, r) : o === null ? E : E + "[]",
            u(v)
          );
        }), !1;
    }
    return Fe(f) ? !0 : (e.append(st(m, E, r), u(f)), !1);
  }
  const h = [], b = Object.assign(gn, {
    defaultVisitor: c,
    convertValue: u,
    isVisitable: Fe
  });
  function _(f, E) {
    if (!a.isUndefined(f)) {
      if (h.indexOf(f) !== -1)
        throw Error("Circular reference detected in " + E.join("."));
      h.push(f), a.forEach(f, function(S, R) {
        (!(a.isUndefined(S) || S === null) && i.call(
          e,
          S,
          a.isString(R) ? R.trim() : R,
          E,
          b
        )) === !0 && _(S, E ? E.concat(R) : [R]);
      }), h.pop();
    }
  }
  if (!a.isObject(t))
    throw new TypeError("data must be an object");
  return _(t), e;
}
function nt(t) {
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
function Ve(t, e) {
  this._pairs = [], t && _e(t, this, e);
}
const xt = Ve.prototype;
xt.append = function(e, n) {
  this._pairs.push([e, n]);
};
xt.toString = function(e) {
  const n = e ? function(s) {
    return e.call(this, s, nt);
  } : nt;
  return this._pairs.map(function(i) {
    return n(i[0]) + "=" + n(i[1]);
  }, "").join("&");
};
function yn(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Dt(t, e, n) {
  if (!e)
    return t;
  const s = n && n.encode || yn;
  a.isFunction(n) && (n = {
    serialize: n
  });
  const i = n && n.serialize;
  let r;
  if (i ? r = i(e, n) : r = a.isURLSearchParams(e) ? e.toString() : new Ve(e, n).toString(s), r) {
    const o = t.indexOf("#");
    o !== -1 && (t = t.slice(0, o)), t += (t.indexOf("?") === -1 ? "?" : "&") + r;
  }
  return t;
}
class it {
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
const Lt = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, En = typeof URLSearchParams < "u" ? URLSearchParams : Ve, wn = typeof FormData < "u" ? FormData : null, bn = typeof Blob < "u" ? Blob : null, _n = {
  isBrowser: !0,
  classes: {
    URLSearchParams: En,
    FormData: wn,
    Blob: bn
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, qe = typeof window < "u" && typeof document < "u", Ue = typeof navigator == "object" && navigator || void 0, Sn = qe && (!Ue || ["ReactNative", "NativeScript", "NS"].indexOf(Ue.product) < 0), On = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Rn = qe && window.location.href || "http://localhost", Pn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: qe,
  hasStandardBrowserEnv: Sn,
  hasStandardBrowserWebWorkerEnv: On,
  navigator: Ue,
  origin: Rn
}, Symbol.toStringTag, { value: "Module" })), C = {
  ...Pn,
  ..._n
};
function vn(t, e) {
  return _e(t, new C.classes.URLSearchParams(), Object.assign({
    visitor: function(n, s, i, r) {
      return C.isNode && a.isBuffer(n) ? (this.append(s, n.toString("base64")), !1) : r.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function Nn(t) {
  return a.matchAll(/\w+|\[(\w*)]/g, t).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function Cn(t) {
  const e = {}, n = Object.keys(t);
  let s;
  const i = n.length;
  let r;
  for (s = 0; s < i; s++)
    r = n[s], e[r] = t[r];
  return e;
}
function kt(t) {
  function e(n, s, i, r) {
    let o = n[r++];
    if (o === "__proto__") return !0;
    const l = Number.isFinite(+o), d = r >= n.length;
    return o = !o && a.isArray(i) ? i.length : o, d ? (a.hasOwnProp(i, o) ? i[o] = [i[o], s] : i[o] = s, !l) : ((!i[o] || !a.isObject(i[o])) && (i[o] = []), e(n, s, i[o], r) && a.isArray(i[o]) && (i[o] = Cn(i[o])), !l);
  }
  if (a.isFormData(t) && a.isFunction(t.entries)) {
    const n = {};
    return a.forEachEntry(t, (s, i) => {
      e(Nn(s), i, n, 0);
    }), n;
  }
  return null;
}
function An(t, e, n) {
  if (a.isString(t))
    try {
      return (e || JSON.parse)(t), a.trim(t);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (n || JSON.stringify)(t);
}
const ce = {
  transitional: Lt,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(e, n) {
    const s = n.getContentType() || "", i = s.indexOf("application/json") > -1, r = a.isObject(e);
    if (r && a.isHTMLForm(e) && (e = new FormData(e)), a.isFormData(e))
      return i ? JSON.stringify(kt(e)) : e;
    if (a.isArrayBuffer(e) || a.isBuffer(e) || a.isStream(e) || a.isFile(e) || a.isBlob(e) || a.isReadableStream(e))
      return e;
    if (a.isArrayBufferView(e))
      return e.buffer;
    if (a.isURLSearchParams(e))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let l;
    if (r) {
      if (s.indexOf("application/x-www-form-urlencoded") > -1)
        return vn(e, this.formSerializer).toString();
      if ((l = a.isFileList(e)) || s.indexOf("multipart/form-data") > -1) {
        const d = this.env && this.env.FormData;
        return _e(
          l ? { "files[]": e } : e,
          d && new d(),
          this.formSerializer
        );
      }
    }
    return r || i ? (n.setContentType("application/json", !1), An(e)) : e;
  }],
  transformResponse: [function(e) {
    const n = this.transitional || ce.transitional, s = n && n.forcedJSONParsing, i = this.responseType === "json";
    if (a.isResponse(e) || a.isReadableStream(e))
      return e;
    if (e && a.isString(e) && (s && !this.responseType || i)) {
      const o = !(n && n.silentJSONParsing) && i;
      try {
        return JSON.parse(e);
      } catch (l) {
        if (o)
          throw l.name === "SyntaxError" ? w.from(l, w.ERR_BAD_RESPONSE, this, null, this.response) : l;
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
    FormData: C.classes.FormData,
    Blob: C.classes.Blob
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
const Tn = a.toObjectSet([
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
]), xn = (t) => {
  const e = {};
  let n, s, i;
  return t && t.split(`
`).forEach(function(o) {
    i = o.indexOf(":"), n = o.substring(0, i).trim().toLowerCase(), s = o.substring(i + 1).trim(), !(!n || e[n] && Tn[n]) && (n === "set-cookie" ? e[n] ? e[n].push(s) : e[n] = [s] : e[n] = e[n] ? e[n] + ", " + s : s);
  }), e;
}, rt = Symbol("internals");
function Y(t) {
  return t && String(t).trim().toLowerCase();
}
function he(t) {
  return t === !1 || t == null ? t : a.isArray(t) ? t.map(he) : String(t);
}
function Dn(t) {
  const e = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = n.exec(t); )
    e[s[1]] = s[2];
  return e;
}
const Ln = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
function Ae(t, e, n, s, i) {
  if (a.isFunction(s))
    return s.call(this, e, n);
  if (i && (e = n), !!a.isString(e)) {
    if (a.isString(s))
      return e.indexOf(s) !== -1;
    if (a.isRegExp(s))
      return s.test(e);
  }
}
function kn(t) {
  return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, n, s) => n.toUpperCase() + s);
}
function In(t, e) {
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
let T = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, n, s) {
    const i = this;
    function r(l, d, u) {
      const c = Y(d);
      if (!c)
        throw new Error("header name must be a non-empty string");
      const h = a.findKey(i, c);
      (!h || i[h] === void 0 || u === !0 || u === void 0 && i[h] !== !1) && (i[h || d] = he(l));
    }
    const o = (l, d) => a.forEach(l, (u, c) => r(u, c, d));
    if (a.isPlainObject(e) || e instanceof this.constructor)
      o(e, n);
    else if (a.isString(e) && (e = e.trim()) && !Ln(e))
      o(xn(e), n);
    else if (a.isObject(e) && a.isIterable(e)) {
      let l = {}, d, u;
      for (const c of e) {
        if (!a.isArray(c))
          throw TypeError("Object iterator must return a key-value pair");
        l[u = c[0]] = (d = l[u]) ? a.isArray(d) ? [...d, c[1]] : [d, c[1]] : c[1];
      }
      o(l, n);
    } else
      e != null && r(n, e, s);
    return this;
  }
  get(e, n) {
    if (e = Y(e), e) {
      const s = a.findKey(this, e);
      if (s) {
        const i = this[s];
        if (!n)
          return i;
        if (n === !0)
          return Dn(i);
        if (a.isFunction(n))
          return n.call(this, i, s);
        if (a.isRegExp(n))
          return n.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, n) {
    if (e = Y(e), e) {
      const s = a.findKey(this, e);
      return !!(s && this[s] !== void 0 && (!n || Ae(this, this[s], s, n)));
    }
    return !1;
  }
  delete(e, n) {
    const s = this;
    let i = !1;
    function r(o) {
      if (o = Y(o), o) {
        const l = a.findKey(s, o);
        l && (!n || Ae(s, s[l], l, n)) && (delete s[l], i = !0);
      }
    }
    return a.isArray(e) ? e.forEach(r) : r(e), i;
  }
  clear(e) {
    const n = Object.keys(this);
    let s = n.length, i = !1;
    for (; s--; ) {
      const r = n[s];
      (!e || Ae(this, this[r], r, e, !0)) && (delete this[r], i = !0);
    }
    return i;
  }
  normalize(e) {
    const n = this, s = {};
    return a.forEach(this, (i, r) => {
      const o = a.findKey(s, r);
      if (o) {
        n[o] = he(i), delete n[r];
        return;
      }
      const l = e ? kn(r) : String(r).trim();
      l !== r && delete n[r], n[l] = he(i), s[l] = !0;
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
  getSetCookie() {
    return this.get("set-cookie") || [];
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
    const s = (this[rt] = this[rt] = {
      accessors: {}
    }).accessors, i = this.prototype;
    function r(o) {
      const l = Y(o);
      s[l] || (In(i, o), s[l] = !0);
    }
    return a.isArray(e) ? e.forEach(r) : r(e), this;
  }
};
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
function Te(t, e) {
  const n = this || ce, s = e || n, i = T.from(s.headers);
  let r = s.data;
  return a.forEach(t, function(l) {
    r = l.call(n, r, i.normalize(), e ? e.status : void 0);
  }), i.normalize(), r;
}
function It(t) {
  return !!(t && t.__CANCEL__);
}
function G(t, e, n) {
  w.call(this, t ?? "canceled", w.ERR_CANCELED, e, n), this.name = "CanceledError";
}
a.inherits(G, w, {
  __CANCEL__: !0
});
function Ft(t, e, n) {
  const s = n.config.validateStatus;
  !n.status || !s || s(n.status) ? t(n) : e(new w(
    "Request failed with status code " + n.status,
    [w.ERR_BAD_REQUEST, w.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function Fn(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return e && e[1] || "";
}
function Un(t, e) {
  t = t || 10;
  const n = new Array(t), s = new Array(t);
  let i = 0, r = 0, o;
  return e = e !== void 0 ? e : 1e3, function(d) {
    const u = Date.now(), c = s[r];
    o || (o = u), n[i] = d, s[i] = u;
    let h = r, b = 0;
    for (; h !== i; )
      b += n[h++], h = h % t;
    if (i = (i + 1) % t, i === r && (r = (r + 1) % t), u - o < e)
      return;
    const _ = c && u - c;
    return _ ? Math.round(b * 1e3 / _) : void 0;
  };
}
function jn(t, e) {
  let n = 0, s = 1e3 / e, i, r;
  const o = (u, c = Date.now()) => {
    n = c, i = null, r && (clearTimeout(r), r = null), t.apply(null, u);
  };
  return [(...u) => {
    const c = Date.now(), h = c - n;
    h >= s ? o(u, c) : (i = u, r || (r = setTimeout(() => {
      r = null, o(i);
    }, s - h)));
  }, () => i && o(i)];
}
const me = (t, e, n = 3) => {
  let s = 0;
  const i = Un(50, 250);
  return jn((r) => {
    const o = r.loaded, l = r.lengthComputable ? r.total : void 0, d = o - s, u = i(d), c = o <= l;
    s = o;
    const h = {
      loaded: o,
      total: l,
      progress: l ? o / l : void 0,
      bytes: d,
      rate: u || void 0,
      estimated: u && l && c ? (l - o) / u : void 0,
      event: r,
      lengthComputable: l != null,
      [e ? "download" : "upload"]: !0
    };
    t(h);
  }, n);
}, ot = (t, e) => {
  const n = t != null;
  return [(s) => e[0]({
    lengthComputable: n,
    total: t,
    loaded: s
  }), e[1]];
}, at = (t) => (...e) => a.asap(() => t(...e)), Bn = C.hasStandardBrowserEnv ? /* @__PURE__ */ ((t, e) => (n) => (n = new URL(n, C.origin), t.protocol === n.protocol && t.host === n.host && (e || t.port === n.port)))(
  new URL(C.origin),
  C.navigator && /(msie|trident)/i.test(C.navigator.userAgent)
) : () => !0, Mn = C.hasStandardBrowserEnv ? (
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
function zn(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function $n(t, e) {
  return e ? t.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function Ut(t, e, n) {
  let s = !zn(e);
  return t && (s || n == !1) ? $n(t, e) : e;
}
const lt = (t) => t instanceof T ? { ...t } : t;
function W(t, e) {
  e = e || {};
  const n = {};
  function s(u, c, h, b) {
    return a.isPlainObject(u) && a.isPlainObject(c) ? a.merge.call({ caseless: b }, u, c) : a.isPlainObject(c) ? a.merge({}, c) : a.isArray(c) ? c.slice() : c;
  }
  function i(u, c, h, b) {
    if (a.isUndefined(c)) {
      if (!a.isUndefined(u))
        return s(void 0, u, h, b);
    } else return s(u, c, h, b);
  }
  function r(u, c) {
    if (!a.isUndefined(c))
      return s(void 0, c);
  }
  function o(u, c) {
    if (a.isUndefined(c)) {
      if (!a.isUndefined(u))
        return s(void 0, u);
    } else return s(void 0, c);
  }
  function l(u, c, h) {
    if (h in e)
      return s(u, c);
    if (h in t)
      return s(void 0, u);
  }
  const d = {
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
    headers: (u, c, h) => i(lt(u), lt(c), h, !0)
  };
  return a.forEach(Object.keys(Object.assign({}, t, e)), function(c) {
    const h = d[c] || i, b = h(t[c], e[c], c);
    a.isUndefined(b) && h !== l || (n[c] = b);
  }), n;
}
const jt = (t) => {
  const e = W({}, t);
  let { data: n, withXSRFToken: s, xsrfHeaderName: i, xsrfCookieName: r, headers: o, auth: l } = e;
  e.headers = o = T.from(o), e.url = Dt(Ut(e.baseURL, e.url, e.allowAbsoluteUrls), t.params, t.paramsSerializer), l && o.set(
    "Authorization",
    "Basic " + btoa((l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : ""))
  );
  let d;
  if (a.isFormData(n)) {
    if (C.hasStandardBrowserEnv || C.hasStandardBrowserWebWorkerEnv)
      o.setContentType(void 0);
    else if ((d = o.getContentType()) !== !1) {
      const [u, ...c] = d ? d.split(";").map((h) => h.trim()).filter(Boolean) : [];
      o.setContentType([u || "multipart/form-data", ...c].join("; "));
    }
  }
  if (C.hasStandardBrowserEnv && (s && a.isFunction(s) && (s = s(e)), s || s !== !1 && Bn(e.url))) {
    const u = i && r && Mn.read(r);
    u && o.set(i, u);
  }
  return e;
}, Vn = typeof XMLHttpRequest < "u", qn = Vn && function(t) {
  return new Promise(function(n, s) {
    const i = jt(t);
    let r = i.data;
    const o = T.from(i.headers).normalize();
    let { responseType: l, onUploadProgress: d, onDownloadProgress: u } = i, c, h, b, _, f;
    function E() {
      _ && _(), f && f(), i.cancelToken && i.cancelToken.unsubscribe(c), i.signal && i.signal.removeEventListener("abort", c);
    }
    let m = new XMLHttpRequest();
    m.open(i.method.toUpperCase(), i.url, !0), m.timeout = i.timeout;
    function S() {
      if (!m)
        return;
      const v = T.from(
        "getAllResponseHeaders" in m && m.getAllResponseHeaders()
      ), N = {
        data: !l || l === "text" || l === "json" ? m.responseText : m.response,
        status: m.status,
        statusText: m.statusText,
        headers: v,
        config: t,
        request: m
      };
      Ft(function(y) {
        n(y), E();
      }, function(y) {
        s(y), E();
      }, N), m = null;
    }
    "onloadend" in m ? m.onloadend = S : m.onreadystatechange = function() {
      !m || m.readyState !== 4 || m.status === 0 && !(m.responseURL && m.responseURL.indexOf("file:") === 0) || setTimeout(S);
    }, m.onabort = function() {
      m && (s(new w("Request aborted", w.ECONNABORTED, t, m)), m = null);
    }, m.onerror = function() {
      s(new w("Network Error", w.ERR_NETWORK, t, m)), m = null;
    }, m.ontimeout = function() {
      let x = i.timeout ? "timeout of " + i.timeout + "ms exceeded" : "timeout exceeded";
      const N = i.transitional || Lt;
      i.timeoutErrorMessage && (x = i.timeoutErrorMessage), s(new w(
        x,
        N.clarifyTimeoutError ? w.ETIMEDOUT : w.ECONNABORTED,
        t,
        m
      )), m = null;
    }, r === void 0 && o.setContentType(null), "setRequestHeader" in m && a.forEach(o.toJSON(), function(x, N) {
      m.setRequestHeader(N, x);
    }), a.isUndefined(i.withCredentials) || (m.withCredentials = !!i.withCredentials), l && l !== "json" && (m.responseType = i.responseType), u && ([b, f] = me(u, !0), m.addEventListener("progress", b)), d && m.upload && ([h, _] = me(d), m.upload.addEventListener("progress", h), m.upload.addEventListener("loadend", _)), (i.cancelToken || i.signal) && (c = (v) => {
      m && (s(!v || v.type ? new G(null, t, m) : v), m.abort(), m = null);
    }, i.cancelToken && i.cancelToken.subscribe(c), i.signal && (i.signal.aborted ? c() : i.signal.addEventListener("abort", c)));
    const R = Fn(i.url);
    if (R && C.protocols.indexOf(R) === -1) {
      s(new w("Unsupported protocol " + R + ":", w.ERR_BAD_REQUEST, t));
      return;
    }
    m.send(r || null);
  });
}, Hn = (t, e) => {
  const { length: n } = t = t ? t.filter(Boolean) : [];
  if (e || n) {
    let s = new AbortController(), i;
    const r = function(u) {
      if (!i) {
        i = !0, l();
        const c = u instanceof Error ? u : this.reason;
        s.abort(c instanceof w ? c : new G(c instanceof Error ? c.message : c));
      }
    };
    let o = e && setTimeout(() => {
      o = null, r(new w(`timeout ${e} of ms exceeded`, w.ETIMEDOUT));
    }, e);
    const l = () => {
      t && (o && clearTimeout(o), o = null, t.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(r) : u.removeEventListener("abort", r);
      }), t = null);
    };
    t.forEach((u) => u.addEventListener("abort", r));
    const { signal: d } = s;
    return d.unsubscribe = () => a.asap(l), d;
  }
}, Wn = function* (t, e) {
  let n = t.byteLength;
  if (n < e) {
    yield t;
    return;
  }
  let s = 0, i;
  for (; s < n; )
    i = s + e, yield t.slice(s, i), s = i;
}, Jn = async function* (t, e) {
  for await (const n of Kn(t))
    yield* Wn(n, e);
}, Kn = async function* (t) {
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
}, ct = (t, e, n, s) => {
  const i = Jn(t, e);
  let r = 0, o, l = (d) => {
    o || (o = !0, s && s(d));
  };
  return new ReadableStream({
    async pull(d) {
      try {
        const { done: u, value: c } = await i.next();
        if (u) {
          l(), d.close();
          return;
        }
        let h = c.byteLength;
        if (n) {
          let b = r += h;
          n(b);
        }
        d.enqueue(new Uint8Array(c));
      } catch (u) {
        throw l(u), u;
      }
    },
    cancel(d) {
      return l(d), i.return();
    }
  }, {
    highWaterMark: 2
  });
}, Se = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Bt = Se && typeof ReadableStream == "function", Gn = Se && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((t) => (e) => t.encode(e))(new TextEncoder()) : async (t) => new Uint8Array(await new Response(t).arrayBuffer())), Mt = (t, ...e) => {
  try {
    return !!t(...e);
  } catch {
    return !1;
  }
}, Xn = Bt && Mt(() => {
  let t = !1;
  const e = new Request(C.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return t = !0, "half";
    }
  }).headers.has("Content-Type");
  return t && !e;
}), ut = 64 * 1024, je = Bt && Mt(() => a.isReadableStream(new Response("").body)), ge = {
  stream: je && ((t) => t.body)
};
Se && ((t) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e) => {
    !ge[e] && (ge[e] = a.isFunction(t[e]) ? (n) => n[e]() : (n, s) => {
      throw new w(`Response type '${e}' is not supported`, w.ERR_NOT_SUPPORT, s);
    });
  });
})(new Response());
const Zn = async (t) => {
  if (t == null)
    return 0;
  if (a.isBlob(t))
    return t.size;
  if (a.isSpecCompliantForm(t))
    return (await new Request(C.origin, {
      method: "POST",
      body: t
    }).arrayBuffer()).byteLength;
  if (a.isArrayBufferView(t) || a.isArrayBuffer(t))
    return t.byteLength;
  if (a.isURLSearchParams(t) && (t = t + ""), a.isString(t))
    return (await Gn(t)).byteLength;
}, Qn = async (t, e) => {
  const n = a.toFiniteNumber(t.getContentLength());
  return n ?? Zn(e);
}, Yn = Se && (async (t) => {
  let {
    url: e,
    method: n,
    data: s,
    signal: i,
    cancelToken: r,
    timeout: o,
    onDownloadProgress: l,
    onUploadProgress: d,
    responseType: u,
    headers: c,
    withCredentials: h = "same-origin",
    fetchOptions: b
  } = jt(t);
  u = u ? (u + "").toLowerCase() : "text";
  let _ = Hn([i, r && r.toAbortSignal()], o), f;
  const E = _ && _.unsubscribe && (() => {
    _.unsubscribe();
  });
  let m;
  try {
    if (d && Xn && n !== "get" && n !== "head" && (m = await Qn(c, s)) !== 0) {
      let N = new Request(e, {
        method: "POST",
        body: s,
        duplex: "half"
      }), F;
      if (a.isFormData(s) && (F = N.headers.get("content-type")) && c.setContentType(F), N.body) {
        const [y, X] = ot(
          m,
          me(at(d))
        );
        s = ct(N.body, ut, y, X);
      }
    }
    a.isString(h) || (h = h ? "include" : "omit");
    const S = "credentials" in Request.prototype;
    f = new Request(e, {
      ...b,
      signal: _,
      method: n.toUpperCase(),
      headers: c.normalize().toJSON(),
      body: s,
      duplex: "half",
      credentials: S ? h : void 0
    });
    let R = await fetch(f);
    const v = je && (u === "stream" || u === "response");
    if (je && (l || v && E)) {
      const N = {};
      ["status", "statusText", "headers"].forEach((U) => {
        N[U] = R[U];
      });
      const F = a.toFiniteNumber(R.headers.get("content-length")), [y, X] = l && ot(
        F,
        me(at(l), !0)
      ) || [];
      R = new Response(
        ct(R.body, ut, y, () => {
          X && X(), E && E();
        }),
        N
      );
    }
    u = u || "text";
    let x = await ge[a.findKey(ge, u) || "text"](R, t);
    return !v && E && E(), await new Promise((N, F) => {
      Ft(N, F, {
        data: x,
        headers: T.from(R.headers),
        status: R.status,
        statusText: R.statusText,
        config: t,
        request: f
      });
    });
  } catch (S) {
    throw E && E(), S && S.name === "TypeError" && /Load failed|fetch/i.test(S.message) ? Object.assign(
      new w("Network Error", w.ERR_NETWORK, t, f),
      {
        cause: S.cause || S
      }
    ) : w.from(S, S && S.code, t, f);
  }
}), Be = {
  http: pn,
  xhr: qn,
  fetch: Yn
};
a.forEach(Be, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: e });
    } catch {
    }
    Object.defineProperty(t, "adapterName", { value: e });
  }
});
const dt = (t) => `- ${t}`, ei = (t) => a.isFunction(t) || t === null || t === !1, zt = {
  getAdapter: (t) => {
    t = a.isArray(t) ? t : [t];
    const { length: e } = t;
    let n, s;
    const i = {};
    for (let r = 0; r < e; r++) {
      n = t[r];
      let o;
      if (s = n, !ei(n) && (s = Be[(o = String(n)).toLowerCase()], s === void 0))
        throw new w(`Unknown adapter '${o}'`);
      if (s)
        break;
      i[o || "#" + r] = s;
    }
    if (!s) {
      const r = Object.entries(i).map(
        ([l, d]) => `adapter ${l} ` + (d === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let o = e ? r.length > 1 ? `since :
` + r.map(dt).join(`
`) : " " + dt(r[0]) : "as no adapter specified";
      throw new w(
        "There is no suitable adapter to dispatch the request " + o,
        "ERR_NOT_SUPPORT"
      );
    }
    return s;
  },
  adapters: Be
};
function xe(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new G(null, t);
}
function ht(t) {
  return xe(t), t.headers = T.from(t.headers), t.data = Te.call(
    t,
    t.transformRequest
  ), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), zt.getAdapter(t.adapter || ce.adapter)(t).then(function(s) {
    return xe(t), s.data = Te.call(
      t,
      t.transformResponse,
      s
    ), s.headers = T.from(s.headers), s;
  }, function(s) {
    return It(s) || (xe(t), s && s.response && (s.response.data = Te.call(
      t,
      t.transformResponse,
      s.response
    ), s.response.headers = T.from(s.response.headers))), Promise.reject(s);
  });
}
const $t = "1.9.0", Oe = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
  Oe[t] = function(s) {
    return typeof s === t || "a" + (e < 1 ? "n " : " ") + t;
  };
});
const ft = {};
Oe.transitional = function(e, n, s) {
  function i(r, o) {
    return "[Axios v" + $t + "] Transitional option '" + r + "'" + o + (s ? ". " + s : "");
  }
  return (r, o, l) => {
    if (e === !1)
      throw new w(
        i(o, " has been removed" + (n ? " in " + n : "")),
        w.ERR_DEPRECATED
      );
    return n && !ft[o] && (ft[o] = !0, console.warn(
      i(
        o,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), e ? e(r, o, l) : !0;
  };
};
Oe.spelling = function(e) {
  return (n, s) => (console.warn(`${s} is likely a misspelling of ${e}`), !0);
};
function ti(t, e, n) {
  if (typeof t != "object")
    throw new w("options must be an object", w.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(t);
  let i = s.length;
  for (; i-- > 0; ) {
    const r = s[i], o = e[r];
    if (o) {
      const l = t[r], d = l === void 0 || o(l, r, t);
      if (d !== !0)
        throw new w("option " + r + " must be " + d, w.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new w("Unknown option " + r, w.ERR_BAD_OPTION);
  }
}
const fe = {
  assertOptions: ti,
  validators: Oe
}, B = fe.validators;
let q = class {
  constructor(e) {
    this.defaults = e || {}, this.interceptors = {
      request: new it(),
      response: new it()
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
    typeof e == "string" ? (n = n || {}, n.url = e) : n = e || {}, n = W(this.defaults, n);
    const { transitional: s, paramsSerializer: i, headers: r } = n;
    s !== void 0 && fe.assertOptions(s, {
      silentJSONParsing: B.transitional(B.boolean),
      forcedJSONParsing: B.transitional(B.boolean),
      clarifyTimeoutError: B.transitional(B.boolean)
    }, !1), i != null && (a.isFunction(i) ? n.paramsSerializer = {
      serialize: i
    } : fe.assertOptions(i, {
      encode: B.function,
      serialize: B.function
    }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), fe.assertOptions(n, {
      baseUrl: B.spelling("baseURL"),
      withXsrfToken: B.spelling("withXSRFToken")
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
    let d = !0;
    this.interceptors.request.forEach(function(E) {
      typeof E.runWhen == "function" && E.runWhen(n) === !1 || (d = d && E.synchronous, l.unshift(E.fulfilled, E.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(E) {
      u.push(E.fulfilled, E.rejected);
    });
    let c, h = 0, b;
    if (!d) {
      const f = [ht.bind(this), void 0];
      for (f.unshift.apply(f, l), f.push.apply(f, u), b = f.length, c = Promise.resolve(n); h < b; )
        c = c.then(f[h++], f[h++]);
      return c;
    }
    b = l.length;
    let _ = n;
    for (h = 0; h < b; ) {
      const f = l[h++], E = l[h++];
      try {
        _ = f(_);
      } catch (m) {
        E.call(this, m);
        break;
      }
    }
    try {
      c = ht.call(this, _);
    } catch (f) {
      return Promise.reject(f);
    }
    for (h = 0, b = u.length; h < b; )
      c = c.then(u[h++], u[h++]);
    return c;
  }
  getUri(e) {
    e = W(this.defaults, e);
    const n = Ut(e.baseURL, e.url, e.allowAbsoluteUrls);
    return Dt(n, e.params, e.paramsSerializer);
  }
};
a.forEach(["delete", "get", "head", "options"], function(e) {
  q.prototype[e] = function(n, s) {
    return this.request(W(s || {}, {
      method: e,
      url: n,
      data: (s || {}).data
    }));
  };
});
a.forEach(["post", "put", "patch"], function(e) {
  function n(s) {
    return function(r, o, l) {
      return this.request(W(l || {}, {
        method: e,
        headers: s ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: r,
        data: o
      }));
    };
  }
  q.prototype[e] = n(), q.prototype[e + "Form"] = n(!0);
});
let si = class Vt {
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
      s.reason || (s.reason = new G(r, o, l), n(s.reason));
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
      token: new Vt(function(i) {
        e = i;
      }),
      cancel: e
    };
  }
};
function ni(t) {
  return function(n) {
    return t.apply(null, n);
  };
}
function ii(t) {
  return a.isObject(t) && t.isAxiosError === !0;
}
const Me = {
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
Object.entries(Me).forEach(([t, e]) => {
  Me[e] = t;
});
function qt(t) {
  const e = new q(t), n = bt(q.prototype.request, e);
  return a.extend(n, q.prototype, e, { allOwnKeys: !0 }), a.extend(n, e, null, { allOwnKeys: !0 }), n.create = function(i) {
    return qt(W(t, i));
  }, n;
}
const P = qt(ce);
P.Axios = q;
P.CanceledError = G;
P.CancelToken = si;
P.isCancel = It;
P.VERSION = $t;
P.toFormData = _e;
P.AxiosError = w;
P.Cancel = P.CanceledError;
P.all = function(e) {
  return Promise.all(e);
};
P.spread = ni;
P.isAxiosError = ii;
P.mergeConfig = W;
P.AxiosHeaders = T;
P.formToJSON = (t) => kt(a.isHTMLForm(t) ? new FormData(t) : t);
P.getAdapter = zt.getAdapter;
P.HttpStatusCode = Me;
P.default = P;
const {
  Axios: Oi,
  AxiosError: Ri,
  CanceledError: Pi,
  isCancel: vi,
  CancelToken: Ni,
  VERSION: Ci,
  all: Ai,
  Cancel: Ti,
  isAxiosError: xi,
  spread: Di,
  toFormData: Li,
  AxiosHeaders: ki,
  HttpStatusCode: Ii,
  formToJSON: Fi,
  getAdapter: Ui,
  mergeConfig: ji
} = P, pt = /* @__PURE__ */ Ns("flickr", {
  state: () => ({
    photos: [],
    totalPages: 1,
    totalPictures: 0,
    loading: !1,
    photoCache: {}
    // Cache für Seiten
  }),
  actions: {
    async fetchPhotos(t, e = 1) {
      if (this.photoCache[e]) {
        this.photos = this.photoCache[e].photos, this.totalPages = this.photoCache[e].totalPages, this.totalPictures = this.photoCache[e].totalPictures;
        const i = 30 * 60 * 1e3, r = this.photoCache[e];
        if (console.debug(`images loaded from cache for page ${e} - cache valid for ${i / 1e3} seconds, ${Math.ceil((Date.now() - r.timestamp) / 1e3)} seconds old`), Date.now() - (r.timestamp || 0) < i)
          return;
        delete this.photoCache[e];
      }
      console.log(`Lade Fotos von API für Seite ${e}`), this.loading = !0;
      const n = await P.get(t);
      let s = [];
      n.data.photoset ? (s = n.data.photoset.photo, this.totalPages = n.data.photoset.pages, this.totalPictures = n.data.photoset.total) : n.data.photos && (s = n.data.photos.photo, this.totalPages = n.data.photos.pages, this.totalPictures = n.data.photos.total), this.photos = s, this.photoCache[e] = {
        photos: s,
        totalPages: this.totalPages,
        totalPictures: this.totalPictures,
        timestamp: Date.now()
        // Speichere den Zeitstempel
      }, this.loading = !1;
    }
  },
  persist: !0
  // <--- aktiviert Persistenz für diesen Store
}), Ht = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [s, i] of e)
    n[s] = i;
  return n;
}, ri = {
  name: "Image",
  props: {
    image: {
      type: Object,
      required: !0
    }
  },
  data() {
    return {
      imageEnlarged: !1,
      imageDescription: `<b>${this.image.title}</b><br>${this.image.description ? this.image.description._content || this.image.description : ""}`
    };
  },
  watch: {
    image: {
      handler(t) {
        this.imageDescription = `<b>${t.title}</b><br>${t.description ? t.description._content || t.description : ""}`;
      },
      immediate: !0,
      deep: !0
    }
  },
  methods: {
    enlargeImage() {
      this.imageEnlarged = !0;
    },
    shrinkImage() {
      this.imageEnlarged = !1;
    }
  }
}, oi = ["href", "data-pswp-width", "data-pswp-height"], ai = ["innerHTML"], li = ["src", "alt"];
function ci(t, e, n, s, i, r) {
  return $(), z("a", {
    class: "pswp-gallery__item",
    href: n.image.url_l || n.image.url_m,
    "data-pswp-width": n.image.width_l || n.image.width_m,
    "data-pswp-height": n.image.height_l || n.image.height_m,
    target: "_blank",
    rel: "noreferrer"
  }, [
    M("span", {
      class: "hidden-caption-content",
      innerHTML: i.imageDescription
    }, null, 8, ai),
    M("img", {
      src: n.image.url_m,
      alt: n.image.title,
      onMouseover: e[0] || (e[0] = (...o) => r.enlargeImage && r.enlargeImage(...o)),
      onMouseout: e[1] || (e[1] = (...o) => r.shrinkImage && r.shrinkImage(...o)),
      class: ns({
        "img-default-size": !0,
        "img-enlarged-size": i.imageEnlarged
      })
    }, null, 42, li)
  ], 8, oi);
}
const ui = /* @__PURE__ */ Ht(ri, [["render", ci]]), di = {
  name: "FlickrGallery",
  components: { Image: ui },
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
    pt(), this.initLightbox();
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
        pswpModule: () => import("./photoswipe.esm-mCjPm0dq.js")
      };
      if (!this.lightbox) {
        const e = new Ss(t);
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
      const t = pt();
      this.loading = !0;
      const e = this.endpoint + "?method=" + this.method + "&api_key=" + this.apiKey + "&tags=" + this.tags + "&user_id=" + this.userId + "&photoset_id=" + this.photosetId + "&format=json&page=" + this.page + "&per_page=" + this.perPage + "&extras=" + this.defaultExtras + "&nojsoncallback=1";
      await t.fetchPhotos(e, this.page), this.photos = t.photos, this.totalPages = t.totalPages, this.totalPictures = t.totalPictures, this.loading = t.loading;
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
}, hi = ["id"], fi = { key: 0 }, pi = { class: "flickr-images" }, mi = {
  key: 0,
  class: "flickr-navigation"
}, gi = { class: "prev" }, yi = { class: "current" }, Ei = { class: "next" };
function wi(t, e, n, s, i, r) {
  const o = is("Image");
  return $(), z("div", { id: t.galleryID }, [
    Je(rs, { name: "fade" }, {
      default: os(() => [
        t.loading ? ve("", !0) : ($(), z("div", {
          key: 0,
          style: as(t.flickrLoadingStyle),
          class: "flickr-container",
          ref: "flickr-container"
        }, [
          n.title ? ($(), z("h2", fi, Ne(n.title), 1)) : ve("", !0),
          M("div", pi, [
            ($(!0), z(ls, null, cs(t.photos, (l) => ($(), z("span", null, [
              Je(o, { image: l }, null, 8, ["image"])
            ]))), 256))
          ])
        ], 4))
      ]),
      _: 1
    }),
    n.useNavigation ? ($(), z("div", mi, [
      M("span", gi, [
        M("button", {
          onClick: e[0] || (e[0] = (...l) => r.previousPage && r.previousPage(...l)),
          onKeyup: e[1] || (e[1] = Ke((...l) => r.previousPage && r.previousPage(...l), ["right"]))
        }, " << ", 32)
      ]),
      M("span", yi, [
        M("button", {
          onClick: e[2] || (e[2] = () => {
          })
        }, " Page " + Ne(t.page) + "/" + Ne(t.totalPages), 1)
      ]),
      M("span", Ei, [
        M("button", {
          onClick: e[3] || (e[3] = (...l) => r.nextPage && r.nextPage(...l)),
          onKeyup: e[4] || (e[4] = Ke((...l) => r.nextPage && r.nextPage(...l), ["right"]))
        }, " >> ", 32)
      ])
    ])) : ve("", !0)
  ], 8, hi);
}
const Bi = /* @__PURE__ */ Ht(di, [["render", wi]]);
export {
  Bi as default
};
