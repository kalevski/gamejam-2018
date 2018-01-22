import generateUuid from 'uuid/v4'; 
import WorldDto from '../dto/worldDto';

class ArenaWorldService {
    
    createWorld() {
        var world = new WorldDto();
        world.id = generateUuid();
        this.generate(world);
        return world.id;
    }   

    generate(world) {

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