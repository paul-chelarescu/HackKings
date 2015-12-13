//initializing canvas
var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),

//full width and height
w = window.innerWidth,
h = window.innerHeight;

canvas.height = h;
canvas.width = w;

var reset, scoreText, menu, reMenu, score = 0;

function init() {
	menu=startMenu();
	menu.style.zIndex = "-1";

	var snake,
		size = 10,
		//speed = 25,
		dir,
		game_loop,
		over = 0,
		hitType;

	//custom funny gameover messages
	var msgsSelf = [];
	msgsSelf[0] = "There's plenty of food...Too bad you couldn't eat it.";
	msgsSelf[1] = "What's the matter? You got fat too fast? Try fitness...";
	msgsSelf[2] = "Ouch! That must've hurt...";
	msgsSelf[3] = "Where's your head, huh?!";
	msgsSelf[4] = "Nice try, you cannibal...";

	var msgsWall = [];
	msgsWall[0] = "You know, there's a wall on your face...";
	msgsWall[1] = "I wonder where that wall came from so suddenly";
	msgsWall[2] = "May the force be with...the wall";
	msgsWall[3] = "Hello from the other siiiiideeeee";
	msgsWall[4] = "I CAME IN LIKE A WREEEECKIIING BAAAAAAALL";

	function paintCanvas(){
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, w, h);
	}

	var Food = function(){
		this.x =Math.round(Math.random()*(w-size)/size);
		this.y = Math.round(Math.random()*(h-size)/size);

		this.draw = function(){
			ctx.fillStyle="white";
			ctx.fillRect(this.x*size, this.y*size, size, size);
		}
	}

	var f = new Food();

	//initialize the snake
	function initSnake(){
		var length = 10;
		snake = [];
		for(var i = length - 1; i>=0; i--){
			snake.push({x: i, y: 0});
		}
	}

	function paintSnake(){
		for(var i = 0; i < snake.length; i++){
			var s = snake[i];

			ctx.fillStyle = "white";
			ctx.fillRect(s.x*size, s.y*size, size, size);
		}
	}

	//CHANGE THIS ACCORDING TO SMS
	function updateSnake(){
		//update the position of the snake
		var head_x = snake[0].x;
		var head_y = snake[0].y;

		//get the directions
		document.onkeydown = function(e){
			var key = e.keyCode;
			//console.log(key);

			if(key == 37 && dir != "right") setTimeout(function() {dir = "left";}, 30);
			else if(key == 38 && dir != "down") setTimeout(function() {dir = "up";}, 30);
			else if(key == 39 && dir != "left") setTimeout(function() {dir = "right";}, 30);
			else if(key == 40 && dir != "up") setTimeout(function() {dir = "down";}, 30);

			if(key) e.preventDefault();
		}

		//directions
		if(dir == "right") head_x++;
		else if(dir == "left") head_x--;
		else if(dir == "up") head_y--;
		else if(dir == "down") head_y++;

		//move snake
		var tail = snake.pop();
		tail.x = head_x;
		tail.y = head_y;
		snake.unshift(tail);

		//wall collision
		if(head_x >= w/size || head_x <= -1 || head_y >= h/size || head_y <= -1){
			if(over == 0){
				hitType = "wall";
				gameover();
			}
			over++;
		}

		//food collision
		if(head_x == f.x && head_y == f.y){
			coll = 1;
			f =new Food();
			var tail = {x: head_x, y:head_y};
			snake.unshift(tail);
			score += 10;
			scoreText.innerHTML = "Score: " + score;
		}

		else {
			//check collision between snake parts
			for(var j = 1; j <snake.length; j++){
				var s = snake[j];
				if(head_x == s.x && head_y == s.y){
					if (over == 0){
						hitType = "self";
						gameover();
					}
					over++;
				}
			}				

		}
	}

	function draw(){
		paintCanvas();
		paintSnake();
		updateSnake();

		//draw food
		f.draw();
	}

	reset = function(){
		initSnake();
		f = new Food();
		reMenu.style.zIndex = "-1";
		dir = "right";
		over = 0;
		
		score = 0;
		scoreText.innerHTML = "Score: " + score;

		return;
	}

	function gameover(){
		clearInterval(game_loop);

		//get the gameover text
		var goText = document.getElementById("info2");

		//show the messages
		if(hitType == "wall"){
			goText.innerHTML = msgsWall[Math.floor(Math.random()* msgsWall.length)];
		}
		else if(hitType == "self"){
			goText.innerHTML = msgsSelf[Math.floor(Math.random()* msgsSelf.length)];
		} 

		reMenu.style.zIndex = "1";
	}

	reset();
}

//menus
function startMenu(){
	menu = document.getElementById("menu");
	reMenu = document.getElementById("reMenu");

	scoreText = document.getElementById("score");
	reMenu.style.zIndex = "-1"
	return menu;
}
