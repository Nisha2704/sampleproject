class BaseCoin{
    constructor(x, y, r, color) {
        var options = {
            'restitution':0.8,
            'friction':1.0,
            'density':1.0
        }
        this.body = Bodies.circle(x, y, r, options);
        this.radius = r;
        this.color = color;
        this.points = 0;
        //this.image = loadImage("sprites/base.png");
        World.add(world, this.body);
      }
      display(){
        var position = this.body.position;
        push();
        // translate(this.body.position.x, this.body.position.y);
        // rotate(angle);
        strokeWeight(2)
        fill(this.color)
        ellipseMode(RADIUS);
        ellipse(position.x,position.y, this.radius, this.radius);
        pop();
      }
}