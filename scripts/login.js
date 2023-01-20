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

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form);
    
    const isAuthenticated = authenticate(formData);
  
    if (isAuthenticated) {
      sessionStorage.setItem('loggedin',true);
      window.location.href = `account.html?username=${formData.get('username')}`;
    }

}); 

function authenticate(formData) {
    const username = formData.get('username');
    const password = formData.get('password');

    const formValidationParagraph = document.getElementById('form-validation');

    if (sessionStorage.getItem(username) === password) {
        return true;
    } else {
        formValidationParagraph.style.display = "block";
        return false;
    }
}