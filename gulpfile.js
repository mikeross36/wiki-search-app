"use strict"
const { src, dest, watch, series, parallel } = require("gulp")

const sass = require("gulp-sass")(require("sass"))
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const postcss = require("gulp-postcss")
const terser = require("gulp-terser")
const concat = require("gulp-concat")
const sourcemaps = require("gulp-sourcemaps")

const files = {
    scssPath: "app/scss/**/*.scss",
    jsPath: "app/js/**/*.js"
};

function scssTask() {
    return src(files.scssPath)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(dest("dist/css/"))
};

function jsTask() {
    return src(files.jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat("all.js"))
    .pipe(terser())
    .pipe(sourcemaps.write())
    .pipe(dest("dist/js/"))
};

function watchTask() {
    watch([files.scssPath, files.jsPath], parallel(scssTask, jsTask))
};

exports.default = series(parallel(scssTask, jsTask), watchTask)
exports.build = series(parallel(scssTask, jsTask))

