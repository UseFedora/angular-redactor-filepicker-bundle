// TODO:
// * add colors back in

// Set to true to get helpful debugging stuff logged to the console.
const DEBUG = true;

const REPLACE_WITH_P = [
  'H1', 'H2', 'H3', 'H4', 'H5', 'HR', 'CODE', 'BLOCKQUOTE', 'CODE', 'PRE', 'LI',
];

const REMOVE = [ 'HR', 'OL', 'UL', 'A' ];

const BLOCK_ELEMENTS = [
  'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'HR', 'LI', 'OL', 'UL', 'DIV', 'IMG',
  'CODE', 'BLOCKQUOTE',
];

const REPLACE_WITH_P_MAP = {};
REPLACE_WITH_P.forEach(block => REPLACE_WITH_P_MAP[block] = true);

const BLOCK_ELEMENTS_MAP = {};
BLOCK_ELEMENTS.forEach(block => BLOCK_ELEMENTS_MAP[block] = true);

const REMOVE_MAP = {};
REMOVE.forEach(block => REMOVE_MAP[block] = true);

/**
 * Tells you whether or not you should delete an element.
 *
 * @param   {HTMLElement} current
 * @returns {Boolean}
 */
function shouldDelete(current) {
  return (
    // Make sure the element actually exists...
    current &&

    // ...and it's empty...
    !current.innerHTML &&

    // ...and it's not a text node...
    current.nodeName !== '#text' &&

    // ...and it's not a block element.
    !BLOCK_ELEMENTS_MAP[current.nodeName]
  );
}

/**
 * Give it a list of blocks and it'll replace some of them with paragraph tags.
 *
 * @param {Array} blocks
 */
function replaceBlocks(blocks) {
  if (blocks.length > 0) {
    blocks.forEach((block) => {
      if (!REPLACE_WITH_P_MAP[block.nodeName]) {
        return;
      }

      block.insertAdjacentHTML('afterend', `<p>${block.innerHTML}</p>`);

      block.parentElement.removeChild(block);
    });
  }
}

function removeBlocks() {
  this.selection.replaceSelection(`
    <div id="removeBlocks">${this.selection.getHtml()}</div>
  `);

  const div = document.getElementById('removeBlocks');

  REMOVE.forEach((type) => {
    const els = div.querySelectorAll(type.toLowerCase());

    Array.prototype.forEach.call(els, (el) => {
      const html = el.innerHTML;

      el.insertAdjacentHTML('afterend', html);

      el.parentElement.removeChild(el);
    })
  });

  div.insertAdjacentHTML('beforebegin', div.innerHTML);

  div.parentElement.removeChild(div);
}

/**
 * Give it a list of blocks and it'll replace some of them with paragraph tags.
 *
 * @param {Array} blocks
 */
function removeAllRemoveFormattingAnchors($editor) {
  const spans = $editor.querySelectorAll('span[class^="start-"]');

  if (!spans.length) {
    return;
  }

  Array.prototype.forEach((span) => span.parentElement.removeChild(span));
}

$.Redactor.prototype.removeFormatting = () => ({
  init() {
    const button = this.button.add('removeFormatting', 'Remove Formatting');

    // Add the instance to the window object for debugging.
    if (!window.r && DEBUG) {
      console.info('Redactor instance stored as "window.r" for debugging.');
      window.r = this;
    }

    this.button.addCallback(button, () => {
      this.inline.removeFormat();

      const blocks = this.selection.getBlocks();

      if (blocks.length > 1) {
        replaceBlocks(blocks);

        removeBlocks.call(this);

        return;
      }

      const html = this.selection.getHtml();
      const id = Date.now();

      this.selection.replaceSelection(
        `${html.replace(/(<([^>]+)>)/ig, '')}<span id="start-${id}"></span>`
      );

      this.buffer.set();

      this.code.sync();

      // Redactor doesn't do a good job of cleaning up HTML. All the code under
      // here gets rid of leftover HTML elements.
      let current = this.$editor[0].querySelector(`#start-${id}`);

      while (shouldDelete(current)) {
        // Store a reference to the next element because we're going to remove
        // the current one and, thus, we'd lose the reference.
        const next = current.nextSibling;

        // Remove it.
        current.parentElement.removeChild(current);

        // And kick off the loop again.
        current = next;
      }

      replaceBlocks(this.selection.getBlocks());

      // Make sure this goes last.
      setTimeout(() => {
        removeBlocks.call(this);
      }, 0);
    });

    this.button.setAwesome('removeFormatting', 'fa-remove');
  },
});
