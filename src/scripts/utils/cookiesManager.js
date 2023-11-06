class CookiesManager {
	constructor() {
		this._cookies = {}
		this.refreshCookieList()
	}

	refreshCookieList() {
		let cookies = document.cookie
		let cookieObj = {}

		// split and remove spaces
		const splitedCookies = cookies.split(';').map((str) => str.trim())

		splitedCookies.forEach((cookElement) => {
			cookElement = cookElement.split('=')
			cookieObj[cookElement[0]] = decodeURIComponent(cookElement[1])
		})

		this._cookies = cookieObj
	}

	/**
	 * @param {string} key
	 */
	get(key) {
		this._cookies[key]
	}

	getJson() {
		return this._cookies
	}

	/**
	 * @param {string} key
	 * @param {string} value
	 */
	set(key, value, days = 365) {
		var expirationDate = new Date()
		expirationDate.setTime(
			expirationDate.getTime() + days * 24 * 60 * 60 * 1000
		)
		document.cookie = `${key}=${encodeURIComponent(
			value
		)}; expires=${expirationDate.toUTCString()}; path=/`
		this.refreshCookieList()
	}

	/**
	 * @param {string} key
	 */
	delete(key) {
		// TODO: make a delete cookie method
		// delete this._cookies[key]
		// this._saveCookies()
	}
}
