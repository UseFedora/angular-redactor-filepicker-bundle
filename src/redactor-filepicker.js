$.Redactor.prototype.filepicker = () => ({
  init() {
    const button = this.button.add('filepicker', 'Add Image');

    this.button.addCallback(button, this.filepicker.show);

    // make your added button as Font Awesome's icon
    this.button.setAwesome('filepicker', 'fa-image');
  },

  show() {
    filepicker.pick(this.filepicker.insert, {
      mimetype: 'image/*',
      container: 'modal',
      services: ["CUSTOMSOURCE, COMPUTER, IMAGE_SEARCH, URL, FTP, DROPBOX, GOOGLE_DRIVE, SKYDRIVE"]
    },
    {
      location:"S3"
    });
  },

  insert(object) {
    html = `<img src=${object.url} class='img-responsive'>`;

    this.insert.htmlWithoutClean(html);

    this.code.sync();
  }
});
