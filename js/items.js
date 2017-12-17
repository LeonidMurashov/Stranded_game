(function() {
    function Item(initial_x, initial_y) {
        this.Container_constructor();

        this.sprite_path;
        this.x = initial_x;
        this.y = initial_y;
    }

    var p = createjs.extend(Item, createjs.Container);

    p.setup = function () {
        var object = new createjs.Shape();
        var sprite = new createjs.Bitmap(this.sprite_path);

        this.addChild(object, sprite);
    };

    this.tick = function (delta_x, delta_y) {
        this.x -= delta_x;
        this.y -= delta_y;
    };

    p.affect = function () {};

    window.Item = createjs.promote(Throwable, "Container");
}());

