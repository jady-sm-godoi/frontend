class ThemeManager {
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
		 * - readded images to toggle theme
		 * @type {{nodeElement: HTMLElement, src:{light:string, dark:string}}[]}
		 * @private
		 */
		this._images = []
		this._readImages()

		/**
		 * - apply theme when user load page
		 */
		this._applyTheme({ runApplyImagePaths: false, runCallbacks: true })
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
	_applyTheme(args = { runCallbacks: true, runApplyImagePaths: true }) {
		// get theme classnames
		const classNames = Object.keys(this.themeKeys).map(
			(el) => this.themeKeys[el]
		)
		// remove all theme classes
		this._htmlElement.classList.remove(...classNames)

		// append theme classes on body
		this._htmlElement.classList.add(this._currentTheme)

		args.runCallbacks && this._runCallbacksList()
		args.runApplyImagePaths && this._setImagePaths()
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
	_readImages() {
		const getImages = document.getElementsByTagName('img')

		for (const img of getImages) {
			const imageSrcDark = img.dataset['srcDark']
			if (imageSrcDark) {
				// append image on array
				this._images.push({
					nodeElement: img,
					src: {
						dark: imageSrcDark,
						light: img.src
					}
				})

				// remove src-dark attribute
				img.removeAttribute('data-src-dark')
			}
		}
	}
	/** @private */
	_setImagePaths() {
		for (const img of this._images) {
			img.nodeElement.src = img.src[this._currentTheme]
		}
	}
}


// INSTANCE THEME HERE
const themeManager = classInstancer(ThemeManager)