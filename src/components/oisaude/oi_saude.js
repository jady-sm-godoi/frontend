// const carousel = document.querySelector('.oi_saude__carousel');
// const slides = document.querySelectorAll('.oi_saude__card');
// const dots = document.querySelectorAll('.oi_saude__card_dot');
// let currentIndex = 0;
// let autoPlayInterval;

// dots.forEach((dot, index) => {
//     dot.addEventListener('click', () => {
//         goToSlide(index);
//     });
// });

// function goToSlide(index) {
//     slides.forEach((slide, i) => {
//         slide.style.transform = `translateX(-${index * 100}%)`;
//         dots[i].classList.remove('oi_saude__card_dot_active');
//     });
//     dots[index].classList.add('oi_saude__card_dot_active');
//     currentIndex = index;
//     console.log("index", index);
// }

// function nextSlide() {
//     currentIndex = (currentIndex + 1) % slides.length;
//     console.log("index", index);
//     goToSlide(currentIndex);

// }

// function prevSlide() {
//     currentIndex = (currentIndex - 1 + slides.length) % slides.length;
//     goToSlide(currentIndex);
// }

// function checkScreenWidth() {
//     if (window.innerWidth >= 992) {
//         currentIndex = 0; // Volte ao primeiro slide
//         clearInterval(autoPlayInterval); // Pausa a reprodução automática
//         goToSlide(currentIndex); // Atualize o slide visível
//     }
// }

// //Função de verificação de largura da tela quando a página é carregada
// window.addEventListener('load', checkScreenWidth);
// window.addEventListener('resize', checkScreenWidth);

// if (window.innerWidth < 992) {
//     autoPlayInterval = setInterval(nextSlide, 3000);

// }