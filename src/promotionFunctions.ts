import { CheckoutState, Product } from "./interfaces";

// Generic three for two promotion
// Example: we're going to have a 3 for 2 deal on Apple TVs. For example, if you buy 3 Apple TVs, 
// you will pay the price of 2 only
const threeForTwo = (product: Product) => {
    return (state: CheckoutState) => {
        const allProducts = state.cart
            .reduce((prev, curr) => {

                // Ignore the ineligible products for promotion
                if (curr.sku !== product.sku) {
                    return { ...prev, newCart: [...prev.newCart, curr] };
                };

                // Every 3rd product is free
                const newPrice = (prev.count % 3 === 0) ? 0 : curr.price;
                const productOnSpecial: Product = { ...curr, price: newPrice };
                return {
                    ...prev,
                    productsOnSpecial: [...prev.productsOnSpecial, productOnSpecial],
                    count: prev.count + 1
                };
            }, { newCart: new Array<Product>(), productsOnSpecial: new Array<Product>(), count: 1 });

        state.cart = allProducts.newCart;
        state.checkoutProducts = [...state.checkoutProducts, ...allProducts.productsOnSpecial];
    }
};

// Generic bulk discount promotion
// Example: the brand new Super iPad will have a bulk discounted applied, where the price will drop 
// to $499.99 each, if someone buys more than 4
const bulkDiscount = (product: Product, threshold: number, price: number) => {
    return (state: CheckoutState) => {
        const allProducts = state.cart
            .reduce((prev, curr) => {
                if (curr.sku !== product.sku) {
                    return { ...prev, newCart: [...prev.newCart, curr] };
                };
                return { ...prev, productsOnSpecial: [...prev.productsOnSpecial, curr] };
            }, { newCart: new Array<Product>(), productsOnSpecial: new Array<Product>() });

        const productsOnSpecial = allProducts.productsOnSpecial
            .map((currentProduct, _, allProducts) => {
                return {
                    ...currentProduct,
                    price: allProducts.length > threshold ? price : currentProduct.price
                };
            });

        state.cart = allProducts.newCart;
        state.checkoutProducts = [...state.checkoutProducts, ...productsOnSpecial];
    };
};

// Generic promotion for a free product when you buy a particular product
// Example: we will bundle in a free VGA adapter free of charge with every MacBook Pro sold
const freeProduct = (product: Product, freeProduct: Product) => {
    return (state: CheckoutState) => {

        let numberOfProductOnSpecial = state.cart.filter(curr => curr.sku === product.sku).length;

        const allProducts = state.cart
            .reduce((prev, curr) => {

                if (curr.sku === product.sku) {
                    return { ...prev, productsOnSpecial: [...prev.productsOnSpecial, curr] };
                } else if (curr.sku === freeProduct.sku && numberOfProductOnSpecial > 0) {
                    numberOfProductOnSpecial -= 1;
                    const free: Product = { ...curr, price: 0 };
                    return { ...prev, productsOnSpecial: [...prev.productsOnSpecial, free] };
                } else {
                    return { ...prev, newCart: [...prev.newCart, curr] };
                }

            }, { newCart: new Array<Product>(), productsOnSpecial: new Array<Product>() });

        state.cart = allProducts.newCart;
        state.checkoutProducts = [...state.checkoutProducts, ...allProducts.productsOnSpecial];
    };
}

export {
    threeForTwo,
    bulkDiscount,
    freeProduct
};