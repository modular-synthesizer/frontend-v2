<template>
  <div :class="['item', 'wrapper', { selected }]"></div>
  <div class="item value" v-if="parameter">{{ value }}</div>
</template>

<script lang="ts" setup>
import type { SmallKnob, Knob, LargeKnob } from "@jsynple/core"
import { getValue } from '~/core/functions/modules/parameters';

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

const parameter = props.control.payload.target
const value = computed(() => getValue(parameter))
</script>

<style scoped>
.item {
  width: v-bind(diameter);
  height: v-bind(diameter);
  position: absolute;
  translate: v-bind(translate);
}
.wrapper {
  background-color: pink;
  border-radius: v-bind(radius);
}
.selected {
  box-sizing: border-box;
  border: 5px solid red;
}
.value {
  text-align: center;
  line-height: v-bind(diameter);
  user-select: none;
  color: black;
  font-size: 12px;
}
</style>