<template>
  <div class="module" @mouseover.stop.prevent="emit('select', module)">
    <div :class="['background', { selected }]" />
    <slot />
  </div>
</template>

<script setup lang="ts">
type Props = {
  selected: boolean
  synthesizer: ScaledCoordinates
  module: Module
}
const props = defineProps<Props>()

type Emits = {
  select: [ Module ]
}
const emit = defineEmits<Emits>()

const width = computed(() => `${20 * props.module.slots}px`)

const height = `${RACK_HEIGHT}px`
</script>

<style scoped>
.module {
  width: v-bind(width);
  height: v-bind(height);
}
.module > .background {
  background-color: #777777;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.selected {
  border: 5px solid black;
}
</style>