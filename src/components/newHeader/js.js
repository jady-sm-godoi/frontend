function selectCity(event, city) {
	offerManager.setCurrentCityByIndex(city.dataset.cityindex)
	// destroyModal()
	closeRegionalizationModal()
}

class DebounceSearchRequest {
	constructor() {
		this.timer
		this.delayToDeploy = 500
	}
	deployPromisse(callback, {autokill = false}) {
		autokill && this.kill()
		this.timer = setTimeout(callback, this.delayToDeploy)
	}
	kill() {
		this.timer && clearTimeout(this.timer)
	}
}

function showCitys(arr) {
	const getUlContent = document.getElementById('container-city-modal')
	getUlContent.innerHTML = ''
	arr.forEach((city, index) => {
		createCityLi(city, index, getUlContent)
	})
	mappingFocusedButtons()
}

function createCityLi(city, index, getUlContent) {
	const createRowLi = document.createElement('li')
	const locationIconContainer = document.createElement('div')
	const locationIcon = `
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
	<path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 10.0772C3.75 5.51246 7.45195 1.75 12 1.75C16.548 1.75 20.25 5.51246 20.25 10.0772C20.25 12.2703 19.3883 14.4044 17.8557 15.9654L12.892 21.021C12.402 21.52 11.598 21.52 11.108 21.021L6.14434 15.9654C4.6117 14.4044 3.75 12.2703 3.75 10.0772ZM12 0.25C6.60692 0.25 2.25 4.70073 2.25 10.0772C2.25 12.6578 3.26211 15.1708 5.074 17.0163L10.0377 22.0719C11.1156 23.1697 12.8844 23.1697 13.9623 22.0719L18.926 17.0163C20.7379 15.1708 21.75 12.6578 21.75 10.0772C21.75 4.70073 17.3931 0.25 12 0.25ZM9.75 10C9.75 8.75736 10.7574 7.75 12 7.75C13.2426 7.75 14.25 8.75736 14.25 10C14.25 11.2426 13.2426 12.25 12 12.25C10.7574 12.25 9.75 11.2426 9.75 10ZM12 6.25C9.92893 6.25 8.25 7.92893 8.25 10C8.25 12.0711 9.92893 13.75 12 13.75C14.0711 13.75 15.75 12.0711 15.75 10C15.75 7.92893 14.0711 6.25 12 6.25Z" fill="var(--newhome-semi-black)"/>
	</svg>`
	locationIconContainer.innerHTML = locationIcon
	createRowLi.setAttribute('class', 'regionalization-city-item')
	const createRowButton = document.createElement('button')
	createRowButton.setAttribute('class', 'header-modal_li_buttons')
	createRowButton.innerText = `${city.city.toUpperCase()}, ${city.uf.toUpperCase()}`
	createRowButton.dataset['cityindex'] = index
	createRowButton.dataset['normalized'] = city.normalized

	createRowButton.autofocus = true

	createRowButton.setAttribute('onclick', 'selectCity(event, this)')
	createRowLi.appendChild(locationIconContainer)
	createRowLi.appendChild(createRowButton)
	getUlContent.appendChild(createRowLi)
}

let getSearchInput = ''

const searchCity = (e) => {
	getSearchInput = e.value.toLowerCase()

	// making a fetch on backend
	getSearchInput.length <= 2
		? showCitys(offerManager.defaultCities)
		: fetchCitysOnBackend(getSearchInput)

	// mapping focused buttons
	mappingFocusedButtons()
}

const debounceSearchRequest = new DebounceSearchRequest()
const fetchCitysOnBackend = (city) => {
	// instance api url handler

	debounceSearchRequest.deployPromisse(
		() => {
			offerManager
				.searchCityByName(city)
				.then((request) => showCitys(request))
				.catch(() => showCitys(offerManager.defaultCities))
		},
		{autokill: true}
	)
}

// let isModalRegionalizationClosed = true;
// function openOrCloseModal(){
// 	if(isModalRegionalizationClosed) openModal()
// 	else destroyModal()
// }

function openModal() {
	// isModalRegionalizationClosed = false;
	const modalStructure = `
<div class="header-modal_search_bar">
    <div class="header-modal_input-content">
	<img
		src="assets/images/newHeader/search-icon-gray.svg"
		data-src-dark="assets/images/newHeader/search-icon-white.svg"
		alt=""/>
      <input oninput="searchCity(this)" placeholder="Buscar" id="header-modal_inputcontent">
    </div>
</div>
`
	const createModal = document.createElement('div')

	createModal.id = 'header-modal-container'
	createModal.setAttribute('class', 'header-modal_city_modal')
	createModal.innerHTML = modalStructure

	document
		.querySelector('.newHeader__topArea__changeLocationContainer')
		.appendChild(createModal)

	const createUl = document.createElement('ul')
	createUl.className = 'elUl'
	createUl.id = 'container-city-modal'
	createModal.appendChild(createUl)
	showCitys(offerManager.defaultCities)
	document.getElementById('header-modal_inputcontent').focus()

	mappingFocusedButtons()
}

setTimeout(openModal, 2000)

// openModal();

function destroyModal() {
	// isModalRegionalizationClosed = true;
	const getModal = document.getElementById('header-modal-container')
	document
		.querySelector('.newHeader__topArea__changeLocationContainer')
		.removeChild(getModal)
	releaseScrollOnPage()
}

function mappingFocusedButtons() {
	const modal = document.getElementById('header-modal-container')

	function handleTabKey(e) {
		const tagsModal = modal.querySelectorAll('input, ul, button')

		const modalElements =
			tagsModal.length <= 3
				? modal.querySelectorAll('input, button')
				: modal.querySelectorAll('input, ul, button')

		const firstElement = modalElements[0]
		const lastElement = modalElements[modalElements.length - 1]

		if (e.key === 'Tab') {
			if (e.shiftKey) {
				if (document.activeElement === firstElement) {
					e.preventDefault()
					lastElement.focus()
				}
			} else {
				if (document.activeElement === lastElement) {
					e.preventDefault()
					firstElement.focus()
				}
			}
		}
	}
	modal.addEventListener('keydown', handleTabKey)
	modal.onkeydown = function (e) {
		e.key === 'Escape' && destroyModal()
	}
}

const aSubtraction = document.getElementById('button_accessibility_subtraction')
const aSum = document.getElementById('button_accessibility_sum')
const aTheme = document.getElementById('button_accessibility_theme')
const aVlibras = document.getElementById('button_accessibility_vlibras')
const VlibrasAndContrastContainer = document.getElementById(
	'vlibras-and-contrast-container'
)

function toggleLibrasAndContrastContainer() {
	if (themeManager.currentTheme == 'dark' || vlibasManager.currentState) {
		return VlibrasAndContrastContainer.classList.add(
			'newHeader__acessibility-active'
		)
	}
	VlibrasAndContrastContainer.classList.remove('newHeader__acessibility-active')
}
setInterval(toggleLibrasAndContrastContainer, 10000)

aSubtraction.addEventListener('click', function (e) {
	e.preventDefault()
	resize('decrease')
})

aTheme.addEventListener('click', function (e) {
	themeManager.currentTheme =
		themeManager.currentTheme == 'dark' ? 'light' : 'dark'
	toggleLibrasAndContrastContainer()
})
aVlibras.addEventListener('click', function (e) {
	vlibasManager.currentState = true
	toggleLibrasAndContrastContainer()
})

aSum.addEventListener('click', function (e) {
	e.preventDefault()
	resize('increase')
})

function hideBanner(toggle = true, loader = true) {
	const bannerImg = document.querySelector('.heroBanner__backgroundImage')
	const bannerContent = document.querySelector('.heroBanner__flexbox-top')
	const loadingElement = document.querySelector('#loader')
	bannerImg.style.display = toggle ? 'none' : 'flex'
	bannerContent.style.display = toggle ? 'none' : 'flex'
	loadingElement.style.display =
		toggle == false || loader == false ? 'none' : 'flex'
}

function replaceBannerOfferValues(mainOffer) {
	const integer = Math.floor(mainOffer.amount)
	const float = mainOffer.amount.toFixed(2).split('.')[1]

	const speed =
		mainOffer.downloadSpeed >= 1000
			? mainOffer.downloadSpeed / 1000
			: mainOffer.downloadSpeed
	const speedType = speed >= 1000 ? 'GIGA' : 'MEGA'

	document.querySelector(
		'.heroBanner__signFiberVelocity'
	).innerHTML = `${speed} <b>${speedType}</b>`
	document.querySelector('.heroBanner__priceIntValue').innerHTML = `${integer}`
	document.querySelector('.heroBanner__decimalValue').innerHTML = `,${float}`
}

function loadOffersValues(dados) {
	const {offers, data} = dados

	if (data?.offers?.length === 0 && offers?.length === 0) {
		mainOfferVariable = null
		return hideBanner(true, false)
	}

	const newOffers = data?.offers || offers

	const hasGloboplayOffer =
		newOffers.filter((offer) => offer.code.indexOf('GLOBOPLAY') != -1).length >
		0

	if (!hasGloboplayOffer) {
		mainOfferVariable = null
		return hideBanner(true, false)
	}

	hideBanner(false)
	let mainOffer = newOffers.filter(
		(offer) => offer.code.indexOf('GLOBOPLAY') != -1
	)[0]

	mainOfferVariable = mainOffer
	replaceBannerOfferValues(mainOffer)
}

offerManager.runWhenCityLoad('data', (city) => {
	const cityNameArea = document.querySelector('.newHeader__topArea__cityName')
	cityNameArea.innerHTML = `${city.city}<span class="newHeader__topArea__ufName">, ${city.uf}</span>`

	// loadOffersValues(offerManager)
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

let isDesktopBefore = isDesktop()
window.addEventListener('resize', () => {
	if (isDesktopBefore == isDesktop()) return
	isDesktopBefore = isDesktop()
	backToMenuOptions()
	closeMenuContainer()
})

let menuDesktopChevronIcon = undefined

function triggerMenuMobile() {
	const menuContainer = document.querySelector('.newHeader__menuContainer')
	if (new Array(...menuContainer.classList).includes('newHeader__menuIsActive'))
		closeMenuContainer()
	else openMenuMobile()
}

function openMenuMobile() {
	openMenuContainer()
}

function openMenuContainer() {
	const menuContainer = document.querySelector('.newHeader__menuContainer')
	menuContainer.classList.add('newHeader__menuIsActive')
	blockScrollOnPage()
}

function closeMenuContainer() {
	if (menuDesktopChevronIcon) {
		menuDesktopChevronIcon.classList.remove('menuDesktopChevronOn')
	}
	const menuContainer = document.querySelector('.newHeader__menuContainer')
	menuContainer.classList.remove('newHeader__menuIsActive')
	releaseScrollOnPage()
}

let actualMenuSelectedId

function isDesktop() {
	return window.innerWidth >= 992
}

function menuSelected(event, selectedId, menuTitle) {
	if (isDesktop()) closeMenuContainer()
	hideSelectArea()
	hideMenuSelected()
	if (actualMenuSelectedId == selectedId && isDesktop()) {
		actualMenuSelectedId = ''
		return
	}
	menuDesktopChevronIcon =
		event?.srcElement?.nextElementSibling ||
		event?.srcElement?.parentNode?.nextElementSibling
	const menuHeader = document.querySelector('.newHeader__menuHeader')
	const menuHeaderTitle = document.querySelector(
		'.newHeader__menuHeader__title'
	)
	if (window.innerWidth < 992) menuHeader.style.display = 'flex'
	const selectedMenu = document.querySelector('#' + selectedId)
	selectedMenu.style.display = 'flex'

	menuHeaderTitle.innerHTML = menuTitle
	actualMenuSelectedId = selectedId
	if (
		new Array(...menuDesktopChevronIcon.classList).includes(
			'newHeader__topArea__selectedMenuItem-chevron'
		)
	) {
		menuDesktopChevronIcon.classList.add('menuDesktopChevronOn')
	}
	if (isDesktop()) {
		openMenuContainer()
	}
}

function hideMenuSelected() {
	if (actualMenuSelectedId == '') return
	const menuHeader = document.querySelector('.newHeader__menuHeader')
	menuHeader.style.display = 'none'
	const selectedMenu = document.querySelector('#' + actualMenuSelectedId)
	if (selectedMenu) selectedMenu.style.display = 'none'
}

function hideSelectArea() {
	const selectArea = document.querySelector('#select-area')
	selectArea.style.display = 'none'
}

function showSelectArea() {
	const selectArea = document.querySelector('#select-area')
	selectArea.style.display = 'initial'
}

function backToMenuOptions() {
	hideMenuSelected()
	showSelectArea()
}

function openSignFiberModal() {
	const signFiberModal = document.querySelector('.newHeader__signFiberModal')
	if (signFiberModal.style.display == 'initial') return closeSignFiberModal()
	signFiberModal.style.display = 'initial'
	blockScrollOnPage()
}

function closeSignFiberModal() {
	const signFiberModal = document.querySelector('.newHeader__signFiberModal')
	signFiberModal.style.display = 'none'
	releaseScrollOnPage()
}
document
	.querySelector('.newHeader__topArea__changeLocationContainer')
	.addEventListener('click', function (event) {
		event.stopPropagation()
	})
document
	.querySelector('.newHeader__topArea__regionalizationArea')
	.addEventListener('click', function (event) {
		triggerRegionalizationModal(event)
	})
function triggerRegionalizationModal(event) {
	event.stopPropagation()
	const regionalizationModal = document.querySelector(
		'.newHeader__topArea__changeLocationContainer'
	)
	if (
		regionalizationModal.style.display == 'none' ||
		regionalizationModal.style.display == ''
	) {
		openRegionalizationModal()
	} else {
		closeRegionalizationModal()
	}
}
function openRegionalizationModal() {
	const regionalizationModal = document.querySelector(
		'.newHeader__topArea__changeLocationContainer'
	)
	const regionalizationModalOverlay = document.querySelector(
		'.newHeader__topArea__changeLocationContainer-overlay'
	)
	const regionalizationButton = document.querySelector(
		'.newHeader__topArea__regionalizationArea'
	)
	regionalizationButton.classList.add('regionalizationAreaIsFocused')
	regionalizationModal.style.display = 'initial'
	regionalizationModalOverlay.style.display = 'initial'
	blockScrollOnPage()
}
function closeRegionalizationModal() {
	const regionalizationModal = document.querySelector(
		'.newHeader__topArea__changeLocationContainer'
	)
	const regionalizationButton = document.querySelector(
		'.newHeader__topArea__regionalizationArea'
	)
	const regionalizationModalOverlay = document.querySelector(
		'.newHeader__topArea__changeLocationContainer-overlay'
	)
	regionalizationButton.classList.remove('regionalizationAreaIsFocused')
	regionalizationModal.style.display = 'none'
	regionalizationModalOverlay.style.display = 'none'
	releaseScrollOnPage()
}

function blockScrollOnPage() {
	const htmlTag = document.querySelector('html')
	htmlTag.style.overflowY = 'hidden'
	if (window.innerWidth >= 992) {
		htmlTag.style.paddingRight = '16px'
	}
}

function releaseScrollOnPage() {
	const htmlTag = document.querySelector('html')
	htmlTag.style.overflowY = 'scroll'
	htmlTag.style.paddingRight = '0px'
}

hideBanner()

document.addEventListener('keydown', (e) => {
	if (e.keyCode == 32 && e.target.id == 'header-modal_inputcontent') {
		document.querySelector('#header-modal_inputcontent').value += ' '
		e.preventDefault()
	}
})
