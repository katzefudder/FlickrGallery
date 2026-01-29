import { hasInjectionContext as _t, inject as Et, getCurrentInstance as Vi, ref as Ti, reactive as Gi, markRaw as Oe, effectScope as Wi, isRef as Le, isReactive as Nt, toRef as lt, toRaw as Bi, nextTick as Jt, getCurrentScope as $i, onScopeDispose as ji, watch as Yi, computed as Si, toRefs as Qt, openBlock as W, createElementBlock as B, createElementVNode as U, normalizeClass as ei, resolveComponent as Xi, createVNode as ti, Transition as qi, withCtx as Ki, toDisplayString as Ge, createCommentVNode as ct, createTextVNode as Zi, Fragment as Ji, renderList as Qi, withKeys as ii, defineAsyncComponent as es } from "vue";
/*!
 * pinia v3.0.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
const ge = typeof window < "u";
let ne;
const Ce = (s) => ne = s;
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
function Ai(s, e) {
  for (const t in e) {
    const i = e[t];
    if (!(t in s))
      continue;
    const r = s[t];
    re(r) && re(i) && !Le(i) && !Nt(i) ? s[t] = Ai(r, i) : s[t] = i;
  }
  return s;
}
const vi = () => {
};
function si(s, e, t, i = vi) {
  s.add(e);
  const r = () => {
    s.delete(e) && i();
  };
  return !t && $i() && ji(r), r;
}
function me(s, ...e) {
  s.forEach((t) => {
    t(...e);
  });
}
const ts = (s) => s(), ni = Symbol(), ut = Symbol();
function Tt(s, e) {
  s instanceof Map && e instanceof Map ? e.forEach((t, i) => s.set(i, t)) : s instanceof Set && e instanceof Set && e.forEach(s.add, s);
  for (const t in e) {
    if (!e.hasOwnProperty(t))
      continue;
    const i = e[t], r = s[t];
    re(r) && re(i) && s.hasOwnProperty(t) && !Le(i) && !Nt(i) ? s[t] = Tt(r, i) : s[t] = i;
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
const { assign: V } = Object;
function ri(s) {
  return !!(Le(s) && s.effect);
}
function oi(s, e, t, i) {
  const { state: r, actions: o, getters: l } = e, f = t.state.value[s];
  let E;
  function _() {
    !f && (process.env.NODE_ENV === "production" || !i) && (t.state.value[s] = r ? r() : {});
    const T = process.env.NODE_ENV !== "production" && i ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Qt(Ti(r ? r() : {}).value)
    ) : Qt(t.state.value[s]);
    return V(T, o, Object.keys(l || {}).reduce((v, C) => (process.env.NODE_ENV !== "production" && C in T && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${C}" in store "${s}".`), v[C] = Oe(Si(() => {
      Ce(t);
      const N = t._s.get(s);
      return l[C].call(N, N);
    })), v), {}));
  }
  return E = St(s, _, e, t, i, !0), E;
}
function St(s, e, t = {}, i, r, o) {
  let l;
  const f = V({ actions: {} }, t);
  if (process.env.NODE_ENV !== "production" && !i._e.active)
    throw new Error("Pinia destroyed");
  const E = { deep: !0 };
  process.env.NODE_ENV !== "production" && (E.onTrigger = (h) => {
    _ ? N = h : _ == !1 && !p._hotUpdating && (Array.isArray(N) ? N.push(h) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let _, T, v = /* @__PURE__ */ new Set(), C = /* @__PURE__ */ new Set(), N;
  const x = i.state.value[s];
  !o && !x && (process.env.NODE_ENV === "production" || !r) && (i.state.value[s] = {});
  const _e = Ti({});
  let Re;
  function ke(h) {
    let c;
    _ = T = !1, process.env.NODE_ENV !== "production" && (N = []), typeof h == "function" ? (h(i.state.value[s]), c = {
      type: Pe.patchFunction,
      storeId: s,
      events: N
    }) : (Tt(i.state.value[s], h), c = {
      type: Pe.patchObject,
      payload: h,
      storeId: s,
      events: N
    });
    const g = Re = Symbol();
    Jt().then(() => {
      Re === g && (_ = !0);
    }), T = !0, me(v, c, i.state.value[s]);
  }
  const Ye = o ? function() {
    const { state: c } = t, g = c ? c() : {};
    this.$patch((P) => {
      V(P, g);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${s}" is built using the setup syntax and does not implement $reset().`);
    } : vi
  );
  function oe() {
    l.stop(), v.clear(), C.clear(), i._s.delete(s);
  }
  const b = (h, c = "") => {
    if (ni in h)
      return h[ut] = c, h;
    const g = function() {
      Ce(i);
      const P = Array.from(arguments), Z = /* @__PURE__ */ new Set(), Ee = /* @__PURE__ */ new Set();
      function Xe(F) {
        Z.add(F);
      }
      function qe(F) {
        Ee.add(F);
      }
      me(C, {
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
    return g[ni] = !0, g[ut] = c, g;
  }, j = /* @__PURE__ */ Oe({
    actions: {},
    getters: {},
    state: [],
    hotState: _e
  }), ae = {
    _p: i,
    // _s: scope,
    $id: s,
    $onAction: si.bind(null, C),
    $patch: ke,
    $reset: Ye,
    $subscribe(h, c = {}) {
      const g = si(v, h, c.detached, () => P()), P = l.run(() => Yi(() => i.state.value[s], (Z) => {
        (c.flush === "sync" ? T : _) && h({
          storeId: s,
          type: Pe.direct,
          events: N
        }, Z);
      }, V({}, E, c)));
      return g;
    },
    $dispose: oe
  }, p = Gi(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ge ? V(
    {
      _hmrPayload: j,
      _customProperties: Oe(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    ae
    // must be added later
    // setupStore
  ) : ae);
  i._s.set(s, p);
  const Y = (i._a && i._a.runWithContext || ts)(() => i._e.run(() => (l = Wi()).run(() => e({ action: b }))));
  for (const h in Y) {
    const c = Y[h];
    if (Le(c) && !ri(c) || Nt(c))
      process.env.NODE_ENV !== "production" && r ? _e.value[h] = lt(Y, h) : o || (x && ss(c) && (Le(c) ? c.value = x[h] : Tt(c, x[h])), i.state.value[s][h] = c), process.env.NODE_ENV !== "production" && j.state.push(h);
    else if (typeof c == "function") {
      const g = process.env.NODE_ENV !== "production" && r ? c : b(c, h);
      Y[h] = g, process.env.NODE_ENV !== "production" && (j.actions[h] = c), f.actions[h] = c;
    } else process.env.NODE_ENV !== "production" && ri(c) && (j.getters[h] = o ? (
      // @ts-expect-error
      t.getters[h]
    ) : c, ge && (Y._getters || // @ts-expect-error: same
    (Y._getters = Oe([]))).push(h));
  }
  if (V(p, Y), V(Bi(p), Y), Object.defineProperty(p, "$state", {
    get: () => process.env.NODE_ENV !== "production" && r ? _e.value : i.state.value[s],
    set: (h) => {
      if (process.env.NODE_ENV !== "production" && r)
        throw new Error("cannot set hotState");
      ke((c) => {
        V(c, h);
      });
    }
  }), process.env.NODE_ENV !== "production" && (p._hotUpdate = Oe((h) => {
    p._hotUpdating = !0, h._hmrPayload.state.forEach((c) => {
      if (c in p.$state) {
        const g = h.$state[c], P = p.$state[c];
        typeof g == "object" && re(g) && re(P) ? Ai(g, P) : h.$state[c] = P;
      }
      p[c] = lt(h.$state, c);
    }), Object.keys(p.$state).forEach((c) => {
      c in h.$state || delete p[c];
    }), _ = !1, T = !1, i.state.value[s] = lt(h._hmrPayload, "hotState"), T = !0, Jt().then(() => {
      _ = !0;
    });
    for (const c in h._hmrPayload.actions) {
      const g = h[c];
      p[c] = //
      b(g, c);
    }
    for (const c in h._hmrPayload.getters) {
      const g = h._hmrPayload.getters[c], P = o ? (
        // special handling of options api
        Si(() => (Ce(i), g.call(p, p)))
      ) : g;
      p[c] = //
      P;
    }
    Object.keys(p._hmrPayload.getters).forEach((c) => {
      c in h._hmrPayload.getters || delete p[c];
    }), Object.keys(p._hmrPayload.actions).forEach((c) => {
      c in h._hmrPayload.actions || delete p[c];
    }), p._hmrPayload = h._hmrPayload, p._getters = h._getters, p._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ge) {
    const h = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((c) => {
      Object.defineProperty(p, c, V({ value: p[c] }, h));
    });
  }
  return i._p.forEach((h) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && ge) {
      const c = l.run(() => h({
        store: p,
        app: i._a,
        pinia: i,
        options: f
      }));
      Object.keys(c || {}).forEach((g) => p._customProperties.add(g)), V(p, c);
    } else
      V(p, l.run(() => h({
        store: p,
        app: i._a,
        pinia: i,
        options: f
      })));
  }), process.env.NODE_ENV !== "production" && p.$state && typeof p.$state == "object" && typeof p.$state.constructor == "function" && !p.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${p.$id}".`), x && o && t.hydrate && t.hydrate(p.$state, x), _ = !0, T = !0, p;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ns(s, e, t) {
  let i;
  const r = typeof e == "function";
  i = r ? t : e;
  function o(l, f) {
    const E = _t();
    if (l = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && ne && ne._testing ? null : l) || (E ? Et(yt, null) : null), l && Ce(l), process.env.NODE_ENV !== "production" && !ne)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    l = ne, l._s.has(s) || (r ? St(s, e, i, l) : oi(s, i, l), process.env.NODE_ENV !== "production" && (o._pinia = l));
    const _ = l._s.get(s);
    if (process.env.NODE_ENV !== "production" && f) {
      const T = "__hot:" + s, v = r ? St(T, e, i, l, !0) : oi(T, V({}, i), l, !0);
      f._hotUpdate(v), delete l.state.value[T], l._s.delete(T);
    }
    if (process.env.NODE_ENV !== "production" && ge) {
      const T = Vi();
      if (T && T.proxy && // avoid adding stores that are just built for hot module replacement
      !f) {
        const v = T.proxy, C = "_pStores" in v ? v._pStores : v._pStores = {};
        C[s] = _;
      }
    }
    return _;
  }
  return o.$id = s, o;
}
function rs(s) {
  Ce(s);
}
function os(s, e) {
  if (s == null) return;
  let t = s;
  for (let i = 0; i < e.length; i++) {
    if (t === void 0 || t[e[i]] === void 0) return;
    if (t === null || t[e[i]] === null) return null;
    t = t[e[i]];
  }
  return t;
}
function Ot(s, e, t) {
  if (t.length === 0) return e;
  const i = t[0];
  return t.length > 1 && (e = Ot(typeof s != "object" || s === null || !Object.prototype.hasOwnProperty.call(s, i) ? Number.isInteger(Number(t[1])) ? [] : {} : s[i], e, Array.prototype.slice.call(t, 1))), Number.isInteger(Number(i)) && Array.isArray(s) ? s.slice()[i] : Object.assign({}, s, { [i]: e });
}
function bi(s, e) {
  if (s == null || e.length === 0) return s;
  if (e.length === 1) {
    if (s == null) return s;
    if (Number.isInteger(e[0]) && Array.isArray(s)) return Array.prototype.slice.call(s, 0).splice(e[0], 1);
    const t = {};
    for (const i in s) t[i] = s[i];
    return delete t[e[0]], t;
  }
  if (s[e[0]] == null) {
    if (Number.isInteger(e[0]) && Array.isArray(s)) return Array.prototype.concat.call([], s);
    const t = {};
    for (const i in s) t[i] = s[i];
    return t;
  }
  return Ot(s, bi(s[e[0]], Array.prototype.slice.call(e, 1)), [e[0]]);
}
function wi(s, e) {
  return e.map((t) => t.split(".")).map((t) => [t, os(s, t)]).filter((t) => t[1] !== void 0).reduce((t, i) => Ot(t, i[1], i[0]), {});
}
function Ni(s, e) {
  return e.map((t) => t.split(".")).reduce((t, i) => bi(t, i), s);
}
function ai(s, { storage: e, serializer: t, key: i, debug: r, pick: o, omit: l, beforeHydrate: f, afterHydrate: E }, _, T = !0) {
  try {
    T && (f == null || f(_));
    const v = e.getItem(i);
    if (v) {
      const C = t.deserialize(v), N = o ? wi(C, o) : C, x = l ? Ni(N, l) : N;
      s.$patch(x);
    }
    T && (E == null || E(_));
  } catch (v) {
    r && console.error("[pinia-plugin-persistedstate]", v);
  }
}
function li(s, { storage: e, serializer: t, key: i, debug: r, pick: o, omit: l }) {
  try {
    const f = o ? wi(s, o) : s, E = l ? Ni(f, l) : f, _ = t.serialize(E);
    e.setItem(i, _);
  } catch (f) {
    r && console.error("[pinia-plugin-persistedstate]", f);
  }
}
function as(s, e) {
  return typeof s == "function" ? s(e) : typeof s == "string" ? s : e;
}
function ls(s, e, t) {
  const { pinia: i, store: r, options: { persist: o = t } } = s;
  if (!o) return;
  // v8 ignore if -- @preserve
  if (!(r.$id in i.state.value)) {
    const f = i._s.get(r.$id.replace("__hot:", ""));
    f && Promise.resolve().then(() => f.$persist());
    return;
  }
  const l = (Array.isArray(o) ? o : o === !0 ? [{}] : [o]).map(e);
  r.$hydrate = ({ runHooks: f = !0 } = {}) => {
    l.forEach((E) => {
      ai(r, E, s, f);
    });
  }, r.$persist = () => {
    l.forEach((f) => {
      li(r.$state, f);
    });
  }, l.forEach((f) => {
    ai(r, f, s), r.$subscribe((E, _) => li(_, f), { detached: !0 });
  });
}
function cs(s = {}) {
  return function(e) {
    ls(e, (t) => {
      const i = as(t.key, e.store.$id);
      return {
        key: (s.key ? s.key : (r) => r)(i),
        debug: t.debug ?? s.debug ?? !1,
        serializer: t.serializer ?? s.serializer ?? {
          serialize: (r) => JSON.stringify(r),
          deserialize: (r) => JSON.parse(r)
        },
        storage: t.storage ?? s.storage ?? window.localStorage,
        beforeHydrate: t.beforeHydrate ?? s.beforeHydrate,
        afterHydrate: t.afterHydrate ?? s.afterHydrate,
        pick: t.pick,
        omit: t.omit
      };
    }, s.auto ?? !1);
  };
}
var ci = cs();
/*!
  * PhotoSwipe Lightbox 5.4.4 - https://photoswipe.com
  * (c) 2024 Dmytro Semenov
  */
function Ie(s, e, t) {
  const i = document.createElement(e);
  return s && (i.className = s), t && t.appendChild(i), i;
}
function us(s, e, t) {
  let i = `translate3d(${s}px,0px,0)`;
  return t !== void 0 && (i += ` scale3d(${t},${t},1)`), i;
}
function At(s, e, t) {
  s.style.width = typeof e == "number" ? `${e}px` : e, s.style.height = typeof t == "number" ? `${t}px` : t;
}
const H = {
  IDLE: "idle",
  LOADING: "loading",
  LOADED: "loaded",
  ERROR: "error"
};
function hs(s) {
  return "button" in s && s.button === 1 || s.ctrlKey || s.metaKey || s.altKey || s.shiftKey;
}
function De(s, e, t = document) {
  let i = [];
  if (s instanceof Element)
    i = [s];
  else if (s instanceof NodeList || Array.isArray(s))
    i = Array.from(s);
  else {
    const r = typeof s == "string" ? s : e;
    r && (i = Array.from(t.querySelectorAll(r)));
  }
  return i;
}
function ds(s) {
  return typeof s == "function" && s.prototype && s.prototype.goTo;
}
function ui() {
  return !!(navigator.vendor && navigator.vendor.match(/apple/i));
}
class fs {
  /**
   * @param {T} type
   * @param {PhotoSwipeEventsMap[T]} [details]
   */
  constructor(e, t) {
    this.type = e, this.defaultPrevented = !1, t && Object.assign(this, t);
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
  addFilter(e, t, i = 100) {
    var r, o, l;
    this._filters[e] || (this._filters[e] = []), (r = this._filters[e]) === null || r === void 0 || r.push({
      fn: t,
      priority: i
    }), (o = this._filters[e]) === null || o === void 0 || o.sort((f, E) => f.priority - E.priority), (l = this.pswp) === null || l === void 0 || l.addFilter(e, t, i);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   */
  removeFilter(e, t) {
    this._filters[e] && (this._filters[e] = this._filters[e].filter((i) => i.fn !== t)), this.pswp && this.pswp.removeFilter(e, t);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {Parameters<PhotoSwipeFiltersMap[T]>} args
   * @returns {Parameters<PhotoSwipeFiltersMap[T]>[0]}
   */
  applyFilters(e, ...t) {
    var i;
    return (i = this._filters[e]) === null || i === void 0 || i.forEach((r) => {
      t[0] = r.fn.apply(this, t);
    }), t[0];
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  on(e, t) {
    var i, r;
    this._listeners[e] || (this._listeners[e] = []), (i = this._listeners[e]) === null || i === void 0 || i.push(t), (r = this.pswp) === null || r === void 0 || r.on(e, t);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  off(e, t) {
    var i;
    this._listeners[e] && (this._listeners[e] = this._listeners[e].filter((r) => t !== r)), (i = this.pswp) === null || i === void 0 || i.off(e, t);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {PhotoSwipeEventsMap[T]} [details]
   * @returns {AugmentedEvent<T>}
   */
  dispatch(e, t) {
    var i;
    if (this.pswp)
      return this.pswp.dispatch(e, t);
    const r = (
      /** @type {AugmentedEvent<T>} */
      new fs(e, t)
    );
    return (i = this._listeners[e]) === null || i === void 0 || i.forEach((o) => {
      o.call(this, r);
    }), r;
  }
}
class ms {
  /**
   * @param {string | false} imageSrc
   * @param {HTMLElement} container
   */
  constructor(e, t) {
    if (this.element = Ie("pswp__img pswp__img--placeholder", e ? "img" : "div", t), e) {
      const i = (
        /** @type {HTMLImageElement} */
        this.element
      );
      i.decoding = "async", i.alt = "", i.src = e, i.setAttribute("role", "presentation");
    }
    this.element.setAttribute("aria-hidden", "true");
  }
  /**
   * @param {number} width
   * @param {number} height
   */
  setDisplayedSize(e, t) {
    this.element && (this.element.tagName === "IMG" ? (At(this.element, 250, "auto"), this.element.style.transformOrigin = "0 0", this.element.style.transform = us(0, 0, e / 250)) : At(this.element, e, t));
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
  constructor(e, t, i) {
    this.instance = t, this.data = e, this.index = i, this.element = void 0, this.placeholder = void 0, this.slide = void 0, this.displayedImageWidth = 0, this.displayedImageHeight = 0, this.width = Number(this.data.w) || Number(this.data.width) || 0, this.height = Number(this.data.h) || Number(this.data.height) || 0, this.isAttached = !1, this.hasSlide = !1, this.isDecoding = !1, this.state = H.IDLE, this.data.type ? this.type = this.data.type : this.data.src ? this.type = "image" : this.type = "html", this.instance.dispatch("contentInit", {
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
  load(e, t) {
    if (this.slide && this.usePlaceholder())
      if (this.placeholder) {
        const i = this.placeholder.element;
        i && !i.parentElement && this.slide.container.prepend(i);
      } else {
        const i = this.instance.applyFilters(
          "placeholderSrc",
          // use  image-based placeholder only for the first slide,
          // as rendering (even small stretched thumbnail) is an expensive operation
          this.data.msrc && this.slide.isFirstSlide ? this.data.msrc : !1,
          this
        );
        this.placeholder = new ms(i, this.slide.container);
      }
    this.element && !t || this.instance.dispatch("contentLoad", {
      content: this,
      isLazy: e
    }).defaultPrevented || (this.isImageContent() ? (this.element = Ie("pswp__img", "img"), this.displayedImageWidth && this.loadImage(e)) : (this.element = Ie("pswp__content", "div"), this.element.innerHTML = this.data.html || ""), t && this.slide && this.slide.updateContentSize(!0));
  }
  /**
   * Preload image
   *
   * @param {boolean} isLazy
   */
  loadImage(e) {
    var t, i;
    if (!this.isImageContent() || !this.element || this.instance.dispatch("contentLoadImage", {
      content: this,
      isLazy: e
    }).defaultPrevented)
      return;
    const r = (
      /** @type HTMLImageElement */
      this.element
    );
    this.updateSrcsetSizes(), this.data.srcset && (r.srcset = this.data.srcset), r.src = (t = this.data.src) !== null && t !== void 0 ? t : "", r.alt = (i = this.data.alt) !== null && i !== void 0 ? i : "", this.state = H.LOADING, r.complete ? this.onLoaded() : (r.onload = () => {
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
    this.state = H.LOADED, this.slide && this.element && (this.instance.dispatch("loadComplete", {
      slide: this.slide,
      content: this
    }), this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode && (this.append(), this.slide.updateContentSize(!0)), (this.state === H.LOADED || this.state === H.ERROR) && this.removePlaceholder());
  }
  /**
   * Content load error handler
   */
  onError() {
    this.state = H.ERROR, this.slide && (this.displayError(), this.instance.dispatch("loadComplete", {
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
    return this.instance.applyFilters("isContentLoading", this.state === H.LOADING, this);
  }
  /**
   * @returns {Boolean} If the content is in error state
   */
  isError() {
    return this.state === H.ERROR;
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
  setDisplayedSize(e, t) {
    if (this.element && (this.placeholder && this.placeholder.setDisplayedSize(e, t), !this.instance.dispatch("contentResize", {
      content: this,
      width: e,
      height: t
    }).defaultPrevented && (At(this.element, e, t), this.isImageContent() && !this.isError()))) {
      const i = !this.displayedImageWidth && e;
      this.displayedImageWidth = e, this.displayedImageHeight = t, i ? this.loadImage(!1) : this.updateSrcsetSizes(), this.slide && this.instance.dispatch("imageSizeChange", {
        slide: this.slide,
        width: e,
        height: t,
        content: this
      });
    }
  }
  /**
   * @returns {boolean} If the content can be zoomed
   */
  isZoomable() {
    return this.instance.applyFilters("isContentZoomable", this.isImageContent() && this.state !== H.ERROR, this);
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
    ), t = this.instance.applyFilters("srcsetSizesWidth", this.displayedImageWidth, this);
    (!e.dataset.largestUsedSize || t > parseInt(e.dataset.largestUsedSize, 10)) && (e.sizes = t + "px", e.dataset.largestUsedSize = String(t));
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
      var e, t;
      let i = Ie("pswp__error-msg", "div");
      i.innerText = (e = (t = this.instance.options) === null || t === void 0 ? void 0 : t.errorMsg) !== null && e !== void 0 ? e : "", i = /** @type {HTMLDivElement} */
      this.instance.applyFilters("contentErrorElement", i, this), this.element = Ie("pswp__content pswp__error-msg-container", "div"), this.element.appendChild(i), this.slide.container.innerText = "", this.slide.container.appendChild(this.element), this.slide.updateContentSize(!0), this.removePlaceholder();
    }
  }
  /**
   * Append the content
   */
  append() {
    if (this.isAttached || !this.element)
      return;
    if (this.isAttached = !0, this.state === H.ERROR) {
      this.displayError();
      return;
    }
    if (this.instance.dispatch("contentAppend", {
      content: this
    }).defaultPrevented)
      return;
    const e = "decode" in this.element;
    this.isImageContent() ? e && this.slide && (!this.slide.isActive || ui()) ? (this.isDecoding = !0, this.element.decode().catch(() => {
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
    }).defaultPrevented || !this.slide || (this.isImageContent() && this.isDecoding && !ui() ? this.appendImage() : this.isError() && this.load(!1, !0), this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "false"));
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
    }).defaultPrevented || (this.slide && this.element && !this.element.parentNode && this.slide.container.appendChild(this.element), (this.state === H.LOADED || this.state === H.ERROR) && this.removePlaceholder()));
  }
}
function _s(s, e) {
  if (s.getViewportSizeFn) {
    const t = s.getViewportSizeFn(s, e);
    if (t)
      return t;
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
function We(s, e, t, i, r) {
  let o = 0;
  if (e.paddingFn)
    o = e.paddingFn(t, i, r)[s];
  else if (e.padding)
    o = e.padding[s];
  else {
    const l = "padding" + s[0].toUpperCase() + s.slice(1);
    e[l] && (o = e[l]);
  }
  return Number(o) || 0;
}
function Es(s, e, t, i) {
  return {
    x: e.x - We("left", s, e, t, i) - We("right", s, e, t, i),
    y: e.y - We("top", s, e, t, i) - We("bottom", s, e, t, i)
  };
}
const hi = 4e3;
class ys {
  /**
   * @param {PhotoSwipeOptions} options PhotoSwipe options
   * @param {SlideData} itemData Slide data
   * @param {number} index Slide index
   * @param {PhotoSwipe} [pswp] PhotoSwipe instance, can be undefined if not initialized yet
   */
  constructor(e, t, i, r) {
    this.pswp = r, this.options = e, this.itemData = t, this.index = i, this.panAreaSize = null, this.elementSize = null, this.fit = 1, this.fill = 1, this.vFill = 1, this.initial = 1, this.secondary = 1, this.max = 1, this.min = 1;
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
  update(e, t, i) {
    const r = {
      x: e,
      y: t
    };
    this.elementSize = r, this.panAreaSize = i;
    const o = i.x / r.x, l = i.y / r.y;
    this.fit = Math.min(1, o < l ? o : l), this.fill = Math.min(1, o > l ? o : l), this.vFill = Math.min(1, l), this.initial = this._getInitial(), this.secondary = this._getSecondary(), this.max = Math.max(this.initial, this.secondary, this._getMax()), this.min = Math.min(this.fit, this.initial, this.secondary), this.pswp && this.pswp.dispatch("zoomLevelsUpdate", {
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
    const t = (
      /** @type {'initialZoomLevel' | 'secondaryZoomLevel' | 'maxZoomLevel'} */
      e + "ZoomLevel"
    ), i = this.options[t];
    if (i)
      return typeof i == "function" ? i(this) : i === "fill" ? this.fill : i === "fit" ? this.fit : Number(i);
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
    return e || (e = Math.min(1, this.fit * 3), this.elementSize && e * this.elementSize.x > hi && (e = hi / this.elementSize.x), e);
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
function Oi(s, e, t) {
  const i = e.createContentFromData(s, t);
  let r;
  const {
    options: o
  } = e;
  if (o) {
    r = new ys(o, s, -1);
    let l;
    e.pswp ? l = e.pswp.viewportSize : l = _s(o, e);
    const f = Es(o, l, s, t);
    r.update(i.width, i.height, f);
  }
  return i.lazyLoad(), r && i.setDisplayedSize(Math.ceil(i.width * r.initial), Math.ceil(i.height * r.initial)), i;
}
function Ts(s, e) {
  const t = e.getItemData(s);
  if (!e.dispatch("lazyLoadSlide", {
    index: s,
    itemData: t
  }).defaultPrevented)
    return Oi(t, e, s);
}
class Ss extends ps {
  /**
   * Get total number of slides
   *
   * @returns {number}
   */
  getNumItems() {
    var e;
    let t = 0;
    const i = (e = this.options) === null || e === void 0 ? void 0 : e.dataSource;
    i && "length" in i ? t = i.length : i && "gallery" in i && (i.items || (i.items = this._getGalleryDOMElements(i.gallery)), i.items && (t = i.items.length));
    const r = this.dispatch("numItems", {
      dataSource: i,
      numItems: t
    });
    return this.applyFilters("numItems", r.numItems, i);
  }
  /**
   * @param {SlideData} slideData
   * @param {number} index
   * @returns {Content}
   */
  createContentFromData(e, t) {
    return new gs(e, this, t);
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
    var t;
    const i = (t = this.options) === null || t === void 0 ? void 0 : t.dataSource;
    let r = {};
    Array.isArray(i) ? r = i[e] : i && "gallery" in i && (i.items || (i.items = this._getGalleryDOMElements(i.gallery)), r = i.items[e]);
    let o = r;
    o instanceof Element && (o = this._domElementToItemData(o));
    const l = this.dispatch("itemData", {
      itemData: o || {},
      index: e
    });
    return this.applyFilters("itemData", l.itemData, e);
  }
  /**
   * Get array of gallery DOM elements,
   * based on childSelector and gallery element.
   *
   * @param {HTMLElement} galleryElement
   * @returns {HTMLElement[]}
   */
  _getGalleryDOMElements(e) {
    var t, i;
    return (t = this.options) !== null && t !== void 0 && t.children || (i = this.options) !== null && i !== void 0 && i.childSelector ? De(this.options.children, this.options.childSelector, e) || [] : [e];
  }
  /**
   * Converts DOM element to item data object.
   *
   * @param {HTMLElement} element DOM element
   * @returns {SlideData}
   */
  _domElementToItemData(e) {
    const t = {
      element: e
    }, i = (
      /** @type {HTMLAnchorElement} */
      e.tagName === "A" ? e : e.querySelector("a")
    );
    if (i) {
      t.src = i.dataset.pswpSrc || i.href, i.dataset.pswpSrcset && (t.srcset = i.dataset.pswpSrcset), t.width = i.dataset.pswpWidth ? parseInt(i.dataset.pswpWidth, 10) : 0, t.height = i.dataset.pswpHeight ? parseInt(i.dataset.pswpHeight, 10) : 0, t.w = t.width, t.h = t.height, i.dataset.pswpType && (t.type = i.dataset.pswpType);
      const o = e.querySelector("img");
      if (o) {
        var r;
        t.msrc = o.currentSrc || o.src, t.alt = (r = o.getAttribute("alt")) !== null && r !== void 0 ? r : "";
      }
      (i.dataset.pswpCropped || i.dataset.cropped) && (t.thumbCropped = !0);
    }
    return this.applyFilters("domItemData", t, e, i);
  }
  /**
   * Lazy-load by slide data
   *
   * @param {SlideData} itemData Data about the slide
   * @param {number} index
   * @returns {Content} Image that is being decoded or false.
   */
  lazyLoadData(e, t) {
    return Oi(e, this, t);
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
    let t = {
      x: e.clientX,
      y: e.clientY
    };
    !t.x && !t.y && (t = null);
    let i = this.getClickedIndex(e);
    i = this.applyFilters("clickedIndex", i, e, this);
    const r = {
      gallery: (
        /** @type {HTMLElement} */
        e.currentTarget
      )
    };
    i >= 0 && (e.preventDefault(), this.loadAndOpen(i, r, t));
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
    const t = (
      /** @type {HTMLElement} */
      e.target
    ), r = De(
      this.options.children,
      this.options.childSelector,
      /** @type {HTMLElement} */
      e.currentTarget
    ).findIndex((o) => o === t || o.contains(t));
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
  loadAndOpen(e, t, i) {
    if (window.pswp || !this.options)
      return !1;
    if (!t && this.options.gallery && this.options.children) {
      const r = De(this.options.gallery);
      r[0] && (t = {
        gallery: r[0]
      });
    }
    return this.options.index = e, this.options.initialPointerPos = i, this.shouldOpen = !0, this.preload(e, t), !0;
  }
  /**
   * Load the main module and the slide content by index
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   */
  preload(e, t) {
    const {
      options: i
    } = this;
    t && (i.dataSource = t);
    const r = [], o = typeof i.pswpModule;
    if (ds(i.pswpModule))
      r.push(Promise.resolve(
        /** @type {Type<PhotoSwipe>} */
        i.pswpModule
      ));
    else {
      if (o === "string")
        throw new Error("pswpModule as string is no longer supported");
      if (o === "function")
        r.push(
          /** @type {() => Promise<Type<PhotoSwipe>>} */
          i.pswpModule()
        );
      else
        throw new Error("pswpModule is not valid");
    }
    typeof i.openPromise == "function" && r.push(i.openPromise()), i.preloadFirstSlide !== !1 && e >= 0 && (this._preloadedContent = Ts(e, this));
    const l = ++this._uid;
    Promise.all(r).then((f) => {
      if (this.shouldOpen) {
        const E = f[0];
        this._openPhotoswipe(E, l);
      }
    });
  }
  /**
   * @private
   * @param {Type<PhotoSwipe> | { default: Type<PhotoSwipe> }} module
   * @param {number} uid
   */
  _openPhotoswipe(e, t) {
    if (t !== this._uid && this.shouldOpen || (this.shouldOpen = !1, window.pswp))
      return;
    const i = typeof e == "object" ? new e.default(this.options) : new e(this.options);
    this.pswp = i, window.pswp = i, Object.keys(this._listeners).forEach((r) => {
      var o;
      (o = this._listeners[r]) === null || o === void 0 || o.forEach((l) => {
        i.on(
          r,
          /** @type {EventCallback<typeof name>} */
          l
        );
      });
    }), Object.keys(this._filters).forEach((r) => {
      var o;
      (o = this._filters[r]) === null || o === void 0 || o.forEach((l) => {
        i.addFilter(r, l.fn, l.priority);
      });
    }), this._preloadedContent && (i.contentLoader.addToCache(this._preloadedContent), this._preloadedContent = void 0), i.on("destroy", () => {
      this.pswp = void 0, delete window.pswp;
    }), i.init();
  }
  /**
   * Unbinds all events, closes PhotoSwipe if it's open.
   */
  destroy() {
    var e;
    (e = this.pswp) === null || e === void 0 || e.destroy(), this.shouldOpen = !1, this._listeners = {}, De(this.options.gallery, this.options.gallerySelector).forEach((t) => {
      t.removeEventListener("click", this.onThumbnailsClick, !1);
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
      async fetchPhotos(i) {
        this.loading = !0, this.error = null;
        try {
          const r = await fetch(i);
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
  entries: Ii,
  setPrototypeOf: di,
  isFrozen: bs,
  getPrototypeOf: ws,
  getOwnPropertyDescriptor: Ns
} = Object;
let {
  freeze: k,
  seal: G,
  create: vt
} = Object, {
  apply: bt,
  construct: wt
} = typeof Reflect < "u" && Reflect;
k || (k = function(e) {
  return e;
});
G || (G = function(e) {
  return e;
});
bt || (bt = function(e, t) {
  for (var i = arguments.length, r = new Array(i > 2 ? i - 2 : 0), o = 2; o < i; o++)
    r[o - 2] = arguments[o];
  return e.apply(t, r);
});
wt || (wt = function(e) {
  for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    i[r - 1] = arguments[r];
  return new e(...i);
});
const Be = M(Array.prototype.forEach), Os = M(Array.prototype.lastIndexOf), fi = M(Array.prototype.pop), Ae = M(Array.prototype.push), Is = M(Array.prototype.splice), je = M(String.prototype.toLowerCase), ht = M(String.prototype.toString), dt = M(String.prototype.match), ve = M(String.prototype.replace), Ds = M(String.prototype.indexOf), Ps = M(String.prototype.trim), $ = M(Object.prototype.hasOwnProperty), R = M(RegExp.prototype.test), be = Ls(TypeError);
function M(s) {
  return function(e) {
    e instanceof RegExp && (e.lastIndex = 0);
    for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
      i[r - 1] = arguments[r];
    return bt(s, e, i);
  };
}
function Ls(s) {
  return function() {
    for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
      t[i] = arguments[i];
    return wt(s, t);
  };
}
function m(s, e) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : je;
  di && di(s, null);
  let i = e.length;
  for (; i--; ) {
    let r = e[i];
    if (typeof r == "string") {
      const o = t(r);
      o !== r && (bs(e) || (e[i] = o), r = o);
    }
    s[r] = !0;
  }
  return s;
}
function Cs(s) {
  for (let e = 0; e < s.length; e++)
    $(s, e) || (s[e] = null);
  return s;
}
function K(s) {
  const e = vt(null);
  for (const [t, i] of Ii(s))
    $(s, t) && (Array.isArray(i) ? e[t] = Cs(i) : i && typeof i == "object" && i.constructor === Object ? e[t] = K(i) : e[t] = i);
  return e;
}
function we(s, e) {
  for (; s !== null; ) {
    const i = Ns(s, e);
    if (i) {
      if (i.get)
        return M(i.get);
      if (typeof i.value == "function")
        return M(i.value);
    }
    s = ws(s);
  }
  function t() {
    return null;
  }
  return t;
}
const pi = k(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), ft = k(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), pt = k(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), Rs = k(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), mt = k(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), ks = k(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), mi = k(["#text"]), gi = k(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]), gt = k(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), _i = k(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), $e = k(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), Ms = G(/\{\{[\w\W]*|[\w\W]*\}\}/gm), xs = G(/<%[\w\W]*|[\w\W]*%>/gm), Fs = G(/\$\{[\w\W]*/gm), zs = G(/^data-[\-\w.\u00B7-\uFFFF]+$/), Us = G(/^aria-[\-\w]+$/), Di = G(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), Hs = G(/^(?:\w+script|data):/i), Vs = G(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), Pi = G(/^html$/i), Gs = G(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Ei = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR: Us,
  ATTR_WHITESPACE: Vs,
  CUSTOM_ELEMENT: Gs,
  DATA_ATTR: zs,
  DOCTYPE_NAME: Pi,
  ERB_EXPR: xs,
  IS_ALLOWED_URI: Di,
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
}, Bs = function(e, t) {
  if (typeof e != "object" || typeof e.createPolicy != "function")
    return null;
  let i = null;
  const r = "data-tt-policy-suffix";
  t && t.hasAttribute(r) && (i = t.getAttribute(r));
  const o = "dompurify" + (i ? "#" + i : "");
  try {
    return e.createPolicy(o, {
      createHTML(l) {
        return l;
      },
      createScriptURL(l) {
        return l;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + o + " could not be created."), null;
  }
}, yi = function() {
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
function Li() {
  let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Ws();
  const e = (d) => Li(d);
  if (e.version = "3.3.1", e.removed = [], !s || !s.document || s.document.nodeType !== Ne.document || !s.Element)
    return e.isSupported = !1, e;
  let {
    document: t
  } = s;
  const i = t, r = i.currentScript, {
    DocumentFragment: o,
    HTMLTemplateElement: l,
    Node: f,
    Element: E,
    NodeFilter: _,
    NamedNodeMap: T = s.NamedNodeMap || s.MozNamedAttrMap,
    HTMLFormElement: v,
    DOMParser: C,
    trustedTypes: N
  } = s, x = E.prototype, _e = we(x, "cloneNode"), Re = we(x, "remove"), ke = we(x, "nextSibling"), Ye = we(x, "childNodes"), oe = we(x, "parentNode");
  if (typeof l == "function") {
    const d = t.createElement("template");
    d.content && d.content.ownerDocument && (t = d.content.ownerDocument);
  }
  let b, j = "";
  const {
    implementation: ae,
    createNodeIterator: p,
    createDocumentFragment: It,
    getElementsByTagName: Y
  } = t, {
    importNode: h
  } = i;
  let c = yi();
  e.isSupported = typeof Ii == "function" && typeof oe == "function" && ae && ae.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: g,
    ERB_EXPR: P,
    TMPLIT_EXPR: Z,
    DATA_ATTR: Ee,
    ARIA_ATTR: Xe,
    IS_SCRIPT_OR_DATA: qe,
    ATTR_WHITESPACE: te,
    CUSTOM_ELEMENT: F
  } = Ei;
  let {
    IS_ALLOWED_URI: Dt
  } = Ei, O = null;
  const Pt = m({}, [...pi, ...ft, ...pt, ...mt, ...mi]);
  let I = null;
  const Lt = m({}, [...gi, ...gt, ..._i, ...$e]);
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
  let Ct = !0, Ze = !0, Rt = !1, kt = !0, ce = !1, Me = !0, ie = !1, Je = !1, Qe = !1, ue = !1, xe = !1, Fe = !1, Mt = !0, xt = !1;
  const Ri = "user-content-";
  let et = !0, Te = !1, he = {}, X = null;
  const tt = m({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let Ft = null;
  const zt = m({}, ["audio", "video", "img", "source", "image", "track"]);
  let it = null;
  const Ut = m({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), ze = "http://www.w3.org/1998/Math/MathML", Ue = "http://www.w3.org/2000/svg", J = "http://www.w3.org/1999/xhtml";
  let de = J, st = !1, nt = null;
  const ki = m({}, [ze, Ue, J], ht);
  let He = m({}, ["mi", "mo", "mn", "ms", "mtext"]), Ve = m({}, ["annotation-xml"]);
  const Mi = m({}, ["title", "style", "font", "a", "script"]);
  let Se = null;
  const xi = ["application/xhtml+xml", "text/html"], Fi = "text/html";
  let w = null, fe = null;
  const zi = t.createElement("form"), Ht = function(n) {
    return n instanceof RegExp || n instanceof Function;
  }, rt = function() {
    let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!(fe && fe === n)) {
      if ((!n || typeof n != "object") && (n = {}), n = K(n), Se = // eslint-disable-next-line unicorn/prefer-includes
      xi.indexOf(n.PARSER_MEDIA_TYPE) === -1 ? Fi : n.PARSER_MEDIA_TYPE, w = Se === "application/xhtml+xml" ? ht : je, O = $(n, "ALLOWED_TAGS") ? m({}, n.ALLOWED_TAGS, w) : Pt, I = $(n, "ALLOWED_ATTR") ? m({}, n.ALLOWED_ATTR, w) : Lt, nt = $(n, "ALLOWED_NAMESPACES") ? m({}, n.ALLOWED_NAMESPACES, ht) : ki, it = $(n, "ADD_URI_SAFE_ATTR") ? m(K(Ut), n.ADD_URI_SAFE_ATTR, w) : Ut, Ft = $(n, "ADD_DATA_URI_TAGS") ? m(K(zt), n.ADD_DATA_URI_TAGS, w) : zt, X = $(n, "FORBID_CONTENTS") ? m({}, n.FORBID_CONTENTS, w) : tt, ye = $(n, "FORBID_TAGS") ? m({}, n.FORBID_TAGS, w) : K({}), Ke = $(n, "FORBID_ATTR") ? m({}, n.FORBID_ATTR, w) : K({}), he = $(n, "USE_PROFILES") ? n.USE_PROFILES : !1, Ct = n.ALLOW_ARIA_ATTR !== !1, Ze = n.ALLOW_DATA_ATTR !== !1, Rt = n.ALLOW_UNKNOWN_PROTOCOLS || !1, kt = n.ALLOW_SELF_CLOSE_IN_ATTR !== !1, ce = n.SAFE_FOR_TEMPLATES || !1, Me = n.SAFE_FOR_XML !== !1, ie = n.WHOLE_DOCUMENT || !1, ue = n.RETURN_DOM || !1, xe = n.RETURN_DOM_FRAGMENT || !1, Fe = n.RETURN_TRUSTED_TYPE || !1, Qe = n.FORCE_BODY || !1, Mt = n.SANITIZE_DOM !== !1, xt = n.SANITIZE_NAMED_PROPS || !1, et = n.KEEP_CONTENT !== !1, Te = n.IN_PLACE || !1, Dt = n.ALLOWED_URI_REGEXP || Di, de = n.NAMESPACE || J, He = n.MATHML_TEXT_INTEGRATION_POINTS || He, Ve = n.HTML_INTEGRATION_POINTS || Ve, S = n.CUSTOM_ELEMENT_HANDLING || {}, n.CUSTOM_ELEMENT_HANDLING && Ht(n.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (S.tagNameCheck = n.CUSTOM_ELEMENT_HANDLING.tagNameCheck), n.CUSTOM_ELEMENT_HANDLING && Ht(n.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (S.attributeNameCheck = n.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), n.CUSTOM_ELEMENT_HANDLING && typeof n.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (S.allowCustomizedBuiltInElements = n.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), ce && (Ze = !1), xe && (ue = !0), he && (O = m({}, mi), I = [], he.html === !0 && (m(O, pi), m(I, gi)), he.svg === !0 && (m(O, ft), m(I, gt), m(I, $e)), he.svgFilters === !0 && (m(O, pt), m(I, gt), m(I, $e)), he.mathMl === !0 && (m(O, mt), m(I, _i), m(I, $e))), n.ADD_TAGS && (typeof n.ADD_TAGS == "function" ? le.tagCheck = n.ADD_TAGS : (O === Pt && (O = K(O)), m(O, n.ADD_TAGS, w))), n.ADD_ATTR && (typeof n.ADD_ATTR == "function" ? le.attributeCheck = n.ADD_ATTR : (I === Lt && (I = K(I)), m(I, n.ADD_ATTR, w))), n.ADD_URI_SAFE_ATTR && m(it, n.ADD_URI_SAFE_ATTR, w), n.FORBID_CONTENTS && (X === tt && (X = K(X)), m(X, n.FORBID_CONTENTS, w)), n.ADD_FORBID_CONTENTS && (X === tt && (X = K(X)), m(X, n.ADD_FORBID_CONTENTS, w)), et && (O["#text"] = !0), ie && m(O, ["html", "head", "body"]), O.table && (m(O, ["tbody"]), delete ye.tbody), n.TRUSTED_TYPES_POLICY) {
        if (typeof n.TRUSTED_TYPES_POLICY.createHTML != "function")
          throw be('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        if (typeof n.TRUSTED_TYPES_POLICY.createScriptURL != "function")
          throw be('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        b = n.TRUSTED_TYPES_POLICY, j = b.createHTML("");
      } else
        b === void 0 && (b = Bs(N, r)), b !== null && typeof j == "string" && (j = b.createHTML(""));
      k && k(n), fe = n;
    }
  }, Vt = m({}, [...ft, ...pt, ...Rs]), Gt = m({}, [...mt, ...ks]), Ui = function(n) {
    let a = oe(n);
    (!a || !a.tagName) && (a = {
      namespaceURI: de,
      tagName: "template"
    });
    const u = je(n.tagName), y = je(a.tagName);
    return nt[n.namespaceURI] ? n.namespaceURI === Ue ? a.namespaceURI === J ? u === "svg" : a.namespaceURI === ze ? u === "svg" && (y === "annotation-xml" || He[y]) : !!Vt[u] : n.namespaceURI === ze ? a.namespaceURI === J ? u === "math" : a.namespaceURI === Ue ? u === "math" && Ve[y] : !!Gt[u] : n.namespaceURI === J ? a.namespaceURI === Ue && !Ve[y] || a.namespaceURI === ze && !He[y] ? !1 : !Gt[u] && (Mi[u] || !Vt[u]) : !!(Se === "application/xhtml+xml" && nt[n.namespaceURI]) : !1;
  }, q = function(n) {
    Ae(e.removed, {
      element: n
    });
    try {
      oe(n).removeChild(n);
    } catch {
      Re(n);
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
          q(a);
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
        a = new C().parseFromString(y, Se);
      } catch {
      }
    if (!a || !a.documentElement) {
      a = ae.createDocument(de, "template", null);
      try {
        a.documentElement.innerHTML = st ? j : y;
      } catch {
      }
    }
    const L = a.body || a.documentElement;
    return n && u && L.insertBefore(t.createTextNode(u), L.childNodes[0] || null), de === J ? Y.call(a, ie ? "html" : "body")[0] : ie ? a.documentElement : L;
  }, Bt = function(n) {
    return p.call(
      n.ownerDocument || n,
      n,
      // eslint-disable-next-line no-bitwise
      _.SHOW_ELEMENT | _.SHOW_COMMENT | _.SHOW_TEXT | _.SHOW_PROCESSING_INSTRUCTION | _.SHOW_CDATA_SECTION,
      null
    );
  }, ot = function(n) {
    return n instanceof v && (typeof n.nodeName != "string" || typeof n.textContent != "string" || typeof n.removeChild != "function" || !(n.attributes instanceof T) || typeof n.removeAttribute != "function" || typeof n.setAttribute != "function" || typeof n.namespaceURI != "string" || typeof n.insertBefore != "function" || typeof n.hasChildNodes != "function");
  }, $t = function(n) {
    return typeof f == "function" && n instanceof f;
  };
  function Q(d, n, a) {
    Be(d, (u) => {
      u.call(e, n, a, fe);
    });
  }
  const jt = function(n) {
    let a = null;
    if (Q(c.beforeSanitizeElements, n, null), ot(n))
      return q(n), !0;
    const u = w(n.nodeName);
    if (Q(c.uponSanitizeElement, n, {
      tagName: u,
      allowedTags: O
    }), Me && n.hasChildNodes() && !$t(n.firstElementChild) && R(/<[/\w!]/g, n.innerHTML) && R(/<[/\w!]/g, n.textContent) || n.nodeType === Ne.progressingInstruction || Me && n.nodeType === Ne.comment && R(/<[/\w]/g, n.data))
      return q(n), !0;
    if (!(le.tagCheck instanceof Function && le.tagCheck(u)) && (!O[u] || ye[u])) {
      if (!ye[u] && Xt(u) && (S.tagNameCheck instanceof RegExp && R(S.tagNameCheck, u) || S.tagNameCheck instanceof Function && S.tagNameCheck(u)))
        return !1;
      if (et && !X[u]) {
        const y = oe(n) || n.parentNode, L = Ye(n) || n.childNodes;
        if (L && y) {
          const A = L.length;
          for (let z = A - 1; z >= 0; --z) {
            const ee = _e(L[z], !0);
            ee.__removalCount = (n.__removalCount || 0) + 1, y.insertBefore(ee, ke(n));
          }
        }
      }
      return q(n), !0;
    }
    return n instanceof E && !Ui(n) || (u === "noscript" || u === "noembed" || u === "noframes") && R(/<\/no(script|embed|frames)/i, n.innerHTML) ? (q(n), !0) : (ce && n.nodeType === Ne.text && (a = n.textContent, Be([g, P, Z], (y) => {
      a = ve(a, y, " ");
    }), n.textContent !== a && (Ae(e.removed, {
      element: n.cloneNode()
    }), n.textContent = a)), Q(c.afterSanitizeElements, n, null), !1);
  }, Yt = function(n, a, u) {
    if (Mt && (a === "id" || a === "name") && (u in t || u in zi))
      return !1;
    if (!(Ze && !Ke[a] && R(Ee, a))) {
      if (!(Ct && R(Xe, a))) {
        if (!(le.attributeCheck instanceof Function && le.attributeCheck(a, n))) {
          if (!I[a] || Ke[a]) {
            if (
              // First condition does a very basic check if a) it's basically a valid custom element tagname AND
              // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
              !(Xt(n) && (S.tagNameCheck instanceof RegExp && R(S.tagNameCheck, n) || S.tagNameCheck instanceof Function && S.tagNameCheck(n)) && (S.attributeNameCheck instanceof RegExp && R(S.attributeNameCheck, a) || S.attributeNameCheck instanceof Function && S.attributeNameCheck(a, n)) || // Alternative, second condition checks if it's an `is`-attribute, AND
              // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
              a === "is" && S.allowCustomizedBuiltInElements && (S.tagNameCheck instanceof RegExp && R(S.tagNameCheck, u) || S.tagNameCheck instanceof Function && S.tagNameCheck(u)))
            ) return !1;
          } else if (!it[a]) {
            if (!R(Dt, ve(u, te, ""))) {
              if (!((a === "src" || a === "xlink:href" || a === "href") && n !== "script" && Ds(u, "data:") === 0 && Ft[n])) {
                if (!(Rt && !R(qe, ve(u, te, "")))) {
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
    Q(c.beforeSanitizeAttributes, n, null);
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
      if (u.attrName = pe, u.attrValue = D, u.keepAttr = !0, u.forceKeepAttr = void 0, Q(c.uponSanitizeAttribute, n, u), D = u.attrValue, xt && (pe === "id" || pe === "name") && (se(A, n), D = Ri + D), Me && R(/((--!?|])>)|<\/(style|title|textarea)/i, D)) {
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
      if (!kt && R(/\/>/i, D)) {
        se(A, n);
        continue;
      }
      ce && Be([g, P, Z], (Zt) => {
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
          z ? n.setAttributeNS(z, A, D) : n.setAttribute(A, D), ot(n) ? q(n) : fi(e.removed);
        } catch {
          se(A, n);
        }
    }
    Q(c.afterSanitizeAttributes, n, null);
  }, Hi = function d(n) {
    let a = null;
    const u = Bt(n);
    for (Q(c.beforeSanitizeShadowDOM, n, null); a = u.nextNode(); )
      Q(c.uponSanitizeShadowNode, a, null), jt(a), qt(a), a.content instanceof o && d(a.content);
    Q(c.afterSanitizeShadowDOM, n, null);
  };
  return e.sanitize = function(d) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = null, u = null, y = null, L = null;
    if (st = !d, st && (d = "<!-->"), typeof d != "string" && !$t(d))
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
        return ue ? null : Fe ? j : "";
    }
    a && Qe && q(a.firstChild);
    const A = Bt(Te ? d : a);
    for (; y = A.nextNode(); )
      jt(y), qt(y), y.content instanceof o && Hi(y.content);
    if (Te)
      return d;
    if (ue) {
      if (xe)
        for (L = It.call(a.ownerDocument); a.firstChild; )
          L.appendChild(a.firstChild);
      else
        L = a;
      return (I.shadowroot || I.shadowrootmode) && (L = h.call(i, L, !0)), L;
    }
    let z = ie ? a.outerHTML : a.innerHTML;
    return ie && O["!doctype"] && a.ownerDocument && a.ownerDocument.doctype && a.ownerDocument.doctype.name && R(Pi, a.ownerDocument.doctype.name) && (z = "<!DOCTYPE " + a.ownerDocument.doctype.name + `>
` + z), ce && Be([g, P, Z], (ee) => {
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
    typeof n == "function" && Ae(c[d], n);
  }, e.removeHook = function(d, n) {
    if (n !== void 0) {
      const a = Os(c[d], n);
      return a === -1 ? void 0 : Is(c[d], a, 1)[0];
    }
    return fi(c[d]);
  }, e.removeHooks = function(d) {
    c[d] = [];
  }, e.removeAllHooks = function() {
    c = yi();
  }, e;
}
var $s = Li();
const Ci = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [i, r] of e)
    t[i] = r;
  return t;
}, js = {
  name: "Image",
  props: {
    image: {
      type: Object,
      required: !0
    },
    enableLightbox: { type: Boolean, default: !0 }
  },
  data() {
    return {
      imageEnlarged: !1
    };
  },
  computed: {
    descriptionHtml() {
      var t, i;
      const s = ((t = this.image) == null ? void 0 : t.title) || "", e = (i = this.image) != null && i.description ? this.image.description._content || this.image.description : "";
      return `<b>${s}</b><br>${e}`;
    },
    sanitizedDescription() {
      return $s.sanitize(this.descriptionHtml, { USE_PROFILES: { html: !0 } });
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
}, Ys = ["href", "data-pswp-width", "data-pswp-height"], Xs = ["innerHTML"], qs = ["src", "alt"], Ks = { key: 1 }, Zs = ["innerHTML"], Js = ["src", "alt"];
function Qs(s, e, t, i, r, o) {
  return t.enableLightbox ? (W(), B("a", {
    key: 0,
    class: "pswp-gallery__item",
    href: t.image.url_l || t.image.url_m,
    "data-pswp-width": t.image.width_l || t.image.width_m,
    "data-pswp-height": t.image.height_l || t.image.height_m,
    target: "_blank",
    rel: "noopener noreferrer"
  }, [
    U("span", {
      class: "hidden-caption-content",
      innerHTML: o.sanitizedDescription
    }, null, 8, Xs),
    U("img", {
      src: t.image.url_m || t.image.url_l,
      alt: t.image.title,
      onMouseover: e[0] || (e[0] = (...l) => o.enlargeImage && o.enlargeImage(...l)),
      onMouseout: e[1] || (e[1] = (...l) => o.shrinkImage && o.shrinkImage(...l)),
      loading: "lazy",
      decoding: "async",
      class: ei({
        "img-default-size": !0,
        "img-enlarged-size": r.imageEnlarged
      })
    }, null, 42, qs)
  ], 8, Ys)) : (W(), B("div", Ks, [
    U("span", {
      class: "hidden-caption-content",
      innerHTML: o.sanitizedDescription
    }, null, 8, Zs),
    U("img", {
      src: t.image.url_m || t.image.url_l,
      alt: t.image.title,
      onMouseover: e[2] || (e[2] = (...l) => o.enlargeImage && o.enlargeImage(...l)),
      onMouseout: e[3] || (e[3] = (...l) => o.shrinkImage && o.shrinkImage(...l)),
      loading: "lazy",
      decoding: "async",
      class: ei({
        "img-default-size": !0,
        "img-enlarged-size": r.imageEnlarged
      })
    }, null, 42, Js)
  ]));
}
const en = /* @__PURE__ */ Ci(js, [["render", Qs]]), tn = {
  name: "FlickrGallery",
  components: { Image: en },
  props: {
    title: String,
    useNavigation: { type: Boolean, default: !0 },
    showPage: { type: Boolean, default: !0 },
    apiKey: { type: String, required: !0 },
    userId: { type: String, required: !0 },
    method: { type: String, default: "flickr.photos.search" },
    photosetId: { type: String, default: "" },
    tags: { type: String, default: "" },
    extras: { type: String, default: "" },
    perPage: { type: Number, default: 18 },
    importCss: { type: Boolean, default: !0 },
    enableLightbox: { type: Boolean, default: !0 }
  },
  data: () => ({
    galleryID: "flickr",
    endpoint: "https://www.flickr.com/services/rest/",
    page: 1,
    totalPictures: 0,
    totalPages: 0,
    defaultExtras: "url_m,url_l,owner_name,description",
    // https://www.flickr.com/services/api/flickr.photos.search.html
    loading: !1,
    flickrStore: null
  }),
  async beforeMount() {
    const s = "flickr-" + this.$.uid;
    if (this.galleryID = this.galleryID + "-" + this.$.uid, this.flickrStore = vs(s), console.debug("importiere css:", this.importCss), this.importCss)
      try {
        const e = [Promise.resolve({                  })];
        this.enableLightbox && e.push(Promise.resolve({               })), await Promise.all(e);
      } catch (e) {
        console.error("CSS konnte nicht geladen werden:", e);
      }
    this.extras && (this.defaultExtras = this.extras), await this.loadFlickrPhotos();
  },
  mounted() {
    this.enableLightbox && this.initLightbox();
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
            onInit: (t) => {
              e.pswp.on("change", () => {
                const i = e.pswp.currSlide.data.element;
                let r = "";
                if (i) {
                  const o = i.querySelector(".hidden-caption-content");
                  o ? r = o.innerHTML : r = i.querySelector("img").getAttribute("alt");
                }
                t.innerHTML = r || "";
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
        s.set("method", this.method), s.set("api_key", this.apiKey), this.tags && s.set("tags", this.tags), this.userId && s.set("user_id", this.userId), this.photosetId && s.set("photoset_id", this.photosetId), s.set("format", "json"), s.set("page", String(this.page));
        const e = Number.isFinite(this.perPage) && this.perPage > 0 ? Math.min(this.perPage, 500) : 18;
        s.set("per_page", String(e)), s.set("extras", this.defaultExtras), s.set("nojsoncallback", "1");
        const t = `${this.endpoint}?${s.toString()}`;
        await this.flickrStore.fetchPhotos(t), this.totalPages = this.flickrStore.totalPages, this.totalPictures = this.flickrStore.totalPictures, this.loading = this.flickrStore.loading;
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
}, sn = ["id"], nn = {
  class: "flickr-container",
  ref: "flickr-container"
}, rn = { key: 0 }, on = {
  key: 1,
  class: "flickr-error",
  role: "alert"
}, an = {
  key: 2,
  class: "flickr-loading",
  "aria-busy": "true",
  "aria-live": "polite"
}, ln = {
  key: 3,
  class: "flickr-images"
}, cn = {
  key: 0,
  class: "flickr-navigation"
}, un = { class: "prev" }, hn = {
  key: 0,
  class: "current"
}, dn = { "aria-live": "polite" }, fn = { class: "next" };
function pn(s, e, t, i, r, o) {
  const l = Xi("Image");
  return W(), B("div", { id: s.galleryID }, [
    ti(qi, { name: "fade" }, {
      default: Ki(() => [
        U("div", nn, [
          t.title ? (W(), B("h2", rn, Ge(t.title), 1)) : ct("", !0),
          s.flickrStore.error ? (W(), B("div", on, [
            e[5] || (e[5] = U("strong", null, "Fehler:", -1)),
            Zi(" " + Ge(s.flickrStore.error) + " ", 1),
            U("button", {
              class: "flickr-retry",
              onClick: e[0] || (e[0] = (...f) => o.loadFlickrPhotos && o.loadFlickrPhotos(...f)),
              "aria-label": "Erneut laden"
            }, "Erneut laden")
          ])) : s.flickrStore.loading ? (W(), B("div", an, [...e[6] || (e[6] = [
            U("span", {
              class: "spinner",
              "aria-hidden": "true"
            }, null, -1),
            U("span", { class: "loading-text" }, "Lade Bilder…", -1)
          ])])) : (W(), B("div", ln, [
            (W(!0), B(Ji, null, Qi(s.flickrStore.photos, (f, E) => (W(), B("span", {
              key: f.id ?? E
            }, [
              ti(l, {
                image: f,
                enableLightbox: t.enableLightbox
              }, null, 8, ["image", "enableLightbox"])
            ]))), 128))
          ]))
        ], 512)
      ]),
      _: 1
    }),
    t.useNavigation ? (W(), B("div", cn, [
      U("span", un, [
        U("button", {
          onClick: e[1] || (e[1] = (...f) => o.previousPage && o.previousPage(...f)),
          onKeyup: e[2] || (e[2] = ii((...f) => o.previousPage && o.previousPage(...f), ["left"])),
          "aria-label": "Vorherige Seite"
        }, " << ", 32)
      ]),
      t.showPage ? (W(), B("span", hn, [
        U("span", dn, "Page " + Ge(s.page) + "/" + Ge(s.totalPages), 1)
      ])) : ct("", !0),
      U("span", fn, [
        U("button", {
          onClick: e[3] || (e[3] = (...f) => o.nextPage && o.nextPage(...f)),
          onKeyup: e[4] || (e[4] = ii((...f) => o.nextPage && o.nextPage(...f), ["right"])),
          "aria-label": "Nächste Seite"
        }, " >> ", 32)
      ])
    ])) : ct("", !0)
  ], 8, sn);
}
const mn = /* @__PURE__ */ Ci(tn, [["render", pn]]), gn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: mn
}, Symbol.toStringTag, { value: "Module" })), En = {
  install(s, e = {}) {
    const { pinia: t } = e;
    if (!t) {
      console.error("[FlickrGallery] Missing { pinia } option during install");
      return;
    }
    rs(t), t && Array.isArray(t._p) && !t._p.includes(ci) && t.use(ci), s.component(
      "FlickrGallery",
      es(() => Promise.resolve().then(() => gn))
    );
  }
};
export {
  mn as FlickrGalleryComponent,
  En as FlickrGalleryPlugin,
  En as default
};
