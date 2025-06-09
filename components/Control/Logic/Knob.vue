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

function onmousedown() {
  useSelection().lock()
  useDragEvents().start(synthesizer, control.payload, { drop, move })
}

function move(coordinates: Coordinates) {
  const delta = parameter.maximum - parameter.minimum
  console.log(delta, delta / 200 * (coordinates.y - control.payload.y))
  //console.log(coordinates.y - control.payload.y);
}

function drop() {

}
</script>