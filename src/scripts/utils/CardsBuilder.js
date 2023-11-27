class CardsBuilderUtility {
	/**  @param  {string} handlerClassName */
	constructor(handlerClassName) {
		/** @private */
		this.handlerClassName = handlerClassName|| ""
	}
	/**
	 * @param  {string[]} classes
	 * @protected
	 */
	utilsClassBuilder(...classes) {
		if (this.handlerClassName) classes = [this.handlerClassName, ...classes]

		return classes.join('__')
	}
}


class CardsBuilder extends CardsBuilderUtility {
	constructor() {
		/** @private */
		super('cards-builder')
	}

	/**
	 * @param {HTMLElement} head
	 * @param {...(HTMLElement)} params
	 */
	cardDefault(head, ...params) {
		const cardContainer = document.createElement('div')
		const headContainer = document.createElement('div')
		const cardContent = document.createElement('div')

		if (head) headContainer.appendChild(head)

		params.forEach((element) => {
			cardContent.appendChild(element)
		})

		// insert classes
		cardContainer.className = this.utilsClassBuilder('container', 'default')
		headContainer.className = this.utilsClassBuilder('head')
		cardContent.className = this.utilsClassBuilder(
			'container',
			'default',
			'content'
		)

		cardContainer.appendChild(headContainer)
		cardContainer.appendChild(cardContent)

		return cardContainer
	}

	/**
	 * @param {HTMLElement} head
	 * @param {...(HTMLElement)} params
	 */
	cardPlus(head, ...params) {
		const cardContainer = document.createElement('div')
		const headContainer = document.createElement('div')
		const cardContent = document.createElement('div')

		if (head) headContainer.appendChild(head)

		params.forEach((element) => {
			cardContent.appendChild(element)
		})

		// insert classes
		cardContainer.className = this.utilsClassBuilder('container', 'plus')
		headContainer.className = this.utilsClassBuilder('head')
		cardContent.className = this.utilsClassBuilder(
			'container',
			'plus',
			'content'
		)

		cardContainer.appendChild(headContainer)
		cardContainer.appendChild(cardContent)

		return cardContainer
	}
}



class CardsBuilderHead extends CardsBuilderUtility {
	constructor() {
		/** @private */
		super('cards-builder-head')
	}

	/** @param {string} text  */
	headPlus(text) {
		const container = document.createElement('span')
		container.classList = this.utilsClassBuilder('plus')
		container.innerText = text

		return container
	}

	/** @param {string} text  */
	headDefault(text) {
		const container = document.createElement('span')
		container.classList = this.utilsClassBuilder('default')
		container.innerText = text
		return container
	}
}

class CardsBuilderHeader extends CardsBuilderUtility {
	constructor() {
		/** @private */
		super('cards-builder-header')
	}

	/**
	 * @param {string} title
	 * @param {string} description
	 * @param {string} bonus
	 */
	headerPlus(title, description, bonus) {
		const container = document.createElement('div')
		container.classList = this.utilsClassBuilder('plus')

		// title
		const titleComponent = document.createElement('span')
		titleComponent.innerText = title
		titleComponent.className = this.utilsClassBuilder('plus', 'title')

		// description
		const descriptionComponent = document.createElement('span')
		titleComponent.className = this.utilsClassBuilder('plus', 'description')

		const descriptionSpeedAmount = document.createElement('span')
		descriptionSpeedAmount.className = this.utilsClassBuilder(
			'plus',
			'description',
			'speed-amount'
		)
		descriptionSpeedAmount.innerHTML = description

		const descriptionBonus = document.createElement('span')
		descriptionBonus.className = this.utilsClassBuilder(
			'plus',
			'description',
			'bonus'
		)
		descriptionBonus.innerHTML = bonus

		descriptionComponent.appendChild(descriptionSpeedAmount)
		descriptionComponent.appendChild(descriptionBonus)

		container.appendChild(titleComponent)
		container.appendChild(descriptionComponent)

		return container
	}

	/**
	 * @param {string} title
	 * @param {string} description
	 * @param {string} bonus
	 */
	headerDefault(title, description, bonus) {
		const container = document.createElement('div')
		container.classList = this.utilsClassBuilder('default')

		// title
		const titleComponent = document.createElement('span')
		titleComponent.innerText = title
		titleComponent.className = this.utilsClassBuilder('default', 'title')

		// description
		const descriptionComponent = document.createElement('span')
		titleComponent.className = this.utilsClassBuilder('default', 'description')

		const descriptionSpeedAmount = document.createElement('span')
		descriptionSpeedAmount.className = this.utilsClassBuilder(
			'default',
			'description',
			'speed-amount'
		)
		descriptionSpeedAmount.innerHTML = description

		const descriptionBonus = document.createElement('span')
		descriptionBonus.className = this.utilsClassBuilder(
			'default',
			'description',
			'bonus'
		)
		descriptionBonus.innerHTML = bonus

		descriptionComponent.appendChild(descriptionSpeedAmount)
		descriptionComponent.appendChild(descriptionBonus)

		container.appendChild(titleComponent)
		container.appendChild(descriptionComponent)

		return container
	}
}

class CardsBuilderAddons extends CardsBuilderUtility {
	constructor() {
		super('cards-builder-addons')
	}
	/**
	 * @param {string} learnMoreHref
	 * @param {string} learnMoreText
	 * @param {...HTMLElement} addons
	 * */
	addonsContainerPlus(learnMoreHref, learnMoreText, ...addons) {
		const addonContainer = document.createElement('div')
		const addonContent = document.createElement('ul')
		const addonAnchor = document.createElement('a')
		const learnMoreIcon = document.createElement('img')

		addonAnchor.href = learnMoreHref
		addonAnchor.innerText = learnMoreText
		addonAnchor.appendChild(learnMoreIcon)

		addonAnchor.classList = this.utilsClassBuilder('plus', 'lean-more-anchor')
		learnMoreIcon.className = this.utilsClassBuilder(
			'plus',
			'lean-more-anchor',
			'icon'
		)

		addons.forEach((addon) => {
			addonContent.appendChild(addon)
		})

		addonContainer.appendChild(addonContent)
		addonContainer.appendChild(addonAnchor)

		return addonContainer
	}
	/** @param {...HTMLElement} addons  */
	addonsContainerDefault(...addons) {
		const addonContainer = document.createElement('div')
		const addonContent = document.createElement('ul')

		addons.forEach((addon) => {
			addonContent.appendChild(addon)
		})

		addonContainer.appendChild(addonContent)

		return addonContainer
	}

	/**
	 *  @param {string} text
	 *  @param {string} imgPath
	 *  @param {"default" | "plus"} model
	 *  @private
	 */
	addonGeneric(text, imgPath, model) {
		const addonRow = document.createElement('li')
		const addonImg = document.createElement('img')

		addonImg.src = imgPath

		const addonText = document.createElement('span')
		addonText.innerText = text

		// deploy classnames
		addonRow.className = this.utilsClassBuilder(model)
		addonImg.className = this.utilsClassBuilder(model, 'icon')
		addonText.className = this.utilsClassBuilder(model, 'text')

		addonRow.appendChild(addonImg)
		addonRow.appendChild(addonText)

		return addonRow
	}

	// plus addons
	addonSpeedPlus(text = '') {
		return this.addonGeneric(
			text,
			'assets/images/cardsbuilder-speed-plus.svg',
			'plus'
		)
	}
	addonWifiPlus(text = '') {
		return this.addonGeneric(
			text,
			'assets/images/cardsbuilder-wifi-plus.svg',
			'plus'
		)
	}
	addonHousePlus(text = '') {
		return this.addonGeneric(
			text,
			'assets/images/cardsbuilder-house-plus.svg',
			'plus'
		)
	}
	addonPresentationPlus(text = '') {
		return this.addonGeneric(
			text,
			'assets/images/cardsbuilder-house-plus.svg',
			'plus'
		)
	}

	// default addons
	addonSpeedDefault(text = '') {
		return this.addonGeneric(
			text,
			'assets/images/cardsbuilder-speed-default.svg',
			'default'
		)
	}
	addonSupportDefault(text = '') {
		return this.addonGeneric(
			text,
			'assets/images/cardsbuilder-support-default.svg',
			'default'
		)
	}
	addonCardDefault(text = '') {
		return this.addonGeneric(
			text,
			'assets/images/cardsbuilder-card-default.svg',
			'default'
		)
	}
}

class CardsBuilderPrice extends CardsBuilderUtility {
	constructor() {
		super('cards-builder-price')
	}

	/**
	 * @private
	 * @param {string} price
	 * @param {"default" | "plus"} model
	 */

	priceGeneric(price, model) {
		const priceContainer = document.createElement('div')
		const priceContent = document.createElement('span')
		const priceFrequency = document.createElement('span')

		priceContent.innerHTML = `R$ ${price}`
		priceFrequency.innerText = '/mês'

		priceContainer.appendChild(priceContent)
		priceContainer.appendChild(priceFrequency)

		// append classnames
		priceContainer.className = this.utilsClassBuilder(model)
		priceContent.className = this.utilsClassBuilder(model, 'price')
		priceFrequency.className = this.utilsClassBuilder(model, 'frequency')

		return priceContainer
	}

	/**
	 * @param {string} price
	 */
	priceDefault(price) {
		const priceContainer = document.createElement('div')

		priceContainer.appendChild(this.priceGeneric(price, 'default'))
		priceContainer.className = this.utilsClassBuilder()

		return priceContainer
	}

	/**
	 * @param {string} price
	 * @param {string} details
	 */
	pricePlus(price, details) {
		const priceContainer = document.createElement('div')

		// create details component
		const priceDetails = document.createElement('span')
		priceDetails.innerText = details

		// insert classnames
		priceContainer.className = this.utilsClassBuilder()
		priceDetails.className = this.utilsClassBuilder('plus', 'details')

		// append childs
		priceContainer.appendChild(this.priceGeneric(price, 'plus'))
		priceContainer.appendChild(priceDetails)

		return priceContainer
	}
}

class CardsBuilderMarketcart extends CardsBuilderUtility {
	constructor() {
		super('cards-builder-marketcart')
	}

	/**
	 * @param {string} text
	 * @param {string} url
	 */
	marketcartButton(text, url) {
		const marketcartContainer = document.createElement('div')
		const marketcartAnchor = document.createElement('a')

		marketcartAnchor.innerText = text
		marketcartAnchor.href = url

		marketcartContainer.classList = this.utilsClassBuilder()
		marketcartAnchor.classList = this.utilsClassBuilder('anchor')

		return marketcartContainer
	}
}
class CardsBuilderModal extends CardsBuilderUtility {
	constructor() {
		super('cards-builder-modal')
	}

	/**
	 * @param {string} text
	 * @param {"default" | "plus"} model
	 * @param {() => void} callback
	 * @private
	 */
	modalGeneric(text, imgPath, model, callback) {
		const modalContainer = document.createElement('div')
		const modalButton = document.createElement('button')

		// inside button
		const modalText = document.createElement('span')
		const modalImg = document.createElement('img')

		modalContainer.classList = this.utilsClassBuilder()
		modalButton.classList = this.utilsClassBuilder(model)
		modalText.className = this.utilsClassBuilder(model, 'text')
		modalImg.classList = this.utilsClassBuilder(model, 'icon')

		modalButton.appendChild(modalImg)
		modalButton.appendChild(modalText)

		// callback
		modalButton.addEventListener('click', () => {
			callback()
		})

		modalContainer.appendChild(modalButton)

		return modalContainer
	}

	modalDefault(text = '', callback = () => {}) {
		return this.modalGeneric(
			text,
			'assets/images/cardsbuilder-modal-outline-default.svg',
			'default',
			callback
		)
	}
	modalPlus(text = '', callback = () => {}) {
		return this.modalGeneric(
			text,
			'assets/images/cardsbuilder-modal-outline-plus.svg',
			'plus',
			callback
		)
	}
}
