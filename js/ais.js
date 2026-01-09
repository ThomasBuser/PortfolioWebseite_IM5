window.addEventListener('scroll', function () {
    const aiSquare = document.querySelector('.ai-square');
    if (!aiSquare) return;

    const rect = aiSquare.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementCenter = rect.top + rect.height / 2;
    const centerDistance = Math.abs(windowHeight / 2 - elementCenter);
    const maxDistance = windowHeight / 1.7 + rect.height / 1;

    let fadeFactor = 1 - Math.min((centerDistance / maxDistance) * 1.2, 1);
    fadeFactor = Math.max(fadeFactor, 0.2); // Prevent full fade to black

    const blue = Math.round(fadeFactor * 100);
    aiSquare.style.background = `linear-gradient(to bottom, rgb(0, 0, 0) ${100 - fadeFactor * 100}%, rgb(0, 0, ${blue}))`;
});
