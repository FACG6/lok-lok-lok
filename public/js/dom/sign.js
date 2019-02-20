const signupBtn = document.querySelector(".signup-btn");
const signinContainer = document.querySelector(".signin--container");
const signupContainer = document.querySelector(".signup--container");
const signupForm = document.querySelector(".form--signup");

//sign up button event
signupBtn.addEventListener("click", event => {
  if (signinContainer.classList.contains("show"))
    signupBtn.setAttribute("value", "Signin");
  else signupBtn.setAttribute("value", "Signun");
  signinContainer.classList.toggle("show");
  signupContainer.classList.toggle("show");
});

//sign up form event
signupForm.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.querySelector("input[name=signup-name]");
  const username = document.querySelector("input[name=signup-username]");
  const pass = document.querySelector("input[name=signup-password]");
  const confirmPass = document.querySelector(
    "input[name=signup-confirmPassword]"
  );
  if (pass.value !== confirmPass.value) {
    const errorSpan = document.createElement("span");
    errorSpan.textContent = "Passwords must match !!";
    errorSpan.classList.add("error-msg");
    signupForm.appendChild(errorSpan);
    return;
  }
  const data = {
    username: username.value,
    pass: pass.value,
  };
  console.log(data)
  fetch("POST", JSON.stringify(data), "/signup").catch(error =>
    console.log(error)
  );
});
