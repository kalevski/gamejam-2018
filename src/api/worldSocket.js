import Socket from './socket';
import { Signal } from 'signals';

class WorldSocket extends Socket {
    
    onStatus = new Signal();
    
    constructor(worldId) {
        super(`/api/world/${worldId}`);
    }

    messageHandler(event) {
        this.onWorldId.dispatch(event.data);
        let data = JSON.parse(event.data);
        if (data.type === 'status') {
            this.onStatus.dispatch(data.data);
        }
    }
}

export default WorldSocket;