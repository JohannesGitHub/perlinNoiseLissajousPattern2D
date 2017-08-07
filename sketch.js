var sound, fft;

var radius = 200;
var x = 0.0;
var y = 0.0;
var phi = 1;
var increase = true;


function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(255);

  sound = new p5.AudioIn();
  sound.start();
  fft = new p5.FFT();
  fft.setInput(sound);

}

function draw() {

  background(0);
  translate(width/2, height/2);
  noiseDetail(4,1.5);

  fft.analyze();

  if (phi % (Math.floor (PI*1000)) == 0)
    increase = !(increase);

  if (increase == true)
    phi++;
  else
    phi--;

  var xold = x;

  beginShape();
  for (i = 0; i < 50 + fft.getEnergy(60) - 100; i++) {
    x += fft.getEnergy(60)/10000 - 0.01; // Amount of Random Parallel Lines
    if (x % 5 < 0.01)
      y += 0.1; // Amount of Random Lines
    var roh = map(noise(x, y), 0.0, 1.0, 0, TWO_PI);
    curveVertex(radius*cos(roh * phi/1000), radius*sin(roh));

  }
  endShape();
}
