import ParentUtils from "../../../core/utils.js";
/**
 * Use getAuxData only to test the app
 */
export const AUX_DATA = {
    animals: [
        "Lion",
        "Eagle",
        "Turtle",
        "Elephant",
        "Butterfly",
        "Wolf",
        "Shark",
        "Fox",
        "Penguin",
        "Panda"
    ],
    objects: [
        "Chair", "Table", "Sofa", "Bed", "Lamp", "Bookshelf",
        "Laptop", "Smartphone", "Television", "Speaker", "Camera", "Headphones",
        "Plate", "Fork", "Knife", "Spoon", "Cup", "Pot",
        "Hammer", "Wrench", "Screwdriver", "Pliers", "Drill", "Saw",
        "Ball", "Bat", "Tennis Racket", "Helmet", "Gloves", "Bicycle",
        "Doll", "Action Figure",
    ]
}

function selectUsrInput(category) {
    return selectCategory(category);
}

function selectCategory(usrInput) {
    switch (usrInput) {
        case 0:
            return AUX_DATA[Object.keys(AUX_DATA)[ParentUtils.rng(0, Object.keys(AUX_DATA).length - 1)]];
        case 1:
            return AUX_DATA.animals;
        case 2:
            return AUX_DATA.objects;
        default:
            return -1;
    }
}

export function selectRdnWord(categoryList) {
    if (!categoryList || categoryList.length === 0) {
        return null;
    }
    return categoryList[ParentUtils.rng(0, categoryList.length - 1)];
}
