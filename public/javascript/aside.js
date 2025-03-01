const openModalBtn = document.querySelector('#open-edit-modal');
const closeModalBtn = document.querySelector('#close-edit-modal');
const modal = document.querySelector('#hs-focus-management-modal');




openModalBtn && openModalBtn.addEventListener('click', () => {
    openModal();
});

closeModalBtn && closeModalBtn.addEventListener('click', () => {
    closeModal();
});


// Handle click outside of modal to close it
// document.addEventListener('click', (e) => {
//     if (!modal.contains(e.target) && e.target !== openModalBtn && e.target !== openModalBtn.children[0] && e.target !== openModalBtn.children[1] && !modal.classList.contains('hidden')) {
//         console.log(e.target);
//         closeModal();
//     }
// });

// Close modal on `Esc` key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});


function closeModal() {
    modal.classList.add('hidden', 'opacity-o', 'pointer-events-none');
    modal.classList.remove('opacity-10o', 'pointer-events-auto');
    modal.children[0].classList.add('opacity-0');
    modal.children[0].classList.remove('opacity-100');
}
function openModal() {
    modal.classList.remove('hidden', 'opacity-o', 'pointer-events-none');
    modal.classList.add('opacity-10o', 'pointer-events-auto', 'flex');
    modal.children[0].classList.remove('opacity-0');
    modal.children[0].classList.add('opacity-100');
    document.querySelector('#edit-input-label').focus();
}
