const themeManager = new (class {
	constructor() {
		/** @private */
		this._htmlElement = document.body

		/** @private */
		this._currentTheme = 'light'

		/** @readonly @private*/
		this.themeKeys = {
			dark: 'dark',
			light: 'light'
		}

		/**
		 * - apply theme when user load page
		 */
		this._applyTheme()
	}

	/** @param {"light" | "dark"} value */
	set currentTheme(value) {
		this._currentTheme =
			value == this.themeKeys.light ? this.themeKeys.light : this.themeKeys.dark

		this._applyTheme()
	}

	/** @returns {"light" | "dark"} */
	get currentTheme() {
		return this._currentTheme
	}

	/** @private */
	_applyTheme() {
		// get theme classnames
		const classNames = Object.keys(this.themeKeys).map(
			(el) => this.themeKeys[el]
		)
		// remove all theme classes
		this._htmlElement.classList.remove(...classNames)

		// append theme classes on body
		this._htmlElement.classList.add(this._currentTheme)
	}
})()
