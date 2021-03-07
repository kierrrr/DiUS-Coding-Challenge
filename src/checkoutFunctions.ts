import { CheckoutState, Product, Promotion } from "./interfaces";

const scanProduct = (state: CheckoutState) => ({
    scan: (product: Product) => {
        state.cart.push(product);
    }
});

const checkoutTotal = (state: CheckoutState, promotions: Promotion[]) => ({
    total: () => {
        promotions.forEach((applyPromotion) => {
            applyPromotion(state);
        });

        const checkoutCart = [...state.cart, ...state.checkoutProducts];
        const totalPrice = checkoutCart.reduce((prev, curr) => {
            return prev + curr.price;
        }, 0);

        const allSkusScanned = checkoutCart.reduce((prev, curr) => {
            return prev + `${curr.sku}, `;
        }, "");

        console.log(`SKUs Scanned: ${allSkusScanned} Total: $${totalPrice}`);
    }
});

export {
    scanProduct,
    checkoutTotal
};