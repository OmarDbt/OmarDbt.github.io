let particulas = [];
const numParticulas = 500; // Número de partículas
const fuerzaMouse = 2; // Fuerza con la que el mouse afecta las partículas
const radioInteraccion = 200; // Radio de interacción con el mouse

function setup(){
    let myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent("#my-p5-sketch")
    // Crear partículas iniciales
  for (let i = 0; i < numParticulas; i++) {
    let xInicial = random(width);
    let yInicial = random(height);
    particulas.push({
      x: xInicial,
      y: yInicial,
      xInicial, // Posición inicial
      yInicial, // Posición inicial
      tamano: random(5, 20), // Tamaño aleatorio
      velocidadX: 0,
      velocidadY: 0,
      color: random() > 0.5 ? color(102, 224, 0, 88) : color(224, 206, 0, 200), // Dos colores
    });
  }
}

function draw(){
    background(0, 0, 0);
  noStroke();

  for (let p of particulas) {
    let distancia = dist(mouseX, mouseY, p.x, p.y);

    // Si el mouse está cerca, las partículas reaccionan
    if (distancia < radioInteraccion) {
      let angulo = atan2(mouseY - p.y, mouseX - p.x);
      p.velocidadX += cos(angulo) * fuerzaMouse;
      p.velocidadY += sin(angulo) * fuerzaMouse;
    } else {
      // Volver suavemente a su posición inicial
      p.velocidadX += (p.xInicial - p.x) * 0.02;
      p.velocidadY += (p.yInicial - p.y) * 0.02;
    }

    // Movimiento de las partículas
    p.x += p.velocidadX;
    p.y += p.velocidadY;

    // Fricción para suavizar el movimiento
    p.velocidadX *= 0.9;
    p.velocidadY *= 0.9;

    // Dibujar partículas
    fill(p.color);
    ellipse(p.x, p.y, p.tamano);
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight); // Ajusta el canvas al cambiar el tamaño de la ventana
  }
}