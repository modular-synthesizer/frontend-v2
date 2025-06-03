<template>
  <div :class="['wrapper', { selected }]" @mouseover.prevent.stop="useSelection().select(control)" />
</template>

<script lang="ts" setup>
type Props = {
  control: Control
  selected: boolean
}
const props = defineProps<Props>()

const RADIUS = 15;
const DIAMETER = RADIUS * 2

const x = computed(() => +props.control.payload.x - RADIUS)
const y = computed(() => +props.control.payload.y - RADIUS)
const translate = computed(() => `${x.value}px ${y.value}px`)
const diameter = computed(() => `${DIAMETER}px`)
const radius = computed(() => `${RADIUS}px`)
</script>

<style scoped>
.wrapper {
  width: v-bind(diameter);
  height: v-bind(diameter);
  translate: v-bind(translate);
  position: absolute;
  background-color: white;
  border-radius: v-bind(radius);
}
.selected {
  background-color: black;
}
</style>