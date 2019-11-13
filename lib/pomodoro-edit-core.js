'use babel';

export default class Core {
  
  findTime(text) {
    const found = text.match(/^\[p([0-9].*)\]/m);
    if (found == null) {
      return false;
    } else {
      return found[1];
    }
  }
  
  startTimer(timeText) {
    let timeSec = parseInt(timeText);
    
    return new Promise(resolve => {
      setInterval(() => {
        timeSec--;
        
        if (timeSec <= 0) {
          clearInterval();
          resolve();
        }
      }, 1000);
    });
  }
}