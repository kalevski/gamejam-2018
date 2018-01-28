"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = require("../helper/logger");

var _logger2 = _interopRequireDefault(_logger);

var _userDao = require("../dao/userDao");

var _userDao2 = _interopRequireDefault(_userDao);

var _userDto = require("../dto/userDto");

var _userDto2 = _interopRequireDefault(_userDto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserService = function () {
    function UserService() {
        _classCallCheck(this, UserService);

        this.logger = _logger2.default.getInstance();
        this.userDao = new _userDao2.default();
    }

    _createClass(UserService, [{
        key: "get",
        value: function get(nickname) {
            var _this = this;

            return this.userDao.get(nickname).then(function (user) {
                if (user === null) {
                    user = new _userDto2.default();
                    user.nickname = nickname;
                    return _this.userDao.create(user);
                } else return user;
            });
        }
    }, {
        key: "createCreature",
        value: function createCreature(nickname, data) {
            var _this2 = this;

            return this.userDao.get(nickname).then(function (user) {
                if (user !== null) {
                    user.creature = data.creature;
                    user.abilityList = data.abilityList;
                    user.abilityData = data.abilityData;
                    user.built = true;
                    return _this2.userDao.update(user);
                }
            });
        }
    }]);

    return UserService;
}();

var instance = null;
UserService.getInstance = function () {
    if (instance === null) {
        instance = new UserService();
    }
    return instance;
};

exports.default = UserService;
//# sourceMappingURL=userService.js.map