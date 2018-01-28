'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _urlPattern = require('url-pattern');

var _urlPattern2 = _interopRequireDefault(_urlPattern);

var _endpoint = require('../endpoint');

var _endpoint2 = _interopRequireDefault(_endpoint);

var _webAppRouter = require('../../webAppRouter');

var _webAppRouter2 = _interopRequireDefault(_webAppRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RootEndpoint = function (_Endpoint) {
    _inherits(RootEndpoint, _Endpoint);

    function RootEndpoint() {
        _classCallCheck(this, RootEndpoint);

        return _possibleConstructorReturn(this, (RootEndpoint.__proto__ || Object.getPrototypeOf(RootEndpoint)).apply(this, arguments));
    }

    _createClass(RootEndpoint, [{
        key: 'get',
        value: function get(request, response) {
            var status = 404;
            var indexPath = _path2.default.join(process.env.ROOT, process.env.WEBAPP_INDEX);

            var pattern = new _urlPattern2.default(request.path);

            for (var i = 0; i < _webAppRouter2.default.length; i++) {
                if (pattern.match(_webAppRouter2.default[i].path) !== null) {
                    status = _webAppRouter2.default[i].code;
                    break;
                }
            }

            response.status(status).sendFile(indexPath);
        }
    }]);

    return RootEndpoint;
}(_endpoint2.default);

exports.default = RootEndpoint;
//# sourceMappingURL=rootEndpoint.js.map