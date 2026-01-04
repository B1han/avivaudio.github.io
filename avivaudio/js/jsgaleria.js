document.addEventListener('DOMContentLoaded', () => {
  const galeria = document.getElementById('galeria');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxThumbnails = document.getElementById('lightbox-thumbnails');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxClose = document.getElementById('lightbox-close');

  let images = [];
  let currentIndex = 0;

  // Obtener todas las imágenes
  const galeriaImages = galeria.querySelectorAll('img');
  images = Array.from(galeriaImages).map(img => img.src);

  // Crear thumbnails
  function createThumbnails() {
    lightboxThumbnails.innerHTML = '';
    images.forEach((src, index) => {
      const thumbnail = document.createElement('div');
      thumbnail.className = 'thumbnail';
      if (index === currentIndex) thumbnail.classList.add('active');
      
      const img = document.createElement('img');
      img.src = src;
      thumbnail.appendChild(img);
      
      thumbnail.addEventListener('click', () => showImage(index));
      lightboxThumbnails.appendChild(thumbnail);
    });
  }

  // Mostrar imagen
  function showImage(index) {
    currentIndex = (index + images.length) % images.length;
    lightboxImage.src = images[currentIndex];
    updateThumbnails();
    scrollThumbnailIntoView();
  }

  // Actualizar thumbnail activo
  function updateThumbnails() {
    const thumbnails = lightboxThumbnails.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle('active', index === currentIndex);
    });
  }

  // Scroll automático de thumbnails
  function scrollThumbnailIntoView() {
    const activeThumbnail = lightboxThumbnails.querySelector('.thumbnail.active');
    if (activeThumbnail) {
      activeThumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  // Abrir lightbox
  galeriaImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      lightbox.classList.add('active');
      createThumbnails();
      showImage(currentIndex);
    });
  });

  // Cerrar lightbox
  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  // Navegación
  lightboxPrev.addEventListener('click', () => showImage(currentIndex - 1));
  lightboxNext.addEventListener('click', () => showImage(currentIndex + 1));

  // Navegación con teclado
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    if (e.key === 'Escape') lightbox.classList.remove('active');
  });
});