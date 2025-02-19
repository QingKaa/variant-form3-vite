import { createElementBlock, openBlock, normalizeClass, renderSlot, reactive, createElementVNode, createCommentVNode, toDisplayString, resolveComponent, normalizeStyle, withModifiers, Fragment, createVNode, createBlock, withCtx, createTextVNode, renderList, createSlots, watch, ref, onBeforeUnmount, onMounted, onUnmounted, withDirectives, mergeProps, resolveDynamicComponent, vShow, defineComponent, isVNode } from "vue";
function bind(t, n) {
  return function() {
    return t.apply(n, arguments);
  };
}
const { toString } = Object.prototype, { getPrototypeOf } = Object, kindOf = /* @__PURE__ */ ((t) => (n) => {
  const e = toString.call(n);
  return t[e] || (t[e] = e.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), kindOfTest = (t) => (t = t.toLowerCase(), (n) => kindOf(n) === t), typeOfTest = (t) => (n) => typeof n === t, { isArray } = Array, isUndefined = typeOfTest("undefined");
function isBuffer(t) {
  return t !== null && !isUndefined(t) && t.constructor !== null && !isUndefined(t.constructor) && isFunction(t.constructor.isBuffer) && t.constructor.isBuffer(t);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(t) {
  let n;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? n = ArrayBuffer.isView(t) : n = t && t.buffer && isArrayBuffer(t.buffer), n;
}
const isString = typeOfTest("string"), isFunction = typeOfTest("function"), isNumber = typeOfTest("number"), isObject = (t) => t !== null && typeof t == "object", isBoolean = (t) => t === !0 || t === !1, isPlainObject = (t) => {
  if (kindOf(t) !== "object")
    return !1;
  const n = getPrototypeOf(t);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}, isDate = kindOfTest("Date"), isFile = kindOfTest("File"), isBlob = kindOfTest("Blob"), isFileList = kindOfTest("FileList"), isStream = (t) => isObject(t) && isFunction(t.pipe), isFormData = (t) => {
  let n;
  return t && (typeof FormData == "function" && t instanceof FormData || isFunction(t.append) && ((n = kindOf(t)) === "formdata" || // detect form-data instance
  n === "object" && isFunction(t.toString) && t.toString() === "[object FormData]"));
}, isURLSearchParams = kindOfTest("URLSearchParams"), [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest), trim = (t) => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(t, n, { allOwnKeys: e = !1 } = {}) {
  if (t === null || typeof t > "u")
    return;
  let i, o;
  if (typeof t != "object" && (t = [t]), isArray(t))
    for (i = 0, o = t.length; i < o; i++)
      n.call(null, t[i], i, t);
  else {
    const h = e ? Object.getOwnPropertyNames(t) : Object.keys(t), f = h.length;
    let v;
    for (i = 0; i < f; i++)
      v = h[i], n.call(null, t[v], v, t);
  }
}
function findKey(t, n) {
  n = n.toLowerCase();
  const e = Object.keys(t);
  let i = e.length, o;
  for (; i-- > 0; )
    if (o = e[i], n === o.toLowerCase())
      return o;
  return null;
}
const _global = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, isContextDefined = (t) => !isUndefined(t) && t !== _global;
function merge() {
  const { caseless: t } = isContextDefined(this) && this || {}, n = {}, e = (i, o) => {
    const h = t && findKey(n, o) || o;
    isPlainObject(n[h]) && isPlainObject(i) ? n[h] = merge(n[h], i) : isPlainObject(i) ? n[h] = merge({}, i) : isArray(i) ? n[h] = i.slice() : n[h] = i;
  };
  for (let i = 0, o = arguments.length; i < o; i++)
    arguments[i] && forEach(arguments[i], e);
  return n;
}
const extend = (t, n, e, { allOwnKeys: i } = {}) => (forEach(n, (o, h) => {
  e && isFunction(o) ? t[h] = bind(o, e) : t[h] = o;
}, { allOwnKeys: i }), t), stripBOM = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t), inherits = (t, n, e, i) => {
  t.prototype = Object.create(n.prototype, i), t.prototype.constructor = t, Object.defineProperty(t, "super", {
    value: n.prototype
  }), e && Object.assign(t.prototype, e);
}, toFlatObject = (t, n, e, i) => {
  let o, h, f;
  const v = {};
  if (n = n || {}, t == null) return n;
  do {
    for (o = Object.getOwnPropertyNames(t), h = o.length; h-- > 0; )
      f = o[h], (!i || i(f, t, n)) && !v[f] && (n[f] = t[f], v[f] = !0);
    t = e !== !1 && getPrototypeOf(t);
  } while (t && (!e || e(t, n)) && t !== Object.prototype);
  return n;
}, endsWith = (t, n, e) => {
  t = String(t), (e === void 0 || e > t.length) && (e = t.length), e -= n.length;
  const i = t.indexOf(n, e);
  return i !== -1 && i === e;
}, toArray = (t) => {
  if (!t) return null;
  if (isArray(t)) return t;
  let n = t.length;
  if (!isNumber(n)) return null;
  const e = new Array(n);
  for (; n-- > 0; )
    e[n] = t[n];
  return e;
}, isTypedArray = /* @__PURE__ */ ((t) => (n) => t && n instanceof t)(typeof Uint8Array < "u" && getPrototypeOf(Uint8Array)), forEachEntry = (t, n) => {
  const i = (t && t[Symbol.iterator]).call(t);
  let o;
  for (; (o = i.next()) && !o.done; ) {
    const h = o.value;
    n.call(t, h[0], h[1]);
  }
}, matchAll = (t, n) => {
  let e;
  const i = [];
  for (; (e = t.exec(n)) !== null; )
    i.push(e);
  return i;
}, isHTMLForm = kindOfTest("HTMLFormElement"), toCamelCase = (t) => t.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(e, i, o) {
    return i.toUpperCase() + o;
  }
), hasOwnProperty = (({ hasOwnProperty: t }) => (n, e) => t.call(n, e))(Object.prototype), isRegExp = kindOfTest("RegExp"), reduceDescriptors = (t, n) => {
  const e = Object.getOwnPropertyDescriptors(t), i = {};
  forEach(e, (o, h) => {
    let f;
    (f = n(o, h, t)) !== !1 && (i[h] = f || o);
  }), Object.defineProperties(t, i);
}, freezeMethods = (t) => {
  reduceDescriptors(t, (n, e) => {
    if (isFunction(t) && ["arguments", "caller", "callee"].indexOf(e) !== -1)
      return !1;
    const i = t[e];
    if (isFunction(i)) {
      if (n.enumerable = !1, "writable" in n) {
        n.writable = !1;
        return;
      }
      n.set || (n.set = () => {
        throw Error("Can not rewrite read-only method '" + e + "'");
      });
    }
  });
}, toObjectSet = (t, n) => {
  const e = {}, i = (o) => {
    o.forEach((h) => {
      e[h] = !0;
    });
  };
  return isArray(t) ? i(t) : i(String(t).split(n)), e;
}, noop = () => {
}, toFiniteNumber = (t, n) => t != null && Number.isFinite(t = +t) ? t : n, ALPHA = "abcdefghijklmnopqrstuvwxyz", DIGIT = "0123456789", ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
}, generateString = (t = 16, n = ALPHABET.ALPHA_DIGIT) => {
  let e = "";
  const { length: i } = n;
  for (; t--; )
    e += n[Math.random() * i | 0];
  return e;
};
function isSpecCompliantForm(t) {
  return !!(t && isFunction(t.append) && t[Symbol.toStringTag] === "FormData" && t[Symbol.iterator]);
}
const toJSONObject = (t) => {
  const n = new Array(10), e = (i, o) => {
    if (isObject(i)) {
      if (n.indexOf(i) >= 0)
        return;
      if (!("toJSON" in i)) {
        n[o] = i;
        const h = isArray(i) ? [] : {};
        return forEach(i, (f, v) => {
          const b = e(f, o + 1);
          !isUndefined(b) && (h[v] = b);
        }), n[o] = void 0, h;
      }
    }
    return i;
  };
  return e(t, 0);
}, isAsyncFn = kindOfTest("AsyncFunction"), isThenable = (t) => t && (isObject(t) || isFunction(t)) && isFunction(t.then) && isFunction(t.catch), _setImmediate = ((t, n) => t ? setImmediate : n ? ((e, i) => (_global.addEventListener("message", ({ source: o, data: h }) => {
  o === _global && h === e && i.length && i.shift()();
}, !1), (o) => {
  i.push(o), _global.postMessage(e, "*");
}))(`axios@${Math.random()}`, []) : (e) => setTimeout(e))(
  typeof setImmediate == "function",
  isFunction(_global.postMessage)
), asap = typeof queueMicrotask < "u" ? queueMicrotask.bind(_global) : typeof process < "u" && process.nextTick || _setImmediate, utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap
};
function AxiosError$1(t, n, e, i, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = t, this.name = "AxiosError", n && (this.code = n), e && (this.config = e), i && (this.request = i), o && (this.response = o, this.status = o.status ? o.status : null);
}
utils$1.inherits(AxiosError$1, Error, {
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
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const prototype$1 = AxiosError$1.prototype, descriptors = {};
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
  descriptors[t] = { value: t };
});
Object.defineProperties(AxiosError$1, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: !0 });
AxiosError$1.from = (t, n, e, i, o, h) => {
  const f = Object.create(prototype$1);
  return utils$1.toFlatObject(t, f, function(b) {
    return b !== Error.prototype;
  }, (v) => v !== "isAxiosError"), AxiosError$1.call(f, t.message, n, e, i, o), f.cause = t, f.name = t.name, h && Object.assign(f, h), f;
};
const httpAdapter = null;
function isVisitable(t) {
  return utils$1.isPlainObject(t) || utils$1.isArray(t);
}
function removeBrackets(t) {
  return utils$1.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function renderKey(t, n, e) {
  return t ? t.concat(n).map(function(o, h) {
    return o = removeBrackets(o), !e && h ? "[" + o + "]" : o;
  }).join(e ? "." : "") : n;
}
function isFlatArray(t) {
  return utils$1.isArray(t) && !t.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function(n) {
  return /^is[A-Z]/.test(n);
});
function toFormData$1(t, n, e) {
  if (!utils$1.isObject(t))
    throw new TypeError("target must be an object");
  n = n || new FormData(), e = utils$1.toFlatObject(e, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(m, c) {
    return !utils$1.isUndefined(c[m]);
  });
  const i = e.metaTokens, o = e.visitor || p, h = e.dots, f = e.indexes, b = (e.Blob || typeof Blob < "u" && Blob) && utils$1.isSpecCompliantForm(n);
  if (!utils$1.isFunction(o))
    throw new TypeError("visitor must be a function");
  function y(g) {
    if (g === null) return "";
    if (utils$1.isDate(g))
      return g.toISOString();
    if (!b && utils$1.isBlob(g))
      throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
    return utils$1.isArrayBuffer(g) || utils$1.isTypedArray(g) ? b && typeof Blob == "function" ? new Blob([g]) : Buffer.from(g) : g;
  }
  function p(g, m, c) {
    let u = g;
    if (g && !c && typeof g == "object") {
      if (utils$1.endsWith(m, "{}"))
        m = i ? m : m.slice(0, -2), g = JSON.stringify(g);
      else if (utils$1.isArray(g) && isFlatArray(g) || (utils$1.isFileList(g) || utils$1.endsWith(m, "[]")) && (u = utils$1.toArray(g)))
        return m = removeBrackets(m), u.forEach(function(_, s) {
          !(utils$1.isUndefined(_) || _ === null) && n.append(
            // eslint-disable-next-line no-nested-ternary
            f === !0 ? renderKey([m], s, h) : f === null ? m : m + "[]",
            y(_)
          );
        }), !1;
    }
    return isVisitable(g) ? !0 : (n.append(renderKey(c, m, h), y(g)), !1);
  }
  const a = [], r = Object.assign(predicates, {
    defaultVisitor: p,
    convertValue: y,
    isVisitable
  });
  function l(g, m) {
    if (!utils$1.isUndefined(g)) {
      if (a.indexOf(g) !== -1)
        throw Error("Circular reference detected in " + m.join("."));
      a.push(g), utils$1.forEach(g, function(u, d) {
        (!(utils$1.isUndefined(u) || u === null) && o.call(
          n,
          u,
          utils$1.isString(d) ? d.trim() : d,
          m,
          r
        )) === !0 && l(u, m ? m.concat(d) : [d]);
      }), a.pop();
    }
  }
  if (!utils$1.isObject(t))
    throw new TypeError("data must be an object");
  return l(t), n;
}
function encode$1(t) {
  const n = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function(i) {
    return n[i];
  });
}
function AxiosURLSearchParams(t, n) {
  this._pairs = [], t && toFormData$1(t, this, n);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function(n, e) {
  this._pairs.push([n, e]);
};
prototype.toString = function(n) {
  const e = n ? function(i) {
    return n.call(this, i, encode$1);
  } : encode$1;
  return this._pairs.map(function(o) {
    return e(o[0]) + "=" + e(o[1]);
  }, "").join("&");
};
function encode(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(t, n, e) {
  if (!n)
    return t;
  const i = e && e.encode || encode;
  utils$1.isFunction(e) && (e = {
    serialize: e
  });
  const o = e && e.serialize;
  let h;
  if (o ? h = o(n, e) : h = utils$1.isURLSearchParams(n) ? n.toString() : new AxiosURLSearchParams(n, e).toString(i), h) {
    const f = t.indexOf("#");
    f !== -1 && (t = t.slice(0, f)), t += (t.indexOf("?") === -1 ? "?" : "&") + h;
  }
  return t;
}
class InterceptorManager {
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
  use(n, e, i) {
    return this.handlers.push({
      fulfilled: n,
      rejected: e,
      synchronous: i ? i.synchronous : !1,
      runWhen: i ? i.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(n) {
    this.handlers[n] && (this.handlers[n] = null);
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
  forEach(n) {
    utils$1.forEach(this.handlers, function(i) {
      i !== null && n(i);
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, URLSearchParams$1 = typeof URLSearchParams < "u" ? URLSearchParams : AxiosURLSearchParams, FormData$1 = typeof FormData < "u" ? FormData : null, Blob$1 = typeof Blob < "u" ? Blob : null, platform$1 = {
  isBrowser: !0,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, hasBrowserEnv = typeof window < "u" && typeof document < "u", _navigator = typeof navigator == "object" && navigator || void 0, hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0), hasStandardBrowserWebWorkerEnv = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", origin = hasBrowserEnv && window.location.href || "http://localhost", utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" })), platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(t, n) {
  return toFormData$1(t, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(e, i, o, h) {
      return platform.isNode && utils$1.isBuffer(e) ? (this.append(i, e.toString("base64")), !1) : h.defaultVisitor.apply(this, arguments);
    }
  }, n));
}
function parsePropPath(t) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, t).map((n) => n[0] === "[]" ? "" : n[1] || n[0]);
}
function arrayToObject(t) {
  const n = {}, e = Object.keys(t);
  let i;
  const o = e.length;
  let h;
  for (i = 0; i < o; i++)
    h = e[i], n[h] = t[h];
  return n;
}
function formDataToJSON(t) {
  function n(e, i, o, h) {
    let f = e[h++];
    if (f === "__proto__") return !0;
    const v = Number.isFinite(+f), b = h >= e.length;
    return f = !f && utils$1.isArray(o) ? o.length : f, b ? (utils$1.hasOwnProp(o, f) ? o[f] = [o[f], i] : o[f] = i, !v) : ((!o[f] || !utils$1.isObject(o[f])) && (o[f] = []), n(e, i, o[f], h) && utils$1.isArray(o[f]) && (o[f] = arrayToObject(o[f])), !v);
  }
  if (utils$1.isFormData(t) && utils$1.isFunction(t.entries)) {
    const e = {};
    return utils$1.forEachEntry(t, (i, o) => {
      n(parsePropPath(i), o, e, 0);
    }), e;
  }
  return null;
}
function stringifySafely(t, n, e) {
  if (utils$1.isString(t))
    try {
      return (n || JSON.parse)(t), utils$1.trim(t);
    } catch (i) {
      if (i.name !== "SyntaxError")
        throw i;
    }
  return (e || JSON.stringify)(t);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(n, e) {
    const i = e.getContentType() || "", o = i.indexOf("application/json") > -1, h = utils$1.isObject(n);
    if (h && utils$1.isHTMLForm(n) && (n = new FormData(n)), utils$1.isFormData(n))
      return o ? JSON.stringify(formDataToJSON(n)) : n;
    if (utils$1.isArrayBuffer(n) || utils$1.isBuffer(n) || utils$1.isStream(n) || utils$1.isFile(n) || utils$1.isBlob(n) || utils$1.isReadableStream(n))
      return n;
    if (utils$1.isArrayBufferView(n))
      return n.buffer;
    if (utils$1.isURLSearchParams(n))
      return e.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), n.toString();
    let v;
    if (h) {
      if (i.indexOf("application/x-www-form-urlencoded") > -1)
        return toURLEncodedForm(n, this.formSerializer).toString();
      if ((v = utils$1.isFileList(n)) || i.indexOf("multipart/form-data") > -1) {
        const b = this.env && this.env.FormData;
        return toFormData$1(
          v ? { "files[]": n } : n,
          b && new b(),
          this.formSerializer
        );
      }
    }
    return h || o ? (e.setContentType("application/json", !1), stringifySafely(n)) : n;
  }],
  transformResponse: [function(n) {
    const e = this.transitional || defaults.transitional, i = e && e.forcedJSONParsing, o = this.responseType === "json";
    if (utils$1.isResponse(n) || utils$1.isReadableStream(n))
      return n;
    if (n && utils$1.isString(n) && (i && !this.responseType || o)) {
      const f = !(e && e.silentJSONParsing) && o;
      try {
        return JSON.parse(n);
      } catch (v) {
        if (f)
          throw v.name === "SyntaxError" ? AxiosError$1.from(v, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response) : v;
      }
    }
    return n;
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
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function(n) {
    return n >= 200 && n < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (t) => {
  defaults.headers[t] = {};
});
const ignoreDuplicateOf = utils$1.toObjectSet([
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
]), parseHeaders = (t) => {
  const n = {};
  let e, i, o;
  return t && t.split(`
`).forEach(function(f) {
    o = f.indexOf(":"), e = f.substring(0, o).trim().toLowerCase(), i = f.substring(o + 1).trim(), !(!e || n[e] && ignoreDuplicateOf[e]) && (e === "set-cookie" ? n[e] ? n[e].push(i) : n[e] = [i] : n[e] = n[e] ? n[e] + ", " + i : i);
  }), n;
}, $internals = Symbol("internals");
function normalizeHeader(t) {
  return t && String(t).trim().toLowerCase();
}
function normalizeValue(t) {
  return t === !1 || t == null ? t : utils$1.isArray(t) ? t.map(normalizeValue) : String(t);
}
function parseTokens(t) {
  const n = /* @__PURE__ */ Object.create(null), e = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let i;
  for (; i = e.exec(t); )
    n[i[1]] = i[2];
  return n;
}
const isValidHeaderName = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
function matchHeaderValue(t, n, e, i, o) {
  if (utils$1.isFunction(i))
    return i.call(this, n, e);
  if (o && (n = e), !!utils$1.isString(n)) {
    if (utils$1.isString(i))
      return n.indexOf(i) !== -1;
    if (utils$1.isRegExp(i))
      return i.test(n);
  }
}
function formatHeader(t) {
  return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (n, e, i) => e.toUpperCase() + i);
}
function buildAccessors(t, n) {
  const e = utils$1.toCamelCase(" " + n);
  ["get", "set", "has"].forEach((i) => {
    Object.defineProperty(t, i + e, {
      value: function(o, h, f) {
        return this[i].call(this, n, o, h, f);
      },
      configurable: !0
    });
  });
}
let AxiosHeaders$1 = class {
  constructor(n) {
    n && this.set(n);
  }
  set(n, e, i) {
    const o = this;
    function h(v, b, y) {
      const p = normalizeHeader(b);
      if (!p)
        throw new Error("header name must be a non-empty string");
      const a = utils$1.findKey(o, p);
      (!a || o[a] === void 0 || y === !0 || y === void 0 && o[a] !== !1) && (o[a || b] = normalizeValue(v));
    }
    const f = (v, b) => utils$1.forEach(v, (y, p) => h(y, p, b));
    if (utils$1.isPlainObject(n) || n instanceof this.constructor)
      f(n, e);
    else if (utils$1.isString(n) && (n = n.trim()) && !isValidHeaderName(n))
      f(parseHeaders(n), e);
    else if (utils$1.isHeaders(n))
      for (const [v, b] of n.entries())
        h(b, v, i);
    else
      n != null && h(e, n, i);
    return this;
  }
  get(n, e) {
    if (n = normalizeHeader(n), n) {
      const i = utils$1.findKey(this, n);
      if (i) {
        const o = this[i];
        if (!e)
          return o;
        if (e === !0)
          return parseTokens(o);
        if (utils$1.isFunction(e))
          return e.call(this, o, i);
        if (utils$1.isRegExp(e))
          return e.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(n, e) {
    if (n = normalizeHeader(n), n) {
      const i = utils$1.findKey(this, n);
      return !!(i && this[i] !== void 0 && (!e || matchHeaderValue(this, this[i], i, e)));
    }
    return !1;
  }
  delete(n, e) {
    const i = this;
    let o = !1;
    function h(f) {
      if (f = normalizeHeader(f), f) {
        const v = utils$1.findKey(i, f);
        v && (!e || matchHeaderValue(i, i[v], v, e)) && (delete i[v], o = !0);
      }
    }
    return utils$1.isArray(n) ? n.forEach(h) : h(n), o;
  }
  clear(n) {
    const e = Object.keys(this);
    let i = e.length, o = !1;
    for (; i--; ) {
      const h = e[i];
      (!n || matchHeaderValue(this, this[h], h, n, !0)) && (delete this[h], o = !0);
    }
    return o;
  }
  normalize(n) {
    const e = this, i = {};
    return utils$1.forEach(this, (o, h) => {
      const f = utils$1.findKey(i, h);
      if (f) {
        e[f] = normalizeValue(o), delete e[h];
        return;
      }
      const v = n ? formatHeader(h) : String(h).trim();
      v !== h && delete e[h], e[v] = normalizeValue(o), i[v] = !0;
    }), this;
  }
  concat(...n) {
    return this.constructor.concat(this, ...n);
  }
  toJSON(n) {
    const e = /* @__PURE__ */ Object.create(null);
    return utils$1.forEach(this, (i, o) => {
      i != null && i !== !1 && (e[o] = n && utils$1.isArray(i) ? i.join(", ") : i);
    }), e;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([n, e]) => n + ": " + e).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(n) {
    return n instanceof this ? n : new this(n);
  }
  static concat(n, ...e) {
    const i = new this(n);
    return e.forEach((o) => i.set(o)), i;
  }
  static accessor(n) {
    const i = (this[$internals] = this[$internals] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function h(f) {
      const v = normalizeHeader(f);
      i[v] || (buildAccessors(o, f), i[v] = !0);
    }
    return utils$1.isArray(n) ? n.forEach(h) : h(n), this;
  }
};
AxiosHeaders$1.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value: t }, n) => {
  let e = n[0].toUpperCase() + n.slice(1);
  return {
    get: () => t,
    set(i) {
      this[e] = i;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders$1);
function transformData(t, n) {
  const e = this || defaults, i = n || e, o = AxiosHeaders$1.from(i.headers);
  let h = i.data;
  return utils$1.forEach(t, function(v) {
    h = v.call(e, h, o.normalize(), n ? n.status : void 0);
  }), o.normalize(), h;
}
function isCancel$1(t) {
  return !!(t && t.__CANCEL__);
}
function CanceledError$1(t, n, e) {
  AxiosError$1.call(this, t ?? "canceled", AxiosError$1.ERR_CANCELED, n, e), this.name = "CanceledError";
}
utils$1.inherits(CanceledError$1, AxiosError$1, {
  __CANCEL__: !0
});
function settle(t, n, e) {
  const i = e.config.validateStatus;
  !e.status || !i || i(e.status) ? t(e) : n(new AxiosError$1(
    "Request failed with status code " + e.status,
    [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(e.status / 100) - 4],
    e.config,
    e.request,
    e
  ));
}
function parseProtocol(t) {
  const n = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return n && n[1] || "";
}
function speedometer(t, n) {
  t = t || 10;
  const e = new Array(t), i = new Array(t);
  let o = 0, h = 0, f;
  return n = n !== void 0 ? n : 1e3, function(b) {
    const y = Date.now(), p = i[h];
    f || (f = y), e[o] = b, i[o] = y;
    let a = h, r = 0;
    for (; a !== o; )
      r += e[a++], a = a % t;
    if (o = (o + 1) % t, o === h && (h = (h + 1) % t), y - f < n)
      return;
    const l = p && y - p;
    return l ? Math.round(r * 1e3 / l) : void 0;
  };
}
function throttle(t, n) {
  let e = 0, i = 1e3 / n, o, h;
  const f = (y, p = Date.now()) => {
    e = p, o = null, h && (clearTimeout(h), h = null), t.apply(null, y);
  };
  return [(...y) => {
    const p = Date.now(), a = p - e;
    a >= i ? f(y, p) : (o = y, h || (h = setTimeout(() => {
      h = null, f(o);
    }, i - a)));
  }, () => o && f(o)];
}
const progressEventReducer = (t, n, e = 3) => {
  let i = 0;
  const o = speedometer(50, 250);
  return throttle((h) => {
    const f = h.loaded, v = h.lengthComputable ? h.total : void 0, b = f - i, y = o(b), p = f <= v;
    i = f;
    const a = {
      loaded: f,
      total: v,
      progress: v ? f / v : void 0,
      bytes: b,
      rate: y || void 0,
      estimated: y && v && p ? (v - f) / y : void 0,
      event: h,
      lengthComputable: v != null,
      [n ? "download" : "upload"]: !0
    };
    t(a);
  }, e);
}, progressEventDecorator = (t, n) => {
  const e = t != null;
  return [(i) => n[0]({
    lengthComputable: e,
    total: t,
    loaded: i
  }), n[1]];
}, asyncDecorator = (t) => (...n) => utils$1.asap(() => t(...n)), isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((t, n) => (e) => (e = new URL(e, platform.origin), t.protocol === e.protocol && t.host === e.host && (n || t.port === e.port)))(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => !0, cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(t, n, e, i, o, h) {
      const f = [t + "=" + encodeURIComponent(n)];
      utils$1.isNumber(e) && f.push("expires=" + new Date(e).toGMTString()), utils$1.isString(i) && f.push("path=" + i), utils$1.isString(o) && f.push("domain=" + o), h === !0 && f.push("secure"), document.cookie = f.join("; ");
    },
    read(t) {
      const n = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
      return n ? decodeURIComponent(n[3]) : null;
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
function isAbsoluteURL(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function combineURLs(t, n) {
  return n ? t.replace(/\/?\/$/, "") + "/" + n.replace(/^\/+/, "") : t;
}
function buildFullPath(t, n) {
  return t && !isAbsoluteURL(n) ? combineURLs(t, n) : n;
}
const headersToObject = (t) => t instanceof AxiosHeaders$1 ? { ...t } : t;
function mergeConfig$1(t, n) {
  n = n || {};
  const e = {};
  function i(y, p, a, r) {
    return utils$1.isPlainObject(y) && utils$1.isPlainObject(p) ? utils$1.merge.call({ caseless: r }, y, p) : utils$1.isPlainObject(p) ? utils$1.merge({}, p) : utils$1.isArray(p) ? p.slice() : p;
  }
  function o(y, p, a, r) {
    if (utils$1.isUndefined(p)) {
      if (!utils$1.isUndefined(y))
        return i(void 0, y, a, r);
    } else return i(y, p, a, r);
  }
  function h(y, p) {
    if (!utils$1.isUndefined(p))
      return i(void 0, p);
  }
  function f(y, p) {
    if (utils$1.isUndefined(p)) {
      if (!utils$1.isUndefined(y))
        return i(void 0, y);
    } else return i(void 0, p);
  }
  function v(y, p, a) {
    if (a in n)
      return i(y, p);
    if (a in t)
      return i(void 0, y);
  }
  const b = {
    url: h,
    method: h,
    data: h,
    baseURL: f,
    transformRequest: f,
    transformResponse: f,
    paramsSerializer: f,
    timeout: f,
    timeoutMessage: f,
    withCredentials: f,
    withXSRFToken: f,
    adapter: f,
    responseType: f,
    xsrfCookieName: f,
    xsrfHeaderName: f,
    onUploadProgress: f,
    onDownloadProgress: f,
    decompress: f,
    maxContentLength: f,
    maxBodyLength: f,
    beforeRedirect: f,
    transport: f,
    httpAgent: f,
    httpsAgent: f,
    cancelToken: f,
    socketPath: f,
    responseEncoding: f,
    validateStatus: v,
    headers: (y, p, a) => o(headersToObject(y), headersToObject(p), a, !0)
  };
  return utils$1.forEach(Object.keys(Object.assign({}, t, n)), function(p) {
    const a = b[p] || o, r = a(t[p], n[p], p);
    utils$1.isUndefined(r) && a !== v || (e[p] = r);
  }), e;
}
const resolveConfig = (t) => {
  const n = mergeConfig$1({}, t);
  let { data: e, withXSRFToken: i, xsrfHeaderName: o, xsrfCookieName: h, headers: f, auth: v } = n;
  n.headers = f = AxiosHeaders$1.from(f), n.url = buildURL(buildFullPath(n.baseURL, n.url), t.params, t.paramsSerializer), v && f.set(
    "Authorization",
    "Basic " + btoa((v.username || "") + ":" + (v.password ? unescape(encodeURIComponent(v.password)) : ""))
  );
  let b;
  if (utils$1.isFormData(e)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv)
      f.setContentType(void 0);
    else if ((b = f.getContentType()) !== !1) {
      const [y, ...p] = b ? b.split(";").map((a) => a.trim()).filter(Boolean) : [];
      f.setContentType([y || "multipart/form-data", ...p].join("; "));
    }
  }
  if (platform.hasStandardBrowserEnv && (i && utils$1.isFunction(i) && (i = i(n)), i || i !== !1 && isURLSameOrigin(n.url))) {
    const y = o && h && cookies.read(h);
    y && f.set(o, y);
  }
  return n;
}, isXHRAdapterSupported = typeof XMLHttpRequest < "u", xhrAdapter = isXHRAdapterSupported && function(t) {
  return new Promise(function(e, i) {
    const o = resolveConfig(t);
    let h = o.data;
    const f = AxiosHeaders$1.from(o.headers).normalize();
    let { responseType: v, onUploadProgress: b, onDownloadProgress: y } = o, p, a, r, l, g;
    function m() {
      l && l(), g && g(), o.cancelToken && o.cancelToken.unsubscribe(p), o.signal && o.signal.removeEventListener("abort", p);
    }
    let c = new XMLHttpRequest();
    c.open(o.method.toUpperCase(), o.url, !0), c.timeout = o.timeout;
    function u() {
      if (!c)
        return;
      const _ = AxiosHeaders$1.from(
        "getAllResponseHeaders" in c && c.getAllResponseHeaders()
      ), w = {
        data: !v || v === "text" || v === "json" ? c.responseText : c.response,
        status: c.status,
        statusText: c.statusText,
        headers: _,
        config: t,
        request: c
      };
      settle(function(C) {
        e(C), m();
      }, function(C) {
        i(C), m();
      }, w), c = null;
    }
    "onloadend" in c ? c.onloadend = u : c.onreadystatechange = function() {
      !c || c.readyState !== 4 || c.status === 0 && !(c.responseURL && c.responseURL.indexOf("file:") === 0) || setTimeout(u);
    }, c.onabort = function() {
      c && (i(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, t, c)), c = null);
    }, c.onerror = function() {
      i(new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, t, c)), c = null;
    }, c.ontimeout = function() {
      let s = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const w = o.transitional || transitionalDefaults;
      o.timeoutErrorMessage && (s = o.timeoutErrorMessage), i(new AxiosError$1(
        s,
        w.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
        t,
        c
      )), c = null;
    }, h === void 0 && f.setContentType(null), "setRequestHeader" in c && utils$1.forEach(f.toJSON(), function(s, w) {
      c.setRequestHeader(w, s);
    }), utils$1.isUndefined(o.withCredentials) || (c.withCredentials = !!o.withCredentials), v && v !== "json" && (c.responseType = o.responseType), y && ([r, g] = progressEventReducer(y, !0), c.addEventListener("progress", r)), b && c.upload && ([a, l] = progressEventReducer(b), c.upload.addEventListener("progress", a), c.upload.addEventListener("loadend", l)), (o.cancelToken || o.signal) && (p = (_) => {
      c && (i(!_ || _.type ? new CanceledError$1(null, t, c) : _), c.abort(), c = null);
    }, o.cancelToken && o.cancelToken.subscribe(p), o.signal && (o.signal.aborted ? p() : o.signal.addEventListener("abort", p)));
    const d = parseProtocol(o.url);
    if (d && platform.protocols.indexOf(d) === -1) {
      i(new AxiosError$1("Unsupported protocol " + d + ":", AxiosError$1.ERR_BAD_REQUEST, t));
      return;
    }
    c.send(h || null);
  });
}, composeSignals = (t, n) => {
  const { length: e } = t = t ? t.filter(Boolean) : [];
  if (n || e) {
    let i = new AbortController(), o;
    const h = function(y) {
      if (!o) {
        o = !0, v();
        const p = y instanceof Error ? y : this.reason;
        i.abort(p instanceof AxiosError$1 ? p : new CanceledError$1(p instanceof Error ? p.message : p));
      }
    };
    let f = n && setTimeout(() => {
      f = null, h(new AxiosError$1(`timeout ${n} of ms exceeded`, AxiosError$1.ETIMEDOUT));
    }, n);
    const v = () => {
      t && (f && clearTimeout(f), f = null, t.forEach((y) => {
        y.unsubscribe ? y.unsubscribe(h) : y.removeEventListener("abort", h);
      }), t = null);
    };
    t.forEach((y) => y.addEventListener("abort", h));
    const { signal: b } = i;
    return b.unsubscribe = () => utils$1.asap(v), b;
  }
}, streamChunk = function* (t, n) {
  let e = t.byteLength;
  if (e < n) {
    yield t;
    return;
  }
  let i = 0, o;
  for (; i < e; )
    o = i + n, yield t.slice(i, o), i = o;
}, readBytes = async function* (t, n) {
  for await (const e of readStream(t))
    yield* streamChunk(e, n);
}, readStream = async function* (t) {
  if (t[Symbol.asyncIterator]) {
    yield* t;
    return;
  }
  const n = t.getReader();
  try {
    for (; ; ) {
      const { done: e, value: i } = await n.read();
      if (e)
        break;
      yield i;
    }
  } finally {
    await n.cancel();
  }
}, trackStream = (t, n, e, i) => {
  const o = readBytes(t, n);
  let h = 0, f, v = (b) => {
    f || (f = !0, i && i(b));
  };
  return new ReadableStream({
    async pull(b) {
      try {
        const { done: y, value: p } = await o.next();
        if (y) {
          v(), b.close();
          return;
        }
        let a = p.byteLength;
        if (e) {
          let r = h += a;
          e(r);
        }
        b.enqueue(new Uint8Array(p));
      } catch (y) {
        throw v(y), y;
      }
    },
    cancel(b) {
      return v(b), o.return();
    }
  }, {
    highWaterMark: 2
  });
}, isFetchSupported = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", isReadableStreamSupported = isFetchSupported && typeof ReadableStream == "function", encodeText = isFetchSupported && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((t) => (n) => t.encode(n))(new TextEncoder()) : async (t) => new Uint8Array(await new Response(t).arrayBuffer())), test = (t, ...n) => {
  try {
    return !!t(...n);
  } catch {
    return !1;
  }
}, supportsRequestStream = isReadableStreamSupported && test(() => {
  let t = !1;
  const n = new Request(platform.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return t = !0, "half";
    }
  }).headers.has("Content-Type");
  return t && !n;
}), DEFAULT_CHUNK_SIZE = 64 * 1024, supportsResponseStream = isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body)), resolvers = {
  stream: supportsResponseStream && ((t) => t.body)
};
isFetchSupported && ((t) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((n) => {
    !resolvers[n] && (resolvers[n] = utils$1.isFunction(t[n]) ? (e) => e[n]() : (e, i) => {
      throw new AxiosError$1(`Response type '${n}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, i);
    });
  });
})(new Response());
const getBodyLength = async (t) => {
  if (t == null)
    return 0;
  if (utils$1.isBlob(t))
    return t.size;
  if (utils$1.isSpecCompliantForm(t))
    return (await new Request(platform.origin, {
      method: "POST",
      body: t
    }).arrayBuffer()).byteLength;
  if (utils$1.isArrayBufferView(t) || utils$1.isArrayBuffer(t))
    return t.byteLength;
  if (utils$1.isURLSearchParams(t) && (t = t + ""), utils$1.isString(t))
    return (await encodeText(t)).byteLength;
}, resolveBodyLength = async (t, n) => {
  const e = utils$1.toFiniteNumber(t.getContentLength());
  return e ?? getBodyLength(n);
}, fetchAdapter = isFetchSupported && (async (t) => {
  let {
    url: n,
    method: e,
    data: i,
    signal: o,
    cancelToken: h,
    timeout: f,
    onDownloadProgress: v,
    onUploadProgress: b,
    responseType: y,
    headers: p,
    withCredentials: a = "same-origin",
    fetchOptions: r
  } = resolveConfig(t);
  y = y ? (y + "").toLowerCase() : "text";
  let l = composeSignals([o, h && h.toAbortSignal()], f), g;
  const m = l && l.unsubscribe && (() => {
    l.unsubscribe();
  });
  let c;
  try {
    if (b && supportsRequestStream && e !== "get" && e !== "head" && (c = await resolveBodyLength(p, i)) !== 0) {
      let w = new Request(n, {
        method: "POST",
        body: i,
        duplex: "half"
      }), F;
      if (utils$1.isFormData(i) && (F = w.headers.get("content-type")) && p.setContentType(F), w.body) {
        const [C, S] = progressEventDecorator(
          c,
          progressEventReducer(asyncDecorator(b))
        );
        i = trackStream(w.body, DEFAULT_CHUNK_SIZE, C, S);
      }
    }
    utils$1.isString(a) || (a = a ? "include" : "omit");
    const u = "credentials" in Request.prototype;
    g = new Request(n, {
      ...r,
      signal: l,
      method: e.toUpperCase(),
      headers: p.normalize().toJSON(),
      body: i,
      duplex: "half",
      credentials: u ? a : void 0
    });
    let d = await fetch(g);
    const _ = supportsResponseStream && (y === "stream" || y === "response");
    if (supportsResponseStream && (v || _ && m)) {
      const w = {};
      ["status", "statusText", "headers"].forEach((N) => {
        w[N] = d[N];
      });
      const F = utils$1.toFiniteNumber(d.headers.get("content-length")), [C, S] = v && progressEventDecorator(
        F,
        progressEventReducer(asyncDecorator(v), !0)
      ) || [];
      d = new Response(
        trackStream(d.body, DEFAULT_CHUNK_SIZE, C, () => {
          S && S(), m && m();
        }),
        w
      );
    }
    y = y || "text";
    let s = await resolvers[utils$1.findKey(resolvers, y) || "text"](d, t);
    return !_ && m && m(), await new Promise((w, F) => {
      settle(w, F, {
        data: s,
        headers: AxiosHeaders$1.from(d.headers),
        status: d.status,
        statusText: d.statusText,
        config: t,
        request: g
      });
    });
  } catch (u) {
    throw m && m(), u && u.name === "TypeError" && /fetch/i.test(u.message) ? Object.assign(
      new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, t, g),
      {
        cause: u.cause || u
      }
    ) : AxiosError$1.from(u, u && u.code, t, g);
  }
}), knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: fetchAdapter
};
utils$1.forEach(knownAdapters, (t, n) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: n });
    } catch {
    }
    Object.defineProperty(t, "adapterName", { value: n });
  }
});
const renderReason = (t) => `- ${t}`, isResolvedHandle = (t) => utils$1.isFunction(t) || t === null || t === !1, adapters = {
  getAdapter: (t) => {
    t = utils$1.isArray(t) ? t : [t];
    const { length: n } = t;
    let e, i;
    const o = {};
    for (let h = 0; h < n; h++) {
      e = t[h];
      let f;
      if (i = e, !isResolvedHandle(e) && (i = knownAdapters[(f = String(e)).toLowerCase()], i === void 0))
        throw new AxiosError$1(`Unknown adapter '${f}'`);
      if (i)
        break;
      o[f || "#" + h] = i;
    }
    if (!i) {
      const h = Object.entries(o).map(
        ([v, b]) => `adapter ${v} ` + (b === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let f = n ? h.length > 1 ? `since :
` + h.map(renderReason).join(`
`) : " " + renderReason(h[0]) : "as no adapter specified";
      throw new AxiosError$1(
        "There is no suitable adapter to dispatch the request " + f,
        "ERR_NOT_SUPPORT"
      );
    }
    return i;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new CanceledError$1(null, t);
}
function dispatchRequest(t) {
  return throwIfCancellationRequested(t), t.headers = AxiosHeaders$1.from(t.headers), t.data = transformData.call(
    t,
    t.transformRequest
  ), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), adapters.getAdapter(t.adapter || defaults.adapter)(t).then(function(i) {
    return throwIfCancellationRequested(t), i.data = transformData.call(
      t,
      t.transformResponse,
      i
    ), i.headers = AxiosHeaders$1.from(i.headers), i;
  }, function(i) {
    return isCancel$1(i) || (throwIfCancellationRequested(t), i && i.response && (i.response.data = transformData.call(
      t,
      t.transformResponse,
      i.response
    ), i.response.headers = AxiosHeaders$1.from(i.response.headers))), Promise.reject(i);
  });
}
const VERSION$1 = "1.7.9", validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, n) => {
  validators$1[t] = function(i) {
    return typeof i === t || "a" + (n < 1 ? "n " : " ") + t;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function(n, e, i) {
  function o(h, f) {
    return "[Axios v" + VERSION$1 + "] Transitional option '" + h + "'" + f + (i ? ". " + i : "");
  }
  return (h, f, v) => {
    if (n === !1)
      throw new AxiosError$1(
        o(f, " has been removed" + (e ? " in " + e : "")),
        AxiosError$1.ERR_DEPRECATED
      );
    return e && !deprecatedWarnings[f] && (deprecatedWarnings[f] = !0, console.warn(
      o(
        f,
        " has been deprecated since v" + e + " and will be removed in the near future"
      )
    )), n ? n(h, f, v) : !0;
  };
};
validators$1.spelling = function(n) {
  return (e, i) => (console.warn(`${i} is likely a misspelling of ${n}`), !0);
};
function assertOptions(t, n, e) {
  if (typeof t != "object")
    throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
  const i = Object.keys(t);
  let o = i.length;
  for (; o-- > 0; ) {
    const h = i[o], f = n[h];
    if (f) {
      const v = t[h], b = v === void 0 || f(v, h, t);
      if (b !== !0)
        throw new AxiosError$1("option " + h + " must be " + b, AxiosError$1.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (e !== !0)
      throw new AxiosError$1("Unknown option " + h, AxiosError$1.ERR_BAD_OPTION);
  }
}
const validator = {
  assertOptions,
  validators: validators$1
}, validators = validator.validators;
let Axios$1 = class {
  constructor(n) {
    this.defaults = n, this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
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
  async request(n, e) {
    try {
      return await this._request(n, e);
    } catch (i) {
      if (i instanceof Error) {
        let o = {};
        Error.captureStackTrace ? Error.captureStackTrace(o) : o = new Error();
        const h = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          i.stack ? h && !String(i.stack).endsWith(h.replace(/^.+\n.+\n/, "")) && (i.stack += `
` + h) : i.stack = h;
        } catch {
        }
      }
      throw i;
    }
  }
  _request(n, e) {
    typeof n == "string" ? (e = e || {}, e.url = n) : e = n || {}, e = mergeConfig$1(this.defaults, e);
    const { transitional: i, paramsSerializer: o, headers: h } = e;
    i !== void 0 && validator.assertOptions(i, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, !1), o != null && (utils$1.isFunction(o) ? e.paramsSerializer = {
      serialize: o
    } : validator.assertOptions(o, {
      encode: validators.function,
      serialize: validators.function
    }, !0)), validator.assertOptions(e, {
      baseUrl: validators.spelling("baseURL"),
      withXsrfToken: validators.spelling("withXSRFToken")
    }, !0), e.method = (e.method || this.defaults.method || "get").toLowerCase();
    let f = h && utils$1.merge(
      h.common,
      h[e.method]
    );
    h && utils$1.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (g) => {
        delete h[g];
      }
    ), e.headers = AxiosHeaders$1.concat(f, h);
    const v = [];
    let b = !0;
    this.interceptors.request.forEach(function(m) {
      typeof m.runWhen == "function" && m.runWhen(e) === !1 || (b = b && m.synchronous, v.unshift(m.fulfilled, m.rejected));
    });
    const y = [];
    this.interceptors.response.forEach(function(m) {
      y.push(m.fulfilled, m.rejected);
    });
    let p, a = 0, r;
    if (!b) {
      const g = [dispatchRequest.bind(this), void 0];
      for (g.unshift.apply(g, v), g.push.apply(g, y), r = g.length, p = Promise.resolve(e); a < r; )
        p = p.then(g[a++], g[a++]);
      return p;
    }
    r = v.length;
    let l = e;
    for (a = 0; a < r; ) {
      const g = v[a++], m = v[a++];
      try {
        l = g(l);
      } catch (c) {
        m.call(this, c);
        break;
      }
    }
    try {
      p = dispatchRequest.call(this, l);
    } catch (g) {
      return Promise.reject(g);
    }
    for (a = 0, r = y.length; a < r; )
      p = p.then(y[a++], y[a++]);
    return p;
  }
  getUri(n) {
    n = mergeConfig$1(this.defaults, n);
    const e = buildFullPath(n.baseURL, n.url);
    return buildURL(e, n.params, n.paramsSerializer);
  }
};
utils$1.forEach(["delete", "get", "head", "options"], function(n) {
  Axios$1.prototype[n] = function(e, i) {
    return this.request(mergeConfig$1(i || {}, {
      method: n,
      url: e,
      data: (i || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function(n) {
  function e(i) {
    return function(h, f, v) {
      return this.request(mergeConfig$1(v || {}, {
        method: n,
        headers: i ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: h,
        data: f
      }));
    };
  }
  Axios$1.prototype[n] = e(), Axios$1.prototype[n + "Form"] = e(!0);
});
let CancelToken$1 = class he {
  constructor(n) {
    if (typeof n != "function")
      throw new TypeError("executor must be a function.");
    let e;
    this.promise = new Promise(function(h) {
      e = h;
    });
    const i = this;
    this.promise.then((o) => {
      if (!i._listeners) return;
      let h = i._listeners.length;
      for (; h-- > 0; )
        i._listeners[h](o);
      i._listeners = null;
    }), this.promise.then = (o) => {
      let h;
      const f = new Promise((v) => {
        i.subscribe(v), h = v;
      }).then(o);
      return f.cancel = function() {
        i.unsubscribe(h);
      }, f;
    }, n(function(h, f, v) {
      i.reason || (i.reason = new CanceledError$1(h, f, v), e(i.reason));
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
  subscribe(n) {
    if (this.reason) {
      n(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(n) : this._listeners = [n];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(n) {
    if (!this._listeners)
      return;
    const e = this._listeners.indexOf(n);
    e !== -1 && this._listeners.splice(e, 1);
  }
  toAbortSignal() {
    const n = new AbortController(), e = (i) => {
      n.abort(i);
    };
    return this.subscribe(e), n.signal.unsubscribe = () => this.unsubscribe(e), n.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let n;
    return {
      token: new he(function(o) {
        n = o;
      }),
      cancel: n
    };
  }
};
function spread$1(t) {
  return function(e) {
    return t.apply(null, e);
  };
}
function isAxiosError$1(t) {
  return utils$1.isObject(t) && t.isAxiosError === !0;
}
const HttpStatusCode$1 = {
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
Object.entries(HttpStatusCode$1).forEach(([t, n]) => {
  HttpStatusCode$1[n] = t;
});
function createInstance(t) {
  const n = new Axios$1(t), e = bind(Axios$1.prototype.request, n);
  return utils$1.extend(e, Axios$1.prototype, n, { allOwnKeys: !0 }), utils$1.extend(e, n, null, { allOwnKeys: !0 }), e.create = function(o) {
    return createInstance(mergeConfig$1(t, o));
  }, e;
}
const axios = createInstance(defaults);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError$1;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData$1;
axios.AxiosError = AxiosError$1;
axios.Cancel = axios.CanceledError;
axios.all = function(n) {
  return Promise.all(n);
};
axios.spread = spread$1;
axios.isAxiosError = isAxiosError$1;
axios.mergeConfig = mergeConfig$1;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (t) => formDataToJSON(utils$1.isHTMLForm(t) ? new FormData(t) : t);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const {
  Axios,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken,
  VERSION,
  all,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig
} = axios, emitter = {
  data() {
    return {
      vfEvents: {}
    };
  },
  methods: {
    emit$(t, n) {
      this.vfEvents[t] && this.vfEvents[t].forEach((e) => {
        e(n);
      });
    },
    on$(t, n) {
      this.vfEvents[t] = this.vfEvents[t] || [], this.vfEvents[t].push(n);
    },
    off$(t, n) {
      if (this.vfEvents[t]) {
        if (n == null) {
          this.vfEvents[t].length = 0;
          return;
        }
        for (let e = 0; e < this.vfEvents[t].length; e++)
          if (this.vfEvents[t][e] === n) {
            this.vfEvents[t].splice(e, 1);
            break;
          }
      }
    },
    dispatch: function(n, e, i) {
      let o = this.$parent || this.$root, h = o.$options.componentName;
      for (; o && (!h || h !== n); )
        o = o.$parent, o && (h = o.$options.componentName);
      o && o.emit$ && (o.emit$.call(o, e, i), n === "VFormRender" && o.$emit(e, ...i));
    },
    broadcast: function(n, e, i) {
      this.widgetRefList && Object.keys(this.widgetRefList).forEach((o) => {
        if (this.widgetRefList[o].$options.componentName === n) {
          let f = this.widgetRefList[o];
          f.emit$.call(f, e, i);
        }
      }), this.refList && Object.keys(this.refList).forEach((o) => {
        if (this.refList[o].$options.componentName === n) {
          let f = this.refList[o];
          f.emit$.call(f, e, i);
        }
      });
    }
  }
}, _export_sfc = (t, n) => {
  const e = t.__vccOpts || t;
  for (const [i, o] of n)
    e[i] = o;
  return e;
}, _sfc_main$C = {
  name: "container-item-wrapper",
  props: {
    widget: Object
  },
  computed: {
    customClass() {
      return this.widget.options.customClass ? this.widget.options.customClass.join(" ") : "";
    }
  }
};
function _sfc_render$C(t, n, e, i, o, h) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["container-wrapper", [h.customClass]])
  }, [
    renderSlot(t.$slots, "default")
  ], 2);
}
const ContainerItemWrapper = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$C]]), __vite_glob_0_0$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ContainerItemWrapper
}, Symbol.toStringTag, { value: "Module" }));
function isDef(t) {
  return t != null;
}
function get(t, n) {
  const e = n.split(".");
  let i = t;
  return e.forEach((o) => {
    i = isDef(i) && isDef(i[o]) ? i[o] : null;
  }), i;
}
let locale = reactive({
  lang: localStorage.getItem("v_form_locale") || "zh-CN"
});
function createI18n(t) {
  return {
    messages: t.messages,
    $st(n, ...e) {
      const i = get(this.messages[locale.lang], n);
      return typeof i == "function" ? i(...e) : i !== null ? i : n;
    },
    $st2(n, e) {
      let i = this.messages[locale.lang];
      const o = get(i, n);
      return o !== null ? o : get(i, e);
    },
    setLang(n) {
      locale.lang = n;
    }
  };
}
const enLocale = {
  application: {
    "zh-CN": "简体中文",
    "en-US": "English",
    productTitle: "Online Form Designer",
    github: "GitHub",
    document: "Docs",
    qqGroup: "WeChat Group",
    deployment: "Deployment",
    subscription: "Subscription"
  },
  designer: {
    componentLib: "Components",
    formLib: "Templates",
    containerTitle: "Container",
    dragHandlerHint: "drag container or field to layout center",
    dragAction: "drag",
    basicFieldTitle: "Basic Field",
    advancedFieldTitle: "Advanced Field",
    customFieldTitle: "Customized Field",
    noWidgetHint: "Please select a widget from the left list, drag and drop to this container.",
    widgetLabel: {
      grid: "Grid",
      table: "Table",
      tab: "Tab",
      section: "Section",
      "sub-form": "SubForm",
      "grid-col": "GridCol",
      "table-cell": "TableCell",
      "tab-pane": "TabPane",
      "data-table": "DataTable",
      input: "Input",
      textarea: "Textarea",
      number: "InputNumber",
      radio: "Radio",
      checkbox: "Checkbox",
      select: "Select",
      time: "Time",
      "time-range": "Time range",
      date: "Date",
      "date-range": "Date range",
      switch: "Switch",
      rate: "Rate",
      color: "ColorPicker",
      slider: "Slider",
      "static-text": "Text",
      "html-text": "HTML",
      button: "Button",
      divider: "Divider",
      "picture-upload": "Picture",
      "file-upload": "File",
      "rich-editor": "Rich Editor",
      cascader: "Cascader",
      slot: "Slot",
      custom: "Custom Component"
    },
    hint: {
      selectParentWidget: "Select parent of this widget",
      moveUpWidget: "Move up this widget",
      moveDownWidget: "Move down this widget",
      cloneWidget: "Clone this widget",
      insertRow: "Insert new row",
      insertColumn: "Insert new column",
      remove: "Remove this widget",
      cellSetting: "Cell setting",
      dragHandler: "Drag handler",
      copyField: "Copy field widget",
      onlyFieldWidgetAcceptable: "Only field widget can be dragged into sub-form",
      moveUpFirstChildHint: "First child can not be move up",
      moveDownLastChildHint: "Last child can not be move down",
      closePreview: "Close",
      copyJson: "Copy",
      saveFormJson: "Save As File",
      copyVueCode: "Copy Vue Code",
      copyHtmlCode: "Copy HTML Code",
      copyJsonSuccess: "Copy succeed",
      importJsonSuccess: "Import succeed",
      invalidJsonFormat: "Invalid JSON format",
      jsonVersionMismatch: "Version of JSON mismatch",
      copyJsonFail: "Copy failed",
      copyVueCodeSuccess: "Copy succeed",
      copyVueCodeFail: "Copy failed",
      copyHtmlCodeSuccess: "Copy succeed",
      copyHtmlCodeFail: "Copy failed",
      saveVueCode: "Save Vue File",
      saveHtmlCode: "Save Html File",
      getFormData: "Get Data",
      resetForm: "Reset",
      disableForm: "Disable",
      enableForm: "Enable",
      exportFormData: "Form Data",
      copyFormData: "Copy",
      saveFormData: "Save As File",
      copyVue2SFC: "Copy Vue2",
      copyVue3SFC: "Copy Vue3",
      copySFCFail: "Copy failed",
      copySFCSuccess: "Copy succeed",
      saveVue2SFC: "Save As Vue2",
      saveVue3SFC: "Save As Vue3",
      fileNameForSave: "File name:",
      saveFileTitle: "Save as File",
      fileNameInputPlaceholder: "Enter the file name",
      sampleLoadedSuccess: "Example loaded successfully",
      sampleLoadedFail: "Sample load failed",
      loadFormTemplate: "Load This",
      loadFormTemplateHint: "Are you sure to load this template?",
      loadFormTemplateSuccess: "Load form template success!",
      loadFormTemplateFailed: "Load form template failed.",
      currentNodeCannotBeSelected: "The current node cannot be selected.",
      widgetSetting: "Widget Config",
      formSetting: "Form Config",
      prompt: "Prompt",
      confirm: "OK",
      cancel: "Cancel",
      import: "Import",
      importJsonHint: "The code to be imported should have the following JSON format.",
      invalidOptionsData: "Invalid data of options:",
      lastPaneCannotBeDeleted: "The last pane cannot be deleted.",
      duplicateName: "Duplicate name: ",
      nameRequired: "Name required.",
      numberValidator: "Number",
      letterValidator: "Letter",
      letterAndNumberValidator: "LetterAndNumber",
      mobilePhoneValidator: "MobilePhone",
      emailValidator: "Email",
      urlValidator: "URL",
      noChineseValidator: "Non-Chinese",
      chineseValidator: "Chinese",
      rowspanNotConsistentForMergeEntireRow: "Cells in this row don't have the same rowspan, operation failed.",
      colspanNotConsistentForMergeEntireColumn: "Cells in this column don't have the same colspan, operation failed.",
      rowspanNotConsistentForDeleteEntireRow: "Cells in this row don't have the same rowspan, operation failed.",
      colspanNotConsistentForDeleteEntireColumn: "Cells in this column don't have the same colspan, operation failed.",
      lastColCannotBeDeleted: "The last col cannot be deleted.",
      lastRowCannotBeDeleted: "The last row cannot be deleted."
    },
    toolbar: {
      undoHint: "Undo",
      redoHint: "Redo",
      pcLayout: "PC",
      padLayout: "Pad",
      mobileLayout: "H5",
      nodeTreeHint: "Tree View Of Component Hierarchy",
      nodeTreeTitle: "Tree View Of Component Hierarchy",
      clear: "Clear",
      preview: "Preview",
      importJson: "Import",
      exportJson: "Export",
      exportCode: "Codes",
      generateCode: "Generate Code",
      generateSFC: "Generate SFC"
    },
    setting: {
      basicSetting: "Basic Setting",
      attributeSetting: "Attribute Setting",
      commonSetting: "Common Setting",
      advancedSetting: "Advanced Setting",
      eventSetting: "Event Setting",
      uniqueName: "Unique Name",
      editNameHelp: "Press enter to confirm the modification",
      label: "Label",
      displayType: "Type",
      defaultValue: "Default Value",
      placeholder: "Placeholder",
      startPlaceholder: "Start Placeholder",
      endPlaceholder: "End Placeholder",
      widgetColumnWidth: "Width",
      widgetSize: "Size",
      fontSize: "Font Size",
      textAlign: "Text Align",
      autoFullWidth: "Auto Full Width",
      showStops: "Show Stops",
      displayStyle: "Display Style",
      inlineLayout: "inline",
      blockLayout: "block",
      buttonStyle: "Show As Button",
      border: "Show Border",
      labelWidth: "Width Of Label",
      rows: "Rows",
      labelHidden: "Hide Label",
      required: "Required",
      requiredHint: "Failure Hint",
      validation: "Validation",
      validationHelp: "Regular expressions supported",
      validationHint: "Validation Hint",
      readonly: "Readonly",
      disabled: "Disabled",
      hidden: "Hidden",
      textContent: "Text",
      preWrap: "Line Wrap",
      htmlContent: "HTML",
      clearable: "Clearable",
      editable: "Editable",
      format: "Format",
      valueFormat: "Value Format",
      showPassword: "Show Reveal",
      filterable: "Filterable",
      allowCreate: "Allow Create",
      remote: "Remote Query",
      automaticDropdown: "Automatic Dropdown",
      multiple: "Multiple",
      multipleLimit: "Multiple Limit",
      checkStrictly: "Any Level Selectable",
      showAllLevels: "Show All Levels",
      contentPosition: "Content Position",
      plain: "Plain",
      round: "Round",
      circle: "Circle",
      icon: "Icon",
      optionsSetting: "Options Setting",
      addOption: "Add Option",
      importOptions: "Import Options",
      resetDefault: "Reset Default",
      uploadSetting: "Upload Setting",
      uploadURL: "Upload URL",
      uploadTip: "Tip Content",
      withCredentials: "Send Cookie",
      multipleSelect: "File Multi-select",
      showFileList: "Show File List",
      limit: "Max Upload Number",
      fileMaxSize: "Max Size(MB)",
      fileTypes: "Upload File Types",
      fileTypesHelp: "Allows to add more file types",
      headers: "Request Headers",
      cellWidth: "Width",
      cellHeight: "Height",
      wordBreak: "Line Wrap",
      gridColHeight: "Height Of Col(px)",
      gutter: "Gutter(px)",
      columnSetting: "Cols Setting",
      colsOfGrid: "Cols Of Grid:",
      colSpanTitle: "Spans Of Col",
      colOffsetTitle: "Offset Of Col",
      colPushTitle: "Push Of Col",
      colPullTitle: "Pull Of Col",
      addColumn: "Add Column",
      responsive: "Responsive",
      tabPaneSetting: "Tab Panes",
      addTabPane: "Add Tab Pane",
      paneActive: "Active",
      customLabelIcon: "Custom Label",
      labelIconClass: "Label Icon Class",
      labelIconPosition: "Label Icon Position",
      labelTooltip: "Label Tooltip",
      minValue: "Min Value",
      maxValue: "Max Value",
      precision: "Precision",
      step: "Step",
      controlsPosition: "Controls Position",
      minLength: "Min Length",
      maxLength: "Max Length",
      showWordLimit: "Show Word Limit",
      prefixIcon: "Prefix Icon",
      suffixIcon: "Suffix Icon",
      inputButton: "Input Button Setting",
      appendButton: "Append Button",
      appendButtonDisabled: "Button Disabled",
      appendButtonIcon: "Append Button Icon",
      buttonIcon: "Button Icon",
      switchWidth: "Width of Switch(px)",
      activeText: "Active Text",
      inactiveText: "Inactive Text",
      activeColor: "Active Color",
      inactiveColor: "Inactive Color",
      maxStars: "Stars Max Number",
      lowThreshold: "Low Threshold",
      highThreshold: "High Threshold",
      allowHalf: "Allow Half",
      showText: "Show Text",
      showScore: "Show Score",
      range: "Range",
      vertical: "Vertical",
      showBlankRow: "Show Blank Row",
      showRowNumber: "Show Row Number",
      contentHeight: "Content Area Height",
      insertColumnToLeft: "insert column to left",
      insertColumnToRight: "insert column to right",
      insertRowAbove: "insert row above",
      insertRowBelow: "insert row below",
      mergeLeftColumn: "merge left cell",
      mergeRightColumn: "merge right cell",
      mergeEntireRow: "merge entire row",
      mergeRowAbove: "merge cell above",
      mergeRowBelow: "merge cell below",
      mergeEntireColumn: "merge entire column",
      undoMergeCol: "undo merge column",
      undoMergeRow: "undo merge row",
      deleteEntireCol: "delete entire column",
      deleteEntireRow: "delete entire row",
      widgetName: "Unique Name",
      formSize: "Size",
      formSizeLarge: "Large",
      formSizeDefault: "Default",
      formSizeSmall: "Small",
      labelPosition: "Position Of Label",
      topPosition: "Top",
      leftPosition: "Left",
      labelAlign: "Label Align",
      leftAlign: "Left",
      centerAlign: "Center",
      rightAlign: "Right",
      formCss: "Form CSS",
      addCss: "Edit",
      customClass: "Custom Class",
      globalFunctions: "Global Functions",
      addEventHandler: "Edit",
      editWidgetEventHandler: "Edit Widget Event Handler",
      editFormEventHandler: "Edit Form Event Handler",
      formSFCSetting: "SFC Setting",
      formModelName: "Model Name",
      formRefName: "Ref Name",
      formRulesName: "Rules Name",
      syntaxCheckWarning: "Syntax error in the javascript codes, please check again!"
    }
  }
}, zhLocale = {
  application: {
    "zh-CN": "简体中文",
    "en-US": "English",
    productTitle: "表单设计器",
    github: "GitHub",
    document: "文档",
    qqGroup: "技术WX群",
    deployment: "私有部署",
    subscription: "订阅Pro"
  },
  designer: {
    componentLib: "组件库",
    formLib: "表单模板",
    containerTitle: "容器",
    dragHandlerHint: "鼠标拖拽容器组件或字段组件并放置于表单中",
    dragAction: "拖动",
    basicFieldTitle: "基础字段",
    advancedFieldTitle: "高级字段",
    customFieldTitle: "自定义扩展字段",
    noWidgetHint: "请从左侧列表中选择一个组件, 然后用鼠标拖动组件放置于此处.",
    widgetLabel: {
      grid: "栅格",
      table: "表格",
      tab: "标签页",
      section: "区块",
      "sub-form": "子表单",
      "grid-col": "栅格列",
      "table-cell": "单元格",
      "tab-pane": "选项卡页",
      "data-table": "数据表格",
      input: "单行输入",
      textarea: "多行输入",
      number: "计数器",
      radio: "单选项",
      checkbox: "多选项",
      select: "下拉选项",
      time: "时间",
      "time-range": "时间范围",
      date: "日期",
      "date-range": "日期范围",
      switch: "开关",
      rate: "评分",
      color: "颜色选择器",
      slider: "滑块",
      "static-text": "静态文字",
      "html-text": "HTML",
      button: "按钮",
      divider: "分隔线",
      "picture-upload": "图片",
      "file-upload": "文件",
      "rich-editor": "富文本",
      cascader: "级联选择",
      slot: "插槽",
      custom: "Custom Component"
    },
    hint: {
      selectParentWidget: "选中父组件",
      moveUpWidget: "上移组件",
      moveDownWidget: "下移组件",
      cloneWidget: "复制组件",
      insertRow: "插入新行",
      insertColumn: "插入新列",
      remove: "移除组件",
      cellSetting: "单元格操作",
      dragHandler: "拖拽手柄",
      copyField: "复制字段组件",
      onlyFieldWidgetAcceptable: "子表单只能接收字段组件",
      moveUpFirstChildHint: "已经移动到最上面",
      moveDownLastChildHint: "已经移动到最下面",
      closePreview: "关闭",
      copyJson: "复制JSON",
      saveFormJson: "保存为文件",
      copyVueCode: "复制Vue代码",
      copyHtmlCode: "复制HTML代码",
      copyJsonSuccess: "复制JSON成功",
      importJsonSuccess: "导入JSON成功",
      invalidJsonFormat: "无效的表单JSON格式",
      jsonVersionMismatch: "表单JSON版本号不匹配",
      copyJsonFail: "复制JSON失败",
      copyVueCodeSuccess: "复制Vue代码成功",
      copyVueCodeFail: "复制Vue代码失败",
      copyHtmlCodeSuccess: "复制HTML代码成功",
      copyHtmlCodeFail: "复制HTML代码失败",
      saveVueCode: "保存Vue文件",
      saveHtmlCode: "保存Html文件",
      getFormData: "获取数据",
      resetForm: "重置表单",
      disableForm: "禁用编辑",
      enableForm: "恢复编辑",
      exportFormData: "表单数据",
      copyFormData: "复制JSON",
      saveFormData: "保存为文件",
      copyVue2SFC: "复制Vue2代码",
      copyVue3SFC: "复制Vue3代码",
      copySFCFail: "复制SFC代码失败",
      copySFCSuccess: "复制SFC代码成功",
      saveVue2SFC: "保存为Vue2组件",
      saveVue3SFC: "保存为Vue3组件",
      fileNameForSave: "文件名：",
      saveFileTitle: "保存为文件",
      fileNameInputPlaceholder: "请输入文件名",
      sampleLoadedSuccess: "表单示例加载成功",
      sampleLoadedFail: "表单示例加载失败",
      loadFormTemplate: "加载此模板",
      loadFormTemplateHint: "是否加载这个模板？加载后会覆盖设计器当前表单，你可以使用“撤销”功能恢复。",
      loadFormTemplateSuccess: "表单模板加载成功",
      loadFormTemplateFailed: "表单模板加载失败",
      currentNodeCannotBeSelected: "当前组件节点不可选择",
      widgetSetting: "组件设置",
      formSetting: "表单设置",
      prompt: "提示",
      confirm: "确定",
      cancel: "取消",
      import: "导入",
      importJsonHint: "导入的JSON内容须符合下述格式，以保证顺利导入.",
      invalidOptionsData: "无效的选项数据:",
      lastPaneCannotBeDeleted: "仅剩一个选项卡页不可删除.",
      duplicateName: "组件名称已存在: ",
      nameRequired: "组件名称不可为空",
      numberValidator: "数字",
      letterValidator: "字母",
      letterAndNumberValidator: "数字字母",
      mobilePhoneValidator: "手机号码",
      emailValidator: "邮箱",
      urlValidator: "网址",
      noChineseValidator: "非中文字符",
      chineseValidator: "仅中文字符",
      rowspanNotConsistentForMergeEntireRow: "存在行高不一致的单元格, 无法合并整行.",
      colspanNotConsistentForMergeEntireColumn: "存在列宽不一致的单元格, 无法合并整列.",
      rowspanNotConsistentForDeleteEntireRow: "存在行高不一致的单元格, 不可删除整行.",
      colspanNotConsistentForDeleteEntireColumn: "存在列宽不一致的单元格, 不可删除整列.",
      lastColCannotBeDeleted: "最后一列不可删除.",
      lastRowCannotBeDeleted: "最后一行不可删除."
    },
    toolbar: {
      undoHint: "撤销",
      redoHint: "重做",
      pcLayout: "PC",
      padLayout: "Pad",
      mobileLayout: "H5",
      nodeTreeHint: "组件层次结构树",
      nodeTreeTitle: "组件层次结构树",
      clear: "清空",
      preview: "预览",
      importJson: "导入JSON",
      exportJson: "导出JSON",
      exportCode: "导出代码",
      generateCode: "生成代码",
      generateSFC: "生成SFC"
    },
    setting: {
      basicSetting: "基本属性",
      attributeSetting: "属性设置",
      commonSetting: "常见属性",
      advancedSetting: "高级属性",
      eventSetting: "事件属性",
      uniqueName: "唯一名称",
      editNameHelp: "修改名称后需按回车确认",
      label: "标签",
      displayType: "显示类型",
      defaultValue: "默认值",
      placeholder: "占位内容",
      startPlaceholder: "起始占位内容",
      endPlaceholder: "截止占位内容",
      widgetColumnWidth: "组件列宽",
      widgetSize: "组件大小",
      fontSize: "字体大小",
      textAlign: "文字对齐",
      autoFullWidth: "自动拉伸宽度",
      showStops: "显示间断点",
      displayStyle: "显示样式",
      inlineLayout: "行内",
      blockLayout: "块",
      buttonStyle: "显示为按钮",
      border: "带有边框",
      labelWidth: "标签宽度",
      rows: "行数",
      labelHidden: "隐藏字段标签",
      required: "必填字段",
      requiredHint: "必填校验提示",
      validation: "字段校验",
      validationHelp: "支持输入正则表达式",
      validationHint: "校验失败提示",
      readonly: "只读",
      disabled: "禁用",
      hidden: "隐藏",
      textContent: "静态文字",
      preWrap: "自动换行",
      htmlContent: "HTML",
      clearable: "可清除",
      editable: "可输入",
      format: "显示格式",
      valueFormat: "绑定值格式",
      showPassword: "可显示密码",
      filterable: "可搜索选项",
      allowCreate: "允许创建选项",
      remote: "可远程搜索",
      automaticDropdown: "自动弹出选项",
      multiple: "选项可多选",
      multipleLimit: "多选数量限制",
      checkStrictly: "任意级节点可选",
      showAllLevels: "显示完整路径",
      contentPosition: "文字位置",
      plain: "朴素按钮",
      round: "圆角按钮",
      circle: "圆形按钮",
      icon: "图标",
      optionsSetting: "选项设置",
      addOption: "增加选项",
      importOptions: "导入选项",
      resetDefault: "重设选中项",
      uploadSetting: "上传参数设置",
      uploadURL: "上传地址",
      uploadTip: "上传提示内容",
      withCredentials: "发送cookie凭证",
      multipleSelect: "文件可多选",
      showFileList: "显示文件列表",
      limit: "最大上传数量",
      fileMaxSize: "文件大小限制(MB)",
      fileTypes: "上传文件类型",
      fileTypesHelp: "支持添加其他文件类型",
      headers: "上传请求头",
      cellWidth: "宽度",
      cellHeight: "高度",
      wordBreak: "文字自动换行",
      gridColHeight: "栅格列统一高度(px)",
      gutter: "栅格间隔(px)",
      columnSetting: "栅格属性设置",
      colsOfGrid: "当前栅格列:",
      colSpanTitle: "栅格宽度",
      colOffsetTitle: "左侧间隔格数",
      colPushTitle: "右移栅格数",
      colPullTitle: "左移栅格数",
      addColumn: "增加栅格",
      responsive: "响应式布局",
      tabPaneSetting: "选项卡设置",
      addTabPane: "增加选项卡页",
      paneActive: "激活",
      customLabelIcon: "定制字段标签",
      labelIconClass: "标签Icon样式",
      labelIconPosition: "标签Icon位置",
      labelTooltip: "标签文字提示",
      minValue: "最小值",
      maxValue: "最大值",
      precision: "精度",
      step: "增减步长",
      controlsPosition: "控制按钮位置",
      minLength: "最小长度",
      maxLength: "最大长度",
      showWordLimit: "显示字数统计",
      prefixIcon: "头部Icon",
      suffixIcon: "尾部Icon",
      inputButton: "输入框按钮设置",
      appendButton: "添加后置按钮",
      appendButtonDisabled: "后置按钮禁用",
      appendButtonIcon: "后置按钮Icon",
      buttonIcon: "按钮Icon",
      switchWidth: "开关宽度（像素）",
      activeText: "开启时文字描述",
      inactiveText: "关闭时文字描述",
      activeColor: "开启时背景色",
      inactiveColor: "关闭时背景色",
      maxStars: "最大评分值",
      lowThreshold: "低分界限值",
      highThreshold: "高分界限值",
      allowHalf: "允许半选",
      showText: "显示辅助文字",
      showScore: "显示当前分数",
      range: "是否为范围选择",
      vertical: "是否竖向显示",
      showBlankRow: "默认显示新行",
      showRowNumber: "显示行号",
      contentHeight: "内容区高度",
      insertColumnToLeft: "插入左侧列",
      insertColumnToRight: "插入右侧列",
      insertRowAbove: "插入上方行",
      insertRowBelow: "插入下方行",
      mergeLeftColumn: "合并左侧单元格",
      mergeRightColumn: "合并右侧单元格",
      mergeEntireRow: "合并整行",
      mergeRowAbove: "合并上方单元格",
      mergeRowBelow: "合并下方单元格",
      mergeEntireColumn: "合并整列",
      undoMergeCol: "撤销列合并",
      undoMergeRow: "撤销行合并",
      deleteEntireCol: "删除整列",
      deleteEntireRow: "删除整行",
      widgetName: "组件唯一名称",
      formSize: "全局组件大小",
      formSizeLarge: "大",
      formSizeDefault: "默认",
      formSizeSmall: "小",
      labelPosition: "标签位置",
      topPosition: "顶部",
      leftPosition: "左边",
      labelAlign: "字段标签对齐",
      leftAlign: "居左",
      centerAlign: "居中",
      rightAlign: "居右",
      formCss: "表单全局CSS",
      addCss: "编写CSS",
      customClass: "自定义CSS样式",
      globalFunctions: "表单全局函数",
      addEventHandler: "编写代码",
      editWidgetEventHandler: "组件事件处理",
      editFormEventHandler: "表单事件处理",
      formSFCSetting: "生成SFC设置",
      formModelName: "数据对象名称",
      formRefName: "引用名称",
      formRulesName: "验证规则名称",
      syntaxCheckWarning: "JS代码存在语法错误，请仔细检查！"
    }
  }
}, enLocale_render = {
  render: {
    hint: {
      prompt: "Prompt",
      confirm: "OK",
      cancel: "Cancel",
      selectPlaceholder: "Pick some item",
      timePlaceholder: "Select time",
      startTimePlaceholder: "Start time",
      endTimePlaceholder: "End time",
      datePlaceholder: "Select date",
      startDatePlaceholder: "Start date",
      endDatePlaceholder: "End date",
      blankCellContent: "--",
      uploadError: "Upload error: ",
      uploadExceed: "The maximum number(${uploadLimit}) of file uploads has been exceeded.",
      unsupportedFileType: "Unsupported format: ",
      fileSizeExceed: "File size out of limit: ",
      refNotFound: "Ref not found: ",
      fieldRequired: "Input value should be not null.",
      invalidNumber: "Invalid number format",
      selectFile: " File...",
      downloadFile: "Download",
      removeFile: "Remove",
      validationFailed: "Form validation failed",
      subFormAction: "Action",
      subFormAddAction: "Add",
      subFormAddActionHint: "add new row",
      insertSubFormRow: "insert new row",
      deleteSubFormRow: "delete this row",
      nonSubFormType: "The type of widget don't match sub-form"
    }
  }
}, zhLocale_render = {
  render: {
    hint: {
      prompt: "提示",
      confirm: "确定",
      cancel: "取消",
      selectPlaceholder: "请选择",
      timePlaceholder: "选择时间",
      startTimePlaceholder: "起始时间",
      endTimePlaceholder: "截止时间",
      datePlaceholder: "选择日期",
      startDatePlaceholder: "起始日期",
      endDatePlaceholder: "截止日期",
      blankCellContent: "--",
      uploadError: "上传错误: ",
      uploadExceed: "最大上传数量(${uploadLimit})已超出.",
      unsupportedFileType: "不支持格式: ",
      fileSizeExceed: "文件大小已超出: ",
      refNotFound: "组件未找到: ",
      fieldRequired: "字段值不可为空",
      invalidNumber: "数据格式错误",
      selectFile: " 选择文件",
      downloadFile: "下载",
      removeFile: "移除",
      validationFailed: "表单数据校验失败",
      subFormAction: "操作",
      subFormAddAction: "新增",
      subFormAddActionHint: "新增行",
      insertSubFormRow: "插入行",
      deleteSubFormRow: "删除行",
      nonSubFormType: "组件类型不是子表单"
    }
  }
}, enLocale_extension = {
  extension: {
    widgetLabel: {
      card: "Card",
      alert: "Alert"
    },
    setting: {
      cardFolded: "Folded",
      cardShowFold: "Show Fold",
      cardWidth: "Width Of Card",
      cardShadow: "Shadow",
      alertTitle: "Title",
      alertType: "Type",
      description: "Description",
      closable: "Closable",
      closeText: "Text On Close Btn",
      center: "Center",
      showIcon: "Show Icon",
      effect: "Effect"
    }
  }
}, zhLocale_extension = {
  extension: {
    widgetLabel: {
      card: "卡片",
      alert: "提示"
    },
    setting: {
      cardFolded: "是否收起",
      cardShowFold: "显示折叠按钮",
      cardWidth: "卡片宽度",
      cardShadow: "显示阴影",
      alertTitle: "标题",
      alertType: "类型",
      description: "辅助性文字",
      closable: "是否可关闭",
      closeText: "关闭按钮文字",
      center: "文字居中",
      showIcon: "显示图标",
      effect: "显示效果"
    }
  }
}, langResources = {
  "en-US": {
    something: {
      //...
    },
    ...enLocale,
    ...enLocale_render,
    ...enLocale_extension
  },
  "zh-CN": {
    something: {
      //...
    },
    ...zhLocale,
    ...zhLocale_render,
    ...zhLocale_extension
  }
}, i18n = createI18n({
  locale: localStorage.getItem("v_form_locale") || "zh-CN",
  messages: langResources
}), changeLocale = function(t) {
  i18n.setLang(t), localStorage.setItem("v_form_locale", t);
}, translate = function(t) {
  return i18n.$st(t);
}, i18n$1 = {
  methods: {
    i18nt(t) {
      return i18n.$st(t);
    },
    /* 如果key1不存在，则查找key2 */
    i18n2t(t, n) {
      return i18n.$st2(t, n);
    }
  }
}, refMixin = {
  methods: {
    initRefList() {
      this.refList !== null && this.widget.options.name && (this.refList[this.widget.options.name] = this);
    },
    getWidgetRef(t, n) {
      let e = this.refList[t];
      return !e && n && this.$message.error(this.i18nt("render.hint.refNotFound") + t), e;
    },
    getFormRef() {
      return this.refList.v_form_ref;
    },
    getComponentByContainer(t) {
      return t.type === "grid" ? "vf-grid-item" : t.type + "-item";
    }
  }
}, _sfc_main$B = {
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String,
      required: !0
    },
    className: {
      type: String
    },
    title: {
      type: String,
      default: ""
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      return this.className ? "svg-icon " + this.className : "svg-icon";
    }
  }
}, _hoisted_1$e = ["xlink:href"], _hoisted_2$8 = { key: 0 };
function _sfc_render$B(t, n, e, i, o, h) {
  return openBlock(), createElementBlock("svg", {
    class: normalizeClass(h.svgClass),
    "aria-hidden": "true"
  }, [
    createElementVNode("use", { "xlink:href": h.iconName }, null, 8, _hoisted_1$e),
    e.title ? (openBlock(), createElementBlock("title", _hoisted_2$8, toDisplayString(e.title), 1)) : createCommentVNode("", !0)
  ], 2);
}
const SvgIcon = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$B], ["__scopeId", "data-v-5216267b"]]), _sfc_main$A = {
  name: "static-content-wrapper",
  mixins: [i18n$1],
  components: {
    SvgIcon
  },
  props: {
    field: Object,
    designer: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designState: {
      type: Boolean,
      default: !1
    },
    displayStyle: {
      type: String,
      default: "block"
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  computed: {
    selected() {
      return !!this.designer && this.field.id === this.designer.selectedId;
    },
    customClass() {
      return this.field.options.customClass ? this.field.options.customClass.join(" ") : "";
    }
  },
  methods: {
    selectField(t) {
      this.designer && (this.designer.setSelected(t), this.designer.emitEvent("field-selected", this.parentWidget));
    },
    selectParentWidget() {
      this.parentWidget ? this.designer.setSelected(this.parentWidget) : this.designer.clearSelected();
    },
    moveUpWidget() {
      this.designer.moveUpWidget(this.parentList, this.indexOfParentList), this.designer.emitHistoryChange();
    },
    moveDownWidget() {
      this.designer.moveDownWidget(this.parentList, this.indexOfParentList), this.designer.emitHistoryChange();
    },
    removeFieldWidget() {
      if (this.parentList) {
        const t = this.designer.selectedWidgetName;
        let n = null;
        this.parentList.length === 1 ? this.parentWidget && (n = this.parentWidget) : this.parentList.length === 1 + this.indexOfParentList ? n = this.parentList[this.indexOfParentList - 1] : n = this.parentList[this.indexOfParentList + 1], this.$nextTick(() => {
          this.parentList.splice(this.indexOfParentList, 1), this.designer.setSelected(n), this.designer.formWidget.deleteWidgetRef(t), this.designer.emitHistoryChange();
        });
      }
    }
  }
}, _hoisted_1$d = {
  key: 0,
  class: "field-action"
}, _hoisted_2$7 = ["title"], _hoisted_3$5 = ["title"], _hoisted_4$5 = ["title"], _hoisted_5$5 = ["title"], _hoisted_6$5 = {
  key: 1,
  class: "drag-handler background-opacity"
}, _hoisted_7$4 = ["title"], _hoisted_8$2 = { key: 0 };
function _sfc_render$A(t, n, e, i, o, h) {
  const f = resolveComponent("svg-icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["field-wrapper", { "design-time-bottom-margin": !!this.designer }]),
    style: normalizeStyle({ display: e.displayStyle })
  }, [
    !e.field.options.hidden || e.designState === !0 ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["static-content-item", [h.selected ? "selected" : "", h.customClass]]),
      style: normalizeStyle({ display: e.displayStyle }),
      onClick: n[0] || (n[0] = withModifiers((v) => h.selectField(e.field), ["stop"]))
    }, [
      renderSlot(t.$slots, "default", {}, void 0, !0)
    ], 6)) : createCommentVNode("", !0),
    this.designer ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
      e.designer.selectedId === e.field.id ? (openBlock(), createElementBlock("div", _hoisted_1$d, [
        createElementVNode("i", {
          title: t.i18nt("designer.hint.selectParentWidget"),
          onClick: n[1] || (n[1] = withModifiers((v) => h.selectParentWidget(e.field), ["stop"]))
        }, [
          createVNode(f, { "icon-class": "el-back" })
        ], 8, _hoisted_2$7),
        e.parentList && e.parentList.length > 1 ? (openBlock(), createElementBlock("i", {
          key: 0,
          title: t.i18nt("designer.hint.moveUpWidget"),
          onClick: n[2] || (n[2] = withModifiers((v) => h.moveUpWidget(e.field), ["stop"]))
        }, [
          createVNode(f, { "icon-class": "el-move-up" })
        ], 8, _hoisted_3$5)) : createCommentVNode("", !0),
        e.parentList && e.parentList.length > 1 ? (openBlock(), createElementBlock("i", {
          key: 1,
          title: t.i18nt("designer.hint.moveDownWidget"),
          onClick: n[3] || (n[3] = withModifiers((v) => h.moveDownWidget(e.field), ["stop"]))
        }, [
          createVNode(f, { "icon-class": "el-move-down" })
        ], 8, _hoisted_4$5)) : createCommentVNode("", !0),
        createElementVNode("i", {
          title: t.i18nt("designer.hint.remove"),
          onClick: n[4] || (n[4] = withModifiers((...v) => h.removeFieldWidget && h.removeFieldWidget(...v), ["stop"]))
        }, [
          createVNode(f, { "icon-class": "el-delete" })
        ], 8, _hoisted_5$5)
      ])) : createCommentVNode("", !0),
      e.designer.selectedId === e.field.id ? (openBlock(), createElementBlock("div", _hoisted_6$5, [
        createElementVNode("i", {
          title: t.i18nt("designer.hint.dragHandler")
        }, [
          createVNode(f, { "icon-class": "el-drag-move" })
        ], 8, _hoisted_7$4),
        createElementVNode("i", null, toDisplayString(t.i18n2t(`designer.widgetLabel.${e.field.type}`, `extension.widgetLabel.${e.field.type}`)), 1),
        e.field.options.hidden === !0 ? (openBlock(), createElementBlock("i", _hoisted_8$2, [
          createVNode(f, { "icon-class": "el-hide" })
        ])) : createCommentVNode("", !0)
      ])) : createCommentVNode("", !0)
    ], 64)) : createCommentVNode("", !0)
  ], 6);
}
const StaticContentWrapper = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$A], ["__scopeId", "data-v-1551b4ba"]]), __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: StaticContentWrapper
}, Symbol.toStringTag, { value: "Module" }));
function isNull(t) {
  return t == null;
}
const generateId = function() {
  return Math.floor(Math.random() * 1e5 + Math.random() * 2e4 + Math.random() * 5e3);
}, deepClone = function(t) {
  if (t !== void 0)
    return JSON.parse(JSON.stringify(t));
}, evalFn = function(t, n = null, e = null) {
  return new Function("DSV", "VFR", "return " + t)(n, e);
}, insertCustomCssToHead = function(t, n = "") {
  let e = document.getElementsByTagName("head")[0], i = document.getElementById("vform-custom-css");
  i && e.removeChild(i), n && (i = document.getElementById("vform-custom-css-" + n), i && e.removeChild(i));
  let o = document.createElement("style");
  o.type = "text/css", o.rel = "stylesheet", o.id = n ? "vform-custom-css-" + n : "vform-custom-css";
  try {
    o.appendChild(document.createTextNode(t));
  } catch {
    o.styleSheet.cssText = t;
  }
  e.appendChild(o);
}, insertGlobalFunctionsToHtml = function(t, n = "") {
  let e = document.getElementsByTagName("body")[0], i = document.getElementById("v_form_global_functions");
  i && e.removeChild(i), n && (i = document.getElementById("v_form_global_functions-" + n), i && e.removeChild(i));
  let o = document.createElement("script");
  o.id = n ? "v_form_global_functions-" + n : "v_form_global_functions", o.type = "text/javascript", o.innerHTML = t, e.appendChild(o);
};
function traverseFieldWidgets(t, n, e = null) {
  t && t.map((i) => {
    i.formItemFlag ? n(i, e) : i.type === "grid" ? i.cols.map((o) => {
      traverseFieldWidgets(o.widgetList, n, i);
    }) : i.type === "table" ? i.rows.map((o) => {
      o.cols.map((h) => {
        traverseFieldWidgets(h.widgetList, n, i);
      });
    }) : i.type === "tab" ? i.tabs.map((o) => {
      traverseFieldWidgets(o.widgetList, n, i);
    }) : (i.type === "sub-form" || i.category === "container") && traverseFieldWidgets(i.widgetList, n, i);
  });
}
function traverseContainerWidgets(t, n) {
  t && t.map((e) => {
    e.category === "container" && n(e), e.type === "grid" ? e.cols.map((i) => {
      traverseContainerWidgets(i.widgetList, n);
    }) : e.type === "table" ? e.rows.map((i) => {
      i.cols.map((o) => {
        traverseContainerWidgets(o.widgetList, n);
      });
    }) : e.type === "tab" ? e.tabs.map((i) => {
      traverseContainerWidgets(i.widgetList, n);
    }) : (e.type === "sub-form" || e.category === "container") && traverseContainerWidgets(e.widgetList, n);
  });
}
function handleWidgetForTraverse(t, n) {
  t.category ? traverseFieldWidgetsOfContainer(t, n) : t.formItemFlag && n(t);
}
function traverseFieldWidgetsOfContainer(t, n) {
  t.type === "grid" ? t.cols.forEach((e) => {
    e.widgetList.forEach((i) => {
      handleWidgetForTraverse(i, n);
    });
  }) : t.type === "table" ? t.rows.forEach((e) => {
    e.cols.forEach((i) => {
      i.widgetList.forEach((o) => {
        handleWidgetForTraverse(o, n);
      });
    });
  }) : t.type === "tab" ? t.tabs.forEach((e) => {
    e.widgetList.forEach((i) => {
      handleWidgetForTraverse(i, n);
    });
  }) : t.type === "sub-form" ? t.widgetList.forEach((e) => {
    handleWidgetForTraverse(e, n);
  }) : t.category === "container" && t.widgetList.forEach((e) => {
    handleWidgetForTraverse(e, n);
  });
}
function getAllFieldWidgets(t) {
  if (!t)
    return [];
  let n = [];
  return traverseFieldWidgets(t, (i) => {
    n.push({
      type: i.type,
      name: i.options.name,
      field: i
    });
  }), n;
}
function getAllContainerWidgets(t) {
  if (!t)
    return [];
  let n = [];
  return traverseContainerWidgets(t, (i) => {
    n.push({
      type: i.type,
      name: i.options.name,
      container: i
    });
  }), n;
}
function getDefaultFormConfig() {
  return {
    modelName: "formData",
    refName: "vForm",
    rulesName: "rules",
    labelWidth: 80,
    labelPosition: "left",
    size: "",
    labelAlign: "label-left-align",
    cssCode: "",
    customClass: [],
    functions: "",
    //全局函数
    layoutType: "PC",
    jsonVersion: 3,
    onFormCreated: "",
    onFormMounted: "",
    onFormDataChange: ""
  };
}
function buildDefaultFormJson() {
  return {
    widgetList: [],
    formConfig: deepClone(getDefaultFormConfig())
  };
}
const getRegExp = function(t) {
  return {
    number: "/^[-]?\\d+(\\.\\d+)?$/",
    letter: "/^[A-Za-z]+$/",
    letterAndNumber: "/^[A-Za-z0-9]+$/",
    mobilePhone: "/^[1][3-9][0-9]{9}$/",
    letterStartNumberIncluded: "/^[A-Za-z]+[A-Za-z\\d]*$/",
    noChinese: "/^[^一-龥]+$/",
    chinese: "/^[一-龥]+$/",
    email: "/^([-_A-Za-z0-9.]+)@([_A-Za-z0-9]+\\.)+[A-Za-z0-9]{2,3}$/",
    url: "/^([hH][tT]{2}[pP]:\\/\\/|[hH][tT]{2}[pP][sS]:\\/\\/)(([A-Za-z0-9-~]+)\\.)+([A-Za-z0-9-~\\/])+$/"
  }[t];
}, validateFn = function(validatorName, rule, value, callback, defaultErrorMsg) {
  if (isNull(value) || value.length <= 0) {
    callback();
    return;
  }
  const reg = eval(getRegExp(validatorName));
  if (reg.test(value))
    callback();
  else {
    let t = rule.errorMsg || defaultErrorMsg;
    callback(new Error(t));
  }
}, FormValidators = {
  /* 数字 */
  number(t, n, e) {
    validateFn("number", t, n, e, "[" + t.label + "]包含非数字字符");
  },
  /* 字母 */
  letter(t, n, e) {
    validateFn("letter", t, n, e, "[" + t.label + "]包含非字母字符");
  },
  /* 字母和数字 */
  letterAndNumber(t, n, e) {
    validateFn("letterAndNumber", t, n, e, "[" + t.label + "]只能输入字母或数字");
  },
  /* 手机号码 */
  mobilePhone(t, n, e) {
    validateFn("mobilePhone", t, n, e, "[" + t.label + "]手机号码格式有误");
  },
  /* 禁止空白字符开头 */
  noBlankStart(t, n, e) {
  },
  /* 禁止空白字符结尾 */
  noBlankEnd(t, n, e) {
  },
  /* 字母开头，仅可包含数字 */
  letterStartNumberIncluded(t, n, e) {
    validateFn("letterStartNumberIncluded", t, n, e, "[" + t.label + "]必须以字母开头，可包含数字");
  },
  /* 禁止中文输入 */
  noChinese(t, n, e) {
    validateFn("noChinese", t, n, e, "[" + t.label + "]不可输入中文字符");
  },
  /* 必须中文输入 */
  chinese(t, n, e) {
    validateFn("chinese", t, n, e, "[" + t.label + "]只能输入中文字符");
  },
  /* 电子邮箱 */
  email(t, n, e) {
    validateFn("email", t, n, e, "[" + t.label + "]邮箱格式有误");
  },
  /* URL网址 */
  url(t, n, e) {
    validateFn("url", t, n, e, "[" + t.label + "]URL格式有误");
  },
  /*测试
    test(rule, value, callback, errorMsg) {
      //空值不校验
      if (isNull(value) || (value.length <= 0)) {
        callback()
        return
      }
  
      if (value < 100) {
        callback(new Error('[' + rule.label + ']不能小于100'))
      } else {
        callback()
      }
    },
    */
  regExp(rule, value, callback) {
    if (isNull(value) || value.length <= 0) {
      callback();
      return;
    }
    const pattern = eval(rule.regExp);
    if (pattern.test(value))
      callback();
    else {
      let t = rule.errorMsg || "[" + rule.label + "]invalid value";
      callback(new Error(t));
    }
  }
}, fieldMixin = {
  inject: ["refList", "getFormConfig", "getGlobalDsv", "globalOptionData", "globalModel", "getOptionData"],
  computed: {
    formConfig() {
      return this.getFormConfig();
    },
    widgetSize() {
      return this.field.options.size || "default";
    },
    subFormName() {
      return this.parentWidget ? this.parentWidget.options.name : "";
    },
    subFormItemFlag() {
      return this.parentWidget ? this.parentWidget.type === "sub-form" : !1;
    },
    formModel: {
      cache: !1,
      get() {
        return this.globalModel.formModel;
      }
    }
  },
  methods: {
    //--------------------- 组件内部方法 begin ------------------//
    getPropName() {
      return this.subFormItemFlag && !this.designState ? this.subFormName + "." + this.subFormRowIndex + "." + this.field.options.name : this.field.options.name;
    },
    initFieldModel() {
      if (this.field.formItemFlag) {
        if (this.subFormItemFlag && !this.designState) {
          let t = this.formModel[this.subFormName];
          (t === void 0 || t[this.subFormRowIndex] === void 0 || t[this.subFormRowIndex][this.field.options.name] === void 0) && this.field.options.defaultValue !== void 0 ? (this.fieldModel = this.field.options.defaultValue, t[this.subFormRowIndex][this.field.options.name] = this.field.options.defaultValue) : t[this.subFormRowIndex][this.field.options.name] === void 0 ? (this.fieldModel = null, t[this.subFormRowIndex][this.field.options.name] = null) : this.fieldModel = t[this.subFormRowIndex][this.field.options.name], setTimeout(() => {
            this.handleOnChangeForSubForm(this.fieldModel, this.oldFieldValue, t, this.subFormRowId);
          }, 800), this.oldFieldValue = deepClone(this.fieldModel), this.initFileList();
          return;
        }
        this.formModel[this.field.options.name] === void 0 && this.field.options.defaultValue !== void 0 ? this.fieldModel = this.field.options.defaultValue : this.formModel[this.field.options.name] === void 0 ? this.formModel[this.field.options.name] = null : this.fieldModel = this.formModel[this.field.options.name], this.oldFieldValue = deepClone(this.fieldModel), this.initFileList();
      }
    },
    initFileList() {
      this.field.type !== "picture-upload" && this.field.type !== "file-upload" || this.designState === !0 || this.fieldModel && (Array.isArray(this.fieldModel) ? this.fileList = deepClone(this.fieldModel) : this.fileList.splice(0, 0, deepClone(this.fieldModel)));
    },
    initEventHandler() {
      this.on$("setFormData", (t) => {
        console.log("formModel of globalModel----------", this.globalModel.formModel), this.subFormItemFlag || this.setValue(t[this.field.options.name]);
      }), this.on$("field-value-changed", (t) => {
        if (this.subFormItemFlag) {
          let n = this.formModel[this.subFormName];
          this.handleOnChangeForSubForm(t[0], t[1], n, this.subFormRowId);
        } else
          this.handleOnChange(t[0], t[1]);
      }), this.on$("reloadOptionItems", (t) => {
        (t.length === 0 || t.indexOf(this.field.options.name) > -1) && this.initOptionItems(!0);
      });
    },
    handleOnCreated() {
      this.field.options.onCreated && new Function(this.field.options.onCreated).call(this);
    },
    handleOnMounted() {
      this.field.options.onMounted && new Function(this.field.options.onMounted).call(this);
    },
    registerToRefList(t) {
      this.refList !== null && this.field.options.name && (this.subFormItemFlag && !this.designState ? (t && delete this.refList[t + "@row" + this.subFormRowId], this.refList[this.field.options.name + "@row" + this.subFormRowId] = this) : (t && delete this.refList[t], this.refList[this.field.options.name] = this));
    },
    unregisterFromRefList() {
      if (this.refList !== null && this.field.options.name) {
        let t = this.field.options.name;
        this.subFormItemFlag && !this.designState ? delete this.refList[t + "@row" + this.subFormRowId] : delete this.refList[t];
      }
    },
    initOptionItems(t) {
      if (!this.designState && (this.field.type === "radio" || this.field.type === "checkbox" || this.field.type === "select" || this.field.type === "cascader")) {
        const n = this.getOptionData();
        n && n.hasOwnProperty(this.field.options.name) && (t ? this.reloadOptions(n[this.field.options.name]) : this.loadOptions(n[this.field.options.name]));
      }
    },
    refreshDefaultValue() {
      this.designState === !0 && this.field.options.defaultValue !== void 0 && (this.fieldModel = this.field.options.defaultValue);
    },
    clearFieldRules() {
      this.field.formItemFlag && this.rules.splice(0, this.rules.length);
    },
    buildFieldRules() {
      if (!(!this.field.formItemFlag && this.field.options.hidden)) {
        if (this.rules.splice(0, this.rules.length), this.field.options.required && this.rules.push({
          required: !0,
          //trigger: ['blur', 'change'],
          trigger: ["blur"],
          /* 去掉change事件触发校验，change事件触发时formModel数据尚未更新，导致radio/checkbox必填校验出错！！ */
          message: this.field.options.requiredHint || this.i18nt("render.hint.fieldRequired")
        }), this.field.options.validation) {
          let t = this.field.options.validation;
          FormValidators[t] ? this.rules.push({
            validator: FormValidators[t],
            trigger: ["blur", "change"],
            label: this.field.options.label,
            errorMsg: this.field.options.validationHint
          }) : this.rules.push({
            validator: FormValidators.regExp,
            trigger: ["blur", "change"],
            regExp: t,
            label: this.field.options.label,
            errorMsg: this.field.options.validationHint
          });
        }
        if (this.field.options.onValidate) {
          let t = (n, e, i) => new Function("rule", "value", "callback", this.field.options.onValidate).call(this, n, e, i);
          this.rules.push({
            validator: t,
            trigger: ["blur", "change"],
            label: this.field.options.label
          });
        }
      }
    },
    /**
     * 禁用字段值变动触发表单校验
     */
    disableChangeValidate() {
      this.rules && this.rules.forEach((t) => {
        t.trigger && t.trigger.splice(0, t.trigger.length);
      });
    },
    /**
     * 启用字段值变动触发表单校验
     */
    enableChangeValidate() {
      this.rules && this.rules.forEach((t) => {
        t.trigger && (t.trigger.push("blur"), t.trigger.push("change"));
      });
    },
    disableOptionOfList(t, n) {
      t && t.length > 0 && t.forEach((e) => {
        e.value === n && (e.disabled = !0);
      });
    },
    enableOptionOfList(t, n) {
      t && t.length > 0 && t.forEach((e) => {
        e.value === n && (e.disabled = !1);
      });
    },
    //--------------------- 组件内部方法 end ------------------//
    //--------------------- 事件处理 begin ------------------//
    emitFieldDataChange(t, n) {
      this.emit$("field-value-changed", [t, n]), this.dispatch(
        "VFormRender",
        "fieldChange",
        [this.field.options.name, t, n, this.subFormName, this.subFormRowIndex]
      );
    },
    syncUpdateFormModel(t) {
      if (!this.designState)
        if (this.subFormItemFlag) {
          let e = (this.formModel[this.subFormName] || [{}])[this.subFormRowIndex];
          e && (e[this.field.options.name] = t);
        } else
          this.formModel[this.field.options.name] = t;
    },
    handleChangeEvent(t) {
      this.syncUpdateFormModel(t), this.emitFieldDataChange(t, this.oldFieldValue), this.oldFieldValue = deepClone(t), this.dispatch("VFormRender", "fieldValidation", [this.getPropName()]);
    },
    handleFocusCustomEvent(t) {
      this.oldFieldValue = deepClone(this.fieldModel), this.field.options.onFocus && new Function("event", this.field.options.onFocus).call(this, t);
    },
    handleBlurCustomEvent(t) {
      this.field.options.onBlur && new Function("event", this.field.options.onBlur).call(this, t);
    },
    handleInputCustomEvent(t) {
      this.syncUpdateFormModel(t), this.dispatch("VFormRender", "fieldValidation", [this.getPropName()]), this.field.options.onInput && new Function("value", this.field.options.onInput).call(this, t);
    },
    emitAppendButtonClick() {
      this.designState || (this.field.options.onAppendButtonClick ? new Function(this.field.options.onAppendButtonClick).call(this) : this.dispatch("VFormRender", "appendButtonClick", [this]));
    },
    handleOnChange(t, n) {
      this.field.options.onChange && new Function("value", "oldValue", this.field.options.onChange).call(this, t, n);
    },
    handleOnChangeForSubForm(t, n, e, i) {
      this.field.options.onChange && new Function("value", "oldValue", "subFormData", "rowId", this.field.options.onChange).call(this, t, n, e, i);
    },
    handleButtonWidgetClick() {
      this.designState || (this.field.options.onClick ? new Function(this.field.options.onClick).call(this) : this.dispatch("VFormRender", "buttonClick", [this]));
    },
    remoteQuery(t) {
      this.field.options.onRemoteQuery && new Function("keyword", this.field.options.onRemoteQuery).call(this, t);
    },
    //--------------------- 事件处理 end ------------------//
    //--------------------- 以下为组件支持外部调用的API方法 begin ------------------//
    /* 提示：用户可自行扩充这些方法！！！ */
    getFormRef() {
      return this.refList.v_form_ref;
    },
    getWidgetRef(t, n) {
      let e = this.refList[t];
      return !e && n && this.$message.error(this.i18nt("render.hint.refNotFound") + t), e;
    },
    getFieldEditor() {
      return this.$refs.fieldEditor;
    },
    /*
      注意：VFormRender的setFormData方法不会触发子表单内field-widget的setValue方法，
      因为setFormData方法调用后，子表单内所有field-widget组件已被清空，接收不到setFormData事件！！
    * */
    setValue(t) {
      if (this.field.formItemFlag) {
        let n = deepClone(this.fieldModel);
        this.fieldModel = t, this.initFileList(), this.syncUpdateFormModel(t), this.emitFieldDataChange(t, n);
      }
    },
    getValue() {
      return this.fieldModel;
    },
    resetField() {
      let t = this.field.options.defaultValue;
      this.setValue(t), this.$nextTick(() => {
      }), (this.field.type === "picture-upload" || this.field.type === "file-upload") && (this.$refs.fieldEditor.clearFiles(), this.fileList.splice(0, this.fileList.length));
    },
    setWidgetOption(t, n) {
      this.field.options.hasOwnProperty(t) && (this.field.options[t] = n);
    },
    setReadonly(t) {
      this.field.options.readonly = t;
    },
    setDisabled(t) {
      this.field.options.disabled = t;
    },
    setAppendButtonVisible(t) {
      this.field.options.appendButton = t;
    },
    setAppendButtonDisabled(t) {
      this.field.options.appendButtonDisabled = t;
    },
    setHidden(t) {
      this.field.options.hidden = t, t ? this.clearFieldRules() : this.buildFieldRules();
    },
    setRequired(t) {
      this.field.options.required = t, this.buildFieldRules();
    },
    setLabel(t) {
      this.field.options.label = t;
    },
    focus() {
      this.getFieldEditor() && this.getFieldEditor().focus && this.getFieldEditor().focus();
    },
    clearSelectedOptions() {
      this.field.type !== "checkbox" && this.field.type !== "radio" && this.field.type !== "select" || (this.field.type === "checkbox" || this.field.type === "select" && this.field.options.multiple ? this.fieldModel = [] : this.fieldModel = "");
    },
    /**
     * 加载选项，并清空字段值
     * @param options
     */
    loadOptions(t) {
      this.field.options.optionItems = deepClone(t);
    },
    /**
     * 重新加载选项，不清空字段值
     * @param options
     */
    reloadOptions(t) {
      this.field.options.optionItems = deepClone(t);
    },
    disableOption(t) {
      this.disableOptionOfList(this.field.options.optionItems, t);
    },
    enableOption(t) {
      this.enableOptionOfList(this.field.options.optionItems, t);
    },
    /**
     * 返回选择项
     * @returns {*}
     */
    getOptionItems() {
      return this.field.options.optionItems;
    },
    setUploadHeader(t, n) {
      this.uploadHeaders[t] = n;
    },
    setUploadData(t, n) {
      this.uploadData[t] = n;
    },
    setToolbar(t) {
      this.customToolbar = t;
    },
    /**
     * 是否子表单内嵌的组件
     * @returns {boolean}
     */
    isSubFormItem() {
      return this.parentWidget ? this.parentWidget.type === "sub-form" : !1;
    },
    /**
     * 动态增加自定义css样式
     * @param className
     */
    addCssClass(t) {
      this.field.options.customClass ? this.field.options.customClass.push(t) : this.field.options.customClass = [t];
    },
    /**
     * 动态移除自定义css样式
     * @param className
     */
    removeCssClass(t) {
      if (!this.field.options.customClass)
        return;
      let n = -1;
      this.field.options.customClass.map((e, i) => {
        e === t && (n = i);
      }), n > -1 && this.field.options.customClass.splice(n, 1);
    }
    //--------------------- 以上为组件支持外部调用的API方法 end ------------------//
  }
}, _sfc_main$z = {
  name: "button-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    StaticContentWrapper
  },
  computed: {},
  beforeCreate() {
  },
  created() {
    this.registerToRefList(), this.initEventHandler(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
};
function _sfc_render$z(t, n, e, i, o, h) {
  const f = resolveComponent("el-button"), v = resolveComponent("static-content-wrapper");
  return openBlock(), createBlock(v, {
    designer: e.designer,
    field: e.field,
    "design-state": e.designState,
    "display-style": e.field.options.displayStyle,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createVNode(f, {
        ref: "fieldEditor",
        type: e.field.options.type,
        size: t.widgetSize,
        plain: e.field.options.plain,
        round: e.field.options.round,
        circle: e.field.options.circle,
        icon: e.field.options.icon,
        disabled: e.field.options.disabled,
        onClick: t.handleButtonWidgetClick
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(e.field.options.label), 1)
        ]),
        _: 1
      }, 8, ["type", "size", "plain", "round", "circle", "icon", "disabled", "onClick"])
    ]),
    _: 1
  }, 8, ["designer", "field", "design-state", "display-style", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const buttonWidget = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$z], ["__scopeId", "data-v-7c35a2f8"]]), __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: buttonWidget
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$y = {
  name: "form-item-wrapper",
  mixins: [i18n$1],
  components: {
    SvgIcon
  },
  props: {
    field: Object,
    designer: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    },
    rules: Array
  },
  inject: ["getFormConfig"],
  computed: {
    formConfig() {
      return this.getFormConfig();
    },
    selected() {
      return !!this.designer && this.field.id === this.designer.selectedId;
    },
    label() {
      return this.field.options.labelHidden ? "" : this.field.options.label;
    },
    labelWidth() {
      return this.field.options.labelHidden ? 0 : this.field.options.labelWidth ? this.field.options.labelWidth : this.designer ? this.designer.formConfig.labelWidth : this.formConfig.labelWidth;
    },
    labelAlign() {
      return this.field.options.labelAlign ? this.field.options.labelAlign : this.designer ? this.designer.formConfig.labelAlign || "label-left-align" : this.formConfig.labelAlign || "label-left-align";
    },
    customClass() {
      return this.field.options.customClass ? this.field.options.customClass.join(" ") : "";
    },
    subFormName() {
      return this.parentWidget ? this.parentWidget.options.name : "";
    },
    subFormItemFlag() {
      return this.parentWidget ? this.parentWidget.type === "sub-form" : !1;
    }
  },
  created() {
  },
  methods: {
    selectField(t) {
      this.designer && (this.designer.setSelected(t), this.designer.emitEvent("field-selected", this.parentWidget));
    },
    selectParentWidget() {
      this.parentWidget ? this.designer.setSelected(this.parentWidget) : this.designer.clearSelected();
    },
    moveUpWidget() {
      this.designer.moveUpWidget(this.parentList, this.indexOfParentList), this.designer.emitHistoryChange();
    },
    moveDownWidget() {
      this.designer.moveDownWidget(this.parentList, this.indexOfParentList), this.designer.emitHistoryChange();
    },
    removeFieldWidget() {
      if (this.parentList) {
        const t = this.designer.selectedWidgetName;
        let n = null;
        this.parentList.length === 1 ? this.parentWidget && (n = this.parentWidget) : this.parentList.length === 1 + this.indexOfParentList ? n = this.parentList[this.indexOfParentList - 1] : n = this.parentList[this.indexOfParentList + 1], this.$nextTick(() => {
          this.parentList.splice(this.indexOfParentList, 1), this.designer.setSelected(n), this.designer.formWidget.deleteWidgetRef(t), this.designer.emitHistoryChange();
        });
      }
    },
    getPropName() {
      return this.subFormItemFlag && !this.designState ? this.subFormName + "." + this.subFormRowIndex + "." + this.field.options.name : this.field.options.name;
    }
  }
}, _hoisted_1$c = {
  key: 0,
  class: "custom-label"
}, _hoisted_2$6 = {
  key: 0,
  class: "field-action"
}, _hoisted_3$4 = ["title"], _hoisted_4$4 = ["title"], _hoisted_5$4 = ["title"], _hoisted_6$4 = ["title"], _hoisted_7$3 = {
  key: 1,
  class: "drag-handler background-opacity"
}, _hoisted_8$1 = ["title"], _hoisted_9$1 = { key: 0 };
function _sfc_render$y(t, n, e, i, o, h) {
  const f = resolveComponent("svg-icon"), v = resolveComponent("el-tooltip"), b = resolveComponent("el-form-item");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["field-wrapper", { "design-time-bottom-margin": !!this.designer }])
  }, [
    e.field.formItemFlag && (!e.field.options.hidden || e.designState === !0) ? (openBlock(), createBlock(b, {
      key: 0,
      label: h.label,
      "label-width": h.labelWidth + "px",
      title: e.field.options.labelTooltip,
      rules: e.rules,
      prop: h.getPropName(),
      class: normalizeClass([h.selected ? "selected" : "", h.labelAlign, h.customClass, e.field.options.required ? "required" : ""]),
      onClick: n[0] || (n[0] = withModifiers((y) => h.selectField(e.field), ["stop"]))
    }, {
      label: withCtx(() => [
        e.field.options.labelIconClass ? (openBlock(), createElementBlock("span", _hoisted_1$c, [
          e.field.options.labelIconPosition === "front" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            e.field.options.labelTooltip ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createVNode(v, {
                content: e.field.options.labelTooltip,
                effect: "light"
              }, {
                default: withCtx(() => [
                  createVNode(f, {
                    "icon-class": e.field.options.labelIconClass
                  }, null, 8, ["icon-class"])
                ]),
                _: 1
              }, 8, ["content"]),
              createTextVNode(toDisplayString(h.label), 1)
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createVNode(f, {
                "icon-class": e.field.options.labelIconClass
              }, null, 8, ["icon-class"]),
              createTextVNode(toDisplayString(h.label), 1)
            ], 64))
          ], 64)) : e.field.options.labelIconPosition === "rear" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            e.field.options.labelTooltip ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(toDisplayString(h.label), 1),
              createVNode(v, {
                content: e.field.options.labelTooltip,
                effect: "light"
              }, {
                default: withCtx(() => [
                  createVNode(f, {
                    "icon-class": e.field.options.labelIconClass
                  }, null, 8, ["icon-class"])
                ]),
                _: 1
              }, 8, ["content"])
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(toDisplayString(h.label), 1),
              createVNode(f, {
                "icon-class": e.field.options.labelIconClass
              }, null, 8, ["icon-class"])
            ], 64))
          ], 64)) : createCommentVNode("", !0)
        ])) : createCommentVNode("", !0)
      ]),
      default: withCtx(() => [
        renderSlot(t.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 8, ["label", "label-width", "title", "rules", "prop", "class"])) : createCommentVNode("", !0),
    this.designer ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
      e.designer.selectedId === e.field.id ? (openBlock(), createElementBlock("div", _hoisted_2$6, [
        createElementVNode("i", {
          title: t.i18nt("designer.hint.selectParentWidget"),
          onClick: n[1] || (n[1] = withModifiers((y) => h.selectParentWidget(e.field), ["stop"]))
        }, [
          createVNode(f, { "icon-class": "el-back" })
        ], 8, _hoisted_3$4),
        e.parentList && e.parentList.length > 1 ? (openBlock(), createElementBlock("i", {
          key: 0,
          title: t.i18nt("designer.hint.moveUpWidget"),
          onClick: n[2] || (n[2] = withModifiers((y) => h.moveUpWidget(e.field), ["stop"]))
        }, [
          createVNode(f, { "icon-class": "el-move-up" })
        ], 8, _hoisted_4$4)) : createCommentVNode("", !0),
        e.parentList && e.parentList.length > 1 ? (openBlock(), createElementBlock("i", {
          key: 1,
          title: t.i18nt("designer.hint.moveDownWidget"),
          onClick: n[3] || (n[3] = withModifiers((y) => h.moveDownWidget(e.field), ["stop"]))
        }, [
          createVNode(f, { "icon-class": "el-move-down" })
        ], 8, _hoisted_5$4)) : createCommentVNode("", !0),
        createElementVNode("i", {
          title: t.i18nt("designer.hint.remove"),
          onClick: n[4] || (n[4] = withModifiers((...y) => h.removeFieldWidget && h.removeFieldWidget(...y), ["stop"]))
        }, [
          createVNode(f, { "icon-class": "el-delete" })
        ], 8, _hoisted_6$4)
      ])) : createCommentVNode("", !0),
      e.designer.selectedId === e.field.id ? (openBlock(), createElementBlock("div", _hoisted_7$3, [
        createElementVNode("i", {
          title: t.i18nt("designer.hint.dragHandler")
        }, [
          createVNode(f, { "icon-class": "el-drag-move" })
        ], 8, _hoisted_8$1),
        createElementVNode("i", null, toDisplayString(t.i18n2t(`designer.widgetLabel.${e.field.type}`, `extension.widgetLabel.${e.field.type}`)), 1),
        e.field.options.hidden === !0 ? (openBlock(), createElementBlock("i", _hoisted_9$1, [
          createVNode(f, { "icon-class": "el-hide" })
        ])) : createCommentVNode("", !0)
      ])) : createCommentVNode("", !0)
    ], 64)) : createCommentVNode("", !0)
  ], 2);
}
const FormItemWrapper = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$y], ["__scopeId", "data-v-752683ce"]]), __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FormItemWrapper
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$x = {
  name: "cascader-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    FormItemWrapper
  },
  data() {
    return {
      oldFieldValue: null,
      //field组件change之前的值
      fieldModel: null,
      rules: []
    };
  },
  computed: {
    showFullPath() {
      return this.field.options.showAllLevels === void 0 || !!this.field.options.showAllLevels;
    }
  },
  beforeCreate() {
  },
  created() {
    this.initOptionItems(), this.initFieldModel(), this.registerToRefList(), this.initEventHandler(), this.buildFieldRules(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
}, _hoisted_1$b = { class: "full-width-input" };
function _sfc_render$x(t, n, e, i, o, h) {
  const f = resolveComponent("el-cascader"), v = resolveComponent("form-item-wrapper");
  return openBlock(), createBlock(v, {
    designer: e.designer,
    field: e.field,
    rules: o.rules,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createElementVNode("div", _hoisted_1$b, [
        createVNode(f, {
          ref: "fieldEditor",
          options: e.field.options.optionItems,
          modelValue: o.fieldModel,
          "onUpdate:modelValue": n[0] || (n[0] = (b) => o.fieldModel = b),
          disabled: e.field.options.disabled,
          size: t.widgetSize,
          clearable: e.field.options.clearable,
          filterable: e.field.options.filterable,
          placeholder: e.field.options.placeholder || t.i18nt("render.hint.selectPlaceholder"),
          "show-all-levels": h.showFullPath,
          props: { checkStrictly: e.field.options.checkStrictly, multiple: e.field.options.multiple, expandTrigger: "hover" },
          onFocus: t.handleFocusCustomEvent,
          onBlur: t.handleBlurCustomEvent,
          onChange: t.handleChangeEvent
        }, null, 8, ["options", "modelValue", "disabled", "size", "clearable", "filterable", "placeholder", "show-all-levels", "props", "onFocus", "onBlur", "onChange"])
      ])
    ]),
    _: 1
  }, 8, ["designer", "field", "rules", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const cascaderWidget = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$x], ["__scopeId", "data-v-815f33c5"]]), __vite_glob_0_1$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cascaderWidget
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$w = {
  name: "checkbox-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    FormItemWrapper
  },
  data() {
    return {
      oldFieldValue: null,
      //field组件change之前的值
      fieldModel: null,
      rules: []
    };
  },
  computed: {},
  beforeCreate() {
  },
  created() {
    this.initOptionItems(), this.initFieldModel(), this.registerToRefList(), this.initEventHandler(), this.buildFieldRules(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
};
function _sfc_render$w(t, n, e, i, o, h) {
  const f = resolveComponent("el-checkbox-button"), v = resolveComponent("el-checkbox"), b = resolveComponent("el-checkbox-group"), y = resolveComponent("form-item-wrapper");
  return openBlock(), createBlock(y, {
    designer: e.designer,
    field: e.field,
    rules: o.rules,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createVNode(b, {
        ref: "fieldEditor",
        modelValue: o.fieldModel,
        "onUpdate:modelValue": n[0] || (n[0] = (p) => o.fieldModel = p),
        disabled: e.field.options.disabled,
        size: t.widgetSize,
        onChange: t.handleChangeEvent
      }, {
        default: withCtx(() => [
          e.field.options.buttonStyle ? (openBlock(!0), createElementBlock(Fragment, { key: 0 }, renderList(e.field.options.optionItems, (p, a) => (openBlock(), createBlock(f, {
            key: a,
            label: p.value,
            disabled: p.disabled,
            border: e.field.options.border,
            style: normalizeStyle({ display: e.field.options.displayStyle })
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(p.label), 1)
            ]),
            _: 2
          }, 1032, ["label", "disabled", "border", "style"]))), 128)) : (openBlock(!0), createElementBlock(Fragment, { key: 1 }, renderList(e.field.options.optionItems, (p, a) => (openBlock(), createBlock(v, {
            key: a,
            label: p.value,
            disabled: p.disabled,
            border: e.field.options.border,
            style: normalizeStyle({ display: e.field.options.displayStyle })
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(p.label), 1)
            ]),
            _: 2
          }, 1032, ["label", "disabled", "border", "style"]))), 128))
        ]),
        _: 1
      }, 8, ["modelValue", "disabled", "size", "onChange"])
    ]),
    _: 1
  }, 8, ["designer", "field", "rules", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const checkboxWidget = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$w], ["__scopeId", "data-v-4a67bbf0"]]), __vite_glob_0_2$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: checkboxWidget
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$v = {
  name: "color-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    FormItemWrapper
  },
  data() {
    return {
      oldFieldValue: null,
      //field组件change之前的值
      fieldModel: null,
      rules: []
    };
  },
  computed: {},
  beforeCreate() {
  },
  created() {
    this.initFieldModel(), this.registerToRefList(), this.initEventHandler(), this.buildFieldRules(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
};
function _sfc_render$v(t, n, e, i, o, h) {
  const f = resolveComponent("el-color-picker"), v = resolveComponent("form-item-wrapper");
  return openBlock(), createBlock(v, {
    designer: e.designer,
    field: e.field,
    rules: o.rules,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createVNode(f, {
        ref: "fieldEditor",
        modelValue: o.fieldModel,
        "onUpdate:modelValue": n[0] || (n[0] = (b) => o.fieldModel = b),
        size: t.widgetSize,
        disabled: e.field.options.disabled,
        onChange: t.handleChangeEvent
      }, null, 8, ["modelValue", "size", "disabled", "onChange"])
    ]),
    _: 1
  }, 8, ["designer", "field", "rules", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const colorWidget = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$v], ["__scopeId", "data-v-d298ddb5"]]), __vite_glob_0_3$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: colorWidget
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$u = {
  name: "date-range-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    FormItemWrapper
  },
  data() {
    return {
      oldFieldValue: null,
      //field组件change之前的值
      fieldModel: null,
      rules: []
    };
  },
  computed: {},
  beforeCreate() {
  },
  created() {
    this.initFieldModel(), this.registerToRefList(), this.initEventHandler(), this.buildFieldRules(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
};
function _sfc_render$u(t, n, e, i, o, h) {
  const f = resolveComponent("el-date-picker"), v = resolveComponent("form-item-wrapper");
  return openBlock(), createBlock(v, {
    designer: e.designer,
    field: e.field,
    rules: o.rules,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createElementVNode("div", {
        class: normalizeClass([e.field.options.autoFullWidth ? "auto-full-width" : ""])
      }, [
        createVNode(f, {
          ref: "fieldEditor",
          type: e.field.options.type,
          modelValue: o.fieldModel,
          "onUpdate:modelValue": n[0] || (n[0] = (b) => o.fieldModel = b),
          disabled: e.field.options.disabled,
          readonly: e.field.options.readonly,
          size: t.widgetSize,
          clearable: e.field.options.clearable,
          editable: e.field.options.editable,
          format: e.field.options.format,
          "value-format": e.field.options.valueFormat,
          "start-placeholder": e.field.options.startPlaceholder || t.i18nt("render.hint.startDatePlaceholder"),
          "end-placeholder": e.field.options.endPlaceholder || t.i18nt("render.hint.endDatePlaceholder"),
          onFocus: t.handleFocusCustomEvent,
          onBlur: t.handleBlurCustomEvent,
          onChange: t.handleChangeEvent
        }, null, 8, ["type", "modelValue", "disabled", "readonly", "size", "clearable", "editable", "format", "value-format", "start-placeholder", "end-placeholder", "onFocus", "onBlur", "onChange"])
      ], 2)
    ]),
    _: 1
  }, 8, ["designer", "field", "rules", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const dateRangeWidget = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$u], ["__scopeId", "data-v-74d864a7"]]), __vite_glob_0_4$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dateRangeWidget
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$t = {
  name: "date-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    FormItemWrapper
  },
  data() {
    return {
      oldFieldValue: null,
      //field组件change之前的值
      fieldModel: null,
      rules: []
    };
  },
  computed: {},
  beforeCreate() {
  },
  created() {
    this.initFieldModel(), this.registerToRefList(), this.initEventHandler(), this.buildFieldRules(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
};
function _sfc_render$t(t, n, e, i, o, h) {
  const f = resolveComponent("el-date-picker"), v = resolveComponent("form-item-wrapper");
  return openBlock(), createBlock(v, {
    designer: e.designer,
    field: e.field,
    rules: o.rules,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createVNode(f, {
        ref: "fieldEditor",
        type: e.field.options.type,
        modelValue: o.fieldModel,
        "onUpdate:modelValue": n[0] || (n[0] = (b) => o.fieldModel = b),
        class: normalizeClass([e.field.options.autoFullWidth ? "auto-full-width" : ""]),
        readonly: e.field.options.readonly,
        disabled: e.field.options.disabled,
        size: t.widgetSize,
        clearable: e.field.options.clearable,
        editable: e.field.options.editable,
        format: e.field.options.format,
        "value-format": e.field.options.valueFormat,
        placeholder: e.field.options.placeholder || t.i18nt("render.hint.datePlaceholder"),
        onFocus: t.handleFocusCustomEvent,
        onBlur: t.handleBlurCustomEvent,
        onChange: t.handleChangeEvent
      }, null, 8, ["type", "modelValue", "class", "readonly", "disabled", "size", "clearable", "editable", "format", "value-format", "placeholder", "onFocus", "onBlur", "onChange"])
    ]),
    _: 1
  }, 8, ["designer", "field", "rules", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const dateWidget = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$t], ["__scopeId", "data-v-534e7614"]]), __vite_glob_0_5$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dateWidget
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$s = {
  name: "divider-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    StaticContentWrapper
  },
  computed: {},
  beforeCreate() {
  },
  created() {
    this.registerToRefList(), this.initEventHandler(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
};
function _sfc_render$s(t, n, e, i, o, h) {
  const f = resolveComponent("el-divider"), v = resolveComponent("static-content-wrapper");
  return openBlock(), createBlock(v, {
    designer: e.designer,
    field: e.field,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createVNode(f, {
        ref: "fieldEditor",
        direction: "horizontal",
        "content-position": e.field.options.contentPosition
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(e.field.options.label), 1)
        ]),
        _: 1
      }, 8, ["content-position"])
    ]),
    _: 1
  }, 8, ["designer", "field", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const dividerWidget = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$s], ["__scopeId", "data-v-98b585b4"]]), __vite_glob_0_6$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dividerWidget
}, Symbol.toStringTag, { value: "Module" }));
let selectFileText = "'" + translate("render.hint.selectFile") + "'";
const _sfc_main$r = {
  name: "file-upload-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    SvgIcon,
    FormItemWrapper
  },
  data() {
    return {
      oldFieldValue: null,
      //field组件change之前的值
      fieldModel: [],
      rules: [],
      uploadHeaders: {},
      uploadData: {
        key: ""
        //七牛云上传文件名
        //token: '',  //七牛云上传token
        //policy: '',  //又拍云上传policy
        //authorization: '',  //又拍云上传签名
      },
      fileList: [],
      //上传文件列表
      uploadBtnHidden: !1,
      styleVariables: {
        "--select-file-action": selectFileText
      }
    };
  },
  computed: {
    realUploadURL() {
      let t = this.field.options.uploadURL;
      if (t && (t.indexOf("DSV.") > -1 || t.indexOf("DSV[") > -1)) {
        let n = this.getGlobalDsv();
        return console.log("test DSV: ", n), evalFn(this.field.options.uploadURL, n);
      }
      return this.field.options.uploadURL;
    }
  },
  beforeCreate() {
  },
  created() {
    this.initFieldModel(), this.registerToRefList(), this.initEventHandler(), this.buildFieldRules(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {
    handleFileExceed() {
      let t = this.field.options.limit;
      this.$message.warning(this.i18nt("render.hint.uploadExceed").replace("${uploadLimit}", t));
    },
    beforeFileUpload(t) {
      let n = !1, e = t.name.substring(t.name.lastIndexOf(".") + 1);
      if (this.field.options && this.field.options.fileTypes) {
        let h = this.field.options.fileTypes;
        h.length > 0 && (n = h.some((f) => e.toLowerCase() === f.toLowerCase()));
      }
      if (!n)
        return this.$message.error(this.i18nt("render.hint.unsupportedFileType") + e), !1;
      let i = !1, o = 5;
      return this.field.options && this.field.options.fileMaxSize && (o = this.field.options.fileMaxSize), i = t.size / 1024 / 1024 <= o, i ? (this.uploadData.key = t.name, this.handleOnBeforeUpload(t)) : (this.$message.error(this.i18nt("render.hint.fileSizeExceed") + o + "MB"), !1);
    },
    handleOnBeforeUpload(t) {
      if (this.field.options.onBeforeUpload) {
        let e = new Function("file", this.field.options.onBeforeUpload).call(this, t);
        return typeof e == "boolean" ? e : !0;
      }
      return !0;
    },
    updateFieldModelAndEmitDataChangeForUpload(t, n, e) {
      let i = deepClone(this.fieldModel);
      n && n.name && n.url ? this.fieldModel.push({
        name: n.name,
        url: n.url
      }) : e && e.name && e.url ? this.fieldModel.push({
        name: e.name,
        url: e.url
      }) : this.fieldModel = deepClone(t), this.syncUpdateFormModel(this.fieldModel), this.emitFieldDataChange(this.fieldModel, i);
    },
    handleFileUpload(t, n, e) {
      if (n.status === "success") {
        let i = null;
        this.field.options.onUploadSuccess && (i = new Function("result", "file", "fileList", this.field.options.onUploadSuccess).call(this, t, n, e)), this.updateFieldModelAndEmitDataChangeForUpload(e, i, t), i && i.name ? n.name = i.name : n.name = n.name || t.name || t.fileName || t.filename, i && i.url ? n.url = i.url : n.url = n.url || t.url, this.fileList = deepClone(e), this.uploadBtnHidden = e.length >= this.field.options.limit;
      }
    },
    updateFieldModelAndEmitDataChangeForRemove(t, n) {
      let e = deepClone(this.fieldModel);
      this.fieldModel.splice(t, 1), this.syncUpdateFormModel(this.fieldModel), this.emitFieldDataChange(this.fieldModel, e);
    },
    removeUploadFile(t, n, e) {
      let i = -1, o = null;
      this.fileList.forEach((h, f) => {
        h.name === t && (h.url === n || e && h.uid === e) && (i = f, o = h);
      }), i >= 0 && (this.fileList.splice(i, 1), this.updateFieldModelAndEmitDataChangeForRemove(i, this.fileList), this.uploadBtnHidden = this.fileList.length >= this.field.options.limit, this.field.options.onFileRemove && new Function("file", "fileList", this.field.options.onFileRemove).call(this, o, this.fileList));
    },
    handleUploadError(t, n, e) {
      this.field.options.onUploadError ? new Function("error", "file", "fileList", this.field.options.onUploadError).call(this, t, n, e) : this.$message({
        message: this.i18nt("render.hint.uploadError") + t,
        duration: 3e3,
        type: "error"
      });
    }
  }
}, _hoisted_1$a = {
  key: 0,
  class: "el-upload__tip"
}, _hoisted_2$5 = { class: "upload-file-list" }, _hoisted_3$3 = ["title"], _hoisted_4$3 = ["href"], _hoisted_5$3 = ["title"], _hoisted_6$3 = ["title", "onClick"];
function _sfc_render$r(t, n, e, i, o, h) {
  const f = resolveComponent("svg-icon"), v = resolveComponent("el-upload"), b = resolveComponent("form-item-wrapper");
  return openBlock(), createBlock(b, {
    designer: e.designer,
    field: e.field,
    rules: o.rules,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createVNode(v, {
        ref: "fieldEditor",
        disabled: e.field.options.disabled,
        style: normalizeStyle(o.styleVariables),
        class: normalizeClass(["dynamicPseudoAfter", { hideUploadDiv: o.uploadBtnHidden }]),
        action: h.realUploadURL,
        headers: o.uploadHeaders,
        data: o.uploadData,
        "with-credentials": e.field.options.withCredentials,
        multiple: e.field.options.multipleSelect,
        "file-list": o.fileList,
        "show-file-list": e.field.options.showFileList,
        limit: e.field.options.limit,
        "on-exceed": h.handleFileExceed,
        "before-upload": h.beforeFileUpload,
        "on-success": h.handleFileUpload,
        "on-error": h.handleUploadError
      }, {
        tip: withCtx(() => [
          e.field.options.uploadTip ? (openBlock(), createElementBlock("div", _hoisted_1$a, toDisplayString(e.field.options.uploadTip), 1)) : createCommentVNode("", !0)
        ]),
        default: withCtx(() => [
          createVNode(f, { "icon-class": "el-plus" }),
          n[0] || (n[0] = createElementVNode("i", { class: "el-icon-plus avatar-uploader-icon" }, null, -1))
        ]),
        file: withCtx(({ file: y }) => [
          createElementVNode("div", _hoisted_2$5, [
            createElementVNode("span", {
              class: "upload-file-name",
              title: y.name
            }, toDisplayString(y.name), 9, _hoisted_3$3),
            createElementVNode("a", {
              href: y.url,
              download: "",
              target: "_blank"
            }, [
              createElementVNode("span", {
                class: "el-icon-download file-action",
                title: t.i18nt("render.hint.downloadFile")
              }, [
                createVNode(f, { "icon-class": "el-download" })
              ], 8, _hoisted_5$3)
            ], 8, _hoisted_4$3),
            e.field.options.disabled ? createCommentVNode("", !0) : (openBlock(), createElementBlock("span", {
              key: 0,
              class: "file-action",
              title: t.i18nt("render.hint.removeFile"),
              onClick: (p) => h.removeUploadFile(y.name, y.url, y.uid)
            }, [
              createVNode(f, { "icon-class": "el-delete" })
            ], 8, _hoisted_6$3))
          ])
        ]),
        _: 1
      }, 8, ["disabled", "style", "action", "headers", "data", "with-credentials", "multiple", "file-list", "show-file-list", "class", "limit", "on-exceed", "before-upload", "on-success", "on-error"])
    ]),
    _: 1
  }, 8, ["designer", "field", "rules", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const fileUploadWidget = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$r], ["__scopeId", "data-v-c48a9879"]]), __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fileUploadWidget
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$q = {
  name: "html-text-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    StaticContentWrapper
  },
  computed: {},
  beforeCreate() {
  },
  created() {
    this.registerToRefList(), this.initEventHandler(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
}, _hoisted_1$9 = ["innerHTML"];
function _sfc_render$q(t, n, e, i, o, h) {
  const f = resolveComponent("static-content-wrapper");
  return openBlock(), createBlock(f, {
    designer: e.designer,
    field: e.field,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createElementVNode("div", {
        ref: "fieldEditor",
        innerHTML: e.field.options.htmlContent
      }, null, 8, _hoisted_1$9)
    ]),
    _: 1
  }, 8, ["designer", "field", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const htmlTextWidget = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$q], ["__scopeId", "data-v-d9a27f70"]]), __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: htmlTextWidget
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$p = {
  name: "input-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    FormItemWrapper,
    SvgIcon
  },
  data() {
    return {
      oldFieldValue: null,
      //field组件change之前的值
      fieldModel: null,
      rules: []
    };
  },
  computed: {
    inputType() {
      return this.field.options.type === "number" ? "text" : this.field.options.type;
    }
  },
  beforeCreate() {
  },
  created() {
    this.initFieldModel(), this.registerToRefList(), this.initEventHandler(), this.buildFieldRules(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
};
function _sfc_render$p(t, n, e, i, o, h) {
  const f = resolveComponent("svg-icon"), v = resolveComponent("el-button"), b = resolveComponent("el-input"), y = resolveComponent("form-item-wrapper");
  return openBlock(), createBlock(y, {
    designer: e.designer,
    field: e.field,
    rules: o.rules,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createVNode(b, {
        ref: "fieldEditor",
        modelValue: o.fieldModel,
        "onUpdate:modelValue": n[0] || (n[0] = (p) => o.fieldModel = p),
        disabled: e.field.options.disabled,
        readonly: e.field.options.readonly,
        size: t.widgetSize,
        class: "hide-spin-button",
        type: h.inputType,
        "show-password": e.field.options.showPassword,
        placeholder: e.field.options.placeholder,
        clearable: e.field.options.clearable,
        minlength: e.field.options.minLength,
        maxlength: e.field.options.maxLength,
        "show-word-limit": e.field.options.showWordLimit,
        "prefix-icon": e.field.options.prefixIcon,
        "suffix-icon": e.field.options.suffixIcon,
        onFocus: t.handleFocusCustomEvent,
        onBlur: t.handleBlurCustomEvent,
        onInput: t.handleInputCustomEvent,
        onChange: t.handleChangeEvent
      }, createSlots({ _: 2 }, [
        e.field.options.appendButton ? {
          name: "append",
          fn: withCtx(() => [
            createVNode(v, {
              disabled: e.field.options.disabled || e.field.options.appendButtonDisabled,
              onClick: t.emitAppendButtonClick
            }, {
              default: withCtx(() => [
                createVNode(f, {
                  "icon-class": e.field.options.buttonIcon
                }, null, 8, ["icon-class"])
              ]),
              _: 1
            }, 8, ["disabled", "onClick"])
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["modelValue", "disabled", "readonly", "size", "type", "show-password", "placeholder", "clearable", "minlength", "maxlength", "show-word-limit", "prefix-icon", "suffix-icon", "onFocus", "onBlur", "onInput", "onChange"])
    ]),
    _: 1
  }, 8, ["designer", "field", "rules", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const inputWidget = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$p], ["__scopeId", "data-v-9560c6b6"]]), __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: inputWidget
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$o = {
  name: "number-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    FormItemWrapper
  },
  data() {
    return {
      oldFieldValue: null,
      //field组件change之前的值
      fieldModel: null,
      rules: []
    };
  },
  computed: {},
  beforeCreate() {
  },
  created() {
    this.initFieldModel(), this.registerToRefList(), this.initEventHandler(), this.buildFieldRules(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
};
function _sfc_render$o(t, n, e, i, o, h) {
  const f = resolveComponent("el-input-number"), v = resolveComponent("form-item-wrapper");
  return openBlock(), createBlock(v, {
    designer: e.designer,
    field: e.field,
    rules: o.rules,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createVNode(f, {
        ref: "fieldEditor",
        modelValue: o.fieldModel,
        "onUpdate:modelValue": n[0] || (n[0] = (b) => o.fieldModel = b),
        class: "full-width-input",
        disabled: e.field.options.disabled,
        size: t.widgetSize,
        "controls-position": e.field.options.controlsPosition,
        placeholder: e.field.options.placeholder,
        min: e.field.options.min,
        max: e.field.options.max,
        precision: e.field.options.precision,
        step: e.field.options.step,
        onFocus: t.handleFocusCustomEvent,
        onBlur: t.handleBlurCustomEvent,
        onChange: t.handleChangeEvent
      }, null, 8, ["modelValue", "disabled", "size", "controls-position", "placeholder", "min", "max", "precision", "step", "onFocus", "onBlur", "onChange"])
    ]),
    _: 1
  }, 8, ["designer", "field", "rules", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const numberWidget = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$o], ["__scopeId", "data-v-2aac623b"]]), __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: numberWidget
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$n = {
  name: "picture-upload-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    FormItemWrapper,
    SvgIcon
  },
  data() {
    return {
      oldFieldValue: null,
      //field组件change之前的值
      fieldModel: [],
      rules: [],
      uploadHeaders: {},
      uploadData: {
        key: ""
        //七牛云上传文件名
        //token: '',  //七牛云上传token
        //policy: '',  //又拍云上传policy
        //authorization: '',  //又拍云上传签名
      },
      fileList: [],
      //上传文件列表
      fileListBeforeRemove: [],
      //删除前的文件列表
      uploadBtnHidden: !1,
      previewIndex: 1
      // 初始预览图像索引
    };
  },
  computed: {
    previewList() {
      return this.fileList.map((t) => t.url);
    },
    realUploadURL() {
      let t = this.field.options.uploadURL;
      if (t && (t.indexOf("DSV.") > -1 || t.indexOf("DSV[") > -1)) {
        let n = this.getGlobalDsv();
        return console.log("test DSV: ", n), evalFn(this.field.options.uploadURL, n);
      }
      return this.field.options.uploadURL;
    }
  },
  beforeCreate() {
  },
  created() {
    this.initFieldModel(), this.registerToRefList(), this.initEventHandler(), this.buildFieldRules(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {
    handlePictureExceed() {
      let t = this.field.options.limit;
      this.$message.warning(this.i18nt("render.hint.uploadExceed").replace("${uploadLimit}", t));
    },
    beforePictureUpload(t) {
      let n = !1;
      if (this.field.options && this.field.options.fileTypes) {
        let o = this.field.options.fileTypes;
        o.length > 0 && (n = o.some((h) => t.type === "image/" + h));
      }
      if (!n)
        return this.$message.error(this.i18nt("render.hint.unsupportedFileType") + t.type), !1;
      let e = !1, i = 5;
      return this.field.options && this.field.options.fileMaxSize && (i = this.field.options.fileMaxSize), e = t.size / 1024 / 1024 <= i, e ? (this.uploadData.key = t.name, this.handleOnBeforeUpload(t)) : (this.$message.error(this.$("render.hint.fileSizeExceed") + i + "MB"), !1);
    },
    handleOnBeforeUpload(t) {
      if (this.field.options.onBeforeUpload) {
        let e = new Function("file", this.field.options.onBeforeUpload).call(this, t);
        return typeof e == "boolean" ? e : !0;
      }
      return !0;
    },
    updateFieldModelAndEmitDataChangeForUpload(t, n, e) {
      let i = deepClone(this.fieldModel);
      n && n.name && n.url ? this.fieldModel.push({
        name: n.name,
        url: n.url
      }) : e && e.name && e.url ? this.fieldModel.push({
        name: e.name,
        url: e.url
      }) : this.fieldModel = deepClone(t), this.syncUpdateFormModel(this.fieldModel), this.emitFieldDataChange(this.fieldModel, i);
    },
    handlePictureUpload(t, n, e) {
      if (n.status === "success") {
        let i = null;
        this.field.options.onUploadSuccess && (i = new Function("result", "file", "fileList", this.field.options.onUploadSuccess).call(this, t, n, e)), this.updateFieldModelAndEmitDataChangeForUpload(e, i, t), this.fileList = deepClone(e), this.uploadBtnHidden = e.length >= this.field.options.limit;
      }
    },
    updateFieldModelAndEmitDataChangeForRemove(t) {
      let n = deepClone(this.fieldModel), e = -1;
      this.fileListBeforeRemove.map((i, o) => {
        i.name === t.name && (i.url === t.url || i.uid && i.uid === t.uid) && (e = o);
      }), e > -1 && this.fieldModel.splice(e, 1), this.syncUpdateFormModel(this.fieldModel), this.emitFieldDataChange(this.fieldModel, n);
    },
    handleBeforeRemove(t) {
      this.fileListBeforeRemove = deepClone(t);
    },
    handlePictureRemove(t) {
      this.handleBeforeRemove(this.fileList), this.fileList.splice(this.fileList.indexOf(t), 1), this.updateFieldModelAndEmitDataChangeForRemove(t);
      let n = deepClone(this.fileList);
      this.uploadBtnHidden = n.length >= this.field.options.limit, this.field.options.onFileRemove && new Function("file", "fileList", this.field.options.onFileRemove).call(this, t, n);
    },
    handleUploadError(t, n, e) {
      this.field.options.onUploadError ? new Function("error", "file", "fileList", this.field.options.onUploadError).call(this, t, n, e) : this.$message({
        message: this.i18nt("render.hint.uploadError") + t,
        duration: 3e3,
        type: "error"
      });
    },
    handlePictureCardPreview({ url: t }) {
      this.previewIndex = this.previewList.indexOf(t), this.$refs.imageRef.$el.children[0].click();
    }
  }
}, _hoisted_1$8 = { class: "el-upload-list__item-status-label" }, _hoisted_2$4 = {
  class: "el-icon--upload-success",
  style: { color: "#FFF" }
}, _hoisted_3$2 = { class: "el-upload-list__item-actions" }, _hoisted_4$2 = ["onClick"], _hoisted_5$2 = ["onClick"], _hoisted_6$2 = {
  key: 0,
  class: "el-upload__tip"
}, _hoisted_7$2 = { class: "uploader-icon" };
function _sfc_render$n(t, n, e, i, o, h) {
  const f = resolveComponent("el-image"), v = resolveComponent("svg-icon"), b = resolveComponent("el-upload"), y = resolveComponent("form-item-wrapper");
  return openBlock(), createBlock(y, {
    designer: e.designer,
    field: e.field,
    rules: o.rules,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createVNode(b, {
        ref: "fieldEditor",
        disabled: e.field.options.disabled,
        action: h.realUploadURL,
        headers: o.uploadHeaders,
        data: o.uploadData,
        "with-credentials": e.field.options.withCredentials,
        multiple: e.field.options.multipleSelect,
        "file-list": o.fileList,
        "show-file-list": e.field.options.showFileList,
        "list-type": "picture-card",
        class: normalizeClass({ hideUploadDiv: o.uploadBtnHidden }),
        limit: e.field.options.limit,
        "on-exceed": h.handlePictureExceed,
        "before-upload": h.beforePictureUpload,
        "on-preview": h.handlePictureCardPreview,
        "on-success": h.handlePictureUpload,
        "on-error": h.handleUploadError
      }, {
        file: withCtx(({ file: p }) => [
          createVNode(f, {
            ref: "imageRef",
            style: { width: "100%", height: "100%" },
            src: p.url,
            "preview-src-list": h.previewList,
            "initial-index": o.previewIndex,
            fit: "cover",
            "preview-teleported": ""
          }, null, 8, ["src", "preview-src-list", "initial-index"]),
          createElementVNode("label", _hoisted_1$8, [
            createElementVNode("i", _hoisted_2$4, [
              createVNode(v, {
                class: "",
                "icon-class": "el-check"
              })
            ])
          ]),
          createElementVNode("span", _hoisted_3$2, [
            createElementVNode("span", {
              class: "el-upload-list__item-preview",
              onClick: (a) => h.handlePictureCardPreview(p)
            }, [
              createVNode(v, { "icon-class": "el-zoom-in" })
            ], 8, _hoisted_4$2),
            createElementVNode("span", {
              class: "el-upload-list__item-delete",
              onClick: (a) => h.handlePictureRemove(p)
            }, [
              createVNode(v, { "icon-class": "el-delete" })
            ], 8, _hoisted_5$2)
          ])
        ]),
        tip: withCtx(() => [
          e.field.options.uploadTip ? (openBlock(), createElementBlock("div", _hoisted_6$2, toDisplayString(e.field.options.uploadTip), 1)) : createCommentVNode("", !0)
        ]),
        default: withCtx(() => [
          createElementVNode("div", _hoisted_7$2, [
            createVNode(v, { "icon-class": "el-plus" })
          ])
        ]),
        _: 1
      }, 8, ["disabled", "action", "headers", "data", "with-credentials", "multiple", "file-list", "show-file-list", "class", "limit", "on-exceed", "before-upload", "on-preview", "on-success", "on-error"])
    ]),
    _: 1
  }, 8, ["designer", "field", "rules", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const pictureUploadWidget = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$n], ["__scopeId", "data-v-fc70f72c"]]), __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pictureUploadWidget
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$m = {
  name: "radio-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    FormItemWrapper
  },
  data() {
    return {
      oldFieldValue: null,
      //field组件change之前的值
      fieldModel: null,
      rules: []
    };
  },
  computed: {},
  beforeCreate() {
  },
  created() {
    this.initOptionItems(), this.initFieldModel(), this.registerToRefList(), this.initEventHandler(), this.buildFieldRules(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
};
function _sfc_render$m(t, n, e, i, o, h) {
  const f = resolveComponent("el-radio-button"), v = resolveComponent("el-radio"), b = resolveComponent("el-radio-group"), y = resolveComponent("form-item-wrapper");
  return openBlock(), createBlock(y, {
    designer: e.designer,
    field: e.field,
    rules: o.rules,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createVNode(b, {
        ref: "fieldEditor",
        modelValue: o.fieldModel,
        "onUpdate:modelValue": n[0] || (n[0] = (p) => o.fieldModel = p),
        class: normalizeClass({ "radio-group-block": e.field.options.displayStyle === "block" }),
        disabled: e.field.options.disabled,
        size: t.widgetSize,
        onChange: t.handleChangeEvent
      }, {
        default: withCtx(() => [
          e.field.options.buttonStyle ? (openBlock(!0), createElementBlock(Fragment, { key: 0 }, renderList(e.field.options.optionItems, (p, a) => (openBlock(), createBlock(f, {
            key: a,
            value: p.value,
            disabled: p.disabled,
            border: e.field.options.border,
            style: normalizeStyle({ display: e.field.options.displayStyle })
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(p.label), 1)
            ]),
            _: 2
          }, 1032, ["value", "disabled", "border", "style"]))), 128)) : (openBlock(!0), createElementBlock(Fragment, { key: 1 }, renderList(e.field.options.optionItems, (p, a) => (openBlock(), createBlock(v, {
            key: a,
            value: p.value,
            disabled: p.disabled,
            border: e.field.options.border,
            style: normalizeStyle({ display: e.field.options.displayStyle })
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(p.label), 1)
            ]),
            _: 2
          }, 1032, ["value", "disabled", "border", "style"]))), 128))
        ]),
        _: 1
      }, 8, ["modelValue", "class", "disabled", "size", "onChange"])
    ]),
    _: 1
  }, 8, ["designer", "field", "rules", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const radioWidget = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["render", _sfc_render$m], ["__scopeId", "data-v-fce29628"]]), __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: radioWidget
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$l = {
  name: "rate-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    FormItemWrapper
  },
  data() {
    return {
      oldFieldValue: null,
      //field组件change之前的值
      fieldModel: null,
      rules: []
    };
  },
  computed: {},
  beforeCreate() {
  },
  created() {
    this.initFieldModel(), this.registerToRefList(), this.initEventHandler(), this.buildFieldRules(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
};
function _sfc_render$l(t, n, e, i, o, h) {
  const f = resolveComponent("el-rate"), v = resolveComponent("form-item-wrapper");
  return openBlock(), createBlock(v, {
    designer: e.designer,
    field: e.field,
    rules: o.rules,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createVNode(f, {
        ref: "fieldEditor",
        modelValue: o.fieldModel,
        "onUpdate:modelValue": n[0] || (n[0] = (b) => o.fieldModel = b),
        disabled: e.field.options.disabled,
        max: e.field.options.max,
        "low-threshold": e.field.options.lowThreshold,
        "high-threshold": e.field.options.highThreshold,
        "allow-half": e.field.options.allowHalf,
        "show-text": e.field.options.showText,
        "show-score": e.field.options.showScore,
        onChange: t.handleChangeEvent
      }, null, 8, ["modelValue", "disabled", "max", "low-threshold", "high-threshold", "allow-half", "show-text", "show-score", "onChange"])
    ]),
    _: 1
  }, 8, ["designer", "field", "rules", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const rateWidget = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$l], ["__scopeId", "data-v-1a897e54"]]), __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rateWidget
}, Symbol.toStringTag, { value: "Module" }));
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var quill = { exports: {} };
/*!
 * Quill Editor v1.3.7
 * https://quilljs.com/
 * Copyright (c) 2014, Jason Chen
 * Copyright (c) 2013, salesforce.com
 */
(function(t, n) {
  (function(i, o) {
    t.exports = o();
  })(typeof self < "u" ? self : commonjsGlobal, function() {
    return (
      /******/
      function(e) {
        var i = {};
        function o(h) {
          if (i[h])
            return i[h].exports;
          var f = i[h] = {
            /******/
            i: h,
            /******/
            l: !1,
            /******/
            exports: {}
            /******/
          };
          return e[h].call(f.exports, f, f.exports, o), f.l = !0, f.exports;
        }
        return o.m = e, o.c = i, o.d = function(h, f, v) {
          o.o(h, f) || Object.defineProperty(h, f, {
            /******/
            configurable: !1,
            /******/
            enumerable: !0,
            /******/
            get: v
            /******/
          });
        }, o.n = function(h) {
          var f = h && h.__esModule ? (
            /******/
            function() {
              return h.default;
            }
          ) : (
            /******/
            function() {
              return h;
            }
          );
          return o.d(f, "a", f), f;
        }, o.o = function(h, f) {
          return Object.prototype.hasOwnProperty.call(h, f);
        }, o.p = "", o(o.s = 109);
      }([
        /* 0 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", { value: !0 });
          var h = o(17), f = o(18), v = o(19), b = o(45), y = o(46), p = o(47), a = o(48), r = o(49), l = o(12), g = o(32), m = o(33), c = o(31), u = o(1), d = {
            Scope: u.Scope,
            create: u.create,
            find: u.find,
            query: u.query,
            register: u.register,
            Container: h.default,
            Format: f.default,
            Leaf: v.default,
            Embed: a.default,
            Scroll: b.default,
            Block: p.default,
            Inline: y.default,
            Text: r.default,
            Attributor: {
              Attribute: l.default,
              Class: g.default,
              Style: m.default,
              Store: c.default
            }
          };
          i.default = d;
        },
        /* 1 */
        /***/
        function(e, i, o) {
          var h = this && this.__extends || function() {
            var c = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(u, d) {
              u.__proto__ = d;
            } || function(u, d) {
              for (var _ in d) d.hasOwnProperty(_) && (u[_] = d[_]);
            };
            return function(u, d) {
              c(u, d);
              function _() {
                this.constructor = u;
              }
              u.prototype = d === null ? Object.create(d) : (_.prototype = d.prototype, new _());
            };
          }();
          Object.defineProperty(i, "__esModule", { value: !0 });
          var f = (
            /** @class */
            function(c) {
              h(u, c);
              function u(d) {
                var _ = this;
                return d = "[Parchment] " + d, _ = c.call(this, d) || this, _.message = d, _.name = _.constructor.name, _;
              }
              return u;
            }(Error)
          );
          i.ParchmentError = f;
          var v = {}, b = {}, y = {}, p = {};
          i.DATA_KEY = "__blot";
          var a;
          (function(c) {
            c[c.TYPE = 3] = "TYPE", c[c.LEVEL = 12] = "LEVEL", c[c.ATTRIBUTE = 13] = "ATTRIBUTE", c[c.BLOT = 14] = "BLOT", c[c.INLINE = 7] = "INLINE", c[c.BLOCK = 11] = "BLOCK", c[c.BLOCK_BLOT = 10] = "BLOCK_BLOT", c[c.INLINE_BLOT = 6] = "INLINE_BLOT", c[c.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", c[c.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", c[c.ANY = 15] = "ANY";
          })(a = i.Scope || (i.Scope = {}));
          function r(c, u) {
            var d = g(c);
            if (d == null)
              throw new f("Unable to create " + c + " blot");
            var _ = d, s = (
              // @ts-ignore
              c instanceof Node || c.nodeType === Node.TEXT_NODE ? c : _.create(u)
            );
            return new _(s, u);
          }
          i.create = r;
          function l(c, u) {
            return u === void 0 && (u = !1), c == null ? null : c[i.DATA_KEY] != null ? c[i.DATA_KEY].blot : u ? l(c.parentNode, u) : null;
          }
          i.find = l;
          function g(c, u) {
            u === void 0 && (u = a.ANY);
            var d;
            if (typeof c == "string")
              d = p[c] || v[c];
            else if (c instanceof Text || c.nodeType === Node.TEXT_NODE)
              d = p.text;
            else if (typeof c == "number")
              c & a.LEVEL & a.BLOCK ? d = p.block : c & a.LEVEL & a.INLINE && (d = p.inline);
            else if (c instanceof HTMLElement) {
              var _ = (c.getAttribute("class") || "").split(/\s+/);
              for (var s in _)
                if (d = b[_[s]], d)
                  break;
              d = d || y[c.tagName];
            }
            return d == null ? null : u & a.LEVEL & d.scope && u & a.TYPE & d.scope ? d : null;
          }
          i.query = g;
          function m() {
            for (var c = [], u = 0; u < arguments.length; u++)
              c[u] = arguments[u];
            if (c.length > 1)
              return c.map(function(s) {
                return m(s);
              });
            var d = c[0];
            if (typeof d.blotName != "string" && typeof d.attrName != "string")
              throw new f("Invalid definition");
            if (d.blotName === "abstract")
              throw new f("Cannot register abstract class");
            if (p[d.blotName || d.attrName] = d, typeof d.keyName == "string")
              v[d.keyName] = d;
            else if (d.className != null && (b[d.className] = d), d.tagName != null) {
              Array.isArray(d.tagName) ? d.tagName = d.tagName.map(function(s) {
                return s.toUpperCase();
              }) : d.tagName = d.tagName.toUpperCase();
              var _ = Array.isArray(d.tagName) ? d.tagName : [d.tagName];
              _.forEach(function(s) {
                (y[s] == null || d.className == null) && (y[s] = d);
              });
            }
            return d;
          }
          i.register = m;
        },
        /* 2 */
        /***/
        function(e, i, o) {
          var h = o(51), f = o(11), v = o(3), b = o(20), y = "\0", p = function(a) {
            Array.isArray(a) ? this.ops = a : a != null && Array.isArray(a.ops) ? this.ops = a.ops : this.ops = [];
          };
          p.prototype.insert = function(a, r) {
            var l = {};
            return a.length === 0 ? this : (l.insert = a, r != null && typeof r == "object" && Object.keys(r).length > 0 && (l.attributes = r), this.push(l));
          }, p.prototype.delete = function(a) {
            return a <= 0 ? this : this.push({ delete: a });
          }, p.prototype.retain = function(a, r) {
            if (a <= 0) return this;
            var l = { retain: a };
            return r != null && typeof r == "object" && Object.keys(r).length > 0 && (l.attributes = r), this.push(l);
          }, p.prototype.push = function(a) {
            var r = this.ops.length, l = this.ops[r - 1];
            if (a = v(!0, {}, a), typeof l == "object") {
              if (typeof a.delete == "number" && typeof l.delete == "number")
                return this.ops[r - 1] = { delete: l.delete + a.delete }, this;
              if (typeof l.delete == "number" && a.insert != null && (r -= 1, l = this.ops[r - 1], typeof l != "object"))
                return this.ops.unshift(a), this;
              if (f(a.attributes, l.attributes)) {
                if (typeof a.insert == "string" && typeof l.insert == "string")
                  return this.ops[r - 1] = { insert: l.insert + a.insert }, typeof a.attributes == "object" && (this.ops[r - 1].attributes = a.attributes), this;
                if (typeof a.retain == "number" && typeof l.retain == "number")
                  return this.ops[r - 1] = { retain: l.retain + a.retain }, typeof a.attributes == "object" && (this.ops[r - 1].attributes = a.attributes), this;
              }
            }
            return r === this.ops.length ? this.ops.push(a) : this.ops.splice(r, 0, a), this;
          }, p.prototype.chop = function() {
            var a = this.ops[this.ops.length - 1];
            return a && a.retain && !a.attributes && this.ops.pop(), this;
          }, p.prototype.filter = function(a) {
            return this.ops.filter(a);
          }, p.prototype.forEach = function(a) {
            this.ops.forEach(a);
          }, p.prototype.map = function(a) {
            return this.ops.map(a);
          }, p.prototype.partition = function(a) {
            var r = [], l = [];
            return this.forEach(function(g) {
              var m = a(g) ? r : l;
              m.push(g);
            }), [r, l];
          }, p.prototype.reduce = function(a, r) {
            return this.ops.reduce(a, r);
          }, p.prototype.changeLength = function() {
            return this.reduce(function(a, r) {
              return r.insert ? a + b.length(r) : r.delete ? a - r.delete : a;
            }, 0);
          }, p.prototype.length = function() {
            return this.reduce(function(a, r) {
              return a + b.length(r);
            }, 0);
          }, p.prototype.slice = function(a, r) {
            a = a || 0, typeof r != "number" && (r = 1 / 0);
            for (var l = [], g = b.iterator(this.ops), m = 0; m < r && g.hasNext(); ) {
              var c;
              m < a ? c = g.next(a - m) : (c = g.next(r - m), l.push(c)), m += b.length(c);
            }
            return new p(l);
          }, p.prototype.compose = function(a) {
            var r = b.iterator(this.ops), l = b.iterator(a.ops), g = [], m = l.peek();
            if (m != null && typeof m.retain == "number" && m.attributes == null) {
              for (var c = m.retain; r.peekType() === "insert" && r.peekLength() <= c; )
                c -= r.peekLength(), g.push(r.next());
              m.retain - c > 0 && l.next(m.retain - c);
            }
            for (var u = new p(g); r.hasNext() || l.hasNext(); )
              if (l.peekType() === "insert")
                u.push(l.next());
              else if (r.peekType() === "delete")
                u.push(r.next());
              else {
                var d = Math.min(r.peekLength(), l.peekLength()), _ = r.next(d), s = l.next(d);
                if (typeof s.retain == "number") {
                  var w = {};
                  typeof _.retain == "number" ? w.retain = d : w.insert = _.insert;
                  var F = b.attributes.compose(_.attributes, s.attributes, typeof _.retain == "number");
                  if (F && (w.attributes = F), u.push(w), !l.hasNext() && f(u.ops[u.ops.length - 1], w)) {
                    var C = new p(r.rest());
                    return u.concat(C).chop();
                  }
                } else typeof s.delete == "number" && typeof _.retain == "number" && u.push(s);
              }
            return u.chop();
          }, p.prototype.concat = function(a) {
            var r = new p(this.ops.slice());
            return a.ops.length > 0 && (r.push(a.ops[0]), r.ops = r.ops.concat(a.ops.slice(1))), r;
          }, p.prototype.diff = function(a, r) {
            if (this.ops === a.ops)
              return new p();
            var l = [this, a].map(function(d) {
              return d.map(function(_) {
                if (_.insert != null)
                  return typeof _.insert == "string" ? _.insert : y;
                var s = d === a ? "on" : "with";
                throw new Error("diff() called " + s + " non-document");
              }).join("");
            }), g = new p(), m = h(l[0], l[1], r), c = b.iterator(this.ops), u = b.iterator(a.ops);
            return m.forEach(function(d) {
              for (var _ = d[1].length; _ > 0; ) {
                var s = 0;
                switch (d[0]) {
                  case h.INSERT:
                    s = Math.min(u.peekLength(), _), g.push(u.next(s));
                    break;
                  case h.DELETE:
                    s = Math.min(_, c.peekLength()), c.next(s), g.delete(s);
                    break;
                  case h.EQUAL:
                    s = Math.min(c.peekLength(), u.peekLength(), _);
                    var w = c.next(s), F = u.next(s);
                    f(w.insert, F.insert) ? g.retain(s, b.attributes.diff(w.attributes, F.attributes)) : g.push(F).delete(s);
                    break;
                }
                _ -= s;
              }
            }), g.chop();
          }, p.prototype.eachLine = function(a, r) {
            r = r || `
`;
            for (var l = b.iterator(this.ops), g = new p(), m = 0; l.hasNext(); ) {
              if (l.peekType() !== "insert") return;
              var c = l.peek(), u = b.length(c) - l.peekLength(), d = typeof c.insert == "string" ? c.insert.indexOf(r, u) - u : -1;
              if (d < 0)
                g.push(l.next());
              else if (d > 0)
                g.push(l.next(d));
              else {
                if (a(g, l.next(1).attributes || {}, m) === !1)
                  return;
                m += 1, g = new p();
              }
            }
            g.length() > 0 && a(g, {}, m);
          }, p.prototype.transform = function(a, r) {
            if (r = !!r, typeof a == "number")
              return this.transformPosition(a, r);
            for (var l = b.iterator(this.ops), g = b.iterator(a.ops), m = new p(); l.hasNext() || g.hasNext(); )
              if (l.peekType() === "insert" && (r || g.peekType() !== "insert"))
                m.retain(b.length(l.next()));
              else if (g.peekType() === "insert")
                m.push(g.next());
              else {
                var c = Math.min(l.peekLength(), g.peekLength()), u = l.next(c), d = g.next(c);
                if (u.delete)
                  continue;
                d.delete ? m.push(d) : m.retain(c, b.attributes.transform(u.attributes, d.attributes, r));
              }
            return m.chop();
          }, p.prototype.transformPosition = function(a, r) {
            r = !!r;
            for (var l = b.iterator(this.ops), g = 0; l.hasNext() && g <= a; ) {
              var m = l.peekLength(), c = l.peekType();
              if (l.next(), c === "delete") {
                a -= Math.min(m, a - g);
                continue;
              } else c === "insert" && (g < a || !r) && (a += m);
              g += m;
            }
            return a;
          }, e.exports = p;
        },
        /* 3 */
        /***/
        function(e, i) {
          var o = Object.prototype.hasOwnProperty, h = Object.prototype.toString, f = Object.defineProperty, v = Object.getOwnPropertyDescriptor, b = function(l) {
            return typeof Array.isArray == "function" ? Array.isArray(l) : h.call(l) === "[object Array]";
          }, y = function(l) {
            if (!l || h.call(l) !== "[object Object]")
              return !1;
            var g = o.call(l, "constructor"), m = l.constructor && l.constructor.prototype && o.call(l.constructor.prototype, "isPrototypeOf");
            if (l.constructor && !g && !m)
              return !1;
            var c;
            for (c in l)
              ;
            return typeof c > "u" || o.call(l, c);
          }, p = function(l, g) {
            f && g.name === "__proto__" ? f(l, g.name, {
              enumerable: !0,
              configurable: !0,
              value: g.newValue,
              writable: !0
            }) : l[g.name] = g.newValue;
          }, a = function(l, g) {
            if (g === "__proto__")
              if (o.call(l, g)) {
                if (v)
                  return v(l, g).value;
              } else return;
            return l[g];
          };
          e.exports = function r() {
            var l, g, m, c, u, d, _ = arguments[0], s = 1, w = arguments.length, F = !1;
            for (typeof _ == "boolean" && (F = _, _ = arguments[1] || {}, s = 2), (_ == null || typeof _ != "object" && typeof _ != "function") && (_ = {}); s < w; ++s)
              if (l = arguments[s], l != null)
                for (g in l)
                  m = a(_, g), c = a(l, g), _ !== c && (F && c && (y(c) || (u = b(c))) ? (u ? (u = !1, d = m && b(m) ? m : []) : d = m && y(m) ? m : {}, p(_, { name: g, newValue: r(F, d, c) })) : typeof c < "u" && p(_, { name: g, newValue: c }));
            return _;
          };
        },
        /* 4 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.default = i.BlockEmbed = i.bubbleFormats = void 0;
          var h = /* @__PURE__ */ function() {
            function O(x, L) {
              for (var A = 0; A < L.length; A++) {
                var M = L[A];
                M.enumerable = M.enumerable || !1, M.configurable = !0, "value" in M && (M.writable = !0), Object.defineProperty(x, M.key, M);
              }
            }
            return function(x, L, A) {
              return L && O(x.prototype, L), A && O(x, A), x;
            };
          }(), f = function O(x, L, A) {
            x === null && (x = Function.prototype);
            var M = Object.getOwnPropertyDescriptor(x, L);
            if (M === void 0) {
              var j = Object.getPrototypeOf(x);
              return j === null ? void 0 : O(j, L, A);
            } else {
              if ("value" in M)
                return M.value;
              var z = M.get;
              return z === void 0 ? void 0 : z.call(A);
            }
          }, v = o(3), b = _(v), y = o(2), p = _(y), a = o(0), r = _(a), l = o(16), g = _(l), m = o(6), c = _(m), u = o(7), d = _(u);
          function _(O) {
            return O && O.__esModule ? O : { default: O };
          }
          function s(O, x) {
            if (!(O instanceof x))
              throw new TypeError("Cannot call a class as a function");
          }
          function w(O, x) {
            if (!O)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return x && (typeof x == "object" || typeof x == "function") ? x : O;
          }
          function F(O, x) {
            if (typeof x != "function" && x !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof x);
            O.prototype = Object.create(x && x.prototype, { constructor: { value: O, enumerable: !1, writable: !0, configurable: !0 } }), x && (Object.setPrototypeOf ? Object.setPrototypeOf(O, x) : O.__proto__ = x);
          }
          var C = 1, S = function(O) {
            F(x, O);
            function x() {
              return s(this, x), w(this, (x.__proto__ || Object.getPrototypeOf(x)).apply(this, arguments));
            }
            return h(x, [{
              key: "attach",
              value: function() {
                f(x.prototype.__proto__ || Object.getPrototypeOf(x.prototype), "attach", this).call(this), this.attributes = new r.default.Attributor.Store(this.domNode);
              }
            }, {
              key: "delta",
              value: function() {
                return new p.default().insert(this.value(), (0, b.default)(this.formats(), this.attributes.values()));
              }
            }, {
              key: "format",
              value: function(A, M) {
                var j = r.default.query(A, r.default.Scope.BLOCK_ATTRIBUTE);
                j != null && this.attributes.attribute(j, M);
              }
            }, {
              key: "formatAt",
              value: function(A, M, j, z) {
                this.format(j, z);
              }
            }, {
              key: "insertAt",
              value: function(A, M, j) {
                if (typeof M == "string" && M.endsWith(`
`)) {
                  var z = r.default.create(N.blotName);
                  this.parent.insertBefore(z, A === 0 ? this : this.next), z.insertAt(0, M.slice(0, -1));
                } else
                  f(x.prototype.__proto__ || Object.getPrototypeOf(x.prototype), "insertAt", this).call(this, A, M, j);
              }
            }]), x;
          }(r.default.Embed);
          S.scope = r.default.Scope.BLOCK_BLOT;
          var N = function(O) {
            F(x, O);
            function x(L) {
              s(this, x);
              var A = w(this, (x.__proto__ || Object.getPrototypeOf(x)).call(this, L));
              return A.cache = {}, A;
            }
            return h(x, [{
              key: "delta",
              value: function() {
                return this.cache.delta == null && (this.cache.delta = this.descendants(r.default.Leaf).reduce(function(A, M) {
                  return M.length() === 0 ? A : A.insert(M.value(), E(M));
                }, new p.default()).insert(`
`, E(this))), this.cache.delta;
              }
            }, {
              key: "deleteAt",
              value: function(A, M) {
                f(x.prototype.__proto__ || Object.getPrototypeOf(x.prototype), "deleteAt", this).call(this, A, M), this.cache = {};
              }
            }, {
              key: "formatAt",
              value: function(A, M, j, z) {
                M <= 0 || (r.default.query(j, r.default.Scope.BLOCK) ? A + M === this.length() && this.format(j, z) : f(x.prototype.__proto__ || Object.getPrototypeOf(x.prototype), "formatAt", this).call(this, A, Math.min(M, this.length() - A - 1), j, z), this.cache = {});
              }
            }, {
              key: "insertAt",
              value: function(A, M, j) {
                if (j != null) return f(x.prototype.__proto__ || Object.getPrototypeOf(x.prototype), "insertAt", this).call(this, A, M, j);
                if (M.length !== 0) {
                  var z = M.split(`
`), G = z.shift();
                  G.length > 0 && (A < this.length() - 1 || this.children.tail == null ? f(x.prototype.__proto__ || Object.getPrototypeOf(x.prototype), "insertAt", this).call(this, Math.min(A, this.length() - 1), G) : this.children.tail.insertAt(this.children.tail.length(), G), this.cache = {});
                  var D = this;
                  z.reduce(function(P, k) {
                    return D = D.split(P, !0), D.insertAt(0, k), k.length;
                  }, A + G.length);
                }
              }
            }, {
              key: "insertBefore",
              value: function(A, M) {
                var j = this.children.head;
                f(x.prototype.__proto__ || Object.getPrototypeOf(x.prototype), "insertBefore", this).call(this, A, M), j instanceof g.default && j.remove(), this.cache = {};
              }
            }, {
              key: "length",
              value: function() {
                return this.cache.length == null && (this.cache.length = f(x.prototype.__proto__ || Object.getPrototypeOf(x.prototype), "length", this).call(this) + C), this.cache.length;
              }
            }, {
              key: "moveChildren",
              value: function(A, M) {
                f(x.prototype.__proto__ || Object.getPrototypeOf(x.prototype), "moveChildren", this).call(this, A, M), this.cache = {};
              }
            }, {
              key: "optimize",
              value: function(A) {
                f(x.prototype.__proto__ || Object.getPrototypeOf(x.prototype), "optimize", this).call(this, A), this.cache = {};
              }
            }, {
              key: "path",
              value: function(A) {
                return f(x.prototype.__proto__ || Object.getPrototypeOf(x.prototype), "path", this).call(this, A, !0);
              }
            }, {
              key: "removeChild",
              value: function(A) {
                f(x.prototype.__proto__ || Object.getPrototypeOf(x.prototype), "removeChild", this).call(this, A), this.cache = {};
              }
            }, {
              key: "split",
              value: function(A) {
                var M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
                if (M && (A === 0 || A >= this.length() - C)) {
                  var j = this.clone();
                  return A === 0 ? (this.parent.insertBefore(j, this), this) : (this.parent.insertBefore(j, this.next), j);
                } else {
                  var z = f(x.prototype.__proto__ || Object.getPrototypeOf(x.prototype), "split", this).call(this, A, M);
                  return this.cache = {}, z;
                }
              }
            }]), x;
          }(r.default.Block);
          N.blotName = "block", N.tagName = "P", N.defaultChild = "break", N.allowedChildren = [c.default, r.default.Embed, d.default];
          function E(O) {
            var x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            return O == null || (typeof O.formats == "function" && (x = (0, b.default)(x, O.formats())), O.parent == null || O.parent.blotName == "scroll" || O.parent.statics.scope !== O.statics.scope) ? x : E(O.parent, x);
          }
          i.bubbleFormats = E, i.BlockEmbed = S, i.default = N;
        },
        /* 5 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.default = i.overload = i.expandConfig = void 0;
          var h = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(D) {
            return typeof D;
          } : function(D) {
            return D && typeof Symbol == "function" && D.constructor === Symbol && D !== Symbol.prototype ? "symbol" : typeof D;
          }, f = /* @__PURE__ */ function() {
            function D(P, k) {
              var R = [], B = !0, q = !1, V = void 0;
              try {
                for (var T = P[Symbol.iterator](), I; !(B = (I = T.next()).done) && (R.push(I.value), !(k && R.length === k)); B = !0)
                  ;
              } catch (H) {
                q = !0, V = H;
              } finally {
                try {
                  !B && T.return && T.return();
                } finally {
                  if (q) throw V;
                }
              }
              return R;
            }
            return function(P, k) {
              if (Array.isArray(P))
                return P;
              if (Symbol.iterator in Object(P))
                return D(P, k);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), v = /* @__PURE__ */ function() {
            function D(P, k) {
              for (var R = 0; R < k.length; R++) {
                var B = k[R];
                B.enumerable = B.enumerable || !1, B.configurable = !0, "value" in B && (B.writable = !0), Object.defineProperty(P, B.key, B);
              }
            }
            return function(P, k, R) {
              return k && D(P.prototype, k), R && D(P, R), P;
            };
          }();
          o(50);
          var b = o(2), y = E(b), p = o(14), a = E(p), r = o(8), l = E(r), g = o(9), m = E(g), c = o(0), u = E(c), d = o(15), _ = E(d), s = o(3), w = E(s), F = o(10), C = E(F), S = o(34), N = E(S);
          function E(D) {
            return D && D.__esModule ? D : { default: D };
          }
          function O(D, P, k) {
            return P in D ? Object.defineProperty(D, P, { value: k, enumerable: !0, configurable: !0, writable: !0 }) : D[P] = k, D;
          }
          function x(D, P) {
            if (!(D instanceof P))
              throw new TypeError("Cannot call a class as a function");
          }
          var L = (0, C.default)("quill"), A = function() {
            v(D, null, [{
              key: "debug",
              value: function(k) {
                k === !0 && (k = "log"), C.default.level(k);
              }
            }, {
              key: "find",
              value: function(k) {
                return k.__quill || u.default.find(k);
              }
            }, {
              key: "import",
              value: function(k) {
                return this.imports[k] == null && L.error("Cannot import " + k + ". Are you sure it was registered?"), this.imports[k];
              }
            }, {
              key: "register",
              value: function(k, R) {
                var B = this, q = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
                if (typeof k != "string") {
                  var V = k.attrName || k.blotName;
                  typeof V == "string" ? this.register("formats/" + V, k, R) : Object.keys(k).forEach(function(T) {
                    B.register(T, k[T], R);
                  });
                } else
                  this.imports[k] != null && !q && L.warn("Overwriting " + k + " with", R), this.imports[k] = R, (k.startsWith("blots/") || k.startsWith("formats/")) && R.blotName !== "abstract" ? u.default.register(R) : k.startsWith("modules") && typeof R.register == "function" && R.register();
              }
            }]);
            function D(P) {
              var k = this, R = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              if (x(this, D), this.options = M(P, R), this.container = this.options.container, this.container == null)
                return L.error("Invalid Quill container", P);
              this.options.debug && D.debug(this.options.debug);
              var B = this.container.innerHTML.trim();
              this.container.classList.add("ql-container"), this.container.innerHTML = "", this.container.__quill = this, this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.root.setAttribute("data-gramm", !1), this.scrollingContainer = this.options.scrollingContainer || this.root, this.emitter = new l.default(), this.scroll = u.default.create(this.root, {
                emitter: this.emitter,
                whitelist: this.options.formats
              }), this.editor = new a.default(this.scroll), this.selection = new _.default(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.theme.init(), this.emitter.on(l.default.events.EDITOR_CHANGE, function(V) {
                V === l.default.events.TEXT_CHANGE && k.root.classList.toggle("ql-blank", k.editor.isBlank());
              }), this.emitter.on(l.default.events.SCROLL_UPDATE, function(V, T) {
                var I = k.selection.lastRange, H = I && I.length === 0 ? I.index : void 0;
                j.call(k, function() {
                  return k.editor.update(null, T, H);
                }, V);
              });
              var q = this.clipboard.convert(`<div class='ql-editor' style="white-space: normal;">` + B + "<p><br></p></div>");
              this.setContents(q), this.history.clear(), this.options.placeholder && this.root.setAttribute("data-placeholder", this.options.placeholder), this.options.readOnly && this.disable();
            }
            return v(D, [{
              key: "addContainer",
              value: function(k) {
                var R = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
                if (typeof k == "string") {
                  var B = k;
                  k = document.createElement("div"), k.classList.add(B);
                }
                return this.container.insertBefore(k, R), k;
              }
            }, {
              key: "blur",
              value: function() {
                this.selection.setRange(null);
              }
            }, {
              key: "deleteText",
              value: function(k, R, B) {
                var q = this, V = z(k, R, B), T = f(V, 4);
                return k = T[0], R = T[1], B = T[3], j.call(this, function() {
                  return q.editor.deleteText(k, R);
                }, B, k, -1 * R);
              }
            }, {
              key: "disable",
              value: function() {
                this.enable(!1);
              }
            }, {
              key: "enable",
              value: function() {
                var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
                this.scroll.enable(k), this.container.classList.toggle("ql-disabled", !k);
              }
            }, {
              key: "focus",
              value: function() {
                var k = this.scrollingContainer.scrollTop;
                this.selection.focus(), this.scrollingContainer.scrollTop = k, this.scrollIntoView();
              }
            }, {
              key: "format",
              value: function(k, R) {
                var B = this, q = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : l.default.sources.API;
                return j.call(this, function() {
                  var V = B.getSelection(!0), T = new y.default();
                  if (V == null)
                    return T;
                  if (u.default.query(k, u.default.Scope.BLOCK))
                    T = B.editor.formatLine(V.index, V.length, O({}, k, R));
                  else {
                    if (V.length === 0)
                      return B.selection.format(k, R), T;
                    T = B.editor.formatText(V.index, V.length, O({}, k, R));
                  }
                  return B.setSelection(V, l.default.sources.SILENT), T;
                }, q);
              }
            }, {
              key: "formatLine",
              value: function(k, R, B, q, V) {
                var T = this, I = void 0, H = z(k, R, B, q, V), W = f(H, 4);
                return k = W[0], R = W[1], I = W[2], V = W[3], j.call(this, function() {
                  return T.editor.formatLine(k, R, I);
                }, V, k, 0);
              }
            }, {
              key: "formatText",
              value: function(k, R, B, q, V) {
                var T = this, I = void 0, H = z(k, R, B, q, V), W = f(H, 4);
                return k = W[0], R = W[1], I = W[2], V = W[3], j.call(this, function() {
                  return T.editor.formatText(k, R, I);
                }, V, k, 0);
              }
            }, {
              key: "getBounds",
              value: function(k) {
                var R = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, B = void 0;
                typeof k == "number" ? B = this.selection.getBounds(k, R) : B = this.selection.getBounds(k.index, k.length);
                var q = this.container.getBoundingClientRect();
                return {
                  bottom: B.bottom - q.top,
                  height: B.height,
                  left: B.left - q.left,
                  right: B.right - q.left,
                  top: B.top - q.top,
                  width: B.width
                };
              }
            }, {
              key: "getContents",
              value: function() {
                var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, R = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - k, B = z(k, R), q = f(B, 2);
                return k = q[0], R = q[1], this.editor.getContents(k, R);
              }
            }, {
              key: "getFormat",
              value: function() {
                var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.getSelection(!0), R = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
                return typeof k == "number" ? this.editor.getFormat(k, R) : this.editor.getFormat(k.index, k.length);
              }
            }, {
              key: "getIndex",
              value: function(k) {
                return k.offset(this.scroll);
              }
            }, {
              key: "getLength",
              value: function() {
                return this.scroll.length();
              }
            }, {
              key: "getLeaf",
              value: function(k) {
                return this.scroll.leaf(k);
              }
            }, {
              key: "getLine",
              value: function(k) {
                return this.scroll.line(k);
              }
            }, {
              key: "getLines",
              value: function() {
                var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, R = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
                return typeof k != "number" ? this.scroll.lines(k.index, k.length) : this.scroll.lines(k, R);
              }
            }, {
              key: "getModule",
              value: function(k) {
                return this.theme.modules[k];
              }
            }, {
              key: "getSelection",
              value: function() {
                var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
                return k && this.focus(), this.update(), this.selection.getRange()[0];
              }
            }, {
              key: "getText",
              value: function() {
                var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, R = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - k, B = z(k, R), q = f(B, 2);
                return k = q[0], R = q[1], this.editor.getText(k, R);
              }
            }, {
              key: "hasFocus",
              value: function() {
                return this.selection.hasFocus();
              }
            }, {
              key: "insertEmbed",
              value: function(k, R, B) {
                var q = this, V = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : D.sources.API;
                return j.call(this, function() {
                  return q.editor.insertEmbed(k, R, B);
                }, V, k);
              }
            }, {
              key: "insertText",
              value: function(k, R, B, q, V) {
                var T = this, I = void 0, H = z(k, 0, B, q, V), W = f(H, 4);
                return k = W[0], I = W[2], V = W[3], j.call(this, function() {
                  return T.editor.insertText(k, R, I);
                }, V, k, R.length);
              }
            }, {
              key: "isEnabled",
              value: function() {
                return !this.container.classList.contains("ql-disabled");
              }
            }, {
              key: "off",
              value: function() {
                return this.emitter.off.apply(this.emitter, arguments);
              }
            }, {
              key: "on",
              value: function() {
                return this.emitter.on.apply(this.emitter, arguments);
              }
            }, {
              key: "once",
              value: function() {
                return this.emitter.once.apply(this.emitter, arguments);
              }
            }, {
              key: "pasteHTML",
              value: function(k, R, B) {
                this.clipboard.dangerouslyPasteHTML(k, R, B);
              }
            }, {
              key: "removeFormat",
              value: function(k, R, B) {
                var q = this, V = z(k, R, B), T = f(V, 4);
                return k = T[0], R = T[1], B = T[3], j.call(this, function() {
                  return q.editor.removeFormat(k, R);
                }, B, k);
              }
            }, {
              key: "scrollIntoView",
              value: function() {
                this.selection.scrollIntoView(this.scrollingContainer);
              }
            }, {
              key: "setContents",
              value: function(k) {
                var R = this, B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : l.default.sources.API;
                return j.call(this, function() {
                  k = new y.default(k);
                  var q = R.getLength(), V = R.editor.deleteText(0, q), T = R.editor.applyDelta(k), I = T.ops[T.ops.length - 1];
                  I != null && typeof I.insert == "string" && I.insert[I.insert.length - 1] === `
` && (R.editor.deleteText(R.getLength() - 1, 1), T.delete(1));
                  var H = V.compose(T);
                  return H;
                }, B);
              }
            }, {
              key: "setSelection",
              value: function(k, R, B) {
                if (k == null)
                  this.selection.setRange(null, R || D.sources.API);
                else {
                  var q = z(k, R, B), V = f(q, 4);
                  k = V[0], R = V[1], B = V[3], this.selection.setRange(new d.Range(k, R), B), B !== l.default.sources.SILENT && this.selection.scrollIntoView(this.scrollingContainer);
                }
              }
            }, {
              key: "setText",
              value: function(k) {
                var R = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : l.default.sources.API, B = new y.default().insert(k);
                return this.setContents(B, R);
              }
            }, {
              key: "update",
              value: function() {
                var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : l.default.sources.USER, R = this.scroll.update(k);
                return this.selection.update(k), R;
              }
            }, {
              key: "updateContents",
              value: function(k) {
                var R = this, B = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : l.default.sources.API;
                return j.call(this, function() {
                  return k = new y.default(k), R.editor.applyDelta(k, B);
                }, B, !0);
              }
            }]), D;
          }();
          A.DEFAULTS = {
            bounds: null,
            formats: null,
            modules: {},
            placeholder: "",
            readOnly: !1,
            scrollingContainer: null,
            strict: !0,
            theme: "default"
          }, A.events = l.default.events, A.sources = l.default.sources, A.version = "1.3.7", A.imports = {
            delta: y.default,
            parchment: u.default,
            "core/module": m.default,
            "core/theme": N.default
          };
          function M(D, P) {
            if (P = (0, w.default)(!0, {
              container: D,
              modules: {
                clipboard: !0,
                keyboard: !0,
                history: !0
              }
            }, P), !P.theme || P.theme === A.DEFAULTS.theme)
              P.theme = N.default;
            else if (P.theme = A.import("themes/" + P.theme), P.theme == null)
              throw new Error("Invalid theme " + P.theme + ". Did you register it?");
            var k = (0, w.default)(!0, {}, P.theme.DEFAULTS);
            [k, P].forEach(function(q) {
              q.modules = q.modules || {}, Object.keys(q.modules).forEach(function(V) {
                q.modules[V] === !0 && (q.modules[V] = {});
              });
            });
            var R = Object.keys(k.modules).concat(Object.keys(P.modules)), B = R.reduce(function(q, V) {
              var T = A.import("modules/" + V);
              return T == null ? L.error("Cannot load " + V + " module. Are you sure you registered it?") : q[V] = T.DEFAULTS || {}, q;
            }, {});
            return P.modules != null && P.modules.toolbar && P.modules.toolbar.constructor !== Object && (P.modules.toolbar = {
              container: P.modules.toolbar
            }), P = (0, w.default)(!0, {}, A.DEFAULTS, { modules: B }, k, P), ["bounds", "container", "scrollingContainer"].forEach(function(q) {
              typeof P[q] == "string" && (P[q] = document.querySelector(P[q]));
            }), P.modules = Object.keys(P.modules).reduce(function(q, V) {
              return P.modules[V] && (q[V] = P.modules[V]), q;
            }, {}), P;
          }
          function j(D, P, k, R) {
            if (this.options.strict && !this.isEnabled() && P === l.default.sources.USER)
              return new y.default();
            var B = k == null ? null : this.getSelection(), q = this.editor.delta, V = D();
            if (B != null && (k === !0 && (k = B.index), R == null ? B = G(B, V, P) : R !== 0 && (B = G(B, k, R, P)), this.setSelection(B, l.default.sources.SILENT)), V.length() > 0) {
              var T, I = [l.default.events.TEXT_CHANGE, V, q, P];
              if ((T = this.emitter).emit.apply(T, [l.default.events.EDITOR_CHANGE].concat(I)), P !== l.default.sources.SILENT) {
                var H;
                (H = this.emitter).emit.apply(H, I);
              }
            }
            return V;
          }
          function z(D, P, k, R, B) {
            var q = {};
            return typeof D.index == "number" && typeof D.length == "number" ? typeof P != "number" ? (B = R, R = k, k = P, P = D.length, D = D.index) : (P = D.length, D = D.index) : typeof P != "number" && (B = R, R = k, k = P, P = 0), (typeof k > "u" ? "undefined" : h(k)) === "object" ? (q = k, B = R) : typeof k == "string" && (R != null ? q[k] = R : B = k), B = B || l.default.sources.API, [D, P, q, B];
          }
          function G(D, P, k, R) {
            if (D == null) return null;
            var B = void 0, q = void 0;
            if (P instanceof y.default) {
              var V = [D.index, D.index + D.length].map(function(W) {
                return P.transformPosition(W, R !== l.default.sources.USER);
              }), T = f(V, 2);
              B = T[0], q = T[1];
            } else {
              var I = [D.index, D.index + D.length].map(function(W) {
                return W < P || W === P && R === l.default.sources.USER ? W : k >= 0 ? W + k : Math.max(P, W + k);
              }), H = f(I, 2);
              B = H[0], q = H[1];
            }
            return new d.Range(B, q - B);
          }
          i.expandConfig = M, i.overload = z, i.default = A;
        },
        /* 6 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = /* @__PURE__ */ function() {
            function c(u, d) {
              for (var _ = 0; _ < d.length; _++) {
                var s = d[_];
                s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(u, s.key, s);
              }
            }
            return function(u, d, _) {
              return d && c(u.prototype, d), _ && c(u, _), u;
            };
          }(), f = function c(u, d, _) {
            u === null && (u = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(u, d);
            if (s === void 0) {
              var w = Object.getPrototypeOf(u);
              return w === null ? void 0 : c(w, d, _);
            } else {
              if ("value" in s)
                return s.value;
              var F = s.get;
              return F === void 0 ? void 0 : F.call(_);
            }
          }, v = o(7), b = a(v), y = o(0), p = a(y);
          function a(c) {
            return c && c.__esModule ? c : { default: c };
          }
          function r(c, u) {
            if (!(c instanceof u))
              throw new TypeError("Cannot call a class as a function");
          }
          function l(c, u) {
            if (!c)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return u && (typeof u == "object" || typeof u == "function") ? u : c;
          }
          function g(c, u) {
            if (typeof u != "function" && u !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof u);
            c.prototype = Object.create(u && u.prototype, { constructor: { value: c, enumerable: !1, writable: !0, configurable: !0 } }), u && (Object.setPrototypeOf ? Object.setPrototypeOf(c, u) : c.__proto__ = u);
          }
          var m = function(c) {
            g(u, c);
            function u() {
              return r(this, u), l(this, (u.__proto__ || Object.getPrototypeOf(u)).apply(this, arguments));
            }
            return h(u, [{
              key: "formatAt",
              value: function(_, s, w, F) {
                if (u.compare(this.statics.blotName, w) < 0 && p.default.query(w, p.default.Scope.BLOT)) {
                  var C = this.isolate(_, s);
                  F && C.wrap(w, F);
                } else
                  f(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "formatAt", this).call(this, _, s, w, F);
              }
            }, {
              key: "optimize",
              value: function(_) {
                if (f(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "optimize", this).call(this, _), this.parent instanceof u && u.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
                  var s = this.parent.isolate(this.offset(), this.length());
                  this.moveChildren(s), s.wrap(this);
                }
              }
            }], [{
              key: "compare",
              value: function(_, s) {
                var w = u.order.indexOf(_), F = u.order.indexOf(s);
                return w >= 0 || F >= 0 ? w - F : _ === s ? 0 : _ < s ? -1 : 1;
              }
            }]), u;
          }(p.default.Inline);
          m.allowedChildren = [m, p.default.Embed, b.default], m.order = [
            "cursor",
            "inline",
            // Must be lower
            "underline",
            "strike",
            "italic",
            "bold",
            "script",
            "link",
            "code"
            // Must be higher
          ], i.default = m;
        },
        /* 7 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = o(0), f = v(h);
          function v(r) {
            return r && r.__esModule ? r : { default: r };
          }
          function b(r, l) {
            if (!(r instanceof l))
              throw new TypeError("Cannot call a class as a function");
          }
          function y(r, l) {
            if (!r)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return l && (typeof l == "object" || typeof l == "function") ? l : r;
          }
          function p(r, l) {
            if (typeof l != "function" && l !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof l);
            r.prototype = Object.create(l && l.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(r, l) : r.__proto__ = l);
          }
          var a = function(r) {
            p(l, r);
            function l() {
              return b(this, l), y(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
            }
            return l;
          }(f.default.Text);
          i.default = a;
        },
        /* 8 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = /* @__PURE__ */ function() {
            function d(_, s) {
              for (var w = 0; w < s.length; w++) {
                var F = s[w];
                F.enumerable = F.enumerable || !1, F.configurable = !0, "value" in F && (F.writable = !0), Object.defineProperty(_, F.key, F);
              }
            }
            return function(_, s, w) {
              return s && d(_.prototype, s), w && d(_, w), _;
            };
          }(), f = function d(_, s, w) {
            _ === null && (_ = Function.prototype);
            var F = Object.getOwnPropertyDescriptor(_, s);
            if (F === void 0) {
              var C = Object.getPrototypeOf(_);
              return C === null ? void 0 : d(C, s, w);
            } else {
              if ("value" in F)
                return F.value;
              var S = F.get;
              return S === void 0 ? void 0 : S.call(w);
            }
          }, v = o(54), b = a(v), y = o(10), p = a(y);
          function a(d) {
            return d && d.__esModule ? d : { default: d };
          }
          function r(d, _) {
            if (!(d instanceof _))
              throw new TypeError("Cannot call a class as a function");
          }
          function l(d, _) {
            if (!d)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return _ && (typeof _ == "object" || typeof _ == "function") ? _ : d;
          }
          function g(d, _) {
            if (typeof _ != "function" && _ !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof _);
            d.prototype = Object.create(_ && _.prototype, { constructor: { value: d, enumerable: !1, writable: !0, configurable: !0 } }), _ && (Object.setPrototypeOf ? Object.setPrototypeOf(d, _) : d.__proto__ = _);
          }
          var m = (0, p.default)("quill:events"), c = ["selectionchange", "mousedown", "mouseup", "click"];
          c.forEach(function(d) {
            document.addEventListener(d, function() {
              for (var _ = arguments.length, s = Array(_), w = 0; w < _; w++)
                s[w] = arguments[w];
              [].slice.call(document.querySelectorAll(".ql-container")).forEach(function(F) {
                if (F.__quill && F.__quill.emitter) {
                  var C;
                  (C = F.__quill.emitter).handleDOM.apply(C, s);
                }
              });
            });
          });
          var u = function(d) {
            g(_, d);
            function _() {
              r(this, _);
              var s = l(this, (_.__proto__ || Object.getPrototypeOf(_)).call(this));
              return s.listeners = {}, s.on("error", m.error), s;
            }
            return h(_, [{
              key: "emit",
              value: function() {
                m.log.apply(m, arguments), f(_.prototype.__proto__ || Object.getPrototypeOf(_.prototype), "emit", this).apply(this, arguments);
              }
            }, {
              key: "handleDOM",
              value: function(w) {
                for (var F = arguments.length, C = Array(F > 1 ? F - 1 : 0), S = 1; S < F; S++)
                  C[S - 1] = arguments[S];
                (this.listeners[w.type] || []).forEach(function(N) {
                  var E = N.node, O = N.handler;
                  (w.target === E || E.contains(w.target)) && O.apply(void 0, [w].concat(C));
                });
              }
            }, {
              key: "listenDOM",
              value: function(w, F, C) {
                this.listeners[w] || (this.listeners[w] = []), this.listeners[w].push({ node: F, handler: C });
              }
            }]), _;
          }(b.default);
          u.events = {
            EDITOR_CHANGE: "editor-change",
            SCROLL_BEFORE_UPDATE: "scroll-before-update",
            SCROLL_OPTIMIZE: "scroll-optimize",
            SCROLL_UPDATE: "scroll-update",
            SELECTION_CHANGE: "selection-change",
            TEXT_CHANGE: "text-change"
          }, u.sources = {
            API: "api",
            SILENT: "silent",
            USER: "user"
          }, i.default = u;
        },
        /* 9 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          function h(v, b) {
            if (!(v instanceof b))
              throw new TypeError("Cannot call a class as a function");
          }
          var f = function v(b) {
            var y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            h(this, v), this.quill = b, this.options = y;
          };
          f.DEFAULTS = {}, i.default = f;
        },
        /* 10 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = ["error", "warn", "log", "info"], f = "warn";
          function v(y) {
            if (h.indexOf(y) <= h.indexOf(f)) {
              for (var p, a = arguments.length, r = Array(a > 1 ? a - 1 : 0), l = 1; l < a; l++)
                r[l - 1] = arguments[l];
              (p = console)[y].apply(p, r);
            }
          }
          function b(y) {
            return h.reduce(function(p, a) {
              return p[a] = v.bind(console, a, y), p;
            }, {});
          }
          v.level = b.level = function(y) {
            f = y;
          }, i.default = b;
        },
        /* 11 */
        /***/
        function(e, i, o) {
          var h = Array.prototype.slice, f = o(52), v = o(53), b = e.exports = function(r, l, g) {
            return g || (g = {}), r === l ? !0 : r instanceof Date && l instanceof Date ? r.getTime() === l.getTime() : !r || !l || typeof r != "object" && typeof l != "object" ? g.strict ? r === l : r == l : a(r, l, g);
          };
          function y(r) {
            return r == null;
          }
          function p(r) {
            return !(!r || typeof r != "object" || typeof r.length != "number" || typeof r.copy != "function" || typeof r.slice != "function" || r.length > 0 && typeof r[0] != "number");
          }
          function a(r, l, g) {
            var m, c;
            if (y(r) || y(l) || r.prototype !== l.prototype) return !1;
            if (v(r))
              return v(l) ? (r = h.call(r), l = h.call(l), b(r, l, g)) : !1;
            if (p(r)) {
              if (!p(l) || r.length !== l.length) return !1;
              for (m = 0; m < r.length; m++)
                if (r[m] !== l[m]) return !1;
              return !0;
            }
            try {
              var u = f(r), d = f(l);
            } catch {
              return !1;
            }
            if (u.length != d.length)
              return !1;
            for (u.sort(), d.sort(), m = u.length - 1; m >= 0; m--)
              if (u[m] != d[m])
                return !1;
            for (m = u.length - 1; m >= 0; m--)
              if (c = u[m], !b(r[c], l[c], g)) return !1;
            return typeof r == typeof l;
          }
        },
        /* 12 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", { value: !0 });
          var h = o(1), f = (
            /** @class */
            function() {
              function v(b, y, p) {
                p === void 0 && (p = {}), this.attrName = b, this.keyName = y;
                var a = h.Scope.TYPE & h.Scope.ATTRIBUTE;
                p.scope != null ? this.scope = p.scope & h.Scope.LEVEL | a : this.scope = h.Scope.ATTRIBUTE, p.whitelist != null && (this.whitelist = p.whitelist);
              }
              return v.keys = function(b) {
                return [].map.call(b.attributes, function(y) {
                  return y.name;
                });
              }, v.prototype.add = function(b, y) {
                return this.canAdd(b, y) ? (b.setAttribute(this.keyName, y), !0) : !1;
              }, v.prototype.canAdd = function(b, y) {
                var p = h.query(b, h.Scope.BLOT & (this.scope | h.Scope.TYPE));
                return p == null ? !1 : this.whitelist == null ? !0 : typeof y == "string" ? this.whitelist.indexOf(y.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(y) > -1;
              }, v.prototype.remove = function(b) {
                b.removeAttribute(this.keyName);
              }, v.prototype.value = function(b) {
                var y = b.getAttribute(this.keyName);
                return this.canAdd(b, y) && y ? y : "";
              }, v;
            }()
          );
          i.default = f;
        },
        /* 13 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.default = i.Code = void 0;
          var h = /* @__PURE__ */ function() {
            function S(N, E) {
              var O = [], x = !0, L = !1, A = void 0;
              try {
                for (var M = N[Symbol.iterator](), j; !(x = (j = M.next()).done) && (O.push(j.value), !(E && O.length === E)); x = !0)
                  ;
              } catch (z) {
                L = !0, A = z;
              } finally {
                try {
                  !x && M.return && M.return();
                } finally {
                  if (L) throw A;
                }
              }
              return O;
            }
            return function(N, E) {
              if (Array.isArray(N))
                return N;
              if (Symbol.iterator in Object(N))
                return S(N, E);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), f = /* @__PURE__ */ function() {
            function S(N, E) {
              for (var O = 0; O < E.length; O++) {
                var x = E[O];
                x.enumerable = x.enumerable || !1, x.configurable = !0, "value" in x && (x.writable = !0), Object.defineProperty(N, x.key, x);
              }
            }
            return function(N, E, O) {
              return E && S(N.prototype, E), O && S(N, O), N;
            };
          }(), v = function S(N, E, O) {
            N === null && (N = Function.prototype);
            var x = Object.getOwnPropertyDescriptor(N, E);
            if (x === void 0) {
              var L = Object.getPrototypeOf(N);
              return L === null ? void 0 : S(L, E, O);
            } else {
              if ("value" in x)
                return x.value;
              var A = x.get;
              return A === void 0 ? void 0 : A.call(O);
            }
          }, b = o(2), y = d(b), p = o(0), a = d(p), r = o(4), l = d(r), g = o(6), m = d(g), c = o(7), u = d(c);
          function d(S) {
            return S && S.__esModule ? S : { default: S };
          }
          function _(S, N) {
            if (!(S instanceof N))
              throw new TypeError("Cannot call a class as a function");
          }
          function s(S, N) {
            if (!S)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return N && (typeof N == "object" || typeof N == "function") ? N : S;
          }
          function w(S, N) {
            if (typeof N != "function" && N !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof N);
            S.prototype = Object.create(N && N.prototype, { constructor: { value: S, enumerable: !1, writable: !0, configurable: !0 } }), N && (Object.setPrototypeOf ? Object.setPrototypeOf(S, N) : S.__proto__ = N);
          }
          var F = function(S) {
            w(N, S);
            function N() {
              return _(this, N), s(this, (N.__proto__ || Object.getPrototypeOf(N)).apply(this, arguments));
            }
            return N;
          }(m.default);
          F.blotName = "code", F.tagName = "CODE";
          var C = function(S) {
            w(N, S);
            function N() {
              return _(this, N), s(this, (N.__proto__ || Object.getPrototypeOf(N)).apply(this, arguments));
            }
            return f(N, [{
              key: "delta",
              value: function() {
                var O = this, x = this.domNode.textContent;
                return x.endsWith(`
`) && (x = x.slice(0, -1)), x.split(`
`).reduce(function(L, A) {
                  return L.insert(A).insert(`
`, O.formats());
                }, new y.default());
              }
            }, {
              key: "format",
              value: function(O, x) {
                if (!(O === this.statics.blotName && x)) {
                  var L = this.descendant(u.default, this.length() - 1), A = h(L, 1), M = A[0];
                  M != null && M.deleteAt(M.length() - 1, 1), v(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "format", this).call(this, O, x);
                }
              }
            }, {
              key: "formatAt",
              value: function(O, x, L, A) {
                if (x !== 0 && !(a.default.query(L, a.default.Scope.BLOCK) == null || L === this.statics.blotName && A === this.statics.formats(this.domNode))) {
                  var M = this.newlineIndex(O);
                  if (!(M < 0 || M >= O + x)) {
                    var j = this.newlineIndex(O, !0) + 1, z = M - j + 1, G = this.isolate(j, z), D = G.next;
                    G.format(L, A), D instanceof N && D.formatAt(0, O - j + x - z, L, A);
                  }
                }
              }
            }, {
              key: "insertAt",
              value: function(O, x, L) {
                if (L == null) {
                  var A = this.descendant(u.default, O), M = h(A, 2), j = M[0], z = M[1];
                  j.insertAt(z, x);
                }
              }
            }, {
              key: "length",
              value: function() {
                var O = this.domNode.textContent.length;
                return this.domNode.textContent.endsWith(`
`) ? O : O + 1;
              }
            }, {
              key: "newlineIndex",
              value: function(O) {
                var x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
                if (x)
                  return this.domNode.textContent.slice(0, O).lastIndexOf(`
`);
                var L = this.domNode.textContent.slice(O).indexOf(`
`);
                return L > -1 ? O + L : -1;
              }
            }, {
              key: "optimize",
              value: function(O) {
                this.domNode.textContent.endsWith(`
`) || this.appendChild(a.default.create("text", `
`)), v(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "optimize", this).call(this, O);
                var x = this.next;
                x != null && x.prev === this && x.statics.blotName === this.statics.blotName && this.statics.formats(this.domNode) === x.statics.formats(x.domNode) && (x.optimize(O), x.moveChildren(this), x.remove());
              }
            }, {
              key: "replace",
              value: function(O) {
                v(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "replace", this).call(this, O), [].slice.call(this.domNode.querySelectorAll("*")).forEach(function(x) {
                  var L = a.default.find(x);
                  L == null ? x.parentNode.removeChild(x) : L instanceof a.default.Embed ? L.remove() : L.unwrap();
                });
              }
            }], [{
              key: "create",
              value: function(O) {
                var x = v(N.__proto__ || Object.getPrototypeOf(N), "create", this).call(this, O);
                return x.setAttribute("spellcheck", !1), x;
              }
            }, {
              key: "formats",
              value: function() {
                return !0;
              }
            }]), N;
          }(l.default);
          C.blotName = "code-block", C.tagName = "PRE", C.TAB = "  ", i.Code = F, i.default = C;
        },
        /* 14 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(D) {
            return typeof D;
          } : function(D) {
            return D && typeof Symbol == "function" && D.constructor === Symbol && D !== Symbol.prototype ? "symbol" : typeof D;
          }, f = /* @__PURE__ */ function() {
            function D(P, k) {
              var R = [], B = !0, q = !1, V = void 0;
              try {
                for (var T = P[Symbol.iterator](), I; !(B = (I = T.next()).done) && (R.push(I.value), !(k && R.length === k)); B = !0)
                  ;
              } catch (H) {
                q = !0, V = H;
              } finally {
                try {
                  !B && T.return && T.return();
                } finally {
                  if (q) throw V;
                }
              }
              return R;
            }
            return function(P, k) {
              if (Array.isArray(P))
                return P;
              if (Symbol.iterator in Object(P))
                return D(P, k);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), v = /* @__PURE__ */ function() {
            function D(P, k) {
              for (var R = 0; R < k.length; R++) {
                var B = k[R];
                B.enumerable = B.enumerable || !1, B.configurable = !0, "value" in B && (B.writable = !0), Object.defineProperty(P, B.key, B);
              }
            }
            return function(P, k, R) {
              return k && D(P.prototype, k), R && D(P, R), P;
            };
          }(), b = o(2), y = x(b), p = o(20), a = x(p), r = o(0), l = x(r), g = o(13), m = x(g), c = o(24), u = x(c), d = o(4), _ = x(d), s = o(16), w = x(s), F = o(21), C = x(F), S = o(11), N = x(S), E = o(3), O = x(E);
          function x(D) {
            return D && D.__esModule ? D : { default: D };
          }
          function L(D, P, k) {
            return P in D ? Object.defineProperty(D, P, { value: k, enumerable: !0, configurable: !0, writable: !0 }) : D[P] = k, D;
          }
          function A(D, P) {
            if (!(D instanceof P))
              throw new TypeError("Cannot call a class as a function");
          }
          var M = /^[ -~]*$/, j = function() {
            function D(P) {
              A(this, D), this.scroll = P, this.delta = this.getDelta();
            }
            return v(D, [{
              key: "applyDelta",
              value: function(k) {
                var R = this, B = !1;
                this.scroll.update();
                var q = this.scroll.length();
                return this.scroll.batchStart(), k = G(k), k.reduce(function(V, T) {
                  var I = T.retain || T.delete || T.insert.length || 1, H = T.attributes || {};
                  if (T.insert != null) {
                    if (typeof T.insert == "string") {
                      var W = T.insert;
                      W.endsWith(`
`) && B && (B = !1, W = W.slice(0, -1)), V >= q && !W.endsWith(`
`) && (B = !0), R.scroll.insertAt(V, W);
                      var K = R.scroll.line(V), X = f(K, 2), Q = X[0], ee = X[1], oe = (0, O.default)({}, (0, d.bubbleFormats)(Q));
                      if (Q instanceof _.default) {
                        var re = Q.descendant(l.default.Leaf, ee), ue = f(re, 1), se = ue[0];
                        oe = (0, O.default)(oe, (0, d.bubbleFormats)(se));
                      }
                      H = a.default.attributes.diff(oe, H) || {};
                    } else if (h(T.insert) === "object") {
                      var U = Object.keys(T.insert)[0];
                      if (U == null) return V;
                      R.scroll.insertAt(V, U, T.insert[U]);
                    }
                    q += I;
                  }
                  return Object.keys(H).forEach(function($) {
                    R.scroll.formatAt(V, I, $, H[$]);
                  }), V + I;
                }, 0), k.reduce(function(V, T) {
                  return typeof T.delete == "number" ? (R.scroll.deleteAt(V, T.delete), V) : V + (T.retain || T.insert.length || 1);
                }, 0), this.scroll.batchEnd(), this.update(k);
              }
            }, {
              key: "deleteText",
              value: function(k, R) {
                return this.scroll.deleteAt(k, R), this.update(new y.default().retain(k).delete(R));
              }
            }, {
              key: "formatLine",
              value: function(k, R) {
                var B = this, q = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return this.scroll.update(), Object.keys(q).forEach(function(V) {
                  if (!(B.scroll.whitelist != null && !B.scroll.whitelist[V])) {
                    var T = B.scroll.lines(k, Math.max(R, 1)), I = R;
                    T.forEach(function(H) {
                      var W = H.length();
                      if (!(H instanceof m.default))
                        H.format(V, q[V]);
                      else {
                        var K = k - H.offset(B.scroll), X = H.newlineIndex(K + I) - K + 1;
                        H.formatAt(K, X, V, q[V]);
                      }
                      I -= W;
                    });
                  }
                }), this.scroll.optimize(), this.update(new y.default().retain(k).retain(R, (0, C.default)(q)));
              }
            }, {
              key: "formatText",
              value: function(k, R) {
                var B = this, q = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return Object.keys(q).forEach(function(V) {
                  B.scroll.formatAt(k, R, V, q[V]);
                }), this.update(new y.default().retain(k).retain(R, (0, C.default)(q)));
              }
            }, {
              key: "getContents",
              value: function(k, R) {
                return this.delta.slice(k, k + R);
              }
            }, {
              key: "getDelta",
              value: function() {
                return this.scroll.lines().reduce(function(k, R) {
                  return k.concat(R.delta());
                }, new y.default());
              }
            }, {
              key: "getFormat",
              value: function(k) {
                var R = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, B = [], q = [];
                R === 0 ? this.scroll.path(k).forEach(function(T) {
                  var I = f(T, 1), H = I[0];
                  H instanceof _.default ? B.push(H) : H instanceof l.default.Leaf && q.push(H);
                }) : (B = this.scroll.lines(k, R), q = this.scroll.descendants(l.default.Leaf, k, R));
                var V = [B, q].map(function(T) {
                  if (T.length === 0) return {};
                  for (var I = (0, d.bubbleFormats)(T.shift()); Object.keys(I).length > 0; ) {
                    var H = T.shift();
                    if (H == null) return I;
                    I = z((0, d.bubbleFormats)(H), I);
                  }
                  return I;
                });
                return O.default.apply(O.default, V);
              }
            }, {
              key: "getText",
              value: function(k, R) {
                return this.getContents(k, R).filter(function(B) {
                  return typeof B.insert == "string";
                }).map(function(B) {
                  return B.insert;
                }).join("");
              }
            }, {
              key: "insertEmbed",
              value: function(k, R, B) {
                return this.scroll.insertAt(k, R, B), this.update(new y.default().retain(k).insert(L({}, R, B)));
              }
            }, {
              key: "insertText",
              value: function(k, R) {
                var B = this, q = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return R = R.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(k, R), Object.keys(q).forEach(function(V) {
                  B.scroll.formatAt(k, R.length, V, q[V]);
                }), this.update(new y.default().retain(k).insert(R, (0, C.default)(q)));
              }
            }, {
              key: "isBlank",
              value: function() {
                if (this.scroll.children.length == 0) return !0;
                if (this.scroll.children.length > 1) return !1;
                var k = this.scroll.children.head;
                return k.statics.blotName !== _.default.blotName || k.children.length > 1 ? !1 : k.children.head instanceof w.default;
              }
            }, {
              key: "removeFormat",
              value: function(k, R) {
                var B = this.getText(k, R), q = this.scroll.line(k + R), V = f(q, 2), T = V[0], I = V[1], H = 0, W = new y.default();
                T != null && (T instanceof m.default ? H = T.newlineIndex(I) - I + 1 : H = T.length() - I, W = T.delta().slice(I, I + H - 1).insert(`
`));
                var K = this.getContents(k, R + H), X = K.diff(new y.default().insert(B).concat(W)), Q = new y.default().retain(k).concat(X);
                return this.applyDelta(Q);
              }
            }, {
              key: "update",
              value: function(k) {
                var R = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], B = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0, q = this.delta;
                if (R.length === 1 && R[0].type === "characterData" && R[0].target.data.match(M) && l.default.find(R[0].target)) {
                  var V = l.default.find(R[0].target), T = (0, d.bubbleFormats)(V), I = V.offset(this.scroll), H = R[0].oldValue.replace(u.default.CONTENTS, ""), W = new y.default().insert(H), K = new y.default().insert(V.value()), X = new y.default().retain(I).concat(W.diff(K, B));
                  k = X.reduce(function(Q, ee) {
                    return ee.insert ? Q.insert(ee.insert, T) : Q.push(ee);
                  }, new y.default()), this.delta = q.compose(k);
                } else
                  this.delta = this.getDelta(), (!k || !(0, N.default)(q.compose(k), this.delta)) && (k = q.diff(this.delta, B));
                return k;
              }
            }]), D;
          }();
          function z(D, P) {
            return Object.keys(P).reduce(function(k, R) {
              return D[R] == null || (P[R] === D[R] ? k[R] = P[R] : Array.isArray(P[R]) ? P[R].indexOf(D[R]) < 0 && (k[R] = P[R].concat([D[R]])) : k[R] = [P[R], D[R]]), k;
            }, {});
          }
          function G(D) {
            return D.reduce(function(P, k) {
              if (k.insert === 1) {
                var R = (0, C.default)(k.attributes);
                return delete R.image, P.insert({ image: k.attributes.image }, R);
              }
              if (k.attributes != null && (k.attributes.list === !0 || k.attributes.bullet === !0) && (k = (0, C.default)(k), k.attributes.list ? k.attributes.list = "ordered" : (k.attributes.list = "bullet", delete k.attributes.bullet)), typeof k.insert == "string") {
                var B = k.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
                return P.insert(B, k.attributes);
              }
              return P.push(k);
            }, new y.default());
          }
          i.default = j;
        },
        /* 15 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.default = i.Range = void 0;
          var h = /* @__PURE__ */ function() {
            function S(N, E) {
              var O = [], x = !0, L = !1, A = void 0;
              try {
                for (var M = N[Symbol.iterator](), j; !(x = (j = M.next()).done) && (O.push(j.value), !(E && O.length === E)); x = !0)
                  ;
              } catch (z) {
                L = !0, A = z;
              } finally {
                try {
                  !x && M.return && M.return();
                } finally {
                  if (L) throw A;
                }
              }
              return O;
            }
            return function(N, E) {
              if (Array.isArray(N))
                return N;
              if (Symbol.iterator in Object(N))
                return S(N, E);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), f = /* @__PURE__ */ function() {
            function S(N, E) {
              for (var O = 0; O < E.length; O++) {
                var x = E[O];
                x.enumerable = x.enumerable || !1, x.configurable = !0, "value" in x && (x.writable = !0), Object.defineProperty(N, x.key, x);
              }
            }
            return function(N, E, O) {
              return E && S(N.prototype, E), O && S(N, O), N;
            };
          }(), v = o(0), b = u(v), y = o(21), p = u(y), a = o(11), r = u(a), l = o(8), g = u(l), m = o(10), c = u(m);
          function u(S) {
            return S && S.__esModule ? S : { default: S };
          }
          function d(S) {
            if (Array.isArray(S)) {
              for (var N = 0, E = Array(S.length); N < S.length; N++)
                E[N] = S[N];
              return E;
            } else
              return Array.from(S);
          }
          function _(S, N) {
            if (!(S instanceof N))
              throw new TypeError("Cannot call a class as a function");
          }
          var s = (0, c.default)("quill:selection"), w = function S(N) {
            var E = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
            _(this, S), this.index = N, this.length = E;
          }, F = function() {
            function S(N, E) {
              var O = this;
              _(this, S), this.emitter = E, this.scroll = N, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = b.default.create("cursor", this), this.lastRange = this.savedRange = new w(0, 0), this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, function() {
                O.mouseDown || setTimeout(O.update.bind(O, g.default.sources.USER), 1);
              }), this.emitter.on(g.default.events.EDITOR_CHANGE, function(x, L) {
                x === g.default.events.TEXT_CHANGE && L.length() > 0 && O.update(g.default.sources.SILENT);
              }), this.emitter.on(g.default.events.SCROLL_BEFORE_UPDATE, function() {
                if (O.hasFocus()) {
                  var x = O.getNativeRange();
                  x != null && x.start.node !== O.cursor.textNode && O.emitter.once(g.default.events.SCROLL_UPDATE, function() {
                    try {
                      O.setNativeRange(x.start.node, x.start.offset, x.end.node, x.end.offset);
                    } catch {
                    }
                  });
                }
              }), this.emitter.on(g.default.events.SCROLL_OPTIMIZE, function(x, L) {
                if (L.range) {
                  var A = L.range, M = A.startNode, j = A.startOffset, z = A.endNode, G = A.endOffset;
                  O.setNativeRange(M, j, z, G);
                }
              }), this.update(g.default.sources.SILENT);
            }
            return f(S, [{
              key: "handleComposition",
              value: function() {
                var E = this;
                this.root.addEventListener("compositionstart", function() {
                  E.composing = !0;
                }), this.root.addEventListener("compositionend", function() {
                  if (E.composing = !1, E.cursor.parent) {
                    var O = E.cursor.restore();
                    if (!O) return;
                    setTimeout(function() {
                      E.setNativeRange(O.startNode, O.startOffset, O.endNode, O.endOffset);
                    }, 1);
                  }
                });
              }
            }, {
              key: "handleDragging",
              value: function() {
                var E = this;
                this.emitter.listenDOM("mousedown", document.body, function() {
                  E.mouseDown = !0;
                }), this.emitter.listenDOM("mouseup", document.body, function() {
                  E.mouseDown = !1, E.update(g.default.sources.USER);
                });
              }
            }, {
              key: "focus",
              value: function() {
                this.hasFocus() || (this.root.focus(), this.setRange(this.savedRange));
              }
            }, {
              key: "format",
              value: function(E, O) {
                if (!(this.scroll.whitelist != null && !this.scroll.whitelist[E])) {
                  this.scroll.update();
                  var x = this.getNativeRange();
                  if (!(x == null || !x.native.collapsed || b.default.query(E, b.default.Scope.BLOCK))) {
                    if (x.start.node !== this.cursor.textNode) {
                      var L = b.default.find(x.start.node, !1);
                      if (L == null) return;
                      if (L instanceof b.default.Leaf) {
                        var A = L.split(x.start.offset);
                        L.parent.insertBefore(this.cursor, A);
                      } else
                        L.insertBefore(this.cursor, x.start.node);
                      this.cursor.attach();
                    }
                    this.cursor.format(E, O), this.scroll.optimize(), this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length), this.update();
                  }
                }
              }
            }, {
              key: "getBounds",
              value: function(E) {
                var O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, x = this.scroll.length();
                E = Math.min(E, x - 1), O = Math.min(E + O, x - 1) - E;
                var L = void 0, A = this.scroll.leaf(E), M = h(A, 2), j = M[0], z = M[1];
                if (j == null) return null;
                var G = j.position(z, !0), D = h(G, 2);
                L = D[0], z = D[1];
                var P = document.createRange();
                if (O > 0) {
                  P.setStart(L, z);
                  var k = this.scroll.leaf(E + O), R = h(k, 2);
                  if (j = R[0], z = R[1], j == null) return null;
                  var B = j.position(z, !0), q = h(B, 2);
                  return L = q[0], z = q[1], P.setEnd(L, z), P.getBoundingClientRect();
                } else {
                  var V = "left", T = void 0;
                  return L instanceof Text ? (z < L.data.length ? (P.setStart(L, z), P.setEnd(L, z + 1)) : (P.setStart(L, z - 1), P.setEnd(L, z), V = "right"), T = P.getBoundingClientRect()) : (T = j.domNode.getBoundingClientRect(), z > 0 && (V = "right")), {
                    bottom: T.top + T.height,
                    height: T.height,
                    left: T[V],
                    right: T[V],
                    top: T.top,
                    width: 0
                  };
                }
              }
            }, {
              key: "getNativeRange",
              value: function() {
                var E = document.getSelection();
                if (E == null || E.rangeCount <= 0) return null;
                var O = E.getRangeAt(0);
                if (O == null) return null;
                var x = this.normalizeNative(O);
                return s.info("getNativeRange", x), x;
              }
            }, {
              key: "getRange",
              value: function() {
                var E = this.getNativeRange();
                if (E == null) return [null, null];
                var O = this.normalizedToRange(E);
                return [O, E];
              }
            }, {
              key: "hasFocus",
              value: function() {
                return document.activeElement === this.root;
              }
            }, {
              key: "normalizedToRange",
              value: function(E) {
                var O = this, x = [[E.start.node, E.start.offset]];
                E.native.collapsed || x.push([E.end.node, E.end.offset]);
                var L = x.map(function(j) {
                  var z = h(j, 2), G = z[0], D = z[1], P = b.default.find(G, !0), k = P.offset(O.scroll);
                  return D === 0 ? k : P instanceof b.default.Container ? k + P.length() : k + P.index(G, D);
                }), A = Math.min(Math.max.apply(Math, d(L)), this.scroll.length() - 1), M = Math.min.apply(Math, [A].concat(d(L)));
                return new w(M, A - M);
              }
            }, {
              key: "normalizeNative",
              value: function(E) {
                if (!C(this.root, E.startContainer) || !E.collapsed && !C(this.root, E.endContainer))
                  return null;
                var O = {
                  start: { node: E.startContainer, offset: E.startOffset },
                  end: { node: E.endContainer, offset: E.endOffset },
                  native: E
                };
                return [O.start, O.end].forEach(function(x) {
                  for (var L = x.node, A = x.offset; !(L instanceof Text) && L.childNodes.length > 0; )
                    if (L.childNodes.length > A)
                      L = L.childNodes[A], A = 0;
                    else if (L.childNodes.length === A)
                      L = L.lastChild, A = L instanceof Text ? L.data.length : L.childNodes.length + 1;
                    else
                      break;
                  x.node = L, x.offset = A;
                }), O;
              }
            }, {
              key: "rangeToNative",
              value: function(E) {
                var O = this, x = E.collapsed ? [E.index] : [E.index, E.index + E.length], L = [], A = this.scroll.length();
                return x.forEach(function(M, j) {
                  M = Math.min(A - 1, M);
                  var z = void 0, G = O.scroll.leaf(M), D = h(G, 2), P = D[0], k = D[1], R = P.position(k, j !== 0), B = h(R, 2);
                  z = B[0], k = B[1], L.push(z, k);
                }), L.length < 2 && (L = L.concat(L)), L;
              }
            }, {
              key: "scrollIntoView",
              value: function(E) {
                var O = this.lastRange;
                if (O != null) {
                  var x = this.getBounds(O.index, O.length);
                  if (x != null) {
                    var L = this.scroll.length() - 1, A = this.scroll.line(Math.min(O.index, L)), M = h(A, 1), j = M[0], z = j;
                    if (O.length > 0) {
                      var G = this.scroll.line(Math.min(O.index + O.length, L)), D = h(G, 1);
                      z = D[0];
                    }
                    if (!(j == null || z == null)) {
                      var P = E.getBoundingClientRect();
                      x.top < P.top ? E.scrollTop -= P.top - x.top : x.bottom > P.bottom && (E.scrollTop += x.bottom - P.bottom);
                    }
                  }
                }
              }
            }, {
              key: "setNativeRange",
              value: function(E, O) {
                var x = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : E, L = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : O, A = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
                if (s.info("setNativeRange", E, O, x, L), !(E != null && (this.root.parentNode == null || E.parentNode == null || x.parentNode == null))) {
                  var M = document.getSelection();
                  if (M != null)
                    if (E != null) {
                      this.hasFocus() || this.root.focus();
                      var j = (this.getNativeRange() || {}).native;
                      if (j == null || A || E !== j.startContainer || O !== j.startOffset || x !== j.endContainer || L !== j.endOffset) {
                        E.tagName == "BR" && (O = [].indexOf.call(E.parentNode.childNodes, E), E = E.parentNode), x.tagName == "BR" && (L = [].indexOf.call(x.parentNode.childNodes, x), x = x.parentNode);
                        var z = document.createRange();
                        z.setStart(E, O), z.setEnd(x, L), M.removeAllRanges(), M.addRange(z);
                      }
                    } else
                      M.removeAllRanges(), this.root.blur(), document.body.focus();
                }
              }
            }, {
              key: "setRange",
              value: function(E) {
                var O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, x = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : g.default.sources.API;
                if (typeof O == "string" && (x = O, O = !1), s.info("setRange", E), E != null) {
                  var L = this.rangeToNative(E);
                  this.setNativeRange.apply(this, d(L).concat([O]));
                } else
                  this.setNativeRange(null);
                this.update(x);
              }
            }, {
              key: "update",
              value: function() {
                var E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : g.default.sources.USER, O = this.lastRange, x = this.getRange(), L = h(x, 2), A = L[0], M = L[1];
                if (this.lastRange = A, this.lastRange != null && (this.savedRange = this.lastRange), !(0, r.default)(O, this.lastRange)) {
                  var j;
                  !this.composing && M != null && M.native.collapsed && M.start.node !== this.cursor.textNode && this.cursor.restore();
                  var z = [g.default.events.SELECTION_CHANGE, (0, p.default)(this.lastRange), (0, p.default)(O), E];
                  if ((j = this.emitter).emit.apply(j, [g.default.events.EDITOR_CHANGE].concat(z)), E !== g.default.sources.SILENT) {
                    var G;
                    (G = this.emitter).emit.apply(G, z);
                  }
                }
              }
            }]), S;
          }();
          function C(S, N) {
            try {
              N.parentNode;
            } catch {
              return !1;
            }
            return N instanceof Text && (N = N.parentNode), S.contains(N);
          }
          i.Range = w, i.default = F;
        },
        /* 16 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = /* @__PURE__ */ function() {
            function g(m, c) {
              for (var u = 0; u < c.length; u++) {
                var d = c[u];
                d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(m, d.key, d);
              }
            }
            return function(m, c, u) {
              return c && g(m.prototype, c), u && g(m, u), m;
            };
          }(), f = function g(m, c, u) {
            m === null && (m = Function.prototype);
            var d = Object.getOwnPropertyDescriptor(m, c);
            if (d === void 0) {
              var _ = Object.getPrototypeOf(m);
              return _ === null ? void 0 : g(_, c, u);
            } else {
              if ("value" in d)
                return d.value;
              var s = d.get;
              return s === void 0 ? void 0 : s.call(u);
            }
          }, v = o(0), b = y(v);
          function y(g) {
            return g && g.__esModule ? g : { default: g };
          }
          function p(g, m) {
            if (!(g instanceof m))
              throw new TypeError("Cannot call a class as a function");
          }
          function a(g, m) {
            if (!g)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return m && (typeof m == "object" || typeof m == "function") ? m : g;
          }
          function r(g, m) {
            if (typeof m != "function" && m !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof m);
            g.prototype = Object.create(m && m.prototype, { constructor: { value: g, enumerable: !1, writable: !0, configurable: !0 } }), m && (Object.setPrototypeOf ? Object.setPrototypeOf(g, m) : g.__proto__ = m);
          }
          var l = function(g) {
            r(m, g);
            function m() {
              return p(this, m), a(this, (m.__proto__ || Object.getPrototypeOf(m)).apply(this, arguments));
            }
            return h(m, [{
              key: "insertInto",
              value: function(u, d) {
                u.children.length === 0 ? f(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "insertInto", this).call(this, u, d) : this.remove();
              }
            }, {
              key: "length",
              value: function() {
                return 0;
              }
            }, {
              key: "value",
              value: function() {
                return "";
              }
            }], [{
              key: "value",
              value: function() {
              }
            }]), m;
          }(b.default.Embed);
          l.blotName = "break", l.tagName = "BR", i.default = l;
        },
        /* 17 */
        /***/
        function(e, i, o) {
          var h = this && this.__extends || function() {
            var a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, l) {
              r.__proto__ = l;
            } || function(r, l) {
              for (var g in l) l.hasOwnProperty(g) && (r[g] = l[g]);
            };
            return function(r, l) {
              a(r, l);
              function g() {
                this.constructor = r;
              }
              r.prototype = l === null ? Object.create(l) : (g.prototype = l.prototype, new g());
            };
          }();
          Object.defineProperty(i, "__esModule", { value: !0 });
          var f = o(44), v = o(30), b = o(1), y = (
            /** @class */
            function(a) {
              h(r, a);
              function r(l) {
                var g = a.call(this, l) || this;
                return g.build(), g;
              }
              return r.prototype.appendChild = function(l) {
                this.insertBefore(l);
              }, r.prototype.attach = function() {
                a.prototype.attach.call(this), this.children.forEach(function(l) {
                  l.attach();
                });
              }, r.prototype.build = function() {
                var l = this;
                this.children = new f.default(), [].slice.call(this.domNode.childNodes).reverse().forEach(function(g) {
                  try {
                    var m = p(g);
                    l.insertBefore(m, l.children.head || void 0);
                  } catch (c) {
                    if (c instanceof b.ParchmentError)
                      return;
                    throw c;
                  }
                });
              }, r.prototype.deleteAt = function(l, g) {
                if (l === 0 && g === this.length())
                  return this.remove();
                this.children.forEachAt(l, g, function(m, c, u) {
                  m.deleteAt(c, u);
                });
              }, r.prototype.descendant = function(l, g) {
                var m = this.children.find(g), c = m[0], u = m[1];
                return l.blotName == null && l(c) || l.blotName != null && c instanceof l ? [c, u] : c instanceof r ? c.descendant(l, u) : [null, -1];
              }, r.prototype.descendants = function(l, g, m) {
                g === void 0 && (g = 0), m === void 0 && (m = Number.MAX_VALUE);
                var c = [], u = m;
                return this.children.forEachAt(g, m, function(d, _, s) {
                  (l.blotName == null && l(d) || l.blotName != null && d instanceof l) && c.push(d), d instanceof r && (c = c.concat(d.descendants(l, _, u))), u -= s;
                }), c;
              }, r.prototype.detach = function() {
                this.children.forEach(function(l) {
                  l.detach();
                }), a.prototype.detach.call(this);
              }, r.prototype.formatAt = function(l, g, m, c) {
                this.children.forEachAt(l, g, function(u, d, _) {
                  u.formatAt(d, _, m, c);
                });
              }, r.prototype.insertAt = function(l, g, m) {
                var c = this.children.find(l), u = c[0], d = c[1];
                if (u)
                  u.insertAt(d, g, m);
                else {
                  var _ = m == null ? b.create("text", g) : b.create(g, m);
                  this.appendChild(_);
                }
              }, r.prototype.insertBefore = function(l, g) {
                if (this.statics.allowedChildren != null && !this.statics.allowedChildren.some(function(m) {
                  return l instanceof m;
                }))
                  throw new b.ParchmentError("Cannot insert " + l.statics.blotName + " into " + this.statics.blotName);
                l.insertInto(this, g);
              }, r.prototype.length = function() {
                return this.children.reduce(function(l, g) {
                  return l + g.length();
                }, 0);
              }, r.prototype.moveChildren = function(l, g) {
                this.children.forEach(function(m) {
                  l.insertBefore(m, g);
                });
              }, r.prototype.optimize = function(l) {
                if (a.prototype.optimize.call(this, l), this.children.length === 0)
                  if (this.statics.defaultChild != null) {
                    var g = b.create(this.statics.defaultChild);
                    this.appendChild(g), g.optimize(l);
                  } else
                    this.remove();
              }, r.prototype.path = function(l, g) {
                g === void 0 && (g = !1);
                var m = this.children.find(l, g), c = m[0], u = m[1], d = [[this, l]];
                return c instanceof r ? d.concat(c.path(u, g)) : (c != null && d.push([c, u]), d);
              }, r.prototype.removeChild = function(l) {
                this.children.remove(l);
              }, r.prototype.replace = function(l) {
                l instanceof r && l.moveChildren(this), a.prototype.replace.call(this, l);
              }, r.prototype.split = function(l, g) {
                if (g === void 0 && (g = !1), !g) {
                  if (l === 0)
                    return this;
                  if (l === this.length())
                    return this.next;
                }
                var m = this.clone();
                return this.parent.insertBefore(m, this.next), this.children.forEachAt(l, this.length(), function(c, u, d) {
                  c = c.split(u, g), m.appendChild(c);
                }), m;
              }, r.prototype.unwrap = function() {
                this.moveChildren(this.parent, this.next), this.remove();
              }, r.prototype.update = function(l, g) {
                var m = this, c = [], u = [];
                l.forEach(function(d) {
                  d.target === m.domNode && d.type === "childList" && (c.push.apply(c, d.addedNodes), u.push.apply(u, d.removedNodes));
                }), u.forEach(function(d) {
                  if (!(d.parentNode != null && // @ts-ignore
                  d.tagName !== "IFRAME" && document.body.compareDocumentPosition(d) & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
                    var _ = b.find(d);
                    _ != null && (_.domNode.parentNode == null || _.domNode.parentNode === m.domNode) && _.detach();
                  }
                }), c.filter(function(d) {
                  return d.parentNode == m.domNode;
                }).sort(function(d, _) {
                  return d === _ ? 0 : d.compareDocumentPosition(_) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1;
                }).forEach(function(d) {
                  var _ = null;
                  d.nextSibling != null && (_ = b.find(d.nextSibling));
                  var s = p(d);
                  (s.next != _ || s.next == null) && (s.parent != null && s.parent.removeChild(m), m.insertBefore(s, _ || void 0));
                });
              }, r;
            }(v.default)
          );
          function p(a) {
            var r = b.find(a);
            if (r == null)
              try {
                r = b.create(a);
              } catch {
                r = b.create(b.Scope.INLINE), [].slice.call(a.childNodes).forEach(function(g) {
                  r.domNode.appendChild(g);
                }), a.parentNode && a.parentNode.replaceChild(r.domNode, a), r.attach();
              }
            return r;
          }
          i.default = y;
        },
        /* 18 */
        /***/
        function(e, i, o) {
          var h = this && this.__extends || function() {
            var a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, l) {
              r.__proto__ = l;
            } || function(r, l) {
              for (var g in l) l.hasOwnProperty(g) && (r[g] = l[g]);
            };
            return function(r, l) {
              a(r, l);
              function g() {
                this.constructor = r;
              }
              r.prototype = l === null ? Object.create(l) : (g.prototype = l.prototype, new g());
            };
          }();
          Object.defineProperty(i, "__esModule", { value: !0 });
          var f = o(12), v = o(31), b = o(17), y = o(1), p = (
            /** @class */
            function(a) {
              h(r, a);
              function r(l) {
                var g = a.call(this, l) || this;
                return g.attributes = new v.default(g.domNode), g;
              }
              return r.formats = function(l) {
                if (typeof this.tagName == "string")
                  return !0;
                if (Array.isArray(this.tagName))
                  return l.tagName.toLowerCase();
              }, r.prototype.format = function(l, g) {
                var m = y.query(l);
                m instanceof f.default ? this.attributes.attribute(m, g) : g && m != null && (l !== this.statics.blotName || this.formats()[l] !== g) && this.replaceWith(l, g);
              }, r.prototype.formats = function() {
                var l = this.attributes.values(), g = this.statics.formats(this.domNode);
                return g != null && (l[this.statics.blotName] = g), l;
              }, r.prototype.replaceWith = function(l, g) {
                var m = a.prototype.replaceWith.call(this, l, g);
                return this.attributes.copy(m), m;
              }, r.prototype.update = function(l, g) {
                var m = this;
                a.prototype.update.call(this, l, g), l.some(function(c) {
                  return c.target === m.domNode && c.type === "attributes";
                }) && this.attributes.build();
              }, r.prototype.wrap = function(l, g) {
                var m = a.prototype.wrap.call(this, l, g);
                return m instanceof r && m.statics.scope === this.statics.scope && this.attributes.move(m), m;
              }, r;
            }(b.default)
          );
          i.default = p;
        },
        /* 19 */
        /***/
        function(e, i, o) {
          var h = this && this.__extends || function() {
            var y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(p, a) {
              p.__proto__ = a;
            } || function(p, a) {
              for (var r in a) a.hasOwnProperty(r) && (p[r] = a[r]);
            };
            return function(p, a) {
              y(p, a);
              function r() {
                this.constructor = p;
              }
              p.prototype = a === null ? Object.create(a) : (r.prototype = a.prototype, new r());
            };
          }();
          Object.defineProperty(i, "__esModule", { value: !0 });
          var f = o(30), v = o(1), b = (
            /** @class */
            function(y) {
              h(p, y);
              function p() {
                return y !== null && y.apply(this, arguments) || this;
              }
              return p.value = function(a) {
                return !0;
              }, p.prototype.index = function(a, r) {
                return this.domNode === a || this.domNode.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(r, 1) : -1;
              }, p.prototype.position = function(a, r) {
                var l = [].indexOf.call(this.parent.domNode.childNodes, this.domNode);
                return a > 0 && (l += 1), [this.parent.domNode, l];
              }, p.prototype.value = function() {
                var a;
                return a = {}, a[this.statics.blotName] = this.statics.value(this.domNode) || !0, a;
              }, p.scope = v.Scope.INLINE_BLOT, p;
            }(f.default)
          );
          i.default = b;
        },
        /* 20 */
        /***/
        function(e, i, o) {
          var h = o(11), f = o(3), v = {
            attributes: {
              compose: function(y, p, a) {
                typeof y != "object" && (y = {}), typeof p != "object" && (p = {});
                var r = f(!0, {}, p);
                a || (r = Object.keys(r).reduce(function(g, m) {
                  return r[m] != null && (g[m] = r[m]), g;
                }, {}));
                for (var l in y)
                  y[l] !== void 0 && p[l] === void 0 && (r[l] = y[l]);
                return Object.keys(r).length > 0 ? r : void 0;
              },
              diff: function(y, p) {
                typeof y != "object" && (y = {}), typeof p != "object" && (p = {});
                var a = Object.keys(y).concat(Object.keys(p)).reduce(function(r, l) {
                  return h(y[l], p[l]) || (r[l] = p[l] === void 0 ? null : p[l]), r;
                }, {});
                return Object.keys(a).length > 0 ? a : void 0;
              },
              transform: function(y, p, a) {
                if (typeof y != "object") return p;
                if (typeof p == "object") {
                  if (!a) return p;
                  var r = Object.keys(p).reduce(function(l, g) {
                    return y[g] === void 0 && (l[g] = p[g]), l;
                  }, {});
                  return Object.keys(r).length > 0 ? r : void 0;
                }
              }
            },
            iterator: function(y) {
              return new b(y);
            },
            length: function(y) {
              return typeof y.delete == "number" ? y.delete : typeof y.retain == "number" ? y.retain : typeof y.insert == "string" ? y.insert.length : 1;
            }
          };
          function b(y) {
            this.ops = y, this.index = 0, this.offset = 0;
          }
          b.prototype.hasNext = function() {
            return this.peekLength() < 1 / 0;
          }, b.prototype.next = function(y) {
            y || (y = 1 / 0);
            var p = this.ops[this.index];
            if (p) {
              var a = this.offset, r = v.length(p);
              if (y >= r - a ? (y = r - a, this.index += 1, this.offset = 0) : this.offset += y, typeof p.delete == "number")
                return { delete: y };
              var l = {};
              return p.attributes && (l.attributes = p.attributes), typeof p.retain == "number" ? l.retain = y : typeof p.insert == "string" ? l.insert = p.insert.substr(a, y) : l.insert = p.insert, l;
            } else
              return { retain: 1 / 0 };
          }, b.prototype.peek = function() {
            return this.ops[this.index];
          }, b.prototype.peekLength = function() {
            return this.ops[this.index] ? v.length(this.ops[this.index]) - this.offset : 1 / 0;
          }, b.prototype.peekType = function() {
            return this.ops[this.index] ? typeof this.ops[this.index].delete == "number" ? "delete" : typeof this.ops[this.index].retain == "number" ? "retain" : "insert" : "retain";
          }, b.prototype.rest = function() {
            if (this.hasNext()) {
              if (this.offset === 0)
                return this.ops.slice(this.index);
              var y = this.offset, p = this.index, a = this.next(), r = this.ops.slice(this.index);
              return this.offset = y, this.index = p, [a].concat(r);
            } else return [];
          }, e.exports = v;
        },
        /* 21 */
        /***/
        function(e, i) {
          var o = function() {
            function h(m, c) {
              return c != null && m instanceof c;
            }
            var f;
            try {
              f = Map;
            } catch {
              f = function() {
              };
            }
            var v;
            try {
              v = Set;
            } catch {
              v = function() {
              };
            }
            var b;
            try {
              b = Promise;
            } catch {
              b = function() {
              };
            }
            function y(m, c, u, d, _) {
              typeof c == "object" && (u = c.depth, d = c.prototype, _ = c.includeNonEnumerable, c = c.circular);
              var s = [], w = [], F = typeof Buffer < "u";
              typeof c > "u" && (c = !0), typeof u > "u" && (u = 1 / 0);
              function C(S, N) {
                if (S === null)
                  return null;
                if (N === 0)
                  return S;
                var E, O;
                if (typeof S != "object")
                  return S;
                if (h(S, f))
                  E = new f();
                else if (h(S, v))
                  E = new v();
                else if (h(S, b))
                  E = new b(function(P, k) {
                    S.then(function(R) {
                      P(C(R, N - 1));
                    }, function(R) {
                      k(C(R, N - 1));
                    });
                  });
                else if (y.__isArray(S))
                  E = [];
                else if (y.__isRegExp(S))
                  E = new RegExp(S.source, g(S)), S.lastIndex && (E.lastIndex = S.lastIndex);
                else if (y.__isDate(S))
                  E = new Date(S.getTime());
                else {
                  if (F && Buffer.isBuffer(S))
                    return Buffer.allocUnsafe ? E = Buffer.allocUnsafe(S.length) : E = new Buffer(S.length), S.copy(E), E;
                  h(S, Error) ? E = Object.create(S) : typeof d > "u" ? (O = Object.getPrototypeOf(S), E = Object.create(O)) : (E = Object.create(d), O = d);
                }
                if (c) {
                  var x = s.indexOf(S);
                  if (x != -1)
                    return w[x];
                  s.push(S), w.push(E);
                }
                h(S, f) && S.forEach(function(P, k) {
                  var R = C(k, N - 1), B = C(P, N - 1);
                  E.set(R, B);
                }), h(S, v) && S.forEach(function(P) {
                  var k = C(P, N - 1);
                  E.add(k);
                });
                for (var L in S) {
                  var A;
                  O && (A = Object.getOwnPropertyDescriptor(O, L)), !(A && A.set == null) && (E[L] = C(S[L], N - 1));
                }
                if (Object.getOwnPropertySymbols)
                  for (var M = Object.getOwnPropertySymbols(S), L = 0; L < M.length; L++) {
                    var j = M[L], z = Object.getOwnPropertyDescriptor(S, j);
                    z && !z.enumerable && !_ || (E[j] = C(S[j], N - 1), z.enumerable || Object.defineProperty(E, j, {
                      enumerable: !1
                    }));
                  }
                if (_)
                  for (var G = Object.getOwnPropertyNames(S), L = 0; L < G.length; L++) {
                    var D = G[L], z = Object.getOwnPropertyDescriptor(S, D);
                    z && z.enumerable || (E[D] = C(S[D], N - 1), Object.defineProperty(E, D, {
                      enumerable: !1
                    }));
                  }
                return E;
              }
              return C(m, u);
            }
            y.clonePrototype = function(c) {
              if (c === null)
                return null;
              var u = function() {
              };
              return u.prototype = c, new u();
            };
            function p(m) {
              return Object.prototype.toString.call(m);
            }
            y.__objToStr = p;
            function a(m) {
              return typeof m == "object" && p(m) === "[object Date]";
            }
            y.__isDate = a;
            function r(m) {
              return typeof m == "object" && p(m) === "[object Array]";
            }
            y.__isArray = r;
            function l(m) {
              return typeof m == "object" && p(m) === "[object RegExp]";
            }
            y.__isRegExp = l;
            function g(m) {
              var c = "";
              return m.global && (c += "g"), m.ignoreCase && (c += "i"), m.multiline && (c += "m"), c;
            }
            return y.__getRegExpFlags = g, y;
          }();
          typeof e == "object" && e.exports && (e.exports = o);
        },
        /* 22 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = /* @__PURE__ */ function() {
            function E(O, x) {
              var L = [], A = !0, M = !1, j = void 0;
              try {
                for (var z = O[Symbol.iterator](), G; !(A = (G = z.next()).done) && (L.push(G.value), !(x && L.length === x)); A = !0)
                  ;
              } catch (D) {
                M = !0, j = D;
              } finally {
                try {
                  !A && z.return && z.return();
                } finally {
                  if (M) throw j;
                }
              }
              return L;
            }
            return function(O, x) {
              if (Array.isArray(O))
                return O;
              if (Symbol.iterator in Object(O))
                return E(O, x);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), f = /* @__PURE__ */ function() {
            function E(O, x) {
              for (var L = 0; L < x.length; L++) {
                var A = x[L];
                A.enumerable = A.enumerable || !1, A.configurable = !0, "value" in A && (A.writable = !0), Object.defineProperty(O, A.key, A);
              }
            }
            return function(O, x, L) {
              return x && E(O.prototype, x), L && E(O, L), O;
            };
          }(), v = function E(O, x, L) {
            O === null && (O = Function.prototype);
            var A = Object.getOwnPropertyDescriptor(O, x);
            if (A === void 0) {
              var M = Object.getPrototypeOf(O);
              return M === null ? void 0 : E(M, x, L);
            } else {
              if ("value" in A)
                return A.value;
              var j = A.get;
              return j === void 0 ? void 0 : j.call(L);
            }
          }, b = o(0), y = s(b), p = o(8), a = s(p), r = o(4), l = s(r), g = o(16), m = s(g), c = o(13), u = s(c), d = o(25), _ = s(d);
          function s(E) {
            return E && E.__esModule ? E : { default: E };
          }
          function w(E, O) {
            if (!(E instanceof O))
              throw new TypeError("Cannot call a class as a function");
          }
          function F(E, O) {
            if (!E)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return O && (typeof O == "object" || typeof O == "function") ? O : E;
          }
          function C(E, O) {
            if (typeof O != "function" && O !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof O);
            E.prototype = Object.create(O && O.prototype, { constructor: { value: E, enumerable: !1, writable: !0, configurable: !0 } }), O && (Object.setPrototypeOf ? Object.setPrototypeOf(E, O) : E.__proto__ = O);
          }
          function S(E) {
            return E instanceof l.default || E instanceof r.BlockEmbed;
          }
          var N = function(E) {
            C(O, E);
            function O(x, L) {
              w(this, O);
              var A = F(this, (O.__proto__ || Object.getPrototypeOf(O)).call(this, x));
              return A.emitter = L.emitter, Array.isArray(L.whitelist) && (A.whitelist = L.whitelist.reduce(function(M, j) {
                return M[j] = !0, M;
              }, {})), A.domNode.addEventListener("DOMNodeInserted", function() {
              }), A.optimize(), A.enable(), A;
            }
            return f(O, [{
              key: "batchStart",
              value: function() {
                this.batch = !0;
              }
            }, {
              key: "batchEnd",
              value: function() {
                this.batch = !1, this.optimize();
              }
            }, {
              key: "deleteAt",
              value: function(L, A) {
                var M = this.line(L), j = h(M, 2), z = j[0], G = j[1], D = this.line(L + A), P = h(D, 1), k = P[0];
                if (v(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "deleteAt", this).call(this, L, A), k != null && z !== k && G > 0) {
                  if (z instanceof r.BlockEmbed || k instanceof r.BlockEmbed) {
                    this.optimize();
                    return;
                  }
                  if (z instanceof u.default) {
                    var R = z.newlineIndex(z.length(), !0);
                    if (R > -1 && (z = z.split(R + 1), z === k)) {
                      this.optimize();
                      return;
                    }
                  } else if (k instanceof u.default) {
                    var B = k.newlineIndex(0);
                    B > -1 && k.split(B + 1);
                  }
                  var q = k.children.head instanceof m.default ? null : k.children.head;
                  z.moveChildren(k, q), z.remove();
                }
                this.optimize();
              }
            }, {
              key: "enable",
              value: function() {
                var L = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
                this.domNode.setAttribute("contenteditable", L);
              }
            }, {
              key: "formatAt",
              value: function(L, A, M, j) {
                this.whitelist != null && !this.whitelist[M] || (v(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "formatAt", this).call(this, L, A, M, j), this.optimize());
              }
            }, {
              key: "insertAt",
              value: function(L, A, M) {
                if (!(M != null && this.whitelist != null && !this.whitelist[A])) {
                  if (L >= this.length())
                    if (M == null || y.default.query(A, y.default.Scope.BLOCK) == null) {
                      var j = y.default.create(this.statics.defaultChild);
                      this.appendChild(j), M == null && A.endsWith(`
`) && (A = A.slice(0, -1)), j.insertAt(0, A, M);
                    } else {
                      var z = y.default.create(A, M);
                      this.appendChild(z);
                    }
                  else
                    v(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "insertAt", this).call(this, L, A, M);
                  this.optimize();
                }
              }
            }, {
              key: "insertBefore",
              value: function(L, A) {
                if (L.statics.scope === y.default.Scope.INLINE_BLOT) {
                  var M = y.default.create(this.statics.defaultChild);
                  M.appendChild(L), L = M;
                }
                v(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "insertBefore", this).call(this, L, A);
              }
            }, {
              key: "leaf",
              value: function(L) {
                return this.path(L).pop() || [null, -1];
              }
            }, {
              key: "line",
              value: function(L) {
                return L === this.length() ? this.line(L - 1) : this.descendant(S, L);
              }
            }, {
              key: "lines",
              value: function() {
                var L = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, A = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE, M = function j(z, G, D) {
                  var P = [], k = D;
                  return z.children.forEachAt(G, D, function(R, B, q) {
                    S(R) ? P.push(R) : R instanceof y.default.Container && (P = P.concat(j(R, B, k))), k -= q;
                  }), P;
                };
                return M(this, L, A);
              }
            }, {
              key: "optimize",
              value: function() {
                var L = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], A = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                this.batch !== !0 && (v(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "optimize", this).call(this, L, A), L.length > 0 && this.emitter.emit(a.default.events.SCROLL_OPTIMIZE, L, A));
              }
            }, {
              key: "path",
              value: function(L) {
                return v(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "path", this).call(this, L).slice(1);
              }
            }, {
              key: "update",
              value: function(L) {
                if (this.batch !== !0) {
                  var A = a.default.sources.USER;
                  typeof L == "string" && (A = L), Array.isArray(L) || (L = this.observer.takeRecords()), L.length > 0 && this.emitter.emit(a.default.events.SCROLL_BEFORE_UPDATE, A, L), v(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "update", this).call(this, L.concat([])), L.length > 0 && this.emitter.emit(a.default.events.SCROLL_UPDATE, A, L);
                }
              }
            }]), O;
          }(y.default.Scroll);
          N.blotName = "scroll", N.className = "ql-editor", N.tagName = "DIV", N.defaultChild = "block", N.allowedChildren = [l.default, r.BlockEmbed, _.default], i.default = N;
        },
        /* 23 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.SHORTKEY = i.default = void 0;
          var h = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(T) {
            return typeof T;
          } : function(T) {
            return T && typeof Symbol == "function" && T.constructor === Symbol && T !== Symbol.prototype ? "symbol" : typeof T;
          }, f = /* @__PURE__ */ function() {
            function T(I, H) {
              var W = [], K = !0, X = !1, Q = void 0;
              try {
                for (var ee = I[Symbol.iterator](), oe; !(K = (oe = ee.next()).done) && (W.push(oe.value), !(H && W.length === H)); K = !0)
                  ;
              } catch (re) {
                X = !0, Q = re;
              } finally {
                try {
                  !K && ee.return && ee.return();
                } finally {
                  if (X) throw Q;
                }
              }
              return W;
            }
            return function(I, H) {
              if (Array.isArray(I))
                return I;
              if (Symbol.iterator in Object(I))
                return T(I, H);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), v = /* @__PURE__ */ function() {
            function T(I, H) {
              for (var W = 0; W < H.length; W++) {
                var K = H[W];
                K.enumerable = K.enumerable || !1, K.configurable = !0, "value" in K && (K.writable = !0), Object.defineProperty(I, K.key, K);
              }
            }
            return function(I, H, W) {
              return H && T(I.prototype, H), W && T(I, W), I;
            };
          }(), b = o(21), y = E(b), p = o(11), a = E(p), r = o(3), l = E(r), g = o(2), m = E(g), c = o(20), u = E(c), d = o(0), _ = E(d), s = o(5), w = E(s), F = o(10), C = E(F), S = o(9), N = E(S);
          function E(T) {
            return T && T.__esModule ? T : { default: T };
          }
          function O(T, I, H) {
            return I in T ? Object.defineProperty(T, I, { value: H, enumerable: !0, configurable: !0, writable: !0 }) : T[I] = H, T;
          }
          function x(T, I) {
            if (!(T instanceof I))
              throw new TypeError("Cannot call a class as a function");
          }
          function L(T, I) {
            if (!T)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return I && (typeof I == "object" || typeof I == "function") ? I : T;
          }
          function A(T, I) {
            if (typeof I != "function" && I !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof I);
            T.prototype = Object.create(I && I.prototype, { constructor: { value: T, enumerable: !1, writable: !0, configurable: !0 } }), I && (Object.setPrototypeOf ? Object.setPrototypeOf(T, I) : T.__proto__ = I);
          }
          var M = (0, C.default)("quill:keyboard"), j = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey", z = function(T) {
            A(I, T), v(I, null, [{
              key: "match",
              value: function(W, K) {
                return K = V(K), ["altKey", "ctrlKey", "metaKey", "shiftKey"].some(function(X) {
                  return !!K[X] !== W[X] && K[X] !== null;
                }) ? !1 : K.key === (W.which || W.keyCode);
              }
            }]);
            function I(H, W) {
              x(this, I);
              var K = L(this, (I.__proto__ || Object.getPrototypeOf(I)).call(this, H, W));
              return K.bindings = {}, Object.keys(K.options.bindings).forEach(function(X) {
                X === "list autofill" && H.scroll.whitelist != null && !H.scroll.whitelist.list || K.options.bindings[X] && K.addBinding(K.options.bindings[X]);
              }), K.addBinding({ key: I.keys.ENTER, shiftKey: null }, R), K.addBinding({ key: I.keys.ENTER, metaKey: null, ctrlKey: null, altKey: null }, function() {
              }), /Firefox/i.test(navigator.userAgent) ? (K.addBinding({ key: I.keys.BACKSPACE }, { collapsed: !0 }, D), K.addBinding({ key: I.keys.DELETE }, { collapsed: !0 }, P)) : (K.addBinding({ key: I.keys.BACKSPACE }, { collapsed: !0, prefix: /^.?$/ }, D), K.addBinding({ key: I.keys.DELETE }, { collapsed: !0, suffix: /^.?$/ }, P)), K.addBinding({ key: I.keys.BACKSPACE }, { collapsed: !1 }, k), K.addBinding({ key: I.keys.DELETE }, { collapsed: !1 }, k), K.addBinding({ key: I.keys.BACKSPACE, altKey: null, ctrlKey: null, metaKey: null, shiftKey: null }, { collapsed: !0, offset: 0 }, D), K.listen(), K;
            }
            return v(I, [{
              key: "addBinding",
              value: function(W) {
                var K = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, X = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, Q = V(W);
                if (Q == null || Q.key == null)
                  return M.warn("Attempted to add invalid keyboard binding", Q);
                typeof K == "function" && (K = { handler: K }), typeof X == "function" && (X = { handler: X }), Q = (0, l.default)(Q, K, X), this.bindings[Q.key] = this.bindings[Q.key] || [], this.bindings[Q.key].push(Q);
              }
            }, {
              key: "listen",
              value: function() {
                var W = this;
                this.quill.root.addEventListener("keydown", function(K) {
                  if (!K.defaultPrevented) {
                    var X = K.which || K.keyCode, Q = (W.bindings[X] || []).filter(function(ae) {
                      return I.match(K, ae);
                    });
                    if (Q.length !== 0) {
                      var ee = W.quill.getSelection();
                      if (!(ee == null || !W.quill.hasFocus())) {
                        var oe = W.quill.getLine(ee.index), re = f(oe, 2), ue = re[0], se = re[1], U = W.quill.getLeaf(ee.index), $ = f(U, 2), J = $[0], Y = $[1], Z = ee.length === 0 ? [J, Y] : W.quill.getLeaf(ee.index + ee.length), te = f(Z, 2), ne = te[0], ie = te[1], de = J instanceof _.default.Text ? J.value().slice(0, Y) : "", ce = ne instanceof _.default.Text ? ne.value().slice(ie) : "", le = {
                          collapsed: ee.length === 0,
                          empty: ee.length === 0 && ue.length() <= 1,
                          format: W.quill.getFormat(ee),
                          offset: se,
                          prefix: de,
                          suffix: ce
                        }, me = Q.some(function(ae) {
                          if (ae.collapsed != null && ae.collapsed !== le.collapsed || ae.empty != null && ae.empty !== le.empty || ae.offset != null && ae.offset !== le.offset) return !1;
                          if (Array.isArray(ae.format)) {
                            if (ae.format.every(function(fe) {
                              return le.format[fe] == null;
                            }))
                              return !1;
                          } else if (h(ae.format) === "object" && !Object.keys(ae.format).every(function(fe) {
                            return ae.format[fe] === !0 ? le.format[fe] != null : ae.format[fe] === !1 ? le.format[fe] == null : (0, a.default)(ae.format[fe], le.format[fe]);
                          }))
                            return !1;
                          return ae.prefix != null && !ae.prefix.test(le.prefix) || ae.suffix != null && !ae.suffix.test(le.suffix) ? !1 : ae.handler.call(W, ee, le) !== !0;
                        });
                        me && K.preventDefault();
                      }
                    }
                  }
                });
              }
            }]), I;
          }(N.default);
          z.keys = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            ESCAPE: 27,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            DELETE: 46
          }, z.DEFAULTS = {
            bindings: {
              bold: q("bold"),
              italic: q("italic"),
              underline: q("underline"),
              indent: {
                // highlight tab or tab at beginning of list, indent or blockquote
                key: z.keys.TAB,
                format: ["blockquote", "indent", "list"],
                handler: function(I, H) {
                  if (H.collapsed && H.offset !== 0) return !0;
                  this.quill.format("indent", "+1", w.default.sources.USER);
                }
              },
              outdent: {
                key: z.keys.TAB,
                shiftKey: !0,
                format: ["blockquote", "indent", "list"],
                // highlight tab or tab at beginning of list, indent or blockquote
                handler: function(I, H) {
                  if (H.collapsed && H.offset !== 0) return !0;
                  this.quill.format("indent", "-1", w.default.sources.USER);
                }
              },
              "outdent backspace": {
                key: z.keys.BACKSPACE,
                collapsed: !0,
                shiftKey: null,
                metaKey: null,
                ctrlKey: null,
                altKey: null,
                format: ["indent", "list"],
                offset: 0,
                handler: function(I, H) {
                  H.format.indent != null ? this.quill.format("indent", "-1", w.default.sources.USER) : H.format.list != null && this.quill.format("list", !1, w.default.sources.USER);
                }
              },
              "indent code-block": B(!0),
              "outdent code-block": B(!1),
              "remove tab": {
                key: z.keys.TAB,
                shiftKey: !0,
                collapsed: !0,
                prefix: /\t$/,
                handler: function(I) {
                  this.quill.deleteText(I.index - 1, 1, w.default.sources.USER);
                }
              },
              tab: {
                key: z.keys.TAB,
                handler: function(I) {
                  this.quill.history.cutoff();
                  var H = new m.default().retain(I.index).delete(I.length).insert("	");
                  this.quill.updateContents(H, w.default.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(I.index + 1, w.default.sources.SILENT);
                }
              },
              "list empty enter": {
                key: z.keys.ENTER,
                collapsed: !0,
                format: ["list"],
                empty: !0,
                handler: function(I, H) {
                  this.quill.format("list", !1, w.default.sources.USER), H.format.indent && this.quill.format("indent", !1, w.default.sources.USER);
                }
              },
              "checklist enter": {
                key: z.keys.ENTER,
                collapsed: !0,
                format: { list: "checked" },
                handler: function(I) {
                  var H = this.quill.getLine(I.index), W = f(H, 2), K = W[0], X = W[1], Q = (0, l.default)({}, K.formats(), { list: "checked" }), ee = new m.default().retain(I.index).insert(`
`, Q).retain(K.length() - X - 1).retain(1, { list: "unchecked" });
                  this.quill.updateContents(ee, w.default.sources.USER), this.quill.setSelection(I.index + 1, w.default.sources.SILENT), this.quill.scrollIntoView();
                }
              },
              "header enter": {
                key: z.keys.ENTER,
                collapsed: !0,
                format: ["header"],
                suffix: /^$/,
                handler: function(I, H) {
                  var W = this.quill.getLine(I.index), K = f(W, 2), X = K[0], Q = K[1], ee = new m.default().retain(I.index).insert(`
`, H.format).retain(X.length() - Q - 1).retain(1, { header: null });
                  this.quill.updateContents(ee, w.default.sources.USER), this.quill.setSelection(I.index + 1, w.default.sources.SILENT), this.quill.scrollIntoView();
                }
              },
              "list autofill": {
                key: " ",
                collapsed: !0,
                format: { list: !1 },
                prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
                handler: function(I, H) {
                  var W = H.prefix.length, K = this.quill.getLine(I.index), X = f(K, 2), Q = X[0], ee = X[1];
                  if (ee > W) return !0;
                  var oe = void 0;
                  switch (H.prefix.trim()) {
                    case "[]":
                    case "[ ]":
                      oe = "unchecked";
                      break;
                    case "[x]":
                      oe = "checked";
                      break;
                    case "-":
                    case "*":
                      oe = "bullet";
                      break;
                    default:
                      oe = "ordered";
                  }
                  this.quill.insertText(I.index, " ", w.default.sources.USER), this.quill.history.cutoff();
                  var re = new m.default().retain(I.index - ee).delete(W + 1).retain(Q.length() - 2 - ee).retain(1, { list: oe });
                  this.quill.updateContents(re, w.default.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(I.index - W, w.default.sources.SILENT);
                }
              },
              "code exit": {
                key: z.keys.ENTER,
                collapsed: !0,
                format: ["code-block"],
                prefix: /\n\n$/,
                suffix: /^\s+$/,
                handler: function(I) {
                  var H = this.quill.getLine(I.index), W = f(H, 2), K = W[0], X = W[1], Q = new m.default().retain(I.index + K.length() - X - 2).retain(1, { "code-block": null }).delete(1);
                  this.quill.updateContents(Q, w.default.sources.USER);
                }
              },
              "embed left": G(z.keys.LEFT, !1),
              "embed left shift": G(z.keys.LEFT, !0),
              "embed right": G(z.keys.RIGHT, !1),
              "embed right shift": G(z.keys.RIGHT, !0)
            }
          };
          function G(T, I) {
            var H, W = T === z.keys.LEFT ? "prefix" : "suffix";
            return H = {
              key: T,
              shiftKey: I,
              altKey: null
            }, O(H, W, /^$/), O(H, "handler", function(X) {
              var Q = X.index;
              T === z.keys.RIGHT && (Q += X.length + 1);
              var ee = this.quill.getLeaf(Q), oe = f(ee, 1), re = oe[0];
              return re instanceof _.default.Embed ? (T === z.keys.LEFT ? I ? this.quill.setSelection(X.index - 1, X.length + 1, w.default.sources.USER) : this.quill.setSelection(X.index - 1, w.default.sources.USER) : I ? this.quill.setSelection(X.index, X.length + 1, w.default.sources.USER) : this.quill.setSelection(X.index + X.length + 1, w.default.sources.USER), !1) : !0;
            }), H;
          }
          function D(T, I) {
            if (!(T.index === 0 || this.quill.getLength() <= 1)) {
              var H = this.quill.getLine(T.index), W = f(H, 1), K = W[0], X = {};
              if (I.offset === 0) {
                var Q = this.quill.getLine(T.index - 1), ee = f(Q, 1), oe = ee[0];
                if (oe != null && oe.length() > 1) {
                  var re = K.formats(), ue = this.quill.getFormat(T.index - 1, 1);
                  X = u.default.attributes.diff(re, ue) || {};
                }
              }
              var se = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(I.prefix) ? 2 : 1;
              this.quill.deleteText(T.index - se, se, w.default.sources.USER), Object.keys(X).length > 0 && this.quill.formatLine(T.index - se, se, X, w.default.sources.USER), this.quill.focus();
            }
          }
          function P(T, I) {
            var H = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(I.suffix) ? 2 : 1;
            if (!(T.index >= this.quill.getLength() - H)) {
              var W = {}, K = 0, X = this.quill.getLine(T.index), Q = f(X, 1), ee = Q[0];
              if (I.offset >= ee.length() - 1) {
                var oe = this.quill.getLine(T.index + 1), re = f(oe, 1), ue = re[0];
                if (ue) {
                  var se = ee.formats(), U = this.quill.getFormat(T.index, 1);
                  W = u.default.attributes.diff(se, U) || {}, K = ue.length();
                }
              }
              this.quill.deleteText(T.index, H, w.default.sources.USER), Object.keys(W).length > 0 && this.quill.formatLine(T.index + K - 1, H, W, w.default.sources.USER);
            }
          }
          function k(T) {
            var I = this.quill.getLines(T), H = {};
            if (I.length > 1) {
              var W = I[0].formats(), K = I[I.length - 1].formats();
              H = u.default.attributes.diff(K, W) || {};
            }
            this.quill.deleteText(T, w.default.sources.USER), Object.keys(H).length > 0 && this.quill.formatLine(T.index, 1, H, w.default.sources.USER), this.quill.setSelection(T.index, w.default.sources.SILENT), this.quill.focus();
          }
          function R(T, I) {
            var H = this;
            T.length > 0 && this.quill.scroll.deleteAt(T.index, T.length);
            var W = Object.keys(I.format).reduce(function(K, X) {
              return _.default.query(X, _.default.Scope.BLOCK) && !Array.isArray(I.format[X]) && (K[X] = I.format[X]), K;
            }, {});
            this.quill.insertText(T.index, `
`, W, w.default.sources.USER), this.quill.setSelection(T.index + 1, w.default.sources.SILENT), this.quill.focus(), Object.keys(I.format).forEach(function(K) {
              W[K] == null && (Array.isArray(I.format[K]) || K !== "link" && H.quill.format(K, I.format[K], w.default.sources.USER));
            });
          }
          function B(T) {
            return {
              key: z.keys.TAB,
              shiftKey: !T,
              format: { "code-block": !0 },
              handler: function(H) {
                var W = _.default.query("code-block"), K = H.index, X = H.length, Q = this.quill.scroll.descendant(W, K), ee = f(Q, 2), oe = ee[0], re = ee[1];
                if (oe != null) {
                  var ue = this.quill.getIndex(oe), se = oe.newlineIndex(re, !0) + 1, U = oe.newlineIndex(ue + re + X), $ = oe.domNode.textContent.slice(se, U).split(`
`);
                  re = 0, $.forEach(function(J, Y) {
                    T ? (oe.insertAt(se + re, W.TAB), re += W.TAB.length, Y === 0 ? K += W.TAB.length : X += W.TAB.length) : J.startsWith(W.TAB) && (oe.deleteAt(se + re, W.TAB.length), re -= W.TAB.length, Y === 0 ? K -= W.TAB.length : X -= W.TAB.length), re += J.length + 1;
                  }), this.quill.update(w.default.sources.USER), this.quill.setSelection(K, X, w.default.sources.SILENT);
                }
              }
            };
          }
          function q(T) {
            return {
              key: T[0].toUpperCase(),
              shortKey: !0,
              handler: function(H, W) {
                this.quill.format(T, !W.format[T], w.default.sources.USER);
              }
            };
          }
          function V(T) {
            if (typeof T == "string" || typeof T == "number")
              return V({ key: T });
            if ((typeof T > "u" ? "undefined" : h(T)) === "object" && (T = (0, y.default)(T, !1)), typeof T.key == "string")
              if (z.keys[T.key.toUpperCase()] != null)
                T.key = z.keys[T.key.toUpperCase()];
              else if (T.key.length === 1)
                T.key = T.key.toUpperCase().charCodeAt(0);
              else
                return null;
            return T.shortKey && (T[j] = T.shortKey, delete T.shortKey), T;
          }
          i.default = z, i.SHORTKEY = j;
        },
        /* 24 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = /* @__PURE__ */ function() {
            function u(d, _) {
              var s = [], w = !0, F = !1, C = void 0;
              try {
                for (var S = d[Symbol.iterator](), N; !(w = (N = S.next()).done) && (s.push(N.value), !(_ && s.length === _)); w = !0)
                  ;
              } catch (E) {
                F = !0, C = E;
              } finally {
                try {
                  !w && S.return && S.return();
                } finally {
                  if (F) throw C;
                }
              }
              return s;
            }
            return function(d, _) {
              if (Array.isArray(d))
                return d;
              if (Symbol.iterator in Object(d))
                return u(d, _);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), f = function u(d, _, s) {
            d === null && (d = Function.prototype);
            var w = Object.getOwnPropertyDescriptor(d, _);
            if (w === void 0) {
              var F = Object.getPrototypeOf(d);
              return F === null ? void 0 : u(F, _, s);
            } else {
              if ("value" in w)
                return w.value;
              var C = w.get;
              return C === void 0 ? void 0 : C.call(s);
            }
          }, v = /* @__PURE__ */ function() {
            function u(d, _) {
              for (var s = 0; s < _.length; s++) {
                var w = _[s];
                w.enumerable = w.enumerable || !1, w.configurable = !0, "value" in w && (w.writable = !0), Object.defineProperty(d, w.key, w);
              }
            }
            return function(d, _, s) {
              return _ && u(d.prototype, _), s && u(d, s), d;
            };
          }(), b = o(0), y = r(b), p = o(7), a = r(p);
          function r(u) {
            return u && u.__esModule ? u : { default: u };
          }
          function l(u, d) {
            if (!(u instanceof d))
              throw new TypeError("Cannot call a class as a function");
          }
          function g(u, d) {
            if (!u)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return d && (typeof d == "object" || typeof d == "function") ? d : u;
          }
          function m(u, d) {
            if (typeof d != "function" && d !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof d);
            u.prototype = Object.create(d && d.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), d && (Object.setPrototypeOf ? Object.setPrototypeOf(u, d) : u.__proto__ = d);
          }
          var c = function(u) {
            m(d, u), v(d, null, [{
              key: "value",
              value: function() {
              }
            }]);
            function d(_, s) {
              l(this, d);
              var w = g(this, (d.__proto__ || Object.getPrototypeOf(d)).call(this, _));
              return w.selection = s, w.textNode = document.createTextNode(d.CONTENTS), w.domNode.appendChild(w.textNode), w._length = 0, w;
            }
            return v(d, [{
              key: "detach",
              value: function() {
                this.parent != null && this.parent.removeChild(this);
              }
            }, {
              key: "format",
              value: function(s, w) {
                if (this._length !== 0)
                  return f(d.prototype.__proto__ || Object.getPrototypeOf(d.prototype), "format", this).call(this, s, w);
                for (var F = this, C = 0; F != null && F.statics.scope !== y.default.Scope.BLOCK_BLOT; )
                  C += F.offset(F.parent), F = F.parent;
                F != null && (this._length = d.CONTENTS.length, F.optimize(), F.formatAt(C, d.CONTENTS.length, s, w), this._length = 0);
              }
            }, {
              key: "index",
              value: function(s, w) {
                return s === this.textNode ? 0 : f(d.prototype.__proto__ || Object.getPrototypeOf(d.prototype), "index", this).call(this, s, w);
              }
            }, {
              key: "length",
              value: function() {
                return this._length;
              }
            }, {
              key: "position",
              value: function() {
                return [this.textNode, this.textNode.data.length];
              }
            }, {
              key: "remove",
              value: function() {
                f(d.prototype.__proto__ || Object.getPrototypeOf(d.prototype), "remove", this).call(this), this.parent = null;
              }
            }, {
              key: "restore",
              value: function() {
                if (!(this.selection.composing || this.parent == null)) {
                  var s = this.textNode, w = this.selection.getNativeRange(), F = void 0, C = void 0, S = void 0;
                  if (w != null && w.start.node === s && w.end.node === s) {
                    var N = [s, w.start.offset, w.end.offset];
                    F = N[0], C = N[1], S = N[2];
                  }
                  for (; this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode; )
                    this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
                  if (this.textNode.data !== d.CONTENTS) {
                    var E = this.textNode.data.split(d.CONTENTS).join("");
                    this.next instanceof a.default ? (F = this.next.domNode, this.next.insertAt(0, E), this.textNode.data = d.CONTENTS) : (this.textNode.data = E, this.parent.insertBefore(y.default.create(this.textNode), this), this.textNode = document.createTextNode(d.CONTENTS), this.domNode.appendChild(this.textNode));
                  }
                  if (this.remove(), C != null) {
                    var O = [C, S].map(function(L) {
                      return Math.max(0, Math.min(F.data.length, L - 1));
                    }), x = h(O, 2);
                    return C = x[0], S = x[1], {
                      startNode: F,
                      startOffset: C,
                      endNode: F,
                      endOffset: S
                    };
                  }
                }
              }
            }, {
              key: "update",
              value: function(s, w) {
                var F = this;
                if (s.some(function(S) {
                  return S.type === "characterData" && S.target === F.textNode;
                })) {
                  var C = this.restore();
                  C && (w.range = C);
                }
              }
            }, {
              key: "value",
              value: function() {
                return "";
              }
            }]), d;
          }(y.default.Embed);
          c.blotName = "cursor", c.className = "ql-cursor", c.tagName = "span", c.CONTENTS = "\uFEFF", i.default = c;
        },
        /* 25 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = o(0), f = y(h), v = o(4), b = y(v);
          function y(g) {
            return g && g.__esModule ? g : { default: g };
          }
          function p(g, m) {
            if (!(g instanceof m))
              throw new TypeError("Cannot call a class as a function");
          }
          function a(g, m) {
            if (!g)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return m && (typeof m == "object" || typeof m == "function") ? m : g;
          }
          function r(g, m) {
            if (typeof m != "function" && m !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof m);
            g.prototype = Object.create(m && m.prototype, { constructor: { value: g, enumerable: !1, writable: !0, configurable: !0 } }), m && (Object.setPrototypeOf ? Object.setPrototypeOf(g, m) : g.__proto__ = m);
          }
          var l = function(g) {
            r(m, g);
            function m() {
              return p(this, m), a(this, (m.__proto__ || Object.getPrototypeOf(m)).apply(this, arguments));
            }
            return m;
          }(f.default.Container);
          l.allowedChildren = [b.default, v.BlockEmbed, l], i.default = l;
        },
        /* 26 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.ColorStyle = i.ColorClass = i.ColorAttributor = void 0;
          var h = /* @__PURE__ */ function() {
            function c(u, d) {
              for (var _ = 0; _ < d.length; _++) {
                var s = d[_];
                s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(u, s.key, s);
              }
            }
            return function(u, d, _) {
              return d && c(u.prototype, d), _ && c(u, _), u;
            };
          }(), f = function c(u, d, _) {
            u === null && (u = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(u, d);
            if (s === void 0) {
              var w = Object.getPrototypeOf(u);
              return w === null ? void 0 : c(w, d, _);
            } else {
              if ("value" in s)
                return s.value;
              var F = s.get;
              return F === void 0 ? void 0 : F.call(_);
            }
          }, v = o(0), b = y(v);
          function y(c) {
            return c && c.__esModule ? c : { default: c };
          }
          function p(c, u) {
            if (!(c instanceof u))
              throw new TypeError("Cannot call a class as a function");
          }
          function a(c, u) {
            if (!c)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return u && (typeof u == "object" || typeof u == "function") ? u : c;
          }
          function r(c, u) {
            if (typeof u != "function" && u !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof u);
            c.prototype = Object.create(u && u.prototype, { constructor: { value: c, enumerable: !1, writable: !0, configurable: !0 } }), u && (Object.setPrototypeOf ? Object.setPrototypeOf(c, u) : c.__proto__ = u);
          }
          var l = function(c) {
            r(u, c);
            function u() {
              return p(this, u), a(this, (u.__proto__ || Object.getPrototypeOf(u)).apply(this, arguments));
            }
            return h(u, [{
              key: "value",
              value: function(_) {
                var s = f(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "value", this).call(this, _);
                return s.startsWith("rgb(") ? (s = s.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), "#" + s.split(",").map(function(w) {
                  return ("00" + parseInt(w).toString(16)).slice(-2);
                }).join("")) : s;
              }
            }]), u;
          }(b.default.Attributor.Style), g = new b.default.Attributor.Class("color", "ql-color", {
            scope: b.default.Scope.INLINE
          }), m = new l("color", "color", {
            scope: b.default.Scope.INLINE
          });
          i.ColorAttributor = l, i.ColorClass = g, i.ColorStyle = m;
        },
        /* 27 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.sanitize = i.default = void 0;
          var h = /* @__PURE__ */ function() {
            function m(c, u) {
              for (var d = 0; d < u.length; d++) {
                var _ = u[d];
                _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(c, _.key, _);
              }
            }
            return function(c, u, d) {
              return u && m(c.prototype, u), d && m(c, d), c;
            };
          }(), f = function m(c, u, d) {
            c === null && (c = Function.prototype);
            var _ = Object.getOwnPropertyDescriptor(c, u);
            if (_ === void 0) {
              var s = Object.getPrototypeOf(c);
              return s === null ? void 0 : m(s, u, d);
            } else {
              if ("value" in _)
                return _.value;
              var w = _.get;
              return w === void 0 ? void 0 : w.call(d);
            }
          }, v = o(6), b = y(v);
          function y(m) {
            return m && m.__esModule ? m : { default: m };
          }
          function p(m, c) {
            if (!(m instanceof c))
              throw new TypeError("Cannot call a class as a function");
          }
          function a(m, c) {
            if (!m)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return c && (typeof c == "object" || typeof c == "function") ? c : m;
          }
          function r(m, c) {
            if (typeof c != "function" && c !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof c);
            m.prototype = Object.create(c && c.prototype, { constructor: { value: m, enumerable: !1, writable: !0, configurable: !0 } }), c && (Object.setPrototypeOf ? Object.setPrototypeOf(m, c) : m.__proto__ = c);
          }
          var l = function(m) {
            r(c, m);
            function c() {
              return p(this, c), a(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return h(c, [{
              key: "format",
              value: function(d, _) {
                if (d !== this.statics.blotName || !_) return f(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "format", this).call(this, d, _);
                _ = this.constructor.sanitize(_), this.domNode.setAttribute("href", _);
              }
            }], [{
              key: "create",
              value: function(d) {
                var _ = f(c.__proto__ || Object.getPrototypeOf(c), "create", this).call(this, d);
                return d = this.sanitize(d), _.setAttribute("href", d), _.setAttribute("rel", "noopener noreferrer"), _.setAttribute("target", "_blank"), _;
              }
            }, {
              key: "formats",
              value: function(d) {
                return d.getAttribute("href");
              }
            }, {
              key: "sanitize",
              value: function(d) {
                return g(d, this.PROTOCOL_WHITELIST) ? d : this.SANITIZED_URL;
              }
            }]), c;
          }(b.default);
          l.blotName = "link", l.tagName = "A", l.SANITIZED_URL = "about:blank", l.PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel"];
          function g(m, c) {
            var u = document.createElement("a");
            u.href = m;
            var d = u.href.slice(0, u.href.indexOf(":"));
            return c.indexOf(d) > -1;
          }
          i.default = l, i.sanitize = g;
        },
        /* 28 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(c) {
            return typeof c;
          } : function(c) {
            return c && typeof Symbol == "function" && c.constructor === Symbol && c !== Symbol.prototype ? "symbol" : typeof c;
          }, f = /* @__PURE__ */ function() {
            function c(u, d) {
              for (var _ = 0; _ < d.length; _++) {
                var s = d[_];
                s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(u, s.key, s);
              }
            }
            return function(u, d, _) {
              return d && c(u.prototype, d), _ && c(u, _), u;
            };
          }(), v = o(23), b = a(v), y = o(107), p = a(y);
          function a(c) {
            return c && c.__esModule ? c : { default: c };
          }
          function r(c, u) {
            if (!(c instanceof u))
              throw new TypeError("Cannot call a class as a function");
          }
          var l = 0;
          function g(c, u) {
            c.setAttribute(u, c.getAttribute(u) !== "true");
          }
          var m = function() {
            function c(u) {
              var d = this;
              r(this, c), this.select = u, this.container = document.createElement("span"), this.buildPicker(), this.select.style.display = "none", this.select.parentNode.insertBefore(this.container, this.select), this.label.addEventListener("mousedown", function() {
                d.togglePicker();
              }), this.label.addEventListener("keydown", function(_) {
                switch (_.keyCode) {
                  case b.default.keys.ENTER:
                    d.togglePicker();
                    break;
                  case b.default.keys.ESCAPE:
                    d.escape(), _.preventDefault();
                    break;
                }
              }), this.select.addEventListener("change", this.update.bind(this));
            }
            return f(c, [{
              key: "togglePicker",
              value: function() {
                this.container.classList.toggle("ql-expanded"), g(this.label, "aria-expanded"), g(this.options, "aria-hidden");
              }
            }, {
              key: "buildItem",
              value: function(d) {
                var _ = this, s = document.createElement("span");
                return s.tabIndex = "0", s.setAttribute("role", "button"), s.classList.add("ql-picker-item"), d.hasAttribute("value") && s.setAttribute("data-value", d.getAttribute("value")), d.textContent && s.setAttribute("data-label", d.textContent), s.addEventListener("click", function() {
                  _.selectItem(s, !0);
                }), s.addEventListener("keydown", function(w) {
                  switch (w.keyCode) {
                    case b.default.keys.ENTER:
                      _.selectItem(s, !0), w.preventDefault();
                      break;
                    case b.default.keys.ESCAPE:
                      _.escape(), w.preventDefault();
                      break;
                  }
                }), s;
              }
            }, {
              key: "buildLabel",
              value: function() {
                var d = document.createElement("span");
                return d.classList.add("ql-picker-label"), d.innerHTML = p.default, d.tabIndex = "0", d.setAttribute("role", "button"), d.setAttribute("aria-expanded", "false"), this.container.appendChild(d), d;
              }
            }, {
              key: "buildOptions",
              value: function() {
                var d = this, _ = document.createElement("span");
                _.classList.add("ql-picker-options"), _.setAttribute("aria-hidden", "true"), _.tabIndex = "-1", _.id = "ql-picker-options-" + l, l += 1, this.label.setAttribute("aria-controls", _.id), this.options = _, [].slice.call(this.select.options).forEach(function(s) {
                  var w = d.buildItem(s);
                  _.appendChild(w), s.selected === !0 && d.selectItem(w);
                }), this.container.appendChild(_);
              }
            }, {
              key: "buildPicker",
              value: function() {
                var d = this;
                [].slice.call(this.select.attributes).forEach(function(_) {
                  d.container.setAttribute(_.name, _.value);
                }), this.container.classList.add("ql-picker"), this.label = this.buildLabel(), this.buildOptions();
              }
            }, {
              key: "escape",
              value: function() {
                var d = this;
                this.close(), setTimeout(function() {
                  return d.label.focus();
                }, 1);
              }
            }, {
              key: "close",
              value: function() {
                this.container.classList.remove("ql-expanded"), this.label.setAttribute("aria-expanded", "false"), this.options.setAttribute("aria-hidden", "true");
              }
            }, {
              key: "selectItem",
              value: function(d) {
                var _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, s = this.container.querySelector(".ql-selected");
                if (d !== s && (s != null && s.classList.remove("ql-selected"), d != null && (d.classList.add("ql-selected"), this.select.selectedIndex = [].indexOf.call(d.parentNode.children, d), d.hasAttribute("data-value") ? this.label.setAttribute("data-value", d.getAttribute("data-value")) : this.label.removeAttribute("data-value"), d.hasAttribute("data-label") ? this.label.setAttribute("data-label", d.getAttribute("data-label")) : this.label.removeAttribute("data-label"), _))) {
                  if (typeof Event == "function")
                    this.select.dispatchEvent(new Event("change"));
                  else if ((typeof Event > "u" ? "undefined" : h(Event)) === "object") {
                    var w = document.createEvent("Event");
                    w.initEvent("change", !0, !0), this.select.dispatchEvent(w);
                  }
                  this.close();
                }
              }
            }, {
              key: "update",
              value: function() {
                var d = void 0;
                if (this.select.selectedIndex > -1) {
                  var _ = this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex];
                  d = this.select.options[this.select.selectedIndex], this.selectItem(_);
                } else
                  this.selectItem(null);
                var s = d != null && d !== this.select.querySelector("option[selected]");
                this.label.classList.toggle("ql-active", s);
              }
            }]), c;
          }();
          i.default = m;
        },
        /* 29 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = o(0), f = M(h), v = o(5), b = M(v), y = o(4), p = M(y), a = o(16), r = M(a), l = o(25), g = M(l), m = o(24), c = M(m), u = o(35), d = M(u), _ = o(6), s = M(_), w = o(22), F = M(w), C = o(7), S = M(C), N = o(55), E = M(N), O = o(42), x = M(O), L = o(23), A = M(L);
          function M(j) {
            return j && j.__esModule ? j : { default: j };
          }
          b.default.register({
            "blots/block": p.default,
            "blots/block/embed": y.BlockEmbed,
            "blots/break": r.default,
            "blots/container": g.default,
            "blots/cursor": c.default,
            "blots/embed": d.default,
            "blots/inline": s.default,
            "blots/scroll": F.default,
            "blots/text": S.default,
            "modules/clipboard": E.default,
            "modules/history": x.default,
            "modules/keyboard": A.default
          }), f.default.register(p.default, r.default, c.default, s.default, F.default, S.default), i.default = b.default;
        },
        /* 30 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", { value: !0 });
          var h = o(1), f = (
            /** @class */
            function() {
              function v(b) {
                this.domNode = b, this.domNode[h.DATA_KEY] = { blot: this };
              }
              return Object.defineProperty(v.prototype, "statics", {
                // Hack for accessing inherited static methods
                get: function() {
                  return this.constructor;
                },
                enumerable: !0,
                configurable: !0
              }), v.create = function(b) {
                if (this.tagName == null)
                  throw new h.ParchmentError("Blot definition missing tagName");
                var y;
                return Array.isArray(this.tagName) ? (typeof b == "string" && (b = b.toUpperCase(), parseInt(b).toString() === b && (b = parseInt(b))), typeof b == "number" ? y = document.createElement(this.tagName[b - 1]) : this.tagName.indexOf(b) > -1 ? y = document.createElement(b) : y = document.createElement(this.tagName[0])) : y = document.createElement(this.tagName), this.className && y.classList.add(this.className), y;
              }, v.prototype.attach = function() {
                this.parent != null && (this.scroll = this.parent.scroll);
              }, v.prototype.clone = function() {
                var b = this.domNode.cloneNode(!1);
                return h.create(b);
              }, v.prototype.detach = function() {
                this.parent != null && this.parent.removeChild(this), delete this.domNode[h.DATA_KEY];
              }, v.prototype.deleteAt = function(b, y) {
                var p = this.isolate(b, y);
                p.remove();
              }, v.prototype.formatAt = function(b, y, p, a) {
                var r = this.isolate(b, y);
                if (h.query(p, h.Scope.BLOT) != null && a)
                  r.wrap(p, a);
                else if (h.query(p, h.Scope.ATTRIBUTE) != null) {
                  var l = h.create(this.statics.scope);
                  r.wrap(l), l.format(p, a);
                }
              }, v.prototype.insertAt = function(b, y, p) {
                var a = p == null ? h.create("text", y) : h.create(y, p), r = this.split(b);
                this.parent.insertBefore(a, r);
              }, v.prototype.insertInto = function(b, y) {
                y === void 0 && (y = null), this.parent != null && this.parent.children.remove(this);
                var p = null;
                b.children.insertBefore(this, y), y != null && (p = y.domNode), (this.domNode.parentNode != b.domNode || this.domNode.nextSibling != p) && b.domNode.insertBefore(this.domNode, p), this.parent = b, this.attach();
              }, v.prototype.isolate = function(b, y) {
                var p = this.split(b);
                return p.split(y), p;
              }, v.prototype.length = function() {
                return 1;
              }, v.prototype.offset = function(b) {
                return b === void 0 && (b = this.parent), this.parent == null || this == b ? 0 : this.parent.children.offset(this) + this.parent.offset(b);
              }, v.prototype.optimize = function(b) {
                this.domNode[h.DATA_KEY] != null && delete this.domNode[h.DATA_KEY].mutations;
              }, v.prototype.remove = function() {
                this.domNode.parentNode != null && this.domNode.parentNode.removeChild(this.domNode), this.detach();
              }, v.prototype.replace = function(b) {
                b.parent != null && (b.parent.insertBefore(this, b.next), b.remove());
              }, v.prototype.replaceWith = function(b, y) {
                var p = typeof b == "string" ? h.create(b, y) : b;
                return p.replace(this), p;
              }, v.prototype.split = function(b, y) {
                return b === 0 ? this : this.next;
              }, v.prototype.update = function(b, y) {
              }, v.prototype.wrap = function(b, y) {
                var p = typeof b == "string" ? h.create(b, y) : b;
                return this.parent != null && this.parent.insertBefore(p, this.next), p.appendChild(this), p;
              }, v.blotName = "abstract", v;
            }()
          );
          i.default = f;
        },
        /* 31 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", { value: !0 });
          var h = o(12), f = o(32), v = o(33), b = o(1), y = (
            /** @class */
            function() {
              function p(a) {
                this.attributes = {}, this.domNode = a, this.build();
              }
              return p.prototype.attribute = function(a, r) {
                r ? a.add(this.domNode, r) && (a.value(this.domNode) != null ? this.attributes[a.attrName] = a : delete this.attributes[a.attrName]) : (a.remove(this.domNode), delete this.attributes[a.attrName]);
              }, p.prototype.build = function() {
                var a = this;
                this.attributes = {};
                var r = h.default.keys(this.domNode), l = f.default.keys(this.domNode), g = v.default.keys(this.domNode);
                r.concat(l).concat(g).forEach(function(m) {
                  var c = b.query(m, b.Scope.ATTRIBUTE);
                  c instanceof h.default && (a.attributes[c.attrName] = c);
                });
              }, p.prototype.copy = function(a) {
                var r = this;
                Object.keys(this.attributes).forEach(function(l) {
                  var g = r.attributes[l].value(r.domNode);
                  a.format(l, g);
                });
              }, p.prototype.move = function(a) {
                var r = this;
                this.copy(a), Object.keys(this.attributes).forEach(function(l) {
                  r.attributes[l].remove(r.domNode);
                }), this.attributes = {};
              }, p.prototype.values = function() {
                var a = this;
                return Object.keys(this.attributes).reduce(function(r, l) {
                  return r[l] = a.attributes[l].value(a.domNode), r;
                }, {});
              }, p;
            }()
          );
          i.default = y;
        },
        /* 32 */
        /***/
        function(e, i, o) {
          var h = this && this.__extends || function() {
            var y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(p, a) {
              p.__proto__ = a;
            } || function(p, a) {
              for (var r in a) a.hasOwnProperty(r) && (p[r] = a[r]);
            };
            return function(p, a) {
              y(p, a);
              function r() {
                this.constructor = p;
              }
              p.prototype = a === null ? Object.create(a) : (r.prototype = a.prototype, new r());
            };
          }();
          Object.defineProperty(i, "__esModule", { value: !0 });
          var f = o(12);
          function v(y, p) {
            var a = y.getAttribute("class") || "";
            return a.split(/\s+/).filter(function(r) {
              return r.indexOf(p + "-") === 0;
            });
          }
          var b = (
            /** @class */
            function(y) {
              h(p, y);
              function p() {
                return y !== null && y.apply(this, arguments) || this;
              }
              return p.keys = function(a) {
                return (a.getAttribute("class") || "").split(/\s+/).map(function(r) {
                  return r.split("-").slice(0, -1).join("-");
                });
              }, p.prototype.add = function(a, r) {
                return this.canAdd(a, r) ? (this.remove(a), a.classList.add(this.keyName + "-" + r), !0) : !1;
              }, p.prototype.remove = function(a) {
                var r = v(a, this.keyName);
                r.forEach(function(l) {
                  a.classList.remove(l);
                }), a.classList.length === 0 && a.removeAttribute("class");
              }, p.prototype.value = function(a) {
                var r = v(a, this.keyName)[0] || "", l = r.slice(this.keyName.length + 1);
                return this.canAdd(a, l) ? l : "";
              }, p;
            }(f.default)
          );
          i.default = b;
        },
        /* 33 */
        /***/
        function(e, i, o) {
          var h = this && this.__extends || function() {
            var y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(p, a) {
              p.__proto__ = a;
            } || function(p, a) {
              for (var r in a) a.hasOwnProperty(r) && (p[r] = a[r]);
            };
            return function(p, a) {
              y(p, a);
              function r() {
                this.constructor = p;
              }
              p.prototype = a === null ? Object.create(a) : (r.prototype = a.prototype, new r());
            };
          }();
          Object.defineProperty(i, "__esModule", { value: !0 });
          var f = o(12);
          function v(y) {
            var p = y.split("-"), a = p.slice(1).map(function(r) {
              return r[0].toUpperCase() + r.slice(1);
            }).join("");
            return p[0] + a;
          }
          var b = (
            /** @class */
            function(y) {
              h(p, y);
              function p() {
                return y !== null && y.apply(this, arguments) || this;
              }
              return p.keys = function(a) {
                return (a.getAttribute("style") || "").split(";").map(function(r) {
                  var l = r.split(":");
                  return l[0].trim();
                });
              }, p.prototype.add = function(a, r) {
                return this.canAdd(a, r) ? (a.style[v(this.keyName)] = r, !0) : !1;
              }, p.prototype.remove = function(a) {
                a.style[v(this.keyName)] = "", a.getAttribute("style") || a.removeAttribute("style");
              }, p.prototype.value = function(a) {
                var r = a.style[v(this.keyName)];
                return this.canAdd(a, r) ? r : "";
              }, p;
            }(f.default)
          );
          i.default = b;
        },
        /* 34 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = /* @__PURE__ */ function() {
            function b(y, p) {
              for (var a = 0; a < p.length; a++) {
                var r = p[a];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(y, r.key, r);
              }
            }
            return function(y, p, a) {
              return p && b(y.prototype, p), a && b(y, a), y;
            };
          }();
          function f(b, y) {
            if (!(b instanceof y))
              throw new TypeError("Cannot call a class as a function");
          }
          var v = function() {
            function b(y, p) {
              f(this, b), this.quill = y, this.options = p, this.modules = {};
            }
            return h(b, [{
              key: "init",
              value: function() {
                var p = this;
                Object.keys(this.options.modules).forEach(function(a) {
                  p.modules[a] == null && p.addModule(a);
                });
              }
            }, {
              key: "addModule",
              value: function(p) {
                var a = this.quill.constructor.import("modules/" + p);
                return this.modules[p] = new a(this.quill, this.options.modules[p] || {}), this.modules[p];
              }
            }]), b;
          }();
          v.DEFAULTS = {
            modules: {}
          }, v.themes = {
            default: v
          }, i.default = v;
        },
        /* 35 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = /* @__PURE__ */ function() {
            function u(d, _) {
              for (var s = 0; s < _.length; s++) {
                var w = _[s];
                w.enumerable = w.enumerable || !1, w.configurable = !0, "value" in w && (w.writable = !0), Object.defineProperty(d, w.key, w);
              }
            }
            return function(d, _, s) {
              return _ && u(d.prototype, _), s && u(d, s), d;
            };
          }(), f = function u(d, _, s) {
            d === null && (d = Function.prototype);
            var w = Object.getOwnPropertyDescriptor(d, _);
            if (w === void 0) {
              var F = Object.getPrototypeOf(d);
              return F === null ? void 0 : u(F, _, s);
            } else {
              if ("value" in w)
                return w.value;
              var C = w.get;
              return C === void 0 ? void 0 : C.call(s);
            }
          }, v = o(0), b = a(v), y = o(7), p = a(y);
          function a(u) {
            return u && u.__esModule ? u : { default: u };
          }
          function r(u, d) {
            if (!(u instanceof d))
              throw new TypeError("Cannot call a class as a function");
          }
          function l(u, d) {
            if (!u)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return d && (typeof d == "object" || typeof d == "function") ? d : u;
          }
          function g(u, d) {
            if (typeof d != "function" && d !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof d);
            u.prototype = Object.create(d && d.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), d && (Object.setPrototypeOf ? Object.setPrototypeOf(u, d) : u.__proto__ = d);
          }
          var m = "\uFEFF", c = function(u) {
            g(d, u);
            function d(_) {
              r(this, d);
              var s = l(this, (d.__proto__ || Object.getPrototypeOf(d)).call(this, _));
              return s.contentNode = document.createElement("span"), s.contentNode.setAttribute("contenteditable", !1), [].slice.call(s.domNode.childNodes).forEach(function(w) {
                s.contentNode.appendChild(w);
              }), s.leftGuard = document.createTextNode(m), s.rightGuard = document.createTextNode(m), s.domNode.appendChild(s.leftGuard), s.domNode.appendChild(s.contentNode), s.domNode.appendChild(s.rightGuard), s;
            }
            return h(d, [{
              key: "index",
              value: function(s, w) {
                return s === this.leftGuard ? 0 : s === this.rightGuard ? 1 : f(d.prototype.__proto__ || Object.getPrototypeOf(d.prototype), "index", this).call(this, s, w);
              }
            }, {
              key: "restore",
              value: function(s) {
                var w = void 0, F = void 0, C = s.data.split(m).join("");
                if (s === this.leftGuard)
                  if (this.prev instanceof p.default) {
                    var S = this.prev.length();
                    this.prev.insertAt(S, C), w = {
                      startNode: this.prev.domNode,
                      startOffset: S + C.length
                    };
                  } else
                    F = document.createTextNode(C), this.parent.insertBefore(b.default.create(F), this), w = {
                      startNode: F,
                      startOffset: C.length
                    };
                else s === this.rightGuard && (this.next instanceof p.default ? (this.next.insertAt(0, C), w = {
                  startNode: this.next.domNode,
                  startOffset: C.length
                }) : (F = document.createTextNode(C), this.parent.insertBefore(b.default.create(F), this.next), w = {
                  startNode: F,
                  startOffset: C.length
                }));
                return s.data = m, w;
              }
            }, {
              key: "update",
              value: function(s, w) {
                var F = this;
                s.forEach(function(C) {
                  if (C.type === "characterData" && (C.target === F.leftGuard || C.target === F.rightGuard)) {
                    var S = F.restore(C.target);
                    S && (w.range = S);
                  }
                });
              }
            }]), d;
          }(b.default.Embed);
          i.default = c;
        },
        /* 36 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.AlignStyle = i.AlignClass = i.AlignAttribute = void 0;
          var h = o(0), f = v(h);
          function v(r) {
            return r && r.__esModule ? r : { default: r };
          }
          var b = {
            scope: f.default.Scope.BLOCK,
            whitelist: ["right", "center", "justify"]
          }, y = new f.default.Attributor.Attribute("align", "align", b), p = new f.default.Attributor.Class("align", "ql-align", b), a = new f.default.Attributor.Style("align", "text-align", b);
          i.AlignAttribute = y, i.AlignClass = p, i.AlignStyle = a;
        },
        /* 37 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.BackgroundStyle = i.BackgroundClass = void 0;
          var h = o(0), f = b(h), v = o(26);
          function b(a) {
            return a && a.__esModule ? a : { default: a };
          }
          var y = new f.default.Attributor.Class("background", "ql-bg", {
            scope: f.default.Scope.INLINE
          }), p = new v.ColorAttributor("background", "background-color", {
            scope: f.default.Scope.INLINE
          });
          i.BackgroundClass = y, i.BackgroundStyle = p;
        },
        /* 38 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.DirectionStyle = i.DirectionClass = i.DirectionAttribute = void 0;
          var h = o(0), f = v(h);
          function v(r) {
            return r && r.__esModule ? r : { default: r };
          }
          var b = {
            scope: f.default.Scope.BLOCK,
            whitelist: ["rtl"]
          }, y = new f.default.Attributor.Attribute("direction", "dir", b), p = new f.default.Attributor.Class("direction", "ql-direction", b), a = new f.default.Attributor.Style("direction", "direction", b);
          i.DirectionAttribute = y, i.DirectionClass = p, i.DirectionStyle = a;
        },
        /* 39 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.FontClass = i.FontStyle = void 0;
          var h = /* @__PURE__ */ function() {
            function u(d, _) {
              for (var s = 0; s < _.length; s++) {
                var w = _[s];
                w.enumerable = w.enumerable || !1, w.configurable = !0, "value" in w && (w.writable = !0), Object.defineProperty(d, w.key, w);
              }
            }
            return function(d, _, s) {
              return _ && u(d.prototype, _), s && u(d, s), d;
            };
          }(), f = function u(d, _, s) {
            d === null && (d = Function.prototype);
            var w = Object.getOwnPropertyDescriptor(d, _);
            if (w === void 0) {
              var F = Object.getPrototypeOf(d);
              return F === null ? void 0 : u(F, _, s);
            } else {
              if ("value" in w)
                return w.value;
              var C = w.get;
              return C === void 0 ? void 0 : C.call(s);
            }
          }, v = o(0), b = y(v);
          function y(u) {
            return u && u.__esModule ? u : { default: u };
          }
          function p(u, d) {
            if (!(u instanceof d))
              throw new TypeError("Cannot call a class as a function");
          }
          function a(u, d) {
            if (!u)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return d && (typeof d == "object" || typeof d == "function") ? d : u;
          }
          function r(u, d) {
            if (typeof d != "function" && d !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof d);
            u.prototype = Object.create(d && d.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), d && (Object.setPrototypeOf ? Object.setPrototypeOf(u, d) : u.__proto__ = d);
          }
          var l = {
            scope: b.default.Scope.INLINE,
            whitelist: ["serif", "monospace"]
          }, g = new b.default.Attributor.Class("font", "ql-font", l), m = function(u) {
            r(d, u);
            function d() {
              return p(this, d), a(this, (d.__proto__ || Object.getPrototypeOf(d)).apply(this, arguments));
            }
            return h(d, [{
              key: "value",
              value: function(s) {
                return f(d.prototype.__proto__ || Object.getPrototypeOf(d.prototype), "value", this).call(this, s).replace(/["']/g, "");
              }
            }]), d;
          }(b.default.Attributor.Style), c = new m("font", "font-family", l);
          i.FontStyle = c, i.FontClass = g;
        },
        /* 40 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.SizeStyle = i.SizeClass = void 0;
          var h = o(0), f = v(h);
          function v(p) {
            return p && p.__esModule ? p : { default: p };
          }
          var b = new f.default.Attributor.Class("size", "ql-size", {
            scope: f.default.Scope.INLINE,
            whitelist: ["small", "large", "huge"]
          }), y = new f.default.Attributor.Style("size", "font-size", {
            scope: f.default.Scope.INLINE,
            whitelist: ["10px", "18px", "32px"]
          });
          i.SizeClass = b, i.SizeStyle = y;
        },
        /* 41 */
        /***/
        function(e, i, o) {
          e.exports = {
            align: {
              "": o(76),
              center: o(77),
              right: o(78),
              justify: o(79)
            },
            background: o(80),
            blockquote: o(81),
            bold: o(82),
            clean: o(83),
            code: o(58),
            "code-block": o(58),
            color: o(84),
            direction: {
              "": o(85),
              rtl: o(86)
            },
            float: {
              center: o(87),
              full: o(88),
              left: o(89),
              right: o(90)
            },
            formula: o(91),
            header: {
              1: o(92),
              2: o(93)
            },
            italic: o(94),
            image: o(95),
            indent: {
              "+1": o(96),
              "-1": o(97)
            },
            link: o(98),
            list: {
              ordered: o(99),
              bullet: o(100),
              check: o(101)
            },
            script: {
              sub: o(102),
              super: o(103)
            },
            strike: o(104),
            underline: o(105),
            video: o(106)
          };
        },
        /* 42 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.getLastChangeIndex = i.default = void 0;
          var h = /* @__PURE__ */ function() {
            function _(s, w) {
              for (var F = 0; F < w.length; F++) {
                var C = w[F];
                C.enumerable = C.enumerable || !1, C.configurable = !0, "value" in C && (C.writable = !0), Object.defineProperty(s, C.key, C);
              }
            }
            return function(s, w, F) {
              return w && _(s.prototype, w), F && _(s, F), s;
            };
          }(), f = o(0), v = r(f), b = o(5), y = r(b), p = o(9), a = r(p);
          function r(_) {
            return _ && _.__esModule ? _ : { default: _ };
          }
          function l(_, s) {
            if (!(_ instanceof s))
              throw new TypeError("Cannot call a class as a function");
          }
          function g(_, s) {
            if (!_)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return s && (typeof s == "object" || typeof s == "function") ? s : _;
          }
          function m(_, s) {
            if (typeof s != "function" && s !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof s);
            _.prototype = Object.create(s && s.prototype, { constructor: { value: _, enumerable: !1, writable: !0, configurable: !0 } }), s && (Object.setPrototypeOf ? Object.setPrototypeOf(_, s) : _.__proto__ = s);
          }
          var c = function(_) {
            m(s, _);
            function s(w, F) {
              l(this, s);
              var C = g(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this, w, F));
              return C.lastRecorded = 0, C.ignoreChange = !1, C.clear(), C.quill.on(y.default.events.EDITOR_CHANGE, function(S, N, E, O) {
                S !== y.default.events.TEXT_CHANGE || C.ignoreChange || (!C.options.userOnly || O === y.default.sources.USER ? C.record(N, E) : C.transform(N));
              }), C.quill.keyboard.addBinding({ key: "Z", shortKey: !0 }, C.undo.bind(C)), C.quill.keyboard.addBinding({ key: "Z", shortKey: !0, shiftKey: !0 }, C.redo.bind(C)), /Win/i.test(navigator.platform) && C.quill.keyboard.addBinding({ key: "Y", shortKey: !0 }, C.redo.bind(C)), C;
            }
            return h(s, [{
              key: "change",
              value: function(F, C) {
                if (this.stack[F].length !== 0) {
                  var S = this.stack[F].pop();
                  this.stack[C].push(S), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(S[F], y.default.sources.USER), this.ignoreChange = !1;
                  var N = d(S[F]);
                  this.quill.setSelection(N);
                }
              }
            }, {
              key: "clear",
              value: function() {
                this.stack = { undo: [], redo: [] };
              }
            }, {
              key: "cutoff",
              value: function() {
                this.lastRecorded = 0;
              }
            }, {
              key: "record",
              value: function(F, C) {
                if (F.ops.length !== 0) {
                  this.stack.redo = [];
                  var S = this.quill.getContents().diff(C), N = Date.now();
                  if (this.lastRecorded + this.options.delay > N && this.stack.undo.length > 0) {
                    var E = this.stack.undo.pop();
                    S = S.compose(E.undo), F = E.redo.compose(F);
                  } else
                    this.lastRecorded = N;
                  this.stack.undo.push({
                    redo: F,
                    undo: S
                  }), this.stack.undo.length > this.options.maxStack && this.stack.undo.shift();
                }
              }
            }, {
              key: "redo",
              value: function() {
                this.change("redo", "undo");
              }
            }, {
              key: "transform",
              value: function(F) {
                this.stack.undo.forEach(function(C) {
                  C.undo = F.transform(C.undo, !0), C.redo = F.transform(C.redo, !0);
                }), this.stack.redo.forEach(function(C) {
                  C.undo = F.transform(C.undo, !0), C.redo = F.transform(C.redo, !0);
                });
              }
            }, {
              key: "undo",
              value: function() {
                this.change("undo", "redo");
              }
            }]), s;
          }(a.default);
          c.DEFAULTS = {
            delay: 1e3,
            maxStack: 100,
            userOnly: !1
          };
          function u(_) {
            var s = _.ops[_.ops.length - 1];
            return s == null ? !1 : s.insert != null ? typeof s.insert == "string" && s.insert.endsWith(`
`) : s.attributes != null ? Object.keys(s.attributes).some(function(w) {
              return v.default.query(w, v.default.Scope.BLOCK) != null;
            }) : !1;
          }
          function d(_) {
            var s = _.reduce(function(F, C) {
              return F += C.delete || 0, F;
            }, 0), w = _.length() - s;
            return u(_) && (w -= 1), w;
          }
          i.default = c, i.getLastChangeIndex = d;
        },
        /* 43 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.default = i.BaseTooltip = void 0;
          var h = /* @__PURE__ */ function() {
            function R(B, q) {
              for (var V = 0; V < q.length; V++) {
                var T = q[V];
                T.enumerable = T.enumerable || !1, T.configurable = !0, "value" in T && (T.writable = !0), Object.defineProperty(B, T.key, T);
              }
            }
            return function(B, q, V) {
              return q && R(B.prototype, q), V && R(B, V), B;
            };
          }(), f = function R(B, q, V) {
            B === null && (B = Function.prototype);
            var T = Object.getOwnPropertyDescriptor(B, q);
            if (T === void 0) {
              var I = Object.getPrototypeOf(B);
              return I === null ? void 0 : R(I, q, V);
            } else {
              if ("value" in T)
                return T.value;
              var H = T.get;
              return H === void 0 ? void 0 : H.call(V);
            }
          }, v = o(3), b = N(v), y = o(2), p = N(y), a = o(8), r = N(a), l = o(23), g = N(l), m = o(34), c = N(m), u = o(59), d = N(u), _ = o(60), s = N(_), w = o(28), F = N(w), C = o(61), S = N(C);
          function N(R) {
            return R && R.__esModule ? R : { default: R };
          }
          function E(R, B) {
            if (!(R instanceof B))
              throw new TypeError("Cannot call a class as a function");
          }
          function O(R, B) {
            if (!R)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return B && (typeof B == "object" || typeof B == "function") ? B : R;
          }
          function x(R, B) {
            if (typeof B != "function" && B !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof B);
            R.prototype = Object.create(B && B.prototype, { constructor: { value: R, enumerable: !1, writable: !0, configurable: !0 } }), B && (Object.setPrototypeOf ? Object.setPrototypeOf(R, B) : R.__proto__ = B);
          }
          var L = [!1, "center", "right", "justify"], A = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], M = [!1, "serif", "monospace"], j = ["1", "2", "3", !1], z = ["small", !1, "large", "huge"], G = function(R) {
            x(B, R);
            function B(q, V) {
              E(this, B);
              var T = O(this, (B.__proto__ || Object.getPrototypeOf(B)).call(this, q, V)), I = function H(W) {
                if (!document.body.contains(q.root))
                  return document.body.removeEventListener("click", H);
                T.tooltip != null && !T.tooltip.root.contains(W.target) && document.activeElement !== T.tooltip.textbox && !T.quill.hasFocus() && T.tooltip.hide(), T.pickers != null && T.pickers.forEach(function(K) {
                  K.container.contains(W.target) || K.close();
                });
              };
              return q.emitter.listenDOM("click", document.body, I), T;
            }
            return h(B, [{
              key: "addModule",
              value: function(V) {
                var T = f(B.prototype.__proto__ || Object.getPrototypeOf(B.prototype), "addModule", this).call(this, V);
                return V === "toolbar" && this.extendToolbar(T), T;
              }
            }, {
              key: "buildButtons",
              value: function(V, T) {
                V.forEach(function(I) {
                  var H = I.getAttribute("class") || "";
                  H.split(/\s+/).forEach(function(W) {
                    if (W.startsWith("ql-") && (W = W.slice(3), T[W] != null))
                      if (W === "direction")
                        I.innerHTML = T[W][""] + T[W].rtl;
                      else if (typeof T[W] == "string")
                        I.innerHTML = T[W];
                      else {
                        var K = I.value || "";
                        K != null && T[W][K] && (I.innerHTML = T[W][K]);
                      }
                  });
                });
              }
            }, {
              key: "buildPickers",
              value: function(V, T) {
                var I = this;
                this.pickers = V.map(function(W) {
                  if (W.classList.contains("ql-align"))
                    return W.querySelector("option") == null && k(W, L), new s.default(W, T.align);
                  if (W.classList.contains("ql-background") || W.classList.contains("ql-color")) {
                    var K = W.classList.contains("ql-background") ? "background" : "color";
                    return W.querySelector("option") == null && k(W, A, K === "background" ? "#ffffff" : "#000000"), new d.default(W, T[K]);
                  } else
                    return W.querySelector("option") == null && (W.classList.contains("ql-font") ? k(W, M) : W.classList.contains("ql-header") ? k(W, j) : W.classList.contains("ql-size") && k(W, z)), new F.default(W);
                });
                var H = function() {
                  I.pickers.forEach(function(K) {
                    K.update();
                  });
                };
                this.quill.on(r.default.events.EDITOR_CHANGE, H);
              }
            }]), B;
          }(c.default);
          G.DEFAULTS = (0, b.default)(!0, {}, c.default.DEFAULTS, {
            modules: {
              toolbar: {
                handlers: {
                  formula: function() {
                    this.quill.theme.tooltip.edit("formula");
                  },
                  image: function() {
                    var B = this, q = this.container.querySelector("input.ql-image[type=file]");
                    q == null && (q = document.createElement("input"), q.setAttribute("type", "file"), q.setAttribute("accept", "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"), q.classList.add("ql-image"), q.addEventListener("change", function() {
                      if (q.files != null && q.files[0] != null) {
                        var V = new FileReader();
                        V.onload = function(T) {
                          var I = B.quill.getSelection(!0);
                          B.quill.updateContents(new p.default().retain(I.index).delete(I.length).insert({ image: T.target.result }), r.default.sources.USER), B.quill.setSelection(I.index + 1, r.default.sources.SILENT), q.value = "";
                        }, V.readAsDataURL(q.files[0]);
                      }
                    }), this.container.appendChild(q)), q.click();
                  },
                  video: function() {
                    this.quill.theme.tooltip.edit("video");
                  }
                }
              }
            }
          });
          var D = function(R) {
            x(B, R);
            function B(q, V) {
              E(this, B);
              var T = O(this, (B.__proto__ || Object.getPrototypeOf(B)).call(this, q, V));
              return T.textbox = T.root.querySelector('input[type="text"]'), T.listen(), T;
            }
            return h(B, [{
              key: "listen",
              value: function() {
                var V = this;
                this.textbox.addEventListener("keydown", function(T) {
                  g.default.match(T, "enter") ? (V.save(), T.preventDefault()) : g.default.match(T, "escape") && (V.cancel(), T.preventDefault());
                });
              }
            }, {
              key: "cancel",
              value: function() {
                this.hide();
              }
            }, {
              key: "edit",
              value: function() {
                var V = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "link", T = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
                this.root.classList.remove("ql-hidden"), this.root.classList.add("ql-editing"), T != null ? this.textbox.value = T : V !== this.root.getAttribute("data-mode") && (this.textbox.value = ""), this.position(this.quill.getBounds(this.quill.selection.savedRange)), this.textbox.select(), this.textbox.setAttribute("placeholder", this.textbox.getAttribute("data-" + V) || ""), this.root.setAttribute("data-mode", V);
              }
            }, {
              key: "restoreFocus",
              value: function() {
                var V = this.quill.scrollingContainer.scrollTop;
                this.quill.focus(), this.quill.scrollingContainer.scrollTop = V;
              }
            }, {
              key: "save",
              value: function() {
                var V = this.textbox.value;
                switch (this.root.getAttribute("data-mode")) {
                  case "link": {
                    var T = this.quill.root.scrollTop;
                    this.linkRange ? (this.quill.formatText(this.linkRange, "link", V, r.default.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", V, r.default.sources.USER)), this.quill.root.scrollTop = T;
                    break;
                  }
                  case "video":
                    V = P(V);
                  case "formula": {
                    if (!V) break;
                    var I = this.quill.getSelection(!0);
                    if (I != null) {
                      var H = I.index + I.length;
                      this.quill.insertEmbed(H, this.root.getAttribute("data-mode"), V, r.default.sources.USER), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(H + 1, " ", r.default.sources.USER), this.quill.setSelection(H + 2, r.default.sources.USER);
                    }
                    break;
                  }
                }
                this.textbox.value = "", this.hide();
              }
            }]), B;
          }(S.default);
          function P(R) {
            var B = R.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || R.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
            return B ? (B[1] || "https") + "://www.youtube.com/embed/" + B[2] + "?showinfo=0" : (B = R.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? (B[1] || "https") + "://player.vimeo.com/video/" + B[2] + "/" : R;
          }
          function k(R, B) {
            var q = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
            B.forEach(function(V) {
              var T = document.createElement("option");
              V === q ? T.setAttribute("selected", "selected") : T.setAttribute("value", V), R.appendChild(T);
            });
          }
          i.BaseTooltip = D, i.default = G;
        },
        /* 44 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", { value: !0 });
          var h = (
            /** @class */
            function() {
              function f() {
                this.head = this.tail = null, this.length = 0;
              }
              return f.prototype.append = function() {
                for (var v = [], b = 0; b < arguments.length; b++)
                  v[b] = arguments[b];
                this.insertBefore(v[0], null), v.length > 1 && this.append.apply(this, v.slice(1));
              }, f.prototype.contains = function(v) {
                for (var b, y = this.iterator(); b = y(); )
                  if (b === v)
                    return !0;
                return !1;
              }, f.prototype.insertBefore = function(v, b) {
                v && (v.next = b, b != null ? (v.prev = b.prev, b.prev != null && (b.prev.next = v), b.prev = v, b === this.head && (this.head = v)) : this.tail != null ? (this.tail.next = v, v.prev = this.tail, this.tail = v) : (v.prev = null, this.head = this.tail = v), this.length += 1);
              }, f.prototype.offset = function(v) {
                for (var b = 0, y = this.head; y != null; ) {
                  if (y === v)
                    return b;
                  b += y.length(), y = y.next;
                }
                return -1;
              }, f.prototype.remove = function(v) {
                this.contains(v) && (v.prev != null && (v.prev.next = v.next), v.next != null && (v.next.prev = v.prev), v === this.head && (this.head = v.next), v === this.tail && (this.tail = v.prev), this.length -= 1);
              }, f.prototype.iterator = function(v) {
                return v === void 0 && (v = this.head), function() {
                  var b = v;
                  return v != null && (v = v.next), b;
                };
              }, f.prototype.find = function(v, b) {
                b === void 0 && (b = !1);
                for (var y, p = this.iterator(); y = p(); ) {
                  var a = y.length();
                  if (v < a || b && v === a && (y.next == null || y.next.length() !== 0))
                    return [y, v];
                  v -= a;
                }
                return [null, 0];
              }, f.prototype.forEach = function(v) {
                for (var b, y = this.iterator(); b = y(); )
                  v(b);
              }, f.prototype.forEachAt = function(v, b, y) {
                if (!(b <= 0))
                  for (var p = this.find(v), a = p[0], r = p[1], l, g = v - r, m = this.iterator(a); (l = m()) && g < v + b; ) {
                    var c = l.length();
                    v > g ? y(l, v - g, Math.min(b, g + c - v)) : y(l, 0, Math.min(c, v + b - g)), g += c;
                  }
              }, f.prototype.map = function(v) {
                return this.reduce(function(b, y) {
                  return b.push(v(y)), b;
                }, []);
              }, f.prototype.reduce = function(v, b) {
                for (var y, p = this.iterator(); y = p(); )
                  b = v(b, y);
                return b;
              }, f;
            }()
          );
          i.default = h;
        },
        /* 45 */
        /***/
        function(e, i, o) {
          var h = this && this.__extends || function() {
            var a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, l) {
              r.__proto__ = l;
            } || function(r, l) {
              for (var g in l) l.hasOwnProperty(g) && (r[g] = l[g]);
            };
            return function(r, l) {
              a(r, l);
              function g() {
                this.constructor = r;
              }
              r.prototype = l === null ? Object.create(l) : (g.prototype = l.prototype, new g());
            };
          }();
          Object.defineProperty(i, "__esModule", { value: !0 });
          var f = o(17), v = o(1), b = {
            attributes: !0,
            characterData: !0,
            characterDataOldValue: !0,
            childList: !0,
            subtree: !0
          }, y = 100, p = (
            /** @class */
            function(a) {
              h(r, a);
              function r(l) {
                var g = a.call(this, l) || this;
                return g.scroll = g, g.observer = new MutationObserver(function(m) {
                  g.update(m);
                }), g.observer.observe(g.domNode, b), g.attach(), g;
              }
              return r.prototype.detach = function() {
                a.prototype.detach.call(this), this.observer.disconnect();
              }, r.prototype.deleteAt = function(l, g) {
                this.update(), l === 0 && g === this.length() ? this.children.forEach(function(m) {
                  m.remove();
                }) : a.prototype.deleteAt.call(this, l, g);
              }, r.prototype.formatAt = function(l, g, m, c) {
                this.update(), a.prototype.formatAt.call(this, l, g, m, c);
              }, r.prototype.insertAt = function(l, g, m) {
                this.update(), a.prototype.insertAt.call(this, l, g, m);
              }, r.prototype.optimize = function(l, g) {
                var m = this;
                l === void 0 && (l = []), g === void 0 && (g = {}), a.prototype.optimize.call(this, g);
                for (var c = [].slice.call(this.observer.takeRecords()); c.length > 0; )
                  l.push(c.pop());
                for (var u = function(w, F) {
                  F === void 0 && (F = !0), !(w == null || w === m) && w.domNode.parentNode != null && (w.domNode[v.DATA_KEY].mutations == null && (w.domNode[v.DATA_KEY].mutations = []), F && u(w.parent));
                }, d = function(w) {
                  // @ts-ignore
                  w.domNode[v.DATA_KEY] == null || // @ts-ignore
                  w.domNode[v.DATA_KEY].mutations == null || (w instanceof f.default && w.children.forEach(d), w.optimize(g));
                }, _ = l, s = 0; _.length > 0; s += 1) {
                  if (s >= y)
                    throw new Error("[Parchment] Maximum optimize iterations reached");
                  for (_.forEach(function(w) {
                    var F = v.find(w.target, !0);
                    F != null && (F.domNode === w.target && (w.type === "childList" ? (u(v.find(w.previousSibling, !1)), [].forEach.call(w.addedNodes, function(C) {
                      var S = v.find(C, !1);
                      u(S, !1), S instanceof f.default && S.children.forEach(function(N) {
                        u(N, !1);
                      });
                    })) : w.type === "attributes" && u(F.prev)), u(F));
                  }), this.children.forEach(d), _ = [].slice.call(this.observer.takeRecords()), c = _.slice(); c.length > 0; )
                    l.push(c.pop());
                }
              }, r.prototype.update = function(l, g) {
                var m = this;
                g === void 0 && (g = {}), l = l || this.observer.takeRecords(), l.map(function(c) {
                  var u = v.find(c.target, !0);
                  return u == null ? null : u.domNode[v.DATA_KEY].mutations == null ? (u.domNode[v.DATA_KEY].mutations = [c], u) : (u.domNode[v.DATA_KEY].mutations.push(c), null);
                }).forEach(function(c) {
                  c == null || c === m || //@ts-ignore
                  c.domNode[v.DATA_KEY] == null || c.update(c.domNode[v.DATA_KEY].mutations || [], g);
                }), this.domNode[v.DATA_KEY].mutations != null && a.prototype.update.call(this, this.domNode[v.DATA_KEY].mutations, g), this.optimize(l, g);
              }, r.blotName = "scroll", r.defaultChild = "block", r.scope = v.Scope.BLOCK_BLOT, r.tagName = "DIV", r;
            }(f.default)
          );
          i.default = p;
        },
        /* 46 */
        /***/
        function(e, i, o) {
          var h = this && this.__extends || function() {
            var p = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(a, r) {
              a.__proto__ = r;
            } || function(a, r) {
              for (var l in r) r.hasOwnProperty(l) && (a[l] = r[l]);
            };
            return function(a, r) {
              p(a, r);
              function l() {
                this.constructor = a;
              }
              a.prototype = r === null ? Object.create(r) : (l.prototype = r.prototype, new l());
            };
          }();
          Object.defineProperty(i, "__esModule", { value: !0 });
          var f = o(18), v = o(1);
          function b(p, a) {
            if (Object.keys(p).length !== Object.keys(a).length)
              return !1;
            for (var r in p)
              if (p[r] !== a[r])
                return !1;
            return !0;
          }
          var y = (
            /** @class */
            function(p) {
              h(a, p);
              function a() {
                return p !== null && p.apply(this, arguments) || this;
              }
              return a.formats = function(r) {
                if (r.tagName !== a.tagName)
                  return p.formats.call(this, r);
              }, a.prototype.format = function(r, l) {
                var g = this;
                r === this.statics.blotName && !l ? (this.children.forEach(function(m) {
                  m instanceof f.default || (m = m.wrap(a.blotName, !0)), g.attributes.copy(m);
                }), this.unwrap()) : p.prototype.format.call(this, r, l);
              }, a.prototype.formatAt = function(r, l, g, m) {
                if (this.formats()[g] != null || v.query(g, v.Scope.ATTRIBUTE)) {
                  var c = this.isolate(r, l);
                  c.format(g, m);
                } else
                  p.prototype.formatAt.call(this, r, l, g, m);
              }, a.prototype.optimize = function(r) {
                p.prototype.optimize.call(this, r);
                var l = this.formats();
                if (Object.keys(l).length === 0)
                  return this.unwrap();
                var g = this.next;
                g instanceof a && g.prev === this && b(l, g.formats()) && (g.moveChildren(this), g.remove());
              }, a.blotName = "inline", a.scope = v.Scope.INLINE_BLOT, a.tagName = "SPAN", a;
            }(f.default)
          );
          i.default = y;
        },
        /* 47 */
        /***/
        function(e, i, o) {
          var h = this && this.__extends || function() {
            var y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(p, a) {
              p.__proto__ = a;
            } || function(p, a) {
              for (var r in a) a.hasOwnProperty(r) && (p[r] = a[r]);
            };
            return function(p, a) {
              y(p, a);
              function r() {
                this.constructor = p;
              }
              p.prototype = a === null ? Object.create(a) : (r.prototype = a.prototype, new r());
            };
          }();
          Object.defineProperty(i, "__esModule", { value: !0 });
          var f = o(18), v = o(1), b = (
            /** @class */
            function(y) {
              h(p, y);
              function p() {
                return y !== null && y.apply(this, arguments) || this;
              }
              return p.formats = function(a) {
                var r = v.query(p.blotName).tagName;
                if (a.tagName !== r)
                  return y.formats.call(this, a);
              }, p.prototype.format = function(a, r) {
                v.query(a, v.Scope.BLOCK) != null && (a === this.statics.blotName && !r ? this.replaceWith(p.blotName) : y.prototype.format.call(this, a, r));
              }, p.prototype.formatAt = function(a, r, l, g) {
                v.query(l, v.Scope.BLOCK) != null ? this.format(l, g) : y.prototype.formatAt.call(this, a, r, l, g);
              }, p.prototype.insertAt = function(a, r, l) {
                if (l == null || v.query(r, v.Scope.INLINE) != null)
                  y.prototype.insertAt.call(this, a, r, l);
                else {
                  var g = this.split(a), m = v.create(r, l);
                  g.parent.insertBefore(m, g);
                }
              }, p.prototype.update = function(a, r) {
                navigator.userAgent.match(/Trident/) ? this.build() : y.prototype.update.call(this, a, r);
              }, p.blotName = "block", p.scope = v.Scope.BLOCK_BLOT, p.tagName = "P", p;
            }(f.default)
          );
          i.default = b;
        },
        /* 48 */
        /***/
        function(e, i, o) {
          var h = this && this.__extends || function() {
            var b = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(y, p) {
              y.__proto__ = p;
            } || function(y, p) {
              for (var a in p) p.hasOwnProperty(a) && (y[a] = p[a]);
            };
            return function(y, p) {
              b(y, p);
              function a() {
                this.constructor = y;
              }
              y.prototype = p === null ? Object.create(p) : (a.prototype = p.prototype, new a());
            };
          }();
          Object.defineProperty(i, "__esModule", { value: !0 });
          var f = o(19), v = (
            /** @class */
            function(b) {
              h(y, b);
              function y() {
                return b !== null && b.apply(this, arguments) || this;
              }
              return y.formats = function(p) {
              }, y.prototype.format = function(p, a) {
                b.prototype.formatAt.call(this, 0, this.length(), p, a);
              }, y.prototype.formatAt = function(p, a, r, l) {
                p === 0 && a === this.length() ? this.format(r, l) : b.prototype.formatAt.call(this, p, a, r, l);
              }, y.prototype.formats = function() {
                return this.statics.formats(this.domNode);
              }, y;
            }(f.default)
          );
          i.default = v;
        },
        /* 49 */
        /***/
        function(e, i, o) {
          var h = this && this.__extends || function() {
            var y = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(p, a) {
              p.__proto__ = a;
            } || function(p, a) {
              for (var r in a) a.hasOwnProperty(r) && (p[r] = a[r]);
            };
            return function(p, a) {
              y(p, a);
              function r() {
                this.constructor = p;
              }
              p.prototype = a === null ? Object.create(a) : (r.prototype = a.prototype, new r());
            };
          }();
          Object.defineProperty(i, "__esModule", { value: !0 });
          var f = o(19), v = o(1), b = (
            /** @class */
            function(y) {
              h(p, y);
              function p(a) {
                var r = y.call(this, a) || this;
                return r.text = r.statics.value(r.domNode), r;
              }
              return p.create = function(a) {
                return document.createTextNode(a);
              }, p.value = function(a) {
                var r = a.data;
                return r.normalize && (r = r.normalize()), r;
              }, p.prototype.deleteAt = function(a, r) {
                this.domNode.data = this.text = this.text.slice(0, a) + this.text.slice(a + r);
              }, p.prototype.index = function(a, r) {
                return this.domNode === a ? r : -1;
              }, p.prototype.insertAt = function(a, r, l) {
                l == null ? (this.text = this.text.slice(0, a) + r + this.text.slice(a), this.domNode.data = this.text) : y.prototype.insertAt.call(this, a, r, l);
              }, p.prototype.length = function() {
                return this.text.length;
              }, p.prototype.optimize = function(a) {
                y.prototype.optimize.call(this, a), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof p && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
              }, p.prototype.position = function(a, r) {
                return [this.domNode, a];
              }, p.prototype.split = function(a, r) {
                if (r === void 0 && (r = !1), !r) {
                  if (a === 0)
                    return this;
                  if (a === this.length())
                    return this.next;
                }
                var l = v.create(this.domNode.splitText(a));
                return this.parent.insertBefore(l, this.next), this.text = this.statics.value(this.domNode), l;
              }, p.prototype.update = function(a, r) {
                var l = this;
                a.some(function(g) {
                  return g.type === "characterData" && g.target === l.domNode;
                }) && (this.text = this.statics.value(this.domNode));
              }, p.prototype.value = function() {
                return this.text;
              }, p.blotName = "text", p.scope = v.Scope.INLINE_BLOT, p;
            }(f.default)
          );
          i.default = b;
        },
        /* 50 */
        /***/
        function(e, i, o) {
          var h = document.createElement("div");
          if (h.classList.toggle("test-class", !1), h.classList.contains("test-class")) {
            var f = DOMTokenList.prototype.toggle;
            DOMTokenList.prototype.toggle = function(v, b) {
              return arguments.length > 1 && !this.contains(v) == !b ? b : f.call(this, v);
            };
          }
          String.prototype.startsWith || (String.prototype.startsWith = function(v, b) {
            return b = b || 0, this.substr(b, v.length) === v;
          }), String.prototype.endsWith || (String.prototype.endsWith = function(v, b) {
            var y = this.toString();
            (typeof b != "number" || !isFinite(b) || Math.floor(b) !== b || b > y.length) && (b = y.length), b -= v.length;
            var p = y.indexOf(v, b);
            return p !== -1 && p === b;
          }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
            value: function(b) {
              if (this === null)
                throw new TypeError("Array.prototype.find called on null or undefined");
              if (typeof b != "function")
                throw new TypeError("predicate must be a function");
              for (var y = Object(this), p = y.length >>> 0, a = arguments[1], r, l = 0; l < p; l++)
                if (r = y[l], b.call(a, r, l, y))
                  return r;
            }
          }), document.addEventListener("DOMContentLoaded", function() {
            document.execCommand("enableObjectResizing", !1, !1), document.execCommand("autoUrlDetect", !1, !1);
          });
        },
        /* 51 */
        /***/
        function(e, i) {
          var o = -1, h = 1, f = 0;
          function v(s, w, F) {
            if (s == w)
              return s ? [[f, s]] : [];
            (F < 0 || s.length < F) && (F = null);
            var C = a(s, w), S = s.substring(0, C);
            s = s.substring(C), w = w.substring(C), C = r(s, w);
            var N = s.substring(s.length - C);
            s = s.substring(0, s.length - C), w = w.substring(0, w.length - C);
            var E = b(s, w);
            return S && E.unshift([f, S]), N && E.push([f, N]), g(E), F != null && (E = u(E, F)), E = d(E), E;
          }
          function b(s, w) {
            var F;
            if (!s)
              return [[h, w]];
            if (!w)
              return [[o, s]];
            var C = s.length > w.length ? s : w, S = s.length > w.length ? w : s, N = C.indexOf(S);
            if (N != -1)
              return F = [
                [h, C.substring(0, N)],
                [f, S],
                [h, C.substring(N + S.length)]
              ], s.length > w.length && (F[0][0] = F[2][0] = o), F;
            if (S.length == 1)
              return [[o, s], [h, w]];
            var E = l(s, w);
            if (E) {
              var O = E[0], x = E[1], L = E[2], A = E[3], M = E[4], j = v(O, L), z = v(x, A);
              return j.concat([[f, M]], z);
            }
            return y(s, w);
          }
          function y(s, w) {
            for (var F = s.length, C = w.length, S = Math.ceil((F + C) / 2), N = S, E = 2 * S, O = new Array(E), x = new Array(E), L = 0; L < E; L++)
              O[L] = -1, x[L] = -1;
            O[N + 1] = 0, x[N + 1] = 0;
            for (var A = F - C, M = A % 2 != 0, j = 0, z = 0, G = 0, D = 0, P = 0; P < S; P++) {
              for (var k = -P + j; k <= P - z; k += 2) {
                var R = N + k, B;
                k == -P || k != P && O[R - 1] < O[R + 1] ? B = O[R + 1] : B = O[R - 1] + 1;
                for (var q = B - k; B < F && q < C && s.charAt(B) == w.charAt(q); )
                  B++, q++;
                if (O[R] = B, B > F)
                  z += 2;
                else if (q > C)
                  j += 2;
                else if (M) {
                  var V = N + A - k;
                  if (V >= 0 && V < E && x[V] != -1) {
                    var T = F - x[V];
                    if (B >= T)
                      return p(s, w, B, q);
                  }
                }
              }
              for (var I = -P + G; I <= P - D; I += 2) {
                var V = N + I, T;
                I == -P || I != P && x[V - 1] < x[V + 1] ? T = x[V + 1] : T = x[V - 1] + 1;
                for (var H = T - I; T < F && H < C && s.charAt(F - T - 1) == w.charAt(C - H - 1); )
                  T++, H++;
                if (x[V] = T, T > F)
                  D += 2;
                else if (H > C)
                  G += 2;
                else if (!M) {
                  var R = N + A - I;
                  if (R >= 0 && R < E && O[R] != -1) {
                    var B = O[R], q = N + B - R;
                    if (T = F - T, B >= T)
                      return p(s, w, B, q);
                  }
                }
              }
            }
            return [[o, s], [h, w]];
          }
          function p(s, w, F, C) {
            var S = s.substring(0, F), N = w.substring(0, C), E = s.substring(F), O = w.substring(C), x = v(S, N), L = v(E, O);
            return x.concat(L);
          }
          function a(s, w) {
            if (!s || !w || s.charAt(0) != w.charAt(0))
              return 0;
            for (var F = 0, C = Math.min(s.length, w.length), S = C, N = 0; F < S; )
              s.substring(N, S) == w.substring(N, S) ? (F = S, N = F) : C = S, S = Math.floor((C - F) / 2 + F);
            return S;
          }
          function r(s, w) {
            if (!s || !w || s.charAt(s.length - 1) != w.charAt(w.length - 1))
              return 0;
            for (var F = 0, C = Math.min(s.length, w.length), S = C, N = 0; F < S; )
              s.substring(s.length - S, s.length - N) == w.substring(w.length - S, w.length - N) ? (F = S, N = F) : C = S, S = Math.floor((C - F) / 2 + F);
            return S;
          }
          function l(s, w) {
            var F = s.length > w.length ? s : w, C = s.length > w.length ? w : s;
            if (F.length < 4 || C.length * 2 < F.length)
              return null;
            function S(z, G, D) {
              for (var P = z.substring(D, D + Math.floor(z.length / 4)), k = -1, R = "", B, q, V, T; (k = G.indexOf(P, k + 1)) != -1; ) {
                var I = a(
                  z.substring(D),
                  G.substring(k)
                ), H = r(
                  z.substring(0, D),
                  G.substring(0, k)
                );
                R.length < H + I && (R = G.substring(k - H, k) + G.substring(k, k + I), B = z.substring(0, D - H), q = z.substring(D + I), V = G.substring(0, k - H), T = G.substring(k + I));
              }
              return R.length * 2 >= z.length ? [
                B,
                q,
                V,
                T,
                R
              ] : null;
            }
            var N = S(
              F,
              C,
              Math.ceil(F.length / 4)
            ), E = S(
              F,
              C,
              Math.ceil(F.length / 2)
            ), O;
            if (!N && !E)
              return null;
            E ? N ? O = N[4].length > E[4].length ? N : E : O = E : O = N;
            var x, L, A, M;
            s.length > w.length ? (x = O[0], L = O[1], A = O[2], M = O[3]) : (A = O[0], M = O[1], x = O[2], L = O[3]);
            var j = O[4];
            return [x, L, A, M, j];
          }
          function g(s) {
            s.push([f, ""]);
            for (var w = 0, F = 0, C = 0, S = "", N = "", E; w < s.length; )
              switch (s[w][0]) {
                case h:
                  C++, N += s[w][1], w++;
                  break;
                case o:
                  F++, S += s[w][1], w++;
                  break;
                case f:
                  F + C > 1 ? (F !== 0 && C !== 0 && (E = a(N, S), E !== 0 && (w - F - C > 0 && s[w - F - C - 1][0] == f ? s[w - F - C - 1][1] += N.substring(0, E) : (s.splice(0, 0, [
                    f,
                    N.substring(0, E)
                  ]), w++), N = N.substring(E), S = S.substring(E)), E = r(N, S), E !== 0 && (s[w][1] = N.substring(N.length - E) + s[w][1], N = N.substring(0, N.length - E), S = S.substring(0, S.length - E))), F === 0 ? s.splice(
                    w - C,
                    F + C,
                    [h, N]
                  ) : C === 0 ? s.splice(
                    w - F,
                    F + C,
                    [o, S]
                  ) : s.splice(
                    w - F - C,
                    F + C,
                    [o, S],
                    [h, N]
                  ), w = w - F - C + (F ? 1 : 0) + (C ? 1 : 0) + 1) : w !== 0 && s[w - 1][0] == f ? (s[w - 1][1] += s[w][1], s.splice(w, 1)) : w++, C = 0, F = 0, S = "", N = "";
                  break;
              }
            s[s.length - 1][1] === "" && s.pop();
            var O = !1;
            for (w = 1; w < s.length - 1; )
              s[w - 1][0] == f && s[w + 1][0] == f && (s[w][1].substring(s[w][1].length - s[w - 1][1].length) == s[w - 1][1] ? (s[w][1] = s[w - 1][1] + s[w][1].substring(0, s[w][1].length - s[w - 1][1].length), s[w + 1][1] = s[w - 1][1] + s[w + 1][1], s.splice(w - 1, 1), O = !0) : s[w][1].substring(0, s[w + 1][1].length) == s[w + 1][1] && (s[w - 1][1] += s[w + 1][1], s[w][1] = s[w][1].substring(s[w + 1][1].length) + s[w + 1][1], s.splice(w + 1, 1), O = !0)), w++;
            O && g(s);
          }
          var m = v;
          m.INSERT = h, m.DELETE = o, m.EQUAL = f, e.exports = m;
          function c(s, w) {
            if (w === 0)
              return [f, s];
            for (var F = 0, C = 0; C < s.length; C++) {
              var S = s[C];
              if (S[0] === o || S[0] === f) {
                var N = F + S[1].length;
                if (w === N)
                  return [C + 1, s];
                if (w < N) {
                  s = s.slice();
                  var E = w - F, O = [S[0], S[1].slice(0, E)], x = [S[0], S[1].slice(E)];
                  return s.splice(C, 1, O, x), [C + 1, s];
                } else
                  F = N;
              }
            }
            throw new Error("cursor_pos is out of bounds!");
          }
          function u(s, w) {
            var F = c(s, w), C = F[1], S = F[0], N = C[S], E = C[S + 1];
            if (N == null)
              return s;
            if (N[0] !== f)
              return s;
            if (E != null && N[1] + E[1] === E[1] + N[1])
              return C.splice(S, 2, E, N), _(C, S, 2);
            if (E != null && E[1].indexOf(N[1]) === 0) {
              C.splice(S, 2, [E[0], N[1]], [0, N[1]]);
              var O = E[1].slice(N[1].length);
              return O.length > 0 && C.splice(S + 2, 0, [E[0], O]), _(C, S, 3);
            } else
              return s;
          }
          function d(s) {
            for (var w = !1, F = function(E) {
              return E.charCodeAt(0) >= 56320 && E.charCodeAt(0) <= 57343;
            }, C = function(E) {
              return E.charCodeAt(E.length - 1) >= 55296 && E.charCodeAt(E.length - 1) <= 56319;
            }, S = 2; S < s.length; S += 1)
              s[S - 2][0] === f && C(s[S - 2][1]) && s[S - 1][0] === o && F(s[S - 1][1]) && s[S][0] === h && F(s[S][1]) && (w = !0, s[S - 1][1] = s[S - 2][1].slice(-1) + s[S - 1][1], s[S][1] = s[S - 2][1].slice(-1) + s[S][1], s[S - 2][1] = s[S - 2][1].slice(0, -1));
            if (!w)
              return s;
            for (var N = [], S = 0; S < s.length; S += 1)
              s[S][1].length > 0 && N.push(s[S]);
            return N;
          }
          function _(s, w, F) {
            for (var C = w + F - 1; C >= 0 && C >= w - 1; C--)
              if (C + 1 < s.length) {
                var S = s[C], N = s[C + 1];
                S[0] === N[1] && s.splice(C, 2, [S[0], S[1] + N[1]]);
              }
            return s;
          }
        },
        /* 52 */
        /***/
        function(e, i) {
          i = e.exports = typeof Object.keys == "function" ? Object.keys : o, i.shim = o;
          function o(h) {
            var f = [];
            for (var v in h) f.push(v);
            return f;
          }
        },
        /* 53 */
        /***/
        function(e, i) {
          var o = function() {
            return Object.prototype.toString.call(arguments);
          }() == "[object Arguments]";
          i = e.exports = o ? h : f, i.supported = h;
          function h(v) {
            return Object.prototype.toString.call(v) == "[object Arguments]";
          }
          i.unsupported = f;
          function f(v) {
            return v && typeof v == "object" && typeof v.length == "number" && Object.prototype.hasOwnProperty.call(v, "callee") && !Object.prototype.propertyIsEnumerable.call(v, "callee") || !1;
          }
        },
        /* 54 */
        /***/
        function(e, i) {
          var o = Object.prototype.hasOwnProperty, h = "~";
          function f() {
          }
          Object.create && (f.prototype = /* @__PURE__ */ Object.create(null), new f().__proto__ || (h = !1));
          function v(y, p, a) {
            this.fn = y, this.context = p, this.once = a || !1;
          }
          function b() {
            this._events = new f(), this._eventsCount = 0;
          }
          b.prototype.eventNames = function() {
            var p = [], a, r;
            if (this._eventsCount === 0) return p;
            for (r in a = this._events)
              o.call(a, r) && p.push(h ? r.slice(1) : r);
            return Object.getOwnPropertySymbols ? p.concat(Object.getOwnPropertySymbols(a)) : p;
          }, b.prototype.listeners = function(p, a) {
            var r = h ? h + p : p, l = this._events[r];
            if (a) return !!l;
            if (!l) return [];
            if (l.fn) return [l.fn];
            for (var g = 0, m = l.length, c = new Array(m); g < m; g++)
              c[g] = l[g].fn;
            return c;
          }, b.prototype.emit = function(p, a, r, l, g, m) {
            var c = h ? h + p : p;
            if (!this._events[c]) return !1;
            var u = this._events[c], d = arguments.length, _, s;
            if (u.fn) {
              switch (u.once && this.removeListener(p, u.fn, void 0, !0), d) {
                case 1:
                  return u.fn.call(u.context), !0;
                case 2:
                  return u.fn.call(u.context, a), !0;
                case 3:
                  return u.fn.call(u.context, a, r), !0;
                case 4:
                  return u.fn.call(u.context, a, r, l), !0;
                case 5:
                  return u.fn.call(u.context, a, r, l, g), !0;
                case 6:
                  return u.fn.call(u.context, a, r, l, g, m), !0;
              }
              for (s = 1, _ = new Array(d - 1); s < d; s++)
                _[s - 1] = arguments[s];
              u.fn.apply(u.context, _);
            } else {
              var w = u.length, F;
              for (s = 0; s < w; s++)
                switch (u[s].once && this.removeListener(p, u[s].fn, void 0, !0), d) {
                  case 1:
                    u[s].fn.call(u[s].context);
                    break;
                  case 2:
                    u[s].fn.call(u[s].context, a);
                    break;
                  case 3:
                    u[s].fn.call(u[s].context, a, r);
                    break;
                  case 4:
                    u[s].fn.call(u[s].context, a, r, l);
                    break;
                  default:
                    if (!_) for (F = 1, _ = new Array(d - 1); F < d; F++)
                      _[F - 1] = arguments[F];
                    u[s].fn.apply(u[s].context, _);
                }
            }
            return !0;
          }, b.prototype.on = function(p, a, r) {
            var l = new v(a, r || this), g = h ? h + p : p;
            return this._events[g] ? this._events[g].fn ? this._events[g] = [this._events[g], l] : this._events[g].push(l) : (this._events[g] = l, this._eventsCount++), this;
          }, b.prototype.once = function(p, a, r) {
            var l = new v(a, r || this, !0), g = h ? h + p : p;
            return this._events[g] ? this._events[g].fn ? this._events[g] = [this._events[g], l] : this._events[g].push(l) : (this._events[g] = l, this._eventsCount++), this;
          }, b.prototype.removeListener = function(p, a, r, l) {
            var g = h ? h + p : p;
            if (!this._events[g]) return this;
            if (!a)
              return --this._eventsCount === 0 ? this._events = new f() : delete this._events[g], this;
            var m = this._events[g];
            if (m.fn)
              m.fn === a && (!l || m.once) && (!r || m.context === r) && (--this._eventsCount === 0 ? this._events = new f() : delete this._events[g]);
            else {
              for (var c = 0, u = [], d = m.length; c < d; c++)
                (m[c].fn !== a || l && !m[c].once || r && m[c].context !== r) && u.push(m[c]);
              u.length ? this._events[g] = u.length === 1 ? u[0] : u : --this._eventsCount === 0 ? this._events = new f() : delete this._events[g];
            }
            return this;
          }, b.prototype.removeAllListeners = function(p) {
            var a;
            return p ? (a = h ? h + p : p, this._events[a] && (--this._eventsCount === 0 ? this._events = new f() : delete this._events[a])) : (this._events = new f(), this._eventsCount = 0), this;
          }, b.prototype.off = b.prototype.removeListener, b.prototype.addListener = b.prototype.on, b.prototype.setMaxListeners = function() {
            return this;
          }, b.prefixed = h, b.EventEmitter = b, typeof e < "u" && (e.exports = b);
        },
        /* 55 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.matchText = i.matchSpacing = i.matchNewline = i.matchBlot = i.matchAttributor = i.default = void 0;
          var h = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(U) {
            return typeof U;
          } : function(U) {
            return U && typeof Symbol == "function" && U.constructor === Symbol && U !== Symbol.prototype ? "symbol" : typeof U;
          }, f = /* @__PURE__ */ function() {
            function U($, J) {
              var Y = [], Z = !0, te = !1, ne = void 0;
              try {
                for (var ie = $[Symbol.iterator](), de; !(Z = (de = ie.next()).done) && (Y.push(de.value), !(J && Y.length === J)); Z = !0)
                  ;
              } catch (ce) {
                te = !0, ne = ce;
              } finally {
                try {
                  !Z && ie.return && ie.return();
                } finally {
                  if (te) throw ne;
                }
              }
              return Y;
            }
            return function($, J) {
              if (Array.isArray($))
                return $;
              if (Symbol.iterator in Object($))
                return U($, J);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), v = /* @__PURE__ */ function() {
            function U($, J) {
              for (var Y = 0; Y < J.length; Y++) {
                var Z = J[Y];
                Z.enumerable = Z.enumerable || !1, Z.configurable = !0, "value" in Z && (Z.writable = !0), Object.defineProperty($, Z.key, Z);
              }
            }
            return function($, J, Y) {
              return J && U($.prototype, J), Y && U($, Y), $;
            };
          }(), b = o(3), y = x(b), p = o(2), a = x(p), r = o(0), l = x(r), g = o(5), m = x(g), c = o(10), u = x(c), d = o(9), _ = x(d), s = o(36), w = o(37), F = o(13), C = x(F), S = o(26), N = o(38), E = o(39), O = o(40);
          function x(U) {
            return U && U.__esModule ? U : { default: U };
          }
          function L(U, $, J) {
            return $ in U ? Object.defineProperty(U, $, { value: J, enumerable: !0, configurable: !0, writable: !0 }) : U[$] = J, U;
          }
          function A(U, $) {
            if (!(U instanceof $))
              throw new TypeError("Cannot call a class as a function");
          }
          function M(U, $) {
            if (!U)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return $ && (typeof $ == "object" || typeof $ == "function") ? $ : U;
          }
          function j(U, $) {
            if (typeof $ != "function" && $ !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof $);
            U.prototype = Object.create($ && $.prototype, { constructor: { value: U, enumerable: !1, writable: !0, configurable: !0 } }), $ && (Object.setPrototypeOf ? Object.setPrototypeOf(U, $) : U.__proto__ = $);
          }
          var z = (0, u.default)("quill:clipboard"), G = "__ql-matcher", D = [[Node.TEXT_NODE, se], [Node.TEXT_NODE, oe], ["br", X], [Node.ELEMENT_NODE, oe], [Node.ELEMENT_NODE, K], [Node.ELEMENT_NODE, re], [Node.ELEMENT_NODE, W], [Node.ELEMENT_NODE, ue], ["li", ee], ["b", H.bind(H, "bold")], ["i", H.bind(H, "italic")], ["style", Q]], P = [s.AlignAttribute, N.DirectionAttribute].reduce(function(U, $) {
            return U[$.keyName] = $, U;
          }, {}), k = [s.AlignStyle, w.BackgroundStyle, S.ColorStyle, N.DirectionStyle, E.FontStyle, O.SizeStyle].reduce(function(U, $) {
            return U[$.keyName] = $, U;
          }, {}), R = function(U) {
            j($, U);
            function $(J, Y) {
              A(this, $);
              var Z = M(this, ($.__proto__ || Object.getPrototypeOf($)).call(this, J, Y));
              return Z.quill.root.addEventListener("paste", Z.onPaste.bind(Z)), Z.container = Z.quill.addContainer("ql-clipboard"), Z.container.setAttribute("contenteditable", !0), Z.container.setAttribute("tabindex", -1), Z.matchers = [], D.concat(Z.options.matchers).forEach(function(te) {
                var ne = f(te, 2), ie = ne[0], de = ne[1];
                !Y.matchVisual && de === re || Z.addMatcher(ie, de);
              }), Z;
            }
            return v($, [{
              key: "addMatcher",
              value: function(Y, Z) {
                this.matchers.push([Y, Z]);
              }
            }, {
              key: "convert",
              value: function(Y) {
                if (typeof Y == "string")
                  return this.container.innerHTML = Y.replace(/\>\r?\n +\</g, "><"), this.convert();
                var Z = this.quill.getFormat(this.quill.selection.savedRange.index);
                if (Z[C.default.blotName]) {
                  var te = this.container.innerText;
                  return this.container.innerHTML = "", new a.default().insert(te, L({}, C.default.blotName, Z[C.default.blotName]));
                }
                var ne = this.prepareMatching(), ie = f(ne, 2), de = ie[0], ce = ie[1], le = I(this.container, de, ce);
                return V(le, `
`) && le.ops[le.ops.length - 1].attributes == null && (le = le.compose(new a.default().retain(le.length() - 1).delete(1))), z.log("convert", this.container.innerHTML, le), this.container.innerHTML = "", le;
              }
            }, {
              key: "dangerouslyPasteHTML",
              value: function(Y, Z) {
                var te = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : m.default.sources.API;
                if (typeof Y == "string")
                  this.quill.setContents(this.convert(Y), Z), this.quill.setSelection(0, m.default.sources.SILENT);
                else {
                  var ne = this.convert(Z);
                  this.quill.updateContents(new a.default().retain(Y).concat(ne), te), this.quill.setSelection(Y + ne.length(), m.default.sources.SILENT);
                }
              }
            }, {
              key: "onPaste",
              value: function(Y) {
                var Z = this;
                if (!(Y.defaultPrevented || !this.quill.isEnabled())) {
                  var te = this.quill.getSelection(), ne = new a.default().retain(te.index), ie = this.quill.scrollingContainer.scrollTop;
                  this.container.focus(), this.quill.selection.update(m.default.sources.SILENT), setTimeout(function() {
                    ne = ne.concat(Z.convert()).delete(te.length), Z.quill.updateContents(ne, m.default.sources.USER), Z.quill.setSelection(ne.length() - te.length, m.default.sources.SILENT), Z.quill.scrollingContainer.scrollTop = ie, Z.quill.focus();
                  }, 1);
                }
              }
            }, {
              key: "prepareMatching",
              value: function() {
                var Y = this, Z = [], te = [];
                return this.matchers.forEach(function(ne) {
                  var ie = f(ne, 2), de = ie[0], ce = ie[1];
                  switch (de) {
                    case Node.TEXT_NODE:
                      te.push(ce);
                      break;
                    case Node.ELEMENT_NODE:
                      Z.push(ce);
                      break;
                    default:
                      [].forEach.call(Y.container.querySelectorAll(de), function(le) {
                        le[G] = le[G] || [], le[G].push(ce);
                      });
                      break;
                  }
                }), [Z, te];
              }
            }]), $;
          }(_.default);
          R.DEFAULTS = {
            matchers: [],
            matchVisual: !0
          };
          function B(U, $, J) {
            return (typeof $ > "u" ? "undefined" : h($)) === "object" ? Object.keys($).reduce(function(Y, Z) {
              return B(Y, Z, $[Z]);
            }, U) : U.reduce(function(Y, Z) {
              return Z.attributes && Z.attributes[$] ? Y.push(Z) : Y.insert(Z.insert, (0, y.default)({}, L({}, $, J), Z.attributes));
            }, new a.default());
          }
          function q(U) {
            if (U.nodeType !== Node.ELEMENT_NODE) return {};
            var $ = "__ql-computed-style";
            return U[$] || (U[$] = window.getComputedStyle(U));
          }
          function V(U, $) {
            for (var J = "", Y = U.ops.length - 1; Y >= 0 && J.length < $.length; --Y) {
              var Z = U.ops[Y];
              if (typeof Z.insert != "string") break;
              J = Z.insert + J;
            }
            return J.slice(-1 * $.length) === $;
          }
          function T(U) {
            if (U.childNodes.length === 0) return !1;
            var $ = q(U);
            return ["block", "list-item"].indexOf($.display) > -1;
          }
          function I(U, $, J) {
            return U.nodeType === U.TEXT_NODE ? J.reduce(function(Y, Z) {
              return Z(U, Y);
            }, new a.default()) : U.nodeType === U.ELEMENT_NODE ? [].reduce.call(U.childNodes || [], function(Y, Z) {
              var te = I(Z, $, J);
              return Z.nodeType === U.ELEMENT_NODE && (te = $.reduce(function(ne, ie) {
                return ie(Z, ne);
              }, te), te = (Z[G] || []).reduce(function(ne, ie) {
                return ie(Z, ne);
              }, te)), Y.concat(te);
            }, new a.default()) : new a.default();
          }
          function H(U, $, J) {
            return B(J, U, !0);
          }
          function W(U, $) {
            var J = l.default.Attributor.Attribute.keys(U), Y = l.default.Attributor.Class.keys(U), Z = l.default.Attributor.Style.keys(U), te = {};
            return J.concat(Y).concat(Z).forEach(function(ne) {
              var ie = l.default.query(ne, l.default.Scope.ATTRIBUTE);
              ie != null && (te[ie.attrName] = ie.value(U), te[ie.attrName]) || (ie = P[ne], ie != null && (ie.attrName === ne || ie.keyName === ne) && (te[ie.attrName] = ie.value(U) || void 0), ie = k[ne], ie != null && (ie.attrName === ne || ie.keyName === ne) && (ie = k[ne], te[ie.attrName] = ie.value(U) || void 0));
            }), Object.keys(te).length > 0 && ($ = B($, te)), $;
          }
          function K(U, $) {
            var J = l.default.query(U);
            if (J == null) return $;
            if (J.prototype instanceof l.default.Embed) {
              var Y = {}, Z = J.value(U);
              Z != null && (Y[J.blotName] = Z, $ = new a.default().insert(Y, J.formats(U)));
            } else typeof J.formats == "function" && ($ = B($, J.blotName, J.formats(U)));
            return $;
          }
          function X(U, $) {
            return V($, `
`) || $.insert(`
`), $;
          }
          function Q() {
            return new a.default();
          }
          function ee(U, $) {
            var J = l.default.query(U);
            if (J == null || J.blotName !== "list-item" || !V($, `
`))
              return $;
            for (var Y = -1, Z = U.parentNode; !Z.classList.contains("ql-clipboard"); )
              (l.default.query(Z) || {}).blotName === "list" && (Y += 1), Z = Z.parentNode;
            return Y <= 0 ? $ : $.compose(new a.default().retain($.length() - 1).retain(1, { indent: Y }));
          }
          function oe(U, $) {
            return V($, `
`) || (T(U) || $.length() > 0 && U.nextSibling && T(U.nextSibling)) && $.insert(`
`), $;
          }
          function re(U, $) {
            if (T(U) && U.nextElementSibling != null && !V($, `

`)) {
              var J = U.offsetHeight + parseFloat(q(U).marginTop) + parseFloat(q(U).marginBottom);
              U.nextElementSibling.offsetTop > U.offsetTop + J * 1.5 && $.insert(`
`);
            }
            return $;
          }
          function ue(U, $) {
            var J = {}, Y = U.style || {};
            return Y.fontStyle && q(U).fontStyle === "italic" && (J.italic = !0), Y.fontWeight && (q(U).fontWeight.startsWith("bold") || parseInt(q(U).fontWeight) >= 700) && (J.bold = !0), Object.keys(J).length > 0 && ($ = B($, J)), parseFloat(Y.textIndent || 0) > 0 && ($ = new a.default().insert("	").concat($)), $;
          }
          function se(U, $) {
            var J = U.data;
            if (U.parentNode.tagName === "O:P")
              return $.insert(J.trim());
            if (J.trim().length === 0 && U.parentNode.classList.contains("ql-clipboard"))
              return $;
            if (!q(U.parentNode).whiteSpace.startsWith("pre")) {
              var Y = function(te, ne) {
                return ne = ne.replace(/[^\u00a0]/g, ""), ne.length < 1 && te ? " " : ne;
              };
              J = J.replace(/\r\n/g, " ").replace(/\n/g, " "), J = J.replace(/\s\s+/g, Y.bind(Y, !0)), (U.previousSibling == null && T(U.parentNode) || U.previousSibling != null && T(U.previousSibling)) && (J = J.replace(/^\s+/, Y.bind(Y, !1))), (U.nextSibling == null && T(U.parentNode) || U.nextSibling != null && T(U.nextSibling)) && (J = J.replace(/\s+$/, Y.bind(Y, !1)));
            }
            return $.insert(J);
          }
          i.default = R, i.matchAttributor = W, i.matchBlot = K, i.matchNewline = oe, i.matchSpacing = re, i.matchText = se;
        },
        /* 56 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = /* @__PURE__ */ function() {
            function g(m, c) {
              for (var u = 0; u < c.length; u++) {
                var d = c[u];
                d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(m, d.key, d);
              }
            }
            return function(m, c, u) {
              return c && g(m.prototype, c), u && g(m, u), m;
            };
          }(), f = function g(m, c, u) {
            m === null && (m = Function.prototype);
            var d = Object.getOwnPropertyDescriptor(m, c);
            if (d === void 0) {
              var _ = Object.getPrototypeOf(m);
              return _ === null ? void 0 : g(_, c, u);
            } else {
              if ("value" in d)
                return d.value;
              var s = d.get;
              return s === void 0 ? void 0 : s.call(u);
            }
          }, v = o(6), b = y(v);
          function y(g) {
            return g && g.__esModule ? g : { default: g };
          }
          function p(g, m) {
            if (!(g instanceof m))
              throw new TypeError("Cannot call a class as a function");
          }
          function a(g, m) {
            if (!g)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return m && (typeof m == "object" || typeof m == "function") ? m : g;
          }
          function r(g, m) {
            if (typeof m != "function" && m !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof m);
            g.prototype = Object.create(m && m.prototype, { constructor: { value: g, enumerable: !1, writable: !0, configurable: !0 } }), m && (Object.setPrototypeOf ? Object.setPrototypeOf(g, m) : g.__proto__ = m);
          }
          var l = function(g) {
            r(m, g);
            function m() {
              return p(this, m), a(this, (m.__proto__ || Object.getPrototypeOf(m)).apply(this, arguments));
            }
            return h(m, [{
              key: "optimize",
              value: function(u) {
                f(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "optimize", this).call(this, u), this.domNode.tagName !== this.statics.tagName[0] && this.replaceWith(this.statics.blotName);
              }
            }], [{
              key: "create",
              value: function() {
                return f(m.__proto__ || Object.getPrototypeOf(m), "create", this).call(this);
              }
            }, {
              key: "formats",
              value: function() {
                return !0;
              }
            }]), m;
          }(b.default);
          l.blotName = "bold", l.tagName = ["STRONG", "B"], i.default = l;
        },
        /* 57 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.addControls = i.default = void 0;
          var h = /* @__PURE__ */ function() {
            function O(x, L) {
              var A = [], M = !0, j = !1, z = void 0;
              try {
                for (var G = x[Symbol.iterator](), D; !(M = (D = G.next()).done) && (A.push(D.value), !(L && A.length === L)); M = !0)
                  ;
              } catch (P) {
                j = !0, z = P;
              } finally {
                try {
                  !M && G.return && G.return();
                } finally {
                  if (j) throw z;
                }
              }
              return A;
            }
            return function(x, L) {
              if (Array.isArray(x))
                return x;
              if (Symbol.iterator in Object(x))
                return O(x, L);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), f = /* @__PURE__ */ function() {
            function O(x, L) {
              for (var A = 0; A < L.length; A++) {
                var M = L[A];
                M.enumerable = M.enumerable || !1, M.configurable = !0, "value" in M && (M.writable = !0), Object.defineProperty(x, M.key, M);
              }
            }
            return function(x, L, A) {
              return L && O(x.prototype, L), A && O(x, A), x;
            };
          }(), v = o(2), b = u(v), y = o(0), p = u(y), a = o(5), r = u(a), l = o(10), g = u(l), m = o(9), c = u(m);
          function u(O) {
            return O && O.__esModule ? O : { default: O };
          }
          function d(O, x, L) {
            return x in O ? Object.defineProperty(O, x, { value: L, enumerable: !0, configurable: !0, writable: !0 }) : O[x] = L, O;
          }
          function _(O, x) {
            if (!(O instanceof x))
              throw new TypeError("Cannot call a class as a function");
          }
          function s(O, x) {
            if (!O)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return x && (typeof x == "object" || typeof x == "function") ? x : O;
          }
          function w(O, x) {
            if (typeof x != "function" && x !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof x);
            O.prototype = Object.create(x && x.prototype, { constructor: { value: O, enumerable: !1, writable: !0, configurable: !0 } }), x && (Object.setPrototypeOf ? Object.setPrototypeOf(O, x) : O.__proto__ = x);
          }
          var F = (0, g.default)("quill:toolbar"), C = function(O) {
            w(x, O);
            function x(L, A) {
              _(this, x);
              var M = s(this, (x.__proto__ || Object.getPrototypeOf(x)).call(this, L, A));
              if (Array.isArray(M.options.container)) {
                var j = document.createElement("div");
                N(j, M.options.container), L.container.parentNode.insertBefore(j, L.container), M.container = j;
              } else typeof M.options.container == "string" ? M.container = document.querySelector(M.options.container) : M.container = M.options.container;
              if (!(M.container instanceof HTMLElement)) {
                var z;
                return z = F.error("Container required for toolbar", M.options), s(M, z);
              }
              return M.container.classList.add("ql-toolbar"), M.controls = [], M.handlers = {}, Object.keys(M.options.handlers).forEach(function(G) {
                M.addHandler(G, M.options.handlers[G]);
              }), [].forEach.call(M.container.querySelectorAll("button, select"), function(G) {
                M.attach(G);
              }), M.quill.on(r.default.events.EDITOR_CHANGE, function(G, D) {
                G === r.default.events.SELECTION_CHANGE && M.update(D);
              }), M.quill.on(r.default.events.SCROLL_OPTIMIZE, function() {
                var G = M.quill.selection.getRange(), D = h(G, 1), P = D[0];
                M.update(P);
              }), M;
            }
            return f(x, [{
              key: "addHandler",
              value: function(A, M) {
                this.handlers[A] = M;
              }
            }, {
              key: "attach",
              value: function(A) {
                var M = this, j = [].find.call(A.classList, function(G) {
                  return G.indexOf("ql-") === 0;
                });
                if (j) {
                  if (j = j.slice(3), A.tagName === "BUTTON" && A.setAttribute("type", "button"), this.handlers[j] == null) {
                    if (this.quill.scroll.whitelist != null && this.quill.scroll.whitelist[j] == null) {
                      F.warn("ignoring attaching to disabled format", j, A);
                      return;
                    }
                    if (p.default.query(j) == null) {
                      F.warn("ignoring attaching to nonexistent format", j, A);
                      return;
                    }
                  }
                  var z = A.tagName === "SELECT" ? "change" : "click";
                  A.addEventListener(z, function(G) {
                    var D = void 0;
                    if (A.tagName === "SELECT") {
                      if (A.selectedIndex < 0) return;
                      var P = A.options[A.selectedIndex];
                      P.hasAttribute("selected") ? D = !1 : D = P.value || !1;
                    } else
                      A.classList.contains("ql-active") ? D = !1 : D = A.value || !A.hasAttribute("value"), G.preventDefault();
                    M.quill.focus();
                    var k = M.quill.selection.getRange(), R = h(k, 1), B = R[0];
                    if (M.handlers[j] != null)
                      M.handlers[j].call(M, D);
                    else if (p.default.query(j).prototype instanceof p.default.Embed) {
                      if (D = prompt("Enter " + j), !D) return;
                      M.quill.updateContents(new b.default().retain(B.index).delete(B.length).insert(d({}, j, D)), r.default.sources.USER);
                    } else
                      M.quill.format(j, D, r.default.sources.USER);
                    M.update(B);
                  }), this.controls.push([j, A]);
                }
              }
            }, {
              key: "update",
              value: function(A) {
                var M = A == null ? {} : this.quill.getFormat(A);
                this.controls.forEach(function(j) {
                  var z = h(j, 2), G = z[0], D = z[1];
                  if (D.tagName === "SELECT") {
                    var P = void 0;
                    if (A == null)
                      P = null;
                    else if (M[G] == null)
                      P = D.querySelector("option[selected]");
                    else if (!Array.isArray(M[G])) {
                      var k = M[G];
                      typeof k == "string" && (k = k.replace(/\"/g, '\\"')), P = D.querySelector('option[value="' + k + '"]');
                    }
                    P == null ? (D.value = "", D.selectedIndex = -1) : P.selected = !0;
                  } else if (A == null)
                    D.classList.remove("ql-active");
                  else if (D.hasAttribute("value")) {
                    var R = M[G] === D.getAttribute("value") || M[G] != null && M[G].toString() === D.getAttribute("value") || M[G] == null && !D.getAttribute("value");
                    D.classList.toggle("ql-active", R);
                  } else
                    D.classList.toggle("ql-active", M[G] != null);
                });
              }
            }]), x;
          }(c.default);
          C.DEFAULTS = {};
          function S(O, x, L) {
            var A = document.createElement("button");
            A.setAttribute("type", "button"), A.classList.add("ql-" + x), L != null && (A.value = L), O.appendChild(A);
          }
          function N(O, x) {
            Array.isArray(x[0]) || (x = [x]), x.forEach(function(L) {
              var A = document.createElement("span");
              A.classList.add("ql-formats"), L.forEach(function(M) {
                if (typeof M == "string")
                  S(A, M);
                else {
                  var j = Object.keys(M)[0], z = M[j];
                  Array.isArray(z) ? E(A, j, z) : S(A, j, z);
                }
              }), O.appendChild(A);
            });
          }
          function E(O, x, L) {
            var A = document.createElement("select");
            A.classList.add("ql-" + x), L.forEach(function(M) {
              var j = document.createElement("option");
              M !== !1 ? j.setAttribute("value", M) : j.setAttribute("selected", "selected"), A.appendChild(j);
            }), O.appendChild(A);
          }
          C.DEFAULTS = {
            container: null,
            handlers: {
              clean: function() {
                var x = this, L = this.quill.getSelection();
                if (L != null)
                  if (L.length == 0) {
                    var A = this.quill.getFormat();
                    Object.keys(A).forEach(function(M) {
                      p.default.query(M, p.default.Scope.INLINE) != null && x.quill.format(M, !1);
                    });
                  } else
                    this.quill.removeFormat(L, r.default.sources.USER);
              },
              direction: function(x) {
                var L = this.quill.getFormat().align;
                x === "rtl" && L == null ? this.quill.format("align", "right", r.default.sources.USER) : !x && L === "right" && this.quill.format("align", !1, r.default.sources.USER), this.quill.format("direction", x, r.default.sources.USER);
              },
              indent: function(x) {
                var L = this.quill.getSelection(), A = this.quill.getFormat(L), M = parseInt(A.indent || 0);
                if (x === "+1" || x === "-1") {
                  var j = x === "+1" ? 1 : -1;
                  A.direction === "rtl" && (j *= -1), this.quill.format("indent", M + j, r.default.sources.USER);
                }
              },
              link: function(x) {
                x === !0 && (x = prompt("Enter link URL:")), this.quill.format("link", x, r.default.sources.USER);
              },
              list: function(x) {
                var L = this.quill.getSelection(), A = this.quill.getFormat(L);
                x === "check" ? A.list === "checked" || A.list === "unchecked" ? this.quill.format("list", !1, r.default.sources.USER) : this.quill.format("list", "unchecked", r.default.sources.USER) : this.quill.format("list", x, r.default.sources.USER);
              }
            }
          }, i.default = C, i.addControls = N;
        },
        /* 58 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline> <polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"></polyline> <line class=ql-stroke x1=10 x2=8 y1=5 y2=13></line> </svg>';
        },
        /* 59 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = /* @__PURE__ */ function() {
            function g(m, c) {
              for (var u = 0; u < c.length; u++) {
                var d = c[u];
                d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(m, d.key, d);
              }
            }
            return function(m, c, u) {
              return c && g(m.prototype, c), u && g(m, u), m;
            };
          }(), f = function g(m, c, u) {
            m === null && (m = Function.prototype);
            var d = Object.getOwnPropertyDescriptor(m, c);
            if (d === void 0) {
              var _ = Object.getPrototypeOf(m);
              return _ === null ? void 0 : g(_, c, u);
            } else {
              if ("value" in d)
                return d.value;
              var s = d.get;
              return s === void 0 ? void 0 : s.call(u);
            }
          }, v = o(28), b = y(v);
          function y(g) {
            return g && g.__esModule ? g : { default: g };
          }
          function p(g, m) {
            if (!(g instanceof m))
              throw new TypeError("Cannot call a class as a function");
          }
          function a(g, m) {
            if (!g)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return m && (typeof m == "object" || typeof m == "function") ? m : g;
          }
          function r(g, m) {
            if (typeof m != "function" && m !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof m);
            g.prototype = Object.create(m && m.prototype, { constructor: { value: g, enumerable: !1, writable: !0, configurable: !0 } }), m && (Object.setPrototypeOf ? Object.setPrototypeOf(g, m) : g.__proto__ = m);
          }
          var l = function(g) {
            r(m, g);
            function m(c, u) {
              p(this, m);
              var d = a(this, (m.__proto__ || Object.getPrototypeOf(m)).call(this, c));
              return d.label.innerHTML = u, d.container.classList.add("ql-color-picker"), [].slice.call(d.container.querySelectorAll(".ql-picker-item"), 0, 7).forEach(function(_) {
                _.classList.add("ql-primary");
              }), d;
            }
            return h(m, [{
              key: "buildItem",
              value: function(u) {
                var d = f(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "buildItem", this).call(this, u);
                return d.style.backgroundColor = u.getAttribute("value") || "", d;
              }
            }, {
              key: "selectItem",
              value: function(u, d) {
                f(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "selectItem", this).call(this, u, d);
                var _ = this.label.querySelector(".ql-color-label"), s = u && u.getAttribute("data-value") || "";
                _ && (_.tagName === "line" ? _.style.stroke = s : _.style.fill = s);
              }
            }]), m;
          }(b.default);
          i.default = l;
        },
        /* 60 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = /* @__PURE__ */ function() {
            function g(m, c) {
              for (var u = 0; u < c.length; u++) {
                var d = c[u];
                d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(m, d.key, d);
              }
            }
            return function(m, c, u) {
              return c && g(m.prototype, c), u && g(m, u), m;
            };
          }(), f = function g(m, c, u) {
            m === null && (m = Function.prototype);
            var d = Object.getOwnPropertyDescriptor(m, c);
            if (d === void 0) {
              var _ = Object.getPrototypeOf(m);
              return _ === null ? void 0 : g(_, c, u);
            } else {
              if ("value" in d)
                return d.value;
              var s = d.get;
              return s === void 0 ? void 0 : s.call(u);
            }
          }, v = o(28), b = y(v);
          function y(g) {
            return g && g.__esModule ? g : { default: g };
          }
          function p(g, m) {
            if (!(g instanceof m))
              throw new TypeError("Cannot call a class as a function");
          }
          function a(g, m) {
            if (!g)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return m && (typeof m == "object" || typeof m == "function") ? m : g;
          }
          function r(g, m) {
            if (typeof m != "function" && m !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof m);
            g.prototype = Object.create(m && m.prototype, { constructor: { value: g, enumerable: !1, writable: !0, configurable: !0 } }), m && (Object.setPrototypeOf ? Object.setPrototypeOf(g, m) : g.__proto__ = m);
          }
          var l = function(g) {
            r(m, g);
            function m(c, u) {
              p(this, m);
              var d = a(this, (m.__proto__ || Object.getPrototypeOf(m)).call(this, c));
              return d.container.classList.add("ql-icon-picker"), [].forEach.call(d.container.querySelectorAll(".ql-picker-item"), function(_) {
                _.innerHTML = u[_.getAttribute("data-value") || ""];
              }), d.defaultItem = d.container.querySelector(".ql-selected"), d.selectItem(d.defaultItem), d;
            }
            return h(m, [{
              key: "selectItem",
              value: function(u, d) {
                f(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "selectItem", this).call(this, u, d), u = u || this.defaultItem, this.label.innerHTML = u.innerHTML;
              }
            }]), m;
          }(b.default);
          i.default = l;
        },
        /* 61 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = /* @__PURE__ */ function() {
            function b(y, p) {
              for (var a = 0; a < p.length; a++) {
                var r = p[a];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(y, r.key, r);
              }
            }
            return function(y, p, a) {
              return p && b(y.prototype, p), a && b(y, a), y;
            };
          }();
          function f(b, y) {
            if (!(b instanceof y))
              throw new TypeError("Cannot call a class as a function");
          }
          var v = function() {
            function b(y, p) {
              var a = this;
              f(this, b), this.quill = y, this.boundsContainer = p || document.body, this.root = y.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, this.quill.root === this.quill.scrollingContainer && this.quill.root.addEventListener("scroll", function() {
                a.root.style.marginTop = -1 * a.quill.root.scrollTop + "px";
              }), this.hide();
            }
            return h(b, [{
              key: "hide",
              value: function() {
                this.root.classList.add("ql-hidden");
              }
            }, {
              key: "position",
              value: function(p) {
                var a = p.left + p.width / 2 - this.root.offsetWidth / 2, r = p.bottom + this.quill.root.scrollTop;
                this.root.style.left = a + "px", this.root.style.top = r + "px", this.root.classList.remove("ql-flip");
                var l = this.boundsContainer.getBoundingClientRect(), g = this.root.getBoundingClientRect(), m = 0;
                if (g.right > l.right && (m = l.right - g.right, this.root.style.left = a + m + "px"), g.left < l.left && (m = l.left - g.left, this.root.style.left = a + m + "px"), g.bottom > l.bottom) {
                  var c = g.bottom - g.top, u = p.bottom - p.top + c;
                  this.root.style.top = r - u + "px", this.root.classList.add("ql-flip");
                }
                return m;
              }
            }, {
              key: "show",
              value: function() {
                this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
              }
            }]), b;
          }();
          i.default = v;
        },
        /* 62 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = /* @__PURE__ */ function() {
            function E(O, x) {
              var L = [], A = !0, M = !1, j = void 0;
              try {
                for (var z = O[Symbol.iterator](), G; !(A = (G = z.next()).done) && (L.push(G.value), !(x && L.length === x)); A = !0)
                  ;
              } catch (D) {
                M = !0, j = D;
              } finally {
                try {
                  !A && z.return && z.return();
                } finally {
                  if (M) throw j;
                }
              }
              return L;
            }
            return function(O, x) {
              if (Array.isArray(O))
                return O;
              if (Symbol.iterator in Object(O))
                return E(O, x);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), f = function E(O, x, L) {
            O === null && (O = Function.prototype);
            var A = Object.getOwnPropertyDescriptor(O, x);
            if (A === void 0) {
              var M = Object.getPrototypeOf(O);
              return M === null ? void 0 : E(M, x, L);
            } else {
              if ("value" in A)
                return A.value;
              var j = A.get;
              return j === void 0 ? void 0 : j.call(L);
            }
          }, v = /* @__PURE__ */ function() {
            function E(O, x) {
              for (var L = 0; L < x.length; L++) {
                var A = x[L];
                A.enumerable = A.enumerable || !1, A.configurable = !0, "value" in A && (A.writable = !0), Object.defineProperty(O, A.key, A);
              }
            }
            return function(O, x, L) {
              return x && E(O.prototype, x), L && E(O, L), O;
            };
          }(), b = o(3), y = _(b), p = o(8), a = _(p), r = o(43), l = _(r), g = o(27), m = _(g), c = o(15), u = o(41), d = _(u);
          function _(E) {
            return E && E.__esModule ? E : { default: E };
          }
          function s(E, O) {
            if (!(E instanceof O))
              throw new TypeError("Cannot call a class as a function");
          }
          function w(E, O) {
            if (!E)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return O && (typeof O == "object" || typeof O == "function") ? O : E;
          }
          function F(E, O) {
            if (typeof O != "function" && O !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof O);
            E.prototype = Object.create(O && O.prototype, { constructor: { value: E, enumerable: !1, writable: !0, configurable: !0 } }), O && (Object.setPrototypeOf ? Object.setPrototypeOf(E, O) : E.__proto__ = O);
          }
          var C = [[{ header: ["1", "2", "3", !1] }], ["bold", "italic", "underline", "link"], [{ list: "ordered" }, { list: "bullet" }], ["clean"]], S = function(E) {
            F(O, E);
            function O(x, L) {
              s(this, O), L.modules.toolbar != null && L.modules.toolbar.container == null && (L.modules.toolbar.container = C);
              var A = w(this, (O.__proto__ || Object.getPrototypeOf(O)).call(this, x, L));
              return A.quill.container.classList.add("ql-snow"), A;
            }
            return v(O, [{
              key: "extendToolbar",
              value: function(L) {
                L.container.classList.add("ql-snow"), this.buildButtons([].slice.call(L.container.querySelectorAll("button")), d.default), this.buildPickers([].slice.call(L.container.querySelectorAll("select")), d.default), this.tooltip = new N(this.quill, this.options.bounds), L.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({ key: "K", shortKey: !0 }, function(A, M) {
                  L.handlers.link.call(L, !M.format.link);
                });
              }
            }]), O;
          }(l.default);
          S.DEFAULTS = (0, y.default)(!0, {}, l.default.DEFAULTS, {
            modules: {
              toolbar: {
                handlers: {
                  link: function(O) {
                    if (O) {
                      var x = this.quill.getSelection();
                      if (x == null || x.length == 0) return;
                      var L = this.quill.getText(x);
                      /^\S+@\S+\.\S+$/.test(L) && L.indexOf("mailto:") !== 0 && (L = "mailto:" + L);
                      var A = this.quill.theme.tooltip;
                      A.edit("link", L);
                    } else
                      this.quill.format("link", !1);
                  }
                }
              }
            }
          });
          var N = function(E) {
            F(O, E);
            function O(x, L) {
              s(this, O);
              var A = w(this, (O.__proto__ || Object.getPrototypeOf(O)).call(this, x, L));
              return A.preview = A.root.querySelector("a.ql-preview"), A;
            }
            return v(O, [{
              key: "listen",
              value: function() {
                var L = this;
                f(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "listen", this).call(this), this.root.querySelector("a.ql-action").addEventListener("click", function(A) {
                  L.root.classList.contains("ql-editing") ? L.save() : L.edit("link", L.preview.textContent), A.preventDefault();
                }), this.root.querySelector("a.ql-remove").addEventListener("click", function(A) {
                  if (L.linkRange != null) {
                    var M = L.linkRange;
                    L.restoreFocus(), L.quill.formatText(M, "link", !1, a.default.sources.USER), delete L.linkRange;
                  }
                  A.preventDefault(), L.hide();
                }), this.quill.on(a.default.events.SELECTION_CHANGE, function(A, M, j) {
                  if (A != null) {
                    if (A.length === 0 && j === a.default.sources.USER) {
                      var z = L.quill.scroll.descendant(m.default, A.index), G = h(z, 2), D = G[0], P = G[1];
                      if (D != null) {
                        L.linkRange = new c.Range(A.index - P, D.length());
                        var k = m.default.formats(D.domNode);
                        L.preview.textContent = k, L.preview.setAttribute("href", k), L.show(), L.position(L.quill.getBounds(L.linkRange));
                        return;
                      }
                    } else
                      delete L.linkRange;
                    L.hide();
                  }
                });
              }
            }, {
              key: "show",
              value: function() {
                f(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "show", this).call(this), this.root.removeAttribute("data-mode");
              }
            }]), O;
          }(r.BaseTooltip);
          N.TEMPLATE = ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""), i.default = S;
        },
        /* 63 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = o(29), f = Z(h), v = o(36), b = o(38), y = o(64), p = o(65), a = Z(p), r = o(66), l = Z(r), g = o(67), m = Z(g), c = o(37), u = o(26), d = o(39), _ = o(40), s = o(56), w = Z(s), F = o(68), C = Z(F), S = o(27), N = Z(S), E = o(69), O = Z(E), x = o(70), L = Z(x), A = o(71), M = Z(A), j = o(72), z = Z(j), G = o(73), D = Z(G), P = o(13), k = Z(P), R = o(74), B = Z(R), q = o(75), V = Z(q), T = o(57), I = Z(T), H = o(41), W = Z(H), K = o(28), X = Z(K), Q = o(59), ee = Z(Q), oe = o(60), re = Z(oe), ue = o(61), se = Z(ue), U = o(108), $ = Z(U), J = o(62), Y = Z(J);
          function Z(te) {
            return te && te.__esModule ? te : { default: te };
          }
          f.default.register({
            "attributors/attribute/direction": b.DirectionAttribute,
            "attributors/class/align": v.AlignClass,
            "attributors/class/background": c.BackgroundClass,
            "attributors/class/color": u.ColorClass,
            "attributors/class/direction": b.DirectionClass,
            "attributors/class/font": d.FontClass,
            "attributors/class/size": _.SizeClass,
            "attributors/style/align": v.AlignStyle,
            "attributors/style/background": c.BackgroundStyle,
            "attributors/style/color": u.ColorStyle,
            "attributors/style/direction": b.DirectionStyle,
            "attributors/style/font": d.FontStyle,
            "attributors/style/size": _.SizeStyle
          }, !0), f.default.register({
            "formats/align": v.AlignClass,
            "formats/direction": b.DirectionClass,
            "formats/indent": y.IndentClass,
            "formats/background": c.BackgroundStyle,
            "formats/color": u.ColorStyle,
            "formats/font": d.FontClass,
            "formats/size": _.SizeClass,
            "formats/blockquote": a.default,
            "formats/code-block": k.default,
            "formats/header": l.default,
            "formats/list": m.default,
            "formats/bold": w.default,
            "formats/code": P.Code,
            "formats/italic": C.default,
            "formats/link": N.default,
            "formats/script": O.default,
            "formats/strike": L.default,
            "formats/underline": M.default,
            "formats/image": z.default,
            "formats/video": D.default,
            "formats/list/item": g.ListItem,
            "modules/formula": B.default,
            "modules/syntax": V.default,
            "modules/toolbar": I.default,
            "themes/bubble": $.default,
            "themes/snow": Y.default,
            "ui/icons": W.default,
            "ui/picker": X.default,
            "ui/icon-picker": re.default,
            "ui/color-picker": ee.default,
            "ui/tooltip": se.default
          }, !0), i.default = f.default;
        },
        /* 64 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.IndentClass = void 0;
          var h = /* @__PURE__ */ function() {
            function m(c, u) {
              for (var d = 0; d < u.length; d++) {
                var _ = u[d];
                _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(c, _.key, _);
              }
            }
            return function(c, u, d) {
              return u && m(c.prototype, u), d && m(c, d), c;
            };
          }(), f = function m(c, u, d) {
            c === null && (c = Function.prototype);
            var _ = Object.getOwnPropertyDescriptor(c, u);
            if (_ === void 0) {
              var s = Object.getPrototypeOf(c);
              return s === null ? void 0 : m(s, u, d);
            } else {
              if ("value" in _)
                return _.value;
              var w = _.get;
              return w === void 0 ? void 0 : w.call(d);
            }
          }, v = o(0), b = y(v);
          function y(m) {
            return m && m.__esModule ? m : { default: m };
          }
          function p(m, c) {
            if (!(m instanceof c))
              throw new TypeError("Cannot call a class as a function");
          }
          function a(m, c) {
            if (!m)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return c && (typeof c == "object" || typeof c == "function") ? c : m;
          }
          function r(m, c) {
            if (typeof c != "function" && c !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof c);
            m.prototype = Object.create(c && c.prototype, { constructor: { value: m, enumerable: !1, writable: !0, configurable: !0 } }), c && (Object.setPrototypeOf ? Object.setPrototypeOf(m, c) : m.__proto__ = c);
          }
          var l = function(m) {
            r(c, m);
            function c() {
              return p(this, c), a(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
            }
            return h(c, [{
              key: "add",
              value: function(d, _) {
                if (_ === "+1" || _ === "-1") {
                  var s = this.value(d) || 0;
                  _ = _ === "+1" ? s + 1 : s - 1;
                }
                return _ === 0 ? (this.remove(d), !0) : f(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "add", this).call(this, d, _);
              }
            }, {
              key: "canAdd",
              value: function(d, _) {
                return f(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "canAdd", this).call(this, d, _) || f(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "canAdd", this).call(this, d, parseInt(_));
              }
            }, {
              key: "value",
              value: function(d) {
                return parseInt(f(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "value", this).call(this, d)) || void 0;
              }
            }]), c;
          }(b.default.Attributor.Class), g = new l("indent", "ql-indent", {
            scope: b.default.Scope.BLOCK,
            whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
          });
          i.IndentClass = g;
        },
        /* 65 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = o(4), f = v(h);
          function v(r) {
            return r && r.__esModule ? r : { default: r };
          }
          function b(r, l) {
            if (!(r instanceof l))
              throw new TypeError("Cannot call a class as a function");
          }
          function y(r, l) {
            if (!r)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return l && (typeof l == "object" || typeof l == "function") ? l : r;
          }
          function p(r, l) {
            if (typeof l != "function" && l !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof l);
            r.prototype = Object.create(l && l.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(r, l) : r.__proto__ = l);
          }
          var a = function(r) {
            p(l, r);
            function l() {
              return b(this, l), y(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
            }
            return l;
          }(f.default);
          a.blotName = "blockquote", a.tagName = "blockquote", i.default = a;
        },
        /* 66 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = /* @__PURE__ */ function() {
            function l(g, m) {
              for (var c = 0; c < m.length; c++) {
                var u = m[c];
                u.enumerable = u.enumerable || !1, u.configurable = !0, "value" in u && (u.writable = !0), Object.defineProperty(g, u.key, u);
              }
            }
            return function(g, m, c) {
              return m && l(g.prototype, m), c && l(g, c), g;
            };
          }(), f = o(4), v = b(f);
          function b(l) {
            return l && l.__esModule ? l : { default: l };
          }
          function y(l, g) {
            if (!(l instanceof g))
              throw new TypeError("Cannot call a class as a function");
          }
          function p(l, g) {
            if (!l)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return g && (typeof g == "object" || typeof g == "function") ? g : l;
          }
          function a(l, g) {
            if (typeof g != "function" && g !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof g);
            l.prototype = Object.create(g && g.prototype, { constructor: { value: l, enumerable: !1, writable: !0, configurable: !0 } }), g && (Object.setPrototypeOf ? Object.setPrototypeOf(l, g) : l.__proto__ = g);
          }
          var r = function(l) {
            a(g, l);
            function g() {
              return y(this, g), p(this, (g.__proto__ || Object.getPrototypeOf(g)).apply(this, arguments));
            }
            return h(g, null, [{
              key: "formats",
              value: function(c) {
                return this.tagName.indexOf(c.tagName) + 1;
              }
            }]), g;
          }(v.default);
          r.blotName = "header", r.tagName = ["H1", "H2", "H3", "H4", "H5", "H6"], i.default = r;
        },
        /* 67 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.default = i.ListItem = void 0;
          var h = /* @__PURE__ */ function() {
            function s(w, F) {
              for (var C = 0; C < F.length; C++) {
                var S = F[C];
                S.enumerable = S.enumerable || !1, S.configurable = !0, "value" in S && (S.writable = !0), Object.defineProperty(w, S.key, S);
              }
            }
            return function(w, F, C) {
              return F && s(w.prototype, F), C && s(w, C), w;
            };
          }(), f = function s(w, F, C) {
            w === null && (w = Function.prototype);
            var S = Object.getOwnPropertyDescriptor(w, F);
            if (S === void 0) {
              var N = Object.getPrototypeOf(w);
              return N === null ? void 0 : s(N, F, C);
            } else {
              if ("value" in S)
                return S.value;
              var E = S.get;
              return E === void 0 ? void 0 : E.call(C);
            }
          }, v = o(0), b = l(v), y = o(4), p = l(y), a = o(25), r = l(a);
          function l(s) {
            return s && s.__esModule ? s : { default: s };
          }
          function g(s, w, F) {
            return w in s ? Object.defineProperty(s, w, { value: F, enumerable: !0, configurable: !0, writable: !0 }) : s[w] = F, s;
          }
          function m(s, w) {
            if (!(s instanceof w))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(s, w) {
            if (!s)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return w && (typeof w == "object" || typeof w == "function") ? w : s;
          }
          function u(s, w) {
            if (typeof w != "function" && w !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof w);
            s.prototype = Object.create(w && w.prototype, { constructor: { value: s, enumerable: !1, writable: !0, configurable: !0 } }), w && (Object.setPrototypeOf ? Object.setPrototypeOf(s, w) : s.__proto__ = w);
          }
          var d = function(s) {
            u(w, s);
            function w() {
              return m(this, w), c(this, (w.__proto__ || Object.getPrototypeOf(w)).apply(this, arguments));
            }
            return h(w, [{
              key: "format",
              value: function(C, S) {
                C === _.blotName && !S ? this.replaceWith(b.default.create(this.statics.scope)) : f(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "format", this).call(this, C, S);
              }
            }, {
              key: "remove",
              value: function() {
                this.prev == null && this.next == null ? this.parent.remove() : f(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "remove", this).call(this);
              }
            }, {
              key: "replaceWith",
              value: function(C, S) {
                return this.parent.isolate(this.offset(this.parent), this.length()), C === this.parent.statics.blotName ? (this.parent.replaceWith(C, S), this) : (this.parent.unwrap(), f(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "replaceWith", this).call(this, C, S));
              }
            }], [{
              key: "formats",
              value: function(C) {
                return C.tagName === this.tagName ? void 0 : f(w.__proto__ || Object.getPrototypeOf(w), "formats", this).call(this, C);
              }
            }]), w;
          }(p.default);
          d.blotName = "list-item", d.tagName = "LI";
          var _ = function(s) {
            u(w, s), h(w, null, [{
              key: "create",
              value: function(C) {
                var S = C === "ordered" ? "OL" : "UL", N = f(w.__proto__ || Object.getPrototypeOf(w), "create", this).call(this, S);
                return (C === "checked" || C === "unchecked") && N.setAttribute("data-checked", C === "checked"), N;
              }
            }, {
              key: "formats",
              value: function(C) {
                if (C.tagName === "OL") return "ordered";
                if (C.tagName === "UL")
                  return C.hasAttribute("data-checked") ? C.getAttribute("data-checked") === "true" ? "checked" : "unchecked" : "bullet";
              }
            }]);
            function w(F) {
              m(this, w);
              var C = c(this, (w.__proto__ || Object.getPrototypeOf(w)).call(this, F)), S = function(E) {
                if (E.target.parentNode === F) {
                  var O = C.statics.formats(F), x = b.default.find(E.target);
                  O === "checked" ? x.format("list", "unchecked") : O === "unchecked" && x.format("list", "checked");
                }
              };
              return F.addEventListener("touchstart", S), F.addEventListener("mousedown", S), C;
            }
            return h(w, [{
              key: "format",
              value: function(C, S) {
                this.children.length > 0 && this.children.tail.format(C, S);
              }
            }, {
              key: "formats",
              value: function() {
                return g({}, this.statics.blotName, this.statics.formats(this.domNode));
              }
            }, {
              key: "insertBefore",
              value: function(C, S) {
                if (C instanceof d)
                  f(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "insertBefore", this).call(this, C, S);
                else {
                  var N = S == null ? this.length() : S.offset(this), E = this.split(N);
                  E.parent.insertBefore(C, E);
                }
              }
            }, {
              key: "optimize",
              value: function(C) {
                f(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "optimize", this).call(this, C);
                var S = this.next;
                S != null && S.prev === this && S.statics.blotName === this.statics.blotName && S.domNode.tagName === this.domNode.tagName && S.domNode.getAttribute("data-checked") === this.domNode.getAttribute("data-checked") && (S.moveChildren(this), S.remove());
              }
            }, {
              key: "replace",
              value: function(C) {
                if (C.statics.blotName !== this.statics.blotName) {
                  var S = b.default.create(this.statics.defaultChild);
                  C.moveChildren(S), this.appendChild(S);
                }
                f(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "replace", this).call(this, C);
              }
            }]), w;
          }(r.default);
          _.blotName = "list", _.scope = b.default.Scope.BLOCK_BLOT, _.tagName = ["OL", "UL"], _.defaultChild = "list-item", _.allowedChildren = [d], i.ListItem = d, i.default = _;
        },
        /* 68 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = o(56), f = v(h);
          function v(r) {
            return r && r.__esModule ? r : { default: r };
          }
          function b(r, l) {
            if (!(r instanceof l))
              throw new TypeError("Cannot call a class as a function");
          }
          function y(r, l) {
            if (!r)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return l && (typeof l == "object" || typeof l == "function") ? l : r;
          }
          function p(r, l) {
            if (typeof l != "function" && l !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof l);
            r.prototype = Object.create(l && l.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(r, l) : r.__proto__ = l);
          }
          var a = function(r) {
            p(l, r);
            function l() {
              return b(this, l), y(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
            }
            return l;
          }(f.default);
          a.blotName = "italic", a.tagName = ["EM", "I"], i.default = a;
        },
        /* 69 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = /* @__PURE__ */ function() {
            function g(m, c) {
              for (var u = 0; u < c.length; u++) {
                var d = c[u];
                d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(m, d.key, d);
              }
            }
            return function(m, c, u) {
              return c && g(m.prototype, c), u && g(m, u), m;
            };
          }(), f = function g(m, c, u) {
            m === null && (m = Function.prototype);
            var d = Object.getOwnPropertyDescriptor(m, c);
            if (d === void 0) {
              var _ = Object.getPrototypeOf(m);
              return _ === null ? void 0 : g(_, c, u);
            } else {
              if ("value" in d)
                return d.value;
              var s = d.get;
              return s === void 0 ? void 0 : s.call(u);
            }
          }, v = o(6), b = y(v);
          function y(g) {
            return g && g.__esModule ? g : { default: g };
          }
          function p(g, m) {
            if (!(g instanceof m))
              throw new TypeError("Cannot call a class as a function");
          }
          function a(g, m) {
            if (!g)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return m && (typeof m == "object" || typeof m == "function") ? m : g;
          }
          function r(g, m) {
            if (typeof m != "function" && m !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof m);
            g.prototype = Object.create(m && m.prototype, { constructor: { value: g, enumerable: !1, writable: !0, configurable: !0 } }), m && (Object.setPrototypeOf ? Object.setPrototypeOf(g, m) : g.__proto__ = m);
          }
          var l = function(g) {
            r(m, g);
            function m() {
              return p(this, m), a(this, (m.__proto__ || Object.getPrototypeOf(m)).apply(this, arguments));
            }
            return h(m, null, [{
              key: "create",
              value: function(u) {
                return u === "super" ? document.createElement("sup") : u === "sub" ? document.createElement("sub") : f(m.__proto__ || Object.getPrototypeOf(m), "create", this).call(this, u);
              }
            }, {
              key: "formats",
              value: function(u) {
                if (u.tagName === "SUB") return "sub";
                if (u.tagName === "SUP") return "super";
              }
            }]), m;
          }(b.default);
          l.blotName = "script", l.tagName = ["SUB", "SUP"], i.default = l;
        },
        /* 70 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = o(6), f = v(h);
          function v(r) {
            return r && r.__esModule ? r : { default: r };
          }
          function b(r, l) {
            if (!(r instanceof l))
              throw new TypeError("Cannot call a class as a function");
          }
          function y(r, l) {
            if (!r)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return l && (typeof l == "object" || typeof l == "function") ? l : r;
          }
          function p(r, l) {
            if (typeof l != "function" && l !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof l);
            r.prototype = Object.create(l && l.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(r, l) : r.__proto__ = l);
          }
          var a = function(r) {
            p(l, r);
            function l() {
              return b(this, l), y(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
            }
            return l;
          }(f.default);
          a.blotName = "strike", a.tagName = "S", i.default = a;
        },
        /* 71 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = o(6), f = v(h);
          function v(r) {
            return r && r.__esModule ? r : { default: r };
          }
          function b(r, l) {
            if (!(r instanceof l))
              throw new TypeError("Cannot call a class as a function");
          }
          function y(r, l) {
            if (!r)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return l && (typeof l == "object" || typeof l == "function") ? l : r;
          }
          function p(r, l) {
            if (typeof l != "function" && l !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof l);
            r.prototype = Object.create(l && l.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), l && (Object.setPrototypeOf ? Object.setPrototypeOf(r, l) : r.__proto__ = l);
          }
          var a = function(r) {
            p(l, r);
            function l() {
              return b(this, l), y(this, (l.__proto__ || Object.getPrototypeOf(l)).apply(this, arguments));
            }
            return l;
          }(f.default);
          a.blotName = "underline", a.tagName = "U", i.default = a;
        },
        /* 72 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = /* @__PURE__ */ function() {
            function c(u, d) {
              for (var _ = 0; _ < d.length; _++) {
                var s = d[_];
                s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(u, s.key, s);
              }
            }
            return function(u, d, _) {
              return d && c(u.prototype, d), _ && c(u, _), u;
            };
          }(), f = function c(u, d, _) {
            u === null && (u = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(u, d);
            if (s === void 0) {
              var w = Object.getPrototypeOf(u);
              return w === null ? void 0 : c(w, d, _);
            } else {
              if ("value" in s)
                return s.value;
              var F = s.get;
              return F === void 0 ? void 0 : F.call(_);
            }
          }, v = o(0), b = p(v), y = o(27);
          function p(c) {
            return c && c.__esModule ? c : { default: c };
          }
          function a(c, u) {
            if (!(c instanceof u))
              throw new TypeError("Cannot call a class as a function");
          }
          function r(c, u) {
            if (!c)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return u && (typeof u == "object" || typeof u == "function") ? u : c;
          }
          function l(c, u) {
            if (typeof u != "function" && u !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof u);
            c.prototype = Object.create(u && u.prototype, { constructor: { value: c, enumerable: !1, writable: !0, configurable: !0 } }), u && (Object.setPrototypeOf ? Object.setPrototypeOf(c, u) : c.__proto__ = u);
          }
          var g = ["alt", "height", "width"], m = function(c) {
            l(u, c);
            function u() {
              return a(this, u), r(this, (u.__proto__ || Object.getPrototypeOf(u)).apply(this, arguments));
            }
            return h(u, [{
              key: "format",
              value: function(_, s) {
                g.indexOf(_) > -1 ? s ? this.domNode.setAttribute(_, s) : this.domNode.removeAttribute(_) : f(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "format", this).call(this, _, s);
              }
            }], [{
              key: "create",
              value: function(_) {
                var s = f(u.__proto__ || Object.getPrototypeOf(u), "create", this).call(this, _);
                return typeof _ == "string" && s.setAttribute("src", this.sanitize(_)), s;
              }
            }, {
              key: "formats",
              value: function(_) {
                return g.reduce(function(s, w) {
                  return _.hasAttribute(w) && (s[w] = _.getAttribute(w)), s;
                }, {});
              }
            }, {
              key: "match",
              value: function(_) {
                return /\.(jpe?g|gif|png)$/.test(_) || /^data:image\/.+;base64/.test(_);
              }
            }, {
              key: "sanitize",
              value: function(_) {
                return (0, y.sanitize)(_, ["http", "https", "data"]) ? _ : "//:0";
              }
            }, {
              key: "value",
              value: function(_) {
                return _.getAttribute("src");
              }
            }]), u;
          }(b.default.Embed);
          m.blotName = "image", m.tagName = "IMG", i.default = m;
        },
        /* 73 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          });
          var h = /* @__PURE__ */ function() {
            function c(u, d) {
              for (var _ = 0; _ < d.length; _++) {
                var s = d[_];
                s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(u, s.key, s);
              }
            }
            return function(u, d, _) {
              return d && c(u.prototype, d), _ && c(u, _), u;
            };
          }(), f = function c(u, d, _) {
            u === null && (u = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(u, d);
            if (s === void 0) {
              var w = Object.getPrototypeOf(u);
              return w === null ? void 0 : c(w, d, _);
            } else {
              if ("value" in s)
                return s.value;
              var F = s.get;
              return F === void 0 ? void 0 : F.call(_);
            }
          }, v = o(4), b = o(27), y = p(b);
          function p(c) {
            return c && c.__esModule ? c : { default: c };
          }
          function a(c, u) {
            if (!(c instanceof u))
              throw new TypeError("Cannot call a class as a function");
          }
          function r(c, u) {
            if (!c)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return u && (typeof u == "object" || typeof u == "function") ? u : c;
          }
          function l(c, u) {
            if (typeof u != "function" && u !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof u);
            c.prototype = Object.create(u && u.prototype, { constructor: { value: c, enumerable: !1, writable: !0, configurable: !0 } }), u && (Object.setPrototypeOf ? Object.setPrototypeOf(c, u) : c.__proto__ = u);
          }
          var g = ["height", "width"], m = function(c) {
            l(u, c);
            function u() {
              return a(this, u), r(this, (u.__proto__ || Object.getPrototypeOf(u)).apply(this, arguments));
            }
            return h(u, [{
              key: "format",
              value: function(_, s) {
                g.indexOf(_) > -1 ? s ? this.domNode.setAttribute(_, s) : this.domNode.removeAttribute(_) : f(u.prototype.__proto__ || Object.getPrototypeOf(u.prototype), "format", this).call(this, _, s);
              }
            }], [{
              key: "create",
              value: function(_) {
                var s = f(u.__proto__ || Object.getPrototypeOf(u), "create", this).call(this, _);
                return s.setAttribute("frameborder", "0"), s.setAttribute("allowfullscreen", !0), s.setAttribute("src", this.sanitize(_)), s;
              }
            }, {
              key: "formats",
              value: function(_) {
                return g.reduce(function(s, w) {
                  return _.hasAttribute(w) && (s[w] = _.getAttribute(w)), s;
                }, {});
              }
            }, {
              key: "sanitize",
              value: function(_) {
                return y.default.sanitize(_);
              }
            }, {
              key: "value",
              value: function(_) {
                return _.getAttribute("src");
              }
            }]), u;
          }(v.BlockEmbed);
          m.blotName = "video", m.className = "ql-video", m.tagName = "IFRAME", i.default = m;
        },
        /* 74 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.default = i.FormulaBlot = void 0;
          var h = /* @__PURE__ */ function() {
            function _(s, w) {
              for (var F = 0; F < w.length; F++) {
                var C = w[F];
                C.enumerable = C.enumerable || !1, C.configurable = !0, "value" in C && (C.writable = !0), Object.defineProperty(s, C.key, C);
              }
            }
            return function(s, w, F) {
              return w && _(s.prototype, w), F && _(s, F), s;
            };
          }(), f = function _(s, w, F) {
            s === null && (s = Function.prototype);
            var C = Object.getOwnPropertyDescriptor(s, w);
            if (C === void 0) {
              var S = Object.getPrototypeOf(s);
              return S === null ? void 0 : _(S, w, F);
            } else {
              if ("value" in C)
                return C.value;
              var N = C.get;
              return N === void 0 ? void 0 : N.call(F);
            }
          }, v = o(35), b = l(v), y = o(5), p = l(y), a = o(9), r = l(a);
          function l(_) {
            return _ && _.__esModule ? _ : { default: _ };
          }
          function g(_, s) {
            if (!(_ instanceof s))
              throw new TypeError("Cannot call a class as a function");
          }
          function m(_, s) {
            if (!_)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return s && (typeof s == "object" || typeof s == "function") ? s : _;
          }
          function c(_, s) {
            if (typeof s != "function" && s !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof s);
            _.prototype = Object.create(s && s.prototype, { constructor: { value: _, enumerable: !1, writable: !0, configurable: !0 } }), s && (Object.setPrototypeOf ? Object.setPrototypeOf(_, s) : _.__proto__ = s);
          }
          var u = function(_) {
            c(s, _);
            function s() {
              return g(this, s), m(this, (s.__proto__ || Object.getPrototypeOf(s)).apply(this, arguments));
            }
            return h(s, null, [{
              key: "create",
              value: function(F) {
                var C = f(s.__proto__ || Object.getPrototypeOf(s), "create", this).call(this, F);
                return typeof F == "string" && (window.katex.render(F, C, {
                  throwOnError: !1,
                  errorColor: "#f00"
                }), C.setAttribute("data-value", F)), C;
              }
            }, {
              key: "value",
              value: function(F) {
                return F.getAttribute("data-value");
              }
            }]), s;
          }(b.default);
          u.blotName = "formula", u.className = "ql-formula", u.tagName = "SPAN";
          var d = function(_) {
            c(s, _), h(s, null, [{
              key: "register",
              value: function() {
                p.default.register(u, !0);
              }
            }]);
            function s() {
              g(this, s);
              var w = m(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this));
              if (window.katex == null)
                throw new Error("Formula module requires KaTeX.");
              return w;
            }
            return s;
          }(r.default);
          i.FormulaBlot = u, i.default = d;
        },
        /* 75 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.default = i.CodeToken = i.CodeBlock = void 0;
          var h = /* @__PURE__ */ function() {
            function F(C, S) {
              for (var N = 0; N < S.length; N++) {
                var E = S[N];
                E.enumerable = E.enumerable || !1, E.configurable = !0, "value" in E && (E.writable = !0), Object.defineProperty(C, E.key, E);
              }
            }
            return function(C, S, N) {
              return S && F(C.prototype, S), N && F(C, N), C;
            };
          }(), f = function F(C, S, N) {
            C === null && (C = Function.prototype);
            var E = Object.getOwnPropertyDescriptor(C, S);
            if (E === void 0) {
              var O = Object.getPrototypeOf(C);
              return O === null ? void 0 : F(O, S, N);
            } else {
              if ("value" in E)
                return E.value;
              var x = E.get;
              return x === void 0 ? void 0 : x.call(N);
            }
          }, v = o(0), b = m(v), y = o(5), p = m(y), a = o(9), r = m(a), l = o(13), g = m(l);
          function m(F) {
            return F && F.__esModule ? F : { default: F };
          }
          function c(F, C) {
            if (!(F instanceof C))
              throw new TypeError("Cannot call a class as a function");
          }
          function u(F, C) {
            if (!F)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return C && (typeof C == "object" || typeof C == "function") ? C : F;
          }
          function d(F, C) {
            if (typeof C != "function" && C !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof C);
            F.prototype = Object.create(C && C.prototype, { constructor: { value: F, enumerable: !1, writable: !0, configurable: !0 } }), C && (Object.setPrototypeOf ? Object.setPrototypeOf(F, C) : F.__proto__ = C);
          }
          var _ = function(F) {
            d(C, F);
            function C() {
              return c(this, C), u(this, (C.__proto__ || Object.getPrototypeOf(C)).apply(this, arguments));
            }
            return h(C, [{
              key: "replaceWith",
              value: function(N) {
                this.domNode.textContent = this.domNode.textContent, this.attach(), f(C.prototype.__proto__ || Object.getPrototypeOf(C.prototype), "replaceWith", this).call(this, N);
              }
            }, {
              key: "highlight",
              value: function(N) {
                var E = this.domNode.textContent;
                this.cachedText !== E && ((E.trim().length > 0 || this.cachedText == null) && (this.domNode.innerHTML = N(E), this.domNode.normalize(), this.attach()), this.cachedText = E);
              }
            }]), C;
          }(g.default);
          _.className = "ql-syntax";
          var s = new b.default.Attributor.Class("token", "hljs", {
            scope: b.default.Scope.INLINE
          }), w = function(F) {
            d(C, F), h(C, null, [{
              key: "register",
              value: function() {
                p.default.register(s, !0), p.default.register(_, !0);
              }
            }]);
            function C(S, N) {
              c(this, C);
              var E = u(this, (C.__proto__ || Object.getPrototypeOf(C)).call(this, S, N));
              if (typeof E.options.highlight != "function")
                throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
              var O = null;
              return E.quill.on(p.default.events.SCROLL_OPTIMIZE, function() {
                clearTimeout(O), O = setTimeout(function() {
                  E.highlight(), O = null;
                }, E.options.interval);
              }), E.highlight(), E;
            }
            return h(C, [{
              key: "highlight",
              value: function() {
                var N = this;
                if (!this.quill.selection.composing) {
                  this.quill.update(p.default.sources.USER);
                  var E = this.quill.getSelection();
                  this.quill.scroll.descendants(_).forEach(function(O) {
                    O.highlight(N.options.highlight);
                  }), this.quill.update(p.default.sources.SILENT), E != null && this.quill.setSelection(E, p.default.sources.SILENT);
                }
              }
            }]), C;
          }(r.default);
          w.DEFAULTS = {
            highlight: function() {
              return window.hljs == null ? null : function(F) {
                var C = window.hljs.highlightAuto(F);
                return C.value;
              };
            }(),
            interval: 1e3
          }, i.CodeBlock = _, i.CodeToken = s, i.default = w;
        },
        /* 76 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=13 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=9 y1=4 y2=4></line> </svg>';
        },
        /* 77 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=14 x2=4 y1=14 y2=14></line> <line class=ql-stroke x1=12 x2=6 y1=4 y2=4></line> </svg>';
        },
        /* 78 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=5 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=9 y1=4 y2=4></line> </svg>';
        },
        /* 79 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=3 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=3 y1=4 y2=4></line> </svg>';
        },
        /* 80 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <g class="ql-fill ql-color-label"> <polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"></polygon> <rect height=1 width=1 x=4 y=4></rect> <polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"></polygon> <rect height=1 width=1 x=2 y=6></rect> <rect height=1 width=1 x=3 y=5></rect> <rect height=1 width=1 x=4 y=7></rect> <polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"></polygon> <rect height=1 width=1 x=2 y=12></rect> <rect height=1 width=1 x=2 y=9></rect> <rect height=1 width=1 x=2 y=15></rect> <polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"></polygon> <rect height=1 width=1 x=3 y=8></rect> <path d=M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z></path> <path d=M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z></path> <path d=M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z></path> <rect height=1 width=1 x=12 y=2></rect> <rect height=1 width=1 x=11 y=3></rect> <path d=M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z></path> <rect height=1 width=1 x=2 y=3></rect> <rect height=1 width=1 x=6 y=2></rect> <rect height=1 width=1 x=3 y=2></rect> <rect height=1 width=1 x=5 y=3></rect> <rect height=1 width=1 x=9 y=2></rect> <rect height=1 width=1 x=15 y=14></rect> <polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"></polygon> <rect height=1 width=1 x=13 y=7></rect> <rect height=1 width=1 x=15 y=5></rect> <rect height=1 width=1 x=14 y=6></rect> <rect height=1 width=1 x=15 y=8></rect> <rect height=1 width=1 x=14 y=9></rect> <path d=M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z></path> <rect height=1 width=1 x=14 y=3></rect> <polygon points="12 6.868 12 6 11.62 6 12 6.868"></polygon> <rect height=1 width=1 x=15 y=2></rect> <rect height=1 width=1 x=12 y=5></rect> <rect height=1 width=1 x=13 y=4></rect> <polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"></polygon> <rect height=1 width=1 x=9 y=14></rect> <rect height=1 width=1 x=8 y=15></rect> <path d=M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z></path> <rect height=1 width=1 x=5 y=15></rect> <path d=M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z></path> <rect height=1 width=1 x=11 y=15></rect> <path d=M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z></path> <rect height=1 width=1 x=14 y=15></rect> <rect height=1 width=1 x=15 y=11></rect> </g> <polyline class=ql-stroke points="5.5 13 9 5 12.5 13"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=11 y2=11></line> </svg>';
        },
        /* 81 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <rect class="ql-fill ql-stroke" height=3 width=3 x=4 y=5></rect> <rect class="ql-fill ql-stroke" height=3 width=3 x=11 y=5></rect> <path class="ql-even ql-fill ql-stroke" d=M7,8c0,4.031-3,5-3,5></path> <path class="ql-even ql-fill ql-stroke" d=M14,8c0,4.031-3,5-3,5></path> </svg>';
        },
        /* 82 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z></path> <path class=ql-stroke d=M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z></path> </svg>';
        },
        /* 83 */
        /***/
        function(e, i) {
          e.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=5 x2=13 y1=3 y2=3></line> <line class=ql-stroke x1=6 x2=9.35 y1=12 y2=3></line> <line class=ql-stroke x1=11 x2=15 y1=11 y2=15></line> <line class=ql-stroke x1=15 x2=11 y1=11 y2=15></line> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=7 x=2 y=14></rect> </svg>';
        },
        /* 84 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <line class="ql-color-label ql-stroke ql-transparent" x1=3 x2=15 y1=15 y2=15></line> <polyline class=ql-stroke points="5.5 11 9 3 12.5 11"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=9 y2=9></line> </svg>';
        },
        /* 85 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"></polygon> <line class="ql-stroke ql-fill" x1=15 x2=11 y1=4 y2=4></line> <path class=ql-fill d=M11,3a3,3,0,0,0,0,6h1V3H11Z></path> <rect class=ql-fill height=11 width=1 x=11 y=4></rect> <rect class=ql-fill height=11 width=1 x=13 y=4></rect> </svg>';
        },
        /* 86 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"></polygon> <line class="ql-stroke ql-fill" x1=9 x2=5 y1=4 y2=4></line> <path class=ql-fill d=M5,3A3,3,0,0,0,5,9H6V3H5Z></path> <rect class=ql-fill height=11 width=1 x=5 y=4></rect> <rect class=ql-fill height=11 width=1 x=7 y=4></rect> </svg>';
        },
        /* 87 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M14,16H4a1,1,0,0,1,0-2H14A1,1,0,0,1,14,16Z /> <path class=ql-fill d=M14,4H4A1,1,0,0,1,4,2H14A1,1,0,0,1,14,4Z /> <rect class=ql-fill x=3 y=6 width=12 height=6 rx=1 ry=1 /> </svg>';
        },
        /* 88 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M13,16H5a1,1,0,0,1,0-2h8A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H5A1,1,0,0,1,5,2h8A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=2 y=6 width=14 height=6 rx=1 ry=1 /> </svg>';
        },
        /* 89 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15,8H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,8Z /> <path class=ql-fill d=M15,12H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,12Z /> <path class=ql-fill d=M15,16H5a1,1,0,0,1,0-2H15A1,1,0,0,1,15,16Z /> <path class=ql-fill d=M15,4H5A1,1,0,0,1,5,2H15A1,1,0,0,1,15,4Z /> <rect class=ql-fill x=2 y=6 width=8 height=6 rx=1 ry=1 /> </svg>';
        },
        /* 90 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M5,8H3A1,1,0,0,1,3,6H5A1,1,0,0,1,5,8Z /> <path class=ql-fill d=M5,12H3a1,1,0,0,1,0-2H5A1,1,0,0,1,5,12Z /> <path class=ql-fill d=M13,16H3a1,1,0,0,1,0-2H13A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H3A1,1,0,0,1,3,2H13A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=8 y=6 width=8 height=6 rx=1 ry=1 transform="translate(24 18) rotate(-180)"/> </svg>';
        },
        /* 91 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z></path> <rect class=ql-fill height=1.6 rx=0.8 ry=0.8 width=5 x=5.15 y=6.2></rect> <path class=ql-fill d=M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z></path> </svg>';
        },
        /* 92 */
        /***/
        function(e, i) {
          e.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z /> </svg>';
        },
        /* 93 */
        /***/
        function(e, i) {
          e.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z /> </svg>';
        },
        /* 94 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=13 y1=4 y2=4></line> <line class=ql-stroke x1=5 x2=11 y1=14 y2=14></line> <line class=ql-stroke x1=8 x2=10 y1=14 y2=4></line> </svg>';
        },
        /* 95 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=10 width=12 x=3 y=4></rect> <circle class=ql-fill cx=6 cy=7 r=1></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>';
        },
        /* 96 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"></polyline> </svg>';
        },
        /* 97 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="5 7 5 11 3 9 5 7"></polyline> </svg>';
        },
        /* 98 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=11 y1=7 y2=11></line> <path class="ql-even ql-stroke" d=M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z></path> <path class="ql-even ql-stroke" d=M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z></path> </svg>';
        },
        /* 99 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=7 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=7 x2=15 y1=14 y2=14></line> <line class="ql-stroke ql-thin" x1=2.5 x2=4.5 y1=5.5 y2=5.5></line> <path class=ql-fill d=M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z></path> <path class="ql-stroke ql-thin" d=M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156></path> <path class="ql-stroke ql-thin" d=M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109></path> </svg>';
        },
        /* 100 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=6 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=6 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=6 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=3 y1=4 y2=4></line> <line class=ql-stroke x1=3 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=3 y1=14 y2=14></line> </svg>';
        },
        /* 101 */
        /***/
        function(e, i) {
          e.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=9 x2=15 y1=4 y2=4></line> <polyline class=ql-stroke points="3 4 4 5 6 3"></polyline> <line class=ql-stroke x1=9 x2=15 y1=14 y2=14></line> <polyline class=ql-stroke points="3 14 4 15 6 13"></polyline> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="3 9 4 10 6 8"></polyline> </svg>';
        },
        /* 102 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z /> <path class=ql-fill d=M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z /> </svg>';
        },
        /* 103 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z /> <path class=ql-fill d=M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z /> </svg>';
        },
        /* 104 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <line class="ql-stroke ql-thin" x1=15.5 x2=2.5 y1=8.5 y2=9.5></line> <path class=ql-fill d=M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z></path> <path class=ql-fill d=M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z></path> </svg>';
        },
        /* 105 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3></path> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=12 x=3 y=15></rect> </svg>';
        },
        /* 106 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=12 width=1 x=5 y=3></rect> <rect class=ql-fill height=12 width=1 x=12 y=3></rect> <rect class=ql-fill height=2 width=8 x=5 y=8></rect> <rect class=ql-fill height=1 width=3 x=3 y=5></rect> <rect class=ql-fill height=1 width=3 x=3 y=7></rect> <rect class=ql-fill height=1 width=3 x=3 y=10></rect> <rect class=ql-fill height=1 width=3 x=3 y=12></rect> <rect class=ql-fill height=1 width=3 x=12 y=5></rect> <rect class=ql-fill height=1 width=3 x=12 y=7></rect> <rect class=ql-fill height=1 width=3 x=12 y=10></rect> <rect class=ql-fill height=1 width=3 x=12 y=12></rect> </svg>';
        },
        /* 107 */
        /***/
        function(e, i) {
          e.exports = '<svg viewbox="0 0 18 18"> <polygon class=ql-stroke points="7 11 9 13 11 11 7 11"></polygon> <polygon class=ql-stroke points="7 7 9 5 11 7 7 7"></polygon> </svg>';
        },
        /* 108 */
        /***/
        function(e, i, o) {
          Object.defineProperty(i, "__esModule", {
            value: !0
          }), i.default = i.BubbleTooltip = void 0;
          var h = function C(S, N, E) {
            S === null && (S = Function.prototype);
            var O = Object.getOwnPropertyDescriptor(S, N);
            if (O === void 0) {
              var x = Object.getPrototypeOf(S);
              return x === null ? void 0 : C(x, N, E);
            } else {
              if ("value" in O)
                return O.value;
              var L = O.get;
              return L === void 0 ? void 0 : L.call(E);
            }
          }, f = /* @__PURE__ */ function() {
            function C(S, N) {
              for (var E = 0; E < N.length; E++) {
                var O = N[E];
                O.enumerable = O.enumerable || !1, O.configurable = !0, "value" in O && (O.writable = !0), Object.defineProperty(S, O.key, O);
              }
            }
            return function(S, N, E) {
              return N && C(S.prototype, N), E && C(S, E), S;
            };
          }(), v = o(3), b = c(v), y = o(8), p = c(y), a = o(43), r = c(a), l = o(15), g = o(41), m = c(g);
          function c(C) {
            return C && C.__esModule ? C : { default: C };
          }
          function u(C, S) {
            if (!(C instanceof S))
              throw new TypeError("Cannot call a class as a function");
          }
          function d(C, S) {
            if (!C)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return S && (typeof S == "object" || typeof S == "function") ? S : C;
          }
          function _(C, S) {
            if (typeof S != "function" && S !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof S);
            C.prototype = Object.create(S && S.prototype, { constructor: { value: C, enumerable: !1, writable: !0, configurable: !0 } }), S && (Object.setPrototypeOf ? Object.setPrototypeOf(C, S) : C.__proto__ = S);
          }
          var s = [["bold", "italic", "link"], [{ header: 1 }, { header: 2 }, "blockquote"]], w = function(C) {
            _(S, C);
            function S(N, E) {
              u(this, S), E.modules.toolbar != null && E.modules.toolbar.container == null && (E.modules.toolbar.container = s);
              var O = d(this, (S.__proto__ || Object.getPrototypeOf(S)).call(this, N, E));
              return O.quill.container.classList.add("ql-bubble"), O;
            }
            return f(S, [{
              key: "extendToolbar",
              value: function(E) {
                this.tooltip = new F(this.quill, this.options.bounds), this.tooltip.root.appendChild(E.container), this.buildButtons([].slice.call(E.container.querySelectorAll("button")), m.default), this.buildPickers([].slice.call(E.container.querySelectorAll("select")), m.default);
              }
            }]), S;
          }(r.default);
          w.DEFAULTS = (0, b.default)(!0, {}, r.default.DEFAULTS, {
            modules: {
              toolbar: {
                handlers: {
                  link: function(S) {
                    S ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1);
                  }
                }
              }
            }
          });
          var F = function(C) {
            _(S, C);
            function S(N, E) {
              u(this, S);
              var O = d(this, (S.__proto__ || Object.getPrototypeOf(S)).call(this, N, E));
              return O.quill.on(p.default.events.EDITOR_CHANGE, function(x, L, A, M) {
                if (x === p.default.events.SELECTION_CHANGE)
                  if (L != null && L.length > 0 && M === p.default.sources.USER) {
                    O.show(), O.root.style.left = "0px", O.root.style.width = "", O.root.style.width = O.root.offsetWidth + "px";
                    var j = O.quill.getLines(L.index, L.length);
                    if (j.length === 1)
                      O.position(O.quill.getBounds(L));
                    else {
                      var z = j[j.length - 1], G = O.quill.getIndex(z), D = Math.min(z.length() - 1, L.index + L.length - G), P = O.quill.getBounds(new l.Range(G, D));
                      O.position(P);
                    }
                  } else document.activeElement !== O.textbox && O.quill.hasFocus() && O.hide();
              }), O;
            }
            return f(S, [{
              key: "listen",
              value: function() {
                var E = this;
                h(S.prototype.__proto__ || Object.getPrototypeOf(S.prototype), "listen", this).call(this), this.root.querySelector(".ql-close").addEventListener("click", function() {
                  E.root.classList.remove("ql-editing");
                }), this.quill.on(p.default.events.SCROLL_OPTIMIZE, function() {
                  setTimeout(function() {
                    if (!E.root.classList.contains("ql-hidden")) {
                      var O = E.quill.getSelection();
                      O != null && E.position(E.quill.getBounds(O));
                    }
                  }, 1);
                });
              }
            }, {
              key: "cancel",
              value: function() {
                this.show();
              }
            }, {
              key: "position",
              value: function(E) {
                var O = h(S.prototype.__proto__ || Object.getPrototypeOf(S.prototype), "position", this).call(this, E), x = this.root.querySelector(".ql-tooltip-arrow");
                if (x.style.marginLeft = "", O === 0) return O;
                x.style.marginLeft = -1 * O - x.offsetWidth / 2 + "px";
              }
            }]), S;
          }(a.BaseTooltip);
          F.TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""), i.BubbleTooltip = F, i.default = w;
        },
        /* 109 */
        /***/
        function(e, i, o) {
          e.exports = o(63);
        }
        /******/
      ]).default
    );
  });
})(quill);
var quillExports = quill.exports;
const Quill = /* @__PURE__ */ getDefaultExportFromCjs(quillExports), defaultOptions = {
  theme: "snow",
  boundary: document.body,
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", !1, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, !1] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
      ["link", "image", "video"]
    ]
  },
  placeholder: "Insert content here ...",
  readOnly: !1
}, _sfc_main$k = {
  name: "quill-editor",
  props: {
    content: String,
    value: String,
    disabled: {
      type: Boolean,
      default: !1
    },
    options: {
      type: Object,
      required: !1,
      default: () => ({})
    }
  },
  emits: ["ready", "change", "input", "blur", "focus", "update:value"],
  setup(t, n) {
    const e = {
      editorOption: {},
      quill: null
    };
    let i = "";
    watch(
      () => t.value,
      (v) => {
        e.quill && (v && v !== i ? (i = v, e.quill.pasteHTML(v)) : v || e.quill.setText(""));
      }
    ), watch(
      () => t.content,
      (v) => {
        e.quill && (v && v !== i ? (i = v, e.quill.pasteHTML(v)) : v || e.quill.setText(""));
      }
    ), watch(
      () => t.disabled,
      (v) => {
        e.quill && e.quill.enable(!v);
      }
    );
    const o = ref(null), h = (v, b) => {
      for (const y in b)
        !v[y] || y !== "modules" ? v[y] = b[y] : h(v[y], b[y]);
      return v;
    }, f = () => {
      o.value && (e.editorOption = h(defaultOptions, t.options), e.editorOption.readOnly = !!t.disabled, e.quill = new Quill(o.value, e.editorOption), t.value && e.quill.pasteHTML(t.value), e.quill.on("selection-change", (v) => {
        v ? n.emit("focus", e.quill) : n.emit("blur", e.quill);
      }), e.quill.on("text-change", () => {
        t.disabled && e.quill.enable(!1);
        let v = o.value.children[0].innerHTML;
        const b = e.quill, y = e.quill.getText();
        v === "<p><br></p>" && (v = ""), i = v, n.emit("update:value", i), n.emit("change", { html: v, text: y, quill: b });
      }), n.emit("ready", e.quill));
    };
    return onBeforeUnmount(() => {
      const v = o.value.previousSibling;
      v && v.nodeType === 1 && v.className.indexOf("ql-toolbar") > -1 && v.parentNode.removeChild(v);
    }), onMounted(() => {
      f();
    }), onUnmounted(() => {
      e.quill = null;
    }), { editor: o };
  }
}, _hoisted_1$7 = { ref: "editor" };
function _sfc_render$k(t, n, e, i, o, h) {
  return openBlock(), createElementBlock("section", _hoisted_1$7, null, 512);
}
const quillEditor = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render$k]]);
quillEditor.install = function(t) {
  t.component(quillEditor.name, quillEditor);
};
const _sfc_main$j = {
  name: "rich-editor-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    FormItemWrapper,
    // VueEditor: resolve => { //懒加载！！
    //   require(['vue2-editor'], ({VueEditor}) => resolve(VueEditor))
    // }
    quillEditor
  },
  data() {
    return {
      oldFieldValue: null,
      //field组件change之前的值
      fieldModel: null,
      rules: [],
      customToolbar: [],
      //富文本编辑器自定义工具栏
      valueChangedFlag: !1
      //vue2-editor数据值是否改变标志
    };
  },
  computed: {
    editorOption() {
      return {
        placeholder: this.field.options.placeholder,
        modules: {
          //toolbar: this.customToolbar
        }
      };
    }
  },
  beforeCreate() {
  },
  created() {
    this.initFieldModel(), this.registerToRefList(), this.initEventHandler(), this.buildFieldRules(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {
    handleRichEditorChangeEvent() {
      this.valueChangedFlag = !0, this.syncUpdateFormModel(this.fieldModel);
    },
    handleRichEditorFocusEvent() {
      this.oldFieldValue = deepClone(this.fieldModel);
    },
    handleRichEditorBlurEvent() {
      this.valueChangedFlag && (this.emitFieldDataChange(this.fieldModel, this.oldFieldValue), this.valueChangedFlag = !1);
    }
  }
};
function _sfc_render$j(t, n, e, i, o, h) {
  const f = resolveComponent("quill-editor"), v = resolveComponent("form-item-wrapper");
  return openBlock(), createBlock(v, {
    designer: e.designer,
    field: e.field,
    rules: o.rules,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createElementVNode("div", null, [
        createVNode(f, {
          value: o.fieldModel,
          "onUpdate:value": n[0] || (n[0] = (b) => o.fieldModel = b),
          options: h.editorOption,
          disabled: e.field.options.disabled,
          onBlur: h.handleRichEditorBlurEvent,
          onFocus: h.handleRichEditorFocusEvent,
          onChange: h.handleRichEditorChangeEvent,
          style: normalizeStyle(e.field.options.contentHeight ? `height: ${e.field.options.contentHeight};` : "")
        }, null, 8, ["value", "options", "disabled", "onBlur", "onFocus", "onChange", "style"])
      ])
    ]),
    _: 1
  }, 8, ["designer", "field", "rules", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const richEditorWidget = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j], ["__scopeId", "data-v-32f44032"]]), __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: richEditorWidget
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$i = {
  name: "select-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    FormItemWrapper
  },
  data() {
    return {
      oldFieldValue: null,
      //field组件change之前的值
      fieldModel: null,
      rules: []
    };
  },
  computed: {
    allowDefaultFirstOption() {
      return !!this.field.options.filterable && !!this.field.options.allowCreate;
    },
    remoteMethod() {
      if (this.field.options.remote && this.field.options.onRemoteQuery)
        return this.remoteQuery;
    }
  },
  beforeCreate() {
  },
  created() {
    this.initOptionItems(), this.initFieldModel(), this.registerToRefList(), this.initEventHandler(), this.buildFieldRules(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
};
function _sfc_render$i(t, n, e, i, o, h) {
  const f = resolveComponent("el-option"), v = resolveComponent("el-select"), b = resolveComponent("form-item-wrapper");
  return openBlock(), createBlock(b, {
    designer: e.designer,
    field: e.field,
    rules: o.rules,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createVNode(v, {
        ref: "fieldEditor",
        modelValue: o.fieldModel,
        "onUpdate:modelValue": n[0] || (n[0] = (y) => o.fieldModel = y),
        class: "full-width-input",
        disabled: e.field.options.disabled,
        size: t.widgetSize,
        clearable: e.field.options.clearable,
        filterable: e.field.options.filterable,
        "allow-create": e.field.options.allowCreate,
        "default-first-option": h.allowDefaultFirstOption,
        "automatic-dropdown": e.field.options.automaticDropdown,
        multiple: e.field.options.multiple,
        "multiple-limit": e.field.options.multipleLimit,
        placeholder: e.field.options.placeholder || t.i18nt("render.hint.selectPlaceholder"),
        remote: e.field.options.remote,
        "remote-method": h.remoteMethod,
        onFocus: t.handleFocusCustomEvent,
        onBlur: t.handleBlurCustomEvent,
        onChange: t.handleChangeEvent
      }, {
        default: withCtx(() => [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(e.field.options.optionItems, (y) => (openBlock(), createBlock(f, {
            key: y.value,
            label: y.label,
            value: y.value,
            disabled: y.disabled
          }, null, 8, ["label", "value", "disabled"]))), 128))
        ]),
        _: 1
      }, 8, ["modelValue", "disabled", "size", "clearable", "filterable", "allow-create", "default-first-option", "automatic-dropdown", "multiple", "multiple-limit", "placeholder", "remote", "remote-method", "onFocus", "onBlur", "onChange"])
    ]),
    _: 1
  }, 8, ["designer", "field", "rules", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const selectWidget = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i], ["__scopeId", "data-v-f0f8d3a7"]]), __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: selectWidget
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$h = {
  name: "slider-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    FormItemWrapper
  },
  data() {
    return {
      oldFieldValue: null,
      //field组件change之前的值
      fieldModel: null,
      rules: []
    };
  },
  computed: {},
  beforeCreate() {
  },
  created() {
    this.initFieldModel(), this.registerToRefList(), this.initEventHandler(), this.buildFieldRules(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
};
function _sfc_render$h(t, n, e, i, o, h) {
  const f = resolveComponent("el-slider"), v = resolveComponent("form-item-wrapper");
  return openBlock(), createBlock(v, {
    designer: e.designer,
    field: e.field,
    rules: o.rules,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createVNode(f, {
        ref: "fieldEditor",
        modelValue: o.fieldModel,
        "onUpdate:modelValue": n[0] || (n[0] = (b) => o.fieldModel = b),
        disabled: e.field.options.disabled,
        "show-stops": e.field.options.showStops,
        min: e.field.options.min,
        max: e.field.options.max,
        step: e.field.options.step,
        range: e.field.options.range,
        vertical: e.field.options.vertical,
        onChange: t.handleChangeEvent
      }, null, 8, ["modelValue", "disabled", "show-stops", "min", "max", "step", "range", "vertical", "onChange"])
    ]),
    _: 1
  }, 8, ["designer", "field", "rules", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const sliderWidget = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h], ["__scopeId", "data-v-23ac9138"]]), __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sliderWidget
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$g = {
  name: "slot-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    StaticContentWrapper
  },
  computed: {},
  beforeCreate() {
  },
  created() {
    this.registerToRefList(), this.initEventHandler(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
}, _hoisted_1$6 = {
  key: 0,
  class: "slot-title"
};
function _sfc_render$g(t, n, e, i, o, h) {
  const f = resolveComponent("static-content-wrapper");
  return openBlock(), createBlock(f, {
    designer: e.designer,
    field: e.field,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createElementVNode("div", {
        class: normalizeClass([e.designState ? "slot-wrapper-design" : "slot-wrapper-render"])
      }, [
        renderSlot(t.$slots, e.field.options.name, { formModel: t.formModel }, void 0, !0),
        e.designState ? (openBlock(), createElementBlock("div", _hoisted_1$6, toDisplayString(e.field.options.label), 1)) : createCommentVNode("", !0)
      ], 2)
    ]),
    _: 3
  }, 8, ["designer", "field", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const slotWidget = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g], ["__scopeId", "data-v-dec5e040"]]), __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: slotWidget
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$f = {
  name: "static-text-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    StaticContentWrapper
  },
  computed: {},
  beforeCreate() {
  },
  created() {
    this.registerToRefList(), this.initEventHandler(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
};
function _sfc_render$f(t, n, e, i, o, h) {
  const f = resolveComponent("static-content-wrapper");
  return openBlock(), createBlock(f, {
    designer: e.designer,
    field: e.field,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createElementVNode("div", {
        ref: "fieldEditor",
        style: normalizeStyle(e.field.options.fontSize ? `font-size: ${e.field.options.fontSize};` : "")
      }, [
        createElementVNode("pre", {
          style: normalizeStyle({ "white-space": e.field.options.preWrap ? "pre-wrap" : "pre", "text-align": e.field.options.textAlign ? e.field.options.textAlign : "left" })
        }, toDisplayString(e.field.options.textContent), 5)
      ], 4)
    ]),
    _: 1
  }, 8, ["designer", "field", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const staticTextWidget = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__scopeId", "data-v-a92d18cd"]]), __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: staticTextWidget
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$e = {
  name: "switch-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    FormItemWrapper
  },
  data() {
    return {
      oldFieldValue: null,
      //field组件change之前的值
      fieldModel: null,
      rules: []
    };
  },
  computed: {},
  beforeCreate() {
  },
  created() {
    this.initFieldModel(), this.registerToRefList(), this.initEventHandler(), this.buildFieldRules(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
};
function _sfc_render$e(t, n, e, i, o, h) {
  const f = resolveComponent("el-switch"), v = resolveComponent("form-item-wrapper");
  return openBlock(), createBlock(v, {
    designer: e.designer,
    field: e.field,
    rules: o.rules,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createVNode(f, {
        ref: "fieldEditor",
        modelValue: o.fieldModel,
        "onUpdate:modelValue": n[0] || (n[0] = (b) => o.fieldModel = b),
        disabled: e.field.options.disabled,
        "active-text": e.field.options.activeText,
        "inactive-text": e.field.options.inactiveText,
        "active-color": e.field.options.activeColor,
        "inactive-color": e.field.options.inactiveColor,
        width: e.field.options.switchWidth,
        onChange: t.handleChangeEvent
      }, null, 8, ["modelValue", "disabled", "active-text", "inactive-text", "active-color", "inactive-color", "width", "onChange"])
    ]),
    _: 1
  }, 8, ["designer", "field", "rules", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const switchWidget = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__scopeId", "data-v-577c7286"]]), __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: switchWidget
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$d = {
  name: "textarea-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    FormItemWrapper
  },
  data() {
    return {
      oldFieldValue: null,
      //field组件change之前的值
      fieldModel: null,
      rules: []
    };
  },
  computed: {},
  beforeCreate() {
  },
  created() {
    this.initFieldModel(), this.registerToRefList(), this.initEventHandler(), this.buildFieldRules(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
};
function _sfc_render$d(t, n, e, i, o, h) {
  const f = resolveComponent("el-input"), v = resolveComponent("form-item-wrapper");
  return openBlock(), createBlock(v, {
    designer: e.designer,
    field: e.field,
    rules: o.rules,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createVNode(f, {
        type: "textarea",
        ref: "fieldEditor",
        modelValue: o.fieldModel,
        "onUpdate:modelValue": n[0] || (n[0] = (b) => o.fieldModel = b),
        disabled: e.field.options.disabled,
        readonly: e.field.options.readonly,
        size: t.widgetSize,
        placeholder: e.field.options.placeholder,
        rows: e.field.options.rows,
        minlength: e.field.options.minLength,
        maxlength: e.field.options.maxLength,
        "show-word-limit": e.field.options.showWordLimit,
        onFocus: t.handleFocusCustomEvent,
        onBlur: t.handleBlurCustomEvent,
        onInput: t.handleInputCustomEvent,
        onChange: t.handleChangeEvent
      }, null, 8, ["modelValue", "disabled", "readonly", "size", "placeholder", "rows", "minlength", "maxlength", "show-word-limit", "onFocus", "onBlur", "onInput", "onChange"])
    ]),
    _: 1
  }, 8, ["designer", "field", "rules", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const textareaWidget = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__scopeId", "data-v-014ab86e"]]), __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: textareaWidget
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$c = {
  name: "time-range-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    FormItemWrapper
  },
  data() {
    return {
      oldFieldValue: null,
      //field组件change之前的值
      fieldModel: null,
      rules: []
    };
  },
  computed: {},
  beforeCreate() {
  },
  created() {
    this.initFieldModel(), this.registerToRefList(), this.initEventHandler(), this.buildFieldRules(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
};
function _sfc_render$c(t, n, e, i, o, h) {
  const f = resolveComponent("el-time-picker"), v = resolveComponent("form-item-wrapper");
  return openBlock(), createBlock(v, {
    designer: e.designer,
    field: e.field,
    rules: o.rules,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createElementVNode("div", {
        class: normalizeClass([e.field.options.autoFullWidth ? "auto-full-width" : ""])
      }, [
        createVNode(f, {
          ref: "fieldEditor",
          "is-range": "",
          modelValue: o.fieldModel,
          "onUpdate:modelValue": n[0] || (n[0] = (b) => o.fieldModel = b),
          class: normalizeClass([e.field.options.autoFullWidth ? "full-width-input" : ""]),
          disabled: e.field.options.disabled,
          readonly: e.field.options.readonly,
          size: t.widgetSize,
          clearable: e.field.options.clearable,
          editable: e.field.options.editable,
          format: e.field.options.format,
          "value-format": "HH:mm:ss",
          "start-placeholder": e.field.options.startPlaceholder || t.i18nt("render.hint.startTimePlaceholder"),
          "end-placeholder": e.field.options.endPlaceholder || t.i18nt("render.hint.endTimePlaceholder"),
          onFocus: t.handleFocusCustomEvent,
          onBlur: t.handleBlurCustomEvent,
          onChange: t.handleChangeEvent
        }, null, 8, ["modelValue", "class", "disabled", "readonly", "size", "clearable", "editable", "format", "start-placeholder", "end-placeholder", "onFocus", "onBlur", "onChange"])
      ], 2)
    ]),
    _: 1
  }, 8, ["designer", "field", "rules", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const timeRangeWidget = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__scopeId", "data-v-896343b2"]]), __vite_glob_0_23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: timeRangeWidget
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$b = {
  name: "time-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    FormItemWrapper
  },
  data() {
    return {
      oldFieldValue: null,
      //field组件change之前的值
      fieldModel: null,
      rules: []
    };
  },
  computed: {},
  beforeCreate() {
  },
  created() {
    this.initFieldModel(), this.registerToRefList(), this.initEventHandler(), this.buildFieldRules(), this.handleOnCreated();
  },
  mounted() {
    this.handleOnMounted();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
};
function _sfc_render$b(t, n, e, i, o, h) {
  const f = resolveComponent("el-time-picker"), v = resolveComponent("form-item-wrapper");
  return openBlock(), createBlock(v, {
    designer: e.designer,
    field: e.field,
    rules: o.rules,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createVNode(f, {
        ref: "fieldEditor",
        modelValue: o.fieldModel,
        "onUpdate:modelValue": n[0] || (n[0] = (b) => o.fieldModel = b),
        class: normalizeClass([e.field.options.autoFullWidth ? "auto-full-width" : ""]),
        disabled: e.field.options.disabled,
        readonly: e.field.options.readonly,
        size: t.widgetSize,
        clearable: e.field.options.clearable,
        editable: e.field.options.editable,
        format: e.field.options.format,
        "value-format": "HH:mm:ss",
        placeholder: e.field.options.placeholder || t.i18nt("render.hint.timePlaceholder"),
        onFocus: t.handleFocusCustomEvent,
        onBlur: t.handleBlurCustomEvent,
        onChange: t.handleChangeEvent
      }, null, 8, ["modelValue", "class", "disabled", "readonly", "size", "clearable", "editable", "format", "placeholder", "onFocus", "onBlur", "onChange"])
    ]),
    _: 1
  }, 8, ["designer", "field", "rules", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const timeWidget = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__scopeId", "data-v-667a68cb"]]), __vite_glob_0_24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: timeWidget
}, Symbol.toStringTag, { value: "Module" }));
let comps = {};
const modules$1 = /* @__PURE__ */ Object.assign({ "./button-widget.vue": __vite_glob_0_0, "./cascader-widget.vue": __vite_glob_0_1$1, "./checkbox-widget.vue": __vite_glob_0_2$1, "./color-widget.vue": __vite_glob_0_3$1, "./date-range-widget.vue": __vite_glob_0_4$1, "./date-widget.vue": __vite_glob_0_5$1, "./divider-widget.vue": __vite_glob_0_6$1, "./file-upload-widget.vue": __vite_glob_0_7, "./form-item-wrapper.vue": __vite_glob_0_8, "./html-text-widget.vue": __vite_glob_0_9, "./input-widget.vue": __vite_glob_0_10, "./number-widget.vue": __vite_glob_0_11, "./picture-upload-widget.vue": __vite_glob_0_12, "./radio-widget.vue": __vite_glob_0_13, "./rate-widget.vue": __vite_glob_0_14, "./rich-editor-widget.vue": __vite_glob_0_15, "./select-widget.vue": __vite_glob_0_16, "./slider-widget.vue": __vite_glob_0_17, "./slot-widget.vue": __vite_glob_0_18, "./static-content-wrapper.vue": __vite_glob_0_19, "./static-text-widget.vue": __vite_glob_0_20, "./switch-widget.vue": __vite_glob_0_21, "./textarea-widget.vue": __vite_glob_0_22, "./time-range-widget.vue": __vite_glob_0_23, "./time-widget.vue": __vite_glob_0_24 });
for (const t in modules$1) {
  let n = modules$1[t].default.name;
  comps[n] = modules$1[t].default;
}
const _sfc_main$a = {
  name: "GridColItem",
  componentName: "ContainerItem",
  mixins: [emitter, i18n$1, refMixin],
  components: {
    ...comps
  },
  props: {
    widget: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    colHeight: {
      type: String,
      default: null
    }
  },
  inject: ["refList", "globalModel", "getFormConfig", "previewState"],
  data() {
    return {
      layoutProps: {
        span: this.widget.options.span,
        md: this.widget.options.md || 12,
        sm: this.widget.options.sm || 12,
        xs: this.widget.options.xs || 12,
        offset: this.widget.options.offset || 0,
        push: this.widget.options.push || 0,
        pull: this.widget.options.pull || 0
      }
    };
  },
  computed: {
    formConfig() {
      return this.getFormConfig();
    },
    customClass() {
      return this.widget.options.customClass || "";
    },
    colHeightStyle() {
      return this.colHeight ? { height: this.colHeight + "px" } : {};
    }
  },
  created() {
    this.initLayoutProps(), this.initRefList();
  },
  methods: {
    initLayoutProps() {
      if (this.widget.options.responsive)
        if (this.previewState) {
          this.layoutProps.md = void 0, this.layoutProps.sm = void 0, this.layoutProps.xs = void 0;
          let t = this.formConfig.layoutType;
          t === "H5" ? this.layoutProps.span = this.widget.options.xs || 12 : t === "Pad" ? this.layoutProps.span = this.widget.options.sm || 12 : this.layoutProps.span = this.widget.options.md || 12;
        } else
          this.layoutProps.span = void 0;
      else
        this.layoutProps.md = void 0, this.layoutProps.sm = void 0, this.layoutProps.xs = void 0;
    }
  }
}, _hoisted_1$5 = { class: "blank-cell" }, _hoisted_2$3 = { class: "invisible-content" };
function _sfc_render$a(t, n, e, i, o, h) {
  const f = resolveComponent("el-col");
  return withDirectives((openBlock(), createBlock(f, mergeProps({
    class: ["grid-cell", [h.customClass]]
  }, o.layoutProps, {
    style: h.colHeightStyle,
    key: e.widget.id
  }), {
    default: withCtx(() => [
      e.widget.widgetList && e.widget.widgetList.length > 0 ? (openBlock(!0), createElementBlock(Fragment, { key: 0 }, renderList(e.widget.widgetList, (v, b) => (openBlock(), createElementBlock(Fragment, null, [
        v.category === "container" ? (openBlock(), createBlock(resolveDynamicComponent(t.getComponentByContainer(v)), {
          widget: v,
          key: b,
          "parent-list": e.widget.widgetList,
          "index-of-parent-list": b,
          "parent-widget": e.widget
        }, createSlots({ _: 2 }, [
          renderList(Object.keys(t.$slots), (y) => ({
            name: y,
            fn: withCtx((p) => [
              renderSlot(t.$slots, y, mergeProps({ ref_for: !0 }, p), void 0, !0)
            ])
          }))
        ]), 1032, ["widget", "parent-list", "index-of-parent-list", "parent-widget"])) : (openBlock(), createBlock(resolveDynamicComponent(v.type + "-widget"), {
          field: v,
          designer: null,
          key: b,
          "parent-list": e.widget.widgetList,
          "index-of-parent-list": b,
          "parent-widget": e.widget
        }, createSlots({ _: 2 }, [
          renderList(Object.keys(t.$slots), (y) => ({
            name: y,
            fn: withCtx((p) => [
              renderSlot(t.$slots, y, mergeProps({ ref_for: !0 }, p), void 0, !0)
            ])
          }))
        ]), 1032, ["field", "parent-list", "index-of-parent-list", "parent-widget"]))
      ], 64))), 256)) : (openBlock(), createBlock(f, { key: 1 }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_1$5, [
            createElementVNode("span", _hoisted_2$3, toDisplayString(t.i18nt("render.hint.blankCellContent")), 1)
          ])
        ]),
        _: 1
      }))
    ]),
    _: 3
  }, 16, ["class", "style"])), [
    [vShow, !e.widget.options.hidden]
  ]);
}
const GridColItem = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__scopeId", "data-v-00d234ee"]]), __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GridColItem
}, Symbol.toStringTag, { value: "Module" })), containerItemMixin = {
  inject: ["getFormConfig", "getGlobalDsv"],
  computed: {
    customClass() {
      return this.widget.options.customClass || "";
    },
    formModel: {
      cache: !1,
      get() {
        return this.globalModel.formModel;
      }
    }
  },
  mounted() {
    this.callSetHidden();
  },
  methods: {
    unregisterFromRefList() {
      if (this.refList !== null && this.widget.options.name) {
        let t = this.widget.options.name;
        delete this.refList[t];
      }
    },
    /* 主动触发setHidden()方法，以清空被隐藏容器内字段组件的校验规则！！ */
    callSetHidden() {
      this.widget.options.hidden === !0 && this.setHidden(!0);
    },
    //--------------------- 以下为组件支持外部调用的API方法 begin ------------------//
    /* 提示：用户可自行扩充这些方法！！！ */
    setHidden(t) {
      this.widget.options.hidden = t;
      let n = (e) => {
        let i = e.options.name, o = this.getWidgetRef(i);
        t && o && o.clearFieldRules && o.clearFieldRules(), !t && o && o.buildFieldRules && o.buildFieldRules();
      };
      traverseFieldWidgetsOfContainer(this.widget, n);
    },
    activeTab(t) {
      t >= 0 && t < this.widget.tabs.length && this.widget.tabs.forEach((n, e) => {
        n.options.active = e === t, e === t && (this.activeTabName = n.options.name);
      });
    },
    disableTab(t) {
      t >= 0 && t < this.widget.tabs.length && (this.widget.tabs[t].options.disabled = !0);
    },
    enableTab(t) {
      t >= 0 && t < this.widget.tabs.length && (this.widget.tabs[t].options.disabled = !1);
    },
    hideTab(t) {
      t >= 0 && t < this.widget.tabs.length && (this.widget.tabs[t].options.hidden = !0);
    },
    showTab(t) {
      t >= 0 && t < this.widget.tabs.length && (this.widget.tabs[t].options.hidden = !1);
    },
    setWidgetOption(t, n) {
      this.widget.options.hasOwnProperty(t) && (this.widget.options[t] = n);
    },
    /**
     * 获取子表单的行数
     */
    getSubFormRowCount() {
      return this.rowIdData ? this.rowIdData.length : 0;
    },
    disableSubFormRow(t) {
      this.widget.widgetList.forEach((n) => {
        let e = n.options.name + "@row" + this.rowIdData[t], i = this.getWidgetRef(e);
        i && i.setDisabled(!0);
      });
    },
    enableSubFormRow(t) {
      this.widget.widgetList.forEach((n) => {
        let e = n.options.name + "@row" + this.rowIdData[t], i = this.getWidgetRef(e);
        i && i.setDisabled(!1);
      });
    },
    disableSubForm() {
      this.rowIdData.length > 0 && this.rowIdData.forEach((t, n) => {
        this.disableSubFormRow(n);
      }), this.actionDisabled = !0;
    },
    enableSubForm() {
      this.rowIdData.length > 0 && this.rowIdData.forEach((t, n) => {
        this.enableSubFormRow(n);
      }), this.actionDisabled = !1;
    },
    resetSubForm() {
      if (this.widget.type === "sub-form") {
        let t = this.formModel[this.widget.options.name];
        t && (t.splice(0, t.length), this.rowIdData.splice(0, this.rowIdData.length)), this.widget.options.showBlankRow && this.addSubFormRow();
      }
    },
    getSubFormValues(t = !0) {
      if (this.widget.type === "sub-form")
        return this.formModel[this.widget.options.name];
      this.$message.error(this.i18nt("render.hint.nonSubFormType"));
    },
    // validateField(fieldName) { //逐行校验子表单字段
    //   //TODO:
    // },
    //
    // validateSubForm() { //逐行校验子表单全部字段
    //   //TODO:
    // },
    /**
     * 动态增加自定义css样式
     * @param className
     */
    addCssClass(t) {
      this.widget.options.customClass ? this.widget.options.customClass.push(t) : this.widget.options.customClass = [t];
    },
    /**
     * 动态移除自定义css样式
     * @param className
     */
    removeCssClass(t) {
      if (!this.widget.options.customClass)
        return;
      let n = -1;
      this.widget.options.customClass.map((e, i) => {
        e === t && (n = i);
      }), n > -1 && this.widget.options.customClass.splice(n, 1);
    }
    //--------------------- 以上为组件支持外部调用的API方法 end ------------------//
  }
}, _sfc_main$9 = {
  name: "vf-grid-item",
  //grid-item跟VueGridLayout全局注册组件重名，故特殊处理！！
  componentName: "ContainerItem",
  mixins: [emitter, i18n$1, refMixin, containerItemMixin],
  components: {
    ContainerItemWrapper,
    GridColItem
  },
  props: {
    widget: Object
  },
  inject: ["refList", "sfRefList", "globalModel"],
  created() {
    this.initRefList();
  },
  mounted() {
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
};
function _sfc_render$9(t, n, e, i, o, h) {
  const f = resolveComponent("grid-col-item"), v = resolveComponent("el-row"), b = resolveComponent("container-item-wrapper");
  return openBlock(), createBlock(b, { widget: e.widget }, {
    default: withCtx(() => [
      withDirectives((openBlock(), createBlock(v, {
        key: e.widget.id,
        gutter: e.widget.options.gutter,
        class: normalizeClass(["grid-container", [t.customClass]]),
        ref: e.widget.id
      }, {
        default: withCtx(() => [
          (openBlock(!0), createElementBlock(Fragment, null, renderList(e.widget.cols, (y, p) => (openBlock(), createBlock(f, {
            key: p,
            widget: y,
            "parent-list": e.widget.cols,
            "index-of-parent-list": p,
            "parent-widget": e.widget,
            "col-height": e.widget.options.colHeight
          }, createSlots({ _: 2 }, [
            renderList(Object.keys(t.$slots), (a) => ({
              name: a,
              fn: withCtx((r) => [
                renderSlot(t.$slots, a, mergeProps({ ref_for: !0 }, r))
              ])
            }))
          ]), 1032, ["widget", "parent-list", "index-of-parent-list", "parent-widget", "col-height"]))), 128))
        ]),
        _: 3
      }, 8, ["gutter", "class"])), [
        [vShow, !e.widget.options.hidden]
      ])
    ]),
    _: 3
  }, 8, ["widget"]);
}
const gridItem = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9]]), __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: gridItem
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$8 = {
  name: "sub-form-item",
  componentName: "ContainerItem",
  mixins: [emitter, i18n$1, refMixin, containerItemMixin],
  components: {
    ContainerItemWrapper,
    ...comps,
    SvgIcon
  },
  props: {
    widget: Object
  },
  inject: ["refList", "sfRefList", "globalModel"],
  data() {
    return {
      rowIdData: [],
      fieldSchemaData: [],
      actionDisabled: !1
    };
  },
  created() {
    this.initRefList(), this.registerSubFormToRefList(), this.initRowIdData(!0), this.initFieldSchemaData(), this.initEventHandler();
  },
  mounted() {
    this.handleSubFormFirstRowAdd();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {
    getLabelAlign(t, n) {
      return n.options.labelAlign || t.options.labelAlign;
    },
    registerSubFormToRefList() {
      this.widget.type === "sub-form" && (this.sfRefList[this.widget.options.name] = this);
    },
    initRowIdData(t) {
      if (this.widget.type === "sub-form") {
        this.rowIdData.splice(0, this.rowIdData.length);
        let n = this.formModel[this.widget.options.name];
        n && n.length > 0 && (n.forEach(() => {
          this.rowIdData.push("id" + generateId());
        }), t && setTimeout(() => {
          this.handleSubFormRowChange(n);
        }, 800));
      }
    },
    addToRowIdData() {
      this.rowIdData.push("id" + generateId());
    },
    insertToRowIdData(t) {
      this.rowIdData.splice(t, 0, "id" + generateId());
    },
    deleteFromRowIdData(t) {
      this.rowIdData.splice(t, 1);
    },
    getRowIdData() {
      return this.rowIdData;
    },
    getWidgetRefOfSubForm(t, n) {
      let e = t + "@row" + this.rowIdData[n];
      return this.getWidgetRef(e);
    },
    initFieldSchemaData() {
      if (this.widget.type !== "sub-form")
        return;
      let t = this.rowIdData.length;
      if (this.fieldSchemaData.splice(0, this.fieldSchemaData.length), t > 0)
        for (let n = 0; n < t; n++) {
          let e = [];
          this.widget.widgetList.forEach((i) => {
            e.push(this.cloneFieldSchema(i));
          }), this.fieldSchemaData.push(e);
        }
    },
    addToFieldSchemaData(t) {
      let n = [];
      this.widget.widgetList.forEach((e) => {
        n.push(this.cloneFieldSchema(e));
      }), t === void 0 ? this.fieldSchemaData.push(n) : this.fieldSchemaData.splice(t, 0, n);
    },
    deleteFromFieldSchemaData(t) {
      this.fieldSchemaData.splice(t, 1);
    },
    cloneFieldSchema(t) {
      let n = deepClone(t);
      return n.id = t.type + generateId(), n;
    },
    initEventHandler() {
      this.widget.type === "sub-form" && this.on$("setFormData", (t) => {
        this.initRowIdData(!1), this.initFieldSchemaData();
        let n = t[this.widget.options.name] || [];
        setTimeout(() => {
          this.handleSubFormRowChange(n);
        }, 800);
      });
    },
    handleSubFormFirstRowAdd() {
      if (this.widget.type === "sub-form" && this.widget.options.showBlankRow && this.rowIdData.length === 1) {
        let t = this.formModel[this.widget.options.name] || [];
        this.handleSubFormRowAdd(t, this.rowIdData[0]), this.handleSubFormRowChange(t);
      }
    },
    addSubFormRow() {
      let t = {};
      this.widget.widgetList.forEach((e) => {
        e.formItemFlag && (t[e.options.name] = e.options.defaultValue);
      });
      let n = this.formModel[this.widget.options.name] || [];
      n.push(t), this.addToRowIdData(), this.addToFieldSchemaData(), this.handleSubFormRowAdd(n, this.rowIdData[n.length - 1]), this.handleSubFormRowChange(n);
    },
    insertSubFormRow(t) {
      let n = {};
      this.widget.widgetList.forEach((i) => {
        i.formItemFlag && (n[i.options.name] = i.options.defaultValue);
      });
      let e = this.formModel[this.widget.options.name] || [];
      e.splice(t, 0, n), this.insertToRowIdData(t), this.addToFieldSchemaData(t), this.handleSubFormRowInsert(e, this.rowIdData[t]), this.handleSubFormRowChange(e);
    },
    deleteSubFormRow(t) {
      this.$confirm(this.i18nt("render.hint.deleteSubFormRow") + "?", this.i18nt("render.hint.prompt"), {
        confirmButtonText: this.i18nt("render.hint.confirm"),
        cancelButtonText: this.i18nt("render.hint.cancel")
      }).then(() => {
        let n = this.formModel[this.widget.options.name] || [], e = deepClone(n[t]);
        n.splice(t, 1), this.deleteFromRowIdData(t), this.deleteFromFieldSchemaData(t), this.handleSubFormRowDelete(n, e), this.handleSubFormRowChange(n);
      }).catch(() => {
      });
    },
    handleSubFormRowChange(t) {
      this.widget.options.onSubFormRowChange && new Function("subFormData", this.widget.options.onSubFormRowChange).call(this, t);
    },
    handleSubFormRowAdd(t, n) {
      this.widget.options.onSubFormRowAdd && new Function("subFormData", "newRowId", this.widget.options.onSubFormRowAdd).call(this, t, n);
    },
    handleSubFormRowInsert(t, n) {
      this.widget.options.onSubFormRowInsert && new Function("subFormData", "newRowId", this.widget.options.onSubFormRowInsert).call(this, t, n);
    },
    handleSubFormRowDelete(t, n) {
      this.widget.options.onSubFormRowDelete && new Function("subFormData", "deletedDataRow", this.widget.options.onSubFormRowDelete).call(this, t, n);
    }
  }
}, _hoisted_1$4 = { class: "action-header-column" }, _hoisted_2$2 = { class: "action-label" }, _hoisted_3$1 = {
  key: 0,
  class: "custom-label"
}, _hoisted_4$1 = ["title"], _hoisted_5$1 = { class: "sub-form-action-column hide-label" }, _hoisted_6$1 = { class: "action-button-column" }, _hoisted_7$1 = {
  key: 0,
  class: "row-number-span"
};
function _sfc_render$8(t, n, e, i, o, h) {
  const f = resolveComponent("svg-icon"), v = resolveComponent("el-button"), b = resolveComponent("el-tooltip"), y = resolveComponent("el-row"), p = resolveComponent("container-item-wrapper");
  return openBlock(), createBlock(p, { widget: e.widget }, {
    default: withCtx(() => [
      withDirectives((openBlock(), createElementBlock("div", {
        key: e.widget.id,
        class: "sub-form-container"
      }, [
        createVNode(y, { class: "header-row" }, {
          default: withCtx(() => [
            createElementVNode("div", _hoisted_1$4, [
              createElementVNode("span", _hoisted_2$2, toDisplayString(t.i18nt("render.hint.subFormAction")), 1),
              createVNode(v, {
                disabled: o.actionDisabled,
                round: "",
                type: "primary",
                size: "small",
                class: "action-button",
                onClick: h.addSubFormRow,
                title: t.i18nt("render.hint.subFormAddActionHint")
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(t.i18nt("render.hint.subFormAddAction")), 1),
                  createVNode(f, { "icon-class": "el-plus" })
                ]),
                _: 1
              }, 8, ["disabled", "onClick", "title"])
            ]),
            (openBlock(!0), createElementBlock(Fragment, null, renderList(e.widget.widgetList, (a) => (openBlock(), createElementBlock("div", {
              key: a.id + "thc",
              class: normalizeClass(["field-header-column", [h.getLabelAlign(e.widget, a), a.options.required ? "is-required" : ""]]),
              style: normalizeStyle({ width: a.options.columnWidth })
            }, [
              a.options.labelIconClass ? (openBlock(), createElementBlock("span", _hoisted_3$1, [
                a.options.labelIconPosition === "front" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  a.options.labelTooltip ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    createVNode(b, {
                      content: a.options.labelTooltip,
                      effect: "light"
                    }, {
                      default: withCtx(() => [
                        createVNode(f, {
                          "icon-class": a.options.labelIconClass
                        }, null, 8, ["icon-class"])
                      ]),
                      _: 2
                    }, 1032, ["content"]),
                    createTextVNode(toDisplayString(a.options.label), 1)
                  ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createVNode(f, {
                      "icon-class": a.options.labelIconClass
                    }, null, 8, ["icon-class"]),
                    createTextVNode(toDisplayString(a.options.label), 1)
                  ], 64))
                ], 64)) : a.options.labelIconPosition === "rear" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  a.options.labelTooltip ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    createTextVNode(toDisplayString(a.options.label), 1),
                    createVNode(b, {
                      content: a.options.labelTooltip,
                      effect: "light"
                    }, {
                      default: withCtx(() => [
                        createVNode(f, {
                          "icon-class": a.options.labelIconClass
                        }, null, 8, ["icon-class"])
                      ]),
                      _: 2
                    }, 1032, ["content"])
                  ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(a.options.label), 1),
                    createVNode(f, {
                      "icon-class": a.options.labelIconClass
                    }, null, 8, ["icon-class"])
                  ], 64))
                ], 64)) : createCommentVNode("", !0)
              ])) : (openBlock(), createElementBlock("span", {
                key: 1,
                title: a.options.labelTooltip
              }, toDisplayString(a.options.label), 9, _hoisted_4$1))
            ], 6))), 128))
          ]),
          _: 1
        }),
        (openBlock(!0), createElementBlock(Fragment, null, renderList(o.rowIdData, (a, r) => (openBlock(), createBlock(y, {
          class: "sub-form-row",
          key: a
        }, {
          default: withCtx(() => [
            createElementVNode("div", _hoisted_5$1, [
              createElementVNode("div", _hoisted_6$1, [
                createVNode(v, {
                  disabled: o.actionDisabled,
                  circle: "",
                  onClick: (l) => h.insertSubFormRow(r),
                  title: t.i18nt("render.hint.insertSubFormRow")
                }, {
                  default: withCtx(() => [
                    createVNode(f, { "icon-class": "el-plus" })
                  ]),
                  _: 2
                }, 1032, ["disabled", "onClick", "title"]),
                createVNode(v, {
                  disabled: o.actionDisabled,
                  circle: "",
                  onClick: (l) => h.deleteSubFormRow(r),
                  title: t.i18nt("render.hint.deleteSubFormRow")
                }, {
                  default: withCtx(() => [
                    createVNode(f, { "icon-class": "el-delete" })
                  ]),
                  _: 2
                }, 1032, ["disabled", "onClick", "title"]),
                e.widget.options.showRowNumber ? (openBlock(), createElementBlock("span", _hoisted_7$1, "#" + toDisplayString(r + 1), 1)) : createCommentVNode("", !0)
              ])
            ]),
            (openBlock(!0), createElementBlock(Fragment, null, renderList(e.widget.widgetList, (l, g) => (openBlock(), createElementBlock("div", {
              key: l.id + "tc" + a,
              class: "sub-form-table-column hide-label",
              style: normalizeStyle({ width: l.options.columnWidth })
            }, [
              (openBlock(), createBlock(resolveDynamicComponent(l.type + "-widget"), {
                field: o.fieldSchemaData[r][g],
                key: o.fieldSchemaData[r][g].id,
                "parent-list": e.widget.widgetList,
                "index-of-parent-list": g,
                "parent-widget": e.widget,
                "sub-form-row-id": a,
                "sub-form-row-index": r,
                "sub-form-col-index": g
              }, null, 8, ["field", "parent-list", "index-of-parent-list", "parent-widget", "sub-form-row-id", "sub-form-row-index", "sub-form-col-index"]))
            ], 4))), 128))
          ]),
          _: 2
        }, 1024))), 128))
      ])), [
        [vShow, !e.widget.options.hidden]
      ])
    ]),
    _: 1
  }, 8, ["widget"]);
}
const subFormItem = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-889fdff5"]]), __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: subFormItem
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$7 = {
  name: "tab-item",
  componentName: "ContainerItem",
  mixins: [emitter, i18n$1, refMixin, containerItemMixin],
  components: {
    ContainerItemWrapper,
    ...comps
  },
  props: {
    widget: Object
  },
  inject: ["refList", "sfRefList", "globalModel"],
  data() {
    return {
      activeTabName: ""
    };
  },
  computed: {
    visibleTabs() {
      return this.widget.tabs.filter((t) => !t.options.hidden);
    }
  },
  created() {
    this.initRefList();
  },
  mounted() {
    this.initActiveTab();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {
    initActiveTab() {
      if (this.widget.type === "tab" && this.widget.tabs.length > 0) {
        let t = this.widget.tabs.filter((n) => n.options.active === !0);
        t.length > 0 ? this.activeTabName = t[0].options.name : this.activeTabName = this.widget.tabs[0].options.name;
      }
    }
  }
};
function _sfc_render$7(t, n, e, i, o, h) {
  const f = resolveComponent("el-tab-pane"), v = resolveComponent("el-tabs"), b = resolveComponent("container-item-wrapper");
  return openBlock(), createBlock(b, { widget: e.widget }, {
    default: withCtx(() => [
      withDirectives((openBlock(), createElementBlock("div", {
        key: e.widget.id,
        class: "tab-container"
      }, [
        createVNode(v, {
          modelValue: o.activeTabName,
          "onUpdate:modelValue": n[0] || (n[0] = (y) => o.activeTabName = y),
          type: e.widget.displayType,
          ref: e.widget.id,
          class: normalizeClass([t.customClass])
        }, {
          default: withCtx(() => [
            (openBlock(!0), createElementBlock(Fragment, null, renderList(h.visibleTabs, (y, p) => (openBlock(), createBlock(f, {
              key: p,
              label: y.options.label,
              disabled: y.options.disabled,
              name: y.options.name
            }, {
              default: withCtx(() => [
                (openBlock(!0), createElementBlock(Fragment, null, renderList(y.widgetList, (a, r) => (openBlock(), createElementBlock(Fragment, null, [
                  a.category === "container" ? (openBlock(), createBlock(resolveDynamicComponent(t.getComponentByContainer(a)), {
                    widget: a,
                    key: r,
                    "parent-list": y.widgetList,
                    "index-of-parent-list": r,
                    "parent-widget": e.widget
                  }, createSlots({ _: 2 }, [
                    renderList(Object.keys(t.$slots), (l) => ({
                      name: l,
                      fn: withCtx((g) => [
                        renderSlot(t.$slots, l, mergeProps({ ref_for: !0 }, g))
                      ])
                    }))
                  ]), 1032, ["widget", "parent-list", "index-of-parent-list", "parent-widget"])) : (openBlock(), createBlock(resolveDynamicComponent(a.type + "-widget"), {
                    field: a,
                    key: r,
                    "parent-list": y.widgetList,
                    "index-of-parent-list": r,
                    "parent-widget": e.widget
                  }, createSlots({ _: 2 }, [
                    renderList(Object.keys(t.$slots), (l) => ({
                      name: l,
                      fn: withCtx((g) => [
                        renderSlot(t.$slots, l, mergeProps({ ref_for: !0 }, g))
                      ])
                    }))
                  ]), 1032, ["field", "parent-list", "index-of-parent-list", "parent-widget"]))
                ], 64))), 256))
              ]),
              _: 2
            }, 1032, ["label", "disabled", "name"]))), 128))
          ]),
          _: 3
        }, 8, ["modelValue", "type", "class"])
      ])), [
        [vShow, !e.widget.options.hidden]
      ])
    ]),
    _: 3
  }, 8, ["widget"]);
}
const tabItem = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]), __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tabItem
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$6 = {
  name: "TableCellItem",
  componentName: "ContainerItem",
  mixins: [emitter, i18n$1, refMixin],
  components: {
    ...comps
  },
  props: {
    widget: Object,
    rowIndex: Number,
    colIndex: Number
  },
  inject: ["refList", "globalModel"],
  computed: {
    customClass() {
      return this.widget.options.customClass || "";
    }
  },
  created() {
  },
  methods: {}
}, _hoisted_1$3 = ["colspan", "rowspan"];
function _sfc_render$6(t, n, e, i, o, h) {
  return openBlock(), createElementBlock("td", {
    class: normalizeClass(["table-cell", [h.customClass]]),
    colspan: e.widget.options.colspan || 1,
    rowspan: e.widget.options.rowspan || 1,
    style: normalizeStyle({ width: e.widget.options.cellWidth + " !important" || "", height: e.widget.options.cellHeight + " !important" || "", "word-break": e.widget.options.wordBreak ? "break-all" : "normal" })
  }, [
    (openBlock(!0), createElementBlock(Fragment, null, renderList(e.widget.widgetList, (f, v) => (openBlock(), createElementBlock(Fragment, null, [
      f.category === "container" ? (openBlock(), createBlock(resolveDynamicComponent(t.getComponentByContainer(f)), {
        widget: f,
        key: v,
        "parent-list": e.widget.widgetList,
        "index-of-parent-list": v,
        "parent-widget": e.widget
      }, createSlots({ _: 2 }, [
        renderList(Object.keys(t.$slots), (b) => ({
          name: b,
          fn: withCtx((y) => [
            renderSlot(t.$slots, b, mergeProps({ ref_for: !0 }, y), void 0, !0)
          ])
        }))
      ]), 1032, ["widget", "parent-list", "index-of-parent-list", "parent-widget"])) : (openBlock(), createBlock(resolveDynamicComponent(f.type + "-widget"), {
        field: f,
        key: v,
        "parent-list": e.widget.widgetList,
        "index-of-parent-list": v,
        "parent-widget": e.widget
      }, createSlots({ _: 2 }, [
        renderList(Object.keys(t.$slots), (b) => ({
          name: b,
          fn: withCtx((y) => [
            renderSlot(t.$slots, b, mergeProps({ ref_for: !0 }, y), void 0, !0)
          ])
        }))
      ]), 1032, ["field", "parent-list", "index-of-parent-list", "parent-widget"]))
    ], 64))), 256))
  ], 14, _hoisted_1$3);
}
const TableCellItem = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__scopeId", "data-v-ddf2bbb0"]]), __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TableCellItem
}, Symbol.toStringTag, { value: "Module" })), _sfc_main$5 = {
  name: "table-item",
  componentName: "ContainerItem",
  mixins: [emitter, i18n$1, refMixin, containerItemMixin],
  components: {
    ContainerItemWrapper,
    TableCellItem
  },
  props: {
    widget: Object
  },
  inject: ["refList", "sfRefList", "globalModel"],
  created() {
    this.initRefList();
  },
  mounted() {
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {}
};
function _sfc_render$5(t, n, e, i, o, h) {
  const f = resolveComponent("table-cell-item"), v = resolveComponent("container-item-wrapper");
  return openBlock(), createBlock(v, { widget: e.widget }, {
    default: withCtx(() => [
      withDirectives((openBlock(), createElementBlock("div", {
        key: e.widget.id,
        class: "table-container"
      }, [
        createElementVNode("table", {
          ref: e.widget.id,
          class: normalizeClass(["table-layout", [t.customClass]])
        }, [
          createElementVNode("tbody", null, [
            (openBlock(!0), createElementBlock(Fragment, null, renderList(e.widget.rows, (b, y) => (openBlock(), createElementBlock("tr", {
              key: b.id
            }, [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(b.cols, (p, a) => (openBlock(), createElementBlock(Fragment, null, [
                p.merged ? createCommentVNode("", !0) : (openBlock(), createBlock(f, {
                  widget: p,
                  key: a,
                  "parent-list": e.widget.cols,
                  "row-index": y,
                  "col-index": a,
                  "parent-widget": e.widget
                }, createSlots({ _: 2 }, [
                  renderList(Object.keys(t.$slots), (r) => ({
                    name: r,
                    fn: withCtx((l) => [
                      renderSlot(t.$slots, r, mergeProps({ ref_for: !0 }, l), void 0, !0)
                    ])
                  }))
                ]), 1032, ["widget", "parent-list", "row-index", "col-index", "parent-widget"]))
              ], 64))), 256))
            ]))), 128))
          ])
        ], 2)
      ])), [
        [vShow, !e.widget.options.hidden]
      ])
    ]),
    _: 3
  }, 8, ["widget"]);
}
const tableItem = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-c2a889b1"]]), __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tableItem
}, Symbol.toStringTag, { value: "Module" })), modules = /* @__PURE__ */ Object.assign({ "./container-item-wrapper.vue": __vite_glob_0_0$1, "./grid-col-item.vue": __vite_glob_0_1, "./grid-item.vue": __vite_glob_0_2, "./sub-form-item.vue": __vite_glob_0_3, "./tab-item.vue": __vite_glob_0_4, "./table-cell-item.vue": __vite_glob_0_5, "./table-item.vue": __vite_glob_0_6 }), ContainerItems = {
  install(t) {
    for (const n in modules) {
      let e = modules[n].default.name;
      t.component(e, modules[n].default);
    }
  }
}, _sfc_main$4 = {
  name: "VFormRender",
  componentName: "VFormRender",
  mixins: [emitter, i18n$1],
  components: {
    //ElForm,
    ...comps
  },
  props: {
    formJson: {
      //prop传入的表单JSON配置
      type: Object,
      default: () => buildDefaultFormJson()
    },
    formData: {
      //prop传入的表单数据
      type: Object,
      default: () => ({})
    },
    optionData: {
      //prop传入的选项数据
      type: Object,
      default: () => ({})
    },
    previewState: {
      //是否表单预览状态
      type: Boolean,
      default: !1
    },
    globalDsv: {
      // 全局数据源变量
      type: Object,
      default: () => ({})
    }
  },
  provide() {
    return {
      refList: this.widgetRefList,
      sfRefList: this.subFormRefList,
      //收集SubForm引用
      getFormConfig: () => this.formJsonObj.formConfig,
      /* 解决provide传递formConfig属性的响应式更新问题！！ */
      getGlobalDsv: () => this.globalDsv,
      // 全局数据源变量
      globalOptionData: this.optionData,
      getOptionData: () => this.optionData,
      /* 该方法用于在异步更新option-data之后重新获取到最新值 */
      globalModel: {
        formModel: this.formDataModel
      },
      previewState: this.previewState
    };
  },
  data() {
    return {
      formJsonObj: this.formJson,
      formDataModel: {
        //
      },
      widgetRefList: {},
      subFormRefList: {},
      formId: null,
      //表单唯一Id，用于区分页面上的多个v-form-render组件！！
      externalComponents: {}
      //外部组件实例集合
    };
  },
  computed: {
    formConfig() {
      return this.formJsonObj.formConfig;
    },
    widgetList() {
      return this.formJsonObj.widgetList;
    },
    labelPosition() {
      return this.formConfig && this.formConfig.labelPosition ? this.formConfig.labelPosition : "left";
    },
    labelWidth() {
      return this.formConfig && this.formConfig.labelWidth ? this.formConfig.labelWidth + "px" : "80px";
    },
    size() {
      return this.formConfig && this.formConfig.size ? this.formConfig.size : "default";
    },
    customClass() {
      return this.formConfig && this.formConfig.customClass ? this.formConfig.customClass : "";
    }
  },
  watch: {
    //
  },
  created() {
    this.buildFormModel(this.formJsonObj ? this.formJsonObj.widgetList : null), this.initFormObject();
  },
  mounted() {
    this.initLocale(), this.handleOnMounted();
  },
  methods: {
    initFormObject(t = !0) {
      this.formId = "vfRender" + generateId(), t && this.insertCustomStyleAndScriptNode(), this.addFieldChangeEventHandler(), this.addFieldValidateEventHandler(), this.registerFormToRefList(), this.handleOnCreated();
    },
    getContainerWidgetName(t) {
      return t.type === "grid" ? "vf-grid-item" : t.type + "-item";
    },
    getWidgetName(t) {
      return t.type + "-widget";
    },
    initLocale() {
      let t = localStorage.getItem("v_form_locale") || "zh-CN";
      this.changeLanguage(t);
    },
    insertCustomStyleAndScriptNode() {
      this.formConfig && this.formConfig.cssCode && insertCustomCssToHead(
        this.formConfig.cssCode,
        this.previewState ? "" : this.formId
      ), this.formConfig && this.formConfig.functions && insertGlobalFunctionsToHtml(
        this.formConfig.functions,
        this.previewState ? "" : this.formId
      );
    },
    buildFormModel(t) {
      t && t.length > 0 && t.forEach((n) => {
        this.buildDataFromWidget(n);
      });
    },
    buildDataFromWidget(t) {
      if (t.category === "container")
        if (t.type === "grid")
          t.cols && t.cols.length > 0 && t.cols.forEach((n) => {
            this.buildDataFromWidget(n);
          });
        else if (t.type === "table")
          t.rows && t.rows.length > 0 && t.rows.forEach((n) => {
            n.cols && n.cols.length > 0 && n.cols.forEach((e) => {
              this.buildDataFromWidget(e);
            });
          });
        else if (t.type === "tab")
          t.tabs && t.tabs.length > 0 && t.tabs.forEach((n) => {
            n.widgetList && n.widgetList.length > 0 && n.widgetList.forEach((e) => {
              this.buildDataFromWidget(e);
            });
          });
        else if (t.type === "sub-form") {
          let n = t.options.name;
          if (this.formData.hasOwnProperty(n)) {
            let e = this.formData[n];
            this.formDataModel[n] = deepClone(e);
          } else {
            let e = {};
            t.options.showBlankRow ? (t.widgetList.forEach((i) => {
              i.formItemFlag && (e[i.options.name] = i.options.defaultValue);
            }), this.formDataModel[n] = [e]) : this.formDataModel[n] = [];
          }
        } else t.type === "grid-col" || t.type === "table-cell" ? t.widgetList && t.widgetList.length > 0 && t.widgetList.forEach((n) => {
          this.buildDataFromWidget(n);
        }) : t.widgetList && t.widgetList.length > 0 && t.widgetList.forEach((n) => {
          this.buildDataFromWidget(n);
        });
      else if (t.formItemFlag)
        if (!this.formData.hasOwnProperty(t.options.name))
          this.formDataModel[t.options.name] = t.options.defaultValue;
        else {
          let n = this.formData[t.options.name];
          this.formDataModel[t.options.name] = deepClone(n);
        }
    },
    addFieldChangeEventHandler() {
      this.off$("fieldChange"), this.on$("fieldChange", (t, n, e, i, o) => {
        this.handleFieldDataChange(t, n, e, i, o), this.$emit("formChange", t, n, e, this.formDataModel, i, o);
      });
    },
    addFieldValidateEventHandler() {
      this.off$("fieldValidation"), this.on$("fieldValidation", (t) => {
        this.$refs.renderForm.validateField(t);
      });
    },
    registerFormToRefList() {
      this.widgetRefList.v_form_ref = this;
    },
    handleFieldDataChange(t, n, e, i, o) {
      this.formConfig && this.formConfig.onFormDataChange && new Function(
        "fieldName",
        "newValue",
        "oldValue",
        "formModel",
        "subFormName",
        "subFormRowIndex",
        this.formConfig.onFormDataChange
      ).call(this, t, n, e, this.formDataModel, i, o);
    },
    handleOnCreated() {
      this.formConfig && this.formConfig.onFormCreated && new Function(this.formConfig.onFormCreated).call(this);
    },
    handleOnMounted() {
      this.formConfig && this.formConfig.onFormMounted && new Function(this.formConfig.onFormMounted).call(this);
    },
    findWidgetAndSetDisabled(t, n) {
      let e = this.getWidgetRef(t);
      e ? e.setDisabled(n) : this.findWidgetOfSubFormAndSetDisabled(t, n);
    },
    findWidgetOfSubFormAndSetDisabled(t, n) {
      this.findWidgetNameInSubForm(t).forEach((e) => {
        let i = this.getWidgetRef(e);
        i && i.setDisabled(n);
      });
    },
    findWidgetAndSetHidden(t, n) {
      let e = this.getWidgetRef(t);
      e ? e.setHidden(n) : this.findWidgetOfSubFormAndSetHidden(t, n);
    },
    findWidgetOfSubFormAndSetHidden(t, n) {
      this.findWidgetNameInSubForm(t).forEach((e) => {
        let i = this.getWidgetRef(e);
        i && i.setHidden(n);
      });
    },
    findWidgetNameInSubForm(t) {
      let n = [], e = null, i = (o, h) => {
        o.options && o.options.name === t && (e = h.options.name);
      };
      if (traverseFieldWidgets(this.widgetList, i), e) {
        let o = this.getWidgetRef(e);
        if (o) {
          let h = o.getRowIdData();
          h && h.length > 0 && h.forEach((f) => {
            n.push(t + "@row" + f);
          });
        }
      }
      return n;
    },
    //--------------------- 以下为组件支持外部调用的API方法 begin ------------------//
    /* 提示：用户可自行扩充这些方法！！！ */
    changeLanguage(t) {
      changeLocale(t);
    },
    getNativeForm() {
      return this.$refs.renderForm;
    },
    getFormRef() {
      return this;
    },
    getWidgetRef(t, n = !1) {
      let e = this.widgetRefList[t];
      return !e && n && this.$message.error(this.i18nt("render.hint.refNotFound") + t), e;
    },
    clearFormDataModel() {
      for (let t in this.formDataModel)
        delete this.formDataModel[t];
    },
    /**
     * 动态加载表单JSON
     * @param newFormJson
     */
    setFormJson(t) {
      if (t)
        if (typeof t == "string" || t.constructor === Object) {
          let n = null;
          if (typeof t == "string" ? n = JSON.parse(t) : n = t, !n.formConfig || !n.widgetList) {
            this.$message.error("Invalid format of form json.");
            return;
          }
          this.clearFormDataModel(), this.buildFormModel(n.widgetList), this.formJsonObj.formConfig = n.formConfig, this.formJsonObj.widgetList = n.widgetList, this.insertCustomStyleAndScriptNode(), this.$nextTick(() => {
            this.initFormObject(!1), this.handleOnMounted();
          });
        } else
          this.$message.error("Set form json failed.");
    },
    /**
     * 重新加载选项数据
     * @param widgetNames 指定重新加载的组件名称或组件名数组，不传则重新加载所有选项字段
     */
    reloadOptionData(t) {
      let n = [];
      t && typeof t == "string" ? n = [t] : t && Array.isArray(t) && (n = [...t]), this.broadcast("FieldWidget", "reloadOptionItems", n);
    },
    getFormData(t = !0) {
      if (!t)
        return this.formDataModel;
      let n = function() {
      }, e = new window.Promise(function(i, o) {
        n = function(h, f) {
          f ? o(f) : i(h);
        };
      });
      return this.$refs.renderForm.validate((i) => {
        i ? n(this.formDataModel) : n(this.formDataModel, this.i18nt("render.hint.validationFailed"));
      }), e;
    },
    setFormData(t) {
      Object.keys(this.formDataModel).forEach((n) => {
        t && t.hasOwnProperty(n) && (this.formDataModel[n] = deepClone(t[n]));
      }), this.broadcast("ContainerItem", "setFormData", this.formDataModel), this.broadcast("FieldWidget", "setFormData", this.formDataModel);
    },
    getFieldValue(t) {
      let n = this.getWidgetRef(t);
      if (n && n.getValue)
        return n.getValue();
      if (!n) {
        let e = [];
        return this.findWidgetNameInSubForm(t).forEach((i) => {
          let o = this.getWidgetRef(i);
          o && o.getValue && e.push(o.getValue());
        }), e;
      }
    },
    setFieldValue(t, n) {
      let e = this.getWidgetRef(t);
      e && e.setValue && e.setValue(n), e || this.findWidgetNameInSubForm(t).forEach((i) => {
        let o = this.getWidgetRef(i);
        o && o.setValue && o.setValue(n);
      });
    },
    getSubFormValues(t, n = !0) {
      return this.subFormRefList[t].getSubFormValues(n);
    },
    disableForm() {
      Object.keys(this.widgetRefList).forEach((n) => {
        let e = this.getWidgetRef(n);
        if (e)
          if (e.widget && e.widget.type === "sub-form")
            e.disableSubForm();
          else {
            //!!foundW.setDisabled && foundW.setDisabled(true)
            e.setDisabled && e.setDisabled(!0);
          }
      });
    },
    enableForm() {
      Object.keys(this.widgetRefList).forEach((n) => {
        let e = this.getWidgetRef(n);
        if (e)
          if (e.widget && e.widget.type === "sub-form")
            e.enableSubForm();
          else {
            //!!foundW.setDisabled && foundW.setDisabled(false)
            e.setDisabled && e.setDisabled(!1);
          }
      });
    },
    resetForm() {
      Object.keys(this.subFormRefList).forEach((e) => {
        this.subFormRefList[e].resetSubForm && this.subFormRefList[e].resetSubForm();
      }), Object.keys(this.widgetRefList).forEach((e) => {
        let i = this.getWidgetRef(e);
        i && !i.subFormItemFlag && i.resetField && i.resetField();
      }), this.$nextTick(() => {
        this.clearValidate();
      });
    },
    clearValidate(t) {
      this.$refs.renderForm.clearValidate(t);
    },
    /**
     * 校验表单
     * @param callback 回调函数
     */
    validateForm(t) {
      this.$refs.renderForm.validate((n) => {
        t(n);
      });
    },
    validateFields() {
    },
    disableWidgets(t) {
      t && (typeof t == "string" ? this.findWidgetAndSetDisabled(t, !0) : Array.isArray(t) && t.forEach((n) => {
        this.findWidgetAndSetDisabled(n, !0);
      }));
    },
    enableWidgets(t) {
      t && (typeof t == "string" ? this.findWidgetAndSetDisabled(t, !1) : Array.isArray(t) && t.forEach((n) => {
        this.findWidgetAndSetDisabled(n, !1);
      }));
    },
    hideWidgets(t) {
      t && (typeof t == "string" ? this.findWidgetAndSetHidden(t, !0) : Array.isArray(t) && t.forEach((n) => {
        this.findWidgetAndSetHidden(n, !0);
      }));
    },
    showWidgets(t) {
      t && (typeof t == "string" ? this.findWidgetAndSetHidden(t, !1) : Array.isArray(t) && t.forEach((n) => {
        this.findWidgetAndSetHidden(n, !1);
      }));
    },
    /**
     * 获取所有字段组件
     * @returns {*[]}
     */
    getFieldWidgets() {
      return getAllFieldWidgets(this.formJsonObj.widgetList);
    },
    /**
     * 获取所有容器组件
     * @returns {*[]}
     */
    getContainerWidgets() {
      return getAllContainerWidgets(this.formJsonObj.widgetList);
    },
    /**
     * 增加外部组件引用，可通过getEC()方法获取外部组件，以便在VForm内部调用外部组件方法
     * @param componentName 外部组件名称
     * @param externalComponent 外部组件实例
     */
    addEC(t, n) {
      this.externalComponents[t] = n;
    },
    /**
     * 判断外部组件是否可获取
     * @param componentName 外部组件名称
     * @returns {boolean}
     */
    hasEC(t) {
      return this.externalComponents.hasOwnProperty(t);
    },
    /**
     * 获取外部组件实例
     * @param componentName
     * @returns {*}
     */
    getEC(t) {
      return this.externalComponents[t];
    },
    /**
     * 获取globalDsv对象
     * @returns {*}
     */
    getGlobalDsv() {
      return this.globalDsv;
    }
    //--------------------- 以上为组件支持外部调用的API方法 end ------------------//
  }
};
function _sfc_render$4(t, n, e, i, o, h) {
  const f = resolveComponent("el-form");
  return openBlock(), createBlock(f, {
    "label-position": h.labelPosition,
    size: h.size,
    class: normalizeClass([[h.customClass], "render-form"]),
    "label-width": h.labelWidth,
    "validate-on-rule-change": !1,
    model: o.formDataModel,
    ref: "renderForm",
    onSubmit: n[0] || (n[0] = withModifiers(() => {
    }, ["prevent"]))
  }, {
    default: withCtx(() => [
      (openBlock(!0), createElementBlock(Fragment, null, renderList(h.widgetList, (v, b) => (openBlock(), createElementBlock(Fragment, null, [
        v.category === "container" ? (openBlock(), createBlock(resolveDynamicComponent(h.getContainerWidgetName(v)), {
          widget: v,
          key: v.id,
          "parent-list": h.widgetList,
          "index-of-parent-list": b,
          "parent-widget": null
        }, createSlots({ _: 2 }, [
          renderList(Object.keys(t.$slots), (y) => ({
            name: y,
            fn: withCtx((p) => [
              renderSlot(t.$slots, y, mergeProps({ ref_for: !0 }, p), void 0, !0)
            ])
          }))
        ]), 1032, ["widget", "parent-list", "index-of-parent-list"])) : (openBlock(), createBlock(resolveDynamicComponent(h.getWidgetName(v)), {
          field: v,
          "form-model": o.formDataModel,
          designer: null,
          key: v.id,
          "parent-list": h.widgetList,
          "index-of-parent-list": b,
          "parent-widget": null
        }, createSlots({ _: 2 }, [
          renderList(Object.keys(t.$slots), (y) => ({
            name: y,
            fn: withCtx((p) => [
              renderSlot(t.$slots, y, mergeProps({ ref_for: !0 }, p), void 0, !0)
            ])
          }))
        ]), 1032, ["field", "form-model", "parent-list", "index-of-parent-list"]))
      ], 64))), 256))
    ]),
    _: 3
  }, 8, ["label-position", "size", "class", "label-width", "model"]);
}
const VFormRender = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-9efb105b"]]);
/*! Element Plus Icons Vue v2.3.1 */
var arrow_down_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ArrowDown",
  __name: "arrow-down",
  setup(t) {
    return (n, e) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
      })
    ]));
  }
}), arrow_down_default = arrow_down_vue_vue_type_script_setup_true_lang_default, arrow_up_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ArrowUp",
  __name: "arrow-up",
  setup(t) {
    return (n, e) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0"
      })
    ]));
  }
}), arrow_up_default = arrow_up_vue_vue_type_script_setup_true_lang_default, circle_plus_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "CirclePlus",
  __name: "circle-plus",
  setup(t) {
    return (n, e) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M352 480h320a32 32 0 1 1 0 64H352a32 32 0 0 1 0-64"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M480 672V352a32 32 0 1 1 64 0v320a32 32 0 0 1-64 0"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
      })
    ]));
  }
}), circle_plus_default = circle_plus_vue_vue_type_script_setup_true_lang_default, delete_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "Delete",
  __name: "delete",
  setup(t) {
    return (n, e) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32"
      })
    ]));
  }
}), delete_default = delete_vue_vue_type_script_setup_true_lang_default, edit_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "Edit",
  __name: "edit",
  setup(t) {
    return (n, e) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640z"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"
      })
    ]));
  }
}), edit_default = edit_vue_vue_type_script_setup_true_lang_default, info_filled_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "InfoFilled",
  __name: "info-filled",
  setup(t) {
    return (n, e) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344M590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
      })
    ]));
  }
}), info_filled_default = info_filled_vue_vue_type_script_setup_true_lang_default, minus_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "Minus",
  __name: "minus",
  setup(t) {
    return (n, e) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64"
      })
    ]));
  }
}), minus_default = minus_vue_vue_type_script_setup_true_lang_default, plus_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "Plus",
  __name: "plus",
  setup(t) {
    return (n, e) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"
      })
    ]));
  }
}), plus_default = plus_vue_vue_type_script_setup_true_lang_default, search_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "Search",
  __name: "search",
  setup(t) {
    return (n, e) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704"
      })
    ]));
  }
}), search_default = search_vue_vue_type_script_setup_true_lang_default;
function registerIcon(t) {
  t.component("el-icon-edit", edit_default), t.component("el-icon-minus", minus_default), t.component("el-icon-plus", plus_default), t.component("el-icon-info", info_filled_default), t.component("el-icon-search", search_default), t.component("el-icon-circle-plus-outline", circle_plus_default), t.component("el-icon-delete", delete_default), t.component("el-icon-arrow-down", arrow_down_default), t.component("el-icon-arrow-up", arrow_up_default);
}
if (typeof window < "u") {
  let t = function() {
    var n = document.body, e = document.getElementById("__svg__icons__dom__");
    e || (e = document.createElementNS("http://www.w3.org/2000/svg", "svg"), e.style.position = "absolute", e.style.width = "0", e.style.height = "0", e.id = "__svg__icons__dom__", e.setAttribute("xmlns", "http://www.w3.org/2000/svg"), e.setAttribute("xmlns:link", "http://www.w3.org/1999/xlink")), e.innerHTML = '<symbol class="icon" viewBox="0 0 1024 1024"  id="icon-alert"><path d="M512 85.163a319.573 319.573 0 0 1 319.83 309.333l.17 10.667v174.805l58.88 134.656a53.29 53.29 0 0 1-48.853 74.71L640 789.418a128 128 0 0 1-255.787 7.509l-.213-7.637-201.6.042a53.333 53.333 0 0 1-48.939-74.581L192 580.011V405.163c0-177.28 143.019-320 320-320zm64 704.17-128 .128a64 64 0 0 0 127.701 6.144l.256-6.272zm-64-640.17c-141.653 0-256 114.09-256 256v188.16l-57.344 132.01h627.072L768 593.365V405.717l-.17-9.6A255.488 255.488 0 0 0 512 149.163zM896 352h85.333a32 32 0 0 1 4.352 63.701l-4.352.299H896a32 32 0 0 1-4.352-63.701L896 352zm-853.333 0H128a32 32 0 0 1 4.352 63.701L128 416H42.667a32 32 0 0 1-4.352-63.701l4.352-.299zm921.6-243.2a32 32 0 0 1-2.816 41.685l-3.584 3.115-85.334 64a32 32 0 0 1-41.984-48.085l3.584-3.115 85.334-64a32 32 0 0 1 44.8 6.4zm-859.734-6.4 85.334 64a32 32 0 1 1-38.4 51.2l-85.334-64a32 32 0 1 1 38.4-51.2z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-button"><path d="M912 176v416H732.48v-32H880V208H144v352h175.488v32H112V176z" /><path d="m436.384 788.512.544 2.688a16 16 0 0 0 27.776 5.504l44.032-54.336 56.768 97.664a16 16 0 0 0 21.792 5.856l68.672-39.392 2.368-1.664a16 16 0 0 0 3.52-20.256l-55.904-96.16 68.8-12.064a16 16 0 0 0 6.464-28.8l-256-180.64a16 16 0 0 0-25.12 14.976l36.288 306.624z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-card"><path d="M858.656 864H165.344C109.472 864 64 818.56 64 762.688V261.312C64 205.44 109.472 160 165.344 160h693.312C914.528 160 960 205.44 960 261.312v501.376C960 818.56 914.528 864 858.656 864zM165.344 224C144.736 224 128 240.736 128 261.312v501.376C128 783.264 144.736 800 165.344 800h693.312C879.264 800 896 783.264 896 762.688V261.312C896 240.736 879.264 224 858.656 224H165.344zM800 416H224c-17.664 0-32-14.336-32-32s14.336-32 32-32h576c17.696 0 32 14.336 32 32s-14.304 32-32 32zM320 736h-96c-17.664 0-32-14.304-32-32s14.336-32 32-32h96c17.664 0 32 14.304 32 32s-14.336 32-32 32z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-cascader-field"><path d="M661.377 411.07v64.595H314.175v395.654H871.32V475.665h-48.447V411.07h48.447c35.675 0 64.595 28.92 64.595 64.595v395.654c0 35.675-28.92 64.595-64.595 64.595H314.175c-35.675 0-64.6-28.92-64.6-64.595V475.665c0-35.675 28.925-64.595 64.6-64.595h347.202zm48.448-322.984c35.675 0 64.6 28.92 64.6 64.595v403.73c0 35.676-28.925 64.595-64.6 64.595H362.623v-64.594h347.202V152.68H152.68v403.73h48.447v64.595H152.68c-35.675 0-64.595-28.92-64.595-64.594V152.68c0-35.675 28.92-64.595 64.595-64.595h557.144z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-checkbox-field"><path d="M897.94 896.77c6.259-6.278 10.257-14.835 10.257-24.531V147.672c0-9.118-3.998-18.235-10.257-24.533-6.277-6.258-14.815-9.696-24.51-9.696H149.644c-9.688 0-18.236 3.437-24.503 9.696-6.268 6.297-9.687 15.414-9.687 24.533V872.24c0 9.696 3.42 18.253 9.687 24.53 6.267 6.278 14.815 10.276 24.503 10.276h723.784c9.697 0 18.234-3.998 24.511-10.276zM149.645 61.52h723.784c23.933 0 45.586 9.697 60.98 25.111 15.397 15.974 25.073 37.666 25.073 61.04v724.567c0 23.97-9.676 45.643-25.073 61.056-15.394 15.396-37.047 25.093-60.98 25.093H149.645c-23.364 0-45.017-9.697-60.972-25.093-15.396-15.414-25.082-37.087-25.082-61.056V147.672c0-23.374 9.686-45.065 25.082-61.039 15.955-15.415 37.608-25.112 60.972-25.112z" /><path d="M417.42 698.27a23.556 23.556 0 0 1-16.668-6.9L259.5 550.12c-9.173-9.15-9.173-24.095 0-33.291 9.17-9.147 24.115-9.147 33.288 0l124.583 124.607 312.895-312.917c9.194-9.172 24.14-9.172 33.288 0 9.196 9.172 9.196 24.116 0 33.29L433.992 691.37c-4.618 4.645-10.643 6.9-16.666 6.9h.093z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-color-field"><path d="M619.52 490.667h-.853l-85.334-85.334h.854z" /><path d="M619.52 507.733h-.853a17.067 17.067 0 1 1 0-34.133c9.438 0 17.476 7.646 17.476 17.067s-7.185 17.066-16.623 17.066zM534.187 422.4c-9.438 0-17.494-7.646-17.494-17.067s7.202-17.066 16.64-17.066h.854a17.067 17.067 0 1 1 0 34.133zM192 866.133a34.133 34.133 0 0 1-24.132-58.265l42.666-42.667a34.133 34.133 0 1 1 48.265 48.265l-42.667 42.666A33.963 33.963 0 0 1 192 866.133z" /><path d="m619.52 490.667-.427-.427-84.906-84.907L746.667 192H832v85.333z" /><path d="M662.187 567.467a33.997 33.997 0 0 1-24.133-10.001L467.388 386.799a34.133 34.133 0 0 1 48.281-48.282l170.667 170.667a34.133 34.133 0 0 1-24.15 58.283z" /><path d="M320 806.4h-85.333a17.067 17.067 0 0 1-17.067-17.067V704c0-4.54 1.792-8.875 5-12.066L521.695 392.84a16.52 16.52 0 0 1 3.567-2.731l209.305-210.142a17.117 17.117 0 0 1 12.1-5.018H832a17.067 17.067 0 0 1 17.067 17.067v85.333a17.067 17.067 0 0 1-4.967 12.05L631.62 502.732a17.954 17.954 0 0 1-3.618 2.782L332.066 801.434A17.135 17.135 0 0 1 320 806.4zm-68.267-34.133h61.201l294.093-294.093a16.52 16.52 0 0 1 3.567-2.73l204.34-205.16v-61.217h-61.185L546.287 417.382a17.954 17.954 0 0 1-3.618 2.782L251.733 711.066v61.2z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-custom-component"><path d="M811.008 335.872c-2.048-7.168-11.264-9.216-17.408-4.096L690.176 435.2c-8.192 8.192-20.48 8.192-28.672 0L588.8 362.496c-8.192-8.192-8.192-20.48 0-28.672l104.448-104.448c5.12-5.12 3.072-14.336-4.096-17.408-17.408-4.096-35.84-7.168-54.272-7.168-108.544 0-195.584 94.208-183.296 204.8 2.048 17.408 6.144 32.768 12.288 48.128L225.28 697.344c-27.648 27.648-27.648 73.728 0 101.376 14.336 14.336 32.768 21.504 51.2 21.504s36.864-7.168 51.2-21.504l238.592-238.592c15.36 6.144 31.744 10.24 48.128 12.288 111.616 12.288 204.8-74.752 204.8-183.296 0-18.432-3.072-36.864-8.192-53.248z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-data-table"><path d="M915.692 39.385H108.308c-15.754 0-29.539 13.784-29.539 29.538v98.462c0 15.753 13.785 29.538 29.539 29.538h807.384c15.754 0 29.539-13.785 29.539-29.538V68.923c0-15.754-13.785-29.538-29.539-29.538zM285.538 275.692h-177.23c-15.754 0-29.539 13.785-29.539 29.539v59.077c0 15.754 13.785 29.538 29.539 29.538h177.23c15.754 0 29.539-13.784 29.539-29.538V305.23c0-15.754-13.785-29.539-29.539-29.539zm315.077 0h-177.23c-15.754 0-29.539 13.785-29.539 29.539v59.077c0 15.754 13.785 29.538 29.539 29.538h177.23c15.754 0 29.539-13.784 29.539-29.538V305.23c0-15.754-13.785-29.539-29.539-29.539zm315.077 0h-177.23c-15.754 0-29.539 13.785-29.539 29.539v59.077c0 15.754 13.785 29.538 29.539 29.538h177.23c15.754 0 29.539-13.784 29.539-29.538V305.23c0-15.754-13.785-29.539-29.539-29.539zM285.538 472.615h-177.23c-15.754 0-29.539 13.785-29.539 29.539v59.077c0 15.754 13.785 29.538 29.539 29.538h177.23c15.754 0 29.539-13.784 29.539-29.538v-59.077c0-15.754-13.785-29.539-29.539-29.539zm315.077 0h-177.23c-15.754 0-29.539 13.785-29.539 29.539v59.077c0 15.754 13.785 29.538 29.539 29.538h177.23c15.754 0 29.539-13.784 29.539-29.538v-59.077c0-15.754-13.785-29.539-29.539-29.539zm315.077 0h-177.23c-15.754 0-29.539 13.785-29.539 29.539v59.077c0 15.754 13.785 29.538 29.539 29.538h177.23c15.754 0 29.539-13.784 29.539-29.538v-59.077c0-15.754-13.785-29.539-29.539-29.539zM285.538 669.538h-177.23c-15.754 0-29.539 13.785-29.539 29.539v59.077c0 15.754 13.785 29.538 29.539 29.538h177.23c15.754 0 29.539-13.784 29.539-29.538v-59.077c0-15.754-13.785-29.539-29.539-29.539zm315.077 0h-177.23c-15.754 0-29.539 13.785-29.539 29.539v59.077c0 15.754 13.785 29.538 29.539 29.538h177.23c15.754 0 29.539-13.784 29.539-29.538v-59.077c0-15.754-13.785-29.539-29.539-29.539zm315.077 0h-177.23c-15.754 0-29.539 13.785-29.539 29.539v59.077c0 15.754 13.785 29.538 29.539 29.538h177.23c15.754 0 29.539-13.784 29.539-29.538v-59.077c0-15.754-13.785-29.539-29.539-29.539zM285.538 866.462h-177.23c-15.754 0-29.539 13.784-29.539 29.538v59.077c0 15.754 13.785 29.538 29.539 29.538h177.23c15.754 0 29.539-13.784 29.539-29.538V896c0-15.754-13.785-29.538-29.539-29.538zm315.077 0h-177.23c-15.754 0-29.539 13.784-29.539 29.538v59.077c0 15.754 13.785 29.538 29.539 29.538h177.23c15.754 0 29.539-13.784 29.539-29.538V896c0-15.754-13.785-29.538-29.539-29.538zm315.077 0h-177.23c-15.754 0-29.539 13.784-29.539 29.538v59.077c0 15.754 13.785 29.538 29.539 29.538h177.23c15.754 0 29.539-13.784 29.539-29.538V896c0-15.754-13.785-29.538-29.539-29.538z" /></symbol><symbol class="icon" viewBox="0 0 1132 1024"  id="icon-date-field"><path d="M1023.995 1023.995H107.789C48.262 1023.995 0 975.732 0 916.205V188.63C0 129.105 48.262 80.843 107.789 80.843h80.842v53.894h-80.842c-29.777 0-53.895 24.118-53.895 53.895V296.42H1077.89V188.63c0-29.776-24.117-53.894-53.894-53.894h-80.842V80.842h80.842c59.526 0 107.789 48.262 107.789 107.789v727.575c0 59.526-48.263 107.789-107.79 107.789Zm53.894-673.681H53.894v565.892c0 29.777 24.118 53.894 53.895 53.894h916.206c29.777 0 53.894-24.117 53.894-53.894V350.314ZM794.943 628.086l-3.584 5.632c-3.314 6.306-7.087 12.153-11.237 17.731L646.734 861.476H589.12l98.358-160.875c-.108 0-.216.027-.324.027-66.963 0-121.262-60.335-121.262-134.736 0-74.401 54.299-134.736 121.262-134.736 66.964 0 121.263 60.335 121.263 134.736 0 22.42-5.39 43.25-14.12 61.844l.646.35ZM687.154 485.05c-37.214 0-67.368 36.19-67.368 80.842 0 44.651 30.154 80.842 67.368 80.842 19.052 0 36.164-9.567 48.425-24.819l9.781-16.006c5.66-11.83 9.163-25.385 9.163-40.017 0-44.652-30.154-80.842-67.369-80.842Zm-310.216 21.881-80.734 72.327v-66.991l82.405-80.41h52.062v429.727h-53.733V506.93Zm512.32-291.353c-14.874 0-26.947-12.072-26.947-26.947V26.947C862.311 12.072 874.384 0 889.26 0s26.947 12.072 26.947 26.947v161.684c0 14.875-12.072 26.947-26.947 26.947ZM296.42 80.842h538.944v53.894H296.42V80.842Zm-53.895 134.736c-14.875 0-26.947-12.072-26.947-26.947V26.947C215.578 12.072 227.65 0 242.525 0s26.947 12.072 26.947 26.947v161.684c0 14.875-12.072 26.947-26.947 26.947Z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-date-range-field"><path d="M887.467 192.853H786.773v-73.386c0-10.24-6.826-17.067-17.066-17.067s-17.067 6.827-17.067 17.067v73.386H303.787v-73.386c0-10.24-6.827-17.067-17.067-17.067s-17.067 6.827-17.067 17.067v73.386H168.96c-46.08 0-85.333 37.547-85.333 85.334v558.08c0 46.08 37.546 85.333 85.333 85.333h718.507c46.08 0 85.333-37.547 85.333-85.333v-558.08c0-47.787-37.547-85.334-85.333-85.334zM168.96 226.987h100.693v66.56c0 10.24 6.827 17.066 17.067 17.066s17.067-6.826 17.067-17.066v-66.56h450.56v66.56c0 10.24 6.826 17.066 17.066 17.066s17.067-6.826 17.067-17.066v-66.56h98.987c27.306 0 51.2 22.186 51.2 51.2v88.746H117.76v-88.746c0-29.014 22.187-51.2 51.2-51.2zm718.507 660.48H168.96c-27.307 0-51.2-22.187-51.2-51.2v-435.2h820.907v435.2c0 27.306-22.187 51.2-51.2 51.2z" /><path d="M858.453 493.227H327.68c-10.24 0-17.067 6.826-17.067 17.066V624.64H194.56c-10.24 0-17.067 6.827-17.067 17.067v133.12c0 10.24 6.827 17.066 17.067 17.066H460.8c10.24 0 17.067-6.826 17.067-17.066V660.48h380.586c10.24 0 17.067-6.827 17.067-17.067v-133.12c0-10.24-6.827-17.066-17.067-17.066zM445.44 527.36v97.28h-98.987v-97.28h98.987zm-230.4 131.413h98.987v98.987H215.04v-98.987zm131.413 97.28v-97.28h98.987v97.28h-98.987zm133.12-228.693h97.28v98.987h-97.28V527.36zm131.414 0h98.986v98.987h-98.986V527.36zm230.4 97.28H742.4v-98.987h98.987v98.987z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-divider"><path d="M62.5 491.773h899v74.918h-899v-74.918z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-document"><path d="M979.478 706.382a44.522 44.522 0 0 1-11.843 57.967l-4.363 2.85L569.478 995.06l-5.388 4.764a84.013 84.013 0 0 1-43.943 17.808l-8.102.401c-19.056 0-37.31-6.545-52.046-18.254l-5.432-4.72L60.817 767.2a44.522 44.522 0 0 1-18.61-56.187l2.36-4.63a44.522 44.522 0 0 1 60.816-16.25l405.326 234.54 1.336 1.514 1.335-1.514 405.282-234.54a44.522 44.522 0 0 1 60.86 16.25zm0-222.609a44.522 44.522 0 0 1-11.843 57.968l-4.363 2.849-393.794 227.862-5.388 4.764a84.013 84.013 0 0 1-43.943 17.809l-8.102.4c-19.056 0-37.31-6.544-52.046-18.254l-5.432-4.719L60.817 544.59a44.522 44.522 0 0 1-18.61-56.187l2.36-4.63a44.522 44.522 0 0 1 60.816-16.25l405.326 234.54 1.336 1.514 1.335-1.514 405.282-234.54a44.522 44.522 0 0 1 60.86 16.25zM512 0c18.788 0 36.864 6.1 51.645 17.185l4.586 3.74 403.5 199.68 5.61 6.144c32.501 35.44 32.501 89.89 0 125.329l-5.61 6.144-403.5 199.59-4.541 3.785a86.239 86.239 0 0 1-43.676 16.83l-8.014.356c-18.788 0-36.864-6.1-51.645-17.186l-4.63-3.784L52.269 358.222l-5.61-6.144a92.739 92.739 0 0 1 0-125.329l5.61-6.144 403.456-199.68 4.585-3.74C473 7.702 488.136 1.87 503.986.356z" fill="#008df0" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-drag"><path d="M574.958 267.016h-63.454 204.649L511.213 63.655 307.85 267.016h141.191V456.68H258.688v125.917H449.04V772.95h125.917V582.596h188.875V456.679H574.958V267.016zm-63.704 693.33 189.62-187.396H323.126l188.129 187.395zM71.292 518.891l187.395 189.62v-377.75L71.292 518.892zm692.54-188.13v377.75L952.708 518.89 763.833 330.762z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-file-upload-field"><path d="m676.48 72.96 209.92 211.2 9.6 23.04V928l-32 32H160l-32-32V96l32-32h494.08l22.4 8.96zM640 320h192L640 128v192zM192 128v768h640V384H608l-32-32V128H192zm512 320H320v64h384v-64zM320 576h384v64H320v-64zm384 128H320v64h384v-64z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-github"><path d="M512 0C229.284 0 .142 234.943.142 524.868c0 231.829 146.647 428.553 350.068 497.952 25.593 4.82 34.977-11.389 34.977-25.294 0-12.455-.469-45.47-.725-89.277-142.382 31.735-172.453-70.38-172.453-70.38-23.247-60.57-56.817-76.694-56.817-76.694-46.493-32.588 3.54-31.948 3.54-31.948 51.357 3.71 78.358 54.086 78.358 54.086 45.683 80.191 119.817 57.072 148.993 43.594 4.65-33.911 17.915-57.03 32.503-70.168-113.675-13.223-233.151-58.224-233.151-259.341 0-57.285 19.92-104.163 52.678-140.846-5.246-13.266-22.82-66.627 4.991-138.884 0 0 42.996-14.076 140.76 53.787 40.864-11.644 84.628-17.445 128.179-17.659 43.465.214 87.271 6.015 128.135 17.66 97.68-67.907 140.59-53.788 140.59-53.788 27.939 72.257 10.408 125.618 5.119 138.884 32.844 36.683 52.593 83.56 52.593 140.846 0 201.587-119.647 245.99-233.663 258.957 18.341 16.21 34.72 48.2 34.72 97.21 0 70.168-.639 126.728-.639 143.96 0 14.034 9.214 30.371 35.19 25.21 203.25-69.528 349.77-266.124 349.77-497.867C1023.858 234.943 794.674 0 512 0" fill="#3E75C3" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-grid"><path d="M819.354 921.6h102.4V819.2h-102.4v102.4zm102.4-204.8h-102.4a102.4 102.4 0 0 0-102.4 102.4v102.4a102.4 102.4 0 0 0 102.4 102.4h102.4a102.4 102.4 0 0 0 102.4-102.4V819.2a102.4 102.4 0 0 0-102.4-102.4zm-460.8 204.8h102.4V819.2h-102.4v102.4zm102.4-204.8h-102.4a102.4 102.4 0 0 0-102.4 102.4v102.4a102.4 102.4 0 0 0 102.4 102.4h102.4a102.4 102.4 0 0 0 102.4-102.4V819.2a102.4 102.4 0 0 0-102.4-102.4zm-460.8 204.8h102.4V819.2h-102.4v102.4zm102.4-204.8h-102.4A102.4 102.4 0 0 0 .154 819.2v102.4a102.4 102.4 0 0 0 102.4 102.4h102.4a102.4 102.4 0 0 0 102.4-102.4V819.2a102.4 102.4 0 0 0-102.4-102.4zm614.4-153.6h102.4V460.8h-102.4v102.4zm102.4-204.8h-102.4a102.4 102.4 0 0 0-102.4 102.4v102.4a102.4 102.4 0 0 0 102.4 102.4h102.4a102.4 102.4 0 0 0 102.4-102.4V460.8a102.4 102.4 0 0 0-102.4-102.4zm-460.8 204.8h102.4V460.8h-102.4v102.4zm102.4-204.8h-102.4a102.4 102.4 0 0 0-102.4 102.4v102.4a102.4 102.4 0 0 0 102.4 102.4h102.4a102.4 102.4 0 0 0 102.4-102.4V460.8a102.4 102.4 0 0 0-102.4-102.4zm-460.8 204.8h102.4V460.8h-102.4v102.4zm102.4-204.8h-102.4A102.4 102.4 0 0 0 .154 460.8v102.4a102.4 102.4 0 0 0 102.4 102.4h102.4a102.4 102.4 0 0 0 102.4-102.4V460.8a102.4 102.4 0 0 0-102.4-102.4zm614.4-153.6h102.4V102.4h-102.4v102.4zM921.754 0h-102.4a102.4 102.4 0 0 0-102.4 102.4v102.4a102.4 102.4 0 0 0 102.4 102.4h102.4a102.4 102.4 0 0 0 102.4-102.4V102.4A102.4 102.4 0 0 0 921.754 0zm-460.8 204.8h102.4V102.4h-102.4v102.4zM563.354 0h-102.4a102.4 102.4 0 0 0-102.4 102.4v102.4a102.4 102.4 0 0 0 102.4 102.4h102.4a102.4 102.4 0 0 0 102.4-102.4V102.4A102.4 102.4 0 0 0 563.354 0zm-460.8 204.8h102.4V102.4h-102.4v102.4zM204.954 0h-102.4A102.4 102.4 0 0 0 .154 102.4v102.4a102.4 102.4 0 0 0 102.4 102.4h102.4a102.4 102.4 0 0 0 102.4-102.4V102.4A102.4 102.4 0 0 0 204.954 0z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-html-text"><path d="m137.6 512 204.8-204.8c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L70.4 489.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4l227.2 227.2c12.8 12.8 32 12.8 44.8 0 12.8-12.8 12.8-32 0-44.8L137.6 512zm464-339.2c-16-3.2-35.2 6.4-38.4 22.4L396.8 812.8c-3.2 16 6.4 35.2 22.4 38.4 16 3.2 35.2-6.4 38.4-22.4L624 211.2c6.4-16-3.2-35.2-22.4-38.4zm352 316.8L726.4 262.4c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8L886.4 512 681.6 716.8c-12.8 12.8-12.8 32 0 44.8 12.8 12.8 32 12.8 44.8 0l227.2-227.2c6.4-6.4 9.6-16 9.6-22.4 0-9.6-3.2-16-9.6-22.4z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-node-tree"><path d="M332.48 500.864a25.6 25.6 0 1 0 0-51.2H192.384v-184.96a115.2 115.2 0 0 0 89.6-112.128c0-63.488-51.712-115.2-115.2-115.2s-115.2 51.712-115.2 115.2a115.2 115.2 0 0 0 89.6 112.128v696.192a25.6 25.6 0 1 0 51.2 0v-141.12c2.304.192 4.48.512 6.912.512H332.48a25.6 25.6 0 1 0 0-51.2H199.296c-3.456 0-5.504-.448-6.08-.256a29.184 29.184 0 0 1-.896-8.576V500.8h140.16zM102.784 152.64c0-35.264 28.736-64 64-64s64 28.736 64 64-28.736 64-64 64-64-28.736-64-64zm818.432 207.424h-486.4c-28.224 0-51.2 22.976-51.2 51.2v128c0 28.224 22.976 51.2 51.2 51.2h486.4c28.224 0 51.2-22.976 51.2-51.2v-128c0-28.224-22.976-51.2-51.2-51.2zm-486.336 179.2v-128h486.4v128h-486.4zm486.336 140.352h-486.4c-28.224 0-51.2 22.976-51.2 51.2v128c0 28.224 22.976 51.2 51.2 51.2h486.4c28.224 0 51.2-22.976 51.2-51.2v-128c0-28.224-22.976-51.2-51.2-51.2zm-486.336 179.2v-128h486.4v128h-486.4z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-number-field"><path d="M960 1024H64a64 64 0 0 1-64-64V64A64 64 0 0 1 64 0h896a64 64 0 0 1 64 64v896a64 64 0 0 1-64 64zm0-896a64 64 0 0 0-64-64H128a64 64 0 0 0-64 64v768a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V128zM832 768H704a64 64 0 0 1 0-128h64v-64h-64a64 64 0 0 1 0-128h64v-64h-64a64 64 0 0 1 0-128h128a64 64 0 0 1 64 64v384a64 64 0 0 1-64 64zM512 640a64 64 0 0 1 0 128H384a64 64 0 0 1-64-64V512a64 64 0 0 1 64-64h64v-64h-64a64 64 0 0 1 0-128h128a64 64 0 0 1 64 64v192a64 64 0 0 1-64 64h-64v64h64zM192 768a64 64 0 0 1-64-64V320a64 64 0 0 1 128 0v384a64 64 0 0 1-64 64z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-picture-upload-field"><path d="M896 1024H128C57.312 1024 0 966.688 0 896V128C0 57.312 57.312 0 128 0h768c70.688 0 128 57.312 128 128v768c0 70.688-57.312 128-128 128zm0-64c35.328 0 64-28.672 64-64V639.968l-192-192L494.816 721.12 730.624 960H896zM64 896c0 35.328 28.672 64 64 64h512.032L318.24 638.208 64 865.952V896zm896-768c0-35.328-28.672-64-64-64H128c-35.328 0-64 28.672-64 64v650.752L320 544l129.856 131.552L768 352l192 196.096V128zM256 384c-70.688 0-128-57.312-128-128s57.312-128 128-128 128 57.312 128 128-57.312 128-128 128zm0-192c-35.328 0-64 28.672-64 64s28.672 64 64 64 64-28.672 64-64-28.672-64-64-64z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-radio-field"><path d="M512 65.983C266.08 65.983 65.983 266.08 65.983 512c0 245.952 200.065 446.017 446.017 446.017S958.017 757.952 958.017 512c0-245.92-200.065-446.017-446.017-446.017zm0 828.034c-210.656 0-382.017-171.392-382.017-382.017 0-210.656 171.36-382.017 382.017-382.017 210.625 0 382.017 171.36 382.017 382.017 0 210.625-171.392 382.017-382.017 382.017zM512 352C423.776 352 352 423.776 352 512s71.774 160 160 160 160-71.774 160-160-71.776-160-160-160z" /></symbol><symbol class="icon" viewBox="0 0 1069 1024"  id="icon-rate-field"><path d="m633.73 378.02 9.498 18.688 20.78 2.798 206.616 27.332a11.465 11.465 0 0 1 6.61 19.473L729.966 593.665l-14.893 14.893 3.8 20.683 37.847 204.89a11.465 11.465 0 0 1-16.481 12.296l-185.55-94.58-18.687-9.493-18.487 9.992-183.24 99.35a11.465 11.465 0 0 1-16.784-11.867l32.543-205.796 3.297-20.786-15.192-14.492-151.033-143.484a11.465 11.465 0 0 1 6.1-19.64L399 402.998l20.786-3.296 9.092-18.98 89.713-188.078a11.465 11.465 0 0 1 20.569-.263l94.568 185.635zM496.647 85.52 374.89 340.501l-279.126 44.26a34.395 34.395 0 0 0-18.303 58.908l204.873 194.663-44.169 279.115a34.395 34.395 0 0 0 50.366 35.616l248.4-134.679L788.776 946.66a34.395 34.395 0 0 0 49.437-36.894l-51.306-277.854 199.731-199.909a34.395 34.395 0 0 0-19.828-58.408l-280.118-37.032L558.33 84.713a34.395 34.395 0 0 0-61.682.802z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-redo"><path d="M412.081 346.3h443.415L640.168 133.871c-18.973-18.973-18.973-46.064 0-65.038s44.325-19.884 63.381-.83l291.385 284.591c18.973 18.973 18.973 44.159 0 63.132L703.549 700.649c-18.973 18.973-44.325 18.973-63.381-.083-18.973-18.973-18.973-43.91 0-62.883l215.328-208.534H412.081c-177.3 0-314.335 138.359-314.335 309.364v44.325c0 25.354-16.074 44.325-41.425 44.325s-41.425-18.973-41.425-44.325v-44.325c0-221.709 169.181-392.213 397.185-392.213z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-rich-editor-field"><path d="M313.36 448.094H632.63v31.927H313.36v-31.927ZM313.36 583.784h223.49v31.927H313.36v-31.927ZM313.36 719.474h127.709v31.927h-127.71v-31.927ZM889.412 554.809l-39.955-39.971-39.957-39.941c-7.358-7.358-19.285-7.358-26.642 0l-329.7 329.694a14.08 14.08 0 0 0-4.592 6.873L412.078 932.86a14.158 14.158 0 0 0 3.54 14.079l.99.763.77.982a14.174 14.174 0 0 0 14.062 3.555l121.395-36.495a14.04 14.04 0 0 0 6.938-4.677l329.639-329.63c7.35-7.343 7.35-19.284 0-26.627zM541.136 889.756l-95.198 28.622 28.623-95.235 255.02-255.02 66.6 66.599-255.045 255.034zM856.112 574.78l-46.611 46.611-66.59-66.598 46.605-46.597c3.677-3.68 9.641-3.68 13.319-.016l26.892 26.892 26.384 26.394c3.68 3.68 3.68 9.65.001 13.314z" /><path d="M671.874 224.898v-28.934c0-22.004-17.905-39.909-39.909-39.909H314.026c-22.004 0-39.909 17.905-39.909 39.91v28.933h-104.43v643.564c0 35.26 28.592 63.854 63.855 63.854h127.709v-47.89H249.506c-17.632 0-31.928-14.299-31.928-31.928v-579.71h56.54v10.976c0 22.004 17.904 39.909 39.908 39.909h317.938c22.004 0 39.91-17.905 39.91-39.91V272.79h56.538V437.45h47.89V224.898H671.875zm-47.89 50.884H322.007v-71.836h301.974v71.836z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-section"><path d="M141.074 906.496h741.852c89.581 0 134.583-44.562 134.583-132.846V250.331c0-88.283-45.002-132.845-134.583-132.845H141.074c-89.143.018-134.583 44.16-134.583 132.845V773.67c0 88.704 45.44 132.845 134.583 132.845zm1.28-68.992c-42.861 0-66.852-22.71-66.852-67.291V253.806c0-44.58 23.99-67.292 66.852-67.292h739.292c42.423 0 66.852 22.711 66.852 67.292v516.388c0 44.58-24.43 67.292-66.852 67.292z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-select-field"><path d="M374.784 649.515a32 32 0 0 1 3.072 41.685l-3.115 3.584L225.28 843.947a32 32 0 0 1-37.845 5.504l-3.968-2.56-85.334-64a32 32 0 0 1 34.432-53.76l3.968 2.56 63.147 47.36 129.835-129.622a32 32 0 0 1 45.269.043zm531.37 75.818a32 32 0 0 1 4.31 63.702l-4.31.298h-448a32 32 0 0 1-4.351-63.744l4.352-.256h448zm.513-256a32 32 0 0 1 4.352 63.702l-4.352.298h-448a32 32 0 0 1-4.352-63.701l4.352-.299h448zm-531.84-331.776a32 32 0 0 1 2.986 41.686l-3.114 3.584-149.846 149.205a32 32 0 0 1-37.888 5.419l-3.925-2.56-84.907-64a32 32 0 0 1 34.518-53.675l3.968 2.56 62.72 47.275L329.6 137.472a32 32 0 0 1 45.227.085zm531.328 75.819a32 32 0 0 1 4.309 63.701l-4.31.299H459.35a32 32 0 0 1-4.352-63.744l4.352-.256h446.806z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-slider-field"><path d="M951.453 476.844H523.672a131.836 131.836 0 0 0-254.18 0H72.547v70.312h196.945a131.836 131.836 0 0 0 254.18 0h427.781z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-slot-component"><path d="M512 102.4c-212.48 0-384 171.52-384 384s171.52 384 384 384 384-171.52 384-384-171.52-384-384-384zm25.6 716.8v-128c0-15.36-10.24-25.6-25.6-25.6s-25.6 10.24-25.6 25.6v128C322.56 806.4 192 675.84 179.2 512h128c15.36 0 25.6-10.24 25.6-25.6s-10.24-25.6-25.6-25.6h-128C192 296.96 322.56 166.4 486.4 156.16V281.6c0 15.36 10.24 25.6 25.6 25.6s25.6-10.24 25.6-25.6V156.16C701.44 168.96 832 299.52 844.8 460.8h-128c-15.36 0-25.6 10.24-25.6 25.6s10.24 25.6 25.6 25.6h128C832 675.84 701.44 806.4 537.6 819.2z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-slot-field"><path d="M493.969 244.87h36.285q18.031 0 18.031 18.03v217.267q0 18.031-18.031 18.031h-36.285q-18.032 0-18.032-18.031V262.901q0-18.031 18.032-18.031ZM323.45000000000005 525.802h36.286q18.031 0 18.031 18.031v217.266q0 18.031-18.031 18.031H323.45q-18.03 0-18.03-18.03V543.832q0-18.031 18.03-18.031ZM664.2639999999999 525.802h36.286q18.03 0 18.03 18.031v217.266q0 18.031-18.03 18.031h-36.286q-18.031 0-18.031-18.03V543.832q0-18.031 18.031-18.031Z" /><path d="M827.437 122.212H196.563a74.574 74.574 0 0 0-74.35 74.351v630.874a74.574 74.574 0 0 0 74.35 74.35h630.874a74.574 74.574 0 0 0 74.35-74.35V196.563a74.574 74.574 0 0 0-74.35-74.35zm52.09 705.225a52.09 52.09 0 0 1-52.09 52.09H196.563a52.09 52.09 0 0 1-52.09-52.09V196.563a52.09 52.09 0 0 1 52.09-52.09h630.874a52.09 52.09 0 0 1 52.09 52.09z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-static-text"><path d="M213.333 160c-4.821 0-9.472.64-13.824 1.792a32 32 0 0 1-16.554-61.824C192.683 97.408 202.88 96 213.333 96h33.195a32 32 0 0 1 0 64h-33.195zm133.931-32a32 32 0 0 1 32-32h66.347a32 32 0 1 1 0 64h-66.304a32 32 0 0 1-32-32zm199.125 0a32 32 0 0 1 32-32h66.347a32 32 0 0 1 0 64h-66.347a32 32 0 0 1-32-32zm199.083 0a32 32 0 0 1 32-32h33.195c10.453 0 20.65 1.365 30.378 3.968a32 32 0 1 1-16.554 61.867A53.419 53.419 0 0 0 810.667 160h-33.195a32 32 0 0 1-32-32zm-606.293 32.341a32 32 0 0 1 22.613 39.168A53.461 53.461 0 0 0 160 213.333v33.195a32 32 0 0 1-64 0v-33.195c0-10.453 1.365-20.65 3.968-30.378a32 32 0 0 1 39.168-22.614zm745.685 0a32 32 0 0 1 39.168 22.614c2.56 9.728 3.968 19.925 3.968 30.378v33.195a32 32 0 0 1-64 0v-33.195c0-4.821-.64-9.472-1.792-13.824a32 32 0 0 1 22.613-39.168zM128 347.221a32 32 0 0 1 32 32v66.39a32 32 0 1 1-64 0v-66.304a32 32 0 0 1 32-32zm768 0a32 32 0 0 1 32 32v66.39a32 32 0 1 1-64 0v-66.304a32 32 0 0 1 32-32zM128 546.432a32 32 0 0 1 32 32v66.347a32 32 0 0 1-64 0v-66.347a32 32 0 0 1 32-32zm768 0a32 32 0 0 1 32 32v66.347a32 32 0 0 1-64 0v-66.347a32 32 0 0 1 32-32zm0 199.083a32 32 0 0 1 32 32v33.152c0 10.453-1.365 20.65-3.968 30.378a32 32 0 1 1-61.867-16.554c1.195-4.352 1.835-8.96 1.835-13.824v-33.195a32 32 0 0 1 32-32zm-768 0a32 32 0 0 1 32 32v33.152c0 4.821.64 9.472 1.792 13.824a32 32 0 0 1-61.824 16.512A117.461 117.461 0 0 1 96 810.667v-33.195a32 32 0 0 1 32-32zm32.341 139.392a32 32 0 0 1 39.168-22.656 53.814 53.814 0 0 0 13.824 1.792h33.195a32 32 0 0 1 0 64h-33.195c-10.453 0-20.65-1.366-30.378-3.968a32 32 0 0 1-22.614-39.168zm703.318 0a32 32 0 0 1-22.614 39.168c-9.728 2.56-19.925 3.968-30.378 3.968h-33.195a32 32 0 0 1 0-64h33.195c4.821 0 9.472-.64 13.824-1.792a32 32 0 0 1 39.168 22.613zM347.307 896a32 32 0 0 1 32-32h66.346a32 32 0 1 1 0 64h-66.346a32 32 0 0 1-32-32zm199.125 0a32 32 0 0 1 32-32h66.347a32 32 0 0 1 0 64h-66.347a32 32 0 0 1-32-32zM341.333 352a32 32 0 0 0 0 64H480v266.667a32 32 0 0 0 64 0V416h138.667a32 32 0 0 0 0-64H341.333z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-sub-form"><path d="M512 106.667H112a5.333 5.333 0 0 0-5.333 5.333v800a5.333 5.333 0 0 0 5.333 5.333h800a5.333 5.333 0 0 0 5.333-5.333V112a5.333 5.333 0 0 0-5.333-5.333zm0 74.666h325.333a5.333 5.333 0 0 1 5.334 5.334v160a5.333 5.333 0 0 1-5.334 5.333H186.667a5.333 5.333 0 0 1-5.334-5.333v-160a5.333 5.333 0 0 1 5.334-5.334zM597.333 432v405.333a5.333 5.333 0 0 1-5.333 5.334H432a5.333 5.333 0 0 1-5.333-5.334V432a5.333 5.333 0 0 1 5.333-5.333h160a5.333 5.333 0 0 1 5.333 5.333zm-410.666-5.333h160A5.333 5.333 0 0 1 352 432v405.333a5.333 5.333 0 0 1-5.333 5.334h-160a5.333 5.333 0 0 1-5.334-5.334V432a5.333 5.333 0 0 1 5.334-5.333zM672 837.333V432a5.333 5.333 0 0 1 5.333-5.333h160a5.333 5.333 0 0 1 5.334 5.333v405.333a5.333 5.333 0 0 1-5.334 5.334h-160a5.333 5.333 0 0 1-5.333-5.334z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-switch-field"><path d="M692 792H332C182 792 62 672 62 522s120-270 270-270h360c150 0 270 120 270 270 0 147-120 270-270 270zM332 312c-117 0-210 93-210 210s93 210 210 210h360c117 0 210-93 210-210s-93-210-210-210H332z" /><path d="M191 522a150 150 0 1 0 300 0 150 150 0 1 0-300 0z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-tab"><path d="M908.8 1005.44H115.2A101.76 101.76 0 0 1 14.08 903.68V110.72A101.76 101.76 0 0 1 115.2 8.96h296.96a32.64 32.64 0 0 1 32 32V262.4a32 32 0 0 1-32 32 32 32 0 0 1-32-32v-192H115.2a37.76 37.76 0 0 0-37.12 37.76v795.52a37.76 37.76 0 0 0 37.12 37.76h793.6a37.76 37.76 0 0 0 37.12-37.76V267.52a32 32 0 0 1 32-32 32 32 0 0 1 32 32v636.16a101.76 101.76 0 0 1-101.12 101.76z" /><path d="M977.92 299.52a32.64 32.64 0 0 1-32-32v-87.04a37.12 37.12 0 0 0-37.12-37.76H421.12a32 32 0 0 1-32-32 32 32 0 0 1 32-32H908.8a101.76 101.76 0 0 1 101.12 101.76v87.04a32 32 0 0 1-32 32z" /><path d="M977.92 299.52H64a32 32 0 0 1-32-32 32 32 0 0 1 32-32h913.92a32 32 0 0 1 32 32 32 32 0 0 1-32 32z" /><path d="M699.52 299.52a32 32 0 0 1-32-32v-156.8a32 32 0 0 1 64 0v156.8a32 32 0 0 1-32 32z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-table"><path d="M925.586 0H101.369C69.885 0 42.24 28.924 42.24 62.328v902.8c0 33.403 27.645 58.872 59.129 58.872h824.217c31.484 0 56.057-25.469 56.057-58.873V62.328C981.643 28.924 957.198 0 925.586 0zM373.719 735.908V543.932h276.445v191.976zm276.445 42.235v203.494H373.719V778.143zm287.964-276.446h-244.45V298.203h244.45zm-287.964 0H373.719V298.203h276.445zm-319.96 0H85.754V298.203h244.45zm-244.45 42.235h244.45v191.976H85.754zm607.925 0h244.449v191.976h-244.45zM101.369 42.235h824.217c7.807 0 12.542 10.366 12.542 20.093v193.64H85.755V62.328c0-9.727 7.807-20.093 15.614-20.093zM85.755 964.999V778.143h244.449v203.494H101.369c-7.807 0-15.614-6.91-15.614-16.51zm839.83 16.638H693.68V778.143h244.449v186.856c0 9.727-4.607 16.638-12.542 16.638z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-text-field"><path d="M896 224H128c-35.2 0-64 28.8-64 64v448c0 35.2 28.8 64 64 64h768c35.2 0 64-28.8 64-64V288c0-35.2-28.8-64-64-64zm0 480c0 19.2-12.8 32-32 32H160c-19.2 0-32-12.8-32-32V320c0-19.2 12.8-32 32-32h704c19.2 0 32 12.8 32 32v384z" /><path d="M224 352c-19.2 0-32 12.8-32 32v256c0 16 12.8 32 32 32s32-12.8 32-32V384c0-16-12.8-32-32-32z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-textarea-field"><path d="M896.4 173.1H128.9c-35.2 0-49 13.8-49 49v575.6c0 35.2 13.8 49 49 49h767.5c35.2 0 49-13.8 49-49V222.1c0-35.2-13.8-49-49-49zm0 592.6c0 16-12.8 32-32 32H160.9c-19.2 0-32-12.8-32-32V254.1c0-16 12.8-32 32-32h703.5c19.2 0 32 12.8 32 32v511.6z" /><path d="M710.2 766.7h141.5c8.1 0 14.7-6.6 14.7-14.7V610.4c0-1.3-1.6-2-2.6-1.1L709.1 764.1c-1 1-.3 2.6 1.1 2.6zm-503-172.4h-13.5c-10 0-18.2-8.2-18.2-18.2V291.8c0-10.2 8.4-18.6 18.6-18.6h12.8c10.2 0 18.6 8.4 18.6 18.6v284.3c-.1 10-8.3 18.2-18.3 18.2z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-time-field"><path d="M512 39.385A472.615 472.615 0 1 0 984.615 512 472.615 472.615 0 0 0 512 39.385zm0 866.461A393.846 393.846 0 1 1 905.846 512 393.846 393.846 0 0 1 512 905.846zm75.855-373.72A77.154 77.154 0 0 0 590.769 512a78.454 78.454 0 0 0-39.384-67.86V196.923a39.385 39.385 0 0 0-78.77 0V444.14a78.336 78.336 0 0 0 59.55 143.715l70.144 70.144a39.385 39.385 0 0 0 55.69-55.69zM512 551.385A39.385 39.385 0 1 1 551.385 512 39.385 39.385 0 0 1 512 551.385zm315.077-78.77A39.385 39.385 0 1 0 866.462 512a39.385 39.385 0 0 0-39.385-39.385zm-630.154 0A39.385 39.385 0 1 0 236.308 512a39.385 39.385 0 0 0-39.385-39.385zm509.991 234.3a39.385 39.385 0 1 0 55.69 0 39.385 39.385 0 0 0-55.69 0zM317.007 317.006a39.385 39.385 0 1 0-55.73 0 39.385 39.385 0 0 0 55.809.04zM512 787.692a39.385 39.385 0 1 0 39.385 39.385A39.385 39.385 0 0 0 512 787.692zm-250.604-80.778a39.385 39.385 0 1 0 55.69 0 39.385 39.385 0 0 0-55.69-.039zm445.518-445.518a39.385 39.385 0 1 0 55.69 0 39.385 39.385 0 0 0-55.69-.04z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-time-range-field"><path d="M498.596 482.29H345.42v57.308h210.478V274.197h-57.301V482.29zm79.089 162.695h379.88v57.302h-379.88v-57.302zm0 128.78h379.88v57.307h-379.88v-57.307zm0 128.785h379.88v57.307h-379.88V902.55zm0 0" /><path d="M102.523 382.29a28.668 28.668 0 0 0 23.367 2.56l190.81-61.886c15.053-4.883 23.298-21.04 18.415-36.09-4.882-15.052-21.04-23.297-36.093-18.415l-123.346 40c15.994-26.117 35.17-50.538 57.37-72.745 73.768-73.767 171.847-114.388 276.169-114.388 104.32 0 202.395 40.622 276.161 114.388S899.77 407.56 899.77 511.882c0 26.428-2.616 52.45-7.71 77.78h58.303c4.465-25.499 6.709-51.47 6.709-77.78 0-60.45-11.846-119.102-35.205-174.336-22.56-53.335-54.85-101.227-95.969-142.35-41.122-41.122-89.017-73.408-142.348-95.968-55.233-23.361-113.89-35.207-174.334-35.207-60.45 0-119.107 11.846-174.337 35.208-53.335 22.56-101.23 54.846-142.35 95.969-23.98 23.98-44.933 50.278-62.727 78.6l-20.738-105.654c-3.043-15.528-18.105-25.642-33.632-22.6-15.528 3.048-25.643 18.105-22.6 33.637l36.103 183.932a28.666 28.666 0 0 0 13.588 19.178zm23.497 205.652H67.768c5.76 33.679 15.368 66.544 28.79 98.278 22.56 53.334 54.85 101.225 95.972 142.348 41.123 41.123 89.014 73.409 142.349 95.969 54.112 22.888 111.518 34.711 170.668 35.182v-57.324c-102.95-.941-199.595-41.446-272.5-114.349-55.501-55.502-92.237-124.77-107.027-200.104zm0 0" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-undo"><path d="M609.206 396.656H193.504l201.87-199.152c17.787-17.787 17.787-43.185 0-60.973s-41.555-18.641-59.42-.778L62.857 402.557c-17.787 17.787-17.787 41.399 0 59.186L336.03 728.858c17.787 17.787 41.555 17.787 59.42-.078 17.787-17.787 17.787-41.166 0-58.953L193.502 474.326h415.702c166.219 0 311.155 129.712 311.155 290.029v41.555c0 23.769 15.069 41.555 38.836 41.555s38.836-17.787 38.836-41.555v-41.555c0-207.852-175.073-367.7-388.828-367.7z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-vue-sfc"><path d="M454.138 11.176 54.066 174.092c-72.088 29.49-72.088 120.523 0 150.014l400.276 162.916c36.454 14.95 78.847 14.95 115.506 0l400.071-162.814c72.191-29.593 72.089-120.83-.307-150.116L569.746 11.278a155.339 155.339 0 0 0-115.608-.205zm469.19 237.872L532.37 408.585l-7.885 2.457a55.09 55.09 0 0 1-32.562-2.457L100.35 249.048l391.265-159.23a55.09 55.09 0 0 1 40.447 0l391.162 159.23z" fill="#1890FF" /><path d="M498.681 729.911c-20.275 0-40.652-3.788-59.391-11.673L53.76 561.26C20.48 547.847 0 519.89 0 488.558c0-31.436 20.582-59.391 53.862-72.703l36.556-15.053c21.401-8.806 47.103-1.024 57.24 17.408 10.24 18.227 1.025 40.14-20.479 48.947l-36.454 14.95c-3.072 1.229-4.71 3.584-4.71 6.45 0 3.073 1.536 5.12 4.71 6.452l385.326 156.875c14.336 5.939 30.924 5.939 45.362 0L906.74 495.009c3.072-1.229 4.915-3.584 4.915-6.451 0-3.072-1.536-5.222-4.607-6.451l-44.851-18.227c-21.401-8.806-30.412-30.72-20.377-48.947 10.342-18.329 35.84-26.214 57.24-17.407l44.851 18.431c33.177 13.517 53.76 41.267 53.76 72.703 0 31.334-20.48 59.391-53.76 72.703L558.482 718.238a161.585 161.585 0 0 1-59.801 11.673z" fill="#5DE1C8" /><path d="M498.681 966.247c-20.275 0-40.652-3.89-59.391-11.673L53.76 797.597C20.48 784.08 0 756.227 0 724.997c0-31.437 20.582-59.494 53.862-72.806l36.556-14.95c21.401-8.807 47.103-1.024 57.24 17.407 10.24 18.227 1.025 40.14-20.479 48.947l-36.454 14.95c-3.072 1.126-4.71 3.584-4.71 6.451 0 3.072 1.536 5.12 4.71 6.349l385.326 156.977c14.336 5.939 30.924 5.939 45.362 0L906.74 731.14c3.072-1.126 4.915-3.584 4.915-6.349 0-3.072-1.536-5.324-4.607-6.45l-44.851-18.33c-21.401-8.806-30.412-30.72-20.377-48.947 10.342-18.431 35.84-26.214 57.24-17.407l44.851 18.329c33.177 13.517 53.76 41.369 53.76 72.703 0 31.436-20.48 59.494-53.76 72.805l-385.428 157.08a161.585 161.585 0 0 1-59.801 11.673z" fill="#FF7272" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-custom-search"><path d="M863.3 641.94A416.1 416.1 0 0 0 96.7 318.06a416.1 416.1 0 0 0 766.6 323.88zM480 832a352 352 0 1 1 248.9-103.1A349.69 349.69 0 0 1 480 832z" /><path d="m950.63 841.37-96-96a32 32 0 0 0-45.25 45.25l96 96a13.25 13.25 0 1 1-18.75 18.75l-96-96a32 32 0 0 0-45.25 45.25l96 96a77.25 77.25 0 1 0 109.25-109.25z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-el-arrow-down"><path d="M512 714.667c-8.533 0-17.067-2.134-23.467-8.534L147.2 364.8c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l320 317.867 317.867-320c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L533.333 704c-4.266 8.533-12.8 10.667-21.333 10.667z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-el-back"><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" /><path fill="currentColor" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" /></symbol><symbol viewBox="0 0 1024 1024"  id="icon-el-check"><path fill="currentColor" d="M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-el-clone"><path d="M774.144 839.68c-.683 36.864-13.483 67.755-38.4 92.672s-55.808 37.717-92.672 38.4H184.32c-36.864-.683-67.755-13.483-92.672-38.4s-37.717-55.808-38.4-92.672V380.928c.683-36.864 13.483-67.755 38.4-92.672s55.808-37.717 92.672-38.4v65.536c-18.432.683-33.792 7.168-46.08 19.456s-18.773 27.648-19.456 46.08V839.68c.683 18.432 7.168 33.792 19.456 46.08s27.648 18.773 46.08 19.456h458.752c18.432-.683 33.792-7.168 46.08-19.456s18.773-27.648 19.456-46.08h65.536zM380.928 118.784c-18.432.683-33.792 7.168-46.08 19.456s-18.773 27.648-19.456 46.08v458.752c.683 18.432 7.168 33.792 19.456 46.08s27.648 18.773 46.08 19.456H839.68c18.432-.683 33.792-7.168 46.08-19.456s18.773-27.648 19.456-46.08V184.32c-.683-18.432-7.168-33.792-19.456-46.08s-27.648-18.773-46.08-19.456H380.928zm0-65.536H839.68c36.864.683 67.755 13.483 92.672 38.4s37.717 55.808 38.4 92.672v458.752c-.683 36.864-13.483 67.755-38.4 92.672s-55.808 37.717-92.672 38.4H380.928c-36.864-.683-67.755-13.483-92.672-38.4s-37.717-55.808-38.4-92.672V184.32c.683-36.864 13.483-67.755 38.4-92.672s55.808-37.717 92.672-38.4z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-el-delete"><path fill="currentColor" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-el-download"><path d="M896 672c-17.067 0-32 14.933-32 32v128c0 6.4-4.267 10.667-10.667 10.667H170.667c-6.4 0-10.667-4.267-10.667-10.667V704c0-17.067-14.933-32-32-32s-32 14.933-32 32v128c0 40.533 34.133 74.667 74.667 74.667h682.666C893.867 906.667 928 872.533 928 832V704c0-17.067-14.933-32-32-32z" /><path d="M488.533 727.467c6.4 6.4 14.934 8.533 23.467 8.533s17.067-2.133 23.467-8.533L748.8 514.133c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L546.133 627.2V170.667c0-17.067-14.933-32-32-32S480 153.6 480 170.667V627.2L322.133 469.333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l211.2 213.334z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-el-drag-move"><path d="M909.3 506.3 781.7 405.6c-4.7-3.7-11.7-.4-11.7 5.7V476H548V254h64.8c6 0 9.4-7 5.7-11.7L517.7 114.7c-2.9-3.7-8.5-3.7-11.3 0L405.6 242.3c-3.7 4.7-.4 11.7 5.7 11.7H476v222H254v-64.8c0-6-7-9.4-11.7-5.7L114.7 506.3c-3.7 2.9-3.7 8.5 0 11.3l127.5 100.8c4.7 3.7 11.7.4 11.7-5.7V548h222v222h-64.8c-6 0-9.4 7-5.7 11.7l100.8 127.5c2.9 3.7 8.5 3.7 11.3 0l100.8-127.5c3.7-4.7.4-11.7-5.7-11.7H548V548h222v64.8c0 6 7 9.4 11.7 5.7l127.5-100.8c3.7-2.9 3.7-8.5.1-11.4z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-el-form-template"><path d="M298.667 981.333A85.333 85.333 0 0 1 213.333 896V128a85.333 85.333 0 0 1 85.334-85.333h426.666A85.333 85.333 0 0 1 810.667 128v768a85.333 85.333 0 0 1-85.334 85.333zm0-832v725.334A21.333 21.333 0 0 0 320 896h384a21.333 21.333 0 0 0 21.333-21.333V149.333A21.333 21.333 0 0 0 704 128H320a21.333 21.333 0 0 0-21.333 21.333zm640 618.667V256a42.667 42.667 0 0 1 42.666-42.667A42.667 42.667 0 0 1 1024 256v512a42.667 42.667 0 0 1-42.667 42.667A42.667 42.667 0 0 1 938.667 768zM0 768V256a42.667 42.667 0 0 1 42.667-42.667A42.667 42.667 0 0 1 85.333 256v512a42.667 42.667 0 0 1-42.666 42.667A42.667 42.667 0 0 1 0 768z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-el-hide"><path d="M956.8 496c-41.6-70.4-99.2-147.2-176-204.8l105.6-105.6c12.8-12.8 12.8-32 0-44.8s-32-12.8-44.8 0L726.4 256C665.6 214.4 592 192 512 192c-214.4 0-358.4 166.4-444.8 304-6.4 9.6-6.4 22.4 0 32 41.6 70.4 102.4 147.2 176 204.8L134.4 841.6c-12.8 12.8-12.8 32 0 44.8 9.6 6.4 16 9.6 25.6 9.6s16-3.2 22.4-9.6l115.2-115.2C358.4 809.6 432 832 512 832c185.6 0 374.4-128 444.8-307.2 3.2-9.6 3.2-19.2 0-28.8zm-822.4 16C211.2 390.4 336 256 512 256c60.8 0 118.4 16 166.4 44.8l-80 80C576 361.6 544 352 512 352c-89.6 0-160 70.4-160 160 0 32 9.6 64 25.6 89.6L288 691.2C224 640 172.8 572.8 134.4 512zm473.6 0c0 54.4-41.6 96-96 96-16 0-28.8-3.2-41.6-9.6l128-128c6.4 12.8 9.6 25.6 9.6 41.6zm-192 0c0-54.4 41.6-96 96-96 16 0 28.8 3.2 41.6 9.6l-128 128c-6.4-12.8-9.6-25.6-9.6-41.6zm96 256c-60.8 0-118.4-16-166.4-44.8l80-80C448 662.4 480 672 512 672c89.6 0 160-70.4 160-160 0-32-9.6-64-25.6-89.6l89.6-89.6C803.2 384 854.4 451.2 892.8 512 825.6 659.2 665.6 768 512 768z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-el-info"><path d="M512.001 928.997c230.524 0 418.076-187.552 418.075-418.077 0-230.527-187.552-418.077-418.075-418.077S93.924 280.393 93.924 510.92c0 230.525 187.552 418.077 418.077 418.077zM512 301.88c28.86 0 52.26 23.399 52.26 52.263 0 28.858-23.399 52.257-52.26 52.257s-52.26-23.399-52.26-52.257c0-28.863 23.399-52.263 52.26-52.263zm-52.26 209.042c0-28.86 23.399-52.26 52.26-52.26s52.26 23.399 52.26 52.26v156.775c0 28.86-23.399 52.26-52.26 52.26s-52.26-23.399-52.26-52.26V510.922z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-el-insert-column"><path d="M653.184 713.6c12.864-12.864 33.6-12.864 46.528 0 6.4 6.4 3.776 14.72 3.776 23.232a32.675 32.675 0 0 1-9.6 23.104L569.92 886.4c-.128.128-.32.192-.512.32-2.88 2.88-9.536 5.184-13.312 6.784-3.456 1.344-.64 1.856-4.096 2.112-.768 0-1.344.384-2.048.384-.512 0-.896-.256-1.344-.256-3.84-.192-5.76-.896-9.344-2.24-3.264-1.344-6.016-3.52-8.64-5.76-.64-.512-1.472-.768-2.048-1.344L391.232 760c-12.864-12.736-6.976-33.6 5.888-46.4 12.8-12.864 33.6-12.864 46.464 0l105.472 100.352L653.184 713.6zM384 64v576h320V64H384zM128 704v256H64V640h256v320h-62.976L256 704H128m704 0v256h-64V640h256v320h-62.976L960 704H832" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-el-insert-row"><path d="M310.336 653.184c12.864 12.864 12.864 33.6 0 46.528-6.4 6.4-14.72 3.776-23.168 3.776s-16.832-3.264-23.168-9.6L137.6 569.92c-.128-.128-.192-.32-.256-.512-2.88-2.816-5.248-9.536-6.848-13.312-1.344-3.392-1.856-.576-2.112-4.096 0-.768-.384-1.344-.384-2.048 0-.512.256-.896.256-1.344.192-3.84.896-5.76 2.24-9.344 1.344-3.264 3.52-6.016 5.76-8.64.512-.704.768-1.536 1.344-2.112l126.336-137.344c12.8-12.864 33.6-6.976 46.4 5.888 12.864 12.8 12.864 33.6 0 46.464L210.048 548.992l100.288 104.192zM960 384H384v320h576V384zM320 128H64V64h320v256H64v-62.976L320 256V128m0 704H64v-64h320v256H64v-62.976L320 960V832" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-el-menu"><path d="M844.8 883.2h-256c-19.2 0-38.4-19.2-38.4-38.4v-256c0-19.2 19.2-38.4 38.4-38.4h256c19.2 0 38.4 19.2 38.4 38.4v256c0 19.2-19.2 38.4-38.4 38.4zm0-403.2h-256c-19.2 0-38.4-19.2-38.4-38.4v-256c0-19.2 19.2-38.4 38.4-38.4h256c19.2 0 38.4 19.2 38.4 38.4v256c0 19.2-19.2 38.4-38.4 38.4zM435.2 883.2h-256c-19.2 0-38.4-19.2-38.4-38.4v-256c0-19.2 19.2-38.4 38.4-38.4h256c19.2 0 38.4 19.2 38.4 38.4v256c6.4 19.2-12.8 38.4-38.4 38.4zm0-403.2h-256c-19.2 0-38.4-19.2-38.4-38.4v-256c0-19.2 19.2-38.4 38.4-38.4h256c19.2 0 38.4 19.2 38.4 38.4v256c6.4 19.2-12.8 38.4-38.4 38.4z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-el-move-down"><path d="M898.133 512c-12.8-12.8-32-12.8-44.8-2.133L544 800V149.333c0-17.066-14.933-32-32-32s-32 14.934-32 32V800L170.667 509.867c-12.8-12.8-34.134-10.667-44.8 2.133-12.8 12.8-10.667 34.133 2.133 44.8l362.667 341.333c2.133 2.134 6.4 4.267 8.533 6.4 4.267 2.134 6.4 2.134 10.667 2.134s8.533 0 10.666-2.134c4.267-2.133 6.4-4.266 8.534-6.4L891.733 556.8c17.067-12.8 19.2-32 6.4-44.8z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-el-move-up"><path d="M896 467.2 533.333 125.867c-2.133-2.134-6.4-4.267-8.533-6.4-4.267-2.134-6.4-2.134-10.667-2.134s-8.533 0-10.666 2.134c-4.267 2.133-6.4 4.266-8.534 6.4L132.267 467.2c-12.8 12.8-12.8 32-2.134 44.8 12.8 12.8 32 12.8 44.8 2.133L484.267 224v650.667c0 17.066 14.933 32 32 32s32-14.934 32-32V224l305.066 290.133c6.4 6.4 14.934 8.534 21.334 8.534 8.533 0 17.066-4.267 23.466-10.667 12.8-12.8 10.667-32-2.133-44.8z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-el-plus"><path d="M554.667 213.333h-85.334v256h-256v85.334h256v256h85.334v-256h256v-85.334h-256z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-el-set-up"><path d="M217.088 151.552c-18.432.683-33.792 7.168-46.08 19.456s-18.773 27.648-19.456 46.08v589.824c.683 18.432 7.168 33.792 19.456 46.08s27.648 18.773 46.08 19.456h589.824c18.432-.683 33.792-7.168 46.08-19.456s18.773-27.648 19.456-46.08V217.088c-.683-18.432-7.168-33.792-19.456-46.08s-27.648-18.773-46.08-19.456H217.088zm0-65.536h589.824c36.864.683 67.755 13.483 92.672 38.4s37.717 55.808 38.4 92.672v589.824c-.683 36.864-13.483 67.755-38.4 92.672s-55.808 37.717-92.672 38.4H217.088c-36.864-.683-67.755-13.483-92.672-38.4s-37.717-55.808-38.4-92.672V217.088c.683-36.864 13.483-67.755 38.4-92.672s55.808-37.717 92.672-38.4zm163.84 327.68c18.432-.683 33.792-7.168 46.08-19.456s18.432-27.648 18.432-46.08-6.144-33.792-18.432-46.08-27.648-18.432-46.08-18.432-33.792 6.144-46.08 18.432-18.432 27.648-18.432 46.08 6.144 33.792 18.432 46.08 27.648 18.773 46.08 19.456zm0 65.536c-36.864-.683-67.755-13.483-92.672-38.4s-37.717-55.808-38.4-92.672c.683-36.864 13.483-67.755 38.4-92.672s55.808-37.717 92.672-38.4c36.864.683 67.755 13.483 92.672 38.4s37.717 55.808 38.4 92.672c-.683 36.864-13.483 67.755-38.4 92.672s-55.808 37.717-92.672 38.4zm98.304-163.84h262.144c21.845 0 32.768 10.923 32.768 32.768s-10.923 32.768-32.768 32.768H479.232c-21.845 0-32.768-10.923-32.768-32.768s10.923-32.768 32.768-32.768zm163.84 425.984c18.432-.683 33.792-7.168 46.08-19.456s18.432-27.648 18.432-46.08-6.144-33.792-18.432-46.08-27.648-18.432-46.08-18.432-33.792 6.144-46.08 18.432-18.432 27.648-18.432 46.08 6.144 33.792 18.432 46.08 27.648 18.773 46.08 19.456zm0 65.536c-36.864-.683-67.755-13.483-92.672-38.4s-37.717-55.808-38.4-92.672c.683-36.864 13.483-67.755 38.4-92.672s55.808-37.717 92.672-38.4c36.864.683 67.755 13.483 92.672 38.4s37.717 55.808 38.4 92.672c-.683 36.864-13.483 67.755-38.4 92.672s-55.808 37.717-92.672 38.4zm-360.448-163.84h262.144c21.845 0 32.768 10.923 32.768 32.768s-10.923 32.768-32.768 32.768H282.624c-21.845 0-32.768-10.923-32.768-32.768s10.923-32.768 32.768-32.768z" /></symbol><symbol class="icon" viewBox="0 0 1024 1024"  id="icon-el-view"><path fill="currentColor" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z" /></symbol><symbol viewBox="0 0 1024 1024"  id="icon-el-zoom-in"><path fill="currentColor" d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704zm-32-384v-96a32 32 0 0 1 64 0v96h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64h96z" /></symbol>', n.insertBefore(e, n.lastChild);
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", t) : t();
}
function registerCPEditor(t, n, e, i) {
  t.component(e, i);
}
function registerEPEditor(t, n, e, i) {
  t.component(e, i);
}
function _isSlot(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !isVNode(t);
}
const createInputTextEditor = function(t, n) {
  return {
    props: {
      optionModel: Object
    },
    render(e) {
      return createVNode(resolveComponent("el-form-item"), {
        label: translate(n)
      }, {
        default: () => [createVNode(resolveComponent("el-input"), {
          type: "text",
          modelValue: this.optionModel[t],
          "onUpdate:modelValue": (i) => this.optionModel[t] = i
        }, null)]
      });
    }
  };
}, createBooleanEditor = function(t, n) {
  return {
    props: {
      optionModel: Object
    },
    render(e) {
      return createVNode(resolveComponent("el-form-item"), {
        label: translate(n)
      }, {
        default: () => [createVNode(resolveComponent("el-switch"), {
          modelValue: this.optionModel[t],
          "onUpdate:modelValue": (i) => this.optionModel[t] = i
        }, null)]
      });
    }
  };
}, createRadioButtonGroupEditor = function(t, n, e) {
  return {
    props: {
      optionModel: Object
    },
    render(i) {
      let o;
      return createVNode(resolveComponent("el-form-item"), {
        label: translate(n)
      }, {
        default: () => [createVNode(resolveComponent("el-radio-group"), {
          modelValue: this.optionModel[t],
          "onUpdate:modelValue": (h) => this.optionModel[t] = h
        }, _isSlot(o = e.optionItems.map((h) => createVNode(resolveComponent("el-radio-button"), {
          label: h.value
        }, {
          default: () => [h.label]
        }))) ? o : {
          default: () => [o]
        })]
      });
    }
  };
}, createSelectEditor = function(t, n, e) {
  return {
    props: {
      optionModel: Object
    },
    render(i) {
      let o;
      return createVNode(resolveComponent("el-form-item"), {
        label: translate(n)
      }, {
        default: () => [createVNode(resolveComponent("el-select"), {
          modelValue: this.optionModel[t],
          "onUpdate:modelValue": (h) => this.optionModel[t] = h
        }, _isSlot(o = e.optionItems.map((h) => createVNode(resolveComponent("el-option"), {
          label: h.label,
          value: h.value
        }, null))) ? o : {
          default: () => [o]
        })]
      });
    }
  };
}, createEventHandlerEditor = function(t, n) {
  return {
    props: {
      optionModel: Object
    },
    mixins: [emitter],
    methods: {
      editEventHandler() {
        this.dispatch("SettingPanel", "editEventHandler", [t, [...n]]);
      }
    },
    render(e) {
      let i;
      return createVNode(resolveComponent("el-form-item"), {
        label: t,
        "label-width": "150px"
      }, {
        default: () => [createVNode(resolveComponent("el-button"), {
          type: "info",
          icon: "el-icon-edit",
          plain: !0,
          round: !0,
          onClick: this.editEventHandler
        }, _isSlot(i = translate("designer.setting.addEventHandler")) ? i : {
          default: () => [i]
        })]
      });
    }
  };
}, containerMixin = {
  inject: ["getFormConfig", "getGlobalDsv"],
  computed: {
    formConfig() {
      return this.getFormConfig();
    }
  },
  methods: {
    appendTableRow(t) {
      this.designer.appendTableRow(t);
    },
    appendTableCol(t) {
      this.designer.appendTableCol(t);
    },
    onContainerDragAdd(t, n) {
      const e = t.newIndex;
      n[e] && this.designer.setSelected(n[e]), this.designer.emitHistoryChange();
    },
    onContainerDragUpdate() {
      this.designer.emitHistoryChange();
    },
    checkContainerMove(t) {
      return this.designer.checkWidgetMove(t);
    },
    selectWidget(t) {
      this.designer.setSelected(t);
    },
    selectParentWidget() {
      this.parentWidget ? this.designer.setSelected(this.parentWidget) : this.designer.clearSelected();
    },
    moveUpWidget() {
      this.designer.moveUpWidget(this.parentList, this.indexOfParentList), this.designer.emitHistoryChange();
    },
    moveDownWidget() {
      this.designer.moveDownWidget(this.parentList, this.indexOfParentList), this.designer.emitHistoryChange();
    },
    cloneContainer(t) {
      if (this.parentList) {
        let n = this.designer.cloneContainer(t);
        this.parentList.splice(this.indexOfParentList + 1, 0, n), this.designer.setSelected(n), this.designer.emitHistoryChange();
      }
    },
    removeWidget() {
      if (this.parentList) {
        const t = this.designer.selectedWidgetName;
        let n = null;
        this.parentList.length === 1 ? this.parentWidget && (n = this.parentWidget) : this.parentList.length === 1 + this.indexOfParentList ? n = this.parentList[this.indexOfParentList - 1] : n = this.parentList[this.indexOfParentList + 1], this.$nextTick(() => {
          this.parentList.splice(this.indexOfParentList, 1), this.designer.setSelected(n), this.designer.formWidget.deleteWidgetRef(t), this.designer.emitHistoryChange();
        });
      }
    },
    setWidgetOption(t, n) {
      this.widget.options.hasOwnProperty(t) && (this.widget.options[t] = n);
    }
  }
}, _sfc_main$3 = {
  name: "container-wrapper",
  mixins: [i18n$1, containerMixin],
  components: {
    SvgIcon
  },
  props: {
    widget: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object
  },
  computed: {
    customClass() {
      return this.widget.options.customClass ? this.widget.options.customClass.join(" ") : "";
    }
  }
}, _hoisted_1$2 = {
  key: 0,
  class: "container-action"
}, _hoisted_2$1 = ["title"], _hoisted_3 = ["title"], _hoisted_4 = ["title"], _hoisted_5 = ["title"], _hoisted_6 = ["title"], _hoisted_7 = ["title"], _hoisted_8 = ["title"], _hoisted_9 = {
  key: 1,
  class: "drag-handler"
}, _hoisted_10 = ["title"], _hoisted_11 = { key: 0 };
function _sfc_render$3(t, n, e, i, o, h) {
  const f = resolveComponent("svg-icon");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["container-wrapper", [h.customClass]])
  }, [
    renderSlot(t.$slots, "default", {}, void 0, !0),
    e.designer.selectedId === e.widget.id && !e.widget.internal ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
      createElementVNode("i", {
        title: t.i18nt("designer.hint.selectParentWidget"),
        onClick: n[0] || (n[0] = withModifiers((v) => t.selectParentWidget(e.widget), ["stop"]))
      }, [
        createVNode(f, { "icon-class": "el-back" })
      ], 8, _hoisted_2$1),
      e.parentList && e.parentList.length > 1 ? (openBlock(), createElementBlock("i", {
        key: 0,
        title: t.i18nt("designer.hint.moveUpWidget"),
        onClick: n[1] || (n[1] = withModifiers((v) => t.moveUpWidget(), ["stop"]))
      }, [
        createVNode(f, { "icon-class": "el-move-up" })
      ], 8, _hoisted_3)) : createCommentVNode("", !0),
      e.parentList && e.parentList.length > 1 ? (openBlock(), createElementBlock("i", {
        key: 1,
        title: t.i18nt("designer.hint.moveDownWidget"),
        onClick: n[2] || (n[2] = withModifiers((v) => t.moveDownWidget(), ["stop"]))
      }, [
        createVNode(f, { "icon-class": "el-move-down" })
      ], 8, _hoisted_4)) : createCommentVNode("", !0),
      e.widget.type === "table" ? (openBlock(), createElementBlock("i", {
        key: 2,
        title: t.i18nt("designer.hint.insertRow"),
        onClick: n[3] || (n[3] = withModifiers((v) => t.appendTableRow(e.widget), ["stop"]))
      }, [
        createVNode(f, { "icon-class": "el-insert-row" })
      ], 8, _hoisted_5)) : createCommentVNode("", !0),
      e.widget.type === "table" ? (openBlock(), createElementBlock("i", {
        key: 3,
        title: t.i18nt("designer.hint.insertColumn"),
        onClick: n[4] || (n[4] = withModifiers((v) => t.appendTableCol(e.widget), ["stop"]))
      }, [
        createVNode(f, { "icon-class": "el-insert-column" })
      ], 8, _hoisted_6)) : createCommentVNode("", !0),
      e.widget.type === "grid" || e.widget.type === "table" ? (openBlock(), createElementBlock("i", {
        key: 4,
        title: t.i18nt("designer.hint.cloneWidget"),
        onClick: n[5] || (n[5] = withModifiers((v) => t.cloneContainer(e.widget), ["stop"]))
      }, [
        createVNode(f, { "icon-class": "el-clone" })
      ], 8, _hoisted_7)) : createCommentVNode("", !0),
      createElementVNode("i", {
        title: t.i18nt("designer.hint.remove"),
        onClick: n[6] || (n[6] = withModifiers((...v) => t.removeWidget && t.removeWidget(...v), ["stop"]))
      }, [
        createVNode(f, { "icon-class": "el-delete" })
      ], 8, _hoisted_8)
    ])) : createCommentVNode("", !0),
    e.designer.selectedId === e.widget.id && !e.widget.internal ? (openBlock(), createElementBlock("div", _hoisted_9, [
      createElementVNode("i", {
        title: t.i18nt("designer.hint.dragHandler")
      }, [
        createVNode(f, { "icon-class": "el-drag-move" })
      ], 8, _hoisted_10),
      createElementVNode("i", null, toDisplayString(t.i18n2t(`designer.widgetLabel.${e.widget.type}`, `extension.widgetLabel.${e.widget.type}`)), 1),
      e.widget.options.hidden === !0 ? (openBlock(), createElementBlock("i", _hoisted_11, [
        createVNode(f, { "icon-class": "el-hide" })
      ])) : createCommentVNode("", !0)
    ])) : createCommentVNode("", !0)
  ], 2);
}
const ContainerWrapper = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-9f2d32ad"]]), refMixinDesign = {
  methods: {
    initRefList() {
      this.refList !== null && this.widget.options.name && (this.refList[this.widget.options.name] = this);
    },
    getWidgetRef(t, n) {
      let e = this.refList[t];
      return !e && n && this.$message.error(this.i18nt("render.hint.refNotFound") + t), e;
    },
    /* 该方法用于组件重名检查！！ */
    registerToRefList(t) {
      this.refList !== null && this.widget.options.name && (t && delete this.refList[t], this.refList[this.widget.options.name] = this);
    }
  }
}, _sfc_main$2 = {
  name: "card-widget",
  componentName: "ContainerWidget",
  mixins: [i18n$1, containerMixin, refMixinDesign],
  inject: ["refList"],
  components: {
    ContainerWrapper,
    ...comps,
    ArrowDown: arrow_down_default,
    ArrowUp: arrow_up_default
  },
  props: {
    widget: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object
  },
  computed: {
    selected() {
      return this.widget.id === this.designer.selectedId;
    },
    customClass() {
      return this.widget.options.customClass || "";
    }
  },
  created() {
    this.initRefList();
  },
  methods: {
    /**
     * 检查接收哪些组件拖放，如不接受某些组件拖放，则根据组件类型判断后返回false
     * @param evt
     * @returns {boolean}
     */
    checkContainerMove(t) {
      return !0;
    },
    toggleCard() {
      this.widget.options.folded = !this.widget.options.folded;
    },
    /**
     * 设置折叠/打开状态
     * @param folded
     */
    setFolded(t) {
      this.widget.options.folded = !!t;
    }
  }
}, _hoisted_1$1 = { class: "clear-fix" }, _hoisted_2 = { class: "form-widget-list" };
function _sfc_render$2(t, n, e, i, o, h) {
  const f = resolveComponent("ArrowDown"), v = resolveComponent("el-icon"), b = resolveComponent("ArrowUp"), y = resolveComponent("draggable"), p = resolveComponent("el-card"), a = resolveComponent("container-wrapper");
  return openBlock(), createBlock(a, {
    designer: e.designer,
    widget: e.widget,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList
  }, {
    default: withCtx(() => [
      (openBlock(), createBlock(p, {
        key: e.widget.id,
        class: normalizeClass(["card-container", [h.selected ? "selected" : "", e.widget.options.folded ? "folded" : "", h.customClass]]),
        onClick: n[2] || (n[2] = withModifiers((r) => t.selectWidget(e.widget), ["stop"])),
        shadow: e.widget.options.shadow,
        style: normalizeStyle({ width: e.widget.options.cardWidth + "!important" || "" })
      }, {
        header: withCtx(() => [
          createElementVNode("div", _hoisted_1$1, [
            createElementVNode("span", null, toDisplayString(e.widget.options.label), 1),
            e.widget.options.showFold ? (openBlock(), createElementBlock("i", {
              key: 0,
              class: "float-right",
              onClick: n[0] || (n[0] = (...r) => h.toggleCard && h.toggleCard(...r))
            }, [
              e.widget.options.folded ? (openBlock(), createBlock(v, { key: 1 }, {
                default: withCtx(() => [
                  createVNode(b)
                ]),
                _: 1
              })) : (openBlock(), createBlock(v, { key: 0 }, {
                default: withCtx(() => [
                  createVNode(f)
                ]),
                _: 1
              }))
            ])) : createCommentVNode("", !0)
          ])
        ]),
        default: withCtx(() => [
          createVNode(y, mergeProps({
            list: e.widget.widgetList,
            "item-key": "id"
          }, { group: "dragGroup", ghostClass: "ghost", animation: 200 }, {
            handle: ".drag-handler",
            tag: "transition-group",
            "component-data": { name: "fade" },
            onAdd: n[1] || (n[1] = (r) => t.onContainerDragAdd(r, e.widget.widgetList)),
            onUpdate: t.onContainerDragUpdate,
            move: h.checkContainerMove
          }), {
            item: withCtx(({ element: r, index: l }) => [
              createElementVNode("div", _hoisted_2, [
                r.category === "container" ? (openBlock(), createBlock(resolveDynamicComponent(r.type + "-widget"), {
                  widget: r,
                  designer: e.designer,
                  key: r.id,
                  "parent-list": e.widget.widgetList,
                  "index-of-parent-list": l,
                  "parent-widget": e.widget
                }, null, 8, ["widget", "designer", "parent-list", "index-of-parent-list", "parent-widget"])) : (openBlock(), createBlock(resolveDynamicComponent(r.type + "-widget"), {
                  field: r,
                  designer: e.designer,
                  key: r.id,
                  "parent-list": e.widget.widgetList,
                  "index-of-parent-list": l,
                  "parent-widget": e.widget,
                  "design-state": !0
                }, null, 8, ["field", "designer", "parent-list", "index-of-parent-list", "parent-widget"]))
              ])
            ]),
            _: 1
          }, 16, ["list", "onUpdate", "move"])
        ]),
        _: 1
      }, 8, ["shadow", "style", "class"]))
    ]),
    _: 1
  }, 8, ["designer", "widget", "parent-widget", "parent-list", "index-of-parent-list"]);
}
const CardWidget = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-0a712040"]]), _sfc_main$1 = {
  name: "card-item",
  componentName: "ContainerItem",
  mixins: [emitter, i18n$1, refMixin, containerItemMixin],
  components: {
    ContainerItemWrapper,
    ...comps,
    ArrowDown: arrow_down_default,
    ArrowUp: arrow_up_default
  },
  props: {
    widget: Object
  },
  inject: ["refList", "sfRefList", "globalModel"],
  computed: {
    customClass() {
      return this.widget.options.customClass || "";
    }
  },
  created() {
    this.initRefList();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {
    toggleCard() {
      this.widget.options.folded = !this.widget.options.folded;
    }
  }
}, _hoisted_1 = { class: "clear-fix" };
function _sfc_render$1(t, n, e, i, o, h) {
  const f = resolveComponent("ArrowDown"), v = resolveComponent("el-icon"), b = resolveComponent("ArrowUp"), y = resolveComponent("el-card"), p = resolveComponent("container-item-wrapper");
  return openBlock(), createBlock(p, { widget: e.widget }, {
    default: withCtx(() => [
      withDirectives((openBlock(), createBlock(y, {
        key: e.widget.id,
        class: normalizeClass(["card-container", [e.widget.options.folded ? "folded" : "", h.customClass]]),
        shadow: e.widget.options.shadow,
        style: normalizeStyle({ width: e.widget.options.cardWidth + "!important" || "" }),
        ref: e.widget.id
      }, {
        header: withCtx(() => [
          createElementVNode("div", _hoisted_1, [
            createElementVNode("span", null, toDisplayString(e.widget.options.label), 1),
            e.widget.options.showFold ? (openBlock(), createElementBlock("i", {
              key: 0,
              class: "float-right",
              onClick: n[0] || (n[0] = (...a) => h.toggleCard && h.toggleCard(...a))
            }, [
              e.widget.options.folded ? (openBlock(), createBlock(v, { key: 1 }, {
                default: withCtx(() => [
                  createVNode(b)
                ]),
                _: 1
              })) : (openBlock(), createBlock(v, { key: 0 }, {
                default: withCtx(() => [
                  createVNode(f)
                ]),
                _: 1
              }))
            ])) : createCommentVNode("", !0)
          ])
        ]),
        default: withCtx(() => [
          e.widget.widgetList && e.widget.widgetList.length > 0 ? (openBlock(!0), createElementBlock(Fragment, { key: 0 }, renderList(e.widget.widgetList, (a, r) => (openBlock(), createElementBlock(Fragment, null, [
            a.category === "container" ? (openBlock(), createBlock(resolveDynamicComponent(t.getComponentByContainer(a)), {
              widget: a,
              key: r,
              "parent-list": e.widget.widgetList,
              "index-of-parent-list": r,
              "parent-widget": e.widget
            }, createSlots({ _: 2 }, [
              renderList(Object.keys(t.$slots), (l) => ({
                name: l,
                fn: withCtx((g) => [
                  renderSlot(t.$slots, l, mergeProps({ ref_for: !0 }, g), void 0, !0)
                ])
              }))
            ]), 1032, ["widget", "parent-list", "index-of-parent-list", "parent-widget"])) : (openBlock(), createBlock(resolveDynamicComponent(a.type + "-widget"), {
              field: a,
              designer: null,
              key: r,
              "parent-list": e.widget.widgetList,
              "index-of-parent-list": r,
              "parent-widget": e.widget
            }, createSlots({ _: 2 }, [
              renderList(Object.keys(t.$slots), (l) => ({
                name: l,
                fn: withCtx((g) => [
                  renderSlot(t.$slots, l, mergeProps({ ref_for: !0 }, g), void 0, !0)
                ])
              }))
            ]), 1032, ["field", "parent-list", "index-of-parent-list", "parent-widget"]))
          ], 64))), 256)) : createCommentVNode("", !0)
        ]),
        _: 3
      }, 8, ["class", "shadow", "style"])), [
        [vShow, !e.widget.options.hidden]
      ])
    ]),
    _: 3
  }, 8, ["widget"]);
}
const CardItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-50807837"]]), _sfc_main = {
  name: "alert-widget",
  componentName: "FieldWidget",
  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n$1],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
    designState: {
      type: Boolean,
      default: !1
    },
    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */
      type: Number,
      default: -1
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */
      type: String,
      default: ""
    }
  },
  components: {
    StaticContentWrapper
  },
  created() {
    this.registerToRefList(), this.initEventHandler();
  },
  beforeUnmount() {
    this.unregisterFromRefList();
  },
  methods: {
    handleCloseCustomEvent() {
      this.field.options.onClose && new Function(this.field.options.onClose).call(this);
    }
  }
};
function _sfc_render(t, n, e, i, o, h) {
  const f = resolveComponent("el-alert"), v = resolveComponent("static-content-wrapper");
  return openBlock(), createBlock(v, {
    designer: e.designer,
    field: e.field,
    "design-state": e.designState,
    "parent-widget": e.parentWidget,
    "parent-list": e.parentList,
    "index-of-parent-list": e.indexOfParentList,
    "sub-form-row-index": e.subFormRowIndex,
    "sub-form-col-index": e.subFormColIndex,
    "sub-form-row-id": e.subFormRowId
  }, {
    default: withCtx(() => [
      createVNode(f, {
        ref: "fieldEditor",
        title: e.field.options.title,
        type: e.field.options.type,
        description: e.field.options.description,
        closable: e.field.options.closable,
        center: e.field.options.center,
        "close-text": e.field.options.closeText,
        "show-icon": e.field.options.showIcon,
        effect: e.field.options.effect,
        onClose: h.handleCloseCustomEvent
      }, null, 8, ["title", "type", "description", "closable", "center", "close-text", "show-icon", "effect", "onClose"])
    ]),
    _: 1
  }, 8, ["designer", "field", "design-state", "parent-widget", "parent-list", "index-of-parent-list", "sub-form-row-index", "sub-form-col-index", "sub-form-row-id"]);
}
const AlertWidget = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]), loadExtension = function(t) {
  t.component(CardWidget.name, CardWidget), t.component(CardItem.name, CardItem), registerCPEditor(
    t,
    "card-folded",
    "card-folded-editor",
    createBooleanEditor("folded", "extension.setting.cardFolded")
  ), registerCPEditor(
    t,
    "card-showFold",
    "card-showFold-editor",
    createBooleanEditor("showFold", "extension.setting.cardShowFold")
  ), registerCPEditor(
    t,
    "card-cardWidth",
    "card-cardWidth-editor",
    createInputTextEditor("cardWidth", "extension.setting.cardWidth")
  ), registerCPEditor(
    t,
    "card-shadow",
    "card-shadow-editor",
    createSelectEditor(
      "shadow",
      "extension.setting.cardShadow",
      { optionItems: [
        { label: "never", value: "never" },
        { label: "hover", value: "hover" },
        { label: "always", value: "always" }
      ] }
    )
  ), t.component(AlertWidget.name, AlertWidget), registerCPEditor(
    t,
    "alert-title",
    "alert-title-editor",
    createInputTextEditor("title", "extension.setting.alertTitle")
  );
  let e = [
    { label: "success", value: "success" },
    { label: "warning", value: "warning" },
    { label: "info", value: "info" },
    { label: "error", value: "error" }
  ];
  t.component(
    "alert-type-editor",
    createSelectEditor(
      "type",
      "extension.setting.alertType",
      { optionItems: e }
    )
  ), registerCPEditor(
    t,
    "alert-description",
    "alert-description-editor",
    createInputTextEditor("description", "extension.setting.description")
  ), registerCPEditor(
    t,
    "alert-closable",
    "alert-closable-editor",
    createBooleanEditor("closable", "extension.setting.closable")
  ), registerCPEditor(
    t,
    "alert-closeText",
    "alert-closeText-editor",
    createInputTextEditor("closeText", "extension.setting.closeText")
  ), registerCPEditor(
    t,
    "alert-center",
    "alert-center-editor",
    createBooleanEditor("center", "extension.setting.center")
  ), registerCPEditor(
    t,
    "alert-showIcon",
    "alert-showIcon-editor",
    createBooleanEditor("showIcon", "extension.setting.showIcon")
  ), registerCPEditor(
    t,
    "alert-effect",
    "alert-effect-editor",
    createRadioButtonGroupEditor(
      "effect",
      "extension.setting.effect",
      { optionItems: [
        { label: "light", value: "light" },
        { label: "dark", value: "dark" }
      ] }
    )
  ), registerEPEditor(
    t,
    "alert-onClose",
    "alert-onClose-editor",
    createEventHandlerEditor("onClose", [])
  );
};
VFormRender.install = function(t) {
  loadExtension(t), t.use(ContainerItems), registerIcon(t), t.component(VFormRender.name, VFormRender);
};
const components = [
  VFormRender
], install = (t) => {
  loadExtension(t), t.use(ContainerItems), registerIcon(t), components.forEach((n) => {
    t.component(n.name, n);
  }), window.axios = axios;
}, installRender = {
  install,
  VFormRender
};
export {
  installRender as default
};
