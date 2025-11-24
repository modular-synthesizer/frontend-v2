<template>
  <component
    v-if="tag" :is="tag"
    @mousedown.prevent.stop="onmousedown"
    @mouseover.prevent.stop="useSelection().select(control)"
    @wheel.passive.stop="onwheelevent"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { BootedSynthesizer } from "@jsynple/audio/dist/types/BootedSynthesizer.type";
import type { Module } from "@jsynple/core"

type Props = {
  control: Control
  module: Module,
  synthesizer: BootedSynthesizer
}
const { control, module, synthesizer } = defineProps<Props>()

const kind: LayerKind = inject<LayerKind>('layer-kind', 'html')
const tag: string = kind === 'html' ? 'div' : 'g'

const parameter = getParameter(module, control.payload.target)

const origin: Ref<{ value: number, y: number}> = ref({ value: 0, y: 0 })

function onmousedown($event: MouseEvent) {
  useSelection().lock()
  useDragEvents().start(synthesizer, control.payload, { drop, move })
  origin.value.y = inRef(fromEvent($event), synthesizer).y
  origin.value.value = parameter.value
}

function move(coordinates: Coordinates) {
  const delta = Math.round((origin.value.y - coordinates.y) / 10)
  const value = origin.value.value + (delta * parameter.step)
  features.modules.parameters.setValue(parameter, value)
}

function drop() {
  origin.value.value = parameter.value
}

function onwheelevent(event: WheelEvent) {
  const delta = event.deltaY / Math.abs(event.deltaY)
  features.modules.parameters.moveValue(parameter, delta * parameter.step)
}
</script>