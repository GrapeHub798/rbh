//create a class
import {uuidv4} from "./helpers.js";
import {MONSTER_TYPE} from "./monster_constants.js";

export class Monster {
    monsters;
    monstersHp;
    intervals;
    constructionMaterials;
    gameState;

    constructor(level, gameState, constructionMaterials = null) {
        this.level = level;
        this.monsters = new Map();
        this.monstersHp = new Map();
        this.intervals = new Map();
        this.restartingLevel = false;
        this.gameState = gameState;
        this.constructionMaterials = constructionMaterials;
        this.monstersToCreate = MONSTER_TYPE[level];
        this.monsterQueue = []
        this.currentMonsterIndex = 0;

        this.addMonsterInterval = null;
        this.removeMonsterTimeout = null;

        this.startMonsterGeneration()
    }

    changeLevels(newLevel){
        this.softMonsterReset(newLevel);
    }

    restartLevel(level){
        this.restartingLevel = true;
        this.softMonsterReset(level);
        this.restartingLevel = false;
    }

    clearMonsters(){
        this.removeAllMonsters();
        this.clearIntervals();
        this.stopMonsterQueue();
        this.monsterQueue = []
        this.currentMonsterIndex = 0;
        this.monsters = new Map();
        this.monstersHp = new Map();
    }

    softMonsterReset(level){
        this.level = level;
        this.monstersToCreate = MONSTER_TYPE[level];
        this.clearMonsters();
        this.startMonsterGeneration()
    }

    removeAllMonsters(){
        for (let [monsterId, singleMonster] of this.monsters) {
            //find the monster's hp
            const currentMonsterHp = this.monstersHp.get(`${monsterId}-hp`);
            singleMonster.remove();
            currentMonsterHp.remove();
        }
    }

    stopMonsterQueue() {
        clearInterval(this.addMonsterInterval);
        this.addMonsterInterval = null;
        clearTimeout(this.removeMonsterTimeout);
        this.removeMonsterTimeout = null;
    }

    clearIntervals() {
        for (const [key, value] of this.intervals.entries()) {
            clearInterval(value);
        }
        this.intervals.clear();
    }

    startMonsterGeneration(){
        this.addMonsterToQueue();
        this.addMonsterInterval = setInterval(() => {
            this.currentMonsterIndex = (this.currentMonsterIndex + 1) % this.monstersToCreate.length;
            this.addMonsterToQueue();
        }, 30000); // 1 minutes interval
    }

    addMonsterToQueue() {
        const singleMonster = this.monstersToCreate[this.currentMonsterIndex];
        const monsterUUID = this.generateMonsterGroup(singleMonster);
        this.monsterQueue.push({
            key: monsterUUID,
            monster: singleMonster
        });

        // Schedule removal of this item in 3 minutes
        this.removeMonsterTimeout = setTimeout(() => {
            const singleMonsterInfo = this.monsterQueue.shift(); // Removes the oldest item from the queue
            if (!singleMonsterInfo){
                return;
            }
            //use the key to get the id
            const monsterIntervalValue = this.intervals.get(singleMonsterInfo.key);
            clearInterval(monsterIntervalValue);
            this.intervals.delete(singleMonsterInfo.key)
        }, 90000); // 2 minutes
    }

    generateMonsterGroup(singleMonsterGroup){
        const interval = singleMonsterGroup.timeFrame;

        const newUUID = uuidv4();
        //generate a monster or at an interval until max is created
        const intervalId = setInterval(() => {
            this.gameState.set('createMonster', singleMonsterGroup)
        }, interval);

        this.intervals.set(newUUID, intervalId);
        return newUUID;
    }

    generateSingleMonster(player, singleMonster){
        const monsterCoords = this.generateMonsterCoordinates(player)
        const newMonster = new Sprite(monsterCoords.x, monsterCoords.y, singleMonster.width, singleMonster.height);
        const monsterId = uuidv4();
        newMonster.diameter = singleMonster.diameter;
        newMonster.color = singleMonster.color;
        newMonster.stroke = singleMonster.stroke;
        newMonster.speed = singleMonster.speed;
        newMonster.monsterSpeed = singleMonster.speed;
        newMonster.playerDamage = singleMonster.damage;
        newMonster.hpStart = singleMonster.hp;
        newMonster.hpRemaining = singleMonster.hp;
        newMonster.deathValue = singleMonster.deathValue;
        if (this.constructionMaterials?.length > 0){
            this.constructionMaterials.forEach(material => {
                newMonster.overlaps(material);
            })
        }

        //hp bar

        const monsterHpId = `${monsterId}-hp`;
        const newMonsterHp = new Sprite(monsterCoords.x, monsterCoords.y - 40, 50, 10);
        newMonsterHp.color = '#ff0000';
        newMonsterHp.stroke = '#000000';
        if (this.constructionMaterials?.length > 0){
            this.constructionMaterials.forEach(material => {
                newMonsterHp.overlaps(material);
            })
        }

        this.monsters.set(monsterId, newMonster);
        this.monstersHp.set(monsterHpId, newMonsterHp);
    }

    display(gameState, player, gun, bomb){
        //loop through the monsters
        for (let [monsterId, singleMonster] of this.monsters) {
            //find the monster's hp
            const currentMonsterHp = this.monstersHp.get(`${monsterId}-hp`);
            singleMonster.moveTowards(player.player_object);
            singleMonster.speed = singleMonster.monsterSpeed;

            if (currentMonsterHp) {
                currentMonsterHp.rotation = 0;
                currentMonsterHp.position.x = singleMonster.position.x;
                currentMonsterHp.position.y = singleMonster.position.y - 40;
                currentMonsterHp.collider = 'none';
            }

            if (singleMonster.collide(gun.gun)){
                //did the damage exceed the monster hp?
                const damage = singleMonster.hpRemaining - gun.gun.damage;
                if (damage <= 0){
                    //delete the monster and hp bar
                    this.monsters.delete(monsterId)
                    singleMonster.remove();

                    gameState.set('monsterKilledPts', singleMonster.deathValue)

                    //hp bar
                    this.monstersHp.delete(`${monsterId}-hp`)
                    currentMonsterHp.remove()
                }

                if (damage > 0){
                    //adjust the monsters hp
                    currentMonsterHp.width = this.updateMonsterHp(gun.gun.damage, singleMonster);

                    //push back the monster
                    const displacement = createVector(player.player_object.velocity.x, player.player_object.velocity.y);
                    singleMonster.position.add(displacement);

                    currentMonsterHp.rotation = 0;
                    currentMonsterHp.position.x = singleMonster.position.x;
                    currentMonsterHp.position.y = singleMonster.position.y-40;
                    currentMonsterHp.collider = 'none';
                }
            }

            if (bomb.bomb && singleMonster.collide(bomb.bomb)){
                const damage = singleMonster.hpRemaining - bomb.bomb.damage;
                if (damage <= 0){
                    //delete the monster and hp bar
                    this.monsters.delete(monsterId)
                    singleMonster.remove();

                    gameState.set('monsterKilledPts', singleMonster.deathValue)

                    //hp bar
                    this.monstersHp.delete(`${monsterId}-hp`)
                    currentMonsterHp.remove()
                }

                if (damage > 0){
                    //adjust the monsters hp
                    currentMonsterHp.width = this.updateMonsterHp(gun.gun.damage, singleMonster);

                    //push back the monster
                    const displacement = createVector(player.player_object.velocity.x, player.player_object.velocity.y);
                    singleMonster.position.add(displacement);

                    currentMonsterHp.rotation = 0;
                    currentMonsterHp.position.x = singleMonster.position.x;
                    currentMonsterHp.position.y = singleMonster.position.y-40;
                    currentMonsterHp.collider = 'none';
                }

            }

            if (singleMonster.collide(player.player_object)){
                if (player.playerHit(gameState, singleMonster.playerDamage)){
                    return;
                }

                //monster
                this.monsters.delete(monsterId)
                singleMonster.remove();
                //hp bar
                this.monstersHp.delete(`${monsterId}-hp`)
                currentMonsterHp.remove()
            }
        }
    }

    updateMonsterHp(damage, monster){
        monster.hpRemaining = Math.max(monster.hpRemaining - damage, 0);
        return 50 * (monster.hpRemaining/monster.hpStart);
    }

    generateMonsterCoordinates(player) {
        const xDirection = Math.random() < 0.5 ? 1 : -1;
        const yDirection = Math.random() < 0.5 ? 1 : -1;
        const newX = player.position.x + 522 * xDirection;
        const newY = player.position.y + 394 * yDirection;
        return { x: newX, y: newY };
    }
}

