let x = 0.01;
let y = 0;
let z = 0;

const a = 10;
const b = 28;
const c = 8.0 / 3.0;

const points = [];

function update() {
  const dt = 0.01;
  const dx = a * (y - x) * dt;
  const dy = (x * (b - z) - y) * dt;
  const dz = (x * y - c * z) * dt;
  x = x + dx;
  y = y + dy;
  z = z + dz;

  points.push({ x, y, z });
}

function render() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  context.clearRect(0, 0, canvas.width, canvas.height);

  context.save();
  context.translate(canvas.width / 2, canvas.height / 2);
  context.scale(5, 5);
  context.strokeStyle = 'white';
  context.beginPath();

  let hu = 0;

  for (let i = 1; i < points.length; i++) {
    const p1 = points[i - 1];
    const p2 = points[i];
    context.strokeStyle = `hsl(${hu}, 100%, 50%)`;
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    hu = (hu + 1) % 256;
  }

  context.stroke();
  context.restore();
}

function animate() {
  update();
  render();
  requestAnimationFrame(animate);
}

const canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

animate();
