"use strict"
//header hidden and blur 

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
    if (scrollY > headerHeight) {
        blur();
    }
    else {
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

function blur() {
    header.classList.add(headerBlurClassName);
}

function unblur() {
    header.classList.remove(headerBlurClassName);
}

//burger

const iconMenu = document.querySelector('.burger__icon');
const menuBody = document.querySelector('.header__list_wrapper');

if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}


//scroll to top

const goTopBtn = document.querySelector('.go-top');

goTopBtn.addEventListener('click', goTop)
window.addEventListener('scroll', trackScroll);

function goTop() {
    window.scrollTo({
        top: 0,
    });
}

function trackScroll() {
    const offset = window.pageYOffset;
    const coords = document.documentElement.clientHeight;
    if (offset > coords) {
        goTopBtn.classList.add('go-top_show');
    } else {
        goTopBtn.classList.remove('go-top_show');
    }
}

//form

document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('form');
    const inputArr = Array.from(form);
    const validInputArr = [];

    inputArr.forEach((el)=>{
        if(el.hasAttribute('data-reg')){
            el.setAttribute('is-valid', '0');
            validInputArr.push(el);
        }
    })

    form.addEventListener('submit', formSend);
    form.addEventListener('input', inputHandler);

    async function formSend(e){
        e.preventDefault();

        for(let i = 0; i < validInputArr.length; i++){
            if(validInputArr[i].value === ''){
                validInputArr[i].style.borderColor = 'rgb(255, 0, 0)';
            }
        }

        const isAllValid = [];

        validInputArr.forEach((el)=>{
            isAllValid.push(el.getAttribute('is-valid'));
        });

        const isValid = isAllValid.reduce((acc, current)=>{
            return acc && current;
        });
        if(isValid == 1){

        }else{
            alert('Заповніть всі необхідні поля');
        }
    }
    
    function inputHandler({ target }){
        if(target.hasAttribute('data-reg')){
            inputCheck(target);
            
        }
    }

    function inputCheck(el){
        const inputValue = el.value;
        const inputReg = el.getAttribute('data-reg');
        const reg = new RegExp(inputReg);
        if(reg.test(inputValue)){
            el.style.borderColor = 'rgb(0, 196, 0)';
            el.setAttribute('is-valid', '1');
        } else{
            el.style.borderColor = 'rgb(255, 0, 0)';
            el.setAttribute('is-valid', '0');
        }
        
    }
    
});   


