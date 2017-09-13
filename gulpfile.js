let gulp = require('gulp');
let runElectron = require('gulp-run-electron');
let sass = require('gulp-sass');

gulp.task('electron', function() {
    gulp.src('./')
    .pipe(runElectron());
});

gulp.task('sass', function() {
    gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
    // gulp.watch("./index.html", [runElectron.rerun]); /** */
    // gulp.watch('./css/custom.css', [runElectron.rerun]);
});


gulp.task('default', ['electron', 'sass', 'watch']);
