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
            this.createGame(clients);
        });
    }

    websocket(ws, request) {

    }

    createGame(clients) {
        if (clients.length < 2) return;
        var players = [];
        clients.forEach((client) => {
            players.push(client);
            if (players.length === 2) {
                var worldId = this.worldService.createWorld();
                players.forEach((player) => {
                    player.send(worldId);
                    player.terminate();
                });
            }
        });    
    }
}

export default JoinEndpoint;