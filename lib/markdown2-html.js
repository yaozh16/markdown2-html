'use babel';

import Markdown2HtmlView from './markdown2-html-view';
import { CompositeDisposable } from 'atom';

export default {

  markdown2HtmlView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.markdown2HtmlView = new Markdown2HtmlView(state.markdown2HtmlViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.markdown2HtmlView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'markdown2-html:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.markdown2HtmlView.destroy();
  },

  serialize() {
    return {
      markdown2HtmlViewState: this.markdown2HtmlView.serialize()
    };
  },

  toggle() {
    console.log('Markdown2Html was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
