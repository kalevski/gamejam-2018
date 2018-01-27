import Phaser from '../../phaser';
import Creature from '../creature';
import InfoText from '../infoText';

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
        this.player1.position.set(220, 425);
        worldEventHandler.event.startGame.addOnce((data) => {
            this.player2 = new Creature(game, data);
            this.player2.position.set(1060, 425);
            this.player2.flip();
            
            let counterNo = 5;
            this.counterText = new InfoText(this.game, counterNo, 80, true);
            this.counterText.anchor.set(.5);
            this.counterText.position.set(this.game.world.centerX,
                this.game.world.centerY + 275);
            this.add(this.counterText);
            let intervalId = setInterval(() => {
                if (counterNo === 0) {
                    this.counterText.text = 'GO!';
                } else {
                    this.counterText.text = counterNo;
                    counterNo--;
                }
            }, 730);
            setTimeout(() => {
                clearInterval(intervalId);
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