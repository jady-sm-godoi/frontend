const aSubtraction = document.getElementById('button_accessibility_subtraction')
const aSum = document.getElementById('button_accessibility_sum')
const aTheme = document.getElementById('button_accessibility_theme')

aSubtraction.addEventListener('click', function (e) {
	e.preventDefault()
	resize('decrease')
})

aTheme.addEventListener('click', function (e) {
	themeManager.currentTheme =
		themeManager.currentTheme == 'dark' ? 'light' : 'dark'
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
	console.log(html.style.fontSize)

	let size = html.style.fontSize.slice(0, 2)

	if (action == 'increase' && size <= 18) {
		html.style.fontSize = +html.style.fontSize.slice(0, 2) + 1 + 'px'
	} else if (action == 'decrease' && size >= 13) {
		html.style.fontSize = +html.style.fontSize.slice(0, 2) - 1 + 'px'
	}
}

// themeManager.runWhenChangeTheme((theme) => {
// 	console.log('theme', theme)

// 	const img = document.getElementById('imagemtest')

// 	img.src =
// 		theme == 'light'
// 			? '../assets/images/icon-whatsapp.png'
// 			: '../assets/images/logo-oi-mobile.png'
// })
