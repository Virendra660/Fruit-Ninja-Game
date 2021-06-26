//gameStates
var PLAY=1;
var END=0;
var gameState=1;


var sword;
var score;
var fruit;
var monster;
function preload(){
 swordImage=loadImage("sword.png"); 
 fruit1Image=loadImage("fruit1.png");
 fruit2Image=loadImage("fruit2.png");
 fruit3Image=loadImage("fruit3.png");
 fruit4Image=loadImage("fruit4.png");
 monsterImage=loadAnimation("alien1.png","alien2.png"); 
 gameoverImage=loadImage("gameover.png"); 
 gameoverSound=loadSound("gameover.mp3");
 knifeSound=loadSound("knifeSwooshSound.mp3"); 
}

function setup(){
createCanvas(400,400);
 
  //creating sword
 sword=createSprite(40,200,20,20);
 sword.addImage("swImage",swordImage);
 sword.scale=0.7; 
 
  //set collider for sword
 sword.setCollider("rectangle",0,0,40,40);
 
  score=0;
  
  fruitGroup=createGroup();
   enemyGroup=createGroup();
}

function draw(){
background("lightblue");
  text("Score: "+ score, 200,30);
  
 if(gameState===PLAY){
   //call fruits and enemy functions
   fruits();
   enemy();
    
   //Move sword with mouse
   sword.y=mouseY;
   sword.x=mouseX;
   
   
   
   //score variables and groups
   
   if(fruitGroup.isTouching(sword)){
     fruitGroup.destroyEach();
     score=score+2;
     knifeSound.play();
   }
  if(sword.isTouching(enemyGroup)){
    fruitGroup.destroyEach();
 enemyGroup.destroyEach();
 fruitGroup.setVelocityXEach(0); 
 enemyGroup.setVelocityXEach(0);
  sword.destroy();
 var gameover=createSprite(200,200,20,20);
 gameover.addImage(gameoverImage);   
  gameState=END;
    gameoverSound.play();
  } 
 }  
 drawSprites();  
}
function fruits(){
if(World.frameCount%80===0){
 fruit=createSprite(400,200,20,20);

  position=Math.round(random(1,2))
  
  if(position===1){
    fruit.x=400;
    fruit.velocityX=-(7+(score/4));
  }
  else 
    if(position===2){
    fruit.x=0;
    fruit.velocityX=7
  }  
 fruit.scale=0.2;
 
 r=Math.round(random(1,4))
  if(r==1){
    fruit.addImage(fruit1Image)
  }else if(r==2){
    fruit.addImage(fruit2Image)
  }else if(r==3){
    fruit.addImage(fruit3Image)
  }else if(r==4){
    fruit.addImage(fruit4Image)
  }
 fruit.y=Math.round(random(50,340));
 
  
  
  
  
  fruit.setLifetime=100;
  fruitGroup.add(fruit);
  
 }  
}
function enemy(){
if(World.frameCount%200===0){
monster=createSprite(600,200,20,20);
 monster.addAnimation("moving",monsterImage);
 monster.y=Math.round(random(100,300));
 monster.scale=0.7; 
 monster.velocityX=-(8+(score/10));
 monster.lifetime=130;
  enemyGroup.add(monster);
 } 
}