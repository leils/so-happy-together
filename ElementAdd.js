function setup() {
  createCanvas(windowHeight, windowWidth,);
  background(220);
}

 function draw() {
  }

function mouseClicked() {
  noStroke();
  fill (random(255),random(255),random(255));
  ellipse(mouseX,mouseY,50);
}

function mouseDragged() {
  noStroke();
  fill (random(255),random(255),random(255));
  ellipse(mouseX,mouseY,50);
}
