enemyScore = 0;
playerScore = 0;

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.vel = (Math.floor((Math.random() *171) + 180 )); //randomly sets velocity from 180 to 350

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x + this.vel*dt);

//* if enemy goes off right side of canvas, reset it to left side
//* in a random row
    if (this.x > 505){

        this.x = -101;
        this.y = (62) + (Math.floor((Math.random() *3))) * 83;

    }

    player.checkCollide();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function() {

    x = 200;
    y = 390;
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;


};

Player.prototype.update = function(dt){

};

Player.prototype.render=function(){

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.reset=function(){

    this.y = 390;
    this.x = (-2) + (Math.floor((Math.random() *5))) * 101;


};

Player.prototype.moveup=function(){

    if (this.y == 58) {

        playerScore = playerScore + 1;
        scoreUpdate();
        this.reset();
   }  else {

        this.y = (this.y - 83);

   }

};

Player.prototype.movedown=function(){

    if (this.y !== 390){

        this.y = (this.y + 83);
   }
};

Player.prototype.moveright=function(){

    if (this.x !== 402){

        this.x = (this.x + 101);
   }

};

Player.prototype.moveleft=function(){

    if (this.x !== -2){

        this.x = (this.x - 101);

  }

};


Player.prototype.checkCollide = function() {
  for (var i = 0; i < allEnemies.length; i++) {

// * Check each enemy to see if it overlaps with player
    var enemy = allEnemies[i];

    if (this.x + 66 >= enemy.x &&
        this.x < enemy.x + 101 &&
        this.y + 85 >= enemy.y &&
        this.y < enemy.y + 75) {
        enemyScore = enemyScore + 1;
        scoreUpdate();
        this.reset();
    }

  }

};


Player.prototype.handleInput = function(keypressed){

    switch (keypressed)

    {

       case 'up':
            this.moveup();
            break;

       case 'down':
            this.movedown();
            break;

       case 'right':
            this.moveright();
            break;

       case 'left':
            this.moveleft();
            break;


   }

};

var scoreUpdate = function(){

    ctx.clearRect(0,0, 505, 50);
    ctx.font = "20px Ariel";
    ctx.fillText("Player score:"+ playerScore, 20,30);
    ctx.fillText("Enemy score:" + enemyScore, 300,30);

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(0,62);
var enemy2 = new Enemy(0,145);
var enemy3 = new Enemy(0,228);
var player = new Player();
var allEnemies = [enemy1,enemy2,enemy3];

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
