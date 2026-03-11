import axios from "axios";

import type { Basket } from "../types/basket";
import type { SuccessResponse } from "../types/success";
import type { CardFormData } from "../schema/card";

import { API_BASE_URL } from "../constants";

async function fetchBasketItems(): Promise<Basket> {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching basket items:", error);
    throw error;
  }
}


async function applyCouponCode({ code, id }: { code: string, id: string }): Promise<Basket> {
  try {
    const response = await axios.post(`${API_BASE_URL}/${id}/coupon`, { code });
    return response.data;
  } catch (error) {
    console.error("Error applying coupon code:", error);
    throw error;
  }
}

async function checkout({ cardData, id }: { cardData: CardFormData, id: string }): Promise<SuccessResponse> {
  try {
    const response = await axios.post(`${API_BASE_URL}/${id}/checkout`, {
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