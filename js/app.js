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

    //arrange the slides next to one another
    // const setSlidesPosition = (slide, index) => {
    //     slide.style.left = slideWidth * index + 'px';
    // }

    // slides.forEach(setSlidesPosition);

    // slides[0].style.left = slideWidth * 0 + 'px';
    // slides[1].style.left = slideWidth * 1 + 'px';
    // slides[2].style.left = slideWidth * 2 + 'px';

    // console.log(slides);

    //click left

    //clisk right

    nextButton.addEventListener('click', e => {
        
        // const amountToMove = nextSlide.style.left;
        //move to the next slide
        
        

        // console.log('przed zmiana', track);

        function changeSlide(e) {
            console.log(e);
            track.classList.remove('carousel__track--transition');
            const currentSlide = track.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling;
            // track.classList.remove('carousel__track--transition');
            const firstElement = track.querySelector('li:first-child');
            currentSlide.classList.remove('current-slide');
            nextSlide.classList.add('current-slide');
            track.removeChild(firstElement);
            track.appendChild(firstElement);
            track.style.transform = 'translateX(0)';
            console.log('po zmianie', track);

            track.removeEventListener('transitionend', changeSlide, false);
        }

        track.addEventListener('transitionend', changeSlide, false);
        
        track.classList.add('carousel__track--transition');
        console.log('track:', track)
        track.style.transform = 'translateX(-25%)';

        



        // track.style.transform = 'translateX(0)';

        // currentSlide.classList.remove('current-slide');
        // nextSlide.classList.add('current-slide')

        
    })

    //slide indicators


});