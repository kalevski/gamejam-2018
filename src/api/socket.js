import { Signal } from 'signals';

class Socket {
    
    socket = null;
    
    event = {
        open: new Signal(),
        close: new Signal(),
        error: new Signal(),
        message: new Signal()
    }

    constructor(url) {
        this.socket = new WebSocket('ws://' + process.env.REACT_APP_API + url);
        this.socket.addEventListener('open', (event) => this.event.open.dispatch(event));
        this.socket.addEventListener('close', (event) => this.event.close.dispatch(event));
        this.socket.addEventListener('error', (event) => this.event.error.dispatch(event));
        this.socket.addEventListener('message', (event) => this.event.message.dispatch(event));
        if (typeof this.messageHandler === 'function') {
            this.event.message.add(this.messageHandler, this);
        }

        if (typeof this.errorHandler === 'function') {
            this.event.error.add(this.errorHandler, this);
        }
    }

    close() {
        this.socket.addEventListener('close', () => {});
        this.socket.close();
    }
}

export default Socket;