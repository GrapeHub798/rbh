import {Player} from "./player.js"
import {Gun} from "./gun.js"
import {createWalls} from "./wall.js";
import {State} from "./state.js";
import {Monster} from "./monsters.js";
import {INITIAL_LEVEL} from "./constants.js";

const state = new State()

//state
state.set('isPaused', false);
state.set('currentLevel', INITIAL_LEVEL )
state.set('pts', 0 )

state.addListener('isPaused', newValue => {
    pauseGame();
});


//Normal Variables
let player;
let gun;
let score = 0;
let walls;
let monsters;
let currentLevel = INITIAL_LEVEL;
let gameOverText;

const backgroundColor = '#17d104';

function setup() {
    noCursor();
    createCanvas(800, 800);
    walls = createWalls();
    player = new Player(walls);
    gun = new Gun();
    monsters = new Monster(walls, currentLevel);

    //MONSTER LISTENERS
    state.addListener('currentLevel', currentLevel => {
        monsters.changeLevels(currentLevel+1)
    });

    state.addListener('pts', newValue => {
        updateScore(newValue);
    });

}
function draw() {
    background(backgroundColor);
    player.display();
    gun.display(player.player_object);
    monsters.display(state, player, gun);
    manageScore()
}

function keyPressed() {
    if (key == ' ') { //this means space bar, since it is a space inside of the single quotes
        const isPaused = state.get('isPaused');
        state.set('isPaused', !isPaused);
    }
}

function manageScore(){
    textSize(20);
    fill("#FFFFFF");
    text(score, 700, 30 );
}

function updateScore(value){
    score += (+value);
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
