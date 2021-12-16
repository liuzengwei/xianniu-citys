
const {task, series, src, dest } = require('gulp');
var uglify = require('gulp-uglify');
var uglifyjs = require('uglify-js');
var pipeline = require('readable-stream').pipeline;
// console.log(1);
// gulp.task('script', function () {
//     return gulp.src('src/**/*.js')
//         .pipe(uglify())//压缩js
//         .pipe(gulp.dest('lib'))
// });
// console.log(2);

function compile() {
    return src('src/*.js')
        .pipe(uglify())
        .pipe(dest('lib'));
}
task(compile())
// compile()