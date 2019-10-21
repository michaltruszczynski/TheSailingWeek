document.addEventListener("DOMContentLoaded", function (event) {

    //MENU - bgc on scroll
    const nav = document.querySelector('nav');

    function fixNav() {
        if (window.scrollY > 10) {
            nav.classList.add('menu--white')
        } else {
            nav.classList.remove('menu--white')
        }
    };

    window.addEventListener('scroll', fixNav);

    //MENU - open/close on click

    const menuBtn = document.querySelector('.menu__toggle');
    const menu = document.querySelector('nav ul');

    console.log(menuBtn)

    function menuToggle() {
        menu.classList.toggle('menu--toggle')
    }

    menuBtn.addEventListener('click', menuToggle);

    //CAROUSEL
    const track = document.querySelector('.carousel__track');

    console.log('pierwszy', track);
   
    // const slides = Array.from(track.children);

    const nextButton = document.querySelector('.carousel__button--right');
    const prevButton = document.querySelector('.carousel__button--left');

    const dotsNav = document.querySelector('.carousel__nav');
    const dots = Array.from(dotsNav.children);

    // const slideWidth = slides[0].getBoundingClientRect().width;

    // console.log(slides);

    //click left
    //change slide handler


    //click right
    //change slide handler
    function changeSlideRight(e) {
        //remove transition
        track.classList.remove('carousel__track--transition');
        //change slides order and current slide marker
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const firstElement = track.querySelector('li:first-child');
        currentSlide.classList.remove('current-slide');
        nextSlide.classList.add('current-slide');
        //change slides order
        track.removeChild(firstElement);
        track.appendChild(firstElement);
        //reset slider
        track.style.transform = 'translateX(0)';
        //remove not used listiner
        track.removeEventListener('transitionend', changeSlideRight, false);
    }

    nextButton.addEventListener('click', e => {
        //add transition for smoth scrolling
        track.classList.add('carousel__track--transition');
        //listen when transition ends to change slides order
        track.addEventListener('transitionend', changeSlideRight, false);
        //slide smoth transition
        track.style.transform = 'translateX(-25%)';

    })

    //slide indicators


});