export const CAT_TYPES = {
    SIAMESE: 'siamese',
    PERSIAN: 'persian',
    SCOTTISHFOLD: 'scottishfold',
    RUSSIANBLUE: 'russianblue',
    SAVANNAH: 'savannah'
}

class Cat {

    constructor(size) {
        this.size = size
        this.stroke = '#000000'
        this.diameter = this.size;
        this.width = this.size;
        this.height = this.size;
    }
}

class Siamese extends Cat {
    constructor(quantity) {
        super(30);
        this.subspecies = CAT_TYPES.SIAMESE;
        this.color = '#0057f8';
        this.quantity = quantity;
        this.timeFrame = 2000;
        this.speed = 1;
        this.damage = 10;
        this.hp = 5;
        this.deathValue = 5;
    }
}

class Persian extends Cat {
    constructor(quantity) {
        super(20);
        this.subspecies = CAT_TYPES.PERSIAN;
        this.color = '#ff637a';
        this.quantity = quantity;
        this.timeFrame = 3000;
        this.speed = 1.2;
        this.damage = 14;
        this.hp = 7;
        this.deathValue = 7;
    }
}

class ScottishFold extends Cat {

    constructor(quantity) {
        super(45);
        this.subspecies = CAT_TYPES.SCOTTISHFOLD;
        this.color = '#00fbbc';
        this.quantity = quantity;
        this.timeFrame = 4000;
        this.speed = 1.5;
        this.damage = 20;
        this.hp = 10;
        this.deathValue = 10;
    }
}

class RussianBlue extends Cat {
    constructor(quantity) {
        super(55);
        this.subspecies = CAT_TYPES.RUSSIANBLUE;
        this.color = '#fb6d00';
        this.quantity = quantity;
        this.timeFrame = 5000;
        this.speed = 1.7;
        this.damage = 24;
        this.hp = 12;
        this.deathValue = 12;
    }
}

class Savannah extends Cat {

    constructor(quantity) {
        super(15);
        this.subspecies = CAT_TYPES.SAVANNAH;
        this.color = '#4e0463';
        this.quantity = quantity;
        this.timeFrame = 1500;
        this.speed = 2.0;
        this.damage = 30;
        this.hp = 15;
        this.deathValue = 15;
    }
}

export class CatFactory {
    static catTypes = new Map([
        [CAT_TYPES.SIAMESE, Siamese],
        [CAT_TYPES.PERSIAN, Persian],
        [CAT_TYPES.SCOTTISHFOLD, ScottishFold],
        [CAT_TYPES.RUSSIANBLUE, RussianBlue],
        [CAT_TYPES.SAVANNAH, Savannah]
        // Add more cat types here
    ]);

    static createCat(quantity, type) {
        const CatType = CatFactory.catTypes.get(type) || Cat;
        return new CatType(quantity);
    }
}
