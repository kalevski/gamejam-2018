import Phaser from '../phaser';
import Creature from './creature';

class WorldField extends Phaser.Group {
    
    background = null;
    grid = null;
    player = {};
    
    constructor(game, eventHandler) {
        super(game, game.world, 'worldField');
        this.background = this.create(0, 0, 'ui-world-' + eventHandler.world['type']);
        this.grid = this.create(0, 100, 'ui-arena-grid');
        
        eventHandler.world.userList.forEach((nickname, index) => {
            let creatureData = eventHandler.world.user[nickname].data.creature;
            this.player[nickname] = new Creature(game, creatureData, true);
            this.player[nickname].position.set(200 + index * 500, 300);
        });
    }
}

export default WorldField;