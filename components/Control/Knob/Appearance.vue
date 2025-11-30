<template>
  <div :class="['item', 'wrapper', { selected }]"></div>
  <div class="item value">{{ value }}</div>
</template>

<script lang="ts" setup>
import type { SmallKnob, Knob, LargeKnob } from "@jsynple/core"
import { getValue } from '~/core/functions/modules/parameters';
import { px } from "~/core/functions/css";

type Props = {
  control: SmallKnob | Knob | LargeKnob
  selected: boolean
}
const { control, selected } = defineProps<Props>()

const RADIUS = 20;
const DIAMETER = RADIUS * 2

const x = computed(() => control.payload.x - RADIUS)
const y = computed(() => control.payload.y - RADIUS)

const translate = computed(px(x, y))
const diameter = computed(px(DIAMETER))
const radius = computed(px(RADIUS))

const value = computed(() => getValue(control.payload.target))
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
  font-size: 16px;
}
</style>