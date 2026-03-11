import { defineStore } from 'pinia';
import { ref } from 'vue';

import { applyCouponCode } from '../api';
import { useProductStore } from './product';

export const useCouponStore = defineStore('coupon', () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const productStore = useProductStore();

  async function makeCallToApi<T>(apiCall: () => Promise<T>): Promise<T | null> {
    loading.value = true;
    error.value = null;
    try {
      return await apiCall();
    } catch (err) {
      error.value = 'An error occurred while applying the coupon code.';
      console.error("API call error:", err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function applyCode(code: string) {
    const id = productStore.basketItems?.id;
    if (!id) {
      error.value = "No items in the basket.";
      return;
    }

    const result = await makeCallToApi(() => applyCouponCode({ code, id }));
    if (result) {
      productStore.basketItems = result;
    }
  }

  return { loading, error, applyCode };
});