var capture;
var w = 640,
    h = 480;

var detector;
var classifier = objectdetect.frontalface;

var frameNum = 0;

var faces = [];
var faceCount = 0;

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

  setInterval(countFaces, 3000);
}

function draw() {
  image(capture, 0, 0, w, h);
  text(`faces visible: ${faceCount}`, 10, 20);
}

function countFaces() {
  faces = detector.detect(capture.elt);
  var validFaces = faces.filter(face => face[4] > 4);
  faceCount = validFaces.length;
  print(`${faceCount} faces visible`);
}
