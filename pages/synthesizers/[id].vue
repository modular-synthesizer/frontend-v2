<template>
  <rights-check right="synthesizers::read" type="redirect" uri="/synthesizers">
    <draggable-scene @drop="drop" :reference-frame="synthesizer" @rescale="rescale" v-if="synthesizer">
      <draggable-layer-html :reference="synthesizer">
        <module-logic v-for="module in synthesizer.modules" :key="module.id" :module :synthesizer>
          <template #default="{ select, selected }">
            <module-appearance @select="select(module)" :selected :module :synthesizer>
              <control-wrapper
                :control
                :module
                :selected="useSelection().selected(control)"
                :synthesizer
                v-for="control in module.controls"/>
            </module-appearance>
          </template>
        </module-logic>
      </draggable-layer-html>
    </draggable-scene>
  </rights-check>
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