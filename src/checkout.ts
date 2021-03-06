import { CheckoutState, SpecialProduct } from "./interfaces";
import { scanProduct, checkoutTotal } from "./checkoutFunctions";

const Checkout = (checkoutSpecials: SpecialProduct[]) => {
    const state: CheckoutState = {
        cart: [],
        checkoutProducts: []
    };

    return {
        ...scanProduct(state),
        ...checkoutTotal(state, checkoutSpecials)
    };
};

export default Checkout;