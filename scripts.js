document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('miCarousel');
    // initialize Bootstrap carousel if available
    if (el && window.bootstrap && typeof bootstrap.Carousel === 'function') {
        if (!el._bsCarousel) el._bsCarousel = new bootstrap.Carousel(el);
    }

    const slidesContainer = document.querySelector('.carousel-inner');
    if (!slidesContainer) return; // no carousel on this page

    const slides = slidesContainer.children;
    const total = slides.length;
    if (total === 0) return;

    // current active index
    let index = [...slides].findIndex(s => s.classList.contains('active'));
    if (index < 0) index = 0;

    const nextBtn = document.querySelector('.carousel-control-next');
    const prevBtn = document.querySelector('.carousel-control-prev');

    function showSlide(newIndex) {
        newIndex = (newIndex + total) % total;
        if (el && el._bsCarousel) {
            if (newIndex > index) el._bsCarousel.next();
            else if (newIndex < index) el._bsCarousel.prev();
            index = newIndex;
            return;
        }
        // fallback: toggle active class
        [...slides].forEach((s, i) => s.classList.toggle('active', i === newIndex));
        index = newIndex;
    }

    if (nextBtn) nextBtn.addEventListener('click', e => { e.preventDefault(); showSlide(index + 1); });
    if (prevBtn) prevBtn.addEventListener('click', e => { e.preventDefault(); showSlide(index - 1); });
});
