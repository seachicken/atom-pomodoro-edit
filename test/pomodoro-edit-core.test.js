import Core from '../lib/pomodoro-edit-core';

describe('pomodoro-edit-core', () => {
  let core = null;

  beforeEach(() => {
    core = new Core();
  });
  
  describe('findAndCountPomodoroText', () => {
    describe('callback finish', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });
      
      it('can find "[p1] xxx"', done => {
        core.findAndCountPomodoroText('[p1] xxx', {
          finish: actual => {
            expect(actual).toStrictEqual({ time: '1', content: 'xxx' });
            done();
          }
        });
        jest.advanceTimersByTime(1000);
      });
      
      it('can find "- [p1] xxx"', done => {
        core.findAndCountPomodoroText('- [p1] xxx', {
          finish: actual => {
            expect(actual).toStrictEqual({ time: '1', content: 'xxx' });
            done();
          }
        });
        jest.advanceTimersByTime(1000);
      });
      
      it('can find "- [ ] [p1] xxx"', done => {
        core.findAndCountPomodoroText('- [ ] [p1] xxx', {
          finish: actual => {
            expect(actual).toStrictEqual({ time: '1', content: 'xxx' });
            done();
          }
        });
        jest.advanceTimersByTime(1000);
      });
      
      it('ignores if spaces before content', done => {
        core.findAndCountPomodoroText('[p1]  xxx', {
          finish: actual => {
            expect(actual).toStrictEqual({ time: '1', content: 'xxx' });
            done();
          }
        });
        jest.advanceTimersByTime(1000);
      });
    });
    
    describe('callback interval', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });
      
      it('can count remaining time', done => {
        let expected = 2;
        
        core.findAndCountPomodoroText('[p2] xxx', {
          interval: actual =>
            expect(actual).toBe(--expected),  // counts 1, 0
            
          finish: () => done()
        });
        jest.advanceTimersByTime(2 * 1000);
      });
    });
    
    describe('callback stop', () => {
      it('return false if no match', done => {
        core.findAndCountPomodoroText('', {
          stop: () => done()
        });
      });
      
      it('return false if empty content', done => {
        core.findAndCountPomodoroText('[p1]', {
          stop: () => done()
        });
      });
      
      it('return false if empty content have next lines', done => {
        core.findAndCountPomodoroText('[p1]\nxxx', {
          stop: () => done()
        });
      });
    });
  });
});
