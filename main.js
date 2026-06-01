const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});

ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".header__content form", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".header__content .bar", {
  ...scrollRevealOption,
  delay: 2000,
});

ScrollReveal().reveal(".header__image__card", {
  duration: 1000,
  interval: 500,
  delay: 2500,
});

ScrollReveal().reveal(".section__header", scrollRevealOption);
ScrollReveal().reveal(".destination__card", {
  ...scrollRevealOption,
  interval: 300,
});
ScrollReveal().reveal(".package__card", {
  ...scrollRevealOption,
  interval: 300,
});
ScrollReveal().reveal(".blog__card", { ...scrollRevealOption, interval: 300 });
ScrollReveal().reveal(".about__content p", scrollRevealOption);
ScrollReveal().reveal(".form-container", scrollRevealOption);

const form = document.getElementById("interactive-contact-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const successBanner = document.getElementById("success-banner");

const showError = (input, errorSpan, message) => {
  input.parentElement.classList.add("invalid-input");
  errorSpan.textContent = message;
  errorSpan.classList.add("visible");
};

const clearError = (input, errorSpan) => {
  input.parentElement.classList.remove("invalid-input");
  errorSpan.textContent = "";
  errorSpan.classList.remove("visible");
};

const validateName = () => {
  const errSpan = document.getElementById("name-error");
  if (username.value.trim() === "") {
    showError(username, errSpan, "Full name input is mandatory.");
    return false;
  } else if (username.value.trim().length < 3) {
    showError(username, errSpan, "Name must contain at least 3 characters.");
    return false;
  }
  clearError(username, errSpan);
  return true;
};

const validateEmail = () => {
  const errSpan = document.getElementById("email-error");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    showError(email, errSpan, "Please enter a valid verified email formula.");
    return false;
  }
  clearError(email, errSpan);
  return true;
};

const validatePhone = () => {
  const errSpan = document.getElementById("phone-error");
  const phoneRegex = /^01[0125]\d{8}$/;
  if (!phoneRegex.test(phone.value.trim())) {
    showError(
      phone,
      errSpan,
      "Uplink requires a valid 11-digit Egyptian mobile string.",
    );
    return false;
  }
  clearError(phone, errSpan);
  return true;
};

const checkPasswordStrength = () => {
  const errSpan = document.getElementById("password-error");
  const strengthBar = document.getElementById("password-strength");
  const val = password.value;

  if (val.length === 0) {
    strengthBar.style.width = "0%";
    clearError(password, errSpan);
    return false;
  }

  if (val.length < 8) {
    showError(
      password,
      errSpan,
      "Security portal key requires minimum 8 characters.",
    );
    strengthBar.style.width = "30%";
    strengthBar.style.backgroundColor = "#ef4444"; 
    return false;
  }


  let strength = 0;
  if (/[A-Za-z]/.test(val)) strength++; 
  if (/[0-9]/.test(val)) strength++;
  if (/[^A-Za-z0-9]/.test(val) || val.length > 12) strength++; 

  if (strength === 1) {
    strengthBar.style.width = "50%";
    strengthBar.style.backgroundColor = "#f97316"; 
  } else {
    strengthBar.style.width = "100%";
    strengthBar.style.backgroundColor = "#10b981"; 
  }

  clearError(password, errSpan);
  return true;
};

username.addEventListener("blur", validateName);
username.addEventListener("input", validateName);

email.addEventListener("blur", validateEmail);
email.addEventListener("input", validateEmail);

phone.addEventListener("blur", validatePhone);
phone.addEventListener("input", validatePhone);

password.addEventListener("blur", checkPasswordStrength);
password.addEventListener("input", checkPasswordStrength);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isPassValid = checkPasswordStrength();

  if (isNameValid && isEmailValid && isPhoneValid && isPassValid) {
    successBanner.style.display = "block";
    form.reset();
    document.getElementById("password-strength").style.width = "0%";
    setTimeout(() => {
      successBanner.style.display = "none";
    }, 5000);
  }
});
