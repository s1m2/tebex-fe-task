<script setup lang="ts">
import type { Product } from '../../types/product';

defineProps<{
  product: Product;
}>();
</script>

<template>
  <div class="flex justify-between">
    <img :data-testid="`order-item-image-${product.name}`" :src="`/img/products/${product.image}`" :alt="product.name" class="h-10 w-10 aspect-square object-cover" />
    <div class="grow">
      <p :data-testid="`order-item-name-${product.name}`" class="font-semibold">{{ product.name }}</p>
      <p :data-testid="`order-item-quantity-${product.name}`">Qty: {{ product.quantity }}</p>
    </div>
    <div :data-testid="`order-item-price-${product.name}`">
      {{ product.price }} USD
    </div>
  </div>
</template>