interface Product {
    readonly sku: string,
    readonly name: string,
    readonly price: number
};

interface Stock {
    readonly [key: string]: Product
};

interface CheckoutState {
    cart: Product[],
    checkoutProducts: Product[]
};

type Promotion = (state: CheckoutState) => void;

export {
    Product,
    Stock,
    CheckoutState,
    Promotion
};