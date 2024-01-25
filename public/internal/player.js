import {CANVAS_HEIGHT, CANVAS_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH} from "./constants.js";

export class Player {
    player_hp_bar;
    player_object;
    player;

    constructor() {
        this.moveSpeed = 3;
        this.rapidMoveSpeed = 6;
        this.rapidMoveDuration = 500; // Duration in milliseconds
        this.lastDirectionKeyReleased = '';
        this.lastKeyReleaseTime = 0;
        this.doubleTapInterval = 200;
        this.isRapidMoving = false;
        this.rapidMoveEndTime = 0;
        this.rapidMoveDirection = '';
        this.hpStart = 100;
        this.hpRemaining = 100;
        this.hpWidth = 50;

        this.createPlayer();
    }

    createPlayer() {
        //player
        this.player_object = new Sprite();
        this.player_object.width = PLAYER_WIDTH;
        this.player_object.height = PLAYER_HEIGHT;
        this.player_object.rotation = 45;
        this.player_object.color = '#4e4e4e';
        this.player_object.stroke = '#000000';

        //hp bar
        this.player_hp_bar = new Sprite();
        this.player_hp_bar.position.y = this.player_object.position.y - 40
        this.player_hp_bar.height = 10;
        this.player_hp_bar.width = this.hpWidth;
        this.player_hp_bar.collider = 'static'
        this.player_hp_bar.color = '#ff0000';
        this.player_hp_bar.stroke = '#000000';

        this.player = new Group()
        this.player.add(this.player_object);
        this.player.add(this.player_hp_bar);
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
                        this.player_object.position.x -= currentSpeed;
                        break;
                    case 'right':
                        this.player_object.position.x += currentSpeed;
                        break;
                    case 'up':
                        this.player_object.position.y -= currentSpeed;
                        break;
                    case 'down':
                        this.player_object.position.y += currentSpeed;
                        break;
                }
            }
        } else {
            if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
                this.player_object.position.x -= currentSpeed;
            }
            if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
                this.player_object.position.x += currentSpeed;
            }
            if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
                this.player_object.position.y -= currentSpeed;
            }
            if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
                this.player_object.position.y += currentSpeed;
            }
            if (!keyIsPressed) {
                this.player_object.speed = 0;
            }
        }
        camera.x = this.player_object.position.x;
        camera.y = this.player_object.position.y;
        camera.zoom = 1.5;
    }

    handlePlayerDash(keyCode) {
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

    display(gameState) {
        this.handlePlayerMovement()
        this.player_object.rotation = 45;
        this.attachHPBar()
    }

    attachHPBar() {
        this.player_hp_bar.rotation = 0;
        this.player_hp_bar.position.x = this.player_object.position.x;
        this.player_hp_bar.position.y = this.player_object.position.y - 40;
        this.player_hp_bar.collider = 'none';
    }

    playerHit(gameState, hit) {
        // Ensure deduction doesn't take currentValueB below zero
        this.hpRemaining = Math.max(this.hpRemaining - hit, 0);
        // Recalculate currentValueA based on the new currentValueB
        this.player_hp_bar.width = this.hpWidth * (this.hpRemaining / this.hpStart);
        if (this.hpRemaining <= 0){
            gameState.set('playerDied', 'trigger')
            return true
        }
        return false
    }

    killPlayer(){
        this.player_object.remove();
        this.player_hp_bar.remove();
    }
}
