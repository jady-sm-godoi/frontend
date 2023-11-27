class offerCarrouselHandler {
	constructor(containerClassName) {
		this.containerClassName = containerClassName
		this.containerElement = document.getElementById(this.containerClassName)

		this.cardsBuilderAddons = new CardsBuilderAddons()
		this.cardsBuilderHead = new CardsBuilderHead()
		this.cardsBuilderHeader = new CardsBuilderHeader()
		this.cardsBuilderMarketcart = new CardsBuilderMarketcart()
		this.cardsBuilderModal = new CardsBuilderModal()
		this.cardsBuilderPrice = new CardsBuilderPrice()

		this.cardsBuilder = new CardsBuilder()

		this.appendACard()
	}

	appendACard() {
		const cartaoPlus = this.cardsBuilder.cardDefault(
			this.cardsBuilderHead.headPlus('CARTAO PLUS'),
			this.cardsBuilderHeader.headerPlus(
				'oi fibra x premium',
				'MELHOR EXPERIÊNCIA WI-FI',
				'+ globoplay'
			),
			this.cardsBuilderAddons.addonsContainerPlus(
				'#',
				'Vem saber mais',
				this.cardsBuilderAddons.addonSpeedPlus('1 giba'),
				this.cardsBuilderAddons.addonWifiPlus('2 pontos Wi-Fi 6 FTTR'),
				this.cardsBuilderAddons.addonHousePlus(
					'Gerenciamento proativo e atendimento diferenciado'
				),
				this.cardsBuilderAddons.addonPresentationPlus('Melhor performance')
			),
			this.cardsBuilderPrice.pricePlus(
				'104,99',
				'+ pontos por R$ 40 /mês cada'
			),
			this.cardsBuilderMarketcart.marketcartButton('clica em mim', '#'),
			this.cardsBuilderModal.modalPlus('Detalhes da oferta', function () {
				console.log('BATATINHA FRITA 123')
			})
		)

		const cartaoDefault = this.cardsBuilder.cardDefault(
			this.cardsBuilderHead.headDefault('CARTAO DEFAULT'),
			this.cardsBuilderHeader.headerDefault(
				'oi fibra x premium',
				'MELHOR EXPERIÊNCIA WI-FI'
			),
			this.cardsBuilderAddons.addonsContainerDefault(
				this.cardsBuilderAddons.addonWifiDefault('1 ponto <b>Wi-Fi 5 </b>'),
				this.cardsBuilderAddons.addonSupportDefault('Atendimento humano e digital'),
				this.cardsBuilderAddons.addonCardDefault('No cartão de crédito ou débito em conta.')
			),
			this.cardsBuilderPrice.priceDefault('104,99'),
			this.cardsBuilderMarketcart.marketcartButton('clica em mim', '#'),
			this.cardsBuilderModal.modalDefault('Detalhes da oferta', function () {
				console.log('BATATINHA FRITA 123')
			})
		)

		this.containerElement.appendChild(cartaoPlus)
		this.containerElement.appendChild(cartaoDefault)
	}
}

if (document.getElementById('offers-carrousel'))
	new offerCarrouselHandler('offers-carrousel')
