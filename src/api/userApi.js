import fetch from './fetch';

class UserApi {
    fetch(nickname) {
        return fetch('get', `/api/user/${nickname}`);
    }

    createCreature(nickname, creature, abilityList, abilityData) {
        return fetch('post', `/api/user/${nickname}/creature`, {
            creature, abilityList, abilityData
        });
    }
}

export default UserApi;