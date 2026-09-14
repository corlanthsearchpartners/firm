document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.marquee-track');
  if (track) {
    // Clone the content to make the infinite scroll seamless
    const content = track.innerHTML;
    track.innerHTML = content + content + content; 
  }
});