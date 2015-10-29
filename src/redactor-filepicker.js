$.Redactor.prototype.filepicker = function() {
  return {
    init: function() {
      var button = this.button.add('filepicker', 'Add Image');
      this.button.addCallback(button, this.filepicker.show);

      // make your added button as Font Awesome's icon
      this.button.setAwesome('filepicker', 'fa-image');
    },
    show: function() {
      filepicker.pick(this.filepicker.insert, {
        mimetype: 'image/*',
        container: 'modal',
        services: [
          "COMPUTER",
          "IMAGE_SEARCH",
          "URL",
          "FTP"
        ]
      });

    },
    insert: function(object) {
      html = "<img src='" + object.url + " class='img-responsive'>"

      this.insert.html(html);

      this.code.sync();

    }
  };
};
