import { Product, CheckoutState } from "../src/interfaces";
import { scanProduct, checkoutTotal } from "../src/checkoutFunctions";

test("test_checkout_scan_products", () => {
    const stock1: Product = { sku: "sku1", name: "stock1", price: 1 };
    const stock2: Product = { sku: "sku2", name: "stock2", price: 2 };
    const stock3: Product = { sku: "sku3", name: "stock3", price: 3 };

    const checkoutState: CheckoutState = {
        cart: [],
        checkoutProducts: []
    };

    scanProduct(checkoutState).scan(stock1);
    scanProduct(checkoutState).scan(stock2);
    scanProduct(checkoutState).scan(stock3);

    // Test scanning order and all of the orders should be in the cart array
    expect(checkoutState.cart.length).toBe(3);
    expect(checkoutState.cart[0].sku).toBe("sku1");
    expect(checkoutState.cart[0].name).toBe("stock1");
    expect(checkoutState.cart[0].price).toBe(1);

    expect(checkoutState.cart[1].sku).toBe("sku2");
    expect(checkoutState.cart[2].name).toBe("stock3");
    expect(checkoutState.cart[2].price).toBe(3);
});

test("test_checkout_total_no_promotions", () => {
    const stock1: Product = { sku: "sku1", name: "stock1", price: 1 };
    const stock2: Product = { sku: "sku2", name: "stock2", price: 2 };
    const stock3: Product = { sku: "sku3", name: "stock3", price: 3 };

    const checkoutState: CheckoutState = {
        cart: [stock1, stock2, stock3],
        checkoutProducts: []
    };

    // Check that the total function outputs something into the console log
    // and that it correctly calculates the total price
    const consoleSpy = jest.spyOn(console, 'log');
    checkoutTotal(checkoutState, []).total();
    const consoleMessage = consoleSpy.mock.calls[0][0];
    expect(consoleMessage).toBe("SKUs Scanned: sku1, sku2, sku3,  Total: $6.00");
});