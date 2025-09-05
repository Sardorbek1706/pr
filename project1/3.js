function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(String(email).toLowerCase());
}

function validateName(name) {
  return /^[\p{L}\s'\-]{2,}$/u.test(String(name).trim());
}

function validatePassword(password) {
  return String(password).length >= 6;
}

function showFieldError(inputEl, message) {
  inputEl.classList.add('error');
  const msgEl = document.getElementById(inputEl.id + 'Error');
  if (msgEl) {
    msgEl.textContent = message;
    msgEl.style.display = 'block';
  }
}

function clearFieldError(inputEl) {
  inputEl.classList.remove('error');
  const msgEl = document.getElementById(inputEl.id + 'Error');
  if (msgEl) {
    msgEl.textContent = '';
    msgEl.style.display = 'none';
  }
}

function showErrorMessage(message) {
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert error';
  alertDiv.textContent = message;
  document.getElementById('alerts').prepend(alertDiv);
  setTimeout(() => alertDiv.remove(), 4000);
}

function showSuccessMessage(message) {
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert success';
  alertDiv.textContent = message;
  document.getElementById('alerts').prepend(alertDiv);
  setTimeout(() => alertDiv.remove(), 4000);
}

const firstNameEl = document.getElementById('firstName');
const lastNameEl = document.getElementById('lastName');
const sEmailEl = document.getElementById('signupEmail');
const sPassEl = document.getElementById('signupPassword');
const cPassEl = document.getElementById('confirmPassword');
const signupForm = document.getElementById('signupForm');
const signupBtn = document.getElementById('signupBtn');

[firstNameEl, lastNameEl].forEach(el => {
  el.addEventListener('input', function () {
    if (!validateName(this.value)) {
      showFieldError(this, 'Kamida 2 ta harf kiriting');
    } else {
      clearFieldError(this);
    }
  });
});

sEmailEl.addEventListener('input', function () {
  if (!validateEmail(this.value)) {
    showFieldError(this, "Email formati noto'g'ri");
  } else {
    clearFieldError(this);
  }
});

function validateSignupPasswordFields() {
  const pwd = sPassEl.value;
  const conf = cPassEl.value;
  let ok = true;

  if (!validatePassword(pwd)) {
    showFieldError(sPassEl, "Parol kamida 6 belgidan iborat bo'lsin");
    ok = false;
  } else {
    clearFieldError(sPassEl);
  }

  if (conf.length === 0) {
    showFieldError(cPassEl, 'Parolni tasdiqlang');
    ok = false;
  } else if (pwd !== conf) {
    showFieldError(cPassEl, 'Parollar mos kelmadi');
    ok = false;
  } else {
    clearFieldError(cPassEl);
  }
  return ok;
}

sPassEl.addEventListener('input', validateSignupPasswordFields);
cPassEl.addEventListener('input', validateSignupPasswordFields);

signupForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const firstName = firstNameEl.value.trim();
  const lastName = lastNameEl.value.trim();
  const email = sEmailEl.value.trim().toLowerCase();
  const password = sPassEl.value;
  const confirmPassword = cPassEl.value;

  let valid = true;
  if (!validateName(firstName)) {
    showFieldError(firstNameEl, 'Ism kamida 2 ta harf');
    valid = false;
  }
  if (!validateName(lastName)) {
    showFieldError(lastNameEl, 'Familiya kamida 2 ta harf');
    valid = false;
  }
  if (!validateEmail(email)) {
    showFieldError(sEmailEl, "Email formati noto'g'ri");
    valid = false;
  }
  if (!validateSignupPasswordFields()) valid = false;

  if (!valid) {
    showErrorMessage("Iltimos, maydonlarni to'g'ri to'ldiring.");
    return;
  }

  try {
    await fetch('https://682f107d746f8ca4a47fa71c.mockapi.io/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password })
    });
    showSuccessMessage("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
    signupForm.reset();
  } catch (error) {
    showErrorMessage("Server bilan bog'lanishda xatolik");
  }
});
