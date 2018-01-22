import Phaser from '../phaser';
import abilityConfig from '../config/abilityConfig';

class Ability extends Phaser.Sprite {
    
    index = null;
    data = null;
    config = null;

    constructor(game, index, data) {
        super(game, 0, 0, 'ui-ability-' + index);
        game.world.addChild(this);
        this.index = index;
        this.data = data;
        this.config = abilityConfig[index];
    }

    getDescription() {
        return this.config['description'];
    }

    fire(grid) {
        // call ability helper and after that if is valid return data else return message
    }
}

export default Ability;