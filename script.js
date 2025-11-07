const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// cor inicial
ctx.fillStyle = "blue";

// posição e velocidade
let x = 10;
let y = 10;
let dx = 2;
let dy = 2;

// função principal da animação
function desenhar() {
  // limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // desenha o quadrado
  ctx.fillRect(x, y, 100, 100);

  // movimenta o quadrado
  x += dx;
  y += dy;

  // colisão com as bordas horizontais
  if (x + 100 > canvas.width || x < 0) {
    dx = -dx;
    ctx.fillStyle = corAleatoria();
    somClique();
  }

  // colisão com as bordas verticais
  if (y + 100 > canvas.height || y < 0) {
    dy = -dy;
    ctx.fillStyle = corAleatoria();
    somClique();
  }

  // loop de animação
  requestAnimationFrame(desenhar);
}
desenhar();

// evento de clique no canvas
canvas.addEventListener('click', function(event) {
  const cliqueX = event.offsetX;
  const cliqueY = event.offsetY;

  // verifica se o clique foi dentro do quadrado
  if (cliqueX >= x && cliqueX <= x + 100 && cliqueY >= y && cliqueY <= y + 100) {
    ctx.fillStyle = corAleatoria();
    dx = -dx;
    dy = -dy;
    somClique();
  }
});

// gera uma cor RGB aleatória
function corAleatoria() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

// efeito sonoro com Web Audio API
function somClique() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = audioCtx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(440, audioCtx.currentTime); // tom A
  osc.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.1); // 0.1s de duração
}
