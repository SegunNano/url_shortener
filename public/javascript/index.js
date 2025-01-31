const userLogo = document.querySelector("#user-menu-button");
const brandLogo = document.querySelector("#brand-name");
const dropDown = document.querySelector('#user-dropdown');
const body = document.body;

const customizeButton = document.querySelector('#customize-url-button');
const customizeInput = document.querySelector('#customize-input');
const toggleArr = document.querySelectorAll('.c-transition');



const userTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia("(prefers-color-scheme:dark)").matches;

console.log(userTheme, systemDark);

if (userTheme === 'dark' || (!userTheme && systemDark)) {


    for (i of toggleArr) {
        i.classList.add('dark');
    }
}

userLogo.addEventListener('click', () => {
    dropDown.classList.toggle('hidden');
});

brandLogo.addEventListener('click', () => {

    body.classList.contains('dark')
        ? localStorage.setItem('theme', 'light')
        : localStorage.setItem('theme', 'dark');
    console.log(localStorage);

    for (i of toggleArr) {
        i.classList.toggle('dark');
    }
});


customizeButton && customizeButton.addEventListener('click', () => {
    customizeInput.classList.toggle('hidden');
    customizeInput.classList.toggle('grid');
});


// if (!dropDown.classList.contains('hidden')) {
//     body.addEventListener('click', () => {
//         console.log('here');
//         dropDown.classList.add('hidden');
//     });
// }