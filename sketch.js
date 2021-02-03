const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var backgroundImg;
var wallLow, wallHigh, wallLeft, wallRight;

var queen;
var whiteCoins = []
var blackCoins = []
var striker;

var r; //radius
var angle
var step //distance between steps in radians

var Chain1;

var chainCreated = false;

function preload() {
    backgroundImg = loadImage("images/carromboard.png");
}

function setup() {
    var canvas = createCanvas(600, 600);
    engine = Engine.create();
    world = engine.world;

    engine.world.gravity.y = 0;

    queen = new Queen(300, 300, 10, "purple")

    //initialize variables
    r = 30;
    angle = 0;
    step = TWO_PI / 8; //in radians equivalent of 360/6 in degrees

    for (var i = 0; i < 8; i++) {

        //convert polar coordinates to cartesian coordinates
        var x = 300 - r * sin(angle);
        var y = 300 - r * cos(angle);

        console.log(angle + " " + x + " " + y)
        //draw ellipse at every x,y point
        blackCoins.push(new BlackCoin(x, y, 10, "black"));
        //increase angle by step size
        angle = angle + step;

    }

    striker = new WhiteCoin(300, 460, 15, "Beige");
    

    wallLow = new Wall(width / 2, height-40, width, 20);
    wallHigh = new Wall(width / 2, 40, width, 20);
    wallLeft = new Wall(width-40, height/2, 20, height);
    wallRight = new Wall(40, height/2, 20, height);

}

function draw() {
    background(backgroundImg);
    Engine.update(engine);

    queen.display();

    push();
    //translate(width / 2, height / 2);
    for (var i = 0; i < blackCoins.length; i++) {
        blackCoins[i].display();
    }
    pop();

    striker.display();

    // wallLow.display();
    // wallHigh.display();
    // wallLeft.display();
    // wallRight.display();

}

function mouseDragged()
{
 if(!chainCreated)
 {
    Chain1 = new Chain(striker.body,{x:mouseX,y:mouseY})
    chainCreated = true;
 }
 Matter.Body.setPosition(striker.body,{x:mouseX,y:mouseY});
}

function mouseReleased()
{
    Chain1.fly();
}

function keyPressed()
{
    if(keyCode===32)
    {
        Matter.Body.setPosition( striker.body,{x:300,y:460})
        chainCreated = false;
    }
}