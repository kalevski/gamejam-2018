import generateUuid from 'uuid/v4'; 
import WorldDto from '../dto/worldDto';
import WorldDao from '../dao/worldDao';
import worldConfig from '../config/worldConfig';

import joinCommand from './command/joinCommand';


class ArenaWorldService {
  
    worldDao = new WorldDao();

    command = {
        'join': joinCommand
    };

    buildCommand(message) {
        let command = JSON.parse(message);
        let cond1 = typeof command['type'] !== 'undefined';
        let cond2 = typeof command['user'] !== 'undefined';
        let cond3 = typeof command['data'] === 'object';
        
        if (cond1 && cond2 && cond3) {
            return data;
        } else {
            return null;
        }
    }

    exec(worldId, command) {
        return this.worldDao.get(worldId).then((world) => {
            if (typeof this.command[command.type] === 'function') {
                world = this.command[command.type](command.user, command.data, world);
                return this.worldDao.update(world);
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
        world.postiion = {
            creature1: worldData.position.creature1,
            creature2: worldData.position.creature2
        };
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