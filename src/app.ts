import Checkout from "./checkout";
import products from "./products";
import productSpecials from "./specialProducts"

const co = Checkout(productSpecials);

const ipd = products["ipd"];
const atv = products["atv"];
const mbp = products["mbp"];

co.scan(atv);
co.scan(atv);
co.scan(atv);
co.scan(mbp);
co.total();