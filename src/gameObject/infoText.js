import Phaser from '../phaser';

class InfoText extends Phaser.Text {

	constructor(game, text, size = 20, white = false) {
		super(game, 0, 0, text, { 
            font: size + "px Oswald",
            fill: white ? "#ffffff" : "#000000",
            align: "left"
        });
		game.world.addChild(this);
	}
}

export default InfoText;