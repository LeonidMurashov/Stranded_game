var KEYCODE_LEFT = 37, l_down = false,
KEYCODE_RIGHT = 39, r_down = false,
KEYCODE_UP = 38, u_down = false,
KEYCODE_DOWN = 40, d_down = false; 
var stage;
var asteroid;
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
	}
}
	
function start() { 
//document.canvas.style.backgroundColor = "red";
	asteroid = new createjs.Bitmap("./asteroid.png");
	asteroid.x = asteroid.y = 200;		

	stage = new createjs.Stage(document.getElementById("testCanvas"));
	stage.addChild(asteroid);
    stage.addChild(circle);
	stage.update();
	
	this.document.onkeydown = keyDowned;		
	this.document.onkeyup = keyUpped;	

createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener("tick", stage);

setInterval(loop, 0.01);
}

function loop(){
		x += l_down ? -speed : r_down ? +speed : 0
		y += u_down ? -speed : d_down ? +speed : 0
		console.log([u_down, d_down, r_down, l_down]);
  createjs.Tween.get(asteroid)
    .to({x:x,	y:y}, 100);

}
