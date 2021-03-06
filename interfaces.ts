interface StoreStock {
    name: string
    price: number,
};

interface StoreStocks {
    [key: string]: StoreStock
}

export {
    StoreStock,
    StoreStocks
};