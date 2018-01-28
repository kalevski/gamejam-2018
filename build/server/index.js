'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cluster = require('cluster');

var _cluster2 = _interopRequireDefault(_cluster);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _processor = require('./processor');

var _processor2 = _interopRequireDefault(_processor);

var _logger = require('./helper/logger');

var _logger2 = _interopRequireDefault(_logger);

var _config = require('./config.dev');

var _config2 = _interopRequireDefault(_config);

var _config3 = require('./config.prod');

var _config4 = _interopRequireDefault(_config3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Api = function () {
    function Api() {
        _classCallCheck(this, Api);

        this.logger = _logger2.default.getInstance();

        if (_cluster2.default.isMaster) {
            if (this.checkMachine()) {
                this.master();
            }
        } else {
            this.slave();
        }
    }

    _createClass(Api, [{
        key: 'master',
        value: function master() {
            var env = _config4.default;
            if (typeof process.env['ENV'] !== 'undefined') {
                if (process.env['ENV'] === 'DEV') {
                    env = _config2.default;
                }
            }

            env['INSTANCE_TYPE'] = 'router';
            for (var i = 0; i < 1; i++) {
                env['INSTANCE_ID'] = i;
                env['ROOT'] = __dirname;
                _cluster2.default.fork(env);
            }

            env['INSTANCE_TYPE'] = 'processor';
            env['INSTANCE_ID'] = 'scheduler';
            _cluster2.default.fork(env);
        }
    }, {
        key: 'slave',
        value: function slave() {
            if (process.env['INSTANCE_TYPE'] === 'router') {
                new _router2.default();
            } else if (process.env['INSTANCE_TYPE'] === 'processor') {
                new _processor2.default();
            }
        }
    }, {
        key: 'checkMachine',
        value: function checkMachine() {
            if (!_shelljs2.default.which('mysql')) {
                this.logger.error('You need to install MySQL to run this app');
            } else if (!_shelljs2.default.which('redis-cli')) {
                this.logger.error('You need to install Redis Server to run this app');
            } else {
                return true;
            }
            return false;
        }
    }]);

    return Api;
}();

new Api();
//# sourceMappingURL=index.js.map