<template>
  <rights-check right="synthesizers::read" type="redirect" uri="/synthesizers">
    <draggable-scene @drop="drop" :reference-frame="synthesizer" @rescale="rescale" v-if="synthesizer">
      <draggable-layer-html :reference="synthesizer">
        <module-logic v-for="module in synthesizer.modules" :key="module.id" :module :synthesizer @loaded="features.modules.load(module, synthesizer)">
          <template #default="{ select, selected }">
            <module-appearance @select="select(module)" :selected :module :synthesizer>
              <!--control-wrapper
                :control
                :module
                :selected="useSelection().selected(control)"
                :synthesizer
                v-for="control in module.controls"/-->
            </module-appearance>
          </template>
        </module-logic>
      </draggable-layer-html>
    </draggable-scene>
    <div class="test" v-else>
      <V-btn @mousedown="handleClick">CLIQUE</V-btn>
    </div>
  </rights-check>
</template>

<script setup lang="ts">
import type { Synthesizer } from "@jsynple/core"

definePageMeta({ layout: false })

const context: Ref<AudioContext|null> = ref(null)

const synthesizer: Ref<Synthesizer|undefined> = ref(undefined)

async function handleClick() {
  context.value = new AudioContext()

  await context.value.audioWorklet.addModule("https://modular-synthesizer.github.io/processors/processors.js");

  synthesizer.value = await features.synthesizers.boot(`${useRoute().params.id}`, useAuth().token, context.value)

  context.value.resume()
}

async function rescale(deltaY: number) {
  if(!synthesizer.value) return
  await features.synthesizers.rescale(synthesizer.value, deltaY)
}

async function drop({ x, y }: Coordinates) {
  if(!synthesizer.value) return
  features.synthesizers.move(synthesizer.value, { x, y })
}
</script>