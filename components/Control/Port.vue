<template>
  <div :class="['item', 'wrapper', { selected }]"></div>
</template>

<script lang="ts" setup>
import type { KnobControl } from '~/core/business/tools/Control.type';
import type { Module } from "@jsynple/core"

type Props = {
  control: KnobControl
  module: Module
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
.item {
  width: v-bind(diameter);
  height: v-bind(diameter);
  position: absolute;
  translate: v-bind(translate);
}
.wrapper {
  background-color: cyan;
  border-radius: v-bind(radius);
}
.selected {
  box-sizing: border-box;
  border: 5px solid blue;
}
.value {
  text-align: center;
  line-height: v-bind(diameter);
  user-select: none;
}
</style>