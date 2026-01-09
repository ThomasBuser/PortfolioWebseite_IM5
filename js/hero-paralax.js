     // Parallax: move hero background to the left while scrolling down
            (function () {
                const el = document.querySelector('.hero-side-image');
                if (!el) return;

                let ticking = false;

                function update() {
                    ticking = false;

                    const rect = el.getBoundingClientRect();

                    // Start the effect slightly earlier than "hero hits the top".
                    // Increase this value for an earlier start.
                    const startOffset = window.innerHeight * 0.15; // 15% of viewport height

                    // progress: 0 until the hero's top is within `startOffset` of the viewport top
                    const progress = Math.max(0, startOffset - rect.top);

                    // Tune the multiplier for stronger/weaker effect
                    const shift = progress * 0.25; // px

                    // Set CSS variable for parallax X shift (negative to move left)
                    el.style.setProperty('--hero-parallax-x', `${-shift}px`);
                }

                function onScroll() {
                    if (!ticking) {
                        ticking = true;
                        requestAnimationFrame(update);
                    }
                }

                window.addEventListener('scroll', onScroll, { passive: true });
                window.addEventListener('resize', onScroll);
                // initial
                onScroll();
            })();