var gulp = require('gulp');
var postcss = require('gulp-postcss');
var atImport = require('postcss-import');
var mixins = require('postcss-mixins');
var ruck = require('rucksack-css');
var csswring = require('csswring');
var cssnested = require('postcss-nested');
var cssnext = require('postcss-cssnext');
var browserSync = require ('browser-sync').create();
var mqpacker = require('css-mqpacker');
var lost = require('lost');

//Development server
gulp.task('serve',function (){
	browserSync.init({
	server:{
	baseDir: './dist'
	}
	});
});

//Process CSS
gulp.task('css',function () {
	var processors = [
	atImport(),
	lost(),
	mqpacker,
    cssnested,
    mixins(),
    ruck(),
    cssnext({  browsers: [ '> 5%', 'ie 8' ]  }),
    //csswring()
	];

	return gulp.src('./src/invie.css')
	.pipe(postcss(processors))
	.pipe(gulp.dest('./dist/css'))
	.pipe(browserSync.stream());
});

//Watch changes
gulp.task('watch', function() {
	gulp.watch('./src/*.css',['css']);
	gulp.watch('./dist/*.html').on('change',browserSync.reload);
});

gulp.task('default', ['watch','serve']);