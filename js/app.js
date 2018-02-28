
/*
 developed by Ahmed Wassef
 Gmail : Ahmedwassef2015@gmail.com

* */
// player  scoore global variable

var score=0 ;
document.getElementById("score").style.visibility = "hidden";
document.getElementById("text").style.visibility = "hidden";


var Enemy = function(x, y, speed) {

    this.x = x;
    this.y = y;
    this.speed = speed;

    this.sprite = 'images/enemy-bug.png';
};


Enemy.prototype.update = function(dt) {

    dt = 3;
    if(score < 10) {
        dt = 1;
        this.x += ( (Math.pow(dt, 1)+1) * this.speed);
    }
    else if(score<= 10) {
        this.x += ( (Math.pow(dt, 1)+1) * this.speed);
    }
    else if(score==20) {
        this.x += ( (Math.pow(dt, 1)+2) * this.speed);
    } else if(score==30) {
        this.x += ( (Math.pow(dt, 1)+3) * this.speed);
    } else if(score==40) {
        this.x += ( (Math.pow(dt, 1)+4) * this.speed);
    }
    else{
        document.getElementById("text").innerHTML = " wow! you win";
        document.getElementById("text").style.background = "#FD5B03";
        document.getElementById("text").style.height = "40%";
    }
};
Enemy.prototype.Collisions = function() {
    // Collision detection algorithm
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    var anmyCollide = {
        x: this.x,
        y: this.y,
        width: 50,
        height: 50,
    };

    var playerCollide = {
        x: player.x,
        y: player.y,
        width: 50,
        height: 50,
    };

    if (anmyCollide.x < playerCollide.x + playerCollide.width &&
        anmyCollide.x + anmyCollide.width > playerCollide.x &&
        anmyCollide.y < playerCollide.y + playerCollide.height &&
        anmyCollide.height + anmyCollide.y > playerCollide.y) {

        player.x = 200;
        player.y = 400;
        score -=10;
        document.getElementById("score").style.visibility = "visible";
        document.getElementById("text").style.visibility = "visible";
        document.getElementById("text").innerHTML = "opps !, try again &#9849";
        document.getElementById("score").innerHTML = " your score is down to : "+score;
        document.getElementById("text").style.background = "#E01931";
        document.getElementById("score").style.background = "#FD5B03";

    }
};


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.reset();
    this.Collisions();
};



Enemy.prototype.reset = function resetBug() {

    if (this.x > 500) {
        this.x = -100;
    }

};

var myArray = ["images/char-cat-girl.png","images/char-princess-girl.png","images/char-boy.png", "images/char-pink-girl.png", "images/char-horn-girl.png"];

var pl_cha =myArray[Math.floor(Math.random() * myArray.length)];

var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = pl_cha;

};

Player.prototype.update = function(dt) {

    dt = 1;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.y <= 5) {
        this.x=0;
        this.y=0;
        this.x = 200;
        this.y = 400;
        score+=10;
        document.getElementById("score").style.visibility = "visible";
        document.getElementById("text").style.visibility = "visible";
        document.getElementById("text").innerHTML = "WOW , you are awesome &#9836;";
        document.getElementById("text").style.background = "#8870FF";
        document.getElementById("score").innerHTML = " your score is up to : "+score;
        document.getElementById("score").style.background = "#71BA51";


    }};
Player.prototype.handleInput = function(allowedKeys) {

    if (allowedKeys == 'up') {
        this.y = this.y - 80;
    }
    else if(allowedKeys == 'right') {
        this.x = this.x + 101;
    } else if (allowedKeys == 'down') {
        this.y = this.y + 83;
    } else if (allowedKeys == 'left') {
        this.x = this.x - 101;
    }

    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y > 400) {
        this.y = 400;
    }
};


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var amy1 = new Enemy(0, getRandomInt(10,90), getRandomInt(1,2));
var amy2 = new Enemy(0,  getRandomInt(100,190),  getRandomInt(1,2));
var amy3 = new Enemy(0, getRandomInt(200,240),  getRandomInt(1,1));

var allEnemies = [amy1, amy2, amy3];

var player = new Player(200, 400);
var player1 = new Player(200, 400);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
