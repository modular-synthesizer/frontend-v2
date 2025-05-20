<template>
  <pre>
    {{ synthesizer }}
  </pre>
</template>

<script setup lang="ts">
const id: string = useRoute().params.id as string;
const fetcher = fetchSynthesizer(api.synthesizers.get, navigateTo)
const synthesizer = ref(await fetcher(id))
</script>