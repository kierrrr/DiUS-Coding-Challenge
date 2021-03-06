import { CheckoutState, SpecialProduct } from "./interfaces";
import { scanProduct, checkoutTotal } from "./checkoutFunctions";

const Checkout = (checkoutSpecials: SpecialProduct[]) => {
    const state: CheckoutState = {
        cart: [],
        checkoutProducts: []
    };
    const specials: SpecialProduct[] = checkoutSpecials;

    return {
        ...scanProduct(state),
        ...checkoutTotal(state, specials)
    };
};

export default Checkout;