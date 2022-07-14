const {
    src,
    dest,
    task,
    series,
    watch,
    parallel
} = require('gulp')
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

task('clean', () => {
    console.log(env);
    return src('dist/**/*', {
        read: false
    }).pipe(rm());
});

task('copy:html', () => {
    return src("src/*.html")
        .pipe(dest('dist'))
        .pipe(reload({
            stream: true
        }));
});

const img = [
    'src/**/**/*.png',
    'src/**/marker.svg',
    'src/**/player/**.svg',
    'src/**/sprite.svg'
];




task('copy:img', () => {
    return src(img)
        .pipe(dest('dist'))
        .pipe(reload({
            stream: true
        }));
});

const styles = [
    'node_modules/normalize.css/normalize.css',
    'src/styles/main.scss'
];

task("styles", () => {
    return src(styles)
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        // .pipe(gcmq())
        .pipe(gulpif(env === 'dev',
            autoprefixer({
                cascade: false
            })
        ))
        .pipe(gulpif(env === 'prod', gcmq()))
        .pipe(gulpif(env === 'prod', cleanCSS()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest('dist'))
        .pipe(reload({
            stream: true
        }));
});


task('scripts', () => {
    return src("src/scripts/*.js")
        .pipe(gulpif(env === 'dev', sourcemaps.init()))
        .pipe(concat('main.js'))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulpif(env === 'dev', sourcemaps.write()))
        .pipe(dest('dist'))
        .pipe(reload({
            stream: true
        }));
})


task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

task("watch", () => {
    watch('./src/styles/**/*.scss', series("styles"));
    watch('./src/*.html', series("copy:html"));
    watch('./src/scripts/*.js', series("scripts"));


});



task(
    "default",
    series("clean", parallel("copy:html", "copy:img", "styles", "scripts"), parallel("server", "watch"))
);

task(
    "build",
    series("clean", parallel("copy:html", "copy:img", "styles", "scripts"))

)