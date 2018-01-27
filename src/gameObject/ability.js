import Phaser from '../phaser';
import InfoText from '../gameObject/infoText';

class Ability extends Phaser.Group {
    
    index = null;
    data = null;

    bg = null;
    counter = null;
    counterText = null;
    onClick = new Phaser.Signal();
    onFire = new Phaser.Signal();

    constructor(game, index, data) {
        super(game, game.world, 'ui-ability-' + index);
        this.bg = this.create(0, 0, 'ui-ability-' + index);
        this.bg.inputEnabled = true;
        this.bg.events.onInputDown.add(() => this.onClick.dispatch());
        this.counter = this.create(25, 55, 'ui-ability-counter');
        this.counterText = new InfoText(game, data, 18, true);
        this.counterText.position.set(35, 57);
        this.add(this.counterText);
        this.index = index;
        this.data = data;
    }

    fire() {
        this.onFire.dispatch();
    }
}

export default Ability;