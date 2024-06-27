import {
  __commonJS
} from "./chunk-ROME4SDB.js";

// node_modules/subtag/subtag.js
var require_subtag = __commonJS({
  "node_modules/subtag/subtag.js"(exports, module) {
    !function(root, name, make) {
      if (typeof module != "undefined" && module.exports)
        module.exports = make();
      else
        root[name] = make();
    }(exports, "subtag", function() {
      var empty = "";
      var pattern = /^([a-zA-Z]{2,3})(?:[_-]+([a-zA-Z]{3})(?=$|[_-]+))?(?:[_-]+([a-zA-Z]{4})(?=$|[_-]+))?(?:[_-]+([a-zA-Z]{2}|[0-9]{3})(?=$|[_-]+))?/;
      function match(tag) {
        return tag.match(pattern) || [];
      }
      function split(tag) {
        return match(tag).filter(function(v, i) {
          return v && i;
        });
      }
      function api(tag) {
        tag = match(tag);
        return {
          language: tag[1] || empty,
          extlang: tag[2] || empty,
          script: tag[3] || empty,
          region: tag[4] || empty
        };
      }
      function expose(target, key, value) {
        Object.defineProperty(target, key, {
          value,
          enumerable: true
        });
      }
      function part(position, pattern2, type) {
        function method(tag) {
          return match(tag)[position] || empty;
        }
        expose(method, "pattern", pattern2);
        expose(api, type, method);
      }
      part(1, /^[a-zA-Z]{2,3}$/, "language");
      part(2, /^[a-zA-Z]{3}$/, "extlang");
      part(3, /^[a-zA-Z]{4}$/, "script");
      part(4, /^[a-zA-Z]{2}$|^[0-9]{3}$/, "region");
      expose(api, "split", split);
      return api;
    });
  }
});

export {
  require_subtag
};
//# sourceMappingURL=chunk-Q3S3AKX4.js.map
