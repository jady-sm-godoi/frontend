document.addEventListener('DOMContentLoaded', function () {
	const oiPlaceCarouselWrapper = document.querySelector('.oiPlace__carousel-wrapper')
	const oiPlaceCards = document.querySelectorAll('.oiPlace__card')
	const oiPlaceDotsContainer = document.querySelector('.oiPlace__dotsContainer')
	let oiPlaceActiveDotIndex = 0
	let oiPlaceCardsVisible = Math.floor(oiPlaceCarouselWrapper.offsetWidth / oiPlaceCards[0].offsetWidth)

	function updateDotsToShow() {
		oiPlaceCardsVisible = Math.floor(oiPlaceCarouselWrapper.offsetWidth / oiPlaceCards[0].offsetWidth)
		const dots = document.querySelectorAll('.oiPlace__dot')
		for (let i = 0; i < oiPlaceCards.length; i++) {
			if (i >= oiPlaceCards.length - oiPlaceCardsVisible + 1) {
				dots[i].style.display = 'none'
			} else dots[i].style.display = 'initial'
		}
	}

	function setupDots() {
		oiPlaceDotsContainer.innerHTML = ''
		oiPlaceCardsVisible = Math.floor(oiPlaceCarouselWrapper.offsetWidth / oiPlaceCards[0].offsetWidth)

		for (let i = 0; i < oiPlaceCards.length; i++) {
			const dot = document.createElement('button')
			dot.classList.add('oiPlace__dot')
			oiPlaceDotsContainer.appendChild(dot)
			dot.addEventListener('click', function () {
				scrollToCard(i)
			})
		}

		oiPlaceCarouselWrapper.addEventListener('scroll', updateActiveDot)
		updateActiveDot()
	}

	setupDots()
	updateDotsToShow()

	window.addEventListener('resize', updateDotsToShow)

    function scrollToCard(index) {
		const cardWidth = oiPlaceCards[0].offsetWidth
		oiPlaceCarouselWrapper.scrollLeft = index * cardWidth
	}

	function updateActiveDot() {
		const cardWidth = oiPlaceCards[0].offsetWidth
		const oiPlaceActiveDotIndexInView = Math.floor(oiPlaceCarouselWrapper.scrollLeft / cardWidth)

		const dots = document.querySelectorAll('.oiPlace__dot')
		dots.forEach((dot) => dot.classList.remove('active'))

		if (dots[oiPlaceActiveDotIndexInView]) {
			dots[oiPlaceActiveDotIndexInView].classList.add('active')
		}

		oiPlaceActiveDotIndex = oiPlaceActiveDotIndexInView
	}
})
