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
var shell = require('gulp-shell');
var rimraf = require('gulp-rimraf');

var bundler = watchify(browserify('./src/App.js', watchify.args));

gulp.task('build-js', ['rm-temp-json', 'make-json'], bundle); // so you can run `gulp js` to build the file
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
      return require('./dist/index');
    }))
    .pipe(jade())
    .pipe(gulp.dest('build'));
}

gulp.task('rm-temp-json', function() {
  return gulp.src('./dist/*.js', { read: false })
    .pipe(rimraf());
});

gulp.task('make-json', ['rm-temp-json'], shell.task([
  'node ./makeJson.js'
]));

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

gulp.task('build-static', ['rm-temp-json', 'make-json'], function() {
  return buildStatic();
});

gulp.task('build-templates', ['rm-temp-json', 'make-json'], function() {
  return buildJade();
});

gulp.task('build-stylus', ['rm-temp-json', 'make-json'],function () {
  return buildStylus();
});

gulp.task('default', ['rm-temp-json', 'make-json', 'build-templates', 'build-stylus', 'build-static', 'build-js', 'webserver']);

gulp.task('build', ['rm-temp-json', 'make-json', 'build-templates', 'build-stylus', 'build-static'], function() {
  bundle();
});

gulp.task('deploy', ['build'], function () {
  return gulp.src("./build/**/*")
    .pipe(deploy({
      cacheDir: './tmp'
    }));
});
