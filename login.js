document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  const passwordInput = document.getElementById('password');
  const toggleButton = document.getElementById('togglePassword');

  // Mostrar / ocultar contraseña
  toggleButton.addEventListener('click', function () {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    toggleButton.setAttribute(
      'aria-label',
      isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
    );
  });

  // Envío del formulario
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = passwordInput.value;

    if (username === 'admin' && password === 'password') {
      window.location.href = 'dashboard.html';
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  });
});