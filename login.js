document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Aquí puedes agregar la lógica para validar el usuario y la contraseña
        if(username === 'admin' && password === 'password') {
            // Redirigir a la página de productos o dashboard
            window.location.href = 'dashboard.html';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });
});

const eyeButton = document.querySelector('.eye-btn');

eyeButton.addEventListener("click", function(){
    const password = document.getElementById('password');
    if(password.type === 'password') {
        password.type = 'text';
        eyeButton.innerHTML = '<i class="bi bi-eye-slash-fill"></i>';
    } else {
        password.type = 'password';
        eyeButton.innerHTML = '<i class="bi bi-eye-fill"></i>';
    }
});
