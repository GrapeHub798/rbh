export function createWalls() {
    const walls = new Group();
    let w1 = new Sprite(2, 0, 10, 1600);
    walls.add(w1);
    let w2 = new Sprite(0, 2, 1600, 10);
    walls.add(w2);
    let w3 = new Sprite(798, 0, 10, 1600);
    walls.add(w3);
    let w4 = new Sprite(0, 798, 1600, 10);
    walls.add(w4);

    for (let i = 0; i < walls.length; i++) {
        walls[i].immovable = true;
        walls[i].collider = 'static';
        walls[i].color = "#000000";
    }
    return walls;
}
