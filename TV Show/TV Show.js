document.addEventListener("DOMContentLoaded", function () {
    // Slider section
    let nextBtn = document.querySelector('.next');
    let prevBtn = document.querySelector('.prev');
    let slider = document.querySelector('.slider');
    let SliderList = slider.querySelector('.list');
    let thumbnail = document.querySelector('.thumbnail');
    let thumbnailItems = thumbnail.querySelectorAll('.item');

    thumbnail.appendChild(thumbnailItems[0]);

    nextBtn.onclick = function () {
        moveSlider('next');
    };

    prevBtn.onclick = function () {
        moveSlider('prev');
    };

    function moveSlider(direction) {
        let SliderItems = SliderList.querySelectorAll('.item');
        let thumbnailItems = document.querySelectorAll('.thumbnail .item');
        
        if (direction === 'next') {
            SliderList.appendChild(SliderItems[0]);
            thumbnail.appendChild(thumbnailItems[0]);
            slider.classList.add('next');
        } 
        else {
            SliderList.prepend(SliderItems[SliderItems.length - 1]);
            thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
            slider.classList.add('prev');
        }

        slider.addEventListener('animationend', function () {
            slider.classList.remove('next', 'prev');
        }, { once: true });
    }

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
