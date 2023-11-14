class CarrouselHandlerV1 {
	/** @private */
	defaultOptions = {
		enableDots: true,
		enableArrows: true,
		enableAutoSkip: true,
		autoSkipDelay: 10000
	}

	/**  @param {string} containerSelector */

	constructor(containerSelector, options = this.defaultOptions) {
		/** @private */
		this.options = {...this.defaultOptions, ...options}

		/** @private */
		this._currentDot = 0

		/** @private */
		this.containerHtml = document.querySelector(containerSelector)
		if (!!!this.containerHtml) throw new Error('comtainer não encontrado')

		/** @private */
		this.carrouselClassName = 'carrousel-handler-v1'

		/** @private */
		this.carrouselSlides = this.getCarrousel()

		/** @private */
		this.dotsContainer = this.createDots()

		/** @private */
		this.deployFooter()

		// set first carrousel view
		/** @private */
		this.currentSlide = 0

		/**
		 * - var definied to use in setTimout
		 * @private
		 */
		this.timeoutAutoSkip = null
	}

	/** @returns {Element}
	 *
	 * @private
	 */
	getCarrousel() {
		const selector = this.buildClass('.' + this.carrouselClassName, 'carrousel')
		console.log('selector', selector)
		return this.containerHtml.querySelector(selector)
	}

	/** @private */
	deployFooter() {
		const footerContainer = document.createElement('div')

		// create "veja outras ofertas"
		const otherOffersContainer = document.createElement('div')
		otherOffersContainer.classList = this.buildClass(
			this.carrouselClassName,
			'footer',
			'outside-buttons-container',
			'text'
		)

		// insert text
		otherOffersContainer.innerHTML = 'Veja outras ofertas'

		const otherOffersArrow = document.createElement('span')
		otherOffersArrow.className = this.buildClass(
			this.carrouselClassName,
			'footer',
			'outside-buttons-container',
			'text',
			'arrow'
		)

		// insert arrow on text container
		otherOffersContainer.appendChild(otherOffersArrow)

		//Create arrows to skip slide on mobile

		// create arrow mobile
		const leftArrowMobile = document.createElement('button')
		const rightArrowMobile = document.createElement('button')

		// insert listener
		leftArrowMobile.addEventListener('click', () => this.currentSlide--)
		rightArrowMobile.addEventListener('click', () => this.currentSlide++)

		// inset classes
		leftArrowMobile.className = this.buildClass(
			this.carrouselClassName,
			'footer',
			'outside-buttons-container',
			'slide-arrow',
			'left'
		)
		rightArrowMobile.className = this.buildClass(
			this.carrouselClassName,
			'footer',
			'outside-buttons-container',
			'slide-arrow',
			'right'
		)

		const outsideButtonsContainer = document.createElement('div')

		outsideButtonsContainer.className = this.buildClass(
			this.carrouselClassName,
			'footer',
			'outside-buttons-container'
		)

		outsideButtonsContainer.appendChild(leftArrowMobile)
		outsideButtonsContainer.appendChild(this.dotsContainer)
		outsideButtonsContainer.appendChild(rightArrowMobile)

		// insert dots on footer
		footerContainer.appendChild(outsideButtonsContainer)

		// insert offerContainer on footer
		footerContainer.appendChild(otherOffersContainer)

		// insert classname on footer
		footerContainer.className = this.buildClass(
			this.carrouselClassName,
			'footer'
		)

		// insert footer on banner
		this.containerHtml.appendChild(footerContainer)
	}

	/** @private */
	buildClass(...classes) {
		return classes.join('__')
	}

	set currentSlide(index) {
		// block to inset index above the children length
		if (index < 0) index = this.dotsContainer.children.length - 1
		if (index >= this.dotsContainer.children.length) index = 0

		// scroll slide container to position
		this.carrouselSlides.style.transform = `translateX(-${index * 100}%)`

		// save value
		this._currentDot = index

		// build classname
		const classIsActive = this.buildClass(
			this.carrouselClassName,
			'footer',
			'outside-buttons-container',
			'dots-container',
			'is-active'
		)

		// get dots in a instanced array to obtain a forEach function on prototype
		const dotsArray = [...this.dotsContainer.children]

		// set class id-active on dot
		dotsArray.forEach((dot, dotindex) =>
			dot.classList[dotindex == index ? 'add' : 'remove'](classIsActive)
		)

		if (this.options.enableAutoSkip) {
			clearTimeout(this.timeoutAutoSkip)

			this.timeoutAutoSkip = setTimeout(
				() => this.currentSlide++,
				this.options.autoSkipDelay
			)
		}
	}
	get currentSlide() {
		return this._currentDot
	}

	/** @private */
	createDots() {
		const dotsContainer = document.createElement('div')

		dotsContainer.className = this.buildClass(
			this.carrouselClassName,
			'footer',
			'outside-buttons-container',
			'dots-container'
		)

		const childrens = [...this.carrouselSlides.children]

		childrens.forEach((child, index) => {
			const dotButton = document.createElement('button')
			dotsContainer.appendChild(dotButton)

			dotButton.className = this.buildClass(
				this.carrouselClassName,
				'footer',
				'outside-buttons-container',
				'dots-container',
				'dot'
			)

			if (this.options.enableAutoSkip) {
				dotButton.style.animationDuration = this.options.autoSkipDelay + 'ms'
			}

			// set listener on dot
			dotButton.addEventListener('click', () => (this.currentSlide = index))
		})

		return dotsContainer
	}
}
