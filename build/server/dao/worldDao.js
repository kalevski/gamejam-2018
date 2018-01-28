'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _storage = require('../adapter/storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WorldDao = function () {
    function WorldDao() {
        _classCallCheck(this, WorldDao);

        this.storage = _storage2.default.getInstance();
    }

    _createClass(WorldDao, [{
        key: 'get',
        value: function get(worldId) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.storage.get('world:' + worldId, function (err, reply) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(reply));
                    }
                });
            });
        }
    }, {
        key: 'create',
        value: function create(world) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2.storage.set('world:' + world.id, JSON.stringify(world), function (err, reply) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(world);
                    }
                });
            });
        }
    }, {
        key: 'update',
        value: function update(world) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _this3.storage.set('world:' + world.id, JSON.stringify(world), function (err, reply) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(world);
                    }
                });
            });
        }
    }, {
        key: 'remove',
        value: function remove(worldId) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                _this4.storage.del('world:' + worldId, function (err, reply) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        }
    }]);

    return WorldDao;
}();

exports.default = WorldDao;
//# sourceMappingURL=worldDao.js.map