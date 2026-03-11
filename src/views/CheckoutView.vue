<script lang="ts" setup>
import SectionLayout from "../components/shared/SectionLayout.vue";
import OrderContainer from "../components/checkout/OrderContainer.vue";
import PaymentForm from "../components/checkout/PaymentForm.vue";
import Accordion from "../components/shared/Accordion.vue";

import { useProductStore } from "../stores/product";
import Breadcrumbs from "../components/shared/Breadcrumbs.vue";

const productStore = useProductStore();
const { payByCard } = productStore;

document.title = "Tebex - Frontend task";
</script>

<template>
  <div data-testid="checkout-page" class="hidden md:grid grid-cols-2">
    <SectionLayout variant="primary">
      <img src="/img/logo.svg" alt="Tebex Logo" class="mb-8" />
      <OrderContainer />
    </SectionLayout>

    <SectionLayout variant="secondary">
      <Breadcrumbs
        :pageBreadcrumbs="[{ name: 'Make Payment', link: 'checkout' }, { name: 'Order Confirmed', link: 'success' }]"
        currentPage="checkout" class="mb-5 mt-20" />
      <PaymentForm @submit-card="payByCard" />
    </SectionLayout>
  </div>

  <div data-testid="checkout-page-mobile" class="md:hidden bg-black h-screen ">
    <img src="/img/logo.svg" alt="Tebex Logo" class="p-4" />
    <Accordion :items="[
      { id: '1', title: 'Order Details' },
      { id: '2', title: 'Payment Information' }
    ]">
      <template #content-1>
        <OrderContainer />
      </template>

      <template #content-2>
        <PaymentForm @submit-card="payByCard" />
      </template>
    </Accordion>
  </div>
</template>
