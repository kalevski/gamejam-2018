import Phaser from '../phaser';
import UserData from '../helper/userData';
import Ability from '../gameObject/ability';

class ActionBar extends Phaser.Group {
    
    userData = UserData.getInstance();
    background = null;
    abilityList = [];

    constructor(game, worldField, actionHandler) {
        super(game, game.world, 'actionBar');
        this.background = this.create(0, 0, 'ui-action-bar-bg');
        this.position.set(530, 590);
        this.userData.abilityList.forEach((abilityIndex, index) => {
            this.abilityList[index] = new Ability(game, abilityIndex, 
                this.userData.abilityData[abilityIndex]);
            this.abilityList[index].position.set(20 + index * 100, 20);
            this.add(this.abilityList[index]);
            this.abilityList[index].onClick.add(() => {this.abilityClicked(abilityIndex)});
        });
    }

    abilityClicked(abilityIndex) {

    }
}

export default ActionBar;