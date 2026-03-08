document.addEventListener('DOMContentLoaded', () => {
    fetch('components/nav.html')
        .then((response) => response.text())
        .then((data) => {
            const navPlaceholder = document.getElementById('nav-placeholder');
            if (navPlaceholder) {
                navPlaceholder.innerHTML = data;
            }
        });

    fetch('components/footer.html')
        .then((response) => response.text())
        .then((data) => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            }
        });
});
