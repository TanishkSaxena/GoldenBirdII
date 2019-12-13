https://www.timetoast.com/timelines/indian-independence-movement-d1c34a86-571b-4949-a8d5-787b4c0a786c

var player, playerD;

var background, title, level1;

var gameState;

var groupbad;

function preload() {

  titleI = loadImage("Title.png");

  knight = loadAnimation("pixil-frame-0.png","pixil-frame-1.png");

  bg = loadImage("bg.png");

  death = loadImage("tomb.png");
  
  level_1 = loadImage("chart1.png");

  level_2 = loadImage("chart2.png");

  bad_A = loadAnimation("bad1.png","bad2.png","bad3.png","bad2.png","bad1.png");
    bad_A.frameDelay = 1.5;

}

function setup() {
  createCanvas(1350,600);

  gameState = 0;
  console.log(gameState);

  background = createSprite(700,300,1400,600);
    background.addImage("dun",bg);
    background.scale = 1/2;

  line = createSprite(700,25,700,20);
    line.shapeColor = (55,55,55);

  dot = createSprite(360,25,20,20);
    dot.shapeColor = "yellow";

  level1 = createSprite(674,300,40,40);
    level1.addImage("dun",level_1);
    level1.scale = 1/101;

  level2 = createSprite(715,300,40,40);
    level2.addImage("duun",level_2);
    level2.visible=false;
    level2.scale=10/20;

  title = createSprite(675,300,250,125);
    title.addImage("titu",titleI);
    title.scale = 1/2;

  groupbad = createGroup();

  playerD = createSprite(150,300,40,40);  
    playerD.addImage("dd",death);
    playerD.visible=false;

  player = createSprite(150,300,112.5,75);
    player.addAnimation("kini",knight);
    player.scale = 0.75;
    player.visible=false;
    player.debug=true;

}

function draw() {
  //background(0,0,0); 

  drawSprites();

  if(keyDown("space") && gameState===0){
    gameState = 1;
    title.visible=false;
    level1.scale=1/2
  }

  if(keyDown("enter") && gameState===1){
    gameState = 2.01;
    level1.visible = false;
  }
  
  if(gameState>2 && gameState<3){
    title.visible=false;
    level1.visible=false;
    player.visible=true;
    if(keyDown(UP_ARROW)){
      player.y-=10;
      playerD.y-=10;
    }
    if(keyDown(DOWN_ARROW)){
      player.y+=10;
      playerD.y+=10;
    }
    dot.x+=4;
    if(dot.x===1040 && gameState>2 && gameState<3){
      gameState+=1;
      dot.x = 360;
      groupbad.destroyEach();
      groupbad.setLifetimeEach(0);
    }
    baddies();
  } 

  God_This_Is_Getting_Complicated();

  if(gameState===4.0){
    playerD.visible=true; 
    player.visible=false;
  }

  if(gameState>3 && gameState<4 && keyDown("enter")){
    gameState-=0.99;
    groupbad.destroyEach();
    groupbad.setLifetimeEach(0);
  }

  if(keyDown("m")){
    gameState=4.0;
  }

}

function God_This_Is_Getting_Complicated(){
  
  if(gameState === 3.01){
    level2.visible=true;
    player.visible=false;
  }
  if(gameState !== 3.01 && gameState !== 1 && gameState !== 0){
    level2.visible=false;
    player.visible=true
  }

}

function baddies(){
    
  if(frameCount %50 === 0){
      var bad = createSprite(1500,300,40,40);
        bad.debug = true;
        bad.setCollider("circle",0,0,49);
        bad.velocityX = -10;
        bad.lifetime = 300;
        bad.y = Math.round(random(100,500));
        bad.addAnimation("x",bad_A);
        bad.visible=true; 

      groupbad.add(bad);

      if(player.isTouching(bad)){
        gameState=4.0;
      }
  }

}