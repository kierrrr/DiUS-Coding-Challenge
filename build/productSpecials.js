"use strict";
exports.__esModule = true;
var specials_1 = require("./specials");
var products_1 = require("./products");
var productSpecials = [
    specials_1.threeForTwo(products_1["default"]["atv"]),
    specials_1.bulkDiscount(products_1["default"]["ipd"], 4, 499.99),
    specials_1.freeProduct(products_1["default"]["mbp"], products_1["default"]["vga"])
];
exports["default"] = productSpecials;
