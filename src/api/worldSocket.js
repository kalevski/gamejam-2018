import Socket from './socket';
import { Signal } from 'signals';

class WorldSocket extends Socket {
    
    onStatus = new Signal();

    constructor(worldId, nickname) {
        super(`/api/world/${worldId}?nickname=${nickname}`);
    }

    messageHandler(event) {
        let data = JSON.parse(event.data);
        if (data.type === 'status') {
            this.onStatus.dispatch(data.data);
        }
    }

    send(type, user, data) {
        this.socket.send(JSON.stringify({type, user, data}));
    }

    join(userData) {
        this.send('join', userData.nickname, userData);
    }

    removeActions(nickname) {
        this.send('removeActions', nickname, {});
    }
}

export default WorldSocket;