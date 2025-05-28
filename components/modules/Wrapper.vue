<template>
  <draggable-box :coordinates="coords" @move="move" @drop="drop">
    <rect v-bind="{ ...coords, width }" height="400" fill="red" stroke="black" />
  </draggable-box>
</template>

<script setup lang="ts">
type Props = {
  module: Module,
  synthesizer: Synthesizer
}
const { module, synthesizer } = defineProps<Props>()

type Emits = { drop: [ Module ]}
const emit = defineEmits<Emits>()

const coords = computed(() => ({ ...getCoordinates(module), scale: synthesizer.scale }))

const width = computed(() => 20 * module.slots)

function move({ x, y }: Coordinates) {
  features.modules.move(module, { x, y })
}

function drop() {
  features.modules.save(module)
}
</script>