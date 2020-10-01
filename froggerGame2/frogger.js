class Frogger
{
    constructor()       // the frogger object's properties
    {
        this.spriteWidth = 250;     // the pixel size of the frog sprite
        this.spriteHeight = 250;
        this.width = this.spriteWidth/5;        // the size that the frog will be in game
        this.height = this.spriteHeight/5;
        this.x = canvas.width/2 - this.width/2;     // the position of the frog in the canvas
        this.y = canvas.height - this.height - 40;      // making sure the frog is centered
        this.moving = false;
        this.frameX = 0;        // the frame of the frog for its sprite animation
        this.frameY = 0;
    }
    update()
    {
        //console.log("update");
        if (keys[38] || keys[87]) //up
        {
            if (this.moving === false)
            {
                this.y -= grid;     // moves 80 pixels, which is the size of a grid space.  This means the frog moves to another grid in any direction
                this.moving = true;
                this.frameX = 1;        // animating the frog based on its direction (uses the frames in the spritesheet)
                this.frameY = 0;
            }
        }
        if (keys[40] || keys[83]) //down
        {
            if (this.y < canvas.height - this.height * 2 && this.moving === false)
            {
                this.y += grid;
                this.moving = true;
                this.frameY = 3;    // animating the frog based on its direction
            }
        }
        if (keys[37] || keys[65]) //left
        {
            if (this.x > this.width && this.moving === false)
            {
                this.x -= grid;
                this.moving = true;
                this.frameY = 2;        // animating the frog based on its direction
            }
        }
        if (keys[39] || keys[68]) //right
        {
            if (this.x < canvas.width - this.width * 2 && this.moving === false)
            {
                this.x += grid;
                this.moving = true;
                this.frameY = 1;        // animating the frog based on its direction
            }
        }
        if (this.y < 0) scored();   // if the frog is past the top of the canvas when moving, then activate the score function
    }
    draw()
    {
        ctx3.fillStyle = 'green';
        //ctx3.fillRect(this.x, this.y, this.width, this.height);
        ctx3.drawImage(froggerSprite, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - 25, this.y -25, this.width * 2, this.height * 2);

    }
    jump()
    {
        console.log('jump');        // just checking if the function is registering
        if (this.moving === false)      // if the frog isn't moving, then its the right set of frames    (legs stretched/ jumping)
        {
            this.frameX = 1;
        }
        else if (this.frameX === 1)     // if the frog is moving, then its the left set of frames (standing)
        {
            this.frameX = 0;
        }
    }
}

const frogger = new Frogger();      // creates that frog object that we all know and love!