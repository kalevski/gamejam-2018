import Phaser from '../phaser';
import Creature from '../gameObject/creature';

class LobbyState extends Phaser.State {
    init() {
        
    }

    create() {
        this.background = this.game.add.sprite(0, 0, 'map-background');
        this.creature = new Creature(this.game, {
            id: 'example',
            head: 'example2',
            body: 'example3',
            color: 0xffffff
        });
        this.creature.x = this.world.centerX;
        this.creature.y = this.world.centerY;
    }

    update() {

    }

    shutdown() {
        
    }
}
  
export default LobbyState;
  