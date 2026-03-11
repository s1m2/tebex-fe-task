<script setup lang="ts">
import { onMounted } from "vue";

import OrderItem from "./OrderItem.vue";
import ApplyCoupon from "./ApplyCoupon.vue";
import RowContainer from "./RowContainer.vue";

import { useProductStore } from "../../stores/product";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const { basketItems, loading, error } = storeToRefs(productStore);
const { getBasketItems, applyCode } = productStore;

onMounted(() => {
  if(basketItems.value === null) getBasketItems();
});
</script>

<template>
  <template v-if="loading">
    <p data-testid="loading-order-container" class=" text-white">Loading your order...</p>
  </template>

  <template v-if="error">
    <p data-testid="error-order-container" class=" text-white">Failed to load your order. Please try again later or refresh the page.</p>
  </template>

  <template v-if="basketItems">
    <p data-testid="order-container-title" class="font-bold mb-5">Your order</p>
    <OrderItem v-for="product in basketItems.products" :key="product.name+product.price" :product="product" class="mb-5" />
    <div class="h-20 md:h-[165px] "></div>
    <ApplyCoupon @apply-coupon="applyCode" class="mb-6" />
    <RowContainer :basket-items="basketItems" />
  </template>

  <p v-else data-testid="empty-order-container" class=" text-white">Your basket is empty.</p>
</template>