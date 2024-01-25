export class Bomb {
    bomb;

    constructor() {
        this.diameter = 200;
        this.damage = 20;
    }

    display(player){
        if (!player?.position){
            return;
        }
        this.showBomb(player)
    }

    startBomb(player){
        if (this.bomb){
            return;
        }
        this.bomb = new Sprite()
        this.bomb.diameter = this.diameter;
        this.bomb.position.x = player.position.x
        this.bomb.position.y = player.position.y
        this.bomb.bombLife = 0;
        this.bomb.damage = this.damage
        this.bomb.layer = 200;
        this.bomb.overlaps(player);
        this.bomb.visible = true;
        this.bomb.bombLife = 120;
        this.bomb.color = 'rgba(255,135,0,0.13)'
        this.bomb.stroke = 'rgba(251,255,0,0.13)'
    }
    showBomb(player){
        if (this.bomb && this.bomb.visible){
            this.bomb.position.x = player.position.x
            this.bomb.position.y = player.position.y
            this.bomb.bombLife -= 1;
            if (this.bomb.bombLife <=0){
                this.bomb.visible = false;
                this.bomb.remove();
                this.bomb = null;
            }
        }
    }
}
