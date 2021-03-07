"use strict";
exports.__esModule = true;
var promotionFunctions_1 = require("./promotionFunctions");
var stock_1 = require("./stock");
var allPromotions = [
    promotionFunctions_1.threeForTwo(stock_1["default"]["atv"]),
    promotionFunctions_1.bulkDiscount(stock_1["default"]["ipd"], 4, 499.99),
    promotionFunctions_1.freeItem(stock_1["default"]["mbp"], stock_1["default"]["vga"])
];
exports["default"] = allPromotions;
