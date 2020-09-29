class Obstacle
{
    constructor(x, y, width, height, speed, type)       // obstacle properties
    {
        this.x = x;                 //position
        this.y = y;
        this.width = width;         // size of obstacles
        this.height = height;
        this.speed = speed;         // speed of obstacles
        this.type = type;           // type of obstacle, which will consist of: cars, logs, turtles, spikeballs, and spikecars
        this.frameX = 0;            //frame of obstacle (for cars and turtles) to create variation
        this.frameY = 0;
        this.randomise = Math.floor(Math.random() * 30 + 30);       // randomizing the frame of the obstacle (turtles)
        this.carType = (Math.floor(Math.random() * numberOfCars));     // randomizing the car visual
    }
    draw()
    {
        if (this.type === 'turtle')     // if the obstacle is a turtle, check out the frames for the turtle animation
        {
            if (frame % this.randomise === 0)
            {
                if (this.frameX >= 1) this.frameX = 0;
                else this.frameX++;
                
                
            } 
            ctx1.drawImage(turtle, this.frameX * 70, this.frameY * 70, 70, 70, this.x, this.y, this.width, this.height);
        }
        else if (this.type === 'log')       // if the obstacle isn't a turtle then check if its a log
        {
            ctx1.drawImage(log, this.x, this.y, this.width, this.height);
        }
        else if (this.type === 'spikeball')     // if the obstacle isn't a log then check if its a spikeball
        {
            ctx2.drawImage(spikeBall, this.x, this.y, this.width, this.height);
        }
        else if (this.type === 'carspike')      // if the obstacle isn't a spikeball then check if its a carspike
        {
            ctx2.drawImage(carSpike, this.x, this.y, this.width, this.height);
        }
        else        // if the obstacle is none of the types above, then its just a car
        {
            //ctx2.fillRect(this.x, this.y, this.width, this.height);
            ctx2.drawImage(car, this.frameX * this.width, this.carType * this.height, grid * 2, grid, this.x, this.y, this.width, this.height);
        }
           // ctx1.fillRect(this.x, this.y, this.width, this.height);
           
        

        //ctx3.fillStyle = 'blue';
        //ctx3.fillRect(this.x, this.y, this.width, this.height);
    }
    update()
    {
        this.x += this.speed * gameSpeed;       // the movement speed of the obstacles is the speed variable times the game speed (which increases after each score increase)
        if (this.speed > 0)
        {
            if (this.x > canvas.width + this.width)     // if the obstacle moves, then determine the type of car
            {
                this.x = 0 - this.width;
                this.carType = (Math.floor(Math.random() * numberOfCars));
            }
        } 
        else
        {
            this.frameX = 1;                // default frame of the car
            if (this.x < 0 - this.width)
            {
                this.x = canvas.width + this.width;
                this.carType = (Math.floor(Math.random() * numberOfCars));
            }
        }

    }
}

function initObstacles()
{
    // lane 1
    for (let i = 0; i < 2; i++)     // creates 2 obstacles in this lane, that are both cars going right
    {
        let x = i * 350;
        carsArray.push(new Obstacle(x, canvas.height - grid * 2 - 20, grid * 2, grid, 1, 'car'));   
    }
    //lane 2
    for (let i = 0; i < 2; i++)     // creates 2 obstacles in this lane, that are both cars going left quickly
    {
        let x = i * 450;
        carsArray.push(new Obstacle(x, canvas.height - grid * 3 - 20, grid * 2, grid, -5, 'car'))
    }
    // lane 3
    for (let i = 0; i < 2; i++)   // creates 2 obstacles in this lane, that are both cars going left slightly faster with a small gap in between
    {
        let x = i * 350
        carsArray.push(new Obstacle(x, canvas.height - grid * 4 - 20, grid * 2, grid, 2, 'car'));
    }
    // lane 4
    for (let i = 0; i < 2; i++)     // creates 2 'helper obstacles' in this lane, that are both logs that the frog stands on and moves along with in order to not fall in the river, moving left
    {
        let x = i * 400;
        logsArray.push(new Obstacle(x, canvas.height - grid * 5 - 20, grid * 2, grid, -2, 'log'));
    }
    // lane 5
    for (let i = 0; i < 3; i++)    // creates 3 'helper obstacles' in this lane, that are turtles you stand on that move slowly to the right, only 1 grid space wide
    {
        let x = i * 220;
        logsArray.push(new Obstacle(x, canvas.height - grid * 6 - 20, grid, grid, 0.8, 'turtle'));
    }
    // lane 7
    for (let i = 0; i < 1; i++)     // creates 1 obstacle in the street above the river, its a special longer car thats 3 grid spaces wide, moving left quickly
    {
        let x = i * 300;
        carsArray.push(new Obstacle(x, canvas.height - grid * 8 - 30, grid * 3, grid, -3, 'carspike'));
    }
    // lane 6
    for (let i = 0; i < 3; i++)     // creates 3 obstacles in this lane after the river, that are harmful spike balls that take up 1 grid space, moving right
    {
        let x = i * 80;
        carsArray.push(new Obstacle(x, canvas.height - grid * 7 - 30, grid * 1, grid, 1.8, 'spikeball'));
    }

    

}
initObstacles();        // initialize the obstacles

function handleObstacles()
{
    for (let i = 0; i < carsArray.length; i++)      // add more cars to the array
    {
        carsArray[i].update();
        carsArray[i].draw();
    }
    for (let i = 0; i < logsArray.length; i++)      // add more logs to the array
    {
        logsArray[i].update();
        logsArray[i].draw();
    }
    //collisions with car
    for (let i = 0; i < carsArray.length; i++)
    {
        if (collision(frogger, carsArray[i]))
        {
            ctx4.drawImage(collisions, 0, 100, 100, 100, frogger.x, frogger.y, 50, 50);   // if the frogger runs into the car, then send that failure back to the pits of .... yeah just send him back to spawn
            resetGame();
        }
    }

    // collisions with logs/ turtles
    if (frogger.y < 410 && frogger.y > 260)
    {
        safe = false;       // if the frog is over the river then he ain't safe

        for (let i = 0; i < logsArray.length; i++)      // but if hes over a log or turtle, hes very safe
        {
            if (collision(frogger, logsArray[i]))
            {
                frogger.x += logsArray[i].speed * gameSpeed;        // frogger will move with the turtles and logs, no matter the game speed
                safe = true;        // frogger is safe if on turtle or log
            }
        }
        if (!safe)      // if the frog isn't safe, then it'll just fall into the water and make a ripple effect and then reset the game
        {
            for (let i = 0; i < 30; i++)
            {
                ripplesArray.unshift(new Particle(frogger.x, frogger.y));
            }
            resetGame();
        }
    }
}