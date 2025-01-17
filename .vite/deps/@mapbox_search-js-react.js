import {
  require_react
} from "./chunk-2PA4WPI3.js";
import {
  require_subtag
} from "./chunk-Q3S3AKX4.js";
import {
  __commonJS,
  __toESM
} from "./chunk-ROME4SDB.js";

// node_modules/no-scroll/index.js
var require_no_scroll = __commonJS({
  "node_modules/no-scroll/index.js"(exports, module) {
    (function(root) {
      var isOn = false;
      var scrollbarSize;
      var scrollTop;
      function getScrollbarSize() {
        if (typeof scrollbarSize !== "undefined")
          return scrollbarSize;
        var doc = document.documentElement;
        var dummyScroller = document.createElement("div");
        dummyScroller.setAttribute("style", "width:99px;height:99px;position:absolute;top:-9999px;overflow:scroll;");
        doc.appendChild(dummyScroller);
        scrollbarSize = dummyScroller.offsetWidth - dummyScroller.clientWidth;
        doc.removeChild(dummyScroller);
        return scrollbarSize;
      }
      function hasScrollbar() {
        return document.documentElement.scrollHeight > window.innerHeight;
      }
      function on(options) {
        if (typeof document === "undefined" || isOn)
          return;
        var doc = document.documentElement;
        scrollTop = window.pageYOffset;
        if (hasScrollbar()) {
          doc.style.width = "calc(100% - " + getScrollbarSize() + "px)";
        } else {
          doc.style.width = "100%";
        }
        doc.style.position = "fixed";
        doc.style.top = -scrollTop + "px";
        doc.style.overflow = "hidden";
        isOn = true;
      }
      function off() {
        if (typeof document === "undefined" || !isOn)
          return;
        var doc = document.documentElement;
        doc.style.width = "";
        doc.style.position = "";
        doc.style.top = "";
        doc.style.overflow = "";
        window.scroll(0, scrollTop);
        isOn = false;
      }
      function toggle() {
        if (isOn) {
          off();
          return;
        }
        on();
      }
      var noScroll2 = {
        on,
        off,
        toggle
      };
      if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = noScroll2;
      } else {
        root.noScroll = noScroll2;
      }
    })(exports);
  }
});

// node_modules/@mapbox/sphericalmercator/sphericalmercator.js
var require_sphericalmercator = __commonJS({
  "node_modules/@mapbox/sphericalmercator/sphericalmercator.js"(exports, module) {
    var SphericalMercator2 = function() {
      var cache = {}, EPSLN = 1e-10, D2R = Math.PI / 180, R2D = 180 / Math.PI, A = 6378137, MAXEXTENT = 20037508342789244e-9;
      function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
      }
      function SphericalMercator3(options) {
        options = options || {};
        this.size = options.size || 256;
        this.expansion = options.antimeridian === true ? 2 : 1;
        if (!cache[this.size]) {
          var size2 = this.size;
          var c = cache[this.size] = {};
          c.Bc = [];
          c.Cc = [];
          c.zc = [];
          c.Ac = [];
          for (var d = 0; d < 30; d++) {
            c.Bc.push(size2 / 360);
            c.Cc.push(size2 / (2 * Math.PI));
            c.zc.push(size2 / 2);
            c.Ac.push(size2);
            size2 *= 2;
          }
        }
        this.Bc = cache[this.size].Bc;
        this.Cc = cache[this.size].Cc;
        this.zc = cache[this.size].zc;
        this.Ac = cache[this.size].Ac;
      }
      ;
      SphericalMercator3.prototype.px = function(ll, zoom) {
        if (isFloat(zoom)) {
          var size2 = this.size * Math.pow(2, zoom);
          var d = size2 / 2;
          var bc = size2 / 360;
          var cc = size2 / (2 * Math.PI);
          var ac = size2;
          var f = Math.min(Math.max(Math.sin(D2R * ll[1]), -0.9999), 0.9999);
          var x = d + ll[0] * bc;
          var y = d + 0.5 * Math.log((1 + f) / (1 - f)) * -cc;
          x > ac * this.expansion && (x = ac * this.expansion);
          y > ac && (y = ac);
          return [x, y];
        } else {
          var d = this.zc[zoom];
          var f = Math.min(Math.max(Math.sin(D2R * ll[1]), -0.9999), 0.9999);
          var x = Math.round(d + ll[0] * this.Bc[zoom]);
          var y = Math.round(d + 0.5 * Math.log((1 + f) / (1 - f)) * -this.Cc[zoom]);
          x > this.Ac[zoom] * this.expansion && (x = this.Ac[zoom] * this.expansion);
          y > this.Ac[zoom] && (y = this.Ac[zoom]);
          return [x, y];
        }
      };
      SphericalMercator3.prototype.ll = function(px, zoom) {
        if (isFloat(zoom)) {
          var size2 = this.size * Math.pow(2, zoom);
          var bc = size2 / 360;
          var cc = size2 / (2 * Math.PI);
          var zc = size2 / 2;
          var g = (px[1] - zc) / -cc;
          var lon = (px[0] - zc) / bc;
          var lat = R2D * (2 * Math.atan(Math.exp(g)) - 0.5 * Math.PI);
          return [lon, lat];
        } else {
          var g = (px[1] - this.zc[zoom]) / -this.Cc[zoom];
          var lon = (px[0] - this.zc[zoom]) / this.Bc[zoom];
          var lat = R2D * (2 * Math.atan(Math.exp(g)) - 0.5 * Math.PI);
          return [lon, lat];
        }
      };
      SphericalMercator3.prototype.bbox = function(x, y, zoom, tms_style, srs) {
        if (tms_style) {
          y = Math.pow(2, zoom) - 1 - y;
        }
        var ll = [x * this.size, (+y + 1) * this.size];
        var ur = [(+x + 1) * this.size, y * this.size];
        var bbox = this.ll(ll, zoom).concat(this.ll(ur, zoom));
        if (srs === "900913") {
          return this.convert(bbox, "900913");
        } else {
          return bbox;
        }
      };
      SphericalMercator3.prototype.xyz = function(bbox, zoom, tms_style, srs) {
        if (srs === "900913") {
          bbox = this.convert(bbox, "WGS84");
        }
        var ll = [bbox[0], bbox[1]];
        var ur = [bbox[2], bbox[3]];
        var px_ll = this.px(ll, zoom);
        var px_ur = this.px(ur, zoom);
        var x = [Math.floor(px_ll[0] / this.size), Math.floor((px_ur[0] - 1) / this.size)];
        var y = [Math.floor(px_ur[1] / this.size), Math.floor((px_ll[1] - 1) / this.size)];
        var bounds = {
          minX: Math.min.apply(Math, x) < 0 ? 0 : Math.min.apply(Math, x),
          minY: Math.min.apply(Math, y) < 0 ? 0 : Math.min.apply(Math, y),
          maxX: Math.max.apply(Math, x),
          maxY: Math.max.apply(Math, y)
        };
        if (tms_style) {
          var tms = {
            minY: Math.pow(2, zoom) - 1 - bounds.maxY,
            maxY: Math.pow(2, zoom) - 1 - bounds.minY
          };
          bounds.minY = tms.minY;
          bounds.maxY = tms.maxY;
        }
        return bounds;
      };
      SphericalMercator3.prototype.convert = function(bbox, to) {
        if (to === "900913") {
          return this.forward(bbox.slice(0, 2)).concat(this.forward(bbox.slice(2, 4)));
        } else {
          return this.inverse(bbox.slice(0, 2)).concat(this.inverse(bbox.slice(2, 4)));
        }
      };
      SphericalMercator3.prototype.forward = function(ll) {
        var xy = [
          A * ll[0] * D2R,
          A * Math.log(Math.tan(Math.PI * 0.25 + 0.5 * ll[1] * D2R))
        ];
        xy[0] > MAXEXTENT && (xy[0] = MAXEXTENT);
        xy[0] < -MAXEXTENT && (xy[0] = -MAXEXTENT);
        xy[1] > MAXEXTENT && (xy[1] = MAXEXTENT);
        xy[1] < -MAXEXTENT && (xy[1] = -MAXEXTENT);
        return xy;
      };
      SphericalMercator3.prototype.inverse = function(xy) {
        return [
          xy[0] * R2D / A,
          (Math.PI * 0.5 - 2 * Math.atan(Math.exp(-xy[1] / A))) * R2D
        ];
      };
      return SphericalMercator3;
    }();
    if (typeof module !== "undefined" && typeof exports !== "undefined") {
      module.exports = exports = SphericalMercator2;
    }
  }
});

// node_modules/@mapbox/search-js-core/dist/index-esm.js
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var SEARCH_URL = `https://api.mapbox.com/autofill/v1`;
var ENDPOINT_SUGGEST = "suggest";
var ENDPOINT_RETRIEVE = "retrieve";
var SUGGEST_URL = `${SEARCH_URL}/${ENDPOINT_SUGGEST}`;
var RETRIEVE_URL = `${SEARCH_URL}/${ENDPOINT_RETRIEVE}`;
var LngLat = class {
  constructor(lng, lat) {
    if (isNaN(lng) || isNaN(lat)) {
      throw new Error(`Invalid LngLat object: (${lng}, ${lat})`);
    }
    this.lng = +lng;
    this.lat = +lat;
    if (this.lat > 90 || this.lat < -90) {
      throw new Error("Invalid LngLat latitude value: must be between -90 and 90");
    }
    if (this.lng > 180 || this.lng < -180) {
      throw new Error("Invalid LngLat longitude value: must be between -180 and 180");
    }
  }
  toArray() {
    return [this.lng, this.lat];
  }
  toString() {
    return `LngLat(${this.lng}, ${this.lat})`;
  }
  static convert(input) {
    if (input instanceof LngLat) {
      return new LngLat(input.lng, input.lat);
    }
    if (Array.isArray(input) && input.length === 2) {
      return new LngLat(Number(input[0]), Number(input[1]));
    }
    if (!Array.isArray(input) && typeof input == "object" && input !== null && ("lng" in input || "lon" in input) && "lat" in input) {
      return new LngLat(Number("lng" in input ? input.lng : input.lon), Number(input.lat));
    }
    throw new Error("`LngLatLike` argument must be specified as an object {lng: <lng>, lat: <lat>}, an object {lon: <lng>, lat: <lat>}, or an array of [<lng>, <lat>]");
  }
};
var LngLatBounds = class {
  constructor(sw, ne) {
    this._sw = LngLat.convert(sw);
    this._ne = LngLat.convert(ne);
  }
  getSouthWest() {
    return this._sw;
  }
  getNorthEast() {
    return this._ne;
  }
  getNorthWest() {
    return new LngLat(this.getWest(), this.getNorth());
  }
  getSouthEast() {
    return new LngLat(this.getEast(), this.getSouth());
  }
  getWest() {
    return this._sw.lng;
  }
  getSouth() {
    return this._sw.lat;
  }
  getEast() {
    return this._ne.lng;
  }
  getNorth() {
    return this._ne.lat;
  }
  toArray() {
    return [this._sw.toArray(), this._ne.toArray()];
  }
  toFlatArray() {
    return [this._sw.lng, this._sw.lat, this._ne.lng, this._ne.lat];
  }
  toString() {
    return `LngLatBounds(${this._sw.toString()}, ${this._ne.toString()})`;
  }
  static convert(input) {
    if (!input) {
      throw new Error("Invalid LngLatBounds convert value: falsy");
    }
    if (input instanceof LngLatBounds) {
      return new LngLatBounds(input.getSouthWest(), input.getNorthEast());
    }
    if (Array.isArray(input) && input.length === 2) {
      return new LngLatBounds(LngLat.convert(input[0]), LngLat.convert(input[1]));
    }
    if (Array.isArray(input) && input.length === 4) {
      return new LngLatBounds(LngLat.convert([input[0], input[1]]), LngLat.convert([input[2], input[3]]));
    }
    throw new Error("`LngLatBoundsLike` argument must be specified as an array [<LngLatLike>, <LngLatLike>] or an array [<west>, <south>, <east>, <north>]");
  }
};
function generateUUID() {
  const randomString = Math.random().toString(16) + Date.now().toString(16) + Math.random().toString(16);
  const uuidString = randomString.replace(/\./g, "");
  const uuid = [
    uuidString.slice(0, 8),
    uuidString.slice(8, 12),
    "4" + uuidString.slice(12, 15) + "-8" + uuidString.slice(15, 18),
    uuidString.slice(18, 30)
  ].join("-");
  return uuid;
}
var SessionToken = class {
  constructor(id) {
    this.id = id != null ? id : generateUUID();
  }
  toString() {
    return this.id;
  }
  static convert(token) {
    return new SessionToken(token instanceof SessionToken ? token.id : token.toString());
  }
};
var UNKNOWN_ERROR = "Unknown error";
var MapboxError = class extends Error {
  constructor(json, statusCode) {
    super(String(json.message || json.error || UNKNOWN_ERROR));
    this.name = "MapboxError";
    this.statusCode = statusCode;
  }
  toString() {
    return `${this.name} (${this.statusCode}): ${this.message}`;
  }
};
function handleNonOkRes(res) {
  return __async(this, null, function* () {
    if (!res.ok) {
      const json = yield res.json();
      throw new MapboxError(json, res.status);
    }
  });
}
var _fetchImpl = globalThis.fetch;
var _abortControllerImpl = globalThis.AbortController;
function getFetch() {
  if (!_fetchImpl) {
    throw new Error("Fetch implementation not found. Please include a fetch polyfill in your application or use `polyfillFetch` from `@mapbox/search-js-core` to fix this issue.");
  }
  return {
    fetch: _fetchImpl,
    AbortController: _abortControllerImpl
  };
}
function queryParams(...objects) {
  const params = [];
  for (const obj of objects) {
    if (!obj)
      continue;
    const entries = Object.entries(obj);
    for (const [key, value] of entries) {
      if (value == null)
        continue;
      params.push(`${key}=${encodeURIComponent(String(value))}`);
    }
  }
  return params.join("&");
}
var _getQueryParams;
var getQueryParams_fn;
var _AddressAutofillCore = class {
  constructor(options = {}) {
    __privateAdd(this, _getQueryParams);
    const _a = options, { accessToken } = _a, defaults = __objRest(_a, ["accessToken"]);
    this.accessToken = accessToken;
    this.defaults = __spreadValues(__spreadValues({}, _AddressAutofillCore.defaults), defaults);
  }
  suggest(searchText, optionsArg) {
    return __async(this, null, function* () {
      if (!searchText) {
        throw new Error("searchText is required");
      }
      const { sessionToken, signal } = optionsArg;
      const options = __spreadProps(__spreadValues(__spreadValues({}, this.defaults), optionsArg), {
        sessionToken
      });
      const url = new URL(`${SUGGEST_URL}/${encodeURIComponent(searchText)}`);
      url.search = __privateMethod(this, _getQueryParams, getQueryParams_fn).call(this, options);
      const { fetch: fetch2 } = getFetch();
      const res = yield fetch2(url.toString(), {
        signal
      });
      yield handleNonOkRes(res);
      const json = yield res.json();
      return __spreadProps(__spreadValues({}, json), {
        suggestions: json.suggestions.map((suggestion) => {
          return __spreadProps(__spreadValues({}, suggestion), {
            original_search_text: searchText
          });
        }),
        url: url.toString()
      });
    });
  }
  retrieve(suggestion, optionsArg) {
    return __async(this, null, function* () {
      if (!suggestion) {
        throw new Error("suggestion is required");
      }
      if (!this.canRetrieve(suggestion)) {
        throw new Error("suggestion cannot be retrieved");
      }
      const { sessionToken: sessionTokenLike, signal } = optionsArg;
      const sessionToken = SessionToken.convert(sessionTokenLike);
      const url = new URL(`${RETRIEVE_URL}/${suggestion.action.id}`);
      url.search = queryParams({
        access_token: this.accessToken,
        session_token: sessionToken.id
      });
      const { fetch: fetch2 } = getFetch();
      const res = yield fetch2(url.toString(), { signal });
      yield handleNonOkRes(res);
      const json = yield res.json();
      json.url = url.toString();
      return json;
    });
  }
  canRetrieve(suggestion) {
    const action = suggestion.action;
    return typeof (action == null ? void 0 : action.id) === "string";
  }
};
var AddressAutofillCore = _AddressAutofillCore;
_getQueryParams = /* @__PURE__ */ new WeakSet();
getQueryParams_fn = function(options) {
  return queryParams({
    types: "address",
    access_token: this.accessToken,
    streets: options.streets,
    language: options.language,
    country: options.country,
    limit: options.limit
  }, options.sessionToken && {
    session_token: SessionToken.convert(options.sessionToken).id
  }, options.proximity && {
    proximity: typeof options.proximity === "string" ? options.proximity : LngLat.convert(options.proximity).toArray().join(",")
  }, options.bbox && {
    bbox: typeof options.bbox === "string" ? options.bbox : LngLatBounds.convert(options.bbox).toFlatArray().join(",")
  });
};
AddressAutofillCore.defaults = {
  language: "en",
  proximity: "ip",
  streets: true
};
var SEARCH_URL2 = `https://api.mapbox.com/search/searchbox/v1`;
var ENDPOINT_SUGGEST2 = "suggest";
var ENDPOINT_RETRIEVE2 = "retrieve";
var ENDPOINT_CATEGORY = "category";
var ENDPOINT_REVERSE = "reverse";
var SUGGEST_URL2 = `${SEARCH_URL2}/${ENDPOINT_SUGGEST2}`;
var RETRIEVE_URL2 = `${SEARCH_URL2}/${ENDPOINT_RETRIEVE2}`;
var CATEGORY_URL = `${SEARCH_URL2}/${ENDPOINT_CATEGORY}`;
var REVERSE_URL = `${SEARCH_URL2}/${ENDPOINT_REVERSE}`;
var _getQueryParams2;
var getQueryParams_fn2;
var _SearchBoxCore = class {
  constructor(options = {}) {
    __privateAdd(this, _getQueryParams2);
    const _a = options, { accessToken } = _a, defaults = __objRest(_a, ["accessToken"]);
    this.accessToken = accessToken;
    this.defaults = __spreadValues(__spreadValues({}, _SearchBoxCore.defaults), defaults);
  }
  suggest(searchText, optionsArg) {
    return __async(this, null, function* () {
      if (!searchText) {
        throw new Error("searchText is required");
      }
      const { sessionToken, signal } = optionsArg;
      const options = __spreadProps(__spreadValues(__spreadValues({}, this.defaults), optionsArg), {
        q: searchText,
        sessionToken
      });
      if (options.eta_type && (!options.origin || !options.navigation_profile)) {
        throw new Error("to provide eta estimate: eta, navigation_profile, and origin are required");
      }
      if (options.origin && !options.navigation_profile) {
        throw new Error("to provide distance estimate: both navigation_profile and origin are required");
      }
      const url = new URL(SUGGEST_URL2);
      url.search = __privateMethod(this, _getQueryParams2, getQueryParams_fn2).call(this, options);
      const { fetch: fetch2 } = getFetch();
      const res = yield fetch2(url.toString(), {
        signal
      });
      yield handleNonOkRes(res);
      const json = yield res.json();
      json.url = url.toString();
      return json;
    });
  }
  retrieve(suggestion, optionsArg) {
    return __async(this, null, function* () {
      if (!suggestion) {
        throw new Error("suggestion is required");
      }
      const { sessionToken: sessionTokenLike, signal } = optionsArg;
      const sessionToken = SessionToken.convert(sessionTokenLike);
      const url = new URL(`${RETRIEVE_URL2}/${encodeURIComponent(suggestion.mapbox_id)}`);
      url.search = queryParams({
        access_token: this.accessToken,
        session_token: sessionToken.id
      });
      const { fetch: fetch2 } = getFetch();
      const res = yield fetch2(url.toString(), {
        signal
      });
      yield handleNonOkRes(res);
      const json = yield res.json();
      json.url = url.toString();
      return json;
    });
  }
  category(_0) {
    return __async(this, arguments, function* (category, optionsArg = {}) {
      if (!category) {
        throw new Error("category is required");
      }
      const options = __spreadValues(__spreadValues({}, this.defaults), optionsArg);
      const url = new URL(`${CATEGORY_URL}/${encodeURIComponent(category)}`);
      url.search = __privateMethod(this, _getQueryParams2, getQueryParams_fn2).call(this, options);
      const { fetch: fetch2 } = getFetch();
      const res = yield fetch2(url.toString(), {
        signal: options.signal
      });
      yield handleNonOkRes(res);
      const json = yield res.json();
      json.url = url.toString();
      return json;
    });
  }
  reverse(_0) {
    return __async(this, arguments, function* (lngLat, optionsArg = {}) {
      if (!lngLat) {
        throw new Error("lngLat is required");
      }
      const [lng, lat] = typeof lngLat === "string" ? lngLat.split(",").map((x) => parseFloat(x)) : LngLat.convert(lngLat).toArray();
      if (isNaN(lng) || isNaN(lat)) {
        throw new Error("lngLat is required");
      }
      const options = __spreadValues(__spreadValues({}, this.defaults), optionsArg);
      const url = new URL(REVERSE_URL);
      url.search = queryParams({
        access_token: this.accessToken,
        language: options.language,
        limit: options.limit,
        longitude: lng,
        latitude: lat
      }, options.types && {
        types: typeof options.types === "string" ? options.types : [...options.types].join(",")
      });
      const { fetch: fetch2 } = getFetch();
      const res = yield fetch2(url.toString(), {
        signal: options.signal
      });
      yield handleNonOkRes(res);
      const json = yield res.json();
      json.url = url.toString();
      return json;
    });
  }
};
var SearchBoxCore = _SearchBoxCore;
_getQueryParams2 = /* @__PURE__ */ new WeakSet();
getQueryParams_fn2 = function(options) {
  return queryParams({
    q: options.q,
    access_token: this.accessToken,
    language: options.language,
    limit: options.limit,
    navigation_profile: options.navigation_profile,
    route: options.route,
    route_geometry: options.route_geometry,
    sar_type: options.sar_type,
    time_deviation: options.time_deviation,
    eta_type: options.eta_type,
    country: options.country,
    poi_category: options.poi_category,
    radius: options.radius,
    user_id: options.user_id,
    rich_metadata_provider: options.rich_metadata_provider,
    poi_category_exclusions: options.poi_category_exclusions
  }, options.sessionToken && {
    session_token: SessionToken.convert(options.sessionToken).id
  }, options.proximity && {
    proximity: typeof options.proximity === "string" ? options.proximity : LngLat.convert(options.proximity).toArray().join(",")
  }, options.origin && {
    origin: typeof options.origin === "string" ? options.origin : LngLat.convert(options.origin).toArray().join(",")
  }, options.bbox && {
    bbox: typeof options.bbox === "string" ? options.bbox : LngLatBounds.convert(options.bbox).toFlatArray().join(",")
  }, options.types && {
    types: typeof options.types === "string" ? options.types : [...options.types].join(",")
  });
};
SearchBoxCore.defaults = {
  language: "en"
};
var SEARCH_URL3 = `https://api.mapbox.com/autofill/v1`;
var ENDPOINT_VALIDATE = "retrieve";
var VALIDATE_URL = `${SEARCH_URL3}/${ENDPOINT_VALIDATE}`;
var _getQueryParams3;
var getQueryParams_fn3;
var _ValidationCore = class {
  constructor(options = {}) {
    __privateAdd(this, _getQueryParams3);
    const _a = options, { accessToken } = _a, defaults = __objRest(_a, ["accessToken"]);
    this.accessToken = accessToken;
    this.defaults = __spreadValues(__spreadValues({}, _ValidationCore.defaults), defaults);
  }
  validate(searchText, optionsArg) {
    return __async(this, null, function* () {
      if (!searchText) {
        throw new Error("searchText is required");
      }
      const { sessionToken, signal } = optionsArg;
      const options = __spreadProps(__spreadValues(__spreadValues({}, this.defaults), optionsArg), {
        sessionToken
      });
      const url = new URL(`${VALIDATE_URL}/${encodeURIComponent(searchText)}`);
      url.search = __privateMethod(this, _getQueryParams3, getQueryParams_fn3).call(this, options);
      const { fetch: fetch2 } = getFetch();
      const res = yield fetch2(url.toString(), {
        signal
      });
      yield handleNonOkRes(res);
      const json = yield res.json();
      json.url = url.toString();
      if (json.features.length > 0) {
        json.features = [json.features[0]];
      }
      return json;
    });
  }
};
var ValidationCore = _ValidationCore;
_getQueryParams3 = /* @__PURE__ */ new WeakSet();
getQueryParams_fn3 = function(options) {
  return queryParams({
    access_token: this.accessToken,
    language: options.language,
    country: options.country
  }, options.sessionToken && {
    session_token: SessionToken.convert(options.sessionToken).id
  }, options.proximity && {
    proximity: typeof options.proximity === "string" ? options.proximity : LngLat.convert(options.proximity).toArray().join(",")
  }, options.bbox && {
    bbox: typeof options.bbox === "string" ? options.bbox : LngLatBounds.convert(options.bbox).toFlatArray().join(",")
  });
};
ValidationCore.defaults = {
  language: "en",
  proximity: "ip"
};
var SEARCH_URL4 = `https://api.mapbox.com/geocoding/v5`;
var TEMP_URL = `${SEARCH_URL4}/mapbox.places`;
var PERMANENT_URL = `${SEARCH_URL4}/mapbox.places-permanent`;
var _getQueryParams4;
var getQueryParams_fn4;
_getQueryParams4 = /* @__PURE__ */ new WeakSet();
getQueryParams_fn4 = function(options, isReverse = false) {
  if (isReverse) {
    ["proximity", "autocomplete", "fuzzyMatch", "bbox"].forEach((key) => {
      if (key in options) {
        delete options[key];
      }
    });
  }
  return queryParams({
    access_token: this.accessToken,
    language: options.language,
    country: options.country,
    limit: options.limit,
    autocomplete: options.autocomplete,
    fuzzyMatch: options.fuzzyMatch,
    routing: options.routing,
    worldview: options.worldview
  }, options.proximity && {
    proximity: typeof options.proximity === "string" ? options.proximity : LngLat.convert(options.proximity).toArray().join(",")
  }, options.bbox && {
    bbox: typeof options.bbox === "string" ? options.bbox : LngLatBounds.convert(options.bbox).toFlatArray().join(",")
  }, options.types && {
    types: typeof options.types === "string" ? options.types : [...options.types].join(",")
  });
};
var MatchCodeConfidence = ((MatchCodeConfidence2) => {
  MatchCodeConfidence2["exact"] = "exact";
  MatchCodeConfidence2["high"] = "high";
  MatchCodeConfidence2["medium"] = "medium";
  MatchCodeConfidence2["low"] = "low";
  return MatchCodeConfidence2;
})(MatchCodeConfidence || {});
var _listeners;
var Evented = class {
  constructor() {
    __privateAdd(this, _listeners, {});
  }
  addEventListener(type, listener) {
    const listenersArr = __privateGet(this, _listeners);
    if (!listenersArr[type]) {
      listenersArr[type] = [];
    }
    listenersArr[type].push(listener);
  }
  removeEventListener(type, listener) {
    const listenersArr = __privateGet(this, _listeners);
    if (!listenersArr[type]) {
      return;
    }
    const listeners = listenersArr[type];
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }
  fire(type, arg0) {
    const listenersArr = __privateGet(this, _listeners);
    if (!listenersArr[type]) {
      return;
    }
    const listeners = listenersArr[type];
    for (const listener of listeners) {
      listener(arg0);
    }
  }
};
_listeners = /* @__PURE__ */ new WeakMap();
function debounce(func, wait, signalFn) {
  let timeout = null;
  return (...args) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    const signal = signalFn && signalFn();
    timeout = setTimeout(() => {
      timeout = null;
      if (signal == null ? void 0 : signal.aborted) {
        return;
      }
      func(...args);
    }, wait);
  };
}
function createAbortController() {
  const { AbortController } = getFetch();
  return new AbortController();
}
var _suggestions;
var _abort;
var _suggestDebounce;
var SearchSession = class extends Evented {
  constructor(search, wait = 0) {
    super();
    this.sessionToken = new SessionToken();
    __privateAdd(this, _suggestions, void 0);
    __privateAdd(this, _abort, createAbortController());
    __privateAdd(this, _suggestDebounce, void 0);
    __privateSet(this, _suggestDebounce, debounce((_0, ..._1) => __async(this, [_0, ..._1], function* (searchText, options = {}) {
      __privateGet(this, _abort).abort();
      __privateSet(this, _abort, createAbortController());
      if (!searchText) {
        __privateSet(this, _suggestions, null);
        this.fire("suggest", __privateGet(this, _suggestions));
        return;
      }
      try {
        const res = yield this.search.suggest(searchText, __spreadProps(__spreadValues({
          sessionToken: this.sessionToken
        }, options), {
          signal: __privateGet(this, _abort).signal
        }));
        __privateSet(this, _suggestions, res);
        this.fire("suggest", res);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        this.fire("suggesterror", err);
      }
    }), wait, () => __privateGet(this, _abort).signal));
    Object.defineProperties(this, {
      search: {
        value: search,
        writable: false
      },
      debounce: {
        value: wait,
        writable: false
      }
    });
  }
  get suggestions() {
    return __privateGet(this, _suggestions);
  }
  suggest(searchText, options) {
    __privateGet(this, _suggestDebounce).call(this, searchText, options);
    return new Promise((resolve, reject) => {
      let suggestFn;
      let suggestErrorFn;
      suggestFn = (res) => {
        this.removeEventListener("suggest", suggestFn);
        this.removeEventListener("suggesterror", suggestErrorFn);
        resolve(res);
      };
      suggestErrorFn = (err) => {
        this.removeEventListener("suggest", suggestFn);
        this.removeEventListener("suggesterror", suggestErrorFn);
        reject(err);
      };
      this.addEventListener("suggest", suggestFn);
      this.addEventListener("suggesterror", suggestErrorFn);
    });
  }
  clear() {
    this.suggest("");
  }
  retrieve(suggestion, options) {
    return __async(this, null, function* () {
      const res = yield this.search.retrieve(suggestion, __spreadValues({
        sessionToken: this.sessionToken
      }, options));
      this.fire("retrieve", res);
      return res;
    });
  }
  canRetrieve(suggestion) {
    if (!this.search.canRetrieve) {
      return true;
    }
    return this.search.canRetrieve(suggestion);
  }
  canSuggest(suggestion) {
    if (!this.search.canSuggest) {
      return true;
    }
    return this.search.canSuggest(suggestion);
  }
  abort() {
    __privateGet(this, _abort).abort();
    __privateSet(this, _abort, createAbortController());
  }
};
_suggestions = /* @__PURE__ */ new WeakMap();
_abort = /* @__PURE__ */ new WeakMap();
_suggestDebounce = /* @__PURE__ */ new WeakMap();
function featureToSuggestion(feature) {
  const { properties } = feature;
  return __spreadValues({}, properties);
}

// node_modules/@mapbox/search-js-web/node_modules/@floating-ui/core/dist/floating-ui.core.browser.mjs
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "x" : "y";
}
function getLengthFromAxis(axis) {
  return axis === "y" ? "height" : "width";
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  const commonAlign = reference[length] / 2 - floating[length] / 2;
  const side = getSide(placement);
  const isVertical = mainAxis === "x";
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[mainAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[mainAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config2) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config2;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  {
    if (platform2 == null) {
      console.error(["Floating UI: `platform` property was not passed to config. If you", "want to use Floating UI on the web, install @floating-ui/dom", "instead of the /core package. Otherwise, you can create your own", "`platform`: https://floating-ui.com/docs/platform"].join(" "));
    }
    if (middleware.filter((_ref) => {
      let {
        name
      } = _ref;
      return name === "autoPlacement" || name === "flip";
    }).length > 1) {
      throw new Error(["Floating UI: duplicate `flip` and/or `autoPlacement`", "middleware detected. This will lead to an infinite loop. Ensure only", "one of either has been passed to the `middleware` array."].join(" "));
    }
  }
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < middleware.length; i++) {
    const {
      name,
      fn
    } = middleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    {
      if (resetCount > 50) {
        console.warn(["Floating UI: The middleware lifecycle appears to be running in an", "infinite loop. This is usually caused by a `reset` continually", "being returned without a break condition."].join(" "));
      }
    }
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
      continue;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getSideObjectFromPadding(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}
async function detectOverflow(middlewareArguments, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = middlewareArguments;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = options;
  const paddingObject = getSideObjectFromPadding(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: elementContext === "floating" ? {
      ...rects.floating,
      x,
      y
    } : rects.reference,
    offsetParent: await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating)),
    strategy
  }) : rects[elementContext]);
  return {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
}
var hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (matched) => hash$1[matched]);
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  let mainAlignmentSide = mainAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return {
    main: mainAlignmentSide,
    cross: getOppositePlacement(mainAlignmentSide)
  };
}
var hash = {
  start: "end",
  end: "start"
};
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (matched) => hash[matched]);
}
var sides = ["top", "right", "bottom", "left"];
var allPlacements = sides.reduce((acc, side) => acc.concat(side, side + "-start", side + "-end"), []);
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(middlewareArguments) {
      var _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = middlewareArguments;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        flipAlignment = true,
        ...detectOverflowOptions
      } = options;
      const side = getSide(placement);
      const isBasePlacement = side === initialPlacement;
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(middlewareArguments, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const {
          main,
          cross
        } = getAlignmentSides(placement, rects, await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)));
        overflows.push(overflow[main], overflow[cross]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip$, _middlewareData$flip2;
        const nextIndex = ((_middlewareData$flip$ = (_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) != null ? _middlewareData$flip$ : 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = "bottom";
        switch (fallbackStrategy) {
          case "bestFit": {
            var _overflowsData$map$so;
            const placement2 = (_overflowsData$map$so = overflowsData.map((d) => [d, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0].placement;
            if (placement2) {
              resetPlacement = placement2;
            }
            break;
          }
          case "initialPlacement":
            resetPlacement = initialPlacement;
            break;
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
async function convertValueToCoords(middlewareArguments, value) {
  const {
    placement,
    platform: platform2,
    elements
  } = middlewareArguments;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getMainAxisFromPlacement(placement) === "x";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = typeof value === "function" ? value(middlewareArguments) : value;
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(value) {
  if (value === void 0) {
    value = 0;
  }
  return {
    name: "offset",
    options: value,
    async fn(middlewareArguments) {
      const {
        x,
        y
      } = middlewareArguments;
      const diffCoords = await convertValueToCoords(middlewareArguments, value);
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: diffCoords
      };
    }
  };
};

// node_modules/@mapbox/search-js-web/node_modules/@floating-ui/dom/dist/floating-ui.dom.browser.mjs
function isWindow(value) {
  return value && value.document && value.location && value.alert && value.setInterval;
}
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (!isWindow(node)) {
    const ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeName(node) {
  return isWindow(node) ? "" : node ? (node.nodeName || "").toLowerCase() : "";
}
function getUAString() {
  const uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands) {
    return uaData.brands.map((item) => item.brand + "/" + item.version).join(" ");
  }
  return navigator.userAgent;
}
function isHTMLElement(value) {
  return value instanceof getWindow(value).HTMLElement;
}
function isElement(value) {
  return value instanceof getWindow(value).Element;
}
function isNode(value) {
  return value instanceof getWindow(value).Node;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  const OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const isFirefox = /firefox/i.test(getUAString());
  const css = getComputedStyle$1(element);
  return css.transform !== "none" || css.perspective !== "none" || // @ts-ignore (TS 4.1 compat)
  css.contain === "paint" || ["transform", "perspective"].includes(css.willChange) || isFirefox && css.willChange === "filter" || isFirefox && (css.filter ? css.filter !== "none" : false);
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
var min = Math.min;
var max = Math.max;
var round = Math.round;
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  var _win$visualViewport$o, _win$visualViewport, _win$visualViewport$o2, _win$visualViewport2;
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  let scaleX = 1;
  let scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  const win = isElement(element) ? getWindow(element) : window;
  const addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  const x = (clientRect.left + (addVisualOffsets ? (_win$visualViewport$o = (_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) != null ? _win$visualViewport$o : 0 : 0)) / scaleX;
  const y = (clientRect.top + (addVisualOffsets ? (_win$visualViewport$o2 = (_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) != null ? _win$visualViewport$o2 : 0 : 0)) / scaleY;
  const width = clientRect.width / scaleX;
  const height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}
function getDocumentElement(node) {
  return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function isScaled(element) {
  const rect = getBoundingClientRect(element);
  return round(rect.width) !== element.offsetWidth || round(rect.height) !== element.offsetHeight;
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const rect = getBoundingClientRect(
    element,
    // @ts-ignore - checked above (TS 4.1 compat)
    isOffsetParentAnElement && isScaled(offsetParent),
    strategy === "fixed"
  );
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // @ts-ignore
    node.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    node.parentNode || // DOM Element detected
    (isShadowRoot(node) ? node.host : null) || // ShadowRoot detected
    getDocumentElement(node)
  );
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && !["html", "body"].includes(getNodeName(currentNode))) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  const window2 = getWindow(element);
  let offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getDimensions(element) {
  if (isHTMLElement(element)) {
    return {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }
  const rect = getBoundingClientRect(element);
  return {
    width: rect.width,
    height: rect.height
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    ...rect,
    x: rect.x - scroll.scrollLeft + offsets.x,
    y: rect.y - scroll.scrollTop + offsets.y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  const width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  const height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (["html", "body", "#document"].includes(getNodeName(parentNode))) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list) {
  var _node$ownerDocument;
  if (list === void 0) {
    list = [];
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
  const win = getWindow(scrollableAncestor);
  const target = isBody ? [win].concat(win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []) : scrollableAncestor;
  const updatedList = list.concat(target);
  return isBody ? updatedList : (
    // @ts-ignore: isBody tells us target will be an HTMLElement here
    updatedList.concat(getOverflowAncestors(target))
  );
}
function contains(parent, child) {
  const rootNode = child.getRootNode == null ? void 0 : child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    let next = child;
    do {
      if (next && parent === next) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, false, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  return {
    top,
    left,
    x: left,
    y: top,
    right: left + element.clientWidth,
    bottom: top + element.clientHeight,
    width: element.clientWidth,
    height: element.clientHeight
  };
}
function getClientRectFromClippingAncestor(element, clippingParent, strategy) {
  if (clippingParent === "viewport") {
    return rectToClientRect(getViewportRect(element, strategy));
  }
  if (isElement(clippingParent)) {
    return getInnerBoundingClientRect(clippingParent, strategy);
  }
  return rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingAncestors(element) {
  const clippingAncestors = getOverflowAncestors(element);
  const canEscapeClipping = ["absolute", "fixed"].includes(getComputedStyle$1(element).position);
  const clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingAncestors.filter((clippingAncestors2) => isElement(clippingAncestors2) && contains(clippingAncestors2, clipperElement) && getNodeName(clippingAncestors2) !== "body");
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const mainClippingAncestors = boundary === "clippingAncestors" ? getClippingAncestors(element) : [].concat(boundary);
  const clippingAncestors = [...mainClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
var platform = {
  getClippingRect,
  convertOffsetParentRelativeRectToViewportRelativeRect,
  isElement,
  getDimensions,
  getOffsetParent,
  getDocumentElement,
  getElementRects: (_ref) => {
    let {
      reference,
      floating,
      strategy
    } = _ref;
    return {
      reference: getRectRelativeToOffsetParent(reference, getOffsetParent(floating), strategy),
      floating: {
        ...getDimensions(floating),
        x: 0,
        y: 0
      }
    };
  },
  getClientRects: (element) => Array.from(element.getClientRects()),
  isRTL: (element) => getComputedStyle$1(element).direction === "rtl"
};
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll: _ancestorScroll = true,
    ancestorResize: _ancestorResize = true,
    elementResize = true,
    animationFrame = false
  } = options;
  const ancestorScroll = _ancestorScroll && !animationFrame;
  const ancestorResize = _ancestorResize && !animationFrame;
  const ancestors = ancestorScroll || ancestorResize ? [...isElement(reference) ? getOverflowAncestors(reference) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  let observer = null;
  if (elementResize) {
    let initialUpdate = true;
    observer = new ResizeObserver(() => {
      if (!initialUpdate) {
        update();
      }
      initialUpdate = false;
    });
    isElement(reference) && !animationFrame && observer.observe(reference);
    observer.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _observer3;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    (_observer3 = observer) == null ? void 0 : _observer3.disconnect();
    observer = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var computePosition2 = (reference, floating, options) => computePosition(reference, floating, {
  platform,
  ...options
});

// node_modules/@mapbox/search-js-web/dist/index-esm.js
var import_no_scroll = __toESM(require_no_scroll());

// node_modules/tabbable/dist/index.esm.js
var candidateSelectors = ["input", "select", "textarea", "a[href]", "button", "[tabindex]:not(slot)", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])', "details>summary:first-of-type", "details"];
var candidateSelector = candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
  return element.getRootNode();
} : function(element) {
  return element.ownerDocument;
};
var getCandidates = function getCandidates2(el, includeContainer, filter) {
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};
var getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (element.tagName === "SLOT") {
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively2(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scope: element,
          candidates: nestedCandidates
        });
      }
    } else {
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }
      var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
      typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
      var validShadowRoot = !options.shadowRootFilter || options.shadowRootFilter(element);
      if (shadowRoot && validShadowRoot) {
        var _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scope: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};
var getTabindex = function getTabindex2(node, isScope) {
  if (node.tabIndex < 0) {
    if ((isScope || /^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || node.isContentEditable) && isNaN(parseInt(node.getAttribute("tabindex"), 10))) {
      return 0;
    }
  }
  return node.tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput2(node) {
  return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary2(node) {
  var r = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
    return child.tagName === "SUMMARY";
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios2(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio2(node) {
  return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isZeroArea = function isZeroArea2(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden2(node, _ref) {
  var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
  if (getComputedStyle(node).visibility === "hidden") {
    return true;
  }
  var isDirectSummary = matches.call(node, "details>summary:first-of-type");
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
    return true;
  }
  var nodeRootHost = getRootNode(node).host;
  var nodeIsAttached = (nodeRootHost === null || nodeRootHost === void 0 ? void 0 : nodeRootHost.ownerDocument.contains(nodeRootHost)) || node.ownerDocument.contains(node);
  if (!displayCheck || displayCheck === "full") {
    if (typeof getShadowRoot === "function") {
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          node = rootNode.host;
        } else {
          node = parentElement;
        }
      }
      node = originalNode;
    }
    if (nodeIsAttached) {
      return !node.getClientRects().length;
    }
  } else if (displayCheck === "non-zero-area") {
    return isZeroArea(node);
  }
  return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          if (child.tagName === "LEGEND") {
            return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
          }
        }
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (isNonTabbableRadio(node) || getTabindex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  return false;
};
var sortByOrder = function sortByOrder2(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function(item, i) {
    var isScope = !!item.scope;
    var element = isScope ? item.scope : item;
    var candidateTabindex = getTabindex(element, isScope);
    var elements = isScope ? sortByOrder2(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item,
        isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable2(el, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([el], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
var focusable = function focusable2(el, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([el], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }
  return candidates;
};
var isTabbable = function isTabbable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = candidateSelectors.concat("iframe").join(",");
var isFocusable = function isFocusable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorFocusable(options, node);
};

// node_modules/focus-trap/dist/focus-trap.esm.js
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var activeFocusTraps = function() {
  var trapQueue = [];
  return {
    activateTrap: function activateTrap(trap) {
      if (trapQueue.length > 0) {
        var activeTrap = trapQueue[trapQueue.length - 1];
        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }
      var trapIndex = trapQueue.indexOf(trap);
      if (trapIndex === -1) {
        trapQueue.push(trap);
      } else {
        trapQueue.splice(trapIndex, 1);
        trapQueue.push(trap);
      }
    },
    deactivateTrap: function deactivateTrap(trap) {
      var trapIndex = trapQueue.indexOf(trap);
      if (trapIndex !== -1) {
        trapQueue.splice(trapIndex, 1);
      }
      if (trapQueue.length > 0) {
        trapQueue[trapQueue.length - 1].unpause();
      }
    }
  };
}();
var isSelectableInput = function isSelectableInput2(node) {
  return node.tagName && node.tagName.toLowerCase() === "input" && typeof node.select === "function";
};
var isEscapeEvent = function isEscapeEvent2(e) {
  return e.key === "Escape" || e.key === "Esc" || e.keyCode === 27;
};
var isTabEvent = function isTabEvent2(e) {
  return e.key === "Tab" || e.keyCode === 9;
};
var delay = function delay2(fn) {
  return setTimeout(fn, 0);
};
var findIndex = function findIndex2(arr, fn) {
  var idx = -1;
  arr.every(function(value, i) {
    if (fn(value)) {
      idx = i;
      return false;
    }
    return true;
  });
  return idx;
};
var valueOrHandler = function valueOrHandler2(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }
  return typeof value === "function" ? value.apply(void 0, params) : value;
};
var getActualTarget = function getActualTarget2(event) {
  return event.target.shadowRoot && typeof event.composedPath === "function" ? event.composedPath()[0] : event.target;
};
var createFocusTrap = function createFocusTrap2(elements, userOptions) {
  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;
  var config2 = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true
  }, userOptions);
  var state = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   firstTabbableNode: HTMLElement|null,
    //   lastTabbableNode: HTMLElement|null,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0
  };
  var trap;
  var getOption = function getOption2(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== void 0 ? configOverrideOptions[optionName] : config2[configOptionName || optionName];
  };
  var findContainerIndex = function findContainerIndex2(element) {
    return state.containerGroups.findIndex(function(_ref) {
      var container = _ref.container, tabbableNodes = _ref.tabbableNodes;
      return container.contains(element) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      tabbableNodes.find(function(node) {
        return node === element;
      });
    });
  };
  var getNodeForOption = function getNodeForOption2(optionName) {
    var optionValue = config2[optionName];
    if (typeof optionValue === "function") {
      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }
      optionValue = optionValue.apply(void 0, params);
    }
    if (optionValue === true) {
      optionValue = void 0;
    }
    if (!optionValue) {
      if (optionValue === void 0 || optionValue === false) {
        return optionValue;
      }
      throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
    }
    var node = optionValue;
    if (typeof optionValue === "string") {
      node = doc.querySelector(optionValue);
      if (!node) {
        throw new Error("`".concat(optionName, "` as selector refers to no known node"));
      }
    }
    return node;
  };
  var getInitialFocusNode = function getInitialFocusNode2() {
    var node = getNodeForOption("initialFocus");
    if (node === false) {
      return false;
    }
    if (node === void 0) {
      if (findContainerIndex(doc.activeElement) >= 0) {
        node = doc.activeElement;
      } else {
        var firstTabbableGroup = state.tabbableGroups[0];
        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;
        node = firstTabbableNode || getNodeForOption("fallbackFocus");
      }
    }
    if (!node) {
      throw new Error("Your focus-trap needs to have at least one focusable element");
    }
    return node;
  };
  var updateTabbableNodes = function updateTabbableNodes2() {
    state.containerGroups = state.containers.map(function(container) {
      var tabbableNodes = tabbable(container, config2.tabbableOptions);
      var focusableNodes = focusable(container, config2.tabbableOptions);
      return {
        container,
        tabbableNodes,
        focusableNodes,
        firstTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[0] : null,
        lastTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : null,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function nextTabbableNode(node) {
          var forward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          var nodeIdx = focusableNodes.findIndex(function(n) {
            return n === node;
          });
          if (nodeIdx < 0) {
            return void 0;
          }
          if (forward) {
            return focusableNodes.slice(nodeIdx + 1).find(function(n) {
              return isTabbable(n, config2.tabbableOptions);
            });
          }
          return focusableNodes.slice(0, nodeIdx).reverse().find(function(n) {
            return isTabbable(n, config2.tabbableOptions);
          });
        }
      };
    });
    state.tabbableGroups = state.containerGroups.filter(function(group) {
      return group.tabbableNodes.length > 0;
    });
    if (state.tabbableGroups.length <= 0 && !getNodeForOption("fallbackFocus")) {
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    }
  };
  var tryFocus = function tryFocus2(node) {
    if (node === false) {
      return;
    }
    if (node === doc.activeElement) {
      return;
    }
    if (!node || !node.focus) {
      tryFocus2(getInitialFocusNode());
      return;
    }
    node.focus({
      preventScroll: !!config2.preventScroll
    });
    state.mostRecentlyFocusedNode = node;
    if (isSelectableInput(node)) {
      node.select();
    }
  };
  var getReturnFocusNode = function getReturnFocusNode2(previousActiveElement) {
    var node = getNodeForOption("setReturnFocus", previousActiveElement);
    return node ? node : node === false ? false : previousActiveElement;
  };
  var checkPointerDown = function checkPointerDown2(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target) >= 0) {
      return;
    }
    if (valueOrHandler(config2.clickOutsideDeactivates, e)) {
      trap.deactivate({
        // if, on deactivation, we should return focus to the node originally-focused
        //  when the trap was activated (or the configured `setReturnFocus` node),
        //  then assume it's also OK to return focus to the outside node that was
        //  just clicked, causing deactivation, as long as that node is focusable;
        //  if it isn't focusable, then return focus to the original node focused
        //  on activation (or the configured `setReturnFocus` node)
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked, whether it's focusable or not; by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node)
        returnFocus: config2.returnFocusOnDeactivate && !isFocusable(target, config2.tabbableOptions)
      });
      return;
    }
    if (valueOrHandler(config2.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
  };
  var checkFocusIn = function checkFocusIn2(e) {
    var target = getActualTarget(e);
    var targetContained = findContainerIndex(target) >= 0;
    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target;
      }
    } else {
      e.stopImmediatePropagation();
      tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
    }
  };
  var checkTab = function checkTab2(e) {
    var target = getActualTarget(e);
    updateTabbableNodes();
    var destinationNode = null;
    if (state.tabbableGroups.length > 0) {
      var containerIndex = findContainerIndex(target);
      var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : void 0;
      if (containerIndex < 0) {
        if (e.shiftKey) {
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (e.shiftKey) {
        var startOfGroupIndex = findIndex(state.tabbableGroups, function(_ref2) {
          var firstTabbableNode = _ref2.firstTabbableNode;
          return target === firstTabbableNode;
        });
        if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config2.tabbableOptions) && !isTabbable(target, config2.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
          startOfGroupIndex = containerIndex;
        }
        if (startOfGroupIndex >= 0) {
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = destinationGroup.lastTabbableNode;
        }
      } else {
        var lastOfGroupIndex = findIndex(state.tabbableGroups, function(_ref3) {
          var lastTabbableNode = _ref3.lastTabbableNode;
          return target === lastTabbableNode;
        });
        if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config2.tabbableOptions) && !isTabbable(target, config2.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
          lastOfGroupIndex = containerIndex;
        }
        if (lastOfGroupIndex >= 0) {
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = _destinationGroup.firstTabbableNode;
        }
      }
    } else {
      destinationNode = getNodeForOption("fallbackFocus");
    }
    if (destinationNode) {
      e.preventDefault();
      tryFocus(destinationNode);
    }
  };
  var checkKey = function checkKey2(e) {
    if (isEscapeEvent(e) && valueOrHandler(config2.escapeDeactivates, e) !== false) {
      e.preventDefault();
      trap.deactivate();
      return;
    }
    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  };
  var checkClick = function checkClick2(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target) >= 0) {
      return;
    }
    if (valueOrHandler(config2.clickOutsideDeactivates, e)) {
      return;
    }
    if (valueOrHandler(config2.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
  };
  var addListeners = function addListeners2() {
    if (!state.active) {
      return;
    }
    activeFocusTraps.activateTrap(trap);
    state.delayInitialFocusTimer = config2.delayInitialFocus ? delay(function() {
      tryFocus(getInitialFocusNode());
    }) : tryFocus(getInitialFocusNode());
    doc.addEventListener("focusin", checkFocusIn, true);
    doc.addEventListener("mousedown", checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener("touchstart", checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener("click", checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener("keydown", checkKey, {
      capture: true,
      passive: false
    });
    return trap;
  };
  var removeListeners = function removeListeners2() {
    if (!state.active) {
      return;
    }
    doc.removeEventListener("focusin", checkFocusIn, true);
    doc.removeEventListener("mousedown", checkPointerDown, true);
    doc.removeEventListener("touchstart", checkPointerDown, true);
    doc.removeEventListener("click", checkClick, true);
    doc.removeEventListener("keydown", checkKey, true);
    return trap;
  };
  trap = {
    get active() {
      return state.active;
    },
    get paused() {
      return state.paused;
    },
    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }
      var onActivate = getOption(activateOptions, "onActivate");
      var onPostActivate = getOption(activateOptions, "onPostActivate");
      var checkCanFocusTrap = getOption(activateOptions, "checkCanFocusTrap");
      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }
      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;
      if (onActivate) {
        onActivate();
      }
      var finishActivation = function finishActivation2() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }
        addListeners();
        if (onPostActivate) {
          onPostActivate();
        }
      };
      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }
      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }
      var options = _objectSpread2({
        onDeactivate: config2.onDeactivate,
        onPostDeactivate: config2.onPostDeactivate,
        checkCanReturnFocus: config2.checkCanReturnFocus
      }, deactivateOptions);
      clearTimeout(state.delayInitialFocusTimer);
      state.delayInitialFocusTimer = void 0;
      removeListeners();
      state.active = false;
      state.paused = false;
      activeFocusTraps.deactivateTrap(trap);
      var onDeactivate = getOption(options, "onDeactivate");
      var onPostDeactivate = getOption(options, "onPostDeactivate");
      var checkCanReturnFocus = getOption(options, "checkCanReturnFocus");
      var returnFocus = getOption(options, "returnFocus", "returnFocusOnDeactivate");
      if (onDeactivate) {
        onDeactivate();
      }
      var finishDeactivation = function finishDeactivation2() {
        delay(function() {
          if (returnFocus) {
            tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }
          if (onPostDeactivate) {
            onPostDeactivate();
          }
        });
      };
      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }
      finishDeactivation();
      return this;
    },
    pause: function pause() {
      if (state.paused || !state.active) {
        return this;
      }
      state.paused = true;
      removeListeners();
      return this;
    },
    unpause: function unpause() {
      if (!state.paused || !state.active) {
        return this;
      }
      state.paused = false;
      updateTabbableNodes();
      addListeners();
      return this;
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function(element) {
        return typeof element === "string" ? doc.querySelector(element) : element;
      });
      if (state.active) {
        updateTabbableNodes();
      }
      return this;
    }
  };
  trap.updateContainerElements(elements);
  return trap;
};

// node_modules/@mapbox/search-js-web/dist/index-esm.js
var import_subtag = __toESM(require_subtag());
var import_sphericalmercator = __toESM(require_sphericalmercator());
var __defProp2 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
var __accessCheck2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet2 = (obj, member, getter) => {
  __accessCheck2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet2 = (obj, member, value, setter) => {
  __accessCheck2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod2 = (obj, member, method) => {
  __accessCheck2(obj, member, "access private method");
  return method;
};
var __async2 = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var subdoc = document.implementation.createHTMLDocument();
function bindElements(root, elements) {
  const binding = {};
  for (const [key, selector] of Object.entries(elements)) {
    binding[key] = root.querySelector(selector);
  }
  return binding;
}
function getChildElements(node) {
  return Array.from(node.childNodes || []).filter((el) => el.nodeType === Node.ELEMENT_NODE);
}
function createElementFromString(innerHTML) {
  const template = document.createElement("template");
  template.innerHTML = innerHTML;
  return template.content.firstElementChild;
}
function createCSSStyleSheet(text) {
  const style = subdoc.createElement("style");
  style.textContent = text;
  subdoc.head.appendChild(style);
  return style.sheet;
}
function isVisible(element) {
  const style = window.getComputedStyle(element);
  return style.display !== "none";
}
function setValue(input, value) {
  if (!input) {
    return;
  }
  const set = Object.getOwnPropertyDescriptor(input.constructor.prototype, "value").set;
  set.call(input, value);
  const wrapperState = input;
  if (wrapperState._valueTracker) {
    wrapperState._valueTracker.setValue("");
  }
  const onInputEvent = new Event("input", {
    bubbles: true
  });
  onInputEvent.simulated = true;
  input.dispatchEvent(onInputEvent);
  const onChangeEvent = new Event("change", {
    bubbles: true
  });
  onChangeEvent.simulated = true;
  input.dispatchEvent(onChangeEvent);
}
function getElementSize(element, deep = false) {
  let width;
  let height;
  const elementRect = element.getBoundingClientRect();
  if (element.style.display === "none" || elementRect.height === 0 && elementRect.width === 0) {
    const clone = element.cloneNode(deep);
    element.parentElement.appendChild(clone);
    clone.style.setProperty("display", "block", "important");
    const cloneRect = clone.getBoundingClientRect();
    width = cloneRect.width;
    height = cloneRect.height;
    clone.style.setProperty("display", "none");
    clone.remove();
  } else {
    width = elementRect.width;
    height = elementRect.height;
  }
  return {
    height: Math.floor(height),
    width: Math.floor(width)
  };
}
function addDocumentStyle(css) {
  const style = document.createElement("style");
  style.innerHTML = css;
  document.head.appendChild(style);
}
var IDENTIFIER_REGEX = new RegExp("[_a-zA-Z]+[_a-zA-Z0-9-]*", "g");
var CLASS_NAME_REGEX = new RegExp(`\\.${IDENTIFIER_REGEX.source}`, "g");
var CONDITION_RULE_REGEX = new RegExp(`^\\s*(@(?:media|supports)[^{]*){(.*)}\\s*$`);
function transformClassSelectors(css, transform) {
  return css.replace(CLASS_NAME_REGEX, (className) => {
    return "." + transform(className.slice(1));
  });
}
function transformCSSClassRules(text, transform) {
  const sheet = createCSSStyleSheet(text);
  const rules = sheet.cssRules;
  function transformCSSRule(rule) {
    if (rule instanceof CSSStyleRule) {
      const selector = transformClassSelectors(rule.selectorText, transform);
      return `${selector} { ${rule.style.cssText} }`;
    }
    const atRule = CONDITION_RULE_REGEX.exec(rule.cssText.split("\n").join(""));
    if (atRule && atRule.length > 2) {
      const rule2 = atRule[1];
      const contents = atRule[2];
      return `${rule2} { ${transformCSSClassRules(contents, transform)} }`;
    }
    return rule.cssText;
  }
  let style = "";
  for (const rule of Array.from(rules)) {
    style += transformCSSRule(rule) + "\n\n";
  }
  return style.trim();
}
function transformDOMClassAttributes(content, transform) {
  const elements = Array.from(content.querySelectorAll("[class]"));
  elements.push(content);
  for (const element of elements) {
    const { classList } = element;
    for (const className of Array.from(classList)) {
      classList.remove(className);
      classList.add(transform(className));
    }
  }
  return content;
}
var FLY_TO_SPEED = 1.4;
function bboxViewport(map, bounds, delta = 0.5) {
  const { center, zoom } = map.cameraForBounds(bounds);
  const transformedZoom = Math.max(zoom - delta, 0);
  return {
    center,
    zoom: transformedZoom,
    speed: FLY_TO_SPEED
  };
}
function getMaxZoom(placeType) {
  switch (placeType) {
    case "street":
      return 15;
    case "neighborhood":
    case "postcode":
    case "locality":
    case "oaza":
      return 14;
    case "place":
    case "city":
      return 13;
    case "district":
      return 9;
    case "region":
    case "prefecture":
      return 6;
    case "country":
      return 4;
    default:
      return 16;
  }
}
function getStaticBaseUrl(username, styleId) {
  return `https://api.mapbox.com/styles/v1/${username}/${styleId}/static/`;
}
var close_default = '<svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.8 3.8a1 1 0 0 1 1.4 0L9 7.58l3.8-3.8a1 1 0 1 1 1.4 1.42L10.42 9l3.8 3.8a1 1 0 0 1-1.42 1.4L9 10.42l-3.8 3.8a1 1 0 0 1-1.4-1.42L7.58 9l-3.8-3.8a1 1 0 0 1 0-1.4Z" fill="currentColor"/></svg>';
var loading_default = '<svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path fill="#333" d="M4.4 4.4l.8.8c2.1-2.1 5.5-2.1 7.6 0l.8-.8c-2.5-2.5-6.7-2.5-9.2 0z"/><path opacity=".1" d="M12.8 12.9c-2.1 2.1-5.5 2.1-7.6 0-2.1-2.1-2.1-5.5 0-7.7l-.8-.8c-2.5 2.5-2.5 6.7 0 9.2s6.6 2.5 9.2 0 2.5-6.6 0-9.2l-.8.8c2.2 2.1 2.2 5.6 0 7.7z"/></svg>';
var STATIC_BASE_URL_SATELLITE = getStaticBaseUrl("mapbox", "satellite-streets-v11");
var AUTOFILL_SKU_TOKEN_PREFIX = "20d01";
var MAPBOX_DOMAINS = ["mapbox.com", "mapbox.cn", "tilestream.net"];
var LISTBOX_TEMPLATE = createElementFromString(`
<template>
  <div class="MapboxSearch">
    <div class="Label" role="label" aria-live="polite" aria-atomic="true">
    </div>
    <div class="Results" aria-hidden="true">
      <div class="ResultsList" role="listbox">
      </div>
      <div class="ResultsAttribution" aria-hidden="true">
        <a href="https://www.mapbox.com/search-service" target="_blank" tabindex="-1">
          Powered by Mapbox
        </a>
      </div>
    </div>
  </div>
</template>
`);
var LISTBOX_SUGGESTION_TEMPLATE = createElementFromString(`
<template>
  <div class="Suggestion" role="option" tabindex="-1">
    <div class="SuggestionIcon" aria-hidden="true"></div>
    <div class="SuggestionText">
      <div class="SuggestionName"></div>
      <div class="SuggestionDesc"></div>
    </div>
  </div>
</template>
`);
var SEARCHBOX_TEMPLATE = createElementFromString(`
<template>
  <div class="SearchBox">
    <div class="SearchIcon"></div>
    <input class="Input" type="text" />
    <div class="ActionIcon">
      <button aria-label="Clear" class="ClearBtn">${close_default}</button>
      <div class="LoadingIcon">${loading_default}</div>
    </div>
  </div>
</template>
`);
function randomValidID() {
  return `mbx` + new SessionToken().id.slice(0, 8);
}
function tryParseJSON(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}
function deepEquals(a, b) {
  if (a == null || b == null) {
    return a === b;
  }
  if (typeof a !== "object" || typeof b !== "object") {
    return a === b;
  }
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  for (const key of aKeys) {
    if (!deepEquals(a[key], b[key])) {
      return false;
    }
  }
  return true;
}
function round2(num, decimalPlaces) {
  const factorOfTen = Math.pow(10, decimalPlaces);
  return Math.round(num * factorOfTen) / factorOfTen;
}
function isLocalServer(hostname) {
  return Boolean(hostname.match(/localhost|[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}|::1|\.local|^$/gi));
}
function isMapboxDomain(hostname) {
  return Boolean(MAPBOX_DOMAINS.some((domain) => hostname.includes(domain)));
}
var _seed;
var _templateUserStyleElement;
var _transform;
var HTMLScopedElement = class extends HTMLElement {
  constructor() {
    super(...arguments);
    __privateAdd2(this, _seed, randomValidID());
    __privateAdd2(this, _templateUserStyleElement, void 0);
    __privateAdd2(this, _transform, (className) => {
      return `${__privateGet2(this, _seed)}--${className}`;
    });
  }
  get template() {
    return null;
  }
  get templateStyle() {
    return null;
  }
  get templateUserStyle() {
    return null;
  }
  clonedCallback(oldSeed, newSeed) {
    const seedTransform = (className) => className.replace(oldSeed, newSeed);
    transformDOMClassAttributes(this, seedTransform);
    const styles = Array.from(this.querySelectorAll("style"));
    for (const style of styles) {
      style.textContent = transformClassSelectors(style.textContent, seedTransform);
    }
    if (styles.length) {
      __privateSet2(this, _templateUserStyleElement, styles[styles.length - 1]);
    }
    const nodesWithId = Array.from(this.querySelectorAll(`[id^="${oldSeed}"]`));
    for (const node of nodesWithId) {
      node.id = node.id.replace(oldSeed, newSeed);
    }
  }
  connectedCallback() {
    if (this.childElementCount > 0) {
      const oldSeed = this.dataset.seed;
      const newSeed = __privateGet2(this, _seed);
      if (oldSeed && oldSeed !== newSeed) {
        this.clonedCallback(oldSeed, newSeed);
        this.dataset.seed = newSeed;
      }
      return;
    }
    this.dataset.seed = __privateGet2(this, _seed);
    const template = this.template;
    if (template) {
      const element = this.prepareTemplate(template);
      this.appendChild(element);
    }
    const templateStyle = this.templateStyle;
    if (templateStyle) {
      const style = document.createElement("style");
      style.textContent = this.prepareCSS(templateStyle);
      this.appendChild(style);
    }
    const userStyle = document.createElement("style");
    if (this.templateUserStyle) {
      userStyle.textContent = this.prepareCSS(this.templateUserStyle);
    }
    this.appendChild(userStyle);
    __privateSet2(this, _templateUserStyleElement, userStyle);
  }
  prepareTemplate(template) {
    const element = template.content.firstElementChild;
    return transformDOMClassAttributes(element.cloneNode(true), __privateGet2(this, _transform));
  }
  prepareCSS(css) {
    return transformCSSClassRules(css, __privateGet2(this, _transform));
  }
  updateTemplateUserStyle(style) {
    if (!__privateGet2(this, _templateUserStyleElement)) {
      return;
    }
    __privateGet2(this, _templateUserStyleElement).textContent = this.prepareCSS(style);
  }
  querySelector(selectors) {
    return super.querySelector(transformClassSelectors(selectors, __privateGet2(this, _transform)));
  }
  querySelectorAll(selectors) {
    return super.querySelectorAll(transformClassSelectors(selectors, __privateGet2(this, _transform)));
  }
  addEventListener(type, listener, options) {
    super.addEventListener(type, listener, options);
  }
  removeEventListener(type, listener, options) {
    super.removeEventListener(type, listener, options);
  }
  dispatchEvent(event) {
    return super.dispatchEvent(event);
  }
};
_seed = /* @__PURE__ */ new WeakMap();
_templateUserStyleElement = /* @__PURE__ */ new WeakMap();
_transform = /* @__PURE__ */ new WeakMap();
var question_default = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 16A7 7 0 1 0 9 2a7 7 0 0 0 0 14ZM6.88 4.88a2.58 2.58 0 0 1 1.83-.75h1.08a2.58 2.58 0 0 1 2.59 2.58v.16c0 1-.53 1.94-1.4 2.46l-.56.34c-.27.16-.45.42-.52.71-.03.14-.14.25-.28.25H8.38a.23.23 0 0 1-.24-.25c.08-.91.59-1.74 1.38-2.21l.56-.34c.34-.2.54-.57.54-.96V6.7a.83.83 0 0 0-.83-.83H8.71a.83.83 0 0 0-.84.83v.18a.87.87 0 1 1-1.75 0V6.7c0-.69.28-1.34.76-1.83ZM10 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" fill="currentColor"/></svg>';
var marker_default = '<svg width="48" height="56" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#a)"><path d="m24 50.4 13.79-14.12a18.82 18.82 0 0 0 4.23-20.86 19.23 19.23 0 0 0-7.19-8.6 19.76 19.76 0 0 0-21.66 0c-3.21 2.11-5.71 5.1-7.19 8.6a18.82 18.82 0 0 0 4.23 20.86L24 50.4Z" fill="currentColor"/><path d="M37.26 35.75 24 49.34 10.75 35.76l-.01-.01A18.07 18.07 0 0 1 6.68 15.7a18.48 18.48 0 0 1 6.9-8.26 19 19 0 0 1 20.84 0 18.48 18.48 0 0 1 6.9 8.26 18.07 18.07 0 0 1-4.06 20.04Z" stroke="#fff" stroke-width="1.5"/></g><circle cx="24" cy="22.45" fill="#fff" r="5.85"/><defs><filter id="a" x=".5" y=".6" width="47" height="54.8" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="1"/><feGaussianBlur stdDeviation="2"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_17_871"/><feBlend in="SourceGraphic" in2="effect1_dropShadow_17_871" result="shape"/></filter></defs></svg>';
var street_default = '<svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M1.08 14.94 5.625 3.06h1.17l-3.42 11.88H1.08Zm15.885 0L12.42 3.06h-1.17l3.42 11.88h2.295Zm-6.86-1.44H7.946l.128-2.61h1.912l.119 2.61Zm-.217-4.77H8.181l.088-1.8h1.537l.082 1.8ZM9.74 5.49h-1.4l.049-.99h1.306l.045.99Z" fill="currentColor" />\n</svg>';
var addressMarker_default = `<!-- TODO: I'm not sure if the way I added the circle will "scale" properly, need to check that -->
<svg width="24" height="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
  <path fill="none" stroke="currentColor" stroke-width="1.5" d="M4 7a5 5 0 1 1 10 0c0 3.025-3.28 6.713-5 9-1.72-2.287-5-5.975-5-9z"></path>
    <circle cx="9" cy="7" r="2" fill="currentColor"></circle>
</svg>`;
var search_default = '<svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">\n  <path d="M7.4 2.5c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9c1 0 1.8-.2 2.5-.8l3.7 3.7c.2.2.4.3.8.3.7 0 1.1-.4 1.1-1.1 0-.3-.1-.5-.3-.8L11.4 10c.4-.8.8-1.6.8-2.5.1-2.8-2.1-5-4.8-5zm0 1.6c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.3-1.3-3.3-3.1 1.4-3.3 3.3-3.3z"/>\n</svg>';
var version = "1.0.0-beta.19";
var styleToggleSatelliteImg = `https://api.mapbox.com/search-js/v${version}/img/style-toggle-satellite.jpg`;
var styleToggleDefaultImg = `https://api.mapbox.com/search-js/v${version}/img/style-toggle-default.jpg`;
var MOBILE_BREAKPOINT = 768 - 1;
var MOBILE_MEDIA_QUERY = `@media only screen and (max-width: ${MOBILE_BREAKPOINT}px)`;
var DEFAULT_THEME = {
  variables: {
    unit: ["mobile", "16px", "14px"],
    unitHeader: ["mobile", "24px", "18px"],
    minWidth: "min(300px, 100vw)",
    spacing: "0.75em",
    padding: "0.5em 0.75em",
    paddingFooterLabel: "0.5em 0.75em",
    paddingModal: "1.25em",
    colorText: "rgba(0, 0, 0, 0.75)",
    colorPrimary: "#4264FB",
    colorSecondary: "#667F91",
    colorBackground: "#fff",
    colorBackgroundHover: "#f5f5f5",
    colorBackgroundActive: "#f0f0f0",
    colorBackdrop: "rgba(102, 127, 145, 0.3)",
    border: "none",
    borderRadius: "4px",
    boxShadow: `
      0 0 10px 2px rgba(0, 0, 0, 0.05),
      0 0 6px 1px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(0, 0, 0, 0.1)
    `,
    lineHeight: "1.2em",
    fontFamily: `
      -apple-system, BlinkMacSystemFont,
      avenir next, avenir,
      segoe ui,
      helvetica neue, helvetica,
      Ubuntu, roboto, noto, arial, sans-serif
    `,
    fontWeight: "normal",
    fontWeightSemibold: "600",
    fontWeightBold: "bold",
    duration: "150ms",
    curve: "ease-out"
  },
  icons: {
    close: close_default,
    question: question_default,
    marker: marker_default,
    street: street_default,
    addressMarker: addressMarker_default,
    search: search_default
  },
  images: {
    styleToggleDefault: styleToggleDefaultImg,
    styleToggleSatellite: styleToggleSatelliteImg
  }
};
function getThemeCSS(rootSelector, theme = {}) {
  const variables = __spreadValues2(__spreadValues2({}, DEFAULT_THEME.variables), theme.variables || {});
  let cssText = theme.cssText || "";
  let rootVariables = "";
  for (const [key, value] of Object.entries(variables)) {
    if (!Array.isArray(value)) {
      rootVariables += `--${key}: ${value};`;
      continue;
    }
    if (value[0] !== "mobile") {
      const valueStr = JSON.stringify(value);
      throw new Error(`Unsupported expression in theme variables: ${key} ${valueStr}`);
    }
    const [, mobileValue, desktopValue] = value;
    cssText += `${MOBILE_MEDIA_QUERY} { ${rootSelector} { --${key}: ${mobileValue} !important; } }`;
    rootVariables += `--${key}: ${desktopValue};`;
  }
  return cssText + `${rootSelector} { ${rootVariables} }`;
}
function getIcon(iconName, theme = {}) {
  const icons = __spreadValues2(__spreadValues2({}, DEFAULT_THEME.icons), theme.icons || {});
  const svgString = icons[iconName];
  return svgString;
}
function getImage(imageName, theme = {}) {
  const images = __spreadValues2(__spreadValues2({}, DEFAULT_THEME.images), theme.images || {});
  const imgString = images[imageName];
  return imgString;
}
var _options;
var _defaultOptions;
var Popover = class {
  constructor(referenceEl, floatingEl, options) {
    __privateAdd2(this, _options, void 0);
    __privateAdd2(this, _defaultOptions, {
      placement: "bottom-start",
      flip: false,
      offset: 10
    });
    this.update = () => __async2(this, null, function* () {
      const config2 = {
        placement: this.options.placement,
        middleware: [
          offset(this.options.offset),
          this.options.flip && flip()
        ].filter(Boolean)
      };
      const { x, y } = yield computePosition2(this.referenceEl, this.floatingEl, config2);
      Object.assign(this.floatingEl.style, {
        left: `${x}px`,
        top: `${y}px`
      });
    });
    this.referenceEl = referenceEl;
    this.floatingEl = floatingEl;
    __privateSet2(this, _options, __spreadValues2(__spreadValues2({}, __privateGet2(this, _defaultOptions)), options));
    this.destroy = autoUpdate(this.referenceEl, this.floatingEl, this.update);
  }
  get options() {
    return __privateGet2(this, _options);
  }
  set options(newOptions) {
    __privateSet2(this, _options, __spreadValues2(__spreadValues2({}, __privateGet2(this, _options)), newOptions));
  }
};
_options = /* @__PURE__ */ new WeakMap();
_defaultOptions = /* @__PURE__ */ new WeakMap();
var style_default = "*{box-sizing:border-box!important}[role=button]{cursor:pointer}.MapboxSearch{--width:0;display:none}.Results{background-color:var(--colorBackground);border:var(--border);border-radius:var(--borderRadius);box-shadow:var(--boxShadow);color:var(--colorText);font-family:var(--fontFamily);font-size:var(--unit);font-weight:var(--fontWeight);line-height:var(--lineHeight);min-width:var(--minWidth);overflow-y:auto;position:absolute;transform:translateZ(0);transition:visibility var(--duration);width:var(--width);z-index:1000}.Results:not([aria-hidden=true]){visibility:visible}.Results[aria-hidden=true]{animation:fadein var(--duration) var(--curve) reverse forwards;visibility:hidden}.Suggestion{align-items:center;display:flex;padding:var(--padding)}.Suggestion:hover{cursor:pointer}.Suggestion[aria-selected=true]{background-color:var(--colorBackgroundHover)}.Suggestion:active{background-color:var(--colorBackgroundActive)}.SuggestionName{font-weight:var(--fontWeightBold)}.SuggestionIcon{margin-right:6px}.SuggestionIcon[aria-hidden=true]{display:none}.ResultsAttribution{padding:var(--paddingFooterLabel)}.ResultsAttribution a{color:var(--colorSecondary)}.ResultsAttribution a:not(:hover){text-decoration:none}.ResultsList{list-style:none;margin:0;padding:0}.Label{display:none}.SearchBox{background-color:var(--colorBackground);border:var(--border);border-radius:var(--borderRadius);box-shadow:var(--boxShadow);color:var(--colorText);font-family:var(--fontFamily);font-size:var(--unit);font-weight:var(--fontWeight);line-height:var(--lineHeight);padding:var(--padding);padding-bottom:0;padding-top:0;position:relative;width:100%}.SearchIcon{fill:#757575;left:.5em}.ActionIcon,.SearchIcon{bottom:0;height:20px;margin:auto 0;position:absolute;top:0;width:20px}.ActionIcon{right:.5em}.ActionIcon>button{background:none;border:none;color:inherit;cursor:pointer;font:inherit;height:100%;outline:inherit;padding:0;width:100%}.ActionIcon>button:hover{background:none!important}.ClearBtn{display:none}.ClearBtn:hover{color:#909090}.LoadingIcon{-moz-animation:rotate .8s cubic-bezier(.45,.05,.55,.95) infinite;-webkit-animation:rotate .8s cubic-bezier(.45,.05,.55,.95) infinite;animation:rotate .8s cubic-bezier(.45,.05,.55,.95) infinite;display:none;height:100%}@-webkit-keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes rotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.Input{background-color:transparent;border:0;color:#404040;color:rgba(0,0,0,.75);font:inherit;height:36px;margin:0;overflow:hidden;padding:0 40px;text-overflow:ellipsis;white-space:nowrap;width:100%}.Input::-ms-clear{display:none}.Input:focus{border:thin dotted;border-radius:var(--borderRadius);box-shadow:none;color:#404040;color:rgba(0,0,0,.75);outline:0}mapbox-address-confirmation-feature[aria-hidden=true],mapbox-address-confirmation-no-feature[aria-hidden=true]{display:none}.MapboxAddressConfirmation{align-items:center;background-color:var(--colorBackdrop);bottom:0;display:flex;justify-content:center;left:0;position:fixed;right:0;top:0;transform:translateZ(0);z-index:1000}.MapboxAddressConfirmation:not([aria-hidden=true]){animation:fadein var(--duration) var(--curve) forwards;visibility:visible}.MapboxAddressConfirmation[aria-hidden=true]{visibility:hidden}.ContentFeature,.ContentNoFeature{width:var(--minWidth)}.Modal{background-color:var(--colorBackground);border:var(--border);border-radius:var(--borderRadius);box-shadow:var(--boxShadow);color:var(--colorText);font-family:var(--fontFamily);font-size:var(--unit);font-weight:var(--fontWeight);line-height:var(--lineHeight);padding:var(--paddingModal);width:100%}@media screen and (max-width:480px){.MapboxAddressConfirmation{align-items:flex-end}.ContentFeature,.ContentNoFeature{width:100%}.Modal{border-bottom-left-radius:0;border-bottom-right-radius:0}}.ModalHeader{align-items:center;color:var(--colorPrimary);display:flex;font-size:var(--unitHeader);font-weight:var(--fontWeightBold);margin-bottom:var(--spacing);user-select:none;width:100%}.ModalMap{height:calc(var(--minWidth)*9/16);margin-left:calc(var(--paddingModal)*-1);width:calc(100% + var(--paddingModal)*2)}.ModalMap[aria-hidden=true]{display:none}.Icon{height:var(--unitHeader);width:var(--unitHeader)}.Icon.IconClose{color:var(--colorSecondary)}.ModalHeaderTitle{flex:1;margin-left:.25em}.ModalFooter{color:var(--colorSecondary);margin-top:var(--spacing);text-align:center}.ModalFooter[aria-hidden=true]{display:none}.ModalSubheader{font-weight:var(--fontWeightBold);user-select:none}.ModalDescription{color:var(--colorPrimary)}.ModalAddress,.ModalSubheader{margin-bottom:var(--spacing)}.ModalAddress.ModalAddressApprove{color:var(--colorPrimary)}.Button{border-radius:var(--borderRadius);cursor:pointer;font-weight:var(--fontWeightSemibold);margin-top:var(--spacing);padding:var(--padding);text-align:center;user-select:none;width:100%}.Button[aria-hidden=true]{display:none}.Button.ButtonPrimary{background-color:var(--colorPrimary);color:var(--colorBackground)}.Button.ButtonSecondary{border:1px solid var(--colorSecondary);color:var(--colorSecondary)}@keyframes fadein{0%{opacity:0}to{opacity:1}}.MapboxAddressMinimap{font-family:var(--fontFamily);font-size:var(--unit);font-weight:var(--fontWeight);line-height:var(--lineHeight)}.MapboxAddressMinimap[aria-hidden=true]{display:none}.MinimapImageContainer{border-radius:var(--borderRadius);overflow:hidden}.MinimapImage{height:unset;max-height:unset;max-width:unset;position:relative;width:unset}.MinimapInnerFrame{border:var(--border);border-radius:inherit;height:inherit;left:0;overflow:hidden;position:absolute;top:0;width:inherit}.MinimapMarker{left:50%;position:absolute;top:50%}.MinimapMarker>svg{color:var(--colorPrimary);display:block!important}.MinimapAttributionLogo{bottom:0;left:0;margin:0 0 6px 6px;position:absolute}.MinimapAttributionLogo a{cursor:pointer;display:block;height:23px;width:88px}.MinimapAttributionText{background-color:hsla(0,0%,100%,.65);bottom:0;font:11px/16px Helvetica Neue,Arial,Helvetica,sans-serif;padding:0 5px;position:absolute;right:0}.MinimapAttributionText a{color:rgba(0,0,0,.75);text-decoration:none}.MinimapAttributionText a:hover{color:inherit;text-decoration:underline}.MinimapAttributionText a:not(:first-child){margin-left:3px}.MinimapStyleToggle{background-position:0;background-repeat:no-repeat;background-size:contain;border:2px solid #fff;border-radius:3px;box-shadow:var(--boxShadow);cursor:pointer;height:2em;position:absolute;right:var(--spacing);top:var(--spacing);width:2em}.MinimapFooter{color:var(--colorSecondary);font-family:var(--fontFamily);font-size:var(--unit);margin-top:var(--spacing)}.MinimapFooter[aria-hidden=true]{display:none}.MinimapEditButtons{bottom:26px;display:flex;font-family:var(--fontFamily);position:absolute;right:var(--spacing)}.MinimapEditButtons .Button{box-shadow:var(--boxShadow)}.MinimapButtonCancel{background-color:var(--colorBackground);margin-left:var(--spacing)}.draggable{cursor:move;cursor:grab}.draggable:active{cursor:grabbing}";
var MapboxHTMLEvent = class extends CustomEvent {
  constructor(type, detail) {
    super(type, {
      composed: true,
      detail
    });
  }
  clone(newTarget) {
    const eventClone = new MapboxHTMLEvent(this.type, this.detail);
    if (newTarget) {
      Object.defineProperty(eventClone, "target", { value: newTarget });
    }
    return eventClone;
  }
};
var LENGTH_MESSAGE = "Type in 2 or more characters for results.";
var KEYBOARD_NAVIGATION_GUIDE_MESSAGE = "When autocomplete results are available use up and down arrows to review and enter to select. Touch device users, explore by touch or with swipe gestures.";
var NO_SEARCH_RESULTS_MESSAGE = "No search results.";
var getSuggestionSelectedMessage = (address, numberOfResults, currentIndex) => `${numberOfResults} ${numberOfResults === 1 ? "result is" : "results are"} available. ${address}. ${currentIndex} of ${numberOfResults} is selected.`;
var getSuggestionsReadyMessage = (numberOfResults) => `${numberOfResults} ${numberOfResults === 1 ? "result is" : "results are"} available. Use up and down arrows to review and enter to select. Touch device users, explore by touch or with swipe gestures.`;
function ariaButtonKeyDown(e) {
  const el = e.currentTarget;
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    e.stopPropagation();
    el.dispatchEvent(new MouseEvent("click", {
      bubbles: true,
      composed: true
    }));
  }
}
var ARIA_DESCRIPTION_ID = "search-listbox__description";
var createAriaLiveElement = (seed) => {
  const container = document.createElement("div");
  container.setAttribute("aria-live", "polite");
  container.setAttribute("aria-atomic", "true");
  container.setAttribute("role", "status");
  container.setAttribute("style", "border: 0px;clip: rect(0px, 0px, 0px, 0px);height: 1px;margin-bottom: -1px;margin-right: -1px;overflow: hidden;padding: 0px;position: absolute;white-space: nowrap;width: 1px;");
  const description = document.createElement("div");
  description.setAttribute("id", `${seed}--${ARIA_DESCRIPTION_ID}`);
  container.appendChild(description);
  return container;
};
var setLiveRegionMessage = (message, seed) => {
  var _a;
  const description = (_a = document.body.querySelector(`[id="${seed}--${ARIA_DESCRIPTION_ID}"]`)) != null ? _a : null;
  if (description) {
    description.textContent = message;
  }
};
var suppressExtensionsAutocomplete = (input) => {
  input.name = input.name + " address-search";
  input.setAttribute("data-lpignore", "true");
};
var getAriaMessage = (searchValue, suggestions, selectedIndex) => {
  let ariaMessage = null;
  const noResults = !suggestions || suggestions.length === 0;
  if ((searchValue == null ? void 0 : searchValue.length) < 2) {
    ariaMessage = LENGTH_MESSAGE + " " + KEYBOARD_NAVIGATION_GUIDE_MESSAGE;
  } else if (noResults) {
    ariaMessage = NO_SEARCH_RESULTS_MESSAGE;
  } else if (selectedIndex !== void 0) {
    const suggestion = suggestions[selectedIndex];
    const placeName = suggestion.address || suggestion.full_address || suggestion.feature_name;
    ariaMessage = getSuggestionSelectedMessage(placeName, suggestions.length, selectedIndex + 1);
  } else {
    ariaMessage = getSuggestionsReadyMessage(suggestions.length);
  }
  return ariaMessage;
};
var getSuggestionTitle = (item, service) => {
  switch (service) {
    case 0:
      return item.address_line1 || item.matching_name || item.feature_name;
    case 3:
      return item.name;
    case 1:
      return item.place_name.split(",")[0];
    default:
      return "";
  }
};
var buildSuggestionDescription = (item, service) => {
  switch (service) {
    case 0:
      return item.description;
    case 3:
      if (item.feature_type === "poi") {
        return item.full_address;
      }
      return item.place_formatted;
    case 1:
      return item.place_name.split(",").splice(1).join(",").trim();
    default:
      return "";
  }
};
function getAriaIdForSuggestion(resultListId, i) {
  return `${resultListId}-${i}`;
}
var _popover;
var _binding;
var _labelID;
var _resultListID;
var _inputInternal;
var _searchService;
var _selectedIndexInternal;
var _showResults;
var showResults_fn;
var _renderResultsList;
var renderResultsList_fn;
var _themeInternal;
var _popoverOptions;
var _handleInput;
var _handleSelect;
var _handleFocus;
var _handleBlur;
var _handleKeyDown;
var MapboxSearchListbox = class extends HTMLScopedElement {
  constructor() {
    super(...arguments);
    __privateAdd2(this, _showResults);
    __privateAdd2(this, _renderResultsList);
    this.suggestions = null;
    __privateAdd2(this, _popover, null);
    __privateAdd2(this, _binding, void 0);
    __privateAdd2(this, _labelID, void 0);
    __privateAdd2(this, _resultListID, void 0);
    __privateAdd2(this, _inputInternal, void 0);
    __privateAdd2(this, _searchService, null);
    __privateAdd2(this, _selectedIndexInternal, void 0);
    __privateAdd2(this, _themeInternal, {});
    __privateAdd2(this, _popoverOptions, {});
    __privateAdd2(this, _handleInput, (e) => {
      const { Results } = __privateGet2(this, _binding);
      const input = e.target;
      if (input.dataset["mapboxSuccess"]) {
        delete input.dataset["mapboxSuccess"];
        return;
      }
      const searchText = input.value;
      this.renderAriaMessage();
      Results.setAttribute("aria-busy", "true");
      this.dispatchEvent(new MapboxHTMLEvent("input", searchText));
    });
    this.renderAriaMessage = () => {
      var _a;
      const message = getAriaMessage((_a = this.input) == null ? void 0 : _a.value, this.suggestions, this.selectedIndex);
      setLiveRegionMessage(message, this.dataset.seed);
    };
    this.clearAriaMessage = () => {
      setLiveRegionMessage("", this.dataset.seed);
    };
    this.handleSuggest = (suggestions) => {
      this.suggestions = suggestions;
      if (!suggestions || suggestions.length === 0) {
        this.renderAriaMessage();
      }
      if (!suggestions) {
        this.hideResults();
        return;
      }
      __privateMethod2(this, _renderResultsList, renderResultsList_fn).call(this);
      if (suggestions.length) {
        __privateMethod2(this, _showResults, showResults_fn).call(this);
      }
      const { Results } = __privateGet2(this, _binding);
      Results.setAttribute("aria-busy", "false");
    };
    this.handleError = () => {
      const { Results } = __privateGet2(this, _binding);
      Results.setAttribute("aria-busy", "false");
      this.hideResults();
    };
    __privateAdd2(this, _handleSelect, (suggestion) => __async2(this, null, function* () {
      const input = this.input;
      if (input) {
        input.dataset["mapboxSuccess"] = "true";
      }
      this.dispatchEvent(new MapboxHTMLEvent("select", suggestion));
      this.hideResults();
    }));
    __privateAdd2(this, _handleFocus, () => {
      const input = this.input;
      delete input.dataset["mapboxSuccess"];
      this.dispatchEvent(new MapboxHTMLEvent("focus"));
      this.renderAriaMessage();
      __privateMethod2(this, _showResults, showResults_fn).call(this);
    });
    __privateAdd2(this, _handleBlur, () => {
      if (document.activeElement === this.input) {
        return;
      }
      this.dispatchEvent(new MapboxHTMLEvent("blur"));
      this.clearAriaMessage();
      this.hideResults();
    });
    this.handleArrowUp = () => {
      if (this.selectedIndex === void 0) {
        this.selectedIndex = this.suggestions.length - 1;
      } else if (this.selectedIndex === 0) {
        this.selectedIndex = void 0;
      } else {
        this.selectedIndex = Math.max(0, this.selectedIndex - 1);
      }
    };
    this.handleArrowDown = () => {
      if (this.selectedIndex === void 0) {
        this.selectedIndex = 0;
      } else if (this.selectedIndex === this.suggestions.length - 1) {
        this.selectedIndex = void 0;
      } else {
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.suggestions.length - 1);
      }
    };
    __privateAdd2(this, _handleKeyDown, (e) => {
      var _a;
      if (!((_a = this.suggestions) == null ? void 0 : _a.length))
        return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        this.handleArrowDown();
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        this.handleArrowUp();
        return;
      }
      if (e.key === "Escape") {
        this.hideResults();
        return;
      }
      if (this.selectedIndex === void 0) {
        return;
      }
      if (e.key === "Tab") {
        __privateGet2(this, _handleSelect).call(this, this.suggestions[this.selectedIndex]);
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        __privateGet2(this, _handleSelect).call(this, this.suggestions[this.selectedIndex]);
        return;
      }
    });
  }
  get template() {
    return LISTBOX_TEMPLATE;
  }
  get templateStyle() {
    return style_default;
  }
  get templateUserStyle() {
    return getThemeCSS(".MapboxSearch", this.theme);
  }
  get input() {
    return __privateGet2(this, _inputInternal);
  }
  set input(newInput) {
    const oldInput = __privateGet2(this, _inputInternal);
    if (oldInput) {
      oldInput.removeEventListener("input", __privateGet2(this, _handleInput));
      oldInput.removeEventListener("focus", __privateGet2(this, _handleFocus));
      oldInput.removeEventListener("blur", __privateGet2(this, _handleBlur));
      oldInput.removeEventListener("keydown", __privateGet2(this, _handleKeyDown));
      if (__privateGet2(this, _popover)) {
        __privateGet2(this, _popover).destroy();
      }
    }
    if (newInput) {
      newInput.addEventListener("input", __privateGet2(this, _handleInput));
      newInput.addEventListener("focus", __privateGet2(this, _handleFocus));
      newInput.addEventListener("blur", __privateGet2(this, _handleBlur));
      newInput.addEventListener("keydown", __privateGet2(this, _handleKeyDown));
      newInput.setAttribute("role", "combobox");
      newInput.setAttribute("aria-autocomplete", "list");
      newInput.setAttribute("aria-controls", __privateGet2(this, _resultListID));
      if (this.isConnected) {
        __privateSet2(this, _popover, new Popover(newInput, __privateGet2(this, _binding).Results, this.popoverOptions));
      }
    }
    __privateSet2(this, _inputInternal, newInput);
  }
  get searchService() {
    return __privateGet2(this, _searchService);
  }
  set searchService(service) {
    __privateSet2(this, _searchService, service);
  }
  get selectedIndex() {
    return __privateGet2(this, _selectedIndexInternal);
  }
  set selectedIndex(newIndex) {
    const oldIndex = __privateGet2(this, _selectedIndexInternal);
    __privateSet2(this, _selectedIndexInternal, newIndex);
    const { ResultsList } = __privateGet2(this, _binding);
    const id = getAriaIdForSuggestion(__privateGet2(this, _resultListID), newIndex);
    if (newIndex !== void 0) {
      this.input.setAttribute("aria-activedescendant", id);
      ResultsList.setAttribute("aria-activedescendant", id);
    } else {
      this.input.removeAttribute("aria-activedescendant");
      ResultsList.removeAttribute("aria-activedescendant");
    }
    if (oldIndex !== newIndex) {
      const oldId = getAriaIdForSuggestion(__privateGet2(this, _resultListID), oldIndex);
      const oldEl = ResultsList.querySelector(`#${oldId}`);
      oldEl == null ? void 0 : oldEl.removeAttribute("aria-selected");
      oldEl == null ? void 0 : oldEl.setAttribute("tabindex", "-1");
      if (newIndex !== void 0) {
        const el = ResultsList.querySelector(`#${id}`);
        el == null ? void 0 : el.setAttribute("aria-selected", "true");
        el == null ? void 0 : el.setAttribute("tabindex", "0");
      }
    }
    this.renderAriaMessage();
  }
  hideResults() {
    const { Results, ResultsList } = __privateGet2(this, _binding);
    Results.setAttribute("aria-hidden", "true");
    this.input.setAttribute("aria-expanded", "false");
    ResultsList.removeAttribute("aria-activedescendant");
    this.input.removeAttribute("aria-activedescendant");
  }
  renderItem(i) {
    const element = this.prepareTemplate(LISTBOX_SUGGESTION_TEMPLATE);
    element.id = getAriaIdForSuggestion(__privateGet2(this, _resultListID), i);
    return element;
  }
  fillItem(el, item, i, totalLength) {
    const iconEl = el.querySelector('[class$="SuggestionIcon"]');
    const nameEl = el.querySelector('[class$="SuggestionName"]');
    const descriptionEl = el.querySelector('[class$="SuggestionDesc"]');
    if (this.searchService === 0) {
      iconEl.innerHTML = getIcon(item.accuracy === "street" ? "street" : "addressMarker", this.theme);
      iconEl.removeAttribute("aria-hidden");
    } else {
      iconEl.setAttribute("aria-hidden", "true");
    }
    nameEl.textContent = descriptionEl.textContent = "";
    nameEl.textContent = getSuggestionTitle(item, this.searchService);
    descriptionEl.textContent = buildSuggestionDescription(item, this.searchService);
    if (i === this.selectedIndex) {
      el.setAttribute("aria-selected", "true");
    } else {
      el.removeAttribute("aria-selected");
    }
    el.setAttribute("aria-posinset", (i + 1).toString());
    el.setAttribute("aria-setsize", totalLength.toString());
  }
  get theme() {
    return __privateGet2(this, _themeInternal);
  }
  set theme(theme) {
    __privateSet2(this, _themeInternal, theme);
    if (!__privateGet2(this, _binding) || !theme) {
      return;
    }
    this.updateTemplateUserStyle(getThemeCSS(".MapboxSearch", theme));
  }
  get popoverOptions() {
    return __privateGet2(this, _popoverOptions);
  }
  set popoverOptions(newOptions) {
    __privateSet2(this, _popoverOptions, newOptions);
    if (__privateGet2(this, _popover)) {
      __privateGet2(this, _popover).options = newOptions;
      __privateGet2(this, _popover).update();
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.dataSeed = this.dataset.seed;
    __privateSet2(this, _labelID, this.dataset.seed + "-Label");
    __privateSet2(this, _resultListID, this.dataset.seed + "-ResultsList");
    if (this.input) {
      this.input.setAttribute("aria-controls", __privateGet2(this, _resultListID));
    }
    __privateSet2(this, _binding, bindElements(this, {
      MapboxSearch: ".MapboxSearch",
      Results: ".Results",
      ResultsList: ".ResultsList",
      Label: ".Label"
    }));
    const { Results, ResultsList, Label } = __privateGet2(this, _binding);
    Label.id = __privateGet2(this, _labelID);
    ResultsList.id = __privateGet2(this, _resultListID);
    ResultsList.setAttribute("aria-labelledby", __privateGet2(this, _labelID));
    Results.addEventListener("blur", __privateGet2(this, _handleBlur));
    if (!__privateGet2(this, _popover) && this.input) {
      __privateSet2(this, _popover, new Popover(this.input, __privateGet2(this, _binding).Results, this.popoverOptions));
    }
    requestAnimationFrame(() => {
      if (__privateGet2(this, _popover)) {
        __privateGet2(this, _popover).update();
      }
    });
  }
  disconnectedCallback() {
    this.input = null;
    const { Results } = __privateGet2(this, _binding);
    Results.removeEventListener("blur", __privateGet2(this, _handleBlur));
    if (__privateGet2(this, _popover))
      __privateGet2(this, _popover).destroy();
  }
  focus() {
    if (document.activeElement === this.input) {
      __privateGet2(this, _handleFocus).call(this);
    } else {
      this.input.focus();
    }
  }
  blur() {
    this.input.blur();
  }
  updatePopover() {
    if (__privateGet2(this, _popover)) {
      __privateGet2(this, _popover).update();
    }
  }
};
_popover = /* @__PURE__ */ new WeakMap();
_binding = /* @__PURE__ */ new WeakMap();
_labelID = /* @__PURE__ */ new WeakMap();
_resultListID = /* @__PURE__ */ new WeakMap();
_inputInternal = /* @__PURE__ */ new WeakMap();
_searchService = /* @__PURE__ */ new WeakMap();
_selectedIndexInternal = /* @__PURE__ */ new WeakMap();
_showResults = /* @__PURE__ */ new WeakSet();
showResults_fn = function() {
  if (!this.suggestions || !this.suggestions.length) {
    return;
  }
  const { Results, MapboxSearch } = __privateGet2(this, _binding);
  const rect = this.input.getBoundingClientRect();
  MapboxSearch.style.setProperty("--width", `${rect.width}px`);
  MapboxSearch.style.setProperty("display", "block");
  this.input.setAttribute("aria-expanded", "true");
  Results.removeAttribute("aria-hidden");
  this.selectedIndex = void 0;
};
_renderResultsList = /* @__PURE__ */ new WeakSet();
renderResultsList_fn = function() {
  const { ResultsList } = __privateGet2(this, _binding);
  if (!this.suggestions || !this.suggestions.length) {
    ResultsList.innerHTML = "";
    this.hideResults();
    return;
  }
  const elements = getChildElements(ResultsList);
  if (this.suggestions.length > elements.length) {
    for (let i = elements.length; i < this.suggestions.length; i++) {
      const item = this.renderItem(i);
      elements.push(item);
      item.onmouseenter = () => {
        this.selectedIndex = i;
      };
      item.onmouseleave = () => {
        this.selectedIndex = void 0;
      };
      ResultsList.appendChild(item);
    }
  }
  if (this.suggestions.length < elements.length) {
    for (let i = this.suggestions.length; i < elements.length; i++) {
      elements[i].remove();
    }
  }
  for (const suggestion of this.suggestions) {
    const i = this.suggestions.indexOf(suggestion);
    const element = elements[i];
    this.fillItem(element, suggestion, i, this.suggestions.length);
    element.onclick = () => {
      __privateGet2(this, _handleSelect).call(this, suggestion);
    };
  }
};
_themeInternal = /* @__PURE__ */ new WeakMap();
_popoverOptions = /* @__PURE__ */ new WeakMap();
_handleInput = /* @__PURE__ */ new WeakMap();
_handleSelect = /* @__PURE__ */ new WeakMap();
_handleFocus = /* @__PURE__ */ new WeakMap();
_handleBlur = /* @__PURE__ */ new WeakMap();
_handleKeyDown = /* @__PURE__ */ new WeakMap();
window.MapboxSearchListbox = MapboxSearchListbox;
if (!window.customElements.get("mapbox-search-listbox")) {
  customElements.define("mapbox-search-listbox", MapboxSearchListbox);
}
var AUTOFILL_TOKENS = /* @__PURE__ */ new Set([
  "street-address",
  "address-line1",
  "address-line2",
  "address-line3",
  "address-level4",
  "address-level3",
  "address-level2",
  "address-level1",
  "country",
  "country-name",
  "postal-code"
]);
var AUTOFILL_SKIP_TOKENS = /* @__PURE__ */ new Set(["off", "on", "true", "false"]);
function findParentForm(el) {
  let node = el.parentNode;
  while (node) {
    if (node instanceof HTMLFormElement) {
      return node;
    }
    node = node.parentNode;
  }
  return null;
}
function findAddressInputs(form) {
  const parent = form || document;
  return Array.from(parent.querySelectorAll('input[autocomplete~="address-line1"], input[autocomplete~="street-address"]'));
}
var SECTION = "section-";
var SECTION_DEFAULT = "section-default";
var SECTION_SHIPPING = "section-shipping";
var SECTION_BILLING = "section-billing";
function parseFormStructure(form) {
  const inputs = Array.from(form.querySelectorAll("[autocomplete]")).filter((el) => {
    const tagName = el.tagName.toLowerCase();
    return tagName === "input" || tagName === "select" || tagName === "textarea";
  });
  const res = [];
  for (const input of inputs) {
    if (!isVisible(input)) {
      continue;
    }
    const autocomplete = input.getAttribute("autocomplete") || "";
    if (!autocomplete || AUTOFILL_SKIP_TOKENS.has(autocomplete)) {
      continue;
    }
    const tokens = autocomplete.toLowerCase().split(" ");
    if (tokens.length > 3) {
      continue;
    }
    const field = tokens[tokens.length - 1];
    if (!AUTOFILL_TOKENS.has(field)) {
      continue;
    }
    tokens.pop();
    let section = SECTION_DEFAULT;
    if (tokens.length) {
      const sectionToken = tokens[tokens.length - 1];
      if (sectionToken === "shipping") {
        section = SECTION_SHIPPING;
        tokens.pop();
      }
      if (sectionToken === "billing") {
        section = SECTION_BILLING;
        tokens.pop();
      }
    }
    if (tokens.length) {
      const sectionToken = tokens[tokens.length - 1];
      if (sectionToken.startsWith(SECTION)) {
        section = sectionToken;
      }
    }
    res.push({
      input,
      section,
      field
    });
  }
  return res;
}
function findAddressAutofillInputs(form, ref) {
  const logicalSections = [];
  const logicalSectionSections = [];
  const formStructure = parseFormStructure(form);
  let foundSection = null;
  for (const { input, section, field } of formStructure) {
    let lastIndex = logicalSections.length - 1;
    let createNewSection = false;
    if (!logicalSections.length) {
      createNewSection = true;
    } else if (logicalSectionSections[lastIndex] !== section) {
      createNewSection = true;
    } else if (logicalSections[lastIndex][field]) {
      createNewSection = true;
    }
    if (createNewSection) {
      if (foundSection) {
        break;
      }
      logicalSections.push({
        [field]: input
      });
      logicalSectionSections.push(section);
      lastIndex++;
    } else {
      logicalSections[lastIndex][field] = input;
    }
    if (input === ref) {
      foundSection = logicalSections[lastIndex];
    }
  }
  return foundSection != null ? foundSection : {};
}
function setFormAutofillValues(form, ref, suggestion) {
  var _a;
  const map = findAddressAutofillInputs(form, ref);
  const streetAddress = [
    suggestion.address_line1,
    suggestion.address_line2,
    suggestion.address_line3
  ].filter((part) => Boolean(part)).join(", ");
  setValue(map["street-address"], streetAddress);
  setValue(map["address-line1"], suggestion.address_line1 || "");
  setValue(map["address-level1"], suggestion.address_level1 || "");
  setValue(map["address-level2"], suggestion.address_level2 || "");
  setValue(map["address-level3"], suggestion.address_level3 || "");
  const countryCode = suggestion.country_code || ((_a = suggestion.metadata) == null ? void 0 : _a.iso_3166_1) || "";
  if (map.country && map.country instanceof HTMLSelectElement) {
    let firstOption = map.country.querySelector(`option`).value;
    if (firstOption === "") {
      firstOption = map.country.querySelectorAll(`option`)[1].value;
    }
    const isUpperCase = firstOption === firstOption.toUpperCase();
    setValue(map["country"], isUpperCase ? countryCode.toUpperCase() : countryCode);
  } else {
    setValue(map["country"], countryCode);
  }
  setValue(map["country-name"], suggestion.country || "");
  setValue(map["postal-code"], suggestion.postcode || "");
}
function getFormAutofillValues(form, ref) {
  const map = findAddressAutofillInputs(form, ref);
  const values = {};
  for (const [key, input] of Object.entries(map)) {
    if (input == null ? void 0 : input.value) {
      values[key] = input.value;
    }
  }
  return values;
}
function getAutofillSearchText(snapshot) {
  const searchText = [];
  if (snapshot["street-address"]) {
    searchText.push(snapshot["street-address"]);
  } else {
    searchText.push(snapshot["address-line1"] || "");
    searchText.push(snapshot["address-line2"] || "");
    searchText.push(snapshot["address-line3"] || "");
  }
  searchText.push(snapshot["address-level3"] || "");
  searchText.push(snapshot["address-level2"] || "");
  searchText.push(snapshot["address-level1"] || "");
  searchText.push(snapshot["postal-code"] || "");
  if (snapshot["country-name"]) {
    searchText.push(snapshot["country-name"]);
  } else {
    searchText.push(snapshot["country"] || "");
  }
  return searchText.filter((part) => Boolean(part)).map((part) => part.trim()).join(", ");
}
function fillFormWithFeature(feature, input) {
  const form = findParentForm(input);
  if (!form) {
    return;
  }
  const suggestion = featureToSuggestion(feature);
  setFormAutofillValues(form, input, suggestion);
  const inputMap = findAddressAutofillInputs(form, input);
  if (inputMap["address-line2"]) {
    inputMap["address-line2"].focus();
  }
}
function featureToAutofillValueMap(feature) {
  var _a;
  const values = {};
  const streetAddress = [
    feature.properties.address_line1,
    feature.properties.address_line2,
    feature.properties.address_line3
  ].filter((part) => Boolean(part)).join(", ");
  values["street-address"] = streetAddress;
  values["address-line1"] = feature.properties.address_line1;
  values["address-line2"] = feature.properties.address_line2;
  values["address-line3"] = feature.properties.address_line3;
  values["address-level1"] = feature.properties.address_level1;
  values["address-level2"] = feature.properties.address_level2;
  values["address-level3"] = feature.properties.address_level3;
  values["country"] = (_a = feature.properties.metadata) == null ? void 0 : _a.iso_3166_1;
  values["country-name"] = feature.properties.country;
  values["postal-code"] = feature.properties.postcode;
  return values;
}
function checkAutofillValuesChanged(targetMap, referenceMap) {
  for (const [key, value] of Object.entries(targetMap)) {
    if (referenceMap[key] !== value)
      return true;
  }
  return false;
}
var distinctExactStreetResults = (suggestions) => {
  return suggestions.filter((item1, idx, arr) => {
    const title = getSuggestionTitle(
      item1,
      0
      /* AddressAutofill */
    );
    return item1.accuracy !== "street" || arr.findIndex((item2) => title === getSuggestionTitle(
      item2,
      0
      /* AddressAutofill */
    )) === idx;
  });
};
var toggleAutocompletion = (input, initialAutocompleteValue, enableBrowserAutocomplete) => {
  const disableValue = "new-password";
  const defaultFallbackValue = "address-line1";
  const autocompleteValue = enableBrowserAutocomplete ? initialAutocompleteValue || defaultFallbackValue : disableValue;
  if (input) {
    input.autocomplete = autocompleteValue;
  }
};
var handleStreetSelection = (input, initialAutocompleteValue, suggestion) => {
  if (!input || !suggestion) {
    return;
  }
  toggleAutocompletion(input, initialAutocompleteValue, true);
  const feature = {
    properties: __spreadProps2(__spreadValues2({}, suggestion), {
      address_line1: suggestion.address_line1 + " ",
      postcode: null
    })
  };
  fillFormWithFeature(feature, input);
  toggleAutocompletion(input, initialAutocompleteValue, false);
  input == null ? void 0 : input.focus();
};
var Config = class {
  constructor() {
    this.feedbackEnabled = true;
    this.autofillSessionToken = new SessionToken();
    this.autofillSessionEnabled = false;
    this.detectBrowserAutofillEnabled = false;
  }
};
var config = new Config();
Object.defineProperty(config, "autofillSessionToken", {
  configurable: false,
  writable: false
});
var TEMPLATE = createElementFromString(`
<template>
  <div class="MapboxAddressConfirmation" aria-hidden="true">
    <mapbox-address-confirmation-feature class="ContentFeature"></mapbox-address-confirmation-feature>
    <mapbox-address-confirmation-no-feature class="ContentNoFeature"></mapbox-address-confirmation-no-feature>
  </div>
</template>
`);
var _show;
var _binding2;
var _focusTrap;
var _themeInternal2;
var MapboxAddressConfirmation = class extends HTMLScopedElement {
  constructor() {
    super(...arguments);
    __privateAdd2(this, _show, false);
    __privateAdd2(this, _binding2, void 0);
    __privateAdd2(this, _focusTrap, void 0);
    __privateAdd2(this, _themeInternal2, {});
  }
  get template() {
    return TEMPLATE;
  }
  get templateStyle() {
    return style_default;
  }
  get templateUserStyle() {
    return getThemeCSS(".MapboxAddressConfirmation", this.theme);
  }
  get theme() {
    return __privateGet2(this, _themeInternal2);
  }
  set theme(theme) {
    __privateSet2(this, _themeInternal2, theme);
    if (!__privateGet2(this, _binding2) || !theme) {
      return;
    }
    this.updateTemplateUserStyle(getThemeCSS(".MapboxAddressConfirmation", theme));
    const { ContentFeature, ContentNoFeature } = __privateGet2(this, _binding2);
    ContentFeature.theme = theme;
    ContentNoFeature.theme = theme;
  }
  connectedCallback() {
    super.connectedCallback();
    __privateSet2(this, _binding2, bindElements(this, {
      MapboxAddressConfirmation: ".MapboxAddressConfirmation",
      ContentFeature: ".ContentFeature",
      ContentNoFeature: ".ContentNoFeature"
    }));
    const { MapboxAddressConfirmation: MapboxAddressConfirmation2 } = __privateGet2(this, _binding2);
    MapboxAddressConfirmation2.setAttribute("aria-hidden", "true");
    const theme = this.theme;
    if (theme) {
      const { ContentFeature, ContentNoFeature } = __privateGet2(this, _binding2);
      ContentFeature.theme = theme;
      ContentNoFeature.theme = theme;
    }
  }
  disconnectedCallback() {
    __privateSet2(this, _focusTrap, null);
  }
  hide() {
    var _a;
    __privateSet2(this, _show, false);
    if (!__privateGet2(this, _binding2)) {
      return;
    }
    const { MapboxAddressConfirmation: MapboxAddressConfirmation2 } = __privateGet2(this, _binding2);
    MapboxAddressConfirmation2.setAttribute("aria-hidden", "true");
    (_a = __privateGet2(this, _focusTrap)) == null ? void 0 : _a.deactivate();
    import_no_scroll.default.off();
  }
  show(autofillValues, optionsArg, feature) {
    return __async2(this, null, function* () {
      var _a;
      if (!__privateGet2(this, _binding2)) {
        return { type: "cancel" };
      }
      const { MapboxAddressConfirmation: MapboxAddressConfirmation2, ContentFeature, ContentNoFeature } = __privateGet2(this, _binding2);
      const { accessToken, minimap = false, theme, footer } = optionsArg;
      this.theme = theme;
      if (feature) {
        ContentFeature.removeAttribute("aria-hidden");
        ContentNoFeature.setAttribute("aria-hidden", "true");
        ContentFeature.minimap = minimap;
        ContentFeature.accessToken = accessToken;
        ContentFeature.footer = footer;
        ContentFeature.update(feature, autofillValues);
      } else {
        ContentFeature.setAttribute("aria-hidden", "true");
        ContentNoFeature.removeAttribute("aria-hidden");
        ContentNoFeature.update(autofillValues);
      }
      __privateSet2(this, _show, true);
      MapboxAddressConfirmation2.removeAttribute("aria-hidden");
      import_no_scroll.default.on();
      const activeContentElement = feature ? ContentFeature : ContentNoFeature;
      __privateSet2(this, _focusTrap, createFocusTrap(MapboxAddressConfirmation2, {
        fallbackFocus: activeContentElement,
        escapeDeactivates: () => {
          this.hide();
          return true;
        }
      }));
      (_a = __privateGet2(this, _focusTrap)) == null ? void 0 : _a.activate();
      return new Promise((resolve) => {
        const eventHost = activeContentElement;
        const fn = (e) => {
          eventHost.removeEventListener("result", fn);
          const result = e.detail;
          this.hide();
          if (result === "change") {
            resolve({
              type: "change",
              feature
            });
          } else {
            resolve({
              type: result
            });
          }
        };
        eventHost.addEventListener("result", fn);
      });
    });
  }
  tryShow(autofillValues, optionsArg) {
    return __async2(this, null, function* () {
      if (!__privateGet2(this, _binding2)) {
        return { type: "cancel" };
      }
      const { accessToken, options = {} } = optionsArg;
      const validate = new ValidationCore(__spreadValues2({
        accessToken
      }, options));
      const searchText = getAutofillSearchText(autofillValues);
      const featureCollection = yield validate.validate(searchText, {
        sessionToken: config.autofillSessionToken
      });
      const feature = featureCollection.features[0];
      if (feature) {
        const defaultValidation = (feature2) => feature2.properties.match_code.confidence === MatchCodeConfidence.exact;
        const { skipConfirmModal = defaultValidation } = optionsArg;
        if (skipConfirmModal(feature)) {
          return { type: "nochange" };
        }
      }
      return yield this.show(autofillValues, optionsArg, feature);
    });
  }
};
_show = /* @__PURE__ */ new WeakMap();
_binding2 = /* @__PURE__ */ new WeakMap();
_focusTrap = /* @__PURE__ */ new WeakMap();
_themeInternal2 = /* @__PURE__ */ new WeakMap();
window.MapboxAddressConfirmation = MapboxAddressConfirmation;
if (!window.customElements.get("mapbox-address-confirmation")) {
  customElements.define("mapbox-address-confirmation", MapboxAddressConfirmation);
}
var confirmation = new MapboxAddressConfirmation();
function confirmAddress(_0) {
  return __async2(this, arguments, function* (form, optionsArg = {}) {
    const { sections = [] } = optionsArg;
    if (!confirmation.parentNode) {
      document.body.appendChild(confirmation);
    }
    let collectedResult = { type: "nochange" };
    const inputs = findAddressInputs(form);
    const structure = parseFormStructure(form);
    const listboxComponents = Array.from(document.querySelectorAll("mapbox-search-listbox"));
    for (const input of inputs) {
      if (sections.length) {
        const structureRef = structure.find((s) => s.input === input);
        if (!structureRef) {
          continue;
        }
        if (!sections.includes(structureRef.section)) {
          continue;
        }
      }
      const autofillValues = getFormAutofillValues(form, input);
      const listbox = listboxComponents.find((lb) => lb.input === input);
      const autofill2 = listbox == null ? void 0 : listbox.autofillHost;
      if (autofill2) {
        const lastRetrievedFeature = autofill2.retrieveFeature;
        if (lastRetrievedFeature) {
          const snapshot = featureToAutofillValueMap(lastRetrievedFeature);
          if (!checkAutofillValuesChanged(autofillValues, snapshot)) {
            continue;
          }
        }
      }
      const accessToken = optionsArg.accessToken || config.accessToken;
      const result = yield confirmation.tryShow(autofillValues, __spreadProps2(__spreadValues2({}, optionsArg), {
        accessToken
      }));
      if (result.type === "change") {
        if (listbox) {
          autofill2.simulateRetrieve(result.feature);
        } else {
          input.dataset["mapboxSuccess"] = "true";
          const suggestion = featureToSuggestion(result.feature);
          setFormAutofillValues(form, input, suggestion);
        }
      }
      if (result.type === "change" && collectedResult.type !== "cancel") {
        collectedResult = result;
      }
      if (result.type === "cancel") {
        collectedResult = result;
      }
    }
    return collectedResult;
  });
}
function createAddressElement(autofillValues, baseAddress) {
  if (baseAddress) {
    const element = createElementFromString(`
        <span>
          <span></span>
          <br />
          <span></span>
        </span>
      `);
    const [firstLine, lastLine] = Array.from(element.querySelectorAll("span > span"));
    const parts = baseAddress.split(",");
    firstLine.textContent = parts[0].trim();
    lastLine.textContent = parts.slice(1).join(",").trim();
    if (autofillValues["address-line2"]) {
      const span = document.createElement("span");
      span.textContent = autofillValues["address-line2"];
      element.insertBefore(span, lastLine);
      element.insertBefore(document.createElement("br"), lastLine);
    }
    if (autofillValues["address-line3"]) {
      const span = document.createElement("span");
      span.textContent = autofillValues["address-line3"];
      element.insertBefore(span, lastLine);
      element.insertBefore(document.createElement("br"), lastLine);
    }
    return element;
  } else {
    const firstLine = autofillValues["street-address"] || autofillValues["address-line1"] || "";
    const line2 = autofillValues["address-line2"];
    const line3 = autofillValues["address-line3"];
    const lastLine = [
      autofillValues["address-level4"] || "",
      autofillValues["address-level3"] || "",
      autofillValues["address-level2"] || "",
      `${autofillValues["address-level1"] || ""} ${autofillValues["postal-code"] || ""}`,
      autofillValues.country || autofillValues["country-name"] || ""
    ].filter(Boolean).join(", ");
    const addressLines = [firstLine, line2, line3, lastLine].filter(Boolean);
    const addressLinesHtml = addressLines.map((val) => `<span>${val}</span>`).join("<br />");
    const element = createElementFromString(`
        <span>${addressLinesHtml}</span>
      `);
    return element;
  }
}
function tryConfirmBrowserAutofill(input, event, confirmOnBrowserAutofill, accessToken) {
  return __async2(this, null, function* () {
    if (!confirmOnBrowserAutofill)
      return;
    const parentForm = findParentForm(input);
    const formElements = Object.values(findAddressAutofillInputs(parentForm, input));
    if (!event.detail.elements.some((el) => formElements.includes(el))) {
      return;
    }
    const structure = parseFormStructure(parentForm);
    const structureRef = structure.find((s) => s.input === input);
    const autofillInstanceSection = structureRef.section;
    const browserAutofilledSections = Array.from(new Set(structure.filter((s) => event.detail.elements.includes(s.input)).map((s) => s.section)));
    if (!browserAutofilledSections.includes(autofillInstanceSection)) {
      return;
    }
    const optionsSections = typeof confirmOnBrowserAutofill === "object" && confirmOnBrowserAutofill.sections || [];
    if (optionsSections.length && !optionsSections.some((section) => browserAutofilledSections.includes(section))) {
      return;
    }
    let optionsArg = typeof confirmOnBrowserAutofill === "object" ? confirmOnBrowserAutofill : {};
    optionsArg = __spreadProps2(__spreadValues2({}, optionsArg), {
      accessToken,
      sections: [autofillInstanceSection]
    });
    yield confirmAddress(parentForm, optionsArg);
  });
}
var CONTRIBUTE_API_BASE_URL = "https://contribute-api.mapbox.com/v1";
var CONTRIBUTE_API_STAGING_BASE_URL = "https://contribute-api-staging.tilestream.net/v1";
var EDIT_SUGGESTION_ENDPOINT = "edit-suggestion";
function sendFeedback(accessToken, feedbackArgs) {
  if (!config.feedbackEnabled)
    return;
  const hostname = window.location.hostname;
  const BASE_URL = isLocalServer(hostname) || isMapboxDomain(hostname) ? CONTRIBUTE_API_STAGING_BASE_URL : CONTRIBUTE_API_BASE_URL;
  const url = `${BASE_URL}/${EDIT_SUGGESTION_ENDPOINT}/address?access_token=${accessToken}`;
  const { originalCoordinate, originalAddress, changes } = feedbackArgs;
  const payload = {
    action: "update",
    reason: "incorrect_address",
    location: {
      longitude: originalCoordinate[0],
      latitude: originalCoordinate[1]
    },
    userEmail: "no-reply-autofill@mapbox.com",
    changes,
    placeName: originalAddress
  };
  fetch(url, {
    method: "POST",
    headers: new Headers({
      "User-Agent": `mapbox-search-js.${version}.${navigator.userAgent}`,
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(payload)
  });
}
var TEMPLATE2 = createElementFromString(`
<template>
  <div class="MapboxAddressConfirmationFeature">
    <div class="Modal" aria-modal="true" role="dialog">
      <div class="ModalHeader">
        <svg viewBox="0 0 18 18" class="Icon IconQuestion"></svg>
        <div class="ModalHeaderTitle">Did you mean?</div>
        <svg
          viewBox="0 0 18 18"
          class="Icon IconClose"
          tabindex="0"
          role="button"
          title="Close"
          aria-label="Close"
          aria-expanded="true"
        ></svg>
      </div>

      <div class="ModalAddress ModalAddressApprove"></div>
            
      <div class="ModalMap">
        <mapbox-address-minimap class="Minimap"></mapbox-address-minimap>
      </div>

      <div
        class="Button ButtonPrimary ButtonApprove"
        tabindex="0"
        role="button"
        aria-label="Yes"
      >
        Yes
      </div>
      
      <div
        class="Button ButtonSecondary ButtonReject"
        tabindex="0"
        role="button"
        aria-label="No, use the address I provided"
      >
        No, use the address I provided
      </div>

      <div class="ModalFooter">
          Your confirmation helps improve address data accuracy.
      </div>
    </div>
  </div>
</template>
`);
var _binding3;
var _themeInternal3;
var _feature;
var _formValues;
var _handleClose;
var _modalID;
var _modalHeaderTitleID;
var _modalAddressApproveID;
var MapboxAddressConfirmationFeature = class extends HTMLScopedElement {
  constructor() {
    super(...arguments);
    __privateAdd2(this, _binding3, void 0);
    __privateAdd2(this, _themeInternal3, {});
    this.minimap = false;
    __privateAdd2(this, _feature, void 0);
    __privateAdd2(this, _formValues, void 0);
    this.update = (feature, autofillValues) => {
      __privateSet2(this, _feature, feature);
      __privateSet2(this, _formValues, autofillValues);
      const { ModalMap, Minimap, ModalAddressApprove } = __privateGet2(this, _binding3);
      if (this.minimap) {
        ModalMap.removeAttribute("aria-hidden");
        Minimap.accessToken = this.accessToken;
        if (typeof this.minimap === "object") {
          const { defaultMapStyle, theme, mapStyleMode, satelliteToggle } = this.minimap;
          defaultMapStyle && (Minimap.defaultMapStyle = this.minimap.defaultMapStyle);
          theme && (Minimap.theme = this.minimap.theme);
          mapStyleMode && (Minimap.mapStyleMode = mapStyleMode);
          satelliteToggle !== void 0 && (Minimap.satelliteToggle = satelliteToggle);
        }
        Minimap.feature = feature;
      } else {
        ModalMap.setAttribute("aria-hidden", "true");
      }
      const approveAddress = feature.properties.place_name || feature.properties.full_address || feature.properties.address;
      ModalAddressApprove.innerHTML = "";
      ModalAddressApprove.appendChild(createAddressElement(autofillValues, approveAddress));
    };
    __privateAdd2(this, _handleClose, () => {
      this.dispatchEvent(new MapboxHTMLEvent("result", "cancel"));
    });
    this.approve = () => {
      this.dispatchEvent(new MapboxHTMLEvent("result", "change"));
    };
    this.reject = () => {
      this.dispatchEvent(new MapboxHTMLEvent("result", "nochange"));
      sendFeedback(this.accessToken, {
        originalCoordinate: __privateGet2(this, _feature).geometry.coordinates,
        originalAddress: __privateGet2(this, _feature).properties.full_address,
        changes: {
          address: getAutofillSearchText(__privateGet2(this, _formValues))
        }
      });
    };
    __privateAdd2(this, _modalID, randomValidID());
    __privateAdd2(this, _modalHeaderTitleID, randomValidID());
    __privateAdd2(this, _modalAddressApproveID, randomValidID());
  }
  get template() {
    return TEMPLATE2;
  }
  get templateStyle() {
    return style_default;
  }
  get templateUserStyle() {
    return getThemeCSS(".MapboxAddressConfirmationFeature", this.theme);
  }
  get theme() {
    return __privateGet2(this, _themeInternal3);
  }
  set theme(theme) {
    __privateSet2(this, _themeInternal3, theme);
    if (!__privateGet2(this, _binding3) || !theme) {
      return;
    }
    this.updateTemplateUserStyle(getThemeCSS(".MapboxAddressConfirmationFeature", theme));
    const { IconQuestion, IconClose } = __privateGet2(this, _binding3);
    IconQuestion.innerHTML = getIcon("question", theme);
    IconClose.innerHTML = getIcon("close", theme);
  }
  set footer(val) {
    if (val === void 0)
      return;
    const footerEl = this.querySelector(".ModalFooter");
    if (typeof val === "string") {
      footerEl.textContent = val;
      footerEl.removeAttribute("aria-hidden");
    } else if (!val) {
      footerEl.setAttribute("aria-hidden", "true");
    } else {
      footerEl.removeAttribute("aria-hidden");
    }
  }
  connectedCallback() {
    super.connectedCallback();
    __privateSet2(this, _binding3, bindElements(this, {
      MapboxAddressConfirmationFeature: ".MapboxAddressConfirmationFeature",
      Modal: ".Modal",
      ModalHeaderTitle: ".ModalHeaderTitle",
      ModalMap: ".ModalMap",
      Minimap: ".Minimap",
      IconQuestion: ".IconQuestion",
      IconClose: ".IconClose",
      ButtonApprove: ".ButtonApprove",
      ButtonReject: ".ButtonReject",
      ModalAddressApprove: ".ModalAddressApprove"
    }));
    const {
      Modal,
      ModalHeaderTitle,
      IconClose,
      ButtonApprove,
      ButtonReject,
      ModalAddressApprove
    } = __privateGet2(this, _binding3);
    Modal.setAttribute("aria-labelledby", __privateGet2(this, _modalHeaderTitleID));
    Modal.setAttribute("aria-describedby", __privateGet2(this, _modalAddressApproveID));
    IconClose.setAttribute("aria-controls", __privateGet2(this, _modalID));
    Modal.id = __privateGet2(this, _modalID);
    ModalHeaderTitle.id = __privateGet2(this, _modalHeaderTitleID);
    ModalAddressApprove.id = __privateGet2(this, _modalAddressApproveID);
    const buttons = Array.from(this.querySelectorAll('[role="button"]'));
    for (const button of buttons) {
      button.addEventListener("keydown", ariaButtonKeyDown);
    }
    IconClose.addEventListener("click", __privateGet2(this, _handleClose));
    ButtonApprove.addEventListener("click", this.approve);
    ButtonReject.addEventListener("click", this.reject);
    const theme = this.theme;
    if (theme) {
      const { IconQuestion, IconClose: IconClose2 } = __privateGet2(this, _binding3);
      IconQuestion.innerHTML = getIcon("question", theme);
      IconClose2.innerHTML = getIcon("close", theme);
    }
  }
  disconnectedCallback() {
    const { IconClose, ButtonApprove } = __privateGet2(this, _binding3);
    IconClose.removeEventListener("click", __privateGet2(this, _handleClose));
    ButtonApprove.removeEventListener("click", this.approve);
  }
};
_binding3 = /* @__PURE__ */ new WeakMap();
_themeInternal3 = /* @__PURE__ */ new WeakMap();
_feature = /* @__PURE__ */ new WeakMap();
_formValues = /* @__PURE__ */ new WeakMap();
_handleClose = /* @__PURE__ */ new WeakMap();
_modalID = /* @__PURE__ */ new WeakMap();
_modalHeaderTitleID = /* @__PURE__ */ new WeakMap();
_modalAddressApproveID = /* @__PURE__ */ new WeakMap();
window.MapboxAddressConfirmationFeature = MapboxAddressConfirmationFeature;
if (!window.customElements.get("mapbox-address-confirmation-feature")) {
  customElements.define("mapbox-address-confirmation-feature", MapboxAddressConfirmationFeature);
}
var TEMPLATE3 = createElementFromString(`
<template>
  <div class="MapboxAddressConfirmationNoFeature">
    <div class="Modal" aria-modal="true" role="dialog">
      <div class="ModalHeader">
        <svg viewBox="0 0 18 18" class="Icon IconQuestion"></svg>
        <div class="ModalHeaderTitle">Confirm address</div>
        <svg
          viewBox="0 0 18 18"
          class="Icon IconClose"
          tabindex="0"
          role="button"
          title="Close"
          aria-label="Close"
          aria-expanded="true"
        ></svg>
      </div>
      <div class="ModalDescription">
        We couldn't verify this address. Please check that your information is correct before continuing.
      </div>
      <br />
      <div class="ModalSubheader">
        You entered
      </div>
      <div class="ModalAddress"></div>
      <div
        class="Button ButtonPrimary"
        tabindex="0"
        role="button"
        aria-label="Use the address I provided"
      >
        Use the address I provided
      </div>
    </div>
  </div>
</template>
`);
var _binding4;
var _themeInternal4;
var _handleClose2;
var _modalID2;
var _modalHeaderTitleID2;
var _modalAddressID;
var MapboxAddressConfirmationNoFeature = class extends HTMLScopedElement {
  constructor() {
    super(...arguments);
    __privateAdd2(this, _binding4, void 0);
    __privateAdd2(this, _themeInternal4, {});
    this.update = (autofillValues) => {
      const { ModalAddress } = __privateGet2(this, _binding4);
      ModalAddress.innerHTML = "";
      ModalAddress.appendChild(createAddressElement(autofillValues));
    };
    __privateAdd2(this, _handleClose2, () => {
      this.dispatchEvent(new MapboxHTMLEvent("result", "cancel"));
    });
    this.reject = () => {
      this.dispatchEvent(new MapboxHTMLEvent("result", "nochange"));
    };
    __privateAdd2(this, _modalID2, randomValidID());
    __privateAdd2(this, _modalHeaderTitleID2, randomValidID());
    __privateAdd2(this, _modalAddressID, randomValidID());
  }
  get template() {
    return TEMPLATE3;
  }
  get templateStyle() {
    return style_default;
  }
  get templateUserStyle() {
    return getThemeCSS(".MapboxAddressConfirmationNoFeature", this.theme);
  }
  get theme() {
    return __privateGet2(this, _themeInternal4);
  }
  set theme(theme) {
    __privateSet2(this, _themeInternal4, theme);
    if (!__privateGet2(this, _binding4) || !theme) {
      return;
    }
    this.updateTemplateUserStyle(getThemeCSS(".MapboxAddressConfirmationNoFeature", theme));
    const { IconQuestion, IconClose } = __privateGet2(this, _binding4);
    IconQuestion.innerHTML = getIcon("question", theme);
    IconClose.innerHTML = getIcon("close", theme);
  }
  connectedCallback() {
    super.connectedCallback();
    __privateSet2(this, _binding4, bindElements(this, {
      Modal: ".Modal",
      ModalHeaderTitle: ".ModalHeaderTitle",
      IconQuestion: ".IconQuestion",
      IconClose: ".IconClose",
      ModalAddress: ".ModalAddress",
      ButtonReject: ".Button"
    }));
    const { Modal, ModalHeaderTitle, IconClose, ModalAddress, ButtonReject } = __privateGet2(this, _binding4);
    Modal.setAttribute("aria-labelledby", __privateGet2(this, _modalHeaderTitleID2));
    Modal.setAttribute("aria-describedby", __privateGet2(this, _modalAddressID));
    IconClose.setAttribute("aria-controls", __privateGet2(this, _modalID2));
    Modal.id = __privateGet2(this, _modalID2);
    ModalHeaderTitle.id = __privateGet2(this, _modalHeaderTitleID2);
    ModalAddress.id = __privateGet2(this, _modalAddressID);
    const buttons = Array.from(this.querySelectorAll('[role="button"]'));
    for (const button of buttons) {
      button.addEventListener("keydown", ariaButtonKeyDown);
    }
    IconClose.addEventListener("click", __privateGet2(this, _handleClose2));
    ButtonReject.addEventListener("click", this.reject);
    const theme = this.theme;
    if (theme) {
      const { IconQuestion, IconClose: IconClose2 } = __privateGet2(this, _binding4);
      IconQuestion.innerHTML = getIcon("question", theme);
      IconClose2.innerHTML = getIcon("close", theme);
    }
  }
  disconnectedCallback() {
    const { IconClose, ButtonReject } = __privateGet2(this, _binding4);
    IconClose.removeEventListener("click", __privateGet2(this, _handleClose2));
    ButtonReject.removeEventListener("click", this.reject);
  }
};
_binding4 = /* @__PURE__ */ new WeakMap();
_themeInternal4 = /* @__PURE__ */ new WeakMap();
_handleClose2 = /* @__PURE__ */ new WeakMap();
_modalID2 = /* @__PURE__ */ new WeakMap();
_modalHeaderTitleID2 = /* @__PURE__ */ new WeakMap();
_modalAddressID = /* @__PURE__ */ new WeakMap();
window.MapboxAddressConfirmationNoFeature = MapboxAddressConfirmationNoFeature;
if (!window.customElements.get("mapbox-address-confirmation-no-feature")) {
  customElements.define("mapbox-address-confirmation-no-feature", MapboxAddressConfirmationNoFeature);
}
var detect_browser_autofill_default = 'input:-webkit-autofill,select:-webkit-autofill,textarea:-webkit-autofill{animation-name:onbrowserautofillstart}input:not(:-webkit-autofill),select:not(:-webkit-autofill),textarea:not(:-webkit-autofill){animation-name:onbrowserautofillcancel}@keyframes onbrowserautofillstart{0%{animation-name:"onbrowserautofillstart"}to{animation-name:"onbrowserautofillstart"}}@keyframes onbrowserautofillcancel{0%{animation-name:"onbrowserautofillcancel"}to{animation-name:"onbrowserautofillcancel"}}';
var ATTR_NAME = "browser-autofilled";
var AUTOFILLED_ELEMENTS = [];
function dispatchBrowserAutofillEvent() {
  window.dispatchEvent(new window.CustomEvent("browserautofill", {
    bubbles: true,
    cancelable: true,
    detail: { elements: AUTOFILLED_ELEMENTS }
  }));
  AUTOFILLED_ELEMENTS = [];
}
var debouncedAutofill = debounce(dispatchBrowserAutofillEvent, 5);
function browserAutofill(element) {
  if (element.hasAttribute(ATTR_NAME))
    return;
  element.setAttribute(ATTR_NAME, "");
  AUTOFILLED_ELEMENTS.push(element);
  debouncedAutofill();
}
function cancelBrowserAutofill(element) {
  if (!element.hasAttribute(ATTR_NAME))
    return;
  element.removeAttribute(ATTR_NAME);
}
function onAnimationStart(event) {
  event.animationName === "onbrowserautofillstart" ? browserAutofill(event.target) : cancelBrowserAutofill(event.target);
}
function onInput(event) {
  const targetEl = event.target;
  targetEl.nodeName.toLowerCase() !== "select" && !event.simulated && !(event instanceof MapboxHTMLEvent) && (event.inputType === "insertReplacementText" || !("data" in event)) ? browserAutofill(targetEl) : cancelBrowserAutofill(targetEl);
}
function initDetectBrowserAutofill() {
  if (config.detectBrowserAutofillEnabled) {
    return;
  } else {
    config.detectBrowserAutofillEnabled = true;
  }
  addDocumentStyle(detect_browser_autofill_default);
  document.addEventListener("animationstart", onAnimationStart, true);
  document.addEventListener("input", onInput, true);
}
var _autofill;
var _session;
var _input;
var _listbox;
var _initialAutocompleteValue;
var _browserAutofillEnabled;
var _handleSuggest;
var _handleSuggestError;
var _handleRetrieve;
var _handleObserve;
var _observer;
var _handleBrowserAutofill;
var _onHandleInput;
var _onHandleSelect;
var _onHandleBlur;
var _onHandleFocus;
var MapboxAddressAutofill = class extends HTMLScopedElement {
  constructor() {
    super(...arguments);
    __privateAdd2(this, _autofill, new AddressAutofillCore());
    __privateAdd2(this, _session, new SearchSession(__privateGet2(this, _autofill)));
    __privateAdd2(this, _input, void 0);
    __privateAdd2(this, _listbox, new MapboxSearchListbox());
    __privateAdd2(this, _initialAutocompleteValue, void 0);
    this.options = {};
    this.confirmOnBrowserAutofill = false;
    __privateAdd2(this, _browserAutofillEnabled, false);
    __privateAdd2(this, _handleSuggest, (result) => {
      const filteredSuggestions = (result == null ? void 0 : result.suggestions) ? distinctExactStreetResults(result.suggestions) : null;
      __privateGet2(this, _listbox).handleSuggest(filteredSuggestions);
      this.dispatchEvent(new MapboxHTMLEvent("suggest", result));
    });
    __privateAdd2(this, _handleSuggestError, (error) => {
      __privateGet2(this, _listbox).handleError();
      this.dispatchEvent(new MapboxHTMLEvent("suggesterror", error));
    });
    __privateAdd2(this, _handleRetrieve, (result) => {
      var _a;
      this.dispatchEvent(new MapboxHTMLEvent("retrieve", result));
      this.retrieveFeature = (_a = result.features) == null ? void 0 : _a[0];
      if (!__privateGet2(this, _input)) {
        return;
      }
      const featureCollection = result;
      if (!featureCollection || !featureCollection.features || !featureCollection.features.length) {
        return;
      }
      fillFormWithFeature(featureCollection.features[0], __privateGet2(this, _input));
    });
    __privateAdd2(this, _handleObserve, () => {
      var _a;
      try {
        const input = (_a = this.querySelector("input")) != null ? _a : null;
        __privateSet2(this, _input, input);
        __privateGet2(this, _listbox).input = input;
      } catch (e) {
        __privateSet2(this, _input, null);
        __privateGet2(this, _listbox).input = null;
        console.error(e.message || e);
      }
    });
    __privateAdd2(this, _observer, new MutationObserver(__privateGet2(this, _handleObserve)));
    __privateAdd2(this, _handleBrowserAutofill, (e) => {
      __privateGet2(this, _listbox).blur();
      tryConfirmBrowserAutofill(__privateGet2(this, _input), e, this.confirmOnBrowserAutofill, this.accessToken);
    });
    this.retrieveFeature = null;
    this.interceptSearch = null;
    __privateAdd2(this, _onHandleInput, (e) => {
      this.dispatchEvent(e.clone());
      const inputText = e.detail;
      const enableBrowserAutocomplete = this.browserAutofillEnabled === true && (inputText == null ? void 0 : inputText.length) <= 2;
      toggleAutocompletion(__privateGet2(this, _input), __privateGet2(this, _initialAutocompleteValue), enableBrowserAutocomplete);
      const alteredText = this.interceptSearch && this.interceptSearch(inputText);
      const searchText = this.interceptSearch ? alteredText : inputText;
      if (this.interceptSearch && !alteredText || (searchText == null ? void 0 : searchText.length) <= 2) {
        __privateGet2(this, _listbox).handleSuggest(null);
        return;
      }
      __privateGet2(this, _session).suggest(searchText, this.options);
    });
    __privateAdd2(this, _onHandleSelect, (e) => {
      const suggestion = e.detail;
      if (e.detail.accuracy !== "street") {
        toggleAutocompletion(__privateGet2(this, _input), __privateGet2(this, _initialAutocompleteValue), true);
        __privateGet2(this, _session).retrieve(suggestion, this.options);
      } else {
        handleStreetSelection(__privateGet2(this, _input), __privateGet2(this, _initialAutocompleteValue), suggestion);
      }
    });
    __privateAdd2(this, _onHandleBlur, () => {
      toggleAutocompletion(__privateGet2(this, _input), __privateGet2(this, _initialAutocompleteValue), true);
      __privateGet2(this, _session).abort();
    });
    __privateAdd2(this, _onHandleFocus, () => {
      var _a;
      const enableBrowserAutocomplete = this.browserAutofillEnabled === true && ((_a = __privateGet2(this, _input).value) == null ? void 0 : _a.length) <= 2;
      toggleAutocompletion(__privateGet2(this, _input), __privateGet2(this, _initialAutocompleteValue), enableBrowserAutocomplete);
    });
  }
  get accessToken() {
    return __privateGet2(this, _autofill).accessToken;
  }
  set accessToken(newToken) {
    __privateGet2(this, _autofill).accessToken = newToken;
  }
  get input() {
    return __privateGet2(this, _input);
  }
  get theme() {
    return __privateGet2(this, _listbox).theme;
  }
  set theme(theme) {
    __privateGet2(this, _listbox).theme = theme;
  }
  get popoverOptions() {
    return __privateGet2(this, _listbox).popoverOptions;
  }
  set popoverOptions(newOptions) {
    __privateGet2(this, _listbox).popoverOptions = newOptions;
  }
  get browserAutofillEnabled() {
    return __privateGet2(this, _browserAutofillEnabled);
  }
  set browserAutofillEnabled(enable) {
    __privateSet2(this, _browserAutofillEnabled, enable);
  }
  connectedCallback() {
    var _a;
    super.connectedCallback();
    config.autofillSessionEnabled = true;
    __privateGet2(this, _session).sessionToken = config.autofillSessionToken;
    __privateGet2(this, _listbox).autofillHost = this;
    __privateGet2(this, _listbox).searchService = 0;
    const input = (_a = this.querySelector("input")) != null ? _a : null;
    __privateGet2(this, _observer).observe(this, {
      subtree: true,
      childList: true
    });
    __privateGet2(this, _handleObserve).call(this);
    __privateGet2(this, _listbox).addEventListener("input", __privateGet2(this, _onHandleInput));
    __privateGet2(this, _listbox).addEventListener("select", __privateGet2(this, _onHandleSelect));
    __privateGet2(this, _listbox).addEventListener("blur", __privateGet2(this, _onHandleBlur));
    __privateGet2(this, _listbox).addEventListener("focus", __privateGet2(this, _onHandleFocus));
    __privateGet2(this, _session).addEventListener("suggest", __privateGet2(this, _handleSuggest));
    __privateGet2(this, _session).addEventListener("suggesterror", __privateGet2(this, _handleSuggestError));
    __privateGet2(this, _session).addEventListener("retrieve", __privateGet2(this, _handleRetrieve));
    document.body.appendChild(__privateGet2(this, _listbox));
    if (input) {
      input.insertAdjacentElement("beforebegin", createAriaLiveElement(__privateGet2(this, _listbox).dataSeed));
      suppressExtensionsAutocomplete(input);
      __privateSet2(this, _initialAutocompleteValue, input.autocomplete);
    }
    initDetectBrowserAutofill();
    window.addEventListener("browserautofill", __privateGet2(this, _handleBrowserAutofill));
  }
  disconnectedCallback() {
    __privateGet2(this, _listbox).remove();
    __privateGet2(this, _listbox).removeEventListener("input", __privateGet2(this, _onHandleInput));
    __privateGet2(this, _listbox).removeEventListener("select", __privateGet2(this, _onHandleSelect));
    __privateGet2(this, _listbox).removeEventListener("blur", __privateGet2(this, _onHandleBlur));
    __privateGet2(this, _listbox).removeEventListener("focus", __privateGet2(this, _onHandleFocus));
    __privateGet2(this, _session).removeEventListener("suggest", __privateGet2(this, _handleSuggest));
    __privateGet2(this, _session).removeEventListener("suggesterror", __privateGet2(this, _handleSuggestError));
    __privateGet2(this, _session).removeEventListener("retrieve", __privateGet2(this, _handleRetrieve));
    __privateGet2(this, _observer).disconnect();
    window.removeEventListener("browserautofill", __privateGet2(this, _handleBrowserAutofill));
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "access-token") {
      __privateGet2(this, _autofill).accessToken = newValue;
      return;
    }
    if (name === "browser-autofill-enabled") {
      __privateSet2(this, _browserAutofillEnabled, Boolean(newValue));
      return;
    }
    if (name === "theme") {
      this.theme = tryParseJSON(newValue);
      return;
    }
    if (name === "popover-options") {
      this.popoverOptions = tryParseJSON(newValue);
      return;
    }
    const optionName = name.split("-").join("_");
    if (!newValue) {
      delete this.options[optionName];
    }
    this.options[optionName] = newValue;
  }
  focus() {
    __privateGet2(this, _listbox).focus();
  }
  simulateRetrieve(feature) {
    const input = this.input;
    if (input) {
      input.dataset["mapboxSuccess"] = "true";
    }
    __privateGet2(this, _listbox).hideResults();
    const simResult = {
      type: "FeatureCollection",
      features: [feature],
      url: ""
    };
    __privateGet2(this, _handleRetrieve).call(this, simResult);
  }
};
_autofill = /* @__PURE__ */ new WeakMap();
_session = /* @__PURE__ */ new WeakMap();
_input = /* @__PURE__ */ new WeakMap();
_listbox = /* @__PURE__ */ new WeakMap();
_initialAutocompleteValue = /* @__PURE__ */ new WeakMap();
_browserAutofillEnabled = /* @__PURE__ */ new WeakMap();
_handleSuggest = /* @__PURE__ */ new WeakMap();
_handleSuggestError = /* @__PURE__ */ new WeakMap();
_handleRetrieve = /* @__PURE__ */ new WeakMap();
_handleObserve = /* @__PURE__ */ new WeakMap();
_observer = /* @__PURE__ */ new WeakMap();
_handleBrowserAutofill = /* @__PURE__ */ new WeakMap();
_onHandleInput = /* @__PURE__ */ new WeakMap();
_onHandleSelect = /* @__PURE__ */ new WeakMap();
_onHandleBlur = /* @__PURE__ */ new WeakMap();
_onHandleFocus = /* @__PURE__ */ new WeakMap();
MapboxAddressAutofill.observedAttributes = [
  "access-token",
  "browser-autofill-enabled",
  "theme",
  "popover-options",
  "css-text",
  "language",
  "country",
  "bbox",
  "limit",
  "proximity",
  "streets"
];
window.MapboxAddressAutofill = MapboxAddressAutofill;
if (!window.customElements.get("mapbox-address-autofill")) {
  customElements.define("mapbox-address-autofill", MapboxAddressAutofill);
}
var placeholder = {
  de: "Suche",
  it: "Ricerca",
  en: "Search",
  nl: "Zoeken",
  fr: "Chercher",
  ca: "Cerca",
  he: "לחפש",
  ja: "サーチ",
  lv: "Meklēt",
  pt: "Procurar",
  sr: "Претрага",
  zh: "搜索",
  cs: "Vyhledávání",
  hu: "Keresés",
  ka: "ძიება",
  nb: "Søke",
  sk: "Vyhľadávanie",
  th: "ค้นหา",
  fi: "Hae",
  is: "Leita",
  ko: "수색",
  pl: "Szukaj",
  sl: "Iskanje",
  fa: "جستجو",
  ru: "Поиск"
};
var localization_default = { placeholder };
var MAX_ZOOM = 9;
var _binding5;
var _search;
var _session2;
var _map;
var _input2;
var _listbox2;
var _getDefaultPlaceholder;
var getDefaultPlaceholder_fn;
var _placeholder;
var _handleSuggest2;
var _handleSuggestError2;
var _handleRetrieve2;
var _mapMarker;
var _removeMarker;
var _handleMarker;
var _onHandleInput2;
var _onHandleSelect2;
var _onHandleBlur2;
var _setActionIcons;
var _handleClear;
var _handleMoveEnd;
var MapboxSearchBox = class extends HTMLScopedElement {
  constructor() {
    super(...arguments);
    __privateAdd2(this, _getDefaultPlaceholder);
    __privateAdd2(this, _binding5, void 0);
    __privateAdd2(this, _search, new SearchBoxCore({}));
    __privateAdd2(this, _session2, new SearchSession(__privateGet2(this, _search)));
    __privateAdd2(this, _map, null);
    __privateAdd2(this, _input2, void 0);
    __privateAdd2(this, _listbox2, new MapboxSearchListbox());
    this.options = {};
    __privateAdd2(this, _placeholder, void 0);
    __privateAdd2(this, _handleSuggest2, (result) => {
      __privateGet2(this, _setActionIcons).call(this);
      __privateGet2(this, _listbox2).handleSuggest((result == null ? void 0 : result.suggestions) || null);
      this.dispatchEvent(new MapboxHTMLEvent("suggest", result));
    });
    __privateAdd2(this, _handleSuggestError2, (error) => {
      __privateGet2(this, _setActionIcons).call(this);
      __privateGet2(this, _listbox2).handleError();
      this.dispatchEvent(new MapboxHTMLEvent("suggesterror", error));
    });
    __privateAdd2(this, _handleRetrieve2, (result) => {
      __privateGet2(this, _setActionIcons).call(this);
      this.dispatchEvent(new MapboxHTMLEvent("retrieve", result));
      const featureCollection = result;
      if (!featureCollection || !featureCollection.features.length) {
        return;
      }
      const suggestion = featureToSuggestion(featureCollection.features[0]);
      __privateGet2(this, _input2).value = suggestion.name;
      const map = __privateGet2(this, _map);
      if (!map) {
        return;
      }
      const feature = featureCollection.features[0];
      if (!feature) {
        return;
      }
      const placeType = feature.properties.feature_type;
      const bounds = feature.properties.bbox;
      if (bounds) {
        map.flyTo(bboxViewport(map, LngLatBounds.convert(bounds).toFlatArray()));
      } else {
        const center = feature.geometry.coordinates;
        const zoom = getMaxZoom(placeType);
        map.flyTo({
          center,
          zoom,
          speed: FLY_TO_SPEED
        });
      }
      if (this.marker && this.mapboxgl) {
        __privateGet2(this, _handleMarker).call(this, feature);
      }
    });
    __privateAdd2(this, _mapMarker, void 0);
    __privateAdd2(this, _removeMarker, () => {
      if (__privateGet2(this, _mapMarker)) {
        __privateGet2(this, _mapMarker).remove();
        __privateSet2(this, _mapMarker, null);
      }
    });
    __privateAdd2(this, _handleMarker, (feature) => {
      if (!__privateGet2(this, _map)) {
        return;
      }
      __privateGet2(this, _removeMarker).call(this);
      if (!feature)
        return;
      const defaultMarkerOptions = {
        color: "#4668F2"
      };
      const markerOptions = __spreadValues2(__spreadValues2({}, defaultMarkerOptions), typeof this.marker === "object" && this.marker);
      __privateSet2(this, _mapMarker, new this.mapboxgl.Marker(markerOptions));
      if (feature.geometry && feature.geometry.type && feature.geometry.type === "Point" && feature.geometry.coordinates) {
        __privateGet2(this, _mapMarker).setLngLat(feature.geometry.coordinates).addTo(__privateGet2(this, _map));
      }
    });
    this.interceptSearch = null;
    __privateAdd2(this, _onHandleInput2, (e) => {
      this.dispatchEvent(e.clone());
      const inputText = e.detail;
      if (!inputText) {
        __privateGet2(this, _handleClear).call(this);
        return;
      }
      const alteredText = this.interceptSearch && this.interceptSearch(inputText);
      const searchText = this.interceptSearch ? alteredText : inputText;
      if (this.interceptSearch && !alteredText) {
        __privateGet2(this, _listbox2).hideResults();
        return;
      }
      __privateGet2(this, _session2).suggest(searchText, this.options);
      __privateGet2(this, _setActionIcons).call(this, true);
    });
    __privateAdd2(this, _onHandleSelect2, (e) => {
      const suggestion = e.detail;
      __privateGet2(this, _session2).retrieve(suggestion, this.options);
      __privateGet2(this, _setActionIcons).call(this, true);
    });
    __privateAdd2(this, _onHandleBlur2, () => {
      __privateGet2(this, _session2).abort();
    });
    __privateAdd2(this, _setActionIcons, (loading = false) => {
      if (loading) {
        __privateGet2(this, _binding5).ClearBtn.style.display = "none";
        __privateGet2(this, _binding5).LoadingIcon.style.display = "block";
      } else {
        __privateGet2(this, _binding5).LoadingIcon.style.display = "none";
        __privateGet2(this, _binding5).ClearBtn.style.display = this.value ? "block" : "none";
      }
    });
    __privateAdd2(this, _handleClear, () => {
      this.value = "";
      __privateGet2(this, _setActionIcons).call(this);
      __privateGet2(this, _handleMarker).call(this, null);
      __privateGet2(this, _listbox2).handleSuggest(null);
    });
    this.marker = true;
    __privateAdd2(this, _handleMoveEnd, () => {
      const map = __privateGet2(this, _map);
      const options = __spreadValues2({}, this.options);
      if (map.getZoom() <= MAX_ZOOM) {
        delete options.proximity;
        this.options = options;
        return;
      }
      const center = map.getCenter();
      this.options = __spreadProps2(__spreadValues2({}, options), {
        proximity: center
      });
    });
  }
  get accessToken() {
    return __privateGet2(this, _search).accessToken;
  }
  set accessToken(newToken) {
    __privateGet2(this, _search).accessToken = newToken;
  }
  get value() {
    return __privateGet2(this, _input2).value;
  }
  set value(newValue) {
    __privateGet2(this, _input2).value = newValue;
  }
  get input() {
    return __privateGet2(this, _input2);
  }
  get template() {
    return SEARCHBOX_TEMPLATE;
  }
  get templateStyle() {
    return style_default;
  }
  get templateUserStyle() {
    return getThemeCSS(".SearchBox", __privateGet2(this, _listbox2).theme);
  }
  get theme() {
    return __privateGet2(this, _listbox2).theme;
  }
  set theme(theme) {
    __privateGet2(this, _listbox2).theme = theme;
    if (!__privateGet2(this, _binding5) || !theme) {
      return;
    }
    this.updateTemplateUserStyle(getThemeCSS(".SearchBox", theme));
    __privateGet2(this, _listbox2).updatePopover();
    const { SearchIcon } = __privateGet2(this, _binding5);
    SearchIcon.innerHTML = getIcon("search", theme);
  }
  get popoverOptions() {
    return __privateGet2(this, _listbox2).popoverOptions;
  }
  set popoverOptions(newOptions) {
    __privateGet2(this, _listbox2).popoverOptions = newOptions;
  }
  get placeholder() {
    return __privateGet2(this, _placeholder) || __privateMethod2(this, _getDefaultPlaceholder, getDefaultPlaceholder_fn).call(this);
  }
  set placeholder(text) {
    __privateSet2(this, _placeholder, text);
    if (__privateGet2(this, _input2)) {
      __privateGet2(this, _input2).placeholder = this.placeholder;
      __privateGet2(this, _input2).setAttribute("aria-label", this.placeholder);
    }
  }
  connectedCallback() {
    super.connectedCallback();
    __privateSet2(this, _binding5, bindElements(this, {
      SearchBox: ".SearchBox",
      SearchIcon: ".SearchIcon",
      Input: ".Input",
      ClearBtn: ".ClearBtn",
      LoadingIcon: ".LoadingIcon"
    }));
    this.theme = __spreadValues2({}, this.theme);
    const { Input, ClearBtn } = __privateGet2(this, _binding5);
    __privateSet2(this, _input2, Input);
    __privateGet2(this, _listbox2).input = Input;
    __privateGet2(this, _listbox2).searchService = 3;
    __privateGet2(this, _listbox2).addEventListener("input", __privateGet2(this, _onHandleInput2));
    __privateGet2(this, _listbox2).addEventListener("select", __privateGet2(this, _onHandleSelect2));
    __privateGet2(this, _listbox2).addEventListener("blur", __privateGet2(this, _onHandleBlur2));
    __privateGet2(this, _session2).addEventListener("suggest", __privateGet2(this, _handleSuggest2));
    __privateGet2(this, _session2).addEventListener("suggesterror", __privateGet2(this, _handleSuggestError2));
    __privateGet2(this, _session2).addEventListener("retrieve", __privateGet2(this, _handleRetrieve2));
    ClearBtn.addEventListener("click", __privateGet2(this, _handleClear));
    this.placeholder = __privateGet2(this, _placeholder);
    document.body.appendChild(__privateGet2(this, _listbox2));
    if (Input) {
      if (Input.previousElementSibling.hasAttribute("aria-live")) {
        Input.previousElementSibling.remove();
      }
      Input.insertAdjacentElement("beforebegin", createAriaLiveElement(__privateGet2(this, _listbox2).dataSeed));
    }
  }
  disconnectedCallback() {
    __privateGet2(this, _listbox2).remove();
    __privateGet2(this, _listbox2).input = null;
    __privateGet2(this, _listbox2).removeEventListener("input", __privateGet2(this, _onHandleInput2));
    __privateGet2(this, _listbox2).removeEventListener("select", __privateGet2(this, _onHandleSelect2));
    __privateGet2(this, _listbox2).removeEventListener("blur", __privateGet2(this, _onHandleBlur2));
    __privateGet2(this, _session2).removeEventListener("suggest", __privateGet2(this, _handleSuggest2));
    __privateGet2(this, _session2).removeEventListener("suggesterror", __privateGet2(this, _handleSuggestError2));
    __privateGet2(this, _session2).removeEventListener("retrieve", __privateGet2(this, _handleRetrieve2));
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "access-token") {
      __privateGet2(this, _search).accessToken = newValue;
      return;
    }
    if (name === "theme") {
      this.theme = tryParseJSON(newValue);
      return;
    }
    if (name === "popover-options") {
      this.popoverOptions = tryParseJSON(newValue);
      return;
    }
    if (name === "placeholder") {
      this.placeholder = newValue;
      return;
    }
    const optionName = name.split("-").join("_");
    if (!newValue) {
      delete this.options[optionName];
    }
    this.options[optionName] = newValue;
    if (optionName === "language") {
      this.placeholder = __privateGet2(this, _placeholder);
    }
  }
  focus() {
    __privateGet2(this, _listbox2).focus();
  }
  search(text) {
    this.value = text;
    __privateGet2(this, _onHandleInput2).call(this, new MapboxHTMLEvent("input", text));
  }
  bindMap(map) {
    if (__privateGet2(this, _map)) {
      __privateGet2(this, _map).off("moveend", __privateGet2(this, _handleMoveEnd));
    }
    if (map) {
      map.on("moveend", __privateGet2(this, _handleMoveEnd));
    }
    __privateSet2(this, _map, map);
  }
  unbindMap() {
    this.bindMap(null);
  }
  onAdd(map) {
    this.bindMap(map);
    this.remove();
    const container = document.createElement("div");
    container.className = "mapboxgl-ctrl";
    container.style.width = "300px";
    container.appendChild(this);
    return container;
  }
  onRemove() {
    this.remove();
    this.unbindMap();
    __privateGet2(this, _removeMarker).call(this);
  }
  getDefaultPosition() {
    return "top-right";
  }
};
_binding5 = /* @__PURE__ */ new WeakMap();
_search = /* @__PURE__ */ new WeakMap();
_session2 = /* @__PURE__ */ new WeakMap();
_map = /* @__PURE__ */ new WeakMap();
_input2 = /* @__PURE__ */ new WeakMap();
_listbox2 = /* @__PURE__ */ new WeakMap();
_getDefaultPlaceholder = /* @__PURE__ */ new WeakSet();
getDefaultPlaceholder_fn = function() {
  if (this.options.language) {
    const firstLanguage = this.options.language.split(",")[0];
    const language = import_subtag.default.language(firstLanguage);
    const localizedValue = localization_default.placeholder[language];
    if (localizedValue)
      return localizedValue;
  }
  return "Search";
};
_placeholder = /* @__PURE__ */ new WeakMap();
_handleSuggest2 = /* @__PURE__ */ new WeakMap();
_handleSuggestError2 = /* @__PURE__ */ new WeakMap();
_handleRetrieve2 = /* @__PURE__ */ new WeakMap();
_mapMarker = /* @__PURE__ */ new WeakMap();
_removeMarker = /* @__PURE__ */ new WeakMap();
_handleMarker = /* @__PURE__ */ new WeakMap();
_onHandleInput2 = /* @__PURE__ */ new WeakMap();
_onHandleSelect2 = /* @__PURE__ */ new WeakMap();
_onHandleBlur2 = /* @__PURE__ */ new WeakMap();
_setActionIcons = /* @__PURE__ */ new WeakMap();
_handleClear = /* @__PURE__ */ new WeakMap();
_handleMoveEnd = /* @__PURE__ */ new WeakMap();
MapboxSearchBox.observedAttributes = [
  "access-token",
  "theme",
  "popover-options",
  "placeholder",
  "language",
  "country",
  "bbox",
  "limit",
  "navigation-profile",
  "origin",
  "proximity",
  "eta-type",
  "types"
];
window.MapboxSearchBox = MapboxSearchBox;
if (!window.customElements.get("mapbox-search-box")) {
  customElements.define("mapbox-search-box", MapboxSearchBox);
}
var merc = new import_sphericalmercator.default({ size: 512, antimeridian: true });
var MAX_IMAGE_DIM = 1280;
function getAnchorOffset(marker, anchor) {
  const { width, height } = getElementSize(marker, true);
  switch (anchor) {
    case "center":
      return [0, 0];
    case "top":
      return [0, height / 2];
    case "bottom":
      return [0, -1 * height / 2];
    case "left":
      return [width / 2, 0];
    case "right":
      return [-1 * width / 2, 0];
    case "top-left":
      return [width / 2, height / 2];
    case "top-right":
      return [-1 * width / 2, height / 2];
    case "bottom-left":
      return [width / 2, -1 * height / 2];
    case "bottom-right":
      return [-1 * width / 2, -1 * height / 2];
  }
}
var _anchor;
var _handleAnchorResize;
var _markerTransform;
var _isActive;
var _originalCoordinate;
var _onPointerDownMarker;
var _onPointerUpMarker;
var _onPointerMoveMarker;
var _onPointerDownImage;
var _onPointerUpImage;
var _onPointerMoveImage;
var _updatePointerPosition;
var _updateMarkerTransform;
var _updateMarkerCorrection;
var MarkerController = class {
  constructor(imageContainer, imageElement, marker, keepMarkerCentered, zoom, anchor) {
    __privateAdd2(this, _anchor, void 0);
    __privateAdd2(this, _handleAnchorResize, () => {
      [this.anchorOffsetX, this.anchorOffsetY] = getAnchorOffset(this.markerElement, this.anchor);
      this.markerTransform = {
        anchorX: this.anchorOffsetX,
        anchorY: this.anchorOffsetY
      };
    });
    __privateAdd2(this, _markerTransform, {
      anchorX: 0,
      anchorY: 0,
      globalX: 0,
      globalY: 0,
      correctionX: 0,
      correctionY: 0
    });
    __privateAdd2(this, _isActive, false);
    __privateAdd2(this, _originalCoordinate, void 0);
    __privateAdd2(this, _onPointerDownMarker, (m) => {
      if (!this.isActive)
        return;
      m.preventDefault();
      m.stopPropagation();
      __privateGet2(this, _updatePointerPosition).call(this, m);
      window.addEventListener("pointermove", __privateGet2(this, _onPointerMoveMarker));
      window.addEventListener("pointerup", __privateGet2(this, _onPointerUpMarker));
    });
    __privateAdd2(this, _onPointerUpMarker, () => {
      window.removeEventListener("pointermove", __privateGet2(this, _onPointerMoveMarker));
      window.removeEventListener("pointerup", __privateGet2(this, _onPointerUpMarker));
    });
    __privateAdd2(this, _onPointerMoveMarker, (m) => {
      m.preventDefault();
      m.stopPropagation();
      const diffX = this.curPointerXPos - m.pageX;
      const diffY = this.curPointerYPos - m.pageY;
      this.markerDeltaX += diffX;
      this.markerDeltaY -= diffY;
      this.markerDeltaX = Math.max(Math.min(this.imgElement.width / 2, this.markerDeltaX), this.imgElement.width / 2 * -1);
      this.markerDeltaY = Math.max(Math.min(this.imgElement.height / 2, this.markerDeltaY), this.imgElement.height / 2 * -1);
      const imageOffsetX = this.imgCenterPx[0] - this.imgCenterAdjustedPx[0];
      const imageOffsetY = this.imgCenterPx[1] - this.imgCenterAdjustedPx[1];
      const deltaX = this.markerDeltaX - imageOffsetX;
      const deltaY = this.markerDeltaY + imageOffsetY;
      this.markerTransform = { globalX: deltaX, globalY: deltaY };
      __privateGet2(this, _updatePointerPosition).call(this, m);
    });
    __privateAdd2(this, _onPointerDownImage, (m) => {
      if (!this.isActive)
        return;
      m.preventDefault();
      m.stopPropagation();
      __privateGet2(this, _updatePointerPosition).call(this, m);
      window.addEventListener("pointermove", __privateGet2(this, _onPointerMoveImage));
      window.addEventListener("pointerup", __privateGet2(this, _onPointerUpImage));
    });
    __privateAdd2(this, _onPointerUpImage, () => {
      window.removeEventListener("pointermove", __privateGet2(this, _onPointerMoveImage));
      window.removeEventListener("pointerup", __privateGet2(this, _onPointerUpImage));
    });
    __privateAdd2(this, _onPointerMoveImage, (m) => {
      m.preventDefault();
      let top = Math.round(this.imgContainerElement.scrollTop + (this.curPointerYPos - m.pageY));
      top = Math.max(Math.min(this.imgElement.height - this.imgContainerElement.clientHeight, top), 0);
      let left = Math.round(this.imgContainerElement.scrollLeft + (this.curPointerXPos - m.pageX));
      left = Math.max(Math.min(this.imgElement.width - this.imgContainerElement.clientWidth, left), 0);
      this.imgContainerElement.scrollTop = top;
      this.imgContainerElement.scrollLeft = left;
      const diffX = Math.round(left - (this.imgElement.width - this.imgContainerElement.clientWidth) / 2);
      const diffY = Math.round((this.imgElement.height - this.imgContainerElement.clientHeight) / 2 - top);
      this.imgCenterAdjustedPx = [
        this.imgCenterPx[0] + diffX,
        this.imgCenterPx[1] - diffY
      ];
      if (!this.keepMarkerCentered) {
        const deltaX = this.markerDeltaX + diffX;
        const deltaY = this.markerDeltaY + diffY;
        this.markerTransform = { globalX: deltaX, globalY: deltaY };
      }
      __privateGet2(this, _updateMarkerCorrection).call(this, left, top);
      __privateGet2(this, _updatePointerPosition).call(this, m);
    });
    __privateAdd2(this, _updatePointerPosition, (m) => {
      this.curPointerXPos = m.pageX;
      this.curPointerYPos = m.pageY;
    });
    __privateAdd2(this, _updateMarkerTransform, () => {
      const { anchorX, anchorY, globalX, globalY, correctionX, correctionY } = __privateGet2(this, _markerTransform);
      const transformX = anchorX - globalX + correctionX;
      const transformY = anchorY + globalY + correctionY;
      this.markerElement.style.transform = `translate(calc(-50% + ${transformX}px), calc(-50% + ${transformY}px))`;
    });
    this.reCenter = () => {
      const top = (this.imgElement.height - this.imgContainerElement.clientHeight) / 2;
      const left = (this.imgElement.width - this.imgContainerElement.clientWidth) / 2;
      this.imgContainerElement.scrollTop = top;
      this.imgContainerElement.scrollLeft = left;
      this.imgCenterAdjustedPx = this.imgCenterPx;
      this.markerDeltaX = this.markerDeltaY = 0;
      this.markerTransform = {
        globalX: 0,
        globalY: 0,
        correctionX: 0,
        correctionY: 0
      };
    };
    this.handleMinimapResize = () => {
      if (!this.imgElement.height || !this.imgElement.width)
        return;
      const centerOffsetX = this.imgCenterOffset.x;
      const centerOffsetY = this.imgCenterOffset.y;
      const left = this.imgElement.width / 2 - centerOffsetX - this.imgContainerElement.clientWidth / 2;
      const top = this.imgElement.height / 2 - centerOffsetY - this.imgContainerElement.clientHeight / 2;
      this.imgContainerElement.scrollLeft = left;
      this.imgContainerElement.scrollTop = top;
      __privateGet2(this, _updateMarkerCorrection).call(this, left, top);
    };
    __privateAdd2(this, _updateMarkerCorrection, (scrollLeft, scrollTop) => {
      const centerOffsetX = this.imgCenterOffset.x;
      const centerOffsetY = this.imgCenterOffset.y;
      const { correctionX, correctionY } = this.markerTransform;
      const corrections = {};
      if (scrollLeft / 2 < centerOffsetX * -1) {
        const markerTranslateX = centerOffsetX * -1 - scrollLeft / 2;
        corrections.correctionX = markerTranslateX * 2;
      } else if (scrollLeft < 0) {
        corrections.correctionX = scrollLeft;
      } else if (correctionX !== 0) {
        corrections.correctionX = 0;
      }
      if (scrollTop / 2 < centerOffsetY * -1) {
        const markerTranslateY = centerOffsetY * -1 - scrollTop / 2;
        corrections.correctionY = markerTranslateY * 2;
      } else if (scrollTop < 0) {
        corrections.correctionY = scrollTop;
      } else if (correctionY !== 0) {
        corrections.correctionY = 0;
      }
      this.markerTransform = corrections;
    });
    this.markerElement = marker;
    this.imgContainerElement = imageContainer;
    this.imgElement = imageElement;
    this.keepMarkerCentered = keepMarkerCentered;
    this.zoom = zoom;
    this.anchor = anchor;
    this.curPointerXPos = 0;
    this.curPointerYPos = 0;
    this.markerDeltaX = 0;
    this.markerDeltaY = 0;
    this.imgContainerElement.addEventListener("pointerdown", __privateGet2(this, _onPointerDownImage));
    if (!this.keepMarkerCentered) {
      this.markerElement.addEventListener("pointerdown", __privateGet2(this, _onPointerDownMarker));
    }
    const resizeObserver = new ResizeObserver(__privateGet2(this, _handleAnchorResize));
    resizeObserver.observe(this.markerElement);
  }
  get anchor() {
    return __privateGet2(this, _anchor);
  }
  set anchor(newAnchor) {
    __privateSet2(this, _anchor, newAnchor);
    [this.anchorOffsetX, this.anchorOffsetY] = getAnchorOffset(this.markerElement, newAnchor);
    this.markerTransform = {
      anchorX: this.anchorOffsetX,
      anchorY: this.anchorOffsetY
    };
  }
  get markerTransform() {
    return __privateGet2(this, _markerTransform);
  }
  set markerTransform(val) {
    __privateSet2(this, _markerTransform, __spreadValues2(__spreadValues2({}, __privateGet2(this, _markerTransform)), val));
    __privateGet2(this, _updateMarkerTransform).call(this);
  }
  get isActive() {
    return __privateGet2(this, _isActive);
  }
  set isActive(val) {
    this.imgContainerElement.style.touchAction = val ? "none" : "";
    __privateSet2(this, _isActive, val);
  }
  get coordinate() {
    const adjustedPx = this.keepMarkerCentered ? this.imgCenterAdjustedPx : [
      this.imgCenterPx[0] - this.markerDeltaX,
      this.imgCenterPx[1] + this.markerDeltaY
    ];
    if (deepEquals(adjustedPx, this.imgCenterPx)) {
      return __privateGet2(this, _originalCoordinate);
    } else {
      const lngLat = merc.ll(adjustedPx, this.zoom);
      return [round2(lngLat[0], 6), round2(lngLat[1], 6)];
    }
  }
  set coordinate(lngLat) {
    __privateSet2(this, _originalCoordinate, lngLat);
    this.imgCenterPx = this.imgCenterAdjustedPx = merc.px(lngLat, this.zoom);
  }
  get imgCenterOffset() {
    return {
      x: this.imgCenterPx[0] - this.imgCenterAdjustedPx[0],
      y: this.imgCenterPx[1] - this.imgCenterAdjustedPx[1]
    };
  }
};
_anchor = /* @__PURE__ */ new WeakMap();
_handleAnchorResize = /* @__PURE__ */ new WeakMap();
_markerTransform = /* @__PURE__ */ new WeakMap();
_isActive = /* @__PURE__ */ new WeakMap();
_originalCoordinate = /* @__PURE__ */ new WeakMap();
_onPointerDownMarker = /* @__PURE__ */ new WeakMap();
_onPointerUpMarker = /* @__PURE__ */ new WeakMap();
_onPointerMoveMarker = /* @__PURE__ */ new WeakMap();
_onPointerDownImage = /* @__PURE__ */ new WeakMap();
_onPointerUpImage = /* @__PURE__ */ new WeakMap();
_onPointerMoveImage = /* @__PURE__ */ new WeakMap();
_updatePointerPosition = /* @__PURE__ */ new WeakMap();
_updateMarkerTransform = /* @__PURE__ */ new WeakMap();
_updateMarkerCorrection = /* @__PURE__ */ new WeakMap();
var mapboxgl_ctrl_logo_default = '<svg width="88" height="23" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill-rule="evenodd"><defs><path id="g" d="M11.5 2.25a9.25 9.25 0 1 1 0 18.5 9.25 9.25 0 0 1 0-18.5zM7 15.98c-.05-.33-.83-5.8 2.23-8.87a4.4 4.4 0 0 1 3.13-1.28c1.27 0 2.49.51 3.39 1.42.91.9 1.42 2.12 1.42 3.39a4.4 4.4 0 0 1-1.28 3.13C12.72 16.93 7 16 7 16v-.02zm8.3-5.48-2 .8-.8 2-.8-2-2-.8 2-.8.8-2 .8 2 2 .8z"/><path id="b" d="M50.63 8c.13 0 .23.1.23.23V9c.7-.76 1.7-1.18 2.73-1.18 2.17 0 3.95 1.85 3.95 4.17s-1.77 4.19-3.94 4.19A3.77 3.77 0 0 1 50.86 15v3.77c0 .13-.1.23-.23.23h-1.4a.23.23 0 0 1-.23-.23V8.23c0-.12.1-.23.23-.23h1.4zm-3.86.01.01-.01c.13 0 .22.1.22.22v7.55c0 .12-.1.23-.23.23h-1.4a.23.23 0 0 1-.23-.23V15a3.7 3.7 0 0 1-2.73 1.19c-2.17 0-3.94-1.87-3.94-4.19 0-2.32 1.77-4.19 3.94-4.19 1.03 0 2.02.43 2.73 1.18v-.75c0-.12.1-.23.23-.23h1.4zm26.38-.19a4.24 4.24 0 0 0-4.16 3.29 4.07 4.07 0 0 0 0 1.77 4.23 4.23 0 0 0 4.17 3.3 4.22 4.22 0 0 0 4.26-4.19 4.2 4.2 0 0 0-4.27-4.17zM60.63 5c.13 0 .23.1.23.23v3.76c.7-.76 1.7-1.18 2.73-1.18a4 4 0 0 1 3.84 3.28c.13.59.13 1.2 0 1.8a4 4 0 0 1-3.84 3.29A3.77 3.77 0 0 1 60.86 15v.77c0 .12-.1.23-.23.23h-1.4a.23.23 0 0 1-.23-.23V5.23c0-.12.1-.23.23-.23h1.4zm-34 11h-1.4a.23.23 0 0 1-.23-.23V8.22c.01-.13.1-.22.23-.22h1.4c.13 0 .22.11.23.22v.68c.5-.68 1.3-1.09 2.16-1.1h.03c1.09 0 2.09.6 2.6 1.55a2.73 2.73 0 0 1 2.44-1.56c1.62 0 2.93 1.25 2.9 2.78l.03 5.2c0 .13-.1.23-.23.23h-1.41a.23.23 0 0 1-.23-.23v-4.59c0-.98-.74-1.71-1.62-1.71-.8 0-1.46.7-1.59 1.62l.01 4.68c0 .13-.11.23-.23.23h-1.41a.23.23 0 0 1-.23-.23v-4.59c0-.98-.74-1.71-1.62-1.71-.85 0-1.54.79-1.6 1.8v4.5c0 .13-.1.23-.23.23zm53.62 0h-1.61a.27.27 0 0 1-.12-.03c-.1-.06-.13-.19-.06-.28l2.43-3.71-2.4-3.65a.21.21 0 0 1-.02-.12.2.2 0 0 1 .2-.21h1.61c.13 0 .24.06.3.17L82 10.54l1.4-2.37a.34.34 0 0 1 .3-.17h1.6l.12.03c.1.06.13.19.06.28l-2.37 3.65 2.43 3.7.01.13a.2.2 0 0 1-.2.21h-1.61a.33.33 0 0 1-.3-.17l-1.44-2.42-1.44 2.42a.34.34 0 0 1-.3.17zm-7.12-1.49A2.47 2.47 0 0 1 70.7 12a2.47 2.47 0 0 1 2.42-2.52 2.47 2.47 0 0 1 2.42 2.51 2.48 2.48 0 0 1-2.42 2.52zm-19.87 0a2.48 2.48 0 0 1-2.42-2.48v-.07a2.47 2.47 0 0 1 2.4-2.49 2.47 2.47 0 0 1 2.41 2.51 2.47 2.47 0 0 1-2.39 2.53zm-8.11-2.48c-.01 1.37-1.09 2.47-2.41 2.47s-2.42-1.12-2.42-2.51a2.47 2.47 0 0 1 2.4-2.52 2.46 2.46 0 0 1 2.41 2.48l.02.08zm18.12 2.47a2.47 2.47 0 0 1-2.41-2.48v-.06c.02-1.38 1.09-2.48 2.41-2.48s2.42 1.12 2.42 2.51a2.47 2.47 0 0 1-2.42 2.51z"/></defs><mask id="c"><rect width="100%" height="100%" fill="#fff"/><use xlink:href="#g"/><use xlink:href="#b"/></mask><g opacity=".3" stroke="#000" stroke-width="3"><circle mask="url(#c)" cx="11.5" cy="11.5" r="9.25"/><use xlink:href="#b" mask="url(#c)"/></g><g opacity=".9" fill="#fff"><use xlink:href="#g"/><use xlink:href="#b"/></g></svg>';
var ZOOM = 16;
var TEMPLATE4 = createElementFromString(`
<template>
  <div class="MapboxAddressMinimap" aria-hidden="true">
    <div class="MinimapImageContainer">
      <img class="MinimapImage" draggable="false"></img>
      <div class="MinimapInnerFrame">
        <div class="MinimapMarker"></div>
        <div class="MinimapAttribution">
          <div class="MinimapAttributionLogo">
            <a target="_blank" rel="noopener nofollow" href="https://www.mapbox.com/" aria-label="Mapbox logo">
              ${mapboxgl_ctrl_logo_default}
            </a>
          </div>
          <div class="MinimapAttributionText">
            <a target="_blank" href='https://www.mapbox.com/about/maps/'>© Mapbox</a><a target="_blank" href='http://www.openstreetmap.org/copyright'>© OpenStreetMap</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
`);
var STYLE_TOGGLE_TEMPLATE = createElementFromString(`
<template>
  <button type="button" class="MinimapStyleToggle"></button>
</template>
`);
var FOOTER_TEMPLATE = createElementFromString(`
<template>
  <div class="MinimapFooter">Adjust the marker on the map if it doesn't precisely match your location. This helps improve address data quality.</div>
</template>
`);
var ADJUST_PIN_TEXT = "Adjust pin";
var SAVE_TEXT = "Save";
var CANCEL_TEXT = "Cancel";
var EDIT_BUTTONS_TEMPLATE = createElementFromString(`
<template>
  <div class="MinimapEditButtons">
    <div class="Button ButtonPrimary MinimapButtonAdjust">${ADJUST_PIN_TEXT}</div>
    <div class="Button ButtonPrimary MinimapButtonSave" aria-hidden="true">${SAVE_TEXT}</div>
    <div class="Button MinimapButtonCancel" aria-hidden="true">${CANCEL_TEXT}</div>
  </div>
</template>
`);
var _canAdjustMarkerInternal;
var _isAdjustMarkerEditing;
var _imageLoaded;
var _feature2;
var _url;
var _width;
var _height;
var _binding6;
var _markerController;
var _accessToken;
var _themeInternal5;
var _satelliteToggleInternal;
var _mapStyleMode;
var _adjustBtnText;
var _saveBtnText;
var _cancelBtnText;
var _defaultMapStyle;
var _footer;
var _container;
var _toggleMarkerEditing;
var _handleStartMarkerEditing;
var _handleSaveMarkerEditing;
var _handleCancelMarkerEditing;
var _handleToggleMapStyle;
var _handleImageLoad;
var _handleImageError;
var _getImageUrl;
var _updateImageSrc;
var _getToggleBackgroundImageUrl;
var _setSize;
var _addMarkerEditControls;
var _removeMarkerEditControls;
var _addSatelliteToggle;
var _removeSatelliteToggle;
var MapboxAddressMinimap = class extends HTMLScopedElement {
  constructor() {
    super(...arguments);
    __privateAdd2(this, _canAdjustMarkerInternal, false);
    this.keepMarkerCentered = false;
    this.markerAnchor = "bottom";
    __privateAdd2(this, _isAdjustMarkerEditing, false);
    __privateAdd2(this, _imageLoaded, false);
    __privateAdd2(this, _feature2, void 0);
    __privateAdd2(this, _url, "");
    __privateAdd2(this, _width, void 0);
    __privateAdd2(this, _height, void 0);
    __privateAdd2(this, _binding6, void 0);
    __privateAdd2(this, _markerController, void 0);
    __privateAdd2(this, _accessToken, void 0);
    __privateAdd2(this, _themeInternal5, {});
    __privateAdd2(this, _satelliteToggleInternal, false);
    __privateAdd2(this, _mapStyleMode, "default");
    __privateAdd2(this, _adjustBtnText, void 0);
    __privateAdd2(this, _saveBtnText, void 0);
    __privateAdd2(this, _cancelBtnText, void 0);
    __privateAdd2(this, _defaultMapStyle, ["mapbox", "streets-v11"]);
    __privateAdd2(this, _footer, void 0);
    __privateAdd2(this, _container, void 0);
    __privateAdd2(this, _toggleMarkerEditing, () => {
      const { ImageContainer, ButtonAdjust, ButtonSave, ButtonCancel } = __privateGet2(this, _binding6);
      if (__privateGet2(this, _isAdjustMarkerEditing)) {
        ImageContainer.classList.add(`${this.dataset.seed}--draggable`);
        __privateGet2(this, _markerController).isActive = true;
        ButtonAdjust.setAttribute("aria-hidden", "true");
        ButtonSave.removeAttribute("aria-hidden");
        ButtonCancel.removeAttribute("aria-hidden");
      } else {
        ImageContainer.classList.remove(`${this.dataset.seed}--draggable`);
        __privateGet2(this, _markerController).isActive = false;
        ButtonAdjust.removeAttribute("aria-hidden");
        ButtonSave.setAttribute("aria-hidden", "true");
        ButtonCancel.setAttribute("aria-hidden", "true");
      }
    });
    __privateAdd2(this, _handleStartMarkerEditing, () => {
      __privateSet2(this, _isAdjustMarkerEditing, true);
      __privateGet2(this, _toggleMarkerEditing).call(this);
    });
    __privateAdd2(this, _handleSaveMarkerEditing, () => {
      if (this.feature.properties.full_address && !deepEquals(this.feature.geometry.coordinates, __privateGet2(this, _markerController).coordinate)) {
        const [lng, lat] = __privateGet2(this, _markerController).coordinate;
        sendFeedback(this.accessToken, {
          originalCoordinate: this.feature.geometry.coordinates,
          originalAddress: this.feature.properties.full_address,
          changes: {
            location: { longitude: lng, latitude: lat }
          }
        });
      }
      if (this.onSaveMarkerLocation) {
        this.onSaveMarkerLocation(__privateGet2(this, _markerController).coordinate);
      }
      __privateSet2(this, _isAdjustMarkerEditing, false);
      __privateGet2(this, _toggleMarkerEditing).call(this);
    });
    __privateAdd2(this, _handleCancelMarkerEditing, () => {
      __privateGet2(this, _markerController).reCenter();
      __privateSet2(this, _isAdjustMarkerEditing, false);
      __privateGet2(this, _toggleMarkerEditing).call(this);
    });
    __privateAdd2(this, _handleToggleMapStyle, () => {
      this.mapStyleMode = this.mapStyleMode === "default" ? "satellite" : "default";
    });
    __privateAdd2(this, _handleImageLoad, () => {
      if (!__privateGet2(this, _imageLoaded)) {
        __privateGet2(this, _markerController).reCenter();
      }
      __privateSet2(this, _imageLoaded, true);
      __privateGet2(this, _markerController) && __privateGet2(this, _markerController).handleMinimapResize();
    });
    __privateAdd2(this, _handleImageError, () => {
      __privateSet2(this, _imageLoaded, false);
    });
    __privateAdd2(this, _getImageUrl, (lngLatLike) => {
      if (__privateGet2(this, _width) === 0 || __privateGet2(this, _height) === 0)
        return "";
      const [username, styleId] = this.defaultMapStyle;
      const defaultBaseUrl = getStaticBaseUrl(username, styleId);
      const baseUrl = this.mapStyleMode === "default" ? defaultBaseUrl : STATIC_BASE_URL_SATELLITE;
      const skuToken = AUTOFILL_SKU_TOKEN_PREFIX + config.autofillSessionToken.toString();
      let imgUrl = baseUrl + LngLat.convert(lngLatLike).toArray().join(",") + "," + ZOOM + ",0/" + Math.min(__privateGet2(this, _width) * 2, MAX_IMAGE_DIM) + "x" + Math.min(__privateGet2(this, _height) * 2, MAX_IMAGE_DIM) + "?access_token=" + this.accessToken + "&attribution=false&logo=false";
      if (config.autofillSessionEnabled) {
        imgUrl += `&sku=${skuToken}`;
      }
      return imgUrl;
    });
    __privateAdd2(this, _updateImageSrc, () => {
      if (__privateGet2(this, _feature2)) {
        const lngLat = __privateGet2(this, _feature2).geometry.coordinates;
        __privateSet2(this, _url, __privateGet2(this, _getImageUrl).call(this, lngLat));
        const { Image } = __privateGet2(this, _binding6);
        Image.src = __privateGet2(this, _url);
      }
    });
    __privateAdd2(this, _getToggleBackgroundImageUrl, (styleMode) => {
      return `url("${getImage(styleMode === "default" ? "styleToggleDefault" : "styleToggleSatellite", this.theme)}")`;
    });
    __privateAdd2(this, _setSize, () => {
      const { MapboxAddressMinimap: MapboxAddressMinimap2, ImageContainer, Image } = __privateGet2(this, _binding6);
      const { width, height } = getElementSize(this.container);
      const [oldWidth, oldHeight] = [__privateGet2(this, _width), __privateGet2(this, _height)];
      __privateSet2(this, _width, Math.min(width, MAX_IMAGE_DIM));
      __privateSet2(this, _height, Math.min(height, MAX_IMAGE_DIM));
      MapboxAddressMinimap2.style.setProperty("width", `${__privateGet2(this, _width)}px`);
      MapboxAddressMinimap2.style.setProperty("height", `${__privateGet2(this, _height)}px`);
      ImageContainer.style.setProperty("height", `${__privateGet2(this, _height)}px`);
      ImageContainer.style.setProperty("width", `${__privateGet2(this, _width)}px`);
      const [imgWidth, imgHeight] = [Image.width, Image.height];
      if (__privateGet2(this, _width) > oldWidth && __privateGet2(this, _width) > imgWidth / 2 && imgWidth < MAX_IMAGE_DIM || __privateGet2(this, _height) > oldHeight && __privateGet2(this, _height) > imgHeight / 2 && imgHeight < MAX_IMAGE_DIM) {
        __privateGet2(this, _updateImageSrc).call(this);
      } else {
        __privateGet2(this, _markerController) && __privateGet2(this, _markerController).handleMinimapResize();
      }
    });
    __privateAdd2(this, _addMarkerEditControls, () => {
      const existingFooter = this.querySelector(".MinimapFooter");
      if (existingFooter)
        return;
      const footerElement = this.prepareTemplate(FOOTER_TEMPLATE);
      const minimapElement = this.querySelector(".MapboxAddressMinimap");
      if (!minimapElement)
        return;
      minimapElement.appendChild(footerElement);
      const existingEditBtns = this.querySelector(".MinimapEditButtons");
      if (existingEditBtns)
        return;
      const editButtonsElement = this.prepareTemplate(EDIT_BUTTONS_TEMPLATE);
      const innerFrame = this.querySelector(".MinimapInnerFrame");
      innerFrame.appendChild(editButtonsElement);
      __privateSet2(this, _binding6, __spreadProps2(__spreadValues2({}, __privateGet2(this, _binding6)), {
        EditButtons: this.querySelector(".MinimapEditButtons"),
        ButtonAdjust: this.querySelector(".MinimapButtonAdjust"),
        ButtonSave: this.querySelector(".MinimapButtonSave"),
        ButtonCancel: this.querySelector(".MinimapButtonCancel")
      }));
      const { ButtonAdjust, ButtonSave, ButtonCancel } = __privateGet2(this, _binding6);
      ButtonAdjust.addEventListener("click", __privateGet2(this, _handleStartMarkerEditing));
      ButtonSave.addEventListener("click", __privateGet2(this, _handleSaveMarkerEditing));
      ButtonCancel.addEventListener("click", __privateGet2(this, _handleCancelMarkerEditing));
    });
    __privateAdd2(this, _removeMarkerEditControls, () => {
      if (!__privateGet2(this, _binding6))
        return;
      const { EditButtons, ButtonAdjust, ButtonSave, ButtonCancel } = __privateGet2(this, _binding6);
      const existingFooter = this.querySelector(".MinimapFooter");
      existingFooter == null ? void 0 : existingFooter.remove();
      EditButtons == null ? void 0 : EditButtons.remove();
      if (ButtonAdjust) {
        ButtonAdjust.remove();
        ButtonAdjust.removeEventListener("click", __privateGet2(this, _handleStartMarkerEditing));
      }
      if (ButtonSave) {
        ButtonSave.remove();
        ButtonSave.removeEventListener("click", __privateGet2(this, _handleSaveMarkerEditing));
      }
      if (ButtonCancel) {
        ButtonCancel.remove();
        ButtonCancel.removeEventListener("click", __privateGet2(this, _handleCancelMarkerEditing));
      }
      delete __privateGet2(this, _binding6).EditButtons;
      delete __privateGet2(this, _binding6).ButtonAdjust;
      delete __privateGet2(this, _binding6).ButtonSave;
      delete __privateGet2(this, _binding6).ButtonCancel;
    });
    __privateAdd2(this, _addSatelliteToggle, () => {
      const existingToggle = this.querySelector(".MinimapStyleToggle");
      if (existingToggle)
        return;
      const toggleElement = this.prepareTemplate(STYLE_TOGGLE_TEMPLATE);
      const innerFrame = this.querySelector(".MinimapInnerFrame");
      if (!innerFrame)
        return;
      innerFrame.appendChild(toggleElement);
      __privateGet2(this, _binding6).MapStyleToggle = toggleElement;
      toggleElement.addEventListener("click", __privateGet2(this, _handleToggleMapStyle));
      toggleElement.style.backgroundImage = __privateGet2(this, _getToggleBackgroundImageUrl).call(this, this.mapStyleMode === "default" ? "satellite" : "default");
      toggleElement.setAttribute("title", `Switch to ${this.mapStyleMode === "default" ? "Satellite" : "Default"}`);
    });
    __privateAdd2(this, _removeSatelliteToggle, () => {
      if (!__privateGet2(this, _binding6))
        return;
      const { MapStyleToggle } = __privateGet2(this, _binding6);
      if (!MapStyleToggle)
        return;
      MapStyleToggle.remove();
      MapStyleToggle.removeEventListener("click", __privateGet2(this, _handleToggleMapStyle));
      delete __privateGet2(this, _binding6).MapStyleToggle;
    });
  }
  get canAdjustMarker() {
    return __privateGet2(this, _canAdjustMarkerInternal);
  }
  set canAdjustMarker(val) {
    __privateSet2(this, _canAdjustMarkerInternal, val);
    val ? __privateGet2(this, _addMarkerEditControls).call(this) : __privateGet2(this, _removeMarkerEditControls).call(this);
  }
  get accessToken() {
    return __privateGet2(this, _accessToken) || config.accessToken;
  }
  set accessToken(newToken) {
    __privateSet2(this, _accessToken, newToken);
  }
  get feature() {
    return __privateGet2(this, _feature2);
  }
  set feature(feature) {
    __privateSet2(this, _feature2, feature);
    if (!feature) {
      this.hide();
    } else {
      this.show();
    }
  }
  get template() {
    return TEMPLATE4;
  }
  get templateStyle() {
    return style_default;
  }
  get templateUserStyle() {
    return getThemeCSS(".MapboxAddressMinimap", this.theme);
  }
  get satelliteToggle() {
    return __privateGet2(this, _satelliteToggleInternal);
  }
  set satelliteToggle(val) {
    __privateSet2(this, _satelliteToggleInternal, val);
    val ? __privateGet2(this, _addSatelliteToggle).call(this) : __privateGet2(this, _removeSatelliteToggle).call(this);
  }
  get theme() {
    return __privateGet2(this, _themeInternal5);
  }
  set theme(theme) {
    __privateSet2(this, _themeInternal5, theme);
    if (!__privateGet2(this, _binding6) || !theme) {
      return;
    }
    this.updateTemplateUserStyle(getThemeCSS(".MapboxAddressMinimap", theme));
    const { Marker, MapStyleToggle } = __privateGet2(this, _binding6);
    Marker.innerHTML = getIcon("marker", theme);
    if (MapStyleToggle) {
      MapStyleToggle.style.backgroundImage = __privateGet2(this, _getToggleBackgroundImageUrl).call(this, this.mapStyleMode === "default" ? "satellite" : "default");
    }
  }
  get adjustBtnText() {
    return __privateGet2(this, _adjustBtnText) || ADJUST_PIN_TEXT;
  }
  set adjustBtnText(val) {
    __privateSet2(this, _adjustBtnText, val);
    const adjustBtn = this.querySelector(".MinimapButtonAdjust");
    adjustBtn.textContent = val || ADJUST_PIN_TEXT;
  }
  get saveBtnText() {
    return __privateGet2(this, _saveBtnText) || SAVE_TEXT;
  }
  set saveBtnText(val) {
    __privateSet2(this, _saveBtnText, val);
    const saveBtn = this.querySelector(".MinimapButtonSave");
    saveBtn.textContent = val || SAVE_TEXT;
  }
  get cancelBtnText() {
    return __privateGet2(this, _cancelBtnText) || CANCEL_TEXT;
  }
  set cancelBtnText(val) {
    __privateSet2(this, _cancelBtnText, val);
    const cancelBtn = this.querySelector(".MinimapButtonCancel");
    cancelBtn.textContent = val || CANCEL_TEXT;
  }
  get mapStyleMode() {
    return __privateGet2(this, _mapStyleMode);
  }
  set mapStyleMode(styleMode) {
    const prevStyleMode = __privateGet2(this, _mapStyleMode);
    if (prevStyleMode === styleMode)
      return;
    __privateSet2(this, _mapStyleMode, styleMode);
    if (!__privateGet2(this, _binding6)) {
      return;
    }
    const { MapStyleToggle } = __privateGet2(this, _binding6);
    if (!MapStyleToggle) {
      return;
    }
    MapStyleToggle.style.backgroundImage = __privateGet2(this, _getToggleBackgroundImageUrl).call(this, prevStyleMode);
    MapStyleToggle.setAttribute("title", `Switch to ${prevStyleMode === "satellite" ? "Satellite" : "Default"}`);
    __privateGet2(this, _updateImageSrc).call(this);
  }
  get defaultMapStyle() {
    return __privateGet2(this, _defaultMapStyle);
  }
  set defaultMapStyle(style) {
    __privateSet2(this, _defaultMapStyle, style);
    __privateGet2(this, _updateImageSrc).call(this);
  }
  get footer() {
    return __privateGet2(this, _footer);
  }
  set footer(val) {
    __privateSet2(this, _footer, val);
    const footerEl = this.querySelector(".MinimapFooter");
    if (footerEl) {
      if (typeof val === "string") {
        footerEl.textContent = val;
        footerEl.removeAttribute("aria-hidden");
      } else if (!val) {
        footerEl.setAttribute("aria-hidden", "true");
      } else {
        footerEl.removeAttribute("aria-hidden");
      }
    }
  }
  get container() {
    return __privateGet2(this, _container);
  }
  set container(newContainer) {
    if (newContainer) {
      newContainer.style.position = "relative";
      __privateSet2(this, _container, newContainer);
    }
  }
  show() {
    if (!__privateGet2(this, _feature2)) {
      return;
    }
    const lngLat = __privateGet2(this, _feature2).geometry.coordinates;
    __privateGet2(this, _markerController).coordinate = lngLat;
    __privateSet2(this, _url, __privateGet2(this, _getImageUrl).call(this, lngLat));
    const { MapboxAddressMinimap: MapboxAddressMinimap2, Image } = __privateGet2(this, _binding6);
    Image.src = __privateGet2(this, _url);
    MapboxAddressMinimap2.removeAttribute("aria-hidden");
  }
  hide() {
    const { MapboxAddressMinimap: MapboxAddressMinimap2 } = __privateGet2(this, _binding6);
    MapboxAddressMinimap2.setAttribute("aria-hidden", "true");
  }
  connectedCallback() {
    super.connectedCallback();
    __privateSet2(this, _binding6, bindElements(this, {
      MapboxAddressMinimap: ".MapboxAddressMinimap",
      ImageContainer: ".MinimapImageContainer",
      Image: ".MinimapImage",
      Marker: ".MinimapMarker",
      MapStyleToggle: ".MinimapStyleToggle",
      EditButtons: ".MinimapEditButtons",
      ButtonAdjust: ".MinimapButtonAdjust",
      ButtonSave: ".MinimapButtonSave",
      ButtonCancel: ".MinimapButtonCancel"
    }));
    this.mapStyleMode = __privateGet2(this, _mapStyleMode);
    this.theme = __spreadValues2({}, this.theme);
    if (this.canAdjustMarker) {
      __privateGet2(this, _addMarkerEditControls).call(this);
    }
    if (this.satelliteToggle) {
      __privateGet2(this, _addSatelliteToggle).call(this);
    }
    this.container = this.parentElement;
    const resizeObserver = new ResizeObserver(__privateGet2(this, _setSize));
    resizeObserver.observe(this.container);
    __privateGet2(this, _setSize).call(this);
    const { MapboxAddressMinimap: MapboxAddressMinimap2, ImageContainer, Image, Marker } = __privateGet2(this, _binding6);
    __privateSet2(this, _markerController, new MarkerController(ImageContainer, Image, Marker, this.keepMarkerCentered, ZOOM, this.markerAnchor));
    __privateGet2(this, _markerController).reCenter();
    Image.onload = __privateGet2(this, _handleImageLoad);
    Image.onerror = __privateGet2(this, _handleImageError);
    Image.src = __privateGet2(this, _url);
    if (__privateGet2(this, _feature2))
      MapboxAddressMinimap2.removeAttribute("aria-hidden");
    else
      MapboxAddressMinimap2.setAttribute("aria-hidden", "true");
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "access-token") {
      this.accessToken = newValue;
    } else if (name === "can-adjust-marker") {
      this.canAdjustMarker = newValue === "true";
    } else if (name === "keep-marker-centered") {
      this.keepMarkerCentered = newValue === "true";
    } else if (name === "marker-anchor") {
      const newAnchor = newValue;
      this.markerAnchor = newAnchor;
      __privateGet2(this, _markerController) && (__privateGet2(this, _markerController).anchor = newAnchor);
    } else if (name === "satellite-toggle") {
      this.satelliteToggle = newValue === "true";
    }
  }
};
_canAdjustMarkerInternal = /* @__PURE__ */ new WeakMap();
_isAdjustMarkerEditing = /* @__PURE__ */ new WeakMap();
_imageLoaded = /* @__PURE__ */ new WeakMap();
_feature2 = /* @__PURE__ */ new WeakMap();
_url = /* @__PURE__ */ new WeakMap();
_width = /* @__PURE__ */ new WeakMap();
_height = /* @__PURE__ */ new WeakMap();
_binding6 = /* @__PURE__ */ new WeakMap();
_markerController = /* @__PURE__ */ new WeakMap();
_accessToken = /* @__PURE__ */ new WeakMap();
_themeInternal5 = /* @__PURE__ */ new WeakMap();
_satelliteToggleInternal = /* @__PURE__ */ new WeakMap();
_mapStyleMode = /* @__PURE__ */ new WeakMap();
_adjustBtnText = /* @__PURE__ */ new WeakMap();
_saveBtnText = /* @__PURE__ */ new WeakMap();
_cancelBtnText = /* @__PURE__ */ new WeakMap();
_defaultMapStyle = /* @__PURE__ */ new WeakMap();
_footer = /* @__PURE__ */ new WeakMap();
_container = /* @__PURE__ */ new WeakMap();
_toggleMarkerEditing = /* @__PURE__ */ new WeakMap();
_handleStartMarkerEditing = /* @__PURE__ */ new WeakMap();
_handleSaveMarkerEditing = /* @__PURE__ */ new WeakMap();
_handleCancelMarkerEditing = /* @__PURE__ */ new WeakMap();
_handleToggleMapStyle = /* @__PURE__ */ new WeakMap();
_handleImageLoad = /* @__PURE__ */ new WeakMap();
_handleImageError = /* @__PURE__ */ new WeakMap();
_getImageUrl = /* @__PURE__ */ new WeakMap();
_updateImageSrc = /* @__PURE__ */ new WeakMap();
_getToggleBackgroundImageUrl = /* @__PURE__ */ new WeakMap();
_setSize = /* @__PURE__ */ new WeakMap();
_addMarkerEditControls = /* @__PURE__ */ new WeakMap();
_removeMarkerEditControls = /* @__PURE__ */ new WeakMap();
_addSatelliteToggle = /* @__PURE__ */ new WeakMap();
_removeSatelliteToggle = /* @__PURE__ */ new WeakMap();
MapboxAddressMinimap.observedAttributes = [
  "access-token",
  "can-adjust-marker",
  "keep-marker-centered",
  "marker-anchor",
  "satellite-toggle"
];
window.MapboxAddressMinimap = MapboxAddressMinimap;
if (!window.customElements.get("mapbox-address-minimap")) {
  customElements.define("mapbox-address-minimap", MapboxAddressMinimap);
}
var _input3;
var _collection;
var _session3;
var _initialAutocompleteValue2;
var _onHandleInput3;
var _onHandleSelect3;
var _onHandleBlur3;
var _onHandleFocus2;
var _handleSuggest3;
var _handleSuggestError3;
var _handleRetrieve3;
_input3 = /* @__PURE__ */ new WeakMap();
_collection = /* @__PURE__ */ new WeakMap();
_session3 = /* @__PURE__ */ new WeakMap();
_initialAutocompleteValue2 = /* @__PURE__ */ new WeakMap();
_onHandleInput3 = /* @__PURE__ */ new WeakMap();
_onHandleSelect3 = /* @__PURE__ */ new WeakMap();
_onHandleBlur3 = /* @__PURE__ */ new WeakMap();
_onHandleFocus2 = /* @__PURE__ */ new WeakMap();
_handleSuggest3 = /* @__PURE__ */ new WeakMap();
_handleSuggestError3 = /* @__PURE__ */ new WeakMap();
_handleRetrieve3 = /* @__PURE__ */ new WeakMap();
var _currentInputs;
var _autofill2;
var _options2;
var _theme;
var _popoverOptions2;
var _handleObserve2;
var _observer2;
var _handleBrowserAutofill2;
_currentInputs = /* @__PURE__ */ new WeakMap();
_autofill2 = /* @__PURE__ */ new WeakMap();
_options2 = /* @__PURE__ */ new WeakMap();
_theme = /* @__PURE__ */ new WeakMap();
_popoverOptions2 = /* @__PURE__ */ new WeakMap();
_handleObserve2 = /* @__PURE__ */ new WeakMap();
_observer2 = /* @__PURE__ */ new WeakMap();
_handleBrowserAutofill2 = /* @__PURE__ */ new WeakMap();

// node_modules/@mapbox/search-js-react/dist/index-esm.js
var import_react = __toESM(require_react());
var import_react2 = __toESM(require_react());
var import_react3 = __toESM(require_react());
var import_react4 = __toESM(require_react());
var import_react5 = __toESM(require_react());
var import_react6 = __toESM(require_react());
var import_react7 = __toESM(require_react());
var import_react8 = __toESM(require_react());
var __defProp3 = Object.defineProperty;
var __getOwnPropSymbols3 = Object.getOwnPropertySymbols;
var __hasOwnProp3 = Object.prototype.hasOwnProperty;
var __propIsEnum3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp3 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp3.call(b, prop))
      __defNormalProp3(a, prop, b[prop]);
  if (__getOwnPropSymbols3)
    for (var prop of __getOwnPropSymbols3(b)) {
      if (__propIsEnum3.call(b, prop))
        __defNormalProp3(a, prop, b[prop]);
    }
  return a;
};
var __objRest2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp3.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols3)
    for (var prop of __getOwnPropSymbols3(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum3.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var AddressAutofill = import_react.default.forwardRef((props, refProp) => {
  const {
    accessToken,
    options,
    theme,
    popoverOptions,
    confirmOnBrowserAutofill,
    browserAutofillEnabled,
    children,
    onChange,
    onSuggest,
    onSuggestError,
    onRetrieve,
    interceptSearch
  } = props;
  const ref = (0, import_react.useRef)();
  (0, import_react.useImperativeHandle)(refProp, () => ({
    focus: () => {
      if (ref.current)
        return ref.current.focus();
      throw new Error("AddressAutofill is not mounted");
    }
  }));
  (0, import_react.useEffect)(() => {
    if (ref.current)
      ref.current.options = options;
  }, [ref.current, options]);
  (0, import_react.useEffect)(() => {
    if (ref.current)
      ref.current.interceptSearch = interceptSearch;
  }, [ref.current, options]);
  (0, import_react.useEffect)(() => {
    if (ref.current)
      ref.current.theme = theme;
  }, [ref.current, theme]);
  (0, import_react.useEffect)(() => {
    if (ref.current)
      ref.current.popoverOptions = popoverOptions;
  }, [ref.current, popoverOptions]);
  (0, import_react.useEffect)(() => {
    if (ref.current)
      ref.current.confirmOnBrowserAutofill = confirmOnBrowserAutofill;
  }, [ref.current, confirmOnBrowserAutofill]);
  (0, import_react.useEffect)(() => {
    if (ref.current)
      ref.current.browserAutofillEnabled = browserAutofillEnabled;
  }, [ref.current, browserAutofillEnabled]);
  (0, import_react.useEffect)(() => {
    const node = ref.current;
    if (!node)
      return;
    if (!onSuggest)
      return;
    const fn = (e) => onSuggest(e.detail);
    node.addEventListener("suggest", fn);
    return () => {
      node.removeEventListener("suggest", fn);
    };
  }, [ref.current, onSuggest]);
  (0, import_react.useEffect)(() => {
    const node = ref.current;
    if (!node)
      return;
    if (!onSuggestError)
      return;
    const fn = (e) => onSuggestError(e.detail);
    node.addEventListener("suggesterror", fn);
    return () => {
      node.removeEventListener("suggesterror", fn);
    };
  }, [ref.current, onSuggestError]);
  (0, import_react.useEffect)(() => {
    const node = ref.current;
    if (!node)
      return;
    if (!onRetrieve)
      return;
    const fn = (e) => onRetrieve(e.detail);
    node.addEventListener("retrieve", fn);
    return () => {
      node.removeEventListener("retrieve", fn);
    };
  }, [ref.current, onRetrieve]);
  (0, import_react.useEffect)(() => {
    const node = ref.current;
    if (!node)
      return;
    if (!onChange)
      return;
    const fn = (e) => {
      if (e.target !== e.currentTarget)
        return;
      onChange(e.detail);
    };
    node.addEventListener("input", fn);
    return () => {
      node.removeEventListener("input", fn);
    };
  }, [ref.current, onChange]);
  (0, import_react.useEffect)(() => {
    if (ref.current)
      ref.current.accessToken = accessToken;
  }, [ref.current, accessToken]);
  return import_react.default.createElement("mapbox-address-autofill", {
    ref
  }, children);
});
var SearchBox = import_react2.default.forwardRef((props, refProp) => {
  const {
    accessToken,
    options,
    theme,
    popoverOptions,
    placeholder: placeholder2,
    map,
    marker,
    mapboxgl,
    value,
    onChange,
    onSuggest,
    onSuggestError,
    onRetrieve,
    interceptSearch
  } = props;
  const ref = (0, import_react2.useRef)();
  (0, import_react2.useImperativeHandle)(refProp, () => ({
    focus: () => {
      if (ref.current)
        return ref.current.focus();
      throw new Error("SearchBox is not mounted");
    },
    search: (text) => {
      if (ref.current)
        return ref.current.search(text);
      throw new Error("SearchBox is not mounted");
    }
  }));
  (0, import_react2.useEffect)(() => {
    if (ref.current)
      ref.current.options = options || {};
  }, [ref.current, options]);
  (0, import_react2.useEffect)(() => {
    if (ref.current)
      ref.current.interceptSearch = interceptSearch;
  }, [ref.current, interceptSearch]);
  (0, import_react2.useEffect)(() => {
    if (ref.current)
      ref.current.theme = theme;
  }, [ref.current, theme]);
  (0, import_react2.useEffect)(() => {
    if (ref.current)
      ref.current.popoverOptions = popoverOptions;
  }, [ref.current, popoverOptions]);
  (0, import_react2.useEffect)(() => {
    if (ref.current)
      ref.current.placeholder = placeholder2;
  }, [ref.current, placeholder2]);
  (0, import_react2.useEffect)(() => {
    if (ref.current)
      ref.current.value = value;
  }, [ref.current, value]);
  (0, import_react2.useEffect)(() => {
    const node = ref.current;
    if (!node)
      return;
    node.bindMap(map);
    return () => {
      node.unbindMap();
    };
  }, [ref.current, map]);
  (0, import_react2.useEffect)(() => {
    if (ref.current)
      ref.current.marker = marker;
  }, [ref.current, marker]);
  (0, import_react2.useEffect)(() => {
    if (ref.current)
      ref.current.mapboxgl = mapboxgl;
  }, [ref.current, mapboxgl]);
  (0, import_react2.useEffect)(() => {
    const node = ref.current;
    if (!node)
      return;
    if (!onSuggest)
      return;
    const fn = (e) => onSuggest(e.detail);
    node.addEventListener("suggest", fn);
    return () => {
      node.removeEventListener("suggest", fn);
    };
  }, [ref.current, onSuggest]);
  (0, import_react2.useEffect)(() => {
    const node = ref.current;
    if (!node)
      return;
    if (!onSuggestError)
      return;
    const fn = (e) => onSuggestError(e.detail);
    node.addEventListener("suggesterror", fn);
    return () => {
      node.removeEventListener("suggesterror", fn);
    };
  }, [ref.current, onSuggestError]);
  (0, import_react2.useEffect)(() => {
    const node = ref.current;
    if (!node)
      return;
    if (!onRetrieve)
      return;
    const fn = (e) => onRetrieve(e.detail);
    node.addEventListener("retrieve", fn);
    return () => {
      node.removeEventListener("retrieve", fn);
    };
  }, [ref.current, onRetrieve]);
  (0, import_react2.useEffect)(() => {
    const node = ref.current;
    if (!node)
      return;
    if (!onChange)
      return;
    const fn = (e) => {
      if (e.target !== e.currentTarget)
        return;
      onChange(e.detail);
    };
    node.addEventListener("input", fn);
    return () => {
      node.removeEventListener("input", fn);
    };
  }, [ref.current, onChange]);
  (0, import_react2.useEffect)(() => {
    if (ref.current)
      ref.current.accessToken = accessToken;
  }, [ref.current, accessToken]);
  return import_react2.default.createElement("mapbox-search-box", {
    ref
  });
});
function AddressMinimap(props) {
  const {
    canAdjustMarker = false,
    keepMarkerCentered = false,
    markerAnchor = "bottom",
    onSaveMarkerLocation,
    show = false,
    accessToken,
    feature = null,
    adjustBtnText,
    saveBtnText,
    cancelBtnText,
    satelliteToggle = false,
    theme,
    mapStyleMode = "default",
    defaultMapStyle = ["mapbox", "streets-v11"],
    footer
  } = props;
  const ref = (0, import_react3.useRef)();
  (0, import_react3.useEffect)(() => {
    if (!ref.current)
      return;
    if (show) {
      ref.current.show();
    } else {
      ref.current.hide();
    }
  }, [ref.current, show]);
  (0, import_react3.useEffect)(() => {
    if (ref.current)
      ref.current.theme = theme;
  }, [ref.current, theme]);
  (0, import_react3.useEffect)(() => {
    if (ref.current)
      ref.current.feature = show ? feature : null;
  }, [ref.current, feature, show]);
  (0, import_react3.useEffect)(() => {
    if (ref.current)
      ref.current.mapStyleMode = mapStyleMode;
  }, [ref.current, mapStyleMode]);
  (0, import_react3.useEffect)(() => {
    if (adjustBtnText === void 0)
      return;
    if (ref.current)
      ref.current.adjustBtnText = adjustBtnText;
  }, [ref.current, adjustBtnText]);
  (0, import_react3.useEffect)(() => {
    if (saveBtnText === void 0)
      return;
    if (ref.current)
      ref.current.saveBtnText = saveBtnText;
  }, [ref.current, saveBtnText]);
  (0, import_react3.useEffect)(() => {
    if (cancelBtnText === void 0)
      return;
    if (ref.current)
      ref.current.cancelBtnText = cancelBtnText;
  }, [ref.current, cancelBtnText]);
  (0, import_react3.useEffect)(() => {
    if (ref.current)
      ref.current.defaultMapStyle = defaultMapStyle;
  }, [ref.current, defaultMapStyle]);
  (0, import_react3.useEffect)(() => {
    if (footer === void 0)
      return;
    if (ref.current)
      ref.current.footer = footer;
  }, [ref.current, footer]);
  (0, import_react3.useEffect)(() => {
    if (ref.current)
      ref.current.accessToken = accessToken;
  }, [ref.current, accessToken]);
  (0, import_react3.useEffect)(() => {
    if (ref.current)
      ref.current.onSaveMarkerLocation = onSaveMarkerLocation;
  }, [ref.current, onSaveMarkerLocation]);
  return import_react3.default.createElement("mapbox-address-minimap", {
    ref,
    "can-adjust-marker": canAdjustMarker,
    "keep-marker-centered": keepMarkerCentered,
    "marker-anchor": markerAnchor,
    "satellite-toggle": satelliteToggle
  });
}
function useEvented(evented, eventName, cb) {
  const cbRef = (0, import_react4.useRef)(cb);
  (0, import_react4.useEffect)(() => {
    cbRef.current = cb;
  });
  (0, import_react4.useEffect)(() => {
    if (!evented)
      return;
    const fn = (object) => cbRef.current(object);
    evented.addEventListener(eventName, fn);
    return () => {
      evented.removeEventListener(eventName, fn);
    };
  }, [evented, eventName, cbRef]);
}
var DEFAULTS = AddressAutofillCore.defaults;
function useAddressAutofillCore(options) {
  const autofill = (0, import_react5.useMemo)(() => {
    return new AddressAutofillCore();
  }, []);
  (0, import_react5.useEffect)(() => {
    const _a = options, { accessToken } = _a, restOptions = __objRest2(_a, ["accessToken"]);
    autofill.accessToken = accessToken;
    autofill.defaults = __spreadValues3(__spreadValues3({}, DEFAULTS), restOptions);
  }, [options]);
  return autofill;
}
var DEFAULTS2 = SearchBoxCore.defaults;
function useSearchBoxCore(options) {
  const search = (0, import_react6.useMemo)(() => {
    return new SearchBoxCore();
  }, []);
  (0, import_react6.useEffect)(() => {
    const _a = options, { accessToken } = _a, restOptions = __objRest2(_a, ["accessToken"]);
    search.accessToken = accessToken;
    search.defaults = __spreadValues3(__spreadValues3({}, DEFAULTS2), restOptions);
  }, [options]);
  return search;
}
function useSearchSession(search) {
  const searchSession = (0, import_react7.useMemo)(() => {
    return new SearchSession(search);
  }, [search]);
  if (search instanceof SearchBoxCore) {
    return searchSession;
  } else {
    return searchSession;
  }
}
function useConfirmAddress(optionsArg = {}) {
  const formRef = (0, import_react8.useRef)(null);
  return (0, import_react8.useMemo)(() => {
    return {
      formRef,
      showConfirm: () => confirmAddress(formRef.current, optionsArg)
    };
  }, [formRef, optionsArg]);
}
export {
  AddressAutofill,
  AddressMinimap,
  SearchBox,
  config,
  useAddressAutofillCore,
  useConfirmAddress,
  useEvented,
  useAddressAutofillCore as useMapboxAutofill,
  useSearchBoxCore,
  useSearchSession
};
/*! Bundled license information:

tabbable/dist/index.esm.js:
  (*!
  * tabbable 5.3.3
  * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
  *)

focus-trap/dist/focus-trap.esm.js:
  (*!
  * focus-trap 6.9.4
  * @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
  *)
*/
//# sourceMappingURL=@mapbox_search-js-react.js.map
