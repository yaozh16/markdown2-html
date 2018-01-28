'use babel';

import Markdown2Html from '../lib/markdown2-html';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Markdown2Html', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('markdown2-html');
  });

  describe('when the markdown2-html:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.markdown2-html')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'markdown2-html:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.markdown2-html')).toExist();

        let markdown2HtmlElement = workspaceElement.querySelector('.markdown2-html');
        expect(markdown2HtmlElement).toExist();

        let markdown2HtmlPanel = atom.workspace.panelForItem(markdown2HtmlElement);
        expect(markdown2HtmlPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'markdown2-html:toggle');
        expect(markdown2HtmlPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.markdown2-html')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'markdown2-html:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let markdown2HtmlElement = workspaceElement.querySelector('.markdown2-html');
        expect(markdown2HtmlElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'markdown2-html:toggle');
        expect(markdown2HtmlElement).not.toBeVisible();
      });
    });
  });
});
