import * as u from "react";
import sr, { forwardRef as kt, createElement as Be } from "react";
import "react-dom";
var Ee = { exports: {} }, he = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var at;
function ir() {
  if (at) return he;
  at = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function r(o, n, a) {
    var s = null;
    if (a !== void 0 && (s = "" + a), n.key !== void 0 && (s = "" + n.key), "key" in n) {
      a = {};
      for (var l in n)
        l !== "key" && (a[l] = n[l]);
    } else a = n;
    return n = a.ref, {
      $$typeof: e,
      type: o,
      key: s,
      ref: n !== void 0 ? n : null,
      props: a
    };
  }
  return he.Fragment = t, he.jsx = r, he.jsxs = r, he;
}
var ge = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var st;
function lr() {
  return st || (st = 1, process.env.NODE_ENV !== "production" && function() {
    function e(g) {
      if (g == null) return null;
      if (typeof g == "function")
        return g.$$typeof === V ? null : g.displayName || g.name || null;
      if (typeof g == "string") return g;
      switch (g) {
        case h:
          return "Fragment";
        case b:
          return "Profiler";
        case k:
          return "StrictMode";
        case O:
          return "Suspense";
        case M:
          return "SuspenseList";
        case L:
          return "Activity";
      }
      if (typeof g == "object")
        switch (typeof g.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), g.$$typeof) {
          case d:
            return "Portal";
          case P:
            return (g.displayName || "Context") + ".Provider";
          case C:
            return (g._context.displayName || "Context") + ".Consumer";
          case T:
            var N = g.render;
            return g = g.displayName, g || (g = N.displayName || N.name || "", g = g !== "" ? "ForwardRef(" + g + ")" : "ForwardRef"), g;
          case R:
            return N = g.displayName || null, N !== null ? N : e(g.type) || "Memo";
          case E:
            N = g._payload, g = g._init;
            try {
              return e(g(N));
            } catch {
            }
        }
      return null;
    }
    function t(g) {
      return "" + g;
    }
    function r(g) {
      try {
        t(g);
        var N = !1;
      } catch {
        N = !0;
      }
      if (N) {
        N = console;
        var I = N.error, A = typeof Symbol == "function" && Symbol.toStringTag && g[Symbol.toStringTag] || g.constructor.name || "Object";
        return I.call(
          N,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          A
        ), t(g);
      }
    }
    function o(g) {
      if (g === h) return "<>";
      if (typeof g == "object" && g !== null && g.$$typeof === E)
        return "<...>";
      try {
        var N = e(g);
        return N ? "<" + N + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function n() {
      var g = W.A;
      return g === null ? null : g.getOwner();
    }
    function a() {
      return Error("react-stack-top-frame");
    }
    function s(g) {
      if (K.call(g, "key")) {
        var N = Object.getOwnPropertyDescriptor(g, "key").get;
        if (N && N.isReactWarning) return !1;
      }
      return g.key !== void 0;
    }
    function l(g, N) {
      function I() {
        X || (X = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          N
        ));
      }
      I.isReactWarning = !0, Object.defineProperty(g, "key", {
        get: I,
        configurable: !0
      });
    }
    function i() {
      var g = e(this.type);
      return U[g] || (U[g] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), g = this.props.ref, g !== void 0 ? g : null;
    }
    function c(g, N, I, A, $, G, le, z) {
      return I = G.ref, g = {
        $$typeof: v,
        type: g,
        key: N,
        props: G,
        _owner: $
      }, (I !== void 0 ? I : null) !== null ? Object.defineProperty(g, "ref", {
        enumerable: !1,
        get: i
      }) : Object.defineProperty(g, "ref", { enumerable: !1, value: null }), g._store = {}, Object.defineProperty(g._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(g, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(g, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: le
      }), Object.defineProperty(g, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: z
      }), Object.freeze && (Object.freeze(g.props), Object.freeze(g)), g;
    }
    function f(g, N, I, A, $, G, le, z) {
      var F = N.children;
      if (F !== void 0)
        if (A)
          if (we(F)) {
            for (A = 0; A < F.length; A++)
              x(F[A]);
            Object.freeze && Object.freeze(F);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else x(F);
      if (K.call(N, "key")) {
        F = e(g);
        var H = Object.keys(N).filter(function(pe) {
          return pe !== "key";
        });
        A = 0 < H.length ? "{key: someKey, " + H.join(": ..., ") + ": ...}" : "{key: someKey}", me[F + A] || (H = 0 < H.length ? "{" + H.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          A,
          F,
          H,
          F
        ), me[F + A] = !0);
      }
      if (F = null, I !== void 0 && (r(I), F = "" + I), s(N) && (r(N.key), F = "" + N.key), "key" in N) {
        I = {};
        for (var re in N)
          re !== "key" && (I[re] = N[re]);
      } else I = N;
      return F && l(
        I,
        typeof g == "function" ? g.displayName || g.name || "Unknown" : g
      ), c(
        g,
        F,
        G,
        $,
        n(),
        I,
        le,
        z
      );
    }
    function x(g) {
      typeof g == "object" && g !== null && g.$$typeof === v && g._store && (g._store.validated = 1);
    }
    var p = sr, v = Symbol.for("react.transitional.element"), d = Symbol.for("react.portal"), h = Symbol.for("react.fragment"), k = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), C = Symbol.for("react.consumer"), P = Symbol.for("react.context"), T = Symbol.for("react.forward_ref"), O = Symbol.for("react.suspense"), M = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), L = Symbol.for("react.activity"), V = Symbol.for("react.client.reference"), W = p.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, K = Object.prototype.hasOwnProperty, we = Array.isArray, se = console.createTask ? console.createTask : function() {
      return null;
    };
    p = {
      "react-stack-bottom-frame": function(g) {
        return g();
      }
    };
    var X, U = {}, Y = p["react-stack-bottom-frame"].bind(
      p,
      a
    )(), S = se(o(a)), me = {};
    ge.Fragment = h, ge.jsx = function(g, N, I, A, $) {
      var G = 1e4 > W.recentlyCreatedOwnerStacks++;
      return f(
        g,
        N,
        I,
        !1,
        A,
        $,
        G ? Error("react-stack-top-frame") : Y,
        G ? se(o(g)) : S
      );
    }, ge.jsxs = function(g, N, I, A, $) {
      var G = 1e4 > W.recentlyCreatedOwnerStacks++;
      return f(
        g,
        N,
        I,
        !0,
        A,
        $,
        G ? Error("react-stack-top-frame") : Y,
        G ? se(o(g)) : S
      );
    };
  }()), ge;
}
var it;
function cr() {
  return it || (it = 1, process.env.NODE_ENV === "production" ? Ee.exports = ir() : Ee.exports = lr()), Ee.exports;
}
var m = cr();
/**
 * @license lucide-react v0.506.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ur = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), dr = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, r, o) => o ? o.toUpperCase() : r.toLowerCase()
), lt = (e) => {
  const t = dr(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, Et = (...e) => e.filter((t, r, o) => !!t && t.trim() !== "" && o.indexOf(t) === r).join(" ").trim(), fr = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
};
/**
 * @license lucide-react v0.506.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var mr = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.506.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pr = kt(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: o,
    className: n = "",
    children: a,
    iconNode: s,
    ...l
  }, i) => Be(
    "svg",
    {
      ref: i,
      ...mr,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: o ? Number(r) * 24 / Number(t) : r,
      className: Et("lucide", n),
      ...!a && !fr(l) && { "aria-hidden": "true" },
      ...l
    },
    [
      ...s.map(([c, f]) => Be(c, f)),
      ...Array.isArray(a) ? a : [a]
    ]
  )
);
/**
 * @license lucide-react v0.506.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Le = (e, t) => {
  const r = kt(
    ({ className: o, ...n }, a) => Be(pr, {
      ref: a,
      iconNode: t,
      className: Et(
        `lucide-${ur(lt(e))}`,
        `lucide-${e}`,
        o
      ),
      ...n
    })
  );
  return r.displayName = lt(e), r;
};
/**
 * @license lucide-react v0.506.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hr = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], Ve = Le("chevron-left", hr);
/**
 * @license lucide-react v0.506.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gr = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Ae = Le("chevron-right", gr);
/**
 * @license lucide-react v0.506.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const br = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
], xr = Le("house", br);
/**
 * @license lucide-react v0.506.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vr = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
], Ct = Le("search", vr);
function ct(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function yr(...e) {
  return (t) => {
    let r = !1;
    const o = e.map((n) => {
      const a = ct(n, t);
      return !r && typeof a == "function" && (r = !0), a;
    });
    if (r)
      return () => {
        for (let n = 0; n < o.length; n++) {
          const a = o[n];
          typeof a == "function" ? a() : ct(e[n], null);
        }
      };
  };
}
// @__NO_SIDE_EFFECTS__
function Rt(e) {
  const t = /* @__PURE__ */ wr(e), r = u.forwardRef((o, n) => {
    const { children: a, ...s } = o, l = u.Children.toArray(a), i = l.find(Er);
    if (i) {
      const c = i.props.children, f = l.map((x) => x === i ? u.Children.count(c) > 1 ? u.Children.only(null) : u.isValidElement(c) ? c.props.children : null : x);
      return /* @__PURE__ */ m.jsx(t, { ...s, ref: n, children: u.isValidElement(c) ? u.cloneElement(c, void 0, f) : null });
    }
    return /* @__PURE__ */ m.jsx(t, { ...s, ref: n, children: a });
  });
  return r.displayName = `${e}.Slot`, r;
}
var St = /* @__PURE__ */ Rt("Slot");
// @__NO_SIDE_EFFECTS__
function wr(e) {
  const t = u.forwardRef((r, o) => {
    const { children: n, ...a } = r;
    if (u.isValidElement(n)) {
      const s = Rr(n), l = Cr(a, n.props);
      return n.type !== u.Fragment && (l.ref = o ? yr(o, s) : s), u.cloneElement(n, l);
    }
    return u.Children.count(n) > 1 ? u.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var kr = Symbol("radix.slottable");
function Er(e) {
  return u.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === kr;
}
function Cr(e, t) {
  const r = { ...t };
  for (const o in t) {
    const n = e[o], a = t[o];
    /^on[A-Z]/.test(o) ? n && a ? r[o] = (...l) => {
      a(...l), n(...l);
    } : n && (r[o] = n) : o === "style" ? r[o] = { ...n, ...a } : o === "className" && (r[o] = [n, a].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
function Rr(e) {
  var o, n;
  let t = (o = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : o.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = (n = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : n.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
function Nt(e) {
  var t, r, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var n = e.length;
    for (t = 0; t < n; t++) e[t] && (r = Nt(e[t])) && (o && (o += " "), o += r);
  } else for (r in e) e[r] && (o && (o += " "), o += r);
  return o;
}
function Pt() {
  for (var e, t, r = 0, o = "", n = arguments.length; r < n; r++) (e = arguments[r]) && (t = Nt(e)) && (o && (o += " "), o += t);
  return o;
}
const ut = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, dt = Pt, Ie = (e, t) => (r) => {
  var o;
  if ((t == null ? void 0 : t.variants) == null) return dt(e, r == null ? void 0 : r.class, r == null ? void 0 : r.className);
  const { variants: n, defaultVariants: a } = t, s = Object.keys(n).map((c) => {
    const f = r == null ? void 0 : r[c], x = a == null ? void 0 : a[c];
    if (f === null) return null;
    const p = ut(f) || ut(x);
    return n[c][p];
  }), l = r && Object.entries(r).reduce((c, f) => {
    let [x, p] = f;
    return p === void 0 || (c[x] = p), c;
  }, {}), i = t == null || (o = t.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((c, f) => {
    let { class: x, className: p, ...v } = f;
    return Object.entries(v).every((d) => {
      let [h, k] = d;
      return Array.isArray(k) ? k.includes({
        ...a,
        ...l
      }[h]) : {
        ...a,
        ...l
      }[h] === k;
    }) ? [
      ...c,
      x,
      p
    ] : c;
  }, []);
  return dt(e, s, i, r == null ? void 0 : r.class, r == null ? void 0 : r.className);
}, qe = "-", Sr = (e) => {
  const t = Pr(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (s) => {
      const l = s.split(qe);
      return l[0] === "" && l.length !== 1 && l.shift(), jt(l, t) || Nr(s);
    },
    getConflictingClassGroupIds: (s, l) => {
      const i = r[s] || [];
      return l && o[s] ? [...i, ...o[s]] : i;
    }
  };
}, jt = (e, t) => {
  var s;
  if (e.length === 0)
    return t.classGroupId;
  const r = e[0], o = t.nextPart.get(r), n = o ? jt(e.slice(1), o) : void 0;
  if (n)
    return n;
  if (t.validators.length === 0)
    return;
  const a = e.join(qe);
  return (s = t.validators.find(({
    validator: l
  }) => l(a))) == null ? void 0 : s.classGroupId;
}, ft = /^\[(.+)\]$/, Nr = (e) => {
  if (ft.test(e)) {
    const t = ft.exec(e)[1], r = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (r)
      return "arbitrary.." + r;
  }
}, Pr = (e) => {
  const {
    theme: t,
    classGroups: r
  } = e, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const n in r)
    Ge(r[n], o, n, t);
  return o;
}, Ge = (e, t, r, o) => {
  e.forEach((n) => {
    if (typeof n == "string") {
      const a = n === "" ? t : mt(t, n);
      a.classGroupId = r;
      return;
    }
    if (typeof n == "function") {
      if (jr(n)) {
        Ge(n(o), t, r, o);
        return;
      }
      t.validators.push({
        validator: n,
        classGroupId: r
      });
      return;
    }
    Object.entries(n).forEach(([a, s]) => {
      Ge(s, mt(t, a), r, o);
    });
  });
}, mt = (e, t) => {
  let r = e;
  return t.split(qe).forEach((o) => {
    r.nextPart.has(o) || r.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), r = r.nextPart.get(o);
  }), r;
}, jr = (e) => e.isThemeGetter, Ar = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  const n = (a, s) => {
    r.set(a, s), t++, t > e && (t = 0, o = r, r = /* @__PURE__ */ new Map());
  };
  return {
    get(a) {
      let s = r.get(a);
      if (s !== void 0)
        return s;
      if ((s = o.get(a)) !== void 0)
        return n(a, s), s;
    },
    set(a, s) {
      r.has(a) ? r.set(a, s) : n(a, s);
    }
  };
}, We = "!", Ue = ":", Tr = Ue.length, Lr = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: r
  } = e;
  let o = (n) => {
    const a = [];
    let s = 0, l = 0, i = 0, c;
    for (let d = 0; d < n.length; d++) {
      let h = n[d];
      if (s === 0 && l === 0) {
        if (h === Ue) {
          a.push(n.slice(i, d)), i = d + Tr;
          continue;
        }
        if (h === "/") {
          c = d;
          continue;
        }
      }
      h === "[" ? s++ : h === "]" ? s-- : h === "(" ? l++ : h === ")" && l--;
    }
    const f = a.length === 0 ? n : n.substring(i), x = Ir(f), p = x !== f, v = c && c > i ? c - i : void 0;
    return {
      modifiers: a,
      hasImportantModifier: p,
      baseClassName: x,
      maybePostfixModifierPosition: v
    };
  };
  if (t) {
    const n = t + Ue, a = o;
    o = (s) => s.startsWith(n) ? a(s.substring(n.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: s,
      maybePostfixModifierPosition: void 0
    };
  }
  if (r) {
    const n = o;
    o = (a) => r({
      className: a,
      parseClassName: n
    });
  }
  return o;
}, Ir = (e) => e.endsWith(We) ? e.substring(0, e.length - 1) : e.startsWith(We) ? e.substring(1) : e, _r = (e) => {
  const t = Object.fromEntries(e.orderSensitiveModifiers.map((o) => [o, !0]));
  return (o) => {
    if (o.length <= 1)
      return o;
    const n = [];
    let a = [];
    return o.forEach((s) => {
      s[0] === "[" || t[s] ? (n.push(...a.sort(), s), a = []) : a.push(s);
    }), n.push(...a.sort()), n;
  };
}, Or = (e) => ({
  cache: Ar(e.cacheSize),
  parseClassName: Lr(e),
  sortModifiers: _r(e),
  ...Sr(e)
}), $r = /\s+/, zr = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: o,
    getConflictingClassGroupIds: n,
    sortModifiers: a
  } = t, s = [], l = e.trim().split($r);
  let i = "";
  for (let c = l.length - 1; c >= 0; c -= 1) {
    const f = l[c], {
      isExternal: x,
      modifiers: p,
      hasImportantModifier: v,
      baseClassName: d,
      maybePostfixModifierPosition: h
    } = r(f);
    if (x) {
      i = f + (i.length > 0 ? " " + i : i);
      continue;
    }
    let k = !!h, b = o(k ? d.substring(0, h) : d);
    if (!b) {
      if (!k) {
        i = f + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (b = o(d), !b) {
        i = f + (i.length > 0 ? " " + i : i);
        continue;
      }
      k = !1;
    }
    const C = a(p).join(":"), P = v ? C + We : C, T = P + b;
    if (s.includes(T))
      continue;
    s.push(T);
    const O = n(b, k);
    for (let M = 0; M < O.length; ++M) {
      const R = O[M];
      s.push(P + R);
    }
    i = f + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function Mr() {
  let e = 0, t, r, o = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (r = At(t)) && (o && (o += " "), o += r);
  return o;
}
const At = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = At(e[o])) && (r && (r += " "), r += t);
  return r;
};
function Fr(e, ...t) {
  let r, o, n, a = s;
  function s(i) {
    const c = t.reduce((f, x) => x(f), e());
    return r = Or(c), o = r.cache.get, n = r.cache.set, a = l, l(i);
  }
  function l(i) {
    const c = o(i);
    if (c)
      return c;
    const f = zr(i, r);
    return n(i, f), f;
  }
  return function() {
    return a(Mr.apply(null, arguments));
  };
}
const D = (e) => {
  const t = (r) => r[e] || [];
  return t.isThemeGetter = !0, t;
}, Tt = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Lt = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Dr = /^\d+\/\d+$/, Br = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Vr = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Gr = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Wr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ur = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ce = (e) => Dr.test(e), j = (e) => !!e && !Number.isNaN(Number(e)), ne = (e) => !!e && Number.isInteger(Number(e)), ze = (e) => e.endsWith("%") && j(e.slice(0, -1)), Q = (e) => Br.test(e), Hr = () => !0, Yr = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Vr.test(e) && !Gr.test(e)
), It = () => !1, qr = (e) => Wr.test(e), Jr = (e) => Ur.test(e), Kr = (e) => !y(e) && !w(e), Xr = (e) => ue(e, $t, It), y = (e) => Tt.test(e), ie = (e) => ue(e, zt, Yr), Me = (e) => ue(e, rn, j), pt = (e) => ue(e, _t, It), Qr = (e) => ue(e, Ot, Jr), Ce = (e) => ue(e, Mt, qr), w = (e) => Lt.test(e), be = (e) => de(e, zt), Zr = (e) => de(e, nn), ht = (e) => de(e, _t), en = (e) => de(e, $t), tn = (e) => de(e, Ot), Re = (e) => de(e, Mt, !0), ue = (e, t, r) => {
  const o = Tt.exec(e);
  return o ? o[1] ? t(o[1]) : r(o[2]) : !1;
}, de = (e, t, r = !1) => {
  const o = Lt.exec(e);
  return o ? o[1] ? t(o[1]) : r : !1;
}, _t = (e) => e === "position" || e === "percentage", Ot = (e) => e === "image" || e === "url", $t = (e) => e === "length" || e === "size" || e === "bg-size", zt = (e) => e === "length", rn = (e) => e === "number", nn = (e) => e === "family-name", Mt = (e) => e === "shadow", on = () => {
  const e = D("color"), t = D("font"), r = D("text"), o = D("font-weight"), n = D("tracking"), a = D("leading"), s = D("breakpoint"), l = D("container"), i = D("spacing"), c = D("radius"), f = D("shadow"), x = D("inset-shadow"), p = D("text-shadow"), v = D("drop-shadow"), d = D("blur"), h = D("perspective"), k = D("aspect"), b = D("ease"), C = D("animate"), P = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], T = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], O = () => [...T(), w, y], M = () => ["auto", "hidden", "clip", "visible", "scroll"], R = () => ["auto", "contain", "none"], E = () => [w, y, i], L = () => [ce, "full", "auto", ...E()], V = () => [ne, "none", "subgrid", w, y], W = () => ["auto", {
    span: ["full", ne, w, y]
  }, ne, w, y], K = () => [ne, "auto", w, y], we = () => ["auto", "min", "max", "fr", w, y], se = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], X = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], U = () => ["auto", ...E()], Y = () => [ce, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...E()], S = () => [e, w, y], me = () => [...T(), ht, pt, {
    position: [w, y]
  }], g = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], N = () => ["auto", "cover", "contain", en, Xr, {
    size: [w, y]
  }], I = () => [ze, be, ie], A = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    c,
    w,
    y
  ], $ = () => ["", j, be, ie], G = () => ["solid", "dashed", "dotted", "double"], le = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], z = () => [j, ze, ht, pt], F = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    d,
    w,
    y
  ], H = () => ["none", j, w, y], re = () => ["none", j, w, y], pe = () => [j, w, y], ke = () => [ce, "full", ...E()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Q],
      breakpoint: [Q],
      color: [Hr],
      container: [Q],
      "drop-shadow": [Q],
      ease: ["in", "out", "in-out"],
      font: [Kr],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Q],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Q],
      shadow: [Q],
      spacing: ["px", j],
      text: [Q],
      "text-shadow": [Q],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", ce, y, w, k]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [j, y, w, l]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": P()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": P()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: O()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: M()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": M()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": M()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: R()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": R()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": R()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: L()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": L()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": L()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: L()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: L()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: L()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: L()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: L()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: L()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [ne, "auto", w, y]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [ce, "full", "auto", l, ...E()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [j, ce, "auto", "initial", "none", y]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", j, w, y]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", j, w, y]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [ne, "first", "last", "none", w, y]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": V()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: W()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": K()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": K()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": V()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: W()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": K()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": K()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": we()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": we()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: E()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": E()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": E()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...se(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...X(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...X()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...se()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...X(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...X(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": se()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...X(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...X()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: E()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: E()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: E()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: E()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: E()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: E()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: E()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: E()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: E()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: U()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: U()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: U()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: U()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: U()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: U()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: U()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: U()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: U()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": E()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": E()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: Y()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [l, "screen", ...Y()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          l,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...Y()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          l,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [s]
          },
          ...Y()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", ...Y()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "none", ...Y()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", ...Y()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, be, ie]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [o, w, Me]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", ze, y]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Zr, y, t]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [n, w, y]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [j, "none", w, Me]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          a,
          ...E()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", w, y]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", w, y]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: S()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: S()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...G(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [j, "from-font", "auto", w, ie]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: S()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [j, "auto", w, y]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: E()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", w, y]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", w, y]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: me()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: g()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: N()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, ne, w, y],
          radial: ["", w, y],
          conic: [ne, w, y]
        }, tn, Qr]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: S()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: I()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: I()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: I()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: S()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: S()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: S()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: A()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": A()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": A()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": A()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": A()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": A()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": A()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": A()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": A()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": A()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": A()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": A()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": A()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": A()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": A()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: $()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": $()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": $()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": $()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": $()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": $()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": $()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": $()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": $()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": $()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": $()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...G(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...G(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: S()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": S()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": S()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": S()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": S()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": S()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": S()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": S()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": S()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: S()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...G(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [j, w, y]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", j, be, ie]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: S()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          f,
          Re,
          Ce
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: S()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", x, Re, Ce]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": S()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: $()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: S()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [j, ie]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": S()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": $()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": S()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", p, Re, Ce]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": S()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [j, w, y]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...le(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": le()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [j]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": z()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": z()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": S()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": S()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": z()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": z()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": S()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": S()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": z()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": z()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": S()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": S()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": z()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": z()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": S()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": S()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": z()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": z()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": S()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": S()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": z()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": z()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": S()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": S()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": z()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": z()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": S()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": S()
      }],
      "mask-image-radial": [{
        "mask-radial": [w, y]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": z()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": z()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": S()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": S()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": T()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [j]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": z()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": z()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": S()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": S()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: me()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: g()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: N()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", w, y]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          w,
          y
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: F()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [j, w, y]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [j, w, y]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          v,
          Re,
          Ce
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": S()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", j, w, y]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [j, w, y]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", j, w, y]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [j, w, y]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", j, w, y]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          w,
          y
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": F()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [j, w, y]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [j, w, y]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", j, w, y]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [j, w, y]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", j, w, y]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [j, w, y]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [j, w, y]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", j, w, y]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": E()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": E()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": E()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", w, y]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [j, "initial", w, y]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", b, w, y]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [j, w, y]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", C, w, y]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [h, w, y]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": O()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: H()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": H()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": H()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": H()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: re()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": re()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": re()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": re()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: pe()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": pe()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": pe()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [w, y, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: O()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: ke()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": ke()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": ke()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": ke()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: S()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: S()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", w, y]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": E()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": E()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": E()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": E()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": E()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": E()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": E()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": E()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": E()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": E()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": E()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": E()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": E()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": E()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": E()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": E()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": E()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": E()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", w, y]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...S()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [j, be, ie, Me]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...S()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, an = /* @__PURE__ */ Fr(on);
function _(...e) {
  return an(Pt(e));
}
const sn = Ie(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function ln({
  className: e,
  variant: t,
  size: r,
  asChild: o = !1,
  ...n
}) {
  const a = o ? St : "button";
  return /* @__PURE__ */ m.jsx(
    a,
    {
      "data-slot": "button",
      className: _(sn({ variant: t, size: r, className: e })),
      ...n
    }
  );
}
const Ft = u.createContext(void 0);
function Je() {
  const e = u.useContext(Ft);
  if (!e)
    throw new Error("useActivityBar must be used within an ActivityBarProvider");
  return e;
}
const cn = Ie(
  "flex flex-col h-full bg-background border-r transition-[width] duration-200 ease-in-out",
  {
    variants: {
      position: {
        left: "border-r",
        right: "border-l"
      },
      expanded: {
        true: "w-[240px]",
        false: "w-16"
      }
    },
    defaultVariants: {
      position: "left",
      expanded: !1
    }
  }
);
function un({
  className: e,
  position: t = "left",
  expanded: r,
  defaultExpanded: o = !1,
  defaultActiveId: n,
  toggleable: a = !0,
  onExpandedChange: s,
  onActiveChange: l,
  children: i,
  ...c
}) {
  const [f, x] = u.useState(o), [p, v] = u.useState(n), d = r !== void 0 ? r : f, h = u.useCallback(() => {
    const b = !d;
    x(b), s == null || s(b);
  }, [d, s]), k = u.useMemo(
    () => ({
      expanded: d ?? !1,
      activeId: p,
      setActiveId: v
    }),
    [d, p]
  );
  return /* @__PURE__ */ m.jsx(Ft.Provider, { value: k, children: /* @__PURE__ */ m.jsxs(
    "div",
    {
      className: _(
        cn({ position: t, expanded: d }),
        "relative flex-col transition-all duration-200 ease-in-out",
        e
      ),
      ...c,
      children: [
        /* @__PURE__ */ m.jsxs("div", { className: "flex flex-col h-full", children: [
          /* @__PURE__ */ m.jsx("div", { className: "flex-shrink-0", children: u.Children.toArray(i)[0] }),
          /* @__PURE__ */ m.jsx("div", { className: "flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide min-w-0", children: /* @__PURE__ */ m.jsx("div", { className: "w-full", children: u.Children.toArray(i).slice(1, -1) }) }),
          /* @__PURE__ */ m.jsx("div", { className: "flex-shrink-0", children: u.Children.toArray(i).at(-1) })
        ] }),
        a && /* @__PURE__ */ m.jsx(
          ln,
          {
            variant: "ghost",
            size: "icon",
            className: _(
              "absolute top-4 h-6 w-6",
              t === "left" ? "right-[-12px]" : "left-[-12px]",
              "rounded-full border bg-background shadow-sm z-10 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
            ),
            onClick: h,
            "aria-label": d ? "Collapse sidebar" : "Expand sidebar",
            children: t === "left" ? d ? /* @__PURE__ */ m.jsx(Ve, { className: "h-3 w-3 transition-transform duration-200" }) : /* @__PURE__ */ m.jsx(Ae, { className: "h-3 w-3 transition-transform duration-200" }) : d ? /* @__PURE__ */ m.jsx(Ae, { className: "h-3 w-3 transition-transform duration-200" }) : /* @__PURE__ */ m.jsx(Ve, { className: "h-3 w-3 transition-transform duration-200" })
          }
        )
      ]
    }
  ) });
}
const dn = Ie(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Dt({
  className: e,
  variant: t,
  asChild: r = !1,
  ...o
}) {
  const n = r ? St : "span";
  return /* @__PURE__ */ m.jsx(
    n,
    {
      "data-slot": "badge",
      className: _(dn({ variant: t }), e),
      ...o
    }
  );
}
const fn = Ie(
  "flex items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200 ease-in-out cursor-pointer",
  {
    variants: {
      active: {
        true: "bg-accent text-accent-foreground",
        false: "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
      }
    },
    defaultVariants: {
      active: !1
    }
  }
);
function mn({ className: e, id: t, icon: r, label: o, badge: n, active: a, disabled: s = !1, onClick: l, ...i }) {
  const { activeId: c, setActiveId: f, expanded: x } = Je(), p = a !== void 0 ? a : c === t, v = u.useCallback(() => {
    s || (f(t), l == null || l());
  }, [t, l, f, s]), d = u.useCallback(() => {
    if (!n) return null;
    if (u.isValidElement(n)) {
      const h = n;
      return u.cloneElement(h, {
        className: _(gt, h.props.className)
      });
    }
    return /* @__PURE__ */ m.jsx(Dt, { className: gt, children: n });
  }, [n]);
  return /* @__PURE__ */ m.jsxs(
    "div",
    {
      className: _(
        fn({ active: p }),
        x ? "px-3 py-2 mx-2" : "p-2 mx-3",
        "group",
        s && "opacity-50 pointer-events-none",
        e
      ),
      onClick: v,
      role: "button",
      tabIndex: s ? -1 : 0,
      "aria-disabled": s,
      "aria-selected": p ? !0 : void 0,
      onKeyDown: (h) => {
        s || (h.key === "Enter" || h.key === " ") && (h.preventDefault(), v());
      },
      ...i,
      children: [
        /* @__PURE__ */ m.jsx("div", { className: _("flex-shrink-0 transition-all duration-200 ease-in-out", x ? "" : "mx-auto"), children: u.cloneElement(r, {
          className: _(
            "h-5 w-5 transition-colors duration-150",
            p ? "text-current" : "text-muted-foreground group-hover:text-foreground"
          )
        }) }),
        /* @__PURE__ */ m.jsxs(
          "div",
          {
            className: _(
              "flex flex-1 items-center justify-between min-w-0 transition-all duration-200 ease-in-out ml-3",
              x ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden ml-0"
            ),
            children: [
              /* @__PURE__ */ m.jsx("span", { className: "text-sm font-medium truncate min-w-0", children: o }),
              n && /* @__PURE__ */ m.jsx("div", { className: "ml-auto pl-2 flex-shrink-0", children: d() })
            ]
          }
        )
      ]
    }
  );
}
const gt = "h-5 px-1.5 text-xs font-medium";
function pn({ className: e, title: t, children: r, ...o }) {
  const { expanded: n } = Je();
  return /* @__PURE__ */ m.jsxs("div", { className: _("flex flex-col space-y-1 py-2", e), ...o, children: [
    t && /* @__PURE__ */ m.jsx(
      "div",
      {
        className: _(
          "px-3 mb-1 transition-all duration-200 ease-in-out",
          n ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden"
        ),
        children: /* @__PURE__ */ m.jsx("h3", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: t })
      }
    ),
    /* @__PURE__ */ m.jsx("div", { className: "space-y-1", children: r })
  ] });
}
function hn({ className: e, type: t, ...r }) {
  return /* @__PURE__ */ m.jsx(
    "input",
    {
      type: t,
      "data-slot": "input",
      className: _(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        e
      ),
      ...r
    }
  );
}
var gn = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], bn = gn.reduce((e, t) => {
  const r = /* @__PURE__ */ Rt(`Primitive.${t}`), o = u.forwardRef((n, a) => {
    const { asChild: s, ...l } = n, i = s ? r : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ m.jsx(i, { ...l, ref: a });
  });
  return o.displayName = `Primitive.${t}`, { ...e, [t]: o };
}, {}), xn = "Separator", bt = "horizontal", vn = ["horizontal", "vertical"], Bt = u.forwardRef((e, t) => {
  const { decorative: r, orientation: o = bt, ...n } = e, a = yn(o) ? o : bt, l = r ? { role: "none" } : { "aria-orientation": a === "vertical" ? a : void 0, role: "separator" };
  return /* @__PURE__ */ m.jsx(
    bn.div,
    {
      "data-orientation": a,
      ...l,
      ...n,
      ref: t
    }
  );
});
Bt.displayName = xn;
function yn(e) {
  return vn.includes(e);
}
var wn = Bt;
function Vt({
  className: e,
  orientation: t = "horizontal",
  decorative: r = !0,
  ...o
}) {
  return /* @__PURE__ */ m.jsx(
    wn,
    {
      "data-slot": "separator-root",
      decorative: r,
      orientation: t,
      className: _(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        e
      ),
      ...o
    }
  );
}
function kn({
  className: e,
  icon: t,
  title: r,
  showSearch: o = !0,
  ...n
}) {
  const { expanded: a } = Je(), [s, l] = u.useState(a);
  return u.useEffect(() => {
    let i;
    return a ? l(!0) : i = setTimeout(() => {
      l(!1);
    }, 300), () => clearTimeout(i);
  }, [a]), /* @__PURE__ */ m.jsxs("div", { className: _("overflow-hidden", e), ...n, children: [
    /* @__PURE__ */ m.jsxs("div", { className: _("relative h-[52px] flex items-center px-3 mx-2"), children: [
      /* @__PURE__ */ m.jsx("div", { className: "flex-shrink-0 transition-all duration-300 ease-in-out", children: u.isValidElement(t) && u.cloneElement(t, {
        className: _("transition-all duration-300", a ? "h-5 w-5" : "h-6 w-6")
      }) }),
      /* @__PURE__ */ m.jsx(
        "div",
        {
          className: _(
            "absolute left-[40px] transition-all duration-300 ease-in-out",
            "whitespace-nowrap overflow-hidden text-ellipsis",
            a ? "opacity-100 max-w-[180px]" : "opacity-0 max-w-0 pointer-events-none"
          ),
          children: /* @__PURE__ */ m.jsx("span", { className: "text-base font-semibold", children: s ? r : "" })
        }
      )
    ] }),
    /* @__PURE__ */ m.jsx(Vt, { className: "transition-all duration-300 ease-in-out" }),
    /* @__PURE__ */ m.jsx(
      "div",
      {
        className: _(
          "grid transition-all duration-300 ease-in-out overflow-hidden",
          a ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        ),
        children: /* @__PURE__ */ m.jsx("div", { className: "min-h-0 overflow-hidden", children: s && o && /* @__PURE__ */ m.jsx("div", { className: "px-3 py-3", children: /* @__PURE__ */ m.jsxs("div", { className: "flex items-center relative", children: [
          /* @__PURE__ */ m.jsx(Ct, { className: "h-4 w-4 absolute left-2.5 text-muted-foreground" }),
          /* @__PURE__ */ m.jsx(hn, { placeholder: "搜索...", className: "h-9 pl-8" })
        ] }) }) })
      }
    )
  ] });
}
function En({
  children: e,
  className: t,
  showSeparator: r = !0,
  ...o
}) {
  const n = u.Children.toArray(e);
  return /* @__PURE__ */ m.jsx("div", { className: t, ...o, children: n.map((a, s) => /* @__PURE__ */ m.jsxs(u.Fragment, { children: [
    a,
    r && s < n.length - 1 && /* @__PURE__ */ m.jsx(q.Separator, {})
  ] }, s)) });
}
const q = {
  Root: un,
  Header: kn,
  Group: pn,
  Item: mn,
  Separator: ({ className: e }) => /* @__PURE__ */ m.jsx("div", { className: "w-full px-2", children: /* @__PURE__ */ m.jsx(Vt, { className: _("my-1", e) }) }),
  Footer: ({ children: e, className: t }) => /* @__PURE__ */ m.jsx("div", { className: _("mt-auto", t), children: e }),
  GroupList: En
};
function Ko({
  config: e,
  expanded: t,
  defaultExpanded: r = !1,
  defaultActiveId: o,
  onExpandedChange: n,
  onActiveChange: a,
  className: s
}) {
  const [l, i] = u.useState(r), [c, f] = u.useState(o), x = t !== void 0 ? t : l, p = u.useCallback(
    (h) => {
      i(h), n == null || n(h);
    },
    [n]
  ), v = u.useCallback(
    (h, k) => {
      f(h), a == null || a(h), k == null || k(h);
    },
    [a]
  ), d = (h) => u.isValidElement(h) ? h : typeof h == "string" || typeof h == "number" ? /* @__PURE__ */ m.jsx(Dt, { className: "h-5 px-1.5 text-xs font-medium", children: h }) : null;
  return /* @__PURE__ */ m.jsxs(
    q.Root,
    {
      expanded: x,
      onExpandedChange: p,
      className: s,
      defaultActiveId: c,
      children: [
        /* @__PURE__ */ m.jsx(
          q.Header,
          {
            icon: e.header.icon,
            title: e.header.title,
            showSearch: e.header.showSearch
          }
        ),
        /* @__PURE__ */ m.jsx(q.GroupList, { children: e.groups.map((h, k) => /* @__PURE__ */ m.jsx(q.Group, { title: h.title, children: h.items.map((b) => /* @__PURE__ */ m.jsx(
          q.Item,
          {
            id: b.id,
            icon: b.icon,
            label: b.label,
            badge: b.badge ? d(b.badge) : void 0,
            onClick: () => v(b.id, b.onClick),
            "aria-disabled": b.disabled,
            className: b.disabled ? "opacity-50 pointer-events-none" : ""
          },
          b.id
        )) }, k)) }),
        e.footer && /* @__PURE__ */ m.jsxs(q.Footer, { children: [
          /* @__PURE__ */ m.jsx(q.Separator, {}),
          /* @__PURE__ */ m.jsx(q.Group, { title: e.footer.title, children: e.footer.items.map((h) => /* @__PURE__ */ m.jsx(
            q.Item,
            {
              id: h.id,
              icon: h.icon,
              label: h.label,
              badge: h.badge ? d(h.badge) : void 0,
              onClick: () => v(h.id, h.onClick),
              "aria-disabled": h.disabled,
              className: h.disabled ? "opacity-50 pointer-events-none" : ""
            },
            h.id
          )) })
        ] })
      ]
    }
  );
}
var xe = {}, xt;
function Cn() {
  if (xt) return xe;
  xt = 1, Object.defineProperty(xe, "__esModule", { value: !0 }), xe.parse = s, xe.serialize = c;
  const e = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/, t = /^[\u0021-\u003A\u003C-\u007E]*$/, r = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, o = /^[\u0020-\u003A\u003D-\u007E]*$/, n = Object.prototype.toString, a = /* @__PURE__ */ (() => {
    const p = function() {
    };
    return p.prototype = /* @__PURE__ */ Object.create(null), p;
  })();
  function s(p, v) {
    const d = new a(), h = p.length;
    if (h < 2)
      return d;
    const k = (v == null ? void 0 : v.decode) || f;
    let b = 0;
    do {
      const C = p.indexOf("=", b);
      if (C === -1)
        break;
      const P = p.indexOf(";", b), T = P === -1 ? h : P;
      if (C > T) {
        b = p.lastIndexOf(";", C - 1) + 1;
        continue;
      }
      const O = l(p, b, C), M = i(p, C, O), R = p.slice(O, M);
      if (d[R] === void 0) {
        let E = l(p, C + 1, T), L = i(p, T, E);
        const V = k(p.slice(E, L));
        d[R] = V;
      }
      b = T + 1;
    } while (b < h);
    return d;
  }
  function l(p, v, d) {
    do {
      const h = p.charCodeAt(v);
      if (h !== 32 && h !== 9)
        return v;
    } while (++v < d);
    return d;
  }
  function i(p, v, d) {
    for (; v > d; ) {
      const h = p.charCodeAt(--v);
      if (h !== 32 && h !== 9)
        return v + 1;
    }
    return d;
  }
  function c(p, v, d) {
    const h = (d == null ? void 0 : d.encode) || encodeURIComponent;
    if (!e.test(p))
      throw new TypeError(`argument name is invalid: ${p}`);
    const k = h(v);
    if (!t.test(k))
      throw new TypeError(`argument val is invalid: ${v}`);
    let b = p + "=" + k;
    if (!d)
      return b;
    if (d.maxAge !== void 0) {
      if (!Number.isInteger(d.maxAge))
        throw new TypeError(`option maxAge is invalid: ${d.maxAge}`);
      b += "; Max-Age=" + d.maxAge;
    }
    if (d.domain) {
      if (!r.test(d.domain))
        throw new TypeError(`option domain is invalid: ${d.domain}`);
      b += "; Domain=" + d.domain;
    }
    if (d.path) {
      if (!o.test(d.path))
        throw new TypeError(`option path is invalid: ${d.path}`);
      b += "; Path=" + d.path;
    }
    if (d.expires) {
      if (!x(d.expires) || !Number.isFinite(d.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${d.expires}`);
      b += "; Expires=" + d.expires.toUTCString();
    }
    if (d.httpOnly && (b += "; HttpOnly"), d.secure && (b += "; Secure"), d.partitioned && (b += "; Partitioned"), d.priority)
      switch (typeof d.priority == "string" ? d.priority.toLowerCase() : void 0) {
        case "low":
          b += "; Priority=Low";
          break;
        case "medium":
          b += "; Priority=Medium";
          break;
        case "high":
          b += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${d.priority}`);
      }
    if (d.sameSite)
      switch (typeof d.sameSite == "string" ? d.sameSite.toLowerCase() : d.sameSite) {
        case !0:
        case "strict":
          b += "; SameSite=Strict";
          break;
        case "lax":
          b += "; SameSite=Lax";
          break;
        case "none":
          b += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${d.sameSite}`);
      }
    return b;
  }
  function f(p) {
    if (p.indexOf("%") === -1)
      return p;
    try {
      return decodeURIComponent(p);
    } catch {
      return p;
    }
  }
  function x(p) {
    return n.call(p) === "[object Date]";
  }
  return xe;
}
Cn();
/**
 * react-router v7.5.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function B(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function J(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function He({
  pathname: e = "/",
  search: t = "",
  hash: r = ""
}) {
  return t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t), r && r !== "#" && (e += r.charAt(0) === "#" ? r : "#" + r), e;
}
function Ke(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substring(r), e = e.substring(0, r));
    let o = e.indexOf("?");
    o >= 0 && (t.search = e.substring(o), e = e.substring(0, o)), e && (t.pathname = e);
  }
  return t;
}
function Gt(e, t, r = "/") {
  return Rn(e, t, r, !1);
}
function Rn(e, t, r, o) {
  let n = typeof t == "string" ? Ke(t) : t, a = oe(n.pathname || "/", r);
  if (a == null)
    return null;
  let s = Wt(e);
  Sn(s);
  let l = null;
  for (let i = 0; l == null && i < s.length; ++i) {
    let c = zn(a);
    l = On(
      s[i],
      c,
      o
    );
  }
  return l;
}
function Wt(e, t = [], r = [], o = "") {
  let n = (a, s, l) => {
    let i = {
      relativePath: l === void 0 ? a.path || "" : l,
      caseSensitive: a.caseSensitive === !0,
      childrenIndex: s,
      route: a
    };
    i.relativePath.startsWith("/") && (B(
      i.relativePath.startsWith(o),
      `Absolute route path "${i.relativePath}" nested under path "${o}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
    ), i.relativePath = i.relativePath.slice(o.length));
    let c = Z([o, i.relativePath]), f = r.concat(i);
    a.children && a.children.length > 0 && (B(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      a.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${c}".`
    ), Wt(a.children, t, f, c)), !(a.path == null && !a.index) && t.push({
      path: c,
      score: In(c, a.index),
      routesMeta: f
    });
  };
  return e.forEach((a, s) => {
    var l;
    if (a.path === "" || !((l = a.path) != null && l.includes("?")))
      n(a, s);
    else
      for (let i of Ut(a.path))
        n(a, s, i);
  }), t;
}
function Ut(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [r, ...o] = t, n = r.endsWith("?"), a = r.replace(/\?$/, "");
  if (o.length === 0)
    return n ? [a, ""] : [a];
  let s = Ut(o.join("/")), l = [];
  return l.push(
    ...s.map(
      (i) => i === "" ? a : [a, i].join("/")
    )
  ), n && l.push(...s), l.map(
    (i) => e.startsWith("/") && i === "" ? "/" : i
  );
}
function Sn(e) {
  e.sort(
    (t, r) => t.score !== r.score ? r.score - t.score : _n(
      t.routesMeta.map((o) => o.childrenIndex),
      r.routesMeta.map((o) => o.childrenIndex)
    )
  );
}
var Nn = /^:[\w-]+$/, Pn = 3, jn = 2, An = 1, Tn = 10, Ln = -2, vt = (e) => e === "*";
function In(e, t) {
  let r = e.split("/"), o = r.length;
  return r.some(vt) && (o += Ln), t && (o += jn), r.filter((n) => !vt(n)).reduce(
    (n, a) => n + (Nn.test(a) ? Pn : a === "" ? An : Tn),
    o
  );
}
function _n(e, t) {
  return e.length === t.length && e.slice(0, -1).every((o, n) => o === t[n]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    e[e.length - 1] - t[t.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function On(e, t, r = !1) {
  let { routesMeta: o } = e, n = {}, a = "/", s = [];
  for (let l = 0; l < o.length; ++l) {
    let i = o[l], c = l === o.length - 1, f = a === "/" ? t : t.slice(a.length) || "/", x = Te(
      { path: i.relativePath, caseSensitive: i.caseSensitive, end: c },
      f
    ), p = i.route;
    if (!x && c && r && !o[o.length - 1].route.index && (x = Te(
      {
        path: i.relativePath,
        caseSensitive: i.caseSensitive,
        end: !1
      },
      f
    )), !x)
      return null;
    Object.assign(n, x.params), s.push({
      // TODO: Can this as be avoided?
      params: n,
      pathname: Z([a, x.pathname]),
      pathnameBase: Bn(
        Z([a, x.pathnameBase])
      ),
      route: p
    }), x.pathnameBase !== "/" && (a = Z([a, x.pathnameBase]));
  }
  return s;
}
function Te(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, o] = $n(
    e.path,
    e.caseSensitive,
    e.end
  ), n = t.match(r);
  if (!n) return null;
  let a = n[0], s = a.replace(/(.)\/+$/, "$1"), l = n.slice(1);
  return {
    params: o.reduce(
      (c, { paramName: f, isOptional: x }, p) => {
        if (f === "*") {
          let d = l[p] || "";
          s = a.slice(0, a.length - d.length).replace(/(.)\/+$/, "$1");
        }
        const v = l[p];
        return x && !v ? c[f] = void 0 : c[f] = (v || "").replace(/%2F/g, "/"), c;
      },
      {}
    ),
    pathname: a,
    pathnameBase: s,
    pattern: e
  };
}
function $n(e, t = !1, r = !0) {
  J(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`
  );
  let o = [], n = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (s, l, i) => (o.push({ paramName: l, isOptional: i != null }), i ? "/?([^\\/]+)?" : "/([^\\/]+)")
  );
  return e.endsWith("*") ? (o.push({ paramName: "*" }), n += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? n += "\\/*$" : e !== "" && e !== "/" && (n += "(?:(?=\\/|$))"), [new RegExp(n, t ? void 0 : "i"), o];
}
function zn(e) {
  try {
    return e.split("/").map((t) => decodeURIComponent(t).replace(/\//g, "%2F")).join("/");
  } catch (t) {
    return J(
      !1,
      `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`
    ), e;
  }
}
function oe(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length, o = e.charAt(r);
  return o && o !== "/" ? null : e.slice(r) || "/";
}
function Mn(e, t = "/") {
  let {
    pathname: r,
    search: o = "",
    hash: n = ""
  } = typeof e == "string" ? Ke(e) : e;
  return {
    pathname: r ? r.startsWith("/") ? r : Fn(r, t) : t,
    search: Vn(o),
    hash: Gn(n)
  };
}
function Fn(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((n) => {
    n === ".." ? r.length > 1 && r.pop() : n !== "." && r.push(n);
  }), r.length > 1 ? r.join("/") : "/";
}
function Fe(e, t, r, o) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(
    o
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Dn(e) {
  return e.filter(
    (t, r) => r === 0 || t.route.path && t.route.path.length > 0
  );
}
function Ht(e) {
  let t = Dn(e);
  return t.map(
    (r, o) => o === t.length - 1 ? r.pathname : r.pathnameBase
  );
}
function Yt(e, t, r, o = !1) {
  let n;
  typeof e == "string" ? n = Ke(e) : (n = { ...e }, B(
    !n.pathname || !n.pathname.includes("?"),
    Fe("?", "pathname", "search", n)
  ), B(
    !n.pathname || !n.pathname.includes("#"),
    Fe("#", "pathname", "hash", n)
  ), B(
    !n.search || !n.search.includes("#"),
    Fe("#", "search", "hash", n)
  ));
  let a = e === "" || n.pathname === "", s = a ? "/" : n.pathname, l;
  if (s == null)
    l = r;
  else {
    let x = t.length - 1;
    if (!o && s.startsWith("..")) {
      let p = s.split("/");
      for (; p[0] === ".."; )
        p.shift(), x -= 1;
      n.pathname = p.join("/");
    }
    l = x >= 0 ? t[x] : "/";
  }
  let i = Mn(n, l), c = s && s !== "/" && s.endsWith("/"), f = (a || s === ".") && r.endsWith("/");
  return !i.pathname.endsWith("/") && (c || f) && (i.pathname += "/"), i;
}
var Z = (e) => e.join("/").replace(/\/\/+/g, "/"), Bn = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), Vn = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, Gn = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
function Wn(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
var qt = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
new Set(
  qt
);
var Un = [
  "GET",
  ...qt
];
new Set(Un);
var fe = u.createContext(null);
fe.displayName = "DataRouter";
var _e = u.createContext(null);
_e.displayName = "DataRouterState";
var Jt = u.createContext({
  isTransitioning: !1
});
Jt.displayName = "ViewTransition";
var Hn = u.createContext(
  /* @__PURE__ */ new Map()
);
Hn.displayName = "Fetchers";
var Yn = u.createContext(null);
Yn.displayName = "Await";
var ee = u.createContext(
  null
);
ee.displayName = "Navigation";
var Xe = u.createContext(
  null
);
Xe.displayName = "Location";
var te = u.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
te.displayName = "Route";
var Qe = u.createContext(null);
Qe.displayName = "RouteError";
function qn(e, { relative: t } = {}) {
  B(
    Oe(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: o } = u.useContext(ee), { hash: n, pathname: a, search: s } = ye(e, { relative: t }), l = a;
  return r !== "/" && (l = a === "/" ? r : Z([r, a])), o.createHref({ pathname: l, search: s, hash: n });
}
function Oe() {
  return u.useContext(Xe) != null;
}
function ae() {
  return B(
    Oe(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), u.useContext(Xe).location;
}
var Kt = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Xt(e) {
  u.useContext(ee).static || u.useLayoutEffect(e);
}
function Ze() {
  let { isDataRoute: e } = u.useContext(te);
  return e ? io() : Jn();
}
function Jn() {
  B(
    Oe(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = u.useContext(fe), { basename: t, navigator: r } = u.useContext(ee), { matches: o } = u.useContext(te), { pathname: n } = ae(), a = JSON.stringify(Ht(o)), s = u.useRef(!1);
  return Xt(() => {
    s.current = !0;
  }), u.useCallback(
    (i, c = {}) => {
      if (J(s.current, Kt), !s.current) return;
      if (typeof i == "number") {
        r.go(i);
        return;
      }
      let f = Yt(
        i,
        JSON.parse(a),
        n,
        c.relative === "path"
      );
      e == null && t !== "/" && (f.pathname = f.pathname === "/" ? t : Z([t, f.pathname])), (c.replace ? r.replace : r.push)(
        f,
        c.state,
        c
      );
    },
    [
      t,
      r,
      a,
      n,
      e
    ]
  );
}
u.createContext(null);
function ye(e, { relative: t } = {}) {
  let { matches: r } = u.useContext(te), { pathname: o } = ae(), n = JSON.stringify(Ht(r));
  return u.useMemo(
    () => Yt(
      e,
      JSON.parse(n),
      o,
      t === "path"
    ),
    [e, n, o, t]
  );
}
function Kn(e, t, r, o) {
  B(
    Oe(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: n, static: a } = u.useContext(ee), { matches: s } = u.useContext(te), l = s[s.length - 1], i = l ? l.params : {}, c = l ? l.pathname : "/", f = l ? l.pathnameBase : "/", x = l && l.route;
  {
    let C = x && x.path || "";
    Qt(
      c,
      !x || C.endsWith("*") || C.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${C}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${C}"> to <Route path="${C === "/" ? "*" : `${C}/*`}">.`
    );
  }
  let p = ae(), v;
  v = p;
  let d = v.pathname || "/", h = d;
  if (f !== "/") {
    let C = f.replace(/^\//, "").split("/");
    h = "/" + d.replace(/^\//, "").split("/").slice(C.length).join("/");
  }
  let k = !a && r && r.matches && r.matches.length > 0 ? r.matches : Gt(e, { pathname: h });
  return J(
    x || k != null,
    `No routes matched location "${v.pathname}${v.search}${v.hash}" `
  ), J(
    k == null || k[k.length - 1].route.element !== void 0 || k[k.length - 1].route.Component !== void 0 || k[k.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${v.pathname}${v.search}${v.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), to(
    k && k.map(
      (C) => Object.assign({}, C, {
        params: Object.assign({}, i, C.params),
        pathname: Z([
          f,
          // Re-encode pathnames that were decoded inside matchRoutes
          n.encodeLocation ? n.encodeLocation(C.pathname).pathname : C.pathname
        ]),
        pathnameBase: C.pathnameBase === "/" ? f : Z([
          f,
          // Re-encode pathnames that were decoded inside matchRoutes
          n.encodeLocation ? n.encodeLocation(C.pathnameBase).pathname : C.pathnameBase
        ])
      })
    ),
    s,
    r,
    o
  );
}
function Xn() {
  let e = so(), t = Wn(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, o = "rgba(200,200,200, 0.5)", n = { padding: "0.5rem", backgroundColor: o }, a = { padding: "2px 4px", backgroundColor: o }, s = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), s = /* @__PURE__ */ u.createElement(u.Fragment, null, /* @__PURE__ */ u.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ u.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ u.createElement("code", { style: a }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ u.createElement("code", { style: a }, "errorElement"), " prop on your route.")), /* @__PURE__ */ u.createElement(u.Fragment, null, /* @__PURE__ */ u.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ u.createElement("h3", { style: { fontStyle: "italic" } }, t), r ? /* @__PURE__ */ u.createElement("pre", { style: n }, r) : null, s);
}
var Qn = /* @__PURE__ */ u.createElement(Xn, null), Zn = class extends u.Component {
  constructor(e) {
    super(e), this.state = {
      location: e.location,
      revalidation: e.revalidation,
      error: e.error
    };
  }
  static getDerivedStateFromError(e) {
    return { error: e };
  }
  static getDerivedStateFromProps(e, t) {
    return t.location !== e.location || t.revalidation !== "idle" && e.revalidation === "idle" ? {
      error: e.error,
      location: e.location,
      revalidation: e.revalidation
    } : {
      error: e.error !== void 0 ? e.error : t.error,
      location: t.location,
      revalidation: e.revalidation || t.revalidation
    };
  }
  componentDidCatch(e, t) {
    console.error(
      "React Router caught the following error during render",
      e,
      t
    );
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ u.createElement(te.Provider, { value: this.props.routeContext }, /* @__PURE__ */ u.createElement(
      Qe.Provider,
      {
        value: this.state.error,
        children: this.props.component
      }
    )) : this.props.children;
  }
};
function eo({ routeContext: e, match: t, children: r }) {
  let o = u.useContext(fe);
  return o && o.static && o.staticContext && (t.route.errorElement || t.route.ErrorBoundary) && (o.staticContext._deepestRenderedBoundaryId = t.route.id), /* @__PURE__ */ u.createElement(te.Provider, { value: e }, r);
}
function to(e, t = [], r = null, o = null) {
  if (e == null) {
    if (!r)
      return null;
    if (r.errors)
      e = r.matches;
    else if (t.length === 0 && !r.initialized && r.matches.length > 0)
      e = r.matches;
    else
      return null;
  }
  let n = e, a = r == null ? void 0 : r.errors;
  if (a != null) {
    let i = n.findIndex(
      (c) => c.route.id && (a == null ? void 0 : a[c.route.id]) !== void 0
    );
    B(
      i >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        a
      ).join(",")}`
    ), n = n.slice(
      0,
      Math.min(n.length, i + 1)
    );
  }
  let s = !1, l = -1;
  if (r)
    for (let i = 0; i < n.length; i++) {
      let c = n[i];
      if ((c.route.HydrateFallback || c.route.hydrateFallbackElement) && (l = i), c.route.id) {
        let { loaderData: f, errors: x } = r, p = c.route.loader && !f.hasOwnProperty(c.route.id) && (!x || x[c.route.id] === void 0);
        if (c.route.lazy || p) {
          s = !0, l >= 0 ? n = n.slice(0, l + 1) : n = [n[0]];
          break;
        }
      }
    }
  return n.reduceRight((i, c, f) => {
    let x, p = !1, v = null, d = null;
    r && (x = a && c.route.id ? a[c.route.id] : void 0, v = c.route.errorElement || Qn, s && (l < 0 && f === 0 ? (Qt(
      "route-fallback",
      !1,
      "No `HydrateFallback` element provided to render during initial hydration"
    ), p = !0, d = null) : l === f && (p = !0, d = c.route.hydrateFallbackElement || null)));
    let h = t.concat(n.slice(0, f + 1)), k = () => {
      let b;
      return x ? b = v : p ? b = d : c.route.Component ? b = /* @__PURE__ */ u.createElement(c.route.Component, null) : c.route.element ? b = c.route.element : b = i, /* @__PURE__ */ u.createElement(
        eo,
        {
          match: c,
          routeContext: {
            outlet: i,
            matches: h,
            isDataRoute: r != null
          },
          children: b
        }
      );
    };
    return r && (c.route.ErrorBoundary || c.route.errorElement || f === 0) ? /* @__PURE__ */ u.createElement(
      Zn,
      {
        location: r.location,
        revalidation: r.revalidation,
        component: v,
        error: x,
        children: k(),
        routeContext: { outlet: null, matches: h, isDataRoute: !0 }
      }
    ) : k();
  }, null);
}
function et(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function ro(e) {
  let t = u.useContext(fe);
  return B(t, et(e)), t;
}
function no(e) {
  let t = u.useContext(_e);
  return B(t, et(e)), t;
}
function oo(e) {
  let t = u.useContext(te);
  return B(t, et(e)), t;
}
function tt(e) {
  let t = oo(e), r = t.matches[t.matches.length - 1];
  return B(
    r.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function ao() {
  return tt(
    "useRouteId"
    /* UseRouteId */
  );
}
function so() {
  var o;
  let e = u.useContext(Qe), t = no(
    "useRouteError"
    /* UseRouteError */
  ), r = tt(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : (o = t.errors) == null ? void 0 : o[r];
}
function io() {
  let { router: e } = ro(
    "useNavigate"
    /* UseNavigateStable */
  ), t = tt(
    "useNavigate"
    /* UseNavigateStable */
  ), r = u.useRef(!1);
  return Xt(() => {
    r.current = !0;
  }), u.useCallback(
    async (n, a = {}) => {
      J(r.current, Kt), r.current && (typeof n == "number" ? e.navigate(n) : await e.navigate(n, { fromRouteId: t, ...a }));
    },
    [e, t]
  );
}
var yt = {};
function Qt(e, t, r) {
  !t && !yt[e] && (yt[e] = !0, J(!1, r));
}
u.memo(lo);
function lo({
  routes: e,
  future: t,
  state: r
}) {
  return Kn(e, void 0, r, t);
}
var Pe = "get", je = "application/x-www-form-urlencoded";
function $e(e) {
  return e != null && typeof e.tagName == "string";
}
function co(e) {
  return $e(e) && e.tagName.toLowerCase() === "button";
}
function uo(e) {
  return $e(e) && e.tagName.toLowerCase() === "form";
}
function fo(e) {
  return $e(e) && e.tagName.toLowerCase() === "input";
}
function mo(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function po(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !mo(e);
}
function Ye(e = "") {
  return new URLSearchParams(
    typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams ? e : Object.keys(e).reduce((t, r) => {
      let o = e[r];
      return t.concat(
        Array.isArray(o) ? o.map((n) => [r, n]) : [[r, o]]
      );
    }, [])
  );
}
function ho(e, t) {
  let r = Ye(e);
  return t && t.forEach((o, n) => {
    r.has(n) || t.getAll(n).forEach((a) => {
      r.append(n, a);
    });
  }), r;
}
var Se = null;
function go() {
  if (Se === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), Se = !1;
    } catch {
      Se = !0;
    }
  return Se;
}
var bo = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function De(e) {
  return e != null && !bo.has(e) ? (J(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${je}"`
  ), null) : e;
}
function xo(e, t) {
  let r, o, n, a, s;
  if (uo(e)) {
    let l = e.getAttribute("action");
    o = l ? oe(l, t) : null, r = e.getAttribute("method") || Pe, n = De(e.getAttribute("enctype")) || je, a = new FormData(e);
  } else if (co(e) || fo(e) && (e.type === "submit" || e.type === "image")) {
    let l = e.form;
    if (l == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let i = e.getAttribute("formaction") || l.getAttribute("action");
    if (o = i ? oe(i, t) : null, r = e.getAttribute("formmethod") || l.getAttribute("method") || Pe, n = De(e.getAttribute("formenctype")) || De(l.getAttribute("enctype")) || je, a = new FormData(l, e), !go()) {
      let { name: c, type: f, value: x } = e;
      if (f === "image") {
        let p = c ? `${c}.` : "";
        a.append(`${p}x`, "0"), a.append(`${p}y`, "0");
      } else c && a.append(c, x);
    }
  } else {
    if ($e(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = Pe, o = null, n = je, s = e;
  }
  return a && n === "text/plain" && (s = a, a = void 0), { action: o, method: r.toLowerCase(), encType: n, formData: a, body: s };
}
function rt(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
async function vo(e, t) {
  if (e.id in t)
    return t[e.id];
  try {
    let r = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      e.module
    );
    return t[e.id] = r, r;
  } catch (r) {
    return console.error(
      `Error loading route module \`${e.module}\`, reloading page...`
    ), console.error(r), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function yo(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function wo(e, t, r) {
  let o = await Promise.all(
    e.map(async (n) => {
      let a = t.routes[n.route.id];
      if (a) {
        let s = await vo(a, r);
        return s.links ? s.links() : [];
      }
      return [];
    })
  );
  return Ro(
    o.flat(1).filter(yo).filter((n) => n.rel === "stylesheet" || n.rel === "preload").map(
      (n) => n.rel === "stylesheet" ? { ...n, rel: "prefetch", as: "style" } : { ...n, rel: "prefetch" }
    )
  );
}
function wt(e, t, r, o, n, a) {
  let s = (i, c) => r[c] ? i.route.id !== r[c].route.id : !0, l = (i, c) => {
    var f;
    return (
      // param change, /users/123 -> /users/456
      r[c].pathname !== i.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      ((f = r[c].route.path) == null ? void 0 : f.endsWith("*")) && r[c].params["*"] !== i.params["*"]
    );
  };
  return a === "assets" ? t.filter(
    (i, c) => s(i, c) || l(i, c)
  ) : a === "data" ? t.filter((i, c) => {
    var x;
    let f = o.routes[i.route.id];
    if (!f || !f.hasLoader)
      return !1;
    if (s(i, c) || l(i, c))
      return !0;
    if (i.route.shouldRevalidate) {
      let p = i.route.shouldRevalidate({
        currentUrl: new URL(
          n.pathname + n.search + n.hash,
          window.origin
        ),
        currentParams: ((x = r[0]) == null ? void 0 : x.params) || {},
        nextUrl: new URL(e, window.origin),
        nextParams: i.params,
        defaultShouldRevalidate: !0
      });
      if (typeof p == "boolean")
        return p;
    }
    return !0;
  }) : [];
}
function ko(e, t, { includeHydrateFallback: r } = {}) {
  return Eo(
    e.map((o) => {
      let n = t.routes[o.route.id];
      if (!n) return [];
      let a = [n.module];
      return n.clientActionModule && (a = a.concat(n.clientActionModule)), n.clientLoaderModule && (a = a.concat(n.clientLoaderModule)), r && n.hydrateFallbackModule && (a = a.concat(n.hydrateFallbackModule)), n.imports && (a = a.concat(n.imports)), a;
    }).flat(1)
  );
}
function Eo(e) {
  return [...new Set(e)];
}
function Co(e) {
  let t = {}, r = Object.keys(e).sort();
  for (let o of r)
    t[o] = e[o];
  return t;
}
function Ro(e, t) {
  let r = /* @__PURE__ */ new Set();
  return new Set(t), e.reduce((o, n) => {
    let a = JSON.stringify(Co(n));
    return r.has(a) || (r.add(a), o.push({ key: a, link: n })), o;
  }, []);
}
var So = /* @__PURE__ */ new Set([100, 101, 204, 205]);
function No(e, t) {
  let r = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return r.pathname === "/" ? r.pathname = "_root.data" : t && oe(r.pathname, t) === "/" ? r.pathname = `${t.replace(/\/$/, "")}/_root.data` : r.pathname = `${r.pathname.replace(/\/$/, "")}.data`, r;
}
function Zt() {
  let e = u.useContext(fe);
  return rt(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function Po() {
  let e = u.useContext(_e);
  return rt(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var nt = u.createContext(void 0);
nt.displayName = "FrameworkContext";
function er() {
  let e = u.useContext(nt);
  return rt(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function jo(e, t) {
  let r = u.useContext(nt), [o, n] = u.useState(!1), [a, s] = u.useState(!1), { onFocus: l, onBlur: i, onMouseEnter: c, onMouseLeave: f, onTouchStart: x } = t, p = u.useRef(null);
  u.useEffect(() => {
    if (e === "render" && s(!0), e === "viewport") {
      let h = (b) => {
        b.forEach((C) => {
          s(C.isIntersecting);
        });
      }, k = new IntersectionObserver(h, { threshold: 0.5 });
      return p.current && k.observe(p.current), () => {
        k.disconnect();
      };
    }
  }, [e]), u.useEffect(() => {
    if (o) {
      let h = setTimeout(() => {
        s(!0);
      }, 100);
      return () => {
        clearTimeout(h);
      };
    }
  }, [o]);
  let v = () => {
    n(!0);
  }, d = () => {
    n(!1), s(!1);
  };
  return r ? e !== "intent" ? [a, p, {}] : [
    a,
    p,
    {
      onFocus: ve(l, v),
      onBlur: ve(i, d),
      onMouseEnter: ve(c, v),
      onMouseLeave: ve(f, d),
      onTouchStart: ve(x, v)
    }
  ] : [!1, p, {}];
}
function ve(e, t) {
  return (r) => {
    e && e(r), r.defaultPrevented || t(r);
  };
}
function Ao({
  page: e,
  ...t
}) {
  let { router: r } = Zt(), o = u.useMemo(
    () => Gt(r.routes, e, r.basename),
    [r.routes, e, r.basename]
  );
  return o ? /* @__PURE__ */ u.createElement(Lo, { page: e, matches: o, ...t }) : null;
}
function To(e) {
  let { manifest: t, routeModules: r } = er(), [o, n] = u.useState([]);
  return u.useEffect(() => {
    let a = !1;
    return wo(e, t, r).then(
      (s) => {
        a || n(s);
      }
    ), () => {
      a = !0;
    };
  }, [e, t, r]), o;
}
function Lo({
  page: e,
  matches: t,
  ...r
}) {
  let o = ae(), { manifest: n, routeModules: a } = er(), { basename: s } = Zt(), { loaderData: l, matches: i } = Po(), c = u.useMemo(
    () => wt(
      e,
      t,
      i,
      n,
      o,
      "data"
    ),
    [e, t, i, n, o]
  ), f = u.useMemo(
    () => wt(
      e,
      t,
      i,
      n,
      o,
      "assets"
    ),
    [e, t, i, n, o]
  ), x = u.useMemo(() => {
    if (e === o.pathname + o.search + o.hash)
      return [];
    let d = /* @__PURE__ */ new Set(), h = !1;
    if (t.forEach((b) => {
      var P;
      let C = n.routes[b.route.id];
      !C || !C.hasLoader || (!c.some((T) => T.route.id === b.route.id) && b.route.id in l && ((P = a[b.route.id]) != null && P.shouldRevalidate) || C.hasClientLoader ? h = !0 : d.add(b.route.id));
    }), d.size === 0)
      return [];
    let k = No(e, s);
    return h && d.size > 0 && k.searchParams.set(
      "_routes",
      t.filter((b) => d.has(b.route.id)).map((b) => b.route.id).join(",")
    ), [k.pathname + k.search];
  }, [
    s,
    l,
    o,
    n,
    c,
    t,
    e,
    a
  ]), p = u.useMemo(
    () => ko(f, n),
    [f, n]
  ), v = To(f);
  return /* @__PURE__ */ u.createElement(u.Fragment, null, x.map((d) => /* @__PURE__ */ u.createElement("link", { key: d, rel: "prefetch", as: "fetch", href: d, ...r })), p.map((d) => /* @__PURE__ */ u.createElement("link", { key: d, rel: "modulepreload", href: d, ...r })), v.map(({ key: d, link: h }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ u.createElement("link", { key: d, ...h })
  )));
}
function Io(...e) {
  return (t) => {
    e.forEach((r) => {
      typeof r == "function" ? r(t) : r != null && (r.current = t);
    });
  };
}
var tr = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  tr && (window.__reactRouterVersion = "7.5.3");
} catch {
}
var rr = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, nr = u.forwardRef(
  function({
    onClick: t,
    discover: r = "render",
    prefetch: o = "none",
    relative: n,
    reloadDocument: a,
    replace: s,
    state: l,
    target: i,
    to: c,
    preventScrollReset: f,
    viewTransition: x,
    ...p
  }, v) {
    let { basename: d } = u.useContext(ee), h = typeof c == "string" && rr.test(c), k, b = !1;
    if (typeof c == "string" && h && (k = c, tr))
      try {
        let L = new URL(window.location.href), V = c.startsWith("//") ? new URL(L.protocol + c) : new URL(c), W = oe(V.pathname, d);
        V.origin === L.origin && W != null ? c = W + V.search + V.hash : b = !0;
      } catch {
        J(
          !1,
          `<Link to="${c}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let C = qn(c, { relative: n }), [P, T, O] = jo(
      o,
      p
    ), M = zo(c, {
      replace: s,
      state: l,
      target: i,
      preventScrollReset: f,
      relative: n,
      viewTransition: x
    });
    function R(L) {
      t && t(L), L.defaultPrevented || M(L);
    }
    let E = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ u.createElement(
        "a",
        {
          ...p,
          ...O,
          href: k || C,
          onClick: b || a ? t : R,
          ref: Io(v, T),
          target: i,
          "data-discover": !h && r === "render" ? "true" : void 0
        }
      )
    );
    return P && !h ? /* @__PURE__ */ u.createElement(u.Fragment, null, E, /* @__PURE__ */ u.createElement(Ao, { page: C })) : E;
  }
);
nr.displayName = "Link";
var _o = u.forwardRef(
  function({
    "aria-current": t = "page",
    caseSensitive: r = !1,
    className: o = "",
    end: n = !1,
    style: a,
    to: s,
    viewTransition: l,
    children: i,
    ...c
  }, f) {
    let x = ye(s, { relative: c.relative }), p = ae(), v = u.useContext(_e), { navigator: d, basename: h } = u.useContext(ee), k = v != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    Go(x) && l === !0, b = d.encodeLocation ? d.encodeLocation(x).pathname : x.pathname, C = p.pathname, P = v && v.navigation && v.navigation.location ? v.navigation.location.pathname : null;
    r || (C = C.toLowerCase(), P = P ? P.toLowerCase() : null, b = b.toLowerCase()), P && h && (P = oe(P, h) || P);
    const T = b !== "/" && b.endsWith("/") ? b.length - 1 : b.length;
    let O = C === b || !n && C.startsWith(b) && C.charAt(T) === "/", M = P != null && (P === b || !n && P.startsWith(b) && P.charAt(b.length) === "/"), R = {
      isActive: O,
      isPending: M,
      isTransitioning: k
    }, E = O ? t : void 0, L;
    typeof o == "function" ? L = o(R) : L = [
      o,
      O ? "active" : null,
      M ? "pending" : null,
      k ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let V = typeof a == "function" ? a(R) : a;
    return /* @__PURE__ */ u.createElement(
      nr,
      {
        ...c,
        "aria-current": E,
        className: L,
        ref: f,
        style: V,
        to: s,
        viewTransition: l
      },
      typeof i == "function" ? i(R) : i
    );
  }
);
_o.displayName = "NavLink";
var Oo = u.forwardRef(
  ({
    discover: e = "render",
    fetcherKey: t,
    navigate: r,
    reloadDocument: o,
    replace: n,
    state: a,
    method: s = Pe,
    action: l,
    onSubmit: i,
    relative: c,
    preventScrollReset: f,
    viewTransition: x,
    ...p
  }, v) => {
    let d = Bo(), h = Vo(l, { relative: c }), k = s.toLowerCase() === "get" ? "get" : "post", b = typeof l == "string" && rr.test(l), C = (P) => {
      if (i && i(P), P.defaultPrevented) return;
      P.preventDefault();
      let T = P.nativeEvent.submitter, O = (T == null ? void 0 : T.getAttribute("formmethod")) || s;
      d(T || P.currentTarget, {
        fetcherKey: t,
        method: O,
        navigate: r,
        replace: n,
        state: a,
        relative: c,
        preventScrollReset: f,
        viewTransition: x
      });
    };
    return /* @__PURE__ */ u.createElement(
      "form",
      {
        ref: v,
        method: k,
        action: h,
        onSubmit: o ? i : C,
        ...p,
        "data-discover": !b && e === "render" ? "true" : void 0
      }
    );
  }
);
Oo.displayName = "Form";
function $o(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function or(e) {
  let t = u.useContext(fe);
  return B(t, $o(e)), t;
}
function zo(e, {
  target: t,
  replace: r,
  state: o,
  preventScrollReset: n,
  relative: a,
  viewTransition: s
} = {}) {
  let l = Ze(), i = ae(), c = ye(e, { relative: a });
  return u.useCallback(
    (f) => {
      if (po(f, t)) {
        f.preventDefault();
        let x = r !== void 0 ? r : He(i) === He(c);
        l(e, {
          replace: x,
          state: o,
          preventScrollReset: n,
          relative: a,
          viewTransition: s
        });
      }
    },
    [
      i,
      l,
      c,
      r,
      o,
      t,
      e,
      n,
      a,
      s
    ]
  );
}
function Mo(e) {
  J(
    typeof URLSearchParams < "u",
    "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params."
  );
  let t = u.useRef(Ye(e)), r = u.useRef(!1), o = ae(), n = u.useMemo(
    () => (
      // Only merge in the defaults if we haven't yet called setSearchParams.
      // Once we call that we want those to take precedence, otherwise you can't
      // remove a param with setSearchParams({}) if it has an initial value
      ho(
        o.search,
        r.current ? null : t.current
      )
    ),
    [o.search]
  ), a = Ze(), s = u.useCallback(
    (l, i) => {
      const c = Ye(
        typeof l == "function" ? l(n) : l
      );
      r.current = !0, a("?" + c, i);
    },
    [a, n]
  );
  return [n, s];
}
var Fo = 0, Do = () => `__${String(++Fo)}__`;
function Bo() {
  let { router: e } = or(
    "useSubmit"
    /* UseSubmit */
  ), { basename: t } = u.useContext(ee), r = ao();
  return u.useCallback(
    async (o, n = {}) => {
      let { action: a, method: s, encType: l, formData: i, body: c } = xo(
        o,
        t
      );
      if (n.navigate === !1) {
        let f = n.fetcherKey || Do();
        await e.fetch(f, r, n.action || a, {
          preventScrollReset: n.preventScrollReset,
          formData: i,
          body: c,
          formMethod: n.method || s,
          formEncType: n.encType || l,
          flushSync: n.flushSync
        });
      } else
        await e.navigate(n.action || a, {
          preventScrollReset: n.preventScrollReset,
          formData: i,
          body: c,
          formMethod: n.method || s,
          formEncType: n.encType || l,
          replace: n.replace,
          state: n.state,
          fromRouteId: r,
          flushSync: n.flushSync,
          viewTransition: n.viewTransition
        });
    },
    [e, t, r]
  );
}
function Vo(e, { relative: t } = {}) {
  let { basename: r } = u.useContext(ee), o = u.useContext(te);
  B(o, "useFormAction must be used inside a RouteContext");
  let [n] = o.matches.slice(-1), a = { ...ye(e || ".", { relative: t }) }, s = ae();
  if (e == null) {
    a.search = s.search;
    let l = new URLSearchParams(a.search), i = l.getAll("index");
    if (i.some((f) => f === "")) {
      l.delete("index"), i.filter((x) => x).forEach((x) => l.append("index", x));
      let f = l.toString();
      a.search = f ? `?${f}` : "";
    }
  }
  return (!e || e === ".") && n.route.index && (a.search = a.search ? a.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (a.pathname = a.pathname === "/" ? r : Z([r, a.pathname])), He(a);
}
function Go(e, t = {}) {
  let r = u.useContext(Jt);
  B(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: o } = or(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), n = ye(e, { relative: t.relative });
  if (!r.isTransitioning)
    return !1;
  let a = oe(r.currentLocation.pathname, o) || r.currentLocation.pathname, s = oe(r.nextLocation.pathname, o) || r.nextLocation.pathname;
  return Te(n.pathname, s) != null || Te(n.pathname, a) != null;
}
new TextEncoder();
[
  ...So
];
const ar = u.createContext(null);
function ot() {
  const e = u.useContext(ar);
  if (!e)
    throw new Error("useDemoGallery must be used within a DemoGallery");
  return e;
}
function Wo({ demos: e, defaultDemoId: t, className: r, children: o }) {
  const [n] = Mo(), a = Ze(), [s, l] = u.useState(n.get("demo") || t || e[0].id), [i, c] = u.useState(!0), [f, x] = u.useState(""), [p, v] = u.useState(null), [d, h] = u.useState(!1), [k, b] = u.useState(!1), C = e.find((R) => R.id === s), P = u.useMemo(
    () => Array.from(new Set(e.map((R) => R.category))),
    [e]
  ), T = u.useMemo(
    () => e.filter((R) => {
      var V, W;
      const E = f === "" || R.title.toLowerCase().includes(f.toLowerCase()) || ((V = R.description) == null ? void 0 : V.toLowerCase().includes(f.toLowerCase())) || ((W = R.tags) == null ? void 0 : W.some((K) => K.toLowerCase().includes(f.toLowerCase()))), L = !p || R.category === p;
      return E && L;
    }),
    [e, f, p]
  ), O = u.useCallback((R) => {
    h(!0), l(R), a(`?demo=${R}`), setTimeout(() => h(!1), 300);
  }, [a]), M = u.useMemo(() => ({
    selectedDemo: s,
    setSelectedDemo: O,
    sidebarExpanded: i,
    setSidebarExpanded: c,
    searchQuery: f,
    setSearchQuery: x,
    selectedCategory: p,
    setSelectedCategory: v,
    isLoading: d,
    setIsLoading: h,
    showExpandButton: k,
    setShowExpandButton: b,
    demos: e,
    filteredDemos: T,
    categories: P,
    currentDemo: C
  }), [
    s,
    O,
    i,
    f,
    p,
    d,
    k,
    e,
    T,
    P,
    C
  ]);
  return /* @__PURE__ */ m.jsx(ar.Provider, { value: M, children: /* @__PURE__ */ m.jsx("div", { className: r, children: /* @__PURE__ */ m.jsx("div", { className: "flex h-screen relative", children: o }) }) });
}
function Uo({
  className: e,
  title: t = "组件库演示",
  showSearch: r = !0,
  showCategoryFilter: o = !0,
  showTags: n = !0,
  showDescription: a = !0,
  sidebarWidth: s = "w-64",
  onDemoSelect: l,
  onCategoryChange: i,
  onSearch: c
}) {
  const {
    sidebarExpanded: f,
    setSidebarExpanded: x,
    searchQuery: p,
    setSearchQuery: v,
    selectedCategory: d,
    setSelectedCategory: h,
    categories: k,
    filteredDemos: b,
    selectedDemo: C,
    setSelectedDemo: P
  } = ot(), T = (R) => {
    v(R), c == null || c(R);
  }, O = (R) => {
    h(R), i == null || i(R);
  }, M = (R) => {
    P(R), l == null || l(R);
  };
  return /* @__PURE__ */ m.jsxs(
    "div",
    {
      className: _(
        "flex flex-col bg-card border-r transition-all duration-200 ease-in-out",
        "absolute left-0 top-0 bottom-0 z-20",
        f ? `${s} opacity-100 translate-x-0` : `${s} opacity-0 -translate-x-full`,
        e
      ),
      children: [
        /* @__PURE__ */ m.jsxs("div", { className: "p-4 border-b flex items-center justify-between", children: [
          /* @__PURE__ */ m.jsx("h1", { className: "font-bold text-xl", children: t }),
          /* @__PURE__ */ m.jsx(
            "button",
            {
              onClick: () => x(!1),
              className: "p-1 hover:bg-accent rounded-md",
              children: /* @__PURE__ */ m.jsx(Ve, { size: 16 })
            }
          )
        ] }),
        r && /* @__PURE__ */ m.jsx("div", { className: "p-2 border-b", children: /* @__PURE__ */ m.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ m.jsx(Ct, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ m.jsx(
            "input",
            {
              type: "text",
              placeholder: "搜索 demo...",
              value: p,
              onChange: (R) => T(R.target.value),
              className: "w-full pl-8 pr-2 py-1.5 rounded-md bg-muted/50 text-sm"
            }
          )
        ] }) }),
        o && /* @__PURE__ */ m.jsx("div", { className: "p-2 border-b", children: /* @__PURE__ */ m.jsxs(
          "select",
          {
            value: d || "",
            onChange: (R) => O(R.target.value || null),
            className: "w-full px-2 py-1.5 rounded-md bg-muted/50 text-sm",
            children: [
              /* @__PURE__ */ m.jsx("option", { value: "", children: "所有分类" }),
              k.map((R) => /* @__PURE__ */ m.jsx("option", { value: R, children: R }, R))
            ]
          }
        ) }),
        /* @__PURE__ */ m.jsx("nav", { className: "flex-1 overflow-y-auto p-2", children: /* @__PURE__ */ m.jsx("ul", { className: "space-y-1", children: b.map((R) => /* @__PURE__ */ m.jsx("li", { children: /* @__PURE__ */ m.jsxs(
          "button",
          {
            onClick: () => M(R.id),
            className: _(
              "w-full text-left px-3 py-2 rounded-md transition-colors duration-200",
              C === R.id ? "bg-accent text-accent-foreground" : "hover:bg-muted/50"
            ),
            children: [
              /* @__PURE__ */ m.jsx("div", { className: "font-medium", children: R.title }),
              a && R.description && /* @__PURE__ */ m.jsx("div", { className: "text-sm text-muted-foreground mt-1", children: R.description }),
              n && R.tags && /* @__PURE__ */ m.jsx("div", { className: "flex flex-wrap gap-1 mt-2", children: R.tags.map((E) => /* @__PURE__ */ m.jsx(
                "span",
                {
                  className: "px-1.5 py-0.5 text-xs rounded-full bg-muted/50",
                  children: E
                },
                E
              )) })
            ]
          }
        ) }, R.id)) }) })
      ]
    }
  );
}
function Ho() {
  const { sidebarExpanded: e, setSidebarExpanded: t, showExpandButton: r, setShowExpandButton: o } = ot();
  return e ? null : /* @__PURE__ */ m.jsx(
    "div",
    {
      className: "absolute left-0 top-1/2 -translate-y-1/2 z-20",
      onMouseEnter: () => o(!0),
      onMouseLeave: () => o(!1),
      children: /* @__PURE__ */ m.jsx(
        "button",
        {
          onClick: () => t(!0),
          className: _(
            "p-2 rounded-r-md bg-card border border-l-0 shadow-md",
            "transition-all duration-200",
            r ? "translate-x-0" : "-translate-x-2"
          ),
          children: /* @__PURE__ */ m.jsx(Ae, { size: 16 })
        }
      )
    }
  );
}
function Yo({
  className: e,
  showTags: t = !0,
  showDescription: r = !0,
  contentHeight: o = "h-[600px]"
}) {
  const {
    sidebarExpanded: n,
    currentDemo: a,
    isLoading: s,
    selectedCategory: l,
    setSelectedCategory: i
  } = ot();
  return /* @__PURE__ */ m.jsx("main", { className: _(
    "flex-1 overflow-auto transition-all duration-200",
    n ? "ml-64" : "ml-0",
    e
  ), children: /* @__PURE__ */ m.jsx("div", { className: "container mx-auto py-8 px-4", children: /* @__PURE__ */ m.jsx("div", { className: "space-y-12", children: /* @__PURE__ */ m.jsxs("section", { className: "rounded-lg border bg-card shadow-sm", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "p-6 border-b", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "flex items-center text-sm text-muted-foreground mb-4", children: [
        /* @__PURE__ */ m.jsxs(
          "button",
          {
            onClick: () => i(null),
            className: "flex items-center hover:text-foreground",
            children: [
              /* @__PURE__ */ m.jsx(xr, { className: "h-4 w-4 mr-1" }),
              "所有分类"
            ]
          }
        ),
        l && /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
          /* @__PURE__ */ m.jsx(Ae, { className: "h-4 w-4 mx-2" }),
          /* @__PURE__ */ m.jsx("span", { className: "text-foreground", children: l })
        ] })
      ] }),
      /* @__PURE__ */ m.jsx("h2", { className: "text-2xl font-semibold", children: a == null ? void 0 : a.title }),
      r && (a == null ? void 0 : a.description) && /* @__PURE__ */ m.jsx("p", { className: "text-muted-foreground mt-2", children: a.description }),
      t && (a == null ? void 0 : a.tags) && /* @__PURE__ */ m.jsx("div", { className: "flex flex-wrap gap-2 mt-4", children: a.tags.map((c) => /* @__PURE__ */ m.jsx(
        "span",
        {
          className: "px-2 py-1 text-sm rounded-full bg-muted/50",
          children: c
        },
        c
      )) })
    ] }),
    /* @__PURE__ */ m.jsx("div", { className: _("relative", o), children: s ? /* @__PURE__ */ m.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ m.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }) : a == null ? void 0 : a.component })
  ] }) }) }) });
}
const Ne = {
  Root: Wo,
  Sidebar: Uo,
  ExpandButton: Ho,
  Content: Yo
};
function Xo({
  demos: e,
  defaultDemoId: t,
  className: r,
  // 默认配置
  title: o = "组件库演示",
  showSearch: n = !0,
  showCategoryFilter: a = !0,
  showTags: s = !0,
  showDescription: l = !0,
  // 默认样式
  sidebarWidth: i = "w-64",
  contentHeight: c = "h-[600px]",
  // 自定义行为
  onDemoSelect: f,
  onCategoryChange: x,
  onSearch: p
}) {
  return /* @__PURE__ */ m.jsxs(
    Ne.Root,
    {
      demos: e,
      defaultDemoId: t,
      className: r,
      children: [
        /* @__PURE__ */ m.jsx(
          Ne.Sidebar,
          {
            title: o,
            showSearch: n,
            showCategoryFilter: a,
            showTags: s,
            showDescription: l,
            sidebarWidth: i,
            onDemoSelect: f,
            onCategoryChange: x,
            onSearch: p
          }
        ),
        /* @__PURE__ */ m.jsx(Ne.ExpandButton, {}),
        /* @__PURE__ */ m.jsx(
          Ne.Content,
          {
            showTags: s,
            showDescription: l,
            contentHeight: c
          }
        )
      ]
    }
  );
}
export {
  q as ActivityBar,
  un as ActivityBarComponent,
  Ft as ActivityBarContext,
  pn as ActivityGroup,
  kn as ActivityHeaderOptimized,
  mn as ActivityItem,
  Ko as ConfigurableActivityBar,
  Xo as ConfigurableDemoGallery,
  Ne as DemoGallery,
  Yo as DemoGalleryContent,
  ar as DemoGalleryContext,
  Ho as DemoGalleryExpandButton,
  Wo as DemoGalleryRoot,
  Uo as DemoGallerySidebar,
  cn as activityBarVariants,
  gt as defaultBadgeClassName,
  Je as useActivityBar,
  ot as useDemoGallery
};
//# sourceMappingURL=index.js.map
