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
	set(key, value) {
		document.cookie = `${key}=${encodeURIComponent(value)}`
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
