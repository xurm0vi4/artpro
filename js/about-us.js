
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