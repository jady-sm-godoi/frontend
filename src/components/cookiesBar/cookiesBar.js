// const modal = document.getElementById("cookies_bar_botao_entrar");
const sectionCookiesBar = document.querySelector(".cookies_bar_section");
const cookiesStorage = localStorage.getItem("cookies");


function fecharCookies() {

    cookiesStorage == null || cookiesStorage == "false" ?
    (localStorage.setItem("cookies", true), 
    sectionCookiesBar.style.display = "none") :
    null;
}

function onReloadfecharCookies() {
    cookiesStorage == "true" ? (sectionCookiesBar.style.display = "none") : null;
}

onReloadfecharCookies();
