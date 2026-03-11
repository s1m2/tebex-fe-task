<script setup lang="ts">
import { useProductStore } from "../stores/product";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const { orderConfirmedStatus } = storeToRefs(productStore);
</script>
<template>
  <div data-testid="success-page" class="bg-black h-dvh place-items-center flex flex-col gap-4">
    <img data-testid="logo" src="/img/logo.svg" class="logo my-14 mx-auto" alt="logo" />
    <div class="text-center border border-[#e5e5e5] p-10 md:w-[740px]">
      <img data-testid="success-icon" src="/img/success.svg" alt="Success" class="h-12 w-12 mx-auto mb-4">
      <p data-testid="order-complete" class="font-bold text-3xl mb-5">Order complete</p>
      <p data-testid="thank-you-message" class="mb-5">Thank you for your payment. You will receive your purchased <br/>products shortly.</p>
      <div class="p-4 bg-[#1a1a1a]">
        <p data-testid="order-number"> Order Number: {{ orderConfirmedStatus?.transactionId }}</p>
      </div>
    </div>
  </div>
</template>