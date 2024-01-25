import {createPixelArtSentence} from "./pixelArt/createPixelArtSentence.js";

function getRandomCharacter() {
    const alphabet = 'acdefghijklmnopqrstuvwxyz'; // All alphabet characters except 'b'
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
}
export function messagePopup(level, player) {
    //create the pixel art for the level
    const wordsToCreate = `Level ${level}`;
    const randomChar = getRandomCharacter();
    const wordArt = createPixelArtSentence(wordsToCreate, randomChar);
    console.log(wordArt);
    const message = new Sprite();
    message.position.x = player.position.x;
    message.position.y = player.position.y - 150;
    message.collider = 'none';
    message.img = spriteArt(wordArt, 16);
    setTimeout(() => {
        message.remove()
    }, 4000)
}
