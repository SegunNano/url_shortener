const body = document.body;
const userLogo = document.querySelector("#user-menu-button");
const brandLogo = document.querySelector("#brand-name");
const themeToggler = document.querySelector("#theme-toggler");
const themeTogglerBtn = document.querySelector("#theme-toggle-btn");
const dropDown = document.querySelector('#user-dropdown');
const customizeButton = document.querySelector('#customize-url-button');
const customizeInput = document.querySelector('#customize-input');
const toggleArr = document.querySelectorAll('.c-transition');



const userTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia("(prefers-color-scheme:dark)").matches;

if (userTheme === 'dark' || (!userTheme && systemDark)) {
    for (i of toggleArr) {
        i.classList.add('dark');
    }
}

userLogo.addEventListener('click', () => {
    dropDown.classList.toggle('hidden');
});

themeTogglerBtn.addEventListener('click', () => {

    for (i of themeToggler.children) i.classList.toggle('hidden');

    body.classList.contains('dark')
        ? localStorage.setItem('theme', 'light')
        : localStorage.setItem('theme', 'dark');

    for (i of toggleArr) {
        i.classList.toggle('dark');
    }
});


customizeButton && customizeButton.addEventListener('click', () => {
    customizeInput.classList.toggle('hidden');
    customizeInput.classList.toggle('grid');
});

