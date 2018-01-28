'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _worldDto = require('../dto/worldDto');

var _worldDto2 = _interopRequireDefault(_worldDto);

var _worldDao = require('../dao/worldDao');

var _worldDao2 = _interopRequireDefault(_worldDao);

var _worldConfig = require('../config/worldConfig');

var _worldConfig2 = _interopRequireDefault(_worldConfig);

var _joinCommand = require('./command/joinCommand');

var _joinCommand2 = _interopRequireDefault(_joinCommand);

var _removeActionsCommand = require('./command/removeActionsCommand');

var _removeActionsCommand2 = _interopRequireDefault(_removeActionsCommand);

var _moveCommand = require('./command/moveCommand');

var _moveCommand2 = _interopRequireDefault(_moveCommand);

var _pushActionCommand = require('./command/pushActionCommand');

var _pushActionCommand2 = _interopRequireDefault(_pushActionCommand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArenaWorldService = function () {
    function ArenaWorldService() {
        _classCallCheck(this, ArenaWorldService);

        this.worldDao = new _worldDao2.default();
        this.command = {
            'join': _joinCommand2.default,
            'removeActions': _removeActionsCommand2.default,
            'move': _moveCommand2.default,
            'pushAction': _pushActionCommand2.default
        };
    }

    _createClass(ArenaWorldService, [{
        key: 'buildCommand',
        value: function buildCommand(message) {
            var object = JSON.parse(message);
            var cond1 = typeof object['type'] !== 'undefined';
            var cond2 = typeof object['user'] !== 'undefined';
            var cond3 = _typeof(object['data']) === 'object';

            if (cond1 && cond2 && cond3) {
                return object;
            } else {
                return null;
            }
        }
    }, {
        key: 'exec',
        value: function exec(worldId, command, sendStatus) {
            var _this = this;

            return this.worldDao.get(worldId).then(function (world) {
                if (typeof _this.command[command.type] === 'function') {
                    var out = _this.command[command.type](command.user, command.data, world);
                    _this.worldDao.update(out.world).then(function (world) {
                        if (out.status.send) {
                            sendStatus(world, command.user, out.status.toAll);
                        }
                    });
                } else {
                    return null;
                }
            });
        }
    }, {
        key: 'getWorld',
        value: function getWorld(worldId) {
            return this.worldDao.get(worldId);
        }
    }, {
        key: 'createWorld',
        value: function createWorld() {
            var world = new _worldDto2.default();
            world.id = (0, _v2.default)();
            this.generate(world);
            return world.id;
        }
    }, {
        key: 'generate',
        value: function generate(world) {
            // make choise about world
            var index = Math.floor(Math.random() * 2.99 + 1);
            var worldData = _worldConfig2.default[_worldConfig2.default.worldList[index]];
            world.type = _worldConfig2.default.worldList[index];
            world.turnTime = _worldConfig2.default.turnTime;
            world.description = worldData.description;
            world.deadFields = worldData.deadFields;
            this.worldDao.create(world);
        }
    }]);

    return ArenaWorldService;
}();

var instance = null;
ArenaWorldService.getInstance = function () {
    if (instance === null) {
        instance = new ArenaWorldService();
    }
    return instance;
};

exports.default = ArenaWorldService;
//# sourceMappingURL=worldService.js.map