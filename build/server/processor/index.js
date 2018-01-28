'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _heartBeat = require('../helper/heartBeat');

var _heartBeat2 = _interopRequireDefault(_heartBeat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Processor = function Processor() {
    // this.heartBeat.every(5).add(() => this.queueService.matchPlayers());

    _classCallCheck(this, Processor);

    this.heartBeat = new _heartBeat2.default(1000);
};

exports.default = Processor;
//# sourceMappingURL=index.js.map