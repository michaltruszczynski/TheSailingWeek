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


    class Slider {
        constructor(sliderSelector, slidesVisible, dots, controls, autoSlider) {
            this.currentSlide = 0; // lub null
            this.sliderSelector = sliderSelector;
            this.slider = null;
            this.slides = null;
            this.slidesVisible = slidesVisible; // option
            this.slidesCount = null;
            this.next = null;
            this.prev = null;
            this.dots = null; // or []
            this.autoSlider = null; // option
            this.direction = -1;
            this.generateSlider();

        }

        // generate slider adds styling
        generateSlider() {
            this.slider = document.querySelector(this.sliderSelector);
            this.carousel = this.slider.parentElement;
            this.slider.classList.add('slider');
            this.slides = this.slider.children;
            this.slidesCount = this.slides.childElementCount;
            this.slidesToMove = this.slidesCount - this.slidesVisible

            for (let i = 0; i < this.slides.length; i++) {
                this.slides[i].classList.add('slide');
                // important when adding options functionality
                // this.slides.style = `flex-basis: `
            }

            this.slider.addEventListener('transitionend', () => {
                console.log(this)
                if (this.direction === 1) {
                    this.slider.prepend(this.slider.lastElementChild);
                } else {
                    this.slider.appendChild(this.slider.firstElementChild);
                }

                this.slider.style.transition = 'none';
                this.slider.style.transform = 'translateX(0)';
                setTimeout(() => {
                    this.slider.style.transition = 'transform 0.5s linear';
                });
            });
            this.createButtons();
        }

        createButtons() {
            this.prev = document.createElement('button');
            this.prev.type = 'button';
            this.prev.innerText = ' < Poprzedni';
            this.prev.addEventListener('click', this.slidePrev.bind(this));
            this.slider.parentElement.parentElement.parentElement.appendChild(this.prev);

            this.next = document.createElement('button');
            this.next.type = 'button';
            this.next.innerText = 'Następny > '
            this.next.addEventListener('click', this.slideNext.bind(this))
            this.slider.parentElement.parentElement.parentElement.appendChild(this.next);
        }

        slidePrev() {
            if (this.direction === -1) {
                this.direction = 1;

                for (let i = 0; i < this.slidesToMove; i++) {
                    this.slider.prepend(this.slider.lastElementChild);
                }
            }
            this.carousel.style.justifyContent = 'flex-end';
            this.slider.style.transform = 'translateX(20%)';
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


    }

    const slider1 = new Slider('.opinion-list', 4);

});

