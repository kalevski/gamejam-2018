'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _worldConfig = require('../../config/worldConfig');

var _worldConfig2 = _interopRequireDefault(_worldConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (user, data, world) {

    var out = {
        status: {
            send: false,
            toAll: true
        },
        world: world
    };

    if (out.world.connected != 2) {
        out.world.connected += 1;
        out.world.userList.push(user);
        out.world.user[user] = {
            data: data,
            game: {
                flipped: _worldConfig2.default[out.world.type].spawn[out.world.connected - 1].flipped,
                spawn: _worldConfig2.default[out.world.type].spawn[out.world.connected - 1].key
            },
            actions: []
        };

        if (out.world.connected === 1) {
            out.world.onMove = 0;
        }

        if (out.world.connected === 2) {
            out.world.user[out.world.userList[0]].actions.push({
                type: 'startGame',
                data: out.world.user[out.world.userList[1]].data.creature
            });
            out.world.user[out.world.userList[1]].actions.push({
                type: 'startGame',
                data: out.world.user[out.world.userList[0]].data.creature
            });

            out.world.objects = _worldConfig2.default[out.world.type].objects;
            out.world.antena1Fields = _worldConfig2.default[out.world.type].antena1Fields;
            out.world.antena2Fields = _worldConfig2.default[out.world.type].antena2Fields;
            out.world.antena1 = _worldConfig2.default[out.world.type].antena1;
            out.world.antena2 = _worldConfig2.default[out.world.type].antena2;

            out.world.ready = true;
            out.status.send = true;
        }
    }

    return out;
};
//# sourceMappingURL=joinCommand.js.map