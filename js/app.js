document.addEventListener("DOMContentLoaded", function (event) {

    class Accordions {
        constructor(accordionSelector) {
            this.accordionSelector = accordionSelector;
            this.accordionList = null;
            this.createAccordions();
        }

        createAccordions() {
            this.accordionList = document.querySelectorAll(this.accordionSelector);
            this.accordionList = [...this.accordionList].map(accordion => {
                accordion.addEventListener('click', () => {
                    accordion.classList.toggle('accordion__button--active');
                    accordion.nextElementSibling.classList.toggle('accordion__content--active');
                });
            });
        }
    }

    class OptionMenu {
        constructor(optionMenuSelector) {
            this.optionMenuSelector = optionMenuSelector;
            this.optionMenu = null;
        }


    }

    class NavBar {

    }

    //Slider

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
            this.currentSlideIndex = null;
            this.ulDots = null;
            // or {}
            this.autoSlider = null; // option
            this.direction = null;
            this.autoSlide = null;
            this.createControls = createControls;
            this.createDots = createDots;
            this.generateSlider();
        }

        // generate slider adds styling
        generateSlider() {
            this.direction = -1;
            this.slider = document.querySelector(this.sliderSelector);
            this.slidesCount = this.slider.childElementCount;
            this.carousel = this.slider.parentElement;
            this.slider.classList.add(`slider-${this.sliderName}`);
            this.slides = this.slider.children;
            this.slidesToMove = this.slidesCount - this.slidesVisible

            for (let i = 0; i < this.slides.length; i++) {
                this.slides[i].classList.add(`slide-${this.sliderName}`);
                this.slides[i].style.flexBasis = `${100 / this.slidesCount}%`;
            }

            this.slider.addEventListener('transitionend', () => {

                this.slider.style.transition = 'none';

                if (this.direction === 1) {
                    this.slider.prepend(this.slider.lastElementChild);
                } else {
                    this.slider.append(this.slider.firstElementChild);
                }
                this.addSlideActiveClass();
                this.addDotActiveClass();
                this.slider.style.transition = 'none';
                this.slider.style.transform = 'translateX(0)';
                setTimeout(() => {
                    this.slider.style.transition = 'transform 0.3s linear';
                });

            });

            if (this.createDots) {
                for (let i = 0; i < this.slides.length; i++) {
                    this.slides[i].setAttribute('data-slide-number', i);
                }
            }

            this.createControls && this.createButtons();
            this.createDots && this.generateDots();
            // this.autoChange(2000);

        }

        generateDots() {
            this.ulDots = document.createElement('ul');
            this.ulDots.classList.add('slider__dots');
            for (let i = 0; i < this.slidesCount; i++) {
                const dot = document.createElement('li');
                dot.classList.add('slider__dot');
                dot.setAttribute('data-dot-number', i)
                // const button = document.createElement('button');
                // button.classList.add('slider__dot__button');
                // dot.append(button);
                this.ulDots.append(dot)
            }

            this.slider.parentElement.parentElement.append(this.ulDots);

            // this.ulDots.addEventListener('click', (e) => {
            //     console.log(e.target);
            //     const dotClickedIndex = e.target.dataset.dotNumber;
            //     console.log(dotClickedIndex)
            //     if (dotClickedIndex) {
            //         const slidesToSkip = dotClickedIndex - this.currentSlideIndex;
            //         console.log(slidesToSkip);
            //         if (slidesToSkip <= this.slidesCount / 2) {
            //             this.slideNext(slidesToSkip);
            //         }
            //     }
            // })

            this.addSlideActiveClass();
            this.addDotActiveClass();
        }

        addDotActiveClass() {
            this.ulDots.children[this.currentSlideIndex].classList.add('slider__dot--active')
        }

        removeActiveClass() {
            for (let i = 0; i < this.slides.length; i++) {
                this.slides[i].classList.remove('current-slide');
            }
        }

        removeDotActiveClass() {
            for (let i = 0; i < this.ulDots.children.length; i++) {
                this.ulDots.children[i].classList.remove('slider__dot--active');
            }
        }

        addSlideActiveClass() {
            if (this.direction === 1) {
                this.slider.lastElementChild.classList.add('current-slide');
                this.currentSlideIndex = parseInt(this.slider.lastElementChild.dataset.slideNumber);
            } else {
                this.slider.firstElementChild.classList.add('current-slide');
                this.currentSlideIndex = parseInt(this.slider.firstElementChild.dataset.slideNumber)
            }
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
            this.next.addEventListener('click', this.slideNext.bind(this, 1))
            this.slider.parentElement.parentElement.appendChild(this.next);
        }

        slidePrev() {
            if (this.direction === -1) {
                this.direction = 1;
                for (let i = 0; i < this.slidesToMove; i++) {
                    this.slider.prepend(this.slider.lastElementChild);
                }
            }
            this.carousel.style.justifyContent = 'flex-end';
            this.slider.style.transform = `translateX(${100 / this.slidesCount}%)`;
            this.removeActiveClass();
            this.removeDotActiveClass();
        }

        slideNext(slidesToMove) {
            console.log(slidesToMove)
            if (this.direction === 1) {
                this.direction = -1;

                for (let i = 0; i < this.slidesToMove; i++) {
                    this.slider.appendChild(this.slider.firstElementChild);
                }
            }
            this.carousel.style.justifyContent = 'flex-start';
            this.slider.style.transform = `translateX(-${(100 / this.slidesCount) * slidesToMove}%)`;
            this.removeActiveClass();
            this.removeDotActiveClass();
        }


        autoChange(interval) {

            let mouseOverTimer = null;
            let carouselStop = 0;
            this.carousel.addEventListener('mouseenter', () => {
                mouseOverTimer = setTimeout(() => {
                    clearInterval(this.autoSlide);
                    carouselStop = 1;
                }, 1500);
            })

            this.carousel.addEventListener('mouseleave', () => {
                clearTimeout(mouseOverTimer);
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

    const sliderMain = new Slider('.slide-list', 1, 'slider', true, true);
    const sliderOpinion = new Slider('.opinion-list', 4, 'opinion');

    const accordions = new Accordions('.accordion__button');

    console.log(window.innerWidth);
    console.log(document.documentElement.clientWidth);

});

