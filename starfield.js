const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 100;
const speed = 2;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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

function animate() {
  moveStars();
  drawStars();
  requestAnimationFrame(animate);
}

function onMouseMove(event) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const deltaX = event.clientX - centerX;
  const deltaY = event.clientY - centerY;
  for (let i = 0; i < numStars; i++) {
    stars[i].x += deltaX * 0.01;
    stars[i].y += deltaY * 0.01;
  }
}

function onTouchMove(event) {
  if (event.touches.length > 0) {
    const touch = event.touches[0];
    onMouseMove(touch);
  }
}

window.addEventListener('resize', resizeCanvas);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('touchmove', onTouchMove);

resizeCanvas();
createStars();
animate();
