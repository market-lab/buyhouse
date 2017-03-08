var path      = require('path');
var gulp      = require('gulp');
var svgstore  = require('gulp-svgstore');

/* Development Tasks */

var sass        = require('gulp-sass');
var svgmin      = require('gulp-svgmin');
var browserSync = require('browser-sync').create();

gulp.task('dev', ['sass', 'svg-dev'], function() {
  browserSync.init({
    server: "./app"
  });

  gulp.watch("app/sass/*.scss", ['sass']);
  gulp.watch("app/images/*.svg", ['svg-dev']);
  gulp.watch("app/*.html").on('change', browserSync.reload);
  gulp.watch("app/js/*.js").on('change', browserSync.reload);
});

gulp.task('sass', function() {
  return gulp.src("app/sass/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

gulp.task('svg-dev', function() {
  return gulp
    .src('app/images/*.svg')
    .pipe(svgmin(function (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
        return {
          plugins: [{
            cleanupIDs: {
              prefix: prefix + '-',
              minify: true
            }
          }]
        }
      }))
    .pipe(svgstore())
    .pipe(gulp.dest('app/images'))
    .pipe(browserSync.stream());
});

/* Production/Build Tasks */

var uglify      = require("gulp-uglify");
var inject      = require('gulp-inject');
var runSequence = require('run-sequence');
var imagemin    = require('gulp-imagemin');
var cleanCSS    = require("gulp-clean-css");
var minifyHtml  = require("gulp-minify-html");

gulp.task('build', function() {
  runSequence( ['minify-js', 'minify-css', 'minify-img', 'inline-svg'],
               'minify-html' );
});

gulp.task('minify-js', function() {
  gulp.src('app/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js/'));
});

gulp.task('minify-css', function() {
  gulp.src("app/sass/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("app/css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/css/'));
});

gulp.task('minify-img', function() {
  gulp.src('app/images/icon/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/images/icon'));
});

gulp.task('inline-svg', function() {
  var svgs = gulp
    .src('app/images/*.svg')
    .pipe(svgstore({ inlineSvg: true }));

  function fileContents(filePath, file) {
    return file.contents.toString();
  }

  return gulp
    .src('app/*.html')
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(gulp.dest('build/'));
});

gulp.task('minify-html', function() {
  gulp.src("build/*.html")
    .pipe(minifyHtml())
    .pipe(gulp.dest("build/"));
});