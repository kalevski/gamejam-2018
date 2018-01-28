'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = require('../helper/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Endpoint = function () {
    function Endpoint(router, path) {
        var _this = this;

        _classCallCheck(this, Endpoint);

        this.logger = _logger2.default.getInstance();

        this.router = router;
        this.logger.info('[' + path + '] endpoint invoked!');
        router.app.get(path, this.get);
        router.app.post(path, this.post);
        router.app.put(path, this.put);
        router.app.delete(path, this.delete);
        if (typeof this.websocket === 'function') {
            this.logger.debug('[' + path + '] websocket invoked!');
            router.app.ws(path, function (ws, router) {
                _this.websocket(ws, router);
            });
        }

        this.helper = {
            getClients: function getClients(param) {
                return _this._getClients(router.getWss(path).clients, path, param);
            }
        };

        if (typeof this.init === 'function') {
            this.init.call(this);
        }
    }

    _createClass(Endpoint, [{
        key: 'get',
        value: function get(request, response) {
            response.status(405).send();
        }
    }, {
        key: 'post',
        value: function post(request, response) {
            response.status(405).send();
        }
    }, {
        key: 'put',
        value: function put(request, response) {
            response.status(405).send();
        }
    }, {
        key: 'delete',
        value: function _delete(request, response) {
            response.status(405).send();
        }
    }, {
        key: '_getClients',
        value: function _getClients(allClients, path) {
            var param = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            var out = [];
            var clients = Array.from(allClients);
            for (var i = 0; i < clients.length; i++) {
                var clientPath = clients[i].upgradeReq.route.path;
                clientPath = clientPath.substring(0, clientPath.length - 11);
                if (clientPath === path) {
                    out.push(clients[i]);
                }
            }
            if (param === null) {
                return out;
            } else {
                return this._getGroups(out, param);
            }
        }
    }, {
        key: '_getGroups',
        value: function _getGroups(clients, param) {
            var out = {
                list: [],
                map: {}
            };
            for (var i = 0; i < clients.length; i++) {
                if (typeof clients[i].upgradeReq.params[param] === 'undefined') {
                    return clients;
                }
                if (typeof out.map[clients[i].upgradeReq.params[param]] === 'undefined') {
                    out.map[clients[i].upgradeReq.params[param]] = [];
                    out.list.push(clients[i].upgradeReq.params[param]);
                }
                out.map[clients[i].upgradeReq.params[param]].push(clients[i]);
            }
            return out;
        }
    }]);

    return Endpoint;
}();

exports.default = Endpoint;
//# sourceMappingURL=endpoint.js.map