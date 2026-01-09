// Parallax background for the .services section
// Uses a CSS variable (--services-parallax) that drives a transformed ::before pseudo element.

(() => {
  const section = document.querySelector('.services');
  if (!section) return;

  // Respect reduced motion
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches) {
    section.style.setProperty('--services-parallax', '0px');
    return;
  }

  let ticking = false;

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  const update = () => {
    ticking = false;

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;

    // Progress through viewport: 0 when bottom hits top, 1 when top hits bottom
    const progress = (vh - rect.top) / (vh + rect.height);

    // More aggressive parallax (tweak to taste)
    const maxShift = 140;      // bigger travel distance
    const speed = 1.35;        // makes the movement feel faster

    // Ease makes the motion ramp up quicker near the center
    const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const p = easeInOut(clamp(progress, 0, 1));
    const shift = (p - 0.5) * 2 * maxShift * speed;

    section.style.setProperty('--services-parallax', `${shift.toFixed(1)}px`);
  };

  const requestTick = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  // Initial + listeners
  update();
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);
})();

