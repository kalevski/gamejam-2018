import HeartBeat from '../helper/heartBeat';
import QueueService from '../service/queueService';

class Processor {
    
    heartBeat = new HeartBeat(1000);
    queueService = QueueService.getInstance();

    constructor() {
        this.heartBeat.every(5).add(() => this.queueService.matchPlayers());
    }
}

export default Processor;