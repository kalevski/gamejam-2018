'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _endpoint = require('../endpoint');

var _endpoint2 = _interopRequireDefault(_endpoint);

var _userService = require('../../service/userService');

var _userService2 = _interopRequireDefault(_userService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserEndpoint = function (_Endpoint) {
    _inherits(UserEndpoint, _Endpoint);

    function UserEndpoint() {
        _classCallCheck(this, UserEndpoint);

        return _possibleConstructorReturn(this, (UserEndpoint.__proto__ || Object.getPrototypeOf(UserEndpoint)).apply(this, arguments));
    }

    _createClass(UserEndpoint, [{
        key: 'get',
        value: function get(request, response) {
            var userService = _userService2.default.getInstance();
            userService.get(request.params.nickname).then(function (data) {
                response.json(data);
            });
        }
    }]);

    return UserEndpoint;
}(_endpoint2.default);

exports.default = UserEndpoint;
//# sourceMappingURL=userEndpoint.js.map