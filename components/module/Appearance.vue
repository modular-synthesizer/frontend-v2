<template>
  <rect
    v-bind="{ width, height }" :fill="selected ? 'red' : 'green'" stroke="black" @mouseover.stop.prevent="emit('select', module)" />
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

const width = computed(() => 20 * props.module.slots)

const height = RACK_HEIGHT
</script>