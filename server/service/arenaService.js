class ArenaService {
    
    request(request) {
        return new Promise((resolve, reject) => {
            if (typeof this[request.requestType] === 'undefined') {
                throw "Request type ['" + request.requestType + "'] doesn't exist!";
            } else {
                return this[request.requestType].call(this, request.userId, request.data);
            }
            resolve();
        });
    }

    join(userId, data) {
        return new Promise((resolve, reject) => {

        });
    }

    status(userId, data) {
        return new Promise((resolve, reject) => {

        });
    }

    action(userId, data) {
        return new Promise((resolve, reject) => {

        });
    }
}

var instance = null;
ArenaService.getInstance = function() {
    if (instance === null) {
        instance = new ArenaService();
    }
    return instance;
}

export default ArenaService;