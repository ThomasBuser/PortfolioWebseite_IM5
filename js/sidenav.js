const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');
const body = document.body;
const closeButton = document.getElementById('menu-close');

const isMobile = () => window.matchMedia('(max-width: 800px)').matches;

menuToggle.addEventListener('click', () => {
    if (!isMobile()) return;

    sideMenu.classList.toggle('open');
    body.classList.toggle('shifted');
    body.classList.toggle('menu-open');
});

closeButton.addEventListener('click', () => {
    if (!isMobile()) return;

    sideMenu.classList.remove('open');
    body.classList.remove('shifted');
    body.classList.remove('menu-open');
});

window.addEventListener('resize', () => {
    if (isMobile()) return;

    sideMenu.classList.remove('open');
    body.classList.remove('shifted');
    body.classList.remove('menu-open');
});

// Highlight active menu item based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('main section[id]');
    const menuItems = document.querySelectorAll('#side-menu ul li a');

    let currentSectionId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });

    menuItems.forEach(item => {
        const isContactLink = item.getAttribute('href') === '#contact';

        // Always keep Contact link black
        if (isContactLink) {
            item.style.color = '#111';
        } else {
            item.style.color = ''; // Reset color
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.style.color = 'white';
            }
        }
    });
});

const menuLinks = document.querySelectorAll('#side-menu ul li a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (!isMobile()) return;

        sideMenu.classList.remove('open');
        body.classList.remove('shifted');
        body.classList.remove('menu-open');
    });
});