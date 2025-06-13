<template>
  <component
    v-if="tag" :is="tag"
    @mousedown.prevent.stop="onmousedown"
    @mouseover.prevent.stop="useSelection().select(control)"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
type Props = {
  control: Control
  module: Module,
  synthesizer: Synthesizer
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
  console.log(origin.value.y, control.payload.y)
}

function move(coordinates: Coordinates) {
  const delta = Math.round((origin.value.y - coordinates.y) / 10)
  parameter.value = origin.value.value + (delta * parameter.step)
}

function drop() {
  origin.value.value = parameter.value
}
</script>