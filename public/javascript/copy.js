const copyBtn = document.querySelector('#copy-btn');
const copyOkay = document.querySelector('#copy-okay');
const copyInput = document.querySelector('input.copy');
const editUrl = document.querySelector('.edit-url');
const dLink = document.querySelector('#d-link');
const deleteValue = document.querySelector('#delete-value');
const cancelEdit = document.querySelector('#cancel-edit');
const showUrl = document.querySelector('.show-url');
const editForm = document.querySelector('form.edit-url-form');


copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(copyInput.value)
        .then(() => {
            copyBtn.classList.add('hidden');
            copyOkay.classList.remove('hidden');
            setTimeout(() => {
                copyBtn.classList.remove('hidden');
                copyOkay.classList.add('hidden');
            }, 3000);
        })
        .catch(err => console.error("Failed to copy: ", err));

});

editUrl && editUrl.addEventListener('click', () => {
    showUrl.classList.add('hidden');
    editForm.classList.remove('hidden');
    dLink.focus();
});

cancelEdit && cancelEdit.addEventListener('click', () => {
    showUrl.classList.remove('hidden');
    editForm.classList.add('hidden');
});

deleteValue && deleteValue.addEventListener('click', () => {
    dLink.value = '';
});

