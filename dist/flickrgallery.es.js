import { hasInjectionContext as _t, inject as Et, getCurrentInstance as Hi, ref as yi, reactive as Gi, markRaw as Oe, effectScope as Vi, isRef as Le, isReactive as Nt, toRef as lt, toRaw as Wi, nextTick as Jt, getCurrentScope as $i, onScopeDispose as Bi, watch as ji, computed as Ti, toRefs as Qt, openBlock as X, createElementBlock as q, createElementVNode as H, normalizeClass as Yi, resolveComponent as Xi, createVNode as ei, Transition as qi, withCtx as Ki, toDisplayString as Ve, createCommentVNode as ct, createTextVNode as Zi, Fragment as Ji, renderList as Qi, withKeys as ti, defineAsyncComponent as es } from "vue";
/*!
 * pinia v3.0.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
const ge = typeof window < "u";
let ne;
const Re = (s) => ne = s;
process.env.NODE_ENV;
const yt = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function re(s) {
  return s && typeof s == "object" && Object.prototype.toString.call(s) === "[object Object]" && typeof s.toJSON != "function";
}
var Pe;
(function(s) {
  s.direct = "direct", s.patchObject = "patch object", s.patchFunction = "patch function";
})(Pe || (Pe = {}));
function Si(s, e) {
  for (const i in e) {
    const t = e[i];
    if (!(i in s))
      continue;
    const r = s[i];
    re(r) && re(t) && !Le(t) && !Nt(t) ? s[i] = Si(r, t) : s[i] = t;
  }
  return s;
}
const Ai = () => {
};
function ii(s, e, i, t = Ai) {
  s.add(e);
  const r = () => {
    s.delete(e) && t();
  };
  return !i && $i() && Bi(r), r;
}
function me(s, ...e) {
  s.forEach((i) => {
    i(...e);
  });
}
const ts = (s) => s(), si = Symbol(), ut = Symbol();
function Tt(s, e) {
  s instanceof Map && e instanceof Map ? e.forEach((i, t) => s.set(t, i)) : s instanceof Set && e instanceof Set && e.forEach(s.add, s);
  for (const i in e) {
    if (!e.hasOwnProperty(i))
      continue;
    const t = e[i], r = s[i];
    re(r) && re(t) && s.hasOwnProperty(i) && !Le(t) && !Nt(t) ? s[i] = Tt(r, t) : s[i] = t;
  }
  return s;
}
const is = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function ss(s) {
  return !re(s) || !Object.prototype.hasOwnProperty.call(s, is);
}
const { assign: G } = Object;
function ni(s) {
  return !!(Le(s) && s.effect);
}
function ri(s, e, i, t) {
  const { state: r, actions: o, getters: c } = e, f = i.state.value[s];
  let E;
  function _() {
    !f && (process.env.NODE_ENV === "production" || !t) && (i.state.value[s] = r ? r() : {});
    const T = process.env.NODE_ENV !== "production" && t ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Qt(yi(r ? r() : {}).value)
    ) : Qt(i.state.value[s]);
    return G(T, o, Object.keys(c || {}).reduce((v, R) => (process.env.NODE_ENV !== "production" && R in T && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${R}" in store "${s}".`), v[R] = Oe(Ti(() => {
      Re(i);
      const N = i._s.get(s);
      return c[R].call(N, N);
    })), v), {}));
  }
  return E = St(s, _, e, i, t, !0), E;
}
function St(s, e, i = {}, t, r, o) {
  let c;
  const f = G({ actions: {} }, i);
  if (process.env.NODE_ENV !== "production" && !t._e.active)
    throw new Error("Pinia destroyed");
  const E = { deep: !0 };
  process.env.NODE_ENV !== "production" && (E.onTrigger = (h) => {
    _ ? N = h : _ == !1 && !p._hotUpdating && (Array.isArray(N) ? N.push(h) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let _, T, v = /* @__PURE__ */ new Set(), R = /* @__PURE__ */ new Set(), N;
  const x = t.state.value[s];
  !o && !x && (process.env.NODE_ENV === "production" || !r) && (t.state.value[s] = {});
  const _e = yi({});
  let Ce;
  function ke(h) {
    let l;
    _ = T = !1, process.env.NODE_ENV !== "production" && (N = []), typeof h == "function" ? (h(t.state.value[s]), l = {
      type: Pe.patchFunction,
      storeId: s,
      events: N
    }) : (Tt(t.state.value[s], h), l = {
      type: Pe.patchObject,
      payload: h,
      storeId: s,
      events: N
    });
    const g = Ce = Symbol();
    Jt().then(() => {
      Ce === g && (_ = !0);
    }), T = !0, me(v, l, t.state.value[s]);
  }
  const Ye = o ? function() {
    const { state: l } = i, g = l ? l() : {};
    this.$patch((P) => {
      G(P, g);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${s}" is built using the setup syntax and does not implement $reset().`);
    } : Ai
  );
  function oe() {
    c.stop(), v.clear(), R.clear(), t._s.delete(s);
  }
  const b = (h, l = "") => {
    if (si in h)
      return h[ut] = l, h;
    const g = function() {
      Re(t);
      const P = Array.from(arguments), Z = /* @__PURE__ */ new Set(), Ee = /* @__PURE__ */ new Set();
      function Xe(F) {
        Z.add(F);
      }
      function qe(F) {
        Ee.add(F);
      }
      me(R, {
        args: P,
        name: g[ut],
        store: p,
        after: Xe,
        onError: qe
      });
      let te;
      try {
        te = h.apply(this && this.$id === s ? this : p, P);
      } catch (F) {
        throw me(Ee, F), F;
      }
      return te instanceof Promise ? te.then((F) => (me(Z, F), F)).catch((F) => (me(Ee, F), Promise.reject(F))) : (me(Z, te), te);
    };
    return g[si] = !0, g[ut] = l, g;
  }, $ = /* @__PURE__ */ Oe({
    actions: {},
    getters: {},
    state: [],
    hotState: _e
  }), ae = {
    _p: t,
    // _s: scope,
    $id: s,
    $onAction: ii.bind(null, R),
    $patch: ke,
    $reset: Ye,
    $subscribe(h, l = {}) {
      const g = ii(v, h, l.detached, () => P()), P = c.run(() => ji(() => t.state.value[s], (Z) => {
        (l.flush === "sync" ? T : _) && h({
          storeId: s,
          type: Pe.direct,
          events: N
        }, Z);
      }, G({}, E, l)));
      return g;
    },
    $dispose: oe
  }, p = Gi(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ge ? G(
    {
      _hmrPayload: $,
      _customProperties: Oe(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    ae
    // must be added later
    // setupStore
  ) : ae);
  t._s.set(s, p);
  const B = (t._a && t._a.runWithContext || ts)(() => t._e.run(() => (c = Vi()).run(() => e({ action: b }))));
  for (const h in B) {
    const l = B[h];
    if (Le(l) && !ni(l) || Nt(l))
      process.env.NODE_ENV !== "production" && r ? _e.value[h] = lt(B, h) : o || (x && ss(l) && (Le(l) ? l.value = x[h] : Tt(l, x[h])), t.state.value[s][h] = l), process.env.NODE_ENV !== "production" && $.state.push(h);
    else if (typeof l == "function") {
      const g = process.env.NODE_ENV !== "production" && r ? l : b(l, h);
      B[h] = g, process.env.NODE_ENV !== "production" && ($.actions[h] = l), f.actions[h] = l;
    } else process.env.NODE_ENV !== "production" && ni(l) && ($.getters[h] = o ? (
      // @ts-expect-error
      i.getters[h]
    ) : l, ge && (B._getters || // @ts-expect-error: same
    (B._getters = Oe([]))).push(h));
  }
  if (G(p, B), G(Wi(p), B), Object.defineProperty(p, "$state", {
    get: () => process.env.NODE_ENV !== "production" && r ? _e.value : t.state.value[s],
    set: (h) => {
      if (process.env.NODE_ENV !== "production" && r)
        throw new Error("cannot set hotState");
      ke((l) => {
        G(l, h);
      });
    }
  }), process.env.NODE_ENV !== "production" && (p._hotUpdate = Oe((h) => {
    p._hotUpdating = !0, h._hmrPayload.state.forEach((l) => {
      if (l in p.$state) {
        const g = h.$state[l], P = p.$state[l];
        typeof g == "object" && re(g) && re(P) ? Si(g, P) : h.$state[l] = P;
      }
      p[l] = lt(h.$state, l);
    }), Object.keys(p.$state).forEach((l) => {
      l in h.$state || delete p[l];
    }), _ = !1, T = !1, t.state.value[s] = lt(h._hmrPayload, "hotState"), T = !0, Jt().then(() => {
      _ = !0;
    });
    for (const l in h._hmrPayload.actions) {
      const g = h[l];
      p[l] = //
      b(g, l);
    }
    for (const l in h._hmrPayload.getters) {
      const g = h._hmrPayload.getters[l], P = o ? (
        // special handling of options api
        Ti(() => (Re(t), g.call(p, p)))
      ) : g;
      p[l] = //
      P;
    }
    Object.keys(p._hmrPayload.getters).forEach((l) => {
      l in h._hmrPayload.getters || delete p[l];
    }), Object.keys(p._hmrPayload.actions).forEach((l) => {
      l in h._hmrPayload.actions || delete p[l];
    }), p._hmrPayload = h._hmrPayload, p._getters = h._getters, p._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ge) {
    const h = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((l) => {
      Object.defineProperty(p, l, G({ value: p[l] }, h));
    });
  }
  return t._p.forEach((h) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ge) {
      const l = c.run(() => h({
        store: p,
        app: t._a,
        pinia: t,
        options: f
      }));
      Object.keys(l || {}).forEach((g) => p._customProperties.add(g)), G(p, l);
    } else
      G(p, c.run(() => h({
        store: p,
        app: t._a,
        pinia: t,
        options: f
      })));
  }), process.env.NODE_ENV !== "production" && p.$state && typeof p.$state == "object" && typeof p.$state.constructor == "function" && !p.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${p.$id}".`), x && o && i.hydrate && i.hydrate(p.$state, x), _ = !0, T = !0, p;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ns(s, e, i) {
  let t;
  const r = typeof e == "function";
  t = r ? i : e;
  function o(c, f) {
    const E = _t();
    if (c = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && ne && ne._testing ? null : c) || (E ? Et(yt, null) : null), c && Re(c), process.env.NODE_ENV !== "production" && !ne)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    c = ne, c._s.has(s) || (r ? St(s, e, t, c) : ri(s, t, c), process.env.NODE_ENV !== "production" && (o._pinia = c));
    const _ = c._s.get(s);
    if (process.env.NODE_ENV !== "production" && f) {
      const T = "__hot:" + s, v = r ? St(T, e, t, c, !0) : ri(T, G({}, t), c, !0);
      f._hotUpdate(v), delete c.state.value[T], c._s.delete(T);
    }
    if (process.env.NODE_ENV !== "production" && ge) {
      const T = Hi();
      if (T && T.proxy && // avoid adding stores that are just built for hot module replacement
      !f) {
        const v = T.proxy, R = "_pStores" in v ? v._pStores : v._pStores = {};
        R[s] = _;
      }
    }
    return _;
  }
  return o.$id = s, o;
}
function rs(s) {
  Re(s);
}
function os(s, e) {
  if (s == null) return;
  let i = s;
  for (let t = 0; t < e.length; t++) {
    if (i === void 0 || i[e[t]] === void 0) return;
    if (i === null || i[e[t]] === null) return null;
    i = i[e[t]];
  }
  return i;
}
function Ot(s, e, i) {
  if (i.length === 0) return e;
  const t = i[0];
  return i.length > 1 && (e = Ot(typeof s != "object" || s === null || !Object.prototype.hasOwnProperty.call(s, t) ? Number.isInteger(Number(i[1])) ? [] : {} : s[t], e, Array.prototype.slice.call(i, 1))), Number.isInteger(Number(t)) && Array.isArray(s) ? s.slice()[t] : Object.assign({}, s, { [t]: e });
}
function vi(s, e) {
  if (s == null || e.length === 0) return s;
  if (e.length === 1) {
    if (s == null) return s;
    if (Number.isInteger(e[0]) && Array.isArray(s)) return Array.prototype.slice.call(s, 0).splice(e[0], 1);
    const i = {};
    for (const t in s) i[t] = s[t];
    return delete i[e[0]], i;
  }
  if (s[e[0]] == null) {
    if (Number.isInteger(e[0]) && Array.isArray(s)) return Array.prototype.concat.call([], s);
    const i = {};
    for (const t in s) i[t] = s[t];
    return i;
  }
  return Ot(s, vi(s[e[0]], Array.prototype.slice.call(e, 1)), [e[0]]);
}
function bi(s, e) {
  return e.map((i) => i.split(".")).map((i) => [i, os(s, i)]).filter((i) => i[1] !== void 0).reduce((i, t) => Ot(i, t[1], t[0]), {});
}
function wi(s, e) {
  return e.map((i) => i.split(".")).reduce((i, t) => vi(i, t), s);
}
function oi(s, { storage: e, serializer: i, key: t, debug: r, pick: o, omit: c, beforeHydrate: f, afterHydrate: E }, _, T = !0) {
  try {
    T && (f == null || f(_));
    const v = e.getItem(t);
    if (v) {
      const R = i.deserialize(v), N = o ? bi(R, o) : R, x = c ? wi(N, c) : N;
      s.$patch(x);
    }
    T && (E == null || E(_));
  } catch (v) {
    r && console.error("[pinia-plugin-persistedstate]", v);
  }
}
function ai(s, { storage: e, serializer: i, key: t, debug: r, pick: o, omit: c }) {
  try {
    const f = o ? bi(s, o) : s, E = c ? wi(f, c) : f, _ = i.serialize(E);
    e.setItem(t, _);
  } catch (f) {
    r && console.error("[pinia-plugin-persistedstate]", f);
  }
}
function as(s, e) {
  return typeof s == "function" ? s(e) : typeof s == "string" ? s : e;
}
function ls(s, e, i) {
  const { pinia: t, store: r, options: { persist: o = i } } = s;
  if (!o) return;
  // v8 ignore if -- @preserve
  if (!(r.$id in t.state.value)) {
    const f = t._s.get(r.$id.replace("__hot:", ""));
    f && Promise.resolve().then(() => f.$persist());
    return;
  }
  const c = (Array.isArray(o) ? o : o === !0 ? [{}] : [o]).map(e);
  r.$hydrate = ({ runHooks: f = !0 } = {}) => {
    c.forEach((E) => {
      oi(r, E, s, f);
    });
  }, r.$persist = () => {
    c.forEach((f) => {
      ai(r.$state, f);
    });
  }, c.forEach((f) => {
    oi(r, f, s), r.$subscribe((E, _) => ai(_, f), { detached: !0 });
  });
}
function cs(s = {}) {
  return function(e) {
    ls(e, (i) => {
      const t = as(i.key, e.store.$id);
      return {
        key: (s.key ? s.key : (r) => r)(t),
        debug: i.debug ?? s.debug ?? !1,
        serializer: i.serializer ?? s.serializer ?? {
          serialize: (r) => JSON.stringify(r),
          deserialize: (r) => JSON.parse(r)
        },
        storage: i.storage ?? s.storage ?? window.localStorage,
        beforeHydrate: i.beforeHydrate ?? s.beforeHydrate,
        afterHydrate: i.afterHydrate ?? s.afterHydrate,
        pick: i.pick,
        omit: i.omit
      };
    }, s.auto ?? !1);
  };
}
var li = cs();
/*!
  * PhotoSwipe Lightbox 5.4.4 - https://photoswipe.com
  * (c) 2024 Dmytro Semenov
  */
function Ie(s, e, i) {
  const t = document.createElement(e);
  return s && (t.className = s), i && i.appendChild(t), t;
}
function us(s, e, i) {
  let t = `translate3d(${s}px,0px,0)`;
  return i !== void 0 && (t += ` scale3d(${i},${i},1)`), t;
}
function At(s, e, i) {
  s.style.width = typeof e == "number" ? `${e}px` : e, s.style.height = typeof i == "number" ? `${i}px` : i;
}
const U = {
  IDLE: "idle",
  LOADING: "loading",
  LOADED: "loaded",
  ERROR: "error"
};
function hs(s) {
  return "button" in s && s.button === 1 || s.ctrlKey || s.metaKey || s.altKey || s.shiftKey;
}
function De(s, e, i = document) {
  let t = [];
  if (s instanceof Element)
    t = [s];
  else if (s instanceof NodeList || Array.isArray(s))
    t = Array.from(s);
  else {
    const r = typeof s == "string" ? s : e;
    r && (t = Array.from(i.querySelectorAll(r)));
  }
  return t;
}
function ds(s) {
  return typeof s == "function" && s.prototype && s.prototype.goTo;
}
function ci() {
  return !!(navigator.vendor && navigator.vendor.match(/apple/i));
}
class fs {
  /**
   * @param {T} type
   * @param {PhotoSwipeEventsMap[T]} [details]
   */
  constructor(e, i) {
    this.type = e, this.defaultPrevented = !1, i && Object.assign(this, i);
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
  addFilter(e, i, t = 100) {
    var r, o, c;
    this._filters[e] || (this._filters[e] = []), (r = this._filters[e]) === null || r === void 0 || r.push({
      fn: i,
      priority: t
    }), (o = this._filters[e]) === null || o === void 0 || o.sort((f, E) => f.priority - E.priority), (c = this.pswp) === null || c === void 0 || c.addFilter(e, i, t);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   */
  removeFilter(e, i) {
    this._filters[e] && (this._filters[e] = this._filters[e].filter((t) => t.fn !== i)), this.pswp && this.pswp.removeFilter(e, i);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {Parameters<PhotoSwipeFiltersMap[T]>} args
   * @returns {Parameters<PhotoSwipeFiltersMap[T]>[0]}
   */
  applyFilters(e, ...i) {
    var t;
    return (t = this._filters[e]) === null || t === void 0 || t.forEach((r) => {
      i[0] = r.fn.apply(this, i);
    }), i[0];
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  on(e, i) {
    var t, r;
    this._listeners[e] || (this._listeners[e] = []), (t = this._listeners[e]) === null || t === void 0 || t.push(i), (r = this.pswp) === null || r === void 0 || r.on(e, i);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  off(e, i) {
    var t;
    this._listeners[e] && (this._listeners[e] = this._listeners[e].filter((r) => i !== r)), (t = this.pswp) === null || t === void 0 || t.off(e, i);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {PhotoSwipeEventsMap[T]} [details]
   * @returns {AugmentedEvent<T>}
   */
  dispatch(e, i) {
    var t;
    if (this.pswp)
      return this.pswp.dispatch(e, i);
    const r = (
      /** @type {AugmentedEvent<T>} */
      new fs(e, i)
    );
    return (t = this._listeners[e]) === null || t === void 0 || t.forEach((o) => {
      o.call(this, r);
    }), r;
  }
}
class ms {
  /**
   * @param {string | false} imageSrc
   * @param {HTMLElement} container
   */
  constructor(e, i) {
    if (this.element = Ie("pswp__img pswp__img--placeholder", e ? "img" : "div", i), e) {
      const t = (
        /** @type {HTMLImageElement} */
        this.element
      );
      t.decoding = "async", t.alt = "", t.src = e, t.setAttribute("role", "presentation");
    }
    this.element.setAttribute("aria-hidden", "true");
  }
  /**
   * @param {number} width
   * @param {number} height
   */
  setDisplayedSize(e, i) {
    this.element && (this.element.tagName === "IMG" ? (At(this.element, 250, "auto"), this.element.style.transformOrigin = "0 0", this.element.style.transform = us(0, 0, e / 250)) : At(this.element, e, i));
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
  constructor(e, i, t) {
    this.instance = i, this.data = e, this.index = t, this.element = void 0, this.placeholder = void 0, this.slide = void 0, this.displayedImageWidth = 0, this.displayedImageHeight = 0, this.width = Number(this.data.w) || Number(this.data.width) || 0, this.height = Number(this.data.h) || Number(this.data.height) || 0, this.isAttached = !1, this.hasSlide = !1, this.isDecoding = !1, this.state = U.IDLE, this.data.type ? this.type = this.data.type : this.data.src ? this.type = "image" : this.type = "html", this.instance.dispatch("contentInit", {
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
  load(e, i) {
    if (this.slide && this.usePlaceholder())
      if (this.placeholder) {
        const t = this.placeholder.element;
        t && !t.parentElement && this.slide.container.prepend(t);
      } else {
        const t = this.instance.applyFilters(
          "placeholderSrc",
          // use  image-based placeholder only for the first slide,
          // as rendering (even small stretched thumbnail) is an expensive operation
          this.data.msrc && this.slide.isFirstSlide ? this.data.msrc : !1,
          this
        );
        this.placeholder = new ms(t, this.slide.container);
      }
    this.element && !i || this.instance.dispatch("contentLoad", {
      content: this,
      isLazy: e
    }).defaultPrevented || (this.isImageContent() ? (this.element = Ie("pswp__img", "img"), this.displayedImageWidth && this.loadImage(e)) : (this.element = Ie("pswp__content", "div"), this.element.innerHTML = this.data.html || ""), i && this.slide && this.slide.updateContentSize(!0));
  }
  /**
   * Preload image
   *
   * @param {boolean} isLazy
   */
  loadImage(e) {
    var i, t;
    if (!this.isImageContent() || !this.element || this.instance.dispatch("contentLoadImage", {
      content: this,
      isLazy: e
    }).defaultPrevented)
      return;
    const r = (
      /** @type HTMLImageElement */
      this.element
    );
    this.updateSrcsetSizes(), this.data.srcset && (r.srcset = this.data.srcset), r.src = (i = this.data.src) !== null && i !== void 0 ? i : "", r.alt = (t = this.data.alt) !== null && t !== void 0 ? t : "", this.state = U.LOADING, r.complete ? this.onLoaded() : (r.onload = () => {
      this.onLoaded();
    }, r.onerror = () => {
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
    this.state = U.LOADED, this.slide && this.element && (this.instance.dispatch("loadComplete", {
      slide: this.slide,
      content: this
    }), this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode && (this.append(), this.slide.updateContentSize(!0)), (this.state === U.LOADED || this.state === U.ERROR) && this.removePlaceholder());
  }
  /**
   * Content load error handler
   */
  onError() {
    this.state = U.ERROR, this.slide && (this.displayError(), this.instance.dispatch("loadComplete", {
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
    return this.instance.applyFilters("isContentLoading", this.state === U.LOADING, this);
  }
  /**
   * @returns {Boolean} If the content is in error state
   */
  isError() {
    return this.state === U.ERROR;
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
  setDisplayedSize(e, i) {
    if (this.element && (this.placeholder && this.placeholder.setDisplayedSize(e, i), !this.instance.dispatch("contentResize", {
      content: this,
      width: e,
      height: i
    }).defaultPrevented && (At(this.element, e, i), this.isImageContent() && !this.isError()))) {
      const t = !this.displayedImageWidth && e;
      this.displayedImageWidth = e, this.displayedImageHeight = i, t ? this.loadImage(!1) : this.updateSrcsetSizes(), this.slide && this.instance.dispatch("imageSizeChange", {
        slide: this.slide,
        width: e,
        height: i,
        content: this
      });
    }
  }
  /**
   * @returns {boolean} If the content can be zoomed
   */
  isZoomable() {
    return this.instance.applyFilters("isContentZoomable", this.isImageContent() && this.state !== U.ERROR, this);
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
    ), i = this.instance.applyFilters("srcsetSizesWidth", this.displayedImageWidth, this);
    (!e.dataset.largestUsedSize || i > parseInt(e.dataset.largestUsedSize, 10)) && (e.sizes = i + "px", e.dataset.largestUsedSize = String(i));
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
      var e, i;
      let t = Ie("pswp__error-msg", "div");
      t.innerText = (e = (i = this.instance.options) === null || i === void 0 ? void 0 : i.errorMsg) !== null && e !== void 0 ? e : "", t = /** @type {HTMLDivElement} */
      this.instance.applyFilters("contentErrorElement", t, this), this.element = Ie("pswp__content pswp__error-msg-container", "div"), this.element.appendChild(t), this.slide.container.innerText = "", this.slide.container.appendChild(this.element), this.slide.updateContentSize(!0), this.removePlaceholder();
    }
  }
  /**
   * Append the content
   */
  append() {
    if (this.isAttached || !this.element)
      return;
    if (this.isAttached = !0, this.state === U.ERROR) {
      this.displayError();
      return;
    }
    if (this.instance.dispatch("contentAppend", {
      content: this
    }).defaultPrevented)
      return;
    const e = "decode" in this.element;
    this.isImageContent() ? e && this.slide && (!this.slide.isActive || ci()) ? (this.isDecoding = !0, this.element.decode().catch(() => {
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
    }).defaultPrevented || !this.slide || (this.isImageContent() && this.isDecoding && !ci() ? this.appendImage() : this.isError() && this.load(!1, !0), this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "false"));
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
    }).defaultPrevented || (this.slide && this.element && !this.element.parentNode && this.slide.container.appendChild(this.element), (this.state === U.LOADED || this.state === U.ERROR) && this.removePlaceholder()));
  }
}
function _s(s, e) {
  if (s.getViewportSizeFn) {
    const i = s.getViewportSizeFn(s, e);
    if (i)
      return i;
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
function We(s, e, i, t, r) {
  let o = 0;
  if (e.paddingFn)
    o = e.paddingFn(i, t, r)[s];
  else if (e.padding)
    o = e.padding[s];
  else {
    const c = "padding" + s[0].toUpperCase() + s.slice(1);
    e[c] && (o = e[c]);
  }
  return Number(o) || 0;
}
function Es(s, e, i, t) {
  return {
    x: e.x - We("left", s, e, i, t) - We("right", s, e, i, t),
    y: e.y - We("top", s, e, i, t) - We("bottom", s, e, i, t)
  };
}
const ui = 4e3;
class ys {
  /**
   * @param {PhotoSwipeOptions} options PhotoSwipe options
   * @param {SlideData} itemData Slide data
   * @param {number} index Slide index
   * @param {PhotoSwipe} [pswp] PhotoSwipe instance, can be undefined if not initialized yet
   */
  constructor(e, i, t, r) {
    this.pswp = r, this.options = e, this.itemData = i, this.index = t, this.panAreaSize = null, this.elementSize = null, this.fit = 1, this.fill = 1, this.vFill = 1, this.initial = 1, this.secondary = 1, this.max = 1, this.min = 1;
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
  update(e, i, t) {
    const r = {
      x: e,
      y: i
    };
    this.elementSize = r, this.panAreaSize = t;
    const o = t.x / r.x, c = t.y / r.y;
    this.fit = Math.min(1, o < c ? o : c), this.fill = Math.min(1, o > c ? o : c), this.vFill = Math.min(1, c), this.initial = this._getInitial(), this.secondary = this._getSecondary(), this.max = Math.max(this.initial, this.secondary, this._getMax()), this.min = Math.min(this.fit, this.initial, this.secondary), this.pswp && this.pswp.dispatch("zoomLevelsUpdate", {
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
    const i = (
      /** @type {'initialZoomLevel' | 'secondaryZoomLevel' | 'maxZoomLevel'} */
      e + "ZoomLevel"
    ), t = this.options[i];
    if (t)
      return typeof t == "function" ? t(this) : t === "fill" ? this.fill : t === "fit" ? this.fit : Number(t);
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
    return e || (e = Math.min(1, this.fit * 3), this.elementSize && e * this.elementSize.x > ui && (e = ui / this.elementSize.x), e);
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
function Ni(s, e, i) {
  const t = e.createContentFromData(s, i);
  let r;
  const {
    options: o
  } = e;
  if (o) {
    r = new ys(o, s, -1);
    let c;
    e.pswp ? c = e.pswp.viewportSize : c = _s(o, e);
    const f = Es(o, c, s, i);
    r.update(t.width, t.height, f);
  }
  return t.lazyLoad(), r && t.setDisplayedSize(Math.ceil(t.width * r.initial), Math.ceil(t.height * r.initial)), t;
}
function Ts(s, e) {
  const i = e.getItemData(s);
  if (!e.dispatch("lazyLoadSlide", {
    index: s,
    itemData: i
  }).defaultPrevented)
    return Ni(i, e, s);
}
class Ss extends ps {
  /**
   * Get total number of slides
   *
   * @returns {number}
   */
  getNumItems() {
    var e;
    let i = 0;
    const t = (e = this.options) === null || e === void 0 ? void 0 : e.dataSource;
    t && "length" in t ? i = t.length : t && "gallery" in t && (t.items || (t.items = this._getGalleryDOMElements(t.gallery)), t.items && (i = t.items.length));
    const r = this.dispatch("numItems", {
      dataSource: t,
      numItems: i
    });
    return this.applyFilters("numItems", r.numItems, t);
  }
  /**
   * @param {SlideData} slideData
   * @param {number} index
   * @returns {Content}
   */
  createContentFromData(e, i) {
    return new gs(e, this, i);
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
    var i;
    const t = (i = this.options) === null || i === void 0 ? void 0 : i.dataSource;
    let r = {};
    Array.isArray(t) ? r = t[e] : t && "gallery" in t && (t.items || (t.items = this._getGalleryDOMElements(t.gallery)), r = t.items[e]);
    let o = r;
    o instanceof Element && (o = this._domElementToItemData(o));
    const c = this.dispatch("itemData", {
      itemData: o || {},
      index: e
    });
    return this.applyFilters("itemData", c.itemData, e);
  }
  /**
   * Get array of gallery DOM elements,
   * based on childSelector and gallery element.
   *
   * @param {HTMLElement} galleryElement
   * @returns {HTMLElement[]}
   */
  _getGalleryDOMElements(e) {
    var i, t;
    return (i = this.options) !== null && i !== void 0 && i.children || (t = this.options) !== null && t !== void 0 && t.childSelector ? De(this.options.children, this.options.childSelector, e) || [] : [e];
  }
  /**
   * Converts DOM element to item data object.
   *
   * @param {HTMLElement} element DOM element
   * @returns {SlideData}
   */
  _domElementToItemData(e) {
    const i = {
      element: e
    }, t = (
      /** @type {HTMLAnchorElement} */
      e.tagName === "A" ? e : e.querySelector("a")
    );
    if (t) {
      i.src = t.dataset.pswpSrc || t.href, t.dataset.pswpSrcset && (i.srcset = t.dataset.pswpSrcset), i.width = t.dataset.pswpWidth ? parseInt(t.dataset.pswpWidth, 10) : 0, i.height = t.dataset.pswpHeight ? parseInt(t.dataset.pswpHeight, 10) : 0, i.w = i.width, i.h = i.height, t.dataset.pswpType && (i.type = t.dataset.pswpType);
      const o = e.querySelector("img");
      if (o) {
        var r;
        i.msrc = o.currentSrc || o.src, i.alt = (r = o.getAttribute("alt")) !== null && r !== void 0 ? r : "";
      }
      (t.dataset.pswpCropped || t.dataset.cropped) && (i.thumbCropped = !0);
    }
    return this.applyFilters("domItemData", i, e, t);
  }
  /**
   * Lazy-load by slide data
   *
   * @param {SlideData} itemData Data about the slide
   * @param {number} index
   * @returns {Content} Image that is being decoded or false.
   */
  lazyLoadData(e, i) {
    return Ni(e, this, i);
  }
}
class As extends Ss {
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
    De(this.options.gallery, this.options.gallerySelector).forEach((e) => {
      e.addEventListener("click", this.onThumbnailsClick, !1);
    });
  }
  /**
   * @param {MouseEvent} e
   */
  onThumbnailsClick(e) {
    if (hs(e) || window.pswp)
      return;
    let i = {
      x: e.clientX,
      y: e.clientY
    };
    !i.x && !i.y && (i = null);
    let t = this.getClickedIndex(e);
    t = this.applyFilters("clickedIndex", t, e, this);
    const r = {
      gallery: (
        /** @type {HTMLElement} */
        e.currentTarget
      )
    };
    t >= 0 && (e.preventDefault(), this.loadAndOpen(t, r, i));
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
    const i = (
      /** @type {HTMLElement} */
      e.target
    ), r = De(
      this.options.children,
      this.options.childSelector,
      /** @type {HTMLElement} */
      e.currentTarget
    ).findIndex((o) => o === i || o.contains(i));
    return r !== -1 ? r : this.options.children || this.options.childSelector ? -1 : 0;
  }
  /**
   * Load and open PhotoSwipe
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   * @param {Point | null} [initialPoint]
   * @returns {boolean}
   */
  loadAndOpen(e, i, t) {
    if (window.pswp || !this.options)
      return !1;
    if (!i && this.options.gallery && this.options.children) {
      const r = De(this.options.gallery);
      r[0] && (i = {
        gallery: r[0]
      });
    }
    return this.options.index = e, this.options.initialPointerPos = t, this.shouldOpen = !0, this.preload(e, i), !0;
  }
  /**
   * Load the main module and the slide content by index
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   */
  preload(e, i) {
    const {
      options: t
    } = this;
    i && (t.dataSource = i);
    const r = [], o = typeof t.pswpModule;
    if (ds(t.pswpModule))
      r.push(Promise.resolve(
        /** @type {Type<PhotoSwipe>} */
        t.pswpModule
      ));
    else {
      if (o === "string")
        throw new Error("pswpModule as string is no longer supported");
      if (o === "function")
        r.push(
          /** @type {() => Promise<Type<PhotoSwipe>>} */
          t.pswpModule()
        );
      else
        throw new Error("pswpModule is not valid");
    }
    typeof t.openPromise == "function" && r.push(t.openPromise()), t.preloadFirstSlide !== !1 && e >= 0 && (this._preloadedContent = Ts(e, this));
    const c = ++this._uid;
    Promise.all(r).then((f) => {
      if (this.shouldOpen) {
        const E = f[0];
        this._openPhotoswipe(E, c);
      }
    });
  }
  /**
   * @private
   * @param {Type<PhotoSwipe> | { default: Type<PhotoSwipe> }} module
   * @param {number} uid
   */
  _openPhotoswipe(e, i) {
    if (i !== this._uid && this.shouldOpen || (this.shouldOpen = !1, window.pswp))
      return;
    const t = typeof e == "object" ? new e.default(this.options) : new e(this.options);
    this.pswp = t, window.pswp = t, Object.keys(this._listeners).forEach((r) => {
      var o;
      (o = this._listeners[r]) === null || o === void 0 || o.forEach((c) => {
        t.on(
          r,
          /** @type {EventCallback<typeof name>} */
          c
        );
      });
    }), Object.keys(this._filters).forEach((r) => {
      var o;
      (o = this._filters[r]) === null || o === void 0 || o.forEach((c) => {
        t.addFilter(r, c.fn, c.priority);
      });
    }), this._preloadedContent && (t.contentLoader.addToCache(this._preloadedContent), this._preloadedContent = void 0), t.on("destroy", () => {
      this.pswp = void 0, delete window.pswp;
    }), t.init();
  }
  /**
   * Unbinds all events, closes PhotoSwipe if it's open.
   */
  destroy() {
    var e;
    (e = this.pswp) === null || e === void 0 || e.destroy(), this.shouldOpen = !1, this._listeners = {}, De(this.options.gallery, this.options.gallerySelector).forEach((i) => {
      i.removeEventListener("click", this.onThumbnailsClick, !1);
    });
  }
}
function vs(s = "default") {
  const e = `flickr-${s}`;
  return (/* @__PURE__ */ ns(e, {
    state: () => ({
      photos: [],
      totalPages: 0,
      totalPictures: 0,
      loading: !1,
      error: null
    }),
    actions: {
      async fetchPhotos(t) {
        this.loading = !0, this.error = null;
        try {
          const r = await fetch(t);
          if (!r.ok)
            throw new Error(`HTTP ${r.status}`);
          const o = await r.json();
          if (o != null && o.stat && o.stat !== "ok")
            throw new Error(o != null && o.message ? `Flickr: ${o.message}` : "Flickr API Error");
          o != null && o.photos ? (this.photos = Array.isArray(o.photos.photo) ? o.photos.photo : [], this.totalPages = Number(o.photos.pages || 0), this.totalPictures = Number(o.photos.total || 0)) : o != null && o.photoset ? (this.photos = Array.isArray(o.photoset.photo) ? o.photoset.photo : [], this.totalPages = Number(o.photoset.pages || 0), this.totalPictures = Number(o.photoset.total || 0)) : (this.photos = [], this.totalPages = 0, this.totalPictures = 0, console.error("Unerwartete Flickr API Antwortstruktur", o));
        } catch (r) {
          console.error("Fehler beim Laden der Flickr-Fotos im Store:", r), this.error = (r == null ? void 0 : r.message) || String(r), this.photos = [], this.totalPages = 0, this.totalPictures = 0;
        } finally {
          this.loading = !1;
        }
      }
    }
  }))();
}
/*! @license DOMPurify 3.3.1 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.1/LICENSE */
const {
  entries: Oi,
  setPrototypeOf: hi,
  isFrozen: bs,
  getPrototypeOf: ws,
  getOwnPropertyDescriptor: Ns
} = Object;
let {
  freeze: k,
  seal: V,
  create: vt
} = Object, {
  apply: bt,
  construct: wt
} = typeof Reflect < "u" && Reflect;
k || (k = function(e) {
  return e;
});
V || (V = function(e) {
  return e;
});
bt || (bt = function(e, i) {
  for (var t = arguments.length, r = new Array(t > 2 ? t - 2 : 0), o = 2; o < t; o++)
    r[o - 2] = arguments[o];
  return e.apply(i, r);
});
wt || (wt = function(e) {
  for (var i = arguments.length, t = new Array(i > 1 ? i - 1 : 0), r = 1; r < i; r++)
    t[r - 1] = arguments[r];
  return new e(...t);
});
const $e = M(Array.prototype.forEach), Os = M(Array.prototype.lastIndexOf), di = M(Array.prototype.pop), Ae = M(Array.prototype.push), Is = M(Array.prototype.splice), je = M(String.prototype.toLowerCase), ht = M(String.prototype.toString), dt = M(String.prototype.match), ve = M(String.prototype.replace), Ds = M(String.prototype.indexOf), Ps = M(String.prototype.trim), W = M(Object.prototype.hasOwnProperty), C = M(RegExp.prototype.test), be = Ls(TypeError);
function M(s) {
  return function(e) {
    e instanceof RegExp && (e.lastIndex = 0);
    for (var i = arguments.length, t = new Array(i > 1 ? i - 1 : 0), r = 1; r < i; r++)
      t[r - 1] = arguments[r];
    return bt(s, e, t);
  };
}
function Ls(s) {
  return function() {
    for (var e = arguments.length, i = new Array(e), t = 0; t < e; t++)
      i[t] = arguments[t];
    return wt(s, i);
  };
}
function m(s, e) {
  let i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : je;
  hi && hi(s, null);
  let t = e.length;
  for (; t--; ) {
    let r = e[t];
    if (typeof r == "string") {
      const o = i(r);
      o !== r && (bs(e) || (e[t] = o), r = o);
    }
    s[r] = !0;
  }
  return s;
}
function Rs(s) {
  for (let e = 0; e < s.length; e++)
    W(s, e) || (s[e] = null);
  return s;
}
function K(s) {
  const e = vt(null);
  for (const [i, t] of Oi(s))
    W(s, i) && (Array.isArray(t) ? e[i] = Rs(t) : t && typeof t == "object" && t.constructor === Object ? e[i] = K(t) : e[i] = t);
  return e;
}
function we(s, e) {
  for (; s !== null; ) {
    const t = Ns(s, e);
    if (t) {
      if (t.get)
        return M(t.get);
      if (typeof t.value == "function")
        return M(t.value);
    }
    s = ws(s);
  }
  function i() {
    return null;
  }
  return i;
}
const fi = k(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), ft = k(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), pt = k(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Cs = k(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), mt = k(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), ks = k(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), pi = k(["#text"]), mi = k(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), gt = k(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), gi = k(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), Be = k(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Ms = V(/\{\{[\w\W]*|[\w\W]*\}\}/gm), xs = V(/<%[\w\W]*|[\w\W]*%>/gm), Fs = V(/\$\{[\w\W]*/gm), zs = V(/^data-[\-\w.\u00B7-\uFFFF]+$/), Us = V(/^aria-[\-\w]+$/), Ii = V(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Hs = V(/^(?:\w+script|data):/i), Gs = V(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Di = V(/^html$/i), Vs = V(/^[a-z][.\w]*(-[.\w]+)+$/i);
var _i = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Us,
  ATTR_WHITESPACE: Gs,
  CUSTOM_ELEMENT: Vs,
  DATA_ATTR: zs,
  DOCTYPE_NAME: Di,
  ERB_EXPR: xs,
  IS_ALLOWED_URI: Ii,
  IS_SCRIPT_OR_DATA: Hs,
  MUSTACHE_EXPR: Ms,
  TMPLIT_EXPR: Fs
});
const Ne = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
}, Ws = function() {
  return typeof window > "u" ? null : window;
}, $s = function(e, i) {
  if (typeof e != "object" || typeof e.createPolicy != "function")
    return null;
  let t = null;
  const r = "data-tt-policy-suffix";
  i && i.hasAttribute(r) && (t = i.getAttribute(r));
  const o = "dompurify" + (t ? "#" + t : "");
  try {
    return e.createPolicy(o, {
      createHTML(c) {
        return c;
      },
      createScriptURL(c) {
        return c;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + o + " could not be created."), null;
  }
}, Ei = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function Pi() {
  let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Ws();
  const e = (d) => Pi(d);
  if (e.version = "3.3.1", e.removed = [], !s || !s.document || s.document.nodeType !== Ne.document || !s.Element)
    return e.isSupported = !1, e;
  let {
    document: i
  } = s;
  const t = i, r = t.currentScript, {
    DocumentFragment: o,
    HTMLTemplateElement: c,
    Node: f,
    Element: E,
    NodeFilter: _,
    NamedNodeMap: T = s.NamedNodeMap || s.MozNamedAttrMap,
    HTMLFormElement: v,
    DOMParser: R,
    trustedTypes: N
  } = s, x = E.prototype, _e = we(x, "cloneNode"), Ce = we(x, "remove"), ke = we(x, "nextSibling"), Ye = we(x, "childNodes"), oe = we(x, "parentNode");
  if (typeof c == "function") {
    const d = i.createElement("template");
    d.content && d.content.ownerDocument && (i = d.content.ownerDocument);
  }
  let b, $ = "";
  const {
    implementation: ae,
    createNodeIterator: p,
    createDocumentFragment: It,
    getElementsByTagName: B
  } = i, {
    importNode: h
  } = t;
  let l = Ei();
  e.isSupported = typeof Oi == "function" && typeof oe == "function" && ae && ae.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: g,
    ERB_EXPR: P,
    TMPLIT_EXPR: Z,
    DATA_ATTR: Ee,
    ARIA_ATTR: Xe,
    IS_SCRIPT_OR_DATA: qe,
    ATTR_WHITESPACE: te,
    CUSTOM_ELEMENT: F
  } = _i;
  let {
    IS_ALLOWED_URI: Dt
  } = _i, O = null;
  const Pt = m({}, [...fi, ...ft, ...pt, ...mt, ...pi]);
  let I = null;
  const Lt = m({}, [...mi, ...gt, ...gi, ...Be]);
  let S = Object.seal(vt(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), ye = null, Ke = null;
  const le = Object.seal(vt(null, {
    tagCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    }
  }));
  let Rt = !0, Ze = !0, Ct = !1, kt = !0, ce = !1, Me = !0, ie = !1, Je = !1, Qe = !1, ue = !1, xe = !1, Fe = !1, Mt = !0, xt = !1;
  const Ri = "user-content-";
  let et = !0, Te = !1, he = {}, j = null;
  const tt = m({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let Ft = null;
  const zt = m({}, ["audio", "video", "img", "source", "image", "track"]);
  let it = null;
  const Ut = m({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), ze = "http://www.w3.org/1998/Math/MathML", Ue = "http://www.w3.org/2000/svg", J = "http://www.w3.org/1999/xhtml";
  let de = J, st = !1, nt = null;
  const Ci = m({}, [ze, Ue, J], ht);
  let He = m({}, ["mi", "mo", "mn", "ms", "mtext"]), Ge = m({}, ["annotation-xml"]);
  const ki = m({}, ["title", "style", "font", "a", "script"]);
  let Se = null;
  const Mi = ["application/xhtml+xml", "text/html"], xi = "text/html";
  let w = null, fe = null;
  const Fi = i.createElement("form"), Ht = function(n) {
    return n instanceof RegExp || n instanceof Function;
  }, rt = function() {
    let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(fe && fe === n)) {
      if ((!n || typeof n != "object") && (n = {}), n = K(n), Se = // eslint-disable-next-line unicorn/prefer-includes
      Mi.indexOf(n.PARSER_MEDIA_TYPE) === -1 ? xi : n.PARSER_MEDIA_TYPE, w = Se === "application/xhtml+xml" ? ht : je, O = W(n, "ALLOWED_TAGS") ? m({}, n.ALLOWED_TAGS, w) : Pt, I = W(n, "ALLOWED_ATTR") ? m({}, n.ALLOWED_ATTR, w) : Lt, nt = W(n, "ALLOWED_NAMESPACES") ? m({}, n.ALLOWED_NAMESPACES, ht) : Ci, it = W(n, "ADD_URI_SAFE_ATTR") ? m(K(Ut), n.ADD_URI_SAFE_ATTR, w) : Ut, Ft = W(n, "ADD_DATA_URI_TAGS") ? m(K(zt), n.ADD_DATA_URI_TAGS, w) : zt, j = W(n, "FORBID_CONTENTS") ? m({}, n.FORBID_CONTENTS, w) : tt, ye = W(n, "FORBID_TAGS") ? m({}, n.FORBID_TAGS, w) : K({}), Ke = W(n, "FORBID_ATTR") ? m({}, n.FORBID_ATTR, w) : K({}), he = W(n, "USE_PROFILES") ? n.USE_PROFILES : !1, Rt = n.ALLOW_ARIA_ATTR !== !1, Ze = n.ALLOW_DATA_ATTR !== !1, Ct = n.ALLOW_UNKNOWN_PROTOCOLS || !1, kt = n.ALLOW_SELF_CLOSE_IN_ATTR !== !1, ce = n.SAFE_FOR_TEMPLATES || !1, Me = n.SAFE_FOR_XML !== !1, ie = n.WHOLE_DOCUMENT || !1, ue = n.RETURN_DOM || !1, xe = n.RETURN_DOM_FRAGMENT || !1, Fe = n.RETURN_TRUSTED_TYPE || !1, Qe = n.FORCE_BODY || !1, Mt = n.SANITIZE_DOM !== !1, xt = n.SANITIZE_NAMED_PROPS || !1, et = n.KEEP_CONTENT !== !1, Te = n.IN_PLACE || !1, Dt = n.ALLOWED_URI_REGEXP || Ii, de = n.NAMESPACE || J, He = n.MATHML_TEXT_INTEGRATION_POINTS || He, Ge = n.HTML_INTEGRATION_POINTS || Ge, S = n.CUSTOM_ELEMENT_HANDLING || {}, n.CUSTOM_ELEMENT_HANDLING && Ht(n.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (S.tagNameCheck = n.CUSTOM_ELEMENT_HANDLING.tagNameCheck), n.CUSTOM_ELEMENT_HANDLING && Ht(n.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (S.attributeNameCheck = n.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), n.CUSTOM_ELEMENT_HANDLING && typeof n.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (S.allowCustomizedBuiltInElements = n.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), ce && (Ze = !1), xe && (ue = !0), he && (O = m({}, pi), I = [], he.html === !0 && (m(O, fi), m(I, mi)), he.svg === !0 && (m(O, ft), m(I, gt), m(I, Be)), he.svgFilters === !0 && (m(O, pt), m(I, gt), m(I, Be)), he.mathMl === !0 && (m(O, mt), m(I, gi), m(I, Be))), n.ADD_TAGS && (typeof n.ADD_TAGS == "function" ? le.tagCheck = n.ADD_TAGS : (O === Pt && (O = K(O)), m(O, n.ADD_TAGS, w))), n.ADD_ATTR && (typeof n.ADD_ATTR == "function" ? le.attributeCheck = n.ADD_ATTR : (I === Lt && (I = K(I)), m(I, n.ADD_ATTR, w))), n.ADD_URI_SAFE_ATTR && m(it, n.ADD_URI_SAFE_ATTR, w), n.FORBID_CONTENTS && (j === tt && (j = K(j)), m(j, n.FORBID_CONTENTS, w)), n.ADD_FORBID_CONTENTS && (j === tt && (j = K(j)), m(j, n.ADD_FORBID_CONTENTS, w)), et && (O["#text"] = !0), ie && m(O, ["html", "head", "body"]), O.table && (m(O, ["tbody"]), delete ye.tbody), n.TRUSTED_TYPES_POLICY) {
        if (typeof n.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw be('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof n.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw be('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        b = n.TRUSTED_TYPES_POLICY, $ = b.createHTML("");
      } else
        b === void 0 && (b = $s(N, r)), b !== null && typeof $ == "string" && ($ = b.createHTML(""));
      k && k(n), fe = n;
    }
  }, Gt = m({}, [...ft, ...pt, ...Cs]), Vt = m({}, [...mt, ...ks]), zi = function(n) {
    let a = oe(n);
    (!a || !a.tagName) && (a = {
      namespaceURI: de,
      tagName: "template"
    });
    const u = je(n.tagName), y = je(a.tagName);
    return nt[n.namespaceURI] ? n.namespaceURI === Ue ? a.namespaceURI === J ? u === "svg" : a.namespaceURI === ze ? u === "svg" && (y === "annotation-xml" || He[y]) : !!Gt[u] : n.namespaceURI === ze ? a.namespaceURI === J ? u === "math" : a.namespaceURI === Ue ? u === "math" && Ge[y] : !!Vt[u] : n.namespaceURI === J ? a.namespaceURI === Ue && !Ge[y] || a.namespaceURI === ze && !He[y] ? !1 : !Vt[u] && (ki[u] || !Gt[u]) : !!(Se === "application/xhtml+xml" && nt[n.namespaceURI]) : !1;
  }, Y = function(n) {
    Ae(e.removed, {
      element: n
    });
    try {
      oe(n).removeChild(n);
    } catch {
      Ce(n);
    }
  }, se = function(n, a) {
    try {
      Ae(e.removed, {
        attribute: a.getAttributeNode(n),
        from: a
      });
    } catch {
      Ae(e.removed, {
        attribute: null,
        from: a
      });
    }
    if (a.removeAttribute(n), n === "is")
      if (ue || xe)
        try {
          Y(a);
        } catch {
        }
      else
        try {
          a.setAttribute(n, "");
        } catch {
        }
  }, Wt = function(n) {
    let a = null, u = null;
    if (Qe)
      n = "<remove></remove>" + n;
    else {
      const A = dt(n, /^[\r\n\t ]+/);
      u = A && A[0];
    }
    Se === "application/xhtml+xml" && de === J && (n = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + n + "</body></html>");
    const y = b ? b.createHTML(n) : n;
    if (de === J)
      try {
        a = new R().parseFromString(y, Se);
      } catch {
      }
    if (!a || !a.documentElement) {
      a = ae.createDocument(de, "template", null);
      try {
        a.documentElement.innerHTML = st ? $ : y;
      } catch {
      }
    }
    const L = a.body || a.documentElement;
    return n && u && L.insertBefore(i.createTextNode(u), L.childNodes[0] || null), de === J ? B.call(a, ie ? "html" : "body")[0] : ie ? a.documentElement : L;
  }, $t = function(n) {
    return p.call(
      n.ownerDocument || n,
      n,
      // eslint-disable-next-line no-bitwise
      _.SHOW_ELEMENT | _.SHOW_COMMENT | _.SHOW_TEXT | _.SHOW_PROCESSING_INSTRUCTION | _.SHOW_CDATA_SECTION,
      null
    );
  }, ot = function(n) {
    return n instanceof v && (typeof n.nodeName != "string" || typeof n.textContent != "string" || typeof n.removeChild != "function" || !(n.attributes instanceof T) || typeof n.removeAttribute != "function" || typeof n.setAttribute != "function" || typeof n.namespaceURI != "string" || typeof n.insertBefore != "function" || typeof n.hasChildNodes != "function");
  }, Bt = function(n) {
    return typeof f == "function" && n instanceof f;
  };
  function Q(d, n, a) {
    $e(d, (u) => {
      u.call(e, n, a, fe);
    });
  }
  const jt = function(n) {
    let a = null;
    if (Q(l.beforeSanitizeElements, n, null), ot(n))
      return Y(n), !0;
    const u = w(n.nodeName);
    if (Q(l.uponSanitizeElement, n, {
      tagName: u,
      allowedTags: O
    }), Me && n.hasChildNodes() && !Bt(n.firstElementChild) && C(/<[/\w!]/g, n.innerHTML) && C(/<[/\w!]/g, n.textContent) || n.nodeType === Ne.progressingInstruction || Me && n.nodeType === Ne.comment && C(/<[/\w]/g, n.data))
      return Y(n), !0;
    if (!(le.tagCheck instanceof Function && le.tagCheck(u)) && (!O[u] || ye[u])) {
      if (!ye[u] && Xt(u) && (S.tagNameCheck instanceof RegExp && C(S.tagNameCheck, u) || S.tagNameCheck instanceof Function && S.tagNameCheck(u)))
        return !1;
      if (et && !j[u]) {
        const y = oe(n) || n.parentNode, L = Ye(n) || n.childNodes;
        if (L && y) {
          const A = L.length;
          for (let z = A - 1; z >= 0; --z) {
            const ee = _e(L[z], !0);
            ee.__removalCount = (n.__removalCount || 0) + 1, y.insertBefore(ee, ke(n));
          }
        }
      }
      return Y(n), !0;
    }
    return n instanceof E && !zi(n) || (u === "noscript" || u === "noembed" || u === "noframes") && C(/<\/no(script|embed|frames)/i, n.innerHTML) ? (Y(n), !0) : (ce && n.nodeType === Ne.text && (a = n.textContent, $e([g, P, Z], (y) => {
      a = ve(a, y, " ");
    }), n.textContent !== a && (Ae(e.removed, {
      element: n.cloneNode()
    }), n.textContent = a)), Q(l.afterSanitizeElements, n, null), !1);
  }, Yt = function(n, a, u) {
    if (Mt && (a === "id" || a === "name") && (u in i || u in Fi))
      return !1;
    if (!(Ze && !Ke[a] && C(Ee, a))) {
      if (!(Rt && C(Xe, a))) {
        if (!(le.attributeCheck instanceof Function && le.attributeCheck(a, n))) {
          if (!I[a] || Ke[a]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Xt(n) && (S.tagNameCheck instanceof RegExp && C(S.tagNameCheck, n) || S.tagNameCheck instanceof Function && S.tagNameCheck(n)) && (S.attributeNameCheck instanceof RegExp && C(S.attributeNameCheck, a) || S.attributeNameCheck instanceof Function && S.attributeNameCheck(a, n)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              a === "is" && S.allowCustomizedBuiltInElements && (S.tagNameCheck instanceof RegExp && C(S.tagNameCheck, u) || S.tagNameCheck instanceof Function && S.tagNameCheck(u)))
            ) return !1;
          } else if (!it[a]) {
            if (!C(Dt, ve(u, te, ""))) {
              if (!((a === "src" || a === "xlink:href" || a === "href") && n !== "script" && Ds(u, "data:") === 0 && Ft[n])) {
                if (!(Ct && !C(qe, ve(u, te, "")))) {
                  if (u)
                    return !1;
                }
              }
            }
          }
        }
      }
    }
    return !0;
  }, Xt = function(n) {
    return n !== "annotation-xml" && dt(n, F);
  }, qt = function(n) {
    Q(l.beforeSanitizeAttributes, n, null);
    const {
      attributes: a
    } = n;
    if (!a || ot(n))
      return;
    const u = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: I,
      forceKeepAttr: void 0
    };
    let y = a.length;
    for (; y--; ) {
      const L = a[y], {
        name: A,
        namespaceURI: z,
        value: ee
      } = L, pe = w(A), at = ee;
      let D = A === "value" ? at : Ps(at);
      if (u.attrName = pe, u.attrValue = D, u.keepAttr = !0, u.forceKeepAttr = void 0, Q(l.uponSanitizeAttribute, n, u), D = u.attrValue, xt && (pe === "id" || pe === "name") && (se(A, n), D = Ri + D), Me && C(/((--!?|])>)|<\/(style|title|textarea)/i, D)) {
        se(A, n);
        continue;
      }
      if (pe === "attributename" && dt(D, "href")) {
        se(A, n);
        continue;
      }
      if (u.forceKeepAttr)
        continue;
      if (!u.keepAttr) {
        se(A, n);
        continue;
      }
      if (!kt && C(/\/>/i, D)) {
        se(A, n);
        continue;
      }
      ce && $e([g, P, Z], (Zt) => {
        D = ve(D, Zt, " ");
      });
      const Kt = w(n.nodeName);
      if (!Yt(Kt, pe, D)) {
        se(A, n);
        continue;
      }
      if (b && typeof N == "object" && typeof N.getAttributeType == "function" && !z)
        switch (N.getAttributeType(Kt, pe)) {
          case "TrustedHTML": {
            D = b.createHTML(D);
            break;
          }
          case "TrustedScriptURL": {
            D = b.createScriptURL(D);
            break;
          }
        }
      if (D !== at)
        try {
          z ? n.setAttributeNS(z, A, D) : n.setAttribute(A, D), ot(n) ? Y(n) : di(e.removed);
        } catch {
          se(A, n);
        }
    }
    Q(l.afterSanitizeAttributes, n, null);
  }, Ui = function d(n) {
    let a = null;
    const u = $t(n);
    for (Q(l.beforeSanitizeShadowDOM, n, null); a = u.nextNode(); )
      Q(l.uponSanitizeShadowNode, a, null), jt(a), qt(a), a.content instanceof o && d(a.content);
    Q(l.afterSanitizeShadowDOM, n, null);
  };
  return e.sanitize = function(d) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = null, u = null, y = null, L = null;
    if (st = !d, st && (d = "<!-->"), typeof d != "string" && !Bt(d))
      if (typeof d.toString == "function") {
        if (d = d.toString(), typeof d != "string")
          throw be("dirty is not a string, aborting");
      } else
        throw be("toString is not a function");
    if (!e.isSupported)
      return d;
    if (Je || rt(n), e.removed = [], typeof d == "string" && (Te = !1), Te) {
      if (d.nodeName) {
        const ee = w(d.nodeName);
        if (!O[ee] || ye[ee])
          throw be("root node is forbidden and cannot be sanitized in-place");
      }
    } else if (d instanceof f)
      a = Wt("<!---->"), u = a.ownerDocument.importNode(d, !0), u.nodeType === Ne.element && u.nodeName === "BODY" || u.nodeName === "HTML" ? a = u : a.appendChild(u);
    else {
      if (!ue && !ce && !ie && // eslint-disable-next-line unicorn/prefer-includes
      d.indexOf("<") === -1)
        return b && Fe ? b.createHTML(d) : d;
      if (a = Wt(d), !a)
        return ue ? null : Fe ? $ : "";
    }
    a && Qe && Y(a.firstChild);
    const A = $t(Te ? d : a);
    for (; y = A.nextNode(); )
      jt(y), qt(y), y.content instanceof o && Ui(y.content);
    if (Te)
      return d;
    if (ue) {
      if (xe)
        for (L = It.call(a.ownerDocument); a.firstChild; )
          L.appendChild(a.firstChild);
      else
        L = a;
      return (I.shadowroot || I.shadowrootmode) && (L = h.call(t, L, !0)), L;
    }
    let z = ie ? a.outerHTML : a.innerHTML;
    return ie && O["!doctype"] && a.ownerDocument && a.ownerDocument.doctype && a.ownerDocument.doctype.name && C(Di, a.ownerDocument.doctype.name) && (z = "<!DOCTYPE " + a.ownerDocument.doctype.name + `>
` + z), ce && $e([g, P, Z], (ee) => {
      z = ve(z, ee, " ");
    }), b && Fe ? b.createHTML(z) : z;
  }, e.setConfig = function() {
    let d = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    rt(d), Je = !0;
  }, e.clearConfig = function() {
    fe = null, Je = !1;
  }, e.isValidAttribute = function(d, n, a) {
    fe || rt({});
    const u = w(d), y = w(n);
    return Yt(u, y, a);
  }, e.addHook = function(d, n) {
    typeof n == "function" && Ae(l[d], n);
  }, e.removeHook = function(d, n) {
    if (n !== void 0) {
      const a = Os(l[d], n);
      return a === -1 ? void 0 : Is(l[d], a, 1)[0];
    }
    return di(l[d]);
  }, e.removeHooks = function(d) {
    l[d] = [];
  }, e.removeAllHooks = function() {
    l = Ei();
  }, e;
}
var Bs = Pi();
const Li = (s, e) => {
  const i = s.__vccOpts || s;
  for (const [t, r] of e)
    i[t] = r;
  return i;
}, js = {
  name: "Image",
  props: {
    image: {
      type: Object,
      required: !0
    }
  },
  data() {
    return {
      imageEnlarged: !1
    };
  },
  computed: {
    descriptionHtml() {
      var i, t;
      const s = ((i = this.image) == null ? void 0 : i.title) || "", e = (t = this.image) != null && t.description ? this.image.description._content || this.image.description : "";
      return `<b>${s}</b><br>${e}`;
    },
    sanitizedDescription() {
      return Bs.sanitize(this.descriptionHtml, { USE_PROFILES: { html: !0 } });
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
}, Ys = ["href", "data-pswp-width", "data-pswp-height"], Xs = ["innerHTML"], qs = ["src", "alt"];
function Ks(s, e, i, t, r, o) {
  return X(), q("a", {
    class: "pswp-gallery__item",
    href: i.image.url_l || i.image.url_m,
    "data-pswp-width": i.image.width_l || i.image.width_m,
    "data-pswp-height": i.image.height_l || i.image.height_m,
    target: "_blank",
    rel: "noopener noreferrer"
  }, [
    H("span", {
      class: "hidden-caption-content",
      innerHTML: o.sanitizedDescription
    }, null, 8, Xs),
    H("img", {
      src: i.image.url_m || i.image.url_l,
      alt: i.image.title,
      onMouseover: e[0] || (e[0] = (...c) => o.enlargeImage && o.enlargeImage(...c)),
      onMouseout: e[1] || (e[1] = (...c) => o.shrinkImage && o.shrinkImage(...c)),
      loading: "lazy",
      decoding: "async",
      class: Yi({
        "img-default-size": !0,
        "img-enlarged-size": r.imageEnlarged
      })
    }, null, 42, qs)
  ], 8, Ys);
}
const Zs = /* @__PURE__ */ Li(js, [["render", Ks]]), Js = {
  name: "FlickrGallery",
  components: { Image: Zs },
  props: {
    title: String,
    useNavigation: { type: Boolean, default: !0 },
    showPage: { type: Boolean, default: !0 },
    apiKey: { type: String, required: !0 },
    userId: { type: String, required: !0 },
    method: { type: String, default: "flickr.photos.search" },
    photosetId: { type: String, default: "" },
    tags: { type: String, default: "" },
    extras: { type: String, default: "" }
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
    loading: !1,
    flickrStore: null
  }),
  async beforeMount() {
    const s = "flickr-" + this.$.uid;
    this.galleryID = this.galleryID + "-" + this.$.uid, this.flickrStore = vs(s), this.extras && (this.defaultExtras = this.extras), await this.loadFlickrPhotos();
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
      const s = {
        gallery: "#" + this.galleryID,
        children: ".pswp-gallery__item",
        pswpModule: () => import("./photoswipe.esm-BFJEtAuD.js")
      };
      if (!this.lightbox) {
        const e = new As(s);
        e.on("uiRegister", function() {
          e.pswp.ui.registerElement({
            name: "custom-caption",
            order: 9,
            isButton: !1,
            appendTo: "root",
            html: "Caption text",
            onInit: (i) => {
              e.pswp.on("change", () => {
                const t = e.pswp.currSlide.data.element;
                let r = "";
                if (t) {
                  const o = t.querySelector(".hidden-caption-content");
                  o ? r = o.innerHTML : r = t.querySelector("img").getAttribute("alt");
                }
                i.innerHTML = r || "";
              });
            }
          });
        }), e.init(), this.lightbox = e;
      }
    },
    async loadFlickrPhotos() {
      this.loading = !0;
      try {
        const s = new URLSearchParams();
        s.set("method", this.method), s.set("api_key", this.apiKey), this.tags && s.set("tags", this.tags), this.userId && s.set("user_id", this.userId), this.photosetId && s.set("photoset_id", this.photosetId), s.set("format", "json"), s.set("page", String(this.page)), s.set("per_page", String(this.perPage)), s.set("extras", this.defaultExtras), s.set("nojsoncallback", "1");
        const e = `${this.endpoint}?${s.toString()}`;
        await this.flickrStore.fetchPhotos(e), this.totalPages = this.flickrStore.totalPages, this.totalPictures = this.flickrStore.totalPictures, this.loading = this.flickrStore.loading;
      } catch (s) {
        console.error("Fehler beim Laden der Flickr-Fotos:", s), this.loading = !1;
      }
    },
    nextPage() {
      this.page < this.totalPages && (this.page++, this.loadFlickrPhotos());
    },
    previousPage() {
      this.page > 1 && (this.page--, this.loadFlickrPhotos());
    }
  }
}, Qs = ["id"], en = {
  class: "flickr-container",
  ref: "flickr-container"
}, tn = { key: 0 }, sn = {
  key: 1,
  class: "flickr-error",
  role: "alert"
}, nn = {
  key: 2,
  class: "flickr-loading",
  "aria-busy": "true",
  "aria-live": "polite"
}, rn = {
  key: 3,
  class: "flickr-images"
}, on = {
  key: 0,
  class: "flickr-navigation"
}, an = { class: "prev" }, ln = {
  key: 0,
  class: "current"
}, cn = { "aria-live": "polite" }, un = { class: "next" };
function hn(s, e, i, t, r, o) {
  const c = Xi("Image");
  return X(), q("div", { id: s.galleryID }, [
    ei(qi, { name: "fade" }, {
      default: Ki(() => [
        H("div", en, [
          i.title ? (X(), q("h2", tn, Ve(i.title), 1)) : ct("", !0),
          s.flickrStore.error ? (X(), q("div", sn, [
            e[5] || (e[5] = H("strong", null, "Fehler:", -1)),
            Zi(" " + Ve(s.flickrStore.error) + " ", 1),
            H("button", {
              class: "flickr-retry",
              onClick: e[0] || (e[0] = (...f) => o.loadFlickrPhotos && o.loadFlickrPhotos(...f)),
              "aria-label": "Erneut laden"
            }, "Erneut laden")
          ])) : s.flickrStore.loading ? (X(), q("div", nn, [...e[6] || (e[6] = [
            H("span", {
              class: "spinner",
              "aria-hidden": "true"
            }, null, -1),
            H("span", { class: "loading-text" }, "Lade Bilder…", -1)
          ])])) : (X(), q("div", rn, [
            (X(!0), q(Ji, null, Qi(s.flickrStore.photos, (f, E) => (X(), q("span", {
              key: f.id ?? E
            }, [
              ei(c, { image: f }, null, 8, ["image"])
            ]))), 128))
          ]))
        ], 512)
      ]),
      _: 1
    }),
    i.useNavigation ? (X(), q("div", on, [
      H("span", an, [
        H("button", {
          onClick: e[1] || (e[1] = (...f) => o.previousPage && o.previousPage(...f)),
          onKeyup: e[2] || (e[2] = ti((...f) => o.previousPage && o.previousPage(...f), ["left"])),
          "aria-label": "Vorherige Seite"
        }, " << ", 32)
      ]),
      i.showPage ? (X(), q("span", ln, [
        H("span", cn, "Page " + Ve(s.page) + "/" + Ve(s.totalPages), 1)
      ])) : ct("", !0),
      H("span", un, [
        H("button", {
          onClick: e[3] || (e[3] = (...f) => o.nextPage && o.nextPage(...f)),
          onKeyup: e[4] || (e[4] = ti((...f) => o.nextPage && o.nextPage(...f), ["right"])),
          "aria-label": "Nächste Seite"
        }, " >> ", 32)
      ])
    ])) : ct("", !0)
  ], 8, Qs);
}
const dn = /* @__PURE__ */ Li(Js, [["render", hn]]), fn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dn
}, Symbol.toStringTag, { value: "Module" })), mn = {
  install(s, e = {}) {
    const { pinia: i } = e;
    if (!i) {
      console.error("[FlickrGallery] Missing { pinia } option during install");
      return;
    }
    rs(i), i && Array.isArray(i._p) && !i._p.includes(li) && i.use(li), s.component(
      "FlickrGallery",
      es(() => Promise.resolve().then(() => fn))
    );
  }
};
export {
  dn as FlickrGalleryComponent,
  mn as FlickrGalleryPlugin,
  mn as default
};
