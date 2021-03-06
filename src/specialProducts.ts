import { SpecialProduct } from "./interfaces";
import { bulkDiscount, threeForTwo } from "./specials";

const productSpecials: SpecialProduct[] = [
    threeForTwo("atv"),
    bulkDiscount("ipd", 4, 499.99)
];

export default productSpecials;