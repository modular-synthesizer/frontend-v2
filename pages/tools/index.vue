<template>
  <dialog-button ref="dialog" @validate="form.submit()">
    <tools-creation-form ref="form" @submit="dialog.close()" />
  </dialog-button>
  <v-data-table v-if="tools" :items="tools" />
</template>

<script lang="ts" setup>
const tools = await features.tools.list()
const creation = createTool()
const form = ref(null)
const dialog = ref(null)
</script>