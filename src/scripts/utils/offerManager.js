class offerManager {
	constructor() {
		this.offerData = null
		this._offerUrl = 'fallbacks/data.json'

		// fetch offers when instance
		this._fetchOffer()

		this._currentCity = {}
	}
	_fetchOffer() {
		fetch(this._offerUrl)
			.then(async (data) => _runWhenFetchSuccessful(await data.json()))
			.catch((err) => this._errorWhenFetchOffer(err))
	}

	/**
	 * @param {{"id": string,"city": string, "uf": string, "ddd": number, "normalized": string}} value
	 */
	set currentCity(value) {
		this._currentCity = value
	}
	get currentCity() {
		return this._currentCity
	}

	_runWhenFetchSuccessful(data) {
		// put yours function here to run when fetch runned
	}
	_errorWhenFetchOffer(err) {
		// put your function here case fetch error
	}
}

// const a = new offerManager()
