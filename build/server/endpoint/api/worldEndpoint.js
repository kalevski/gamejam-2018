'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _endpoint = require('../endpoint');

var _endpoint2 = _interopRequireDefault(_endpoint);

var _worldService = require('../../service/worldService');

var _worldService2 = _interopRequireDefault(_worldService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WorldEndpoint = function (_Endpoint) {
    _inherits(WorldEndpoint, _Endpoint);

    function WorldEndpoint() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, WorldEndpoint);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WorldEndpoint.__proto__ || Object.getPrototypeOf(WorldEndpoint)).call.apply(_ref, [this].concat(args))), _this), _this.worldService = _worldService2.default.getInstance(), _this.sendStatus = function (world, nickname) {
            var toAll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var players = _this.helper.getClients('worldId').map[world.id];
            players.forEach(function (player) {
                if (player.upgradeReq.query.nickname !== nickname || toAll) {
                    player.send(JSON.stringify({
                        type: 'status',
                        data: world
                    }));
                }
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(WorldEndpoint, [{
        key: 'websocket',
        value: function websocket(ws, request) {
            var _this2 = this;

            var worldId = request.params.worldId;
            var nickname = request.query.nickname;
            ws.on('message', function (message) {
                return _this2.onMessage(message, worldId, nickname);
            });
        }
    }, {
        key: 'onMessage',
        value: function onMessage(message, worldId, nickname) {
            var command = this.worldService.buildCommand(message);
            if (command !== null) {
                this.logger.info('World[' + worldId + ']: executed: [' + command.type + '] by ' + command.user);
                this.worldService.exec(worldId, command, this.sendStatus);
            } else {
                this.logger.error('command can\'t be built', JSON.parse(message));
            }
        }
    }]);

    return WorldEndpoint;
}(_endpoint2.default);

exports.default = WorldEndpoint;
//# sourceMappingURL=worldEndpoint.js.map