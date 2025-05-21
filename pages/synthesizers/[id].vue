<template>
  <draggable-scene v-if="synthesizer" />
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
const synthesizer = ref(await features.synthesizers.fetch(`${useRoute().params.id}`))
</script>