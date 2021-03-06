import { CheckoutState, StoreStock } from "../src/interfaces"
import { threeForTwo, bulkDiscount } from "../src/specials";

test('test_special_three_for_two_with_three_products', () => {

    const checkoutState = createStoreStocks(3);
    threeForTwo("sku1")(checkoutState);

    const totalPrice = getTotalCheckoutPrice(checkoutState);

    // One of the products should be free
    expect(totalPrice).toBe(2);
    expect(checkoutState.cart.length).toBe(0);
    expect(checkoutState.checkoutProducts.length).toBe(3);
});

test('test_special_three_for_two_with_seven_products', () => {

    const checkoutState = createStoreStocks(7);
    threeForTwo("sku1")(checkoutState);

    const totalPrice = getTotalCheckoutPrice(checkoutState);

    // Two of the products should be free
    expect(totalPrice).toBe(5);
    expect(checkoutState.cart.length).toBe(0);
    expect(checkoutState.checkoutProducts.length).toBe(7);
});

test('test_special_three_for_two_with_one_product', () => {

    const checkoutState = createStoreStocks(1);
    threeForTwo("sku1")(checkoutState);

    const totalPrice = getTotalCheckoutPrice(checkoutState);

    // No specials applied
    expect(totalPrice).toBe(1);
    expect(checkoutState.cart.length).toBe(0);
    expect(checkoutState.checkoutProducts.length).toBe(1);
});

test('test_special_bulk_discount_with_three_discounted', () => {

    const checkoutState = createStoreStocks(3);
    bulkDiscount("sku1", 2, 100)(checkoutState);

    const totalPrice = getTotalCheckoutPrice(checkoutState);

    expect(totalPrice).toBe(300);
    expect(checkoutState.cart.length).toBe(0);
    expect(checkoutState.checkoutProducts.length).toBe(3);
});

test('test_special_bulk_discount_with_none_discounted', () => {

    const checkoutState = createStoreStocks(3);
    bulkDiscount("sku1", 5, 100)(checkoutState);

    const totalPrice = getTotalCheckoutPrice(checkoutState);

    expect(totalPrice).toBe(3);
    expect(checkoutState.cart.length).toBe(0);
    expect(checkoutState.checkoutProducts.length).toBe(3);
});

const getTotalCheckoutPrice = (checkoutState: CheckoutState) => {
    const checkoutCart = [...checkoutState.cart, ...checkoutState.checkoutProducts];
    return checkoutCart.reduce((prev, curr) => {
        return prev + curr.price
    }, 0);
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