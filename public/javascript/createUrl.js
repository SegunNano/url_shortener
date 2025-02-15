
const customizeButton = document.querySelector('#customize-url-button');
const customizeInput = document.querySelector('#customize-input');
customizeButton && customizeButton.addEventListener('click', () => {
    customizeInput.classList.toggle('hidden');
    customizeInput.classList.toggle('grid');
});

