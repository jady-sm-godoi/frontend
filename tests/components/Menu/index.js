const jumpLine = `\r\n`

function Menu() {
	return (
		jumpLine + options.map((s, i) => `${i + 1}. ${s}`).join(jumpLine) + footer
	)
}

const options = [
	'Removedor de imagens não utilizadas',
]

const footer = `

how use:  node ./tests  [option]
exemple:  node ./tests  1
`

module.exports = Menu
