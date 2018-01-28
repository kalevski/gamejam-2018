import Phaser from '../phaser';
import Creature from '../gameObject/creature';
import Ability from '../gameObject/ability';
import InfoText from '../gameObject/infoText';
import UserData from '../helper/userData';
import Api from '../api';

class LobbyState extends Phaser.State {

    api = Api.getInstance();

    create() {
        this.userData = UserData.getInstance();

        this.background = this.game.add.sprite(0, 0, 'ui-lobby-state-bg');
        this.creature = new Creature(this.game, this.userData.creature);
        this.creature.position.set(640, 425);

        this.play = this.game.add.sprite(805, 350, 'ui-lobby-play');
        this.play.inputEnabled = true;
        this.play.events.onInputDown.add(() => {this.playButton()});

        this.playActionStatus =  new InfoText(this.game, '');
        this.playActionStatus.position.set(805, 430);

        this.abilityDescription = new InfoText(this.game, '');
        this.abilityDescription.position.set(130, 235);

        this.abilities = [];
        var abilityList = this.userData.abilityList;
        for (let i = 0; i < abilityList.length; i++) {
            let ability = new Ability(this.game, abilityList[i], this.creature.getAbilityData(abilityList[i]));
            ability.position.set(214 + (i * 90), 140);
            this.abilities.push(ability);
        }
    }

    playButton() {
        this.play.tint = 0xcccccc;
        this.play.inputEnabled = false;
        this.playActionStatus.text = 'waiting for other player';

        var joinSocket = new this.api.socket.JoinSocket();
        
        joinSocket.onWorldId.addOnce((id) => {
            this.game.global['worldId'] = id;
            this.playActionStatus.text = 'creating a world';
            setTimeout(() => {
                this.game.state.start('world');
            }, 2000);
        });
        joinSocket.event.close.addOnce(() => {
            if (typeof this.game.global['worldId'] === 'undefined') {
                this.play.tint = 0xffffff;
                this.play.inputEnabled = true;
                this.playActionStatus.text = '';
            }
        });
        
    }

    shutdown() {
        
    }
}
  
export default LobbyState;
  