class Frogger {
    constructor(){
        this.sprideWidth = 250;
        this.spriteHeight = 250;
        this.width = this.sprideWidth/5;
        this.height = this.spriteHeight/5;
        this.x = canvas.width/2 - this.width/2;
        this.y = canvas.height - this.height - 40;
        this.moving = false;
        this.frameX = 0;
        this.frameY = 0;
    }
    update() {
        if(keys[38] || keys[87]) { ///up
            if(this.moving === false) {
                this.y -= grid;
                this.moving = true;
                this.frameX = 1;
                this.frameY = 0;
            }
        }
        if(keys[40] || keys[83]) { //down
            if(this.moving === false && this.y < canvas.height - this.height * 2) {
                this.y += grid;
                this.moving = true;
                this.frameY = 3;
            }
        }
        if(keys[37] || keys[65]) { //left
            if(this.moving === false && this.x > this.width) {
                this.x -= grid;
                this.moving = true;
                this.frameY = 2;
            }
        }
        if(keys[39] || keys[68]){ //right
            if(this.moving === false && this.x < canvas.width - this.width * 2) {
                this.x += grid;
                this.moving = true;
                this.frameY = 1;
            }
        }
        if(this.y < 0) scored();
    }
    draw() {
        ctx3.drawImage(froggerSprite, this.frameX  * this.sprideWidth, this.frameY * this.spriteHeight, this.sprideWidth, this.spriteHeight, this.x - 25, this.y- 25, this.width * 2, this.height * 2);
    }
    jump() {
        if(this.moving === false) this.frameX = 1;
        else if(this.frameX === 1) this.frameX = 0;
    }
}

const frogger = new Frogger();
