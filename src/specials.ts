import { CheckoutState, StoreStock } from "./interfaces";

const threeForTwo = (sku: string) => {
    return (state: CheckoutState) => {
        const allProducts = state.cart
            .reduce((prev, curr) => {

                if (curr.sku !== sku) {
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

const bulkDiscount = (sku: string, threshold: number, price: number) => {
    return (state: CheckoutState) => {

        const allProducts = state.cart
            .reduce((prev, curr) => {
                if (curr.sku !== sku) {
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
    }
}

export {
    threeForTwo,
    bulkDiscount
}