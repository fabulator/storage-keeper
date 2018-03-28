import Cookies from 'js-cookie';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var Storage = function () {
    function Storage() {
        var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var storeAdapter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : localStorage;
        classCallCheck(this, Storage);

        this.prefix = prefix;
        this.storeAdapter = storeAdapter;
    }

    /**
     * Get value from storage.
     *
     * @param {string} key - storage key
     * @returns {string | Object | null} content of storage
     */


    createClass(Storage, [{
        key: 'get',
        value: function get$$1(key) {
            var value = this.storeAdapter.getItem('' + this.prefix + key);

            if (!value) {
                return null;
            }

            try {
                return this.parseEncodedValue(JSON.parse(value), key);
            } catch (error) {
                return value;
            }
        }

        /**
         * Parse object saved in storage.
         *
         * @param {Object} object - Save object
         * @param {string} key - Key of item
         * @returns {string | Object | null} Decoded value
         */

    }, {
        key: 'parseEncodedValue',
        value: function parseEncodedValue(object, key) {
            // is value expired?
            if (object.expire && object.value && object.expire < Date.now()) {
                this.remove(key);
                return null;
            } else if (object.expire && object.value) {
                return Storage.tryParseJson(object.value);
            }

            return object;
        }

        /**
         * Try to parse json.
         *
         * @param {string} json - Possible encoded json
         * @returns {Object | string} Decoded json or source string
         */

    }, {
        key: 'remove',


        /**
         * Remove item from storage.
         *
         * @param {string} key - key to remove
         */
        value: function remove(key) {
            this.storeAdapter.removeItem('' + this.prefix + key);
        }

        /**
         * Set new item to storage.
         *
         * @param {string} key - key of item
         * @param {*} value - value of item
         * @param {Date} expire - date of expire
         */

    }, {
        key: 'set',
        value: function set$$1(key, value, expire) {
            var valueToSave = typeof value === 'number' ? value.toString() : value;
            if (expire) {
                valueToSave = {
                    expire: expire.getTime(),
                    value: value
                };
            }

            this.storeAdapter.setItem('' + this.prefix + key, (typeof valueToSave === 'undefined' ? 'undefined' : _typeof(valueToSave)) === 'object' ? JSON.stringify(valueToSave) : valueToSave);
        }
    }], [{
        key: 'tryParseJson',
        value: function tryParseJson(json) {
            try {
                return JSON.parse(json);
            } catch (error) {
                return json;
            }
        }
    }]);
    return Storage;
}();

var CookieAdapter = function () {
    function CookieAdapter() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, CookieAdapter);

        this.options = options;
    }

    createClass(CookieAdapter, [{
        key: 'getItem',
        value: function getItem(key) {
            return Cookies.get(key);
        }
    }, {
        key: 'setItem',
        value: function setItem(key, data) {
            var decoded = Storage.tryParseJson(data);

            if ((typeof decoded === 'undefined' ? 'undefined' : _typeof(decoded)) === 'object' && decoded.expire) {
                var time = new Date();
                time.setTime(decoded.expire);

                Cookies.set(key, data, _extends({}, this.options, {
                    expires: time
                }));

                return;
            }

            Cookies.set(key, data, this.options);
        }
    }, {
        key: 'removeItem',
        value: function removeItem(key) {
            Cookies.remove(key, this.options);
        }
    }]);
    return CookieAdapter;
}();

export default CookieAdapter;
