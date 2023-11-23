const cardsWrapper = document.getElementById("cardsWrapper");
const cardSize= cardsWrapper.children[0].offsetWidth;
const cardSizeWithMargin = cardSize + 40;
const btnArrowPrev = document.getElementById("btnArrowPrev");
const btnArrowNext = document.getElementById("btnArrowNext");
let screenWidth;

const hideLastDotToTabletSize = () => {
  const lastDot = document.querySelector(".dot5");
  screenWidth = window.innerWidth;
  lastDot.style.display = screenWidth >= 470 ? "none" : "";
};

hideLastDotToTabletSize();



btnArrowPrev.onclick = function () {
  screenWidth = window.innerWidth;
  cardsWrapper.scrollLeft -= screenWidth >= 1364 ? cardSize* 3 : cardSize;
};

btnArrowNext.onclick = function () {
  screenWidth = window.innerWidth;
  cardsWrapper.scrollLeft += screenWidth >= 1364 ? cardSize* 3 : cardSize;
};

function goToCardIndex(e) {
  cardsWrapper.scrollLeft = cardSizeWithMargin * e.value;
  const carouselDots = document.querySelector(".carousel_dots");
  const dotsButtons = carouselDots.children;

  for (let i = 0; i < dotsButtons.length; i++) {
    dotsButtons[i].classList.remove("active");
  }

  const targetButton = dotsButtons[e.value];
  if (targetButton) {
    targetButton.classList.add("active");
  }
}

const cardsItem = document.querySelectorAll(".card_item");
let arrayCardWidth = [...cardsItem].map((card, index) => cardSizeWithMargin * index);
let timeoutId;

window.addEventListener("resize", function () {
  hideLastDotToTabletSize();
  
  arrayCardWidth = [...cardsItem].map((card, index) => cardSizeWithMargin * index);
});


cardsWrapper.addEventListener("scroll", (event) => {
  const currentCard = arrayCardWidth.indexOf(arrayCardWidth.find((card) => event.target.scrollLeft <= card));

  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    goToCardIndex({ value: currentCard });
  }, 150);

  const scrollPosition = event.target.scrollLeft;
  const scrollWidth = event.target.scrollWidth;
  const containerWidth = event.target.clientWidth;


  let isScrollEnd = scrollPosition + containerWidth >= scrollWidth;
  const isScrollStart = scrollPosition === 0;

  btnArrowPrev.style.visibility = isScrollStart ? "hidden" : "visible";
  btnArrowNext.style.visibility = isScrollEnd ? "hidden" : "visible";
});