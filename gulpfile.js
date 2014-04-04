var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

var scripts = ['src/js/client.js', '!src/vendor'];

gulp.task('scripts', function () {
    'use strict';
    return gulp.src(scripts)
        .pipe(plumber())
        .pipe(browserify())
        .pipe(rename('bundled.js'))
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function () {
    'use strict';
    gulp.watch('src/js/**/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);
