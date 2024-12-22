function loginError () {
  const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = 'Email or password does not match';
    errorMessage.style.display = 'block';
}

exports.loginError = loginError;