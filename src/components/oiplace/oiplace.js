const cardsWrapper = document.getElementById("oiPlaceCardsWrapper");
const cardSize= cardsWrapper.children[0].offsetWidth;
const cardSizeWithMargin = cardSize + 40;
const btnArrowPrev = document.getElementById("oiPlacebtnArrowPrev");
const btnArrowNext = document.getElementById("oiPlacebtnArrowNext");
let screenWidth;

btnArrowPrev.onclick = function () {
  screenWidth = window.innerWidth;
  cardsWrapper.scrollLeft -= screenWidth >= 1364 ? cardSize* 3 : cardSize;
};

btnArrowNext.onclick = function () {
  screenWidth = window.innerWidth;
  cardsWrapper.scrollLeft += screenWidth >= 1364 ? cardSize* 3 : cardSize;
};

const cardsItem = document.querySelectorAll(".oiplace_card_item");
const arrayCardItem = Array.from(cardsItem);
const arrayCardWidth = arrayCardItem.map((card, index) => cardSizeWithMargin * index);
let timeoutId;

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