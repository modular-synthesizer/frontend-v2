<template>
  <div :class="['item', 'wrapper', { selected }]"></div>
  <div class="label">{{ control.payload.label }}</div>
</template>

<script lang="ts" setup>
import type { SmallKnob, Knob, LargeKnob } from "@jsynple/core"

type Props = {
  control: SmallKnob | Knob | LargeKnob
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

const labelTranslation = computed(px(x, y.value + DIAMETER))
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
  outline: 2px solid blue;
}
.value {
  text-align: center;
  line-height: v-bind(diameter);
  user-select: none;
}
.label {
  position: absolute;
  translate: v-bind(labelTranslation);
  width: v-bind(diameter);
  text-align: center;
  font-size: 10px;
  color: black;
  user-select: none;
}
</style>