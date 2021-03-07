import { CheckoutState, Product } from "./interfaces";

// Generic three for two promotion
// Example: we're going to have a 3 for 2 deal on Apple TVs. For example, if you buy 3 Apple TVs, 
// you will pay the price of 2 only
const threeForTwo = (product: Product) => {
    return (state: CheckoutState) => {
        const eligibility = state.cart
            .reduce((allProducts, currentProduct) => {

                // Ignore the ineligible products for promotion
                if (currentProduct.sku !== product.sku) {
                    return { ...allProducts, newCart: [...allProducts.newCart, currentProduct] };
                };

                // Every 3rd product is free
                const newPrice = (allProducts.promotionCount % 3 === 0) ? 0 : currentProduct.price;
                const productOnSpecial: Product = { ...currentProduct, price: newPrice };
                return {
                    ...allProducts,
                    promotionProducts: [...allProducts.promotionProducts, productOnSpecial],
                    promotionCount: allProducts.promotionCount + 1
                };
            }, { newCart: new Array<Product>(), promotionProducts: new Array<Product>(), promotionCount: 1 });

        // Update the state of the cart
        state.cart = eligibility.newCart;
        state.checkoutProducts = [...state.checkoutProducts, ...eligibility.promotionProducts];
    }
};

// Generic bulk discount promotion
// Example: the brand new Super iPad will have a bulk discounted applied, where the price will drop 
// to $499.99 each, if someone buys more than 4
const bulkDiscount = (product: Product, threshold: number, price: number) => {
    return (state: CheckoutState) => {
        const eligibility = state.cart
            .reduce((allProducts, currentProduct) => {

                // Ignore the ineligible products for promotion
                if (currentProduct.sku !== product.sku) {
                    return { ...allProducts, newCart: [...allProducts.newCart, currentProduct] };
                };

                // Otherwise, keep track of the eligible ones
                return { ...allProducts, promotionProducts: [...allProducts.promotionProducts, currentProduct] };
            }, { newCart: new Array<Product>(), promotionProducts: new Array<Product>() });

        // Update the price of each product if it is eligible for promotion
        const promotionProducts = eligibility.promotionProducts
            .map((currentProduct, _, allProducts) => {
                return {
                    ...currentProduct,
                    price: allProducts.length > threshold ? price : currentProduct.price
                };
            });

        // Update state of the cart
        state.cart = eligibility.newCart;
        state.checkoutProducts = [...state.checkoutProducts, ...promotionProducts];
    };
};

// Generic promotion for a free product when you buy a particular product
// Example: we will bundle in a free VGA adapter free of charge with every MacBook Pro sold
const freeItem = (product: Product, freeProduct: Product) => {
    return (state: CheckoutState) => {

        let numberOfEligibleProducts = state.cart.filter(curr => curr.sku === product.sku).length;

        const eligibility = state.cart
            .reduce((allProducts, currentProduct) => {

                // Keeps track of the product that links to the promotion
                if (currentProduct.sku === product.sku) {
                    return { ...allProducts, promotionProducts: [...allProducts.promotionProducts, currentProduct] };
                }
                // Change the price of the free item as it is eligible in this promotion
                else if (currentProduct.sku === freeProduct.sku && numberOfEligibleProducts > 0) {
                    numberOfEligibleProducts -= 1; // Keep track of the number of free products we can give away
                    const freeProduct: Product = { ...currentProduct, price: 0 };
                    return { ...allProducts, promotionProducts: [...allProducts.promotionProducts, freeProduct] };
                }
                // Ignore the ineligible products for promotion
                else {
                    return { ...allProducts, newCart: [...allProducts.newCart, currentProduct] };
                }

            }, { newCart: new Array<Product>(), promotionProducts: new Array<Product>() });

        // Update state of the cart
        state.cart = eligibility.newCart;
        state.checkoutProducts = [...state.checkoutProducts, ...eligibility.promotionProducts];
    };
}

export {
    threeForTwo,
    bulkDiscount,
    freeItem
};