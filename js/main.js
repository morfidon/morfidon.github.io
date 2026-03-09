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
    const sectionIds = ['hero', 'achievements', 'experience', 'builder-playbook', 'skills', 'projects', 'testimonials', 'contact-cta'];
    const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    if (!sections.length) {
        return;
    }

    const navLinks = document.querySelectorAll('.site-nav a[href^="index.html#"], .site-nav a[href^="#"]');
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
            const href = link.getAttribute('href') || '';
            const hash = href.includes('#') ? href.slice(href.indexOf('#')) : '';
            link.classList.toggle('is-active', hash === `#${activeId}`);
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
