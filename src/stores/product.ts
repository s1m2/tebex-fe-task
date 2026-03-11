import { defineStore } from 'pinia';
import { ref } from 'vue';

import { fetchBasketItems, applyCouponCode, checkout } from '../api';

import type { CardFormData } from '../schema/card';
import type { Basket } from '../types/basket';
import type { SuccessResponse } from '../types/success';
import { useRouter } from 'vue-router';

export const useProductStore = defineStore('product', () => {
  const basketItems = ref<Basket | null>(null);
  const orderConfirmedStatus = ref<SuccessResponse | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const router = useRouter();

  async function getBasketItems() {
    loading.value = true;
    error.value = null;
    try {
      const items = await fetchBasketItems();
      basketItems.value = items;
    } catch (error) {
      console.error("Error fetching basket items:", error);
    } finally {
      loading.value = false;
    }
  }

  async function applyCode({code, id}: {code: string, id: string}) {
    loading.value = true;
    error.value = null;
    try {
      const items = await applyCouponCode({ code, id });
      basketItems.value = items;
    } catch (error) {
      console.error("Error applying coupon code:", error);
    } finally {
      loading.value = false;
    }
  }

  async function payByCard(cardData: CardFormData) {
    loading.value = true;
    error.value = null;
    try {
      const result = await checkout({ cardData, id: basketItems.value?.id || '' });
      orderConfirmedStatus.value = result;
      router.push('/success');
    } catch (error) {
      console.error("Error during checkout:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  }

  return { basketItems, loading, error, getBasketItems, applyCode, payByCard, orderConfirmedStatus }
})