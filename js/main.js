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

    const sectionIds = ['hero', 'personal-line', 'metrics', 'achievements', 'experience', 'origin-story', 'builder-playbook', 'skills', 'projects', 'testimonials', 'now', 'contact-cta'];
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

    const observer = new MutationObserver(() => {
        initActiveNav();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 3000);
    initActiveNav();
});
