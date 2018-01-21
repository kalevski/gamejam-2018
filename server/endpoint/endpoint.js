import Logger from '../helper/logger';

class Endpoint {

    logger = Logger.getInstance();

    constructor(router, path) {
      this.logger.info('[' + path + '] endpoint invoked!');
      router.get(path, this.get);
      router.post(path, this.post);
      router.put(path, this.put);
      router.delete(path, this.delete);
      if (typeof this.websocket === 'function') {
        this.logger.debug('[' + path + '] websocket invoked!');
        router.ws(path, (ws, router) => {
          this.websocket(ws, router);
        });
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