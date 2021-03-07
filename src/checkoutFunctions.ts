import { CheckoutState, Product, Promotion } from "./interfaces";

// Scanning mechanism for the checkout. Adds all scanned items to the cart
const scanProduct = (state: CheckoutState) => ({
    scan: (product: Product) => {
        state.cart.push(product);
    }
});

// Checkout mechanism for displaying the cart total which includes all promotions
// specified
const checkoutTotal = (state: CheckoutState, promotions: Promotion[]) => ({
    total: () => {
        // Check for any eligible promotions in the cart and apply them
        promotions.forEach((applyPromotion) => {
            applyPromotion(state);
        });

        const checkoutCart = [...state.cart, ...state.checkoutProducts];

        // Calculate the total price
        const totalPrice = checkoutCart.reduce((prev, curr) => {
            return prev + curr.price;
        }, 0);

        // Create output string
        const allSkusScanned = checkoutCart.reduce((prev, curr) => {
            return prev + `${curr.sku}, `;
        }, "");

        // Not ideal to use the console for output but it will do for now
        console.log(`SKUs Scanned: ${allSkusScanned} Total: $${totalPrice}`);
    }
});

export {
    scanProduct,
    checkoutTotal
};