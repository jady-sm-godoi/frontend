document.addEventListener('DOMContentLoaded', function () {
	const oiSolutionsCarouselWrapper = document.querySelector(
		'.oiSolutions__carousel-wrapper'
	)
	const oiSolutionsCards = document.querySelectorAll('.oiSolutions__card')
	const oiSolutionsDotsContainer = document.querySelector(
		'.oiSolutions__dotsContainer'
	)
	let oiSolutionsActiveDotIndex = 0
	let oiSolutionsCardsVisible = Math.floor(
		oiSolutionsCarouselWrapper.offsetWidth / oiSolutionsCards[0].offsetWidth
	)

	function updateDotsToShow() {
		oiSolutionsCardsVisible = Math.floor(
			oiSolutionsCarouselWrapper.offsetWidth / oiSolutionsCards[0].offsetWidth
		)
		const dots = document.querySelectorAll('.oiSolutions__dot')
		for (let i = 0; i < oiSolutionsCards.length; i++) {
			if (i >= oiSolutionsCards.length - oiSolutionsCardsVisible + 1) {
				dots[i].style.display = 'none'
			} else dots[i].style.display = 'initial'
		}
	}

	function setupDots() {
		oiSolutionsDotsContainer.innerHTML = ''
		oiSolutionsCardsVisible = Math.floor(
			oiSolutionsCarouselWrapper.offsetWidth / oiSolutionsCards[0].offsetWidth
		)

		for (let i = 0; i < oiSolutionsCards.length; i++) {
			const dot = document.createElement('button')
			dot.classList.add('oiSolutions__dot')
			oiSolutionsDotsContainer.appendChild(dot)
			dot.addEventListener('click', function () {
				scrollToCard(i)
			})
		}

		oiSolutionsCarouselWrapper.addEventListener('scroll', updateActiveDot)
		updateActiveDot()
	}

	setupDots()
	updateDotsToShow()

	window.addEventListener('resize', updateDotsToShow)

	function scrollToCard(index) {
		const cardWidth = oiSolutionsCards[0].offsetWidth
		oiSolutionsCarouselWrapper.scrollLeft = index * cardWidth
	}

	function updateActiveDot() {
		const cardWidth = oiSolutionsCards[0].offsetWidth
		let oiSolutionsActiveDotIndexInView = Math.floor(
			oiSolutionsCarouselWrapper.scrollLeft / cardWidth
		)

		const elementMaxScroll =
			oiSolutionsCarouselWrapper.scrollWidth -
			oiSolutionsCarouselWrapper.clientWidth

		const isMaxScroll =
			oiSolutionsCarouselWrapper.scrollLeft - elementMaxScroll == 0

		if (isMaxScroll) {
			const dots = document.querySelectorAll('.oiSolutions__dot')
			const visibleDots = [...dots].filter((dot) => dot.style.display != 'none')
			oiSolutionsActiveDotIndexInView = visibleDots.length - 1
		}

		const dots = document.querySelectorAll('.oiSolutions__dot')
		dots.forEach((dot) => dot.classList.remove('active'))

		if (dots[oiSolutionsActiveDotIndexInView]) {
			dots[oiSolutionsActiveDotIndexInView].classList.add('active')
		}

		oiSolutionsActiveDotIndex = oiSolutionsActiveDotIndexInView
	}
})
