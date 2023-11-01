const jumpLine = `\r\n`

function Menu() {
	return (
		jumpLine + options.map((s, i) => `${i + 1}. ${s}`).join(jumpLine) + footer
	)
}

const options = [
	'Removedor de imagens não utilizadas',
	'comando para obter lista de links de iamgens'
]

const footer = `


how use:  node ./tests  [option]
exemple:  node ./tests  1

-> you can insert yours data on ./tests/assests
`

module.exports = Menu
