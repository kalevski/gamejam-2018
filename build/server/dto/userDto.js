"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserDto = function UserDto() {
    _classCallCheck(this, UserDto);

    this.nickname = null;
    this.built = false;
    this.creature = {
        head: null,
        body: null,
        color: null
    };
    this.abilityList = [];
    this.abilityData = null;
};

exports.default = UserDto;
//# sourceMappingURL=userDto.js.map