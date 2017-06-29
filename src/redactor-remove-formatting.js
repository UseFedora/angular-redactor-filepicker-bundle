let id = 0;

$.Redactor.prototype.removeFormatting = () => ({
  init() {
    const button = this.button.add('removeFormatting', 'Clear Block Formatting');

    if (!window.r) {
      window.r = this;
    }

    this.button.addCallback(button, () => {
      this.inline.removeFormat();

      const html = this.selection.getHtml();
      const block = this.selection.getBlock();

      if (html === block.outerHTML) {
        return;
      }

      this.selection.replaceSelection(
        `${html.replace(/(<([^>]+)>)/ig, '')}<span id="start-${id}"></span>`
      );

      this.buffer.set();

      this.code.sync();

      let current = block.querySelector(`#start-${id}`);

      while (
        current &&
        current.nodeName !== '#text' &&
        current.nodeName !== 'P'
      ) {
        const next = current.nextSibling;

        current.parentElement.removeChild(current);

        current = next;
      }
    });

    this.button.setAwesome('removeFormatting', 'fa-remove');
  },
});
