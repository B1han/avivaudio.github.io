document.addEventListener('DOMContentLoaded', () => {
  const carouselEl = document.getElementById('miCarousel');
  if (!carouselEl || !window.bootstrap) return;

  const carouselInstance = carouselEl._bsCarousel || new bootstrap.Carousel(carouselEl, { ride: false });
  carouselEl._bsCarousel = carouselInstance;

  const videos = carouselEl.querySelectorAll('video');
  videos.forEach(video => {
    video.addEventListener('play', () => {
      if (carouselInstance && typeof carouselInstance.pause === 'function') carouselInstance.pause();
    });
    video.addEventListener('playing', () => {
      if (carouselInstance && typeof carouselInstance.pause === 'function') carouselInstance.pause();
    });
    video.addEventListener('pause', () => {
      if (carouselInstance && typeof carouselInstance.cycle === 'function') carouselInstance.cycle();
    });
    video.addEventListener('ended', () => {
      if (carouselInstance && typeof carouselInstance.cycle === 'function') carouselInstance.cycle();
    });
  });

  carouselEl.addEventListener('slid.bs.carousel', () => {
    carouselEl.querySelectorAll('video').forEach(v => {
      const isActive = v.closest('.carousel-item').classList.contains('active');
      if (isActive) v.play().catch(()=>{}); else { v.pause(); v.currentTime = 0; }
    });
  });
  
  const activeVideo = carouselEl.querySelector('.carousel-item.active video');
  if (activeVideo) activeVideo.play().catch(()=>{});
});