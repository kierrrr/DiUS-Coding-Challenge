interface StoreStock {
    readonly sku: string,
    readonly name: string,
    readonly price: number
};

interface StoreStocks {
    readonly [key: string]: StoreStock
}

export {
    StoreStock,
    StoreStocks
};