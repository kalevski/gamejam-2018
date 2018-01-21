import Storage from '../adapter/storage';

class QueueDao {

    storage = Storage.getInstance();

    queueKey = 'queue';

    push(userId) {
        return new Promise((resolve, reject) => {
            this.storage.sadd([this.queueKey, userId], (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    check(userId) {
        return new Promise((resolve, reject) => {
            this.storage.smembers(this.queueKey, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(' queueDao::check - implement this', reply);
                    resolve();
                }
            });
        });
    }

    remove(userId) {
        return new Promise((resolve, reject) => {
            this.storage.srem([this.queueKey, userId], (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    if (reply === 1) {
                        resolve();
                    } else {
                        reject("element doesn't exist");
                    }
                }
            });
        });
    }
}

export default QueueDao;