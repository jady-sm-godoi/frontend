const themeManager = new (class {
	constructor() {
		/** @private */
		this._htmlElement = document.body

		/** @readonly @private*/
		this.themeKeys = {
			dark: 'dark',
			light: 'light'
		}

		/**
		 * @private
		 * @type {"light" | "dark"}
		 *
		 * - default theme is light
		 */
		this._currentTheme = this.themeKeys.light

		/** @private */
		this.callbacks = []

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

		this._runCallbacksList()
		this._setImagePaths()
	}
	/** @private */
	_runCallbacksList() {
		this.callbacks.forEach(async (cb) =>
			this._runCallback(cb, this._currentTheme)
		)
	}

	/**
	 *  @param {Function} callback
	 *  @param {string} params
	 *  @private
	 *
	 * */
	_runCallback(callback, params) {
		try {
			params ? callback(params) : callback
		} catch (error) {
			console.log('erro ao executar callback de temas da funcao', error)
		}
	}

	/** @param {(theme: "dark" | "light") => } callback */
	runWhenChangeTheme(callback = () => {}) {
		if (typeof callback == 'function') this.callbacks.push(callback)
		else
			console.log(
				'tentado adicionar um elemento que nao é uma função na callback de themas'
			)
	}
	/** @private */
	_setImagePaths() {
		const getImages = document.getElementsByTagName('img')

		for (const img of getImages) {
			const imgThemeAttribute = {
				light: img.attributes.getNamedItem('data-src-' + this.themeKeys.light),
				dark: img.attributes.getNamedItem('data-src-' + this.themeKeys.dark)
			}

			if (imgThemeAttribute.light && imgThemeAttribute.dark) {
				img.src = imgThemeAttribute[this._currentTheme].textContent
			}
		}
	}
})()
