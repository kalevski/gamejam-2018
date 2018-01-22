import Phaser from '../phaser';
import abilitySetting from '../setting/abilitySetting';

class Ability extends Phaser.Sprite {
    
    index = null;
    data = null;
    settings = null;

    constructor(game, index, data) {
        super(game, 0, 0, 'ui-ability-' + index);
        game.world.addChild(this);
        this.index = index;
        this.data = data;
        this.settings = abilitySetting[index];
    }

    getDescription() {
        return this.settings['description'];
    }

    fire(grid) {
        // call ability helper and after that if is valid return data else return message
    }
}

export default Ability;