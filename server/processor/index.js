import HeartBeat from '../helper/heartBeat';

class Processor {
    
    heartBeat = new HeartBeat(1000);

    constructor() {
        // this.heartBeat.every(5).add(() => this.queueService.matchPlayers());
    }
}

export default Processor;