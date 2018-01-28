import Phaser from '../phaser';
import Creature from './creature';
import Field from '../helper/field';
import GameObject from './gameObject';
import GameOverScreen from './screen/gameOverScreen';
import Explosion from '../gameObject/explosion';

class WorldField extends Phaser.Group {

    game = null;

    exec = {
        placeMine: new Phaser.Signal(),
        placePortal: new Phaser.Signal(),
        placeRock: new Phaser.Signal(),
        ocupateAntena: new Phaser.Signal(),
        endGame: new Phaser.Signal()
    };

    gameOverScreen = null;
    closeSocket = new Phaser.Signal();

    eventHandler = null;
    actionHelper = null;

    background = null;
    player = {};
    gameObject = {};
    gameAnimations = {};
    mineFields = {};
    field = null;
    currentPlayer = null;
    oppositePlayer = null;

    onGetDiamond = new Phaser.Signal();
    onLooseHeart = new Phaser.Signal();
    onOcupateAntenas = new Phaser.Signal();
    
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

        this.onOcupateAntenas.add(() => {
            this.gameOver(true);
            this.actionHelper.gameOver(false);
        }, this);
        this.exec.endGame.add(() => {
            this.gameOver(false);
            this.actionHelper.gameOver(true);
        }, this);
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
        this.gameObject['mine'] = {};
        this.gameObject['rock'] = {};

        this.eventHandler.world.objects.forEach((object) => {
            if (typeof this.gameObject[object.type] === 'undefined') {
                this.gameObject[object.type] = {};
            }
            this.gameObject[object.type][object.position] = new GameObject(this.game,
                object.type, object.position, this);
        });
        window.myArray = [];
    }

    movePlayer(fieldData) {
        let path = this.field.getPath(this.player[this.currentPlayer].currentField, 
            this.field.getFieldData(fieldData.key));
        this.actionHelper.move(path);
        window.myArray.push(fieldData.key);
        this.player[this.currentPlayer].move(path);
    }

    createEvents() {
        this.field.onClick.add((fieldData) => {
            this.movePlayer(fieldData);
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
            if (typeof this.mineFields[position.key] !== 'undefined') {
                let mine = this.mineFields[position.key];
                if (mine.owner !== this.currentPlayer) {
                    this.gameAnimations['explosion'] = new Explosion(this.game,
                        mine.position);
                    mine.destroy();
                    delete this.gameObject['mine'][mine.positionKey];
                    this.actionHelper.mineExplode(mine.positionKey);
                    this.onLooseHeart.dispatch();
                }
            }
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
            let playerKey = this.player[this.currentPlayer].currentField.key;
            if (this.eventHandler.world.antena1Fields.indexOf(playerKey) !== -1) {
                
                this.gameObject['antena'][this.eventHandler.world.antena1].tint =
                    this.eventHandler.userData.creature.color;
                this.actionHelper.ocupateAntena(this.eventHandler.world.antena1,
                    this.eventHandler.userData.creature.color);
            }

            if (this.eventHandler.world.antena2Fields.indexOf(playerKey) !== -1) {
                
                this.gameObject['antena'][this.eventHandler.world.antena2].tint =
                    this.eventHandler.userData.creature.color;
                this.actionHelper.ocupateAntena(this.eventHandler.world.antena2,
                    this.eventHandler.userData.creature.color);
            }

            let antena1Color = this.gameObject['antena'][this.eventHandler.world.antena1].tint;
            let antena2Color = this.gameObject['antena'][this.eventHandler.world.antena2].tint;
            if (antena1Color === antena2Color) {
                this.onOcupateAntenas.dispatch();
            }
        }, this);

        this.eventHandler.event.ocupateAntena.add((data) => {
            this.gameObject['antena'][data.positionKey].tint = data.color;
        }, this);

        this.exec.placeMine.add(() => {
            let p = this.player[this.currentPlayer];
            this.gameObject['mine'][p.currentField.key] = new GameObject(this.game, 'mine',
            p.currentField.key, this);
            this.gameObject['mine'][p.currentField.key].owner = this.currentPlayer;
            let mineFields = [
                this.field.getNearField(p.currentField.key, 1, 0),
                this.field.getNearField(p.currentField.key, 0, 0),
                this.field.getNearField(p.currentField.key, 0, 1),
                this.field.getNearField(p.currentField.key, 1, 1)
            ];
            for (let m of mineFields) {
                this.mineFields[m] = this.gameObject['mine'][p.currentField.key];
            }
            this.actionHelper.placeMine(p.currentField.key, mineFields);
        }, this);

        this.eventHandler.event.placeMine.add((data) => {
            this.gameObject['mine'][data.positionKey] = new GameObject(this.game, 'mine',
                data.positionKey, this);
            this.gameObject['mine'][data.positionKey].owner = data.nickname;
            for (let m of data.mineFields) {
                this.mineFields[m] = this.gameObject['mine'][data.positionKey];
            }
            this.gameObject['mine'][data.positionKey].hide();

        }, this);

        this.eventHandler.event.mineExplode.add((data) => {
            this.gameAnimations['explosion'] = new Explosion(this.game,
                this.field.getFieldData(data.positionKey));
            try {
                this.gameObject['mine'][data.positionKey].destroy();
                delete this.gameObject['mine'][data.positionKey];
            } catch (e) {}
        }, this);

        this.exec.placeRock.add(() => {
            let p = this.player[this.currentPlayer];
            let newDeadFields = [
                this.field.getNearField(p.currentField.key, 1, 0),
                this.field.getNearField(p.currentField.key, 0, 0),
                this.field.getNearField(p.currentField.key, -1, 0),
                this.field.getNearField(p.currentField.key, -1, 1),
                this.field.getNearField(p.currentField.key, 0, 1),
                this.field.getNearField(p.currentField.key, 1, 1)
            ];
            for (let newKey of newDeadFields) {
                if (newKey === null) {
                    console.log('you can\'t place rock on this field');
                    this.onGetDiamond.dispatch(2);
                    return;
                }
            }
            this.addDeadFields(newDeadFields);
            let positionKey = this.field.getNearField(p.currentField.key, 0, 2);
            if (positionKey === null) {
                console.log('you can\'t place rock on this field');
                this.onGetDiamond.dispatch(2);
                return;
            }
            this.gameObject['rock'][p.currentField.key] = new GameObject(this.game, 'rock',
            p.currentField.key, this);
            let goToField = this.field.getFieldData(positionKey);
            
            this.actionHelper.placeRock(p.currentField.key, newDeadFields, goToField);
            p.goTo(goToField);
        }, this);

        this.eventHandler.event.placeRock.add((data) => {
            this.gameObject['rock'][data.positionKey] = new GameObject(this.game, 'rock',
                data.positionKey, this);
                this.addDeadFields(data.deadFields);
            this.player[this.oppositePlayer].goTo(data.goToField);
            // this.gameObject['rock'][data.positionKey].hide();
        }, this);

        // this.exec.placePortal.add(() => {
        //     let p = this.player[this.currentPlayer];
        //     this.gameObject['portal'][p.currentField.key] = new GameObject(this.game, 'portal',
        //     p.currentField.key, this);
        //     this.gameObject['portal'][p.currentField.key].owner = this.currentPlayer;
        //     this.actionHelper.placePortal(p.currentField.key);
        // }, this);

        // this.eventHandler.event.placePortal.add((data) => {
        //     this.gameObject['portal'][data.positionKey] = new GameObject(this.game, 'portal',
        //         data.positionKey, this);
        //     this.gameObject['portal'][data.positionKey].owner = data.nickname;
        //     this.gameObject['portal'][data.positionKey].hide();
        // }, this);

        this.eventHandler.event.gameOver.add((data) => {
            this.gameOver(data.win);
        });
    }

    gameOver(winner) {
        this.field.onClick.removeAll();
        let line = this.game.add.graphics();
        let p = null;
        if (winner) {
            p = this.player[this.currentPlayer];
        } else {
            p = this.player[this.oppositePlayer];
        }
        line.lineStyle(5, p.data.color, 1);
        line.moveTo(100, 80);
        line.lineTo(1180 , 80);
        setTimeout(() => {
            this.gameOverScreen = new GameOverScreen(this.game, winner);
            this.gameOverScreen.onExit.add(() => this.closeSocket.dispatch() ,this);
        }, 2000);
    }

    addDeadFields(deadFields) {
        let oldDeadFields = this.field.deadFieldsArray;
        this.field.destroy();
        this.field = new Field();
        this.field.pushDeadFields(oldDeadFields);
        this.field.pushDeadFields(deadFields);
        this.field.createGrid(this);
        this.field.onClick.add((fieldData) => {
            this.movePlayer(fieldData);
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