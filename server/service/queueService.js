import Logger from "../helper/logger";

class ArenaQueueService {
    
    logger = Logger.getInstance();
    
    getWorld(userId) {
        // register in queue
        // get world when is created!
    }

    // this is called every 5 seconds
    matchPlayers() {
               
        // get queue if 2 players create world and mark them as in game
    }
}

var instance = null;
ArenaQueueService.getInstance = function() {
    if (instance === null) {
        instance = new ArenaQueueService();
    }
    return instance;
}

export default ArenaQueueService;