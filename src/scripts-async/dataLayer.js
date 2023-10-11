// Initial config for setting up modals
function debounce(functionCallback, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      functionCallback.apply(this, args);
    }, timeout);
  };
}

////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  window.dataLayer.push({
    event: "pageview",
    path: "/internet",
  });
});

const mappedButtons = [
  {
    name: "link_item_menu_secao_oi_fibra",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "link_item_menu_secao_oi_fibra",
  },
  {
    name: "link_item_menu_secao_oi_play",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "link_item_menu_secao_oi_play",
  },
  {
    name: "link_item_menu_secao_beneficios",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "link_item_menu_secao_beneficios",
  },
  {
    name: "link_item_menu_secao_teste_de_velocidade",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "link_item_menu_secao_teste_de_velocidade",
  },
  {
    name: "banner_bora-bora_btn_consultar-disponibilidade",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "banner_bora-bora_btn_consultar-disponibilidade",
  },
  {
    name: "btn_header_consultar-disponibilidade",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "btn_header_consultar-disponibilidade",
  },
  {
    name: "atendimento-button",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "atendimento-button",
  },
  {
    name: "contato_float_button",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "contato_float_button",
  },
  {
    name: "whatsapp-contact-button",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "whatsapp-contact-button",
  },
  {
    name: "chat-contact-button",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "chat-contact-button",
  },
  {
    name: "telephone-contact-button",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "telephone-contact-button",
  },
  {
    name: "iniciar_chat_button",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "iniciar_chat_button",
  },
  {
    name: "ligar_0800_button",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "ligar_0800_button",
  },
  {
    name: "whatsapp-footer-contact-button",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "whatsapp-footer-contact-button",
  },
  {
    name: "oi_e-contact-button",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "oi_e-contact-button",
  },
  {
    name: "telefone-footer-contact-button",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "telefone-footer-contact-button",
  },
  {
    name: "click_aba_internet_oi_fibra",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "click_aba_internet_oi_fibra",
  },
  {
    name: "click_aba_telefone_fixo",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "click_aba_telefone_fixo",
  },
  {
    name: "click_aba_oi_play_tv",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "click_aba_oi_play_tv",
  },
  {
    name: "btn_saibamais_assine-agora",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "btn_saibamais_assine-agora",
  },
  {
    name: "btn_saibamais_assine-pelo-whatsapp",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "btn_saibamais_assine-pelo-whatsapp",
  },
  {
    name: "btn_section-oi-play_consultar-disponibilidade",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "btn_section-oi-play_consultar-disponibilidade",
  },
  {
    name: "btn_section-oi-play_saibar-mais-sobre-o-serviço-de-oi-play-_saiba-mais",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction:
      "btn_section-oi-play_saibar-mais-sobre-o-serviço-de-oi-play-_saiba-mais",
  },
  {
    name: "btn_apple_store_oi_e",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "btn_apple_store_oi_e",
  },
  {
    name: "btn_google_play-oi_e",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "btn_google_play-oi_e",
  },
  {
    name: "btn_section-oi-expert_mais-sobre-oi-expert",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "btn_section-oi-expert_mais-sobre-oi-expert",
  },
  {
    name: "btn_section-oi-expert_saibar-mais-sobre-o-serviço-de-oi-fibra-_saiba-mais",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction:
      "btn_section-oi-expert_saibar-mais-sobre-o-serviço-de-oi-fibra-_saiba-mais",
  },
  {
    name: "link_redireção_para_oi_place",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "link_redireção_para_oi_place",
  },
  {
    name: "btn_duvidas-ver-mais-duvidas",
    eventLabel: "clicou",
    eventCategory: "b2c_nova_fibra",
    eventAction: "btn_duvidas-ver-%altern%-duvidas",
    altern: "menos:mais",
  },
  // {
  //   name: "btn_duvidas-ver-menos-duvidas",
  //   eventLabel: "clicou",
  //   eventCategory: "b2c_nova_fibra",
  //   eventAction: "btn_duvidas-ver-menos-duvidas",
  //   altern: null
  // },
];

// (async () => {
//   const reciveFetchOffers = await fetchOffers();
//   reciveFetchOffers.offers.forEach((elem) => {
//     mappedButtons.push({
//       name: elem.code,
//       eventAction: "" + elem.code,
//     });

//     elem.code;
//   });
// })();

function appendDataLayer(label, category, action, altern = undefined) {
  window.dataLayer.push({
    event: "internet_event",
    eventLabel: label,
    eventCategory: category,
    eventAction: altern ? action.replace("%altern%", altern) : action,
  });
}

/**
 * how to work altern mode?
 * 
 * if you need altern gtm tag beetween two modes, exemple:
 *    btn_duvidas-ver-menos-duvidas
 *    btn_duvidas-ver-mais-duvidas
 * 
 * you can add a key into object responsible by element
 * exemple:
 * 
 *  1° - insert a %altern% on event action where you need altern
 *    ex: btn_duvidas-ver-%altern%-duvidas
 * 
 *  2° include a new key on object.
 *    ex: altern: "menos:mais"
 *   
 *  > this will do altern beetween "menos" or "mais" where %altern% on event action when user click
 * 
 */

document.querySelectorAll("[data-gtmButton]").forEach((e) => {
  mappedButtons.find((elem) => {
    if (elem.name == e.dataset.gtmbutton) {
      // save button on array
      elem["button"] = e;

      // remove atibute
      e.removeAttribute("data-gtmButton");

      // split altern statement and pick fist element to save as default
      elem.altern && (elem["current_altern"] = elem.altern.split(":")[0]);

      // increase a event listener on button to listen when click
      e.addEventListener("click", (i) => {
        let altern = undefined;

        // loop array to find element
        mappedButtons.forEach((alternElem) => {
          // run funct if exists altern key on objct
          if (alternElem.button == i.currentTarget && alternElem.altern) {
            // split altern
            const getStatements = alternElem.altern.split(":");

            // verify if current altern is equal to first split statement. If is equal, pick a secound element on split else pick the first
            alternElem.current_altern =
              getStatements[
                getStatements[0] == alternElem.current_altern ? 1 : 0
              ];

            // save altern state in let altern to send a "appendDataLayer" funct
            altern = alternElem.current_altern;
          }
        });
        appendDataLayer(
          elem.eventLabel,
          elem.eventCategory,
          elem.eventAction,
          altern
        );
      });
    }
  });
});
