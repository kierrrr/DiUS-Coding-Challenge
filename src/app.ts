import { StoreStock } from "./interfaces";
import products from "./products";


interface CheckoutState {
    cart: StoreStock[],
    checkoutProducts: StoreStock[]
}

const scanProduct = (state: CheckoutState) => ({
    scan: (product: StoreStock) => {
        state.cart.push(product)
    }
});

const checkoutTotal = (state: CheckoutState, specials: Specials[]) => ({
    total: () => {
        const totalPrice = state.cart.reduce((prev, curr) => {
            return prev + curr.price
        }, 0)
        console.log(totalPrice)
    }
});


interface Specials {
    sku: string,
    someFunc: (state: CheckoutState, sku: string) => void
}

const Checkout = (checkoutSpecials: Specials[]) => {
    const state: CheckoutState = {
        cart: [],
        checkoutProducts: []
    };
    const specials: Specials[] = checkoutSpecials;

    return {
        ...scanProduct(state),
        ...checkoutTotal(state, specials)
    };
};

const specials: Specials[] = [];
const co = Checkout(specials);
const item1 = products["mbp"];
const item2 = products["ipd"];

co.scan(item1);
co.scan(item2);
co.total();