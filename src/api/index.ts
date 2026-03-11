import axios from "axios";
import type { Basket } from "../types/basket";
import type { SuccessResponse } from "../types/success";
import type { CardFormData } from "../schema/card";

async function fetchBasketItems(): Promise<Basket> {
  try {
    const response = await axios.get("/api/basket");
    return response.data;
  } catch (error) {
    console.error("Error fetching basket items:", error);
    throw error;
  }
}


async function applyCouponCode({ code, id }: { code: string, id: string }): Promise<Basket> {
  try {
    const response = await axios.post(`/api/basket/${id}/coupon`, { code });
    return response.data;
  } catch (error) {
    console.error("Error applying coupon code:", error);
    throw error;
  }
}

async function checkout({ cardData, id }: { cardData: CardFormData, id: string }): Promise<SuccessResponse> {
  try {
    const response = await axios.post(`/api/basket/${id}/checkout`, {
      cardCvc: cardData.cvc,
      cardExpiry: cardData.expiry,
      cardNumber: cardData.number,
      email: cardData.email,
      nameOnCard: cardData.name,
      postalCode: cardData.postalCode,
    });
    return response.data;
  } catch (error) {
    console.error("Error during checkout:", error);
    throw error;
  }
}

export { fetchBasketItems, applyCouponCode, checkout };