<template>
  <div class="scene-wrapper" @wheel.capture.passive="emit('scaled', $event.deltaY)">
    <slot name="layers" />
  </div>
</template>

<script setup lang="ts">
type Props = { color: string }
const { color = 'silver' } = defineProps<Props>()

type Emits = { scaled: [ number ] }
const emit = defineEmits<Emits>()
</script>

<style scoped>
.scene-wrapper {
  height: 100vh;
  width: 100vw;
  background-color: v-bind(color);
}
</style>