document.addEventListener("DOMContentLoaded", function () {
    // Navbar section
    const btn_bars = document.querySelector('.btn-bars');
    const menu = document.querySelector('.menu-mobile .menu');
    function toggleMenu() {
        menu.classList.toggle('open');
    }

    btn_bars.addEventListener('click', toggleMenu);

    // Slider section
    const panels = document.querySelectorAll('.panel');

    panels.forEach((panel) => {
        panel.addEventListener('click', () => {
            removeActiveClasses();
            panel.classList.add('active');
        });
    });

    function removeActiveClasses() {
        panels.forEach((panel) => {
            panel.classList.remove('active');
        });
    }
});