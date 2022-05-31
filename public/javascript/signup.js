const sendQueryData = (method, url, data) => {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open(method, url, false);
  xmlHttp.setRequestHeader("Content-type", "application/json");
  xmlHttp.send(JSON.stringify(data));
  if (xmlHttp.status === 200) {
    return xmlHttp.responseText;
  }
};

function signupForm() {
  return {
    submitBtn: document.querySelector(".signup-submit"),
    inputId: document.querySelector(".signup-id"),
    inputPassword: document.querySelector(".signup-password"),
    form: document.querySelector(".signup-form"),
  };
}
function isFormCompleted() {
  return (
    signupForm().inputId.value != "" && signupForm().inputPassword.value != ""
  );
}
function checkForm() {
  if (isFormCompleted()) {
    if (!signupForm().submitBtn.classList.contains("inputBar__Btn-active")) {
      signupForm().submitBtn.classList.toggle("inputBar__Btn-active");
    }
  } else {
    if (signupForm().submitBtn.classList.contains("inputBar__Btn-active")) {
      signupForm().submitBtn.classList.toggle("inputBar__Btn-active");
    }
  }
}
function submit() {
  if (signupForm().submitBtn.classList.contains("inputBar__Btn-active")) {
    let data = {};
    signupForm()
      .form.querySelectorAll("input")
      .forEach((e) => (data[e.name] = e.value));
    const responseText = sendQueryData("POST", "/user/signup", data);
    const { success, text } = JSON.parse(responseText);
    window.alert(text);
    if (!success) {
      window.location.reload();
    } else {
      window.location.href = "/user/signin";
    }
  }
}
function init() {
  signupForm().submitBtn.addEventListener("click", submit);
  signupForm().inputId.addEventListener("keyup", checkForm);
  signupForm().inputPassword.addEventListener("keyup", checkForm);
}

init();
