# DiUS Computer Store Checkout
This repository contains a Javascript project to the spec given on the DiUS coding challenge. This document details assumptions made in producing this project, and more information about decisions I made in its creation.

## Environment
This project will build and run using `Node.js v15.8.0` and `yarn`. The language is Javascript using the ES6 standard with `Typescript v4.2.3` for type-checking.
### Installation
To run, clone this repository and make sure that you have Node and Yarn installed globally on your machine.
\
To install all the required libraries for this project:
```properties
yarn
```
To run the project
```properties
yarn start
```
To run the tests
```properties
yarn test
```
## Project Structure
### File structure
All the source files in the project are in the `/src` folder which also contains the list of products (`stock.ts`) in the store and the promotions (`promotions.ts`) that are currently happening. Typescript will only transpile the files in this folder.
\
All the test files are located in the `/src` folder. The transpiled Javascript files are in the `/build` folder which contains the `app.js` file used to run the project.
### Architecture
I have integrated functional programming concepts in this application to avoid the pitfalls of OOP. I have used dependency injection and function composition to make the codebase more modular and allow for easy unit testing. 
\
The challenge states that the pricing rules (promotions/prices) can change at any time so I've taken into account the following:
- All the products are stored in its own collection so its properties can be easily changed.
- All promotions can be injected into the Checkout, allowing for different checkouts to have different promotions.
- Each promotion has its own logic to implement the business rules. The function then curries a checkout state to apply and modify the checkout instance for promotion eligibility and its discounts or sales. 
- Each checkout method can be composed into other classes if we ever wanted to reuse scan or checkout methods.

## Tests
`Jest v26.6.3` was the library I used to make tests but unfortunately some babel libraries were required to get the Jest tests to work with Typescript.
\
The beauty of functional programming is that it makes testing a breeze. With this approach, I have able to have full test coverage of the project. 
\
Through dependency injection, I was able to test each promotion function by injecting different checkout states which gave me the peace of mind that they would work once I composed it with the whole checkout mechanism.
```javascript
test("test_promotion_three_for_two_with_three_products", () => {
    const checkoutState = createCheckoutStateWithProducts(3);
    threeForTwo(testProduct)(checkoutState);
    const totalPrice = getTotalCheckoutPrice(checkoutState);

    // One of the products should be free
    expect(totalPrice).toBe(2);
    expect(checkoutState.cart.length).toBe(0);
    expect(checkoutState.checkoutProducts.length).toBe(3);
});
```
While building the project, I was using TDD to make sure that I was keeping up with the test coverage of the application and testing for the different test cases in each functionality.