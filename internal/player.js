export class Player {
    player;

    constructor() {
        this.moveSpeed = 2;
        this.rapidMoveSpeed = 5;
        this.rapidMoveDuration = 500; // Duration in milliseconds
        this.lastDirectionKeyReleased = '';
        this.lastKeyReleaseTime = 0;
        this.doubleTapInterval = 200;
        this.isRapidMoving = false;
        this.rapidMoveEndTime = 0;
        this.rapidMoveDirection = '';

        this.createPlayer();
    }

    createPlayer() {
        this.player = new Sprite();
        this.player.rotation = 45;
        this.player.color = '#4e4e4e';
        this.player.stroke = '#000000';
        this.player.collider = 'static';
    }

    handlePlayerMovement() {
        let currentSpeed = this.isRapidMoving ? this.rapidMoveSpeed : this.moveSpeed;

        if (this.isRapidMoving) {
            if (millis() > this.rapidMoveEndTime) {
                this.isRapidMoving = false;
                this.rapidMoveDirection = '';
            } else {
                switch (this.rapidMoveDirection) {
                    case 'left':
                        this.player.position.x -= currentSpeed;
                        break;
                    case 'right':
                        this.player.position.x += currentSpeed;
                        break;
                    case 'up':
                        this.player.position.y -= currentSpeed;
                        break;
                    case 'down':
                        this.player.position.y += currentSpeed;
                        break;
                }
            }
        } else {
            if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
                this.player.position.x -= currentSpeed;
            }
            if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
                this.player.position.x += currentSpeed;
            }
            if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
                this.player.position.y -= currentSpeed;
            }
            if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
                this.player.position.y += currentSpeed;
            }
        }
    }

    handlePlayerDash(keyCode){
        let currentKey;
        if (keyCode === LEFT_ARROW || keyCode === 65) currentKey = 'left';
        if (keyCode === RIGHT_ARROW || keyCode === 68) currentKey = 'right';
        if (keyCode === UP_ARROW || keyCode === 87) currentKey = 'up';
        if (keyCode === DOWN_ARROW || keyCode === 83) currentKey = 'down';

        let currentTime = millis();
        if (currentKey === this.lastDirectionKeyReleased && currentTime - this.lastKeyReleaseTime < this.doubleTapInterval) {
            this.isRapidMoving = true;
            this.rapidMoveDirection = currentKey;
            this.rapidMoveEndTime = currentTime + this.rapidMoveDuration;
        } else {
            this.lastDirectionKeyReleased = currentKey;
            this.lastKeyReleaseTime = currentTime;
        }
    }

    display() {
        this.handlePlayerMovement()
    }
}
