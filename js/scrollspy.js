// Desktop navbar scrollspy
// Highlights the current section link in the desktop nav (and side menu, if present).

(function () {
  function cssEscapeId(id) {
    // Minimal escape for querySelector (covers common IDs)
    return id.replace(/([ #;?%&,.+*~\':!^$\[\]()=>|\/])/g, "\\$1");
  }

  function initScrollSpy() {
    // Desktop nav links
    const desktopNav = document.querySelector('header nav .nav-center');
    const desktopLinks = desktopNav
      ? Array.from(desktopNav.querySelectorAll('a[href^="#"]'))
      : [];

    // Optional: side menu links (keeps behavior consistent)
    const sideMenu = document.querySelector('#side-menu');
    const sideLinks = sideMenu
      ? Array.from(sideMenu.querySelectorAll('a[href^="#"]'))
      : [];

    const allLinks = [...desktopLinks, ...sideLinks];
    if (allLinks.length === 0) return;

    // Map section id -> links pointing to it
    const linkMap = new Map();
    for (const a of allLinks) {
      const hash = a.getAttribute('href');
      if (!hash || hash.length < 2) continue;
      const id = hash.slice(1);
      if (!linkMap.has(id)) linkMap.set(id, []);
      linkMap.get(id).push(a);
    }

    // Resolve sections
    const sections = Array.from(linkMap.keys())
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    let activeId = null;

    function setActive(id) {
      if (!id || id === activeId) return;

      // Clear ONLY previously active links (so we never overwrite inactive styles)
      if (activeId) {
        const prevLinks = linkMap.get(activeId) || [];
        for (const a of prevLinks) {
          a.classList.remove('active');
          a.removeAttribute('aria-current');
          a.style.removeProperty('background');
          a.style.removeProperty('color');
          a.style.removeProperty('text-decoration');
          a.style.removeProperty('text-underline-offset');
          a.style.removeProperty('text-decoration-thickness');
        }
      }

      activeId = id;

      // Set active styles
      const links = linkMap.get(id) || [];
      for (const a of links) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
        a.style.setProperty('background', 'none', 'important');
        a.style.setProperty('color', 'var(--red-02)', 'important');
        a.style.setProperty('text-decoration', 'underline', 'important');
        a.style.setProperty('text-underline-offset', '0.3em', 'important');
        a.style.setProperty('text-decoration-thickness', '2px', 'important');
      }
    }

    function getCurrentSectionId() {
      // Prefer the section whose top has passed a "trigger line" near the top
      const trigger = window.innerHeight * 0.25;
      let current = sections[0];
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= trigger) current = s;
      }
      return current && current.id;
    }

    let rafPending = false;
    function updateActiveFromLayout() {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        const id = getCurrentSectionId();
        if (id) setActive(id);
      });
    }

    // IntersectionObserver: pick the most visible section near the top
    const observer = new IntersectionObserver(
      (entries) => {
        // On resize/layout shifts, IO ratios can jump; derive active section from layout instead.
        if (entries.some((e) => e.isIntersecting)) {
          updateActiveFromLayout();
        }
      },
      {
        // Activate when section crosses the top area of the viewport
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: [0.05, 0.1, 0.2, 0.35, 0.5, 0.75],
      }
    );

    sections.forEach((s) => observer.observe(s));

    // Also update on click (instant feedback)
    for (const a of allLinks) {
      a.addEventListener('click', () => {
        const hash = a.getAttribute('href');
        if (!hash || hash.length < 2) return;
        const id = hash.slice(1);
        setActive(id);
      });
    }

    const initialHash = window.location.hash && window.location.hash.slice(1);
    if (initialHash && document.getElementById(initialHash)) {
      setActive(initialHash);
    } else {
      updateActiveFromLayout();
    }

    // Keep active state stable during layout changes (e.g. resizing)
    window.addEventListener('resize', updateActiveFromLayout, { passive: true });
    window.addEventListener('orientationchange', updateActiveFromLayout, {
      passive: true,
    });

    // Safety: also update on scroll (IO can miss fast/layout-driven shifts)
    window.addEventListener('scroll', updateActiveFromLayout, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollSpy);
  } else {
    initScrollSpy();
  }
})();