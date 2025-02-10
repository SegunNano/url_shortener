const inputs = document.querySelectorAll('input.code-input');
const button = document.querySelector('button');
const stopWatch1 = document.querySelector('#stopWatch1');
const stopWatch2 = document.querySelector('#stopWatch2');
const stopWatch3 = document.querySelector('#stopWatch3');
const submitBtn = document.querySelector('#submit-verification-code');
const reloadBtn = document.querySelector('#reload-verification-code');


let time = stopWatch1 && (Math.floor(Number(stopWatch1.textContent) / 1000));
time && setInterval(() => {
    time -= 0.5;
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);


    if (time < 60 && time > 0) {
        stopWatch2.classList.toggle('text-primary');
        stopWatch2.classList.toggle('text-secondary');
    }

    (String(min).length < 2) && (min = '0' + min);
    (String(sec).length < 2) && (sec = '0' + sec);


    if (stopWatch2)
        stopWatch2.innerHTML = '<span class=" text-xl md:text-3xl">Expires in: </span>' + min + ' <span class="text-lg md:text-2xl">min</span> ' + sec + ' <span class="text-lg md:text-2xl">sec</span> ';
    stopWatch3.textContent = min + ' : ' + sec;

    if (time <= 0) {
        clearInterval(time);
        if (stopWatch2 && stopWatch2.classList.contains('text-primary')) {
            stopWatch2.classList.remove('text-primary');
            stopWatch2.classList.add('text-secondary');
        }
        if (stopWatch2)
            stopWatch2.innerHTML = ' <span class=" text-xl md:text-3xl">CODE EXPIRED</span> ';
        stopWatch3.textContent = '';
        reloadBtn && reloadBtn.classList.remove('hidden');
        submitBtn && submitBtn.classList.add('hidden');
    }

}, 500);



inputs.length && window.addEventListener('load', () => inputs[0].focus());

inputs.length && inputs.forEach((input, idx, arr) => {
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


inputs.length && document.addEventListener('DOMContentLoaded', () => {

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

