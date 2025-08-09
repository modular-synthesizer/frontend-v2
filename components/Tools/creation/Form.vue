<template>
  <v-form ref="form">
    <v-text-field
      :rules="rules.name"
      v-model="tool.name"
      :placeholder="t('tools.create.placeholders.name')"
      :label="t('tools.create.labels.name')"
    />
    <v-slider
      v-model="tool.slots"
      :min="2" :max="50" :step="1"
      thumb-label
      :label="t('tools.create.labels.slots')"
    />
    <categories-list v-model="tool.categoryId" />
  </v-form>
</template>

<script setup lang="ts">
const { tool } = defineProps<{ tool: Tool }>()
const form = ref()

const { t } = useI18n()

async function validate() {
  return (await form.value.validate()).valid
}

defineExpose({ validate, tool })

const rules = {
  name: [
    (value: string) => value || t("tools.create.name.required")
  ]
}
</script>