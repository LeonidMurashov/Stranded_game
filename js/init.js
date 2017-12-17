var KEYCODE_LEFT = 65, l_down = false,
    KEYCODE_RIGHT = 68, r_down = false,
    KEYCODE_UP = 87, u_down = false,
    KEYCODE_DOWN = 83, d_down = false,
    KEYCODE_SPACE = 32, space_down = false,
    KEYCODE_E = 69, e_down = false; 
var stage;
var item;
var player, background, water;
var circle, x = 200, y = 200, speed = 2;
var player_r = 10;
var last_time = 0, time = 0;
var cooldown = 50;

// All objects
var thrown = [], enemies = [], items = [];

function keyDowned(event) {
    switch(event.keyCode) {
        case KEYCODE_LEFT:
            l_down = true;
            break;
        case KEYCODE_RIGHT:
            r_down = true;
            break;
        case KEYCODE_UP: 
            u_down = true;
            break;
        case KEYCODE_DOWN:
            d_down = true;
        break;
        case KEYCODE_SPACE:
            space_down = true;
        break;
        case KEYCODE_E:
            e_down = true;
        break;
    }
}

function keyUpped(event) {
    switch(event.keyCode) {
        case KEYCODE_LEFT:
            l_down = false;
            break;
        case KEYCODE_RIGHT:
            r_down = false;
            break;
        case KEYCODE_UP: 
            u_down = false;
            break;
        case KEYCODE_DOWN:
            d_down = false;
        break;
        case KEYCODE_SPACE:
            space_down = false;
        break;
        case KEYCODE_E:
            e_down = false;
        break;
    }
}

function playSoundtrack(event) {
    var instance = createjs.Sound.play(event.src);
    instance.on("complete", playSoundtrack);
    instance.volume = 0.5;
}
    
function start() { 

    createjs.Sound.alternateExtensions = ["ogg"];
    createjs.Sound.addEventListener("fileload", playSoundtrack);
    createjs.Sound.registerSound("./assets/soundtrack.mp3", "sound");

    screen = document.getElementById('screen');
    screen.width = window.innerWidth;
    screen.height = window.innerHeight;
    
    stage = new createjs.Stage(document.getElementById("screen"));

    water = new createjs.Shape();
    stage.addChild(water); var img2 = new Image();
    img2.onload = function(){
         water.graphics.beginBitmapFill(img2, 'repeat');
         water.graphics.setStrokeStyle(1);
         water.graphics.beginStroke(createjs.Graphics.getRGB(255,255,0));
         water.graphics.drawRect(-1000,-1000,3000,3000);
    }
    img2.src = "./assets/water.png";


    background = new createjs.Shape();
    stage.addChild(background); var img = new Image();
    img.onload = function(){
         background.graphics.beginBitmapFill(img, 'repeat');
         background.graphics.setStrokeStyle(20);
         background.graphics.beginStroke(createjs.Graphics.getRGB(255,255,0));
         background.graphics.drawRect(0,0,1000,1000);
    }
    img.src = "./assets/Terrain/Textures/g_gr2_00_COLOR.png";

    /// Load animations
    var data = {images: ["./assets/chars.png"],
                    frames: {width:52, height:73},
                    animations: {
                        up: { frames: [36,37,38], frequency: 10},
                        down: { frames: [0,1,2], frequency: 10},
                        right: { frames: [24,25,26], frequency: 10},
                        left: { frames: [12,13,14], frequency: 10},
                }
        };

    var spriteSheet = new createjs.SpriteSheet(data);

    player = new createjs.BitmapAnimation(spriteSheet);
    player.gotoAndPlay("down"); 
    stage.addChild(player);

    player.x = screen.width/2;      
    player.y = screen.height/2
    stage.update();

    for (i = 0; i < 3; i++)
    {
        enemies.push(new Enemy(stage, Math.random()*1000, Math.random()*1000, 10, Math.random() + 0.5));
    }
    
    this.document.onkeydown = keyDowned;
    this.document.onkeyup = keyUpped;   

    createjs.Ticker.setFPS(60);
    setInterval(loop, 10);

    thrown.push(new Item(stage, 50, 50));
}
var last = [0,0,0,0]

function in_intersection(obj1, obj2) {
    return Math.pow((Math.pow(obj1.sprite.x - obj2.sprite.x, 2) + Math.pow(obj1.sprite.y - obj2.sprite.y, 2)), 0.5) <= (obj1.r + obj2.r)
}

function loop(){
    var s = speed;
    if ((l_down || r_down) && (u_down || d_down)){
        s /= Math.sqrt(2);
    }
    dx = l_down ? s : r_down ? -s : 0
    dy = u_down ? s : d_down ? -s : 0

    if(background.x + dx - 25 > player.x || background.x + 1000 - 25 + dx < player.x)
        dx = 0;
    if(background.y + dy - 60 > player.y || background.y + 1000 - 60 + dy < player.y)
        dy = 0;

    if ([u_down, d_down, r_down, l_down].toString() != last.toString()){
        if (r_down)
            player.gotoAndPlay("right");
        if (l_down)
            player.gotoAndPlay("left"); 
        if (u_down)
            player.gotoAndPlay("up"); 
        if (d_down)
            player.gotoAndPlay("down");
        last = [u_down, d_down, r_down, l_down]
    }

    if (! (l_down || r_down || u_down || d_down))
        player.stop();
    //createjs.Tween.get(player).to({x:x, y:y}, 10);
    background.x = background.x + dx;
    background.y = background.y + dy;
    water.x = water.x + dx
    water.y = water.y + dy

    thrown.forEach(function(entry) {
        entry.tick(dx, dy);
    });


    enemies.forEach(function(entry) {
        var ball = entry.tick(dx, dy, player);
        if(ball != 0)
            thrown.push(ball);
    });

    enemies.forEach(function(enemy) {
        thrown.forEach(function(ball) {
            if(in_intersection(enemy, ball)) {
                console.log('intersection')
            }
        });
    });


    if(space_down && time-last_time > cooldown){
        thrown.push(new Throwable(stage, player.x, player.y, "./assets/asteroid.png", 1000, Math.atan2(dx,dy)*180/3.1415+90, 5, 10));
        last_time = time
    }

    stage.update();
    time++;
}


