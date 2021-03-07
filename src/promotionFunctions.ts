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
                    productsOnSpecial: [...allProducts.productsOnSpecial, productOnSpecial],
                    promotionCount: allProducts.promotionCount + 1
                };
            }, { newCart: new Array<Product>(), productsOnSpecial: new Array<Product>(), promotionCount: 1 });

        // Update the state of the cart
        state.cart = eligibility.newCart;
        state.checkoutProducts = [...state.checkoutProducts, ...eligibility.productsOnSpecial];
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
                return { ...allProducts, productsOnSpecial: [...allProducts.productsOnSpecial, currentProduct] };
            }, { newCart: new Array<Product>(), productsOnSpecial: new Array<Product>() });

        // Update the price of each product that is eligible
        const productsOnSpecial = eligibility.productsOnSpecial
            .map((currentProduct, _, allProducts) => {
                return {
                    ...currentProduct,
                    price: allProducts.length > threshold ? price : currentProduct.price
                };
            });

        // Update state of the cart
        state.cart = eligibility.newCart;
        state.checkoutProducts = [...state.checkoutProducts, ...productsOnSpecial];
    };
};

// Generic promotion for a free product when you buy a particular product
// Example: we will bundle in a free VGA adapter free of charge with every MacBook Pro sold
const freeItem = (product: Product, freeProduct: Product) => {
    return (state: CheckoutState) => {

        let numberOfEligibleProducts = state.cart.filter(curr => curr.sku === product.sku).length;

        const eligibility = state.cart
            .reduce((prev, curr) => {

                // Keeps track of the product that links to the promotion
                if (curr.sku === product.sku) {
                    return { ...prev, productsOnSpecial: [...prev.productsOnSpecial, curr] };
                }
                // Change the price of the free item as it is eligible in this promotion
                else if (curr.sku === freeProduct.sku && numberOfEligibleProducts > 0) {
                    numberOfEligibleProducts -= 1; // Keep track of the number of free products we can give away
                    const freeProduct: Product = { ...curr, price: 0 };
                    return { ...prev, productsOnSpecial: [...prev.productsOnSpecial, freeProduct] };
                }
                // Ignore the ineligible products for promotion
                else {
                    return { ...prev, newCart: [...prev.newCart, curr] };
                }

            }, { newCart: new Array<Product>(), productsOnSpecial: new Array<Product>() });

        // Update state of the cart
        state.cart = eligibility.newCart;
        state.checkoutProducts = [...state.checkoutProducts, ...eligibility.productsOnSpecial];
    };
}

export {
    threeForTwo,
    bulkDiscount,
    freeItem
};