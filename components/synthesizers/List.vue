<template>
  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="synthesizer in synthesizers" :key="synthesizer.id">
      <slot name="synthesizer" v-bind="synthesizer" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
type Props = {
  synthesizers: Synthesizer[]
}
const props = defineProps<Props>()
</script>