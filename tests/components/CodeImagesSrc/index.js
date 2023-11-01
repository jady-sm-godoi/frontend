module.exports = function CodeImagesSrc() {
	console.log(
		`[...document.getElementsByTagName("img")].map(_=> _.src).join("\\r\\n")`
	)
}
