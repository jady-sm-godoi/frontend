globalThis.offerManager = new (class OfferManager {
	constructor() {
		/**  @private  */
		this._cookies = new CookiesManager()

		/** @private @type {BusinessOffer[]} */
		this.offerData = {}

		/**  @private */
		this._backendUrl = new URL(
			'https://homeoifibra-back-dev-hml.hml.ocpcorp.oi.intranet'
		)
		/**  @private */
		this._cityCallbacks = []

		/**  @private  */
		this._offerCallbacks = []

		/**  @private  */
		this._defaultCityUrl = 'fallbacks/default-city-regionalization.json'

		/**  @private @type {cityObject[]}   */
		this._lastCitySearch = []

		/**  @type {cityObject[]}  */
		this.defaultCities = []

		const cityFromCookies = this.getCityFromCookies()

		this.requestDefaultCities().then((city) => {
			console.log('city-geted', city)
			this.defaultCities = city
			this._lastCitySearch = city
		})

		/**  @private  * @type {cityObject}  */
		this._currentCity
		// case not found
		if (!!cityFromCookies) {
			console.log('cityFromCookies', cityFromCookies)
			this._currentCity = cityFromCookies
			this._executeCityCallbacks()
			this.setCurrentOffer(this._currentCity)
		} else {
			console.log('pegando cidades default', cityFromCookies)
			this.setDefaultConfigs()
		}
	}
	/**
	 * @param {string} name
	 * @returns {Promise<cityObject[]>}
	 */
	async searchCityByName(name) {
		this._backendUrl.pathname = ['cities', 'name', name].join('/')

		return await new Promise((res, rej) =>
			fetch(this._backendUrl)
				.then((data) => data.json())
				.then((data) => {
					this._lastCitySearch = data.length > 0 ? data : this.defaultCities
					res(this._lastCitySearch)
				})
				.catch((err) => rej(err))
		)
	}

	/**
	 * @param {string} id
	 * @returns {Promise<cityObject>}
	 */
	async searchCityById(id) {
		this._backendUrl.pathname = ['cities', 'id', id].join('/')

		return await new Promise((res, rej) =>
			fetch(this._backendUrl)
				.then((response) => response.json())
				.then((data) => res(data))
				.catch((err) => rej(err))
		)
	}

	async requestDefaultCities() {
		return await new Promise((resolve, reject) => {
			fetch(this._defaultCityUrl)
				.then((response) => response.json())
				.then(resolve)
				.catch(reject)
		})
	}

	async setDefaultConfigs() {
		console.log('setando cidade default')

		this._backendUrl.pathname = [
			'offers',
			'v2',
			'defaults',
			'Web',
			'CREDIT',
			'YEARLY',
			'NOVA_FIBRA',
			'1033422'
		].join('/')

		const defaultOffer = await new Promise((res, rej) =>
			fetch(this._backendUrl)
				.then((response) => response.json())
				.then((data) => res(data))
				.catch((err) => rej(err))
		)

		// set default city
		this.setCityOnCookies({
			city: defaultOffer.city,
			id: defaultOffer.cityId,
			uf: defaultOffer.uf
		})

		this._currentCity = {
			city: defaultOffer.city,
			id: defaultOffer.cityId,
			uf: defaultOffer.uf
		}
		this._executeCityCallbacks()

		// set default offer
		this.offerData = defaultOffer
		this._executeOfferCallbacks()
	}

	/**
	 * @param {{city: string, uf:string}} args
	 * @returns {Promise<BusinessOffer>}
	 * @private
	 */
	async _requestOffer(args) {
		this._backendUrl.pathname = [
			'offers',
			'v2',
			'offers-cities',
			args.uf,
			args.city,
			'Web',
			'CREDIT',
			'YEARLY',
			'NOVA_FIBRA',
			'1033422'
		].join('/')

		return await new Promise((res, rej) =>
			fetch(this._backendUrl)
				.then((response) => response.json())
				.then((data) => res(data))
				.catch((err) => rej(err))
		)
	}

	/**
	 * @param {{city: string, uf:string}} args
	 */
	async setCurrentOffer(args) {
		return new Promise((res, rej) =>
			this._requestOffer(args)
				.then((data) => {
					this.offerData = data
					this._executeOfferCallbacks()
					res(data)
				})
				.catch(rej)
		)
	}

	/**
	 * @returns {cityObject}
	 */
	getCityFromCookies() {
		// TODO: request city from cookies
		const cookies = this._cookies.getJson()

		if (
			'estado' in cookies &&
			'cidade' in cookies &&
			'cidade-nome' in cookies &&
			'ddd' in cookies
		) {
			return {
				id: cookies.cidade,
				city: cookies['cidade-nome'],
				uf: cookies.estado,
				ddd: cookies.ddd,
				normalized: ''
			}
		} else {
			return null
		}
	}

	/**
	 * @param {cityObject} value
	 */
	setCityOnCookies(value) {
		this._cookies.set('estado', value.uf)
		this._cookies.set('cidade', value.id)
		this._cookies.set('cidade-nome', value.city)
		this._cookies.set('ddd', value.ddd)
	}

	/**
	 * @param {string} id
	 * @returns {Promise<cityObject>}
	 */
	setCurrentCityById(id) {
		this.searchCityById(id)
			.then(async (response) => {
				this.setCityOnCookies(response)
				this._currentCity = response
				this._executeCityCallbacks()

				try {
					// set currentOffer
					this.setCurrentOffer(response)

					// Execute offer callbacks
				} catch (error) {
					console.log('erro ao requisitar oferta', error)
				}
			})
			.catch((err) => {
				this._errorWhenFetchCity(err)
			})
	}

	/** @param {string | number} index - set currentCity by last search array */
	setCurrentCityByIndex(index) {
		const city = this._lastCitySearch[index]

		this.setCityOnCookies(city)
		this._currentCity = city
		this._executeCityCallbacks()

		try {
			// set currentOffer
			this.setCurrentOffer(city)

			// Execute offer callbacks
		} catch (error) {
			console.log('erro ao requisitar oferta', error)
		}
	}

	// created a method to get currentCity to turn as readonly
	/** @returns {cityObject} */
	get currentCity() {
		return this._currentCity
	}

	/**  @private  */
	_executeCityCallbacks() {
		// Execute cities callbacks
		console.log('Executando callback de cidades', this._cityCallbacks)
		this._cityCallbacks.forEach(async (cb) => {
			try {
				cb(this._currentCity)
			} catch (error) {
				console.log('erro ao execurar callback', error)
			}
		})
	}

	/**  @private  */
	_executeOfferCallbacks() {
		// Execute cities callbacks
		this._offerCallbacks.forEach(async (cb) => {
			try {
				cb(this.offerData)
			} catch (error) {
				console.log('erro ao execurar callback', error)
			}
		})
	}

	/**  @private  */
	_errorWhenFetchCity(err) {
		console.log('_errorWhenFetchCity', err)
		// put your function here case fetch error
	}

	/** @param {(cityObject) => void} callback*/
	runWhenCityLoad(callback = () => {}) {
		// depoloy callback if currentCity already loadded
		Object.keys(this._currentCity).length > 0 && callback(this._currentCity)
		this._cityCallbacks.push(callback)
	}

	/** @param {(offer: BusinessOffer) => void} callback - Função de callback que recebe um objeto BusinessOffer. */
	runWhenOfferLoad(callback = () => {}) {
		// depoloy callback if currentCity already loadded
		Object.keys(this.offerData).length > 0 && callback(this.offerData)
		this._offerCallbacks.push(callback)
	}
})()

/**
 * @typedef {Object} Attachment
 * @property {string} title - Título do anexo.
 * @property {string} url - URL do anexo.
 */

/**
 * @typedef {Object} ChildProduct
 * @property {string} name - Nome do produto.
 * @property {string} code - Código do produto.
 * @property {string} description - Descrição do produto.
 * @property {string} endOfLifeDate - Data de fim de vida do produto.
 * @property {number} chargeamount - Valor cobrado pelo produto.
 * @property {string} downloadSpeed - Velocidade de download do produto.
 * @property {string} type - Tipo do produto.
 * @property {string} objectTypeName - Nome do tipo do objeto.
 * @property {string} amount - Valor do produto.
 * @property {Attachment[]} attachments - Anexos do produto.
 * @property {string} velocidadeDownload - Velocidade de download do produto (outra propriedade com o mesmo valor que downloadSpeed).
 */

/**
 * @typedef {Object} Offer
 * @property {string} code - Código da oferta.
 * @property {string} name - Nome da oferta.
 * @property {string} description - Descrição da oferta.
 * @property {number} amount - Valor da oferta.
 * @property {number} adherenceFee - Taxa de adesão da oferta.
 * @property {string} targetAudience - Público-alvo da oferta.
 * @property {string} downloadSpeed - Velocidade de download da oferta.
 * @property {ChildProduct[]} childProducts - Produtos relacionados à oferta.
 * @property {string} fidelization - Fidelização da oferta.
 * @property {string} type - Tipo da oferta.
 * @property {string} objectTypeName - Nome do tipo do objeto.
 * @property {number} quantity - Quantidade da oferta.
 * @property {Attachment[]} attachments - Anexos da oferta.
 * @property {number} fixoAmount - Valor fixo da oferta.
 */

/**
 * @typedef {Object} Addon
 * @property {string} code - Código do addon.
 * @property {string} name - Nome do addon.
 * @property {string} description - Descrição do addon.
 * @property {number} amount - Valor do addon.
 * @property {Attachment[]} attachments - Anexos do addon.
 */

/**
 * @typedef {Object} Addons
 * @property {Addon} OI_PLAY_TV - OI PLAY TV addon.
 * @property {Addon} SVOD_GLOBOPLAY - Globoplay addon.
 * @property {Addon} EXP_CSA_AV - OI Expert Presencial addon.
 * @property {Addon} EXP_RMT_AV - OI Expert Remoto - Avulso addon.
 * @property {Addon} SVA_SULAMERICA - SulAmérica Docway Telemedicina addon.
 * @property {Addon} VOIP_FIXOILIMITADO - OI Fixo Fibra addon.
 * @property {Addon} SVA_TESTE_TI8 - SVA Teste Ti8 addon.
 */

/**
 * @typedef {Object} BusinessOffer
 * @property {Offer[]} offers - Ofertas disponíveis.
 * @property {string} segmentation - Segmentação das ofertas.
 * @property {string} heroOffer - Oferta heroica.
 * @property {string} featuredCardOffer - Oferta em destaque.
 * @property {null} loweredPriceOffer - Oferta com preço reduzido.
 * @property {boolean} isUnified - Indica se é unificado.
 * @property {number} daccDiscount - Desconto DACC.
 * @property {string[]} businessOffers - Ofertas de negócios.
 * @property {null} businessOffersPlus - Ofertas de negócios adicionais.
 * @property {boolean} isPromotional - Indica se é promocional.
 * @property {number} lowestSpeed - Velocidade mínima.
 * @property {string} salesforceLink - Link do Salesforce.
 * @property {boolean} displayFibraXCard - Indica se deve exibir o cartão Fibra X.
 * @property {boolean} whatsappButton - Indica se deve exibir o botão do WhatsApp.
 * @property {number} cityId - ID da cidade.
 * @property {string[]} grupoDeMenus - Grupos de menus.
 * @property {Addons} addons - Addons disponíveis.
 */

/**
 * Função que retorna um objeto do tipo BusinessOffer.
 * @param {BusinessOffer} offer - Objeto representando uma oferta de negócios.
 */

/**
 * @typedef {Object} cityObject
 * @property {string} id
 * @property {string} city
 * @property {string} uf
 * @property {number} ddd
 * @property {number} normalized
 */
