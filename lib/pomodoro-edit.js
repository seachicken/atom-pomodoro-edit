'use babel';

import { remote } from 'electron';
import path from 'path';
import Core from 'pomodoro-edit-core';
import moment from 'moment';
import 'moment-duration-format';

export default {

  core: null,
  tray: null,

  activate(state) {
    this.core = new Core();
    this.tray = new remote.Tray(`${__dirname}/../resources/iconTemplate.png`);
    
    atom.workspace.observeActiveTextEditor(editor => {
      if (!this.isTarget(editor)) {
        return;
      }
      
      editor.onDidSave(() => {
        this.core.findAndCountPomodoroText(editor.getText(), {
          interval: time =>
            this.tray.setTitle(moment.duration(time, 'seconds').format('mm:ss')),
            
          finish: ptext =>
            new Notification('Pomodoro Edit', {
              body: ptext.content
            }),
            
          stop: () =>
            this.tray.setTitle('')
        });
      });
    });
  },

  deactivate() {
    this.tray.destroy();
  },
  
  isTarget(editor) {
    return editor && editor.getPath && path.extname(editor.getPath())
      .match(/(^\.md$|^\.markdown$|^\.mdown$|^\.mkd$|^\.mkdown$|^\.txt$)/);
  }
};
