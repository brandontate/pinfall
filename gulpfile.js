var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('default', ['serve', 'sass', 'js'], function() {
    gulp.watch('js/*.js', ['compress']);
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch(['*.html', 'styles/**/*.css', 'js/**/*.js'], {cwd: 'app'}, reload);
});

//Sass-CSS
gulp.task('sass', function() {
    return $.rubySass('scss/main.scss')
        .pipe(gulp.dest('app/styles'))
        .pipe($.rename('main.css'))
        .pipe(reload({ stream:true }));
});

gulp.task('serve', function() {
    browserSync({
      server: {
      baseDir: 'app'
      }
    });                                                    
});

//Concat-Uglify Javascript
gulp.task('js', function() {
     gulp.src('js/main.js')
         .pipe($.concat('main.concat.js'))
         .pipe(gulp.dest('dist'))
         .pipe($.rename('main.min.js'))
         .pipe($.uglify())
         .pipe(gulp.dest('app/js')),
     gulp.src('js/controllers/*.js')
         .pipe($.concat('controllers.concat.js'))
         .pipe(gulp.dest('dist'))
         .pipe($.rename('controllers.min.js'))
         .pipe($.uglify())
         .pipe(gulp.dest('app/js/controllers')),
     gulp.src('js/factories/*.js')
         .pipe($.concat('factories.concat.js'))
         .pipe(gulp.dest('dist'))
         .pipe($.rename('factories.min.js'))
         .pipe($.uglify())
         .pipe(gulp.dest('app/js/factories'))
 });
