import { CheckoutState, StoreStock } from "../src/interfaces"
import { threeForTwo } from "../src/specials";

test('test_special_three_for_two_with_three_products', () => {

    const checkoutState = createStoreStocks(3);
    threeForTwo("sku1")(checkoutState);

    const totalPrice = getTotalCheckoutPrice(checkoutState.checkoutProducts);

    // One of the products should be free
    expect(totalPrice).toBe(2);
});

test('test_special_three_for_two_with_seven_products', () => {

    const checkoutState = createStoreStocks(7);
    threeForTwo("sku1")(checkoutState);

    const totalPrice = getTotalCheckoutPrice(checkoutState.checkoutProducts);

    // Two of the products should be free
    expect(totalPrice).toBe(5);
});

test('test_special_three_for_two_with_one_product', () => {

    const checkoutState = createStoreStocks(1);
    threeForTwo("sku1")(checkoutState);

    const totalPrice = getTotalCheckoutPrice(checkoutState.checkoutProducts);

    // No specials applied
    expect(totalPrice).toBe(1);
});

const getTotalCheckoutPrice = (products: StoreStock[]) => {
    return products.reduce((prev, curr) => {
        return prev + curr.price
    }, 0)
};

const createStoreStocks = (num: number): CheckoutState => {
    const stock1: StoreStock = {
        sku: "sku1",
        name: "stock1",
        price: 1
    };

    const checkoutState: CheckoutState = {
        cart: [...Array(num)].map(_ => stock1),
        checkoutProducts: []
    };

    return checkoutState
};