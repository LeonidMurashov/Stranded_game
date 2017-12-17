var KEYCODE_LEFT = 65, l_down = false,
    KEYCODE_RIGHT = 68, r_down = false,
    KEYCODE_UP = 87, u_down = false,
    KEYCODE_DOWN = 83, d_down = false,
    KEYCODE_SPACE = 32, space_down = false,
    KEYCODE_E = 69, e_down = false; 
var stage;
var player, background;
var circle, x = 200, y = 200, speed = 2;


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
    
function start() { 
    // Loader image
    examples.showDistractor();

    screen = document.getElementById('screen');
    screen.width = window.innerWidth;
    screen.height = window.innerHeight;
    
    stage = new createjs.Stage(document.getElementById("screen"));

   // bg = new createjs.Bitmap("./assets/Terrain/Textures/g_gr2_00_COLOR.png");
    //bg.x = bg.y = 0;
    //stage.addChild(bg);

    document.body.style.background = "blue";
    //water = new createjs.Shape();
    //water.x = -1000, water.y = -1000

    background = new createjs.Shape();
    stage.addChild(background); var img = new Image();
    img.onload = function(){
         background.graphics.beginBitmapFill(img, 'repeat');
         background.graphics.setStrokeStyle(20);
         background.graphics.beginStroke(createjs.Graphics.getRGB(255,255,0));
         background.graphics.drawRect(0,40,1000,1000);
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

    player = new createjs.BitmapAnimation(spriteSheet);
    player.gotoAndPlay("up"); 
    stage.addChild(player);

    player.x = screen.width/2;      
    player.y = screen.height/2
    stage.update();
    
    this.document.onkeydown = keyDowned;        
    this.document.onkeyup = keyUpped;   

    createjs.Ticker.setFPS(60);

    examples.hideDistractor();
    setInterval(loop, 10);
}
    var last = [0,0,0,0]

function loop(){
        var s = speed;
        if ((l_down || r_down) && (u_down || d_down)){
            s /= Math.sqrt(2);
        }
        x -= l_down ? -s : r_down ? +s : 0
        y -= u_down ? -s : d_down ? +s : 0
        
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
        background.x = x;
        background.y = y;
        stage.update();
    }


    /*var imgData = new createjs.Bitmap("./assets/heightmap_tmp.png")
    var pixel = new Array();
    for(i=0;i<imgData.height;i++){
        pixel[i] = new Array();
        for(j=0;j<imgData.width;j++){
            pixel[i][j] = imgData.data[i*canvas.width+j*4];
        }
    }*/