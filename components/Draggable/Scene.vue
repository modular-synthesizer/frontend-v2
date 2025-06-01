<template>
  <div
    class="scene-wrapper"
    @mousedown.prevent.stop="c => useDragEvents().start(referenceFrame, c, { drop, move })"
    @mousemove.prevent.stop="c => useDragEvents().move(c)"
    @mouseup.prevent.stop="c => useDragEvents().end(c)"
    @mouseleave.prevent.stop="c => useDragEvents().end(c)"
    @wheel.capture.passive="emit('rescale', $event.deltaY)"
    @mouseover.stop.prevent="useSelection().reset()"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
type Props = {
  color?: string,
  referenceFrame: ScaledCoordinates
}
const { color = 'silver', referenceFrame } = defineProps<Props>()

type Emits = {
  drop: [ Coordinates ],
  rescale: [ number ]
}
const emit = defineEmits<Emits>()

async function move({ x, y }: Coordinates) {
  referenceFrame.x = x;
  referenceFrame.y = y;
}

async function drop({ x, y }: Coordinates) {
  emit('drop', { x, y })
}

provide<ScaledCoordinates>("reference-frame", referenceFrame)
</script>

<style scoped>
.scene-wrapper {
  height: 100vh;
  width: 100vw;
  background-color: v-bind(color);
}
</style>