'use strict'

var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify-es').default;
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var pump = require('pump');
var order = require("gulp-order");

let cleanCSS = require('gulp-clean-css');

gulp.task('copy', function() {
  gulp.src('index.php')
  .pipe(gulp.dest('assets'))
});

gulp.task('log', function() {
  gutil.log('== My Log Task ==')
});

gulp.task('js', function() {
  gulp.src('src/*.js')
  .pipe(gulp-uglify-es())
  .pipe(concat('script.js'))
  .pipe(gulp.dest('assets'))
});

gulp.task('concat_js', function() {
  gulp.src('src/*.js')
  // gulp.src('dist/*.js')
  .pipe(order(['shopapp.module.js',
  'loading.component.js',
  'loading.interceptor.js',
  'data.module.js',
  'shopdata.service.js',
  'home.controller.js',
  'modalinstance.controller.js',
  'items.component.js',
  'items.controller.js',
  'cart.component.js',
  'cart.controller.js',
  'checkout.component.js',
  'checkout.controller.js',
  'verify.component.js',
  'verify.controller.js',
  'changepassword.component.js',
  'changepassword.controller.js',
  'admin.component.js',
  'admin.controller.js',
  'routes.js']))
  .pipe(concat('script.js'))
  .pipe(gulp.dest('assets/scripts'))
});

gulp.task('gulp-minify', function (cb) {
  pump([
    gulp.src('assets/scripts/script.js'),
    minify(),
    gulp.dest('dist')
  ], cb);
});

gulp.task('gulp-uglify-es', function (cb) {
  pump([
    // gulp.src('assets/scripts/script.js'),
    gulp.src('src/*.js'),
    uglify(),
    // concat('script.js'),
    gulp.dest('dist')
  ], cb);
});

gulp.task('concat_css', function() {
  gulp.src('assets/css/*.css')
  .pipe(concat('styles.css'))
  .pipe(gulp.dest('dist'))
});

gulp.task('minify-css', () => {
  return gulp.src('css/*.css')
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest('assets/css'));
});

gulp.task('uglify-error-debugging', function (cb) {
  pump([
    gulp.src('src/*.js'),
    uglify(),
    gulp.dest('dist')
  ], cb);
});
