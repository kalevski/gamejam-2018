import Endpoint from '../endpoint';
import WorldService from '../../service/worldService';

class JoinEndpoint extends Endpoint {

    worldService = WorldService.getInstance();

    init() {
        
    }

    websocket(ws, request) {
        
    }

    broadcast(clients, heartbeat) {
        heartbeat.every(5).add(() => this.createWorld(clients));
    }

    createWorld(clients) {
        if (clients.size < 2) return;
        var array = [];
        var worlds = [];
        clients.forEach((client) => {
            array.push(client);
            if (array.length === 2) {
               var id = this.worldService.createWorld();
               array[0].send(id);
               array[1].send(id); 
               array = [];
            }
        });
    }

}

export default JoinEndpoint;