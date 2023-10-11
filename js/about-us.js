"use strict"


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

//gotop
const goTopBtn = document.querySelector('.go-top');

goTopBtn.addEventListener('click', goTop)
window.addEventListener('scroll', trackScroll);

function goTop(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
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

//counter

window.addEventListener("load", windowLoad);

 function windowLoad(){
    function digitsCountersInit(digitsCountersItems){
        let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter");
        if ( digitsCounters) {
            digitsCounters.forEach(digitsCounter => {
                digitsCountersAnimate(digitsCounter);
            });
        }
    }
    function digitsCountersAnimate(digitsCounter){
        let startTimestamp = null;
        const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 1000;
        const startValue = parseInt(digitsCounter.innerHTML);
        const startPosition = 0;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    // digitsCountersInit();

    let options = {
        threshold: 0.3
    }
    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const digitsCountersItems = targetElement.querySelectorAll("[data-digits-counter]");
                if (digitsCountersItems.length) {
                    digitsCountersInit(digitsCountersItems);
                }
                // observer.unobserve(targetElement);
            }
        });
    }, options);

    let sections = document.querySelectorAll('.counter');
    if (sections.length) {
        sections.forEach(section => {
            observer.observe(section);
        });
    }
}