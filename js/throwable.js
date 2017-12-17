(function() {

    function Throwable(initial_x, initial_y, sprite_path, life, angle, speed) {
        this.Container_constructor();

        this.x = initial_x;
        this.y = initial_y;
        this.sprite_path = sprite_path; //path to the weapon image
        this.life = life; // number of ticks for the Throwable to act
        this.angle = angle; // the angle (degrees) to throw the weapon at
        this.speed = speed; // the speed of the trow

        this.setup();
    }
    var p = createjs.extend(Throwable, createjs.Container);


    p.setup = function() {
        var sprite = new createjs.Bitmap(this.sprite_path);

        var object = new createjs.Shape();

        this.addChild(object, sprite);
    };

    p.tick = function (delta_x, delta_y) {
        [x, y] = [Math.cos(Math.radians(this.angle))*this.speed,
                  Math.sin(Math.radians(-this.angle))*this.speed];

        this.x += x;
        this.y += y;

        if (this.life) {
            this.x -= delta_x;
            this.y -= delta_y;
        }
    };

    p.is_dead = function () {
        return Boolean(--this.life)
    };

    window.Throwable = createjs.promote(Throwable, "Container");
}());


// Converts from degrees to radians.
Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
};
