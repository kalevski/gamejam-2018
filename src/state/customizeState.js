import Phaser from '../phaser';
import Creature from '../gameObject/creature';
import Ability from '../gameObject/ability';
import UserService from '../service/userService';

class CustomizeState extends Phaser.State {
    
    userService = UserService.getInstance();
    
    init() {
        
    }

    create() {
        this.selected = {
            head: null,
            body: null,
            color: null
        };

        this.palette = {
            0: 0xffffff,
            1: 0xf44336,
            2: 0x9c27b0,
            3: 0x212121,
            4: 0x00bcd4,
            5: 0xffc107,
            6: 0xff5722,
            7: 0x5d4037
        };

        this.background = this.game.add.sprite(0, 0, 'ui-customize-state-bg');

        this.play = this.game.add.sprite(885, 610, 'ui-customize-play');
        this.play.inputEnabled = true;
        this.play.events.onInputDown.add(() => {this.playButton()});

        this.creature = null;
        this.abilities = null;

        this.head = [
            this.game.add.sprite(15, 200, 'ui-customize-head-0'),
            this.game.add.sprite(105, 200, 'ui-customize-head-1'),
            this.game.add.sprite(195, 200, 'ui-customize-head-2'),
            this.game.add.sprite(285, 200, 'ui-customize-head-3')
        ];

        this.body = [
            this.game.add.sprite(15, 380, 'ui-customize-body-0'),
            this.game.add.sprite(105, 380, 'ui-customize-body-1'),
            this.game.add.sprite(195, 380, 'ui-customize-body-2'),
            this.game.add.sprite(285, 380, 'ui-customize-body-3')
        ];

        this.color = [
            this.game.add.sprite(15, 560, 'ui-customize-color'),
            this.game.add.sprite(105, 560, 'ui-customize-color'),
            this.game.add.sprite(195, 560, 'ui-customize-color'),
            this.game.add.sprite(285, 560, 'ui-customize-color'),
            this.game.add.sprite(375, 560, 'ui-customize-color'),
            this.game.add.sprite(465, 560, 'ui-customize-color'),
            this.game.add.sprite(555, 560, 'ui-customize-color'),
            this.game.add.sprite(645, 560, 'ui-customize-color')
        ];

        for (let i = 0; i < this.head.length; i++) {
            this.head[i].alpha = .5;
            this.head[i].inputEnabled = true;
            this.head[i].events.onInputDown.add(() => this.select('head', i));
        }

        for (let i = 0; i < this.body.length; i++) {
            this.body[i].alpha = .5;
            this.body[i].inputEnabled = true;
            this.body[i].events.onInputDown.add(() => this.select('body', i));
        }

        for (let i = 0; i < this.color.length; i++) {
            this.color[i].alpha = .5;
            this.color[i].inputEnabled = true;
            this.color[i].tint = this.palette[i];
            this.color[i].events.onInputDown.add(() => this.select('color', i));
        }
    }

    select(type, index) {
        if (this.selected[type] !== null) {
            this[type][this.selected[type]].alpha = .5;
        }
        if (this.selected[type] === index) {
            this.selected[type] = null;
        } else {
            this[type][index].alpha = 1;
            this.selected[type] = index;
        }

        if (this.validChoice()) {
            this.generateCreature();
            this.drawAbilities();    
        } else if (this.creature !== null) {
            this.creature.destroy();
            this.creature = null;
            for(let i = 0; i < this.abilities.length; i++) {
                this.abilities[i].destroy();
                this.abilities[i] = null;
            }
            this.abilities = null;
        }
    }

    generateCreature() {
        if (this.creature !== null) {
            this.creature.destroy();
        }
        this.creature = new Creature(this.game, {
            head: this.selected['head'],
            body: this.selected['body'],
            color: this.palette[this.selected['color']]
        });
        this.creature.position.set(1010, 525);
    }

    drawAbilities() {
        if (this.abilities !== null) {
            for(let i = 0; i < this.abilities.length; i++) {
                this.abilities[i].destroy();
            }
        }
        var abilityList = this.creature.getAbilityList();
        this.abilities = [];
        for (let i = 0; i < abilityList.length; i++) {
            let ability = new Ability(this.game, abilityList[i], this.creature.getAbilityData(abilityList[i]));
            ability.position.set(925 + (i * 90), 130);
            ability.inputEnabled = true;
            ability.onChildInputDown.add(() => this.showAbilityDescription(i));
            this.abilities.push(ability);
        }
    }

    validChoice() {
        if (this.selected['head'] === null) {
            return false;
        }
        if (this.selected['body'] === null) {
            return false;
        }
        if (this.selected['color'] === null) {
            return false;
        }
        return true;
    }

    playButton() {
        if (this.validChoice()) {
            this.play.tint = 0xcccccc;
            this.play.inputEnabled = false;

            var abilityList = this.creature.getAbilityList();
            var abilityData = {};
            for(let i = 0; i < abilityList.length; i++) {
                abilityData[abilityList[i]] = this.creature.getAbilityData(abilityList[i]);
            }
            this.userService.createCreature({
                head: this.selected['head'],
                body: this.selected['body'],
                color: this.palette[this.selected['color']]
            }, abilityList, abilityData).then(() => {
                this.game.state.start('lobby');
            });
        }
    }

    shutdown() {
        this.selected = null;
        this.palette = null;
        this.background = null;
        this.play = null
        this.abilityDescription = null;
        this.creature = null;
        this.abilities = null;
        this.head = null;
        this.body = null;
        this.color = null;
    }
}
  
export default CustomizeState;
  