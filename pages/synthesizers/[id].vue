<template>
  <pre v-if="synthesizer">
    {{ synthesizer }}
  </pre>
</template>

<script setup lang="ts">
const synthesizer = ref(await features.synthesizers.fetch(`${useRoute().params.id}`))
</script>