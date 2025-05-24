<template>
  <div
    class="scene-wrapper"
    @mousedown.prevent.stop="emit('drag', fromEvent($event))"
    @mousemove.prevent.stop="emit('moved', fromEvent($event))"
    @mouseup.prevent.stop="emit('drop', fromEvent($event))"
    @wheel.capture.passive="emit('scaled', $event.deltaY)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
type Props = { color: string }
const { color = 'silver' } = defineProps<Props>()

type Emits = {
  drag: [ Coordinates ],
  drop: [ Coordinates ],
  moved: [ Coordinates ],
  scaled: [ number ]
}
const emit = defineEmits<Emits>()
</script>

<style scoped>
.scene-wrapper {
  height: 100vh;
  width: 100vw;
  background-color: v-bind(color);
}
</style>