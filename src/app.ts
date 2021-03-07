import Checkout from "./checkout";
import products from "./stock";
import allPromotions from "./promotions";

const co = Checkout(allPromotions);

const ipd = products["ipd"];
const atv = products["atv"];
const mbp = products["mbp"];
const vga = products["vga"];

co.scan(atv);
co.scan(atv);
co.scan(atv);
co.scan(mbp);
co.total();