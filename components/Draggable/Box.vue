<template>
  <g
    v-if="referenceFrame"
    @mousedown.prevent.stop="drag"
  >
    <slot />
  </g>
</template>

<script lang="ts" setup>

type Props = {
  item: Coordinates
}
const { item } = defineProps<Props>()

type Emits = { drop: [ ] }
const emit = defineEmits<Emits>()

const referenceFrame = inject<ScaledCoordinates>('reference-frame', { x: 0, y: 0, scale: 1.0 })

function drag({ x, y }: Coordinates) {
  const delta: Coordinates = {
    x: item.slot * 20,
    y: item.rack * 400,
    scale: referenceFrame.scale,
  }
  useDragEvents().start(delta, { x, y }, { move, drop })
}

function move({ x, y }: Coordinates) {
  item.slot = (x - (x % 20)) / 20
  item.rack = (y - (y % 400)) / 400
}

function drop(_: Coordinates) {
  emit('drop')
}
</script>