function main() {
  return {
    productSearchInput: document.querySelector(".product-keyword"),
    productSearchBtn: document.querySelector(".product-search"),
  };
}
function submit() {
  if (main().productSearchInput.value != "") {
    window.location.href = `/product/search?keyword=${
      main().productSearchInput.value
    }`;
  }
}

function init() {
  main().productSearchBtn.addEventListener("click", submit);
}

init();
