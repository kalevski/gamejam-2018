import Endpoint from '../endpoint';
import HeartBeat from '../../helper/heartBeat';
import WorldService from '../../service/worldService';

class JoinEndpoint extends Endpoint {

    worldService = WorldService.getInstance();
    queue = [];

    init() {
        var heartbeat = new HeartBeat(1000);
        heartbeat.every(3).add(() => {
            var clients = this.helper.getClients();
        });
    }

    websocket(ws, request) {
        
    }


}

export default JoinEndpoint;