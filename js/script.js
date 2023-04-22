const dropdownButtons = document.querySelectorAll('.menu__dropdown-button')
const dropdowns = document.querySelectorAll('.menu__dropdown')
const menuBtn = document.querySelector('.menu__burger');
const modalOpenButtons = document.querySelectorAll('[data-modal-button]');
const modalCloseButtons = document.querySelectorAll('.card-modal__button-close');
const allModals = document.querySelectorAll('[data-modal]');
const accordionItems = document.querySelectorAll('.accordion__item');
const animScrollItems = document.querySelectorAll('.anim-scroll')

// DROPDOWN

dropdownButtons.forEach(function (item) {
    item.addEventListener('click', function (event) {
        let dropdown = this.closest('.menu__item').querySelector('.menu__dropdown');

        dropdowns.forEach(function(item) {
            if (item !== dropdown) {
                item.classList.remove('menu__dropdown--active')
            }
        })

        dropdown.classList.toggle('menu__dropdown--active')
    })
})
document.addEventListener('click', function (event) {
    if (!event.target.closest('.menu__item')) {
        dropdowns.forEach(function(item) {
            item.classList.remove('menu__dropdown--active')
        })
    }
})

// BURGER

menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('menu__burger--active')
})

// SLIDER

const slider1 = new Swiper('.intro__swiper', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    pagination: {
        el: '.intro-swiper-pagination',
        clickable: true,
        bulletClass: 'intro-swiper-pagination-bullet',
        type: 'custom',
        renderBullet: function(index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    },
    speed: 1500,
    autoplay: {
        delay: 3500,
    },
    allowTouchMove: false,
});

const slider2 = new Swiper('.projects-swiper', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    slidesPerView: 4,
    spaceBetween: 30,
})

const slider3 = new Swiper('.clients__swiper', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    slidesPerView: 4,
    spaceBetween: 260,
    centeredSlides: true,
    slidesOffsetBefore: -270,
    slideNextClass: 'clients__swiper-slide-next',
    slideActiveClass: 'clients__swiper-slide-active',
    breakpoints: {
        320: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 80
        },
        1440: {
            slidesPerView: 3,
            spaceBetween: 180,
        },
        1920: {
            slidesPerView: 4,
            spaceBetween: 260,
        },
        
      }
})

// MODAL

modalOpenButtons.forEach(function(item) {
    item.addEventListener('click', function () {
        const modal = document.querySelector('#' + this.dataset.modalButton);
        
        modal.classList.add('modal__overlay--active');
        document.body.classList.add('body--active');
    })
}) 

modalCloseButtons.forEach(function(item) {
    item.addEventListener('click', function () {
        const modal = this.closest('.modal__overlay');
        
        modal.classList.remove('modal__overlay--active');
        document.body.classList.remove('body--active');
    })
}) 

allModals.forEach(function (item) {
    item.addEventListener('click', function (event) {
        if (event.target.querySelector('.modal__card')) {
            this.classList.remove('modal__overlay--active');
            document.body.classList.remove('body--active');
        }
    })
})

// ACCORDION


accordionItems.forEach(function (item) {
    item.addEventListener('click', function (event) {
        const accordionContent = this.querySelector('.accordion__content');
        const accordionIcon = this.querySelector('.accordion__icon');

        accordionContent.classList.toggle('accordion__content--active');
        accordionIcon.classList.toggle('accordion__icon--active')
        
        if (accordionContent.classList.contains('accordion__content--active')) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        } else {
            accordionContent.style.maxHeight = null;
        }
    })
})

// ANIM ON SCROLL

if (animScrollItems.length > 0) {
    window.addEventListener('scroll', animOnScroll)
    function animOnScroll () {
        for (let i = 0; i < animScrollItems.length; i++) {
            const animItem = animScrollItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animItemStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animItemStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animItemStart;
            }

            if ((window.pageYOffset > animItemOffset - animItemPoint) && window.pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active')
            } else if (!animItem.classList.contains('anim-scroll-no')) {
                animItem.classList.remove('_active')
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    animOnScroll()
}
