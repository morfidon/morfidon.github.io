function initCourseCards() {
    document.querySelectorAll('.course-card').forEach((card) => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('course-link')) {
                const link = card.querySelector('.course-link');
                if (link) {
                    link.click();
                }
            }
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const link = card.querySelector('.course-link');
                if (link) {
                    e.preventDefault();
                    link.click();
                }
            }
        });
    });
}

function initScrollReveal() {
    const revealItems = document.querySelectorAll('.reveal-on-scroll');
    if (!revealItems.length) {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    revealItems.forEach((item) => observer.observe(item));
}

function animateMetricValue(element) {
    const target = Number(element.dataset.count || '0');
    const suffix = element.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const current = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
        element.textContent = `${current.toLocaleString()}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };

    requestAnimationFrame(step);
}

function initMetricCounters() {
    const counters = document.querySelectorAll('.metric-value[data-count]');
    if (!counters.length) {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateMetricValue(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.55 });

    counters.forEach((counter) => observer.observe(counter));
}

function initActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    const pageLinks = document.querySelectorAll('.site-nav a[data-page]');
    pageLinks.forEach((link) => {
        const page = link.getAttribute('data-page');
        link.classList.toggle('is-active', page === currentPath || (currentPath === '' && page === 'index.html'));
    });

    if (!(currentPath === 'index.html' || currentPath === '')) {
        return;
    }

    const sectionIds = ['hero', 'personal-line', 'metrics', 'projects', 'achievements', 'builder-playbook', 'experience', 'origin-story', 'skills', 'testimonials', 'now', 'contact-cta'];
    const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    if (!sections.length) {
        return;
    }

    const navLinks = document.querySelectorAll('.section-links a[href^="#"]');
    if (!navLinks.length) {
        return;
    }

    const updateActiveLink = () => {
        let activeId = sections[0].id;
        const scrollPosition = window.scrollY + 180;

        sections.forEach((section) => {
            if (section.offsetTop <= scrollPosition) {
                activeId = section.id;
            }
        });

        navLinks.forEach((link) => {
            const section = link.getAttribute('href').replace('#', '');
            link.classList.toggle('is-active', section === activeId);
        });
    };

    updateActiveLink();
    window.addEventListener('scroll', updateActiveLink, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
    initCourseCards();
    initScrollReveal();
    initMetricCounters();

    const observer = new MutationObserver(() => {
        initActiveNav();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 3000);
    initActiveNav();
});
