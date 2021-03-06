interface StoreStock {
    readonly sku: string,
    readonly name: string,
    readonly price: number
};

interface StoreStocks {
    readonly [key: string]: StoreStock
}

interface CheckoutState {
    cart: StoreStock[],
    checkoutProducts: StoreStock[]
}

type SpecialProduct = (state: CheckoutState) => void;


export {
    StoreStock,
    StoreStocks,
    CheckoutState,
    SpecialProduct
};