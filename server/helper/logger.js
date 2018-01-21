import path from 'path';
import winston from 'winston';

class Logger {
  constructor() {
    this._logger = this._createLogger();
  }

  error(message) {
    this._log('error', arguments);
  }

  warn(message) {
    this._log('warn', arguments);
  }

  info(message) {
    this._log('info', arguments);
  }

  verbose(message) {
    this._log('verbose', arguments);
  }

  debug(message) {
    this._log('debug', arguments);
  }

  silly(message) {
    this._log('silly', arguments);
  }

  _log(type, args) {
    var args = Array.from(args);
    var message = '';
    for (var i = 0; i < args.length; i++) {
      var prefix = ', ';
      if (i == 0) prefix = '';
      if (typeof args[i] !== 'string') {
        var cache = [];
        message += prefix + '\n' + JSON.stringify(args[i], function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    return;
                }
                cache.push(value);
            }
            return value;
        }, 3);
        cache = null;
      } else {
        message += prefix + args[i];
      }
    }
    this._logger.log(type, message);
  }

  _timestamp() {
    return new Date(Date.now()).toLocaleString();
  }

  _formatter(options) {
    var stackString = options.meta.stack;
    if (typeof stackString === 'undefined') stackString = [''];
    stackString = stackString.join('\n');
    var stack = typeof options.meta.stack !== 'undefined' ? '\n' + stackString : '';
    var formatted = '';
    formatted += '[' + options.timestamp() + ']: ';
    formatted += (undefined !== options.message ? options.message : '');
    formatted += stack;
    return winston.config.colorize(options.level ,formatted);
  }

  _createLogger() {
    var self = this;
    return new (winston.Logger)({
      transports: [
        new (winston.transports.Console)({
          level: 'silly',
          timestamp: self._timestamp,
          formatter: self._formatter,
          handleExceptions: true,
          json: false,
          colorize: true
        }),
        new (winston.transports.File)({
          name: 'info-file',
          filename: path.join(__dirname, '../../log/filelog-info.log'),
          level: 'info',
          timestamp: self._timestamp,
          formatter: self._formatter,
          handleExceptions: true,
          json: false,
          colorize: true
        }),
        new (winston.transports.File)({
          name: 'error-file',
          filename: path.join(__dirname, '../../log/filelog-error.log'),
          level: 'error',
          timestamp: self._timestamp,
          formatter: self._formatter,
          handleExceptions: true,
          json: false,
          colorize: true
        })
      ]
    });
  }
}

var instance = null;
Logger.getInstance = () => {
  if (instance === null) {
    instance = new Logger();
  }
  return instance;
}

export default Logger;
