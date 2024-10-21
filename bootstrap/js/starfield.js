let canvas;
let ctx;
let stars = [];
const numStars = 100;
const speed = 2;

function initializeStarfield() {
  canvas = document.createElement('canvas');
  canvas.id = 'starfield';
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
  resizeCanvas();
  createStars();
  animate();
}

function removeStarfield() {
  if (canvas) {
    document.body.removeChild(canvas);
    canvas = null;
    ctx = null;
    stars = [];
  }
}

function resizeCanvas() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

function createStars() {
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
    });
  }
}

function moveStars() {
  for (let i = 0; i < numStars; i++) {
    stars[i].z -= speed;
    if (stars[i].z <= 0) {
      stars[i].z = canvas.width;
    }
  }
}

function drawStars() {
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < numStars; i++) {
      const k = 128.0 / stars[i].z;
      const x = stars[i].x * k + canvas.width / 2;
      const y = stars[i].y * k + canvas.height / 2;
      const size = (1 - stars[i].z / canvas.width) * 5;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
    }
  }
}

function animate() {
  if (canvas) {
    moveStars();
    drawStars();
    requestAnimationFrame(animate);
  }
}

window.addEventListener('resize', resizeCanvas);
