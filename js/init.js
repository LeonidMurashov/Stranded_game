function Human(x, y, health) {
    this.x = x;
    this.y = y;
    this.health = health;
}

Human.prototype.dealDamage = function(damage) {
    this.health -= damage;
};

Human.prototype.isDead = function() {
    return this.health <= 0;
};


function init() {
    var stage = new createjs.Stage("demoCanvas");
    var circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    stage.update();

    human = new Human(200, 200, 100);

    human.dealDamage(50);
    console.log(human.health);
    console.log(human.isDead());

    human.dealDamage(50);
    console.log(human.health);
    console.log(human.isDead());
}