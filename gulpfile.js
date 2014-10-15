'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var protractor = require('gulp-protractor').protractor;

gulp.task('default', ['test', 'sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('test', function() {
  gulp.src(['./test/e2e/main/**.js'])
    .pipe(protractor({
      configFile: './test/protractor.conf.js',
      args: ['--baseUrl', 'http://127.0.0.1:3000']
    }))
    .on('error', function(e) {
      throw e;
    });
});

// Watch Files For Changes & Reload
gulp.task('serve', ['sass'], function () {
  browserSync({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: 'www'
    }
  });

  gulp.watch(['www/**/*.html'], reload);
  gulp.watch(['scss/**/*.scss'], ['sass', reload]);
  gulp.watch(['www/js/**/*.js'], reload);
  gulp.watch(['www/img/**/*'], reload);
});
