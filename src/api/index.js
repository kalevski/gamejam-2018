import UserApi from './userApi';
import JoinSocket from './joinSocket';

class Api {
    
    socket = {
        JoinSocket: JoinSocket
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