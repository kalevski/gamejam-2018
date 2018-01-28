"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WorldDto = function WorldDto() {
    _classCallCheck(this, WorldDto);

    this.id = null;
    this.connected = 0;
    this.onMove = null;
    this.ready = false;
    this.type = null;
    this.turnTime = null;
    this.description = null;
    this.winner = null;
    this.userList = [];
    this.user = {};
    this.deadFields = [];
    this.objects = [];
};

exports.default = WorldDto;
//# sourceMappingURL=worldDto.js.map