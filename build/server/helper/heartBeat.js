'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _signals = require('signals');

var _signals2 = _interopRequireDefault(_signals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HeartBeat = function () {
  function HeartBeat(delay) {
    _classCallCheck(this, HeartBeat);

    var self = this;
    this._event = [];
    this._eventMap = {};

    this._beat = setInterval(function () {
      self._heart();
    }, delay);
  }

  _createClass(HeartBeat, [{
    key: 'every',
    value: function every(step) {
      if (typeof step === 'undefined') {
        step = 1;
      }
      if (typeof step !== 'number') {
        throw new Error('Passed step argument is not a number');
      }
      if (typeof this._eventMap[step] === 'undefined') {
        this._registerNewEvent(step);
      }
      return this._event[this._eventMap[step]].signal;
    }
  }, {
    key: 'kill',
    value: function kill() {
      clearInterval(this._beat);
      this._event = [];
      this._eventMap = [];
    }
  }, {
    key: '_registerNewEvent',
    value: function _registerNewEvent(step) {
      this._eventMap[step] = this._event.length;
      this._event.push({
        counter: 0,
        signal: new _signals2.default.Signal(),
        step: step
      });
    }
  }, {
    key: '_heart',
    value: function _heart() {
      for (var i = 0; i < this._event.length; i++) {
        var e = this._event[i];
        e.counter++;
        if (e.counter === e.step) {
          e.counter = 0;
          e.signal.dispatch();
        }
      }
    }
  }]);

  return HeartBeat;
}();

exports.default = HeartBeat;
//# sourceMappingURL=heartBeat.js.map