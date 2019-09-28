var capture;
var w = 640,
    h = 480;

var detector;
var classifier = objectdetect.frontalface;

var frameNum = 0;

var faces = [];
var faceCount = 0;

function setupDetector() {
    var scaleFactor = 1.2;
    detector = new objectdetect.detector(w, h, scaleFactor, classifier);

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
}

function setup() {
  setupDetector();

  setInterval(countFaces, 3000);
}

function draw() {
  frameNum++;

  print(faceCount);
}

function countFaces() {
  // Get the latest frame of the video as an image
  var video = capture.elt;
  var canvas = document.createElement('canvas');
  canvas.height = video.videoHeight;
  canvas.width = video.videoWidth;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  var img = new Image();
  img.src = canvas.toDataURL();

  // Detect the number of faces in that frame
  faces = detector.detect(img);
  var validFaces = faces.filter(face => face[4] > 4);
  facesCount = validFaces.length;
}
