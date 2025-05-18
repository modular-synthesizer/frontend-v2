<template>
  <div class="text-h3">Synthétiseurs</div>
  <synthesizers-list :synthesizers />
</template>

<script lang="ts" setup>
const fetch = fetchSynthesizers(api.synthesizers.list, useSnack());
const synthesizers: Synthesizer[] = ref(await fetch());
</script>