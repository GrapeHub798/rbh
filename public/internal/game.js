import {Player} from "./player.js"
import {Gun} from "./gun.js"
import {State} from "./state.js";
import {Monster} from "./monsters.js";
import {CANVAS_HEIGHT, CANVAS_WIDTH, INITIAL_LEVEL} from "./constants.js";
import {Bomb} from "./bomb.js";
import {messagePopup} from "./messages.js";
import {preloadLevels, updateBackground} from "./background.js";

const state = new State()

//state
state.set('isPaused', false);
state.set('currentLevel', INITIAL_LEVEL )
state.set('monsterKilledPts', 0 )
state.set('playerDied', false )
state.set('createMonster', '')

state.addListener('isPaused', () => {
    pauseGame();
});


//Normal Variables
let player, gun, bomb;
let monsters, bricks, centerBricks, tilesGroup;
let gameBackground;
let bgX = 0;
let bgY = 0;
let score = 0;
let currentLevel = INITIAL_LEVEL;
let playerIsDead = false;
//
let gameTimer = null;
let totalSeconds = 0;
let gameOverText;

const backgroundColor = '#000000';

function killPlayer() {
    player.killPlayer();
    gun.killGun();
}

function createInitialPlayer(){
    player = new Player();
    gun = new Gun();
    bomb = new Bomb(player);
}

function keyPressed() {
    if (key == ' ') { //this means space bar, since it is a space inside of the single quotes
        const isPaused = state.get('isPaused');
        state.set('isPaused', !isPaused);
    }
    if(key == 'g'){
        bomb.startBomb(player.player_object);
    }
}

function manageScore(){
    textSize(20);
    fill("#FFFFFF");
    text(`Score: ${score}`, 904, 34 );
}

function showLevel(){
    textSize(20);
    fill("#FFFFFF");
    stroke("000000")
    text(`Level: ${currentLevel}`, 17, 34 );
}

function levelPopup(){

}

function updateScore(value){
    score += (+value);
}

function showMap(){
    bricks = new Group();
    bricks.tile = '@';
    bricks.tileSize = 32;
    bricks.layer = 0
    bricks.color = "rgba(81,255,0,0.29)"
    bricks.collider = 'static'

    centerBricks = new Group()
    centerBricks.tile = '#';
    centerBricks.tileSize = 32;
    centerBricks.layer = 0
    centerBricks.color = "rgba(224,135,0,0.23)"
    centerBricks.collider = 'static'


    tilesGroup = new Tiles(
        [
            '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
            '@...............................@',
            '@...............................@',
            '@.....................#.........@',
            '@...............................@',
            '@...............................@',
            '@...............................@',
            '@...............................@',
            '@...............................@',
            '@...............................@',
            '@...............................@',
            '@......#........................@',
            '@...............................@',
            '@...............................@',
            '@...............................@',
            '@...............................@',
            '@...............................@',
            '@.....................#.........@',
            '@...............................@',
            '@...............................@',
            '@...............................@',
            '@......#........................@',
            '@...............................@',
            '@...............................@',
            '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
        ],
        0,
        0,
        1,
        1
    );
}

function pauseGame(){
    const isPaused = state.get('isPaused');
    if (isPaused){
        noLoop();
        //showGamePaused();
        stopTimer();
        return;
    }
    loop();

    //pause the interval

}

function displayTimer(){
    textSize(30);
    fill("#FFFFFF");
    stroke("000000")
    let minutes = Math.floor(totalSeconds / 60);
    let remainingSeconds = totalSeconds % 60;
    const currentTimer = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    text(`${currentTimer}`, CANVAS_WIDTH/2 + 30, 37 );
}

function startTimer(){
    if (gameTimer === null) {
        gameTimer = setInterval(() => {
            totalSeconds++;
        }, 1000);
    }
}

function stopTimer(){
    if (gameTimer !== null) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
}

function resetTimer(){
    stopTimer();
    totalSeconds = 0;
}

function keyReleased() {
    player.handlePlayerDash(keyCode)
}
function preload(){
    gameBackground = preloadLevels()
}
function setup() {
    noCursor();
    new Canvas(1024, 768);
    createInitialPlayer()
    //showMap()
    const constructionMaterials = [bricks]
    monsters = new Monster(currentLevel, state);


    //MONSTER LISTENERS
    state.addListener('currentLevel', newLevel => {
        currentLevel = newLevel
        monsters.changeLevels(newLevel)
        messagePopup(newLevel, player.player_object)
    });

    state.addListener('monsterKilledPts', newValue => {
        updateScore(newValue);
    });

    state.addListener('playerDied', () => {
        //consequences?
        killPlayer()
        resetTimer()
        //clear monster//
        console.log('Player Died');
        playerIsDead = true
        setTimeout(() => {
            startTimer()
            createInitialPlayer()
            playerIsDead = false;
            monsters.restartLevel(currentLevel)
        }, 2000)
    });

    state.addListener('createMonster', monsterToCreate => {
        if (playerIsDead){ return }
        monsters.generateSingleMonster(player.player_object, monsterToCreate)
    });

    startTimer();
}

function draw() {
    background(backgroundColor);
    player.display(gameBackground);
    gun.display(player.player_object);
    bomb.display(player.player_object);
    updateBackground(player, gameBackground,bgX,bgY)
    monsters.display(state, player, gun, bomb);
    manageScore()
    showLevel()
    displayTimer()
}


window.keyPressed = keyPressed;
window.keyReleased = keyReleased;
window.preload = preload;
window.setup = setup;
window.draw = draw;
