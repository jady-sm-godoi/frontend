const offerManager = new (class OfferManager {
	constructor() {
		this.cookies = new CookiesManager()

		// // this.cookies.set('feijao', "chavesecreta ")

		// console.log(this.cookies.getJson());

		this.offerData = {}
		this._backendUrl = new URL(
			'https://homeoifibra-back-dev-hml.hml.ocpcorp.oi.intranet'
		)
		this._cityCallbacks = []
		this._offerCallbacks = []

		new Promise(async (resolve) => {
			const cityFromCookies = this.getCityFromCookies()
			resolve(!!cityFromCookies ? cityFromCookies : await this.getDefaultCity())
		})
			.then((data) => (this._currentCity = data))
			// when user load page, execute this funct on finally
			.finally(() => {
				this._executeCityCallbacks()
				this.setCurrentOffer(this._currentCity)
			})
	}

	/**
	 * @param {string} name
	 * @returns {Promise<{"id": string,"city": string, "uf": string, "ddd": number, "normalized": string}[]>}
	 */
	async searchCityByName(name) {
		this._backendUrl.pathname = ['cities', 'name', name].join('/')

		return await new Promise((res, rej) =>
			fetch(this._backendUrl)
				.then(async (data) => res(await data.json()))
				.catch((err) => rej(err))
		)
	}

	/**
	 * @param {string} id
	 * @returns {Promise<{"id": string,"city": string, "uf": string, "ddd": number, "normalized": string}>}
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

	/**
	 * @param {{city: string, uf:string}} args
	 * @returns
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
	 * @returns
	 */
	async setCurrentOffer(args) {
		this._requestOffer(args)
			.then((data) => {
				this.offerData = data
				this._executeOfferCallbacks()
			})
			.catch((err) => this._errorWhenFetchOffer(err))
	}

	// COOKIES HANDLER

	/**
	 * @returns {{"id": string,"city": string, "uf": string, "ddd": number, "normalized": string}}
	 */
	getCityFromCookies() {
		// TODO: request city from cookies
		const cookies = this.cookies.getJson()

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
			return {
				id: 4329,
				city: 'Salvador das Missões',
				uf: 'RS',
				ddd: 55,
				normalized: 'salvador das missoes'
			}
		}
	}

	/**
	 * @param {{"id": string,"city": string, "uf": string, "ddd": number, "normalized": string}} value
	 */
	setCityOnCookies(value) {
		this.cookies.set('estado', value.uf)
		this.cookies.set('cidade', value.id)
		this.cookies.set('cidade-nome', value.city)
		this.cookies.set('ddd', value.ddd)
	}

	/**
	 * @param {string} id
	 * @returns {Promise<{"id": string,"city": string, "uf": string, "ddd": number, "normalized": string}>}
	 */
	async getDefaultCity() {
		return {
			id: 4329,
			city: 'Salvador das Missões',
			uf: 'RS',
			ddd: 55,
			normalized: 'salvador das missoes'
		}
	}

	/**
	 * @param {{"id": string,"city": string, "uf": string, "ddd": number, "normalized": string}} value
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

	// created a method to get currentCity to turn as readonly
	/**
	 * @returns {{"id": string,"city": string, "uf": string, "ddd": number, "normalized": string}}
	 */
	get currentCity() {
		return this._currentCity
	}

	_executeCityCallbacks() {
		// Execute cities callbacks
		this._cityCallbacks.forEach((cb) => {
			try {
				cb(this._currentCity)
			} catch (error) {
				console.log('erro ao execurar callback', error)
			}
		})
	}
	_executeOfferCallbacks() {
		// Execute cities callbacks
		this._offerCallbacks.forEach((cb) => {
			try {
				cb(this.offerData)
			} catch (error) {
				console.log('erro ao execurar callback', error)
			}
		})
	}

	_runWhenFetchSuccessful(data) {
		console.log('_runWhenFetchSuccessful', data)
		// u can insert any function to run when success fetch here
	}
	_errorWhenFetchOffer(err) {
		console.log('_errorWhenFetchOffer', err)
		// put your function here case fetch error
	}
	_errorWhenFetchCity(err) {
		console.log('_errorWhenFetchCity', err)
		// put your function here case fetch error
	}

	/**
	 * @param {({"id": string,"city": string, "uf": string, "ddd": number, "normalized": string}) => void} callback
	 */
	runWhenCityLoad(callback = () => {}) {
		this._cityCallbacks.push(callback)
	}

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
	 * @param {(offer: BusinessOffer) => void} callback - Função de callback que recebe um objeto BusinessOffer.
	 */

	runWhenOfferLoad(callback = () => {}) {
		this._offerCallbacks.push(callback)
	}
})()
