import { CheckoutState, StoreStock } from "./interfaces";

const threeForTwo = (sku: string) => {
    return (state: CheckoutState) => {
        const newCart: StoreStock[] = [];
        const productsOnSpecial = state.cart.reduce((specialProducts, currentProduct) => {

            // Remove the products that are not part of this special
            if (currentProduct.sku !== sku) {
                newCart.push(currentProduct);
                return specialProducts;
            };

            // Every 3rd product is free
            const newPrice = (specialProducts.count % 3 === 0) ? 0 : currentProduct.price;
            const productOnSpecial: StoreStock = { ...currentProduct, price: newPrice };
            return { newCart: [...specialProducts.newCart, productOnSpecial], count: specialProducts.count + 1 }

        }, { newCart: new Array<StoreStock>(), count: 1 });

        state.cart = newCart;
        state.checkoutProducts = [...state.checkoutProducts, ...productsOnSpecial.newCart];
    }
};

const bulkDiscount = (sku: string, threshold: number, price: number) => {
    return (state: CheckoutState) => {

        const allProducts = state.cart
            .reduce((prev, curr) => {
                if (curr.sku !== sku) {
                    return { ...prev, newCart: [...prev.newCart, curr] }
                } else {
                    return { ...prev, productsOnSpecial: [...prev.productsOnSpecial, curr] }
                }
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