let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync').create();
let useref = require('gulp-useref');
let uglify = require('gulp-uglify');
let del = require('del');
let babel  = require('gulp-babel');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let cleanCSS = require('gulp-clean-css');

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js', function () {
  return gulp.src('app/jsx/**/*.js')
    .pipe(babel())
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('watch', ['browserSync', 'sass', 'js'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/jsx/**/*.js', ['js']);
  gulp.watch('app/*.html', browserSync.reload);
});