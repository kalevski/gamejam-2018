import Logger from '../helper/logger';
import HeartBeat from '../helper/heartBeat';

class Endpoint {

    logger = Logger.getInstance();

    constructor(router, path) {
      this.router = router;
      this.logger.info('[' + path + '] endpoint invoked!');
      router.app.get(path, this.get);
      router.app.post(path, this.post);
      router.app.put(path, this.put);
      router.app.delete(path, this.delete);
      if (typeof this.websocket === 'function') {
        this.logger.debug('[' + path + '] websocket invoked!');
        router.app.ws(path, (ws, router) => {
          this.websocket(ws, router);
        });
      }

      // this.helper = {
      //   getWss: () => router.getWss(path)
      // }

      if (typeof this.broadcast === 'function') {
        this.broadcast(router.getWss(path).clients, new HeartBeat(1000));
      }

      if (typeof this.init === 'function') {
          this.init();
      }
    }
  
    get(request, response) {
      response.status(405).send();
    }
  
    post(request, response) {
      response.status(405).send();
    }
  
    put(request, response) {
      response.status(405).send();
    }
  
    delete(request, response) {
      response.status(405).send();
    }
  }
  
  export default Endpoint;  