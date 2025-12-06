<template>
  <component
    v-if="tag" :is="tag"
    @mousedown.right.capture.prevent.stop
    @mouseover.prevent.stop="onmouseover"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { BootedSynthesizer } from "@jsynple/audio/dist/types/BootedSynthesizer.type";
import type { Port } from "@jsynple/core/dist/types/business/Control.type"
import type { Module } from "@jsynple/core"

type Props = {
  control: Port,
  module: Module,
  synthesizer: BootedSynthesizer
}
const { control } = defineProps<Props>()

const kind: LayerKind = inject<LayerKind>('layer-kind', 'html')
const tag: string = kind === 'html' ? 'div' : 'g'

function onmouseover() {
  if (control.cable) return;
  useSelection().select(control)
}
</script>