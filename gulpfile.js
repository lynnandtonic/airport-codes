var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var webserver = require('gulp-webserver');
var jade = require('gulp-jade');
var data = require('gulp-data');
var stylus = require('gulp-stylus');
var deploy = require('gulp-gh-pages');

var bundler = watchify(browserify('./src/App.js', watchify.args));

gulp.task('build-js', bundle); // so you can run `gulp js` to build the file
bundler.on('update', bundle); // on any dep update, runs the bundler

function bundle() {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app.js'))
    // optional, remove if you dont want sourcemaps
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./build'));
}

function buildStatic() {
  return gulp.src('assets/**/*')
    .pipe(gulp.dest('build'));
}

function buildStylus() {
  return gulp.src('assets/app.styl')
    .pipe(stylus())
    .pipe(gulp.dest('build'));
}

function buildJade() {
  return gulp.src('./templates/**/*.jade')
    .pipe(data(function() {
      return require('./data');
    }))
    .pipe(jade())
    .pipe(gulp.dest('build'));
}

gulp.task('webserver', function() {

  var stylWatcher = gulp.watch('assets/**/*.styl', ['build-stylus']);
  var imageWatcher = gulp.watch('assets/**/*', ['build-static']);
  var jadeWatcher = gulp.watch('templates/**/*.jade', ['build-templates']);

  gulp.src('build')
    .pipe(webserver({
      port: 3456,
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('build-static', function() {
  return buildStatic();
});

gulp.task('build-templates', function() {
  return buildJade();
});

gulp.task('build-stylus', function () {
  return buildStylus();
});

gulp.task('default', ['build-templates', 'build-stylus', 'build-static', 'build-js', 'webserver']);

gulp.task('build', ['build-templates', 'build-stylus', 'build-static'], function() {
  bundle();
});

gulp.task('deploy', ['build'], function () {
  return gulp.src("./build/**/*")
    .pipe(deploy({
      cacheDir: './tmp'
    }));
});