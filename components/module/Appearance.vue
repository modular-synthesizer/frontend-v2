<template>
  <div :class="['module', { selected }]" @mouseover.stop.prevent="emit('select', module)" />
</template>

<script setup lang="ts">
type Props = {
  selected: boolean
  synthesizer: ScaledCoordinates,
  module: Module
}
const props = defineProps<Props>()

type Emits = {
  select: [ Module ]
}
const emit = defineEmits<Emits>()

const width = computed(() => `${20 * props.module.slots}px`)

const height = `${RACK_HEIGHT}px`
</script>

<style scoped>
.module {
  width: v-bind(width);
  height: v-bind(height);
  background-color: red;
}
.selected {
  background-color: green;
}
</style>