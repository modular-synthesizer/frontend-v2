<template>
  <v-text-field v-model="tool.name" placeholder="Ce nom sera utilisé comme clef de traduction" label="Nom de l'outil" />
  <v-slider v-model="tool.slots" :min="2" :max="50" :step="1" thumb-label label="Emplacements" />
  <categories-list v-model="tool.categoryId" />
</template>

<script setup lang="ts">
const { tool } = defineProps<{ tool: Tool }>()

defineExpose({ tool })
</script>