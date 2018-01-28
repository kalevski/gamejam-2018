import Phaser from '../../phaser';
import Creature from '../creature';
import InfoText from '../infoText';

class GameOverScreen extends Phaser.Group {

    constructor(game, data, worldEventHandler) {
        super(game, game.world, 'gameOverScreen');
        
    }

    destroy() {
        super.destroy();
    }
}

export default WaitingScreen;