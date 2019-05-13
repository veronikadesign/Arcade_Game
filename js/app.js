var rows = [63,146,229];
var wins = document.querySelector(".wins > span");
var winCount = 0;
var score = document.querySelector(".points > span");


// Enemies our player must avoid
// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
class Enemy{
  constructor(x,y,speed){
    this.x=Math.random()*-500;
    this.y=rows[Math.floor(Math.random()*rows.length)];
    this.speed= 100 + Math.random()*250;
    this.sprite = 'images/enemy-bug.png';
  }
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
update(dt) {
  //check for collision and reset player to initial position if collision is true
  if (this.x +81 >= player.x && this.x <= player.x && this.y +17 >=player.y && this.y -17 <= player.y){
    player.x = 202;
    player.y = 415;
  }
  this.x = this.x + (this.speed + (winCount*100))*dt;

  if(this.x > 505){
    this.x = (Math.random()*-505)-101;
    this.y=rows[Math.floor(Math.random()*rows.length)];
  }
  }

// Draw the enemy on the screen, required method for game
render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player{
  constructor(x,y,playerMove){
    this.x=202;
    this.y=415;
    this.playerMove=playerMove;
    this.sprite = 'images/char-boy.png';
  }

  update(dt) {
  // Stops player moving off of the canvas boundary
  if (this.y > 380) {
    this.y = 380;
  }
  if (this.x > 400) {
    this.x = 400;
  }
  if (this.x < 0) {
    this.x = 0;
  }
  // Increments win count if player reaches water
  if (this.y < 0) {
    this.x = 200;
    this.y = 380;

    winCount++;
    wins.innerText = winCount;
    score.innerText = winCount * 150;
  }
  }

  // Draw the enemy on the screen, required method for game
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(arrowKeyPressed) {
		switch (arrowKeyPressed) {
			case 'left':
				this.x -= this.playerMove + 50;
				break;
      case 'right':
				this.x += this.playerMove + 50;
				break;
			case 'up':
				this.y -= this.playerMove + 30;
				break;
			case 'down':
				this.y += this.playerMove + 30;
				break;
		}
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
for (var i = 0; i < 3; i++){
  let enemyEntity = new Enemy(0,0,0);
  allEnemies.push(enemyEntity);
}
let player = new Player(202, 415, 50);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
