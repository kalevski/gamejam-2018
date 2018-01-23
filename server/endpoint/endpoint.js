import Logger from '../helper/logger';

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

        this.helper = {
            getClients: (param) => this._getClients(router.getWss(path).clients, path, param),
        }

        if (typeof this.init === 'function') {
            this.init.call(this);
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

    _getClients(allClients, path, param = null) {
        var out = [];
        let clients = Array.from(allClients);
        for (let i = 0; i < clients.length; i++) {
            var clientPath = clients[i].upgradeReq.route.path;
            clientPath = clientPath.substring(0, clientPath.length - 11);
            if (clientPath === path) {
                out.push(clients[i]);
            }
        }
        if (param === null) {
            return out;
        } else {
            return this._getGroups(out, param);
        }
        
    }

    _getGroups(clients, param) {
        var out = {
            list: [],
            map: {}
        };
        for(let i = 0; i < clients.length; i++) {
            if (typeof clients[i].upgradeReq.params[param] === 'undefined') {
                return clients;
            }
            if (typeof out.map[clients[i].upgradeReq.params[param]] === 'undefined') {
                out.map[clients[i].upgradeReq.params[param]] = [];
                out.list.push(clients[i].upgradeReq.params[param]);
            }
            out.map[clients[i].upgradeReq.params[param]].push(clients[i]);
        }
        return out;
    }
}
  
export default Endpoint;  