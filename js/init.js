var stage, holder;
function init() {
    stage = new createjs.Stage("demoCanvas");
    stage.enableMouseOver();

    var asteroid = stage.addChild(new Throwable(0, 0, "assets/asteroid.png", 1000, -45, 200));

    asteroid.tick(0, 0);

    stage.update();
}