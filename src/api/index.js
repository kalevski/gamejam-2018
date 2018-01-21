import UserApi from './userApi';
import ArenaApi from './arenaApi';

class Api {
    user = new UserApi();
    arena = new ArenaApi();
}

var instance = null;

Api.getInstance = function() {
    if (instance === null) {
        instance = new Api();
    }
    return instance;
};

export default Api;