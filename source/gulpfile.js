"use strict";
/**
 * Created by aldri on 17/11/2015.
 */
const gulp            = require('gulp');
const _               = require('underscore');
const mainBowerFiles  = require('gulp-main-bower-files');
const rename          = require('gulp-rename');
const del             = require('del');
const fse             = require('fs-extra');
const path            = require('path');
/*
  Javascript
  convert to TypeScript
*/
// const coffee    = require('gulp-coffee');
// const coffeeson = require('coffeeson');
const ngAnnotate= require('gulp-ng-annotate');
const uglify    = require('gulp-uglify');
const concat    = require('gulp-concat');
const sourcemap = require('gulp-sourcemaps');
/*
  CSS
*/
const sass      = require('gulp-ruby-sass');
const prefixer  = require('gulp-autoprefixer');
const minifyCSS = require('gulp-clean-css');
/*
  HTML Template
*/
//const jade = require('gulp-jade');

//Node App compiler
const nodeSrc = []; // Angular directories
gulp.task('node-js-strict',function(){
    gulp.src(nodeSrc)
        .pipe(plumber())
        //choose between typescript or coffee
        .pipe()
        .pipe(gulp.dest('../dist'));
});

//Angular Compiler
const angularSrc = []; // Angular directories
gulp.task('angular-scripts',function(){
    gulp.src(angularSrc)
        .pipe(plumber())
        .pipe(ngAnnotate({single_quotes:true}))
            //choose between TypeScript or Coffee
            .pipe()
            .pipe(concat('angular.min.js'))
            .pipe(uglify())
            .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('../dist/static/scripts'));
});

//SASS Compiler
const sassConfig = {
    src:'',
    dest:''
};
gulp.task('sass',function(){
    sass(sassConfig.src).pipe(plumber())
                        .on('error',sass.logError)
                        .pipe(prefixer())
                        .pipe(minifyCSS())
                        .pipe(gulp.dest(sassConfig.dest));
});

//Put HTML compiler if needed