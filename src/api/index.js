import UserApi from './userApi';
import JoinSocket from './joinSocket';
import WorldSocket from './worldSocket';

class Api {
    
    socket = {
        JoinSocket: JoinSocket,
        WorldSocket: WorldSocket
    }
    user = new UserApi();

}

var instance = null;

Api.getInstance = function() {
    if (instance === null) {
        instance = new Api();
    }
    return instance;
};

export default Api;