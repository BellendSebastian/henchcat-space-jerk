var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
//var jsdoc = require('gulp-jsdoc');

var scripts = ['src/js/client.js', '!src/vendor'];

gulp.task('scripts', function () {
    'use strict';
    return gulp.src(scripts)
        .pipe(plumber())
        .pipe(browserify())
        .pipe(rename('bundled.js'))
        .pipe(gulp.dest('./public/js/'));
});

/*
gulp.task('jsdoc', function () {
    'use strict';
    return gulp.src(scripts)
        .pipe(jsdoc('./docs'));
});
*/

gulp.task('watch', function () {
    'use strict';
    gulp.watch('src/js/**/*.js', ['scripts'/*, 'jsdoc'*/]);
});

gulp.task('default', ['scripts', 'watch']);
