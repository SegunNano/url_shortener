const copy = document.querySelector('#copy_button');
const copyBtns = document.querySelectorAll('.copy-btn');
const copies = document.querySelectorAll('input');
const editUrl = document.querySelector('.edit-url');
const showUrl = document.querySelector('.show-url');
const editForm = document.querySelector('form.edit-url-form');

console.log(editUrl, showUrl, editForm);

editUrl.addEventListener('click', () => {
    showUrl.classList.add('hidden');
    editForm.classList.remove('hidden');
});

for (let i = 0; i < copyBtns.length; i++) {
    copyBtns[i].addEventListener('click', () => {
        navigator.clipboard.writeText(copies[2].value);
    });
}
