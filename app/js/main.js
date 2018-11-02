window.onload = () => {

    $('#navIcon').on('click', e => {
        e.preventDefault();
        $('.nav-header').toggleClass('nav-responsive');
    });

    let images = document.querySelectorAll('img');

    images.forEach(img => {
        img.onmousedown = (e) => e.preventDefault();
    });

    $('#to-top').on('click', (e) => {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });

    $('#toBottom').on('click', (e) => {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $('#featuresSection').offset().top
        }, 200);
    });


    $('.widgets-slider__container').flipster({
        loop: 1,
        style: 'carousel',
        spacing: -0.4,
        buttons: true
    });
}

window.onscroll = () => {
    scrollFunction();

    function scrollFunction() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            document.getElementById("to-top").style.display = "block";
        } else {
            document.getElementById("to-top").style.display = "none";
        }
    }
}