//MONSTER CONSTANTS
import {CAT_TYPES, CatFactory} from "./monster.js";

export const MONSTER_TYPE = {
    1: [CatFactory.createCat(30, CAT_TYPES.SIAMESE)],
    2: [CatFactory.createCat(40, CAT_TYPES.SIAMESE)],
    3: [
        CatFactory.createCat(50, CAT_TYPES.SIAMESE),
        CatFactory.createCat(20, CAT_TYPES.PERSIAN),
    ],
    4: [
        CatFactory.createCat(60, CAT_TYPES.SIAMESE),
        CatFactory.createCat(30, CAT_TYPES.PERSIAN),
    ],
    5: [
        CatFactory.createCat(70, CAT_TYPES.SIAMESE),
        CatFactory.createCat(40, CAT_TYPES.PERSIAN),
        CatFactory.createCat(20, CAT_TYPES.SCOTTISHFOLD),
    ],
    6: [
        CatFactory.createCat(80, CAT_TYPES.SIAMESE),
        CatFactory.createCat(50, CAT_TYPES.PERSIAN),
        CatFactory.createCat(30, CAT_TYPES.SCOTTISHFOLD),
    ],
    7: [
        CatFactory.createCat(90, CAT_TYPES.SIAMESE),
        CatFactory.createCat(60, CAT_TYPES.PERSIAN),
        CatFactory.createCat(40, CAT_TYPES.SCOTTISHFOLD),
        CatFactory.createCat(20, CAT_TYPES.RUSSIANBLUE),
    ],
    8: [
        CatFactory.createCat(100, CAT_TYPES.SIAMESE),
        CatFactory.createCat(70, CAT_TYPES.PERSIAN),
        CatFactory.createCat(50, CAT_TYPES.SCOTTISHFOLD),
        CatFactory.createCat(30, CAT_TYPES.RUSSIANBLUE),
    ],
    9: [
        CatFactory.createCat(110, CAT_TYPES.SIAMESE),
        CatFactory.createCat(80, CAT_TYPES.PERSIAN),
        CatFactory.createCat(60, CAT_TYPES.SCOTTISHFOLD),
        CatFactory.createCat(40, CAT_TYPES.RUSSIANBLUE),
        CatFactory.createCat(20, CAT_TYPES.SAVANNAH),
    ],
    10: [
        CatFactory.createCat(120, CAT_TYPES.SIAMESE),
        CatFactory.createCat(90, CAT_TYPES.PERSIAN),
        CatFactory.createCat(70, CAT_TYPES.SCOTTISHFOLD),
        CatFactory.createCat(50, CAT_TYPES.RUSSIANBLUE),
        CatFactory.createCat(30, CAT_TYPES.SAVANNAH),
    ]
}
