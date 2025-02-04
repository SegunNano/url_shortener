const inputPassword = document.querySelectorAll('.input-password');
const eye = document.querySelector('#eye');

eye.addEventListener('click', () => {
    for (i of eye.children) {
        i.classList.toggle('hidden');
    }

    for (i of inputPassword) {
        (inputPassword[inputPassword.length - 1].getAttribute('type') === 'password')
            ? i.setAttribute('type', 'text')
            : i.setAttribute('type', 'password');
    }
});


if (inputPassword.length > 1) {
    console.log('register');
    // compare both password and confirmPassword
}
