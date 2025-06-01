<template>
  <draggable-box :coordinates="coords" @move="move" @drop="drop">
    <slot :select="features.modules.select" :selected="useSelection().selected(module)" />
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

function move({ x, y }: Coordinates) {
  features.modules.move(module, { x, y })
}

function drop() {
  features.modules.save(module)
}
</script>