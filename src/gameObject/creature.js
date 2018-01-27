import Phaser from '../phaser';
import creatureConfig from '../config/creatureConfig';

class Creature extends Phaser.Group {

    game = null;
    data = null;
    headSprite = null;
    bodyCoreSprite = null;
    bodyDecoratorSprite = null;

    config = null;

    currentField = null;
    currentPath = null;
    movement = null;
    flipped = false;

    constructor(game, data, small) {
        super(game, game.world, 'creature');
        this.game = game;
        this.data = data;
        this.config = creatureConfig[data['head'] + 'x' + data['body']];

        this.bodyCoreSprite = this.create(0, 0, 'creature-body-' + data['body'] + '-core');
        this.bodyCoreSprite.anchor.set(.5);
        this.bodyDecoratorSprite = this.create(0, 0, 'creature-body-' + data['body'] + '-decorator');
        this.bodyDecoratorSprite.anchor.set(.5);
        this.bodyDecoratorSprite.tint = data['color'];
        this.headSprite = this.create(0, 0, 'creature-head-' + data['head']);
        this.headSprite.anchor.set(.5);
    
        if (small) {
            this.bodyCoreSprite.scale.set(.5);
            this.bodyDecoratorSprite.scale.set(.5);
            this.headSprite.scale.set(.45);
        }
    }

    destroy() {
        this.headSprite.destroy();
        this.bodyCoreSprite.destroy();
        this.bodyDecoratorSprite.destroy();
        super.destroy();
    }

    getAbilityList() {
        return this.config['abilityList'];
    }

    getAbilityData(abilityIndex) {
        return this.config['data'][abilityIndex];
    }

    getCurrentField() {
        return this.currentField;
    }

    goTo(fieldData) {
        if (this.movement !== null) {
            this.movement.stop();
        }
        this.currentField = fieldData;
        this.currentPath = [];
        this.position.set(fieldData.x, fieldData.y - 55);
    }

    flip() {
        this.flipped = !this.flipped;
        this.scale.x *= -1;
    }

    move(path) {
        if (path[0].x > path[path.length - 1].x && !this.flipped) {
            this.flip();
        } else if (path[0].x < path[path.length - 1].x && this.flipped) {
            this.flip();
        }
        if (this.movement !== null) {
            this.movement.stop();
        }
        this.currentPath = [];
        this.currentPath = path;
        this.chainMovement();
    }

    chainMovement() {
        let fieldData = this.currentPath.shift();
        if (typeof fieldData === 'undefined') return;
        this.movement = this.game.add.tween(this).to({
            x: fieldData.x,
            y: fieldData.y - 55
        }, 200, Phaser.Easing.Linear.InOut, true);
        this.currentField = fieldData;
        this.movement.onComplete.addOnce(() => this.chainMovement(), this);
    }
}

export default Creature;