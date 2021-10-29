// validate onCLICK
const submit = document.querySelector("input[type=submit]");
submit.addEventListener("click", (e) => {
  e.preventDefault();
  formValidation();
});
// validate on change
const form = document.querySelector("form");
form.addEventListener("change", () => {
  formValidation();
});
const text = document.querySelectorAll("input[type=text]");
const textArea = document.querySelectorAll("textarea");
const select = document.querySelectorAll("select");
const email = document.querySelector("input[type=email]");

// create small
const span = document.querySelectorAll("form span");
span.forEach((s) => {
  const target = s.firstElementChild;

  if (target !== null) {
    const small = document.createElement("small");
    target.after(small);
    //ICONE
    const i = document.createElement("i");
    i.className = "validationCheck fas";
    small.before(i);
  }
});

// Check Error
const setError = (input, message) => {
  const formControl = input.parentElement;
  const i = formControl.querySelector(".validationCheck");
  if (formControl.className === "formSuccess") {
    formControl.classList.replace("formSuccess", "formError");
  } else {
    formControl.classList.remove("formSuccess");
    i.classList.add("fa-times");
  }
  formControl.classList.add("formError");

  const small = formControl.querySelector("small");
  small.innerText = message;
};
// Check Success
const setSuccess = (input) => {
  const formControl = input.parentElement;
  const i = formControl.querySelector(".validationCheck");
  if (formControl.className === "formError") {
    formControl.classList.replace("formError", "formSuccess");
  } else {
    formControl.classList.add("formSuccess");
    i.classList.add("fa-check");
  }

  //sucess Icon

  console.log(i);
  i.classList.replace("fa-times", "fa-check");
};
const isEmail = (email) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

const formValidation = () => {
  text.forEach((t) => {
    const textValue = t.value.trim();
    if (textValue === "") {
      setError(t, "Dit veld mag niet leeg zijn");
    } else {
      setSuccess(t);
    }
  });
  textArea.forEach((ta) => {
    const textAreaValue = ta.value.trim();
    if (textAreaValue === "") {
      setError(ta, "Dit veld mag niet leeg zijn");
    } else {
      setSuccess(ta);
    }
  });
  select.forEach((s) => {
    console.log(s.value.length);
    if (s.value.length === 0) {
      setError(s, "Dit veld mag niet leeg zijn");
    } else {
      setSuccess(s);
    }
  });

  const emailValue = email.value.trim();
  if (emailValue === "") {
    setError(email, "Email adres mag niet leeg zijn");
  } else if (!isEmail(emailValue)) {
    setError(email, "Email adres is niet geldig");
  } else {
    setSuccess(email);
  }
};

// setSuccess(email);
// setError(email);
