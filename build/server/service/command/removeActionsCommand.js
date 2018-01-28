"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (user, data, world) {
    var out = {
        status: {
            send: false,
            toAll: true
        },
        world: world
    };

    out.world.user[user].actions = [];

    return out;
};
//# sourceMappingURL=removeActionsCommand.js.map