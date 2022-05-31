const sendQueryData = (method, url, data) => {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open(method, url, false);
  xmlHttp.setRequestHeader("Content-type", "application/json");
  xmlHttp.send(JSON.stringify(data));
  if (xmlHttp.status === 200) {
    return xmlHttp.responseText;
  }
};
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
