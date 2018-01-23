import generateUuid from 'uuid/v4'; 
import WorldDto from '../dto/worldDto';
import WorldDao from '../dao/worldDao';
import worldConfig from '../config/worldConfig';

class ArenaWorldService {
  
    worldDao = new WorldDao();

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
        world.deadFields = worldData.deadFields;
        world.postiion = {
            creature1: worldData.spawnPostiion.creature1,
            creature2: worldData.spawnPostiion.creature2
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