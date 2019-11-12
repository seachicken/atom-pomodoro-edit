import Core from '../lib/pomodoro-edit-core';

var core = null;

describe('pomodoro-edit-core', () => {
  
  beforeEach(() => {
    core = new Core();
  });
  
  it('findSymbol', () => {
    const actual = core.findSymbol('[p99] xxx');
    
    expect(actual).toBeTruthy();
  });
});
