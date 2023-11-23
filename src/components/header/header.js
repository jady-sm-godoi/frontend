const aSubtraction = document.getElementById('button_accessibility_subtraction')
const aSum = document.getElementById('button_accessibility_sum')
const aTheme = document.getElementById('button_accessibility_theme')
const aVlibras = document.getElementById('button_accessibility_vlibras')

aSubtraction.addEventListener('click', function (e) {
	e.preventDefault()
	resize('decrease')
})

aTheme.addEventListener('click', function (e) {
	themeManager.currentTheme =
		themeManager.currentTheme == 'dark' ? 'light' : 'dark'
})
aVlibras.addEventListener('click', function (e) {
	vlibasManager.currentState = !vlibasManager.currentState
})

aSum.addEventListener('click', function (e) {
	e.preventDefault()
	resize('increase')
})

offerManager.runWhenCityLoad('data', (city) => {
	const element = document.getElementById('changeLocalization')
	element.innerText = `${city.city}, ${city.uf}`
})

function resize(action) {
	const html = document.querySelector('html')
	html.style.fontSize = window.getComputedStyle(
		document.querySelector('html'),
		null
	).fontSize

	let size = parseInt(html.style.fontSize)
	if (action == 'increase' && size <= 18) {
		html.style.fontSize = size + 1 + 'px'
	} else if (action == 'decrease' && size >= 13) {
		html.style.fontSize = size - 1 + 'px'
	}
}
