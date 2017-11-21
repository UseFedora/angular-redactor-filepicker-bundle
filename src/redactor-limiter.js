/* globals jQuery */

const $ = jQuery;

$.Redactor.prototype.limiter = () => ({
  init() {
    if (!this.opts.limiter) {
      return;
    }

    this.core.editor().on('keydown.redactor-plugin-limiter', $.proxy((e) => {
      const key = e.which;
      const ctrl = e.ctrlKey || e.metaKey;

      if (
        key === this.keyCode.BACKSPACE ||
        key === this.keyCode.DELETE ||
        key === this.keyCode.ESC ||
        key === this.keyCode.SHIFT ||
        (ctrl && key === 65) ||
        (ctrl && key === 82) ||
        (ctrl && key === 116)
      ) {
        /* eslint consistent-return: 0 */
        return;
      }

      let text = this.core.editor().text();
      text = text.replace(/\u200B/g, '');

      const count = text.length;

      if (count >= this.opts.limiter) {
        return false;
      }
    }, this));
  },
});
