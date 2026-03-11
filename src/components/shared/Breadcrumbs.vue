<script setup lang="ts">
type Breadcrumb = {
  name: string;
  link: string;
};

defineProps<{
  pageBreadcrumbs: Breadcrumb[];
  currentPage: string;
}>();
</script>

<template>
  <ul class="flex" data-testid="breadcrumbs">
    <li v-for="breadcrumb in pageBreadcrumbs" :key="breadcrumb.link" :data-testid="`breadcrumb-${breadcrumb.name}`"
      :class="['breadcrumb-item', currentPage === breadcrumb.link && 'text-[#41C4C3] font-bold']">{{
        breadcrumb.name }}</li>
  </ul>
</template>

<style scoped>
.breadcrumb-item:not(:last-child)::after {
  content: '>';
  margin: 0 1rem;
}
</style>