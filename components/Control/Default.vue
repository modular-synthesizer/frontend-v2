<template>
  <div :class="['wrapper', { selected }]" @mouseover.prevent.stop="useSelection().select(control)" />
</template>

<script lang="ts" setup>
import type { Control, Module } from "@jsynple/core"

type Props = {
  control: Control
  selected: boolean,
  module: Module
}
const { control, selected } = defineProps<Props>()

const RADIUS = 15;
const DIAMETER = RADIUS * 2

const x = computed(() => +control.payload.x - RADIUS)
const y = computed(() => +control.payload.y - RADIUS)
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
  box-sizing: border-box;
  border: 5px solid black;
}
</style>