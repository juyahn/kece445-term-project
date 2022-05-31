function header() {
  return {
    btnLogo: document.querySelector(".header__logo"),
  };
}
function toMainPage() {
  window.location.href = "/";
}
function init() {
  header().btnLogo.addEventListener("click", toMainPage);
}

init();
