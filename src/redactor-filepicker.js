$.Redactor.prototype.filepicker = function() {
  return {
    init: function() {
      var button = this.button.add('filepicker', 'Add Image');
      this.button.addCallback(button, this.filepicker.show);

      // make your added button as Font Awesome's icon
      this.button.setAwesome('filepicker', 'fa-image');
    },
    show: function() {
      filepicker.pick({
        mimetype: 'image/*',
        container: 'modal',
        services: [
          "COMPUTER",
          "CUSTOMSOURCE",
          "DROPBOX",
          "FTP",
          "GOOGLE_DRIVE",
          "IMAGE_SEARCH",
          "SKYDRIVE",
          "URL",
        ],
      },
      {
        location:"S3"
      });

    },
    insert: function(object) {
      html = "<img src='" + object.url + "' class='img-responsive'>"
      this.insert.htmlWithoutClean(html);

      this.code.sync();

    }
  };
};
