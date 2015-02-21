var gulp = require('gulp');

gulp.task('default', function() {
    // place code for your default task here    
});


var browserSync = require('browser-sync');
var reload = browserSync.reload;

// watch files for changes and reload
gulp.task('serve', function() {
    browserSync({
      server: {
      baseDir: 'app'
      }
    });

    gulp.watch(['*.html', 'styles/**/*.css', 'js/**/*.js'], {cwd: 'app'}, reload);
                                                          
});

var gp_uglify = require('gulp-uglify');
var gp_rename = require('gulp-rename');
var gp_concat = require('gulp-concat');

gulp.task('add_bc', function() {
     gulp.src(['bower_components/jquery/dist/jquery.min.js','bower_components/angular/angular.min.js', 'bower_components/bootstrap/dist/js/bootstrap.min.js']) 
        .pipe(gulp.dest('app/js'))
  });

 
gulp.task('compress', function() {
     gulp.src(['bower_components/jquery/dist/jquery.min.js','bower_components/angular/angular.min.js', 'bower_components/bootstrap/dist/js/bootstrap.min.js', 'app/js/*.js'])
         .pipe(gp_concat('concat.js'))
         .pipe(gulp.dest('dist'))
         .pipe(gp_rename('uglify.js'))
         .pipe(gp_uglify())
         .pipe(gulp.dest('dist'))
 });
