const vlibasManager = new (class {
	constructor() {
		/**
		 * @private
		 * @type {boolean}
		 * - set default vlibras statement when page load
		 */
		this._currentState = false

		/**
		 * @private
		 * @type {HTMLDivElement}
		 */
		this.vlibrasContainer

		/**
		 *
		 * @type {vlibrasCallback[]}
		 * @private
		 */

		this.vlibrasCallback = []

		/**
		 * @private
		 */
		this.deployVlibras()
	}

	/**
	 * @param {boolean} state - set vlibras state
	 */
	set currentState(state) {
		this._currentState = !!state

		this.vlibrasContainer.className = this._currentState
			? 'enabled'
			: 'disabled'

		this._deployCallbacks()
	}

	/**
	 * @returns {boolean} returns vlibreas state
	 */
	get currentState() {
		return this._currentState
	}

	/**
	 * @private
	 */
	deployVlibras() {
		// Cria o elemento <div> com a classe "enabled"
		this.vlibrasContainer = document.createElement('div')
		this.vlibrasContainer.setAttribute('vw', '')
		this.vlibrasContainer.classList.add(
			this._currentState ? 'enabled' : 'disabled'
		)

		// Cria o primeiro filho <div> com a classe "active" e atributo "vw-access-button"
		var firstChild = document.createElement('div')
		firstChild.setAttribute('vw-access-button', '')
		firstChild.classList.add('active')

		// Cria o segundo filho <div> com a classe "vw-plugin-wrapper"
		var secondChild = document.createElement('div')
		secondChild.setAttribute('vw-plugin-wrapper', '')

		// Cria o terceiro filho <div> com a classe "vw-plugin-top-wrapper"
		var thirdChild = document.createElement('div')
		thirdChild.classList.add('vw-plugin-top-wrapper')

		// Adiciona os filhos ao elemento pai
		this.vlibrasContainer.appendChild(firstChild)
		this.vlibrasContainer.appendChild(secondChild)
		secondChild.appendChild(thirdChild)

		// vlibrasElement.innerHTML = vlibrasContent
		document.body.appendChild(this.vlibrasContainer)
		try {
			new window.VLibras.Widget('https://vlibras.gov.br/app')
		} catch (error) {
			console.log("Erro ao instanciar vlibras");
		}
	}

	/**
	 *
	 * @param {vlibrasCallback} callback
	 */
	runWhenChangeState(callback) {
		if (typeof callback == 'function') {
			callback(this._currentState)
			this.vlibrasCallback.push(callback)
		}
	}
	/**
	 * @private
	 */
	_deployCallbacks() {
		this.vlibrasCallback.forEach((cb) => {
			try {
				cb(this._currentState)
			} catch (error) {
				console.log('erro ao executar callback vlibras', error)
			}
		})
	}
})()

/**
 * @typedef {(state:boolean) => void} vlibrasCallback
 */
