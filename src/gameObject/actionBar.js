import Phaser from '../phaser';

class ActionBar extends Phaser.Group {
    
    background = null;
    
    constructor(game, worldField, actionHandler) {
        super(game, game.world, 'actionBar');
        this.background = this.create(0, 0, 'ui-action-bar-bg');
        this.position.set(390, 590);
    }
}

export default ActionBar;