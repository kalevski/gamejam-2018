import Phaser from '../phaser';

class GameObject extends Phaser.Sprite {
    
    constructor(game, type, positionKey, worldField, diamondColor) {
        super(game, 0, 0, 'ui-object-' + type);
        this.anchor.set(.5);
        let position = worldField.field.getFieldData(positionKey);
        this.position.set(position.x, position.y);
        game.world.addChild(this);
        if (type === 'diamond') {
            this.scale.set(.25);
            this.tint = 0xffffff;
        }
        if (type === 'antena') {
            this.anchor.set(.5, 1);
        }
    }

    hide() {
        this.alpha = 0;
    }

    show() {
        this.alpha = 1;
    }
}

export default GameObject;