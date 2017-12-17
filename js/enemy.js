(function() {

    function Enemy(stage, initial_x, initial_y, sprite_path, life, speed, r) {
        this.Container_constructor();

        this.x = initial_x;
        this.y = initial_y;
        this.sprite_path = sprite_path; //path to the weapon image
        this.life = life; // number of ticks for the Throwable to act
        this.speed = speed; // the speed of the trow

        this.sprite = new createjs.Bitmap(this.sprite_path);
        this.sprite.x = initial_x;
        this.sprite.y = initial_y;
        this.r = r;
        this.cooldown = 0
        this.health = 1000;

        var data = {images: ["./assets/chars.png"],
                    frames: {width:52, height:73},
                    animations: {
                        up: { frames: [36,37,38], frequency: 10},
                        down: { frames: [0,1,2], frequency: 10},
                        right: { frames: [24,25,26], frequency: 10},
                        left: { frames: [12,13,14], frequency: 10},
                }
        };

        //this.entity = new createjs.BitmapAnimation(spriteSheet);
        //entity.gotoAndPlay("down"); 
        //stage.addChild(entity);
        stage.addChild(this.sprite);
    }

    var p = createjs.extend(Enemy, createjs.Container);

    p.tick = function (dx, dy, player) {
        [this.dx, this.dy] = [player.x - this.sprite.x, player.y - this.sprite.y];

        // play animation
        //if((Math.atan2(this.dx, this.dy)*180/3.1415+45))

        var a = this.speed;

        this.sprite.x += this.dx > 0 ? a : -a;
        this.sprite.y += this.dy > 0 ? a : -a;

        this.sprite.x += dx
        this.sprite.y += dy

        var ball = 0;
        if(this.cooldown == 0)
        {
            ball = new Throwable(stage, this.sprite.x, this.sprite.y, "./assets/asteroid.png", 1000, Math.atan2(-this.dx,-this.dy)*180/3.1415+90, 5, 10)
            this.cooldown = 40
        }

        this.cooldown -= 1
        return ball
    };

    p.is_dead = function () {
        return Boolean(this.life<=0)
    };

    window.Enemy = createjs.promote(Enemy, "Container");
}());


// Converts from degrees to radians.
Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
};
