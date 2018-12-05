let level = 1;
const myLevel = document.querySelector('#level');
myLevel.textContent = level;

var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    
    this.x = this.x + (this.speed*level*0.35*dt);//increases the speed when level increases

    if (this.x > 495) {
        this.x = 0;
    };
    //conditions for collisions
    if (this.x + 75 > player.x && this.x < player.x + 75 && this.y + 75 > player.y && this.y < player.y + 75) {
        player.reset();//resets the player position to initial position when collides with the enemy and decreases the speed
        level = 1;// after collision, level also comes back to 1
        myLevel.textContent = level;
    };
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
    }

    update() {
        if (player.y < -11) {
            
            level++;//level increases by 1.
            myLevel.textContent = level;
            this.reset();// resets the player to initial position
        }
    }

    render() {
        return ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //condition to move the player in all directions
    //and maintain the player to remains inside the canvas only
    handleInput(keyPress) {
        if (keyPress === 'left' && this.x > 0) {
            this.x = this.x - 101;
        } else if (keyPress === 'up' && this.y > 0) {
            this.y = this.y - 84;
        } else if (keyPress === 'right' && this.x < 303) {
            this.x = this.x + 101;
        } else if (keyPress === 'down' && this.y < 325) {
            this.y = this.y + 84;
        }
    }

    //function to reset the player position to initial position
    reset() {
        this.x = 201;
        this.y = 408;
    }
}

const player = new Player(201, 408);
const allEnemies = [new Enemy(0, 63, 175), new Enemy(0, 146, 200), new Enemy(0, 228, 150)];

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