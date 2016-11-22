var gulp = require('gulp');
var electron = require('electron');
var childProcess = require('child_process');

//start the electron app
gulp.task('start', ['build'], function () {
  childProcess
    .spawn(electron, ['./app'], {
      stdio: 'inherit'
    })
    .on('close', function () {
      process.exit();
    })
});

//sign and package app for distribution
gulp.task('dist', ['build'], function () {
  var build = childProcess.spawn('node_modules/.bin/build', ['-wml']);
  build.stdout.on('data', (data) => {
    console.log(`${data}`);
  });
  build.stderr.on('data', (data) => {
    console.log(`${data}`);
  });
});