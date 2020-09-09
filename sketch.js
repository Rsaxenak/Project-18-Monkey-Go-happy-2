// background
var backImage, back, invisibleGround;
// monkey
var monkey, monkeyImage, monkey_collided;
// Banana
var banana, bananaImage, Bananas;
// Score
var score = 0;
// Rock ( not rocking :[ )
var obstacle, obstacleGroup,obstacleImage;
//What is happening in game?
var gameState = "play";
// Monkey's health (So that people can see how many chances left)
var chances = 2;

function preload() 
{
  // loading pic of background
  backImage = loadImage("jungle.jpg");
  // my main monkey's image
  monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  // monkey collided
  monkey_collided = loadAnimation("Monkey_01.png");
  // How banana looks?
  bananaImage = loadImage("banana.png");
  // How rock looks? Question of 0.000000000000000000000000000000001 Rupees
  obstacleImage = loadImage("stone.png");
}

function setup() 
{
  // to create the canvas
  createCanvas(600, 240);
  
  // my background
  back = createSprite(270,0,10,10);
  back.addImage(backImage);
  back.scale = 1;
  back.x = back.width/2;
  
  // Who knows what is this? Magic
  invisibleGround = createSprite(200,175,600,10);
  invisibleGround.visible = false;
  
  // My Brothers pic
  monkey = createSprite(80,150,20,50);
  monkey.addAnimation("running", monkeyImage);
  monkey.addAnimation("Idle", monkey_collided);
  
  // groups
  Bananas = new Group();
  obstacleGroup = new Group();
}

function draw() {
  // my backgrounds colour  
  background(220);
    
  // What should happen when the gameState is only play?
  if (gameState === "play") 
  {
    back.velocityX = -7;
    monkey.changeAnimation("running", monkeyImage);
  }
  
  // if I eat bananas after getting hit from rock, I should recover
  if (score > -1 && score < 25) 
  {
    gameState = "play";
    chances = 2;
  }
  
  // to reset the background
  if(back.x < 120)
  {
    back.x = back.width/2;
  }
  // How to make monkey jump? By pressing space
  if (gameState === "play" || gameState === "LastChance"){
    if(keyDown("space") && monkey.y > 80) 
    {
      monkey.velocityY = -12;
    }
  }
  // Lunch ^-^. Or dinner
  if (monkey.isTouching(Bananas)) 
  {
    Bananas.destroyEach();
    score = score + 1;
  }
  // How to convert monkey from vibranium to normal monkey
  if (gameState === "play" && obstacleGroup.isTouching(monkey))
  {
    score = -3;
    gameState = "LastChance";
    obstacleGroup.destroyEach();
  }
  
  // what should happen to chances if the gameState is lose?
  if (gameState === "LastChance") 
  {
    chances = 1;
    monkey.scale = 0.07;
  }
  
  // If I get hit from monkey again, I have to lose
  if (gameState === "LastChance" && obstacleGroup.isTouching(monkey)) 
  {
    gameState = "lose";
  }
  // What should happen when monkey gets hurt? Give him flowers and say "Get well soon"
  if (gameState === "lose")
  {
    back.velocityX = 0;
    Bananas.destroyEach();
    obstacleGroup.destroyEach();
    Bananas.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    chances = 0;
    monkey.changeAnimation ("Idle", monkey_collided);
  }
  // what should happen if monkey's belly is full?
  if (gameState === "win") 
  {
    back.velocityX = 0;
    Bananas.destroyEach();
    obstacleGroup.destroyEach();
    Bananas.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    monkey.changeAnimation("Idle", monkey_collided);
  
  }
  
  // How to make monkey fat (Not like he eats so many bananas and still is like a rat)
  switch(score)
  {
    case 0 : monkey.scale = 0.07;
      break;
    case 5 : monkey.scale = 0.09;
      break;
    case 10 : monkey.scale = 0.11;
      break;
    case 15 : monkey.scale = 0.13;
      break;
    case 20 : monkey.scale = 0.15;
      break;
    default : break;
  }
  
  // to add Gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  // to not make monkey dig the forest 
  monkey.collide(invisibleGround);
  // all the functions I have made 
  bananaCall();
  obstacles();
  drawSprites();
  
  // text settings, text colour, etc etc.
  stroke("white");
  textSize(20);
  fill("blue");
  text ("Bananas Eaten : " + score, 20, 20);
  text (" Monkey's health : " + chances, 400, 20);
  
  if (gameState === "lose") 
  {
    text ("Sorry, Monkey got hurt and now he can't run T-T", 10,200);
  }
  
  if (score > 24) 
  {
    text("Congrats! You did the breakfast, lunch, and dinner of monkey!", 10, 120); 
    gameState = "win";
  }
  if (gameState === "LastChance") 
  {
    text("Get 3 bananas to recover" , 240, 220); 
    
  }
  
  
  
}


// Banana!
function bananaCall() 
{
  if (frameCount % 100 === 0 && gameState === "LastChance" || frameCount % 100 === 0 && gameState === "play") 
  {
    banana = createSprite(620,100,10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.y = Math.round (random(60,140));
    banana.velocityX = -7;
    Bananas.add(banana);
    banana.lifetime = 100;
    
  }
}

// Rocks (I hate them (Because they are silly) )
function obstacles() 
{
  if (frameCount % 120 === 0&& gameState === "LastChance" || frameCount % 120 === 0 && gameState === "play") 
  {
   obstacle = createSprite(620,160,10,10);
   obstacle.addImage(obstacleImage);
   obstacle.scale = random(0.1, 0.2);
   obstacle.velocityX = -7;
   obstacleGroup.add(obstacle);
   obstacle.lifetime = 100;
   
  }

}
