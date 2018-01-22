import Endpoint from '../endpoint';
import UserService from '../../service/userService';
import Logger from '../../helper/logger';

class UserCreatureEndpoint extends Endpoint {
    post(request, response) {
        var logger = Logger.getInstance();
        var userService = UserService.getInstance();
        userService.createCreature(request.params.nickname, request.body).then((user) => {
            response.json(user);
        }).catch((err) => {
            logger.error(err);
        });
        
    }// save data
}

export default UserCreatureEndpoint;