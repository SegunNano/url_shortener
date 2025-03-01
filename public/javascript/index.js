const body = document.body;
const themeToggler = document.querySelectorAll("#theme-toggler");
const themeTogglerBtn = document.querySelectorAll("#theme-toggle-btn");
const toggleArr = document.querySelectorAll('.c-transition');

console.log({ themeTogglerBtn, themeToggler });

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
    console.log('object');
    for (i of themeToggler.children) i.classList.toggle('hidden');
    body.classList.contains('dark')
        ? localStorage.setItem('theme', 'light')
        : localStorage.setItem('theme', 'dark');

    for (i of toggleArr) i.classList.toggle('dark');
});


//  dropDown menu

dropdownToggler.addEventListener('click', () => {
    console.log('object');
    dropDown.classList.toggle('hidden');

    console.log('object');
});

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        if (
            !dropDown.classList.contains('hidden') && // Sidebar is open
            !dropDown.contains(e.target) && // Click is outside the sidebar
            e.target !== dropdownToggler &&
            e.target !== dropdownToggler.children[0] &&
            e.target !== dropdownToggler.children[1]
        ) {
            console.log(e.target);
            console.log('here');
            dropDown.classList.add('hidden');
        }
    }
    );

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

