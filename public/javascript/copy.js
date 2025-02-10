const copy = document.querySelector('#copy_button');
const copyBtns = document.querySelectorAll('.copy-btn');
const copies = document.querySelectorAll('input');
const editUrl = document.querySelector('.edit-url');
const dLink = document.querySelector('#d-link');
const deleteValue = document.querySelector('#delete-value');
const cancelEdit = document.querySelector('#cancel-edit');
// const cancelEditUrl = document.querySelector('cancel-edit-url');
const showUrl = document.querySelector('.show-url');
const editForm = document.querySelector('form.edit-url-form');

console.log(editUrl, showUrl, editForm);
editUrl.addEventListener('click', () => {
    showUrl.classList.add('hidden');
    editForm.classList.remove('hidden');
    dLink.focus();
});

cancelEdit.addEventListener('click', () => {
    showUrl.classList.remove('hidden');
    editForm.classList.add('hidden');
});
deleteValue.addEventListener('click', () => {
    dLink.value = '';
});

for (let i = 0; i < copyBtns.length; i++) {
    copyBtns[i].addEventListener('click', () => {
        navigator.clipboard.writeText(copies[2].value);
    });
}
