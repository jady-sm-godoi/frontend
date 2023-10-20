const caminhoFallback = 'fallbacks/data.json'

let cachedData = null

async function fetchOffers() {
	return cachedData
		? cachedData
		: fetch(caminhoFallback)
				.then((response) => {
					cachedData = response.json()
					return cachedData
				})
				.catch((error) => {
					console.log('error', error)
				})
				.finally(() => {
					refreshByOfferLoad(!!cachedData, cachedData)
				})
}
