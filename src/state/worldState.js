import Phaser from '../phaser';
import Api from '../api';

class WorldState extends Phaser.State {
    
    api = Api.getInstance();
    socket = null;
    world = null;

    init() {
        this.socket = new this.api.socket.WorldSocket();
        this.socket.onStatus.add(this.onStatus);
    }

    createWaitingScreen() {

    }

    createGameScreen() {

    }

    onStatus(world) {
        this.world = world;
    }

    shutdown() {
        
    }
}
  
export default WorldState;
  