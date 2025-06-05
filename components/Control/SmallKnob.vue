<template>
  <div
    :class="['wrapper', { selected }]"
    @mousedown.prevent.stop="emit('click', $event)"
    @mouseover.prevent.stop="useSelection().select(control)"
  />
</template>

<script lang="ts" setup>
type Props = {
  control: Control
  selected: boolean
}
const props = defineProps<Props>()

type Emits = {
  click: [ MouseEvent ]
}
const emit = defineEmits<Emits>()

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
  background-color: pink;
  border-radius: v-bind(radius);
}
.selected {
  box-sizing: border-box;
  border: 5px solid red;
}
</style>