<template>
  <draggable-box :coordinates="coords" @move="move" @drop="drop">
    <slot :select="features.modules.select" :selected="useSelection().selected(module)" />
  </draggable-box>
</template>

<script setup lang="ts">
import { type Module, type Synthesizer, feats } from "@jsynple/core"

type Props = {
  module: Module,
  synthesizer: Synthesizer
}
const { module, synthesizer } = defineProps<Props>()

const coords = computed(() => ({ ...getCoordinates(module), scale: synthesizer.scale }))

function move({ x, y }: Coordinates) {
  feats.modules.move(module, { x, y }, Object.values(synthesizer.modules))
}

function drop() {
  features.modules.save(module)
}
</script>