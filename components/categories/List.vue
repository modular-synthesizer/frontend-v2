<template>
  <v-select v-model="model" :items item-title="name" item-value="id" :rules />
</template>

<script setup lang="ts">
const { t } = useI18n()

const rules = [
  (value: string) => !!value || t("tools.create.category.required")
]

const model = defineModel<string>({ required: true })

const items = ref(await features.tools.categories.list())
</script> 