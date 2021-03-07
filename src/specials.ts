import { CheckoutState, StoreStock } from "./interfaces";

const threeForTwo = (product: StoreStock) => {
    return (state: CheckoutState) => {
        const allProducts = state.cart
            .reduce((prev, curr) => {

                if (curr.sku !== product.sku) {
                    return { ...prev, newCart: [...prev.newCart, curr] }
                }

                // Every 3rd product is free
                const newPrice = (prev.count % 3 === 0) ? 0 : curr.price;
                const productOnSpecial: StoreStock = { ...curr, price: newPrice };
                return {
                    ...prev,
                    productsOnSpecial: [...prev.productsOnSpecial, productOnSpecial],
                    count: prev.count + 1
                }
            }, { newCart: new Array<StoreStock>(), productsOnSpecial: new Array<StoreStock>(), count: 1 });

        state.cart = allProducts.newCart;
        state.checkoutProducts = [...state.checkoutProducts, ...allProducts.productsOnSpecial];
    }
};

const bulkDiscount = (product: StoreStock, threshold: number, price: number) => {
    return (state: CheckoutState) => {

        const allProducts = state.cart
            .reduce((prev, curr) => {
                if (curr.sku !== product.sku) {
                    return { ...prev, newCart: [...prev.newCart, curr] }
                }
                return { ...prev, productsOnSpecial: [...prev.productsOnSpecial, curr] }
            }, { newCart: new Array<StoreStock>(), productsOnSpecial: new Array<StoreStock>() })

        const productsOnSpecial = allProducts.productsOnSpecial
            .map((currentProduct, _, allProducts) => {
                return {
                    ...currentProduct,
                    price: allProducts.length > threshold ? price : currentProduct.price
                }
            })

        state.cart = allProducts.newCart;
        state.checkoutProducts = [...state.checkoutProducts, ...productsOnSpecial];
    };
};

const freeProduct = (product: StoreStock, freeProduct: StoreStock) => {
    return (state: CheckoutState) => {

        let numberOfProductOnSpecial = state.cart.filter(curr => curr.sku === product.sku).length;

        const allProducts = state.cart
            .reduce((prev, curr) => {

                if (curr.sku === product.sku) {
                    return { ...prev, productsOnSpecial: [...prev.productsOnSpecial, curr] };
                } else if (curr.sku === freeProduct.sku && numberOfProductOnSpecial > 0) {
                    numberOfProductOnSpecial -= 1;
                    const free: StoreStock = { ...curr, price: 0 };
                    return { ...prev, productsOnSpecial: [...prev.productsOnSpecial, free] };
                } else {
                    return { ...prev, newCart: [...prev.newCart, curr] }
                }

            }, { newCart: new Array<StoreStock>(), productsOnSpecial: new Array<StoreStock>() })

        state.cart = allProducts.newCart;
        state.checkoutProducts = [...state.checkoutProducts, ...allProducts.productsOnSpecial];
    };
}

export {
    threeForTwo,
    bulkDiscount,
    freeProduct
}