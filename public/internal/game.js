import {Player} from "./player.js"
import {Gun} from "./gun.js"
import {State} from "./state.js";
import {Monster} from "./monsters.js";
import {INITIAL_LEVEL} from "./constants.js";
import {Bomb} from "./bomb.js";
import {messagePopup} from "./messages.js";

const state = new State()

//state
state.set('isPaused', false);
state.set('currentLevel', INITIAL_LEVEL )
state.set('monsterKilledPts', 0 )
state.set('playerDied', false )

state.addListener('isPaused', newValue => {
    pauseGame();
});


//Normal Variables
let player, gun, monsters, bricks, centerBricks, tilesGroup, bomb;
let score = 0;
let currentLevel = INITIAL_LEVEL;
let gameOverText;

const backgroundColor = '#000000';

function setup() {
    noCursor();
    new Canvas(1024, 768, 'fullscreen');
    createInitialPlayer()
    showMap()
    const constructionMaterials = [bricks]
    monsters = new Monster(currentLevel, constructionMaterials);


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
        createInitialPlayer()
        monsters.restartLevel(currentLevel)
    });
}

function killPlayer() {
    player.killPlayer();
    gun.killGun();
}

function createInitialPlayer(){
    player = new Player();
    gun = new Gun();
    bomb = new Bomb(player);
}

function draw() {
    background(backgroundColor);
    player.display();
    gun.display(player.player_object);
    bomb.display(player.player_object);
    monsters.display(state, player, gun, bomb);
    manageScore()
    showLevel()
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
