const inputs = document.querySelectorAll('input');
const button = document.querySelector('button');

window.addEventListener('load', () => inputs[0].focus());

inputs.forEach((input, idx, arr) => {
    input.addEventListener("input", () => {
        // console.log(idx, arr);
        // (input.value.length > 1) && (input.value = input.value.slice(1));
        // arr[idx + 1]?.removeAttribute('disabled');
        // arr[idx + 1]?.focus();

        let currInput = input;
        let nextInput = input.nextElementSibling;

        (currInput.value.length > 1) && (currInput.value = currInput.value.slice(1));

        if (nextInput !== null && nextInput.hasAttribute('disabled') && currInput.value !== '') {
            nextInput.removeAttribute('disabled');
            nextInput.focus();
        }
        (!inputs[inputs.length - 1].disabled && inputs[inputs.length - 1].value !== '')
            ? button.classList.add('focus:border-[#007bff]')
            : button.classList.remove('focus:border-[#007bff]');
        input.addEventListener('keyup', e => {
            if (e.key === "Backspace" && input.previousElementSibling !== null) {
                e.target.value = '';
                e.target.setAttribute('disabled', true);
                input.previousElementSibling.focus();
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('paste', e => {
        if (e.target.localName !== 'input') return;
        e.preventDefault();
        let paste = (e.clipboardData || window.clipboardData).getData('text');
        if (paste.length !== inputs.length) return;
        inputs.forEach((i, idx) => {
            i.removeAttribute('disabled');
            i.focus();
            i.value = paste[idx];
        });
    });
});
