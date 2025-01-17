import {
  require_lodash
} from "./chunk-IF2W4GXE.js";
import {
  require_subtag
} from "./chunk-Q3S3AKX4.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS
} from "./chunk-ROME4SDB.js";

// node_modules/xtend/immutable.js
var require_immutable = __commonJS({
  "node_modules/xtend/immutable.js"(exports, module) {
    module.exports = extend;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function extend() {
      var target = {};
      for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    }
  }
});

// node_modules/fuzzy/lib/fuzzy.js
var require_fuzzy = __commonJS({
  "node_modules/fuzzy/lib/fuzzy.js"(exports, module) {
    (function() {
      var root = this;
      var fuzzy = {};
      if (typeof exports !== "undefined") {
        module.exports = fuzzy;
      } else {
        root.fuzzy = fuzzy;
      }
      fuzzy.simpleFilter = function(pattern, array) {
        return array.filter(function(str) {
          return fuzzy.test(pattern, str);
        });
      };
      fuzzy.test = function(pattern, str) {
        return fuzzy.match(pattern, str) !== null;
      };
      fuzzy.match = function(pattern, str, opts) {
        opts = opts || {};
        var patternIdx = 0, result = [], len = str.length, totalScore = 0, currScore = 0, pre = opts.pre || "", post = opts.post || "", compareString = opts.caseSensitive && str || str.toLowerCase(), ch;
        pattern = opts.caseSensitive && pattern || pattern.toLowerCase();
        for (var idx = 0; idx < len; idx++) {
          ch = str[idx];
          if (compareString[idx] === pattern[patternIdx]) {
            ch = pre + ch + post;
            patternIdx += 1;
            currScore += 1 + currScore;
          } else {
            currScore = 0;
          }
          totalScore += currScore;
          result[result.length] = ch;
        }
        if (patternIdx === pattern.length) {
          totalScore = compareString === pattern ? Infinity : totalScore;
          return { rendered: result.join(""), score: totalScore };
        }
        return null;
      };
      fuzzy.filter = function(pattern, arr, opts) {
        if (!arr || arr.length === 0) {
          return [];
        }
        if (typeof pattern !== "string") {
          return arr;
        }
        opts = opts || {};
        return arr.reduce(function(prev, element, idx, arr2) {
          var str = element;
          if (opts.extract) {
            str = opts.extract(element);
          }
          var rendered = fuzzy.match(pattern, str, opts);
          if (rendered != null) {
            prev[prev.length] = {
              string: rendered.rendered,
              score: rendered.score,
              index: idx,
              original: element
            };
          }
          return prev;
        }, []).sort(function(a, b) {
          var compare = b.score - a.score;
          if (compare)
            return compare;
          return a.index - b.index;
        });
      };
    })();
  }
});

// node_modules/suggestions/src/list.js
var require_list = __commonJS({
  "node_modules/suggestions/src/list.js"(exports, module) {
    "use strict";
    var List = function(component) {
      this.component = component;
      this.items = [];
      this.active = 0;
      this.wrapper = document.createElement("div");
      this.wrapper.className = "suggestions-wrapper";
      this.element = document.createElement("ul");
      this.element.className = "suggestions";
      this.wrapper.appendChild(this.element);
      this.selectingListItem = false;
      component.el.parentNode.insertBefore(this.wrapper, component.el.nextSibling);
      return this;
    };
    List.prototype.show = function() {
      this.element.style.display = "block";
    };
    List.prototype.hide = function() {
      this.element.style.display = "none";
    };
    List.prototype.add = function(item) {
      this.items.push(item);
    };
    List.prototype.clear = function() {
      this.items = [];
      this.active = 0;
    };
    List.prototype.isEmpty = function() {
      return !this.items.length;
    };
    List.prototype.isVisible = function() {
      return this.element.style.display === "block";
    };
    List.prototype.draw = function() {
      this.element.innerHTML = "";
      if (this.items.length === 0) {
        this.hide();
        return;
      }
      for (var i = 0; i < this.items.length; i++) {
        this.drawItem(this.items[i], this.active === i);
      }
      this.show();
    };
    List.prototype.drawItem = function(item, active) {
      var li = document.createElement("li"), a = document.createElement("a");
      if (active)
        li.className += " active";
      a.innerHTML = item.string;
      li.appendChild(a);
      this.element.appendChild(li);
      li.addEventListener("mousedown", (function() {
        this.selectingListItem = true;
      }).bind(this));
      li.addEventListener("mouseup", (function() {
        this.handleMouseUp.call(this, item);
      }).bind(this));
    };
    List.prototype.handleMouseUp = function(item) {
      this.selectingListItem = false;
      this.component.value(item.original);
      this.clear();
      this.draw();
    };
    List.prototype.move = function(index) {
      this.active = index;
      this.draw();
    };
    List.prototype.previous = function() {
      this.move(this.active === 0 ? this.items.length - 1 : this.active - 1);
    };
    List.prototype.next = function() {
      this.move(this.active === this.items.length - 1 ? 0 : this.active + 1);
    };
    List.prototype.drawError = function(msg) {
      var li = document.createElement("li");
      li.innerHTML = msg;
      this.element.appendChild(li);
      this.show();
    };
    module.exports = List;
  }
});

// node_modules/suggestions/src/suggestions.js
var require_suggestions = __commonJS({
  "node_modules/suggestions/src/suggestions.js"(exports, module) {
    "use strict";
    var extend = require_immutable();
    var fuzzy = require_fuzzy();
    var List = require_list();
    var Suggestions = function(el, data, options) {
      options = options || {};
      this.options = extend({
        minLength: 2,
        limit: 5,
        filter: true,
        hideOnBlur: true
      }, options);
      this.el = el;
      this.data = data || [];
      this.list = new List(this);
      this.query = "";
      this.selected = null;
      this.list.draw();
      this.el.addEventListener("keyup", (function(e) {
        this.handleKeyUp(e.keyCode);
      }).bind(this), false);
      this.el.addEventListener("keydown", (function(e) {
        this.handleKeyDown(e);
      }).bind(this));
      this.el.addEventListener("focus", (function() {
        this.handleFocus();
      }).bind(this));
      this.el.addEventListener("blur", (function() {
        this.handleBlur();
      }).bind(this));
      this.el.addEventListener("paste", (function(e) {
        this.handlePaste(e);
      }).bind(this));
      this.render = this.options.render ? this.options.render.bind(this) : this.render.bind(this);
      this.getItemValue = this.options.getItemValue ? this.options.getItemValue.bind(this) : this.getItemValue.bind(this);
      return this;
    };
    Suggestions.prototype.handleKeyUp = function(keyCode) {
      if (keyCode === 40 || keyCode === 38 || keyCode === 27 || keyCode === 13 || keyCode === 9)
        return;
      this.handleInputChange(this.el.value);
    };
    Suggestions.prototype.handleKeyDown = function(e) {
      switch (e.keyCode) {
        case 13:
        case 9:
          if (!this.list.isEmpty()) {
            if (this.list.isVisible()) {
              e.preventDefault();
            }
            this.value(this.list.items[this.list.active].original);
            this.list.hide();
          }
          break;
        case 27:
          if (!this.list.isEmpty())
            this.list.hide();
          break;
        case 38:
          this.list.previous();
          break;
        case 40:
          this.list.next();
          break;
      }
    };
    Suggestions.prototype.handleBlur = function() {
      if (!this.list.selectingListItem && this.options.hideOnBlur) {
        this.list.hide();
      }
    };
    Suggestions.prototype.handlePaste = function(e) {
      if (e.clipboardData) {
        this.handleInputChange(e.clipboardData.getData("Text"));
      } else {
        var self = this;
        setTimeout(function() {
          self.handleInputChange(e.target.value);
        }, 100);
      }
    };
    Suggestions.prototype.handleInputChange = function(query) {
      this.query = this.normalize(query);
      this.list.clear();
      if (this.query.length < this.options.minLength) {
        this.list.draw();
        return;
      }
      this.getCandidates((function(data) {
        for (var i = 0; i < data.length; i++) {
          this.list.add(data[i]);
          if (i === this.options.limit - 1)
            break;
        }
        this.list.draw();
      }).bind(this));
    };
    Suggestions.prototype.handleFocus = function() {
      if (!this.list.isEmpty())
        this.list.show();
      this.list.selectingListItem = false;
    };
    Suggestions.prototype.update = function(revisedData) {
      this.data = revisedData;
      this.handleKeyUp();
    };
    Suggestions.prototype.clear = function() {
      this.data = [];
      this.list.clear();
    };
    Suggestions.prototype.normalize = function(value) {
      value = value.toLowerCase();
      return value;
    };
    Suggestions.prototype.match = function(candidate, query) {
      return candidate.indexOf(query) > -1;
    };
    Suggestions.prototype.value = function(value) {
      this.selected = value;
      this.el.value = this.getItemValue(value);
      if (document.createEvent) {
        var e = document.createEvent("HTMLEvents");
        e.initEvent("change", true, false);
        this.el.dispatchEvent(e);
      } else {
        this.el.fireEvent("onchange");
      }
    };
    Suggestions.prototype.getCandidates = function(callback) {
      var options = {
        pre: "<strong>",
        post: "</strong>",
        extract: (function(d) {
          return this.getItemValue(d);
        }).bind(this)
      };
      var results;
      if (this.options.filter) {
        results = fuzzy.filter(this.query, this.data, options);
        results = results.map((function(item) {
          return {
            original: item.original,
            string: this.render(item.original, item.string)
          };
        }).bind(this));
      } else {
        results = this.data.map((function(d) {
          var renderedString = this.render(d);
          return {
            original: d,
            string: renderedString
          };
        }).bind(this));
      }
      callback(results);
    };
    Suggestions.prototype.getItemValue = function(item) {
      return item;
    };
    Suggestions.prototype.render = function(item, sourceFormatting) {
      if (sourceFormatting) {
        return sourceFormatting;
      }
      var boldString = item.original ? this.getItemValue(item.original) : this.getItemValue(item);
      var indexString = this.normalize(boldString);
      var indexOfQuery = indexString.lastIndexOf(this.query);
      while (indexOfQuery > -1) {
        var endIndexOfQuery = indexOfQuery + this.query.length;
        boldString = boldString.slice(0, indexOfQuery) + "<strong>" + boldString.slice(indexOfQuery, endIndexOfQuery) + "</strong>" + boldString.slice(endIndexOfQuery);
        indexOfQuery = indexString.slice(0, indexOfQuery).lastIndexOf(this.query);
      }
      return boldString;
    };
    Suggestions.prototype.renderError = function(msg) {
      this.list.drawError(msg);
    };
    module.exports = Suggestions;
  }
});

// node_modules/suggestions/index.js
var require_suggestions2 = __commonJS({
  "node_modules/suggestions/index.js"(exports, module) {
    "use strict";
    var Suggestions = require_suggestions();
    module.exports = Suggestions;
    if (typeof window !== "undefined") {
      window.Suggestions = Suggestions;
    }
  }
});

// node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/events/events.js"(exports, module) {
    "use strict";
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn)
        console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter() {
      EventEmitter.init.call(this);
    }
    module.exports = EventEmitter;
    module.exports.once = once;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._eventsCount = 0;
    EventEmitter.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++)
        args.push(arguments[i]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err;
      }
      var handler = events[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners[i], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list = events[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events[type] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events, i;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener")
            continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once(emitter, name) {
      return new Promise(function(resolve, reject) {
        function errorListener(err) {
          emitter.removeListener(name, resolver);
          reject(err);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name, listener);
        } else {
          emitter.on(name, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
  }
});

// node_modules/@mapbox/mapbox-gl-geocoder/lib/exceptions.js
var require_exceptions = __commonJS({
  "node_modules/@mapbox/mapbox-gl-geocoder/lib/exceptions.js"(exports, module) {
    module.exports = {
      "fr": {
        "name": "France",
        "bbox": [[-4.59235, 41.380007], [9.560016, 51.148506]]
      },
      "us": {
        "name": "United States",
        "bbox": [[-171.791111, 18.91619], [-66.96466, 71.357764]]
      },
      "ru": {
        "name": "Russia",
        "bbox": [[19.66064, 41.151416], [190.10042, 81.2504]]
      },
      "ca": {
        "name": "Canada",
        "bbox": [[-140.99778, 41.675105], [-52.648099, 83.23324]]
      }
    };
  }
});

// node_modules/@mapbox/mapbox-sdk/lib/helpers/parse-link-header.js
var require_parse_link_header = __commonJS({
  "node_modules/@mapbox/mapbox-sdk/lib/helpers/parse-link-header.js"(exports, module) {
    "use strict";
    function parseParam(param) {
      var parts = param.match(/\s*(.+)\s*=\s*"?([^"]+)"?/);
      if (!parts)
        return null;
      return {
        key: parts[1],
        value: parts[2]
      };
    }
    function parseLink(link) {
      var parts = link.match(/<?([^>]*)>(.*)/);
      if (!parts)
        return null;
      var linkUrl = parts[1];
      var linkParams = parts[2].split(";");
      var rel = null;
      var parsedLinkParams = linkParams.reduce(function(result, param) {
        var parsed = parseParam(param);
        if (!parsed)
          return result;
        if (parsed.key === "rel") {
          if (!rel) {
            rel = parsed.value;
          }
          return result;
        }
        result[parsed.key] = parsed.value;
        return result;
      }, {});
      if (!rel)
        return null;
      return {
        url: linkUrl,
        rel,
        params: parsedLinkParams
      };
    }
    function parseLinkHeader(linkHeader) {
      if (!linkHeader)
        return {};
      return linkHeader.split(/,\s*</).reduce(function(result, link) {
        var parsed = parseLink(link);
        if (!parsed)
          return result;
        var splitRel = parsed.rel.split(/\s+/);
        splitRel.forEach(function(rel) {
          if (!result[rel]) {
            result[rel] = {
              url: parsed.url,
              params: parsed.params
            };
          }
        });
        return result;
      }, {});
    }
    module.exports = parseLinkHeader;
  }
});

// node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-response.js
var require_mapi_response = __commonJS({
  "node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-response.js"(exports, module) {
    "use strict";
    var parseLinkHeader = require_parse_link_header();
    function MapiResponse(request, responseData) {
      this.request = request;
      this.headers = responseData.headers;
      this.rawBody = responseData.body;
      this.statusCode = responseData.statusCode;
      try {
        this.body = JSON.parse(responseData.body || "{}");
      } catch (parseError) {
        this.body = responseData.body;
      }
      this.links = parseLinkHeader(this.headers.link);
    }
    MapiResponse.prototype.hasNextPage = function hasNextPage() {
      return !!this.links.next;
    };
    MapiResponse.prototype.nextPage = function nextPage() {
      if (!this.hasNextPage())
        return null;
      return this.request._extend({
        path: this.links.next.url
      });
    };
    module.exports = MapiResponse;
  }
});

// node_modules/@mapbox/mapbox-sdk/lib/constants.js
var require_constants = __commonJS({
  "node_modules/@mapbox/mapbox-sdk/lib/constants.js"(exports, module) {
    "use strict";
    module.exports = {
      API_ORIGIN: "https://api.mapbox.com",
      EVENT_PROGRESS_DOWNLOAD: "downloadProgress",
      EVENT_PROGRESS_UPLOAD: "uploadProgress",
      EVENT_ERROR: "error",
      EVENT_RESPONSE: "response",
      ERROR_HTTP: "HttpError",
      ERROR_REQUEST_ABORTED: "RequestAbortedError"
    };
  }
});

// node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-error.js
var require_mapi_error = __commonJS({
  "node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-error.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    function MapiError(options) {
      var errorType = options.type || constants.ERROR_HTTP;
      var body;
      if (options.body) {
        try {
          body = JSON.parse(options.body);
        } catch (e) {
          body = options.body;
        }
      } else {
        body = null;
      }
      var message = options.message || null;
      if (!message) {
        if (typeof body === "string") {
          message = body;
        } else if (body && typeof body.message === "string") {
          message = body.message;
        } else if (errorType === constants.ERROR_REQUEST_ABORTED) {
          message = "Request aborted";
        }
      }
      this.message = message;
      this.type = errorType;
      this.statusCode = options.statusCode || null;
      this.request = options.request;
      this.body = body;
    }
    module.exports = MapiError;
  }
});

// node_modules/@mapbox/mapbox-sdk/lib/helpers/parse-headers.js
var require_parse_headers = __commonJS({
  "node_modules/@mapbox/mapbox-sdk/lib/helpers/parse-headers.js"(exports, module) {
    "use strict";
    function parseSingleHeader(raw) {
      var boundary = raw.indexOf(":");
      var name = raw.substring(0, boundary).trim().toLowerCase();
      var value = raw.substring(boundary + 1).trim();
      return {
        name,
        value
      };
    }
    function parseHeaders(raw) {
      var headers = {};
      if (!raw) {
        return headers;
      }
      raw.trim().split(/[\r|\n]+/).forEach(function(rawHeader) {
        var parsed = parseSingleHeader(rawHeader);
        headers[parsed.name] = parsed.value;
      });
      return headers;
    }
    module.exports = parseHeaders;
  }
});

// node_modules/@mapbox/mapbox-sdk/lib/browser/browser-layer.js
var require_browser_layer = __commonJS({
  "node_modules/@mapbox/mapbox-sdk/lib/browser/browser-layer.js"(exports, module) {
    "use strict";
    var MapiResponse = require_mapi_response();
    var MapiError = require_mapi_error();
    var constants = require_constants();
    var parseHeaders = require_parse_headers();
    var requestsUnderway = {};
    function browserAbort(request) {
      var xhr = requestsUnderway[request.id];
      if (!xhr)
        return;
      xhr.abort();
      delete requestsUnderway[request.id];
    }
    function createResponse(request, xhr) {
      return new MapiResponse(request, {
        body: xhr.response,
        headers: parseHeaders(xhr.getAllResponseHeaders()),
        statusCode: xhr.status
      });
    }
    function normalizeBrowserProgressEvent(event) {
      var total = event.total;
      var transferred = event.loaded;
      var percent = 100 * transferred / total;
      return {
        total,
        transferred,
        percent
      };
    }
    function sendRequestXhr(request, xhr) {
      return new Promise(function(resolve, reject) {
        xhr.onprogress = function(event) {
          request.emitter.emit(
            constants.EVENT_PROGRESS_DOWNLOAD,
            normalizeBrowserProgressEvent(event)
          );
        };
        var file = request.file;
        if (file) {
          xhr.upload.onprogress = function(event) {
            request.emitter.emit(
              constants.EVENT_PROGRESS_UPLOAD,
              normalizeBrowserProgressEvent(event)
            );
          };
        }
        xhr.onerror = function(error) {
          reject(error);
        };
        xhr.onabort = function() {
          var mapiError = new MapiError({
            request,
            type: constants.ERROR_REQUEST_ABORTED
          });
          reject(mapiError);
        };
        xhr.onload = function() {
          delete requestsUnderway[request.id];
          if (xhr.status < 200 || xhr.status >= 400) {
            var mapiError = new MapiError({
              request,
              body: xhr.response,
              statusCode: xhr.status
            });
            reject(mapiError);
            return;
          }
          resolve(xhr);
        };
        var body = request.body;
        if (typeof body === "string") {
          xhr.send(body);
        } else if (body) {
          xhr.send(JSON.stringify(body));
        } else if (file) {
          xhr.send(file);
        } else {
          xhr.send();
        }
        requestsUnderway[request.id] = xhr;
      }).then(function(xhr2) {
        return createResponse(request, xhr2);
      });
    }
    function createRequestXhr(request, accessToken) {
      var url = request.url(accessToken);
      var xhr = new window.XMLHttpRequest();
      xhr.open(request.method, url);
      Object.keys(request.headers).forEach(function(key) {
        xhr.setRequestHeader(key, request.headers[key]);
      });
      return xhr;
    }
    function browserSend(request) {
      return Promise.resolve().then(function() {
        var xhr = createRequestXhr(request, request.client.accessToken);
        return sendRequestXhr(request, xhr);
      });
    }
    module.exports = {
      browserAbort,
      sendRequestXhr,
      browserSend,
      createRequestXhr
    };
  }
});

// node_modules/base-64/base64.js
var require_base64 = __commonJS({
  "node_modules/base-64/base64.js"(exports, module) {
    (function(root) {
      var freeExports = typeof exports == "object" && exports;
      var freeModule = typeof module == "object" && module && module.exports == freeExports && module;
      var freeGlobal = typeof global == "object" && global;
      if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
        root = freeGlobal;
      }
      var InvalidCharacterError = function(message) {
        this.message = message;
      };
      InvalidCharacterError.prototype = new Error();
      InvalidCharacterError.prototype.name = "InvalidCharacterError";
      var error = function(message) {
        throw new InvalidCharacterError(message);
      };
      var TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;
      var decode = function(input) {
        input = String(input).replace(REGEX_SPACE_CHARACTERS, "");
        var length = input.length;
        if (length % 4 == 0) {
          input = input.replace(/==?$/, "");
          length = input.length;
        }
        if (length % 4 == 1 || // http://whatwg.org/C#alphanumeric-ascii-characters
        /[^+a-zA-Z0-9/]/.test(input)) {
          error(
            "Invalid character: the string to be decoded is not correctly encoded."
          );
        }
        var bitCounter = 0;
        var bitStorage;
        var buffer;
        var output = "";
        var position = -1;
        while (++position < length) {
          buffer = TABLE.indexOf(input.charAt(position));
          bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
          if (bitCounter++ % 4) {
            output += String.fromCharCode(
              255 & bitStorage >> (-2 * bitCounter & 6)
            );
          }
        }
        return output;
      };
      var encode = function(input) {
        input = String(input);
        if (/[^\0-\xFF]/.test(input)) {
          error(
            "The string to be encoded contains characters outside of the Latin1 range."
          );
        }
        var padding = input.length % 3;
        var output = "";
        var position = -1;
        var a;
        var b;
        var c;
        var d;
        var buffer;
        var length = input.length - padding;
        while (++position < length) {
          a = input.charCodeAt(position) << 16;
          b = input.charCodeAt(++position) << 8;
          c = input.charCodeAt(++position);
          buffer = a + b + c;
          output += TABLE.charAt(buffer >> 18 & 63) + TABLE.charAt(buffer >> 12 & 63) + TABLE.charAt(buffer >> 6 & 63) + TABLE.charAt(buffer & 63);
        }
        if (padding == 2) {
          a = input.charCodeAt(position) << 8;
          b = input.charCodeAt(++position);
          buffer = a + b;
          output += TABLE.charAt(buffer >> 10) + TABLE.charAt(buffer >> 4 & 63) + TABLE.charAt(buffer << 2 & 63) + "=";
        } else if (padding == 1) {
          buffer = input.charCodeAt(position);
          output += TABLE.charAt(buffer >> 2) + TABLE.charAt(buffer << 4 & 63) + "==";
        }
        return output;
      };
      var base64 = {
        "encode": encode,
        "decode": decode,
        "version": "0.1.0"
      };
      if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        define(function() {
          return base64;
        });
      } else if (freeExports && !freeExports.nodeType) {
        if (freeModule) {
          freeModule.exports = base64;
        } else {
          for (var key in base64) {
            base64.hasOwnProperty(key) && (freeExports[key] = base64[key]);
          }
        }
      } else {
        root.base64 = base64;
      }
    })(exports);
  }
});

// node_modules/@mapbox/parse-mapbox-token/index.js
var require_parse_mapbox_token = __commonJS({
  "node_modules/@mapbox/parse-mapbox-token/index.js"(exports, module) {
    "use strict";
    var base64 = require_base64();
    var tokenCache = {};
    function parseToken(token) {
      if (tokenCache[token]) {
        return tokenCache[token];
      }
      var parts = token.split(".");
      var usage = parts[0];
      var rawPayload = parts[1];
      if (!rawPayload) {
        throw new Error("Invalid token");
      }
      var parsedPayload = parsePaylod(rawPayload);
      var result = {
        usage,
        user: parsedPayload.u
      };
      if (has(parsedPayload, "a"))
        result.authorization = parsedPayload.a;
      if (has(parsedPayload, "exp"))
        result.expires = parsedPayload.exp * 1e3;
      if (has(parsedPayload, "iat"))
        result.created = parsedPayload.iat * 1e3;
      if (has(parsedPayload, "scopes"))
        result.scopes = parsedPayload.scopes;
      if (has(parsedPayload, "client"))
        result.client = parsedPayload.client;
      if (has(parsedPayload, "ll"))
        result.lastLogin = parsedPayload.ll;
      if (has(parsedPayload, "iu"))
        result.impersonator = parsedPayload.iu;
      tokenCache[token] = result;
      return result;
    }
    function parsePaylod(rawPayload) {
      try {
        return JSON.parse(base64.decode(rawPayload));
      } catch (parseError) {
        throw new Error("Invalid token");
      }
    }
    function has(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
    module.exports = parseToken;
  }
});

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__)
        prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt])
        emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn)
        emitter._events[evt].push(listener);
      else
        emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0)
        emitter._events = new Events();
      else
        delete emitter._events[evt];
    }
    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0)
        return names;
      for (name in events = this._events) {
        if (has.call(events, name))
          names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers)
        return [];
      if (handlers.fn)
        return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners)
        return 0;
      if (listeners.fn)
        return 1;
      return listeners.length;
    };
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once)
          this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once)
            this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args)
                for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt])
        return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length)
          this._events[evt] = events.length === 1 ? events[0] : events;
        else
          clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt])
          clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
    EventEmitter.prefixed = prefix;
    EventEmitter.EventEmitter = EventEmitter;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter;
    }
  }
});

// node_modules/@mapbox/mapbox-sdk/lib/helpers/url-utils.js
var require_url_utils = __commonJS({
  "node_modules/@mapbox/mapbox-sdk/lib/helpers/url-utils.js"(exports, module) {
    "use strict";
    function encodeArray(arrayValue) {
      return arrayValue.map(encodeURIComponent).join(",");
    }
    function encodeValue(value) {
      if (Array.isArray(value)) {
        return encodeArray(value);
      }
      return encodeURIComponent(String(value));
    }
    function appendQueryParam(url, key, value) {
      if (value === false || value === null) {
        return url;
      }
      var punctuation = /\?/.test(url) ? "&" : "?";
      var query = encodeURIComponent(key);
      if (value !== void 0 && value !== "" && value !== true) {
        query += "=" + encodeValue(value);
      }
      return "" + url + punctuation + query;
    }
    function appendQueryObject(url, queryObject) {
      if (!queryObject) {
        return url;
      }
      var result = url;
      Object.keys(queryObject).forEach(function(key) {
        var value = queryObject[key];
        if (value === void 0) {
          return;
        }
        if (Array.isArray(value)) {
          value = value.filter(function(v) {
            return v !== null && v !== void 0;
          }).join(",");
        }
        result = appendQueryParam(result, key, value);
      });
      return result;
    }
    function prependOrigin(url, origin) {
      if (!origin) {
        return url;
      }
      if (url.slice(0, 4) === "http") {
        return url;
      }
      var delimiter = url[0] === "/" ? "" : "/";
      return "" + origin.replace(/\/$/, "") + delimiter + url;
    }
    function interpolateRouteParams(route, params) {
      if (!params) {
        return route;
      }
      return route.replace(/\/:([a-zA-Z0-9]+)/g, function(_, paramId) {
        var value = params[paramId];
        if (value === void 0) {
          throw new Error("Unspecified route parameter " + paramId);
        }
        var preppedValue = encodeValue(value);
        return "/" + preppedValue;
      });
    }
    module.exports = {
      appendQueryObject,
      appendQueryParam,
      prependOrigin,
      interpolateRouteParams
    };
  }
});

// node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-request.js
var require_mapi_request = __commonJS({
  "node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-request.js"(exports, module) {
    "use strict";
    var parseToken = require_parse_mapbox_token();
    var xtend = require_immutable();
    var EventEmitter = require_eventemitter3();
    var urlUtils = require_url_utils();
    var constants = require_constants();
    var requestId = 1;
    function MapiRequest(client, options) {
      if (!client) {
        throw new Error("MapiRequest requires a client");
      }
      if (!options || !options.path || !options.method) {
        throw new Error(
          "MapiRequest requires an options object with path and method properties"
        );
      }
      var defaultHeaders = {};
      if (options.body) {
        defaultHeaders["content-type"] = "application/json";
      }
      var headersWithDefaults = xtend(defaultHeaders, options.headers);
      var headers = Object.keys(headersWithDefaults).reduce(function(memo, name) {
        memo[name.toLowerCase()] = headersWithDefaults[name];
        return memo;
      }, {});
      this.id = requestId++;
      this._options = options;
      this.emitter = new EventEmitter();
      this.client = client;
      this.response = null;
      this.error = null;
      this.sent = false;
      this.aborted = false;
      this.path = options.path;
      this.method = options.method;
      this.origin = options.origin || client.origin;
      this.query = options.query || {};
      this.params = options.params || {};
      this.body = options.body || null;
      this.file = options.file || null;
      this.encoding = options.encoding || "utf8";
      this.sendFileAs = options.sendFileAs || null;
      this.headers = headers;
    }
    MapiRequest.prototype.url = function url(accessToken) {
      var url2 = urlUtils.prependOrigin(this.path, this.origin);
      url2 = urlUtils.appendQueryObject(url2, this.query);
      var routeParams = this.params;
      var actualAccessToken = accessToken == null ? this.client.accessToken : accessToken;
      if (actualAccessToken) {
        url2 = urlUtils.appendQueryParam(url2, "access_token", actualAccessToken);
        var accessTokenOwnerId = parseToken(actualAccessToken).user;
        routeParams = xtend({ ownerId: accessTokenOwnerId }, routeParams);
      }
      url2 = urlUtils.interpolateRouteParams(url2, routeParams);
      return url2;
    };
    MapiRequest.prototype.send = function send() {
      var self = this;
      if (self.sent) {
        throw new Error(
          "This request has already been sent. Check the response and error properties. Create a new request with clone()."
        );
      }
      self.sent = true;
      return self.client.sendRequest(self).then(
        function(response) {
          self.response = response;
          self.emitter.emit(constants.EVENT_RESPONSE, response);
          return response;
        },
        function(error) {
          self.error = error;
          self.emitter.emit(constants.EVENT_ERROR, error);
          throw error;
        }
      );
    };
    MapiRequest.prototype.abort = function abort() {
      if (this._nextPageRequest) {
        this._nextPageRequest.abort();
        delete this._nextPageRequest;
      }
      if (this.response || this.error || this.aborted)
        return;
      this.aborted = true;
      this.client.abortRequest(this);
    };
    MapiRequest.prototype.eachPage = function eachPage(callback) {
      var self = this;
      function handleResponse(response) {
        function getNextPage() {
          delete self._nextPageRequest;
          var nextPageRequest = response.nextPage();
          if (nextPageRequest) {
            self._nextPageRequest = nextPageRequest;
            getPage(nextPageRequest);
          }
        }
        callback(null, response, getNextPage);
      }
      function handleError(error) {
        callback(error, null, function() {
        });
      }
      function getPage(request) {
        request.send().then(handleResponse, handleError);
      }
      getPage(this);
    };
    MapiRequest.prototype.clone = function clone() {
      return this._extend();
    };
    MapiRequest.prototype._extend = function _extend(options) {
      var extendedOptions = xtend(this._options, options);
      return new MapiRequest(this.client, extendedOptions);
    };
    module.exports = MapiRequest;
  }
});

// node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-client.js
var require_mapi_client = __commonJS({
  "node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-client.js"(exports, module) {
    "use strict";
    var parseToken = require_parse_mapbox_token();
    var MapiRequest = require_mapi_request();
    var constants = require_constants();
    function MapiClient(options) {
      if (!options || !options.accessToken) {
        throw new Error("Cannot create a client without an access token");
      }
      parseToken(options.accessToken);
      this.accessToken = options.accessToken;
      this.origin = options.origin || constants.API_ORIGIN;
    }
    MapiClient.prototype.createRequest = function createRequest(requestOptions) {
      return new MapiRequest(this, requestOptions);
    };
    module.exports = MapiClient;
  }
});

// node_modules/@mapbox/mapbox-sdk/lib/browser/browser-client.js
var require_browser_client = __commonJS({
  "node_modules/@mapbox/mapbox-sdk/lib/browser/browser-client.js"(exports, module) {
    "use strict";
    var browser = require_browser_layer();
    var MapiClient = require_mapi_client();
    function BrowserClient(options) {
      MapiClient.call(this, options);
    }
    BrowserClient.prototype = Object.create(MapiClient.prototype);
    BrowserClient.prototype.constructor = BrowserClient;
    BrowserClient.prototype.sendRequest = browser.browserSend;
    BrowserClient.prototype.abortRequest = browser.browserAbort;
    function createBrowserClient(options) {
      return new BrowserClient(options);
    }
    module.exports = createBrowserClient;
  }
});

// node_modules/@mapbox/mapbox-sdk/index.js
var require_mapbox_sdk = __commonJS({
  "node_modules/@mapbox/mapbox-sdk/index.js"(exports, module) {
    "use strict";
    var client = require_browser_client();
    module.exports = client;
  }
});

// node_modules/is-plain-obj/index.js
var require_is_plain_obj = __commonJS({
  "node_modules/is-plain-obj/index.js"(exports, module) {
    "use strict";
    var toString = Object.prototype.toString;
    module.exports = function(x) {
      var prototype;
      return toString.call(x) === "[object Object]" && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
    };
  }
});

// node_modules/@mapbox/fusspot/lib/index.js
var require_lib = __commonJS({
  "node_modules/@mapbox/fusspot/lib/index.js"(exports, module) {
    "use strict";
    var isPlainObject = require_is_plain_obj();
    var xtend = require_immutable();
    var DEFAULT_ERROR_PATH = "value";
    var NEWLINE_INDENT = "\n  ";
    var v = {};
    v.assert = function(rootValidator, options) {
      options = options || {};
      return function(value) {
        var message = validate(rootValidator, value);
        if (!message) {
          return;
        }
        var errorMessage = processMessage(message, options);
        if (options.apiName) {
          errorMessage = options.apiName + ": " + errorMessage;
        }
        throw new Error(errorMessage);
      };
    };
    v.shape = function shape(validatorObj) {
      var validators = objectEntries(validatorObj);
      return function shapeValidator(value) {
        var validationResult = validate(v.plainObject, value);
        if (validationResult) {
          return validationResult;
        }
        var key, validator;
        var errorMessages = [];
        for (var i = 0; i < validators.length; i++) {
          key = validators[i].key;
          validator = validators[i].value;
          validationResult = validate(validator, value[key]);
          if (validationResult) {
            errorMessages.push([key].concat(validationResult));
          }
        }
        if (errorMessages.length < 2) {
          return errorMessages[0];
        }
        return function(options) {
          errorMessages = errorMessages.map(function(message) {
            var key2 = message[0];
            var renderedMessage = processMessage(message, options).split("\n").join(NEWLINE_INDENT);
            return "- " + key2 + ": " + renderedMessage;
          });
          var objectId = options.path.join(".");
          var ofPhrase = objectId === DEFAULT_ERROR_PATH ? "" : " of " + objectId;
          return "The following properties" + ofPhrase + " have invalid values:" + NEWLINE_INDENT + errorMessages.join(NEWLINE_INDENT);
        };
      };
    };
    v.strictShape = function strictShape(validatorObj) {
      var shapeValidator = v.shape(validatorObj);
      return function strictShapeValidator(value) {
        var shapeResult = shapeValidator(value);
        if (shapeResult) {
          return shapeResult;
        }
        var invalidKeys = Object.keys(value).reduce(function(memo, valueKey) {
          if (validatorObj[valueKey] === void 0) {
            memo.push(valueKey);
          }
          return memo;
        }, []);
        if (invalidKeys.length !== 0) {
          return function() {
            return "The following keys are invalid: " + invalidKeys.join(", ");
          };
        }
      };
    };
    v.arrayOf = function arrayOf(validator) {
      return createArrayValidator(validator);
    };
    v.tuple = function tuple() {
      var validators = Array.isArray(arguments[0]) ? arguments[0] : Array.prototype.slice.call(arguments);
      return createArrayValidator(validators);
    };
    function createArrayValidator(validators) {
      var validatingTuple = Array.isArray(validators);
      var getValidator = function(index) {
        if (validatingTuple) {
          return validators[index];
        }
        return validators;
      };
      return function arrayValidator(value) {
        var validationResult = validate(v.plainArray, value);
        if (validationResult) {
          return validationResult;
        }
        if (validatingTuple && value.length !== validators.length) {
          return "an array with " + validators.length + " items";
        }
        for (var i = 0; i < value.length; i++) {
          validationResult = validate(getValidator(i), value[i]);
          if (validationResult) {
            return [i].concat(validationResult);
          }
        }
      };
    }
    v.required = function required(validator) {
      function requiredValidator(value) {
        if (value == null) {
          return function(options) {
            return formatErrorMessage(
              options,
              isArrayCulprit(options.path) ? "cannot be undefined/null." : "is required."
            );
          };
        }
        return validator.apply(this, arguments);
      }
      requiredValidator.__required = true;
      return requiredValidator;
    };
    v.oneOfType = function oneOfType() {
      var validators = Array.isArray(arguments[0]) ? arguments[0] : Array.prototype.slice.call(arguments);
      return function oneOfTypeValidator(value) {
        var messages = validators.map(function(validator) {
          return validate(validator, value);
        }).filter(Boolean);
        if (messages.length !== validators.length) {
          return;
        }
        if (messages.every(function(message) {
          return message.length === 1 && typeof message[0] === "string";
        })) {
          return orList(
            messages.map(function(m) {
              return m[0];
            })
          );
        }
        return messages.reduce(function(max, arr) {
          return arr.length > max.length ? arr : max;
        });
      };
    };
    v.equal = function equal(compareWith) {
      return function equalValidator(value) {
        if (value !== compareWith) {
          return JSON.stringify(compareWith);
        }
      };
    };
    v.oneOf = function oneOf() {
      var options = Array.isArray(arguments[0]) ? arguments[0] : Array.prototype.slice.call(arguments);
      var validators = options.map(function(value) {
        return v.equal(value);
      });
      return v.oneOfType.apply(this, validators);
    };
    v.range = function range(compareWith) {
      var min = compareWith[0];
      var max = compareWith[1];
      return function rangeValidator(value) {
        var validationResult = validate(v.number, value);
        if (validationResult || value < min || value > max) {
          return "number between " + min + " & " + max + " (inclusive)";
        }
      };
    };
    v.any = function any() {
      return;
    };
    v.boolean = function boolean(value) {
      if (typeof value !== "boolean") {
        return "boolean";
      }
    };
    v.number = function number(value) {
      if (typeof value !== "number") {
        return "number";
      }
    };
    v.plainArray = function plainArray(value) {
      if (!Array.isArray(value)) {
        return "array";
      }
    };
    v.plainObject = function plainObject(value) {
      if (!isPlainObject(value)) {
        return "object";
      }
    };
    v.string = function string(value) {
      if (typeof value !== "string") {
        return "string";
      }
    };
    v.func = function func(value) {
      if (typeof value !== "function") {
        return "function";
      }
    };
    function validate(validator, value) {
      if (value == null && !validator.hasOwnProperty("__required")) {
        return;
      }
      var result = validator(value);
      if (result) {
        return Array.isArray(result) ? result : [result];
      }
    }
    function processMessage(message, options) {
      var len = message.length;
      var result = message[len - 1];
      var path = message.slice(0, len - 1);
      if (path.length === 0) {
        path = [DEFAULT_ERROR_PATH];
      }
      options = xtend(options, { path });
      return typeof result === "function" ? result(options) : formatErrorMessage(options, prettifyResult(result));
    }
    function orList(list) {
      if (list.length < 2) {
        return list[0];
      }
      if (list.length === 2) {
        return list.join(" or ");
      }
      return list.slice(0, -1).join(", ") + ", or " + list.slice(-1);
    }
    function prettifyResult(result) {
      return "must be " + addArticle(result) + ".";
    }
    function addArticle(nounPhrase) {
      if (/^an? /.test(nounPhrase)) {
        return nounPhrase;
      }
      if (/^[aeiou]/i.test(nounPhrase)) {
        return "an " + nounPhrase;
      }
      if (/^[a-z]/i.test(nounPhrase)) {
        return "a " + nounPhrase;
      }
      return nounPhrase;
    }
    function formatErrorMessage(options, prettyResult) {
      var arrayCulprit = isArrayCulprit(options.path);
      var output = options.path.join(".") + " " + prettyResult;
      var prepend = arrayCulprit ? "Item at position " : "";
      return prepend + output;
    }
    function isArrayCulprit(path) {
      return typeof path[path.length - 1] == "number" || typeof path[0] == "number";
    }
    function objectEntries(obj) {
      return Object.keys(obj || {}).map(function(key) {
        return { key, value: obj[key] };
      });
    }
    v.validate = validate;
    v.processMessage = processMessage;
    module.exports = v;
  }
});

// node_modules/@mapbox/mapbox-sdk/services/service-helpers/validator.js
var require_validator = __commonJS({
  "node_modules/@mapbox/mapbox-sdk/services/service-helpers/validator.js"(exports, module) {
    "use strict";
    var xtend = require_immutable();
    var v = require_lib();
    function file(value) {
      if (typeof window !== "undefined") {
        if (value instanceof global.Blob || value instanceof global.ArrayBuffer) {
          return;
        }
        return "Blob or ArrayBuffer";
      }
      if (typeof value === "string" || value.pipe !== void 0) {
        return;
      }
      return "Filename or Readable stream";
    }
    function assertShape(validatorObj, apiName) {
      return v.assert(v.strictShape(validatorObj), apiName);
    }
    function date(value) {
      var msg = "date";
      if (typeof value === "boolean") {
        return msg;
      }
      try {
        var date2 = new Date(value);
        if (date2.getTime && isNaN(date2.getTime())) {
          return msg;
        }
      } catch (e) {
        return msg;
      }
    }
    function coordinates(value) {
      return v.tuple(v.number, v.number)(value);
    }
    module.exports = xtend(v, {
      file,
      date,
      coordinates,
      assertShape
    });
  }
});

// node_modules/@mapbox/mapbox-sdk/services/service-helpers/pick.js
var require_pick = __commonJS({
  "node_modules/@mapbox/mapbox-sdk/services/service-helpers/pick.js"(exports, module) {
    "use strict";
    function pick(source, keys) {
      var filter = function(key, val) {
        return keys.indexOf(key) !== -1 && val !== void 0;
      };
      if (typeof keys === "function") {
        filter = keys;
      }
      return Object.keys(source).filter(function(key) {
        return filter(key, source[key]);
      }).reduce(function(result, key) {
        result[key] = source[key];
        return result;
      }, {});
    }
    module.exports = pick;
  }
});

// node_modules/@mapbox/mapbox-sdk/services/service-helpers/object-map.js
var require_object_map = __commonJS({
  "node_modules/@mapbox/mapbox-sdk/services/service-helpers/object-map.js"(exports, module) {
    "use strict";
    function objectMap(obj, cb) {
      return Object.keys(obj).reduce(function(result, key) {
        result[key] = cb(key, obj[key]);
        return result;
      }, {});
    }
    module.exports = objectMap;
  }
});

// node_modules/@mapbox/mapbox-sdk/services/service-helpers/stringify-booleans.js
var require_stringify_booleans = __commonJS({
  "node_modules/@mapbox/mapbox-sdk/services/service-helpers/stringify-booleans.js"(exports, module) {
    "use strict";
    var objectMap = require_object_map();
    function stringifyBoolean(obj) {
      return objectMap(obj, function(_, value) {
        return typeof value === "boolean" ? JSON.stringify(value) : value;
      });
    }
    module.exports = stringifyBoolean;
  }
});

// node_modules/@mapbox/mapbox-sdk/services/service-helpers/create-service-factory.js
var require_create_service_factory = __commonJS({
  "node_modules/@mapbox/mapbox-sdk/services/service-helpers/create-service-factory.js"(exports, module) {
    "use strict";
    var MapiClient = require_mapi_client();
    var createClient = require_browser_client();
    function createServiceFactory(ServicePrototype) {
      return function(clientOrConfig) {
        var client;
        if (MapiClient.prototype.isPrototypeOf(clientOrConfig)) {
          client = clientOrConfig;
        } else {
          client = createClient(clientOrConfig);
        }
        var service = Object.create(ServicePrototype);
        service.client = client;
        return service;
      };
    }
    module.exports = createServiceFactory;
  }
});

// node_modules/@mapbox/mapbox-sdk/services/geocoding.js
var require_geocoding = __commonJS({
  "node_modules/@mapbox/mapbox-sdk/services/geocoding.js"(exports, module) {
    "use strict";
    var xtend = require_immutable();
    var v = require_validator();
    var pick = require_pick();
    var stringifyBooleans = require_stringify_booleans();
    var createServiceFactory = require_create_service_factory();
    var Geocoding = {};
    var featureTypes = [
      "country",
      "region",
      "postcode",
      "district",
      "place",
      "locality",
      "neighborhood",
      "address",
      "poi",
      "poi.landmark"
    ];
    Geocoding.forwardGeocode = function(config) {
      v.assertShape({
        query: v.required(v.string),
        mode: v.oneOf("mapbox.places", "mapbox.places-permanent"),
        countries: v.arrayOf(v.string),
        proximity: v.oneOf(v.coordinates, "ip"),
        types: v.arrayOf(v.oneOf(featureTypes)),
        autocomplete: v.boolean,
        bbox: v.arrayOf(v.number),
        limit: v.number,
        language: v.arrayOf(v.string),
        routing: v.boolean,
        fuzzyMatch: v.boolean,
        worldview: v.string
      })(config);
      config.mode = config.mode || "mapbox.places";
      var query = stringifyBooleans(
        xtend(
          { country: config.countries },
          pick(config, [
            "proximity",
            "types",
            "autocomplete",
            "bbox",
            "limit",
            "language",
            "routing",
            "fuzzyMatch",
            "worldview"
          ])
        )
      );
      return this.client.createRequest({
        method: "GET",
        path: "/geocoding/v5/:mode/:query.json",
        params: pick(config, ["mode", "query"]),
        query
      });
    };
    Geocoding.reverseGeocode = function(config) {
      v.assertShape({
        query: v.required(v.coordinates),
        mode: v.oneOf("mapbox.places", "mapbox.places-permanent"),
        countries: v.arrayOf(v.string),
        types: v.arrayOf(v.oneOf(featureTypes)),
        bbox: v.arrayOf(v.number),
        limit: v.number,
        language: v.arrayOf(v.string),
        reverseMode: v.oneOf("distance", "score"),
        routing: v.boolean,
        worldview: v.string
      })(config);
      config.mode = config.mode || "mapbox.places";
      var query = stringifyBooleans(
        xtend(
          { country: config.countries },
          pick(config, [
            "country",
            "types",
            "bbox",
            "limit",
            "language",
            "reverseMode",
            "routing",
            "worldview"
          ])
        )
      );
      return this.client.createRequest({
        method: "GET",
        path: "/geocoding/v5/:mode/:query.json",
        params: pick(config, ["mode", "query"]),
        query
      });
    };
    module.exports = createServiceFactory(Geocoding);
  }
});

// node_modules/nanoid/url-alphabet/index.js
var urlAlphabet;
var init_url_alphabet = __esm({
  "node_modules/nanoid/url-alphabet/index.js"() {
    urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
  }
});

// node_modules/nanoid/index.browser.js
var index_browser_exports = {};
__export(index_browser_exports, {
  customAlphabet: () => customAlphabet,
  customRandom: () => customRandom,
  nanoid: () => nanoid,
  random: () => random,
  urlAlphabet: () => urlAlphabet
});
var random, customRandom, customAlphabet, nanoid;
var init_index_browser = __esm({
  "node_modules/nanoid/index.browser.js"() {
    init_url_alphabet();
    random = (bytes) => crypto.getRandomValues(new Uint8Array(bytes));
    customRandom = (alphabet, defaultSize, getRandom) => {
      let mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1;
      let step = -~(1.6 * mask * defaultSize / alphabet.length);
      return (size = defaultSize) => {
        let id = "";
        while (true) {
          let bytes = getRandom(step);
          let j = step;
          while (j--) {
            id += alphabet[bytes[j] & mask] || "";
            if (id.length === size)
              return id;
          }
        }
      };
    };
    customAlphabet = (alphabet, size = 21) => customRandom(alphabet, size, random);
    nanoid = (size = 21) => crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
      byte &= 63;
      if (byte < 36) {
        id += byte.toString(36);
      } else if (byte < 62) {
        id += (byte - 26).toString(36).toUpperCase();
      } else if (byte > 62) {
        id += "-";
      } else {
        id += "_";
      }
      return id;
    }, "");
  }
});

// node_modules/@mapbox/mapbox-gl-geocoder/lib/events.js
var require_events2 = __commonJS({
  "node_modules/@mapbox/mapbox-gl-geocoder/lib/events.js"(exports, module) {
    "use strict";
    var nanoid2 = (init_index_browser(), __toCommonJS(index_browser_exports)).nanoid;
    function MapboxEventManager(options) {
      this.origin = options.origin || "https://api.mapbox.com";
      this.endpoint = "events/v2";
      this.access_token = options.accessToken;
      this.version = "0.2.0";
      this.sessionID = this.generateSessionID();
      this.userAgent = this.getUserAgent();
      this.options = options;
      this.send = this.send.bind(this);
      this.countries = options.countries ? options.countries.split(",") : null;
      this.types = options.types ? options.types.split(",") : null;
      this.bbox = options.bbox ? options.bbox : null;
      this.language = options.language ? options.language.split(",") : null;
      this.limit = options.limit ? +options.limit : null;
      this.locale = navigator.language || null;
      this.enableEventLogging = this.shouldEnableLogging(options);
      this.eventQueue = new Array();
      this.flushInterval = options.flushInterval || 1e3;
      this.maxQueueSize = options.maxQueueSize || 100;
      this.timer = this.flushInterval ? setTimeout(this.flush.bind(this), this.flushInterval) : null;
      this.lastSentInput = "";
      this.lastSentIndex = 0;
    }
    MapboxEventManager.prototype = {
      /**
         * Send a search.select event to the mapbox events service
         * This event marks the array index of the item selected by the user out of the array of possible options
         * @private
         * @param {Object} selected the geojson feature selected by the user
         * @param {Object} geocoder a mapbox-gl-geocoder instance
         * @returns {Promise}
         */
      select: function(selected, geocoder) {
        var resultIndex = this.getSelectedIndex(selected, geocoder);
        var payload = this.getEventPayload("search.select", geocoder);
        payload.resultIndex = resultIndex;
        payload.resultPlaceName = selected.place_name;
        payload.resultId = selected.id;
        if (resultIndex === this.lastSentIndex && payload.queryString === this.lastSentInput || resultIndex == -1) {
          return;
        }
        this.lastSentIndex = resultIndex;
        this.lastSentInput = payload.queryString;
        if (!payload.queryString)
          return;
        return this.push(payload);
      },
      /**
         * Send a search-start event to the mapbox events service
         * This turnstile event marks when a user starts a new search
         * @private
         * @param {Object} geocoder a mapbox-gl-geocoder instance
         * @returns {Promise}
         */
      start: function(geocoder) {
        var payload = this.getEventPayload("search.start", geocoder);
        if (!payload.queryString)
          return;
        return this.push(payload);
      },
      /**
       * Send a search-keyevent event to the mapbox events service
       * This event records each keypress in sequence
       * @private
       * @param {Object} keyEvent the keydown event to log
       * @param {Object} geocoder a mapbox-gl-geocoder instance
       * 
       */
      keyevent: function(keyEvent, geocoder) {
        if (!keyEvent.key)
          return;
        if (keyEvent.metaKey || [9, 27, 37, 39, 13, 38, 40].indexOf(keyEvent.keyCode) !== -1)
          return;
        var payload = this.getEventPayload("search.keystroke", geocoder);
        payload.lastAction = keyEvent.key;
        if (!payload.queryString)
          return;
        return this.push(payload);
      },
      /**
       * Send an event to the events service
       *
       * The event is skipped if the instance is not enabled to send logging events
       *
       * @private
       * @param {Object} payload the http POST body of the event
       * @param {Function} [callback] a callback function to invoke when the send has completed
       * @returns {Promise}
       */
      send: function(payload, callback) {
        if (!this.enableEventLogging) {
          if (callback)
            return callback();
          return;
        }
        var options = this.getRequestOptions(payload);
        this.request(options, (function(err) {
          if (err)
            return this.handleError(err, callback);
          if (callback) {
            return callback();
          }
        }).bind(this));
      },
      /**
       * Get http request options
       * @private
       * @param {*} payload
       */
      getRequestOptions: function(payload) {
        if (!Array.isArray(payload))
          payload = [payload];
        var options = {
          // events must be sent with POST
          method: "POST",
          host: this.origin,
          path: this.endpoint + "?access_token=" + this.access_token,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
          //events are arrays
        };
        return options;
      },
      /**
       * Get the event payload to send to the events service
       * Most payload properties are shared across all events
       * @private
       * @param {String} event the name of the event to send to the events service. Valid options are 'search.start', 'search.select', 'search.feedback'.
       * @param {Object} geocoder a mapbox-gl-geocoder instance
       * @returns {Object} an event payload
       */
      getEventPayload: function(event, geocoder) {
        var proximity;
        if (!geocoder.options.proximity) {
          proximity = null;
        } else if (typeof geocoder.options.proximity === "object") {
          proximity = [geocoder.options.proximity.longitude, geocoder.options.proximity.latitude];
        } else if (geocoder.options.proximity === "ip") {
          proximity = [999, 999];
        } else {
          proximity = geocoder.options.proximity;
        }
        var zoom = geocoder._map ? geocoder._map.getZoom() : void 0;
        var payload = {
          event,
          created: +/* @__PURE__ */ new Date(),
          sessionIdentifier: this.sessionID,
          country: this.countries,
          userAgent: this.userAgent,
          language: this.language,
          bbox: this.bbox,
          types: this.types,
          endpoint: "mapbox.places",
          autocomplete: geocoder.options.autocomplete,
          fuzzyMatch: geocoder.options.fuzzyMatch,
          proximity,
          limit: geocoder.options.limit,
          routing: geocoder.options.routing,
          worldview: geocoder.options.worldview,
          mapZoom: zoom,
          keyboardLocale: this.locale
        };
        if (event === "search.select") {
          payload.queryString = geocoder.inputString;
        } else if (event != "search.select" && geocoder._inputEl) {
          payload.queryString = geocoder._inputEl.value;
        } else {
          payload.queryString = geocoder.inputString;
        }
        return payload;
      },
      /**
       * Wraps the request function for easier testing
       * Make an http request and invoke a callback
       * @private
       * @param {Object} opts options describing the http request to be made
       * @param {Function} callback the callback to invoke when the http request is completed
       */
      request: function(opts, callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 204) {
              return callback(null);
            } else {
              return callback(this.statusText);
            }
          }
        };
        xhttp.open(opts.method, opts.host + "/" + opts.path, true);
        for (var header in opts.headers) {
          var headerValue = opts.headers[header];
          xhttp.setRequestHeader(header, headerValue);
        }
        xhttp.send(opts.body);
      },
      /**
       * Handle an error that occurred while making a request
       * @param {Object} err an error instance to log
       * @private
       */
      handleError: function(err, callback) {
        if (callback)
          return callback(err);
      },
      /**
       * Generate a session ID to be returned with all of the searches made by this geocoder instance
       * ID is random and cannot be tracked across sessions
       * @private
       */
      generateSessionID: function() {
        return nanoid2();
      },
      /**
       * Get a user agent string to send with the request to the events service
       * @private
       */
      getUserAgent: function() {
        return "mapbox-gl-geocoder." + this.version + "." + navigator.userAgent;
      },
      /**
         * Get the 0-based numeric index of the item that the user selected out of the list of options
         * @private
         * @param {Object} selected the geojson feature selected by the user
         * @param {Object} geocoder a Mapbox-GL-Geocoder instance
         * @returns {Number} the index of the selected result
         */
      getSelectedIndex: function(selected, geocoder) {
        if (!geocoder._typeahead)
          return;
        var results = geocoder._typeahead.data;
        var selectedID = selected.id;
        var resultIDs = results.map(function(feature) {
          return feature.id;
        });
        var selectedIdx = resultIDs.indexOf(selectedID);
        return selectedIdx;
      },
      /**
         * Check whether events should be logged
         * Clients using a localGeocoder or an origin other than mapbox should not have events logged
         * @private
         */
      shouldEnableLogging: function(options) {
        if (options.enableEventLogging === false)
          return false;
        if (options.origin && options.origin !== "https://api.mapbox.com")
          return false;
        if (options.localGeocoder)
          return false;
        if (options.filter)
          return false;
        return true;
      },
      /**
       * Flush out the event queue by sending events to the events service
       * @private
       */
      flush: function() {
        if (this.eventQueue.length > 0) {
          this.send(this.eventQueue);
          this.eventQueue = new Array();
        }
        if (this.timer)
          clearTimeout(this.timer);
        if (this.flushInterval)
          this.timer = setTimeout(this.flush.bind(this), this.flushInterval);
      },
      /**
       * Push event into the pending queue
       * @param {Object} evt the event to send to the events service
       * @param {Boolean} forceFlush indicates that the event queue should be flushed after adding this event regardless of size of the queue
       * @private
       */
      push: function(evt, forceFlush) {
        this.eventQueue.push(evt);
        if (this.eventQueue.length >= this.maxQueueSize || forceFlush) {
          this.flush();
        }
      },
      /**
       * Flush any remaining events from the queue before it is removed
       * @private
       */
      remove: function() {
        this.flush();
      }
    };
    module.exports = MapboxEventManager;
  }
});

// node_modules/@mapbox/mapbox-gl-geocoder/lib/localization.js
var require_localization = __commonJS({
  "node_modules/@mapbox/mapbox-gl-geocoder/lib/localization.js"(exports, module) {
    "use strict";
    var placeholder = {
      // list drawn from https://docs.mapbox.com/api/search/#language-coverage
      "de": "Suche",
      // german
      "it": "Ricerca",
      //italian
      "en": "Search",
      // english
      "nl": "Zoeken",
      //dutch
      "fr": "Chercher",
      //french
      "ca": "Cerca",
      //catalan
      "he": "לחפש",
      //hebrew
      "ja": "サーチ",
      //japanese
      "lv": "Meklēt",
      //latvian
      "pt": "Procurar",
      //portuguese 
      "sr": "Претрага",
      //serbian
      "zh": "搜索",
      //chinese-simplified
      "cs": "Vyhledávání",
      //czech
      "hu": "Keresés",
      //hungarian
      "ka": "ძიება",
      // georgian
      "nb": "Søke",
      //norwegian
      "sk": "Vyhľadávanie",
      //slovak
      "th": "ค้นหา",
      //thai
      "fi": "Hae",
      //finnish
      "is": "Leita",
      //icelandic
      "ko": "수색",
      //korean
      "pl": "Szukaj",
      //polish
      "sl": "Iskanje",
      //slovenian
      "fa": "جستجو",
      //persian(aka farsi)
      "ru": "Поиск"
      //russian
    };
    module.exports = { placeholder };
  }
});

// node_modules/@mapbox/mapbox-gl-geocoder/lib/geolocation.js
var require_geolocation = __commonJS({
  "node_modules/@mapbox/mapbox-gl-geocoder/lib/geolocation.js"(exports, module) {
    function Geolocation() {
    }
    Geolocation.prototype = {
      isSupport: function() {
        return Boolean(window.navigator.geolocation);
      },
      getCurrentPosition: function() {
        const positionOptions = {
          enableHighAccuracy: true
        };
        return new Promise(function(resolve, reject) {
          window.navigator.geolocation.getCurrentPosition(resolve, reject, positionOptions);
        });
      }
    };
    module.exports = Geolocation;
  }
});

// node_modules/@mapbox/mapbox-gl-geocoder/lib/utils.js
var require_utils = __commonJS({
  "node_modules/@mapbox/mapbox-gl-geocoder/lib/utils.js"(exports, module) {
    function transformFeatureToGeolocationText(feature, accuracy) {
      const addrInfo = getAddressInfo(feature);
      const addressAccuracy = ["address", "street", "place", "country"];
      var currentAccuracy;
      if (typeof accuracy === "function") {
        return accuracy(addrInfo);
      }
      const accuracyIndex = addressAccuracy.indexOf(accuracy);
      if (accuracyIndex === -1) {
        currentAccuracy = addressAccuracy;
      } else {
        currentAccuracy = addressAccuracy.slice(accuracyIndex);
      }
      return currentAccuracy.reduce(function(acc, name) {
        if (!addrInfo[name]) {
          return acc;
        }
        if (acc !== "") {
          acc = acc + ", ";
        }
        return acc + addrInfo[name];
      }, "");
    }
    function getAddressInfo(feature) {
      const houseNumber = feature.address || "";
      const street = feature.text || "";
      const placeName = feature.place_name || "";
      const address = placeName.split(",")[0];
      const addrInfo = {
        address,
        houseNumber,
        street,
        placeName
      };
      feature.context.forEach(function(context) {
        const layer = context.id.split(".")[0];
        addrInfo[layer] = context.text;
      });
      return addrInfo;
    }
    var REVERSE_GEOCODE_COORD_RGX = /^[ ]*(-?\d{1,3}(\.\d{0,256})?)[, ]+(-?\d{1,3}(\.\d{0,256})?)[ ]*$/;
    module.exports = {
      transformFeatureToGeolocationText,
      getAddressInfo,
      REVERSE_GEOCODE_COORD_RGX
    };
  }
});

// node_modules/@mapbox/mapbox-gl-geocoder/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/@mapbox/mapbox-gl-geocoder/lib/index.js"(exports, module) {
    var Typeahead = require_suggestions2();
    var debounce = require_lodash();
    var extend = require_immutable();
    var EventEmitter = require_events().EventEmitter;
    var exceptions = require_exceptions();
    var MapboxClient = require_mapbox_sdk();
    var mbxGeocoder = require_geocoding();
    var MapboxEventManager = require_events2();
    var localization = require_localization();
    var subtag = require_subtag();
    var Geolocation = require_geolocation();
    var utils = require_utils();
    var GEOCODE_REQUEST_TYPE = {
      FORWARD: 0,
      LOCAL: 1,
      REVERSE: 2
    };
    function getFooterNode() {
      var div = document.createElement("div");
      div.className = "mapboxgl-ctrl-geocoder--powered-by";
      div.innerHTML = '<a href="https://www.mapbox.com/search-service" target="_blank">Powered by Mapbox</a>';
      return div;
    }
    function MapboxGeocoder(options) {
      this._eventEmitter = new EventEmitter();
      this.options = extend({}, this.options, options);
      this.inputString = "";
      this.fresh = true;
      this.lastSelected = null;
      this.geolocation = new Geolocation();
    }
    MapboxGeocoder.prototype = {
      options: {
        zoom: 16,
        flyTo: true,
        trackProximity: true,
        minLength: 2,
        reverseGeocode: false,
        flipCoordinates: false,
        limit: 5,
        origin: "https://api.mapbox.com",
        enableEventLogging: true,
        marker: true,
        mapboxgl: null,
        collapsed: false,
        clearAndBlurOnEsc: false,
        clearOnBlur: false,
        enableGeolocation: false,
        addressAccuracy: "street",
        getItemValue: function(item) {
          return item.place_name;
        },
        render: function(item) {
          var placeName = item.place_name.split(",");
          return '<div class="mapboxgl-ctrl-geocoder--suggestion"><div class="mapboxgl-ctrl-geocoder--suggestion-title">' + placeName[0] + '</div><div class="mapboxgl-ctrl-geocoder--suggestion-address">' + placeName.splice(1, placeName.length).join(",") + "</div></div>";
        }
      },
      /**
       * Add the geocoder to a container. The container can be either a `mapboxgl.Map`, an `HTMLElement` or a CSS selector string.
       *
       * If the container is a [`mapboxgl.Map`](https://docs.mapbox.com/mapbox-gl-js/api/map/), this function will behave identically to [`Map.addControl(geocoder)`](https://docs.mapbox.com/mapbox-gl-js/api/map/#map#addcontrol).
       * If the container is an instance of [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement), then the geocoder will be appended as a child of that [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement).
       * If the container is a [CSS selector string](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), the geocoder will be appended to the element returned from the query.
       *
       * This function will throw an error if the container is none of the above.
       * It will also throw an error if the referenced HTML element cannot be found in the `document.body`.
       *
       * For example, if the HTML body contains the element `<div id='geocoder-container'></div>`, the following script will append the geocoder to `#geocoder-container`:
       *
       * ```javascript
       * var geocoder = new MapboxGeocoder({ accessToken: mapboxgl.accessToken });
       * geocoder.addTo('#geocoder-container');
       * ```
       * @param {String|HTMLElement|mapboxgl.Map} container A reference to the container to which to add the geocoder
       */
      addTo: function(container) {
        function addToExistingContainer(geocoder, container2) {
          if (!document.body.contains(container2)) {
            throw new Error("Element provided to #addTo() exists, but is not in the DOM");
          }
          const el = geocoder.onAdd();
          container2.appendChild(el);
        }
        if (container._controlContainer) {
          container.addControl(this);
        } else if (container instanceof HTMLElement) {
          addToExistingContainer(this, container);
        } else if (typeof container == "string") {
          const parent = document.querySelectorAll(container);
          if (parent.length === 0) {
            throw new Error("Element ", container, "not found.");
          }
          if (parent.length > 1) {
            throw new Error("Geocoder can only be added to a single html element");
          }
          addToExistingContainer(this, parent[0]);
        } else {
          throw new Error("Error: addTo must be a mapbox-gl-js map, an html element, or a CSS selector query for a single html element");
        }
      },
      onAdd: function(map) {
        if (map && typeof map != "string") {
          this._map = map;
        }
        this.setLanguage();
        if (!this.options.localGeocoderOnly) {
          this.geocoderService = mbxGeocoder(
            MapboxClient({
              accessToken: this.options.accessToken,
              origin: this.options.origin
            })
          );
        }
        if (this.options.localGeocoderOnly && !this.options.localGeocoder) {
          throw new Error("A localGeocoder function must be specified to use localGeocoderOnly mode");
        }
        this.eventManager = new MapboxEventManager(this.options);
        this._onChange = this._onChange.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onPaste = this._onPaste.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._showButton = this._showButton.bind(this);
        this._hideButton = this._hideButton.bind(this);
        this._onQueryResult = this._onQueryResult.bind(this);
        this.clear = this.clear.bind(this);
        this._updateProximity = this._updateProximity.bind(this);
        this._collapse = this._collapse.bind(this);
        this._unCollapse = this._unCollapse.bind(this);
        this._clear = this._clear.bind(this);
        this._clearOnBlur = this._clearOnBlur.bind(this);
        this._geolocateUser = this._geolocateUser.bind(this);
        var el = this.container = document.createElement("div");
        el.className = "mapboxgl-ctrl-geocoder mapboxgl-ctrl";
        var searchIcon = this.createIcon("search", '<path d="M7.4 2.5c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9c1 0 1.8-.2 2.5-.8l3.7 3.7c.2.2.4.3.8.3.7 0 1.1-.4 1.1-1.1 0-.3-.1-.5-.3-.8L11.4 10c.4-.8.8-1.6.8-2.5.1-2.8-2.1-5-4.8-5zm0 1.6c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.3-1.3-3.3-3.1 1.4-3.3 3.3-3.3z"/>');
        this._inputEl = document.createElement("input");
        this._inputEl.type = "text";
        this._inputEl.className = "mapboxgl-ctrl-geocoder--input";
        this.setPlaceholder();
        if (this.options.collapsed) {
          this._collapse();
          this.container.addEventListener("mouseenter", this._unCollapse);
          this.container.addEventListener("mouseleave", this._collapse);
          this._inputEl.addEventListener("focus", this._unCollapse);
        }
        if (this.options.collapsed || this.options.clearOnBlur) {
          this._inputEl.addEventListener("blur", this._onBlur);
        }
        this._inputEl.addEventListener("keydown", debounce(this._onKeyDown, 200));
        this._inputEl.addEventListener("paste", this._onPaste);
        this._inputEl.addEventListener("change", this._onChange);
        this.container.addEventListener("mouseenter", this._showButton);
        this.container.addEventListener("mouseleave", this._hideButton);
        this._inputEl.addEventListener("keyup", (function(e) {
          this.eventManager.keyevent(e, this);
        }).bind(this));
        var actions = document.createElement("div");
        actions.classList.add("mapboxgl-ctrl-geocoder--pin-right");
        this._clearEl = document.createElement("button");
        this._clearEl.setAttribute("aria-label", "Clear");
        this._clearEl.addEventListener("click", this.clear);
        this._clearEl.className = "mapboxgl-ctrl-geocoder--button";
        var buttonIcon = this.createIcon("close", '<path d="M3.8 2.5c-.6 0-1.3.7-1.3 1.3 0 .3.2.7.5.8L7.2 9 3 13.2c-.3.3-.5.7-.5 1 0 .6.7 1.3 1.3 1.3.3 0 .7-.2 1-.5L9 10.8l4.2 4.2c.2.3.7.3 1 .3.6 0 1.3-.7 1.3-1.3 0-.3-.2-.7-.3-1l-4.4-4L15 4.6c.3-.2.5-.5.5-.8 0-.7-.7-1.3-1.3-1.3-.3 0-.7.2-1 .3L9 7.1 4.8 2.8c-.3-.1-.7-.3-1-.3z"/>');
        this._clearEl.appendChild(buttonIcon);
        this._loadingEl = this.createIcon("loading", '<path fill="#333" d="M4.4 4.4l.8.8c2.1-2.1 5.5-2.1 7.6 0l.8-.8c-2.5-2.5-6.7-2.5-9.2 0z"/><path opacity=".1" d="M12.8 12.9c-2.1 2.1-5.5 2.1-7.6 0-2.1-2.1-2.1-5.5 0-7.7l-.8-.8c-2.5 2.5-2.5 6.7 0 9.2s6.6 2.5 9.2 0 2.5-6.6 0-9.2l-.8.8c2.2 2.1 2.2 5.6 0 7.7z"/>');
        actions.appendChild(this._clearEl);
        actions.appendChild(this._loadingEl);
        el.appendChild(searchIcon);
        el.appendChild(this._inputEl);
        el.appendChild(actions);
        if (this.options.enableGeolocation && this.geolocation.isSupport()) {
          this._geolocateEl = document.createElement("button");
          this._geolocateEl.setAttribute("aria-label", "Geolocate");
          this._geolocateEl.addEventListener("click", this._geolocateUser);
          this._geolocateEl.className = "mapboxgl-ctrl-geocoder--button";
          var geolocateIcon = this.createIcon("geolocate", '<path d="M12.999 3.677L2.042 8.269c-.962.403-.747 1.823.29 1.912l5.032.431.431 5.033c.089 1.037 1.509 1.252 1.912.29l4.592-10.957c.345-.822-.477-1.644-1.299-1.299z" fill="#4264fb"/>');
          this._geolocateEl.appendChild(geolocateIcon);
          actions.appendChild(this._geolocateEl);
          this._showGeolocateButton();
        }
        var typeahead = this._typeahead = new Typeahead(this._inputEl, [], {
          filter: false,
          minLength: this.options.minLength,
          limit: this.options.limit
        });
        this.setRenderFunction(this.options.render);
        typeahead.getItemValue = this.options.getItemValue;
        var parentDraw = typeahead.list.draw;
        var footerNode = this._footerNode = getFooterNode();
        typeahead.list.draw = function() {
          parentDraw.call(this);
          footerNode.addEventListener("mousedown", (function() {
            this.selectingListItem = true;
          }).bind(this));
          footerNode.addEventListener("mouseup", (function() {
            this.selectingListItem = false;
          }).bind(this));
          this.element.appendChild(footerNode);
        };
        this.mapMarker = null;
        this._handleMarker = this._handleMarker.bind(this);
        if (this._map) {
          if (this.options.trackProximity) {
            this._updateProximity();
            this._map.on("moveend", this._updateProximity);
          }
          this._mapboxgl = this.options.mapboxgl;
          if (!this._mapboxgl && this.options.marker) {
            console.error("No mapboxgl detected in options. Map markers are disabled. Please set options.mapboxgl.");
            this.options.marker = false;
          }
        }
        return el;
      },
      _geolocateUser: function() {
        this._hideGeolocateButton();
        this._showLoadingIcon();
        this.geolocation.getCurrentPosition().then((function(geolocationPosition) {
          this._hideLoadingIcon();
          const geojson = {
            geometry: {
              type: "Point",
              coordinates: [geolocationPosition.coords.longitude, geolocationPosition.coords.latitude]
            }
          };
          this._handleMarker(geojson);
          this._fly(geojson);
          this._typeahead.clear();
          this._typeahead.selected = true;
          this.lastSelected = JSON.stringify(geojson);
          this._showClearButton();
          this.fresh = false;
          const config = {
            limit: 1,
            language: [this.options.language],
            query: geojson.geometry.coordinates,
            types: ["address"]
          };
          if (this.options.localGeocoderOnly) {
            const text = geojson.geometry.coordinates[0] + "," + geojson.geometry.coordinates[1];
            this._setInputValue(text);
            this._eventEmitter.emit("result", { result: geojson });
          } else {
            this.geocoderService.reverseGeocode(config).send().then((function(resp) {
              const feature = resp.body.features[0];
              if (feature) {
                const locationText = utils.transformFeatureToGeolocationText(feature, this.options.addressAccuracy);
                this._setInputValue(locationText);
                feature.user_coordinates = geojson.geometry.coordinates;
                this._eventEmitter.emit("result", { result: feature });
              } else {
                this._eventEmitter.emit("result", { result: { user_coordinates: geojson.geometry.coordinates } });
              }
            }).bind(this));
          }
        }).bind(this)).catch((function(error) {
          if (error.code === 1) {
            this._renderUserDeniedGeolocationError();
          } else {
            this._renderLocationError();
          }
          this._hideLoadingIcon();
          this._showGeolocateButton();
          this._hideAttribution();
        }).bind(this));
      },
      createIcon: function(name, path) {
        var icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        icon.setAttribute("class", "mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-" + name);
        icon.setAttribute("viewBox", "0 0 18 18");
        icon.setAttribute("xml:space", "preserve");
        icon.setAttribute("width", 18);
        icon.setAttribute("height", 18);
        icon.innerHTML = path;
        return icon;
      },
      onRemove: function() {
        this.container.parentNode.removeChild(this.container);
        if (this.options.trackProximity && this._map) {
          this._map.off("moveend", this._updateProximity);
        }
        this._removeMarker();
        this._map = null;
        return this;
      },
      _setInputValue: function(value) {
        this._inputEl.value = value;
        setTimeout((function() {
          this._inputEl.focus();
          this._inputEl.scrollLeft = 0;
          this._inputEl.setSelectionRange(0, 0);
        }).bind(this), 1);
      },
      _onPaste: function(e) {
        var value = (e.clipboardData || window.clipboardData).getData("text");
        if (value.length >= this.options.minLength) {
          this._geocode(value);
        }
      },
      _onKeyDown: function(e) {
        var ESC_KEY_CODE = 27, TAB_KEY_CODE = 9;
        if (e.keyCode === ESC_KEY_CODE && this.options.clearAndBlurOnEsc) {
          this._clear(e);
          return this._inputEl.blur();
        }
        var target = e.target && e.target.shadowRoot ? e.target.shadowRoot.activeElement : e.target;
        var value = target ? target.value : "";
        if (!value) {
          this.fresh = true;
          if (e.keyCode !== TAB_KEY_CODE)
            this.clear(e);
          this._showGeolocateButton();
          return this._hideClearButton();
        }
        this._hideGeolocateButton();
        if (e.metaKey || [TAB_KEY_CODE, ESC_KEY_CODE, 37, 39, 13, 38, 40].indexOf(e.keyCode) !== -1)
          return;
        if (target.value.length >= this.options.minLength) {
          this._geocode(target.value);
        }
      },
      _showButton: function() {
        if (this._typeahead.selected)
          this._showClearButton();
      },
      _hideButton: function() {
        if (this._typeahead.selected)
          this._hideClearButton();
      },
      _showClearButton: function() {
        this._clearEl.style.display = "block";
      },
      _hideClearButton: function() {
        this._clearEl.style.display = "none";
      },
      _showGeolocateButton: function() {
        if (this._geolocateEl && this.geolocation.isSupport()) {
          this._geolocateEl.style.display = "block";
        }
      },
      _hideGeolocateButton: function() {
        if (this._geolocateEl) {
          this._geolocateEl.style.display = "none";
        }
      },
      _showLoadingIcon: function() {
        this._loadingEl.style.display = "block";
      },
      _hideLoadingIcon: function() {
        this._loadingEl.style.display = "none";
      },
      _showAttribution: function() {
        this._footerNode.style.display = "block";
      },
      _hideAttribution: function() {
        this._footerNode.style.display = "none";
      },
      _onBlur: function(e) {
        if (this.options.clearOnBlur) {
          this._clearOnBlur(e);
        }
        if (this.options.collapsed) {
          this._collapse();
        }
      },
      _onChange: function() {
        var selected = this._typeahead.selected;
        if (selected && JSON.stringify(selected) !== this.lastSelected) {
          this._hideClearButton();
          if (this.options.flyTo) {
            this._fly(selected);
          }
          if (this.options.marker && this._mapboxgl) {
            this._handleMarker(selected);
          }
          this._inputEl.focus();
          this._inputEl.scrollLeft = 0;
          this._inputEl.setSelectionRange(0, 0);
          this.lastSelected = JSON.stringify(selected);
          this._eventEmitter.emit("result", { result: selected });
          this.eventManager.select(selected, this);
        }
      },
      _fly: function(selected) {
        var flyOptions;
        if (selected.properties && exceptions[selected.properties.short_code]) {
          flyOptions = extend({}, this.options.flyTo);
          if (this._map) {
            this._map.fitBounds(exceptions[selected.properties.short_code].bbox, flyOptions);
          }
        } else if (selected.bbox) {
          var bbox = selected.bbox;
          flyOptions = extend({}, this.options.flyTo);
          if (this._map) {
            this._map.fitBounds([[bbox[0], bbox[1]], [bbox[2], bbox[3]]], flyOptions);
          }
        } else {
          var defaultFlyOptions = {
            zoom: this.options.zoom
          };
          flyOptions = extend({}, defaultFlyOptions, this.options.flyTo);
          if (selected.center) {
            flyOptions.center = selected.center;
          } else if (selected.geometry && selected.geometry.type && selected.geometry.type === "Point" && selected.geometry.coordinates) {
            flyOptions.center = selected.geometry.coordinates;
          }
          if (this._map) {
            this._map.flyTo(flyOptions);
          }
        }
      },
      _requestType: function(options, search) {
        var type;
        if (options.localGeocoderOnly) {
          type = GEOCODE_REQUEST_TYPE.LOCAL;
        } else if (options.reverseGeocode && utils.REVERSE_GEOCODE_COORD_RGX.test(search)) {
          type = GEOCODE_REQUEST_TYPE.REVERSE;
        } else {
          type = GEOCODE_REQUEST_TYPE.FORWARD;
        }
        return type;
      },
      _setupConfig: function(requestType, search) {
        const keys = [
          "bbox",
          "limit",
          "proximity",
          "countries",
          "types",
          "language",
          "reverseMode",
          "mode",
          "autocomplete",
          "fuzzyMatch",
          "routing",
          "worldview"
        ];
        const spacesOrCommaRgx = /[\s,]+/;
        var self = this;
        var config = keys.reduce(function(config2, key) {
          if (self.options[key] === void 0 || self.options[key] === null) {
            return config2;
          }
          ["countries", "types", "language"].indexOf(key) > -1 ? config2[key] = self.options[key].split(spacesOrCommaRgx) : config2[key] = self.options[key];
          const isCoordKey = typeof self.options[key].longitude === "number" && typeof self.options[key].latitude === "number";
          if (key === "proximity" && isCoordKey) {
            const lng = self.options[key].longitude;
            const lat = self.options[key].latitude;
            config2[key] = [lng, lat];
          }
          return config2;
        }, {});
        switch (requestType) {
          case GEOCODE_REQUEST_TYPE.REVERSE:
            {
              var coords = search.split(spacesOrCommaRgx).map(function(c) {
                return parseFloat(c, 10);
              });
              if (!self.options.flipCoordinates) {
                coords.reverse();
              }
              config.types ? [config.types[0]] : ["poi"];
              config = extend(config, { query: coords, limit: 1 });
              ["proximity", "autocomplete", "fuzzyMatch", "bbox"].forEach(function(key) {
                if (key in config) {
                  delete config[key];
                }
              });
            }
            break;
          case GEOCODE_REQUEST_TYPE.FORWARD:
            {
              const trimmedSearch = search.trim();
              const reverseGeocodeCoordRgx = /^(-?\d{1,3}(\.\d{0,256})?)[, ]+(-?\d{1,3}(\.\d{0,256})?)?$/;
              if (reverseGeocodeCoordRgx.test(trimmedSearch)) {
                search = search.replace(/,/g, " ");
              }
              config = extend(config, { query: search });
            }
            break;
        }
        return config;
      },
      _geocode: function(searchInput) {
        this.inputString = searchInput;
        this._showLoadingIcon();
        this._eventEmitter.emit("loading", { query: searchInput });
        const requestType = this._requestType(this.options, searchInput);
        const config = this._setupConfig(requestType, searchInput);
        var request;
        switch (requestType) {
          case GEOCODE_REQUEST_TYPE.LOCAL:
            request = Promise.resolve();
            break;
          case GEOCODE_REQUEST_TYPE.FORWARD:
            request = this.geocoderService.forwardGeocode(config).send();
            break;
          case GEOCODE_REQUEST_TYPE.REVERSE:
            request = this.geocoderService.reverseGeocode(config).send();
            break;
        }
        var localGeocoderRes = this.options.localGeocoder ? this.options.localGeocoder(searchInput) || [] : [];
        var externalGeocoderRes = [];
        var geocoderError = null;
        request.catch((function(error) {
          geocoderError = error;
        }).bind(this)).then(
          (function(response) {
            this._hideLoadingIcon();
            var res = {};
            if (!response) {
              res = {
                type: "FeatureCollection",
                features: []
              };
            } else if (response.statusCode == "200") {
              res = response.body;
              res.request = response.request;
              res.headers = response.headers;
            }
            res.config = config;
            if (this.fresh) {
              this.eventManager.start(this);
              this.fresh = false;
            }
            res.features = res.features ? localGeocoderRes.concat(res.features) : localGeocoderRes;
            if (this.options.externalGeocoder) {
              externalGeocoderRes = this.options.externalGeocoder(searchInput, res.features) || Promise.resolve([]);
              return externalGeocoderRes.then(function(features) {
                res.features = res.features ? features.concat(res.features) : features;
                return res;
              }, function() {
                return res;
              });
            }
            return res;
          }).bind(this)
        ).then(
          (function(res) {
            if (geocoderError) {
              throw geocoderError;
            }
            if (this.options.filter && res.features.length) {
              res.features = res.features.filter(this.options.filter);
            }
            if (res.features.length) {
              this._showClearButton();
              this._hideGeolocateButton();
              this._showAttribution();
              this._eventEmitter.emit("results", res);
              this._typeahead.update(res.features);
            } else {
              this._hideClearButton();
              this._hideAttribution();
              this._typeahead.selected = null;
              this._renderNoResults();
              this._eventEmitter.emit("results", res);
            }
          }).bind(this)
        ).catch(
          (function(err) {
            this._hideLoadingIcon();
            this._hideAttribution();
            if (localGeocoderRes.length && this.options.localGeocoder || externalGeocoderRes.length && this.options.externalGeocoder) {
              this._showClearButton();
              this._hideGeolocateButton();
              this._typeahead.update(localGeocoderRes);
            } else {
              this._hideClearButton();
              this._typeahead.selected = null;
              this._renderError();
            }
            this._eventEmitter.emit("results", { features: localGeocoderRes });
            this._eventEmitter.emit("error", { error: err });
          }).bind(this)
        );
        return request;
      },
      /**
       * Shared logic for clearing input
       * @param {Event} [ev] the event that triggered the clear, if available
       * @private
       *
       */
      _clear: function(ev) {
        if (ev)
          ev.preventDefault();
        this._inputEl.value = "";
        this._typeahead.selected = null;
        this._typeahead.clear();
        this._onChange();
        this._hideClearButton();
        this._showGeolocateButton();
        this._removeMarker();
        this.lastSelected = null;
        this._eventEmitter.emit("clear");
        this.fresh = true;
      },
      /**
       * Clear and then focus the input.
       * @param {Event} [ev] the event that triggered the clear, if available
       *
       */
      clear: function(ev) {
        this._clear(ev);
        this._inputEl.focus();
      },
      /**
       * Clear the input, without refocusing it. Used to implement clearOnBlur
       * constructor option.
       * @param {Event} [ev] the blur event
       * @private
       */
      _clearOnBlur: function(ev) {
        var ctx = this;
        if (ev.relatedTarget) {
          ctx._clear(ev);
        }
      },
      _onQueryResult: function(response) {
        var results = response.body;
        if (!results.features.length)
          return;
        var result = results.features[0];
        this._typeahead.selected = result;
        this._inputEl.value = result.place_name;
        this._onChange();
      },
      _updateProximity: function() {
        if (!this._map || !this.options.trackProximity) {
          return;
        }
        if (this._map.getZoom() > 9) {
          var center = this._map.getCenter().wrap();
          this.setProximity({ longitude: center.lng, latitude: center.lat }, false);
        } else {
          this.setProximity(null, false);
        }
      },
      _collapse: function() {
        if (!this._inputEl.value && this._inputEl !== document.activeElement)
          this.container.classList.add("mapboxgl-ctrl-geocoder--collapsed");
      },
      _unCollapse: function() {
        this.container.classList.remove("mapboxgl-ctrl-geocoder--collapsed");
      },
      /**
       * Set & query the input
       * @param {string} searchInput location name or other search input
       * @returns {MapboxGeocoder} this
       */
      query: function(searchInput) {
        this._geocode(searchInput).then(this._onQueryResult);
        return this;
      },
      _renderError: function() {
        var errorMessage = "<div class='mapbox-gl-geocoder--error'>There was an error reaching the server</div>";
        this._renderMessage(errorMessage);
      },
      _renderLocationError: function() {
        var errorMessage = "<div class='mapbox-gl-geocoder--error'>A location error has occurred</div>";
        this._renderMessage(errorMessage);
      },
      _renderNoResults: function() {
        var errorMessage = "<div class='mapbox-gl-geocoder--error mapbox-gl-geocoder--no-results'>No results found</div>";
        this._renderMessage(errorMessage);
      },
      _renderUserDeniedGeolocationError: function() {
        var errorMessage = "<div class='mapbox-gl-geocoder--error'>Geolocation permission denied</div>";
        this._renderMessage(errorMessage);
      },
      _renderMessage: function(msg) {
        this._typeahead.update([]);
        this._typeahead.selected = null;
        this._typeahead.clear();
        this._typeahead.renderError(msg);
      },
      /**
       * Get the text to use as the search bar placeholder
       *
       * If placeholder is provided in options, then use options.placeholder
       * Otherwise, if language is provided in options, then use the localized string of the first language if available
       * Otherwise use the default
       *
       * @returns {String} the value to use as the search bar placeholder
       * @private
       */
      _getPlaceholderText: function() {
        if (this.options.placeholder)
          return this.options.placeholder;
        if (this.options.language) {
          var firstLanguage = this.options.language.split(",")[0];
          var language = subtag.language(firstLanguage);
          var localizedValue = localization.placeholder[language];
          if (localizedValue)
            return localizedValue;
        }
        return "Search";
      },
      /**
       * Set input
       * @param {string} searchInput location name or other search input
       * @param {boolean} [showSuggestions=false] display suggestion on setInput call
       * @returns {MapboxGeocoder} this
       */
      setInput: function(searchInput, showSuggestions) {
        if (showSuggestions === void 0) {
          showSuggestions = false;
        }
        this._inputEl.value = searchInput;
        this._typeahead.selected = null;
        this._typeahead.clear();
        if (searchInput.length >= this.options.minLength) {
          showSuggestions ? this._geocode(searchInput) : this._onChange();
        }
        return this;
      },
      /**
       * Set proximity
       * @param {Object|'ip'} proximity The new `options.proximity` value. This is a geographical point given as an object with `latitude` and `longitude` properties or the string 'ip'.
       * @param {Boolean} disableTrackProximity If true, sets `trackProximity` to false. True by default to prevent `trackProximity` from unintentionally overriding an explicitly set proximity value.
       * @returns {MapboxGeocoder} this
       */
      setProximity: function(proximity, disableTrackProximity = true) {
        this.options.proximity = proximity;
        if (disableTrackProximity) {
          this.options.trackProximity = false;
        }
        return this;
      },
      /**
       * Get proximity
       * @returns {Object} The geocoder proximity
       */
      getProximity: function() {
        return this.options.proximity;
      },
      /**
       * Set the render function used in the results dropdown
       * @param {Function} fn The function to use as a render function. This function accepts a single [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) object as input and returns a string.
       * @returns {MapboxGeocoder} this
       */
      setRenderFunction: function(fn) {
        if (fn && typeof fn == "function") {
          this._typeahead.render = fn;
        }
        return this;
      },
      /**
       * Get the function used to render the results dropdown
       *
       * @returns {Function} the render function
       */
      getRenderFunction: function() {
        return this._typeahead.render;
      },
      /**
       * Get the language to use in UI elements and when making search requests
       *
       * Look first at the explicitly set options otherwise use the browser's language settings
       * @param {String} language Specify the language to use for response text and query result weighting. Options are IETF language tags comprised of a mandatory ISO 639-1 language code and optionally one or more IETF subtags for country or script. More than one value can also be specified, separated by commas.
       * @returns {MapboxGeocoder} this
       */
      setLanguage: function(language) {
        var browserLocale = navigator.language || navigator.userLanguage || navigator.browserLanguage;
        this.options.language = language || this.options.language || browserLocale;
        return this;
      },
      /**
       * Get the language to use in UI elements and when making search requests
       * @returns {String} The language(s) used by the plugin, if any
       */
      getLanguage: function() {
        return this.options.language;
      },
      /**
       * Get the zoom level the map will move to when there is no bounding box on the selected result
       * @returns {Number} the map zoom
       */
      getZoom: function() {
        return this.options.zoom;
      },
      /**
       * Set the zoom level
       * @param {Number} zoom The zoom level that the map should animate to when a `bbox` isn't found in the response. If a `bbox` is found the map will fit to the `bbox`.
       * @returns {MapboxGeocoder} this
       */
      setZoom: function(zoom) {
        this.options.zoom = zoom;
        return this;
      },
      /**
       * Get the parameters used to fly to the selected response, if any
       * @returns {Boolean|Object} The `flyTo` option
       */
      getFlyTo: function() {
        return this.options.flyTo;
      },
      /**
       * Set the flyTo options
       * @param {Boolean|Object} flyTo If false, animating the map to a selected result is disabled. If true, animating the map will use the default animation parameters. If an object, it will be passed as `options` to the map [`flyTo`](https://docs.mapbox.com/mapbox-gl-js/api/#map#flyto) or [`fitBounds`](https://docs.mapbox.com/mapbox-gl-js/api/#map#fitbounds) method providing control over the animation of the transition.
       */
      setFlyTo: function(flyTo) {
        this.options.flyTo = flyTo;
        return this;
      },
      /**
       * Get the value of the placeholder string
       * @returns {String} The input element's placeholder value
       */
      getPlaceholder: function() {
        return this.options.placeholder;
      },
      /**
       * Set the value of the input element's placeholder
       * @param {String} placeholder the text to use as the input element's placeholder
       * @returns {MapboxGeocoder} this
       */
      setPlaceholder: function(placeholder) {
        this.options.placeholder = placeholder ? placeholder : this._getPlaceholderText();
        this._inputEl.placeholder = this.options.placeholder;
        this._inputEl.setAttribute("aria-label", this.options.placeholder);
        return this;
      },
      /**
       * Get the bounding box used by the plugin
       * @returns {Array<Number>} the bounding box, if any
       */
      getBbox: function() {
        return this.options.bbox;
      },
      /**
       * Set the bounding box to limit search results to
       * @param {Array<Number>} bbox a bounding box given as an array in the format [minX, minY, maxX, maxY].
       * @returns {MapboxGeocoder} this
       */
      setBbox: function(bbox) {
        this.options.bbox = bbox;
        return this;
      },
      /**
       * Get a list of the countries to limit search results to
       * @returns {String} a comma separated list of countries to limit to, if any
       */
      getCountries: function() {
        return this.options.countries;
      },
      /**
       * Set the countries to limit search results to
       * @param {String} countries a comma separated list of countries to limit to
       * @returns {MapboxGeocoder} this
       */
      setCountries: function(countries) {
        this.options.countries = countries;
        return this;
      },
      /**
       * Get a list of the types to limit search results to
       * @returns {String} a comma separated list of types to limit to
       */
      getTypes: function() {
        return this.options.types;
      },
      /**
       * Set the types to limit search results to
       * @param {String} countries a comma separated list of types to limit to
       * @returns {MapboxGeocoder} this
       */
      setTypes: function(types) {
        this.options.types = types;
        return this;
      },
      /**
       * Get the minimum number of characters typed to trigger results used in the plugin
       * @returns {Number} The minimum length in characters before a search is triggered
       */
      getMinLength: function() {
        return this.options.minLength;
      },
      /**
       * Set the minimum number of characters typed to trigger results used by the plugin
       * @param {Number} minLength the minimum length in characters
       * @returns {MapboxGeocoder} this
       */
      setMinLength: function(minLength) {
        this.options.minLength = minLength;
        if (this._typeahead)
          this._typeahead.options.minLength = minLength;
        return this;
      },
      /**
       * Get the limit value for the number of results to display used by the plugin
       * @returns {Number} The limit value for the number of results to display used by the plugin
       */
      getLimit: function() {
        return this.options.limit;
      },
      /**
       * Set the limit value for the number of results to display used by the plugin
       * @param {Number} limit the number of search results to return
       * @returns {MapboxGeocoder}
       */
      setLimit: function(limit) {
        this.options.limit = limit;
        if (this._typeahead)
          this._typeahead.options.limit = limit;
        return this;
      },
      /**
       * Get the filter function used by the plugin
       * @returns {Function} the filter function
       */
      getFilter: function() {
        return this.options.filter;
      },
      /**
       * Set the filter function used by the plugin.
       * @param {Function} filter A function which accepts a Feature in the [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) format to filter out results from the Geocoding API response before they are included in the suggestions list. Return `true` to keep the item, `false` otherwise.
       * @returns {MapboxGeocoder} this
       */
      setFilter: function(filter) {
        this.options.filter = filter;
        return this;
      },
      /**
       * Set the geocoding endpoint used by the plugin.
       * @param {Function} origin A function which accepts an HTTPS URL to specify the endpoint to query results from.
       * @returns {MapboxGeocoder} this
       */
      setOrigin: function(origin) {
        this.options.origin = origin;
        this.geocoderService = mbxGeocoder(
          MapboxClient({
            accessToken: this.options.accessToken,
            origin: this.options.origin
          })
        );
        return this;
      },
      /**
       * Get the geocoding endpoint the plugin is currently set to
       * @returns {Function} the endpoint URL
       */
      getOrigin: function() {
        return this.options.origin;
      },
      /**
       * Set the accessToken option used for the geocoding request endpoint.
       * @param {String} accessToken value
       * @returns {MapboxGeocoder} this
       */
      setAccessToken: function(accessToken) {
        this.options.accessToken = accessToken;
        this.geocoderService = mbxGeocoder(
          MapboxClient({
            accessToken: this.options.accessToken,
            origin: this.options.origin
          })
        );
        return this;
      },
      /**
       * Set the autocomplete option used for geocoding requests
       * @param {Boolean} value The boolean value to set autocomplete to
       * @returns
       */
      setAutocomplete: function(value) {
        this.options.autocomplete = value;
        return this;
      },
      /**
       * Get the current autocomplete parameter value used for requests
       * @returns {Boolean} The autocomplete parameter value
       */
      getAutocomplete: function() {
        return this.options.autocomplete;
      },
      /**
       * Set the fuzzyMatch option used for approximate matching in geocoding requests
       * @param {Boolean} value The boolean value to set fuzzyMatch to
       * @returns
       */
      setFuzzyMatch: function(value) {
        this.options.fuzzyMatch = value;
        return this;
      },
      /**
       * Get the current fuzzyMatch parameter value used for requests
       * @returns {Boolean} The fuzzyMatch parameter value
       */
      getFuzzyMatch: function() {
        return this.options.fuzzyMatch;
      },
      /**
       * Set the routing parameter used to ask for routable point metadata in geocoding requests
       * @param {Boolean} value The boolean value to set routing to
       * @returns
       */
      setRouting: function(value) {
        this.options.routing = value;
        return this;
      },
      /**
       * Get the current routing parameter value used for requests
       * @returns {Boolean} The routing parameter value
       */
      getRouting: function() {
        return this.options.routing;
      },
      /**
       * Set the worldview parameter
       * @param {String} code The country code representing the worldview (e.g. "us" | "cn" | "jp", "in")
       * @returns
       */
      setWorldview: function(code) {
        this.options.worldview = code;
        return this;
      },
      /**
       * Get the current worldview parameter value used for requests
       * @returns {String} The worldview parameter value
       */
      getWorldview: function() {
        return this.options.worldview;
      },
      /**
       * Handle the placement of a result marking the selected result
       * @private
       * @param {Object} selected the selected geojson feature
       * @returns {MapboxGeocoder} this
       */
      _handleMarker: function(selected) {
        if (!this._map) {
          return;
        }
        this._removeMarker();
        var defaultMarkerOptions = {
          color: "#4668F2"
        };
        var markerOptions = extend({}, defaultMarkerOptions, this.options.marker);
        this.mapMarker = new this._mapboxgl.Marker(markerOptions);
        if (selected.center) {
          this.mapMarker.setLngLat(selected.center).addTo(this._map);
        } else if (selected.geometry && selected.geometry.type && selected.geometry.type === "Point" && selected.geometry.coordinates) {
          this.mapMarker.setLngLat(selected.geometry.coordinates).addTo(this._map);
        }
        return this;
      },
      /**
       * Handle the removal of a result marker
       * @private
       */
      _removeMarker: function() {
        if (this.mapMarker) {
          this.mapMarker.remove();
          this.mapMarker = null;
        }
      },
      /**
       * Subscribe to events that happen within the plugin.
       * @param {String} type name of event. Available events and the data passed into their respective event objects are:
       *
       * - __clear__ `Emitted when the input is cleared`
       * - __loading__ `{ query } Emitted when the geocoder is looking up a query`
       * - __results__ `{ results } Fired when the geocoder returns a response`
       * - __result__ `{ result } Fired when input is set`
       * - __error__ `{ error } Error as string`
       * @param {Function} fn function that's called when the event is emitted.
       * @returns {MapboxGeocoder} this;
       */
      on: function(type, fn) {
        this._eventEmitter.on(type, fn);
        return this;
      },
      /**
       * Remove an event
       * @returns {MapboxGeocoder} this
       * @param {String} type Event name.
       * @param {Function} fn Function that should unsubscribe to the event emitted.
       */
      off: function(type, fn) {
        this._eventEmitter.removeListener(type, fn);
        this.eventManager.remove();
        return this;
      }
    };
    module.exports = MapboxGeocoder;
  }
});
export default require_lib2();
/*! Bundled license information:

base-64/base64.js:
  (*! http://mths.be/base64 v0.1.0 by @mathias | MIT license *)
*/
//# sourceMappingURL=@mapbox_mapbox-gl-geocoder.js.map
