const inputs = document.querySelectorAll('input');
const button = document.querySelector('button');
const stopWatch1 = document.querySelector('#stopWatch1');
const stopWatch2 = document.querySelector('#stopWatch2');
let time = (Math.floor(stopWatch1.textContent / 1000));
const x = setInterval(() => {
    time--;
    let min = Math.floor(time / 60);
    let sec = time % 60;
    if (String(min).length < 2) {
        min = '0' + min;
    }
    if (String(sec).length < 2) {
        sec = '0' + sec;
    }
    stopWatch2.innerHTML = min + ' min ' + sec + ' sec';

    if (time <= 0) {
        clearInterval(time);
        stopWatch2.innerHTML = 'CODE EXPIRED';
    }

}, 1000);



window.addEventListener('load', () => inputs[0].focus());

inputs.forEach((input, idx, arr) => {
    input.addEventListener("input", () => {
        // console.log(idx, arr);
        // (input.value.length > 1) && (input.value = input.value.slice(1));
        // arr[idx + 1]?.removeAttribute('disabled');
        // arr[idx + 1]?.focus();

        let currInput = input;
        let nextInput = input.nextElementSibling;

        currInput.value = currInput.value.toUpperCase();
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
        let paste = `${(e.clipboardData || window.clipboardData).getData('text')}`.toUpperCase();
        if (paste.length !== inputs.length) return;
        inputs.forEach((i, idx) => {
            i.removeAttribute('disabled');
            i.focus();
            i.value = paste[idx];
        });
    });
});

