<script setup lang="ts">
import { computed } from 'vue';

import AppBadge from '../atoms/AppBadge.vue';

const props = defineProps<{
  label: string;
  amount: number;
  isDiscount?: boolean;
  isTotal?: boolean;
  couponCode?: string;
}>();

const formattedAmount = computed(() => {
  const sign = props.isDiscount ? '-' : '';
  return `${sign}${props.amount} USD`;
});

const isTotalStyle = computed(() => props.isTotal ? 'text-lg font-bold' : '');
</script>

<template>
  <div class="flex justify-between">
    <div class="flex flex-col gap-1.5">
      <p :data-testid="`amount-row-label-${label}`" :class="[isTotalStyle]">{{ label }}</p>
      <AppBadge v-if="isDiscount" :data-testid="`amount-row-discount-${label}`">{{ couponCode }}</AppBadge>
    </div>
    <p :data-testid="`amount-row-amount-${label}`" :class="['self-end', isTotalStyle]">{{ formattedAmount }}</p>
  </div>
</template>