import Endpoint from '../endpoint';
import WorldService from '../../service/worldService';
import HeartBeat from '../../helper/heartBeat';

class WorldEndpoint extends Endpoint {
    
    worldService = WorldService.getInstance();
    heartbeat = new HeartBeat(1000);

    init() {
        
    }

    websocket(ws, request) {
        
    }
}

export default WorldEndpoint;