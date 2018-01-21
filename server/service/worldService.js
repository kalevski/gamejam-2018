class ArenaWorldService {
    
    createWorld() {
        // create world and create keys for players
    }

    updateWorld() {

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