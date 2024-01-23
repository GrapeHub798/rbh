//create a class
import {MONSTER_TYPE} from "./constants.js";
import {uuidv4} from "./helpers.js";

export class Monster {
    monsters;
    intervals;
    walls;

    constructor(walls, level) {
        this.monsters = [];
        this.walls = walls;
        this.intervals = new Map();
        //get the monster from the monster type object
        const monstersToCreate = MONSTER_TYPE[level];
        this.generateAllMonsters(monstersToCreate)
    }

    generateAllMonsters(monsterTypeInfo){
        //loop through the array of monsters
        for (let idx = 0; idx < monsterTypeInfo.length; idx++){
            this.generateMonsterGroup(monsterTypeInfo[idx])
        }
        //start the generation process
    }

    generateMonsterGroup(singleMonsterGroup){
        const interval = singleMonsterGroup.timeFrame;
        const totalMonsters = singleMonsterGroup.quantity;
        let monsterCount = 0;

        const newUUID = uuidv4();
        //generate a monster or at an interval until max is created
        const intervalId = setInterval(() => {
            if (monsterCount >= totalMonsters){
                this.intervals.clear(newUUID)
                return;
            }
            this.generateSingleMonster(singleMonsterGroup);
            monsterCount++;
        }, interval);

        this.intervals.set(newUUID, intervalId);
    }

    generateSingleMonster(singleMonster){
        const newMonster = new Sprite(this.getMonsterRandomNumber(), this.getMonsterRandomNumber(), singleMonster.width, singleMonster.height);
        newMonster.diameter = singleMonster.diameter;
        newMonster.color = singleMonster.color;
        newMonster.stroke = singleMonster.stroke;
        newMonster.speed = singleMonster.speed;
        newMonster.customSpeed = singleMonster.speed;
        newMonster.overlaps(this.walls);
        this.monsters.push(newMonster);
    }

    display(player, gun){
        //loop through the monsters
        for (let idx = 0; idx < this.monsters.length; idx++){
            this.monsters[idx].moveTowards(player.player);
            this.monsters[idx].speed = this.monsters[idx].customSpeed;
            if (this.monsters[idx].collide(gun.gun)){
                this.monsters[idx].remove();
                this.monsters.splice(idx, 1);
            }
        }
    }

    getMonsterRandomNumber() {
        // Choose a range: 0 for -10 to -5, 1 for 805 to 810
        const range = Math.random() < 0.5 ? 0 : 1;

        if (range === 0) {
            // Generate a random number between -10 to -5
            return Math.floor(Math.random() * (6)) - 10;
        } else {
            // Generate a random number between 805 to 810
            return Math.floor(Math.random() * (6)) + 805;
        }
    }
}
//we will pass in
//  monster count
//  speed
//
