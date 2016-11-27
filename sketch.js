//Duck1
var Duck = {
  Xstart : 100,
  Ystart : 150,
  
  Xend: 0,
  Yend: 0,
  
  speed : 5,
  
  image : (flight)
}




//Crosshair

var colour = 0;

//var reset;

var gunShot;

var colourChanger;

var counter = 0;

var temp = 0;

var Dead = 0;

var offSide = 0;

var flapCount = 0;

var flight;

var duckFlying = ["assets/duckFlapUp.png","assets/duckFlapDown.png"];

var DuckCount = 0;


function preload(){
  flapUp = loadImage(duckFlying[0]);
  flapDown= loadImage(duckFlying[1]);
  theDuck = loadImage("assets/duck.png");
  stage = loadImage("assets/stage.png");
  nothing = loadImage("assets/Untitled.png")
  gunShot = loadSound("assets/gunshot.wav");
}


function setup() {
  createCanvas(stage.width,stage.height);
  Duck.Xstart = 100;
  Duck.Ystart = 150;
}  

function draw() {
  //stage drawn
  
  image(stage);
  
  if(Dead==1 && Duck.Xstart==-136){
    offSide =1;
    flight=flapUp;
  }
  
  textFont("Calibri");
  textSize(30);
  textStyle(BOLD);
  text("SCORE= " +Dead, 10, 50);
  
    //CROSSHAIR DRAWN
  drawCrosshair();

  
  counter = counter + temp;
  
  if(DuckCount == 10){
    DuckCount = 0
    }
    
  //Move Duck1 back to start
   if(Duck.Xstart > stage.width){
    DuckCount += 1;
    Duck.Xstart = 0-theDuck.width;
    
    if(DuckCount == 1){
    Duck.Ystart = 300
    }
    if(DuckCount ==2){
    Duck.Ystart = 50
    }
  }
  

//Duck Flapping

  if(flapCount==8){
    flapCount = 0
  }
  flapCount +=1;
  
  if(flapCount>4){
    flight=flapDown
  }
  if(flapCount<4){
    flight=flapUp
  }

if(Dead>0 && offSide<1){
  flight=nothing;
}

  //Load Duck1 and move
  drawDuck(flight, Duck.Xstart, Duck.Ystart, Duck.speed);

  Duck.Xstart += Duck.speed;

  
//HIT DETECTION
  
  //this is the logger for the mouse being pressed, and sets the colour value to red and the timer addition value to 1 so it incremints by 1
  if(colourChanger == 1){
    colour = 255;
    temp = 1;
  }
  //when the counter hits 60 the counting stops as temp becomes 0 and the counter is reset to 0, 
  //and the colour becomes black, and the counter value returns to 0
  if(counter >= 30){
    temp = 0;
    counter = 0;
    colour = 0;
    colourChanger = 0;
  }
  
  //Calculates the end position of the duck relative to the start position
  Duck.Xend = Duck.Xstart+flight.width;
  Duck.Yend = Duck.Ystart+flight.height;

  





//DEBUGGING



console.log("MoveX=" +Duck.Xstart);
//console.log("Xend=" +Duck.Xend);
//console.log("Yend=" +Duck.Yend);
//console.log("MoveY= " +Duck.Ystart);
console.log("Speed=" +Duck.speed);
//console.log("Counter= " +counter);
//console.log("Temp= " +temp);
//console.log(mouseX);

//reset = 5-theDuck.width;

//console.log("START POINT= " +reset);

}
//END OF DRAW






  function drawCrosshair(){  
    noFill();
    stroke(colour, 0, 0);
    ellipse(mouseX, mouseY, 40, 40);
    fill(colour, 0, 0);
    ellipse(mouseX, mouseY, 5, 5);
    line(mouseX-30, mouseY, mouseX+30, mouseY);
    line(mouseX, mouseY+30, mouseX, mouseY-30);
  }
  

function drawDuck(img, x, y, spd) {
  image(img, x, y);
  speed = (spd);
}


//here the sound is played, the colour changer is started, and hit detection is defined
function mousePressed() {
  gunShot.setVolume(1);
  gunShot.play();
  colourChanger = 1;
  console.log("colourChanger=" +colourChanger);
  
    if(mouseX<Duck.Xend && mouseX>Duck.Xstart && mouseY<Duck.Yend && mouseY>Duck.Ystart){
      Dead += 1;
      console.log("Dead=" +Dead);
    }
  }
  