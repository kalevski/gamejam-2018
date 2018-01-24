import Endpoint from '../endpoint';
import WorldService from '../../service/worldService';

class WorldEndpoint extends Endpoint {
    
    worldService = WorldService.getInstance();

    websocket(ws, request) {
        ws.on('message', (message) => this.onMessage(message, request.params.worldId));
    }

    onMessage(message, worldId) {
        var command = this.worldService.buildCommand(message);
        if (command !== null) {
            this.worldService.exec(worldId, command).then((world) => {
                if (world !== null) {
                    this.sendStatus(world);
                }
            });
        }
    }

    sendStatus(world) {
        var players = this.helper.getClients('worldId')[world.id];
        players.forEach((player) => {
            player.send({
                type: 'status',
                data: world
            });
        })
    }
}

export default WorldEndpoint;