import { CheckoutState, Promotion } from "./interfaces";
import { scanProduct, checkoutTotal } from "./checkoutFunctions";

const Checkout = (promotions: Promotion[]) => {
    // State of the checkout
    // cart - contains all of the scanned products
    // checkoutProducts - the finalised products which includes promotions
    const state: CheckoutState = {
        cart: [],
        checkoutProducts: []
    };

    // Compose all functions required for the checkout mechanism
    return {
        ...scanProduct(state),
        ...checkoutTotal(state, promotions)
    };
};

export default Checkout;