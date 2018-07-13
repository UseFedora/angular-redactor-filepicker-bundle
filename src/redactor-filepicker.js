$.Redactor.prototype.filepicker = function() {
  return {
    init: function() {
      var button = this.button.add('filepicker', 'Add Image')
      this.button.addCallback(button, this.filepicker.show)

      // make your added button as Font Awesome's icon
      this.button.setAwesome('filepicker', 'fa-image')
    },

    show: function() {
      filepicker.pickAndStore(
        {
          mimetype: 'image/*',
          container: 'modal',
          services: ['CUSTOMSOURCE', 'COMPUTER', 'IMAGE_SEARCH', 'URL', 'DROPBOX', 'GOOGLE_DRIVE', 'SKYDRIVE'],
        },
        {
          location: 'S3',
        },
        this.filepicker.insert,
      )
    },

    insert: function(files) {
      var insert = function(file) {
        this.insert.htmlWithoutClean('<img src="' + file.url + '" class="img-responsive">')
      }.bind(this)

      if (files.length) {
        files.forEach(insert)
      } else if (files.url) {
        insert(files)
      }

      this.code.sync()
    },
  }
}
