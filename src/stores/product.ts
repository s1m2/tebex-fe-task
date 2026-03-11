import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { fetchBasketItems } from '../api';

import type { Basket } from '../types/basket';
import type { SuccessResponse } from '../types/success';

export const useProductStore = defineStore('product', () => {
  const basketItems = ref<Basket | null>(null);
  const orderConfirmedStatus = ref<SuccessResponse | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function makeCallToApi<T>(apiCall: () => Promise<T>): Promise<T | null> {
    loading.value = true;
    error.value = null;
    try {
      return await apiCall();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
      console.error("API call error:", err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function getBasketItems() {
    const items = await makeCallToApi(fetchBasketItems);
    if (items) {
      basketItems.value = items;
    }
  }

  return { basketItems, loading, error, getBasketItems, orderConfirmedStatus };
});