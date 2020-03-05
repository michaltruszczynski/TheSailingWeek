document.addEventListener("DOMContentLoaded", function (event) {

    // Slider
    // Slider container must have given width.
    // Specify number of slides visible int the container.
    // Total number of slides must be greater then number of slides visible in the container.

    // const carousel = document.querySelector('.carousel');
    // const slider = document.querySelector('.slider');
    // const slidesCount = slider.childElementCount;
    // const slidesVisible = 4; // to be included in class definition

    // const next = document.querySelector('.next');
    // const prev = document.querySelector('.prev');
    // let direction = -1;

    // next.addEventListener('click', function () {
    //     if (direction === 1) {
    //         direction = -1;
    //         const slidesToMove = slidesCount - slidesVisible;
    //         for (let i = 0; i < slidesToMove; i++) {
    //             slider.appendChild(slider.firstElementChild);
    //         }
    //     }
    //     carousel.style.justifyContent = 'flex-start';
    //     slider.style.transform = 'translateX(-20%)';
    // });

    // prev.addEventListener('click', function () {
    //     if (direction === -1) {
    //         direction = 1;
    //         const slidesToMove = slidesCount - slidesVisible;
    //         for (let i = 0; i < slidesToMove; i++) {
    //             slider.prepend(slider.lastElementChild);
    //         }
    //     }
    //     carousel.style.justifyContent = 'flex-end';
    //     slider.style.transform = 'translateX(20%)';
    // });

    // slider.addEventListener('transitionend', function () {
    //     if (direction === 1) {
    //         slider.prepend(slider.lastElementChild);
    //     } else {
    //         slider.appendChild(slider.firstElementChild);
    //     }

    //     slider.style.transition = 'none';
    //     slider.style.transform = 'translateX(0)';
    //     setTimeout(function () {
    //         slider.style.transition = 'transform 0.5s linear';
    //     });
    // });

    // Accordion

    document.querySelectorAll('.accordion__button').forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('accordion__button--active');
            button.nextElementSibling.classList.toggle('accordion__content--active');
        });
    });
    class Accordion {
        constructor(accordionSelector) {
            this.accordionSelector = accordionSelector;
            this.accordionList = null;

        }
    }

    class Slider {
        constructor(sliderSelector, slidesVisible, sliderName, createDots = false, createControls = false, autoSlider = false) {
            this.currentSlide = 0; // lub null
            this.sliderSelector = sliderSelector;
            this.slider = null;
            this.sliderName = sliderName;
            this.slides = null;
            this.slidesVisible = slidesVisible;
            this.slidesToMove // option
            this.slidesCount = null;
            this.next = null;
            this.prev = null;
             // or []
            this.autoSlider = null; // option
            this.direction = -1;
            this.autoSlide = null;
            this.createControls = createControls;
            // this.createDots = createDots && this.generateDots();
            this.generateSlider();
            this.changeDots();

        }

        // generate slider adds styling
        generateSlider() {
            this.slider = document.querySelector(this.sliderSelector);
            this.carousel = this.slider.parentElement;
            this.slider.classList.add(`slider-${this.sliderName}`);
            this.slides = this.slider.children;
            this.slidesCount = this.slider.childElementCount;
            this.slidesToMove = this.slidesCount - this.slidesVisible
            console.log(this.slidesCount, this.slider.childElementCount)
            for (let i = 0; i < this.slides.length; i++) {
                this.slides[i].classList.add(`slide-${this.sliderName}`);
                // important when adding options functionality
                // this.slides.style = `flex-basis: `
            }

            this.slider.addEventListener('transitionend', () => {

                if (this.direction === 1) {
                    this.slider.prepend(this.slider.lastElementChild);
                } else {
                    this.slider.append(this.slider.firstElementChild);
                }

                this.slider.style.transition = 'none';
                this.slider.style.transform = 'translateX(0)';
                setTimeout(() => {
                    this.slider.style.transition = 'transform 0.2s linear';
                });
            });
            
            this.createControls && this.createButtons();
            // this.createButtons();
            // this.autoChange(2000);
            console.log(this.slider)
        }

        generateDots() {
            const ulDots = document.createElement('ul');
            ulDots.classList.add('slider__dots');
            for (let i = 0; i < this.slidesCount; i++) {
                const dot = document.createElement('li');
                dot.classList.add('slider__dot')
                const button = document.createElement('button');
                button.classList.add('slider__dot__button');
                dot.append(button);
                ulDots.append(dot)
            }

            this.slider.parentElement.parentElement.parentElement.append(ulDots);

        }

        changeDots() {
            const dotsList = document.querySelectorAll('.slider__dot');
            console.log(dotsList);
            dotsList.forEach((dot, i) => {
                console.log(dot);
                dot.setAttribute('dot-number', i)
            })
            // console.log(dotsList.querySelector(`li[dot-number="${1}]"`));
            // console.log(dotsList.querySelector('li'))
        }

        createButtons() {
            this.prev = document.createElement('button');
            this.prev.type = 'button';
            this.prev.classList.add('carousel__button', 'carousel__button--left');
            this.prev.innerText = ' < ';
            this.prev.addEventListener('click', this.slidePrev.bind(this));
            this.slider.parentElement.parentElement.appendChild(this.prev);

            this.next = document.createElement('button');
            this.next.type = 'button';
            this.next.classList.add('carousel__button', 'carousel__button--right')
            this.next.innerText = ' > '
            this.next.addEventListener('click', this.slideNext.bind(this))
            this.slider.parentElement.parentElement.appendChild(this.next);
        }

        slidePrev() {
            if (this.direction === -1) {
                this.direction = 1;
                console.log('test', this.slidesToMove, this.slider)
                for (let i = 0; i < this.slidesToMove; i++) {
                    this.slider.prepend(this.slider.lastElementChild);
                }
            }
            this.carousel.style.justifyContent = 'flex-end';
            // this.slider.style.transform = 'translateX(20%)';
        }

        slideNext() {
            if (this.direction === 1) {
                this.direction = -1;

                for (let i = 0; i < this.slidesToMove; i++) {
                    this.slider.appendChild(this.slider.firstElementChild);
                }
            }
            this.carousel.style.justifyContent = 'flex-start';
            this.slider.style.transform = 'translateX(-20%)';
        }

        autoChange(interval) {

            let mouseOverTimer = null;
            let carouselStop = 0;
            this.carousel.addEventListener('mouseenter', () => {
                mouseOverTimer = setTimeout(() => {
                    clearInterval(this.autoSlide);
                    // console.log(this.autoSlide);
                    console.log('stop');
                    carouselStop = 1;
                }, 1500);
            })

            this.carousel.addEventListener('mouseleave', () => {
                clearTimeout(mouseOverTimer);
                console.log('test');
                console.log(mouseOverTimer);
                if (carouselStop === 1) {
                    carouselStop = 0;
                    this.autoSlide = setInterval(() => {
                        this.slideNext();
                    }, interval);
                }
            })

            this.autoSlide = setInterval(() => {
                this.slideNext();
            }, interval);
        }




    }

    const sliderMain = new Slider('.slide-list', 1, 'slide', false, true);
    const sliderOpinion = new Slider('.opinion-list', 4, 'opinion');

    console.log(window.innerWidth);
    console.log(document.documentElement.clientWidth);

});

