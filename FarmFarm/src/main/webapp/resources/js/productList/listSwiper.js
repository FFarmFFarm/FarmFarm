const swiper = new Swiper('.swiper', {
    // Optional parameters
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 5000,
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
    },
    loop: true
});