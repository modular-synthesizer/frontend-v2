<template>
  <v-row>
    <v-col cols="12" sm="6" md="4">
      <synthesizers-card :synthesizer v-for="synthesizer in synthesizers" :key="synthesizer.id" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
type Props = {
  synthesizers: Synthesizer[]
}
const props = defineProps<Props>()
</script>