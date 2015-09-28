import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';
import {} from 'babel/register';


gulp.task('lint', () => {
	return gulp.src(['./*.js, ./src/**/*.js'])
		.pipe(eslint({ useEslintrc: true }))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('default', ['lint'], () => {
	nodemon({
		script: 'index.js',
		ext: 'js',
		env: { 'NODE_ENV': 'development' },
		execMap: {
			js: 'babel-node'
		}
	});
});

gulp.task('test', () => {
	return gulp
		.src('test/**/*.js')
		.pipe(mocha());
});