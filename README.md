# Code Test For Checkout System

## Intro

This repo contains the source code of DiUS computer store checkout system, which has following features.

1. It scans product and update shopping cart.
2. It validates whether the scanned product existing in catalogue or not.
3. It calculates the total amount under pricing rules.
4. The current pricing rules can be changed.
5. Rules can be added if necessary.

## Requirements

Make sure to run this repo in NodeJS(>= v10.16.2) environment.

## How to run

1. Install dependencies.

```
npm install
```

2. Run application

```
npm run start
```

We should see the outcome as below which is related to the example scenarios written in [here](https://github.com/DiUS/coding-tests/blob/master/dius_shopping.md).

```
====> Scenario 1: SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd Total expected: $2718.95
====> Scenario 2: SKUs Scanned: atv, atv, atv, vga Total expected: $249
====> Scenario 3: SKUs Scanned: mbp, vga, ipd Total expected: $1949.98
```

## How to run test

Testing is built with Jest, result can be seen by running the below command line.

```
npm run test
```

## How to update current pricing rule.

When instantiating pricingRules functions, we can change pricing rules by passing different argument as below:

```
// buy 3 Apple TVs, only pay the price of 2 only
const freeDeal = new FreeDeal({
  productName: "atv",
  initialItemsCount: 3,
  payableItemsCount: 2,
});

// buy 5 MacBook Pros, only pay the price of 3 only
const freeDeal = new FreeDeal({
  productName: "mbp",
  initialItemsCount: 5,
  payableItemsCount: 3,
});
```

## Process of Thought

When I started building this, I wrote a functional version first, which was straightforward, then I took the ability to update pricing rules into consideration, so I decided to modulize the rules by making each of them into indivisual function, and put them in `utils/pricingRules` folder, which ended up being more maintainable since the folder structure is more clear, and functions are seperated based on their purposes.

There are more benefits of seperating rules into indivisual function such as being more testable and reusable, because the logic and behaviour become simple and consistent, this gives sales manager the ability to update pricing rules and the system will always work.

For class `Checkout`, it should work with or without pricing rules applied, so the main approach here is to make it easy to adapt rules when they are applied, and being scalable since there could be more rules for any promotion.
