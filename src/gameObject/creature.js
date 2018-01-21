import Phaser from '../phaser';

class Creature extends Phaser.Group {

    data = null;
    headSprite = null;
    bodySprite = null;

    constructor(game, data, small) {
        super(game, game.world, 'creature-' + data['id']);
        this.data = data;
        this.bodySprite = this.create(0, 0, 'creature-body-' + data['body']);
        this.bodySprite.anchor.set(.5);
        this.bodySprite.tint = data['color'];
        this.headSprite = this.create(0, 0, 'creature-head-' + data['head']);
        this.headSprite.anchor.set(.5);
    
        if (small) {
            this.bodySprite.scale.set(.5);
            this.headSprite.scale.set(.5);
        }
    }

    destroy() {
        this.headSprite.destroy();
        this.bodySprite.destroy();
        super.destroy();
    }
}

export default Creature;