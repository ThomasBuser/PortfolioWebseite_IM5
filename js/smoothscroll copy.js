document.addEventListener("DOMContentLoaded", () => {
    const scrollElements = document.querySelectorAll(".scroll-reveal");

    const elementInView = (el, dividend = 1.15) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.style.opacity = 1;
        element.style.transform = "translate3d(0, 0, 0)";
        element.style.transition =
            "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
        element.style.willChange = "opacity, transform";
    };

    const hideScrollElement = (element) => {
        element.style.opacity = 0;
        element.style.transform = "translate3d(12px, 18px, 0)";
        element.style.transition =
            "opacity 0.4s ease, transform 0.4s ease";
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