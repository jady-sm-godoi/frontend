const CodeImagesSrc = require('./components/CodeImagesSrc')
const Menu = require('./components/Menu')
const RemoveNotUsableImages = require('./components/RemoveNotUsableImages')

switch (parseInt(process.argv[2])) {
	case 1:
		RemoveNotUsableImages()
		break
	case 2:
		CodeImagesSrc()
		break

	default:
		console.log(Menu())
		break
}
