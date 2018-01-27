import Phaser from '../phaser';
import Creature from './creature';
import Field from '../helper/field';

class WorldField extends Phaser.Group {

    eventHandler = null;

    background = null;
    player = {};
    field = null;
    currentPlayer = null;
    oppositePlayer = null;
    
    constructor(game, eventHandler) {
        super(game, game.world, 'worldField');
        this.background = this.create(0, 0, 'ui-world-' + eventHandler.world['type']);
        this.eventHandler = eventHandler;
        this.field = new Field(this);
        this.createCharacters();
    }

    createCharacters() {
        this.eventHandler.world.userList.forEach((nickname, index) => {
            if (nickname === this.eventHandler.userData.nickname) {
                this.currentPlayer = nickname;
            } else {
                this.oppositePlayer = nickname;
            }
            let creatureData = this.eventHandler.world.user[nickname].data.creature;
            this.player[nickname] = new Creature(this.game, creatureData, true);
            let key = this.eventHandler.world.user[nickname].game.spawn;
            let fieldData = this.field.getFieldData(key);
            this.player[nickname].goTo(fieldData);
            if (this.eventHandler.world.user[nickname].game.flipped) {
                this.player[nickname].flip();
            }
        });
    }

    move(nickname, destinationField) {
        // if (typeof nickname === 'undefined') {
        //     nickname = this.eventHandler.userData.nickname;
        // }
        // var fieldData = this.player[nickname].getCurrentField();
        // let path = this.field.getPath(fieldData, destinationField);
        // this.player[nickname].move(path);
    }
}

export default WorldField;