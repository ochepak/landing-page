'use strict';

var gulp = require('gulp'),
    mainBowerFiles = require('main-bower-files'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    vendor: {
        js: 'app/js/',
        css: 'app/css/'
    },
    dist: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        fonts: 'dist/fonts/'
    },
    app: {
        html: 'app/*.html',
        js: 'app/js/*.js',
        sass: 'app/sass/*.scss',
        css: 'app/css/*.css',
        img: 'app/img/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    watch: {
        html: 'app/**/*.html',
        js: 'app/js/**/*.js',
        sass: 'app/sass/**/*.scss',
        css: 'app/css/**/*.css',
        img: 'app/img/**/*.*',
        fonts: 'app/fonts/**/*.*'
    },
    clean: './dist'
};

var config = {
    server: {
        baseDir: "./dist"
    },
    tunnel: false,
    host: 'localhost',
    port: 8080,
    logPrefix: "OCHEPAK"
};

gulp.task('vendorJs:build', function () {
    gulp.src(mainBowerFiles('**/*.js'))
        .pipe(gulp.dest(path.vendor.js))
});

gulp.task('vendorCss:build', function () {
    gulp.src(mainBowerFiles('**/*.css')) 
        .pipe(gulp.dest(path.vendor.css))
});

gulp.task('html:build', function () {
    gulp.src(path.app.html)
        .pipe(gulp.dest(path.dist.html))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('js:build', function () {
    gulp.src(path.app.js)
        .pipe(gulp.dest(path.dist.js))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('sass:build', function () {
    gulp.src(path.app.sass)
        .pipe(sourcemaps.init())
        .pipe(sass()) 
        .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('css:build', function () {
    gulp.src(path.app.css)
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('image:build', function () {
    gulp.src(path.app.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.dist.img))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('fonts:build', function () {
    gulp.src(path.app.fonts)
        .pipe(gulp.dest(path.dist.fonts))
});

gulp.task('build', [
    'vendorCss:build',
    'vendorJs:build',
    'html:build',
    'js:build',
    'sass:build',
    'css:build',
    'fonts:build',
    'image:build'
]);

gulp.task('watch', function () {
    watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.sass], function (event, cb) {
        setTimeout(function(){gulp.start('sass:build');},500)
    });
    watch([path.watch.css], function (event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);