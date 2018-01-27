import Phaser from '../phaser';
import Creature from './creature';
import Field from '../helper/field';

class WorldField extends Phaser.Group {

    eventHandler = null;
    actionHelper = null;

    background = null;
    player = {};
    field = null;
    currentPlayer = null;
    oppositePlayer = null;
    
    constructor(game, eventHandler, actionHelper) {
        super(game, game.world, 'worldField');
        this.background = this.create(0, 0, 'ui-world-' + eventHandler.world['type']);
        this.eventHandler = eventHandler;
        this.actionHelper = actionHelper;
        this.field = new Field(this);
        this.createCharacters();
        this.createEvents();
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

    createEvents() {
        this.field.onClick.add((fieldData) => {
            let path = this.field.getPath(this.player[this.currentPlayer].currentField, 
                this.field.getFieldData(fieldData.key));
            console.log (fieldData);
            this.actionHelper.move(path);
            this.player[this.currentPlayer].move(path);
        });
        this.eventHandler.event.move.add((data) => {
            this.player[this.oppositePlayer].move(data);
        });
    }
}

export default WorldField;