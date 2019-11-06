'use babel';

import PomodoroEditView from './pomodoro-edit-view';
import { CompositeDisposable } from 'atom';

export default {

  pomodoroEditView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
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
