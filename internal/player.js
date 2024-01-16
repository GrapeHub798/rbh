export class Player{
    player;
    constructor(end) {
        this.end = end;
        this.createPlayer();
    }

    createPlayer() {
        this.player = new Sprite();
        this.player.rotation = 45;
        this.player.color = '#4e4e4e';
        this.player.stroke = '#000000';
    }

    initializePlayerMovement() {
        this.player.speed = 3;

        if (kb.pressing('up')) {
            this.player.direction = -90;
        } else if (kb.pressing('down')) {
            this.player.direction = 90;
        } else if (kb.pressing('left')) {
            this.player.direction = 180;
        } else if (kb.pressing('right')) {
            this.player.direction = 0;
        } else {
            this.player.speed = 0;
        }
    }

    display(){
        this.initializePlayerMovement()
    }
}
