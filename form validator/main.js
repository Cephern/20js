const form = document.querySelector("#form");

const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
};

const showSuccess = input => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

const checkEmail = input => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(input.value.trim())) {
    showError(input, `Email is not valid`);
  } else {
    showSuccess(input);
  }
};

const getFieldName = input => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

const checkRequired = inputArr => {
  inputArr.forEach(input => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input.id)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

const checkLength = (input, min, max) => {
  if (input.value.length < min || input.value.length > max) {
    showError(
      input,
      `${getFieldName(
        input.id
      )} must be between ${min} and ${max} characters long`
    );
  } else {
    showSuccess(input);
  }
};

const checkPasswordsMatch = (password1, password2) => {
  if (password1.value !== password2.value) {
    showError(password2, `Passwords should match`);
  } else {
    showSuccess(password2);
  }
};

form.addEventListener("submit", e => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 16);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
