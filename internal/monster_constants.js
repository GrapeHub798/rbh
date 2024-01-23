//MONSTER CONSTANTS
import {CAT_TYPES, CatFactory} from "./monster.js";

export const MONSTER_TYPE = {
    1: [CatFactory.createCat(10, CAT_TYPES.SIAMESE)],
    2: [CatFactory.createCat(15, CAT_TYPES.SIAMESE)],
    3: [
        CatFactory.createCat(20, CAT_TYPES.SIAMESE),
        CatFactory.createCat(5, CAT_TYPES.PERSIAN),
    ],
    4: [
        CatFactory.createCat(25, CAT_TYPES.SIAMESE),
        CatFactory.createCat(10, CAT_TYPES.PERSIAN),
    ],
    5: [
        CatFactory.createCat(30, CAT_TYPES.SIAMESE),
        CatFactory.createCat(15, CAT_TYPES.PERSIAN),
    ],
    6: [
        CatFactory.createCat(40, CAT_TYPES.SIAMESE),
        CatFactory.createCat(20, CAT_TYPES.PERSIAN),
        CatFactory.createCat(5, CAT_TYPES.SCOTTISHFOLD),
    ]
}
