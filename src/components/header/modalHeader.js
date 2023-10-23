'use strict'

let arrCity = []

// fetch city array
const cityRegionalizationFallback =
	'fallbacks/default-city-regionalization.json'

fetch(cityRegionalizationFallback)
	.then(async (request) => (arrCity = await request.json()))
	.catch(() => {})

const modalStructure = `
<div class="header-modal_search_bar">
    <div class="max_width_container header-modal_input-content">
      <input oninput="searchCity(this)" placeholder="ONDE VOCÊ ESTÁ?" id="header-modal_inputcontent">
      <button onclick="destroyModal()">CANCELAR</button>
    </div>
</div>
`

const selectCity = (city) => {
	const fetchCity = arrCity.find((mapcity) => mapcity.id == city.dataset.cityid)
	const getHeaderText = document.getElementById('changeLocalization')
	getHeaderText.dataset['normalized'] = city.dataset.normalized
	getHeaderText.innerHTML = `${fetchCity.city}, ${fetchCity.uf}`
	destroyModal()
}

const showCitys = (arr) => {
	const getUlContent = document.getElementById('container-city-modal')
	getUlContent.innerHTML = ''

	arr.forEach((city, index) => {
		const createRowLi = document.createElement('li')
		createRowLi.setAttribute('class','max_width_container')
		const createRowButton = document.createElement('button')
		createRowButton.setAttribute('class', 'header-modal_li_buttons')
		createRowButton.innerText = `${city.city.toUpperCase()}, ${city.uf.toUpperCase()}`
		createRowButton.dataset['cityid'] = city.id
		createRowButton.dataset['normalized'] = city.normalized

		createRowButton.autofocus = true

		createRowButton.setAttribute('onclick', 'selectCity(this)')
		createRowLi.appendChild(createRowButton)
		getUlContent.appendChild(createRowLi)
	})
	mappingFocusedButtons()
}

let getSearchInput = ''

const searchCity = (e) => {
	getSearchInput = e.value.toLowerCase()

	// making a fetch on backend
	getSearchInput.length <= 2
		? showCitys(arrCity)
		: fetchCitysOnBackend(getSearchInput)

	// mapping focused buttons
	mappingFocusedButtons()
}

class DebounceSearchRequest {
	constructor() {
		this.timer
		this.delayToDeploy = 500
	}
	deployPromisse(callback, { autokill = false }) {
		autokill && this.kill()
		this.timer = setTimeout(callback, this.delayToDeploy)
	}
	kill() {
		this.timer && clearTimeout(this.timer)
	}
}

const debounceSearchRequest = new DebounceSearchRequest()
const fetchCitysOnBackend = (city) => {
	// instance api url handler
	const apiUrl = new URL(
		'https://homeoifibra-back-dev-hml.hml.ocpcorp.oi.intranet'
	)

	// set pathname
	apiUrl.pathname = '/cities/name/' + city

	debounceSearchRequest.deployPromisse(
		() => {
			console.log('Fazendo request')
			fetch(apiUrl.href)
				.then(async (request) => {
					request = await request.json()
					request.length > 0 && showCitys(request)
				})
				.catch(() => showCitys(arrCity))
		},
		{ autokill: true }
	)
}

// HOW TO GET OFFER

// const getHeroBannerOffer = () => {
//   const foundOffer = offers.list.find(
//     (offer) => offer.offerCode === offers.heroOffer
//   )
//   if (foundOffer) {
//     return foundOffer
//   } else {
//     return offers.list[0]
//   }
// }
function overflowHidden(){
	document.getElementsByTagName("html")[0].style.overflowY= "hidden";
}
function overflowShow(){
	document.getElementsByTagName("html")[0].style.overflowY= "auto";
}

function openModal() {

	overflowHidden()
	const createModal = document.createElement('div')

	createModal.id = 'header-modal-container'
	createModal.setAttribute('class', 'header-modal_city_modal')
	createModal.innerHTML = modalStructure

	document.body.appendChild(createModal)

	const createUl = document.createElement('ul')
	createUl.className = 'elUl'
	createUl.id = 'container-city-modal'
	createModal.appendChild(createUl)
	showCitys(arrCity)
	document.getElementById('header-modal_inputcontent').focus()

	mappingFocusedButtons()
}

function destroyModal() {
	const getModal = document.getElementById('header-modal-container')
	document.body.removeChild(getModal)
	overflowShow()
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
