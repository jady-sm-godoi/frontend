// const carousel = document.querySelector('.oi_saude__carousel');
// const slides = document.querySelectorAll('.oi_saude__card');
// const dots = document.querySelectorAll('.oi_saude__card_dot');

// let currentIndex = 0;

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
// }

// function nextSlide() {
//     currentIndex = (currentIndex + 1) % slides.length;
//     goToSlide(currentIndex);
// }

// function prevSlide() {
//     currentIndex = (currentIndex - 1 + slides.length) % slides.length;
//     goToSlide(currentIndex);
// }

// setInterval(nextSlide, 5000); // Automatic slide change every 3 seconds
