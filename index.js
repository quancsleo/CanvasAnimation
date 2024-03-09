// 获取canvas元素
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 设置canvas的宽度和高度
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 创建一个小球对象
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  // 绘制小球
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  // 更新小球位置
  update() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

// 创建多个小球
const balls = [];
for (let i = 0; i < 50; i++) {
  const radius = Math.random() * 30 + 10;
  const x = Math.random() * (canvas.width - radius * 2) + radius;
  const y = Math.random() * (canvas.height - radius * 2) + radius;
  const dx = (Math.random() - 0.5) * 5;
  const dy = (Math.random() - 0.5) * 5;
  const color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
  balls.push(new Ball(x, y, dx, dy, radius, color));
}

// 动画循环
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let ball of balls) {
    ball.update();
  }
}

animate();
