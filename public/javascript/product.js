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

function init() {
  userId = userId.replace(/(&quot\;)/g, '"');
  productId = productId.replace(/(&quot\;)/g, '"');
  product().productCommentBtn.addEventListener("click", submit);
}

init();
