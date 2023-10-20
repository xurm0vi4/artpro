"use strict"

//header hidden and blur 

const hideTopHeader = () => {
    const header = document.querySelector('.header');
    const headerTop = document.querySelector('.header__top');
    const headerNav = document.querySelector('.header__nav');
    const headerHeight = headerNav.offsetHeight;
    const hiddenHeaderTopClassName = 'header__top-hidden';
    const headerBlurClassName = 'header__blur';
    const headerTopHeight = 34;
    let isItHidden = false;
    window.addEventListener('scroll', (ev) => {
        const scrollY = window.scrollY;

        if (scrollY > headerTopHeight) {
            hide();
        } else {
            show();
        }
        if(scrollY > headerHeight){
            blur();
        }
        else{
            unblur();
        }
    });

    function hide() {
        if (!isItHidden) {
            headerTop.classList.add(hiddenHeaderTopClassName);
            isItHidden = true;
        }
    }

    function show() {
        if (isItHidden) {
            headerTop.classList.remove(hiddenHeaderTopClassName);
            isItHidden = false;
        }
    }

    function blur(){
        header.classList.add(headerBlurClassName);
    }

    function unblur(){
        header.classList.remove(headerBlurClassName);
    }

}

hideTopHeader();
//burger

const iconMenu = document.querySelector('.burger__icon');
const menuBody = document.querySelector('.header__list_wrapper');

if (iconMenu){
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}

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

//scroll to top

const goTopBtn = document.querySelector('.go-top');

goTopBtn.addEventListener('click', goTop)
window.addEventListener('scroll', trackScroll);

function goTop(){
    window.scrollTo({
        top: 0,
    });
}

function trackScroll(){
    const offset = window.pageYOffset;
    const coords = document.documentElement.clientHeight;
    if(offset > coords){
        goTopBtn.classList.add('go-top_show');
    } else{
        goTopBtn.classList.remove('go-top_show');
    }
}