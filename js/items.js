(function() {

    function Item(stage, initial_x, initial_y) {
        this.Container_constructor();

        this.sprite_path = "assets/chest.jpg";
        this.stage = stage;
        this.x = initial_x;
        this.y = initial_y;

        this.setup();
    }

    var p = createjs.extend(Item, createjs.Container);

    p.setup = function () {
        this.sprite = new createjs.Bitmap(this.sprite_path);
        this.sprite.scaleX = 0.015;
        this.sprite.scaleY = 0.015;
        this.sprite.x = this.x;
        this.sprite.y = this.y;

        this.stage.addChild(this.sprite);
    };

    p.tick = function (delta_x, delta_y) {
        this.sprite.x += delta_x;
        this.sprite.y += delta_y;
    };

    p.affect = function () {};

    window.Item = createjs.promote(Item, "Container");
}());


