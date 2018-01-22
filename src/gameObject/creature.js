import Phaser from '../phaser';
import creatureSetting from '../setting/creatureSetting';

class Creature extends Phaser.Group {

    data = null;
    headSprite = null;
    bodyCoreSprite = null;
    bodyDecoratorSprite = null;

    settings = null;

    constructor(game, data, small) {
        super(game, game.world, 'creature');
        
        this.data = data;
        this.settings = creatureSetting[data['head'] + 'x' + data['body']];

        this.bodyCoreSprite = this.create(0, 0, 'creature-body-' + data['body'] + '-core');
        this.bodyCoreSprite.anchor.set(.5);
        this.bodyDecoratorSprite = this.create(0, 0, 'creature-body-' + data['body'] + '-decorator');
        this.bodyDecoratorSprite.anchor.set(.5);
        this.bodyDecoratorSprite.tint = data['color'];
        this.headSprite = this.create(0, 0, 'creature-head-' + data['head']);
        this.headSprite.anchor.set(.5);
    
        if (small) {
            this.bodySprite.scale.set(.5);
            this.headSprite.scale.set(.5);
        }
    }

    destroy() {
        this.headSprite.destroy();
        this.bodyCoreSprite.destroy();
        this.bodyDecoratorSprite.destroy();
        super.destroy();
    }

    getAbilityList() {
        return this.settings['abilityList'];
    }

    getAbilityData(abilityIndex) {
        return this.settings['data'][abilityIndex];
    }
}

export default Creature;