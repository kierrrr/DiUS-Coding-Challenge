import { CheckoutState, Product } from "../src/interfaces";
import { threeForTwo, bulkDiscount, freeItem } from "../src/promotionFunctions";

test("test_promotion_three_for_two_with_three_products", () => {

    const checkoutState = createCheckoutStateWithProducts(3);
    threeForTwo(testProduct)(checkoutState);

    const totalPrice = getTotalCheckoutPrice(checkoutState);

    // One of the products should be free
    expect(totalPrice).toBe(2);
    expect(checkoutState.cart.length).toBe(0);
    expect(checkoutState.checkoutProducts.length).toBe(3);
});

test("test_promotion_three_for_two_with_seven_products", () => {

    const checkoutState = createCheckoutStateWithProducts(7);
    threeForTwo(testProduct)(checkoutState);

    const totalPrice = getTotalCheckoutPrice(checkoutState);

    // Two of the products should be free
    expect(totalPrice).toBe(5);
    expect(checkoutState.cart.length).toBe(0);
    expect(checkoutState.checkoutProducts.length).toBe(7);
});

test("test_promotion_three_for_two_with_one_product", () => {

    const checkoutState = createCheckoutStateWithProducts(1);
    threeForTwo(testProduct)(checkoutState);

    const totalPrice = getTotalCheckoutPrice(checkoutState);

    // No specials applied
    expect(totalPrice).toBe(1);
    expect(checkoutState.cart.length).toBe(0);
    expect(checkoutState.checkoutProducts.length).toBe(1);
});

test("test_promotion_bulk_discount_with_three_discounted", () => {

    const checkoutState = createCheckoutStateWithProducts(3);
    bulkDiscount(testProduct, 2, 100)(checkoutState);

    const totalPrice = getTotalCheckoutPrice(checkoutState);

    // All prices of the product should be changed to 100
    expect(totalPrice).toBe(300);
    expect(checkoutState.cart.length).toBe(0);
    expect(checkoutState.checkoutProducts.length).toBe(3);
});

test("test_promotion_bulk_discount_with_none_discounted", () => {

    const checkoutState = createCheckoutStateWithProducts(3);
    bulkDiscount(testProduct, 5, 100)(checkoutState);

    const totalPrice = getTotalCheckoutPrice(checkoutState);

    // All prices should be the same, not enough products to be
    // eligible for pomotion
    expect(totalPrice).toBe(3);
    expect(checkoutState.cart.length).toBe(0);
    expect(checkoutState.checkoutProducts.length).toBe(3);
});

test("test_promotion_free_product_all_discounted", () => {
    const freeStock = { sku: "freeSku", name: "freeName", price: 1 };
    const checkoutState = createCheckoutStateWithProducts(2);
    checkoutState.cart.push(freeStock);
    checkoutState.cart.push(freeStock);

    freeItem(testProduct, freeStock)(checkoutState);
    const totalPrice = getTotalCheckoutPrice(checkoutState);
    const allfreeItems = checkoutState.checkoutProducts.filter(product => product.price == 0);

    expect(totalPrice).toBe(2); // Two of the products is free from promotion
    expect(checkoutState.cart.length).toBe(0);
    expect(checkoutState.checkoutProducts.length).toBe(4);
    expect(allfreeItems.length).toBe(2);
});

test("test_promotion_free_product_none_discounted", () => {
    const freeStock = { sku: "freeSku", name: "freeName", price: 1 };
    const anotherStock = { sku: "anotherSky", name: "anotherName", price: 2 };
    const checkoutState = createCheckoutStateWithProducts(3);

    freeItem(anotherStock, freeStock)(checkoutState);
    const totalPrice = getTotalCheckoutPrice(checkoutState);
    const allfreeItems = checkoutState.checkoutProducts.filter(product => product.sku == freeStock.sku);

    expect(totalPrice).toBe(3); // None of the products gets a free item
    expect(checkoutState.checkoutProducts.length).toBe(0);
    expect(allfreeItems.length).toBe(0);
});

test("test_promotion_free_product_one_scanned_not_free", () => {
    const freeStock = { sku: "freeSku", name: "freeName", price: 1 };
    const checkoutState = createCheckoutStateWithProducts(2);
    checkoutState.cart.push(freeStock);
    checkoutState.cart.push(freeStock);
    // There are only 2 products which matches a free item. The next item should not be free
    checkoutState.cart.push(freeStock);

    freeItem(testProduct, freeStock)(checkoutState);
    const totalPrice = getTotalCheckoutPrice(checkoutState);
    const allfreeItems = checkoutState.checkoutProducts.filter(product => product.price == 0);

    expect(totalPrice).toBe(3); // One of the products should not be free
    expect(checkoutState.checkoutProducts.length).toBe(4);
    expect(allfreeItems.length).toBe(2);
});

const getTotalCheckoutPrice = (checkoutState: CheckoutState) => {
    const checkoutCart = [...checkoutState.cart, ...checkoutState.checkoutProducts];
    return checkoutCart.reduce((prev, curr) => {
        return prev + curr.price;
    }, 0);
};

const testProduct = {
    sku: "sku1",
    name: "stock1",
    price: 1
};

const createCheckoutStateWithProducts = (num: number): CheckoutState => {
    const stock1: Product = { ...testProduct };

    const checkoutState: CheckoutState = {
        cart: [...Array(num)].map(_ => stock1),
        checkoutProducts: []
    };

    return checkoutState;
};