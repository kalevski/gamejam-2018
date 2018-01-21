import fetch from './fetch';

class UserApi {
    fetch(username) {
        return fetch('get', `/api/user/${username}`);
    }
}

export default UserApi;