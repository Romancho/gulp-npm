'use strict';
const clc = require('cli-color');
require('dotenv').config({path: __dirname + '/../../.env'})

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    fs = require('fs'),
    msg = require('gulp-msg'),
    yaml = require('js-yaml'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify-es').default,
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    include = require('gulp-include'),
    imagemin = require('gulp-imagemin'),
    svgmin = require('gulp-svgmin'),
    gulpif = require('gulp-if'),
    svgSprite = require('gulp-svg-sprite'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename');

var config = loadConfig();
var isDev = false;

const env = process.env.APP_ENV;
if (env === 'dev') {
    isDev = true;
    console.info(clc.green.bold('Env: Development'));
} else {
    isDev = false;
    console.info(clc.red.blink.bold('Env: Production'));
}

function loadConfig() {
    var ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}

/** STYLES **/
gulp.task('sass', function () {
    let isSuccess = true;
    return gulp.src([
        config.PATH.src + config.FOLDERS.scss + '/styles.scss'
    ])
        .pipe(gulpif(isDev, sourcemaps.init()))
        .pipe(sass().on('error', function(error) {
            msg.Error('Сборка стилей не прошла.');
            sass.logError(error);
        })).on('end', ()=> {
            if( isSuccess )
                msg.Success(clc.green('Сборка стилей прошла успешно.'));
        })

        .pipe(concat('styles.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            grid: true,
            cascade: false
        }))
        .pipe(gulpif(!isDev, csso()))
        .pipe(gulpif(!isDev, rename({
            suffix: '.min'
        })))
        .pipe(gulpif(isDev, sourcemaps.write('./').on('error', function(error) {
            msg.Error(clc.yellow('Sourcemap CSS не создан.'));
            rename.logError(error);
        }).on('end', ()=> {
            if (isSuccess)
                msg.Success(clc.green('Sourcemap CSS успешно создан.'));
        })))

        .pipe(gulp.dest(config.PATH.web + config.FOLDERS.css))
        .pipe(connect.reload());
});

/** SCRIPTS **/
gulp.task('vendor', function () {
    let isSuccess = true;
    return gulp.src([
        config.PATH.src + config.FOLDERS.js + '/vendor.js'
    ])
        .pipe(include().on('error', function(error) {
            msg.Error(clc.yellow('Общий vendor-JS не создан.'));
            gulp.dest.logError(error);
        }).on('end', ()=> {
            if (isSuccess)
                msg.Success(clc.green('Общий vendor-JS создан.'));
        }))

        .pipe(gulpif(!isDev, uglify().on('error', function(error) {
            msg.Error(clc.red('Минификация vendor-JS не прошла.'));
            uglify()
        }).on('end', ()=> {
            if (isSuccess)
                msg.Success(clc.green('Минификация vendor-JS сделана.'));
        })))
        .pipe(gulpif(!isDev, rename({suffix: '.min'})))
        .on('error', console.log)
        .pipe(gulpif(isDev, sourcemaps.init()))
        .pipe(gulpif(isDev, sourcemaps.write('./').on('error', function(error) {
            msg.Error(clc.yellow('Sourcemap vendor-JS не создан.'));
            gulp.dest.logError(error);
        }).on('end', ()=> {
            if (isSuccess)
                msg.Success(clc.green('Sourcemap vendor-JS успешно создан.'));
        })))
        .pipe(gulp.dest(config.PATH.web + config.FOLDERS.js))
        .pipe(connect.reload());
});

gulp.task('app', function () {
    let isSuccess = true;
    return gulp.src([
        config.PATH.src + config.FOLDERS.js + '/app.js'
    ])
        .pipe(include().on('error', function(error) {
            msg.Error(clc.yellow('Общий app-JS не создан.'));
            gulp.dest.logError(error);
        }).on('end', ()=> {
            if (isSuccess)
                msg.Success(clc.green('Общий app-JS создан.'));
        }))

        .pipe(gulpif(!isDev, uglify().on('error', function(error) {
            msg.Error(clc.red('Минификация app-JS не прошла.'));
            rename({ suffix: '.min' });
            uglify()
        }).on('end', ()=> {
            if (isSuccess)
                msg.Success(clc.green('Минификация app-JS сделана.'));
        })))
        .pipe(gulpif(!isDev, rename({suffix: '.min'})))
        .on('error', console.log)
        .pipe(gulpif(isDev, sourcemaps.init()))
        .pipe(gulpif(isDev, sourcemaps.write('./').on('error', function(error) {
            msg.Error(clc.yellow('Sourcemap app-JS не создан.'));
            gulp.dest.logError(error);
        }).on('end', ()=> {
            if (isSuccess)
                msg.Success(clc.green('Sourcemap app-JS успешно создан.'));
        })))
        .pipe(gulp.dest(config.PATH.web + config.FOLDERS.js))
        .pipe(connect.reload());
});

/**
 * Деплой спрайта с SVG-иконками.
 */
gulp.task('svg_sprite_deploy', function () {
    let isSuccess = true;
    return gulp.src(config.PATH.src + config.FOLDERS.img +'/**/*.svg')
        // remove all fill, style and stroke declarations in out shapes

        // .pipe(gulpif(isDev, cheerio({
        //     run: function ($) {
        //         $('[fill]').removeAttr('fill');
        //         $('[stroke]').removeAttr('stroke');
        //         $('[opacity]').removeAttr('opacity');
        //         $('[style]').removeAttr('style');
        //     },
        //     parserOptions: {xmlMode: true}
        // })))
        // cheerio plugin create unnecessary string '&gt;', so replace it.
        .pipe(gulpif(isDev, replace('&gt;', '>')))
        // build svg sprite
        .pipe(gulpif(isDev, svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg"
                }
            }
        }).on('error', function(error) {
            msg.Error(clc.yellow('DEV: Ошибка создания svg-спрайтов.'));
            gulp.dest.logError(error);
        }).on('end', ()=> {
            if (isSuccess)
                msg.Success(clc.green('DEV: Создания svg-спрайтов'));
        })))
        .pipe(gulpif(!isDev, svgmin({
            js2svg: {
                pretty: true
            }
        })))
        // remove all fill, style and stroke declarations in out shapes
        // .pipe(gulpif(!isDev, cheerio({
        //     run: function ($) {
        //         $('[fill]').removeAttr('fill');
        //         $('[stroke]').removeAttr('stroke');
        //         $('[opacity]').removeAttr('opacity');
        //         $('[style]').removeAttr('style');
        //     },
        //     parserOptions: {xmlMode: true}
        // })))
        // cheerio plugin create unnecessary string '&gt;', so replace it.
        .pipe(gulpif(!isDev, replace('&gt;', '>')))
        // build svg sprite
        .pipe(gulpif(!isDev, svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg"
                }
            }
        }).on('error', function(error) {
            msg.Error(clc.yellow('PROD: Ошибка создания svg-спрайтов.'));
            gulp.dest.logError(error);
        }).on('end', ()=> {
            if (isSuccess)
                msg.Success(clc.green('PROD: Создания svg-спрайтов'));
        })))
        .pipe(gulp.dest(config.PATH.web + config.FOLDERS.img +'/sprite/'));
});

/** IMAGES **/
gulp.task('images', function () {
    let isSuccess = true;
    return gulp.src(config.PATH.src + config.FOLDERS.img + '/**/*.{png,jpg,gif,svg,webp}')
        //.pipe(gulpif(!isDev, imagemin([
        //    imagemin.optipng({optimizationLevel: 3}),
        //    imagemin.jpegtran({progressive: true}),
        //]).on('error', function(error) {
        //    msg.Error(clc.yellow('Изображения не минимзированы.'));
        //    gulp.dest.logError(error);
        //}).on('end', ()=> {
        //    if (isSuccess)
        //        msg.Success(clc.green('Изображения минимзированы'));
        //})))
        .pipe(gulp.dest(config.PATH.web + config.FOLDERS.img).on('error', function(error) {
            msg.Error(clc.yellow('Изображения не скопированы.'));
            gulp.dest.logError(error);
        }).on('end', ()=> {
            if (isSuccess)
                msg.Success(clc.green('Изображения скопированы'));
        }))
});
gulp.task('images2', function () {
    let isSuccess = true;
    return gulp.src(config.PATH.src + '/images/**/*.{png,jpg,gif,svg,webp}')
        //.pipe(gulpif(!isDev, imagemin([
        //    imagemin.optipng({optimizationLevel: 3}),
        //    imagemin.jpegtran({progressive: true}),
        //]).on('error', function(error) {
        //    msg.Error(clc.yellow('Изображения не минимзированы.'));
        //    gulp.dest.logError(error);
        //}).on('end', ()=> {
        //    if (isSuccess)
        //        msg.Success(clc.green('Изображения минимзированы'));
        //})))
        .pipe(gulp.dest(config.PATH.web + '/images').on('error', function(error) {
            msg.Error(clc.yellow('Изображения не скопированы.'));
            gulp.dest.logError(error);
        }).on('end', ()=> {
            if (isSuccess)
                msg.Success(clc.green('Изображения скопированы'));
        }))
});

/** FONTS **/
gulp.task('fonts', function () {
    let isSuccess = true;
    return gulp.src(config.PATH.src + config.FOLDERS.fonts + '/**/*.{ttf,woff,woff2,eot,svg}')
        .pipe(gulp.dest(config.PATH.web + config.FOLDERS.fonts).on('error', function(error) {
            msg.Error(clc.yellow('Шрифты не скопированы.'));
            gulp.dest.logError(error);
        }).on('end', ()=> {
            if (isSuccess)
                msg.Success(clc.green('Шрифты скопированы'));
        }));
});

/** WATCH **/
gulp.task('watch', ['sass', 'vendor', 'app'], function () {
    gulp.watch(config.PATH.src + config.FOLDERS.scss + '/**/*.scss', ['sass']);
    gulp.watch(config.PATH.src + config.FOLDERS.js + '/**/*.js', ['vendor', 'app']);
    gulpif(isDev, gulp.watch(config.PATH.src + config.FOLDERS.img + '/**/*.{png,jpg,gif}', ['images']));
    gulpif(isDev, gulp.watch(config.PATH.src + config.FOLDERS.img + '/**/*.svg', ['svg_sprite_deploy']));
});

gulp.task('deploy', ['sass', 'vendor', 'app', 'images', 'images2', 'svg_sprite_deploy', 'fonts']);
