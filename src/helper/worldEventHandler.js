import Phaser from '../phaser';

class WorldEventHandler {
    
    worldSocket = null;
    userData = null;
    world = null;
    event = {
        startGame: new Phaser.Signal()
    }
    
    constructor(worldSocket, userData) {
        this.worldSocket = worldSocket;
        this.userData = userData;
        this.worldSocket.onStatus.add(this.onStatus, this);
    }

    onStatus(world) {
        this.world = world;
        let actions = world.user[this.userData.nickname].actions;
        actions.forEach((action) => {
            if (typeof this.event[action.type] !== 'undefined') {
                this.event[action.type].dispatch(action.data);
            } else {
                console.log('Implement WorldEventHandler ' + action.type);
            }
        });
        this.worldSocket.removeActions(this.userData.nickname);
    }
}

export default WorldEventHandler;