import express from 'express';
import ws from 'express-ws';
import cors from 'cors';
import path from 'path';

import Logger from './helper/logger';
import RootEndpoint from './endpoint/app/rootEndpoint';

import UserEndpoint from './endpoint/api/userEndpoint';
import ArenaEndpoint from './endpoint/api/arenaEndpoint';

class Router {
    
    logger = Logger.getInstance();
    expressRouter = ws(express()).app;
    
    constructor() {
        this.expressRouter.disable('x-powered-by');
        this.expressRouter.use(cors());
        this.init();
        this.run();
    }

    init() {
        this.static('/static', process.env.WEBAPP_STATIC);
        this.static('/assets', process.env.WEBAPP_ASSETS);
        new UserEndpoint(this.expressRouter, '/api/user/:nickname');
        new ArenaEndpoint(this.expressRouter, '/api/arena');
        new RootEndpoint(this.expressRouter, '/*');
    }

    run() {
        this.logger.info('Server listen on port', process.env.PORT);
        this.expressRouter.listen(process.env.PORT);    
    }

    static(route, dir, options = {}) {
        this.expressRouter.use(route, express.static(path.join(__dirname, dir), options));
    }

}

export default Router;