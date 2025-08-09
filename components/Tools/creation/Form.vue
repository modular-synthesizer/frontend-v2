<template>
  <v-form ref="form">
    <v-text-field :rules="rules.name" v-model="tool.name" placeholder="Ce nom sera utilisé comme clef de traduction" label="Nom de l'outil" />
    <v-slider v-model="tool.slots" :min="2" :max="50" :step="1" thumb-label label="Emplacements" />
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
    (value: string) => value ?? t("tools.create.name.required")
  ]
}
</script>