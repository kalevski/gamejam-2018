import Api from '../../api';
import UserData from '../../helper/userData';

class UserService {
    api = Api.getInstance();
    userData = UserData.getInstance();

    fetch(nickname) {
        return this.api.user.fetch(nickname).then((response) => {
            this.userData.setAll(response.data);
            return null;
        });
    }
}

var instance = null;
UserService.getInstance = function() {
    if (instance === null) {
        instance = new UserService();
    }
    return instance;
}

export default UserService;