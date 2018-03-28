'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));

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





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

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

var FileAdapter = function () {
    function FileAdapter(path) {
        classCallCheck(this, FileAdapter);

        this.path = path;
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify({}), 'utf8');
        }
    }

    createClass(FileAdapter, [{
        key: 'getFileContent',
        value: function getFileContent() {
            return JSON.parse(fs.readFileSync(this.path).toString());
        }
    }, {
        key: 'updateData',
        value: function updateData(data) {
            fs.writeFileSync(this.path, JSON.stringify(data));
        }
    }, {
        key: 'getItem',
        value: function getItem(key) {
            return this.getFileContent()[key];
        }
    }, {
        key: 'setItem',
        value: function setItem(key, value) {
            this.updateData(_extends({}, this.getFileContent(), defineProperty({}, key, value)));
        }
    }, {
        key: 'removeItem',
        value: function removeItem(key) {
            var data = this.getFileContent();
            delete data[key];
            this.updateData(data);
        }
    }]);
    return FileAdapter;
}();

module.exports = FileAdapter;
