const copy = document.querySelector('#copy_button');
const copyBtns = document.querySelectorAll('.copy-btn');
const copies = document.querySelectorAll('input');


for (let i = 0; i < copyBtns.length; i++) {
    copyBtns[i].addEventListener('click', () => {
        navigator.clipboard.writeText(copies[i].value);
    });
}
