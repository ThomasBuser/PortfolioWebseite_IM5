# Thomas Buser Portfolio Website

This project is a personal portfolio website for **Thomas Buser**. The website showcases selected projects, professional information, and provides a contact form. A strong focus lies on modern UI/UX, smooth animations, and interactive elements. JavaScript and CSS are used extensively to handle navigation behavior, animations, scrolling effects, and user interactions across both desktop and mobile devices.

The codebase is structured in a modular way, with individual scripts handling specific responsibilities to improve readability, maintainability, and scalability.

---

## Features & Explanation of Files

### Core Styling & Variables
- **var.css**  
  Contains global CSS variables such as colors, font sizes, spacing, and animation timings. This ensures consistent styling across the entire website and allows quick theme adjustments.

---

### Navigation & Layout
- **nav.js**  
  Handles desktop navigation behavior. Dynamically changes background and font colors depending on scroll position and the current section to ensure readability and contrast.

- **sidenav.js & sidenav.css**  
  Controls the mobile side navigation menu. Includes toggle logic, open/close animations, and responsive styling for smaller screens.

- **nav-autohide.js**  
  Automatically hides the navigation bar when scrolling down and reveals it when scrolling up or when the cursor approaches the top of the viewport. This maximizes visible screen space.

- **scrollspy.js**  
  Detects the currently visible section and highlights the corresponding navigation item in real time, improving orientation and usability.

---

### Scrolling & Motion Effects
- **smoothscroll.js**  
  Enables smooth scrolling behavior for anchor links, creating a more polished navigation experience.

- **hero-paralax.js**  
  Implements a parallax effect for the mountain layers in the hero section, creating depth and a dynamic first impression.

- **paralax.js**  
  Provides general parallax scrolling effects used mainly in the Services section. Effects are optimized to avoid unnecessary performance overhead.

---

### Animations & Interactive Sections
- **heroanimation.css**  
  Defines animated typography in the hero section, including text transitions and entrance animations.

- **ai.js**  
  Controls animations and interactions in the AI section, such as scroll-triggered reveals and dynamic element transitions.

- **caroussel.js & caroussel.css**  
  Implements carousel functionality for portfolio projects and client reviews, including navigation, transitions, and responsive behavior.

- **movingtext.js & movingtext.css**  
  Animates the “What our clients say” text in the review section with continuous movement to add visual interest.

---

### Forms & External Services
- **form-sent.js**  
  Handles contact form submission success states, including visual feedback and form reset behavior.

- **Other integrations**  
  - Google Analytics  
  - Bing Analytics  
  - EU-compliant cookie consent popup  
  - Impressum & Privacy Policy pages  

---

## Key JavaScript Functions & Logic

- Scroll event listeners for navigation state changes and animations  
- Intersection Observer usage for performance-friendly scroll-based animations  
- Dynamic class toggling for animations, visibility, and active states  
- Responsive logic to differentiate between desktop and mobile behavior  
- Language detection based on browser settings with automatic redirection  

---

## Difficulties & Challenges

- **Scroll Performance**  
  Managing multiple scroll-based animations required careful optimization to avoid performance issues, especially on mobile devices. It was difficult that the mountain and the background clouds stay together even when resizing the window.

- **Cross-Browser Compatibility**  
  Ensuring consistent behavior across different browsers and devices, particularly for parallax effects and smooth scrolling. Especially Firefox kept on interpreting the code diffrently than the other brosers.

- **Navigation Complexity**  
  Combining scrollspy, auto-hide navigation, and dynamic color changes introduced edge cases that required extensive testing. The scrollspy kept on slipping up and not recognizing all ids somehow.

- **Responsive Design**  
  Synchronizing animations and interactions across different screen sizes without duplicating logic.

---

## Learnings & Takeaways

- Improved understanding of **modular JavaScript architecture**  
- Better handling of **scroll-based animations** using optimized techniques  
- Practical experience with **UI/UX-focused animations**  
- Importance of **performance considerations** when working with visual effects   
- Effective use of AI tools to accelerate development while maintaining code quality  

---

## Sources & Credits

- Parts of the structure and logic are reused from older personal projects  
- AI tools (ChatGPT) were partially used, especially for JavaScript logic and problem-solving  
- All images and background visuals were created manually using tools such as Photoshop, Pixelmator, Figma, ArtText, and AI-assisted generation  

---

## Notes

- Scripts are loaded individually to maintain clarity and separation of concerns, also if one script breaks not all functionally break since javascrript has the dendency if one thing doesn't none does, so jscripts are loaded indvidually 
- The website is optimized for both desktop and mobile experiences  
- Animations and parallax effects are primarily scroll-based and performance-aware  
- The project serves both as a portfolio and a technical playground for experimenting with modern frontend techniques