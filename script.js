document.addEventListener('DOMContentLoaded', () => {

    // 1. Dynamic Typing Effect
    const words = ["Cloud Engineer.", "DevOps Enthusiast.", "Solutions Architect.", "Problem Solver."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingTarget = document.getElementById('typing-text');

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingTarget.textContent = currentWord.substring(0, charIndex);

        let typeSpeed = 100;
        if (isDeleting) { typeSpeed /= 2; }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }
    // Initialize typing
    if (typingTarget) type();


    // 2. Sticky Navbar & Active Navigation Highlight
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky bg change
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Dynamic active state on links
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    });


    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const checkReveal = () => {
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Run once on load


    // 4. Mobile Nav Toggle
    const navToggle = document.getElementById('nav-toggle');
    const primaryNav = document.getElementById('primary-nav');

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const isOpen = primaryNav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close the menu whenever a link is tapped
        primaryNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                primaryNav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
});
