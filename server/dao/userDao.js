import Storage from '../adapter/storage';

class UserDao {
    
    storage = Storage.getInstance();

    get(nickname) {
        return new Promise((resolve, reject) => {
            this.storage.get('user:' + nickname, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(reply));
                }
            });
        });
    }
    
    create(user) {
        return new Promise((resolve, reject) => {
            this.storage.set('user:' + user.nickname, JSON.stringify(user), (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    }

    update(user) {
        return new Promise((resolve, reject) => {
            this.storage.set('user:' + user.nickname, JSON.stringify(user), (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    }

    remove(nickname) {
        return new Promise((resolve, reject) => {
            this.storage.del('user:' + nickname, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

export default UserDao;