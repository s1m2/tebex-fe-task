<script setup lang="ts">
import { ref, onMounted } from 'vue';

type AccordionItem = {
  id: string;
  title: string;
}

const props = defineProps<{
  items: AccordionItem[];
}>();

const expandedIds = ref<Set<string>>(new Set());

onMounted(() => {
  if (props.items.length > 0) {
    expandedIds.value.add(props.items[0].id);
  }
});

function toggleItem(id: string) {
  if (expandedIds.value.has(id)) {
    expandedIds.value.delete(id);
  } else {
    expandedIds.value.clear();
    expandedIds.value.add(id);
  }
};

function isExpanded(id: string) {
  return expandedIds.value.has(id);
};
</script>

<template>
  <div data-testid="accordion" class="bg-black space-y-2">
    <div v-for="item in items" :key="item.id" :data-testid="`accordion-item-${item.id}`">
      <button :data-testid="`accordion-button-${item.id}`" :aria-expanded="isExpanded(item.id)"
        class="w-full px-6 py-4 text-left font-semibold bg-[#1a1a1a]  hover:bg-gray-200 transition-colors duration-200 flex items-center justify-between"
        @click="toggleItem(item.id)">
        <span class="text-white">{{ item.title }}</span>
        <span :data-testid="`accordion-icon-${item.id}`"
          class="transform transition-transform duration-300 text-white text-lg font-bold">
          {{ isExpanded(item.id) ? '−' : '+' }}
        </span>
      </button>

      <transition enter-active-class="transition-all duration-500 ease-out"
        leave-active-class="transition-all duration-500 linear" enter-from-class="opacity-0 max-h-0"
        enter-to-class="opacity-100 max-h-screen" leave-from-class="opacity-100 max-h-screen"
        leave-to-class="opacity-0 max-h-0">
        <div v-if="isExpanded(item.id)" :data-testid="`accordion-content-${item.id}`" class="p-10">
          <slot :name="`content-${item.id}`" :item="item"></slot>
        </div>
      </transition>
    </div>
  </div>
</template>
