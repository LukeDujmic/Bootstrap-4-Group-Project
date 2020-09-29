class Particle {
    constructor(x,y){
        this.x = x + 25;
        this.y = y + 25;
        this.radius = Math.random() * 20+1;
        this.opacity = 1;
        this.directionX = Math.random() *1-.5;
        this.directionY= Math.random() *1-.5;
    }
    draw(){
        ctx3.fillStyle = 'rgba(150,150,150,' + this.opacity + ')';
        ctx3.beginPath();
        ctx3.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx3.fill();
        ctx3.closePath();
    }
    update(){
        this.x += this.directionX;
        this.y += this.directionY;
        if(this.opacity > 0.1){
            this.opacity -= 0.9;
        }
        if(this.radius > 0.15){
            this.radius -= 0.14;
        }
    }
    drawRipples(){
        ctx1.strokeStyle = 'rgba(255,255,255,' + this.opacity + ')';
        ctx1.beginPath();
        ctx1.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx1.stroke();
        ctx1.closePath();
    }
    ripples(){
        if(this.radius < 50){
            this.radius += .5;
            this.x -= .03;
            this.y -= .03;
        }
        if(this.opacity > 0){
            this.opacity -= .02 ;
        }
    }
} 

function handleParticles() {
    for(let i=0;i<particleArray.length;i++){
        particleArray[i].update();
        particleArray[i].draw();
        if (particleArray.length > maxParticles){
            for(let i=0;i<30;i++){
                particleArray.pop()
            }
        }
    }
    
    if(((keys[37] || keys[38] || keys[39] || keys[40] || keys[87] || keys[83] || keys[65] || keys[68])) &&  frogger.y > 250 && particleArray.length < maxParticles + 10){
        for(let i=0;i<10;i++){
            particleArray.unshift(new Particle(frogger.x, frogger.y));
        }
    }
}
function handleRipples(){
    //water ripples
    for(let i=0;i<ripplesArray.length;i++){
        ripplesArray[i].ripples();
        ripplesArray[i].drawRipples();
    }
    if(ripplesArray.length > 20){
        for(let i=0;i<5;i++){
            ripplesArray.pop();
        }
    }

    if((( keys[37] || keys[38] || keys[39] || keys[40] || keys[87] || keys[83] || keys[65] || keys[68])) && frogger.y < 250 && frogger.y > 100) {
        for(let i=0;i<20; i++){
            ripplesArray.unshift(new Particle(frogger.x, frogger.y));
        }
    }
}