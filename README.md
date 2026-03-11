# Tebex Front-end Quest

Greetings, adventurer! Embark upon this tech task as a noble quest.

## Overview

We would like you to create a simple front-end for a checkout using the Figma designs provided. In this project there are APIs that will enable you to complete the task.

You may use any tools/libraries you need to help you to complete this quest!

### What are we looking for?

- Does the end product look exactly like the designs?
- Does the form have some validation?
- Is the code clean, consistent and extensible?
- Add unit tests or e2e tests, you don't need to get 100% coverage a few tests should suffice
- Consider responsive design, how does it look on mobile?

Ready to get started?

### Setup

```shell
npm install
```

Launch the APIs this will run on port 3000

```shell
npm run api
```

This project uses vite to run the dev server execute

```shell
npm run dev
```

### API endpoints

There are 3 endpoints

The first to `GET` the basket with the selected products and price information. The second is a `POST` endpoint to submit the checkout, more information can be found below. Lastly there is a `POST` coupon endpoint that will apply a discount to the basket and return the updated basket.

Be sure to pass the `Content-Type` header of `application/json` when performing the post requests.

#### Get basket endpoint

```text
GET  /api/basket
```

This will return

```json
{
  "id": "1",
  "products": [
    {
      "name": "Medium Booster",
      "price": 9.99,
      "image": "medium_booster.png",
      "quantity": 1
    },
    {
      "name": "Small Coins",
      "price": 4.99,
      "image": "small_coins.png",
      "quantity": 1
    }
  ],
  "couponCode": null,
  "subTotal": 14.98,
  "salesTax": 3.00,
  "total": 17.98,
}
```

#### Apply coupon endpoint

```text
POST  /api/basket/:id/coupon
Body: 
{
    "code": "25OFF"
}
```

This will return the basket along with the applied discount, use code 25OFF for 25% off the total price.

```json
{
  "id": "1",
  "products": [
    {
      "name": "Medium Booster",
      "price": 9.99,
      "image": "medium_booster.png",
      "quantity": 1
    },
    {
      "name": "Small Coins",
      "price": 4.99,
      "image": "small_coins.png",
      "quantity": 1
    }
  ],
  "couponCode": "25OFF",
  "subTotal": 11.24,
  "salesTax": 2.25,
  "total": 13.48
}
```

#### Complete checkout endpoint

```text
POST  /api/basket/:id/checkout
Body:
{
    cardCvc: "123",
    cardExpiry: "01/24",
    cardNumber: "1111222233334444",
    email: "john.doe@example.com",
    nameOnCard: "John Doe",
    postalCode: "SW1W 0NY"
}
```

This will return

```json
{ "success": true, "transactionId": "tbx-6a6da59ebfa86d3d106fb68be75c0fd7" }
```

#### Assets
All the assets you require wil be in the `public/` directory.