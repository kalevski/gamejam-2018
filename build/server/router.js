'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressWs = require('express-ws');

var _expressWs2 = _interopRequireDefault(_expressWs);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('./helper/logger');

var _logger2 = _interopRequireDefault(_logger);

var _rootEndpoint = require('./endpoint/app/rootEndpoint');

var _rootEndpoint2 = _interopRequireDefault(_rootEndpoint);

var _userEndpoint = require('./endpoint/api/userEndpoint');

var _userEndpoint2 = _interopRequireDefault(_userEndpoint);

var _userCreatureEndpoint = require('./endpoint/api/userCreatureEndpoint');

var _userCreatureEndpoint2 = _interopRequireDefault(_userCreatureEndpoint);

var _joinEndpoint = require('./endpoint/api/joinEndpoint');

var _joinEndpoint2 = _interopRequireDefault(_joinEndpoint);

var _worldEndpoint = require('./endpoint/api/worldEndpoint');

var _worldEndpoint2 = _interopRequireDefault(_worldEndpoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = function () {
    function Router() {
        _classCallCheck(this, Router);

        this.logger = _logger2.default.getInstance();
        this.expressRouter = (0, _expressWs2.default)((0, _express2.default)());

        this.expressRouter.app.disable('x-powered-by');
        this.expressRouter.app.use((0, _cors2.default)());
        this.expressRouter.app.use(_bodyParser2.default.json());
        this.expressRouter.app.use(_bodyParser2.default.urlencoded({ extended: true }));
        this.init();
        this.run();
    }

    _createClass(Router, [{
        key: 'init',
        value: function init() {
            this.static('/static', process.env.WEBAPP_STATIC);
            this.static('/assets', process.env.WEBAPP_ASSETS);
            new _userEndpoint2.default(this.expressRouter, '/api/user/:nickname');
            new _userCreatureEndpoint2.default(this.expressRouter, '/api/user/:nickname/creature');
            new _joinEndpoint2.default(this.expressRouter, '/api/join');
            new _worldEndpoint2.default(this.expressRouter, '/api/world/:worldId');
            new _rootEndpoint2.default(this.expressRouter, '/*');
        }
    }, {
        key: 'run',
        value: function run() {
            this.logger.info('Server listen on port', process.env.PORT);
            this.expressRouter.app.listen(process.env.PORT);
        }
    }, {
        key: 'static',
        value: function _static(route, dir) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            this.expressRouter.app.use(route, _express2.default.static(_path2.default.join(__dirname, dir), options));
        }
    }]);

    return Router;
}();

exports.default = Router;
//# sourceMappingURL=router.js.map