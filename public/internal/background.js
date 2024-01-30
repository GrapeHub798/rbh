import {CANVAS_HEIGHT, CANVAS_WIDTH} from "./constants.js";

export function preloadLevels(){
    return loadImage('backgrounds/level1.png')
}

export function drawBackground(bg, bgX, bgY){
    image(bg,bgX,bgY);
}

export function updateBackground(player, bg, bgX, bgY) {
    // Shift the background in the opposite direction of player movement
    if (player.player_object.position.x < bg.width * 0.2) {
        bgX += player.currentSpeed;
    } else if (player.player_object.position.x > CANVAS_WIDTH * 0.8) {
        bgX -= player.currentSpeed;
    }
    if (player.player_object.position.y < CANVAS_HEIGHT * 0.2) {
        bgY += player.currentSpeed;
    } else if (player.player_object.position.y > CANVAS_HEIGHT * 0.8) {
        bgY -= player.currentSpeed;
    }

    bgX = bgX - player.player_object.position.x
    bgY = bgY - player.player_object.position.y
    //image(bg,bgX,bgY);
    // Loop the background
    //bgX = (bgX % bg.width + bg.width) % bg.width;
    //bgY = (bgY % bg.height + bg.height) % bg.height;

    drawBackground(bg, bgX, bgY)
}
