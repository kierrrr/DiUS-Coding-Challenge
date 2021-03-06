import { SpecialProduct } from "./interfaces";
import { bulkDiscount, threeForTwo, freeProduct } from "./specials";
import product from "./products";

const productSpecials: SpecialProduct[] = [
    threeForTwo(product["atv"]),
    bulkDiscount(product["ipd"], 4, 499.99),
    freeProduct(product["mbp"], product["vga"])
];

export default productSpecials;