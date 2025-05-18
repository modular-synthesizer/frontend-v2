<template>
  <pre>{{ props.synthesizers }}</pre>
</template>

<script setup lang="ts">
type Props = {
  synthesizers: Synthesizer[]
}
const props = defineProps<Props>()
</script>