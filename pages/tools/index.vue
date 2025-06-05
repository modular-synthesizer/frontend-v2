<template>
  <v-data-table v-if="tools" :items="tools" />
</template>

<script lang="ts" setup>
const tools = await features.tools.fetch()
</script>