// Adapted from http://christianalfoni.github.io/javascript/2014/08/15/react-js-workflow.html

var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify'); 
var jade = require('gulp-jade');
 
gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['js/main.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher = watchify(bundler);

    return watcher
    .on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle() // Create new bundle that uses the cache for high performance
        .pipe(source('main.js'))
    // This is where you add uglifying etc.
        .pipe(gulp.dest('./build/'));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle() // Create the initial bundle when starting the task
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('jade', function() {
  gulp.src('jade/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('public/'))
});

gulp.task('css', function() {
  return gulp.src('css/*')
    .pipe(gulp.dest('public/css'));
});

gulp.task('build', ['browserify', 'jade', 'css']);
