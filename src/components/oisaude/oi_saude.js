function oiSaudeHandler() {
	const carousel = document.querySelector('.oi_saude__carousel')
	const slides = document.querySelectorAll('.oi_saude__card')
	const dots = document.querySelectorAll('.oi_saude__card_dot')
	let currentIndex = 0
	let startX
	let isDragging = false
	let lastUpdateSlide = new Date().getTime()

	dots.forEach((dot, index) => {
		dot.addEventListener('click', () => {
			goToSlide(index)
		})
	})

	carousel.addEventListener('touchstart', touchStart)
	carousel.addEventListener('touchmove', touchMove)
	carousel.addEventListener('touchend', touchEnd)

	function touchStart(e) {
		startX = e.touches[0].clientX
		isDragging = true
	}

	function touchMove(e) {
		if (!isDragging) return

		const touchX = e.touches[0].clientX
		const diff = startX - touchX

		// Impede a rolagem da página enquanto o usuário desliza
		e.preventDefault()

		// Ajuste o valor para controlar a sensibilidade do movimento
		const sensitivity = 0.5 // Ajuste conforme necessário
		const moveAmount = diff * sensitivity

		// Atualiza a posição do carrossel
		carousel.style.transform = `translateX(-${currentIndex * 100 + moveAmount
			}%)`
	}

	function touchEnd(e) {
		isDragging = false

		// Determina se o usuário deslizou para a esquerda ou para a direita
		if (startX - e.changedTouches[0].clientX > 0) {
			nextSlide()
		} else {
			prevSlide()
		}
	}

	function goToSlide(index) {
		lastUpdateSlide = new Date().getTime()

		slides.forEach((slide, i) => {
			slide.style.transform = `translateX(-${index * 100}%)`
			dots[i].classList.remove('oi_saude__card_dot_active')
		})
		dots[index].classList.add('oi_saude__card_dot_active')
		currentIndex = index
	}

	function nextSlide() {
		currentIndex = Math.min(currentIndex + 1, slides.length - 1)
		updateCarousel()
	}

	function prevSlide() {
		currentIndex = Math.max(currentIndex - 1, 0)
		updateCarousel()
	}

	function updateCarousel() {
		const slideWidth = 100; // Largura de cada slide em porcentagem
		const maxTranslate = -((slides.length - 1) * slideWidth) + 24; // Limite de 24px para o último slide
		const translateValue = Math.max(
			maxTranslate,
			Math.min(-currentIndex * slideWidth, 0)
		);

		carousel.style.transform = `translateX(${translateValue}%)`;

		dots.forEach((dot, i) => {
			dot.classList.toggle('oi_saude__card_dot_active', i === currentIndex);
		});

		// Verifica se a largura da tela é maior ou igual a 992 pixels
		if (window.innerWidth >= 992) {
			// Reposiciona o carrossel para o primeiro slide quando acima de 992 pixels
			const newTranslateValue = Math.max(0, translateValue);
			carousel.style.transform = `translateX(-${newTranslateValue}%)`;
		}
	}

	function checkScreenWidth() {
		if (window.innerWidth >= 992) {
			currentIndex = 0
			updateCarousel()
		}
	}

	async function autoSkipSlide(delay) {
		let index = 0;

		while (true) {
			await new Promise((resolve) => setTimeout(resolve, delay));
			index = (index + 1) % dots.length;

			const currentUpdateSlide = new Date().getTime();

			if (window.innerWidth <= 992) {
				if (currentUpdateSlide - lastUpdateSlide >= delay) {
					goToSlide(index);
				}
			} else {
				// Se a largura da tela for maior que 992 pixels, volte para o primeiro slide
				goToSlide(0);
				index = 0;
			}
		}
	}

	autoSkipSlide(5000);

	window.addEventListener('load', checkScreenWidth);
	window.addEventListener('resize', checkScreenWidth);
}

oiSaudeHandler()
