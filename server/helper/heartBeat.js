import signals from 'signals';

class HeartBeat {
  constructor(delay) {
    var self = this;
    this._event = [];
    this._eventMap = {};

    this._beat = setInterval(function () {
      self._heart();
    }, delay);
  }

  every(step) {
    if (typeof step === 'undefined') {
      step = 1;
    }
    if (typeof step !== 'number') {
      throw new Error('Passed step argument is not a number');
    }
    if (typeof this._eventMap[step] === 'undefined') {
      this._registerNewEvent(step);
    }
    return this._event[this._eventMap[step]].signal;
  }

  kill() {
    clearInterval(this._beat);
    this._event = [];
    this._eventMap = [];
  }

  _registerNewEvent(step) {
    this._eventMap[step] = this._event.length;
    this._event.push({
      counter: 0,
      signal: new signals.Signal(),
      step: step
    });
  }

  _heart() {
    for (var i = 0; i < this._event.length; i++) {
      var e = this._event[i];
      e.counter++;
      if (e.counter === e.step) {
        e.counter = 0;
        e.signal.dispatch();
      }
    }
  }
}
export default HeartBeat;