const slides = document.querySelector('.slides');
const total = slides.children.length;
let index = 0;

document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('miCarousel');
    if (el && window.bootstrap && typeof bootstrap.Carousel === 'function') {
        // ensure carousel is initialized (safe even if data-bs-ride is present)
        new bootstrap.Carousel(el);
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