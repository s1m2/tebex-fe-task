<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  variant: string;
}>();

const classObject = computed(() => ({
  'bg-[#1a1a1a]': props.variant === 'primary',
  'bg-black': props.variant === 'secondary',
}))
</script>

<template>
  <div :data-testid="`section-${variant}`" :class="['flex flex-col h-screen overflow-hidden', classObject]">
    <div class="w-118.75 mx-auto mt-10">
      <slot />
    </div>
  </div>
</template>