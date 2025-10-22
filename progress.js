// Create and append the progress bar element
const progressBar = document.createElement('div');
progressBar.id = 'progress-bar';
document.body.appendChild(progressBar);

// Simulate loading progress
let width = 0;
const loadingInterval = setInterval(() => {
  if (width >= 90) {
    clearInterval(loadingInterval);
  } else {
    width += Math.random() * 10; // Randomly increase
    progressBar.style.width = width + '%';
  }
}, 200);

// When page fully loads
window.addEventListener('load', () => {
  progressBar.style.width = '100%';
  setTimeout(() => {
    progressBar.style.opacity = '0';
    setTimeout(() => progressBar.remove(), 400);
  }, 500);
});

// Animate progress on link clicks
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', e => {
    if (link.target !== "_blank" && link.href !== window.location.href) {
      progressBar.style.width = '0';
      progressBar.style.opacity = '1';
      setTimeout(() => {
        progressBar.style.width = '70%';
      }, 100);
    }
  });
});