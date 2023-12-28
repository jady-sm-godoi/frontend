const defaultProperties = (event) => {
	const analyticsClass = [...event.target.classList].filter(
		(className) => className.indexOf('btn_') != -1
	)[0]

	const notOiBrLink = event.target.href.indexOf('oi.com.br') == -1

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
	const defaultProperties = defaultProperties(event)

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
	eventIdentification = 'banner_principal_home_oi'
) => {
	let items = {
		item_id: '',
		item_name: '',
		item_brand: 'oi_fibra_varejo_globoplay',
		item_category: 'oi_fibra_varejo_globoplay',
		price: '',
		quantity: '1'
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

	return (
		window &&
		window.dataLayer &&
		window.dataLayer.push({
			event: 'view_promotion',
			creative_name: eventIdentification,
			creative_slot: eventIdentification,
			promotion_id: '',
			promotion_name: '',
			items: items
		})
	)
}

const selectPromotionEvent = (event) => {
	return (
		window &&
		window.dataLayer &&
		window.dataLayer.push({
			event: 'select_promotion',
			creative_name: 'banner_principal_home_oi',
			creative_slot: 'banner_principal_home_oi',
			promotion_id: '',
			promotion_name: '',
			items: [
				{
					item_id: '',
					item_name: '',
					item_brand: 'oi_fibra_varejo_globoplay',
					item_category: 'oi_fibra_varejo_globoplay',
					price: '',
					quantity: '1'
				}
			]
		})
	)
}

const viewItemEvent = (event) => {
	return (
		window &&
		window.dataLayer &&
		window.dataLayer.push({
			event: 'view_item_list',
			item_list_id: 'tv_e_streaming_assine_junto_com_a_oi_fibra_home_oi',
			item_list_name: 'tv_e_streaming_assine_junto_com_a_oi_fibra_home_oi',
			items: [
				{
					item_id: '',
					item_name: '',
					item_brand: 'adicionais',
					item_category: 'adicionais',
					price: '',
					quantity: '1'
				},
				{
					item_id: '',
					item_name: '',
					item_brand: 'adicionais',
					item_category: 'adicionais',
					price: '',
					quantity: '1'
				}
			]
		})
	)
}

const selectItemEvent = (event) => {
	return (
		window &&
		window.dataLayer &&
		window.dataLayer.push({
			event: 'select_item',
			item_list_id: 'tv_e_streaming_assine_junto_com_a_oi_fibra_home_oi',
			item_list_name: 'tv_e_streaming_assine_junto_com_a_oi_fibra_home_oi',
			items: [
				{
					item_id: '',
					item_name: '',
					item_brand: 'adicionais',
					item_category: 'adicionais',
					price: '',
					quantity: '1'
				}
			]
		})
	)
}

const bannerClickEvent = (event) => {
	const defaultProperties = defaultProperties(event)

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
	const defaultProperties = defaultProperties(event)

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
	let callbackFunction = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				callback()
			}
		})
	}

	let options = {
		root,
		rootMargin: '0px'
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
	callback: viewPromotionEvent
})

newObserver({
	root: document.querySelector('.heroBanner__section home-section'),
	target: document.querySelector('.heroBanner__flexbox-bottom'),
	callback: (event) =>
		viewPromotionEvent(
			event,
			'banner_oi_fibra_a_internet_ideal_pra_sua_casa_home_oi'
		)
})

newObserver({
	root: document.querySelector('.plansForCompanies__flexbox'),
	target: document.querySelector('.plansForCompanies__ctaArea'),
	callback: (event) =>
		viewPromotionEvent(
			event,
			'banner_oi_fibra_a_internet_ideal_pra_sua_casa_home_oi'
		)
})

newObserver({
	root: document.querySelector('.signStreaming__flexbox'),
	target: document.querySelector('.signStreaming__carousel-wrapper'),
	callback: (event) => viewItemEvent(event)
})

newObserver({
	root: document.querySelector('.oiSolutions__section'),
	target: document.querySelector('.oiSolutions__carousel-wrapper'),
	callback: (event) => viewItemEvent(event)
})

newObserver({
	root: document.querySelector('.oiFibraX__section'),
	target: document.querySelector('.oiFibraX__ctaArea'),
	callback: (event) => viewPromotionEvent(event, '')
})

newObserver({
	root: document.querySelector('.oiPlace__section'),
	target: document.querySelector('.oiPlace__carousel-wrapper'),
	callback: (event) => viewItemEvent(event)
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
