const inputPassword = document.querySelectorAll('.input-password');
const eye = document.querySelector('#eye');
const passwordHelper = document.querySelector('div#password-helper');
const checkMatch = document.querySelector('div#check-password-match');
const password = document.querySelector('input#password');
const confirmPassword = document.querySelector('input#confirm-password');
const checkbox = document.querySelector('input#forgot-checkbox');
const loginForm = document.querySelector('form#login-form');
const resetPasswordForm = document.querySelector('form#reset-password-form');

// Listen for the change event
checkbox && checkbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        loginForm.classList.add('hidden');
        resetPasswordForm.classList.remove('hidden');
    } else {
        loginForm.classList.remove('hidden');
        resetPasswordForm.classList.add('hidden');
    }
});


const form = document.querySelector('form');
const requirementsArr = Array(5).fill(false);






password.addEventListener('input', () => {
    const passwordValue = password.value;
    passwordHelper.classList.add('flex');
    passwordHelper.classList.remove('hidden');
    const requirements = passwordHelper && passwordHelper.children[0].children;


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
    if (requirementsArr.includes(false)) {
        const toastDiv = document.querySelector('.toastDiv');
        e.preventDefault();
        confirmPassword.value = '';
        toastDiv.innerHTML = ` <div class="bg-red-500 dark:bg-white dark:shadow-[0_3px_10px_-3px_rgba(6, 81, 237, 0.3)] dark:border-l-[6px] dark:border-red-500 dark:text-gray-800 text-white shadow-red-200 flash-message"
                    role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-[18px] shrink-0 fill-white inline mr-3"
                        viewBox="0 0 32 32">
                        <path class="dark:fill-red-500"
                            d="M16 1a15 15 0 1 0 15 15A15 15 0 0 0 16 1zm6.36 20L21 22.36l-5-4.95-4.95 4.95L9.64 21l4.95-5-4.95-4.95 1.41-1.41L16 14.59l5-4.95 1.41 1.41-5 4.95z"
                            data-original="#ea2d3f" />
                    </svg>
                    <span class="block sm:inline text-sm mr-3">Please, complete requirements</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                        class="close-flash-message">
                        <path
                            d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                    </svg>
                </div>`;
    }
    const flashMessage = document.querySelector('.flash-message');
    const flashMessageCloseBtn = document.querySelector('.close-flash-message');

    let flashTimeout;

    if (flashMessage) {
        flashTimeout = setTimeout(() => {
            flashMessage.style.display = 'none';
        }, 7000);
    }

    flashMessageCloseBtn && flashMessageCloseBtn.addEventListener('click', () => {
        clearTimeout(flashTimeout);
        flashMessage.style.display = 'none';
    });

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

