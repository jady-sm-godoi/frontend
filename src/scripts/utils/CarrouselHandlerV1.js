class CarrouselHandlerV1 {
	/** @private */
	defaultOptions = {
		enableDots: true,
		enableAutoSkip: true,
		autoSkipDelay: 10000,
		enableArrows: true
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
		this.mobileSlideArrows = this.deploySkipArrowsToMobile()

		/** @private */

		if (this.options.enableArrows) {
			this.desktopSlideArrows = this.deploySkipArrowsToDesktop()

			this.disableArrow('left')
		}

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
		return this.containerHtml.querySelector(selector)
	}

	deploySkipArrowsToDesktop() {
		const skipDotsDesktopContainer = document.createElement('div')

		skipDotsDesktopContainer.className = this.buildClass(
			this.carrouselClassName,
			'slide-arrow-desktop'
		)

		const leftArrowDesktop = document.createElement('button')
		const rightArrowDesktop = document.createElement('button')

		leftArrowDesktop.className = this.buildClass(
			this.carrouselClassName,
			'slide-arrow-desktop',
			'left'
		)

		rightArrowDesktop.className = this.buildClass(
			this.carrouselClassName,
			'slide-arrow-desktop',
			'right'
		)

		// add listeners
		leftArrowDesktop.addEventListener('click', () => this.currentSlide--)
		rightArrowDesktop.addEventListener('click', () => this.currentSlide++)

		skipDotsDesktopContainer.appendChild(leftArrowDesktop)
		skipDotsDesktopContainer.appendChild(rightArrowDesktop)

		skipDotsDesktopContainer.classList.add('max_width_container')

		this.containerHtml.appendChild(skipDotsDesktopContainer)

		return {left: leftArrowDesktop, right: rightArrowDesktop}
	}

	/** @private */
	deploySkipArrowsToMobile() {
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

		/** ------------------------------------------------------------------ */
		//Create arrows to skip slide on mobile / desktop

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

		this.options.enableArrows &&
			outsideButtonsContainer.appendChild(leftArrowMobile)
		// insert dots on footer
		this.options.enableDots &&
			outsideButtonsContainer.appendChild(this.dotsContainer)

		this.options.enableArrows &&
			outsideButtonsContainer.appendChild(rightArrowMobile)

		footerContainer.appendChild(outsideButtonsContainer)

		// insert offerContainer on footer
		footerContainer.appendChild(otherOffersContainer)

		/** ------------------------------------------------------------------ */

		// insert classname on footer
		footerContainer.className = this.buildClass(
			this.carrouselClassName,
			'footer'
		)

		// insert footer on banner
		this.containerHtml.appendChild(footerContainer)

		return {left: leftArrowMobile, right: rightArrowMobile}
	}

	/** @private */
	buildClass(...classes) {
		return classes.join('__')
	}

	disableArrow(arrow = 'left' || 'right' || 'none') {
		// enable all arrows
		;[
			this.desktopSlideArrows.left,
			this.desktopSlideArrows.right,
			this.mobileSlideArrows.left,
			this.mobileSlideArrows.right
		].forEach((e) => (e.style.visibility = null))

		if (arrow == 'left') {
			this.desktopSlideArrows.left.style.visibility = 'hidden'
			this.mobileSlideArrows.left.style.visibility = 'hidden'
		}
		if (arrow == 'right') {
			this.desktopSlideArrows.right.style.visibility = 'hidden'
			this.mobileSlideArrows.right.style.visibility = 'hidden'
		}
	}

	set currentSlide(index) {
		// block to inset index above the children length
		if (index < 0) index = this.dotsContainer.children.length - 1
		if (index >= this.dotsContainer.children.length) index = 0

		if (this.options.enableArrows) {
			// disable arrows
			this.disableArrow(
				(index == 0 && 'left') ||
					(index == this.dotsContainer.children.length - 1 && 'right')
			)
		}

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
