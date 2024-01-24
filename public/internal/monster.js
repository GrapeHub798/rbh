 export const CAT_TYPES = {
    SIAMESE: 'siamese',
    PERSIAN: 'persian',
    SCOTTISHFOLD: 'scottishfold'
}
class Cat {
    constructor() {
        this.stroke = '#000000'
    }
}

class Siamese extends Cat {
    size = 30;
    constructor(quantity) {
        super();
        this.subspecies = CAT_TYPES.SIAMESE;
        this.diameter = this.size;
        this.width = this.size;
        this.height = this.size;
        this.color = '#0057f8';
        this.quantity = quantity;
        this.timeFrame = 2000;
        this.speed = 1;
        this.damage = 5;
        this.hp = 5;
        this.pts = 5;
    }
}

class Persian extends Cat {
    size = 20
    constructor(quantity) {
        super();
        this.subspecies = CAT_TYPES.PERSIAN;
        this.diameter = this.size;;
        this.width = this.size;;
        this.height = this.size;;
        this.color = '#ff637a';
        this.quantity = quantity;
        this.timeFrame = 3000;
        this.speed = 1.2;
        this.damage = 7;
        this.hp = 7;
        this.pts = 7;
    }
}

class ScottishFold extends Cat {
    size = 45;
    constructor(quantity) {
        super();
        this.subspecies = CAT_TYPES.SCOTTISHFOLD;
        this.diameter = this.size;;
        this.width = this.size;;
        this.height = this.size;;
        this.color = '#00fbbc';
        this.quantity = quantity;
        this.timeFrame = 4000;
        this.speed = 1.5;
        this.damage = 10;
        this.hp = 10;
        this.pts = 10;
    }
}

export class CatFactory {
    static catTypes = new Map([
        [CAT_TYPES.SIAMESE, Siamese],
        [CAT_TYPES.PERSIAN, Persian],
        [CAT_TYPES.SCOTTISHFOLD, ScottishFold]
        // Add more cat types here
    ]);

    static createCat(quantity, type) {
        const CatType = CatFactory.catTypes.get(type) || Cat;
        return new CatType(quantity);
    }
}
