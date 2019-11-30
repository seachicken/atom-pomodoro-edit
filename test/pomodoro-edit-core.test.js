import Core from '../lib/pomodoro-edit-core';

var core = null;

describe('pomodoro-edit-core', () => {
  
  beforeEach(() => {
    core = new Core();
  });
  
  describe('findPomodoroText', () => {
    it('can find "[p99] xxx"', () => {
      const actual = core.findPomodoroText('[p99] xxx');
    
      expect(actual).toStrictEqual({ time: '99', content: 'xxx' });
    });
    
    it('can find "- [p99] xxx"', () => {
      const actual = core.findPomodoroText('- [p99] xxx');
    
      expect(actual).toStrictEqual({ time: '99', content: 'xxx' });
    });
    
    it('can find "- [ ] [p99] xxx"', () => {
      const actual = core.findPomodoroText('- [ ] [p99] xxx');
    
      expect(actual).toStrictEqual({ time: '99', content: 'xxx' });
    });
    
    it('ignores if spaces before content', () => {
      const actual = core.findPomodoroText('[p99]  xxx');
    
      expect(actual).toStrictEqual({ time: '99', content: 'xxx' });
    });
    
    it('return false if no match', () => {
      const actual = core.findPomodoroText('');
      
      expect(actual).toBeFalsy();
    });
    
    it('return false if empty content', () => {
      const actual = core.findPomodoroText('[p99]');
    
      expect(actual).toBeFalsy();
    });
    
    it('return false if empty content have next lines', () => {
      const actual = core.findPomodoroText('[p99]\nxxx');
    
      expect(actual).toBeFalsy();
    });
  });
  
  describe('startTimer', () => {
    it('can count one second', () => {
      return expect(core.startTimer('1'))
        .resolves.toBeUndefined();
    });
    
    it('can count remaining time', () => {
      let expected = 3;
      
      const assertRemainingTime = actual =>
        expect(actual).toBe(--expected);  // counts 2, 1, 0
      return expect(core.startTimer('3', assertRemainingTime))
        .resolves.toBeUndefined();
    });
  });
  
  describe('stopTimer', () => {
    it('can clear interval timer', () => {
      core.startTimer(3);
      
      core.stopTimer();
      
      expect(core._interval).toBeNull();
    });
  });
});
