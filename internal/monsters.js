//create a class
import {uuidv4} from "./helpers.js";
import {MONSTER_TYPE} from "./monster_constants.js";

export class Monster {
    monsters;
    intervals;
    walls;

    constructor(walls, level) {
        this.level = level;
        this.monsters = new Map();
        this.walls = walls;
        this.intervals = new Map();
        //get the monster from the monster type object
        const monstersToCreate = MONSTER_TYPE[level];

        this.generateAllMonsters(monstersToCreate)
    }

    changeLevels(newLevel){
        this.level = newLevel;
        this.clearIntervals()
        this.monsters = new Map();
        const monstersToCreate = MONSTER_TYPE[newLevel];
        this.generateAllMonsters(monstersToCreate)
    }

    clearIntervals() {
        for (let id of this.intervals.keys()) {
            clearInterval(id);
        }
        this.intervals.clear();
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
        const monsterCoords = this.generateMonsterCoordinates()
        const newMonster = new Sprite(monsterCoords.x, monsterCoords.y, singleMonster.width, singleMonster.height);
        const monsterId = uuidv4();
        newMonster.diameter = singleMonster.diameter;
        newMonster.color = singleMonster.color;
        newMonster.stroke = singleMonster.stroke;
        newMonster.speed = singleMonster.speed;
        newMonster.monsterSpeed = singleMonster.speed;
        newMonster.playerDamage = singleMonster.damage;
        newMonster.overlaps(this.walls);
        this.monsters.set(monsterId, newMonster);
    }

    display(gameState, player, gun){
        //loop through the monsters
        for (let [monsterId, singleMonster] of this.monsters) {
            singleMonster.moveTowards(player.player_object);
            singleMonster.speed = singleMonster.monsterSpeed;
            if (singleMonster.collide(gun.gun)){
                this.monsters.delete(monsterId)
                singleMonster.remove();
                this.checkForLevelCompletion(gameState)
            }

            if (singleMonster.collide(player.player_object)){
                player.playerHit(singleMonster.playerDamage)
                this.monsters.delete(monsterId)
                singleMonster.remove();
                this.checkForLevelCompletion(gameState)
            }
        }
    }

    checkForLevelCompletion(gameState){
        if (this.monsters.size === 0 ){
            gameState.set('currentLevel', this.level);
        }
    }

    generateMonsterCoordinates() {
        let x, y;

        // Randomly decide whether to generate X or Y within 0 to 800
        if (Math.random() < 0.5) {
            // If X is between 0 and 800, Y must be negative or greater than 800
            x = Math.floor(Math.random() * 801); // X in 0 to 800
            if (Math.random() < 0.5) {
                y = -Math.floor(Math.random() * 10) - 1; // Y in -10 to -1
            } else {
                y = Math.floor(Math.random() * 10) + 801; // Y in 801 to 810
            }
        } else {
            // If Y is between 0 and 800, X must be negative or greater than 800
            y = Math.floor(Math.random() * 801); // Y in 0 to 800
            if (Math.random() < 0.5) {
                x = -Math.floor(Math.random() * 10) - 1; // X in -10 to -1
            } else {
                x = Math.floor(Math.random() * 10) + 801; // X in 801 to 810
            }
        }

        return { x, y };
    }
}

