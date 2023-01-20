function customEmailValidation(inputText) {
    if (inputText.value === '') {
        inputText.setCustomValidity('Proszę wprowadzić adres email');
    }
    else if (inputText.validity.typeMismatch) {
        inputText.setCustomValidity('Niewłaściwa forma adresu');
    }
    else {
        inputText.setCustomValidity('');
    }
};

function customConfirmEmailValidation(inputText) {
    var emailInputText = document.getElementById('email').value;

    if (inputText.value === '') {
        inputText.setCustomValidity('Proszę wprowadzić adres email');
    }
    else if (inputText.validity.typeMismatch) {
        inputText.setCustomValidity('Niewłaściwa forma adresu');
    }
    else if (emailInputText !== inputText.value) {
        inputText.setCustomValidity('Adresy email powinny być takie same')
    } 
    else {
        inputText.setCustomValidity('');
    }
};

function customPasswordValidation(inputText) {
    if (inputText.value === '') {
        inputText.setCustomValidity('Proszę wprowadzić hasło');
    }
    else if (inputText.value.length < 6) {
        inputText.setCustomValidity('Hasło musi się składać z co najmniej 6 znaków');
    }
    else {
        inputText.setCustomValidity('');
    }
};


function customUsernameValidation(inputText) {
    var emailInputText = document.getElementById('email').value;

    if (inputText.value === '') {
        inputText.setCustomValidity('Proszę wprowadzić nazwę użytkownika');
    }
    else if (inputText.value.length < 6) {
        inputText.setCustomValidity('Nazwa użytkownika musi mieć od 6 do 16 znaków');
    }
    else if (inputText.value.length > 16) {
        inputText.setCustomValidity('Nazwa użytkownika musi mieć od 6 do 16 znaków');
    } else {
        inputText.setCustomValidity('');
    }
};

const form = document.querySelector('form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(form);

  const isUserCreated = createUser(formData);

  if (isUserCreated) {
    sessionStorage.setItem('loggedin',true);
    window.location.href = `account.html?username=${formData.get('username')}`;
  }
});

function createUser(userData) {

    if(!validateUserData(userData)) {
        return false;
    }

    const username = userData.get('username');
    const passowrd = userData.get('password');
    const email = userData.get('email');

    sessionStorage.setItem(username,passowrd);
    sessionStorage.setItem(email,passowrd);

    return true;
};

function validateUserData(userData) {
    const username = userData.get('username');
    const email = userData.get('email');
    const formValidationParagraph = document.getElementById('form-validation');

    if (sessionStorage.getItem(username)) {
        formValidationParagraph.style.display = "block";
        return false;
    }
    
    if (sessionStorage.getItem(email)) {
        formValidationParagraph.style.display = "block";
        return false;
    }

    return true;
};