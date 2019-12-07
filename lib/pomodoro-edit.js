'use babel';

import PomodoroEditView from './pomodoro-edit-view';
import { CompositeDisposable } from 'atom';
import { remote } from 'electron';
import Core from './pomodoro-edit-core';

export default {

  core: null,
  pomodoroEditView: null,
  modalPanel: null,
  subscriptions: null,
  tray: null,

  activate(state) {
    this.core = new Core();
    this.tray = new remote.Tray(`${__dirname}/../resources/icon.png`);
    
    atom.workspace.observeActiveTextEditor(editor => {
      editor.onDidSave(() => {
        this.core.findAndCountPomodoroText(editor.getText(), {
          interval: time =>
            this.tray.setTitle(time.toString()),
            
          finish: ptext =>
            new Notification('Time\'s up!', {
              body: ptext.content
            }),
            
          stop: () =>
            this.tray.setTitle('')
        })
      });
    });

    this.pomodoroEditView = new PomodoroEditView(state.pomodoroEditViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.pomodoroEditView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pomodoro-edit:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.pomodoroEditView.destroy();
    this.tray.destroy();
  },

  serialize() {
    return {
      pomodoroEditViewState: this.pomodoroEditView.serialize()
    };
  },

  toggle() {
    console.log('PomodoroEdit was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
