<template>
  <draggable-scene
    @drag="c => useDragEvents().start(synthesizer, c, { drop, move })"
    @drop="c => useDragEvents().end(c)"
    @moved="c => useDragEvents().move(c)"
    @scaled="rescale"
    v-if="synthesizer"
  >
    <div class="test" />
  </draggable-screen>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
const synthesizer = ref(await features.synthesizers.fetch(`${useRoute().params.id}`))

async function rescale(deltaY: number) {
  await features.synthesizers.rescale(synthesizer.value, deltaY)
}

async function drop() {
  console.log(synthesizer.value.x, synthesizer.value.y)
}

async function move({ x, y }: Coordinates) {
  synthesizer.value.x = x;
  synthesizer.value.y = y;
}
</script>