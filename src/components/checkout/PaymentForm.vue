<script setup lang="ts">
import { ref } from "vue";
import { CardSchema } from "../../schema/card";
import type { CardFormData } from "../../schema/card";

import AppInput from "../atoms/AppInput.vue";
import AppButton from "../atoms/AppButton.vue";

const props = defineProps<{
  externalError: string | null;
}>();

const emit = defineEmits<{
  "submit-card": [cardDetails: CardFormData];
}>();

const card = ref<CardFormData>({
  number: "",
  expiry: "",
  cvc: "",
  email: "",
  name: "",
  postalCode: ""
});

const errors = ref<CardFormData>({
  number: "",
  expiry: "",
  cvc: "",
  email: "",
  name: "",
  postalCode: ""
})

function handleSubmit() {
  Object.keys(errors.value).forEach((key) => (errors.value[key as keyof typeof errors.value] = ""));

  const result = CardSchema.safeParse(card.value);

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const key = issue.path[0];
      if (typeof key === "string" && key in errors.value) {
        errors.value[key as keyof typeof errors.value] = issue.message;
      }
    });
    return;
  }

  emit("submit-card", result.data);
}
</script>

<template>
  <p v-if="externalError" class="bg-red-500 text-white p-4 mb-4" data-testid="external-error">
    {{ externalError }}
  </p>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
    <AppInput id="email" label="Email" placeholder="Enter your email address" v-model="card.email"
      :error="errors.email" :markRequired="true" :required="true" />
    <AppInput id="cardNumber" label="Card number" placeholder="1234 5678 9012 3456" v-model="card.number"
      :error="errors.number" :markRequired="true" :required="true" />
    <div class="md:flex gap-3" data-testid="card-details">
      <AppInput id="expiry" label="Expiry date" placeholder="MM/YY" v-model="card.expiry" :error="errors.expiry" class="md:w-[126px]" :markRequired="true" :required="true"/>
      <AppInput id="cvv" label="CVV" placeholder="123" v-model="card.cvc" :error="errors.cvc" class="md:w-[126px]" :markRequired="true" :required="true"/>
      <AppInput id="zip" label="ZIP code / Postal code" placeholder="12345" v-model="card.postalCode"
        :error="errors.postalCode" class="md:w-full" :markRequired="true" :required="true" />
    </div>
    <AppInput id="nameOnCard" label="Name on card" placeholder="Enter name as it appears on card" v-model="card.name"
      :error="errors.name" :markRequired="true" :required="true" />
    <AppButton data-testid="pay-by-card-button" type="submit" variant="primary" class="w-full">Pay by Card</AppButton>
  </form>
</template>