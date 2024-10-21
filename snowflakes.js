class Snowflake {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.size = Math.random() * 5 + 4;

    // Reduced speed for slower fall
    this.speed = Math.random() * 0.5+ 0.05;

    const baseAngle = Math.PI; // Straight down
    const variation = Math.PI / 32; 
    this.angle = baseAngle+ (Math.random() * variation - variation / 2);

    // Small angle speed for less erratic movement
    this.angleSpeed = (Math.random() * 0.005 - 0.0025) * 0.1;
  }

  update() {
    this.y += this.speed;
    this.angle += this.angleSpeed;
    this.x += Math.sin(this.angle); // Adjust x position based on the angle

    if (this.y > this.canvas.height) {
      this.reset();
      this.y = 0;
    }

    if (this.x > this.canvas.width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = this.canvas.width;
    }
  }

  draw() {
    this.ctx.font = `${this.size}px Arial`;
    this.ctx.fillText('❄️', this.x, this.y);
  }
}

function createSnowflakes(canvas, numSnowflakes) {
  const snowflakes = [];
  for (let i = 0; i < numSnowflakes; i++) {
    snowflakes.push(new Snowflake(canvas));
  }
  return snowflakes;
}

function animateSnowflakes(canvas, snowflakes) {
  const ctx = canvas.getContext('2d');

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snowflakes.forEach(snowflake => {
      snowflake.update();
      snowflake.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('snowCanvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const snowflakes = createSnowflakes(canvas, 100);
  animateSnowflakes(canvas, snowflakes);
});

window.addEventListener('resize', () => {
  const canvas = document.getElementById('snowCanvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function toggleSnowflakes() {
  const canvas = document.getElementById('snowCanvas');
  if (canvas.style.display === 'none') {
    canvas.style.display = 'block';
  } else {
    canvas.style.display = 'none';
  }
}

document.getElementById('toggleSnowflakes').addEventListener('click', toggleSnowflakes);
