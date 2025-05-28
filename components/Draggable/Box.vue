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
  coordinates: Coordinates
}
const { coordinates } = defineProps<Props>()

type Emits = { drop: [ ], move: [ Coordinates ] }
const emit = defineEmits<Emits>()

const referenceFrame = inject<ScaledCoordinates>('reference-frame', { x: 0, y: 0, scale: 1.0 })

function drag({ x, y }: Coordinates) {
  const origin: ScaledCoordinates = { ...coordinates, scale: referenceFrame.scale }
  useDragEvents().start(origin, { x, y }, { move, drop })
}

function move({ x, y }: Coordinates) {
  emit('move', { x, y })
}

function drop(_: Coordinates) {
  emit('drop')
}
</script>