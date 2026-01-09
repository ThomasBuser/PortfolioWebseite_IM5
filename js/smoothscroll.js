document.addEventListener("DOMContentLoaded", () => {
    const scrollElements = document.querySelectorAll(
        ".scroll-reveal, .scroll-reveal-2, .scroll-reveal-3"
    );

    const elementInView = (el, dividend = 1.15) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        let delay = 0;

        if (element.classList.contains("scroll-reveal-2")) delay = 0.2;
        if (element.classList.contains("scroll-reveal-3")) delay = 0.4;

        element.style.opacity = 1;
        // End at natural position
        element.style.transform = "translate3d(0, 0, 0)";
        element.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;
        element.style.willChange = "opacity, transform";
    };

    const hideScrollElement = (element) => {
        let delay = 0;

        if (element.classList.contains("scroll-reveal-3")) delay = 0;
        else if (element.classList.contains("scroll-reveal-2")) delay = 0.2;
        else delay = 0.4; // base scroll-reveal hides last

        element.style.opacity = 0;
        element.style.transform = "translate3d(12px, 18px, 0)";
        element.style.transition = `opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s`;
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener("scroll", () => {
        handleScrollAnimation();
    });

    scrollElements.forEach((el) => hideScrollElement(el));
    handleScrollAnimation();
});