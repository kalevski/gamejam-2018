import Endpoint from '../endpoint';

class UserEndpoint extends Endpoint {
    get(request, response) {
        response.json({
            userId: 'example',
            nickname: request.params.nickname,
            head: 'example2',
            body: 'example2',
            color: 0xffffff
        });
    }

    put(request, response) {
        
    }
}

export default UserEndpoint;