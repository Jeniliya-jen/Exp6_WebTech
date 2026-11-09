function isEmpty(value) {
  return value.trim() === "";
}

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email.trim());
}

function isStrongPassword(pw) {
  return pw.length >= 8;
}

function showError(id, message) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = message;
  el.classList.remove("ok");
  el.classList.add("error");
}

function showOk(id, message) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = message || "Looks good";
  el.classList.remove("error");
  el.classList.add("ok");
}

function clearErrors() {
  document.querySelectorAll(".msg").forEach(function (el) {
    el.textContent = "";
    el.classList.remove("error", "ok");
  });
}

function validateForm() {
  let valid = true;
  clearErrors();

  const name = document.getElementById("fullname").value.trim();
  if (name === "") {
    showError("nameError", "Name is required");
    valid = false;
  } else if (name.length < 3) {
    showError("nameError", "Use at least 3 characters");
    valid = false;
  } else {
    showOk("nameError");
  }

  const email = document.getElementById("email").value;
  if (isEmpty(email)) {
    showError("emailError", "Email is required");
    valid = false;
  } else if (!isValidEmail(email)) {
    showError("emailError", "Enter a valid email");
    valid = false;
  } else {
    showOk("emailError");
  }

  const pw = document.getElementById("password").value;
  if (isEmpty(pw)) {
    showError("passError", "Password is required");
    valid = false;
  } else if (!isStrongPassword(pw)) {
    showError("passError", "Minimum 8 characters");
    valid = false;
  } else {
    showOk("passError");
  }

  const ageValue = document.getElementById("age").value;
  if (!isEmpty(ageValue)) {
    const age = Number(ageValue);
    if (isNaN(age) || age < 16 || age > 100) {
      showError("ageError", "Age must be between 16 and 100");
      valid = false;
    } else {
      showOk("ageError");
    }
  }

  const dob = document.getElementById("birthdate").value;
  if (!isEmpty(dob)) {
    if (new Date(dob) > new Date()) {
      showError("dobError", "Date of birth cannot be in the future");
      valid = false;
    } else {
      showOk("dobError");
    }
  }

  if (!document.querySelector('input[name="style"]:checked')) {
    showError("styleError", "Select a fashion style");
    valid = false;
  }

  if (!document.querySelector('input[name="content"]:checked')) {
    showError("contentError", "Select at least one option");
    valid = false;
  }

  return valid;
}

const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    if (!validateForm()) {
      e.preventDefault(); // stay on page
    } else {
      alert("Signup successful!");
    }
  });
}
function validateQuickSubscribe() {
  clearErrors();
  const email = document.getElementById("subscribeEmail").value;
  if (isEmpty(email)) {
    showError("subscribeEmailError", "Email is required");
    return false;
  }
  if (!isValidEmail(email)) {
    showError("subscribeEmailError", "Enter a valid email");
    return false;
  }
  showOk("subscribeEmailError");
  return true;
}

const subscribeForm = document.getElementById("subscribeForm");
if (subscribeForm) {
  subscribeForm.addEventListener("submit", function (e) {
    if (!validateQuickSubscribe()) {
      e.preventDefault();
    }
  });
}