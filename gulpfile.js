const del = require('del')
const http = require('http')
const nodeStatic = require('node-static')
const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const fileInclude = require('gulp-file-include')
const livereload = require('gulp-livereload')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const terser = require('gulp-terser')
const concat = require('gulp-concat')
const cleanCSS = require('gulp-clean-css')

const fs = require('fs')

/* -------------------------------------------------------------------------- */

function refreshSEO() {
	const faq = JSON.parse(
		fs.readFileSync('./src/scripts/utils/data/faq-questions.json')
	)
	const seo = JSON.parse(
		fs.readFileSync('./src/scripts/utils/data/seo-head-tag.json')
	)

	const questions = faq.map((felem) => {
		return {
			'@type': 'Question',
			name: felem.title,
			acceptedAnswer: {
				'@type': 'Answer',
				text: felem.description.map((faqdesc) => `<p>${faqdesc}</p>`).join('')
			}
		}
	})

	seo['@graph'].forEach((selem) => {
		selem['@type'] == 'FAQPage' && (selem.mainEntity = questions)
	})

	fs.writeFileSync(
		'./src/scripts/utils/data/seo-head-tag.json',
		JSON.stringify(seo)
	)
}
// refreshSEO()
function cleanStart() {
	return del('./www/**/*')
}

async function faviconStart() {
	gulp
		.src('./src/assets/favicon/**/*')
		.pipe(gulp.dest('./www/assets/favicon'))
		.pipe(livereload())
}

async function htmlStart() {
	gulp
		.src('./src/*.html')
		.pipe(fileInclude())
		.pipe(gulp.dest('./www'))
		.pipe(livereload())
}

async function imageStart() {
	gulp
		.src([
			'./src/assets/images/**/*',
			'!./src/assets/images/{media-lumis,media-lumis/**}'
		])
		.pipe(gulp.dest('./www/assets/images'))
		.pipe(livereload())
}

async function javascriptStart() {
	// this funct load a components scripts after page load to prevent run when page as loading
	gulp
		.src([
			'./src/scripts/**/**.js',
			'./src/scripts/*.js',
			'./src/components/**/*.js'
		])
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ['@babel/preset-env']
			})
		)
		.pipe(concat('main.js'))
		.pipe(terser())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./www/scripts'))
		.pipe(livereload())
}

async function sassStart() {
	gulp
		.src(['./src/components/**/*.scss', './src/styles/**/*.scss'])
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: 'compressed',
				errLogToConsole: true
			}).on('error', sass.logError)
		)
		.pipe(concat('main.css'))
		.pipe(cleanCSS())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 2 versions']
			})
		)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./www/styles/'))
		.pipe(livereload())
}

async function vendorStart() {
	gulp
		.src('./src/vendor/**/*.js')
		.pipe(gulp.dest('./www/vendor'))
		.pipe(livereload())
}

async function fontStart() {
	gulp
		.src('./src/assets/fonts/**/*')
		.pipe(gulp.dest('./www/assets/fonts'))
		.pipe(livereload())
}

async function jsonStart() {
	gulp
		.src('./src/fallbacks/*.json')
		.pipe(gulp.dest(`./www/fallbacks`))
		.pipe(livereload())
}

async function watchStart() {
	livereload.listen({
		basePath: './src',
		quiet: true,
		port: 4000
	})

	gulp.watch('./src/assets/favicon/**/*', faviconStart)
	gulp.watch('./src/**/*.html', htmlStart)
	gulp.watch('./src/assets/images/**/*', imageStart)
	gulp.watch(
		['./src/scripts/**/*.js', './src/components/**/*.js'],
		javascriptStart
	)

	gulp.watch(
		['./src/components/**/*.scss', './src/styles/**/*.scss'],
		sassStart
	)
	gulp.watch('./src/vendor/**/*.js', vendorStart)
	gulp.watch('./src/assets/fonts/**/*', fontStart)
	gulp.watch('./src/fallbacks/*.json', jsonStart)
}

async function start() {
	const lumisProject = new nodeStatic.Server('./www')

	http
		.createServer(function (request, response) {
			lumisProject.serve(request, response)
		})
		.listen(3000)
}

gulp.task(
	'start',
	gulp.series(
		cleanStart,
		gulp.parallel(
			faviconStart,
			htmlStart,
			imageStart,
			javascriptStart,
			sassStart,
			vendorStart,
			fontStart,
			jsonStart
		),
		start,
		watchStart
	)
)

/* -------------------------------------------------------------------------- */

const PROJECT_NAME = 'oi/sejaparceiro/theme/oi-seja-parceiro'

const LUMIS_THEME = `../../../../../www/lumis-theme/br/com/${PROJECT_NAME}`
const PROJECT_THEME = `../src/br/com/${PROJECT_NAME}/www`

/* -------------------------------------------------------------------------- */

function cleanStartDeploy() {
	return del(
		[
			`${LUMIS_THEME}/**/*`,
			`!${LUMIS_THEME}/**/*.html`,
			`${PROJECT_THEME}/**/*`,
			`!${PROJECT_THEME}/**/*.html`
		],
		{
			force: true
		}
	)
}

async function faviconStartDeploy() {
	gulp
		.src('./src/assets/favicon/**/*')
		.pipe(gulp.dest(`${LUMIS_THEME}/assets/favicon`))
		.pipe(gulp.dest(`${PROJECT_THEME}/assets/favicon`))
}

async function imageStartDeploy() {
	gulp
		.src([
			'./src/assets/images/**/*',
			'!./src/assets/images/{development,development/**/*}',
			'!./src/assets/images/{media-lumis,media-lumis/**}'
		])
		.pipe(gulp.dest(`${LUMIS_THEME}/assets/images`))
		.pipe(gulp.dest(`${PROJECT_THEME}/assets/images`))
}

async function javascriptStartDeploy() {
	gulp
		.src('./src/scripts/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ['@babel/preset-env']
			})
		)
		.pipe(terser())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(`${LUMIS_THEME}/scripts`))
		.pipe(gulp.dest(`${PROJECT_THEME}/scripts`))
}

async function sassStartDeploy() {
	gulp
		.src('./src/styles/main.scss')
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: 'compressed'
			}).on('error', sass.logError)
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 2 versions']
			})
		)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(`${LUMIS_THEME}/styles`))
		.pipe(gulp.dest(`${PROJECT_THEME}/styles`))
}

async function vendorStartDeploy() {
	gulp
		.src('./src/vendor/**/*.js')
		.pipe(gulp.dest(`${LUMIS_THEME}/vendor`))
		.pipe(gulp.dest(`${PROJECT_THEME}/vendor`))
}

async function fontStartDeploy() {
	gulp
		.src('./src/assets/fonts/**/*')
		.pipe(gulp.dest(`${LUMIS_THEME}/assets/fonts`))
		.pipe(gulp.dest(`${PROJECT_THEME}/assets/fonts`))
}

async function jsonStartDeploy() {
	gulp
		.src('./src/fallbacks/*.json')
		.pipe(gulp.dest(`${LUMIS_THEME}/fallbacks`))
		.pipe(gulp.dest(`${PROJECT_THEME}/fallbacks`))
}

async function watchStartDeploy() {
	gulp.watch('./src/assets/favicon/**/*', faviconStartDeploy)
	gulp.watch('./src/assets/images/**/*', imageStartDeploy)
	gulp.watch('./src/scripts/**/*.js', javascriptStartDeploy)
	gulp.watch('./src/styles/**/*.scss', sassStartDeploy)
	gulp.watch('./src/vendor/**/*.js', vendorStartDeploy)
	gulp.watch('./src/assets/fonts/**/*', fontStartDeploy)
	gulp.watch('./src/fallbacks/*.json', jsonStartDeploy)
}

gulp.task(
	'start-deploy',
	gulp.series(
		cleanStartDeploy,
		gulp.parallel(
			faviconStartDeploy,
			imageStartDeploy,
			javascriptStartDeploy,
			sassStartDeploy,
			vendorStartDeploy,
			fontStartDeploy,
			jsonStartDeploy
		),
		watchStartDeploy
	)
)

/* -------------------------------------------------------------------------- */

function cleanBuildDeploy() {
	return del([`${PROJECT_THEME}/**/*`, `!${PROJECT_THEME}/**/*.html`], {
		force: true
	})
}

async function faviconBuildDeploy() {
	gulp
		.src('./src/assets/favicon/**/*')
		.pipe(gulp.dest(`${PROJECT_THEME}/assets/favicon`))
}

async function imageBuildDeploy() {
	gulp
		.src([
			'./src/assets/images/**/*',
			'!./src/assets/images/{development,development/**/*}',
			'!./src/assets/images/{media-lumis,media-lumis/**}'
		])
		.pipe(gulp.dest(`${PROJECT_THEME}/assets/images`))
}

async function javascriptBuildDeploy() {
	gulp
		.src('./src/scripts/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ['@babel/preset-env']
			})
		)
		.pipe(terser())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(`${PROJECT_THEME}/scripts`))
}

async function sassBuildDeploy() {
	gulp
		.src('./src/styles/main.scss')
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: 'compressed'
			}).on('error', sass.logError)
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 2 versions']
			})
		)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(`${PROJECT_THEME}/styles`))
}

async function vendorBuildDeploy() {
	gulp.src('./src/vendor/**/*.js').pipe(gulp.dest(`${PROJECT_THEME}/vendor`))
}

async function fontBuildDeploy() {
	gulp
		.src('./src/assets/fonts/**/*')
		.pipe(gulp.dest(`${PROJECT_THEME}/assets/fonts`))
}

async function jsonBuildDeploy() {
	gulp
		.src('./src/fallbacks/*.json')
		.pipe(gulp.dest(`${PROJECT_THEME}/fallbacks`))
}

gulp.task(
	'build-deploy',
	gulp.series(
		cleanBuildDeploy,
		gulp.parallel(
			faviconBuildDeploy,
			imageBuildDeploy,
			javascriptBuildDeploy,
			sassBuildDeploy,
			vendorBuildDeploy,
			fontBuildDeploy,
			jsonBuildDeploy
		)
	)
)
