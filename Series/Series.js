document.addEventListener("DOMContentLoaded", function () {
    // Navbar section
    const btn_bars = document.querySelector('.btn-bars');
    const menu = document.querySelector('.menu-mobile .menu');
    function toggleMenu() {
        menu.classList.toggle('open');
    }

    btn_bars.addEventListener('click', toggleMenu);
});