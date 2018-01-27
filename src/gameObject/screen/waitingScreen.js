import Phaser from '../../phaser';
import Creature from '../creature';

class WaitingScreen extends Phaser.Group {

    onReady = new Phaser.Signal();
    background = null;
    player1 = null;
    player2 = null;
    game = null;

    constructor(game, data, worldEventHandler) {
        super(game, game.world, 'waitingScreen');
        window.h = this;
        this.game = game;
        this.background = this.create(0, 0, 'ui-world-state-waiting-bg');
        this.player1 = new Creature(game, data);
        this.player1.position.set(220, 300);
        worldEventHandler.event.startGame.addOnce((data) => {
            this.player2 = new Creature(game, data);
            this.player2.position.set(1060, 300);
            this.player2.flip();
            setTimeout(() => {
                this.onReady.dispatch();
            }, 5000);
        });
    }

    destroy() {
        this.player1.destroy();
        this.player2.destroy();
        super.destroy();
    }
}

export default WaitingScreen;