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
    this.speed = Math.random() * 1 + 0.5;
    this.angle = Math.random() * Math.PI * 2;
    this.angleSpeed = Math.random() * 0.01 - 0.010;
  }

  update() {
    this.y += this.speed;
    this.angle += this.angleSpeed;
    this.x += Math.sin(this.angle);

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
