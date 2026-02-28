// ========================================
// FOR LENNY, RAY & MARLEY — WEBSITE SCRIPTS
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Mobile Nav Toggle ----
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close nav when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // ---- Scroll Animations (Intersection Observer) ----
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .fact-card, .evidence-card, .message-day'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // ---- Navbar background on scroll ----
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
        } else {
            nav.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // ---- Smooth scroll for all anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = nav ? nav.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- Active nav link highlighting ----
    const sections = document.querySelectorAll('.section, .hero');
    const navAnchors = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = nav ? nav.offsetHeight : 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navAnchors.forEach(a => {
            a.style.color = '';
            if (a.getAttribute('href') === `#${current}`) {
                a.style.color = '#c9a84c';
            }
        });
    });

    // ---- Parallax effect on hero ----
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        if (hero && heroContent) {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
            }
        }
    });

    // ---- Language Toggle (English / Hebrew) ----
    const langToggle = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('lang') || 'en';

    // Store English originals from DOM
    const englishTexts = {};
    document.querySelectorAll('[data-i18n]').forEach(el => {
        englishTexts[el.getAttribute('data-i18n')] = el.innerHTML;
    });

    const englishTitle = document.title;

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);

        if (lang === 'he') {
            document.documentElement.lang = 'he';
            document.body.classList.add('hebrew');
            document.body.dir = 'rtl';
            if (langToggle) langToggle.textContent = 'EN';
            document.title = translations.he['page-title'] || englishTitle;

            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations.he[key]) {
                    el.innerHTML = translations.he[key];
                }
            });
        } else {
            document.documentElement.lang = 'en';
            document.body.classList.remove('hebrew');
            document.body.dir = 'ltr';
            if (langToggle) langToggle.textContent = 'עב';
            document.title = englishTitle;

            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (englishTexts[key]) {
                    el.innerHTML = englishTexts[key];
                }
            });
        }
    }

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            applyLanguage(currentLang === 'en' ? 'he' : 'en');
        });
    }

    // Apply saved language on load
    if (currentLang === 'he') {
        applyLanguage('he');
    } else {
        if (langToggle) langToggle.textContent = 'עב';
    }

});
