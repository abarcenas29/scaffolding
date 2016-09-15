"use strict";
const mkdir = require('mkdir-parents').sync;
const touch = require('touch');

//Make the files
const loc = "../dist/";
const dir = ['api',
             'config',
             'static/fonts',
             'static/images',
             'static/scripts',
             'static/styles',
             'logs',
             'views',
             'uploads'];

//Loop on the dir array to create file
let dirLength = dir.length - 1;
for(let i = 0; i <= dirLength; i++){
    try {
        let dirPath = loc+dir[i];
        mkdir(dirPath,parseInt('0775'));
        //Make the .gitkeep file
        touch.sync(dirPath+"/.gitkeep");
        console.log(dirPath+" created");
    } catch (err) {
        console.error(err);
        console.log("Dir not created.");
    }
}