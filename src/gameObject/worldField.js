import Phaser from '../phaser';
import Creature from './creature';
import Field from '../helper/field';
import GameObject from './gameObject';

class WorldField extends Phaser.Group {

    game = null;

    exec = {
        placeMine: new Phaser.Signal(),
        placePortal: new Phaser.Signal(),
        placeRock: new Phaser.Signal(),
        ocupateAntena: new Phaser.Signal()
    };

    eventHandler = null;
    actionHelper = null;

    background = null;
    player = {};
    gameObject = {};
    field = null;
    currentPlayer = null;
    oppositePlayer = null;

    onGetDiamond = new Phaser.Signal();
    
    constructor(game, eventHandler, actionHelper) {
        super(game, game.world, 'worldField');
        this.game = game;
        this.background = this.create(0, 0, 'ui-world-' + eventHandler.world['type']);
        this.eventHandler = eventHandler;
        this.actionHelper = actionHelper;
        this.field = new Field();
        this.field.pushDeadFields(this.eventHandler.world.deadFields);
        this.field.createGrid(this);
        this.createObjects();
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

    createObjects() {
        this.eventHandler.world.objects.forEach((object) => {
            if (typeof this.gameObject[object.type] === 'undefined') {
                this.gameObject[object.type] = {};
            }
            this.gameObject[object.type][object.position] = new GameObject(this.game,
                object.type, object.position, this);
        });
    }

    createEvents() {
        this.field.onClick.add((fieldData) => {
            let path = this.field.getPath(this.player[this.currentPlayer].currentField, 
                this.field.getFieldData(fieldData.key));
            this.actionHelper.move(path);
            this.player[this.currentPlayer].move(path);
        }, this);
        
        this.player[this.currentPlayer].onMove.add((position) => {
            if (typeof this.gameObject['diamond'][position.key] !== 'undefined') {
                this.onGetDiamond.dispatch();
                this.actionHelper.removeDiamond(position.key);
                try {
                    this.gameObject['diamond'][position.key].destroy();
                    delete this.gameObject['diamond'][position.key];
                } catch(e) {}
            }
            this.sortObjects();
        }, this);

        this.eventHandler.event.removeDiamond.add((data) => {
            try {
                this.gameObject['diamond'][data.positionKey].destroy();
                delete this.gameObject['diamond'][data.positionKey];
            } catch(e) {}
        }, this);

        this.eventHandler.event.move.add((data) => {
            this.player[this.oppositePlayer].move(data);
        });

        this.exec.ocupateAntena.add(() => {
            console.log('ocupateArena');
        }, this);

        this.exec.placeMine.add(() => {
            console.log('place mine');
        }, this);

        this.exec.placeRock.add(() => {
            console.log('place rock')
        }, this);

        this.exec.placePortal.add(() => {
            console.log('place portal');
        }, this);
    }

    sortObjects() {
        this.game.world.customSort((firstChild, secondChild) => {
            if (firstChild.y > secondChild.y) return 1;
            else if (firstChild.y < secondChild.y) return -1;
            else return 0;
        }, this);
    }
}

export default WorldField;