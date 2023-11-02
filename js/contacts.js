"use strict"

//scroll to message

const buttonMessage = document.querySelector('.contacts__button');

buttonMessage.addEventListener('click', onButtonClick);

function onButtonClick(e) {
    const button = e.target;
    if (button.dataset.goto && document.querySelector(button.dataset.goto)) {
        const gotoBlock = document.querySelector(button.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;


        window.scrollTo({
            top: gotoBlockValue,
            
        });
        e.preventDefault();
    }
}

