import Phaser from '../phaser';
import UserData from '../helper/userData';
import Ability from '../gameObject/ability';
import InfoText from '../gameObject/infoText';

class ActionBar extends Phaser.Group {
    
    userData = UserData.getInstance();
    actionHelper = null;
    eventHandler = null;
    worldField = null;

    background = null;
    abilityList = [];
    hearts = 3;
    diamonds = 0;

    diamondsText = null;
    heartsText = null;

    constructor(game, worldField, actionHelper, eventHandler) {
        super(game, game.world, 'actionBar');
        this.actionHelper = actionHelper;
        this.eventHandler = eventHandler;
        this.worldField = worldField;
        this.background = this.create(0, 0, 'ui-action-bar-bg');
        this.position.set(0, 590);
        this.userData.abilityList.forEach((abilityIndex, index) => {
            this.abilityList[index] = new Ability(game, abilityIndex, 
                this.userData.abilityData[abilityIndex]);
            this.abilityList[index].position.set(550 + index * 100, 20);
            this.add(this.abilityList[index]);
            this.abilityList[index].alpha = .7;
            this.abilityList[index].onClick.add(() => {this.abilityClicked(this.abilityList[index])});
            this.abilityList[index].onFire.add(() => this.fireEvent(this.abilityList[index]));
        });
        this.diamondsText = new InfoText(game, this.diamonds, 40, true);
        this.diamondsText.position.set(250, 645);
        this.heartsText = new InfoText(game, this.hearts, 40, true);
        this.heartsText.position.set(1080, 645);
        this.registerEvents();
        
        worldField.onGetDiamond.add((no) => {
            this.increaseDiamons(no);
        }, this);

        worldField.onLooseHeart.add(() => {
            this.decreaseHearts();
        });
    }

    registerEvents() {

    }

    fireEvent(ability) {
        if (ability.index === 0) {
            this.worldField.exec.ocupateAntena.dispatch();
        } else if (ability.index === 1) {
            this.worldField.exec.placeMine.dispatch();
        } else if (ability.index === 2) {
            this.worldField.exec.placeRock.dispatch();
        } else if (ability.index === 3) {
            this.worldField.exec.placePortal.dispatch();
        }
    }

    abilityClicked(ability) {
        if (this.diamonds >= ability.data) {
            ability.fire();
            this.diamonds -= ability.data;
            this.diamondsText.text = this.diamonds;
            
            this.abilityList.forEach((ability) => {
                if (this.diamonds < ability.data) {
                    ability.alpha = .7;
                }
            });
        }
    }

    decreaseHearts() {
        this.hearts--;
        if (this.hearts === 0) {
            this.worldField.exec.endGame.dispatch();
        }
    }

    increaseDiamons(no = 1) {
        this.diamonds += no;
        this.diamondsText.text = this.diamonds;
        this.abilityList.forEach((ability) => {
            if (this.diamonds >= ability.data) {
                ability.alpha = 1;
            }
        });
    }
}

export default ActionBar;