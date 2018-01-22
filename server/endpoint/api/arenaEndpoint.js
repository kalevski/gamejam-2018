import Endpoint from '../endpoint';

class ArenaEndpoint extends Endpoint {
    
    websocket(ws, request) {
        ws.on('message', (message) => this.onMessage(message, ws));
    }

    onMessage(message, ws) {
        // var request = this.parseMessage(message);
        // if (!request) {
        //     this.logger.error('wrong data');
        //     return;
        // }
        // try {
        //     this.arenaService.request(request).then((data) => {
        //         ws.send(JSON.stringify(data));
        //     }).catch((error) => {
        //         this.logger.error(error);
        //     });
        // } catch (error) {
        //     this.logger.error(error);
        // }
    }

    parseMessage(message) {
        
        var request = {};

        try {
            request = JSON.parse(message);
        } catch (error) {
            request = null;
        }
        
        if (typeof request['userId'] === 'undefined') {
            request = null;
        }

        if (typeof request['requestType'] === 'undefined') {
            request = null;
        }

        if (typeof request['data'] === 'undefined') {
            request = null;
        }
        return request;
    }
}

export default ArenaEndpoint;