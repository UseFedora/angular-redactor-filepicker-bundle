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
        services: ["CUSTOMSOURCE, COMPUTER, IMAGE_SEARCH, URL, FTP, DROPBOX, GOOGLE_DRIVE, SKYDRIVE, CONVERT, IMGUR"],
        convert_options:  ["crop", "rotate", "filter"]
      },
      {
        location:"S3"
      });

    },
    insert: function(object) {
      image_url = "https://d2vvqscadf4c1f.cloudfront.net/" + encodeURIComponent(object.key);
      html = "<img src='" + image_url + "' class='img-responsive'>"
      this.insert.htmlWithoutClean(html);

      this.code.sync();

    }
  };
};
