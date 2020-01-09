const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const watch = require('gulp-watch');
 

let scssArr = [
    './app/scss/main.scss',
    './app/scss/_header.scss',
    './app/scss/_content.scss',
    './app/scss/_sidebar.scss',
    './app/scss/_footer.scss'
]

let jsArr = [
    './app/js/main.js',
    './app/js/file.js',
    './app/js/topNavBtn.js'
]

function scripts(){
    return gulp.src(jsArr)
        .pipe(concat('scripts.js'))
        .pipe( gulp.dest('./app'))
        .pipe(browserSync.stream());
}

function conc(){
    return gulp.src(scssArr)
        .pipe(concat('style.scss'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/scss/style'))
        .pipe(browserSync.stream());

}

function sassKomp(){
    return gulp.src('app/scss/style/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass()).on('error', sass.logError)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
}

function cssMin(){
    return gulp.src('app/css/style.css')
        .pipe(cleanCSS({
            level: 2
    
    }))
        .pipe( gulp.dest('app/css/'))
        .pipe(browserSync.stream());
}

function watch1(){
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });
    gulp.watch('./app/scss/*.scss', gulp.series(conc, sassKomp, cssMin))
    gulp.watch('./app/js/*.js', scripts);
    gulp.watch("./app/*.html").on('change', browserSync.reload);
}

gulp.task('conc', conc);

gulp.task('sassKomp', sassKomp);

gulp.task('cssMin', cssMin);

gulp.task('build', gulp.series(conc, sassKomp, cssMin));

gulp.task('watch', watch1);

gulp.task('scripts', scripts);