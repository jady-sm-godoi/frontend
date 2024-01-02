const analyticsContainerHelper = async () => {
	const defaultPropertiesFunction = (event) => {
		const analyticsClass = [...event.target.classList].filter(
			(className) => className.indexOf('btn_') != -1
		)[0]

		const notOiBrLink = event.target.href.indexOf('www.oi.com.br') == -1

		return {
			page_location: document.location.href,
			page_path: `${document.location.pathname}${document.location.search}`,
			link_classes: analyticsClass,
			link_domain: event.target.href,
			link_id: event.target.id,
			link_url: event.target.href,
			outbound: notOiBrLink
		}
	}

	const headerClickEvent = (event) => {
		event.stopPropagation()
		const defaultProperties = defaultPropertiesFunction(event)

		return (
			window &&
			window.dataLayer &&
			window.dataLayer.push({
				event: 'header_click',
				...defaultProperties
			})
		)
	}

	const viewPromotionEvent = (
		event,
		{eventIdentification, eventId, eventTitle, eventName}
	) => {
		let items = [
			{
				item_id: mainOfferVariable?.code,
				item_name: mainOfferVariable?.name,
				item_brand: 'oi_fibra_varejo_globoplay',
				item_category: 'oi_fibra_varejo_globoplay',
				price: mainOfferVariable?.amount,
				quantity: '1'
			}
		]

		if (
			eventIdentification ==
			'banner_oi_fibra_a_internet_ideal_pra_sua_casa_home_oi'
		) {
			items = [
				{
					item_id: 'conhecer_os_planos',
					item_name: 'Conhecer os planos',
					item_brand: 'oi_fibra_varejo',
					item_category: 'oi_fibra_varejo',
					price: 'n/a',
					quantity: '1'
				}
			]
		}

		if (
			eventIdentification ==
			'banner_quer_internet_fibra_optica_pra_sua_empresa_home_oi'
		) {
			items = [
				{
					item_id: 'quero_internet_pra_empresas',
					item_name: 'Quero Internet pra Empresas',
					item_brand: 'oi_fibra_empresarial',
					item_category: 'oi_fibra_empresarial',
					price: 'n/a',
					quantity: '1'
				},
				{
					item_id: 'confira_nossos_parceiros',
					item_name: 'Confira nossos parceiros',
					item_brand: 'oi_fibra_empresarial',
					item_category: 'oi_fibra_empresarial',
					price: 'n/a',
					quantity: '1'
				}
			]
		}

		if (eventIdentification == 'quero_internet_pra_empresa') {
			items = [
				{
					item_id: 'quero_internet_pra_empresas',
					item_name: 'Quero Internet pra Empresas',
					item_brand: 'oi_fibra_empresarial',
					item_category: 'oi_fibra_empresarial',
					price: 'n/a',
					quantity: '1'
				}
			]
		}

		if (eventIdentification == 'confira_nossos_parceiros') {
			items = [
				{
					item_id: 'confira_nossos_parceiros',
					item_name: 'Confira nossos parceiros',
					item_brand: 'oi_fibra_empresarial',
					item_category: 'oi_fibra_empresarial',
					price: 'n/a',
					quantity: '1'
				}
			]
		}

		if (
			eventIdentification ==
			'banner_wifi_na_casa_toda_seu_wifi_nao_funciona_como_voce_gostaria_home_oi'
		) {
			items = [
				{
					item_id: 'conhecer_oi_fibra_x',
					item_name: 'Conhecer Oi Fibra X',
					item_brand: 'oi_fibra_x',
					item_category: 'oi_fibra_x',
					price: 'n/a',
					quantity: '1'
				},
				{
					item_id: 'conhecer_oi_fibra_x_premium',
					item_name: 'Conhecer Oi Fibra X Premium',
					item_brand: 'oi_fibra_x',
					item_category: 'oi_fibra_x',
					price: 'n/a',
					quantity: '1'
				}
			]
		}

		if (
			eventIdentification ==
				'banner_wifi_na_casa_toda_seu_wifi_nao_funciona_como_voce_gostaria_home_oi' &&
			eventTitle == 'conhecer_oi_fibra_x'
		) {
			items = [
				{
					item_id: 'conhecer_oi_fibra_x',
					item_name: 'Conhecer Oi Fibra X',
					item_brand: 'oi_fibra_x',
					item_category: 'oi_fibra_x',
					price: 'n/a',
					quantity: '1'
				}
			]
		}

		if (
			eventIdentification ==
				'banner_wifi_na_casa_toda_seu_wifi_nao_funciona_como_voce_gostaria_home_oi' &&
			eventTitle == 'conhecer_oi_fibra_x_premium'
		) {
			items = [
				{
					item_id: 'conhecer_oi_fibra_x_premium',
					item_name: 'Conhecer Oi Fibra X Premium',
					item_brand: 'oi_fibra_x',
					item_category: 'oi_fibra_x',
					price: 'n/a',
					quantity: '1'
				}
			]
		}

		return (
			window &&
			window.dataLayer &&
			window.dataLayer.push({
				event: eventName || 'view_promotion',
				creative_name: eventIdentification,
				creative_slot: eventIdentification,
				promotion_id: eventId,
				promotion_name: eventTitle,
				items: items
			})
		)
	}

	const selectPromotionEvent = (event) => {
		let eventIdentification =
			{
				'Quero internet pra empresa': 'quero_internet_pra_empresa',
				'Confira nossos parceiros': 'confira_nossos_parceiros',
				'conhecer Oi Fibra X':
					'banner_wifi_na_casa_toda_seu_wifi_nao_funciona_como_voce_gostaria_home_oi',
				'Conhecer Oi Fibra X Premium':
					'banner_wifi_na_casa_toda_seu_wifi_nao_funciona_como_voce_gostaria_home_oi'
			}[event.target.innerText] || 'banner_principal_home_oi'

		let eventId = {}[event.target.innerText] || ''

		let eventTitle =
			{
				'Quero internet pra empresa': 'quero_internet_pra_empresa',
				'Confira nossos parceiros': 'confira_nossos_parceiros',
				'conhecer Oi Fibra X': 'conhecer_oi_fibra_x',
				'Conhecer Oi Fibra X Premium': 'conhecer_oi_fibra_x_premium'
			}[event.target.innerText] || 'Assinar Oi Fibra'

		let eventOptions = {
			eventIdentification: eventIdentification,
			eventId: eventId,
			eventTitle: eventTitle,
			eventName: 'select_promotion'
		}
		return viewPromotionEvent(event, eventOptions)
	}

	const viewItemEvent = (
		event,
		{itemIdentification, eventName, itemName, itemBrand}
	) => {
		let items = [
			{
				item_id: itemName,
				item_name: itemName,
				item_brand: itemBrand || 'adicionais',
				item_category: itemBrand || 'adicionais',
				price: 'n/a',
				quantity: '1'
			}
		]

		if (
			itemIdentification ==
				'tv_e_streaming_assine_junto_com_a_oi_fibra_home_oi' &&
			!itemName
		) {
			items = [
				{
					item_id: 'globoplay',
					item_name: 'globoplay',
					item_brand: 'adicionais',
					item_category: 'adicionais',
					price: 'n/a',
					quantity: '1'
				},
				{
					item_id: 'paramount+',
					item_name: 'paramount+',
					item_brand: 'adicionais',
					item_category: 'adicionais',
					price: 'n/a',
					quantity: '1'
				},
				{
					item_id: 'combate',
					item_name: 'combate',
					item_brand: 'adicionais',
					item_category: 'adicionais',
					price: 'n/a',
					quantity: '1'
				},
				{
					item_id: 'premiere',
					item_name: 'premiere',
					item_brand: 'adicionais',
					item_category: 'adicionais',
					price: 'n/a',
					quantity: '1'
				}
			]
		}

		if (itemIdentification == 'solucoes_pro_seu_dia_a_dia' && !itemName) {
			items = [
				{
					item_id: 'oi_saude',
					item_name: 'Oi Saude',
					item_brand: 'oi_saude',
					item_category: 'oi_saude',
					price: 'n/a',
					quantity: '1'
				},
				{
					item_id: 'oi_energia',
					item_name: 'Oi Energia',
					item_brand: 'oi_energia',
					item_category: 'oi_energia',
					price: 'n/a',
					quantity: '1'
				}
			]
		}

		if (
			itemIdentification ==
				'marketplace_da_oi_os_melhores_produtos_de_tecnologia_estao_no_oi_place' &&
			!itemName
		) {
			items = [
				{
					item_id: 'smartphones',
					item_name: 'Smartphones',
					item_brand: 'oiplace',
					item_category: 'oiplace',
					price: 'n/a',
					quantity: '1'
				},
				{
					item_id: 'notebooks',
					item_name: 'Notebooks',
					item_brand: 'oiplace',
					item_category: 'oiplace',
					price: 'n/a',
					quantity: '1'
				},
				{
					item_id: 'games',
					item_name: 'Games',
					item_brand: 'oiplace',
					item_category: 'oiplace',
					price: 'n/a',
					quantity: '1'
				},
				{
					item_id: 'casa_inteligente',
					item_name: 'Casa inteligente',
					item_brand: 'oiplace',
					item_category: 'oiplace',
					price: 'n/a',
					quantity: '1'
				}
			]
		}
		return (
			window &&
			window.dataLayer &&
			window.dataLayer.push({
				event: eventName || 'view_item_list',
				item_list_id: itemIdentification,
				item_list_name: itemIdentification,
				items: items
			})
		)
	}

	const selectItemEvent = (event) => {
		let itemIdentification =
			{
				'conhecer o Oi Saúde': 'solucoes_pro_seu_dia_a_dia',
				'conhecer o Oi Energia': 'solucoes_pro_seu_dia_a_dia',
				'conferir ofertas':
					'marketplace_da_oi_os_melhores_produtos_de_tecnologia_estao_no_oi_place',
				'aproveitar ofertas':
					'marketplace_da_oi_os_melhores_produtos_de_tecnologia_estao_no_oi_place',
				'conhecer ofertas':
					'marketplace_da_oi_os_melhores_produtos_de_tecnologia_estao_no_oi_place'
			}[event.target.innerText] ||
			'tv_e_streaming_assine_junto_com_a_oi_fibra_home_oi'

		let itemName =
			{
				'Assinar Globoplay': 'globoplay',
				'Assinar Paramount+': 'paramount+',
				'Assinar Combate': 'combate',
				'Assinar Premiere': 'premiere',
				'conhecer o Oi Saúde': 'oi_saude',
				'conhecer o Oi Energia': 'oi_energia',
				'conferir ofertas': event.target.parentNode
					.querySelector('.oiPlace__contentTitle')
					.innerText.trim(),
				'aproveitar ofertas': event.target.parentNode
					.querySelector('.oiPlace__contentTitle')
					.innerText.trim(),
				'conhecer ofertas': event.target.parentNode
					.querySelector('.oiPlace__contentTitle')
					.innerText.trim()
			}[event.target.innerText] || ''

		let itemBrand =
			{
				'conhecer o Oi Saúde': 'Oi Saúde',
				'conhecer o Oi Energia': 'Oi Energia',
				'conferir ofertas': 'oiplace',
				'aproveitar ofertas': 'oiplace',
				'conhecer ofertas': 'oiplace'
			}[event.target.innerText] || null

		return viewItemEvent(event, {
			itemIdentification,
			eventName: 'select_item',
			itemName,
			itemBrand
		})
	}

	const bannerClickEvent = (event) => {
		const defaultProperties = defaultPropertiesFunction(event)

		return (
			window &&
			window.dataLayer &&
			window.dataLayer.push({
				event: 'banner_click',
				...defaultProperties
			})
		)
	}

	const selectContentEvent = (event) => {
		return (
			window &&
			window.dataLayer &&
			window.dataLayer.push({
				event: 'select_content',
				content_type: 'home_oi_blog',
				content_id: event.target.getAttribute('data-title')
			})
		)
	}

	const footerClickEvent = (event) => {
		const defaultProperties = defaultPropertiesFunction(event)

		return (
			window &&
			window.dataLayer &&
			window.dataLayer.push({
				event: 'footer_click',
				...defaultProperties
			})
		)
	}

	function newObserver({callback, root, target}) {
		let callbackFunction = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					callback(entry.target) // Pass the target element to the callback
				}
			})
		}

		let options = {
			root,
			rootMargin: '0px',
			threshold: 1
		}

		let observer = new IntersectionObserver(callbackFunction, options)
		observer.observe(target)
	}

	const analyticsHeaderBtns = document.querySelectorAll(
		`[data-analytics="header"]`
	)
	analyticsHeaderBtns.forEach((element) => {
		let anchorText = element.innerText
			.trim()
			.replace(/\s\s+/g, ' ')
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.replace(/[^a-zA-Z0-9\s]/g, '')
			.replace(/ /g, '_')
			.replace(/\r?\n|\r/g, '')

		if (anchorText == '') return

		element.classList.add(`btn_${anchorText}`)

		element.addEventListener('click', headerClickEvent)
	})

	const analyticsBannerBtns = document.querySelectorAll(
		`[data-analytics="banner"]`
	)
	analyticsBannerBtns.forEach((element) => {
		let anchorText = element.innerText
			.trim()
			.replace(/\s\s+/g, ' ')
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.replace(/[^a-zA-Z0-9\s]/g, '')
			.replace(/ /g, '_')
			.replace(/\r?\n|\r/g, '')

		if (anchorText == '') return

		element.classList.add(`btn_${anchorText}`)

		element.addEventListener('click', bannerClickEvent)
	})

	const analyticsFooterBtns = document.querySelectorAll(
		`[data-analytics="footer"]`
	)
	analyticsFooterBtns.forEach((element) => {
		let anchorText = element.innerText
			.trim()
			.replace(/\s\s+/g, ' ')
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.replace(/[^a-zA-Z0-9\s]/g, '')
			.replace(/ /g, '_')
			.replace(/\r?\n|\r/g, '')

		if (anchorText == '') return

		element.classList.add(`btn_${anchorText}`)

		element.addEventListener('click', footerClickEvent)
	})

	newObserver({
		root: document.querySelector('.heroBanner__section home-section'),
		target: document.querySelector('.heroBanner__flexbox-top'),
		callback: (event) =>
			viewPromotionEvent(event, {
				eventIdentification: 'banner_principal_home_oi',
				eventId: '',
				eventTitle: 'Assine Oi Fibra'
			})
	})

	newObserver({
		root: document.querySelector('.heroBanner__section home-section'),
		target: document.querySelector('.heroBanner__flexbox-bottom'),
		callback: (event) =>
			viewPromotionEvent(event, {
				eventIdentification:
					'banner_oi_fibra_a_internet_ideal_pra_sua_casa_home_oi',
				eventId: '',
				eventTitle: 'a internet ideal pra sua casa'
			})
	})

	newObserver({
		root: document.querySelector('.plansForCompanies__section home-section'),
		target: document.querySelector('.plansForCompanies__ctaArea'),
		callback: (event) =>
			viewPromotionEvent(event, {
				eventIdentification:
					'banner_quer_internet_fibra_optica_pra_sua_empresa_home_oi',
				eventId: '',
				eventTitle: 'Quer internet fibra ótica pra sua empresa?'
			})
	})

	newObserver({
		root: document.querySelector('.signStreaming__section home-section'),
		target: document.querySelector('.signStreaming__carousel-wrapper'),
		callback: (event) =>
			viewItemEvent(event, {
				itemIdentification: 'tv_e_streaming_assine_junto_com_a_oi_fibra_home_oi'
			})
	})

	newObserver({
		root: document.querySelector('.oiSolutions__section home-section'),
		target: document.querySelector('.oiSolutions__carousel-wrapper'),
		callback: (event) =>
			viewItemEvent(event, {
				itemIdentification: 'solucoes_pro_seu_dia_a_dia'
			})
	})

	newObserver({
		root: document.querySelector('.oiFibraX__section home-section'),
		target: document.querySelector('.oiFibraX__ctaArea'),
		callback: (event) =>
			viewPromotionEvent(event, {
				eventIdentification:
					'banner_wifi_na_casa_toda_seu_wifi_nao_funciona_como_voce_gostaria_home_oi',
				eventId: '',
				eventTitle: 'seu Wi-Fi não funciona como você gostaria?'
			})
	})

	newObserver({
		root: document.querySelector('.oiPlace__section home-section'),
		target: document.querySelector('.oiPlace__carousel-wrapper'),
		callback: (event) =>
			viewItemEvent(event, {
				itemIdentification:
					'marketplace_da_oi_os_melhores_produtos_de_tecnologia_estao_no_oi_place'
			})
	})

	const offersBtns = document.querySelectorAll('.offer-btn')
	offersBtns.forEach((element) => {
		element.addEventListener('click', selectPromotionEvent)
	})

	const selectItemsBtns = document.querySelectorAll('.select-item')
	selectItemsBtns.forEach((element) => {
		element.addEventListener('click', selectItemEvent)
	})

	const blogBtns = document.querySelectorAll('.oiNews__cardContentCTA')
	blogBtns.forEach((element) => {
		element.addEventListener('click', selectItemEvent)
	})
}

document.addEventListener('DOMContentLoaded', (event) => {
	analyticsContainerHelper()
})
