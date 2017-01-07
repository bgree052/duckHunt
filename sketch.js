//Duck1
var Duck = {
  Xstart : 100,
  Ystart : 150,

  Xend: 0,
  Yend: 0,

  speed : 6,

  image : (duckSprite)
}


var Crosshair = {
  colour: 0,
  colourChanger:0,
  counter: 0,
  temp: 0,
  sound: ("assets/gunshot.wav")
}


  var ReplayButton={
    Xstart : 475,
    Ystart : 334.5,
    
    Width : 300,
    Height : 100,
    
    Xend : 775,
    Yend : 434.5
  }


var ducksShot = 0;

var offSide = 0; //This is for counting how many times a duck has
//managed to escape the right side of the screen

var flapCount = 0; //for counting frames between changing the sprite image

var duckSprite;

var duckFlapping = ["assets/duckFlapUp.png","assets/duckFlapDown.png"];

var duckCount = 0; //SCORE

var i;

var reset;

var stageSetting;

var testCounter = 0;

//my functions

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




function preload(){
  flapUp = loadImage(duckFlapping[0]);
  flapDown= loadImage(duckFlapping[1]);
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
  stageSetting = 1;
  // console.log(stage.width);
  // console.log(stage.height);
}

function draw() {
  
  testCounter += 0.01666666666;
  
  //console.log(testCounter);
  
  if (stageSetting ==1 && mouseIsPressed){
    stageSetting = 2;
  }
  
  //timer
   if(testCounter >= 60){
     stageSetting = 3;
     stageMusic.stop();
     }
  
  //ends game
  if(stageSetting == 3){
    image(stage);
    
    fill(0, 0, 255);
    rect(ReplayButton.Xstart, ReplayButton.Ystart, ReplayButton.Width, ReplayButton.Height);
    
  textFont("Calibri");
  textSize(80);
  textStyle(BOLD);
  fill(0);
  text("GAME OVER", stage.width/3, stage.height/7)
  textSize(60);
  text("Your Score: "+duckCount, stage.width/3 +30, stage.height/3);
  textStyle(NORMAL);
  textSize(50);
  fill(255);
  text("Play Again?", stage.width/3 +75, stage.height/2 +15);
  }
  
  //start screen
  if (stageSetting == 1){
    image(stage);
    
  textFont("Calibri");
  textSize(80);
  textStyle(BOLD);
  fill(0);
  text("DUCK HUNT", stage.width/3, stage.height/7)
  textSize(60);
  text("PRESS MOUSE1 TO BEGIN", stage.width/4, stage.height/3);
  textSize(40);
  textStyle(NORMAL);
  text("YOU HAVE ONE MINUTES TO SHOOT AS MANY AS YOU CAN", stage.width/4-120, stage.height/2);
  
  }
  
  if (stageSetting == 2){
    
    
  
  
  reset = Duck.speed-theDuck.width;
  //part of respawning by checking if Duck.X has reset to the left, and adds 1 to the offSide int
  if(Duck.Xstart==reset){
    offSide +=1;
    //resets offside value
    if(ducksShot-offSide<0){
      offSide -=1
    }
  }

  image(stage);
  //stage drawn
  
  //checks if the count of ducksShot (hit detection count) is equal to that of the times the duck has been reset
  if(ducksShot==offSide){
    duckSprite=flapUp;
  }

  //color(0);
  textFont("Calibri");
  textSize(30);
  textStyle(BOLD);
  fill(0);
  text("SCORE= " +ducksShot, 10, 50);

    //CROSSHAIR DRAWN
  drawCrosshair();


  Crosshair.counter = Crosshair.counter + Crosshair.temp;


  //Move Duck1 back to start
   if(Duck.Xstart > stage.width || ducksShot-offSide==1){
    duckCount += 1;
    Duck.Xstart = 0-theDuck.width;

    // if(i==1){
    //   Duck.Ystart = 300
    // }
    // if(i==2){
    //   Duck.Ystart = 75
    // }
    // if(i==3){
    //   Duck.Ystart = 50
    // }
    // if(i==4){
    //   Duck.Ystart = 25
    // }
    // if(i==5){
    //   Duck.Ystart = 200
    // }
    // if(i==6){
    //   Duck.Ystart = 120
    // }
    // if(i==7){
    //   Duck.Ystart = 40
    // }
  }




//Duck Flapping

  if(flapCount==8){
    flapCount = 0
  }
  flapCount +=1;

  if(flapCount>4){
    duckSprite=flapDown
  }
  if(flapCount<4){
    duckSprite=flapUp
  }


//Remove Duck
if(ducksShot-offSide==1){
  duckSprite=nothing;
}

  //Load Duck1 and move
  drawDuck(duckSprite, Duck.Xstart, Duck.Ystart, Duck.speed);
  
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
  Duck.Xend = Duck.Xstart+duckSprite.width;
  Duck.Yend = Duck.Ystart+duckSprite.height;


}




//DEBUGGING



//console.log("Duck.Xstart= " +Duck.Xstart);
//console.log("Xend= " +Duck.Xend);
//console.log("Yend= " +Duck.Yend);
//console.log("MoveY= " +Duck.Ystart);
//console.log("Speed= " +Duck.speed);
//console.log("Counter= " +Crosshair.counter);
//console.log("Temp= " +Crosshair.temp);
//console.log("MouseX= "+mouseX);
//console.log("ducksShot= "+ducksShot);
//console.log("XoffSide= "+offSide);

//console.log("START POINT= " +reset);
//It's -136 when speed= 5

//console.log("i= "+i);


}
//END OF DRAW



    

  //here the sound is played, the colour changer is started, and hit detection is defined
  function mousePressed() {
    
    gunShot.setVolume(1);
    gunShot.play();
    Crosshair.colourChanger = 1;
    //console.log("colourChanger=" +Crosshair.colourChanger);
  
      if(stageSetting == 2 && mouseX<Duck.Xend && mouseX>Duck.Xstart && mouseY<Duck.Yend && mouseY>Duck.Ystart){
        ducksShot += 1;
        quack.setVolume(1.5);
        quack.play();
        //console.log("ducksShot=" +ducksShot);
        Duck.Ystart = floor(random(25,400));
        Duck.speed = floor(random(6,9));
        //console.log(i);
      }
      
      
      
      if(stageSetting == 3 && mouseX<ReplayButton.Xend && mouseX>ReplayButton.Xstart && mouseY<ReplayButton.Yend && mouseY>ReplayButton.Ystart){
        testCounter = 0;
        stageMusic.play();
        stageSetting = 2;
        ducksShot = 0;
        offSide = 0;
        duckCount = 0;
        Duck.Xstart = 100;
        Duck.Ystart = 150;
      }
      
    }
  
