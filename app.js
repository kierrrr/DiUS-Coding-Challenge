"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var products_1 = require("./products");
var scanProduct = function (state) { return ({
    scan: function (product) {
        state.products.push(product);
    }
}); };
var checkoutTotal = function (state) { return ({
    total: function () {
        var totalPrice = state.products.reduce(function (prev, curr) {
            return prev + curr.price;
        }, 0);
        console.log(totalPrice);
    }
}); };
var Checkout = function () {
    var state = {
        products: []
    };
    return __assign(__assign({}, scanProduct(state)), checkoutTotal(state));
};
var co = Checkout();
var item1 = products_1["default"]["mbp"];
var item2 = products_1["default"]["ipd"];
co.scan(item1);
co.scan(item2);
co.total();
