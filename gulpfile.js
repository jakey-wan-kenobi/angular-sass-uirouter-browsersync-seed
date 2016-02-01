var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

var paths = {
    sass: ['./scss/**/*.scss']
};


gulp.task('default', ['sass', 'watch']);

 
gulp.task('sass', function(done) {
  gulp.src('./scss/app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/css/'))
    .pipe(cssnano())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./app/css/'))
    .on('end', done);
});
 

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);

});

gulp.task('open', function(){
  browserSync.init({
    server: {
        baseDir: "app"
    }
  })
});

gulp.task('reload', function() {
    browserSync.reload();
})

gulp.watch('./app/**/*.js', ['reload']);
gulp.watch('./app/**/*.html', ['reload']);
//gulp.watch('./scss/**/*.scss', ['reload']);
gulp.watch('./app/css/*', function() {
  // grab css files and send them into browserSync.stream
  // this injects the css into the page
  gulp.src('./app/css/*')
        .pipe(browserSync.stream());
    });