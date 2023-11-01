const fs = require('fs')
const ImagewsPath = './src/assets/images'
const cheerio = require('cheerio')
const PromptSync = require('prompt-sync')()

module.exports = function RemoveNotUsableImages() {
	let currentImagesProject = fs.readdirSync(ImagewsPath)

	currentImagesProject = currentImagesProject.filter((file) =>
		fs.statSync(ImagewsPath + '/' + file).isFile()
	)

	const htmlPage = fs.readFileSync('./www/index.html')
	const intancePage = cheerio.load(htmlPage)

	// GET SRC FROM IMAGES
	/** @type {string[]} */
	let pageUsablePaths = []

	const pageImages = intancePage('img')
	pageImages.map((el) => {
		const elem = pageImages[el]
		const getSrc = elem.attribs.src
		const darkSrc = elem.attribs['data-src-dark']

		getSrc && pageUsablePaths.push(getSrc)
		darkSrc && pageUsablePaths.push(darkSrc)
	})

	const pageSources = intancePage('source')
	pageSources.map((el) => {
		const getSrc = pageSources[el].attribs.srcset
		getSrc && pageUsablePaths.push(getSrc)
	})

	// filter paths to get image name only

	pageUsablePaths = pageUsablePaths.map((img) => {
		img = img.replace(/\\/g, '/')
		const splt = img.split('/')
		return splt[splt.length - 1]
	})

	let notUsableImages = []
	currentImagesProject.forEach((imgProj) => {
		if (!pageUsablePaths.includes(imgProj)) {
			notUsableImages.push(imgProj)
		}
	})

	if (notUsableImages.length == 0) {
		console.log('any image to remove')
		return 0
	} else {
		// show notusableImages
		console.log('Usable images on project: ')
		console.log(notUsableImages.join('\r\n'))
	}

	const userResponse = PromptSync(
		`You want move not usable images to ${ImagewsPath}/not-usable-images? [s/n] `
	)

	if (userResponse == 's') {
		try {
			fs.mkdirSync(ImagewsPath + '/not-usable-images')
		} catch (error) {}
		notUsableImages.forEach((img) => {
			fs.renameSync(
				ImagewsPath + '/' + img,
				ImagewsPath + '/not-usable-images/' + img
			)
		})
	}
}
