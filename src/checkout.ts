import { CheckoutState, Promotion } from "./interfaces";
import { scanProduct, checkoutTotal } from "./checkoutFunctions";

const Checkout = (promotions: Promotion[]) => {
    const state: CheckoutState = {
        cart: [],
        checkoutProducts: []
    };

    return {
        ...scanProduct(state),
        ...checkoutTotal(state, promotions)
    };
};

export default Checkout;