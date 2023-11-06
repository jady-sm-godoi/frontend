function selectCity(city) {
	offerManager.setCurrentCityByIndex(city.dataset.cityindex)
	destroyModal()
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

function showCitys(arr) {
	const getUlContent = document.getElementById('container-city-modal')
	getUlContent.innerHTML = ''

	arr.forEach((city, index) => {
		const createRowLi = document.createElement('li')
		createRowLi.setAttribute('class', 'max_width_container')
		const createRowButton = document.createElement('button')
		createRowButton.setAttribute('class', 'header-modal_li_buttons')
		createRowButton.innerText = `${city.city.toUpperCase()}, ${city.uf.toUpperCase()}`
		createRowButton.dataset['cityindex'] = index
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
			console.log('Fazendo request')
			offerManager
				.searchCityByName(city)
				.then((request) => showCitys(request))
				.catch(() => showCitys(offerManager.defaultCities))
		},
		{ autokill: true }
	)
}



function openModal() {
	const modalStructure = `
<div class="header-modal_search_bar">
    <div class="max_width_container header-modal_input-content">
      <input oninput="searchCity(this)" placeholder="ONDE VOCÊ ESTÁ?" id="header-modal_inputcontent">
      <button onclick="destroyModal()">CANCELAR</button>
    </div>
</div>
`

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
	showCitys(offerManager.defaultCities)
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
