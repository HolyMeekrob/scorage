const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

gulp.task('lint', () => {
	return gulp.src(['./**/*.js'])
		.pipe(eslint({ useEslintrc: true }))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('default', ['lint'], () => {
	nodemon({
		script: 'index.js',
		ext: 'js',
		env: { 'NODE_ENV': 'development' }
	});
});

gulp.task('test', () => {
	return gulp
		.src('test/**/*.js')
		.pipe(mocha());
});
