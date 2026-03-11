<script setup lang="ts">
import { ref } from "vue";

import AppInput from "../atoms/AppInput.vue";
import AppButton from "../atoms/AppButton.vue";

const emit = defineEmits<{
  "apply-coupon": [code: string];
}>();

const model = ref<string>('');
const error = ref<string>('');

function handleApplyCoupon() {
  if (!model.value) {
    error.value = "Please enter a coupon code.";
    return;
  }

  emit("apply-coupon", model.value);
  error.value = '';
}
</script>
<template>
  <div>
    <div class="flex gap-3">
      <AppInput v-model="model" id="code" label="Coupon/Gift Card" placeholder="Enter code here" class="w-full" />
      <AppButton data-testid="apply-coupon-button" class="self-end" variant="secondary" @click="handleApplyCoupon">Confirm</AppButton>
    </div>
    <p v-if="error" data-testid="no-coupon-applied-error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>

</template>