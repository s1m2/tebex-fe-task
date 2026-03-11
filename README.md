# Tebex Front-end Quest

## Installation and Setup

### Node Version

This project requires **Node.js v18 or higher**.

### Install Dependencies

```shell
npm install
```

### Run Development Server

```shell
npm run dev
```

The dev server will start on `http://localhost:8080`.

### Run the API Server

```shell
npm run api
```

The API server runs on `http://localhost:3000`.

## Testing

### Unit Tests

Run the unit tests:

```shell
npm run test
```

### E2E Tests

Open Cypress for interactive testing:

```shell
npm run cypress:open
```

Run Cypress tests in headless mode:

```shell
npm run cypress:headless
```

Project testing external url 

https://tebex-fe-task.netlify.app/

## Project Structure

- **`src/`** - Main application source code
  - **`components/`** - Vue components (atoms, checkout, shared)
  - **`views/`** - Page components (CheckoutView, SuccessView)
  - **`stores/`** - Pinia state management
  - **`api/`** - API integration
  - **`types/`** - TypeScript type definitions
  - **`utils/`** - Helper utilities
  - **`constants/`** - Application constants
  - **`schema/`** - Validation schemas
- **`api/`** - Backend API server (Node.js/Fastify)
- **`cypress/`** - E2E tests
- **`public/`** - Static assets (images, etc.)

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