<template>
  <div class="scene-wrapper">
    <slot name="layers" />
  </div>
</template>

<script setup lang="ts">
type Props = {
  width: string
  height: string
  color: string
}
const { height = '100vh', width = '100vw', color = 'silver' } = defineProps<Props>()
</script>

<style scoped>
.scene-wrapper {
  height: v-bind(height);
  width: v-bind(width);
  background-color: v-bind(color);
}
</style>