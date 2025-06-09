<template>
  <component v-if="tag" :is="tag" @mouseover.prevent.stop="useSelection().select(control)">
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
</script>