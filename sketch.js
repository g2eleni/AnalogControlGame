var serial; 
var inData; 
var xpos = 0;
var xpos2 = 0;
var A = 2;
var ypos = 400;
var B = 2;
 

function setup() {

  serial = new p5.SerialPort();
  serial.on('list', printList); 
  serial.on('connected', serverConnected); 
  serial.on('open', portOpen); 
  serial.on('data', serialEvent); 
  serial.on('error', serialError); 
  serial.on('close', portClose); 
  serial.open('/dev/cu.usbmodem1411'); 
  
  createCanvas(1000, 500);
}

function draw() {


  background(22, 124, 168);
  ellipseMode(CENTER);
    
  xpos = xpos + A;
    
  if(xpos > width)
  {
    A = -A;
  }
    
  if(xpos <= 0)
  {
    A = -A;
  }
  
  //body
    
  fill(20, 152, 194);
  noStroke(0);
  rect(0, 0, 200, 500)
    
  
  fill(21, 110, 148);
  noStroke(0);
  rect(400, 0, 200, 500)
  
  fill(21, 88, 117);
  noStroke(0);
  rect(600, 0, 200, 500)
  
  fill(20, 72, 94);
  noStroke(0);
  rect(800, 0, 200, 500)
  
//body
    
    
  fill(215);
  stroke(0);
  ellipse(xpos, 80, 55, 40);	
    
  fill(255);
  stroke(0);
  ellipse(xpos, 85, 30, 40);
 
  fill(0);
  stroke(0);
  ellipse(xpos, 75, 10, 10);
    
  fill(154, 179, 116);
  stroke(0);
  ellipse(xpos, 100, 100, 40);  
    
  fill(15);
  noStroke();
  ellipse(xpos, 100, 60, 10);	
    
  fill(0);
  stroke(0);
  line((xpos - 50), 50, (xpos - 35), 85);
    
  fill(0);
  stroke(0);
  line((xpos + 50), 50, (xpos + 35), 85);
  
  //lasers heads
   
  if (mouseIsPressed)
      fill(255, 0, 0);
    else
      fill(205, 224, 76);
  stroke(0);
  ellipse((xpos-50), 50, 10, 10); 
  
  if (mouseIsPressed)
      fill(255, 0, 0);
    else
      fill(205, 224, 76);
  stroke(0);
  ellipse((xpos+50), 50, 10, 10); 
  
  //laser beams
    
  fill(255);
  stroke(255, 0, 0);
  line((xpos-50), 50, mouseX, mouseY);
    
  fill(255);
  stroke(255, 0, 0);
  line((xpos+50), 50, mouseY, mouseX);
 
  fill(18, 115, 15);
  noStroke();
  rect(0,400,1000,200);
  
  
  
    
  if (mouseIsPressed){
  ypos = ypos - B;
  }
  
 
   xpos2 = xpos2 + B;
   
  if(xpos2 > 500)
  {
    B = -B;
  }
    
  if(xpos2 <= 0)
  {
    B = -B;
  }
  
  
  //body
  fill(255);
  noStroke(0);
  ellipse((xpos2*2), (ypos), 15, 15);
  ellipse(((xpos2*2)-5), (ypos), 20, 15);
  ellipse(((xpos2*2)+5), (ypos), 15, 20);
  ellipse(((xpos2*2)), (ypos-5), 15, 20);
  ellipse(((xpos2*2)+10), (ypos), 15, 20);
  ellipse(((xpos2*2)+10), (ypos-5), 20, 15);
  ellipse(((xpos2*2)+19), (ypos-10), 3, 3);
  
  //head and legs
  fill(0);
  noStroke(0);
  ellipse(((xpos2*2)+20), (ypos-13), 18, 10);
  ellipse(((xpos2*2)+19), (ypos-17), 5, 12);
  ellipse(((xpos2*2)+12), (ypos-15), 5, 12);
  ellipse(((xpos2*2)+12), (ypos+15), 3, 18);
  ellipse(((xpos2*2)-5), (ypos+15), 3, 18);
  
  fill(255);
  noStroke(0);
  ellipse(((xpos2*2)+19), (ypos-15), 3, 3);
    
}
  //blue color shift
  if (circle.x > width / 2) {
    b = map(circle.x, width / 4, width, 0, 75);
  }

  if (circle.x < width / 2) {
    b = map(circle.x, 0, width / 2, 75, 0);
  }

  //bounce
  if (circle.x > width) {
    speed = -speed;
  }

  if (circle.x < 0) {
    speed = -speed;
  }

  if (circle.y <200) {
    m = map(m, -100, 1200, -100, -50);
    n = map(n, 0, 1300, 1150, 1300);
  }
  circle.x = circle.x + speed;;
  circle.y = inData;
}

  //if (m > -50) {m = -50;}
//if (n > 1200) {n =1200}
function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();

  if (axis == 1) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == 2) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = map(i, x, x+w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}


function serialEvent() {
  var Z = serial.read();
  var mappedZ = map(Z, 0, 255, 0 , 500);
  inData = Number(mappedZ);
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    console.log(i + " " + portList[i]);
  }
}


function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}