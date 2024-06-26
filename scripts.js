document.addEventListener('DOMContentLoaded', () => {
    const formTitle = document.getElementById('formTitle');
    const nameInput = document.getElementById('nameInput');
    const submitButton = document.getElementById('submitButton');
    const toggleMessage = document.getElementById('toggleMessage');
    let isSignUp = true;

    toggleMessage.addEventListener('click', (e) => {
        e.preventDefault();
        toggleForm();
    });

    document.getElementById('accountForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value;
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;

        if (isSignUp) {
            console.log('Sign Up Info:', { name, email, password });
            alert('Registro exitoso!');
            toggleForm();
        } else {
            console.log('Sign In Info:', { email, password });
            alert('Inicio de sesión exitoso!');
        }
    });

    function toggleForm() {
        isSignUp = !isSignUp;

        if (isSignUp) {
            formTitle.textContent = 'Crear Cuenta';
            nameInput.style.display = 'block';
            submitButton.textContent = 'Registrarse';
            toggleMessage.innerHTML = '¿Ya tienes una cuenta? <a href="#">Iniciar Sesión</a>';
        } else {
            formTitle.textContent = 'Iniciar Sesión';
            nameInput.style.display = 'none';
            submitButton.textContent = 'Iniciar Sesión';
            toggleMessage.innerHTML = '¿No tienes una cuenta? <a href="#">Crear Cuenta</a>';
        }
    }
});