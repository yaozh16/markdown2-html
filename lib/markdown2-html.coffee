Markdown2HtmlView = require './markdown2-html-view'
{CompositeDisposable} = require 'atom'

module.exports = Markdown2Html =
  markdown2HtmlView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @markdown2HtmlView = new Markdown2HtmlView(state.markdown2HtmlViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @markdown2HtmlView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'markdown2-html:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @markdown2HtmlView.destroy()

  serialize: ->
    markdown2HtmlViewState: @markdown2HtmlView.serialize()

  toggle: ->
    console.log 'Markdown2Html was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
