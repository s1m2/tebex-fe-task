<script setup lang="ts">
import { onMounted } from "vue";

import OrderItem from "./OrderItem.vue";
import ApplyCoupon from "./ApplyCoupon.vue";
import AmountRow from "./AmountRow.vue";

import { useProductStore } from "../../stores/product";
import { storeToRefs } from "pinia";
import { calculateDiscountAmount } from "../../utils/helper";
import { DISCOUNT_MAPPING } from "../../constants";

const productStore = useProductStore();
const { basketItems } = storeToRefs(productStore);
const { getBasketItems, applyCode } = productStore;

onMounted(() => {
  if(basketItems.value === null) getBasketItems();
});
</script>

<template>
  <template v-if="basketItems">
    <p data-testid="order-container-title" class="font-bold mb-5">Your order</p>
    <OrderItem v-for="product in basketItems.products" :key="product.name+product.price" :product="product" class="mb-5" />
    <div class="h-20 md:h-[165px] "></div>
    <ApplyCoupon @apply-coupon="applyCode({ code: $event, id: basketItems.id })" class="mb-6" />
    <AmountRow label="Subtotal:" :amount="basketItems.subTotal" class="mb-3" />
    <AmountRow label="Sales Tax:" :amount="basketItems.salesTax" class="mb-3" />
    <AmountRow v-if="basketItems.couponCode" label="Discounts:" :amount="calculateDiscountAmount(basketItems.total, DISCOUNT_MAPPING[basketItems.couponCode])" :is-discount="true" class="mb-3" />
    <AmountRow label="Total:" :amount="basketItems.total" :is-total="true" />
  </template>
</template>