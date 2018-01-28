import redis from 'redis';
import Logger from '../helper/logger';

class Storage {
    
    client = null;
    logger = Logger.getInstance();

    constructor() {
        this.client = redis.createClient(process.env.REDIS_URL);
        this.client.on('error', this._onError);
    }

    _onError = (err) => {
        this.logger.error('Caching System: ' + err);
    }
}

var instance = null;
Storage.getInstance = function() {
    if (instance === null) {
        instance = new Storage();
    }
    return instance.client;
}

export default Storage;