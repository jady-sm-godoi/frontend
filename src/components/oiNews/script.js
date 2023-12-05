document.addEventListener('DOMContentLoaded', function () {
	const oiNewsCarouselWrapper = document.querySelector('.oiNews__carousel-wrapper')
	const oiNewsCards = document.querySelectorAll('.oiNews__card')
	const oiNewsDotsContainer = document.querySelector('.oiNews__dotsContainer')
	let oiNewsActiveDotIndex = 0
	let oiNewsCardsVisible = Math.floor(oiNewsCarouselWrapper.offsetWidth / oiNewsCards[0].offsetWidth)

	function updateDotsToShow() {
		oiNewsCardsVisible = Math.floor(oiNewsCarouselWrapper.offsetWidth / oiNewsCards[0].offsetWidth)
		const dots = document.querySelectorAll('.oiNews__dot')
		for (let i = 0; i < oiNewsCards.length; i++) {
			if (i >= oiNewsCards.length - oiNewsCardsVisible + 1) {
				dots[i].style.display = 'none'
			} else dots[i].style.display = 'initial'
		}
	}

	function setupDots() {
		oiNewsDotsContainer.innerHTML = ''
		oiNewsCardsVisible = Math.floor(oiNewsCarouselWrapper.offsetWidth / oiNewsCards[0].offsetWidth)

		for (let i = 0; i < oiNewsCards.length; i++) {
			const dot = document.createElement('button')
			dot.classList.add('oiNews__dot')
			oiNewsDotsContainer.appendChild(dot)
			dot.addEventListener('click', function () {
				scrollToCard(i)
			})
		}

		oiNewsCarouselWrapper.addEventListener('scroll', updateActiveDot)
		updateActiveDot()
	}

	setupDots()
	updateDotsToShow()

	window.addEventListener('resize', updateDotsToShow)

    function scrollToCard(index) {
		const cardWidth = oiNewsCards[0].offsetWidth
		oiNewsCarouselWrapper.scrollLeft = index * cardWidth
	}

	function updateActiveDot() {
		const cardWidth = oiNewsCards[0].offsetWidth
		const oiNewsActiveDotIndexInView = Math.floor(oiNewsCarouselWrapper.scrollLeft / cardWidth)

		const dots = document.querySelectorAll('.oiNews__dot')
		dots.forEach((dot) => dot.classList.remove('active'))

		if (dots[oiNewsActiveDotIndexInView]) {
			dots[oiNewsActiveDotIndexInView].classList.add('active')
		}

		oiNewsActiveDotIndex = oiNewsActiveDotIndexInView
	}
})
