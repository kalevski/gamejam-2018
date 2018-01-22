import Phaser from '../phaser';

class InfoText extends Phaser.Text {

	constructor(game, text) {
		super(game, 0, 0, text, { 
            font: "20px Oswald",
            fill: "#000000",
            align: "left"
        });
		game.world.addChild(this);
	}
}

export default InfoText;