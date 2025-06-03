<template>
  <draggable-scene @drop="drop" :reference-frame="synthesizer" @rescale="rescale" v-if="synthesizer">
    <draggable-layer-html :reference="synthesizer">
      <module-logic v-for="module in synthesizer.modules" :key="module.id" :module :synthesizer>
        <template #default="{ select, selected }">
          <module-appearance @select="select(module)" :selected="selected" :module="module" :synthesizer="synthesizer">
            <control-wrapper :control="control" v-for="control in module.controls" />
          </module-appearance>
        </template>
      </module-logic>
    </draggable-layer-html>
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