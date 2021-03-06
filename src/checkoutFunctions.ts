import { CheckoutState, StoreStock, SpecialProduct } from "./interfaces"

const scanProduct = (state: CheckoutState) => ({
    scan: (product: StoreStock) => {
        state.cart.push(product)
    }
});

const checkoutTotal = (state: CheckoutState, specials: SpecialProduct[]) => ({

    total: () => {
        specials.forEach((applySpecial) => {
            applySpecial(state);
        });

        const checkoutCart = [...state.cart, ...state.checkoutProducts]
        const totalPrice = checkoutCart.reduce((prev, curr) => {
            return prev + curr.price;
        }, 0);

        console.log(`Total Price $${totalPrice}`);
    }
});

export {
    scanProduct,
    checkoutTotal
}