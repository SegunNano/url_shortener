const body = document.body;
const themeToggler = document.querySelector("#theme-toggler");
const themeTogglerBtn = document.querySelector("#theme-toggle-btn");
const toggleArr = document.querySelectorAll('.c-transition');

const dropdownToggler = document.querySelector("#user-menu-button");
const dropDown = document.querySelector('#user-dropdown');

const flashMessage = document.querySelector('.flash-message');
const flashMessageCloseBtn = document.querySelector('.close-flash-message');


// theme selection
const userTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
if (userTheme === 'dark' || (!userTheme && systemDark)) {
    for (i of toggleArr) {
        i.classList.add('dark');
    }
}
themeTogglerBtn.addEventListener('click', () => {
    for (i of themeToggler.children) i.classList.toggle('hidden');
    body.classList.contains('dark')
        ? localStorage.setItem('theme', 'light')
        : localStorage.setItem('theme', 'dark');

    for (i of toggleArr) i.classList.toggle('dark');
});


//  dropDown menu

dropdownToggler.addEventListener('click', () => {
    dropDown.classList.toggle('hidden');
});


//  alert messges control

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

