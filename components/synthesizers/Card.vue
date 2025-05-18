<template>
  <v-card>
    <template v-slot:title>{{ synthesizer.name }}</template>
  </v-card>
</template>

<script setup lang="ts">
type Props = {
  synthesizer: Synthesizer
}
const props = defineProps<Props>()
</script>