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

//gallery

const fullImgBox = document.getElementById('fullImgBox');
const allGalleryBtn = document.getElementById('works__btns');
const prevImg = document.querySelector('.works__btn-prev');
const nextImg = document.querySelector('.works__btn-next');


const getAllGalleryImages = (el, level) => {
    let allGalleryImages = [];
    const getElementWithDepth = (el, level = 0) => {
        return [...el.children].reduce((acc, n) =>{
            if(n.tagName === 'IMG'){
                allGalleryImages.push(n);
            }
            acc.push(...getElementWithDepth(n, level + 1));
            return acc;
        }, [{el, level}]);
    }
    getElementWithDepth(el, level);
    return allGalleryImages;
}

function closeFullImg(){
    fullImgBox.style.display = 'none';
    allGalleryBtn.style.display = 'none';
    document.body.classList.remove('_lock');
}

function setNewFullImage(index, AllGalleryImages, lengthOfImages){
    const imageSelected = AllGalleryImages[index];
    fullImg.src = imageSelected.src;
}

function openFullImg(fullImagePathClicked, AllGalleryImages, index){
    fullImgBox.style.display = 'flex';
    fullImg.src = fullImagePathClicked;
    let lengthOfImages = AllGalleryImages.length;
    document.body.classList.add('_lock');
    fullImgBox.addEventListener('click', (e) => {
        if(e.target.style.display == 'flex' || e.target.classList == 'closeImage'){
            closeFullImg();
        }
    })
    document.addEventListener('keydown', (e) =>{
        if(e.code == 'Escape'){
            closeFullImg();
        }
    })
    prevImg.addEventListener('click', (e) =>{
        if(index > 0){
            --index;
            setNewFullImage(index, AllGalleryImages, lengthOfImages);
        }
        if(index === 0){
            index = lengthOfImages - 1;
            setNewFullImage(index, AllGalleryImages, lengthOfImages);
        }
    })
    nextImg.addEventListener('click', (e) =>{
        if(index < (lengthOfImages - 1)){
            ++index;
            setNewFullImage(index, AllGalleryImages, lengthOfImages);
        }
        if(index === lengthOfImages - 1){
            index = 0;
            setNewFullImage(index, AllGalleryImages, lengthOfImages);
        }
    })
}

function galleryInit(event){
    let galleryChilds = document.getElementById('gallery');
    let AllGalleryImages = getAllGalleryImages(galleryChilds, 1); 
    let target = event.target;
    if(target.tagName == 'IMG'){
        allGalleryBtn.style.display = 'block';
        let fullImagePathClicked = target.src;
        const index = AllGalleryImages.indexOf(target); 
        openFullImg(fullImagePathClicked, AllGalleryImages, index);
        console.log(index)
    }
}

//scroll to message

const buttonMessage = document.querySelector('.intro__button-form');

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