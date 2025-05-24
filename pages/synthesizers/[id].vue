<template>
  <draggable-scene
    @drag="c => useDragEvents().start(synthesizer, c, { drop, move })"
    @drop="c => useDragEvents().end(c)"
    @moved="c => useDragEvents().move(c)"
    @scaled="rescale"
    v-if="synthesizer"
  >
    <draggable-layer-svg :reference="synthesizer">
      <rect width="100" height="100" fill="red" />
    </draggable-layer-svg>
  </draggable-scene>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
const synthesizer = ref(await features.synthesizers.fetch(`${useRoute().params.id}`))

async function rescale(deltaY: number) {
  await features.synthesizers.rescale(synthesizer.value, deltaY)
}

async function drop({ x, y }: Coordinates) {
  features.synthesizers.move(synthesizer.value, { x, y })
}

async function move({ x, y }: Coordinates) {
  synthesizer.value.x = x;
  synthesizer.value.y = y;
}
</script>