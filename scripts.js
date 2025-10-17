const slides = document.querySelector('.slides');
const total = slides.children.length;
let index = 0;

document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('miCarousel');
    // initialize Bootstrap carousel if available
    if (el && window.bootstrap && typeof bootstrap.Carousel === 'function') {
        // store instance on element so we can reuse it
        if (!el._bsCarousel) el._bsCarousel = new bootstrap.Carousel(el);
    }

    // Use the real carousel container used in your HTML
    const slidesContainer = document.querySelector('.carousel-inner');
    if (!slidesContainer) return; // nothing to do on pages without the carousel

    const slides = slidesContainer.children;
    const total = slides.length;
    if (total === 0) return;

    // find current active slide index
    let index = [...slides].findIndex(s => s.classList.contains('active'));
    if (index < 0) index = 0;

    // buttons: prefer specific classes, fall back to Bootstrap control classes
    const nextBtn = document.querySelector('.next') || document.querySelector('.carousel-control-next');
    const prevBtn = document.querySelector('.prev') || document.querySelector('.carousel-control-prev');

    function showSlide(newIndex) {
        newIndex = (newIndex + total) % total;
        // if Bootstrap instance exists, use it
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

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showSlide(index + 1);
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showSlide(index - 1);
        });
    }
});

docuement.querySelector('.next').addEventListener('click', () => {
    index = (index + 1) % total;
    slides.style.transform= `translateX(-${index * 100}%)`;
});

docuement.querySelector('.prev').addEventListener('click', () => {
    index = (index - 1 + total) % total;
    slides.style.transform= `translateX(-${index * 100}%)`;
});