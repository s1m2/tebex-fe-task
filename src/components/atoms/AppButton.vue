<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  variant: string;
}>();

const classObject = computed(() => ({
  'bg-[#41C4C3]': props.variant === 'primary',
  'bg-[#E5E5E5]': props.variant === 'secondary',
}))


</script>

<template>
  <button
    data-testid="app-button"
    :class="['px-4 py-2 cursor-pointer h-fit text-black', classObject]"
  >
    <slot />
  </button>
</template>