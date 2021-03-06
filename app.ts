
import { StoreStock } from "./interfaces";
import products from "./products";


interface CheckoutState {
    products: StoreStock[]
}

const scanProduct = (state: CheckoutState) => ({
    scan: (product: StoreStock) => {
        state.products.push(product)
    }
});

const checkoutTotal = (state: CheckoutState) => ({
    total: () => {
        const totalPrice = state.products.reduce((prev, curr) => {
            return prev + curr.price
        }, 0)
        console.log(totalPrice)
    }
})

const Checkout = () => {
    const state: CheckoutState = {
        products: []
    };

    return {
        ...scanProduct(state),
        ...checkoutTotal(state)
    };
};

const co = Checkout();
const item1 = products["mbp"];
const item2 = products["ipd"];

co.scan(item1);
co.scan(item2);
co.total();