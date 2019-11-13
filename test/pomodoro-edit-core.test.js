import Core from '../lib/pomodoro-edit-core';

var core = null;

describe('pomodoro-edit-core', () => {
  
  beforeEach(() => {
    core = new Core();
  });
  
  describe('findTime', () => {
    it('can find "[p99]"', () => {
      const actual = core.findTime('[p99] xxx');
      
      expect(actual).toBe('99');
    });
    
    it('return false if no match', () => {
      const actual = core.findTime('');
      
      expect(actual).toBeFalsy();
    });
  });
  
  describe('startTimer', () => {
    it('can count one second', () => {
      return expect(core.startTimer('1')).resolves.toBeUndefined();
    });
  });
});
