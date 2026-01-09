

// Auto-hide navigation when the user stops scrolling for > 1s
// - Reappears immediately when the user scrolls again
// - Smooth hide/show via CSS class toggles

(function () {
  const HIDE_DELAY_MS = 1000;
  const TOP_LOCK_PX = 0;
  const POINTER_TOP_PX = 90; // reveal nav when cursor/finger is near top

  function init() {
    const nav = document.querySelector('header nav');
    if (!nav) return;

    // Ensure our transition applies without disturbing existing styling
    nav.classList.add('nav-autohide');

    let hideTimer = null;
    let pointerAtTop = false;

    const isAtTop = () => window.scrollY <= TOP_LOCK_PX;

    const cancelHide = () => {
      if (hideTimer) window.clearTimeout(hideTimer);
      hideTimer = null;
    };

    const showNav = () => {
      nav.classList.remove('is-hidden');
    };

    const scheduleHide = () => {
      // Never hide while the hero/top section is visible (top of page)
      if (isAtTop()) {
        cancelHide();
        nav.classList.remove('is-hidden');
        return;
      }

      cancelHide();
      hideTimer = window.setTimeout(() => {
        // Re-check before hiding (user might have scrolled back to the top)
        if (!isAtTop()) nav.classList.add('is-hidden');
      }, HIDE_DELAY_MS);
    };

    const onScroll = () => {
      showNav();
      scheduleHide();
    };

    const onPointerMove = (e) => {
      // Reveal nav when the user moves the cursor/finger near the top edge
      const y = (e && typeof e.clientY === 'number') ? e.clientY : null;
      if (y === null) return;

      if (y <= POINTER_TOP_PX) {
        if (!pointerAtTop) {
          pointerAtTop = true;
          showNav();
          cancelHide();
        }
      } else {
        if (pointerAtTop) {
          pointerAtTop = false;
          scheduleHide();
        }
      }
    };

    // Start the hide timer once the page is ready (so it hides even if user doesn't scroll)
    showNav();
    scheduleHide();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('mousemove', onPointerMove, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();