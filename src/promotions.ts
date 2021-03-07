import { Promotion } from "./interfaces";
import { bulkDiscount, threeForTwo, freeItem } from "./promotionFunctions";
import product from "./stock";

const allPromotions: Promotion[] = [
    threeForTwo(product["atv"]),
    bulkDiscount(product["ipd"], 4, 499.99),
    freeItem(product["mbp"], product["vga"])
];

export default allPromotions;