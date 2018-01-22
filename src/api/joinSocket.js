import Socket from './socket';
import { Signal } from 'signals';

class JoinSocket extends Socket {
    
    onWorldId = new Signal();
    
    constructor() {
        super('/api/join');
    }

    messageHandler(event) {
        this.onWorldId.dispatch(event.data);
        this.close();
    }


}

export default JoinSocket;