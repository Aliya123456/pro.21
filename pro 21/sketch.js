var spongBob, path
var bobImg1 , pathImg , bobImg2 , bobImg3

var jellyImg ,  stoneImg , snailImg
var burgerImg , gameOverImg 

var burgerG, jellyG ,  stoneG, snailG

var END =0;
var PLAY =1;
var gameState = PLAY;

var burgerPoints=0;
var jellyfishPoint=0;
var gameOver, restart;




function preload(){

pathImg = loadImage("images/under.jpg");

bobImg1 = loadAnimation("images/bob1.png","images/bob2.png","images/bob3.png")
bobImg2 = loadAnimation("images/bob5.png");
bobImg3 = loadAnimation("images/bobjump.png");

burgerImg = loadImage("images/burger.png");

jellyImg = loadImage("images/jellyfish.png");

snailImg= loadImage("images/snail.png");

stoneImg = loadImage("images/stone.png");

gameOverImg = loadImage("images/gameover.png");


}

function setup() {
//window size canvas 
createCanvas(windowWidth, windowHeight);

// moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;
path.scale=3

// spongBob running
spongBob = createSprite(70,150);
spongBob.addAnimation("bobRunning",bobImg1);
spongBob.scale=0.3;
spongBob.x=150;


// collider 
spongBob.setCollider("rectangle",0,0,40,40);


gameOver = createSprite(700,180);
gameOver.addImage(gameOverImg);
gameOver.scale= 0.8;


burgerG = new Group();
snailG= new Group();
jellyG = new Group();
stoneG = new Group(); 
}

function draw() {
   
    if(gameState===PLAY){

        gameOver.visible=false;

 //movment of spongbob
     if(keyDown("UP_ARROW")){
         spongBob.velocityX=0;
         spongBob.y-=4;
     }

     if (keyDown("DOWN_ARROW")){
         spongBob.velocityX=0;
         spongBob.y+=4;
     }

    

//edges collide     
      edges= createEdgeSprites();
      spongBob.collide(edges);

    
// reset background
if (path.x <100){
    path.x = width/2;
}

createBurger();
createJellyfish();
createSnail();

if (burgerG.isTouching(spongBob)){
    burgerG.destroyEach();
    burgerPoints=burgerPoints + 5;
}

  if(jellyG.isTouching(spongBob)){
    jellyG.destroyEach();
     jellyfishPoint=jellyfishPoint+5;
 }

if (spongBob.isTouching(snailG)){
    gameState=END;
    
    
}

    }

else if(gameState===END){

    gameOver.visible=true;

    spongBob.addAnimation("bobEnd",bobImg2);
    spongBob.x=width/2;
    spongBob.y=height/2;
    spongBob.scale=0.6;

    burgerG.destroyEach();
    jellyG.destroyEach();
    snailG.destroyEach();

    burgerG.setVelocityEach(0);
    jellyG.setVelocityEach(0);
    snailG.setVelocityEach(0);
    path.setVelocity(0);
}
   

  

  
 
drawSprites();
textSize(20);
fill(255);
text("Burger: "+burgerPoints,width-180,30)

textSize(20);
fill(255);
text("Jellyfish: "+jellyfishPoint,width-180,60)
    



}



function createBurger(){
    if(World.frameCount % 200==0) {
// burger position
var burger = createSprite(width,Math.round(random(50,height-50),10,10))
burger.addImage(burgerImg);
burger.velocityX=-5;
burger.lifetime=400;
burgerG.add(burger);   
burger.scale=0.1

  }
}

function createJellyfish(){
    if(World.frameCount % 320==0) {
// jellyfish position
var jellyfish = createSprite(width,Math.round(random(50,height-50),10,10))
jellyfish.addImage(jellyImg);
jellyfish.velocityX=-5;
jellyfish.lifetime=400;
jellyG.add(jellyfish); 
jellyfish.scale=0.2

  }
}



function createSnail(){
    if(World.frameCount % 320==0) {
// jellyfish position
var snail= createSprite(width,Math.round(random(50,height-50),10,10))
snail.addImage(snailImg);
snail.velocityX=-5;
snail.lifetime=400;
snailG.add(snail); 
snail.scale=0.2

  }
}




