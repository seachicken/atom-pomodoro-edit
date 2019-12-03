'use babel';

export default class Core {
  constructor() {
    this._interval;
  }

  findPomodoroText(text) {
    const found = text.match(/(?:^|^- |^- \[ \] )\[p([0-9].*)\] *(.+)/m);
    if (found == null) {
      return false;
    } else {
      return { time: found[1], content: found[2] };
    }
  }

  startTimer(timeText, callback = () => {}) {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
    
    let timeSec = parseInt(timeText);

    return new Promise(resolve => {
      this._interval = setInterval(() => {
        callback(--timeSec);

        if (timeSec <= 0) {
          clearInterval(this._interval);
          this._interval = null;
          
          resolve();
        }
      }, 1000);
    });
  }
  
  stopTimer() {
    clearInterval(this._interval);
    this._interval = null;
  }
}