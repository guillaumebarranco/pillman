var gulp      = require('gulp');
var concat    = require('gulp-concat');
var sass      = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename    = require('gulp-rename');

var paths = {
  sass: ['./src/assets/sass/*.scss']
};

gulp.task('default', ['style']);

gulp.task('style', function(done) {
  gulp.src(paths.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./src/assets/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./css/'))
    .on('end', done);
});

gulp.task('style:watch', function() {
  gulp.watch(paths.sass, ['style']);
});
