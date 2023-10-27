
const CARDS_WRAPPER = document.getElementById("servicos_oi__cardsWrapper");
const CARD_SIZE = CARDS_WRAPPER.children[0].offsetWidth;
const CARD_SIZE_WITH_MARGIN = CARD_SIZE + 24;
const SCREEN_WIDTH = window.innerWidth;

// A classe Container entra apenas nessa resolução
if (SCREEN_WIDTH >= 576) {
    const CONTAINER_DISABLE = document.querySelector(
        ".servicos_oi__container-disable"
    );
    CONTAINER_DISABLE.classList.add("container");
}

//Ajusta os valores para o max-width do css
let fixWidthValue = 240;
if (SCREEN_WIDTH >= 992) fixWidthValue = 300;

// Habiliata a escuta de evento do scroll
let scrollListeningEnabled;
CARDS_WRAPPER.addEventListener("touchmove", () => {
    scrollListeningEnabled = true;
});

//Atualiza as o dot atual de acordo com o scroll
CARDS_WRAPPER.addEventListener("scroll", (event) => {
    if (!scrollListeningEnabled) return;

    const CARD_ITEM = document.querySelectorAll(".servicos_oi__card-box");
    const ARRAY_CARD_ITEM = [...CARD_ITEM];

    const ARRAY_CARD_WIDTH_VALUE = ARRAY_CARD_ITEM.map(
        (card, index) => CARD_SIZE_WITH_MARGIN * index - fixWidthValue
    );

    const scrollLeft = event.target.scrollLeft;
    let currentCard = 0;

    ARRAY_CARD_WIDTH_VALUE.forEach((cardWidth, i) => {
        if (scrollLeft >= cardWidth) currentCard = i;
    });

    let timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        goToServiceCardIndexByDotColor({ value: currentCard });
    }, 150);
});

//Rolagem para o card correspondente ao dot clicado
const goToServiceCardIndexByDot = (e) => {
    scrollListeningEnabled = false;
    CARDS_WRAPPER.scrollLeft = CARD_SIZE_WITH_MARGIN * e.value;

    let timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        goToServiceCardIndexByDotColor(e);
    }, 150);
};

//Atualiza a Cor do dot clicado para ativo
const goToServiceCardIndexByDotColor = (e) => {
    const carouselDots = document.getElementById(
        "servicos_oi__carouselDotscontainer"
    );
    const dotsButtons = carouselDots.children;

    [...dotsButtons].forEach((_, index) => {
        dotsButtons[index].classList.remove("servicos_oi__card-radio-active");
    });

    const targetButton = dotsButtons[e.value];
    if (targetButton)
        targetButton.classList.add("servicos_oi__card-radio-active");
};

// Analytics
function staticObserver(config) {
    const {
        DOMElement,
        intersectingCallback = () => { },
        unobserve = false,
    } = config;

    let observer;
    function callback(entries) {
        entries.forEach(({ isIntersecting }) => {
            if (isIntersecting) intersectingCallback();
            if (isIntersecting && unobserve) observer.unobserve();
        });
    }

    observer = new IntersectionObserver(callback);
    observer.observe(DOMElement);
}

const oiServiceCards = ["Oi Play TV", "Oi Saude", "Oi Expert"];

const oiServiceItem = (item) => {
    return {
        item_id: item.toLowerCase().replaceAll(" ", "_"),
        item_name: item,
        item_brand: "Oi Fibra",
        item_category: "Internet Addons",
        item_list_name: "Internet Oi Servicos",
        item_list_name: "Internet Oi Servicos",
    };
};

function oiServiceEvent(event, items) {
    return dataLayer.push({
        event,
        item_list_id: "internet_oi_servicos",
        item_list_name: "Internet Oi Servicos",
        items: items.map((service) => oiServiceItem(service)),
    });
}

function viewOiService() {
    return oiServiceEvent("view_item_list", oiServiceCards);
}

function selectOiService(itemName) {
    return oiServiceEvent("select_item", [itemName]);
}

staticObserver({
    DOMElement: document.querySelector(".servicos_oi__section"),
    intersectingCallback: viewOiService,
});

[...document.querySelectorAll(".servicos_oi__cards_link")].forEach(
    (cardBtn, index) => {
        cardBtn.addEventListener("click", () => {
            selectOiService(oiServiceCards[index]);
        });
    }
);
