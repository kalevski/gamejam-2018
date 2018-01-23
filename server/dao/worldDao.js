import Storage from '../adapter/storage';

class WorldDao {
   
    storage = Storage.getInstance();

    get(worldId) {
        return new Promise((resolve, reject) => {
            this.storage.get('world:' + worldId, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(reply));
                }
            });
        });
    }
    
    create(world) {
        return new Promise((resolve, reject) => {
            this.storage.set('world:' + world.id, JSON.stringify(world), (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(world);
                }
            });
        });
    }

    update(world) {
        return new Promise((resolve, reject) => {
            this.storage.set('world:' + world.id, JSON.stringify(world), (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(world);
                }
            });
        });
    }

    remove(worldId) {
        return new Promise((resolve, reject) => {
            this.storage.del('world:' + worldId, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

export default WorldDao;