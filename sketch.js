var dog, happyDog, sad, foodS, foodStock, normal;
var dataBase;
var FTP, addFood;
var fedTime, lastFed;
var foodObj;
var changingGS, readingGS;
var bedroomIMG, gardenIMG, washroomIMG;
var gameState;

function preload(){	
  happyDog = loadImage("images/dogImg1.png");
  normal = loadImage("images/dogImg.png"); 
  bedroomIMG = loadImage("images/Bed Room.png");  
  gardenIMG = loadImage("images/Garden.png");   
  washroomIMG = loadImage("images/Wash Room.png");  
  sad = loadImage("images/Lazy.png");

}

function setup() {
	createCanvas(500, 500);

  dog = createSprite(200,200,20,20);
  dog.addImage(normal);
  dataBase = firebase.database();
  foodStock = dataBase.ref('Food');
  foodStock.on("value", readStock);
  foodObj = new Food(20, hour());
  var feed;
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  var addFood;
  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods)

  readingGS = dataBase.ref('gameState');
  readingGS.on("value", function(data){
    gameState = data.val();
  });

  if(gameState != "Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show
    dog.addImage(normal)
  }

}


function draw() {  
  background(46, 139,87); 
  drawSprites();
  foodObj.display();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  dataBase.ref('/').update({
  Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);
  
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  foodObj.updateLastFed(hour());
  dataBase.ref('/').update({
    Food:foodOject.getFoodStock(),
    FeedTime:foodOject.getLastFed()})
}

function addFoods(){
  foodObj.addFoodStock();
  dataBase.ref('/').update({
    Food:foodOject.getFoodStock()})
}

function update(state){
  dataBase.ref('/').update({
    gameState:state
  });
}

