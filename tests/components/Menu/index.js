const jumpLine = `\r\n`

/**
 *
 * @param {(() => void)[]} props
 */
function Menu(props) {
	return (
		jumpLine + props.map((s, i) => `${i}. ${s.name}`).join(jumpLine) + footer
	)
}

const options = ['Removedor de imagens não utilizadas', 'Sair']

const footer = `
insert the number of a option to run
`

module.exports = Menu
