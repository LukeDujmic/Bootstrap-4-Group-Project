const canvas = document.getElementById("canvas1");      // setting up all the canvas layers and their equal size with different variables and IDs for layering
const ctx1 = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 760;                

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
canvas2.width = 600;
canvas2.height = 760;

const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas3.getContext("2d");
canvas3.width = 600;
canvas3.height = 760;

const canvas4 = document.getElementById("canvas4");
const ctx4 = canvas4.getContext("2d");
canvas4.width = 600;
canvas4.height = 760;

const canvas5 = document.getElementById("canvas5");
const ctx5 = canvas5.getContext("2d");
canvas5.width = 600;
canvas5.height = 760;

//global variables
const grid = 80;    // each grid space will be 80
let keys  = [];     // keys for event listeners that will be used for the froggers movement
let score = 0;      // score of the game, will increase by 1 each time the frog reaches the end without getting hit
let collisionsCount = 0;        // the amount of times the frog hit an obstacle 
let frame = 0;      // the frame of a sprite
let gameSpeed = 1;  // the speed multiplier for the game
let safe = false;       // the variable that determines if the frog is safe when on the river (if the frog is on a log or turtle then its safe)
let totalTime = 0;      // the total time elapsed while the frog is alive

const particlesArray = [];      // setting up various arrays for obstacles and particles
const maxParticles = 300;
const ripplesArray = [];
const grassArray = [];
const carsArray = [];
const logsArray = [];

// images
const background_lvl2 = new Image();
background_lvl2.src = 'background_lvl2.png';

const grass = new Image();
grass.src = 'grass.png';

const collisions = new Image();
collisions.src = 'collisions.png';

const turtle = new Image();
turtle.src = 'turtles.png';

const log = new Image();
log.src = 'log.png';

const car = new Image();
car.src = 'cars.png';
let numberOfCars = 3;

const froggerSprite = new Image();
froggerSprite.src = 'frog_spritesheet.png';

//special spike balls
const spikeBall = new Image();
spikeBall.src = 'spikeball.png';

//car with spike ball (3 grid spaces long obstacle)
const carSpike = new Image();
carSpike.src = 'carspike.png';