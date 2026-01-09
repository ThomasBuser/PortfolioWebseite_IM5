const nav = document.querySelector('nav');
const logo = document.getElementById('nav-logo');
const prefix = window.location.pathname.includes('/es/') || window.location.pathname.includes('/de/') ? '../' : '';
const defaultLogo = prefix + 'assets/img/thomas-buser-logo.webp';
const darkLogo = prefix + 'assets/img/thomas-buser-logo.webp';

function setMenuColor(color) {
    const menu = document.querySelector('.menu');
    if (!menu) return;

    // For text/icon fonts
    menu.style.color = color || '';

    // For hamburger bars that are spans/divs with background colors
    menu.querySelectorAll('span, .bar, .line').forEach(el => {
        el.style.backgroundColor = color || '';
    });

    // For SVG icons inside the menu (if any)
    menu.querySelectorAll('svg, svg *').forEach(el => {
        el.style.fill = color || '';
        el.style.stroke = color || '';
    });
}

function handleNavScroll() {
    //astarlab check if at very top of page
    if (window.scrollY <= 2) { // treat near-top as top
        nav.style.backgroundColor = 'transparent'; //astarlab
        logo.src = defaultLogo; //astarlab
        setMenuColor('#000');
        document.querySelectorAll('.center-horizontal-vertical li a:not(.active)').forEach(link => {
            link.style.setProperty('color', '#000', 'important');
        });
        document.getElementById('language-select').style.color = '#000'; //astarlab
        const langArrow = document.querySelector('.language-select-wrapper .material-symbols-outlined');
        if (langArrow) langArrow.style.color = '#000';
        return; //astarlab stop further scroll logic
    } //astarlab

    const sections = document.querySelectorAll('.bg-grey-01, .bg-white');
    let inGreySection = false;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Check if top of section is at or above the top of the viewport
        if (rect.top <= 0 && rect.bottom > 0) {
            inGreySection = true;
        }
    });

    if (inGreySection) {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        logo.src = darkLogo;
        document.getElementById('language-select').style.color = 'var(--brown-01)';
        const langArrow = document.querySelector('.language-select-wrapper .material-symbols-outlined');
        if (langArrow) langArrow.style.color = 'var(--brown-01)';
        setMenuColor('var(--brown-01)');
        document.querySelectorAll('.center-horizontal-vertical li a:not(.active)').forEach(link => {
            link.style.setProperty('color', '#000', 'important');
        });
    } else {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        logo.src = defaultLogo;
        setMenuColor('');
        document.getElementById('language-select').style.color = '#efefef';
        const langArrow = document.querySelector('.language-select-wrapper .material-symbols-outlined');
        if (langArrow) langArrow.style.color = '#efefef';
        document.querySelector('.center-horizontal-vertical').style.color = '#efefef';
        document.querySelectorAll('.center-horizontal-vertical li a:not(.active)').forEach(link => {
            link.style.setProperty('color', '#efefef', 'important');
        });
    }
}

window.addEventListener('scroll', handleNavScroll);
window.addEventListener('DOMContentLoaded', handleNavScroll);
handleNavScroll();

// Remove hash from URL after clicking internal anchor links
function removeHashFromUrl() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', () => {
            // Delay to allow default scroll behavior
            setTimeout(() => {
                if (history.replaceState) {
                    history.replaceState(null, document.title, window.location.pathname + window.location.search);
                }
            }, 10);
        });
    });
}

window.addEventListener('DOMContentLoaded', removeHashFromUrl);




