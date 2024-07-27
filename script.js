"use strict";

// PASSWORD GENERATOR
const passwordBox = document.getElementById("password");
const length = 14;

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = '!"£$%^&*()_+:@;~#?/-';
const allChars = upperCase + lowerCase + number + symbol;

function createPassword() {
  let password = "";
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += number[Math.floor(Math.random() * number.length)];
  password += symbol[Math.floor(Math.random() * symbol.length)];

  while (length > password.length) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  passwordBox.value = password;
  checkPasswordStrength(passwordBox.value);
}

function copyPassword() {
  passwordBox.select();
  document.execCommand("copy");
}

// PASSWORD VISIBILITY
const eyeIcon = document.getElementById("eyeIcon");

eyeIcon.onclick = function () {
  if (passwordBox.type === "password") {
    passwordBox.type = "text";
    eyeIcon.src = "images/eye-open.png";
  } else {
    passwordBox.type = "password";
    eyeIcon.src = "images/eye-close.png";
  }
};

// PASSWORD STRENGTH
const message = document.getElementById("message");
const strength = document.getElementById("strength");
const instruction = document.getElementById("instruction");
const displayDiv = document.querySelector(".display");

passwordBox.addEventListener("input", () => {
  if (passwordBox.value.length > 0) {
    message.style.display = "block";
  } else {
    message.style.display = "none";
  }
  checkPasswordStrength(passwordBox.value);
});

function checkPasswordStrength(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!"£$%^&*()_+:@;~#?/-]/.test(password);

  if (hasUpperCase && hasLowerCase && hasNumber && hasSymbol) {
    strength.innerHTML = "strong";
    displayDiv.style.border = "2px solid green";
    instruction.style.display = "none";
  } else {
    strength.innerHTML = "weak";
    instruction.style.display = "block";
    displayDiv.style.border = "2px solid red";
  }
}
