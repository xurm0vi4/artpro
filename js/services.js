"use strict"

//scroll to message
const galleryButtons = document.querySelectorAll('.services__content-button[data-goto]');
if (galleryButtons.length > 0) {
    galleryButtons.forEach(galleryButton => {
        galleryButton.addEventListener("click", onButtonClick);
    });

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
    }
}

// parallax
document.addEventListener("mousemove", parallax);
function parallax(e){
    this.querySelectorAll('.services__img').forEach(layer => {
        const speed = layer.getAttribute('data-speed')

        const x = -(window.innerWidth - e.pageX*speed)/200
        const y = (window.innerHeight - e.pageY*speed)/100

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
}