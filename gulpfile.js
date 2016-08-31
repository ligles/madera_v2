/**
 * Created by ligles on 31/08/16.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
const reload = browserSync.reload;


gulp.task('serve', function(){


    browserSync.init({
        port: 3000,
        server: {
            baseDir: "./"
        }
    });



    gulp.watch([
        'app.js',
        'index.html'
    ]).on('change', reload);


});

