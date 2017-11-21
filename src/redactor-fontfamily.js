/* globals $ */

const fonts = [
  'Arial',
  'Helvetica',
  'Georgia',
  'Times New Roman',
  'Monospace',
  'Proxima',
  'Alegreya',
  'Lato',
  'Lucida Sans Unicode',
  'Merriweather',
  'OpenSans',
  'Palatino',
  'Raleway',
  'SourceSansPro',
];

$.Redactor.prototype.fontfamily = () => ({
  init() {
    const dropdown = {};

    fonts.forEach((s, i) => {
      dropdown[`s${i}`] = {
        title: s,
        func: () => {
          this.fontfamily.set(s);
        },
      };
    });

    dropdown.remove = {
      title: 'Use Default Font',
      func: this.fontfamily.reset,
    };

    const button = this.button.add('fontfamily', 'Change Font Family');

    this.button.addDropdown(button, dropdown);
  },

  set(value) {
    this.inline.format('span', 'style', `font-family: ${value};`);
  },

  reset() {
    this.inline.removeStyleRule('font-family');
  },
});
