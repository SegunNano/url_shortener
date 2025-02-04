const inputPassword = document.querySelectorAll('.input-password');
const eye = document.querySelector('#eye');
const passwordHelper = document.querySelector('div#password-helper');
const checkMatch = document.querySelector('div#check-password-match');
const password = document.querySelector('input#password');
const confirmPassword = document.querySelector('input#confirm-password');

const form = document.querySelector('form');
const requirementsArr = Array(5).fill(false);




password.addEventListener('input', () => {
    const passwordValue = password.value;
    passwordHelper.classList.add('flex');
    passwordHelper.classList.remove('hidden');
    const requirements = passwordHelper
        ? passwordHelper.children[0].children
        : '';

    // Check password requirements

    if (passwordValue.length >= 8) {
        requirements[0].classList.add('text-green-500');
        requirements[0].classList.remove('text-orange-500');
        requirementsArr[0] = true;
    } else {
        requirements[0].classList.add('text-orange-500');
        requirements[0].classList.remove('text-green-500');
        requirementsArr[0] = false;
    }

    if (/[A-Z]/.test(passwordValue)) {
        requirements[1].classList.add('text-green-500');
        requirements[1].classList.remove('text-orange-500');
        requirementsArr[1] = true;
    } else {
        requirements[1].classList.add('text-orange-500');
        requirements[1].classList.remove('text-green-500');
        requirementsArr[1] = false;
    }

    if (/[!@#$%^&*]/.test(passwordValue)) {
        requirements[2].classList.add('text-green-500');
        requirements[2].classList.remove('text-orange-500');
        requirementsArr[2] = true;
    } else {
        requirements[2].classList.add('text-orange-500');
        requirements[2].classList.remove('text-green-500');
        requirementsArr[2] = false;
    }

    if (/\d/.test(passwordValue)) {
        requirements[3].classList.add('text-green-500');
        requirements[3].classList.remove('text-orange-500');
        requirementsArr[3] = true;
    } else {
        requirements[3].classList.add('text-orange-500');
        requirements[3].classList.remove('text-green-500');
        requirementsArr[3] = false;
    }

});


confirmPassword && confirmPassword.addEventListener('input', () => {
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;
    checkMatch.classList.add('flex');
    checkMatch.classList.remove('hidden');
    const checker = checkMatch
        ? checkMatch.children[0].children
        : '';
    if (passwordValue === confirmPasswordValue) {
        checker[0].classList.add('hidden');
        checker[1].classList.remove('hidden');
        requirementsArr[4] = true;
    } else {
        checker[1].classList.add('hidden');
        checker[0].classList.remove('hidden');
        requirementsArr[4] = false;
    }
});


confirmPassword && form.addEventListener('submit', (e) => {
    // console.log(requirementsArr);
    for (i of requirementsArr) {
        !i && e.preventDefault();
    }
});



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
};
