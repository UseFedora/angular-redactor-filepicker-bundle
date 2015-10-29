var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function() {
  libraryPaths = ['src/redactor.js','src/redactor-filepicker.js','src/redactor-fullscreen.js',"src/angular-redactor.js"]
  stream = gulp.src(libraryPaths)
    .pipe(concat("angular-redactor-filepicker.js"))
    .pipe(gulp.dest("."));
  return stream
});
