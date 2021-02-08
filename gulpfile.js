const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function mainStyle() {
    return gulp.src('./src/scss/**/*.scss') // Scss file location.
        .pipe(sass().on('error', sass.logError)) // If theirs an error on scss file onfiguration it will return a feedback
        .pipe(gulp.dest('./dist/css')) // file destination for converted scss to css
        .pipe(browserSync.stream());
}

function devWatch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
        gulp.watch('./src/scss/**/*.scss', mainStyle);
        gulp.watch('./src/html/**/*.html').on('change', browserSync.reload);
        gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
        gulp.watch('./*.html').on('change', browserSync.reload);
}

exports.mainStyle = mainStyle;
exports.devWatch = devWatch;