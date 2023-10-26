// Constants
const offerProps = {
		oi_fibra: {
			amount: 0,
			offersType: ''
		},
		oi_telefone: {
			amount: 0,
			offersType: '+ telefone fixo'
		},
		oi_playtv: {
			amount: 0,
			offersType: '+ oi play tv'
		}
	},
	dataOffersDetails = {
		daccDiscount: null
	},
	offersVelocity = {}

// Variables
let offers_card_ofertas,
	reciveOfferBundle = ''

offerManager.runWhenOfferLoad((oferta) => {
	const arrayDeOfertas = oferta.offers
	// TODO: arrumar esse b.o com voip fixo 👇👇👇👇

	// offerProps.oi_telefone.amount = reciveFetchOffers.addons.VOIP_FIXOILIMITADO.amount;

	offerProps.oi_playtv.amount = oferta.addons.OI_PLAY_TV.amount
	dataOffersDetails.daccDiscount = oferta.daccDiscount

	reciveOfferBundle = 'oi_fibra'
	renderCards(arrayDeOfertas, offerProps[reciveOfferBundle])
})

offerManager.runWhenCityLoad((city) => {
	const element = document.getElementById('cards_oferta_city')
	element.innerText = `${city.city}, ${city.uf}`
})

const valoresUpload = [
	{ downloadSpeed: 100, uploadSpeed: 40 },
	{ downloadSpeed: 200, uploadSpeed: 60 },
	{ downloadSpeed: 400, uploadSpeed: 200 },
	{ downloadSpeed: 500, uploadSpeed: 250 },
	{ downloadSpeed: 600, uploadSpeed: 300 },
	{ downloadSpeed: 700, uploadSpeed: 350 },
	{ downloadSpeed: 1, uploadSpeed: 500 }
]

const botoes = document.querySelectorAll('#cards_ofertas_botoes button')

function card_oferta_toggle_view(e) {
	reciveOfferBundle = e.dataset.buttonTypeOffer
	botoes.forEach((botao) => {
		botao.classList.remove('selecionado')
		e.dataset.buttonTypeOffer == botao.dataset.buttonTypeOffer &&
			botao.classList.add('selecionado')
	})
	renderCards(offers_card_ofertas, offerProps[e.dataset.buttonTypeOffer])
}

// Modal (por enquanto, o mesmo texto para todos os botões)

const openButton = document.querySelectorAll('.cards_ofertas_detalhes'),
	modal = document.querySelector('.cards_ofertas_modal'),
	closeModalButton = document.querySelector('.cards_ofertas_close_modal_button')

function renderModalInfos(eventClick) {
	const getCard = eventClick.dataset.indentifyoffer
	const getProps = offersVelocity[getCard]
	const cardBlack = getProps.velocity >= 700

	if (getProps.velocity >= 1000) {
		getProps.velocity = getProps.velocity / 1000
	}

	console.log('getProps', getProps.velocity)
	console.log('getProps', getProps)

	document.body.style.overflowY = 'hidden'

	// Inicia renderiza infos Modal

	const divModalTitle = document.querySelector('.cards_ofertas_modal_title')
	const spanModalOferta = document.createElement('span')
	spanModalOferta.classList.add('cards_ofertas_modal_oferta')
	spanModalOferta.innerHTML = `Internet Fibra: ${getProps.velocity} ${getProps.gbOrMb}`

	const divSubtitleDescription = document.querySelector(
		'.cards_ofertas_modal_oferta_subtitle_description'
	)
	const spanModalOfertaDescription = document.createElement('span')
	spanModalOfertaDescription.classList.add(
		'cards_ofertas_modal_oferta_description'
	)
	getProps.offersType == '+ oi play tv'
		? (spanModalOfertaDescription.innerHTML = `${getProps.velocity} ${getProps.gbOrMb} + Acesso ao Oi Play TV com 2 pontos Wi-Fi 5 + Oi Expert Care`)
		: (spanModalOfertaDescription.innerHTML = `${getProps.velocity} ${getProps.gbOrMb} ${getProps.offersType}`)

	const divSubtitleDescriptionValue = document.querySelector(
		'.cards_ofertas_modal_oferta_subtitle_description_value'
	)
	const modalOfertaDescriptionValue = document.createElement('span')
	modalOfertaDescriptionValue.classList.add(
		'cards_ofertas_modal_oferta_description_value'
	)

	const prefixoModal = Math.trunc(getProps.value)
	const decimalPart = getProps.value - Math.trunc(getProps.value)
	const sufixoModal = parseFloat(decimalPart.toFixed(2) * 100)

	modalOfertaDescriptionValue.innerHTML = `R$${prefixoModal},${sufixoModal}/mês no Cartão de Crédito ou Débito em Conta.`
	// finaliza o render do subtitle

	const divModalContainer = document.querySelector(
		'.cards_ofertas_modal_container'
	)
	const ulModalLista = document.createElement('ul')
	ulModalLista.classList.add('cards_ofertas_modal_lista')
	divModalContainer.appendChild(ulModalLista)
	// renderiza o ul

	function findUpload(velocity) {
		return velocity.downloadSpeed == getProps.velocity
	}
	const bundleSpeeds = valoresUpload.find(findUpload)
	const valorUpload = bundleSpeeds.uploadSpeed

	function renderLiModal(infos) {
		const liModal = document.createElement('li')
		liModal.classList.add('cards_ofertas_modal_item')

		const spanModalLista = document.createElement('span')
		spanModalLista.classList.add('cards_ofertas_modal_item_title')
		spanModalLista.innerHTML = `${infos.title}`

		const pModalLista = document.createElement('p')
		pModalLista.classList.add('cards_ofertas_modal_item_paragraph')
		pModalLista.innerHTML = `${infos.paragraph}`

		ulModalLista.appendChild(liModal)
		liModal.appendChild(spanModalLista)
		liModal.appendChild(pModalLista)
	}

	const dataModal = {
		conection: {
			title: 'Conexão & Caring',
			paragraph: `Solução pra quem quer <strong>ampliar a cobertura Wi-Fi</strong> com tecnologia inovadora e premiada levando a velocidade máxima e contar com todo o cuidado do Oi <strong>Expert Care.</strong><br>
      <br>
      <strong>2 pontos Wi-Fi 5</strong> Esses pontos garantem uma maior cobertura e potência do sinal. Ao contrário dos repetidores comuns que distribuem a internet com pouco ou nenhuma qualidade pra cada dispositivo e que exigem troca de rede manual quando você anda pela casa, os nossos formam uma rede inteligente e única.<br>
      <br>
      <strong>Oi Expert Care:</strong> Com esse serviço você tem atendimento e suporte diferenciado. Os experts da Oi gerenciam proativamente a performance da sua Oi Fibra tratando eventuais falhas <strong>antes mesmo que você perceba</strong> e estão à disposição pra te ajudar desde questões do nosso serviço à como usar e configurar Smart TVs, impressoras e muito mais.`
		},
		discont: {
			title: `Desconto de R$${dataOffersDetails.daccDiscount}`,
			paragraph: `Valor mensal reduzido em R$${dataOffersDetails.daccDiscount},00/mês pra clientes que ativarem o Débito Automático em Conta ou Cartão de Crédito. O desconto é válido somente pra novas assinaturas no ato da compra. Em caso de cancelamento do Débito Automático ou Cartão de Crédito, o benefício é suspenso. O desconto é válido por tempo indeterminado.`
		},
		TaxHab: {
			title: `Taxa de Habilitação`,
			paragraph: `A oferta possui taxa de habilitação grátis mediante permanência de 12 meses. Caso a banda larga seja cancelada antes desse período, será cobrado o valor de R$${getProps.TaxaDeHabilitacaoValue},00 de forma proporcional aos meses restantes.`
		},
		instalation: {
			title: `Instalação`,
			paragraph: `O dia da instalação da Oi Fibra será agendado de acordo com as datas e horários disponíveis.`
		},
		equipmet: {
			title: `Equipamento`,
			paragraph: `O roteador Wi-Fi será entregue em comodato. Em caso de cancelamento, deverá ser devolvido para a Oi.`
		},
		equipmetCardBlack: {
			title: `Equipamento`,
			paragraph: `Os 2 pontos Wi-Fi 5 (roteador + 1 ponto) serão entregues em comodato. Em caso de cancelamento, deverão ser devolvidos para a Oi. Essas condições valem também para os pontos que podem ser adicionados (até mais 2 pontos Wi-Fi 5 por R$ 40/mês).`
		},
		speedOffer: {
			title: `Velocidade de Oferta`,
			paragraph: `<span class="cards_ofertas_modal_item_title">${getProps.velocity} ${getProps.gbOrMb} de internet:</span> até ${getProps.velocity} ${getProps.gbOrMb} de download, até ${valorUpload} ${getProps.gbOrMb} de upload. Essas são as velocidades máximas nominais. A velocidade pode variar devido a fatores externos. Velocidade contratada é a taxa de transmissão ou velocidade da conexão. É o quão rápido um pacote de dados do seu dispositivo vai ser levado até a operadora e vice-versa. A velocidade do serviço de banda larga da Oi contratada pelo assinante está sujeita a verificação de viabilidade técnica no ato da instalação.`
		},
		speedOfferCardBlack: {
			title: `Velocidade de Oferta`,
			paragraph: `<span class="cards_ofertas_modal_item_title">${getProps.velocity} ${getProps.gbOrMb} de internet:</span> até ${getProps.velocity} ${getProps.gbOrMb} de download, até ${valorUpload} ${getProps.gbOrMb} de upload. Essas são as velocidades máximas nominais. A velocidade pode variar devido a fatores externos. Velocidade contratada é a taxa de transmissão ou velocidade da conexão. É o quão rápido um pacote de dados do seu dispositivo vai ser levado até a operadora e vice-versa. A velocidade do serviço de banda larga da Oi contratada pelo assinante está sujeita a verificação de viabilidade técnica no ato da instalação.
      <br>
      <br>
      <strong>Dispositivo conectado à internet no roteador ou ponto extra cabeado:</strong><br>
      <br>
      <strong>- via cabo:</strong> até 700 MEGA de download, até 350 MEGA de upload.<br>
      <strong>- via Wi-Fi:</strong> até 600 MEGA de download, até 350 MEGA de upload.<br>
      <br>
      <strong>Dispositivo conectado à internet no ponto extra sem estar cabeado:</strong><br>
      <strong>- via cabo:</strong> até 600 MEGA de download, até 350 MEGA de upload.<br>
      <strong>- via Wi-Fi:</strong> até 300 MEGA de download, até 300 MEGA de upload.</p>`
		},
		franchise: {
			title: `Franquia de dados`,
			paragraph: `A franquia de dados é ilimitada.`
		},
		importantInfos: {
			title: `Informações importantes para uma melhor experiência de navegação`,
			paragraph: `Os dispositivos (smartphone, computador etc.) precisam ter as configurações mínimas necessárias para que atinjam o máximo de desempenho, tanto via cabo como via Wi-Fi. O roteador é dual-band, ou seja, tem frequência de 2,4 GHz e 5 GHz no Wi-Fi. Verifique se os seus dispositivos permitem a navegação em ambas frequências. A conexão via cabo proporciona maior estabilidade e não sofre tantas interferências quanto a rede Wi-Fi. Saiba mais <a class="cards_ofertas_modal_item_link" href="https://www.oi.com.br/internet/lp/boas-vindas-fibra">aqui.</a>`
		},
		validity: {
			title: `Validade da oferta`,
			paragraph: `A oferta está com preço promocional e é válida por 12 meses a partir da data de adesão e prorrogável automaticamente a cada 30 dias. Caso a oferta seja cancelada pela Oi, comunicaremos com 30 dias de antecedência.`
		},
		regulation: {
			title: `Regulamento da oferta`,
			paragraph: `<a class="cards_ofertas_modal_item_link" href="https://www.oi.com.br/internet/regulamento/" target="_blank">Consulte todas as regras.</a>`
		},
		readjustment: {
			title: `Reajuste anual`,
			paragraph: `O valor mensal da oferta poderá, a critério da Oi, ser reajustada anualmente de acordo com a variação positiva do IGP-DI ou índice geral que o substitua.`
		}
	}

	cardBlack && renderLiModal(dataModal.conection)

	// inicia render dados desconto
	dataOffersDetails.daccDiscount != null &&
		!cardBlack &&
		renderLiModal(dataModal.discont)

	// finaliza render dados desconto

	getProps.TaxaDeHabilitacao == 'TA_BL' && renderLiModal(dataModal.TaxHab)

	// finaliza render taxa de habilitação

	renderLiModal(dataModal.instalation)
	// finaliza render Instalação

	cardBlack
		? renderLiModal(dataModal.equipmetCardBlack)
		: renderLiModal(dataModal.equipmet)
	// finaliza render Equipamento

	cardBlack
		? renderLiModal(dataModal.speedOfferCardBlack)
		: renderLiModal(dataModal.speedOffer)
	// finaliza render Velocidade de oferta

	renderLiModal(dataModal.franchise)
	// finaliza render Instalação

	renderLiModal(dataModal.importantInfos)
	// finaliza render Informações importantes

	renderLiModal(dataModal.validity)
	// finaliza render Informações importantes

	renderLiModal(dataModal.regulation)
	// finaliza render Regulamento de ofertas

	renderLiModal(dataModal.readjustment)
	// finaliza render Regulamento de ofertas

	divModalTitle.appendChild(spanModalOferta)
	divSubtitleDescription.appendChild(spanModalOfertaDescription)
	divSubtitleDescriptionValue.appendChild(modalOfertaDescriptionValue)
}

function invokeModal(eventClick) {
	renderModalInfos(eventClick)
	modal.showModal()

	const focusElements = 'a, button',
		modalElements = modal.querySelectorAll(focusElements),
		firstElement = modalElements[0],
		lastElement = modalElements[modalElements.length - 1]

	function handleTabKey(e) {
		if (e.key === 'Tab') {
			if (e.shiftKey) {
				// Se a tecla Shift + Tab foi pressionada e o primeiro elemento do modal tem foco, muda o foco para o último elemento
				if (document.activeElement === firstElement) {
					e.preventDefault()
					lastElement.focus()
				}
			} else {
				// Se apenas a tecla Tab foi pressionada e o último elemento do modal tem foco, muda o foco para o primeiro elemento
				if (document.activeElement === lastElement) {
					e.preventDefault()
					firstElement.focus()
				}
			}
		}
	}
	modal.addEventListener('keydown', handleTabKey)
}

function closeModal() {
	const spanModalOferta = document.querySelector('.cards_ofertas_modal_oferta')
	spanModalOferta.remove()
	const spanModalOfertaDescription = document.querySelector(
		'.cards_ofertas_modal_oferta_description'
	)
	spanModalOfertaDescription.remove()
	const spanModalOfertaDescriptionValue = document.querySelector(
		'.cards_ofertas_modal_oferta_description_value'
	)
	spanModalOfertaDescriptionValue.remove()

	const ulModal = document.querySelector('.cards_ofertas_modal_lista')
	ulModal.remove()
	modal.close()
}

closeModalButton.setAttribute('onclick', 'closeModal()')

// fechar o modal clicando no backdrop
modal.addEventListener('click', (e) => {
	const dialogSides = modal.getBoundingClientRect()
	if (
		e.clientX < dialogSides.left ||
		e.clientX > dialogSides.right ||
		e.clientY < dialogSides.top ||
		e.clientY > dialogSides.bottom
	) {
		closeModal()
	}
})

modal.onkeydown = function (e) {
	e.key === 'Escape' && closeModal()
}

function renderCards(offers, props) {
	const container = document.querySelector('.cards_ofertas_container')
	container.innerHTML = ''

	offers.forEach((element, index) => {
		if (element.attachments) {
			// const divCardTituloFibra = document.createElement("div");
			// divCardTituloFibra.classList.add("cards_ofertas_titulo_fibra");

			// const divCard = document.createElement("div");
			// divCard.classList.add("cards_ofertas_titulo_fibra");
			// divCardTituloFibra.classList.add(
			//   'cards_ofertas_titulo_fibra'
			// )

			// const h4Titulo = document.createElement('h4')
			// h4Titulo.classList.add('cards_ofertas_titulo_fibra')
			// h4Titulo.innerHTML = `oi fibra`

			// const spanTituloFibra = document.createElement('span')
			// spanTituloFibra.id = 'cards_ofertas_fibra'
			// spanTituloFibra.innerText = `start`
			// spanTituloFibra.classList.add('cards_ofertas_titulo_fibra_span')

			// Finaliza Titulo Oi Fibra

			const cardBlack = element.childProducts[0].velocidadeDownload >= 700

			const divCardBox = document.createElement('div')
			divCardBox.classList.add('cards_ofertas_box')
			const divCard = document.createElement('div')
			divCard.classList.add('cards_ofertas_card')
			const divTituloContainer = document.createElement('div')
			divTituloContainer.classList.add('cards_ofertas_titulo_container')
			const h3Titulo = document.createElement('h3')
			h3Titulo.classList.add('cards_ofertas_titulo')
			const spanTitulo = document.createElement('span')
			spanTitulo.id = 'cards_ofertas_type'
			spanTitulo.innerText = props.offersType
			spanTitulo.classList.add('cards_ofertas_titulo_span')

			if (cardBlack) {
				divCard.classList.add('cards_ofertas_oi_expert')
				spanTitulo.classList.add('cards_ofertas_oi_expert')
			}

			const verifyGb = element.childProducts[0].velocidadeDownload / 1000
			const gbOrMb = verifyGb >= 1 ? 'GIGA' : 'MEGA'

			verifyGb >= 1
				? (h3Titulo.innerText = `${verifyGb} ${gbOrMb}`)
				: (h3Titulo.innerText = `${element.childProducts[0].velocidadeDownload} ${gbOrMb}`)

			// Finaliza Velocidade de download

			const divInfoContainer = document.createElement('div')
			divInfoContainer.classList.add('cards_ofertas_infos_container')

			const divInfoWifi = document.createElement('div')
			divInfoWifi.classList.add('cards_ofertas_infos_wifi')

			const imgWifiGray = document.createElement('img')
			imgWifiGray.classList.add('cards_ofertas_icon_wifi_gray')
			imgWifiGray.src = '../../assets/images/icon-wifi.svg'
			imgWifiGray.width = '20'
			imgWifiGray.height = '20'
			imgWifiGray.loading = 'lazy'
			imgWifiGray.alt = 'Wi-Fi'
			imgWifiGray.title = 'Wi-Fi'

			const imgWifiGreen = document.createElement('img')
			imgWifiGreen.classList.add('cards_ofertas_icon_wifi_green')
			imgWifiGreen.src = '../../assets/images/icon-wifi-green.svg'
			imgWifiGreen.width = '20'
			imgWifiGreen.height = '20'
			imgWifiGreen.loading = 'lazy'
			imgWifiGreen.alt = 'Wi-Fi'
			imgWifiGreen.title = 'Wi-Fi'

			if (cardBlack) {
				imgWifiGray.style.filter = 'brightness(0) invert(1)'
				imgWifiGreen.style.filter = 'brightness(0) invert(1)'
			}

			const spanWifi = document.createElement('span')
			spanWifi.classList.add('cards_ofertas_span_wifi')
			spanWifi.innerHTML = `1 ponto <b>Wi-Fi 5</b>`

			if (cardBlack) {
				spanWifi.classList.add('cards_ofertas_oi_expert')
				spanWifi.innerHTML = `2 ponto <b>Wi-Fi 5</b>`
			}

			// Finaliza Div do Wifi

			const divInfoCartao = document.createElement('div')
			divInfoCartao.classList.add('cards_ofertas_infos_cartao')

			const imgWalletGray = document.createElement('img')
			imgWalletGray.classList.add('cards_ofertas_icon_wallet_gray')
			imgWalletGray.src = '../../assets/images/icon-wallet.svg'
			imgWalletGray.width = '20'
			imgWalletGray.height = '20'
			imgWalletGray.loading = 'lazy'
			imgWalletGray.alt = 'Carteira de dineiro'
			imgWalletGray.title = 'Carteira de dineiro'

			const imgWalletGreen = document.createElement('img')
			imgWalletGreen.classList.add('cards_ofertas_icon_wallet_green')
			imgWalletGreen.src = '../../assets/images/icon-wallet.svg'
			imgWalletGreen.width = '20'
			imgWalletGreen.height = '20'
			imgWalletGreen.loading = 'lazy'
			imgWalletGreen.alt = 'Carteira de dineiro'
			imgWalletGreen.title = 'Carteira de dineiro'

			const spanWallet = document.createElement('span')
			spanWallet.innerHTML = 'No cartão de crédito ou débito em conta'

			if (cardBlack) {
				imgWalletGray.style.filter = 'brightness(0) invert(1)'
				imgWalletGreen.style.filter = 'brightness(0) invert(1)'
				imgWalletGray.src = '../../assets/images/icon-star.svg'
				imgWalletGreen.src = '../../assets/images/icon-star.svg'
				spanWallet.innerHTML = `Oi Expert <b>Pro Care</b>`
				imgWalletGreen.alt = 'ícone do símbolo de uma estrela'
				imgWalletGray.alt = 'ícone do símbolo de uma estrela'
				imgWalletGreen.title = 'ícone do símbolo de uma estrela'
				imgWalletGray.title = 'ícone do símbolo de uma estrela'
			}

			cardBlack && spanWallet.classList.add('cards_ofertas_oi_expert')
			// Finaliza Div do Cartão de crédito

			const divPreco = document.createElement('div')
			divPreco.classList.add('cards_ofertas_preco')

			const spanSimbolo = document.createElement('span')
			spanSimbolo.classList.add('cards_ofertas_simbolo')
			spanSimbolo.innerText = `R$`
			const spanReais = document.createElement('span')
			spanReais.classList.add('cards_ofertas_reais')

			const valor = element.amount + props.amount
			const prefixo = Math.trunc(valor)
			const decimalPart = valor - Math.trunc(valor)
			const sufixo = parseFloat(decimalPart.toFixed(2) * 100)
			spanReais.innerText = `${prefixo}`

			const divCentavos = document.createElement('div')
			divCentavos.classList.add('cards_ofertas_centavos')
			const spanCentavos = document.createElement('span')
			spanCentavos.classList.add('cards_ofertas_centavos_numero')
			spanCentavos.innerText = `,${sufixo}`

			const spanMes = document.createElement('span')
			spanMes.classList.add('cards_ofertas_centavos_mes')
			spanMes.innerText = `/mês`

			const ancoraCard = document.createElement('a')
			ancoraCard.href = `https://ti-oinovafibra.cs195.oi.com.br/fibra/s/?productCode=${element.code}&amp;speed=${element.childProducts[0].velocidadeDownload}&amp;skipshopWindow=true`
			ancoraCard.classList.add('cards_ofertas_ancora')
			ancoraCard.innerText = `Eu quero`

			// analytics
			props.offersType == '' &&
				(verifyGb >= 1
					? ancoraCard.setAttribute(
							'onclick',
							`appendDataLayer('clicou','b2c_nova_fibra','btn_${verifyGb}_${gbOrMb}')`
					  )
					: ancoraCard.setAttribute(
							'onclick',
							`appendDataLayer('clicou','b2c_nova_fibra','btn_${element.childProducts[0].velocidadeDownload}_${gbOrMb}')`
					  ))

			props.offersType == '+ telefone fixo' &&
				ancoraCard.setAttribute(
					'onclick',
					`appendDataLayer('clicou','b2c_nova_fibra','btn_fixo-${element.code}')`
				)

			props.offersType == '+ oi play tv' &&
				(verifyGb >= 1
					? ancoraCard.setAttribute(
							'onclick',
							`appendDataLayer('clicou','b2c_nova_fibra','btn_${verifyGb}_${gbOrMb}+_oi_play_tv')`
					  )
					: ancoraCard.setAttribute(
							'onclick',
							`appendDataLayer('clicou','b2c_nova_fibra','btn_${element.childProducts[0].velocidadeDownload}_${gbOrMb}+_oi_play_tv')`
					  ))

			if (cardBlack) {
				spanSimbolo.classList.add('cards_ofertas_oi_expert')
				spanReais.classList.add('cards_ofertas_oi_expert')
				spanCentavos.classList.add('cards_ofertas_oi_expert')
				spanMes.classList.add('cards_ofertas_oi_expert')
			}
			// Finaliza Div do Preço

			const detailsBeneficios = document.createElement('details')
			detailsBeneficios.classList.add('cards_ofertas_beneficios')
			const detailsSummary = document.createElement('summary')
			detailsSummary.classList.add('cards_ofertas_sumario')
			const spanBeneficios = document.createElement('span')
			spanBeneficios.classList.add('cards_ofertas_span_beneficios')
			spanBeneficios.innerText = 'Benefícios incluídos'
			cardBlack && spanBeneficios.classList.add('cards_ofertas_oi_expert')

			const imgBeneficios = document.createElement('img')
			imgBeneficios.src = '../../assets/images/icon-arrow.svg'
			imgBeneficios.width = '12'
			imgBeneficios.height = '8'
			imgBeneficios.loading = 'lazy'
			imgBeneficios.alt = 'Seta para baixo'
			imgBeneficios.title = 'Seta para baixo'

			const ulBenefícios = document.createElement('ul')
			ulBenefícios.classList.add('cards_ofertas_ul_beneficios')
			const benefitOffers = element.childProducts.slice(
				1,
				element.childProducts.length - 1
			)

			cardBlack &&
				(imgBeneficios.src = '../../assets/images/icon-arrow-green.svg')

			benefitOffers.forEach((e) => {
				const liBeneficios = document.createElement('li')
				liBeneficios.classList.add('cards_ofertas_li_beneficios')
				const pictureBeneficios = document.createElement('picture')
				pictureBeneficios.classList.add('cards_ofertas_picture_beneficios')

				const imgBeneficios = document.createElement('img')
				imgBeneficios.src = '../../assets/images/icon-checkmark-light.svg'
				imgBeneficios.width = '16'
				imgBeneficios.height = '16'
				imgBeneficios.loading = 'lazy'
				imgBeneficios.alt = 'Marca de Seleção'
				imgBeneficios.title = 'Marca de Seleção'

				const spanBeneficios = document.createElement('span')
				spanBeneficios.classList.add('cards_ofertas_span_beneficios_incluidos')
				spanBeneficios.innerHTML = `${e.name}`
				cardBlack && spanBeneficios.classList.add('cards_ofertas_oi_expert')

				ulBenefícios.appendChild(liBeneficios)
				liBeneficios.appendChild(pictureBeneficios)
				pictureBeneficios.appendChild(imgBeneficios)
				liBeneficios.appendChild(spanBeneficios)
			})
			// Finaliza Div beneficios incluidos

			const ofertaDetalhes = document.createElement('button')
			ofertaDetalhes.setAttribute('onclick', `invokeModal(this)`)
			ofertaDetalhes.setAttribute(
				'data-indentifyOffer',
				element.childProducts[0].velocidadeDownload
			)
			ofertaDetalhes.classList.add('cards_ofertas_detalhes')

			const imgDetalhes = document.createElement('img')
			imgDetalhes.src = '../../assets/images/icon-more.svg'
			imgDetalhes.width = '14'
			imgDetalhes.height = '14'
			imgDetalhes.loading = 'lazy'
			imgDetalhes.alt = 'ícone do símbolo de um sinal de adição'
			imgDetalhes.title = 'ícone do símbolo de um sinal de adição'

			cardBlack && (imgDetalhes.src = '../../assets/images/icon-plus-green.svg')

			const spanDetalhes = document.createElement('span')
			spanDetalhes.classList.add('cards_fertas_span_detalhes')
			spanDetalhes.innerHTML = 'Detalhes da oferta'
			cardBlack && spanDetalhes.classList.add('cards_ofertas_oi_expert')

			//Finaliza div Detalhes da oferta

			// divCardTituloFibra.appendChild(divCard)
			// divCard.appendChild(divCardTituloFibra)
			// divCardTituloFibra.appendChild(h4Titulo)
			// divCardTituloFibra.appendChild(spanTituloFibra)

			// Finaliza Titulo fibra

			container.appendChild(divCardBox)
			divCardBox.appendChild(divCard)
			divCard.appendChild(divTituloContainer)
			divTituloContainer.appendChild(h3Titulo)
			divTituloContainer.appendChild(spanTitulo)
			// Finaliza Velocidade de download

			divCard.appendChild(divInfoContainer)
			divInfoContainer.appendChild(divInfoWifi)
			divInfoWifi.appendChild(imgWifiGray)
			divInfoWifi.appendChild(imgWifiGreen)
			divInfoWifi.appendChild(spanWifi)
			// Finaliza Div do Wifi

			divInfoContainer.appendChild(divInfoCartao)
			divInfoCartao.appendChild(imgWalletGray)
			divInfoCartao.appendChild(imgWalletGreen)
			divInfoCartao.appendChild(spanWallet)
			// Finaliza Div do Cartão de crédito

			divCard.appendChild(divPreco)
			divPreco.appendChild(spanSimbolo)
			divPreco.appendChild(spanReais)
			divPreco.appendChild(divCentavos)
			divPreco.appendChild(divCentavos)
			divCentavos.appendChild(spanCentavos)
			divCentavos.appendChild(spanMes)
			divCard.appendChild(ancoraCard)
			// Finaliza Div do Preço

			divCard.appendChild(detailsBeneficios)
			detailsBeneficios.appendChild(detailsSummary)
			detailsSummary.appendChild(spanBeneficios)
			detailsSummary.appendChild(imgBeneficios)
			detailsBeneficios.appendChild(ulBenefícios)
			// Finaliza Div beneficios incluidos

			divCard.appendChild(ofertaDetalhes)
			ofertaDetalhes.appendChild(imgDetalhes)
			ofertaDetalhes.appendChild(spanDetalhes)
			//Finaliza div Detalhes da oferta

			const canvas = document.createElement('canvas')
			canvas.classList.add('cards_ofertas_borda')
			canvas.classList.add('cards_ofertas_borda_cinza')
			container.appendChild(canvas)

			index === offers.length - 1 &&
				canvas.classList.remove('cards_ofertas_borda_cinza')

			// Adiciona o canvas
			offersVelocity[element.childProducts[0].velocidadeDownload] = {
				velocity: element.childProducts[0].velocidadeDownload,
				value: valor,
				gbOrMb,
				TaxaDeHabilitacao: element.childProducts.slice(-1)[0].code,
				TaxaDeHabilitacaoValue: element.childProducts.slice(-1)[0].baseamount,
				offersType: props.offersType
			}
		}
	})
}
