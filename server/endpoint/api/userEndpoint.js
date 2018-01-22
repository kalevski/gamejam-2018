import Endpoint from '../endpoint';
import UserService from '../../service/userService';

class UserEndpoint extends Endpoint {
    
    get(request, response) {
        var userService = UserService.getInstance();
        userService.get(request.params.nickname).then((data) => {
            response.json(data);
        });
    }
}

export default UserEndpoint;