<template>
  <pre>{{ tool }}</pre>
</template>

<script setup lang="ts">
type Props = { tool: Tool }
const { tool } = defineProps<Props>()
</script>