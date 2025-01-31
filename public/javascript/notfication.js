const copy = document.querySelector('#copy_button');
const notification = document.querySelector('#notifications .notify');
const notifyButton = document.querySelector('#notify-button');
const notifyContainer = document.querySelector('.notify-container');
const notifyBottomMargin = 6;
const notifyDelay = 6;

// copy.addEventListener('click', () => {
//     const copyText = document.querySelector('#copy').value;
//     navigator.clipboard.writeText(copyText);
//     addNotification();
// });


function showNotification(item) {
    TweenMax.set(item, {
        marginBottom: notifyBottomMargin,
        marginTop: -item.offsetHeight,
        opacity: 0.25
    });
    TweenMax.to(item, 0.5, {
        marginTop: 0,
        opacity: 1,
        ease: Expo.easeOut,
        onComplete: function () {
            hideNotification(item);
        }
    });
}


function hideNotification(item, delay = true) {
    TweenMax.to(item, 0.5, {
        opacity: 0,
        marginTop: -item.offsetHeight - notifyBottomMargin,
        delay: delay ? notifyDelay : 0,
        onComplete: function () {
            item.parentNode.removeChild(item);
        }
    });
}


function addNotification() {
    newNotification = notification.cloneNode(true),
        close = newNotification.querySelector('.notify__close');
    close.addEventListener('click', () => {
        hideNotification(newNotification, false);
    });
    notifyContainer.insertBefore(newNotification, notifyContainer.firstChild);
    showNotification(newNotification);
}
