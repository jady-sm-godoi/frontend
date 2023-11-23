class KeepFocusManager {
	/**
	 *
	 * @param {HTMLElementTagNameMap} containerSelector
	 * @param {string} mainMenuName
	 */
	constructor(containerSelector, mainMenuName) {
		if (!!!containerSelector)
			throw new Error('seletor do container nao introduzido')

		/** @private */
		this.mappedFocusableItens = {}

		/** @private */
		this._currentMenu = mainMenuName

		/** @private */
		this.menuDatasetKey = 'data-keepfocus-name'

		/** @private */
		this.containerSelector = containerSelector

		/** @private */
		this.containerHtmlElement = document.querySelector(this.containerSelector)

		if (!!!this.containerHtmlElement)
			throw new Error('O seletor do container não encontrou nenhum elemento')

		/**
		 *  @private
		 * @type {boolean}
		 */
		this.shiftIsPressed

		/** @private */
		this.FocusHadler = class {
			/**
			 * @param {string} menuName
			 * @param {HTMLElementTagNameMap} containerSelector
			 */
			constructor(containerSelector, menuDatasetKey, menuName) {
				this.containerSelector = containerSelector
				this.menuDatasetKey = menuDatasetKey
				this.menuName = menuName

				// map childrens
				this.childrens = [
					...document.querySelectorAll(
						[
							this.containerSelector,
							`[${this.menuDatasetKey}="${this.menuName}"]`
						].join(' ')
					)
				]

				this.childrenCount = {
					max: this.childrens.length - 1,
					current: 0
				}
			}

			next() {
				this.childrenCount.current++

				if (this.childrenCount.current > this.childrenCount.max)
					this.childrenCount.current = 0

				this.attachFocus()
			}

			back() {
				this.childrenCount.current--

				if (this.childrenCount.current < 0)
					this.childrenCount.current = this.childrenCount.max

				this.attachFocus()
			}

			attachFocus() {
				const element = this.childrens[this.childrenCount.current]
				element.focus()
			}
		}

		this.mapFocusableKeys()
		this.deployEventListener()
	}

	/**
	 * - set current menu.
	 * - when you set the current menu, the client fucus are keep in last fcus setted
	 */
	set currentMenu(value = '') {
		this._currentMenu = value
		this.attachFocus()
	}

	/**
	 * - get current focus setted
	 */
	get currentMenu() {
		return this._currentMenu
	}

	/**
	 * - find diferent menu name and instance a new class to manage focus
	 *
	 * @private
	 */
	mapFocusableKeys() {
		document
			.querySelectorAll(
				[this.containerSelector, `[${this.menuDatasetKey}]`].join(' ')
			)
			.forEach((e) => {
				const menuName = e.attributes.getNamedItem(this.menuDatasetKey).value

				if (!this.mappedFocusableItens[menuName])
					this.mappedFocusableItens[menuName] = new this.FocusHadler(
						this.containerSelector,
						this.menuDatasetKey,
						menuName
					)
			})
	}

	/**
	 * @private
	 */
	deployEventListener() {
		this.containerHtmlElement.addEventListener('keydown', (keydown) => {
			const getFocusableNodeByDataset = keydown.target.attributes[this.menuDatasetKey]

			if(keydown.key != "Enter" && getFocusableNodeByDataset){
				keydown.preventDefault()
				if (keydown.key == 'Shift') this.shiftIsPressed = true
	
				if (keydown.key == 'Tab') {
					const elementHandler = this.mappedFocusableItens[this._currentMenu]
	
					if (this.shiftIsPressed) elementHandler.back()
					else elementHandler.next()
				}
			}
		
		})
		this.containerHtmlElement.addEventListener('keyup', (keyup) => {
			keyup.preventDefault()
			if (keyup.key == 'Shift') this.shiftIsPressed = false
		})
	}

	/**
	 * - attach focus on modal
	 * - you can use this when open the modal
	 *
	 * @param {string} menuName
	 */
	attachFocus(menuName = this._currentMenu) {
		const elementHandler = this.mappedFocusableItens[menuName]
		elementHandler.attachFocus()
	}
}
