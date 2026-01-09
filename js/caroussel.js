    // Portfolio Section - with images and indicators
    const portfolioSection = document.querySelector('.portfolio');
    const portfolioCarousel = portfolioSection.querySelector('.carousel');
    const portfolioSlides = portfolioCarousel.querySelectorAll('.carousel-slide');
    const portfolioIndicators = portfolioSection.querySelector('#indicators');
    let currentPortfolioIndex = 0;

    portfolioSlides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('indicator');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => scrollToPortfolioSlide(i));
      portfolioIndicators.appendChild(dot);
    });

    function scrollToPortfolioSlide(index) {
      const slideWidth = portfolioSlides[0].offsetWidth + 20;
      portfolioCarousel.scrollTo({ left: index * slideWidth, behavior: 'smooth' });
      updatePortfolioIndicators(index);
      currentPortfolioIndex = index;
      const images = [
        "url('/assets/projectcover/vst-cover-thomas-buser.webp')",
        "url('/assets/projectcover/trendpuls-cover-thomas-buser.webp')",
        "url('/assets/projectcover/domino-cover-thomas-buser.webp')",
        "url('/assets/projectcover/siamo-cover-thomas-buser.webp')",
        "url('background_mvp.webp')"
      ];
      portfolioSlides.forEach((slide, i) => {
        slide.style.setProperty('--rotate-angle', i === index ? `${i % 2 === 0 ? 5 : -5}deg` : '0deg');
        slide.style.setProperty('--bg-image', images[i]);
        const text = slide.querySelector('.slide-text');
        if (text) text.style.zIndex = "99";
        slide.style.zIndex = "3";
      });
    }

    function updatePortfolioIndicators(index) {
      portfolioIndicators.querySelectorAll('.indicator').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    document.getElementById('prevBtn').addEventListener('click', () => {
      if (currentPortfolioIndex > 0) {
        scrollToPortfolioSlide(--currentPortfolioIndex);
      }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
      if (currentPortfolioIndex < portfolioSlides.length - 1) {
        scrollToPortfolioSlide(++currentPortfolioIndex);
      }
    });

    setInterval(() => {
      currentPortfolioIndex = (currentPortfolioIndex + 1) % portfolioSlides.length;
      scrollToPortfolioSlide(currentPortfolioIndex);
    }, 2000);

    // Testimonials Section - just colors, no buttons or indicators
    const testimonialsSection = document.querySelector('.testemonials');
    const testimonialsCarousel = testimonialsSection.querySelector('.carousel');
    const testimonialSlides = testimonialsCarousel.querySelectorAll('.carousel-slide');
    let currentTestimonialIndex = 0;

    function scrollToTestimonialSlide(index) {
      const slideWidth = testimonialSlides[0].offsetWidth + 20;
      testimonialsCarousel.scrollTo({ left: index * slideWidth, behavior: 'smooth' });
      const colors = ['var(--orange-01)', 'var(--purple-01)', 'var(--yellow-01)', 'var(--orange-01)', 'var(--purple-01)'];
      testimonialSlides.forEach((slide, i) => {
        slide.style.setProperty('--rotate-angle', i === index ? `${i % 2 === 0 ? 10 : -10}deg` : '0deg');
        slide.style.setProperty('--bg-color', colors[i % colors.length]);
      });
      currentTestimonialIndex = index;
    }

    setInterval(() => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialSlides.length;
      scrollToTestimonialSlide(currentTestimonialIndex);
    }, 2000);
