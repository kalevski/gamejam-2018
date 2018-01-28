import cluster from 'cluster';
import os from 'os';
import shell from 'shelljs';
import Router from './router';
import Processor from './processor';
import Logger from './helper/logger';

import DEV_CONFIG from './config.dev';
import PROD_CONFIG from './config.prod';

class Api {

    logger = Logger.getInstance();

    constructor() {
        new Router();
        // if (cluster.isMaster) {
        //     if (this.checkMachine()) {
        //         this.master();
        //     }
        // } else {
        //     this.slave();
        // }
    }

    master() {
        var env = PROD_CONFIG;
        if (typeof process.env['ENV'] !== 'undefined') {
            if (process.env['ENV'] === 'DEV') {
                env = DEV_CONFIG;
            }
        }

        env['INSTANCE_TYPE'] = 'router';
        for (let i = 0; i < 1; i++) { 
            env['INSTANCE_ID'] = i;
            env['ROOT'] = __dirname;
            cluster.fork(env);
        }

        env['INSTANCE_TYPE'] = 'processor';
        env['INSTANCE_ID'] = 'scheduler';
        cluster.fork(env);
    }

    slave() {
        if (process.env['INSTANCE_TYPE'] === 'router') {
            new Router();
        } else if (process.env['INSTANCE_TYPE'] === 'processor') {
            new Processor();
        }
    }

    checkMachine() {
        if (process.env.NPM_CONFIG_PRODUCTION) {
            return true;
        }
        if (!shell.which('mysql')) {
            this.logger.error('You need to install MySQL to run this app');
        } else if (!shell.which('redis-cli')) {
            this.logger.error('You need to install Redis Server to run this app');
        } else {
            return true;
        }
        return false;
    }
}

new Api();

