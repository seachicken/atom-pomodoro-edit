import Core from '../lib/pomodoro-edit-core';

var core = null;

describe('pomodoro-edit-core', () => {
  
  beforeEach(() => {
    core = new Core();
  });
  
  it('findTime', () => {
    const actual = core.findTime('[p99] xxx');
    
    expect(actual).toBe('99');
  });
  
  it('startTimer', () => {
    return expect(core.startTimer('1')).resolves.toBeUndefined();
  });
});
