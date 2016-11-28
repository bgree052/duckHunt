//Duck1
var Duck = {
  Xstart : 100,
  Ystart : 150,
  
  Xend: 0,
  Yend: 0,
  
  speed : 5,
  
  image : (flight)
}


var Crosshair = {
  colour: 0,
  colourChanger:0,
  counter: 0,
  temp: 0,
  sound: ("assets/gunshot.wav")
}

var Dead = 0;

var offSide = 0;

var flapCount = 0;

var flight;

var duckFlying = ["assets/duckFlapUp.png","assets/duckFlapDown.png"];

var DuckCount = 0;

var i;

var reset;


function preload(){
  flapUp = loadImage(duckFlying[0]);
  flapDown= loadImage(duckFlying[1]);
  theDuck = loadImage("assets/duck.png");
  stage = loadImage("assets/stage.png");
  nothing = loadImage("assets/Untitled.png")
  gunShot = loadSound(Crosshair.sound);
  stageMusic = loadSound("assets/Background Music.mp3");
  quack = loadSound("assets/quack1.wav")
}


function setup() {
  createCanvas(stage.width,stage.height);
  Duck.Xstart = 100;
  Duck.Ystart = 150;
  stageMusic.setVolume(0.5);
  stageMusic.play();
}  

function draw() {
  //stage drawn
  reset = 5-theDuck.width;
  //part of respawning by checking if Duck.X has reset to the left, and adds 1 to the offSide int
  if(Duck.Xstart==reset){
    offSide +=1;
    //resets offside value
    if(Dead-offSide<0){
      offSide -=1
    }
  }
  
  image(stage);
  
  //checks if the count of Dead (hit detection count) is equal to that of the times the duck has been reset
  if(Dead==offSide){
    flight=flapUp;
  }
  
  
  textFont("Calibri");
  textSize(30);
  textStyle(BOLD);
  fill:(0);
  text("SCORE= " +Dead, 10, 50);
  
    //CROSSHAIR DRAWN
  drawCrosshair();

  
  Crosshair.counter = Crosshair.counter + Crosshair.temp;
  
   if(DuckCount == 15){
     stageSetting = 3;
     }
    
  //Move Duck1 back to start
   if(Duck.Xstart > stage.width || Dead-offSide==1){
    DuckCount += 1;
    Duck.Xstart = 0-theDuck.width;
    
    if(i==1){
      Duck.Ystart = 300
    }
    if(i==2){
      Duck.Ystart = 75
    }
    if(i==3){
      Duck.Ystart = 50
    }
    if(i==4){
      Duck.Ystart = 25
    }
    if(i==5){
      Duck.Ystart = 200
    }
    if(i==6){
      Duck.Ystart = 120
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


//Remove Duck
if(Dead-offSide==1){
  flight=nothing;
}

  //Load Duck1 and move
  drawDuck(flight, Duck.Xstart, Duck.Ystart, Duck.speed);

  Duck.Xstart += Duck.speed;

  
//HIT DETECTION
  
  //this is the logger for the mouse being pressed, and sets the colour value to red and the timer addition value to 1 so it incremints by 1
  if(Crosshair.colourChanger == 1){
    Crosshair.colour = 255;
    Crosshair.temp = 1;
  }
  //when the counter hits 60 the counting stops as temp becomes 0 and the counter is reset to 0, 
  //and the colour becomes black, and the counter value returns to 0
  if(Crosshair.counter >= 30){
    Crosshair.temp = 0;
    Crosshair.counter = 0;
    Crosshair.colour = 0;
    Crosshair.colourChanger = 0;
  }
  
  //Calculates the end position of the duck relative to the start position
  Duck.Xend = Duck.Xstart+flight.width;
  Duck.Yend = Duck.Ystart+flight.height;

  





//DEBUGGING



//console.log("Duck.Xstart= " +Duck.Xstart);
//console.log("Xend= " +Duck.Xend);
//console.log("Yend= " +Duck.Yend);
//console.log("MoveY= " +Duck.Ystart);
//console.log("Speed= " +Duck.speed);
//console.log("Counter= " +Crosshair.counter);
//console.log("Temp= " +Crosshair.temp);
//console.log("MouseX= "+mouseX);
//console.log("Dead= "+Dead);
//console.log("XoffSide= "+offSide);

//console.log("START POINT= " +reset);
//It's -136 when speed= 5

//console.log("i= "+i);


}
//END OF DRAW






  function drawCrosshair(){  
    noFill();
    stroke(Crosshair.colour, 0, 0);
    ellipse(mouseX, mouseY, 40, 40);
    fill(Crosshair.colour, 0, 0);
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
  Crosshair.colourChanger = 1;
  //console.log("colourChanger=" +Crosshair.colourChanger);
  
    if(mouseX<Duck.Xend && mouseX>Duck.Xstart && mouseY<Duck.Yend && mouseY>Duck.Ystart){
      Dead += 1;
      quack.setVolume(1.5);
      quack.play();
      //console.log("Dead=" +Dead);
      i = floor(random(1,6));
    }
  }
  