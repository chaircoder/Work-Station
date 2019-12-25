var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    minify = require('gulp-minify');

gulp.task('html', function () {
  return gulp.src('src/html/*.pug')
          .pipe(pug({
            pretty: true
          }))
          .pipe(gulp.dest('dist'))
          .pipe(livereload())
});

// Css Task
gulp.task('css', function () {
  return gulp.src(["src/css/**/*.css", "src/css/**/*.scss"])
          .pipe(sourcemaps.init())
          .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
          .pipe(autoprefixer())
          .pipe(concat('main.css'))
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest('dist/css'))
          .pipe(livereload())
});

// JS Task
gulp.task('js', function () {
  return gulp.src("src/js/*.js")
          .pipe(concat('main.js'))
          .pipe(minify())
          .pipe(gulp.dest('dist/js'))
          .pipe(livereload())
});
//Images
gulp.task('image',function(){
  gulp.src('src/imgs/*.*')
      .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
      
      ]))
      .pipe(gulp.dest('dist/imgs'))
      .pipe(livereload())

});

// Watch Tasks
gulp.task('watch', function () {
  require('./server.js');
  livereload.listen();
  gulp.watch("src/html/**/*.pug", gulp.series('html'));
  gulp.watch(["src/css/**/*.css", "src/css/**/*.scss"], gulp.series('css'));
  gulp.watch("src/imgs/*.*", gulp.series('image'));
  gulp.watch("src/js/*.js", gulp.series('js'));
});
// gulp.task('default', ['imagemin','js','css','html','watch']);
