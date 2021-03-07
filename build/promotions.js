"use strict";
exports.__esModule = true;
var promotionFunctions_1 = require("./promotionFunctions");
var products_1 = require("./products");
var allPromotions = [
    promotionFunctions_1.threeForTwo(products_1["default"]["atv"]),
    promotionFunctions_1.bulkDiscount(products_1["default"]["ipd"], 4, 499.99),
    promotionFunctions_1.freeProduct(products_1["default"]["mbp"], products_1["default"]["vga"])
];
exports["default"] = allPromotions;
