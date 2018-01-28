'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _logger = require('../helper/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function Storage() {
    var _this = this;

    _classCallCheck(this, Storage);

    this.client = null;
    this.logger = _logger2.default.getInstance();

    this._onError = function (err) {
        _this.logger.error('Caching System: ' + err);
    };

    this.client = _redis2.default.createClient(process.env.REDIS_URL);
    this.client.on('error', this._onError);
};

var instance = null;
Storage.getInstance = function () {
    if (instance === null) {
        instance = new Storage();
    }
    return instance.client;
};

exports.default = Storage;
//# sourceMappingURL=storage.js.map