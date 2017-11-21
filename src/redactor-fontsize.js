/* globals $ */

const fonts = [10, 11, 12, 14, 16, 18, 20, 24, 28, 30];

$.Redactor.prototype.fontsize = () => ({
  init() {
    const dropdown = {};

    fonts.forEach((s, i) => {
      dropdown[`s${i}`] = {
        title: `${s}px`,
        func: () => {
          this.fontsize.set(s);
        },
      };
    });

    dropdown.remove = {
      title: 'Remove Font Size',
      func: this.fontsize.reset,
    };

    const button = this.button.add('fontsize', 'Change Font Size');

    this.button.addDropdown(button, dropdown);
  },

  set(size) {
    this.inline.format('span', 'style', `font-size: ${size}px;`);
  },

  reset() {
    this.inline.removeStyleRule('font-size');
  },
});
