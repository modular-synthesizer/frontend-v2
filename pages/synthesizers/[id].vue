<template>
  <draggable-scene @drop="drop" :reference-frame="synthesizer" @rescale="rescale" v-if="synthesizer">
    <draggable-layer-svg :reference="synthesizer">
      <modules-wrapper v-for="module in synthesizer.modules" :key="module.id" :module :synthesizer />
    </draggable-layer-svg>
  </draggable-scene>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
const synthesizer = ref(await features.synthesizers.fetch(`${useRoute().params.id}`))

async function rescale(deltaY: number) {
  if(!synthesizer.value) return
  await features.synthesizers.rescale(synthesizer.value, deltaY)
}

async function drop({ x, y }: Coordinates) {
  if(!synthesizer.value) return
  features.synthesizers.move(synthesizer.value, { x, y })
}
</script>