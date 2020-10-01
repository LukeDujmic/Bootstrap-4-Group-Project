function animate()
{
    ctx1.clearRect(0, 0, canvas.width, canvas.height);      // setting up canvas layers
    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    ctx3.clearRect(0, 0, canvas.width, canvas.height);
    ctx4.clearRect(0, 0, canvas.width, canvas.height);
    ctx5.clearRect(0, 0, canvas.width, canvas.height);  
    handleRipples();        // ripples happen first
    ctx2.drawImage(background_lvl2, 0, 0, canvas.width, canvas.height);    // above ripples is the background
    handleParticles();      // above the background itself are the dust particles
    handleGrass();          // above the background/ street particles are the grass particles
    frogger.draw();         // frogger is above all the particles/ripples
    frogger.update();

    handleObstacles();      // obstacles are above frogger
    handleScoreBoard();     //scoreboard is above the entire game (except for the foreground)
    ctx4.drawImage(grass, 0, 0, canvas.width, canvas.height);       // foreground is above everything
    frame++;        // turtle frames animation
    requestAnimationFrame(animate); 
}

animate();

//event listeners
window.addEventListener('keydown', function(e)
{
    keys = [];
    keys[e.keyCode] = true;
    if (keys[37] || keys[38] || keys[39] || keys[49] || keys[87] || keys[83] || keys[65] || keys[68])       // frogger movement function, uses arrow keys in four basic directions
    {
        frogger.jump()
;    }
});

window.addEventListener('keyup', function(e)        // preventing the frog from being able to hold the key and constantly dash forward by removing event listener
{
    delete keys[e.keyCode];
    frogger.moving = false;
    frogger.frameX = 0;
});

function scored()
{
    score++                 // adds score when you hit the top
    gameSpeed += 0.05;      // increase game speed when you score, by 5% each time (addititve)
    frogger.x = canvas.width/2 - frogger.width/2;       // resets frogger position back to the bottom
    frogger.y = canvas.height - frogger.height - 40;

    if (score == 3)     // when the score gets to three, change the spike ball obstacle layout to have one more in between the 'gap' of the 3 spikeballs, making 4 total
    {
        carsArray.pop();
        carsArray.pop();
        carsArray.pop();
        for (let i = 0; i < 4; i++)
        {
            let x = i * 300;
            carsArray.push(new Obstacle(x, canvas.height - grid * 7 - 20, grid * 1, grid, 1.8, 'spikeball'));
        }
    }
    if (score == 6)     // when the score gets to six, change the spike balls again to have 4 but with even spacing to make it overall more challenging
    {
        carsArray.pop();
        carsArray.pop();
        carsArray.pop();
        carsArray.pop();
        for (let i = 0; i < 4; i++)
        {
            let x = i * 190;
            carsArray.push(new Obstacle(x, canvas.height - grid * 7 - 20, grid * 1, grid, 1.8, 'spikeball'));
        }
    }
}

setInterval(timeIncrease, 1000)     //running time function every second
// new time function
function timeIncrease()
{
    totalTime++;            // time variable increases by 1 every second, shown on scoreboard
}

function handleScoreBoard()
{
    ctx4.fillStyle = 'black';       // makes text black
    ctx4.strokeStyle = 'black'      // makes text black
    ctx4.font = '15px Verdana';     // changing font style and size
    ctx4.strokeText('Score', 265, 15);      //placing score text in top middle
    ctx4.font = '60px Verdana';         // score number size
    ctx4.fillText(score, 270, 65);      //placing score number in the top middle of the screen
    ctx4.font = '15px Verdana';
    ctx4.strokeText('Collisions: ' + collisionsCount, 10, 335);     // placing the collision amount on the left
    ctx4.strokeText('Game Speed: ' + gameSpeed.toFixed(2), 10, 355);    // placing the speed of the game, rounded to 2 digits, to the left
    ctx4.strokeText('Seconds Spent Alive: ' + totalTime, 10, 75);       // placing the time elapsed while alive in the top left
}

// collision detection between two rectangles
function collision(first, second)
{
    return !(first.x > second.x + second.width ||       
            first.x + first.width < second.x ||
            first.y > second.y + second.height || 
            first.y + first.height < second.y);
}

function resetGame()
{
    totalTime = 0;          //resetting time back to 0
    frogger.x = canvas.width/2 - frogger.width/2;       //resetting frog position
    frogger.y = canvas.height - frogger.height - 40;    //resetting frog position

    //resetting the spike balls that change at the top
    if (score >= 3 && score < 6)        // when the score is between 3 and 6, it removes the 4 spikeballs and resets them back to their original state when the score is less than 3 when the frog gets annhilated
    {
        carsArray.pop();        
        carsArray.pop();
        carsArray.pop();
        carsArray.pop();
        for (let i = 0; i < 3; i++)
        {
            let x = i * 80;
            carsArray.push(new Obstacle(x, canvas.height - grid * 7 - 20, grid * 1, grid, 1.8, 'spikeball'));
        }
    }
    if (score >= 6)     // when the score is above 6, it removes the 4 spikeballs and resets them back to their original state when the score is less than 3 when the frog gets annhilated
    {
        carsArray.pop();
        carsArray.pop();
        carsArray.pop();
        carsArray.pop();
        for (let i = 0; i < 3; i++)
        {
            let x = i * 80;
            carsArray.push(new Obstacle(x, canvas.height - grid * 7 - 20, grid * 1, grid, 1.8, 'spikeball'));   
        }
    }
    score = 0;      // resetting score on collision
    collisionsCount++;      // adding a collision to the collisionsCount variable
    gameSpeed = 1;      // resetting the game speed on collision, so it doesn't stay fast
}