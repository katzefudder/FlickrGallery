import { hasInjectionContext as es, inject as ts, getCurrentInstance as ss, ref as Et, reactive as ns, markRaw as ee, effectScope as rs, isRef as oe, isReactive as je, toRef as Pe, toRaw as is, nextTick as We, computed as wt, getCurrentScope as os, onScopeDispose as as, watch as ls, toRefs as Je, createElementBlock as j, openBlock as $, createElementVNode as M, normalizeClass as cs, resolveComponent as us, createVNode as Ke, createCommentVNode as Ne, Transition as ds, withCtx as hs, normalizeStyle as fs, toDisplayString as Ae, Fragment as ps, renderList as ms, withKeys as Ge, defineAsyncComponent as gs } from "vue";
/*!
 * pinia v3.0.2
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let te;
const ae = (e) => te = e, ys = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function H(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var ie;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(ie || (ie = {}));
const se = typeof window < "u";
function bt(e, t) {
  for (const n in t) {
    const s = t[n];
    if (!(n in e))
      continue;
    const r = e[n];
    H(r) && H(s) && !oe(s) && !je(s) ? e[n] = bt(r, s) : e[n] = s;
  }
  return e;
}
const _t = () => {
};
function Xe(e, t, n, s = _t) {
  e.push(t);
  const r = () => {
    const i = e.indexOf(t);
    i > -1 && (e.splice(i, 1), s());
  };
  return !n && os() && as(r), r;
}
function J(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const Es = (e) => e(), Ze = Symbol(), ve = Symbol();
function De(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, s) => e.set(s, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const s = t[n], r = e[n];
    H(r) && H(s) && e.hasOwnProperty(n) && !oe(s) && !je(s) ? e[n] = De(r, s) : e[n] = s;
  }
  return e;
}
const ws = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function bs(e) {
  return !H(e) || !Object.prototype.hasOwnProperty.call(e, ws);
}
const { assign: F } = Object;
function Ye(e) {
  return !!(oe(e) && e.effect);
}
function Qe(e, t, n, s) {
  const { state: r, actions: i, getters: o } = t, a = n.state.value[e];
  let d;
  function u() {
    !a && (process.env.NODE_ENV === "production" || !s) && (n.state.value[e] = r ? r() : {});
    const c = process.env.NODE_ENV !== "production" && s ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Je(Et(r ? r() : {}).value)
    ) : Je(n.state.value[e]);
    return F(c, i, Object.keys(o || {}).reduce((h, b) => (process.env.NODE_ENV !== "production" && b in c && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${b}" in store "${e}".`), h[b] = ee(wt(() => {
      ae(n);
      const _ = n._s.get(e);
      return o[b].call(_, _);
    })), h), {}));
  }
  return d = ke(e, u, t, n, s, !0), d;
}
function ke(e, t, n = {}, s, r, i) {
  let o;
  const a = F({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !s._e.active)
    throw new Error("Pinia destroyed");
  const d = { deep: !0 };
  process.env.NODE_ENV !== "production" && (d.onTrigger = (g) => {
    u ? _ = g : u == !1 && !y._hotUpdating && (Array.isArray(_) ? _.push(g) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let u, c, h = [], b = [], _;
  const f = s.state.value[e];
  !i && !f && (process.env.NODE_ENV === "production" || !r) && (s.state.value[e] = {});
  const E = Et({});
  let m;
  function S(g) {
    let p;
    u = c = !1, process.env.NODE_ENV !== "production" && (_ = []), typeof g == "function" ? (g(s.state.value[e]), p = {
      type: ie.patchFunction,
      storeId: e,
      events: _
    }) : (De(s.state.value[e], g), p = {
      type: ie.patchObject,
      payload: g,
      storeId: e,
      events: _
    });
    const O = m = Symbol();
    We().then(() => {
      m === O && (u = !0);
    }), c = !0, J(h, p, s.state.value[e]);
  }
  const R = i ? function() {
    const { state: p } = n, O = p ? p() : {};
    this.$patch((D) => {
      F(D, O);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : _t
  );
  function N() {
    o.stop(), h = [], b = [], s._s.delete(e);
  }
  const x = (g, p = "") => {
    if (Ze in g)
      return g[ve] = p, g;
    const O = function() {
      ae(s);
      const D = Array.from(arguments), Z = [], Re = [];
      function Yt(k) {
        Z.push(k);
      }
      function Qt(k) {
        Re.push(k);
      }
      J(b, {
        args: D,
        name: O[ve],
        store: y,
        after: Yt,
        onError: Qt
      });
      let Y;
      try {
        Y = g.apply(this && this.$id === e ? this : y, D);
      } catch (k) {
        throw J(Re, k), k;
      }
      return Y instanceof Promise ? Y.then((k) => (J(Z, k), k)).catch((k) => (J(Re, k), Promise.reject(k))) : (J(Z, Y), Y);
    };
    return O[Ze] = !0, O[ve] = p, O;
  }, A = /* @__PURE__ */ ee({
    actions: {},
    getters: {},
    state: [],
    hotState: E
  }), L = {
    _p: s,
    // _s: scope,
    $id: e,
    $onAction: Xe.bind(null, b),
    $patch: S,
    $reset: R,
    $subscribe(g, p = {}) {
      const O = Xe(h, g, p.detached, () => D()), D = o.run(() => ls(() => s.state.value[e], (Z) => {
        (p.flush === "sync" ? c : u) && g({
          storeId: e,
          type: ie.direct,
          events: _
        }, Z);
      }, F({}, d, p)));
      return O;
    },
    $dispose: N
  }, y = ns(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && se ? F(
    {
      _hmrPayload: A,
      _customProperties: ee(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    L
    // must be added later
    // setupStore
  ) : L);
  s._s.set(e, y);
  const U = (s._a && s._a.runWithContext || Es)(() => s._e.run(() => (o = rs()).run(() => t({ action: x }))));
  for (const g in U) {
    const p = U[g];
    if (oe(p) && !Ye(p) || je(p))
      process.env.NODE_ENV !== "production" && r ? E.value[g] = Pe(U, g) : i || (f && bs(p) && (oe(p) ? p.value = f[g] : De(p, f[g])), s.state.value[e][g] = p), process.env.NODE_ENV !== "production" && A.state.push(g);
    else if (typeof p == "function") {
      const O = process.env.NODE_ENV !== "production" && r ? p : x(p, g);
      U[g] = O, process.env.NODE_ENV !== "production" && (A.actions[g] = p), a.actions[g] = p;
    } else process.env.NODE_ENV !== "production" && Ye(p) && (A.getters[g] = i ? (
      // @ts-expect-error
      n.getters[g]
    ) : p, se && (U._getters || // @ts-expect-error: same
    (U._getters = ee([]))).push(g));
  }
  if (F(y, U), F(is(y), U), Object.defineProperty(y, "$state", {
    get: () => process.env.NODE_ENV !== "production" && r ? E.value : s.state.value[e],
    set: (g) => {
      if (process.env.NODE_ENV !== "production" && r)
        throw new Error("cannot set hotState");
      S((p) => {
        F(p, g);
      });
    }
  }), process.env.NODE_ENV !== "production" && (y._hotUpdate = ee((g) => {
    y._hotUpdating = !0, g._hmrPayload.state.forEach((p) => {
      if (p in y.$state) {
        const O = g.$state[p], D = y.$state[p];
        typeof O == "object" && H(O) && H(D) ? bt(O, D) : g.$state[p] = D;
      }
      y[p] = Pe(g.$state, p);
    }), Object.keys(y.$state).forEach((p) => {
      p in g.$state || delete y[p];
    }), u = !1, c = !1, s.state.value[e] = Pe(g._hmrPayload, "hotState"), c = !0, We().then(() => {
      u = !0;
    });
    for (const p in g._hmrPayload.actions) {
      const O = g[p];
      y[p] = //
      x(O, p);
    }
    for (const p in g._hmrPayload.getters) {
      const O = g._hmrPayload.getters[p], D = i ? (
        // special handling of options api
        wt(() => (ae(s), O.call(y, y)))
      ) : O;
      y[p] = //
      D;
    }
    Object.keys(y._hmrPayload.getters).forEach((p) => {
      p in g._hmrPayload.getters || delete y[p];
    }), Object.keys(y._hmrPayload.actions).forEach((p) => {
      p in g._hmrPayload.actions || delete y[p];
    }), y._hmrPayload = g._hmrPayload, y._getters = g._getters, y._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && se) {
    const g = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
      Object.defineProperty(y, p, F({ value: y[p] }, g));
    });
  }
  return s._p.forEach((g) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && se) {
      const p = o.run(() => g({
        store: y,
        app: s._a,
        pinia: s,
        options: a
      }));
      Object.keys(p || {}).forEach((O) => y._customProperties.add(O)), F(y, p);
    } else
      F(y, o.run(() => g({
        store: y,
        app: s._a,
        pinia: s,
        options: a
      })));
  }), process.env.NODE_ENV !== "production" && y.$state && typeof y.$state == "object" && typeof y.$state.constructor == "function" && !y.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${y.$id}".`), f && i && n.hydrate && n.hydrate(y.$state, f), u = !0, c = !0, y;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function _s(e, t, n) {
  let s;
  const r = typeof t == "function";
  s = r ? n : t;
  function i(o, a) {
    const d = es();
    if (o = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && te && te._testing ? null : o) || (d ? ts(ys, null) : null), o && ae(o), process.env.NODE_ENV !== "production" && !te)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    o = te, o._s.has(e) || (r ? ke(e, t, s, o) : Qe(e, s, o), process.env.NODE_ENV !== "production" && (i._pinia = o));
    const u = o._s.get(e);
    if (process.env.NODE_ENV !== "production" && a) {
      const c = "__hot:" + e, h = r ? ke(c, t, s, o, !0) : Qe(c, F({}, s), o, !0);
      a._hotUpdate(h), delete o.state.value[c], o._s.delete(c);
    }
    if (process.env.NODE_ENV !== "production" && se) {
      const c = ss();
      if (c && c.proxy && // avoid adding stores that are just built for hot module replacement
      !a) {
        const h = c.proxy, b = "_pStores" in h ? h._pStores : h._pStores = {};
        b[e] = u;
      }
    }
    return u;
  }
  return i.$id = e, i;
}
function Ss(e) {
  ae(e);
}
const Os = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, Rs = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, Ps = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function Ns(e, t) {
  if (e === "__proto__" || e === "constructor" && t && typeof t == "object" && "prototype" in t) {
    As(e);
    return;
  }
  return t;
}
function As(e) {
  console.warn(`[destr] Dropping "${e}" key to prevent prototype pollution.`);
}
function vs(e, t = {}) {
  if (typeof e != "string")
    return e;
  if (e[0] === '"' && e[e.length - 1] === '"' && e.indexOf("\\") === -1)
    return e.slice(1, -1);
  const n = e.trim();
  if (n.length <= 9)
    switch (n.toLowerCase()) {
      case "true":
        return !0;
      case "false":
        return !1;
      case "undefined":
        return;
      case "null":
        return null;
      case "nan":
        return Number.NaN;
      case "infinity":
        return Number.POSITIVE_INFINITY;
      case "-infinity":
        return Number.NEGATIVE_INFINITY;
    }
  if (!Ps.test(e)) {
    if (t.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return e;
  }
  try {
    if (Os.test(e) || Rs.test(e)) {
      if (t.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(e, Ns);
    }
    return JSON.parse(e);
  } catch (s) {
    if (t.strict)
      throw s;
    return e;
  }
}
function Cs(e, t) {
  if (e == null)
    return;
  let n = e;
  for (let s = 0; s < t.length; s++) {
    if (n == null || n[t[s]] == null)
      return;
    n = n[t[s]];
  }
  return n;
}
function $e(e, t, n) {
  if (n.length === 0)
    return t;
  const s = n[0];
  return n.length > 1 && (t = $e(
    typeof e != "object" || e === null || !Object.prototype.hasOwnProperty.call(e, s) ? Number.isInteger(Number(n[1])) ? [] : {} : e[s],
    t,
    Array.prototype.slice.call(n, 1)
  )), Number.isInteger(Number(s)) && Array.isArray(e) ? e.slice()[s] : Object.assign({}, e, { [s]: t });
}
function St(e, t) {
  if (e == null || t.length === 0)
    return e;
  if (t.length === 1) {
    if (e == null)
      return e;
    if (Number.isInteger(t[0]) && Array.isArray(e))
      return Array.prototype.slice.call(e, 0).splice(t[0], 1);
    const n = {};
    for (const s in e)
      n[s] = e[s];
    return delete n[t[0]], n;
  }
  if (e[t[0]] == null) {
    if (Number.isInteger(t[0]) && Array.isArray(e))
      return Array.prototype.concat.call([], e);
    const n = {};
    for (const s in e)
      n[s] = e[s];
    return n;
  }
  return $e(
    e,
    St(
      e[t[0]],
      Array.prototype.slice.call(t, 1)
    ),
    [t[0]]
  );
}
function Ot(e, t) {
  return t.map((n) => n.split(".")).map((n) => [n, Cs(e, n)]).filter((n) => n[1] !== void 0).reduce((n, s) => $e(n, s[1], s[0]), {});
}
function Rt(e, t) {
  return t.map((n) => n.split(".")).reduce((n, s) => St(n, s), e);
}
function et(e, {
  storage: t,
  serializer: n,
  key: s,
  debug: r,
  pick: i,
  omit: o,
  beforeHydrate: a,
  afterHydrate: d
}, u, c = !0) {
  try {
    c && (a == null || a(u));
    const h = t.getItem(s);
    if (h) {
      const b = n.deserialize(h), _ = i ? Ot(b, i) : b, f = o ? Rt(_, o) : _;
      e.$patch(f);
    }
    c && (d == null || d(u));
  } catch (h) {
    r && console.error("[pinia-plugin-persistedstate]", h);
  }
}
function tt(e, {
  storage: t,
  serializer: n,
  key: s,
  debug: r,
  pick: i,
  omit: o
}) {
  try {
    const a = i ? Ot(e, i) : e, d = o ? Rt(a, o) : a, u = n.serialize(d);
    t.setItem(s, u);
  } catch (a) {
    r && console.error("[pinia-plugin-persistedstate]", a);
  }
}
function Ts(e, t, n) {
  const { pinia: s, store: r, options: { persist: i = n } } = e;
  if (!i)
    return;
  if (!(r.$id in s.state.value)) {
    const d = s._s.get(r.$id.replace("__hot:", ""));
    d && Promise.resolve().then(() => d.$persist());
    return;
  }
  const a = (Array.isArray(i) ? i : i === !0 ? [{}] : [i]).map(t);
  r.$hydrate = ({ runHooks: d = !0 } = {}) => {
    a.forEach((u) => {
      et(r, u, e, d);
    });
  }, r.$persist = () => {
    a.forEach((d) => {
      tt(r.$state, d);
    });
  }, a.forEach((d) => {
    et(r, d, e), r.$subscribe(
      (u, c) => tt(c, d),
      { detached: !0 }
    );
  });
}
function xs(e = {}) {
  return function(t) {
    Ts(
      t,
      (n) => ({
        key: (e.key ? e.key : (s) => s)(n.key ?? t.store.$id),
        debug: n.debug ?? e.debug ?? !1,
        serializer: n.serializer ?? e.serializer ?? {
          serialize: (s) => JSON.stringify(s),
          deserialize: (s) => vs(s)
        },
        storage: n.storage ?? e.storage ?? window.localStorage,
        beforeHydrate: n.beforeHydrate,
        afterHydrate: n.afterHydrate,
        pick: n.pick,
        omit: n.omit
      }),
      e.auto ?? !1
    );
  };
}
var st = xs();
/*!
  * PhotoSwipe Lightbox 5.4.4 - https://photoswipe.com
  * (c) 2024 Dmytro Semenov
  */
function ne(e, t, n) {
  const s = document.createElement(t);
  return e && (s.className = e), n && n.appendChild(s), s;
}
function Ds(e, t, n) {
  let s = `translate3d(${e}px,0px,0)`;
  return n !== void 0 && (s += ` scale3d(${n},${n},1)`), s;
}
function Ie(e, t, n) {
  e.style.width = typeof t == "number" ? `${t}px` : t, e.style.height = typeof n == "number" ? `${n}px` : n;
}
const I = {
  IDLE: "idle",
  LOADING: "loading",
  LOADED: "loaded",
  ERROR: "error"
};
function ks(e) {
  return "button" in e && e.button === 1 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey;
}
function re(e, t, n = document) {
  let s = [];
  if (e instanceof Element)
    s = [e];
  else if (e instanceof NodeList || Array.isArray(e))
    s = Array.from(e);
  else {
    const r = typeof e == "string" ? e : t;
    r && (s = Array.from(n.querySelectorAll(r)));
  }
  return s;
}
function Is(e) {
  return typeof e == "function" && e.prototype && e.prototype.goTo;
}
function nt() {
  return !!(navigator.vendor && navigator.vendor.match(/apple/i));
}
class Fs {
  /**
   * @param {T} type
   * @param {PhotoSwipeEventsMap[T]} [details]
   */
  constructor(t, n) {
    this.type = t, this.defaultPrevented = !1, n && Object.assign(this, n);
  }
  preventDefault() {
    this.defaultPrevented = !0;
  }
}
class Ls {
  constructor() {
    this._listeners = {}, this._filters = {}, this.pswp = void 0, this.options = void 0;
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   * @param {number} priority
   */
  addFilter(t, n, s = 100) {
    var r, i, o;
    this._filters[t] || (this._filters[t] = []), (r = this._filters[t]) === null || r === void 0 || r.push({
      fn: n,
      priority: s
    }), (i = this._filters[t]) === null || i === void 0 || i.sort((a, d) => a.priority - d.priority), (o = this.pswp) === null || o === void 0 || o.addFilter(t, n, s);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {PhotoSwipeFiltersMap[T]} fn
   */
  removeFilter(t, n) {
    this._filters[t] && (this._filters[t] = this._filters[t].filter((s) => s.fn !== n)), this.pswp && this.pswp.removeFilter(t, n);
  }
  /**
   * @template {keyof PhotoSwipeFiltersMap} T
   * @param {T} name
   * @param {Parameters<PhotoSwipeFiltersMap[T]>} args
   * @returns {Parameters<PhotoSwipeFiltersMap[T]>[0]}
   */
  applyFilters(t, ...n) {
    var s;
    return (s = this._filters[t]) === null || s === void 0 || s.forEach((r) => {
      n[0] = r.fn.apply(this, n);
    }), n[0];
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  on(t, n) {
    var s, r;
    this._listeners[t] || (this._listeners[t] = []), (s = this._listeners[t]) === null || s === void 0 || s.push(n), (r = this.pswp) === null || r === void 0 || r.on(t, n);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {EventCallback<T>} fn
   */
  off(t, n) {
    var s;
    this._listeners[t] && (this._listeners[t] = this._listeners[t].filter((r) => n !== r)), (s = this.pswp) === null || s === void 0 || s.off(t, n);
  }
  /**
   * @template {keyof PhotoSwipeEventsMap} T
   * @param {T} name
   * @param {PhotoSwipeEventsMap[T]} [details]
   * @returns {AugmentedEvent<T>}
   */
  dispatch(t, n) {
    var s;
    if (this.pswp)
      return this.pswp.dispatch(t, n);
    const r = (
      /** @type {AugmentedEvent<T>} */
      new Fs(t, n)
    );
    return (s = this._listeners[t]) === null || s === void 0 || s.forEach((i) => {
      i.call(this, r);
    }), r;
  }
}
class Us {
  /**
   * @param {string | false} imageSrc
   * @param {HTMLElement} container
   */
  constructor(t, n) {
    if (this.element = ne("pswp__img pswp__img--placeholder", t ? "img" : "div", n), t) {
      const s = (
        /** @type {HTMLImageElement} */
        this.element
      );
      s.decoding = "async", s.alt = "", s.src = t, s.setAttribute("role", "presentation");
    }
    this.element.setAttribute("aria-hidden", "true");
  }
  /**
   * @param {number} width
   * @param {number} height
   */
  setDisplayedSize(t, n) {
    this.element && (this.element.tagName === "IMG" ? (Ie(this.element, 250, "auto"), this.element.style.transformOrigin = "0 0", this.element.style.transform = Ds(0, 0, t / 250)) : Ie(this.element, t, n));
  }
  destroy() {
    var t;
    (t = this.element) !== null && t !== void 0 && t.parentNode && this.element.remove(), this.element = null;
  }
}
class Bs {
  /**
   * @param {SlideData} itemData Slide data
   * @param {PhotoSwipeBase} instance PhotoSwipe or PhotoSwipeLightbox instance
   * @param {number} index
   */
  constructor(t, n, s) {
    this.instance = n, this.data = t, this.index = s, this.element = void 0, this.placeholder = void 0, this.slide = void 0, this.displayedImageWidth = 0, this.displayedImageHeight = 0, this.width = Number(this.data.w) || Number(this.data.width) || 0, this.height = Number(this.data.h) || Number(this.data.height) || 0, this.isAttached = !1, this.hasSlide = !1, this.isDecoding = !1, this.state = I.IDLE, this.data.type ? this.type = this.data.type : this.data.src ? this.type = "image" : this.type = "html", this.instance.dispatch("contentInit", {
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
  load(t, n) {
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
        this.placeholder = new Us(s, this.slide.container);
      }
    this.element && !n || this.instance.dispatch("contentLoad", {
      content: this,
      isLazy: t
    }).defaultPrevented || (this.isImageContent() ? (this.element = ne("pswp__img", "img"), this.displayedImageWidth && this.loadImage(t)) : (this.element = ne("pswp__content", "div"), this.element.innerHTML = this.data.html || ""), n && this.slide && this.slide.updateContentSize(!0));
  }
  /**
   * Preload image
   *
   * @param {boolean} isLazy
   */
  loadImage(t) {
    var n, s;
    if (!this.isImageContent() || !this.element || this.instance.dispatch("contentLoadImage", {
      content: this,
      isLazy: t
    }).defaultPrevented)
      return;
    const r = (
      /** @type HTMLImageElement */
      this.element
    );
    this.updateSrcsetSizes(), this.data.srcset && (r.srcset = this.data.srcset), r.src = (n = this.data.src) !== null && n !== void 0 ? n : "", r.alt = (s = this.data.alt) !== null && s !== void 0 ? s : "", this.state = I.LOADING, r.complete ? this.onLoaded() : (r.onload = () => {
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
  setSlide(t) {
    this.slide = t, this.hasSlide = !0, this.instance = t.pswp;
  }
  /**
   * Content load success handler
   */
  onLoaded() {
    this.state = I.LOADED, this.slide && this.element && (this.instance.dispatch("loadComplete", {
      slide: this.slide,
      content: this
    }), this.slide.isActive && this.slide.heavyAppended && !this.element.parentNode && (this.append(), this.slide.updateContentSize(!0)), (this.state === I.LOADED || this.state === I.ERROR) && this.removePlaceholder());
  }
  /**
   * Content load error handler
   */
  onError() {
    this.state = I.ERROR, this.slide && (this.displayError(), this.instance.dispatch("loadComplete", {
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
    return this.instance.applyFilters("isContentLoading", this.state === I.LOADING, this);
  }
  /**
   * @returns {Boolean} If the content is in error state
   */
  isError() {
    return this.state === I.ERROR;
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
  setDisplayedSize(t, n) {
    if (this.element && (this.placeholder && this.placeholder.setDisplayedSize(t, n), !this.instance.dispatch("contentResize", {
      content: this,
      width: t,
      height: n
    }).defaultPrevented && (Ie(this.element, t, n), this.isImageContent() && !this.isError()))) {
      const s = !this.displayedImageWidth && t;
      this.displayedImageWidth = t, this.displayedImageHeight = n, s ? this.loadImage(!1) : this.updateSrcsetSizes(), this.slide && this.instance.dispatch("imageSizeChange", {
        slide: this.slide,
        width: t,
        height: n,
        content: this
      });
    }
  }
  /**
   * @returns {boolean} If the content can be zoomed
   */
  isZoomable() {
    return this.instance.applyFilters("isContentZoomable", this.isImageContent() && this.state !== I.ERROR, this);
  }
  /**
   * Update image srcset sizes attribute based on width and height
   */
  updateSrcsetSizes() {
    if (!this.isImageContent() || !this.element || !this.data.srcset)
      return;
    const t = (
      /** @type HTMLImageElement */
      this.element
    ), n = this.instance.applyFilters("srcsetSizesWidth", this.displayedImageWidth, this);
    (!t.dataset.largestUsedSize || n > parseInt(t.dataset.largestUsedSize, 10)) && (t.sizes = n + "px", t.dataset.largestUsedSize = String(n));
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
      var t, n;
      let s = ne("pswp__error-msg", "div");
      s.innerText = (t = (n = this.instance.options) === null || n === void 0 ? void 0 : n.errorMsg) !== null && t !== void 0 ? t : "", s = /** @type {HTMLDivElement} */
      this.instance.applyFilters("contentErrorElement", s, this), this.element = ne("pswp__content pswp__error-msg-container", "div"), this.element.appendChild(s), this.slide.container.innerText = "", this.slide.container.appendChild(this.element), this.slide.updateContentSize(!0), this.removePlaceholder();
    }
  }
  /**
   * Append the content
   */
  append() {
    if (this.isAttached || !this.element)
      return;
    if (this.isAttached = !0, this.state === I.ERROR) {
      this.displayError();
      return;
    }
    if (this.instance.dispatch("contentAppend", {
      content: this
    }).defaultPrevented)
      return;
    const t = "decode" in this.element;
    this.isImageContent() ? t && this.slide && (!this.slide.isActive || nt()) ? (this.isDecoding = !0, this.element.decode().catch(() => {
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
    }).defaultPrevented || !this.slide || (this.isImageContent() && this.isDecoding && !nt() ? this.appendImage() : this.isError() && this.load(!1, !0), this.slide.holderElement && this.slide.holderElement.setAttribute("aria-hidden", "false"));
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
    }).defaultPrevented || (this.slide && this.element && !this.element.parentNode && this.slide.container.appendChild(this.element), (this.state === I.LOADED || this.state === I.ERROR) && this.removePlaceholder()));
  }
}
function zs(e, t) {
  if (e.getViewportSizeFn) {
    const n = e.getViewportSizeFn(e, t);
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
function de(e, t, n, s, r) {
  let i = 0;
  if (t.paddingFn)
    i = t.paddingFn(n, s, r)[e];
  else if (t.padding)
    i = t.padding[e];
  else {
    const o = "padding" + e[0].toUpperCase() + e.slice(1);
    t[o] && (i = t[o]);
  }
  return Number(i) || 0;
}
function Ms(e, t, n, s) {
  return {
    x: t.x - de("left", e, t, n, s) - de("right", e, t, n, s),
    y: t.y - de("top", e, t, n, s) - de("bottom", e, t, n, s)
  };
}
const rt = 4e3;
class js {
  /**
   * @param {PhotoSwipeOptions} options PhotoSwipe options
   * @param {SlideData} itemData Slide data
   * @param {number} index Slide index
   * @param {PhotoSwipe} [pswp] PhotoSwipe instance, can be undefined if not initialized yet
   */
  constructor(t, n, s, r) {
    this.pswp = r, this.options = t, this.itemData = n, this.index = s, this.panAreaSize = null, this.elementSize = null, this.fit = 1, this.fill = 1, this.vFill = 1, this.initial = 1, this.secondary = 1, this.max = 1, this.min = 1;
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
  update(t, n, s) {
    const r = {
      x: t,
      y: n
    };
    this.elementSize = r, this.panAreaSize = s;
    const i = s.x / r.x, o = s.y / r.y;
    this.fit = Math.min(1, i < o ? i : o), this.fill = Math.min(1, i > o ? i : o), this.vFill = Math.min(1, o), this.initial = this._getInitial(), this.secondary = this._getSecondary(), this.max = Math.max(this.initial, this.secondary, this._getMax()), this.min = Math.min(this.fit, this.initial, this.secondary), this.pswp && this.pswp.dispatch("zoomLevelsUpdate", {
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
  _parseZoomLevelOption(t) {
    const n = (
      /** @type {'initialZoomLevel' | 'secondaryZoomLevel' | 'maxZoomLevel'} */
      t + "ZoomLevel"
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
    let t = this._parseZoomLevelOption("secondary");
    return t || (t = Math.min(1, this.fit * 3), this.elementSize && t * this.elementSize.x > rt && (t = rt / this.elementSize.x), t);
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
function Pt(e, t, n) {
  const s = t.createContentFromData(e, n);
  let r;
  const {
    options: i
  } = t;
  if (i) {
    r = new js(i, e, -1);
    let o;
    t.pswp ? o = t.pswp.viewportSize : o = zs(i, t);
    const a = Ms(i, o, e, n);
    r.update(s.width, s.height, a);
  }
  return s.lazyLoad(), r && s.setDisplayedSize(Math.ceil(s.width * r.initial), Math.ceil(s.height * r.initial)), s;
}
function $s(e, t) {
  const n = t.getItemData(e);
  if (!t.dispatch("lazyLoadSlide", {
    index: e,
    itemData: n
  }).defaultPrevented)
    return Pt(n, t, e);
}
class Vs extends Ls {
  /**
   * Get total number of slides
   *
   * @returns {number}
   */
  getNumItems() {
    var t;
    let n = 0;
    const s = (t = this.options) === null || t === void 0 ? void 0 : t.dataSource;
    s && "length" in s ? n = s.length : s && "gallery" in s && (s.items || (s.items = this._getGalleryDOMElements(s.gallery)), s.items && (n = s.items.length));
    const r = this.dispatch("numItems", {
      dataSource: s,
      numItems: n
    });
    return this.applyFilters("numItems", r.numItems, s);
  }
  /**
   * @param {SlideData} slideData
   * @param {number} index
   * @returns {Content}
   */
  createContentFromData(t, n) {
    return new Bs(t, this, n);
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
  getItemData(t) {
    var n;
    const s = (n = this.options) === null || n === void 0 ? void 0 : n.dataSource;
    let r = {};
    Array.isArray(s) ? r = s[t] : s && "gallery" in s && (s.items || (s.items = this._getGalleryDOMElements(s.gallery)), r = s.items[t]);
    let i = r;
    i instanceof Element && (i = this._domElementToItemData(i));
    const o = this.dispatch("itemData", {
      itemData: i || {},
      index: t
    });
    return this.applyFilters("itemData", o.itemData, t);
  }
  /**
   * Get array of gallery DOM elements,
   * based on childSelector and gallery element.
   *
   * @param {HTMLElement} galleryElement
   * @returns {HTMLElement[]}
   */
  _getGalleryDOMElements(t) {
    var n, s;
    return (n = this.options) !== null && n !== void 0 && n.children || (s = this.options) !== null && s !== void 0 && s.childSelector ? re(this.options.children, this.options.childSelector, t) || [] : [t];
  }
  /**
   * Converts DOM element to item data object.
   *
   * @param {HTMLElement} element DOM element
   * @returns {SlideData}
   */
  _domElementToItemData(t) {
    const n = {
      element: t
    }, s = (
      /** @type {HTMLAnchorElement} */
      t.tagName === "A" ? t : t.querySelector("a")
    );
    if (s) {
      n.src = s.dataset.pswpSrc || s.href, s.dataset.pswpSrcset && (n.srcset = s.dataset.pswpSrcset), n.width = s.dataset.pswpWidth ? parseInt(s.dataset.pswpWidth, 10) : 0, n.height = s.dataset.pswpHeight ? parseInt(s.dataset.pswpHeight, 10) : 0, n.w = n.width, n.h = n.height, s.dataset.pswpType && (n.type = s.dataset.pswpType);
      const i = t.querySelector("img");
      if (i) {
        var r;
        n.msrc = i.currentSrc || i.src, n.alt = (r = i.getAttribute("alt")) !== null && r !== void 0 ? r : "";
      }
      (s.dataset.pswpCropped || s.dataset.cropped) && (n.thumbCropped = !0);
    }
    return this.applyFilters("domItemData", n, t, s);
  }
  /**
   * Lazy-load by slide data
   *
   * @param {SlideData} itemData Data about the slide
   * @param {number} index
   * @returns {Content} Image that is being decoded or false.
   */
  lazyLoadData(t, n) {
    return Pt(t, this, n);
  }
}
class qs extends Vs {
  /**
   * @param {PhotoSwipeOptions} [options]
   */
  constructor(t) {
    super(), this.options = t || {}, this._uid = 0, this.shouldOpen = !1, this._preloadedContent = void 0, this.onThumbnailsClick = this.onThumbnailsClick.bind(this);
  }
  /**
   * Initialize lightbox, should be called only once.
   * It's not included in the main constructor, so you may bind events before it.
   */
  init() {
    re(this.options.gallery, this.options.gallerySelector).forEach((t) => {
      t.addEventListener("click", this.onThumbnailsClick, !1);
    });
  }
  /**
   * @param {MouseEvent} e
   */
  onThumbnailsClick(t) {
    if (ks(t) || window.pswp)
      return;
    let n = {
      x: t.clientX,
      y: t.clientY
    };
    !n.x && !n.y && (n = null);
    let s = this.getClickedIndex(t);
    s = this.applyFilters("clickedIndex", s, t, this);
    const r = {
      gallery: (
        /** @type {HTMLElement} */
        t.currentTarget
      )
    };
    s >= 0 && (t.preventDefault(), this.loadAndOpen(s, r, n));
  }
  /**
   * Get index of gallery item that was clicked.
   *
   * @param {MouseEvent} e click event
   * @returns {number}
   */
  getClickedIndex(t) {
    if (this.options.getClickedIndexFn)
      return this.options.getClickedIndexFn.call(this, t);
    const n = (
      /** @type {HTMLElement} */
      t.target
    ), r = re(
      this.options.children,
      this.options.childSelector,
      /** @type {HTMLElement} */
      t.currentTarget
    ).findIndex((i) => i === n || i.contains(n));
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
  loadAndOpen(t, n, s) {
    if (window.pswp || !this.options)
      return !1;
    if (!n && this.options.gallery && this.options.children) {
      const r = re(this.options.gallery);
      r[0] && (n = {
        gallery: r[0]
      });
    }
    return this.options.index = t, this.options.initialPointerPos = s, this.shouldOpen = !0, this.preload(t, n), !0;
  }
  /**
   * Load the main module and the slide content by index
   *
   * @param {number} index
   * @param {DataSource} [dataSource]
   */
  preload(t, n) {
    const {
      options: s
    } = this;
    n && (s.dataSource = n);
    const r = [], i = typeof s.pswpModule;
    if (Is(s.pswpModule))
      r.push(Promise.resolve(
        /** @type {Type<PhotoSwipe>} */
        s.pswpModule
      ));
    else {
      if (i === "string")
        throw new Error("pswpModule as string is no longer supported");
      if (i === "function")
        r.push(
          /** @type {() => Promise<Type<PhotoSwipe>>} */
          s.pswpModule()
        );
      else
        throw new Error("pswpModule is not valid");
    }
    typeof s.openPromise == "function" && r.push(s.openPromise()), s.preloadFirstSlide !== !1 && t >= 0 && (this._preloadedContent = $s(t, this));
    const o = ++this._uid;
    Promise.all(r).then((a) => {
      if (this.shouldOpen) {
        const d = a[0];
        this._openPhotoswipe(d, o);
      }
    });
  }
  /**
   * @private
   * @param {Type<PhotoSwipe> | { default: Type<PhotoSwipe> }} module
   * @param {number} uid
   */
  _openPhotoswipe(t, n) {
    if (n !== this._uid && this.shouldOpen || (this.shouldOpen = !1, window.pswp))
      return;
    const s = typeof t == "object" ? new t.default(this.options) : new t(this.options);
    this.pswp = s, window.pswp = s, Object.keys(this._listeners).forEach((r) => {
      var i;
      (i = this._listeners[r]) === null || i === void 0 || i.forEach((o) => {
        s.on(
          r,
          /** @type {EventCallback<typeof name>} */
          o
        );
      });
    }), Object.keys(this._filters).forEach((r) => {
      var i;
      (i = this._filters[r]) === null || i === void 0 || i.forEach((o) => {
        s.addFilter(r, o.fn, o.priority);
      });
    }), this._preloadedContent && (s.contentLoader.addToCache(this._preloadedContent), this._preloadedContent = void 0), s.on("destroy", () => {
      this.pswp = void 0, delete window.pswp;
    }), s.init();
  }
  /**
   * Unbinds all events, closes PhotoSwipe if it's open.
   */
  destroy() {
    var t;
    (t = this.pswp) === null || t === void 0 || t.destroy(), this.shouldOpen = !1, this._listeners = {}, re(this.options.gallery, this.options.gallerySelector).forEach((n) => {
      n.removeEventListener("click", this.onThumbnailsClick, !1);
    });
  }
}
function Nt(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Hs } = Object.prototype, { getPrototypeOf: Ve } = Object, { iterator: ye, toStringTag: At } = Symbol, Ee = /* @__PURE__ */ ((e) => (t) => {
  const n = Hs.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), B = (e) => (e = e.toLowerCase(), (t) => Ee(t) === e), we = (e) => (t) => typeof t === e, { isArray: K } = Array, le = we("undefined");
function Ws(e) {
  return e !== null && !le(e) && e.constructor !== null && !le(e.constructor) && C(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const vt = B("ArrayBuffer");
function Js(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && vt(e.buffer), t;
}
const Ks = we("string"), C = we("function"), Ct = we("number"), be = (e) => e !== null && typeof e == "object", Gs = (e) => e === !0 || e === !1, he = (e) => {
  if (Ee(e) !== "object")
    return !1;
  const t = Ve(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(At in e) && !(ye in e);
}, Xs = B("Date"), Zs = B("File"), Ys = B("Blob"), Qs = B("FileList"), en = (e) => be(e) && C(e.pipe), tn = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || C(e.append) && ((t = Ee(e)) === "formdata" || // detect form-data instance
  t === "object" && C(e.toString) && e.toString() === "[object FormData]"));
}, sn = B("URLSearchParams"), [nn, rn, on, an] = ["ReadableStream", "Request", "Response", "Headers"].map(B), ln = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ce(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let s, r;
  if (typeof e != "object" && (e = [e]), K(e))
    for (s = 0, r = e.length; s < r; s++)
      t.call(null, e[s], s, e);
  else {
    const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e), o = i.length;
    let a;
    for (s = 0; s < o; s++)
      a = i[s], t.call(null, e[a], a, e);
  }
}
function Tt(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let s = n.length, r;
  for (; s-- > 0; )
    if (r = n[s], t === r.toLowerCase())
      return r;
  return null;
}
const V = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, xt = (e) => !le(e) && e !== V;
function Fe() {
  const { caseless: e } = xt(this) && this || {}, t = {}, n = (s, r) => {
    const i = e && Tt(t, r) || r;
    he(t[i]) && he(s) ? t[i] = Fe(t[i], s) : he(s) ? t[i] = Fe({}, s) : K(s) ? t[i] = s.slice() : t[i] = s;
  };
  for (let s = 0, r = arguments.length; s < r; s++)
    arguments[s] && ce(arguments[s], n);
  return t;
}
const cn = (e, t, n, { allOwnKeys: s } = {}) => (ce(t, (r, i) => {
  n && C(r) ? e[i] = Nt(r, n) : e[i] = r;
}, { allOwnKeys: s }), e), un = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), dn = (e, t, n, s) => {
  e.prototype = Object.create(t.prototype, s), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, hn = (e, t, n, s) => {
  let r, i, o;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (r = Object.getOwnPropertyNames(e), i = r.length; i-- > 0; )
      o = r[i], (!s || s(o, e, t)) && !a[o] && (t[o] = e[o], a[o] = !0);
    e = n !== !1 && Ve(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, fn = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const s = e.indexOf(t, n);
  return s !== -1 && s === n;
}, pn = (e) => {
  if (!e) return null;
  if (K(e)) return e;
  let t = e.length;
  if (!Ct(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, mn = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Ve(Uint8Array)), gn = (e, t) => {
  const s = (e && e[ye]).call(e);
  let r;
  for (; (r = s.next()) && !r.done; ) {
    const i = r.value;
    t.call(e, i[0], i[1]);
  }
}, yn = (e, t) => {
  let n;
  const s = [];
  for (; (n = e.exec(t)) !== null; )
    s.push(n);
  return s;
}, En = B("HTMLFormElement"), wn = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, s, r) {
    return s.toUpperCase() + r;
  }
), it = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), bn = B("RegExp"), Dt = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), s = {};
  ce(n, (r, i) => {
    let o;
    (o = t(r, i, e)) !== !1 && (s[i] = o || r);
  }), Object.defineProperties(e, s);
}, _n = (e) => {
  Dt(e, (t, n) => {
    if (C(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const s = e[n];
    if (C(s)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, Sn = (e, t) => {
  const n = {}, s = (r) => {
    r.forEach((i) => {
      n[i] = !0;
    });
  };
  return K(e) ? s(e) : s(String(e).split(t)), n;
}, On = () => {
}, Rn = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function Pn(e) {
  return !!(e && C(e.append) && e[At] === "FormData" && e[ye]);
}
const Nn = (e) => {
  const t = new Array(10), n = (s, r) => {
    if (be(s)) {
      if (t.indexOf(s) >= 0)
        return;
      if (!("toJSON" in s)) {
        t[r] = s;
        const i = K(s) ? [] : {};
        return ce(s, (o, a) => {
          const d = n(o, r + 1);
          !le(d) && (i[a] = d);
        }), t[r] = void 0, i;
      }
    }
    return s;
  };
  return n(e, 0);
}, An = B("AsyncFunction"), vn = (e) => e && (be(e) || C(e)) && C(e.then) && C(e.catch), kt = ((e, t) => e ? setImmediate : t ? ((n, s) => (V.addEventListener("message", ({ source: r, data: i }) => {
  r === V && i === n && s.length && s.shift()();
}, !1), (r) => {
  s.push(r), V.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  C(V.postMessage)
), Cn = typeof queueMicrotask < "u" ? queueMicrotask.bind(V) : typeof process < "u" && process.nextTick || kt, Tn = (e) => e != null && C(e[ye]), l = {
  isArray: K,
  isArrayBuffer: vt,
  isBuffer: Ws,
  isFormData: tn,
  isArrayBufferView: Js,
  isString: Ks,
  isNumber: Ct,
  isBoolean: Gs,
  isObject: be,
  isPlainObject: he,
  isReadableStream: nn,
  isRequest: rn,
  isResponse: on,
  isHeaders: an,
  isUndefined: le,
  isDate: Xs,
  isFile: Zs,
  isBlob: Ys,
  isRegExp: bn,
  isFunction: C,
  isStream: en,
  isURLSearchParams: sn,
  isTypedArray: mn,
  isFileList: Qs,
  forEach: ce,
  merge: Fe,
  extend: cn,
  trim: ln,
  stripBOM: un,
  inherits: dn,
  toFlatObject: hn,
  kindOf: Ee,
  kindOfTest: B,
  endsWith: fn,
  toArray: pn,
  forEachEntry: gn,
  matchAll: yn,
  isHTMLForm: En,
  hasOwnProperty: it,
  hasOwnProp: it,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Dt,
  freezeMethods: _n,
  toObjectSet: Sn,
  toCamelCase: wn,
  noop: On,
  toFiniteNumber: Rn,
  findKey: Tt,
  global: V,
  isContextDefined: xt,
  isSpecCompliantForm: Pn,
  toJSONObject: Nn,
  isAsyncFn: An,
  isThenable: vn,
  setImmediate: kt,
  asap: Cn,
  isIterable: Tn
};
function w(e, t, n, s, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), s && (this.request = s), r && (this.response = r, this.status = r.status ? r.status : null);
}
l.inherits(w, Error, {
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
      config: l.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const It = w.prototype, Ft = {};
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
].forEach((e) => {
  Ft[e] = { value: e };
});
Object.defineProperties(w, Ft);
Object.defineProperty(It, "isAxiosError", { value: !0 });
w.from = (e, t, n, s, r, i) => {
  const o = Object.create(It);
  return l.toFlatObject(e, o, function(d) {
    return d !== Error.prototype;
  }, (a) => a !== "isAxiosError"), w.call(o, e.message, t, n, s, r), o.cause = e, o.name = e.name, i && Object.assign(o, i), o;
};
const xn = null;
function Le(e) {
  return l.isPlainObject(e) || l.isArray(e);
}
function Lt(e) {
  return l.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function ot(e, t, n) {
  return e ? e.concat(t).map(function(r, i) {
    return r = Lt(r), !n && i ? "[" + r + "]" : r;
  }).join(n ? "." : "") : t;
}
function Dn(e) {
  return l.isArray(e) && !e.some(Le);
}
const kn = l.toFlatObject(l, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function _e(e, t, n) {
  if (!l.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = l.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(E, m) {
    return !l.isUndefined(m[E]);
  });
  const s = n.metaTokens, r = n.visitor || c, i = n.dots, o = n.indexes, d = (n.Blob || typeof Blob < "u" && Blob) && l.isSpecCompliantForm(t);
  if (!l.isFunction(r))
    throw new TypeError("visitor must be a function");
  function u(f) {
    if (f === null) return "";
    if (l.isDate(f))
      return f.toISOString();
    if (!d && l.isBlob(f))
      throw new w("Blob is not supported. Use a Buffer instead.");
    return l.isArrayBuffer(f) || l.isTypedArray(f) ? d && typeof Blob == "function" ? new Blob([f]) : Buffer.from(f) : f;
  }
  function c(f, E, m) {
    let S = f;
    if (f && !m && typeof f == "object") {
      if (l.endsWith(E, "{}"))
        E = s ? E : E.slice(0, -2), f = JSON.stringify(f);
      else if (l.isArray(f) && Dn(f) || (l.isFileList(f) || l.endsWith(E, "[]")) && (S = l.toArray(f)))
        return E = Lt(E), S.forEach(function(N, x) {
          !(l.isUndefined(N) || N === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            o === !0 ? ot([E], x, i) : o === null ? E : E + "[]",
            u(N)
          );
        }), !1;
    }
    return Le(f) ? !0 : (t.append(ot(m, E, i), u(f)), !1);
  }
  const h = [], b = Object.assign(kn, {
    defaultVisitor: c,
    convertValue: u,
    isVisitable: Le
  });
  function _(f, E) {
    if (!l.isUndefined(f)) {
      if (h.indexOf(f) !== -1)
        throw Error("Circular reference detected in " + E.join("."));
      h.push(f), l.forEach(f, function(S, R) {
        (!(l.isUndefined(S) || S === null) && r.call(
          t,
          S,
          l.isString(R) ? R.trim() : R,
          E,
          b
        )) === !0 && _(S, E ? E.concat(R) : [R]);
      }), h.pop();
    }
  }
  if (!l.isObject(e))
    throw new TypeError("data must be an object");
  return _(e), t;
}
function at(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(s) {
    return t[s];
  });
}
function qe(e, t) {
  this._pairs = [], e && _e(e, this, t);
}
const Ut = qe.prototype;
Ut.append = function(t, n) {
  this._pairs.push([t, n]);
};
Ut.toString = function(t) {
  const n = t ? function(s) {
    return t.call(this, s, at);
  } : at;
  return this._pairs.map(function(r) {
    return n(r[0]) + "=" + n(r[1]);
  }, "").join("&");
};
function In(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Bt(e, t, n) {
  if (!t)
    return e;
  const s = n && n.encode || In;
  l.isFunction(n) && (n = {
    serialize: n
  });
  const r = n && n.serialize;
  let i;
  if (r ? i = r(t, n) : i = l.isURLSearchParams(t) ? t.toString() : new qe(t, n).toString(s), i) {
    const o = e.indexOf("#");
    o !== -1 && (e = e.slice(0, o)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class lt {
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
  use(t, n, s) {
    return this.handlers.push({
      fulfilled: t,
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
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
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
  forEach(t) {
    l.forEach(this.handlers, function(s) {
      s !== null && t(s);
    });
  }
}
const zt = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Fn = typeof URLSearchParams < "u" ? URLSearchParams : qe, Ln = typeof FormData < "u" ? FormData : null, Un = typeof Blob < "u" ? Blob : null, Bn = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Fn,
    FormData: Ln,
    Blob: Un
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, He = typeof window < "u" && typeof document < "u", Ue = typeof navigator == "object" && navigator || void 0, zn = He && (!Ue || ["ReactNative", "NativeScript", "NS"].indexOf(Ue.product) < 0), Mn = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", jn = He && window.location.href || "http://localhost", $n = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: He,
  hasStandardBrowserEnv: zn,
  hasStandardBrowserWebWorkerEnv: Mn,
  navigator: Ue,
  origin: jn
}, Symbol.toStringTag, { value: "Module" })), v = {
  ...$n,
  ...Bn
};
function Vn(e, t) {
  return _e(e, new v.classes.URLSearchParams(), Object.assign({
    visitor: function(n, s, r, i) {
      return v.isNode && l.isBuffer(n) ? (this.append(s, n.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function qn(e) {
  return l.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Hn(e) {
  const t = {}, n = Object.keys(e);
  let s;
  const r = n.length;
  let i;
  for (s = 0; s < r; s++)
    i = n[s], t[i] = e[i];
  return t;
}
function Mt(e) {
  function t(n, s, r, i) {
    let o = n[i++];
    if (o === "__proto__") return !0;
    const a = Number.isFinite(+o), d = i >= n.length;
    return o = !o && l.isArray(r) ? r.length : o, d ? (l.hasOwnProp(r, o) ? r[o] = [r[o], s] : r[o] = s, !a) : ((!r[o] || !l.isObject(r[o])) && (r[o] = []), t(n, s, r[o], i) && l.isArray(r[o]) && (r[o] = Hn(r[o])), !a);
  }
  if (l.isFormData(e) && l.isFunction(e.entries)) {
    const n = {};
    return l.forEachEntry(e, (s, r) => {
      t(qn(s), r, n, 0);
    }), n;
  }
  return null;
}
function Wn(e, t, n) {
  if (l.isString(e))
    try {
      return (t || JSON.parse)(e), l.trim(e);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (n || JSON.stringify)(e);
}
const ue = {
  transitional: zt,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const s = n.getContentType() || "", r = s.indexOf("application/json") > -1, i = l.isObject(t);
    if (i && l.isHTMLForm(t) && (t = new FormData(t)), l.isFormData(t))
      return r ? JSON.stringify(Mt(t)) : t;
    if (l.isArrayBuffer(t) || l.isBuffer(t) || l.isStream(t) || l.isFile(t) || l.isBlob(t) || l.isReadableStream(t))
      return t;
    if (l.isArrayBufferView(t))
      return t.buffer;
    if (l.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (i) {
      if (s.indexOf("application/x-www-form-urlencoded") > -1)
        return Vn(t, this.formSerializer).toString();
      if ((a = l.isFileList(t)) || s.indexOf("multipart/form-data") > -1) {
        const d = this.env && this.env.FormData;
        return _e(
          a ? { "files[]": t } : t,
          d && new d(),
          this.formSerializer
        );
      }
    }
    return i || r ? (n.setContentType("application/json", !1), Wn(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || ue.transitional, s = n && n.forcedJSONParsing, r = this.responseType === "json";
    if (l.isResponse(t) || l.isReadableStream(t))
      return t;
    if (t && l.isString(t) && (s && !this.responseType || r)) {
      const o = !(n && n.silentJSONParsing) && r;
      try {
        return JSON.parse(t);
      } catch (a) {
        if (o)
          throw a.name === "SyntaxError" ? w.from(a, w.ERR_BAD_RESPONSE, this, null, this.response) : a;
      }
    }
    return t;
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
    FormData: v.classes.FormData,
    Blob: v.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
l.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  ue.headers[e] = {};
});
const Jn = l.toObjectSet([
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
]), Kn = (e) => {
  const t = {};
  let n, s, r;
  return e && e.split(`
`).forEach(function(o) {
    r = o.indexOf(":"), n = o.substring(0, r).trim().toLowerCase(), s = o.substring(r + 1).trim(), !(!n || t[n] && Jn[n]) && (n === "set-cookie" ? t[n] ? t[n].push(s) : t[n] = [s] : t[n] = t[n] ? t[n] + ", " + s : s);
  }), t;
}, ct = Symbol("internals");
function Q(e) {
  return e && String(e).trim().toLowerCase();
}
function fe(e) {
  return e === !1 || e == null ? e : l.isArray(e) ? e.map(fe) : String(e);
}
function Gn(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = n.exec(e); )
    t[s[1]] = s[2];
  return t;
}
const Xn = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Ce(e, t, n, s, r) {
  if (l.isFunction(s))
    return s.call(this, t, n);
  if (r && (t = n), !!l.isString(t)) {
    if (l.isString(s))
      return t.indexOf(s) !== -1;
    if (l.isRegExp(s))
      return s.test(t);
  }
}
function Zn(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, s) => n.toUpperCase() + s);
}
function Yn(e, t) {
  const n = l.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(e, s + n, {
      value: function(r, i, o) {
        return this[s].call(this, t, r, i, o);
      },
      configurable: !0
    });
  });
}
let T = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, s) {
    const r = this;
    function i(a, d, u) {
      const c = Q(d);
      if (!c)
        throw new Error("header name must be a non-empty string");
      const h = l.findKey(r, c);
      (!h || r[h] === void 0 || u === !0 || u === void 0 && r[h] !== !1) && (r[h || d] = fe(a));
    }
    const o = (a, d) => l.forEach(a, (u, c) => i(u, c, d));
    if (l.isPlainObject(t) || t instanceof this.constructor)
      o(t, n);
    else if (l.isString(t) && (t = t.trim()) && !Xn(t))
      o(Kn(t), n);
    else if (l.isObject(t) && l.isIterable(t)) {
      let a = {}, d, u;
      for (const c of t) {
        if (!l.isArray(c))
          throw TypeError("Object iterator must return a key-value pair");
        a[u = c[0]] = (d = a[u]) ? l.isArray(d) ? [...d, c[1]] : [d, c[1]] : c[1];
      }
      o(a, n);
    } else
      t != null && i(n, t, s);
    return this;
  }
  get(t, n) {
    if (t = Q(t), t) {
      const s = l.findKey(this, t);
      if (s) {
        const r = this[s];
        if (!n)
          return r;
        if (n === !0)
          return Gn(r);
        if (l.isFunction(n))
          return n.call(this, r, s);
        if (l.isRegExp(n))
          return n.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = Q(t), t) {
      const s = l.findKey(this, t);
      return !!(s && this[s] !== void 0 && (!n || Ce(this, this[s], s, n)));
    }
    return !1;
  }
  delete(t, n) {
    const s = this;
    let r = !1;
    function i(o) {
      if (o = Q(o), o) {
        const a = l.findKey(s, o);
        a && (!n || Ce(s, s[a], a, n)) && (delete s[a], r = !0);
      }
    }
    return l.isArray(t) ? t.forEach(i) : i(t), r;
  }
  clear(t) {
    const n = Object.keys(this);
    let s = n.length, r = !1;
    for (; s--; ) {
      const i = n[s];
      (!t || Ce(this, this[i], i, t, !0)) && (delete this[i], r = !0);
    }
    return r;
  }
  normalize(t) {
    const n = this, s = {};
    return l.forEach(this, (r, i) => {
      const o = l.findKey(s, i);
      if (o) {
        n[o] = fe(r), delete n[i];
        return;
      }
      const a = t ? Zn(i) : String(i).trim();
      a !== i && delete n[i], n[a] = fe(r), s[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return l.forEach(this, (s, r) => {
      s != null && s !== !1 && (n[r] = t && l.isArray(s) ? s.join(", ") : s);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const s = new this(t);
    return n.forEach((r) => s.set(r)), s;
  }
  static accessor(t) {
    const s = (this[ct] = this[ct] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function i(o) {
      const a = Q(o);
      s[a] || (Yn(r, o), s[a] = !0);
    }
    return l.isArray(t) ? t.forEach(i) : i(t), this;
  }
};
T.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
l.reduceDescriptors(T.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(s) {
      this[n] = s;
    }
  };
});
l.freezeMethods(T);
function Te(e, t) {
  const n = this || ue, s = t || n, r = T.from(s.headers);
  let i = s.data;
  return l.forEach(e, function(a) {
    i = a.call(n, i, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), i;
}
function jt(e) {
  return !!(e && e.__CANCEL__);
}
function G(e, t, n) {
  w.call(this, e ?? "canceled", w.ERR_CANCELED, t, n), this.name = "CanceledError";
}
l.inherits(G, w, {
  __CANCEL__: !0
});
function $t(e, t, n) {
  const s = n.config.validateStatus;
  !n.status || !s || s(n.status) ? e(n) : t(new w(
    "Request failed with status code " + n.status,
    [w.ERR_BAD_REQUEST, w.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function Qn(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function er(e, t) {
  e = e || 10;
  const n = new Array(e), s = new Array(e);
  let r = 0, i = 0, o;
  return t = t !== void 0 ? t : 1e3, function(d) {
    const u = Date.now(), c = s[i];
    o || (o = u), n[r] = d, s[r] = u;
    let h = i, b = 0;
    for (; h !== r; )
      b += n[h++], h = h % e;
    if (r = (r + 1) % e, r === i && (i = (i + 1) % e), u - o < t)
      return;
    const _ = c && u - c;
    return _ ? Math.round(b * 1e3 / _) : void 0;
  };
}
function tr(e, t) {
  let n = 0, s = 1e3 / t, r, i;
  const o = (u, c = Date.now()) => {
    n = c, r = null, i && (clearTimeout(i), i = null), e.apply(null, u);
  };
  return [(...u) => {
    const c = Date.now(), h = c - n;
    h >= s ? o(u, c) : (r = u, i || (i = setTimeout(() => {
      i = null, o(r);
    }, s - h)));
  }, () => r && o(r)];
}
const me = (e, t, n = 3) => {
  let s = 0;
  const r = er(50, 250);
  return tr((i) => {
    const o = i.loaded, a = i.lengthComputable ? i.total : void 0, d = o - s, u = r(d), c = o <= a;
    s = o;
    const h = {
      loaded: o,
      total: a,
      progress: a ? o / a : void 0,
      bytes: d,
      rate: u || void 0,
      estimated: u && a && c ? (a - o) / u : void 0,
      event: i,
      lengthComputable: a != null,
      [t ? "download" : "upload"]: !0
    };
    e(h);
  }, n);
}, ut = (e, t) => {
  const n = e != null;
  return [(s) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: s
  }), t[1]];
}, dt = (e) => (...t) => l.asap(() => e(...t)), sr = v.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, v.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(v.origin),
  v.navigator && /(msie|trident)/i.test(v.navigator.userAgent)
) : () => !0, nr = v.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, s, r, i) {
      const o = [e + "=" + encodeURIComponent(t)];
      l.isNumber(n) && o.push("expires=" + new Date(n).toGMTString()), l.isString(s) && o.push("path=" + s), l.isString(r) && o.push("domain=" + r), i === !0 && o.push("secure"), document.cookie = o.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
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
function rr(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function ir(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Vt(e, t, n) {
  let s = !rr(t);
  return e && (s || n == !1) ? ir(e, t) : t;
}
const ht = (e) => e instanceof T ? { ...e } : e;
function W(e, t) {
  t = t || {};
  const n = {};
  function s(u, c, h, b) {
    return l.isPlainObject(u) && l.isPlainObject(c) ? l.merge.call({ caseless: b }, u, c) : l.isPlainObject(c) ? l.merge({}, c) : l.isArray(c) ? c.slice() : c;
  }
  function r(u, c, h, b) {
    if (l.isUndefined(c)) {
      if (!l.isUndefined(u))
        return s(void 0, u, h, b);
    } else return s(u, c, h, b);
  }
  function i(u, c) {
    if (!l.isUndefined(c))
      return s(void 0, c);
  }
  function o(u, c) {
    if (l.isUndefined(c)) {
      if (!l.isUndefined(u))
        return s(void 0, u);
    } else return s(void 0, c);
  }
  function a(u, c, h) {
    if (h in t)
      return s(u, c);
    if (h in e)
      return s(void 0, u);
  }
  const d = {
    url: i,
    method: i,
    data: i,
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
    validateStatus: a,
    headers: (u, c, h) => r(ht(u), ht(c), h, !0)
  };
  return l.forEach(Object.keys(Object.assign({}, e, t)), function(c) {
    const h = d[c] || r, b = h(e[c], t[c], c);
    l.isUndefined(b) && h !== a || (n[c] = b);
  }), n;
}
const qt = (e) => {
  const t = W({}, e);
  let { data: n, withXSRFToken: s, xsrfHeaderName: r, xsrfCookieName: i, headers: o, auth: a } = t;
  t.headers = o = T.from(o), t.url = Bt(Vt(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), a && o.set(
    "Authorization",
    "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : ""))
  );
  let d;
  if (l.isFormData(n)) {
    if (v.hasStandardBrowserEnv || v.hasStandardBrowserWebWorkerEnv)
      o.setContentType(void 0);
    else if ((d = o.getContentType()) !== !1) {
      const [u, ...c] = d ? d.split(";").map((h) => h.trim()).filter(Boolean) : [];
      o.setContentType([u || "multipart/form-data", ...c].join("; "));
    }
  }
  if (v.hasStandardBrowserEnv && (s && l.isFunction(s) && (s = s(t)), s || s !== !1 && sr(t.url))) {
    const u = r && i && nr.read(i);
    u && o.set(r, u);
  }
  return t;
}, or = typeof XMLHttpRequest < "u", ar = or && function(e) {
  return new Promise(function(n, s) {
    const r = qt(e);
    let i = r.data;
    const o = T.from(r.headers).normalize();
    let { responseType: a, onUploadProgress: d, onDownloadProgress: u } = r, c, h, b, _, f;
    function E() {
      _ && _(), f && f(), r.cancelToken && r.cancelToken.unsubscribe(c), r.signal && r.signal.removeEventListener("abort", c);
    }
    let m = new XMLHttpRequest();
    m.open(r.method.toUpperCase(), r.url, !0), m.timeout = r.timeout;
    function S() {
      if (!m)
        return;
      const N = T.from(
        "getAllResponseHeaders" in m && m.getAllResponseHeaders()
      ), A = {
        data: !a || a === "text" || a === "json" ? m.responseText : m.response,
        status: m.status,
        statusText: m.statusText,
        headers: N,
        config: e,
        request: m
      };
      $t(function(y) {
        n(y), E();
      }, function(y) {
        s(y), E();
      }, A), m = null;
    }
    "onloadend" in m ? m.onloadend = S : m.onreadystatechange = function() {
      !m || m.readyState !== 4 || m.status === 0 && !(m.responseURL && m.responseURL.indexOf("file:") === 0) || setTimeout(S);
    }, m.onabort = function() {
      m && (s(new w("Request aborted", w.ECONNABORTED, e, m)), m = null);
    }, m.onerror = function() {
      s(new w("Network Error", w.ERR_NETWORK, e, m)), m = null;
    }, m.ontimeout = function() {
      let x = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const A = r.transitional || zt;
      r.timeoutErrorMessage && (x = r.timeoutErrorMessage), s(new w(
        x,
        A.clarifyTimeoutError ? w.ETIMEDOUT : w.ECONNABORTED,
        e,
        m
      )), m = null;
    }, i === void 0 && o.setContentType(null), "setRequestHeader" in m && l.forEach(o.toJSON(), function(x, A) {
      m.setRequestHeader(A, x);
    }), l.isUndefined(r.withCredentials) || (m.withCredentials = !!r.withCredentials), a && a !== "json" && (m.responseType = r.responseType), u && ([b, f] = me(u, !0), m.addEventListener("progress", b)), d && m.upload && ([h, _] = me(d), m.upload.addEventListener("progress", h), m.upload.addEventListener("loadend", _)), (r.cancelToken || r.signal) && (c = (N) => {
      m && (s(!N || N.type ? new G(null, e, m) : N), m.abort(), m = null);
    }, r.cancelToken && r.cancelToken.subscribe(c), r.signal && (r.signal.aborted ? c() : r.signal.addEventListener("abort", c)));
    const R = Qn(r.url);
    if (R && v.protocols.indexOf(R) === -1) {
      s(new w("Unsupported protocol " + R + ":", w.ERR_BAD_REQUEST, e));
      return;
    }
    m.send(i || null);
  });
}, lr = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let s = new AbortController(), r;
    const i = function(u) {
      if (!r) {
        r = !0, a();
        const c = u instanceof Error ? u : this.reason;
        s.abort(c instanceof w ? c : new G(c instanceof Error ? c.message : c));
      }
    };
    let o = t && setTimeout(() => {
      o = null, i(new w(`timeout ${t} of ms exceeded`, w.ETIMEDOUT));
    }, t);
    const a = () => {
      e && (o && clearTimeout(o), o = null, e.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(i) : u.removeEventListener("abort", i);
      }), e = null);
    };
    e.forEach((u) => u.addEventListener("abort", i));
    const { signal: d } = s;
    return d.unsubscribe = () => l.asap(a), d;
  }
}, cr = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let s = 0, r;
  for (; s < n; )
    r = s + t, yield e.slice(s, r), s = r;
}, ur = async function* (e, t) {
  for await (const n of dr(e))
    yield* cr(n, t);
}, dr = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: s } = await t.read();
      if (n)
        break;
      yield s;
    }
  } finally {
    await t.cancel();
  }
}, ft = (e, t, n, s) => {
  const r = ur(e, t);
  let i = 0, o, a = (d) => {
    o || (o = !0, s && s(d));
  };
  return new ReadableStream({
    async pull(d) {
      try {
        const { done: u, value: c } = await r.next();
        if (u) {
          a(), d.close();
          return;
        }
        let h = c.byteLength;
        if (n) {
          let b = i += h;
          n(b);
        }
        d.enqueue(new Uint8Array(c));
      } catch (u) {
        throw a(u), u;
      }
    },
    cancel(d) {
      return a(d), r.return();
    }
  }, {
    highWaterMark: 2
  });
}, Se = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Ht = Se && typeof ReadableStream == "function", hr = Se && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), Wt = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, fr = Ht && Wt(() => {
  let e = !1;
  const t = new Request(v.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), pt = 64 * 1024, Be = Ht && Wt(() => l.isReadableStream(new Response("").body)), ge = {
  stream: Be && ((e) => e.body)
};
Se && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !ge[t] && (ge[t] = l.isFunction(e[t]) ? (n) => n[t]() : (n, s) => {
      throw new w(`Response type '${t}' is not supported`, w.ERR_NOT_SUPPORT, s);
    });
  });
})(new Response());
const pr = async (e) => {
  if (e == null)
    return 0;
  if (l.isBlob(e))
    return e.size;
  if (l.isSpecCompliantForm(e))
    return (await new Request(v.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (l.isArrayBufferView(e) || l.isArrayBuffer(e))
    return e.byteLength;
  if (l.isURLSearchParams(e) && (e = e + ""), l.isString(e))
    return (await hr(e)).byteLength;
}, mr = async (e, t) => {
  const n = l.toFiniteNumber(e.getContentLength());
  return n ?? pr(t);
}, gr = Se && (async (e) => {
  let {
    url: t,
    method: n,
    data: s,
    signal: r,
    cancelToken: i,
    timeout: o,
    onDownloadProgress: a,
    onUploadProgress: d,
    responseType: u,
    headers: c,
    withCredentials: h = "same-origin",
    fetchOptions: b
  } = qt(e);
  u = u ? (u + "").toLowerCase() : "text";
  let _ = lr([r, i && i.toAbortSignal()], o), f;
  const E = _ && _.unsubscribe && (() => {
    _.unsubscribe();
  });
  let m;
  try {
    if (d && fr && n !== "get" && n !== "head" && (m = await mr(c, s)) !== 0) {
      let A = new Request(t, {
        method: "POST",
        body: s,
        duplex: "half"
      }), L;
      if (l.isFormData(s) && (L = A.headers.get("content-type")) && c.setContentType(L), A.body) {
        const [y, X] = ut(
          m,
          me(dt(d))
        );
        s = ft(A.body, pt, y, X);
      }
    }
    l.isString(h) || (h = h ? "include" : "omit");
    const S = "credentials" in Request.prototype;
    f = new Request(t, {
      ...b,
      signal: _,
      method: n.toUpperCase(),
      headers: c.normalize().toJSON(),
      body: s,
      duplex: "half",
      credentials: S ? h : void 0
    });
    let R = await fetch(f);
    const N = Be && (u === "stream" || u === "response");
    if (Be && (a || N && E)) {
      const A = {};
      ["status", "statusText", "headers"].forEach((U) => {
        A[U] = R[U];
      });
      const L = l.toFiniteNumber(R.headers.get("content-length")), [y, X] = a && ut(
        L,
        me(dt(a), !0)
      ) || [];
      R = new Response(
        ft(R.body, pt, y, () => {
          X && X(), E && E();
        }),
        A
      );
    }
    u = u || "text";
    let x = await ge[l.findKey(ge, u) || "text"](R, e);
    return !N && E && E(), await new Promise((A, L) => {
      $t(A, L, {
        data: x,
        headers: T.from(R.headers),
        status: R.status,
        statusText: R.statusText,
        config: e,
        request: f
      });
    });
  } catch (S) {
    throw E && E(), S && S.name === "TypeError" && /Load failed|fetch/i.test(S.message) ? Object.assign(
      new w("Network Error", w.ERR_NETWORK, e, f),
      {
        cause: S.cause || S
      }
    ) : w.from(S, S && S.code, e, f);
  }
}), ze = {
  http: xn,
  xhr: ar,
  fetch: gr
};
l.forEach(ze, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const mt = (e) => `- ${e}`, yr = (e) => l.isFunction(e) || e === null || e === !1, Jt = {
  getAdapter: (e) => {
    e = l.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, s;
    const r = {};
    for (let i = 0; i < t; i++) {
      n = e[i];
      let o;
      if (s = n, !yr(n) && (s = ze[(o = String(n)).toLowerCase()], s === void 0))
        throw new w(`Unknown adapter '${o}'`);
      if (s)
        break;
      r[o || "#" + i] = s;
    }
    if (!s) {
      const i = Object.entries(r).map(
        ([a, d]) => `adapter ${a} ` + (d === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let o = t ? i.length > 1 ? `since :
` + i.map(mt).join(`
`) : " " + mt(i[0]) : "as no adapter specified";
      throw new w(
        "There is no suitable adapter to dispatch the request " + o,
        "ERR_NOT_SUPPORT"
      );
    }
    return s;
  },
  adapters: ze
};
function xe(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new G(null, e);
}
function gt(e) {
  return xe(e), e.headers = T.from(e.headers), e.data = Te.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Jt.getAdapter(e.adapter || ue.adapter)(e).then(function(s) {
    return xe(e), s.data = Te.call(
      e,
      e.transformResponse,
      s
    ), s.headers = T.from(s.headers), s;
  }, function(s) {
    return jt(s) || (xe(e), s && s.response && (s.response.data = Te.call(
      e,
      e.transformResponse,
      s.response
    ), s.response.headers = T.from(s.response.headers))), Promise.reject(s);
  });
}
const Kt = "1.9.0", Oe = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Oe[e] = function(s) {
    return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const yt = {};
Oe.transitional = function(t, n, s) {
  function r(i, o) {
    return "[Axios v" + Kt + "] Transitional option '" + i + "'" + o + (s ? ". " + s : "");
  }
  return (i, o, a) => {
    if (t === !1)
      throw new w(
        r(o, " has been removed" + (n ? " in " + n : "")),
        w.ERR_DEPRECATED
      );
    return n && !yt[o] && (yt[o] = !0, console.warn(
      r(
        o,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(i, o, a) : !0;
  };
};
Oe.spelling = function(t) {
  return (n, s) => (console.warn(`${s} is likely a misspelling of ${t}`), !0);
};
function Er(e, t, n) {
  if (typeof e != "object")
    throw new w("options must be an object", w.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(e);
  let r = s.length;
  for (; r-- > 0; ) {
    const i = s[r], o = t[i];
    if (o) {
      const a = e[i], d = a === void 0 || o(a, i, e);
      if (d !== !0)
        throw new w("option " + i + " must be " + d, w.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new w("Unknown option " + i, w.ERR_BAD_OPTION);
  }
}
const pe = {
  assertOptions: Er,
  validators: Oe
}, z = pe.validators;
let q = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new lt(),
      response: new lt()
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
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (s) {
      if (s instanceof Error) {
        let r = {};
        Error.captureStackTrace ? Error.captureStackTrace(r) : r = new Error();
        const i = r.stack ? r.stack.replace(/^.+\n/, "") : "";
        try {
          s.stack ? i && !String(s.stack).endsWith(i.replace(/^.+\n.+\n/, "")) && (s.stack += `
` + i) : s.stack = i;
        } catch {
        }
      }
      throw s;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = W(this.defaults, n);
    const { transitional: s, paramsSerializer: r, headers: i } = n;
    s !== void 0 && pe.assertOptions(s, {
      silentJSONParsing: z.transitional(z.boolean),
      forcedJSONParsing: z.transitional(z.boolean),
      clarifyTimeoutError: z.transitional(z.boolean)
    }, !1), r != null && (l.isFunction(r) ? n.paramsSerializer = {
      serialize: r
    } : pe.assertOptions(r, {
      encode: z.function,
      serialize: z.function
    }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), pe.assertOptions(n, {
      baseUrl: z.spelling("baseURL"),
      withXsrfToken: z.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let o = i && l.merge(
      i.common,
      i[n.method]
    );
    i && l.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (f) => {
        delete i[f];
      }
    ), n.headers = T.concat(o, i);
    const a = [];
    let d = !0;
    this.interceptors.request.forEach(function(E) {
      typeof E.runWhen == "function" && E.runWhen(n) === !1 || (d = d && E.synchronous, a.unshift(E.fulfilled, E.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(E) {
      u.push(E.fulfilled, E.rejected);
    });
    let c, h = 0, b;
    if (!d) {
      const f = [gt.bind(this), void 0];
      for (f.unshift.apply(f, a), f.push.apply(f, u), b = f.length, c = Promise.resolve(n); h < b; )
        c = c.then(f[h++], f[h++]);
      return c;
    }
    b = a.length;
    let _ = n;
    for (h = 0; h < b; ) {
      const f = a[h++], E = a[h++];
      try {
        _ = f(_);
      } catch (m) {
        E.call(this, m);
        break;
      }
    }
    try {
      c = gt.call(this, _);
    } catch (f) {
      return Promise.reject(f);
    }
    for (h = 0, b = u.length; h < b; )
      c = c.then(u[h++], u[h++]);
    return c;
  }
  getUri(t) {
    t = W(this.defaults, t);
    const n = Vt(t.baseURL, t.url, t.allowAbsoluteUrls);
    return Bt(n, t.params, t.paramsSerializer);
  }
};
l.forEach(["delete", "get", "head", "options"], function(t) {
  q.prototype[t] = function(n, s) {
    return this.request(W(s || {}, {
      method: t,
      url: n,
      data: (s || {}).data
    }));
  };
});
l.forEach(["post", "put", "patch"], function(t) {
  function n(s) {
    return function(i, o, a) {
      return this.request(W(a || {}, {
        method: t,
        headers: s ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: o
      }));
    };
  }
  q.prototype[t] = n(), q.prototype[t + "Form"] = n(!0);
});
let wr = class Gt {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(i) {
      n = i;
    });
    const s = this;
    this.promise.then((r) => {
      if (!s._listeners) return;
      let i = s._listeners.length;
      for (; i-- > 0; )
        s._listeners[i](r);
      s._listeners = null;
    }), this.promise.then = (r) => {
      let i;
      const o = new Promise((a) => {
        s.subscribe(a), i = a;
      }).then(r);
      return o.cancel = function() {
        s.unsubscribe(i);
      }, o;
    }, t(function(i, o, a) {
      s.reason || (s.reason = new G(i, o, a), n(s.reason));
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
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (s) => {
      t.abort(s);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new Gt(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
};
function br(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function _r(e) {
  return l.isObject(e) && e.isAxiosError === !0;
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
Object.entries(Me).forEach(([e, t]) => {
  Me[t] = e;
});
function Xt(e) {
  const t = new q(e), n = Nt(q.prototype.request, t);
  return l.extend(n, q.prototype, t, { allOwnKeys: !0 }), l.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(r) {
    return Xt(W(e, r));
  }, n;
}
const P = Xt(ue);
P.Axios = q;
P.CanceledError = G;
P.CancelToken = wr;
P.isCancel = jt;
P.VERSION = Kt;
P.toFormData = _e;
P.AxiosError = w;
P.Cancel = P.CanceledError;
P.all = function(t) {
  return Promise.all(t);
};
P.spread = br;
P.isAxiosError = _r;
P.mergeConfig = W;
P.AxiosHeaders = T;
P.formToJSON = (e) => Mt(l.isHTMLForm(e) ? new FormData(e) : e);
P.getAdapter = Jt.getAdapter;
P.HttpStatusCode = Me;
P.default = P;
const {
  Axios: Vr,
  AxiosError: qr,
  CanceledError: Hr,
  isCancel: Wr,
  CancelToken: Jr,
  VERSION: Kr,
  all: Gr,
  Cancel: Xr,
  isAxiosError: Zr,
  spread: Yr,
  toFormData: Qr,
  AxiosHeaders: ei,
  HttpStatusCode: ti,
  formToJSON: si,
  getAdapter: ni,
  mergeConfig: ri
} = P, Sr = (e) => (/* @__PURE__ */ _s(`${e}`, {
  state: () => ({
    photos: [],
    totalPages: 1,
    totalPictures: 0,
    loading: !1,
    photoCache: {}
    // Cache für Seiten
  }),
  actions: {
    async fetchPhotos(t, n = 1) {
      if (this.photoCache[n]) {
        const i = this.photoCache[n], o = 30 * 60 * 1e3;
        if (Date.now() - (i.timestamp || 0) < o) {
          this.photos = i.photos, this.totalPages = i.totalPages, this.totalPictures = i.totalPictures;
          return;
        }
        delete this.photoCache[n];
      }
      this.loading = !0;
      const s = await P.get(t);
      let r = [];
      s.data.photoset ? (r = s.data.photoset.photo, this.totalPages = s.data.photoset.pages, this.totalPictures = s.data.photoset.total) : s.data.photos && (r = s.data.photos.photo, this.totalPages = s.data.photos.pages, this.totalPictures = s.data.photos.total), this.photos = r, this.photoCache[n] = {
        photos: r,
        totalPages: this.totalPages,
        totalPictures: this.totalPictures,
        timestamp: Date.now()
      }, this.loading = !1;
    }
  },
  persist: {
    enabled: !0,
    strategies: [
      {
        key: `flickr-${e}`,
        storage: localStorage
      }
    ]
  }
}))(), Zt = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, Or = {
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
      handler(e) {
        this.imageDescription = `<b>${e.title}</b><br>${e.description ? e.description._content || e.description : ""}`;
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
}, Rr = ["href", "data-pswp-width", "data-pswp-height"], Pr = ["innerHTML"], Nr = ["src", "alt"];
function Ar(e, t, n, s, r, i) {
  return $(), j("a", {
    class: "pswp-gallery__item",
    href: n.image.url_l || n.image.url_m,
    "data-pswp-width": n.image.width_l || n.image.width_m,
    "data-pswp-height": n.image.height_l || n.image.height_m,
    target: "_blank",
    rel: "noreferrer"
  }, [
    M("span", {
      class: "hidden-caption-content",
      innerHTML: r.imageDescription
    }, null, 8, Pr),
    M("img", {
      src: n.image.url_m,
      alt: n.image.title,
      onMouseover: t[0] || (t[0] = (...o) => i.enlargeImage && i.enlargeImage(...o)),
      onMouseout: t[1] || (t[1] = (...o) => i.shrinkImage && i.shrinkImage(...o)),
      class: cs({
        "img-default-size": !0,
        "img-enlarged-size": r.imageEnlarged
      })
    }, null, 42, Nr)
  ], 8, Rr);
}
const vr = /* @__PURE__ */ Zt(Or, [["render", Ar]]), Cr = {
  name: "FlickrGallery",
  components: { Image: vr },
  props: {
    galleryContainer: {
      type: String
    },
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
    photos: [],
    flickrStore: null
  }),
  mounted() {
    const e = "flickr-" + this.$.uid;
    this.galleryID = e, this.flickrStore = Sr(e), this.loadFlickrPhotos(), this.initLightbox();
  },
  watch: {},
  unmounted() {
    this.lightbox && (this.lightbox.destroy(), this.lightbox = null);
  },
  methods: {
    initLightbox() {
      const e = {
        gallery: "#" + this.galleryID,
        children: ".pswp-gallery__item",
        pswpModule: () => import("./photoswipe.esm-mCjPm0dq.js")
      };
      if (!this.lightbox) {
        const t = new qs(e);
        t.on("uiRegister", function() {
          t.pswp.ui.registerElement({
            name: "custom-caption",
            order: 9,
            isButton: !1,
            appendTo: "root",
            html: "Caption text",
            onInit: (n) => {
              t.pswp.on("change", () => {
                const s = t.pswp.currSlide.data.element;
                let r = "";
                if (s) {
                  const i = s.querySelector(".hidden-caption-content");
                  i ? r = i.innerHTML : (console.debug(s), r = s.querySelector("img").getAttribute("alt"));
                }
                n.innerHTML = r || "";
              });
            }
          });
        }), this.lightbox = t.init();
      }
    },
    async loadFlickrPhotos() {
      this.loading = !0;
      const e = this.endpoint + "?method=" + this.method + "&api_key=" + this.apiKey + "&tags=" + this.tags + "&user_id=" + this.userId + "&photoset_id=" + this.photosetId + "&format=json&page=" + this.page + "&per_page=" + this.perPage + "&extras=" + this.defaultExtras + "&nojsoncallback=1";
      await this.flickrStore.fetchPhotos(e, this.page), this.photos = this.flickrStore.photos, this.totalPages = this.flickrStore.totalPages, this.totalPictures = this.flickrStore.totalPictures, this.loading = this.flickrStore.loading;
    },
    nextPage() {
      this.page < this.totalPages && (this.page++, this.loadFlickrPhotos());
    },
    previousPage() {
      this.page > 1 && (this.page--, this.loadFlickrPhotos());
    }
  }
}, Tr = ["id"], xr = { key: 0 }, Dr = { class: "flickr-images" }, kr = {
  key: 0,
  class: "flickr-navigation"
}, Ir = { class: "prev" }, Fr = { class: "current" }, Lr = { class: "next" };
function Ur(e, t, n, s, r, i) {
  const o = us("Image");
  return $(), j("div", { id: e.galleryID }, [
    Ke(ds, { name: "fade" }, {
      default: hs(() => [
        e.loading ? Ne("", !0) : ($(), j("div", {
          key: 0,
          style: fs(e.flickrLoadingStyle),
          class: "flickr-container",
          ref: "flickr-container"
        }, [
          n.title ? ($(), j("h2", xr, Ae(n.title), 1)) : Ne("", !0),
          M("div", Dr, [
            ($(!0), j(ps, null, ms(e.photos, (a) => ($(), j("span", null, [
              Ke(o, { image: a }, null, 8, ["image"])
            ]))), 256))
          ])
        ], 4))
      ]),
      _: 1
    }),
    n.useNavigation ? ($(), j("div", kr, [
      M("span", Ir, [
        M("button", {
          onClick: t[0] || (t[0] = (...a) => i.previousPage && i.previousPage(...a)),
          onKeyup: t[1] || (t[1] = Ge((...a) => i.previousPage && i.previousPage(...a), ["right"]))
        }, " << ", 32)
      ]),
      M("span", Fr, [
        M("button", {
          onClick: t[2] || (t[2] = () => {
          })
        }, " Page " + Ae(e.page) + "/" + Ae(e.totalPages), 1)
      ]),
      M("span", Lr, [
        M("button", {
          onClick: t[3] || (t[3] = (...a) => i.nextPage && i.nextPage(...a)),
          onKeyup: t[4] || (t[4] = Ge((...a) => i.nextPage && i.nextPage(...a), ["right"]))
        }, " >> ", 32)
      ])
    ])) : Ne("", !0)
  ], 8, Tr);
}
const Br = /* @__PURE__ */ Zt(Cr, [["render", Ur]]), zr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Br
}, Symbol.toStringTag, { value: "Module" })), ii = {
  install(e, t = {}) {
    const { pinia: n } = t;
    if (!n) {
      console.error("[FlickrGallery] Missing { pinia } option during install");
      return;
    }
    Ss(n), n._p.some((s) => s === st) || n.use(st), e.component(
      "FlickrGallery",
      gs(() => Promise.resolve().then(() => zr))
    );
  }
};
export {
  Br as FlickrGalleryComponent,
  ii as default
};
