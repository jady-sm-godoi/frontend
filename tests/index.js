const PromptSync = require('prompt-sync')()
const Menu = require('./components/Menu')
const components = require("./components")

while (true) {
	console.log(Menu(components))
	try {
		components[parseInt(PromptSync('Select a option: '))]()
	} catch (error) {
		console.log('Invalid option!!!!')
	}
}
