var capture;
var w = 640,
    h = 480;

var elements = [];
var detector;
var classifier = objectdetect.frontalface;

var frameNum = 0;

var faces = [];
var faceCount = 0;

class CircleStruct {
  constructor(x, y) {
    //     position
    this.radius = 50;
    this.x = x || random(this.radius, width - this.radius);
    this.y = y || random(this.radius, height - this.radius);
    this.xInc = 1;
    this.yInc = 1;

  }

  // check if hitting the walls
  bounceCheck() {
    if (this.x > width - this.radius || this.x < this.radius) {
      this.xInc *= -1;
    }

    if (this.y > height - this.radius || this.y < this.radius) {
      this.yInc *= -1;
    }
  }

  //movement
  step() {
    this.x += this.xInc;
    this.y += this.yInc;

    this.bounceCheck();
  }

  draw() {
    stroke(255, 0, 0);
    ellipse(this.x, this.y, this.radius, this.radius);
    print(this.x, this.y);
    this.step();
  }
}

function setupDetector() {
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    createCanvas(w, h);
    capture.size(w, h);
    capture.hide();

    colorMode(HSB);

    var scaleFactor = 1.2;
    detector = new objectdetect.detector(w, h, scaleFactor, classifier);
}

function setup() {
  setupDetector();
  frameRate(24);

  var newCircle = new CircleStruct;
  elements.push(newCircle);

  setInterval(countFaces, 3000);
}

function draw() {
  // image(capture, 0, 0, w, h);
  text(`faces visible: ${faceCount}`, 10, 20);


  background(51);

  elements.forEach(circ => {
     circ.draw();
  });
}

function countFaces() {
  faces = detector.detect(capture.elt);
  var validFaces = faces.filter(face => face[4] > 4);
  faceCount = validFaces.length;
  print(`${faceCount} faces visible`);
}
