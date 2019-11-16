'use babel';

export default class Core {
  constructor() {
    this._interval;
  }

  findTime(text) {
    const found = text.match(/^\[p([0-9].*)\]/m);
    if (found == null) {
      return false;
    } else {
      return found[1];
    }
  }

  startTimer(timeText, callback = () => {}) {
    let timeSec = parseInt(timeText);

    return new Promise(resolve => {
      this._interval = setInterval(() => {
        callback(timeSec--);

        if (timeSec <= 0) {
          clearInterval(this._interval);
          resolve();
        }
      }, 1000);
    });
  }
}