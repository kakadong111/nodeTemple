var gulp = require('gulp');
var watch = require('gulp-watch');
var mocha = require('gulp-mocha');
//var mount = require('mount-routes');
var logger = require('tracer').console();


// 命令行传递进来的参数
// $ gulp --run add
var source_path = [];
logger.info(gulp.env);
if ((gulp.env.test === 'play'))
    source_path = ['test/**/test.play.js', 'controllers/**/*.js', 'services/**/*.js'];
else if (gulp.env.test === 'add')
    source_path = ['test/**/test.addCdnPlayURL.js'];
else
    source_path = ['test/**/*.js', 'controllers/**/*.js', 'services/**/*.js'];
logger.info("source_path=%s;", source_path);

// tasks
gulp.task('watch', function () {
    gulp.watch(source_path, ['mocha']);
});

gulp.task('mocha', function () {
    return gulp.src(source_path, {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it 
        .pipe(mocha({reporter: 'spec'}));
});

//gulp.task('routes', function() {
//
//});

// default task
gulp.task('default', ['mocha', 'watch']);