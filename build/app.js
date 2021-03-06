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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var products_1 = require("./products");
var specialProducts_1 = require("./specialProducts");
var scanProduct = function (state) { return ({
    scan: function (product) {
        state.cart.push(product);
    }
}); };
var checkoutTotal = function (state, specials) { return ({
    total: function () {
        specials.forEach(function (thing) {
            thing(state);
        });
        var checkoutCart = __spreadArray(__spreadArray([], state.cart), state.checkoutProducts);
        var totalPrice = checkoutCart.reduce(function (prev, curr) {
            return prev + curr.price;
        }, 0);
        console.log("Total Price $" + totalPrice);
    }
}); };
var Checkout = function (checkoutSpecials) {
    var state = {
        cart: [],
        checkoutProducts: []
    };
    var specials = checkoutSpecials;
    return __assign(__assign({}, scanProduct(state)), checkoutTotal(state, specials));
};
var co = Checkout(specialProducts_1["default"]);
// const item1 = products["mbp"];
// const item2 = products["ipd"];
var atv = products_1["default"]["atv"];
var mbp = products_1["default"]["mbp"];
co.scan(atv);
co.scan(atv);
co.scan(atv);
co.scan(mbp);
co.total();
