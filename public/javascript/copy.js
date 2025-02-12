const copyBtn = document.querySelector('#copy-btn');
const copyInput = document.querySelector('input.copy');
const editUrl = document.querySelector('.edit-url');
const dLink = document.querySelector('#d-link');
const deleteValue = document.querySelector('#delete-value');
const cancelEdit = document.querySelector('#cancel-edit');
const showUrl = document.querySelector('.show-url');
const editForm = document.querySelector('form.edit-url-form');

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

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(copyInput.value);
});

