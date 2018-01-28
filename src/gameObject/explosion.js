import Phaser from '../phaser';

class Explosion extends Phaser.Sprite {
    constructor(game, fieldData) {
        super(game, fieldData.x, fieldData.y, 'explosion');
        this.animations.add('explode');
        this.anchor.set(.5);
        this.animations.play('explode', 24, false, true);
        this.game.world.addChild(this);
        debugger;
    }
}
export default Explosion;