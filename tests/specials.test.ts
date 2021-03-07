import { CheckoutState, Product } from "../src/interfaces"
import { threeForTwo, bulkDiscount, freeProduct } from "../src/promotionFunctions";

test("test_special_three_for_two_with_three_products", () => {

    const checkoutState = createStoreStocks(3);
    threeForTwo(testStock)(checkoutState);

    const totalPrice = getTotalCheckoutPrice(checkoutState);

    // One of the products should be free
    expect(totalPrice).toBe(2);
    expect(checkoutState.cart.length).toBe(0);
    expect(checkoutState.checkoutProducts.length).toBe(3);
});

test("test_special_three_for_two_with_seven_products", () => {

    const checkoutState = createStoreStocks(7);
    threeForTwo(testStock)(checkoutState);

    const totalPrice = getTotalCheckoutPrice(checkoutState);

    // Two of the products should be free
    expect(totalPrice).toBe(5);
    expect(checkoutState.cart.length).toBe(0);
    expect(checkoutState.checkoutProducts.length).toBe(7);
});

test("test_special_three_for_two_with_one_product", () => {

    const checkoutState = createStoreStocks(1);
    threeForTwo(testStock)(checkoutState);

    const totalPrice = getTotalCheckoutPrice(checkoutState);

    // No specials applied
    expect(totalPrice).toBe(1);
    expect(checkoutState.cart.length).toBe(0);
    expect(checkoutState.checkoutProducts.length).toBe(1);
});

test("test_special_bulk_discount_with_three_discounted", () => {

    const checkoutState = createStoreStocks(3);
    bulkDiscount(testStock, 2, 100)(checkoutState);

    const totalPrice = getTotalCheckoutPrice(checkoutState);

    expect(totalPrice).toBe(300);
    expect(checkoutState.cart.length).toBe(0);
    expect(checkoutState.checkoutProducts.length).toBe(3);
});

test("test_special_bulk_discount_with_none_discounted", () => {

    const checkoutState = createStoreStocks(3);
    bulkDiscount(testStock, 5, 100)(checkoutState);

    const totalPrice = getTotalCheckoutPrice(checkoutState);

    expect(totalPrice).toBe(3);
    expect(checkoutState.cart.length).toBe(0);
    expect(checkoutState.checkoutProducts.length).toBe(3);
});

test("test_special_free_product_all_discounted", () => {
    const freeStock = { sku: "freeSku", name: "freeName", price: 1 };
    const checkoutState = createStoreStocks(2);
    checkoutState.cart.push(freeStock);
    checkoutState.cart.push(freeStock);

    freeProduct(testStock, freeStock)(checkoutState);
    const totalPrice = getTotalCheckoutPrice(checkoutState);
    const allFreeProducts = checkoutState.checkoutProducts.filter(product => product.price == 0)

    expect(totalPrice).toBe(2);
    expect(checkoutState.cart.length).toBe(0);
    expect(checkoutState.checkoutProducts.length).toBe(4);
    expect(allFreeProducts.length).toBe(2);
});

test("test_special_free_product_none_discounted", () => {
    const freeStock = { sku: "freeSku", name: "freeName", price: 1 };
    const anotherStock = { sku: "anotherSky", name: "anotherName", price: 2 };
    const checkoutState = createStoreStocks(3);

    freeProduct(anotherStock, freeStock)(checkoutState);
    const totalPrice = getTotalCheckoutPrice(checkoutState);
    const allFreeProducts = checkoutState.checkoutProducts.filter(product => product.sku == freeStock.sku)

    expect(totalPrice).toBe(3);
    expect(checkoutState.checkoutProducts.length).toBe(0);
    expect(allFreeProducts.length).toBe(0);
});

test("test_special_free_product_one_scanned_not_free", () => {
    const freeStock = { sku: "freeSku", name: "freeName", price: 1 };
    const checkoutState = createStoreStocks(2);
    checkoutState.cart.push(freeStock);
    checkoutState.cart.push(freeStock);
    // There are only 2 products which matches the freebie. This one not be free
    checkoutState.cart.push(freeStock);

    freeProduct(testStock, freeStock)(checkoutState);
    const totalPrice = getTotalCheckoutPrice(checkoutState);
    const allFreeProducts = checkoutState.checkoutProducts.filter(product => product.price == 0)

    expect(totalPrice).toBe(3);
    expect(checkoutState.checkoutProducts.length).toBe(4);
    expect(allFreeProducts.length).toBe(2);
});

const getTotalCheckoutPrice = (checkoutState: CheckoutState) => {
    const checkoutCart = [...checkoutState.cart, ...checkoutState.checkoutProducts];
    return checkoutCart.reduce((prev, curr) => {
        return prev + curr.price
    }, 0);
};

const testStock = {
    sku: "sku1",
    name: "stock1",
    price: 1
};

const createStoreStocks = (num: number): CheckoutState => {
    const stock1: Product = { ...testStock };

    const checkoutState: CheckoutState = {
        cart: [...Array(num)].map(_ => stock1),
        checkoutProducts: []
    };

    return checkoutState
};