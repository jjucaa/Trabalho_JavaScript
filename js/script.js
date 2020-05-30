(function(){

	var cnv = document.querySelector("canvas");
	var ctx = cnv.getContext("2d");

	var gravity = 0.1;

	var start = 1, playing = 2, gameover = 3;
	var life = 3;
	var game = start;

	var points = 0;
	var timesPlayed = localStorage.getItem("timesPlayed") ? localStorage.getItem("timesPlayed") : 0;
	
	var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
	var px = 20, py = 25, tw = 40, th = 20;
	
	var mvLeft= mvRight = false;

	var bkgMusic = new Audio();
	var gameroverMusic = new Audio();
	var hitMusic = new Audio();
	var winMusic = new Audio();
	winMusic.src = "audio/win.ogg";
	gameroverMusic.src = "audio/gameover.ogg";
	hitMusic.src = "audio/impact.ogg";
	bkgMusic.src = "audio/8_bit.ogg";
	bkgMusic.loop = true;

	var msg = [];
	var sprites = [];
	var blocks = [];
	var scoreList = [];
	var topFive = [];

	var ball = {
		radius: 20,
		vx: 0,
		vy: 0,
		x: 220,
		y: 250,
		color: '#000',
		touched: false,
		visible: false,
	};
	var character = new Sprite(50, 480, 80, 10, "#00f");
	character.speed = 6;
	sprites.push(character);

	var block1 = new Sprite(px, py, tw, th, "#f00");
	sprites.push(block1);
	blocks.push(block1);
	
	var block2 = new Sprite(px = px + 40, py, tw, th, "#0f0");
	sprites.push(block2);
	blocks.push(block2);
	
	var block3 = new Sprite(px = px + 40, py, tw, th, "#00f");
	sprites.push(block3);
	blocks.push(block3);

	var block4 = new Sprite(px = px + 40, py, tw, th, "#f00");
	sprites.push(block4);
	blocks.push(block4);

	var block5 = new Sprite(px = px + 40, py, tw, th, "#0f0");
	sprites.push(block5);
	blocks.push(block5);
	
	var block6 = new Sprite(px = px + 40, py, tw, th, "#00f");
	sprites.push(block6);
	blocks.push(block6);

	var block7 = new Sprite(px = px + 40, py, tw, th, "#f00");
	sprites.push(block7);
	blocks.push(block7);

	var block8 = new Sprite(px = px + 40, py, tw, th, "#0f0");
	sprites.push(block8);
	blocks.push(block8);

	var block9 = new Sprite(px = px + 40, py, tw, th, "#00f");
	sprites.push(block9);
	blocks.push(block9);

	var block10 = new Sprite(px = px + 40, py, tw, th, "#f00");
	sprites.push(block10);
	blocks.push(block10);

	var block11 = new Sprite(px = 20, py = py + 20, tw, th, "#0f0");
	sprites.push(block11);
	blocks.push(block11);

	var block12 = new Sprite(px = px + 40, py, tw, th, "#00f");
	sprites.push(block12);
	blocks.push(block12);

	var block13 = new Sprite(px = px + 40, py, tw, th, "#f00");
	sprites.push(block13);
	blocks.push(block13);

	var block14 = new Sprite(px = px + 40, py, tw, th, "#0f0");
	sprites.push(block14);
	blocks.push(block14);

	var block15 = new Sprite(px = px + 40, py, tw, th, "#00f");
	sprites.push(block15);
	blocks.push(block15);

	var block16 = new Sprite(px = px + 40, py, tw, th, "#f00");
	sprites.push(block16);
	blocks.push(block16);

	var block17 = new Sprite(px = px + 40, py, tw, th, "#0f0");
	sprites.push(block17);
	blocks.push(block17);

	var block18 = new Sprite(px = px + 40, py, tw, th, "#00f");
	sprites.push(block18);
	blocks.push(block18);

	var block19 = new Sprite(px = px + 40, py, tw, th, "#f00");
	sprites.push(block19);
	blocks.push(block19);

	var block20 = new Sprite(px = px + 40, py, tw, th, "#0f0");
	sprites.push(block20);
	blocks.push(block20);

	var startmsg = {
		text: "HERE COMES A NEW CHALLANGER",
		y: cnv.height/2 - 200,
		font: "bold 20px Arial",
		color: "#30008A",
		visible: true
	};

	msg.push(startmsg);

	var winmsg = {
		text: "Você Venceu!!!",
		y: cnv.height/2 - 100,
		font: "bold 20px Arial",
		color: "#30008A",
		visible: false
	};

	msg.push(winmsg);

	var losemsg = {
		text: "Você Perdeu!!!",
		y: cnv.height/2 - 100,
		font: "bold 20px Arial",
		color: "#f00",
		visible: false
	};

	msg.push(losemsg);

	var pointsText = Object.create(startmsg);
	pointsText.visible = false;
	pointsText.y = (cnv.height/2) - 50;

	msg.push(pointsText);

	var timesPlayedText = Object.create(startmsg);
	timesPlayedText.visible = false;
	timesPlayedText.y = (cnv.height/2) - 10;

	msg.push(timesPlayedText);

	var topmsg = {
		y: cnv.height/2 + 100,
		font: "bold 23px Arial",
		color: "#30008A",
		visible: false
	}

	msg.push(topmsg);

	let statButton = document.getElementById("start_game");
	statButton.onclick = function(){
		bkgMusic.play();
		startGame();
	}

	let restartButton = document.getElementById("restart_game");
	restartButton.onclick = function(){
		loading();
	}

	function loading(){
		switch(game){
			case playing:
				game = start;
				startGame();
				break;
			case gameover:
				game = start;
				startGame();
		}
	}
	
	window.addEventListener("keydown",function(e){
		var key = e.keyCode;
		switch(key){
			case LEFT:
				mvLeft = true;
				break;
			case RIGHT:
				mvRight = true;
				break;
		}
	},false);
	
	window.addEventListener("keyup",function(e){
		var key = e.keyCode;
		switch(key){
			case LEFT:
				mvLeft = false;
				break;
			case UP:
				mvUp = false;
				break;
			case RIGHT:
				mvRight = false;
				break;
			case DOWN:
				mvDown = false;
				break;
		}
	},false);

	function startGame(){
		if(game === start){
			px = 20, py = 25, tw = 40, th = 20;
			for(var i in blocks){
				var blk = blocks[i];
				if(i == 0){
					px = 20;
					blk.posX = px;
					blk.posY = py;
				}else if(i < 10){
					px = px + 40;
					blk.posX = px;
					blk.posY = py;
				}else if(i == 10){
					px = 20;
					py = py + 20;
					blk.posX = px;
					blk.posY = py;
				} else if(i < 20){
					px = px + 40;
					py = 45;
					blk.posX = px;
					blk.posY = py;
				}
			}

			game = playing;
			winmsg.visible = false;
			losemsg.visible = false;
			startmsg.visible = false;
			topmsg.visible = false;
			character.visible = true;
			life = 3;
			points = 0;	
			for(var i in blocks){
				var blk = blocks[i];
				blk.visible = true;
			}
			ball.vx = Math.floor(Math.random()*21) - 10;
			ball.vy = 0;
			ball.x = Math.floor(Math.random()*260) + 20;
			ball.y = 250;
			pointsText.visible = false;
			timesPlayedText.visible = false;
			ball.visible = true;
		}
	}

	function continue_game(){
		character.visible = true;
		
		ball.vx = Math.floor(Math.random()*21) - 10;
		ball.vy = 0;
		ball.x = Math.floor(Math.random()*260) + 20;
		ball.y = 250;
		pointsText.visible = false;
		timesPlayedText.visible = false;
		ball.visible = true;
	}
	
	function loop(){
		window.requestAnimationFrame(loop,cnv);
		if(game === playing){
			update();
		}
		render();
	}
	
	function update(){
		ball.vy += gravity;
		ball.y += ball.vy;
		ball.x += ball.vx;

		if(ball.x + ball.radius > cnv.width || ball.x - ball.radius < 0){
			if(ball.x - ball.radius < 0){
				ball.x = ball.radius;
			} else {
				ball.x = cnv.width - ball.radius;
			}
			hitMusic.play();
			ball.vx *= -0.8;
		}

		if(ball.y < ball.radius && ball.vy < 0){
			ball.y = ball.radius;
			ball.vy *= -1;
		}
		
		if(ball.y - ball.radius > cnv.height){
			if(life === 0){
				game = gameover;
				gameroverMusic.play();
				ball.visible = false;
				
				for(var i in blocks){
					var blk = blocks[i];
					blk.visible = false;
				}

					timesPlayed++;
					localStorage.setItem("timesPlayed",timesPlayed);

				scoreList.push(points);

				losemsg.visible = true;
				
				topScores();
				topmsg.text = "1°: " + topFive[0] + " | 2°: " + topFive[1] + " | 3°: " + topFive[2] + " | 4°: " + topFive[3] + " | 5°: " + topFive[4];
				topmsg.visible = true;

				pointsText.text = "YOUR SCORE: " + points;
				pointsText.visible = true;
				
				timesPlayedText.text = "Times Played: " + timesPlayed;
				timesPlayedText.visible = true;
				
				

			} else {
				life--;
				gameroverMusic.play();
				continue_game();
			}
		}

		if(points >= 20){
			game = gameover;
			ball.visible = false;

			timesPlayed++;
			localStorage.setItem("timesPlayed",timesPlayed);

			scoreList.push(points);

			winMusic.play();
			
			winmsg.visible = true;

			pointsText.text = "YOUR SCORE: " + points;
			pointsText.visible = true;
			
			timesPlayedText.text = "Times Played: " + timesPlayed;
			timesPlayedText.visible = true;

			topScores();
			topmsg.text = "1°: " + topFive[0] + " | 2°: " + topFive[1] + " | 3°: " + topFive[2] + " | 4°: " + topFive[3] + " | 5°: " + topFive[4];
			topmsg.visible = true;
			
		}

		if(mvLeft && !mvRight){
			character.posX -= character.speed;
		}
		if(mvRight && !mvLeft){
			character.posX += character.speed;
		}
		
		character.posX = Math.max(0, Math.min(cnv.width - character.width, character.posX));
		character.posY = Math.max(0, Math.min(cnv.height - character.height, character.posY));

		for(var i in blocks){
			var blk = blocks[i];
			if(blk.visible){
				if(ballRect(ball,blk)){
					blk.posX = 500;
					blk.posY = 600;
					if(blk.width >= ball.radius || blk.height <= ball.radius){
						ball.vy *= -0.9;
						ball.vx *= -0.9;
					} else {
						ball.vx *= 0.9;
						ball.vy *= 0.9;
					}
					hitMusic.play();
					points++;
				}
			}
		}

		if (ballRect(ball, character)) {
			ball.vy = ball.vy - 10;
			ball.vx = ball.vx - 10;
			hitMusic.play();
		}
	}
	
	function render(){
		ctx.clearRect(0,0,cnv.width,cnv.height);

		if(ball.visible){
			ctx.fillStyle = ball.color;
			ctx.beginPath();
			ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
			ctx.closePath();
			ctx.fill();
			ctx.font = "bold 15px Arial";
			ctx.fillStyle = "#00f";
			ctx.fillText("POINTS: " + points,10,20);
		}

		for(var i in msg){
			var m = msg[i];
			if(m.visible){
				ctx.font = m.font;
				ctx.fillStyle = m.color;
				ctx.fillText(m.text,(cnv.width - ctx.measureText(m.text).width)/2,m.y);
			}
		}

		for(var i in sprites){
			var spr = sprites[i];
			if(spr.visible){
				ctx.fillStyle = spr.color;
				ctx.fillRect(spr.posX, spr.posY, spr.width, spr.height);
			}
		}
	}

	function topScores() {

		topFive = [...scoreList].sort((a,b) => b-a).slice(0,5);
		if(topFive.length < 2){
			topFive[1] = 0;
			topFive[2] = 0;
			topFive[3] = 0;
			topFive[4] = 0;
		} else if(topFive.length < 3){
			topFive[2] = 0;
			topFive[3] = 0;
			topFive[4] = 0;
		} else if(topFive.length < 4){
			topFive[3] = 0;
			topFive[4] = 0;
		} else if(topFive.length < 5){
			topFive[4] = 0;
		}
		console.log(topFive);
	}
	loop();
}());