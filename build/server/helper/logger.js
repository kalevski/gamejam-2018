'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
  function Logger() {
    _classCallCheck(this, Logger);

    this._logger = this._createLogger();
  }

  _createClass(Logger, [{
    key: 'error',
    value: function error(message) {
      this._log('error', arguments);
    }
  }, {
    key: 'warn',
    value: function warn(message) {
      this._log('warn', arguments);
    }
  }, {
    key: 'info',
    value: function info(message) {
      this._log('info', arguments);
    }
  }, {
    key: 'verbose',
    value: function verbose(message) {
      this._log('verbose', arguments);
    }
  }, {
    key: 'debug',
    value: function debug(message) {
      this._log('debug', arguments);
    }
  }, {
    key: 'silly',
    value: function silly(message) {
      this._log('silly', arguments);
    }
  }, {
    key: '_log',
    value: function _log(type, args) {
      var args = Array.from(args);
      var message = '';
      for (var i = 0; i < args.length; i++) {
        var prefix = ', ';
        if (i == 0) prefix = '';
        if (typeof args[i] !== 'string') {
          var cache = [];
          message += prefix + '\n' + JSON.stringify(args[i], function (key, value) {
            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {
              if (cache.indexOf(value) !== -1) {
                return;
              }
              cache.push(value);
            }
            return value;
          }, 3);
          cache = null;
        } else {
          message += prefix + args[i];
        }
      }
      this._logger.log(type, message);
    }
  }, {
    key: '_timestamp',
    value: function _timestamp() {
      return new Date(Date.now()).toLocaleString();
    }
  }, {
    key: '_formatter',
    value: function _formatter(options) {
      var stackString = options.meta.stack;
      if (typeof stackString === 'undefined') stackString = [''];
      stackString = stackString.join('\n');
      var stack = typeof options.meta.stack !== 'undefined' ? '\n' + stackString : '';
      var formatted = '';
      formatted += '[' + options.timestamp() + ']: ';
      formatted += undefined !== options.message ? options.message : '';
      formatted += stack;
      return _winston2.default.config.colorize(options.level, formatted);
    }
  }, {
    key: '_createLogger',
    value: function _createLogger() {
      var self = this;
      return new _winston2.default.Logger({
        transports: [new _winston2.default.transports.Console({
          level: 'silly',
          timestamp: self._timestamp,
          formatter: self._formatter,
          handleExceptions: true,
          json: false,
          colorize: true
        })]
      });
    }
  }]);

  return Logger;
}();

var instance = null;
Logger.getInstance = function () {
  if (instance === null) {
    instance = new Logger();
  }
  return instance;
};

exports.default = Logger;
//# sourceMappingURL=logger.js.map