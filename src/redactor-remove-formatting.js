// Set to true to get helpful debugging stuff logged to the console.
const DEBUG = true;

// A list of elements you shouldn't delete, since they're outer block elements.
const BLOCK_ELEMENTS = {
  P: true,
  H1: true,
  H2: true,
  H3: true,
  H4: true,
  H5: true,
  HR: true,
  LI: true,
  OL: true,
  UL: true,
  IMG: true,
  CODE: true,
  BLOCKQUOTE: true,
};

/**
 * @param   {HTMLElement} current
 * @returns {Boolean}
 */
const shouldDelete = (current) => {
  return (
    // Make sure the element actually exists...
    current &&

    // ...and it's empty...
    !current.innerHTML &&

    // ...and it's not a text node...
    current.nodeName !== '#text' &&

    // ...and it's not a block element.
    !BLOCK_ELEMENTS[current.nodeName]
  );
};

$.Redactor.prototype.removeFormatting = () => ({
  init() {
    const button = this.button.add('removeFormatting', 'Clear Block Formatting');

    // Add the instance to the window object for debugging.
    if (!window.r && DEBUG) {
      console.info('Redactor instance stored on the window object as "r".')
      window.r = this;
    }

    this.button.addCallback(button, () => {
      this.inline.removeFormat();

      const html = this.selection.getHtml();
      const block = this.selection.getBlock();

      if (html === block.outerHTML) {
        return;
      }

      const id = Date.now();

      this.selection.replaceSelection(
        `${html.replace(/(<([^>]+)>)/ig, '')}<span id="start-${id}"></span>`
      );

      this.buffer.set();

      this.code.sync();

      // Redactor doesn't do a good job of cleaning up HTML. All the code under
      // here gets rid of leftover HTML elements.
      let current = block.querySelector(`#start-${id}`);

      while (shouldDelete(current)) {
        // Store a reference to the next element because we're going to remove
        // the current one and, thus, we'd lose the reference.
        const next = current.nextSibling;

        // Remove it.
        current.parentElement.removeChild(current);

        // And kick off the loop again.
        current = next;
      }
    });

    this.button.setAwesome('removeFormatting', 'fa-remove');
  },
});
