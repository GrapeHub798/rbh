export class Gun{

    gun;
    constructor() {
        this.angle = 0;
        this.radius = 100;
        this.damage = 5;
        this.createGun();
    }

    createGun() {
        this.gun = new Sprite();
        this.gun.diameter = 30
        this.gun.color = '#ffff00';
        this.gun.stroke = '#000000';
        this.gun.damage = this.damage;
    }

    display(player){
        if (!player?.position){
            return;
        }

        this.gun.position.x = player.position.x + this.radius * cos(this.angle);
        this.gun.position.y = player.position.y + this.radius * sin(this.angle);

        // Decrease the angle for counterclockwise rotation
        this.angle -= 2.5; // Change this value to adjust the speed of rotation
    }

    killGun(){
        this.gun.remove();
    }
}

