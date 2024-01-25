//MONSTER CONSTANTS
import {CAT_TYPES, CatFactory} from "./monster.js";

export const MONSTER_TYPE = {
    1: [CatFactory.createCat(1, CAT_TYPES.SIAMESE)],
    2: [CatFactory.createCat(25, CAT_TYPES.SIAMESE)],
    3: [
        CatFactory.createCat(30, CAT_TYPES.SIAMESE),
        CatFactory.createCat(10, CAT_TYPES.PERSIAN),
    ],
    4: [
        CatFactory.createCat(35, CAT_TYPES.SIAMESE),
        CatFactory.createCat(15, CAT_TYPES.PERSIAN),
    ],
    5: [
        CatFactory.createCat(40, CAT_TYPES.SIAMESE),
        CatFactory.createCat(20, CAT_TYPES.PERSIAN),
        CatFactory.createCat(10, CAT_TYPES.SCOTTISHFOLD),
    ],
    6: [
        CatFactory.createCat(45, CAT_TYPES.SIAMESE),
        CatFactory.createCat(25, CAT_TYPES.PERSIAN),
        CatFactory.createCat(15, CAT_TYPES.SCOTTISHFOLD),
    ],
    7: [
        CatFactory.createCat(50, CAT_TYPES.SIAMESE),
        CatFactory.createCat(30, CAT_TYPES.PERSIAN),
        CatFactory.createCat(20, CAT_TYPES.SCOTTISHFOLD),
        CatFactory.createCat(10, CAT_TYPES.RUSSIANBLUE),
    ],
    8: [
        CatFactory.createCat(55, CAT_TYPES.SIAMESE),
        CatFactory.createCat(35, CAT_TYPES.PERSIAN),
        CatFactory.createCat(25, CAT_TYPES.SCOTTISHFOLD),
        CatFactory.createCat(15, CAT_TYPES.RUSSIANBLUE),
    ],
    9: [
        CatFactory.createCat(60, CAT_TYPES.SIAMESE),
        CatFactory.createCat(40, CAT_TYPES.PERSIAN),
        CatFactory.createCat(30, CAT_TYPES.SCOTTISHFOLD),
        CatFactory.createCat(20, CAT_TYPES.RUSSIANBLUE),
        CatFactory.createCat(10, CAT_TYPES.SAVANNAH),
    ],
    10: [
        CatFactory.createCat(65, CAT_TYPES.SIAMESE),
        CatFactory.createCat(45, CAT_TYPES.PERSIAN),
        CatFactory.createCat(35, CAT_TYPES.SCOTTISHFOLD),
        CatFactory.createCat(25, CAT_TYPES.RUSSIANBLUE),
        CatFactory.createCat(15, CAT_TYPES.SAVANNAH),
    ]
}
