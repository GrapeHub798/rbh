import {Player} from "./player.js"
import {Gun} from "./gun.js"
import {createWalls} from "./wall.js";
import {State} from "./state.js";

const state = new State()

//state
state.set('isPaused', false);

state.addListener('isPaused', newValue => {
    pauseGame();
});


//Normal Variables
let player;
let gun;
let walls;
let monster;
let gameOverText;

const backgroundColor = '#17d104';

function setup() {
    noCursor();
    createCanvas(800, 800);
    player = new Player();
    gun = new Gun();
    walls = createWalls();

    monster = new Sprite(-10, -20, 40, 40);
    monster.diameter = 50;
    monster.color = '#0057f8';
    monster.stroke = '#000000';
    walls.forEach(wall => {
        monster.overlaps(wall);
    })

    //monster.attractTo(player.player.position.x, player.player.position.y, 1);
}

function draw() {
    clear();
    background(backgroundColor);
    player.display();
    gun.display(player.player);
    monster.moveTowards(player.player);
    monster.speed = 1;
    /*
    if (monster.collide(gun.gun)){
        monster.remove()
    }
    */
}

function keyPressed() {
    if (key == ' ') { //this means space bar, since it is a space inside of the single quotes
        const isPaused = state.get('isPaused');
        state.set('isPaused', !isPaused);
    }
}


function pauseGame(){
    const isPaused = state.get('isPaused');
    if (isPaused){
        noLoop();
        //showGamePaused();
        return;
    }
    loop();
}


function keyReleased() {
    player.handlePlayerDash(keyCode)
}

window.keyPressed = keyPressed;
window.keyReleased = keyReleased;
window.setup = setup;
window.draw = draw;
