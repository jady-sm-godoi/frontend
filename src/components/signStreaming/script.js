document.addEventListener('DOMContentLoaded', function () {
	const signStreamingCarouselWrapper = document.querySelector(
		'.signStreaming__carousel-wrapper'
	)
	const signStreamingCards = document.querySelectorAll('.signStreaming__card')
	const signStreamingDotsContainer = document.querySelector(
		'.signStreaming__dotsContainer'
	)
	let signStreamingActiveDotIndex = 0
	let signStreamingCardsVisible = Math.floor(
		signStreamingCarouselWrapper.offsetWidth / signStreamingCards[0].offsetWidth
	)

	function updateDotsToShow() {
		signStreamingCardsVisible = Math.floor(
			signStreamingCarouselWrapper.offsetWidth /
				signStreamingCards[0].offsetWidth
		)
		const dots = document.querySelectorAll('.signStreaming__dot')
		for (let i = 0; i < signStreamingCards.length; i++) {
			if (i >= signStreamingCards.length - signStreamingCardsVisible + 1) {
				dots[i].style.display = 'none'
			} else dots[i].style.display = 'initial'
		}
	}

	function setupDots() {
		signStreamingDotsContainer.innerHTML = ''
		signStreamingCardsVisible = Math.floor(
			signStreamingCarouselWrapper.offsetWidth /
				signStreamingCards[0].offsetWidth
		)

		for (let i = 0; i < signStreamingCards.length; i++) {
			const dot = document.createElement('button')
			dot.classList.add('signStreaming__dot')
			signStreamingDotsContainer.appendChild(dot)
			dot.addEventListener('click', function () {
				scrollToCard(i)
			})
		}

		signStreamingCarouselWrapper.addEventListener('scroll', updateActiveDot)
		updateActiveDot()
	}

	setupDots()
	updateDotsToShow()

	window.addEventListener('resize', updateDotsToShow)

	function scrollToCard(index) {
		const cardWidth = signStreamingCards[0].offsetWidth
		signStreamingCarouselWrapper.scrollLeft = index * cardWidth
	}

	function updateActiveDot() {
		const cardWidth = signStreamingCards[0].offsetWidth
		let signStreamingActiveDotIndexInView = Math.floor(
			signStreamingCarouselWrapper.scrollLeft / cardWidth
		)

		const elementMaxScroll =
			signStreamingCarouselWrapper.scrollWidth -
			signStreamingCarouselWrapper.clientWidth

		const isMaxScroll =
			signStreamingCarouselWrapper.scrollLeft - elementMaxScroll == 0

		if (isMaxScroll) {
			const dots = document.querySelectorAll('.signStreaming__dot')
			const visibleDots = [...dots].filter((dot) => dot.style.display != 'none')
			signStreamingActiveDotIndexInView = visibleDots.length - 1
		}

		const dots = document.querySelectorAll('.signStreaming__dot')
		dots.forEach((dot) => dot.classList.remove('active'))

		if (dots[signStreamingActiveDotIndexInView]) {
			dots[signStreamingActiveDotIndexInView].classList.add('active')
		}

		signStreamingActiveDotIndex = signStreamingActiveDotIndexInView
	}
})
