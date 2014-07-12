var gulp = require('gulp');
var browserify = require('browserify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');

var paths = {
  scripts: ['js/utils.js', 'dist/rbn.receptionist.js']
};

gulp.task('browserify', function() {
  return browserify('./js/receptionist.js')
      .bundle()
      .pipe(source('rbn.receptionist.js'))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('bundle', function() {
  gulp.src(paths.scripts)
    .pipe(concat('receptionist.browser.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['browserify', 'bundle']);
