document.addEventListener("DOMContentLoaded", function (event) {

    // Slider
    // Slider must have given width

    const carousel = document.querySelector('.carousel');
    const slider = document.querySelector('.slider');

    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    let direction = -1;

    next.addEventListener('click', function () {
        if (direction === 1) {
            direction = -1;
            slider.appendChild(slider.firstElementChild);
        }
        carousel.style.justifyContent = 'flex-start';
        slider.style.transform = 'translateX(-20%)';
    })

    prev.addEventListener('click', function () {
        if (direction === -1) {
            direction = 1;
            slider.prepend(slider.lastElementChild);
        }
        carousel.style.justifyContent = 'flex-end';
        slider.style.transform = 'translateX(20%)';
    })

    slider.addEventListener('transitionend', function () {
        if (direction === 1) {

        } else {
            slider.appendChild(slider.firstElementChild);
        }

        slider.style.transition = 'none';
        slider.style.transform = 'translateX(0)';
        setTimeout(function () {
            slider.style.transition = 'transform 0.5s linear';
        });
    })

    // Accordion

    document.querySelectorAll('.accordion__button').forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('accordion__button--active');
            button.nextElementSibling.classList.toggle('accordion__content--active');
        })
    })



});

