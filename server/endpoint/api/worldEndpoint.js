import Endpoint from '../endpoint';
import WorldService from '../../service/worldService';

class WorldEndpoint extends Endpoint {
    
    worldService = WorldService.getInstance();

    websocket(ws, request) {
        let worldId = request.params.worldId;
        let nickname = request.query.nickname;
        ws.on('message', (message) => this.onMessage(message, worldId, nickname));
    }

    onMessage(message, worldId, nickname) {
        var command = this.worldService.buildCommand(message);
        if (command !== null) {
            this.logger.info('World[' + worldId + ']: executed: [' + command.type
                + '] by ' + command.user);
            this.worldService.exec(worldId, command, this.sendStatus);
        }
    }

    sendStatus = (world, nickname, toAll = false) => {
        var players = this.helper.getClients('worldId').map[world.id];
        players.forEach((player) => {
            if (player.upgradeReq.query.nickname !== nickname || toAll) {
                player.send(JSON.stringify({
                    type: 'status',
                    data: world
                }));
            }
        })
    }
}

export default WorldEndpoint;