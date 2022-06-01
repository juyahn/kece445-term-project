const sendQueryData = (method, url, data) => {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open(method, url, false);
  xmlHttp.setRequestHeader("Content-type", "application/json");
  xmlHttp.send(JSON.stringify(data));
  if (xmlHttp.status === 200) {
    return xmlHttp.responseText;
  }
};
function product() {
  return {
    productCommentInput: document.querySelector(".comment-input"),
    productCommentBtn: document.querySelector(".comment-submit"),
    productStatus: document.querySelector(".product-status"),
    productDelete: document.querySelector(".delete-product"),
  };
}
function submit() {
  if (product().productCommentInput.value != "") {
    const data = {
      userId,
      productId,
      comment: product().productCommentInput.value,
    };
    const responseText = sendQueryData("POST", "/product/comment", data);
    const { success } = JSON.parse(responseText);
    if (success) {
      window.location.reload();
    }
  }
}

function changeProductStatus() {
  const { owns, selling, wish } = product().productStatus.dataset;
  const method = owns == userId ? "PATCH" : wish == 1 ? "DELETE" : "POST";
  const url = owns == userId ? "/product/selling" : "/product/wishes";
  const data =
    owns == userId
      ? {
          isSold: selling,
          productId,
        }
      : { userId, productId };
  const responseText = sendQueryData(method, url, data);
  const { success, text } = JSON.parse(responseText);
  if (success) {
    window.alert(text);
    window.location.reload();
  }
}

function deleteProduct() {
  const responseText = sendQueryData("DELETE", "/product/detail", {
    productId,
  });
  const { success, text } = JSON.parse(responseText);
  if (success) {
    window.alert(text);
    window.location.href = "/";
  }
}

function init() {
  userId = userId.replace(/(&quot\;)/g, "");
  productId = productId.replace(/(&quot\;)/g, "");
  product().productCommentBtn.addEventListener("click", submit);
  product().productStatus.addEventListener("click", changeProductStatus);
  product().productDelete.addEventListener("click", deleteProduct);
}

init();
