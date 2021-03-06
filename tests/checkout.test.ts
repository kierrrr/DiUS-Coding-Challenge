import Checkout from "../src/checkout";
import { Product } from "../src/interfaces";
import { threeForTwo, bulkDiscount, freeItem } from "../src/promotionFunctions";

// Coding challenge example: SKUs Scanned: atv, atv, atv, vga Total expected: $249.00
test('test_checkout_three_atvs_one_vga', () => {
    jest.clearAllMocks(); // Clear console log

    const checkout = Checkout(specials);
    checkout.scan(atv);
    checkout.scan(atv);
    checkout.scan(atv);
    checkout.scan(vga);

    const consoleSpy = jest.spyOn(console, 'log');
    checkout.total();
    const consoleMessage = consoleSpy.mock.calls[0][0];
    expect(consoleMessage).toBe("SKUs Scanned: vga, atv, atv, atv,  Total: $249.00");
});

// Coding challenge example: SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd Total expected: $2718.95
test('test_checkout_five_ipads_two_atvs', () => {
    jest.clearAllMocks(); // Clear console log

    const checkout = Checkout(specials);
    checkout.scan(atv);
    checkout.scan(ipd);
    checkout.scan(ipd);
    checkout.scan(atv);
    checkout.scan(ipd);
    checkout.scan(ipd);
    checkout.scan(ipd);

    const consoleSpy = jest.spyOn(console, 'log');
    checkout.total();
    const consoleMessage = consoleSpy.mock.calls[0][0];
    expect(consoleMessage).toBe("SKUs Scanned: atv, atv, ipd, ipd, ipd, ipd, ipd,  Total: $2718.95");
});

// Coding challenge example: SKUs Scanned: mbp, vga, ipd Total expected: $1949.98
test('test_checkout_one_mbp_one_ipd', () => {
    jest.clearAllMocks(); // Clear console log

    const checkout = Checkout(specials);
    checkout.scan(mbp);
    checkout.scan(ipd);
    checkout.scan(vga);

    const consoleSpy = jest.spyOn(console, 'log');
    checkout.total();
    const consoleMessage = consoleSpy.mock.calls[0][0];
    expect(consoleMessage).toBe("SKUs Scanned: ipd, mbp, vga,  Total: $1949.98");
});

const atv: Product = { sku: "atv", "name": "Apple TV", price: 109.50 };
const vga: Product = { sku: "vga", "name": "VGA adapter", price: 30.00 };
const ipd: Product = { sku: "ipd", name: "Super iPad", price: 549.99 };
const mbp: Product = { sku: "mbp", name: "MacBook Pro", price: 1399.99 };

// Opening day specials
const specials = [
    threeForTwo(atv),
    bulkDiscount(ipd, 4, 499.99),
    freeItem(mbp, vga)
];