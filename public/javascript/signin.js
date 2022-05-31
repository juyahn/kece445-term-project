const sendQueryData = (method, url, data) => {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open(method, url, false);
  xmlHttp.setRequestHeader("Content-type", "application/json");
  xmlHttp.send(JSON.stringify(data));
  if (xmlHttp.status === 200) {
    return xmlHttp.responseText;
  }
};

function signinForm() {
  return {
    submitBtn: document.querySelector(".signin-submit"),
    inputId: document.querySelector(".signin-id"),
    inputPassword: document.querySelector(".signin-password"),
    form: document.querySelector(".signin-form"),
  };
}
function isFormCompleted() {
  return (
    signinForm().inputId.value != "" && signinForm().inputPassword.value != ""
  );
}
function checkForm() {
  if (isFormCompleted()) {
    if (!signinForm().submitBtn.classList.contains("inputBar__Btn-active")) {
      signinForm().submitBtn.classList.toggle("inputBar__Btn-active");
    }
  } else {
    if (signinForm().submitBtn.classList.contains("inputBar__Btn-active")) {
      signinForm().submitBtn.classList.toggle("inputBar__Btn-active");
    }
  }
}
function submit() {
  if (signinForm().submitBtn.classList.contains("inputBar__Btn-active")) {
    let data = {};
    signinForm()
      .form.querySelectorAll("input")
      .forEach((e) => (data[e.name] = e.value));
    const responseText = sendQueryData("POST", "/user/signin", data);
    const { success, text } = JSON.parse(responseText);
    window.alert(text);
    if (!success) {
      window.location.reload();
    } else {
      window.location.href = "/";
    }
  }
}
function init() {
  signinForm().submitBtn.addEventListener("click", submit);
  signinForm().inputId.addEventListener("keyup", checkForm);
  signinForm().inputPassword.addEventListener("keyup", checkForm);
}

init();
