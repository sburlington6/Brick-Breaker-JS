//canvas settings
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;

//ball speed
var speed = 5;
var dx = speed;
var dy = -speed;

//theme settings
var background = "#A9F5E1";
var paddleColor = "#A4A4A4";
var ballColor = "#0095DD";
//var brickColor = "#0095DD";
var brickColor = '#'+Math.floor(Math.random()*16777215).toString(16);
var livesColor = "#0095DD";
var scoreColor = "#0095DD";
var font = "16px Arial";

//paddle settings
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;

//key settings
var rightPressed = false;
var leftPressed = false;
var spacePressed = false;

//brick settings
var brickPadding = 10;
var brickRowCount = 6;
var brickColumnCount = 5;
var brickWidth = (canvas.width-(brickRowCount*brickPadding*2-(brickPadding*2)))/brickRowCount;
//var brickWidth = 100;
var brickHeight = 20;
var brickOffsetTop = 30;

//score and lives settigns
var score = 0;
var lives = 3;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for(r=0; r<brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, status: 1 };
	}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	}
	else if(e.keyCode == 32) {
		if (!spacePressed)
		{
			startGame();
		}
		spacePressed = true;
	}
}
function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
	else if(e.keyCode == 32) {
		//spacePressed = false;
	}
}
function mouseMoveHandler(e) {
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width) {
		paddleX = relativeX - paddleWidth/2;
	}
}
function collisionDetection() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			var b = bricks[c][r];
			if(b.status == 1) {
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
					dy = -dy;
					b.status = 0;
					score++;
					if(score == brickRowCount*brickColumnCount) {
						alert("YOU WIN, CONGRATS!");
						document.location.reload();
					}
				}
			}
		}
	}
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = ballColor;
	ctx.fill();
	ctx.closePath();
}
function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = paddleColor;
	ctx.fill();
	ctx.closePath();
}
function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			if(bricks[c][r].status == 1) {
				var brickX = (r*(brickWidth+brickPadding))+brickPadding;
				var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = brickColor;
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}
function drawStart() {
	ctx.font = font;
	ctx.fillStyle = scoreColor;
	ctx.fillText("Press Space to Start", 8, 20);
}
function drawScore() {
	ctx.font = font;
	ctx.fillStyle = scoreColor;
	ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
	ctx.font = font;
	ctx.fillStyle = livesColor;
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
	ctx.fillStyle= background;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();

	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}
	if(y + dy < ballRadius) {
		dy = -dy;
	}
	else if(y + dy > canvas.height-ballRadius) {
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		}
		else {
			lives--;
			if(!lives) {
				alert("GAME OVER");
				document.location.reload();
			}
			else {
				x = canvas.width/2;
				y = canvas.height-30;
				dx = speed;
				dy = -speed;
				paddleX = (canvas.width-paddleWidth)/2;
			}
		}
	}

	if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 7;
	}
	else if(leftPressed && paddleX > 0) {
		paddleX -= 7;
	}

	x += dx;
	y += dy;
	requestAnimationFrame(draw);
}

drawStart();

function startGame()
{	
	//if(spacePressed) 
	{	
		//alert("GAME OVER");
		draw();
	}
	//alert("GAME OVER");
}

