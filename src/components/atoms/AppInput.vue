<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  placeholder: string;
  required?: boolean;
  error?: string;
}>();

const model = defineModel()
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :data-testid="`label-${id}`" class="font-bold" :for="id">{{ label }}</label>
    <input :data-testid="`input-${id}`" v-model="model" type="text" :placeholder="placeholder" :required="required" :name="id" :id="id"
      class="bg-[#262626] border border-[#333333] p-2 rounded-sm" autocomplete="off" />
    <p v-if="error" :data-testid="`error-${id}`" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>