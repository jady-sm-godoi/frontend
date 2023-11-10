// function oiPlaceHandler() {
// 	const oiPlaceCardsWrapper = document.getElementById('oiPlaceCardsWrapper')
// 	console.log('test', document.querySelector('#oiPlaceCardsWrapper'))
// 	const oiPlaceCardSize = oiPlaceCardsWrapper.children[0].offsetWidth
// 	const oiPlaceCardSizeWithMargin = oiPlaceCardSize + 40
// 	const oiPlaceBtnArrowPrev = document.getElementById('oiPlaceBtnArrowPrev')
// 	const oiPlaceBtnArrowNext = document.getElementById('oiPlaceBtnArrowNext')
// 	let screenWidth

// 	oiPlaceBtnArrowPrev.onclick = function () {
// 		screenWidth = window.innerWidth
// 		oiPlaceCardsWrapper.scrollLeft -=
// 			screenWidth >= 1364 ? oiPlaceCardSize * 3 : oiPlaceCardSize
// 	}
// 	oiPlaceBtnArrowNext.onclick = function () {
// 		screenWidth = window.innerWidth
// 		oiPlaceCardsWrapper.scrollLeft +=
// 			screenWidth >= 1364 ? oiPlaceCardSize * 3 : oiPlaceCardSize
// 	}

// 	const cardsItem = document.querySelectorAll('.oiplace_card_item')
// 	const arrayCardItem = Array.from(cardsItem)
// 	const arrayCardWidth = arrayCardItem.map(
// 		(card, index) => oiPlaceCardSizeWithMargin * index
// 	)
// 	let timeoutId

// 	oiPlaceCardsWrapper.addEventListener('scroll', (event) => {
// 		const currentCard = arrayCardWidth.indexOf(
// 			arrayCardWidth.find((card) => event.target.scrollLeft <= card)
// 		)

// 		clearTimeout(timeoutId)
// 		timeoutId = setTimeout(() => {
// 			goToCardIndex({value: currentCard})
// 		}, 150)

// 		const scrollPosition = event.target.scrollLeft
// 		const scrollWidth = event.target.scrollWidth
// 		const containerWidth = event.target.clientWidth

// 		let isScrollEnd = scrollPosition + containerWidth >= scrollWidth
// 		const isScrollStart = scrollPosition === 0

// 		oiPlaceBtnArrowPrev.style.visibility = isScrollStart ? 'hidden' : 'visible'
// 		oiPlaceBtnArrowNext.style.visibility = isScrollEnd ? 'hidden' : 'visible'
// 	})
// }