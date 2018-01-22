import Logger from "../helper/logger";
import UserDao from "../dao/userDao";
import UserDto from '../dto/userDto';

class UserService {
    
    logger = Logger.getInstance();
    userDao = new UserDao();

    get(nickname) {
        return this.userDao.get(nickname).then((user) => {
            if (user === null) {
                user = new UserDto();
                user.nickname = nickname;
                return this.userDao.create(user);
            }
            else return user;
        });
    }
    
    createCreature(nickname, data) {
        return this.userDao.get(nickname).then((user) => {
            if (user !== null) {
                user.creature = data.creature;
                user.abilityList = data.abilityList;
                user.abilityData = data.abilityData;
                user.built = true;
                return this.userDao.update(user);
            }
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