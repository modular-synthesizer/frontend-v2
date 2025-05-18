<template>
  <v-card>
    <template v-slot:title>{{ synthesizer.name }}</template>
    <template v-slot:subtitle>{{ synthesizer.id }}</template>
    <v-card-text>{{ membership }}</v-card-text>
  </v-card>
</template>

<script setup lang="ts">
type Props = {
  synthesizer: Synthesizer,
  membership: Membership
}
const props = defineProps<Props>()
</script>