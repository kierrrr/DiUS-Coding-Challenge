import Checkout from "../src/checkout";
import { StoreStock } from "../src/interfaces";
import { threeForTwo, bulkDiscount, freeProduct } from "../src/specials";

test('test_checkout_three_atvs_one_vga', () => {
    jest.clearAllMocks();

    const checkout = Checkout(specials);
    checkout.scan(atv);
    checkout.scan(atv);
    checkout.scan(atv);
    checkout.scan(vga);

    const consoleSpy = jest.spyOn(console, 'log')
    checkout.total();
    const consoleMessage = consoleSpy.mock.calls[0][0];
    expect(consoleMessage).toBe("SKUs Scanned: vga, atv, atv, atv,  Total: $249");
});

test('test_checkout_five_ipads_two_atvs', () => {
    jest.clearAllMocks();

    const checkout = Checkout(specials);
    checkout.scan(atv);
    checkout.scan(ipd);
    checkout.scan(ipd);
    checkout.scan(atv);
    checkout.scan(ipd);
    checkout.scan(ipd);
    checkout.scan(ipd);

    const consoleSpy = jest.spyOn(console, 'log')
    checkout.total();
    const consoleMessage = consoleSpy.mock.calls[0][0];
    expect(consoleMessage).toBe("SKUs Scanned: atv, atv, ipd, ipd, ipd, ipd, ipd,  Total: $2718.95");
});

test('test_checkout_one_mbp_one_ipd', () => {
    jest.clearAllMocks();

    const checkout = Checkout(specials);
    checkout.scan(mbp);
    checkout.scan(ipd);

    const consoleSpy = jest.spyOn(console, 'log')
    checkout.total();
    const consoleMessage = consoleSpy.mock.calls[0][0];
    expect(consoleMessage).toBe("SKUs Scanned: ipd, mbp, vga,  Total: $1949.98");
});

const atv: StoreStock = { sku: "atv", "name": "Apple TV", price: 109.50 };
const vga: StoreStock = { sku: "vga", "name": "VGA adapter", price: 30.00 };
const ipd: StoreStock = { sku: "ipd", name: "Super iPad", price: 549.99 };
const mbp: StoreStock = { sku: "mbp", name: "MacBook Pro", price: 1399.99 };

const specials = [
    threeForTwo(atv),
    bulkDiscount(ipd, 4, 499.99),
    freeProduct(mbp, vga)
];