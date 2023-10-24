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
	 * @param {() => void} callback
	 */
	runWhenOfferLoad(callback = () => {}) {
		this._offerCallbacks.push(callback)
	}
})()
