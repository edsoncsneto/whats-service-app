document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', validar);
});

async function validar(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (email === 'edson@gmail.com' && senha === '12345') {
        window.location.href = '../admin/contratosAdmin.html';
    } else if (email === 'claudio@gmail.com' && senha === '12345') {
        window.location.href = '../homepage/index.html';
    } else {
        alert('Credenciais incorretas!');
    }
}
