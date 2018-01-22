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

    createCreature(creature, abilityList, abilityData) {
        return this.api.user.createCreature(this.userData.nickname, creature, abilityList, abilityData).then((response) => {
            this.userData.set('creature', response.data.creature);
            this.userData.set('abilityList', response.data.abilityList);
            this.userData.set('abilityData', response.data.abilityData);
            this.userData.set('built', true);
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