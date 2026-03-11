<script setup lang="ts">
import { calculateDiscountAmount } from "../../utils/helper";
import { DISCOUNT_MAPPING } from "../../constants";

import AmountRow from "./AmountRow.vue";

import type { Basket } from "../../types/basket";

defineProps<{
  basketItems: Basket;
}>();
</script>
<template>
    <AmountRow label="Subtotal:" :amount="basketItems.subTotal" class="mb-3" />
    <AmountRow label="Sales Tax:" :amount="basketItems.salesTax" class="mb-3" />
    <AmountRow v-if="basketItems.couponCode" label="Discounts:" :amount="calculateDiscountAmount(basketItems.total, DISCOUNT_MAPPING[basketItems.couponCode])" :is-discount="true" class="mb-3" :coupon-code="basketItems.couponCode" />
    <AmountRow label="Total:" :amount="basketItems.total" :is-total="true" />
</template>