import generateUuid from 'uuid/v4'; 
import WorldDto from '../dto/worldDto';
import WorldDao from '../dao/worldDao';
import worldConfig from '../config/worldConfig';

import joinCommand from './command/joinCommand';
import removeActionsCommand from './command/removeActionsCommand';
import moveCommand from './command/moveCommand';
import pushActionCommand from './command/pushActionCommand';

class ArenaWorldService {
  
    worldDao = new WorldDao();

    command = {
        'join': joinCommand,
        'removeActions': removeActionsCommand,
        'move': moveCommand,
        'pushAction': pushActionCommand
    };

    buildCommand(message) {
        let object = JSON.parse(message);
        let cond1 = typeof object['type'] !== 'undefined';
        let cond2 = typeof object['user'] !== 'undefined';
        let cond3 = typeof object['data'] === 'object';
        
        if (cond1 && cond2 && cond3) {
            return object;
        } else {
            return null;
        }
    }

    exec(worldId, command, sendStatus) {
        return this.worldDao.get(worldId).then((world) => {
            if (typeof this.command[command.type] === 'function') {
                let out = this.command[command.type](command.user, command.data, world);
                this.worldDao.update(out.world).then((world) => {
                    if (out.status.send) {
                        sendStatus(world, command.user, out.status.toAll);
                    }
                });
            } else {
                return null;
            }
        });
    }

    getWorld(worldId) {
        return this.worldDao.get(worldId);
    }

    createWorld() {
        var world = new WorldDto();
        world.id = generateUuid();
        this.generate(world);
        return world.id;
    }   

    generate(world) {
        // make choise about world
        var worldData = worldConfig[worldConfig.worldList[0]];
        world.type = worldConfig.worldList[0];
        world.turnTime = worldConfig.turnTime;
        world.description = worldData.description;
        world.deadFields = worldData.deadFields;
        this.worldDao.create(world);
    }
}

var instance = null;
ArenaWorldService.getInstance = function() {
    if (instance === null) {
        instance = new ArenaWorldService();
    }
    return instance;
}

export default ArenaWorldService;