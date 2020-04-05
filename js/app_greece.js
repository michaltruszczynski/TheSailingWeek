document.addEventListener("DOMContentLoaded", function (event) {

    //MENU - bgc on scroll
    // const navbar = document.querySelector('nav');
    // const navbarHeight = navbar.offsetHeight;
    // let lastScrollTop = 0;
    // window.addEventListener('scroll', function () {
    //     let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    //     if (scrollTop > lastScrollTop) {
    //         navbar.style.top = `-${navbarHeight}px`;

    //     } else {
    //         navbar.style.top = '0';
    //     }
    //     lastScrollTop = scrollTop;
    // })

    // function fixNav() {
    //     if (window.scrollY > 10) {
    //         nav.classList.add('menu--white')
    //     } else {
    //         nav.classList.remove('menu--white')
    //     }
    // };

    // window.addEventListener('scroll', fixNav);

    //MENU - open/close on click

    const menuBtn = document.querySelector('.menu__toggle');
    const menu = document.querySelector('nav ul');

    console.log(menuBtn)

    function menuToggle() {
        menu.classList.toggle('menu--toggle')
    }

    menuBtn.addEventListener('click', menuToggle);


    // class GoogleMapsApi {
    //     constructor(googleApiKey) {
    //         this.apiKey = googleApiKey;

    //         if (!window._GoogleMapsApi) {
    //             this.callbackName = '_GoogleMapsApi.mapLoaded';
    //             window._GoogleMapsApi = this;
    //             window._GoogleMapsApi.mapLoaded = this.mapLoaded.bind(this);
    //         }

    //     }

    //     load() {
    //         console.log('test load')
    //         if (!this.promise) {
    //             this.promise = new Promise(resolve => {
    //                 this.resolve = resolve;
    //                 if (typeof window.google === 'undefined') {
    //                     console.log('test load two')
    //                     const script = document.createElement('script');
    //                     script.src = `//maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=${this.callbackName}`;
    //                     script.async = true;
    //                     // script.defer = true;
    //                     document.body.append(script);
    //                 } else {
    //                     this.resolve();
    //                 }
    //             });
    //         }
    //         return this.promise;
    //     }

    //     mapLoaded() {
    //         if (this.resolve) {
    //             console.log('test')
    //             this.resolve();

    //         }
    //     }
    // }

    class ManageFilter {
        constructor(buttonsContainerSelector, elementsContainerSelector) {
            this.buttonsContainerSelector = buttonsContainerSelector;
            this.elementsContainerSelector = elementsContainerSelector;
            this.experianceList = null;
            this.generateFilter();
        }

        generateFilter() {

            const buttonsContainer = document.querySelector(this.buttonsContainerSelector);
            this.experianceList = [...document.querySelector(this.elementsContainerSelector).children];

            buttonsContainer.addEventListener('click', function (e) {
                const filterCriteria = e.target.getAttribute('data-exp-filter')

                this.experianceList.forEach(el => {
                    el.classList.remove('card--display-none')
                })

                if (filterCriteria !== 'none')
                    this.experianceList.forEach(el => {

                        const elFilterArray = el.getAttribute('data-filter');
                        if (elFilterArray) {
                            if (!elFilterArray.includes(filterCriteria)) {
                                el.classList.toggle('card--display-none');
                            }
                        }
                    });

            }.bind(this))
        }
    }


    class ScrollSlider {
        constructor(scrollsliderSelector, refSectionSelector) {
            this.scrollsliderSelector = scrollsliderSelector;
            this.refSectionSelector = refSectionSelector;
            this.scrollSlider = null;
            this.scrollSliderWidth = null;
            this.next = null;
            this.prev = null;
            this.elemRef = null;
            this.elemRefOffsetLeft = null;
            this.generateScrollSlider();
            this.checkLayout();
        }

        generateButtons() {
            this.next = document.createElement('button');
            this.next.innerText = ' < ';
            this.next.classList.add('carousel-slider__button', 'carousel-slider__button--left');
            this.next.addEventListener('click', this.slideLeft.bind(this, 15, 300, 25));
            this.scrollSlider.parentElement.appendChild(this.next);

            this.prev = document.createElement('button');
            this.prev.innerText = ' > ';
            this.prev.classList.add('carousel-slider__button', 'carousel-slider__button--right');
            this.prev.addEventListener('click', this.slideRight.bind(this, 15, 300, 25));
            this.scrollSlider.parentElement.appendChild(this.prev);
        }

        checkLayout() {
            const elemRef = document.querySelector(this.refSectionSelector);
            const elemRefOffsetLeft = elemRef.offsetLeft;
            // console.log('wywolanie', this.elemRef )
            const additionalDiv = document.createElement('div');
            additionalDiv.style.setProperty('height', "50px");
            additionalDiv.style.setProperty('flex-shrink', "0");
            additionalDiv.style.setProperty('width', `${elemRefOffsetLeft}px`);
            additionalDiv.style.background = 'red';
            window.addEventListener('resize', function () {
                const elemRefOffsetLeft = elemRef.offsetLeft;
                additionalDiv.style.setProperty('width', `${elemRefOffsetLeft}px`)
                console.log('test', elemRefOffsetLeft)
            }.bind(this))

            this.scrollSlider.prepend(additionalDiv);

        }

        generateScrollSlider() {
            this.scrollSlider = document.querySelector(this.scrollsliderSelector);
            // this.scrollSliderWidth = parseInt(getComputedStyle(this.scrollSlider).getPropertyValue('width'));
            this.generateButtons();
        }

        slideLeft(speed, distance, step) {
            let scrolledAmount = 0;
            let scrollTimer = setInterval(function () {
                this.scrollSlider.scrollLeft += step;
                scrolledAmount += step;
                if (scrolledAmount >= distance) {
                    clearInterval(scrollTimer);
                }
            }.bind(this), speed);
        }

        slideRight(speed, distance, step) {
            let scrolledAmount = 0;
            let scrollTimer = setInterval(function () {
                this.scrollSlider.scrollLeft -= step;
                scrolledAmount += step;
                if (scrolledAmount >= distance) {
                    clearInterval(scrollTimer);
                }
            }.bind(this), speed);
        }
    }


    class NavBar {
        constructor(menuSelector) {
            this.menuSelector = menuSelector;
            this.menu = null;
            this.menuHeight = 0;
            this.lastScrollTop = 0;
            this.generateMenu();
        }

        generateMenu() {
            //dodatkowo sprawdzenie w momencie wczytania stron, gdzie jestesmy
            this.menu = document.querySelector(this.menuSelector);
            this.menuHeight = menu.offsetHeight;
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > this.lastScrollTop) {
                    this.menu.style.top = `-${this.menuHeight}px`;
                } else {
                    this.menu.style.top = '0';
                }
                this.lastScrollTop = scrollTop;
            });
        }

    }


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
            this.autoSlider = autoSlider;
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
                this.createControls && this.addSlideActiveClass();
                this.createDots && this.addDotActiveClass();
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
            this.autoSlider && this.autoChange();
            // this.autoChange(2000);

        }

        generateDots() {
            this.ulDots = document.createElement('ul');
            this.ulDots.classList.add('slider__dots');
            for (let i = 0; i < this.slidesCount; i++) {
                const dot = document.createElement('li');
                dot.classList.add('slider__dot');
                dot.setAttribute('data-dot-number', i);
                // const button = document.createElement('button');
                // button.classList.add('slider__dot__button');
                // dot.append(button);
                this.ulDots.append(dot);
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

            this.createControls && this.addSlideActiveClass();
            this.createDots && this.addDotActiveClass();
        }

        addDotActiveClass() {
            this.ulDots.children[this.currentSlideIndex].classList.add('slider__dot--active');
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
                this.currentSlideIndex = parseInt(this.slider.firstElementChild.dataset.slideNumber);
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
            this.next.classList.add('carousel__button', 'carousel__button--right');
            this.next.innerText = ' > ';
            this.next.addEventListener('click', this.slideNext.bind(this, 1));
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
            this.createControls && this.removeActiveClass();
            this.createDots && this.removeDotActiveClass();
        }

        slideNext(slidesToMove) {
            // console.log(slidesToMove)
            if (this.direction === 1) {
                this.direction = -1;

                for (let i = 0; i < this.slidesToMove; i++) {
                    this.slider.appendChild(this.slider.firstElementChild);
                }
            }
            this.carousel.style.justifyContent = 'flex-start';
            this.slider.style.transform = `translateX(-${(100 / this.slidesCount) * slidesToMove}%)`;
            this.createControls && this.removeActiveClass();
            this.createDots && this.removeDotActiveClass();
        }


        autoChange(interval = 2000) {

            let mouseOverTimer = null;
            let carouselStop = 0;
            this.carousel.addEventListener('mouseenter', () => {
                mouseOverTimer = setTimeout(() => {
                    clearInterval(this.autoSlide);
                    carouselStop = 1;
                }, 1500);
            });

            this.carousel.addEventListener('mouseleave', () => {
                clearTimeout(mouseOverTimer);
                if (carouselStop === 1) {
                    carouselStop = 0;
                    this.autoSlide = setInterval(() => {
                        this.slideNext(1);
                    }, interval);
                }
            });

            this.autoSlide = setInterval(() => {
                this.slideNext(1);
            }, interval);
        }

    }

    // const sliderMain = new Slider('.slide-list', 1, 'slider', true, true);
    // const sliderOpinion = new Slider('.opinion-list', 4, 'opinion', false, false, true);

    // const accordions = new Accordions('.accordion__button');

    const navBar = new NavBar('.menu');

    const scrollSlider = new ScrollSlider('.experiance-list', '.section--experiance');
    const filter = new ManageFilter('.buttons-container', '.experiance-list')

    ///
    const mapStyles = [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#444444"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f2f2f2"
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "simplified"
                },
                {
                    "saturation": "-65"
                },
                {
                    "lightness": "45"
                },
                {
                    "gamma": "1.78"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "saturation": "-33"
                },
                {
                    "lightness": "22"
                },
                {
                    "gamma": "2.08"
                }
            ]
        },
        {
            "featureType": "transit.station.airport",
            "elementType": "geometry",
            "stylers": [
                {
                    "gamma": "2.08"
                },
                {
                    "hue": "#ffa200"
                }
            ]
        },
        {
            "featureType": "transit.station.airport",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit.station.rail",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit.station.rail",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "simplified"
                },
                {
                    "saturation": "-55"
                },
                {
                    "lightness": "-2"
                },
                {
                    "gamma": "1.88"
                },
                {
                    "hue": "#ffab00"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#bbd9e5"
                },
                {
                    "visibility": "simplified"
                }
            ]
        }
    ]



    class GoogleMapsApi {
        /**
         * Constructor set up config.
         */
        constructor() {
            // api key for google maps
            this.apiKey = 'AIzaSyCnhJSBxlybV0Ipk_hbKIe8aYq15ljg6DA';

            // set a globally scoped callback if it doesn't already exist
            if (!window._GoogleMapsApi) {
                this.callbackName = '_GoogleMapsApi.mapLoaded';
                window._GoogleMapsApi = this;
                window._GoogleMapsApi.mapLoaded = this.mapLoaded.bind(this);
            }
        }

        /**
         * Load the Google Maps API javascript
         */
        load() {
            if (!this.promise) {
                this.promise = new Promise(resolve => {
                    this.resolve = resolve;
                    if (typeof window.google === 'undefined') {
                        const script = document.createElement('script');
                        script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=${this.callbackName}`;
                        script.async = true;
                        document.body.append(script);
                    } else {
                        this.resolve();
                    }
                });
            }

            return this.promise;
        }

        /**
         * Globally scoped callback for the map loaded
         */
        mapLoaded() {
            if (this.resolve) {
                this.resolve();
            }
        }
    }



    const maptest = new GoogleMapsApi();




    let map;
    const options = {
        zoom: 8,
        center: { lat: 42.3601, lng: -71.0589 }
    }

    let button = document.querySelector('.btn');

    // button.addEventListener('click', function () {
    //     console.log('click', );

    // })
    function initMap() {
        const options = {
            styles: mapStyles,
            zoom: 8,
            center: { lat: 37.9838, lng: 23.7275 }
        }
        let map = new google.maps.Map(document.querySelector('.map'), options);

        let marker = new google.maps.Marker({
            position: { lat: 42.4668, lng: -70.9495 },
            map: map
        })
        console.log('test')
        // let button = document.querySelector('.btn');

        // button.addEventListener('click', function () {
        //     console.log('click', map);
        //     map.panTo({ lat: 41.881, lng: -87.623 })
        // })


    }

    // console.log(maptest.load())
    maptest.load()
        .then((respond) => {
            initMap();
        }).catch(err => {
            console.log(err)
        });
    console.log(window);
    console.log(window.innerWidth);

    console.log(document.documentElement.clientWidth);

});
