<template>
  <draggable-scene @drop="drop" :reference-frame="synthesizer" @rescale="rescale" v-if="synthesizer">
    <draggable-layer-svg :reference="synthesizer">
      <draggable-box
        v-for="module in synthesizer.modules"
        :key="module.id"
        :item="module"
        @drop="features.modules.save(module)"
      >
        <modules-wrapper :module="module" />
      </draggable-box>
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
</script>