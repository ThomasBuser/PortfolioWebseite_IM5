(function() {
  const squares = Array.from(document.querySelectorAll('.ai-square'));
  if (!squares.length) return;

  function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

  function getBaseStart() {
    const first = squares[0];
    const rect = first.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const baseOffset = vh * 0.75; // when the first card should become fully active
    return top - baseOffset;
  }

  // Per-segment distances before the next card becomes active
  // Default: slow step between 1st→2nd, faster step between 2nd→3rd
  function buildThresholds() {
    const baseStep = 280; // 1st → 2nd (slower)
    const fastStep = 160; // 2nd → 3rd (faster)
    const steps = Array(Math.max(0, squares.length - 1)).fill(baseStep);
    if (steps.length >= 2) {
      // Make the last transition faster (e.g., 2nd → 3rd)
      steps[steps.length - 1] = fastStep;
    }
    // cumulative thresholds starting at 0
    const thresholds = [0];
    for (let i = 0; i < steps.length; i++) {
      thresholds.push(thresholds[i] + steps[i]);
    }
    return thresholds; // length == squares.length
  }

  let thresholds = [];

  function update() {
    const y = window.scrollY || window.pageYOffset || 0;
    const start = getBaseStart();

    if (!thresholds.length || thresholds.length !== squares.length) {
      thresholds = buildThresholds();
    }

    const yRel = (y - start);
    // Determine which card is currently the active one using thresholds
    let activeIndex = 0;
    for (let i = 0; i < thresholds.length; i++) {
      if (yRel >= thresholds[i]) activeIndex = i;
    }
    activeIndex = clamp(activeIndex, 0, squares.length - 1);

    // Set baseline state for all cards, then emphasize the active one
    squares.forEach((el, idx) => {
      // baseline: visible at 0.5 opacity and no border
      el.style.opacity = '0.5';
      el.classList.remove('is-visible');
      el.querySelectorAll('h1,h2,h3,h4,h5,p,li,span,strong,em,b,small').forEach(node => {
        node.style.opacity = '0.5';
      });
      // icon visibility baseline: show base, hide purple
      const baseIcon = el.querySelector('.ai-icon .icon-base');
      const purpleIcon = el.querySelector('.ai-icon .icon-purple');
      if (baseIcon) baseIcon.classList.remove('hidden');
      if (purpleIcon) purpleIcon.classList.add('hidden');
    });

    const activeEl = squares[activeIndex];
    if (activeEl) {
      activeEl.style.opacity = '1';
      activeEl.classList.add('is-visible');
      activeEl.querySelectorAll('h1,h2,h3,h4,h5,p,li,span,strong,em,b,small').forEach(node => {
        node.style.opacity = '1';
      });
      // icon visibility for active card: hide base, show purple
      const activeBaseIcon = activeEl.querySelector('.ai-icon .icon-base');
      const activePurpleIcon = activeEl.querySelector('.ai-icon .icon-purple');
      if (activeBaseIcon) activeBaseIcon.classList.add('hidden');
      if (activePurpleIcon) activePurpleIcon.classList.remove('hidden');
    }
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { update(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener('resize', update);
  document.addEventListener('DOMContentLoaded', update);
  setTimeout(update, 300);
})();
(function() {
  const squares = Array.from(document.querySelectorAll('.ai-square'));
  if (!squares.length) return;

  function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

  function isMobile() {
    // Treat widths up to 768px as mobile; adjust if your CSS breakpoint differs
    return window.matchMedia('(max-width: 768px)').matches;
  }

  function getBaseStart() {
    const first = squares[0];
    const rect = first.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const baseOffset = vh * 0.75; // when the first card should become fully active (desktop logic)
    return top - baseOffset;
  }

  // Per-segment distances before the next card becomes active (desktop logic)
  function buildThresholds() {
    const baseStep = 280; // 1st → 2nd (slower)
    const fastStep = 160; // 2nd → 3rd (faster)
    const steps = Array(Math.max(0, squares.length - 1)).fill(baseStep);
    if (steps.length >= 2) {
      steps[steps.length - 1] = fastStep; // Make the last transition faster
    }
    const thresholds = [0];
    for (let i = 0; i < steps.length; i++) {
      thresholds.push(thresholds[i] + steps[i]);
    }
    return thresholds; // length == squares.length
  }

  let thresholds = [];

  // --- NEW: choose active card on mobile by which card's center is closest to viewport center ---
  function getActiveIndexMobile() {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const viewportCenter = vh / 2;

    let bestIdx = 0;
    let bestDist = Infinity;

    for (let i = 0; i < squares.length; i++) {
      const rect = squares[i].getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2; // relative to viewport top
      const dist = Math.abs(cardCenter - viewportCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    }
    return bestIdx;
  }

  // Keep the original scroll-threshold based activation for desktop
  function getActiveIndexDesktop() {
    const y = window.scrollY || window.pageYOffset || 0;
    const start = getBaseStart();

    if (!thresholds.length || thresholds.length !== squares.length) {
      thresholds = buildThresholds();
    }

    const yRel = (y - start);
    let activeIndex = 0;
    for (let i = 0; i < thresholds.length; i++) {
      if (yRel >= thresholds[i]) activeIndex = i;
    }
    return clamp(activeIndex, 0, squares.length - 1);
  }

  function applyActiveState(activeIndex) {
    // baseline reset
    squares.forEach((el) => {
      el.style.opacity = '0.5';
      el.classList.remove('is-visible');
      el.querySelectorAll('h1,h2,h3,h4,h5,p,li,span,strong,em,b,small').forEach(node => {
        node.style.opacity = '0.5';
      });
      const baseIcon = el.querySelector('.ai-icon .icon-base');
      const purpleIcon = el.querySelector('.ai-icon .icon-purple');
      if (baseIcon) baseIcon.classList.remove('hidden');
      if (purpleIcon) purpleIcon.classList.add('hidden');
    });

    const activeEl = squares[activeIndex];
    if (activeEl) {
      activeEl.style.opacity = '1';
      activeEl.classList.add('is-visible');
      activeEl.querySelectorAll('h1,h2,h3,h4,h5,p,li,span,strong,em,b,small').forEach(node => {
        node.style.opacity = '1';
      });
      const activeBaseIcon = activeEl.querySelector('.ai-icon .icon-base');
      const activePurpleIcon = activeEl.querySelector('.ai-icon .icon-purple');
      if (activeBaseIcon) activeBaseIcon.classList.add('hidden');
      if (activePurpleIcon) activePurpleIcon.classList.remove('hidden');
    }
  }

  function update() {
    const activeIndex = isMobile() ? getActiveIndexMobile() : getActiveIndexDesktop();
    applyActiveState(activeIndex);
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => { update(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

  // Recompute on resize and orientation changes
  window.addEventListener('resize', () => { thresholds = []; update(); });
  window.addEventListener('orientationchange', () => { thresholds = []; update(); });

  document.addEventListener('DOMContentLoaded', update);
  setTimeout(update, 300);
})();