import express from 'express';
import ws from 'express-ws';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import Logger from './helper/logger';
import RootEndpoint from './endpoint/app/rootEndpoint';

import UserEndpoint from './endpoint/api/userEndpoint';
import UserCreatureEndpoint from './endpoint/api/userCreatureEndpoint';
import JoinEndpoint from './endpoint/api/joinEndpoint';
import ArenaEndpoint from './endpoint/api/arenaEndpoint';

class Router {
    
    logger = Logger.getInstance();
    expressRouter = ws(express());
    
    constructor() {
        this.expressRouter.app.disable('x-powered-by');
        this.expressRouter.app.use(cors());
        this.expressRouter.app.use(bodyParser.json());
        this.expressRouter.app.use(bodyParser.urlencoded({ extended: true }));
        this.init();
        this.run();
    }

    init() {
        this.static('/static', process.env.WEBAPP_STATIC);
        this.static('/assets', process.env.WEBAPP_ASSETS);
        new UserEndpoint(this.expressRouter, '/api/user/:nickname');
        new UserCreatureEndpoint(this.expressRouter, '/api/user/:nickname/creature');
        new JoinEndpoint(this.expressRouter, '/api/join');
        new ArenaEndpoint(this.expressRouter, '/api/arena/:arenaId');
        new RootEndpoint(this.expressRouter, '/*');
    }

    run() {
        this.logger.info('Server listen on port', process.env.PORT);
        this.expressRouter.app.listen(process.env.PORT);    
    }

    static(route, dir, options = {}) {
        this.expressRouter.app.use(route, express.static(path.join(__dirname, dir), options));
    }

}

export default Router;