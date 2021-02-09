const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

function mainStyle() {
    return gulp.src('./src/scss/**/*.scss') // Scss file location.
        .pipe(sass().on('error', sass.logError)) // If theirs an error on scss file onfiguration it will return a feedback
        .pipe(gulp.dest('/css')) // file destination for converted scss to css
        .pipe(browserSync.stream());
}

const minifyCSS = () => {
    return gulp.src('./src/css/main.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css'));
}

function devWatch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
        gulp.watch('./src/scss/**/*.scss', mainStyle);
        gulp.watch('./src/css/**/*.css', minifyCSS);
        gulp.watch('./src/css/**/*.css').on('change', browserSync.reload);
        gulp.watch('./src/html/**/*.html').on('change', browserSync.reload);
        gulp.watch('./src/js/**/*.js').on('change', browserSync.reload);
        gulp.watch('./*.html').on('change', browserSync.reload);
}

exports.mainStyle = mainStyle;
exports.minifyCSS = minifyCSS;
exports.devWatch = devWatch;