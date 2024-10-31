document.addEventListener("DOMContentLoaded", function() {
    const list = document.querySelector('.slider .list');
    const item_slider = document.querySelectorAll('.slider .list .item-slider');
    const dots = document.querySelectorAll('.slider .dots li');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    let active = 0;
    let lengthItem_slider = item_slider.length - 1;
    let refreshSlider = setInterval(() => {next.click()}, 5000);  // Auto-slide every 5 seconds

    function reloadSlider() {
        // Positioning for the active slide
        let checkLeft = item_slider[active].offsetLeft;
        list.style.left = -checkLeft + 'px';

        // Update dots to reflect active slide
        document.querySelector('.slider .dots li.active').classList.remove('active');
        dots[active].classList.add('active');

        // Reset interval after interaction
        clearInterval(refreshSlider);
        refreshSlider = setInterval(() => {next.click()}, 5000);
    }

    next.onclick = function() {
        active = (active + 1 > lengthItem_slider) ? 0 : active + 1;
        reloadSlider();
    };

    prev.onclick = function() {
        active = (active - 1 < 0) ? lengthItem_slider : active - 1;
        reloadSlider();
    };

    dots.forEach((li, index) => {
        li.addEventListener('click', function() {
            active = index;
            reloadSlider();
        });
    });
});
