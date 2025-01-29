document.addEventListener("DOMContentLoaded", function() {
    // Slider section
    const list = document.querySelector('.slider .list');
    const item_slider = document.querySelectorAll('.slider .list .item-slider');
    const dots = document.querySelectorAll('.slider .dots li');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    let active = 0;
    let lengthItem_slider = item_slider.length - 1;
    let refreshSlider = setInterval(() => { next.click() }, 5000);

    function reloadSlider() {
        // Định vị slide đang hoạt động
        let checkLeft = item_slider[active].offsetLeft;
        list.style.left = -checkLeft + 'px';

        // Cập nhật trạng thái của dots
        document.querySelector('.slider .dots li.active').classList.remove('active');
        dots[active].classList.add('active');

        // Đặt lại interval sau khi có tương tác
        clearInterval(refreshSlider);
        refreshSlider = setInterval(() => { next.click() }, 5000);
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

    // Carousel section
    document.querySelectorAll(".carousel-container").forEach(carouselContainer => {
        const carousel = carouselContainer.querySelector(".carousel"),
            firstImg = carousel.querySelectorAll("img")[0];
        const arrowIcons = carouselContainer.querySelectorAll("i");

        let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft;

        const getNearestImageIndex = () => {
            let firstImgWidth = firstImg.clientWidth + 14;
            return Math.round(carousel.scrollLeft / firstImgWidth);
        };

        const scrollToNearestImage = () => {
            let firstImgWidth = firstImg.clientWidth + 14;
            let nearestIndex = getNearestImageIndex();
            carousel.scrollTo({
                left: nearestIndex * firstImgWidth,
                behavior: "smooth"
            });
        };

        const showHideIcon = () => {
            let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
            arrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";
            arrowIcons[1].style.display = carousel.scrollLeft === scrollWidth ? "none" : "block";
        };

        arrowIcons.forEach(icon => {
            icon.addEventListener("click", () => {
                let firstImgWidth = firstImg.clientWidth + 14;

                if (icon.classList.contains("Left")) {
                    carousel.scrollLeft -= firstImgWidth;
                } else {
                    carousel.scrollLeft += firstImgWidth;
                }

                setTimeout(() => {
                    scrollToNearestImage();
                    showHideIcon();
                }, 60);
            });
        });

        const dragStart = e => {
            isDragStart = true;
            prevPageX = e.pageX || e.touches[0].pageX;
            prevScrollLeft = carousel.scrollLeft;
        };

        const dragging = e => {
            if (!isDragStart) return;
            e.preventDefault();
            isDragging = true;
            carousel.classList.add("dragging");
            let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
            carousel.scrollLeft = prevScrollLeft - positionDiff;
            showHideIcon();
        };

        const dragStop = () => {
            isDragStart = false;
            carousel.classList.remove("dragging");

            if (!isDragging) return;
            isDragging = false;

            scrollToNearestImage();
        };

        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("touchstart", dragStart);

        carousel.addEventListener("mousemove", dragging);
        carousel.addEventListener("touchmove", dragging);

        carousel.addEventListener("mouseup", dragStop);
        carousel.addEventListener("mouseleave", dragStop);
        carousel.addEventListener("touchend", dragStop);

        showHideIcon();
    });
});
