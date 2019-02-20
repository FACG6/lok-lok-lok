const userNameSignIn = document.getElementById("userName-signIn");
const userNameSignInSpan = document.getElementById("userName-signIn-span");
const passwordSignIn = document.getElementById("password-signIn");
const passwordSignInSpan = document.getElementById("password-signIn-span");
const userNameSignUp = document.getElementById("userName-signUp");
const userNameSignUpSpan = document.getElementById("userName-signUp-span");
const passwordSignUp = document.getElementById("password-signUp");
const passwordSignUpSpan = document.getElementById("password-signUp-span");
const passwordConfirmSignUp = document.getElementById("passwordConfirm-signUp");
const passwordConfirmSignUpSpan = document.getElementById(
  "passwordConfirm-signUp-span"
);
const signUpForm = document.getElementById("signUp-form");
const signInForm = document.getElementById("signIn-form");

signInForm.addEventListener("submit", e => {
  e.preventDefault();
//   [userNameSignInSpan,passwordSignInSpan].innerhtml='';
  if (userNameSignIn.validity.valueMissing)
    userNameSignInSpan.textContent = "Enter user name";
  if (passwordSignIn.validity.valueMissing)
    passwordSignInSpan.textContent = "Enter password";
});
signUpForm.addEventListener("submit", e => {
    e.preventDefault();
    // [userNameSignUpSpan,passwordSignUpSpan,passwordConfirmSignUpSpan].innerhtml='';
    if (userNameSignUp.validity.valueMissing)
    userNameSignUpSpan.textContent = "Enter user name";
    if (userNameSignUp.validity.patternMismatch)
    userNameSignUpSpan.textContent = "User name must include letters or - _ ";
    if (passwordSignUp.validity.valueMissing)
    passwordSignUpSpan.textContent = "Enter password";
    if (passwordSignUp.validity.patternMismatch)
    passwordSignUpSpan.textContent =
    "password must be at least 8 letter and bigining with letter ";
    if (passwordSignUp === passwordConfirmSignUp) {
        passwordConfirmSignUpSpan.textContent =
        "your password not equal confirm password";
  }
});
