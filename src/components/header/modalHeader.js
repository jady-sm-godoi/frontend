const arrCity = [
  {
    id: 4329,
    city: "Salvador das Missões",
    uf: "RS",
    ddd: 55,
    normalized: "salvador das missoes",
  },
  {
    id: 4330,
    city: "Salvador do Sul",
    uf: "RS",
    ddd: 51,
    normalized: "salvador do sul",
  },
  {
    id: 4882,
    city: "São Salvador do Tocantins",
    uf: "TO",
    ddd: 63,
    normalized: "sao salvador do tocantins",
  },
  {
    id: 4328,
    city: "Salvador",
    uf: "BA",
    ddd: 71,
    normalized: "salvador",
  },
];

const modalStructure = `<div class="header-modal_search_bar">
    <div class="max_width_container header-modal_input-content">
      <input oninput="searchCity(this)" placeholder="ONDE VOCÊ ESTÁ?" id="header-modal_inputcontent">
      <button onclick="destroyModal()" >CANCELAR</button>
    </div>
  </div>
  `;

const selectCity = (city) => {
  const fetchCity = arrCity.find(
    (mapcity) => mapcity.id == city.dataset.cityid
  );
  const getHeaderText = document.getElementById("changeLocalization");
  getHeaderText.dataset["normalized"] = city.dataset.normalized;
  getHeaderText.innerHTML = `${fetchCity.city}, ${fetchCity.uf}`;
  destroyModal();
};

const showCitys = (arr) => {
  const getUlContent = document.getElementById("container-city-modal");
  getUlContent.innerHTML = "";

  arr.forEach((city, index) => {
    const createRowLi = document.createElement("li");
    const createRowButton = document.createElement("button");
    createRowButton.setAttribute("class", "header-modal_li_buttons");
    createRowButton.innerText = `${city.city.toUpperCase()}, ${city.uf.toUpperCase()}`;
    createRowButton.dataset["cityid"] = city.id;
    createRowButton.dataset["normalized"] = city.normalized;

    createRowButton.autofocus = true;

    createRowButton.setAttribute("onclick", "selectCity(this)");
    createRowLi.appendChild(createRowButton);
    getUlContent.appendChild(createRowLi);
  });
  mappingFocusedButtons();
};

let getSearchInput = "";

const searchCity = (e) => {
  getSearchInput = e.value.toLowerCase();

  const newFilter = arrCity.filter(
    (filterCity) =>
      filterCity.normalized.toLowerCase().includes(getSearchInput) ||
      filterCity.city.toLowerCase().includes(getSearchInput) ||
      filterCity.uf.toLowerCase().includes(getSearchInput)
  );

  // making a fetch on backend
  fetchCitysOnBackend(e.value);
  // render cityes
  showCitys(newFilter);

  // mapping focused buttons
  mappingFocusedButtons();
};

let breakingFetchRequest = false;
const fetchCitysOnBackend = (city) => {
  if (!breakingFetchRequest) {
    breakingFetchRequest = true;

    setTimeout(() => {
      console.log("Requisição feita para:", getSearchInput);
      console.log("Encoded url", encodeURI(getSearchInput));
      breakingFetchRequest = false;
    }, 1000);
  }
};

// HOW TO GET OFFER

// const getHeroBannerOffer = () => {
//   const foundOffer = offers.list.find(
//     (offer) => offer.offerCode === offers.heroOffer
//   )
//   if (foundOffer) {
//     return foundOffer
//   } else {
//     return offers.list[0]
//   }
// }

const openModal = () => {
  const createModal = document.createElement("div");

  createModal.id = "header-modal-container";
  createModal.setAttribute("class", "header-modal_city_modal");
  createModal.innerHTML = modalStructure;

  document.body.appendChild(createModal);

  const createUl = document.createElement("ul");
  createUl.className = "max_width_container elUl";
  createUl.id = "container-city-modal";
  createModal.appendChild(createUl);
  showCitys(arrCity);
  document.getElementById("header-modal_inputcontent").focus();

  mappingFocusedButtons();
};

function destroyModal() {
  const getModal = document.getElementById("header-modal-container");
  document.body.removeChild(getModal);
}

function mappingFocusedButtons() {
  const modal = document.getElementById("header-modal-container");

  function handleTabKey(e) {
    const tagsModal = modal.querySelectorAll("input, ul, button");

    const modalElements =
      tagsModal.length <= 3
        ? modal.querySelectorAll("input, button")
        : modal.querySelectorAll("input, ul, button");

    const firstElement = modalElements[0];
    const lastElement = modalElements[modalElements.length - 1];

    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  }
  modal.addEventListener("keydown", handleTabKey);

  modal.onkeydown = function (e) {
    e.key === "Escape" && destroyModal();
  };
}
