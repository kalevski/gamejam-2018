import Phaser from './phaser';
import BootState from './state/bootState';
import LoadingState from './state/loadingState';
import LobbyState from './state/lobbyState';
import CustomizeState from './state/customizeState';
import WorldState from './state/worldState';

var instance = null;

class Game extends Phaser.Game {
	constructor() {
		super(1280, 720, Phaser.CANVAS, 'canvas', false);
		
		instance = this;
		
		this.state.add('boot', BootState);
		this.state.add('loading', LoadingState);
		this.state.add('customize', CustomizeState);
		this.state.add('lobby', LobbyState);
		this.state.add('world', WorldState);
	}

	run() {
		this.state.start('boot');
	}
}

Game.getInstance = function() {
	return instance;
}

export default Game;
