import Phaser from '../phaser';
import Api from '../api';
import UserData from '../helper/userData';
import EventHandler from '../helper/eventHandler';
import WaitingScreen from '../gameObject/screen/waitingScreen';
import WorldField from '../gameObject/worldField';
import ActionBar from '../gameObject/actionBar';

class WorldState extends Phaser.State {
    
    api = Api.getInstance();
    userData = UserData.getInstance();
    socket = null;
    eventHandler = null;

    waitingScreen = null;
    worldField = null;
    actionBar = null;

    init() {
        this.socket = new this.api.socket.WorldSocket(this.game.global.worldId,
            this.userData.nickname);
        this.eventHandler = new EventHandler(this.socket, this.userData);
        this.waitingScreen = new WaitingScreen(this.game, this.userData.creature,
            this.eventHandler);
        this.waitingScreen.onReady.addOnce(this.createGame, this);
        this.socket.event.open.addOnce(() => {
            this.socket.join(this.userData);
        });
        this.socket.event.close.addOnce(() => {
            this.state.start('lobby');
        });
    }

    createGame() {
        this.waitingScreen.destroy();
        this.worldField = new WorldField(this.game, this.eventHandler);
        this.actionBar = new ActionBar(this.game, this.worldField);
    }

    shutdown() {
        
    }
}
  
export default WorldState;
  