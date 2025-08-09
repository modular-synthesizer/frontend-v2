<template>
  <v-select v-model="model" :items :disabled="loading" item-title="name" item-value="id" />
</template>

<script setup lang="ts">
import type { Category } from '~/core/business/tools/Category.type';

const model = defineModel()

const loading = ref(true)
const items: Ref<Category[]> = ref([])
items.value = await features.tools.categories.list();
loading.value = false
</script>