const sendQueryData = (method, url, data) => {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open(method, url, false);
  xmlHttp.setRequestHeader("Content-type", "application/json");
  xmlHttp.send(JSON.stringify(data));
  if (xmlHttp.status === 200) {
    return xmlHttp.responseText;
  }
};

function newProductForm() {
  return {
    submitBtn: document.querySelector(".new-product-submit"),
    inputName: document.querySelector(".new-product-name"),
    inputExplanation: document.querySelector(".new-product-explanation"),
    inputPrice: document.querySelector(".new-product-price"),
    form: document.querySelector(".new-product-form"),
  };
}
function isFormCompleted() {
  return (
    newProductForm().inputName.value != "" &&
    newProductForm().inputExplanation.value != "" &&
    newProductForm().inputPrice.value != ""
  );
}
function checkForm() {
  if (isFormCompleted()) {
    if (
      !newProductForm().submitBtn.classList.contains("inputBar__Btn-active")
    ) {
      newProductForm().submitBtn.classList.toggle("inputBar__Btn-active");
    }
  } else {
    if (newProductForm().submitBtn.classList.contains("inputBar__Btn-active")) {
      newProductForm().submitBtn.classList.toggle("inputBar__Btn-active");
    }
  }
}
function submit() {
  if (newProductForm().submitBtn.classList.contains("inputBar__Btn-active")) {
    let data = {};
    newProductForm()
      .form.querySelectorAll("input")
      .forEach((e) => (data[e.name] = e.value));
    data["userId"] = userId;
    const responseText = sendQueryData("POST", "/product/new", data);
    const { success, text } = JSON.parse(responseText);
    if (!success) {
      window.location.reload();
    } else {
      window.alert(text);
      window.location.href = "/";
    }
  }
}
function init() {
  userId = userId.replace(/(&quot\;)/g, '"');
  newProductForm().submitBtn.addEventListener("click", submit);
  newProductForm().inputName.addEventListener("keyup", checkForm);
  newProductForm().inputExplanation.addEventListener("keyup", checkForm);
  newProductForm().inputPrice.addEventListener("keyup", checkForm);
}

init();
