const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/**/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js', 'node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
        'node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
        'node_modules/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js', 'node_modules/tilt.js/dest/tilt.jquery.min.js',
        'node_modules/gsap/src/minified/TweenMax.min.js', 'node_modules/gsap/src/minified/TimelineMax.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

// Serve the fonts
gulp.task('fonts', function() {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('src/assets/fonts/font-awesome'))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        server: {
            baseDir: "./src",
            index: "home.html"
        }
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/**/*.scss'], gulp.series('sass'));
    gulp.watch("src/**/*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.parallel('js', 'fonts', 'serve'));