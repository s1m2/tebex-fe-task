import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import type { CardFormData } from '../schema/card';
import { checkout } from '../api';
import type { SuccessResponse } from '../types/success';
import { useProductStore } from './product';

export const usePaymentStore = defineStore('payment', () => {
  const orderConfirmedStatus = ref<SuccessResponse | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const router = useRouter();
  const productStore = useProductStore();

  async function makeCallToApi<T>(apiCall: () => Promise<T>): Promise<T | null> {
    loading.value = true;
    error.value = null;
    try {
      return await apiCall();
    } catch (err) {
      error.value = 'Payment was unsuccessful. Please try again.';
      console.error("API call error:", err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  async function payByCard(cardData: CardFormData) {
    const id = productStore.basketItems?.id;

    if (!id) {
      error.value = "No items in the basket.";
      return;
    }
    
    const result = await makeCallToApi(() => checkout({ cardData, id }));
    if (result) {
      orderConfirmedStatus.value = result;
      router.push('/success');
    }
  }

  return { orderConfirmedStatus, loading, error, payByCard };
});