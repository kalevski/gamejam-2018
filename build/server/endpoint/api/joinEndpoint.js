'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _endpoint = require('../endpoint');

var _endpoint2 = _interopRequireDefault(_endpoint);

var _heartBeat = require('../../helper/heartBeat');

var _heartBeat2 = _interopRequireDefault(_heartBeat);

var _worldService = require('../../service/worldService');

var _worldService2 = _interopRequireDefault(_worldService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JoinEndpoint = function (_Endpoint) {
    _inherits(JoinEndpoint, _Endpoint);

    function JoinEndpoint() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, JoinEndpoint);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = JoinEndpoint.__proto__ || Object.getPrototypeOf(JoinEndpoint)).call.apply(_ref, [this].concat(args))), _this), _this.worldService = _worldService2.default.getInstance(), _this.queue = [], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(JoinEndpoint, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            var heartbeat = new _heartBeat2.default(1000);
            heartbeat.every(3).add(function () {
                var clients = _this2.helper.getClients();
                _this2.createGame(clients);
            });
        }
    }, {
        key: 'websocket',
        value: function websocket(ws, request) {}
    }, {
        key: 'createGame',
        value: function createGame(clients) {
            var _this3 = this;

            if (clients.length < 2) return;
            var players = [];
            clients.forEach(function (client) {
                players.push(client);
                if (players.length === 2) {
                    var worldId = _this3.worldService.createWorld();
                    players.forEach(function (player) {
                        player.send(worldId);
                        player.terminate();
                    });
                }
            });
        }
    }]);

    return JoinEndpoint;
}(_endpoint2.default);

exports.default = JoinEndpoint;
//# sourceMappingURL=joinEndpoint.js.map