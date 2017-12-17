(function() {

    function Enemy(stage, initial_x, initial_y, life, speed, r) {
        this.Container_constructor();

        this.x = initial_x;
        this.y = initial_y;
        this.life = life; // number of ticks for the Throwable to act
        this.speed = speed; // the speed of the trow
        this.r = r;
        this.cooldown = 0
        this.health = 1000;

        var data = {images: ["./assets/chars.png"],
                        frames: {width:52, height:73},
                        animations: {
                            up: { frames: [36+6,37+6,38+6], frequency: 10},
                            down: { frames: [0+6,1+6,2+6], frequency: 10},
                            right: { frames: [24+6,25+6,26+6], frequency: 10},
                            left: { frames: [12+6,13+6,14+6], frequency: 10},
                    }
            };
        
        var spriteSheet = new createjs.SpriteSheet(data);
        this.sprite = new createjs.BitmapAnimation(spriteSheet);
        this.sprite.x = initial_x
        this.sprite.y = initial_y
        stage.addChild(this.sprite);
        
        self.last_b = -3
        
    }

    var p = createjs.extend(Enemy, createjs.Container);

    p.tick = function (dx, dy, player) {
        [this.dx, this.dy] = [player.x - this.sprite.x, player.y - this.sprite.y];

        // play animation
        var b = Math.floor((Math.atan2(this.dx, this.dy)*180/3.1415+45)/90);
        if(b != this.last_b)
        {
            switch(b){
                case 0:
                    this.sprite.gotoAndPlay("down");
                break;
                case 2:
                    this.sprite.gotoAndPlay("up"); 
                break;
                case -2:
                    this.sprite.gotoAndPlay("up"); 
                break;
                case -1:
                    this.sprite.gotoAndPlay("left"); 
                break;
                case 1:
                    this.sprite.gotoAndPlay("right"); 
                break;
            }
        }
        this.last_b = b;

        var a = this.speed;

        this.sprite.x += this.dx > 0 ? a : -a;
        this.sprite.y += this.dy > 0 ? a : -a;

        this.sprite.x += dx
        this.sprite.y += dy

        var ball = 0;
        if(this.cooldown == 0)
        {
            ball = new Throwable(stage, this.sprite.x, this.sprite.y, "./assets/asteroid.png", 1000, Math.atan2(-this.dx,-this.dy)*180/3.1415+90, 5, 10)
            this.cooldown = 80
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
