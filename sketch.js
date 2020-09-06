//Create variables here
var foodObj,dogImg,happyDogImg,dog,database,foodStock,fedTime,lastFed,feed,addFood;
function preload()
{
  dogImg=loadImage("images/dogImg.png")
  happyDogImg=loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(1000, 500);
  database=firebase.database();
  dog=createSprite(800,270)
  dog.addImage(dogImg)
  dog.scale=0.3
  foodObj=new Food();
  foodStock=database.ref('Food');
  foodStock.on("value",foodObj.readData)
  
  feed=createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87)

  /*if(keyWentDown(UP_ARROW)){
    foodStock--
    if(foodStock<0){
      foodStock=0;
    }
    food.updateData(foodStock);
    dog.addImage(happyDogImg);
  }*/
  
  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
    lastFed=data.val();
  })


  
  console.log(foodStock);
  
  drawSprites();
  foodObj.display();
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
    text("Last Fed : 12 AM",350,30);
  }else{
    text("Last Fed : "+ lastFed + "AM",350,30);
  }
  //add styles here

}
function feedDog(){
  dog.addImage(happyDogImg);
  
  foodObj.updateData(foodObj.readData()-1);

  database.ref('/').update({
    Food:foodObj.readData(),
    FeedTime:hour()
  })

}
function addFoods(){
  foodStock++
  database.ref('/').update({
    Food:foodStock
  })
}

