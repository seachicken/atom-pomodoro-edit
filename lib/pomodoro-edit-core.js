'use babel';

export default class Core {
  
  findTime(text) {
    return text.match(/^\[p([0-9].*)\]/m)[1];
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