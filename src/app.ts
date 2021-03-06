import Checkout from "./checkout";
import products from "./products";
import productSpecials from "./specialProducts"



const co = Checkout(productSpecials);
// const item1 = products["mbp"];
// const item2 = products["ipd"];

const atv = products["atv"];
const mbp = products["mbp"];

co.scan(atv);
co.scan(atv);
co.scan(atv);
co.scan(mbp);
co.total();