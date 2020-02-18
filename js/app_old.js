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

    // console.log('pierwszy', track);
   
    // const slides = Array.from(track.children);

    const nextButton = document.querySelector('.carousel__button--right');
    const prevButton = document.querySelector('.carousel__button--left');

    const dotsNav = document.querySelector('.carousel__nav');
    const dots = Array.from(dotsNav.children);

    // const slideWidth = slides[0].getBoundingClientRect().width;

    //click left
    //slide in from left
    function slideLeft() {
        //add transition for smoth scrolling
        track.classList.add('carousel__track--transition');
        //listen when transition ends to change slides order
        track.addEventListener('transitionend', changeSlideLeft, false);
        //slide smoth transition
        track.style.transform = 'translateX(25%)';
    }

    //change slide handler
    function changeSlideLeft(e) {
        //remove transition
        track.classList.remove('carousel__track--transition');
        //change slides order and current slide marker
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.previousElementSibling;
        console.log('next Slide:', nextSlide);
        const lastElement = track.querySelector('li:last-child');
        currentSlide.classList.remove('current-slide');
        nextSlide.classList.add('current-slide');
        //change slides order
        track.removeChild(lastElement);
        track.prepend(lastElement);
        //reset slider
        track.style.transform = 'translateX(0)';
        //remove not used listiner
        track.removeEventListener('transitionend', changeSlideLeft, false);
    }

    prevButton.addEventListener('click', slideLeft);

    //click right
    //slide in from right
    function slideRight() {
        //add transition for smoth scrolling
        track.classList.add('carousel__track--transition');
        //listen when transition ends to change slides order
        track.addEventListener('transitionend', changeSlideRight, false);
        //slide smoth transition
        track.style.transform = 'translateX(-25%)';
        console.log('click1');
    }
    //change slide order handler
    function changeSlideRight() {
        //remove transition
        console.log('click2');
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

    nextButton.addEventListener('click', slideRight);

    //slide indicators


    //autoSlider

    // var docWidth = document.documentElement.offsetWidth;

    // [].forEach.call(
    //   document.querySelectorAll('*'),
    //   function(el) {
    //     if (el.offsetWidth > docWidth) {
    //       console.dir(el);
    //       console.log(docWidth)
    //     }
    //   }
    // );

    document.querySelectorAll('.accordion__button').forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('accordion__button--active');
            button.nextElementSibling.classList.toggle('accordion__content--active');
        })
    })

    class Accordion {
        
    }

});

