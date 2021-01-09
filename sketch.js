
var car, carImg;
var dieselImg,diesel,dustbin,dustbinImg,stone,stoneImg;
var ground;
 var score = 0;
 var PLAY = 1;
 var END = 0;
 var gameState = PLAY;
var dieselCount = 0;

function preload() {
    carImg = loadAnimation("car1.jpg","car2.jpg","car3.jpg");
    dieselImg = loadImage("diesel.png");
    dustbinImg = loadImage("dustbin.jpg");
    stoneImg = loadImage("stones.jpg");


}




function setup() {
    createCanvas(600,200);
   
car = createSprite(50,180,20,50);
car.addImage(carImg);
car.scale = 0.1;

ground = createSprite(200,180,400,20);
ground.x = ground.width /2;

dieselGroup= new Group();
dustbinGroup = new Group();
stoneGroup = new Group(); 



}
 
function draw() {
    background(0,0,0);  
    
 
    
         
      

      car.collide(ground);

      

      if(gameState === PLAY){

    
        ground.velocityX = -(4+3*score/100);
        
        score = score + Math.round(getFrameRate()/60);
    
      
        
       if(ground.x<0){
        ground.x = ground.width/2
      } 
        
     if(car.visible = false && dustbinGroup.isTouching(car)  || stoneGroup.isTouching(car)  ){
        gameState = PLAY;
        
}
        
if( deiselGroup.isTouching(car) ){
    gameState = PLAY;
    
}
        
        
        
        if (ground.x < 0){
          ground.x = ground.width/2;
        }
        
        //jump when the space key is pressed
        if(keyDown("space")){
            car.visible = false;
             
        }    
        
        if(frameCount %120 == 0 || frameCount %220 == 0){
            car.visible = true;
            
            if(keyDown("space")){
                car.visible = true;
                 
            }      
        }
        
        
      
        spawnDiesel();
        spawnDustbin();
        spawnStone();

        if(dieselGroup.isTouching(car)){
            dieselCount = dieselCount + 1;
        }
        
        
        
        
        if(car.visible == true && dustbinGroup.isTouching(car) || stoneGroup.isTouching(car) && dieselCount == 0 ){
            gameState = END;
          } else if (dieselCount > 0 && car.visible == true && dustbinGroup.isTouching(car) || stoneGroup.isTouching(car)){
            dieselCount = dieselCount -1;
            gameState = PLAY;
        }
     
    





}
       
     
     
     
     
      else if (gameState === END) {
         
         
         ground.velocityX = 0;
         dustbinGroup.setLifetimeEach(-1);
          dieselGroup.setLifetimeEach(-1);       
          stoneGroup.setLifetimeEach(-1);
    
         dustbinGroup.setVelocityXEach(0);
          dieselGroup.setVelocityXEach(0);       
          stoneGroup.setVelocityXEach(0);
         score = score*0;
        }
      
     
      
      
      
     drawSprites();
      
    
     textSize(18);
     text("Score: "+ score, 500,50);
    
    }
    
   


    function spawnDiesel(){
  
        if (frameCount % 400 == 0 ){
         diesel = createSprite(200,300,20,20);  
         diesel.addImage(dieselImg); 
         diesel.scale = 0.1;
         diesel.velocityX = -5;
         diesel.lifetime = 350;
         dieselGroup.add(diesel);
        
        }
         
      }
      
      function spawnDustbin(){
      if (frameCount %100 == 0 ){
        dustbin = createSprite(200,330,20,20);
      
        dustbin.addImage(obstacleImage); 
        dustbin.scale = 0.1;
        dustbin.velocityX = -4;
        dustbinGroup.add(dustbin);
      
      
      
      } 
      
      }



      function spawnStone(){
        if (frameCount % 210 == 0 ){
            stone = createSprite(200,300,20,20);  
              
            stone.addImage(stoneImg); 
            stone.scale = 0.1;
            stone.velocityX = -5;
            stone.lifetime = 350;
            stoneGroup.add(stone);
           
           }
      }
