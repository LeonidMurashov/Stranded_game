var KEYCODE_LEFT = 65, l_down = false,
	KEYCODE_RIGHT = 68, r_down = false,
	KEYCODE_UP = 87, u_down = false,
	KEYCODE_DOWN = 83, d_down = false,
	KEYCODE_SPACE = 32, space_down = false,
	KEYCODE_E = 69, e_down = false; 
var stage;
var asteroid;
var circle, x = 200, y = 200, speed = 2;


function keyDowned(event) {
	console.log(event.keyCode);
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

    screen = document.getElementById('screen');
    screen.width = window.innerWidth;
    screen.height = window.innerHeight;
    

	/*var data = {images: ["./assets/chars.png"],
					frames: {width:52, height:72},
					animations: {
						up: { frames: [36,37,38], frequency: 10},
						down: { frames: [0,1,2], frequency: 10},
						right: { frames: [24,25,26], frequency: 10},
						left: { frames: [12,13,14], frequency: 10},
            	}
		};*/
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

	var asteroid = new createjs.BitmapAnimation(spriteSheet);
	asteroid.gotoAndPlay("up"); 


	//asteroid = new createjs.Bitmap("./asteroid.png");
	asteroid.x = asteroid.y = 200;		

	stage = new createjs.Stage(document.getElementById("screen"));
	stage.addChild(asteroid);
    stage.addChild(circle);
	stage.update();
	
	this.document.onkeydown = keyDowned;		
	this.document.onkeyup = keyUpped;	

	createjs.Ticker.setFPS(60);

	var last = [0,0,0,0]
	a = function(){
		var s = speed;
		if ((l_down || r_down) && (u_down || d_down)){
			s /= Math.sqrt(2)
		}
		x += l_down ? -s : r_down ? +s : 0
		y += u_down ? -s : d_down ? +s : 0
		
		if ([u_down, d_down, r_down, l_down].toString() != last.toString()){
			if (r_down)
				asteroid.gotoAndPlay("right"); 
			if (l_down)
				asteroid.gotoAndPlay("left"); 
			if (u_down)
				asteroid.gotoAndPlay("up"); 
			if (d_down)
				asteroid.gotoAndPlay("down"); 
			last = [u_down, d_down, r_down, l_down]
		}

		if (! (l_down || r_down || u_down || d_down))
			asteroid.stop();
		//createjs.Tween.get(asteroid).to({x:x, y:y}, 10);
		asteroid.x = x
		asteroid.y = y
		stage.update();
	}

	setInterval(a, 10);
}

