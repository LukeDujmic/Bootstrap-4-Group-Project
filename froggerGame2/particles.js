class Particle
{
    constructor(x, y)                   // constructor sets up variables such basic size of projectiles and their randomization
    {
        this.x = x + 25;
        this.y = y + 25;
        this.radius = Math.random() * 15 + 1;       //radius starts between 1 and 16
        this.opacity = 1;
        this.directionX = Math.random() * 4 - 2;            //distance particle travels is between 2 and -2 in either x or y direction
        this.directionY = Math.random() * 4 - 2;            
    }
    draw()
    {
        ctx3.fillStyle = 'rgba(150, 150, 150,' + this.opacity+ ')';     // filling up the particle stay with the color gray for when the frog is on a street
        ctx3.beginPath();
        ctx3.arc(this.x, this.y, this.radius, 0, Math.PI * 2);      // makes the particle a circle
        ctx3.fill();                //fills up the particle to be a solid circle
        ctx3.closePath();
    }
    update()
    {
        this.x += this.directionX;      // directional movement
        this.y += this.directionY;
        if (this.opacity > 0.1)         // particle gets moree transparent over time
        {
            this.opacity -= 0.9;
        }
        if (this.radius > 0.25)         // particle gets smaller over time, eventually disappearing
        {
            this.radius -= 0.25;
        }
    }
    drawRipple()
    {
        ctx1.strokeStyle = 'rgba(255, 255, 255,' + this.opacity + ')';  // ripple is a circle that isn't filled but is just a border (stroke)
        ctx1.beginPath();
        ctx1.arc(this.x, this.y, this.radius, 0, Math.PI * 2);      // full circle
        ctx1.stroke();      // makes the circle just a border, no filling
        ctx1.closePath();
    }
    ripple()
    {
        if (this.radius < 50)
        {
            this.radius += 0.5;         //ripple gets bigger over time, like they would in water in real life
            this.x -= 0.0275;   
            this.y -= 0.0275;
        }
        if (this.opacity > 0)
        {
            this.opacity -= 0.02;       // as the ripple expands, it becomes more transparent, eventually becoming invisible
        }
    }
    drawGrass()
    {
        ctx3.fillStyle = 'rgba(34, 139, 34,' + this.opacity+ ')';       // grass particles are like the street dust but green.  they appear on the green grass
        ctx3.beginPath();
        ctx3.arc(this.x, this.y, this.radius, 0, Math.PI * Math.random() * 2);      // the circles for the grass particles changle shape randomly, from full circle to only a fragment of a circle
        ctx3.fill();
        ctx3.closePath();
    }
    grass()
    {
        this.x += this.directionX;
        this.y += this.directionY;
        if (this.opacity > 0.2)
        {
            this.opacity -= 0.05;       // becomes more transparent over time
        }
        if (this.radius > 0.2)
        {
            this.radius -= 0.2;         // becomes smaller over time
        }
    }
}

function handleParticles()
{
    //dust
    for (let i = 0; i < particlesArray.length; i++)     // adding more particles with a for loop
    {
    particlesArray[i].update();     // activating the visual functions
    particlesArray[i].draw();
    }
    if (particlesArray.length > maxParticles)       // if there are more particles than the 'max particles' variable says, start to remove the last particles
    {
        for (let i = 0; i < 20; i++)
        {
            particlesArray.pop();
        }
    }
    if (((keys[37] || keys[38] || keys[39] || keys[40])) && frogger.y > 410 && particlesArray.length < maxParticles + 10)   // whenever the frog uses one of the arrows keys, it creates particles at its position and new positon as long as its within the street.  
                                                                                                                            //Its on the street row if the frogger.y value is equal to the row position which relates to the street
    {
        for (let i = 0; i < 10; i++)
        {
            particlesArray.unshift(new Particle(frogger.x, frogger.y));
        }
    }
    if (((keys[37] || keys[38] || keys[39] || keys[40])) && frogger.y < 180 && frogger.y > 80 && particlesArray.length < maxParticles + 10) // creating dust particles at the other street above the river
    {
        for (let i = 0; i < 10; i++)
        {
            particlesArray.unshift(new Particle(frogger.x, frogger.y));
        }
    }


}
function handleRipples()
{
    //water ripples
    for (let i = 0; i < ripplesArray.length; i++)       // creating ripples in an array
    {
    ripplesArray[i].ripple();
    ripplesArray[i].drawRipple();
    }
    if (ripplesArray.length > 20)       // if there are too many ripples (20), start removing the oldest ripples
    {
        for (let i = 0; i < 5; i++)
        {
            ripplesArray.pop();
        }
    } 
    if (((keys[37] || keys[38] || keys[39] || keys[40])) && frogger.y < 410 && frogger.y > 260 && particlesArray.length < maxParticles + 10)    // ripples only generate if frogger.y is in the river area on the canvas
    {
        for (let i = 0; i < 10; i++)
        {
            ripplesArray.unshift(new Particle(frogger.x, frogger.y));       // removing the first ripples in the array (the oldest ones)
        }
    }
}
function handleGrass()          //grass particles will be active past the river, on the two rows around the single-lane street with grass
{
    //grass particles
    for (let i = 0; i < grassArray.length; i++)
    {
    grassArray[i].grass();
    grassArray[i].drawGrass();
    }
    if (grassArray.length > 20)
    {
        for (let i = 0; i < 5; i++)     // remove particles 5 at a time if there are more than 20 at a time
        {
            grassArray.pop();
        }
    } 
    if (((keys[37] || keys[38] || keys[39] || keys[40])) && frogger.y < 260 && frogger.y > 180 && grassArray.length < maxParticles + 10)  // I don't need to repeat this... if frog in grass area, grass particles!!!
    {
        for (let i = 0; i < 20; i++)
        {
            grassArray.unshift(new Particle(frogger.x, frogger.y));
        }
    }
    if (((keys[37] || keys[38] || keys[39] || keys[40])) && frogger.y < 80 && grassArray.length < maxParticles + 10)    // you get it!!! grass appears in grass area!
    {
        for (let i = 0; i < 20; i++)
        {
            grassArray.unshift(new Particle(frogger.x, frogger.y));
        }
    }
}
