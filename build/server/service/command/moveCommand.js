'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (user, data, world) {

    var out = {
        status: {
            send: true,
            toAll: false
        },
        world: world
    };

    var userList = world.userList;
    var opponent = null;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = userList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var u = _step.value;

            if (world.user[u].data.nickname !== user) {
                opponent = world.user[u].data.nickname;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    out.world.user[opponent].actions.push({
        type: 'move',
        data: data.path
    });

    return out;
};
//# sourceMappingURL=moveCommand.js.map